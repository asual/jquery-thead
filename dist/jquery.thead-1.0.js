/*
 * jQuery THead Plugin v1.0
 * http://www.asual.com/jquery/thead/
 *
 * Copyright (c) 2009 Rostislav Hristov
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 *
 * Date: 2009-10-06 01:02:55 +0300 (Tue, 06 Oct 2009)
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
		_scroll = function() {
			$(_tables).each(function() {
				var s = 'thead tr *', 
					t = $('table.jquery-thead, table', this.parent().prev()).get(0), 
					c = $('caption', t),
					ths = $(s, t),
					offset = _d.scrollTop() - $(t).offset().top + _magicNumber;
				if (c.length) {
					offset -= c.get(0).clientHeight;
				}
				$(s, this).each(function(index) {
					var c = ths.eq(index).get(0),
						w = $(c).css('width');
					$(this).css('width', w != 'auto' ? w : c.clientWidth - parseInt($(c).css('padding-left')) - parseInt($(c).css('padding-right')) + 'px');
				});
				$(this).css({
					display: (offset > _magicNumber && offset < t.clientHeight - $('tr:last', t).height() - _magicNumber*2) ? $(t).css('display') : 'none',
					left: $(t).offset().left - _d.scrollLeft() + 'px',
					width: t.clientWidth
				});
			});
		},
		_resize = function() {
			if (_interval == null) {
				_interval = setInterval(function() {
					if (_interval) {
						_interval = clearInterval(_interval);
					}
					_scroll();
				}, 50);
			}
		},
		_init = function() {
			$('table.jquery-thead, .jquery-thead table').thead();
		};
	
	$(function() {
		if (_supported) {
			_w.scroll(_scroll).resize(_resize);
			_init();
		}
	});
    
	$.fn.thead = function() {
    	if (_supported) {
    		var collection = $(this);
    		collection.each(function() {
        		var table, parent = $(this).parent(), thead = $('thead', this);
        		if (thead.length) {
        			var cs = $(this).attr(CELLSPACING);
        			table = $('<table />').attr(CLAZZ, $(this).attr(CLAZZ)).attr(CELLPADDING, $(this).attr(CELLPADDING)).attr(CELLSPACING, cs)
    					.css({position: 'fixed', top: 0}).appendTo($('<' + parent.get(0).tagName + '/>')
    					.attr(CLAZZ, parent.attr(CLAZZ)).insertAfter(parent));
	        		_tables.push(table.append($(thead).clone(true))
                        .append(cs > 0 ? '' : '<tbody><tr><td colspan="' + $('tr *', thead).size() + '" style="height:0;padding:0;" /></tr></tbody>'));
        		}
        	});
    	}
    	_scroll();
    };
    
})(jQuery);