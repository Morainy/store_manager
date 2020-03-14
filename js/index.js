;(function(win){
    var servData = win.servData || {}
    var list = servData.list || []
    var totalCount = servData.total || 0
    var page = getUrlParamVal('page') || 0
    var size = getUrlParamVal('size') || 10
    var total = Math.ceil(totalCount / size)

    var $pageSize = $('.page-dropdown')

    function openPage(page, size) {
        var selectData = getSelect()
        setPrintData(selectData)
        setTimeout(function() {
            openUrl('index.php?page=' + page + '&size=' + size)
        }, 300)
    }

    function rendPageSize (size) {
        $pageSize.find('button .count').text(size)
    }

    function bind() {
        // 初始化分页
        $('.panel-pagination').pagination({
            page: +page,
            size: +size,
            total: total
        }).on('page', function(event, data) {
            openPage(data.page, size)
        })

        $pageSize.on('click', '.dropdown-menu li', function() {
            openPage(page, $(this).data('size'))
        })
    }

    function rendPage() {
        rendPageSize(size)

        if (totalCount === 0) {
            $('.panel-page').hide()
        }
    }

    function getSelect() {
        var arr = []
        $('.panel-table tr :checkbox').each(function(index, el) {
            if (el.checked && list[index]) {
                arr.push(list[index])
            }
        })
        return arr
    }
    
    function main () {
        rendPage()
        bind()
    }
    
    main()
})(window)