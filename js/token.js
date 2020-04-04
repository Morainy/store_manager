;(function(win, $) {
    var row_num = goodsTxtArr.length;
    var sum = 0;
    for (i = 0; i < goodsTxtArr.length; i++) { 
        sum += goodsTxtArr[i].quantity_sum;
    }
    var template = `<% data.forEach(function(item, index) { %>
        <tr>
            <td><%= item.id %></td>
            <td><%= item.product_type %></td>
            <td><%= item.brand %></td>
            <td><%= item.product_name %></td>
            <td><%= item.specs %></td>
            <td><%= item.quantity %></td>
            <td><%= item.out_price %></td>
            <td><%= item.quantity_sum %></td>
            <td `;
            if index == 0 {
                template += `rowspan=`;
                template += row_num;
            }
            template += `><%=`;
            template += sum;
            template += `%></td>`;
            template += `<td><%= item.memo %></td>
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
