/*!
 * ContextualParser
 * Copyright(c) 2011 Elmer Bulthuis <elmerbulthuis@gmail.com>
 * MIT Licensed
 */

var assert = require('assert');
var Tokenizer = require('2kenizer');
var util = require('./util');

function ContextualParser(parseCallback, expressionSet, rootContext, options) {
	var parser = this;
	var currentContext = rootContext;
	var contextStack = [currentContext];
	var tokenizer = new Tokenizer(onToken, expressionSet, options);
	tokenizer.filter(currentContext.filter);

	function onToken(token, buffer) {
		if (token) {
			currentContext.writer.write(buffer.substr(0, token.index));
	        parseCallback.call(parser, token);
		} 
		else {
			currentContext.writer.write(buffer);
		}
	}

	function pushContext(filter, writer,	state)	{
		//console.log(arguments.callee, contextStack.length, state);
		currentContext = {
			filter:	filter
			, writer:	writer
			, state:	state
		};
		contextStack.unshift(currentContext);
		tokenizer.filter(currentContext.filter);
	}

	function popContext() {
		currentContext.writer.end();
		contextStack.shift();
		currentContext = contextStack[0];
		tokenizer.filter(currentContext.filter);
		//console.log(arguments.callee, contextStack.length);
	}
	
	function end() {
		tokenizer.end.apply(parser, arguments);
		assert.equal(1, contextStack.length, 'Parse error (stack = ' + contextStack.length + ')');
		currentContext.writer.end();
	}

	function getFilter(){
		return currentContext.filter;
	}
	function getWriter(){
		return currentContext.writer;
	}
	function getState(){
		return currentContext.state;
	}

	util.extend(this, tokenizer, {
		end: end
		, getFilter: getFilter
		, getWriter: getWriter
		, getState: getState
		, pushContext: pushContext
		, popContext: popContext
	});
}

// exports
module.exports = ContextualParser;



