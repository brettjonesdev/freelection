define( ['backbone'], function(Backbone) {
	if(Backbone && Backbone.Model && Backbone.Model.prototype._validate) {
        // Run validation against the next complete set of model attributes,
        // returning `true` if all is well. If a specific `error` callback has
        // been passed, call that instead of firing the general `"error"` event.
        Backbone.Model.prototype._validate = function(attrs, options) {
        	if (options && options.silent || !this.validate) return true;
        	if ( options && options.validateAll === true ) {
                attrs = _.extend({}, this.attributes, attrs);        		
        	}
            var error = this.validate(attrs, options);
            if (!error) return true;
            if (options && options.error) options.error(this, error, options);
            this.trigger('error', this, error, options);
            return false;
        };
    }
});