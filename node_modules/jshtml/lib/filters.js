var util = require("./util");

module.exports = function(options) {
	return {
		root:		['anchorEscaped', 'anchorIfElse', 'anchorFor', 'anchorWhile', 'anchorDoWhile', 'anchorSwitch', 'anchorWith'
			, 'anchorFunction', 'anchorAsync', 'anchorGroup', 'anchorBlock', 'anchorInline'
			]
		, tag:	['anchorEscaped', 'anchorIfElse', 'anchorFor', 'anchorWhile', 'anchorDoWhile', 'anchorSwitch', 'anchorWith'
			, 'anchorFunction', 'anchorAsync', 'anchorGroup', 'anchorBlock', 'anchorInline', 'tag1'
			]
		, tag1:		['anchorEscaped', 'anchorIfElse', 'anchorFor', 'anchorWhile', 'anchorDoWhile', 'anchorSwitch', 'anchorWith'
			, 'anchorFunction', 'anchorAsync', 'anchorGroup', 'anchorBlock', 'anchorInline', 'tag', 'tag2'
			]

		, anchorInline:	['jsMember', 'jsBlock', 'jsGroup', 'jsArray', 'anchorInline1']
		, anchorGroup:	['jsBlock', 'jsGroup', 'jsArray', 'jsSingleQuote', 'jsDoubleQuote', 'anchorGroup1']
		, anchorBlock:	['jsBlock', 'jsGroup', 'jsArray', 'jsSingleQuote', 'jsDoubleQuote', 'tag', 'anchorBlock1']

		, anchorIfElse:	['jsBlock', 'jsGroup', 'jsArray', 'jsSingleQuote', 'jsDoubleQuote', 'anchorIfElse1']
		, anchorIfElse1:	['jsBlock', 'jsGroup', 'jsArray', 'jsSingleQuote', 'jsDoubleQuote', 'tag', 'anchorIfElse2']
		, anchorIfElse2:	['jsBlock', 'jsGroup', 'jsArray', 'jsSingleQuote', 'jsDoubleQuote', 'tag', 'anchorIfElse3']

		, anchorFor:	['jsBlock', 'jsGroup', 'jsArray', 'jsSingleQuote', 'jsDoubleQuote', 'anchorFor1']
		, anchorFor1:	['jsBlock', 'jsGroup', 'jsArray', 'jsSingleQuote', 'jsDoubleQuote', 'tag', 'anchorFor2']

		, anchorWhile:	['jsBlock', 'jsGroup', 'jsArray', 'jsSingleQuote', 'jsDoubleQuote', 'anchorWhile1']
		, anchorWhile1:	['jsBlock', 'jsGroup', 'jsArray', 'jsSingleQuote', 'jsDoubleQuote', 'tag', 'anchorWhile2']

		, anchorDoWhile:	['jsBlock', 'jsGroup', 'jsArray', 'jsSingleQuote', 'jsDoubleQuote', 'tag', 'anchorDoWhile1']
		, anchorDoWhile1:	['jsBlock', 'jsGroup', 'jsArray', 'jsSingleQuote', 'jsDoubleQuote', 'anchorDoWhile2']

		, anchorSwitch:	['jsBlock', 'jsGroup', 'jsArray', 'jsSingleQuote', 'jsDoubleQuote', 'anchorSwitch1']
		, anchorSwitch1:	['jsBlock', 'jsGroup', 'jsArray', 'jsSingleQuote', 'jsDoubleQuote', 'tag', 'anchorSwitch2']

		, anchorWith:	['jsBlock', 'jsGroup', 'jsArray', 'jsSingleQuote', 'jsDoubleQuote', 'anchorWith1']
		, anchorWith1:	['jsBlock', 'jsGroup', 'jsArray', 'jsSingleQuote', 'jsDoubleQuote', 'tag', 'anchorWith2']

		, anchorFunction:	['jsBlock', 'jsGroup', 'jsArray', 'jsSingleQuote', 'jsDoubleQuote', 'anchorFunction1']
		, anchorFunction1:	['jsBlock', 'jsGroup', 'jsArray', 'jsSingleQuote', 'jsDoubleQuote', 'tag', 'anchorFunction2']

		, anchorAsync:	['jsBlock', 'jsGroup', 'jsArray', 'jsSingleQuote', 'jsDoubleQuote', 'tag', 'anchorAsync1']
		, anchorAsync1:	['anchorEscaped', 'anchorIfElse', 'anchorFor', 'anchorWhile', 'anchorDoWhile', 'anchorSwitch', 'anchorWith'
			, 'anchorFunction', 'anchorAsync', 'anchorGroup', 'anchorBlock', 'anchorInline', 'anchorAsync2']

		, jsBlock:	['jsBlock1', 'jsBlock', 'jsGroup', 'jsArray', 'jsSingleQuote', 'jsDoubleQuote', 'tag']
		, jsGroup:	['jsGroup1', 'jsBlock', 'jsGroup', 'jsArray', 'jsSingleQuote', 'jsDoubleQuote']
		, jsArray:	['jsArray1', 'jsBlock', 'jsGroup', 'jsArray', 'jsSingleQuote', 'jsDoubleQuote']
		, jsMember:	['jsMember', 'jsBlock', 'jsGroup', 'jsArray', 'jsMember1']
		, jsDoubleQuote:	['jsStringEscaped', 'jsDoubleQuote1']
		, jsSingleQuote:	['jsStringEscaped', 'jsSingleQuote1']
	};
}





