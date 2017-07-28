require('less/note.less')
var $ = require('../lib/jquery-3.2.0.min.js')
var Event = require('./event').EventCenter
var Toast = require('./toast').Toast

function Note(opts) {
    this.initOpts(opts)
    this.createNote()
    this.setStyle()
    this.bind()
}

Note.prototype = {
    default: {
        id: '',
        text: '',
        defaultText: 'input'
    },

    color: [
        'rgb(30,144,255)', 'rgb(30,144,200)',
        'rgb(255,215,0)', 'rgb(240,230,140)',
        'rgb(255,165,0)', 'rgb(255,200,0)',
        'rgb(255,69,0)', 'rgb(255,99,71)',
        'rgb(50,205,50)', 'rgb(127,255,0)',
        'rgb(189,183,107)', 'rgb(128,128,0)'
    ],

    initOpts: function(opts) {
        this.opts = $.extend({}, this.default, opts || {})
        if (this.opts.id) {
            this.id = this.opts.id
        }
    },

    handlerTime: function(t) {
        if (t.match(/T/)) {
            t = t.replace(/T/, ' ')
        }
        var reg = /^2.+\d{2}:\d{2}:/,
            time = t.match(reg)[0],
            time = time.substr(0, time.length - 1),
            hours = parseInt(time.match(/\d{2}:/)[0].substr(0, 2)) + 8 + ':',
            time = time.replace(/\d{2}:/, hours)
        return time
    },


    createNote: function() {
        var note = '<div class="note"><div class="info"><div class="time">2017-2-3 10:20</div>'
        note += '<i class="iconfont icon delete">&#xe61c;</i></div>'
        note += '<div class="content" contenteditable="true"></div></div>'
        var reg = /^2.+\d{2}:\d{2}:/
        this.$note = $(note);
        if (this.opts.text !== '') {
            this.$note.find('.content').html(this.opts.text)
            this.$note.find('.time').text(this.handlerTime(this.opts.ctime))
        } else {
            this.$note.find('.content').html(this.opts.defaultText)
            this.$note.find('.time').text('该项尚未创建')
        }

        $('.wrap').append(this.$note)
        this.$note.css({
            'left': 10,
            'top': 500
        })
    },

    setStyle: function() {
        var random = parseInt(Math.random() * 13)
        this.$note.find('.delete').css({
            'color': this.color[random]
        })
        this.$note.find('.content').css({
            'color': this.color[random]
        })
    },

    bind: function() {
        var _this = this,
            offset = {
                X: 0,
                Y: 0
            }

        // 删除
        this.$note.find('.delete').on('click', function() {
            _this.delete()
        })

        // 内容变化
        this.$note.find('.content').on('focus', function() {
            if ($(this).html() === 'input') {
                $(this).html('')
                $(this).data('beforContent', $(this).html())
            }
        }).on('blur', function() {
            if ($(this).data('beforeContent') != $(this).html()) {
                $(this).data('beforeContent', $(this).html())
                Event.fire('waterRender')
                if (_this.id) {
                    _this.edit($(this).html())
                } else {
                    _this.add($(this).html())
                }
            }
        })

        // 拖拽
        this.$note.find('.info').on('mousedown', function(e) {
            var X = e.pageX - _this.$note.offset().left,
                Y = e.pageY - _this.$note.offset().top
            offset.X = X
            offset.Y = Y
            _this.$note.addClass('dragging').css({
                'transition': 'none'
            })
        }).on('mouseup', function() {
            _this.$note.removeClass('dragging').css({
                'transition': 'all .5s'
            })
        })
        $('body').on('mousemove', function(e) {
            $('.dragging').offset({
                top: e.pageY - offset.Y,
                left: e.pageX - offset.X
            })
        })
    },

    add: function(msg) {
        var _this = this
        $.post('/api/add', {
                note: msg
            })
            .done(function(ret) {
                if (ret.status === 0) {
                    if (!msg) {
                        _this.$note.remove()
                        new Toast('内容不能为空')
                    } else {
                        _this.$note.find('.time').text(_this.handlerTime(ret.ctime))
                        new Toast('添加成功')
                    }

                } else {
                    _this.$note.remove()
                    Event.fire('waterRender')
                    new Toast(ret.errorMsg)
                }
            })

    },
    delete: function() {
        var _this = this
        $.post('/api/delete', { id: this.id })
            .done(function(ret) {
                if (ret.status === 0) {
                    new Toast('删除成功')
                    _this.$note.remove()
                    Event.fire('waterRender')
                } else {
                    new Toast(ret.errorMsg)
                }
            })
    },
    edit: function(msg) {
        var _this = this
        $.post('/api/edit', {
            id: this.id,
            note: msg
        }).done(function(ret) {
            if (ret.status === 0) {
                _this.$note.find('.time').text(_this.handlerTime(ret.utime))

                new Toast('编辑成功')
            } else {
                new Toast(ret.errorMsg)
            }
        })
    }
}
module.exports.Note = Note;