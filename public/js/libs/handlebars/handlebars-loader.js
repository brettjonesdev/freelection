define(['../libs/handlebars/handlebars-1.0.0.beta.6', 'datejs'], function() {
	
	var formatMoney = function(value, currency, decimals, decimal_sep, thousands_sep) { 
		/* http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript */
		   var n = value,
		   symbol = ( currency != null && currency != undefined ) ? currency : '$',
		   c = isNaN(decimals) ? 2 : Math.abs(decimals), //if decimal is zero we must take it, it means user does not want to show any decimal
		   d = decimal_sep || '.', //if no decimal separator is passed we use the dot as default decimal separator (we MUST use a decimal separator)

		   /*
		   according to [http://stackoverflow.com/questions/411352/how-best-to-determine-if-an-argument-is-not-sent-to-the-javascript-function]
		   the fastest way to check for not defined parameter is to use typeof value === 'undefined' 
		   rather than doing value === undefined.
		   */   
		   t = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep, //if you don't want to use a thousands separator you can pass empty string as thousands_sep value

		   sign = (n < 0) ? '-' : '',

		   //extracting the absolute value of the integer part of the number and converting to string
		   i = parseInt(n = Math.abs(n).toFixed(c)) + '', 

		   j = ((j = i.length) > 3) ? j % 3 : 0; 
		   return sign + symbol + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : ''); 
		};
		
	var getDate = function( value ) {
		var date = null;
		if ( value ) {
			if ( typeof value === 'string' ) {
				date = new Date( value );
				if ( !date ) { 
					date = Date.parse( value ); 
				}
			}
		}
		return date;
	};
	
	Handlebars.registerHelper( 'formatMoney', function( value, obj ) {
		return formatMoney( value );
	});
	
	Handlebars.registerHelper( 'formatNumber', function( value, obj ) {
		return formatMoney( value, '', 2 );
	});
	
	Handlebars.registerHelper( 'timestamp', function( value, obj ) {
		date = getDate( value );
		return ( date ? date.toString( 'M/d/yyyy HH:mm:ss' ) : null );
	});
	
	Handlebars.registerHelper( 'birthday', function( value, obj ) {
		var date = getDate( value );
		return ( date ? date.toString( 'MMMM d, yyyy' ) : null );
	});
	
	// Usage: {{#key_value obj}} Key: {{key}} // Value: {{value}} {{/key_value}}
	Handlebars.registerHelper("key_value", function(obj, fn) {
	    var buffer = "",
	        key;

	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) {
	            buffer += fn({key: key, value: obj[key]});
	        }
	    }

	    return buffer;
	});
	
	return Handlebars;
});