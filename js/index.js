;(function(win){
    var servData = win.servData || {}
    var list = servData.list || []
    var totalCount = servData.total || 0
    var page = getUrlParamVal('page') || 0
    var size = getUrlParamVal('size') || 10
    var total = Math.ceil(totalCount / size)

    var $pageSize = $('.page-dropdown')

    function openPage(page, size) {
        openUrl('index.php?page=' + page + '&size=' + size)
    }

    function openToken() {
        var selectData = getSelect()
        setPrintData(selectData)
        setTimeout(function() {
            openUrl('token.html')
        }, 300)
    }

    function delItems(arr, success) {
        $.ajax({
            url: '/store_manager/delete_item.php',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({id: arr}),
            dataType: 'json',
            success: function(data) {
                if (data.ret == 0) {
                    success && success();
                    alert("删除成功");
                } else {
                    alert("删除失败");
                }
            }
        })
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

        $('.go-token').on('click', function() {
            if ($('.panel-table tr :checkbox:checked').length === 0) {
                alert('还未选中任何数据！')
                return
            }
            openToken()
        })
        $('.del-items').on('click', function() {
            var selected = $('.panel-table tr :checkbox:checked');

            if (!selected.length) {
                alert('还未选中任何数据！')
                return
            }

            var arr = [];
            selected.each(function(index, item) {
                arr.push($(item).data('id'));
            })
            
            delItems(arr, function() {
                selected.each(function(index, item) {
                    $(item).parents('tr').remove();
                });
            });
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
        // console.log("arr:" + arr)
        // debugger;
        return arr
    }
    
    function main () {
        rendPage()
        bind()
    }
    
    main()
})(window)