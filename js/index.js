;(function(){
    var page = getUrlParamVal('page') || 0
    var size = getUrlParamVal('size') || 10

    var $pageSize = $('.page-dropdown')

    function openPage(page, size) {
        openUrl('index.html?page=' + page + '&size=' + size)
    }

    function rendPageSize (size) {
        $pageSize.find('button .count').text(size)
    }

    function bind() {
        // 初始化分页
        $('.panel-pagination').pagination({
            page: +page,
            size: +size,
            total: 1000
        }).on('page', function(event, data) {
            openPage(data.page, size)
        })

        $pageSize.on('click', '.dropdown-menu li', function() {
            openPage(page, $(this).data('size'))
        })
    }

    rendPageSize(size)
    bind()
})()