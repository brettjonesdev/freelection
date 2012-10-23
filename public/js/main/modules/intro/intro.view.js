define( ['baseView', 'backbone', 'jquery', 'underscore', 'text!./intro.tmpl'], function( BaseView, Backbone, $, _, _template) {
	return BaseView.extend( {
		el : '#main',
		template: _template
	});
	
});