(function(){
	requirejs.config({
		paths: {
			'jquery': '../libs/jquery/jquery-loader',
			'bootstrap': '../libs/bootstrap/bootstrap-loader',
			'mockjax' : '../libs/mockjax/mockjax_custom',
			'jqueryui': '../libs/jquery-ui/jquery-ui-loader',
			'jgrowl': '../libs/jgrowl/jgrowl-loader',
			'backbone': '../libs/backbone/backbone-loader',
			'underscore': '../libs/underscore/underscore-loader',
			'text': '../libs/require/require-text-2.0.0',
			'util': 'util/util',
			'datejs' : '../libs/datejs/date',
			'handlebars' : '../libs/handlebars/handlebars-loader',
			'fixture' : 'fixtures/fixtures',
			'allFixtures' : 'fixtures/allFixtures',
			'qunit': '../libs/qunit/qunit-loader',
			'validation': '../libs/validation/backbone.validation.min',
			'validateAll': '../libs/validateAll/validateAll',
			'modelbinder' : '../libs/modelbinder/modelbinder-loader',
			'Application' : 'application/application',
			'formView' : 'view/form.view',
			'baseView' : 'view/base.view'
		},
	    shim: {
	    	'backbone': {
	            deps: ['underscore', 'jquery']
	        },
	        'mockjax' : {
	        	deps: ['jquery', 'jgrowl']
	        },
	        'jqueryui' : {
	        	deps: ['jquery']
	        },
	        'jgrowl' : {
	        	deps: ['jquery']
	        },
	        'bootstrap' : {
	        	deps: ['jquery']
	        }
	    }
	});
	
	requirejs.onError = function (err) {
	    console.log(err.message);
	    if (err.requireType === 'timeout') {
	        console.log('modules: ' + err.requireModules);
	    }
	
	    throw err;
	};
	
	require( ['Application'], function( Application ) {
		Application.start();
	});
})();

//IE no console remedy
if ( !console ) {
	var console = {
		log: function() { /*do nothing*/ }
	};
}