;(function(win) {
    var $contentIn = $('.content-in')
    var $contentOut = $('.content-out')

    $("[name=record_type]").on('change', function(){
        var type = +$(this).val()
        
        if (type === 1) {
            $contentIn.show()
            $contentOut.hide()
        } else {
            $contentOut.show()
            $contentIn.hide()
        }
    });
})(window)