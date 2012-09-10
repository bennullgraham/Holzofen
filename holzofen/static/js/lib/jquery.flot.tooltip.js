/*
 * jquery.flot.tooltip
 *
 * desc:	create tooltip with values of hovered point on the graph, 
					support many series, time mode, stacking and pie charts
					you can set custom tip content (also with use of HTML tags) and precision of values
 * version:	0.4.4
 * author: 	Krzysztof Urbas @krzysu [myviews.pl] with help of @ismyrnow
 * website:	https://github.com/krzysu/flot.tooltip
 * 
 * released under MIT License, 2012
*/

(function ($) {
	var options = {
		tooltip: false, //boolean
		tooltipOpts: {
			content: "%s: %y&deg;c", //%s -> series label, %x -> X value, %y -> Y value, %x.2 -> precision of X value, %p -> percent
			dateFormat: "%y-%0m-%0d",
			shifts: {
				x: 10,
				y: 20
			},
			defaultTheme: false
		}
	};

	var init = function(plot) {

		var tipPosition = {x: 0, y: 0};
		var opts = plot.getOptions();
		
		var updateTooltipPosition = function(pos) {
			tipPosition.x = pos.x;
			tipPosition.y = pos.y;
		};
		
		var onMouseMove = function(e) {
						
			var pos = {x: 0, y: 0};

			pos.x = e.pageX;
			pos.y = e.pageY;

			updateTooltipPosition(pos);
		};
		
		var timestampToDate = function(tmst) {

			var d = new Date(tmst);
			var fmt = opts.tooltipOpts.dateFormat;

	        if (typeof d.strftime == "function") {
	            return d.strftime(fmt);
	        }
	        var leftPad = function(n, pad) {
	            n = "" + n;
	            pad = "" + (pad == null ? "0" : pad);
	            return n.length == 1 ? pad + n : n;
	        };
	        
	        var r = [];
	        var escape = false;
	        var hours = d.getHours();
	        var isAM = hours < 12;
	        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	        var hours12;
	        if (hours > 12) {
	            hours12 = hours - 12;
	        } else if (hours == 0) {
	            hours12 = 12;
	        } else {
	            hours12 = hours;
	        }

	        for (var i = 0; i < fmt.length; ++i) {
	            var c = fmt.charAt(i);
	            
	            if (escape) {
	                switch (c) {
	                case 'a': c = "" + dayNames[d.getDay()]; break;
	                case 'b': c = "" + monthNames[d.getMonth()]; break;
	                case 'd': c = leftPad(d.getDate()); break;
	                case 'e': c = leftPad(d.getDate(), " "); break;
	                case 'H': c = leftPad(hours); break;
	                case 'I': c = leftPad(hours12); break;
	                case 'l': c = leftPad(hours12, " "); break;
	                case 'm': c = leftPad(d.getMonth() + 1); break;
	                case 'M': c = leftPad(d.getMinutes()); break;
	                case 'S': c = leftPad(d.getSeconds()); break;
	                case 'y': c = leftPad(d.getFullYear() % 100); break;
	                case 'Y': c = "" + d.getFullYear(); break;
	                case 'p': c = (isAM) ? ("" + "am") : ("" + "pm"); break;
	                case 'P': c = (isAM) ? ("" + "AM") : ("" + "PM"); break;
	                case 'w': c = "" + d.getDay(); break;
	                }
	                r.push(c);
	                escape = false;
	            }
	            else {
	                if (c == "%")
	                    escape = true;
	                else
	                    r.push(c);
	            }
	        }
	        return r.join("");
		};
		
		plot.hooks.bindEvents.push(function (plot, eventHolder) {
            
			var to = opts.tooltipOpts;
			var placeholder = plot.getPlaceholder();
			var $tip;
			
			if (opts.tooltip === false) return;

			if( $('#flotTip').length > 0 ){
				$tip = $('#flotTip');
			}
			else {
				$tip = $('<div />').attr('id', 'flotTip');
				$tip.appendTo('body').hide().css({position: 'absolute'});
			
				if(to.defaultTheme) {
					$tip.css({
						'background': '#fff',
						'z-index': '100',
						'padding': '0.4em 0.6em',
						'border-radius': '0.5em',
						'font-size': '0.8em',
						'border': '1px solid #111'
					});
				}
			}
			
			$(placeholder).bind("plothover", function (event, pos, item) {
				if (item) {					
					var tipText;

					if(opts.xaxis.mode === "time" || opts.xaxes[0].mode === "time") {
						tipText = stringFormat(to.content, item, timestampToDate);
					}
					else {
						tipText = stringFormat(to.content, item);						
					}
					
					$tip.html( tipText ).css({left: tipPosition.x + to.shifts.x, top: tipPosition.y + to.shifts.y}).show();
				}
				else {
					$tip.hide().html('');
				}
			});
			
			eventHolder.mousemove(onMouseMove);
		});
		
		var stringFormat = function(content, item, fnct) {
		
			var percentPattern = /%p\.{0,1}(\d{0,})/;
			var seriesPattern = /%s/;
			var xPattern = /%x\.{0,1}(\d{0,})/;
			var yPattern = /%y\.{0,1}(\d{0,})/;
			
			//percent match
			if( typeof (item.series.percent) !== 'undefined' ) {
				content = adjustValPrecision(percentPattern, content, item.series.percent);
			}
			//series match
			if( typeof(item.series.label) !== 'undefined' ) {
				content = content.replace(seriesPattern, item.series.label);
			}
			// xVal match
			if( typeof(fnct) === 'function' ) {
				content = content.replace(xPattern, fnct(item.series.data[item.dataIndex][0]) );
			}
			else if( typeof item.series.data[item.dataIndex][0] === 'number' ) {
				content = adjustValPrecision(xPattern, content, item.series.data[item.dataIndex][0]);
			}
			// yVal match
			if( typeof item.series.data[item.dataIndex][1] === 'number' ) {
				content = adjustValPrecision(yPattern, content, item.series.data[item.dataIndex][1]);
			}

			return content;
		};
		
		var adjustValPrecision = function(pattern, content, value) {
		
			var precision;
			if( content.match(pattern) !== 'null' ) {
				if(RegExp.$1 !== '') {
					precision = RegExp.$1;
					value = value.toFixed(precision)
				}
				content = content.replace(pattern, value);
			}
		
			return content;
		};
	}
    
	$.plot.plugins.push({
		init: init,
		options: options,
		name: 'tooltip',
		version: '0.4.4'
	});
})(jQuery);