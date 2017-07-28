var Toast = require('./toast.js').Toast;
var Note = require('./note.js').Note;
var Toast = require('./toast.js').Toast;
var Event = require('./event.js').EventCenter;
var $ = require('../lib/jquery-3.2.0.min.js')

var NoteManager = (function() {

    function load() {
        $.get('api/notes')
            .done(function(ret) {
                if (ret.status === 0) {
                    $.each(ret.data, function(idx, data) {
                        new Note({
                            id: data.id,
                            text: data.text,
                            ctime: data.createdAt,
                            utime: data.updateAt
                        })
                    })
                    Event.fire('waterRender')
                } else {
                    new Toast(ret.errorMsg)
                }
            }).fail(function() {
                new Toast('网络异常')
            })
    }

    function add() {
        new Note()
    }

    return {
        load: load,
        add: add
    }
})()



module.exports.NoteManager = NoteManager