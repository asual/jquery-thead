/*
 * jQuery Thead Plugin v${version}
 * http://www.asual.com/jquery/thead/
 *
 * Copyright (c) 2009-2010 Rostislav Hristov
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 *
 * Date: ${timestamp}
 */
(function($) {
    
    var CLAZZ = 'class',
        CELLPADDING = 'cellpadding',
        CELLSPACING = 'cellspacing',
        _agent = navigator.userAgent, 
        _w = $(window),
        _d = $(document),
        _tables = [], 
        _magicNumber = 4,
        _supported = !($.browser.msie && parseFloat(_agent.substr(_agent.indexOf('MSIE') + _magicNumber)) < 7),
        _interval = null,
        _parseInt = function(value) {
            var result = parseInt(value, 10);
            return isNaN(result) ? 0 : result;
        },
        _scroll = function() {
            $(_tables).each(function() {
                var w, s = 'thead tr th, thead tr td', 
                    t = $('table.jquery-thead, table', this.parent().prev()).get(0), 
                    c = $('caption', t),
                    collapse = $(t).css('border-collapse') == 'collapse',
                    ths = $(s, t),
                    offset = _d.scrollTop() - $(t).offset().top + _magicNumber;
                if (c.length) {
                    offset -= c.get(0).clientHeight;
                }
                $(s, this).each(function(index) {
                    var th = ths.eq(index).get(0);
                    w = $(th).css('width');
                    $(this).css('width', w != 'auto' ? w : th.clientWidth - _parseInt($(th).css('padding-left')) - _parseInt($(th).css('padding-right')) + 'px');
                });
                $(this).css({
                    display: (offset > _magicNumber && offset < t.clientHeight - $('tr:last', t).height() - _magicNumber*2) ? $(t).css('display') : 'none',
                    left: $(t).offset().left - _d.scrollLeft() + 'px',
                    width: $(t).get(0).offsetWidth
                });
            });
        };
    
    $(function() {
        if (_supported) {
            _w.scroll(_scroll).resize(function() {
                if (_interval == null) {
                    _interval = setInterval(function() {
                        if (_interval) {
                            _interval = clearInterval(_interval);
                        }
                        _scroll();
                    }, 50);
                }
            });
            $('table.jquery-thead, .jquery-thead table').thead();
        }
    });
    
    $.thead = (function () {
        return {
            update: function() {
                $(_tables).each(function() {
                    var base = $('thead', $('table.jquery-thead, table', this.parent().prev()).get(0));
                    var local = $('thead', this);
                    if (local.html() != base.html()) {
                        local.parent().append(base.clone(true));
                        local.remove();
                        _scroll();
                    }
                });
            }
        }
    })();
    
    $.fn.thead = function() {
        if (_supported) {
            var collection = $(this);
            collection.each(function() {
                var table, parent = $(this).parent(), thead = $('thead', this);
                if (thead.length) {
                    var clazz = $(this).attr(CLAZZ),
                        cp = $(this).attr(CELLPADDING),
                        cs = $(this).attr(CELLSPACING),
                        table = $('<table />').attr(CLAZZ, clazz)
                            .attr(CELLPADDING, cp ? cp : 1)
                            .attr(CELLSPACING, cs ? cs : 2)
                            .css({position: 'fixed', top: 0}).appendTo($('<' + parent.get(0).tagName + '/>')
                                    .attr(CLAZZ, parent.attr(CLAZZ)).insertAfter(parent));
                    _tables.push(table.append($(thead).clone(true)));
                }
            });
        }
        _scroll();
    };
    
})(jQuery);