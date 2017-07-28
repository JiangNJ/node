var $ = require('../lib/jquery-3.2.0.min.js')

function waterRender($node) {
    this.$node = $node
    this.init()
}

waterRender.prototype.init = function() {
    var $items = this.$node.children(),        //获取node的个数
        count = parseInt($(window).width() / this.$node.children().outerWidth(true)),   //获取行数：显示屏的宽度除以node的子元素的宽度（outerWidth（true）包括边框）
        heightArr = [],                         //heightArr设置为空数组
        _this = this

    for (var i = 0; i < count; i++) {                   //heightArr初始化
        heightArr[i] = 0
    }

    $items.each(function() {
        var minHeight = Math.min.apply(null, heightArr)         //添加最小的元素
        var index = heightArr.indexOf(minHeight)            //最小元素的位置

        $(this).css({
            top: heightArr[index],                      //元素位置
            left: $(this).outerWidth(true) * index
        })

        heightArr[index] += $(this).outerHeight(true)       //为不同位置的行添加高度
        _this.$node.height(heightArr[index])                
    })
}

module.exports.waterRender = waterRender