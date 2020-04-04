;(function(win, $) {
    var row_num = data.length;
    var sum = 0;
    for (i = 0; i < data.length; i++) { 
        sum += data[i].quantity_sum;
    }
    var template = `<% data.forEach(function(item) { %>
        <tr>
            <td><%= item.id %></td>
            <td><%= item.product_type %></td>
            <td><%= item.brand %></td>
            <td><%= item.product_name %></td>
            <td><%= item.specs %></td>
            <td><%= item.quantity %></td>
            <td><%= item.out_price %></td>
            <td><%= item.quantity_sum %></td>
            <td rowspan=row_num><%= sum %></td>
            <td><%= item.memo %></td>
        </tr>
    <% }); 
    %>`;
    
    function render(data) {
        var html = win.tmpl(template, {data});
        $('.my-table tbody').append(html);
    }

    function main() {
        render(goodsTxtArr);
    }


    $(function() {
        main();
    })
})(window, $)
