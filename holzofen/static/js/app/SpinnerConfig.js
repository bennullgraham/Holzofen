define(function() {
	var defaultSpinner = {
        lines: 13, // The number of lines to draw
        length: 1, // The length of each line
        width: 2, // The line thickness
        radius: 6, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        color: '#000', // #rgb or #rrggbb
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '10px', // Top position relative to parent in px
        left: '110px' // Left position relative to parent in px
    };
	var configs = {
		'default': defaultSpinner,
		'firing-view': defaultSpinner,
		'plot-view': defaultSpinner,
        'content-view': defaultSpinner,
        'content-collection-view': defaultSpinner
	};
    configs['plot-view']['top'] = 'auto';
    configs['plot-view']['left'] = 'auto';
    return configs;
});