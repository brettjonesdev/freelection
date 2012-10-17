/*do NOT include this file in build - prevent loading of individual modules*/
define( ['jquery', 'backbone', 'underscore', 'fixture', 'allFixtures'], function($, Backbone, _) {
	return Backbone.Router.extend( {
		routes: {
			'*moduleName' : 'loadModule'
		},
		
		loadModule: function(moduleName) {
			//#clients => modules/clients/clients.view
			if ( moduleName.indexOf( '.view' ) == -1 ) {
				moduleName = 'modules/' + moduleName + '/' + moduleName + '.view';
			}
			
			require( ['Application', moduleName], function(Application, View) {
				var view = new View({ el: '#content'});
				view.render();
			});
		}
	});
});