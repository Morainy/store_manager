;(function($, tmpl) {

var setting = {
        page: 0,
        size: 15,
        total: 15
    };

var template = {
        page: [
            '<ul class="pagination"></ul>'
        ].join(''),

        list: [
            '<% if (page === 0) { %>',
                '<li class="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>',
            '<% } else { %>',
                '<li><a href="#" data-page="<%= page - 1 %>" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>',
            '<% } %>',

            '<% for (var i = 0; i < pages.length; i++) { %>',
                '<% if (\'...\' === pages[i]) { %>',
                    '<li><a href="#">...</a></li>',
                '<% } else if (page === pages[i]) { %>',
                    '<li class="active"><a href="#"><%= pages[i] + 1 %></a></li>',
                '<% } else { %>',
                    '<li><a href="#" data-page="<%= pages[i] %>"><%= pages[i] + 1 %></a></li>',
                '<% } %>',
            '<% } %>',

            '<% if (page === total - 1) { %>',
                '<li class="disabled"><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>',
            '<% } else { %>',
                '<li><a href="#" data-page="<%= page + 1 %>" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>',
            '<% } %>'
        ].join('')
    };

function Pagination(elem, options) {
    this.$elem = $(elem);
    this.$page = $(tmpl(template.page, [])).appendTo(this.$elem);

    this.bind();
    this.reset(options);
}

$.extend(Pagination.prototype, {
    bind: function () {
        var self = this;
        this.$page.on('click', '[data-page]', function (event) {
            event.preventDefault();
            self.$elem.trigger('page',{
                page : $(this).data('page')
            });
        });
    },

    reset: function (options) {
        this.page = options.page;
        this.size = options.size;
        this.total = options.total;
        this.render();
    },

    render: function () {
        var pages = [],
            page = this.page,
            size = this.size,
            total = this.total,
            max = 7,
            i,
            len;

        if (total < max) {
            i = -1;

            while (++i < total) {
                pages.push(i);
            }
        } else {
            if (page < total * 0.5 && page < max - 3) {
                i = -1,
                len = max - 2;

                while (++i < len) {
                    pages.push(i);
                }

                pages.push('...');
                pages.push(total - 1);
            } else if (page >= total * 0.5 && page >= total - max + 3) {
                pages.push(0);
                pages.push('...');

                i = total - max + 1,
                len = total;

                while (++i < len) {
                    pages.push(i);
                }
            } else {
                pages.push(0);
                pages.push('...');

                i = page - Math.ceil((max - 4) / 2);
                len = page + Math.ceil((max - 4) / 2);

                while (++i < len) {
                    pages.push(i);
                }

                pages.push('...');
                pages.push(total - 1);
            }
        }

        this.$page.html(tmpl(template.list, {
            pages: pages,
            page: page,
            size: size,
            total: total
        }));
    }
});

$.fn.pagination = function (options) {
    options = $.extend({}, setting, options);

    return this.each(function () {
        var $elem = $(this),
            pagination = $elem.data('pagination');

        if (!pagination) {
            pagination = new Pagination(this, options);
        } else {
            pagination.reset(options);
        }

        $elem.data('pagination', pagination);
    });
};
})(jQuery, window.tmpl)