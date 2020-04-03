;(function(win, $) {
    var template = `<% arr.forEach(function(item, index) { %>
        <tr>
            <td><%= item.id %></td>
            <td><%= item.product_type %></td>
            <td><%= item.brand %></td>
            <td><%= item.product_name %></td>
            <td><%= item.specs %></td>
            <td><%= item.quantity %></td>
            <td><%= item.out_price %></td>
            <td><%= item.quantity_sum %></td>
            <% if (index === 0) { %>
                <td rowspan="<% data.length %>" ><%= sum %></td>
            <% } %>
            <td><%= item.memo %></td>
        </tr>
    <% }); %>`;
    
    function render(arr) {
        var sum = data.reduce((total, curr) => total + curr, 0);
        var html = win.tmpl(template, {
            arr,
            sum
        });

        $('.my-table tbody').append(html);
    }

    function main() {
        render(goodsTxtArr);
    }


    $(function() {
        main();
    })
})(window, $)
