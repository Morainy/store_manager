;(function(win, $) {
    var template = `<% data.forEach(function(item) { %>
        <tr>
            <td><%= item.product_name %></td>
            <td><%= item.in_num || 0 %></td>
            <td><%= item.out_num || 0 %></td>
            <td><%= (item.in_num || 0) - (item.out_num || 0) %></td>
        </tr>
    <% }); %>`;

    function getJson(success) {
        $.ajax({
            url: '/store_manager/get_summary.php',
            method: 'POST',
            contentType: 'application/json',
            // data: JSON.stringify(),
            dataType: 'json',
            success: function(data) {
                success && success(data);
            }
        })
    }
    
    function render(data) {
        // console.log(data);

        var html = win.tmpl(template, {data});
        $('.my-table tbody').html(html);
    }

    function main() {
        getJson(render);
    }


    $(function() {
        main();
    })
})(window, $)