/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*
Turbolinks 5.1.0
Copyright © 2018 Basecamp, LLC
 */

(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame&&null!=window.addEventListener}(),visit:function(t,e){return Turbolinks.controller.visit(t,e)},clearCache:function(){return Turbolinks.controller.clearCache()},setProgressBarDelay:function(t){return Turbolinks.controller.setProgressBarDelay(t)}}}).call(this),function(){var t,e,r,n=[].slice;Turbolinks.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},Turbolinks.closest=function(e,r){return t.call(e,r)},t=function(){var t,r;return t=document.documentElement,null!=(r=t.closest)?r:function(t){var r;for(r=this;r;){if(r.nodeType===Node.ELEMENT_NODE&&e.call(r,t))return r;r=r.parentNode}}}(),Turbolinks.defer=function(t){return setTimeout(t,1)},Turbolinks.throttle=function(t){var e;return e=null,function(){var r;return r=1<=arguments.length?n.call(arguments,0):[],null!=e?e:e=requestAnimationFrame(function(n){return function(){return e=null,t.apply(n,r)}}(this))}},Turbolinks.dispatch=function(t,e){var n,o,i,s,a,u;return a=null!=e?e:{},u=a.target,n=a.cancelable,o=a.data,i=document.createEvent("Events"),i.initEvent(t,!0,n===!0),i.data=null!=o?o:{},i.cancelable&&!r&&(s=i.preventDefault,i.preventDefault=function(){return this.defaultPrevented||Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}}),s.call(this)}),(null!=u?u:document).dispatchEvent(i),i},r=function(){var t;return t=document.createEvent("Events"),t.initEvent("test",!0,!0),t.preventDefault(),t.defaultPrevented}(),Turbolinks.match=function(t,r){return e.call(t,r)},e=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),Turbolinks.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}.call(this),function(){Turbolinks.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.requestURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.HttpRequest=function(){function e(e,r,n){this.delegate=e,this.requestCanceled=t(this.requestCanceled,this),this.requestTimedOut=t(this.requestTimedOut,this),this.requestFailed=t(this.requestFailed,this),this.requestLoaded=t(this.requestLoaded,this),this.requestProgressed=t(this.requestProgressed,this),this.url=Turbolinks.Location.wrap(r).requestURL,this.referrer=Turbolinks.Location.wrap(n).absoluteURL,this.createXHR()}return e.NETWORK_FAILURE=0,e.TIMEOUT_FAILURE=-1,e.timeout=60,e.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},e.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},e.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},e.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},e.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},e.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},e.prototype.requestCanceled=function(){return this.endRequest()},e.prototype.notifyApplicationBeforeRequestStart=function(){return Turbolinks.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},e.prototype.notifyApplicationAfterRequestEnd=function(){return Turbolinks.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},e.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},e.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},e.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},e.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.ProgressBar=function(){function e(){this.trickle=t(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,e.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",e.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},e.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},e.prototype.setValue=function(t){return this.value=t,this.refresh()},e.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},e.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},e.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},e.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},e.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},e.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},e.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},e.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},e.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},e.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.BrowserAdapter=function(){function e(e){this.controller=e,this.showProgressBar=t(this.showProgressBar,this),this.progressBar=new Turbolinks.ProgressBar}var r,n,o;return o=Turbolinks.HttpRequest,r=o.NETWORK_FAILURE,n=o.TIMEOUT_FAILURE,e.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},e.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},e.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},e.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},e.prototype.visitRequestCompleted=function(t){return t.loadResponse()},e.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case r:case n:return this.reload();default:return t.loadResponse()}},e.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},e.prototype.visitCompleted=function(t){return t.followRedirect()},e.prototype.pageInvalidated=function(){return this.reload()},e.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,this.controller.progressBarDelay)},e.prototype.showProgressBar=function(){return this.progressBar.show()},e.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},e.prototype.reload=function(){return window.location.reload()},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.History=function(){function e(e){this.delegate=e,this.onPageLoad=t(this.onPageLoad,this),this.onPopState=t(this.onPopState,this)}return e.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),addEventListener("load",this.onPageLoad,!1),this.started=!0)},e.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),removeEventListener("load",this.onPageLoad,!1),this.started=!1):void 0},e.prototype.push=function(t,e){return t=Turbolinks.Location.wrap(t),this.update("push",t,e)},e.prototype.replace=function(t,e){return t=Turbolinks.Location.wrap(t),this.update("replace",t,e)},e.prototype.onPopState=function(t){var e,r,n,o;return this.shouldHandlePopState()&&(o=null!=(r=t.state)?r.turbolinks:void 0)?(e=Turbolinks.Location.wrap(window.location),n=o.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(e,n)):void 0},e.prototype.onPageLoad=function(t){return Turbolinks.defer(function(t){return function(){return t.pageLoaded=!0}}(this))},e.prototype.shouldHandlePopState=function(){return this.pageIsLoaded()},e.prototype.pageIsLoaded=function(){return this.pageLoaded||"complete"===document.readyState},e.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},e}()}.call(this),function(){Turbolinks.Snapshot=function(){function t(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return t.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},t.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},t.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},t.prototype.clone=function(){return new t({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},t.prototype.getRootLocation=function(){var t,e;return e=null!=(t=this.getSetting("root"))?t:"/",new Turbolinks.Location(e)},t.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},t.prototype.getElementForAnchor=function(t){try{return this.body.querySelector("[id='"+t+"'], a[name='"+t+"']")}catch(e){}},t.prototype.hasAnchor=function(t){return null!=this.getElementForAnchor(t)},t.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},t.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},t.prototype.isVisitable=function(){return"reload"!==this.getSetting("visit-control")},t.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},t}()}.call(this),function(){var t=[].slice;Turbolinks.Renderer=function(){function e(){}var r;return e.render=function(){var e,r,n,o;return n=arguments[0],r=arguments[1],e=3<=arguments.length?t.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,e,function(){}),o.delegate=n,o.render(r),o},e.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},e.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},e.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,e.async=!1,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},e}()}.call(this),function(){Turbolinks.HeadDetails=function(){function t(t){var e,r,i,s,a,u,l;for(this.element=t,this.elements={},l=this.element.childNodes,s=0,u=l.length;u>s;s++)i=l[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var t=function(t,r){function n(){this.constructor=t}for(var o in r)e.call(r,o)&&(t[o]=r[o]);return n.prototype=r.prototype,t.prototype=new n,t.__super__=r.prototype,t},e={}.hasOwnProperty;Turbolinks.SnapshotRenderer=function(e){function r(t,e,r){this.currentSnapshot=t,this.newSnapshot=e,this.isPreview=r,this.currentHeadDetails=new Turbolinks.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new Turbolinks.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return t(r,e),r.prototype.render=function(t){return this.shouldRender()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.isPreview||e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},r.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},r.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},r.prototype.shouldRender=function(){return this.newSnapshot.isVisitable()&&this.trackedElementsAreIdentical()},r.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},r.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},r.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},r.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},r.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},r.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.assignNewBody=function(){return document.body=this.newBody},r.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},r.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},r.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},r.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},r.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},r.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},r.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},r.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},r.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},r}(Turbolinks.Renderer)}.call(this),function(){var t=function(t,r){function n(){this.constructor=t}for(var o in r)e.call(r,o)&&(t[o]=r[o]);return n.prototype=r.prototype,t.prototype=new n,t.__super__=r.prototype,t},e={}.hasOwnProperty;Turbolinks.ErrorRenderer=function(e){function r(t){this.html=t}return t(r,e),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(Turbolinks.Renderer)}.call(this),function(){Turbolinks.View=function(){function t(t){this.delegate=t,this.element=document.documentElement}return t.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},t.prototype.getElementForAnchor=function(t){return this.getSnapshot().getElementForAnchor(t)},t.prototype.getSnapshot=function(){return Turbolinks.Snapshot.fromElement(this.element)},t.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,n,e):this.renderError(r,e)},t.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},t.prototype.renderSnapshot=function(t,e,r){return Turbolinks.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),Turbolinks.Snapshot.wrap(t),e)},t.prototype.renderError=function(t,e){return Turbolinks.ErrorRenderer.render(this.delegate,e,t)},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.ScrollManager=function(){function e(e){this.delegate=e,this.onScroll=t(this.onScroll,this),this.onScroll=Turbolinks.throttle(this.onScroll)}return e.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},e.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},e.prototype.scrollToElement=function(t){return t.scrollIntoView()},e.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},e.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},e.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},e}()}.call(this),function(){Turbolinks.SnapshotCache=function(){function t(t){this.size=t,this.keys=[],this.snapshots={}}var e;return t.prototype.has=function(t){var r;return r=e(t),r in this.snapshots},t.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},t.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},t.prototype.read=function(t){var r;return r=e(t),this.snapshots[r]},t.prototype.write=function(t,r){var n;return n=e(t),this.snapshots[n]=r},t.prototype.touch=function(t){var r,n;return n=e(t),r=this.keys.indexOf(n),r>-1&&this.keys.splice(r,1),this.keys.unshift(n),this.trim()},t.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},e=function(t){return Turbolinks.Location.wrap(t).toCacheKey()},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.Visit=function(){function e(e,r,n){this.controller=e,this.action=n,this.performScroll=t(this.performScroll,this),this.identifier=Turbolinks.uuid(),this.location=Turbolinks.Location.wrap(r),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var r;return e.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},e.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},e.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},e.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},e.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=r(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},e.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new Turbolinks.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},e.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},e.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},e.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},e.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},e.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},e.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},e.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},e.prototype.requestCompletedWithResponse=function(t,e){return this.response=t,null!=e&&(this.redirectedToLocation=Turbolinks.Location.wrap(e)),this.adapter.visitRequestCompleted(this)},e.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},e.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},e.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},e.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},e.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},e.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},e.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},e.prototype.getTimingMetrics=function(){return Turbolinks.copyObject(this.timingMetrics)},r=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},e.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},e.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},e.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},e.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.Controller=function(){function e(){this.clickBubbled=t(this.clickBubbled,this),this.clickCaptured=t(this.clickCaptured,this),this.pageLoaded=t(this.pageLoaded,this),this.history=new Turbolinks.History(this),this.view=new Turbolinks.View(this),this.scrollManager=new Turbolinks.ScrollManager(this),this.restorationData={},this.clearCache(),this.setProgressBarDelay(500)}return e.prototype.start=function(){return Turbolinks.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},e.prototype.disable=function(){return this.enabled=!1},e.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},e.prototype.clearCache=function(){return this.cache=new Turbolinks.SnapshotCache(10)},e.prototype.visit=function(t,e){var r,n;return null==e&&(e={}),t=Turbolinks.Location.wrap(t),this.applicationAllowsVisitingLocation(t)?this.locationIsVisitable(t)?(r=null!=(n=e.action)?n:"advance",this.adapter.visitProposedToLocationWithAction(t,r)):window.location=t:void 0},e.prototype.startVisitToLocationWithAction=function(t,e,r){var n;return Turbolinks.supported?(n=this.getRestorationDataForIdentifier(r),this.startVisit(t,e,{restorationData:n})):window.location=t},e.prototype.setProgressBarDelay=function(t){return this.progressBarDelay=t},e.prototype.startHistory=function(){return this.location=Turbolinks.Location.wrap(window.location),this.restorationIdentifier=Turbolinks.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},e.prototype.stopHistory=function(){return this.history.stop()},e.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(t,e){return this.restorationIdentifier=e,this.location=Turbolinks.Location.wrap(t),this.history.push(this.location,this.restorationIdentifier)},e.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(t,e){return this.restorationIdentifier=e,this.location=Turbolinks.Location.wrap(t),this.history.replace(this.location,this.restorationIdentifier)},e.prototype.historyPoppedToLocationWithRestorationIdentifier=function(t,e){var r;return this.restorationIdentifier=e,this.enabled?(r=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(t,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:r,historyChanged:!0}),this.location=Turbolinks.Location.wrap(t)):this.adapter.pageInvalidated()},e.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},e.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},e.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},e.prototype.scrollToAnchor=function(t){var e;return(e=this.view.getElementForAnchor(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},e.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},e.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},e.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},e.prototype.render=function(t,e){return this.view.render(t,e)},e.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},e.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},e.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},e.prototype.pageLoaded=function(){
return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},e.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},e.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},e.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},e.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},e.prototype.notifyApplicationAfterClickingLinkToLocation=function(t,e){return Turbolinks.dispatch("turbolinks:click",{target:t,data:{url:e.absoluteURL},cancelable:!0})},e.prototype.notifyApplicationBeforeVisitingLocation=function(t){return Turbolinks.dispatch("turbolinks:before-visit",{data:{url:t.absoluteURL},cancelable:!0})},e.prototype.notifyApplicationAfterVisitingLocation=function(t){return Turbolinks.dispatch("turbolinks:visit",{data:{url:t.absoluteURL}})},e.prototype.notifyApplicationBeforeCachingSnapshot=function(){return Turbolinks.dispatch("turbolinks:before-cache")},e.prototype.notifyApplicationBeforeRender=function(t){return Turbolinks.dispatch("turbolinks:before-render",{data:{newBody:t}})},e.prototype.notifyApplicationAfterRender=function(){return Turbolinks.dispatch("turbolinks:render")},e.prototype.notifyApplicationAfterPageLoad=function(t){return null==t&&(t={}),Turbolinks.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:t}})},e.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},e.prototype.createVisit=function(t,e,r){var n,o,i,s,a;return o=null!=r?r:{},s=o.restorationIdentifier,i=o.restorationData,n=o.historyChanged,a=new Turbolinks.Visit(this,t,e),a.restorationIdentifier=null!=s?s:Turbolinks.uuid(),a.restorationData=Turbolinks.copyObject(i),a.historyChanged=n,a.referrer=this.location,a},e.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},e.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},e.prototype.getVisitableLinkForNode=function(t){return this.nodeIsVisitable(t)?Turbolinks.closest(t,"a[href]:not([target]):not([download])"):void 0},e.prototype.getVisitableLocationForLink=function(t){var e;return e=new Turbolinks.Location(t.getAttribute("href")),this.locationIsVisitable(e)?e:void 0},e.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},e.prototype.nodeIsVisitable=function(t){var e;return(e=Turbolinks.closest(t,"[data-turbolinks]"))?"false"!==e.getAttribute("data-turbolinks"):!0},e.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},e.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},e.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},e}()}.call(this),function(){!function(){var t,e;if((t=e=document.currentScript)&&!e.hasAttribute("data-turbolinks-suppress-warning"))for(;t=t.parentNode;)if(t===document.body)return console.warn("You are loading Turbolinks from a <script> element inside the <body> element. This is probably not what you meant to do!\n\nLoad your application\u2019s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.\n\nFor more information, see: https://github.com/turbolinks/turbolinks#working-with-script-elements\n\n\u2014\u2014\nSuppress this warning by adding a `data-turbolinks-suppress-warning` attribute to: %s",e.outerHTML)}()}.call(this),function(){var t,e,r;Turbolinks.start=function(){return e()?(null==Turbolinks.controller&&(Turbolinks.controller=t()),Turbolinks.controller.start()):void 0},e=function(){return null==window.Turbolinks&&(window.Turbolinks=Turbolinks),r()},t=function(){var t;return t=new Turbolinks.Controller,t.adapter=new Turbolinks.BrowserAdapter(t),t},r=function(){return window.Turbolinks===Turbolinks},r()&&Turbolinks.start()}.call(this);
"use strict";$(window).on("load",function(){setTimeout(function(){$(".page-loader").fadeOut()},500)}),$(window).on("scroll",function(){$(window).scrollTop()>=20?$(".header").addClass("header--scrolled"):$(".header").removeClass("header--scrolled")}),$(document).ready(function(){if($(".clock")[0]){var a=new Date;a.setDate(a.getDate()),setInterval(function(){var a=(new Date).getSeconds();$(".time__sec").html((a<10?"0":"")+a)},1e3),setInterval(function(){var a=(new Date).getMinutes();$(".time__min").html((a<10?"0":"")+a)},1e3),setInterval(function(){var a=(new Date).getHours();$(".time__hours").html((a<10?"0":"")+a)},1e3)}$("body").on("click",".themes__item",function(a){a.preventDefault(),$(".themes__item").removeClass("active"),$(this).addClass("active");var b=$(this).data("sa-value");$("body").attr("data-sa-theme",b)}),$("body").on("focus",".search__text",function(){$(this).closest(".search").addClass("search--focus")}),$("body").on("blur",".search__text",function(){$(this).val(""),$(this).closest(".search").removeClass("search--focus")}),$("body").on("click",".navigation__sub > a",function(a){a.preventDefault(),$(this).parent().toggleClass("navigation__sub--toggled"),$(this).next("ul").slideToggle(250)}),$(".form-group--float")[0]&&($(".form-group--float").each(function(){0==!$(this).find(".form-control").val().length&&$(this).find(".form-control").addClass("form-control--active")}),$("body").on("blur",".form-group--float .form-control",function(){0==$(this).val().length?$(this).removeClass("form-control--active"):$(this).addClass("form-control--active")})),$("body").on("click",".dropdown-menu--active",function(a){a.stopPropagation()})}),$("#dropzone-upload")[0]&&(Dropzone.autoDiscover=!1),$(document).ready(function(){if($("#data-table")[0]){$("#data-table").DataTable({autoWidth:!1,responsive:!0,lengthMenu:[[15,30,45,-1],["15 Rows","30 Rows","45 Rows","Everything"]],language:{searchPlaceholder:"Search for records..."},dom:"Blfrtip",buttons:[{extend:"excelHtml5",title:"Export Data"},{extend:"csvHtml5",title:"Export Data"},{extend:"print",title:"Material Admin"}],initComplete:function(a,b){$(this).closest(".dataTables_wrapper").prepend('<div class="dataTables_buttons hidden-sm-down actions"><span class="actions__item zmdi zmdi-print" data-table-action="print" /><span class="actions__item zmdi zmdi-fullscreen" data-table-action="fullscreen" /><div class="dropdown actions__item"><i data-toggle="dropdown" class="zmdi zmdi-download" /><ul class="dropdown-menu dropdown-menu-right"><a href="" class="dropdown-item" data-table-action="excel">Excel (.xlsx)</a><a href="" class="dropdown-item" data-table-action="csv">CSV (.csv)</a></ul></div></div>')}}),$("body").on("click","[data-table-action]",function(a){a.preventDefault();var b=$(this).data("table-action");if("excel"===b&&$(this).closest(".dataTables_wrapper").find(".buttons-excel").trigger("click"),"csv"===b&&$(this).closest(".dataTables_wrapper").find(".buttons-csv").trigger("click"),"print"===b&&$(this).closest(".dataTables_wrapper").find(".buttons-print").trigger("click"),"fullscreen"===b){var c=$(this).closest(".card");c.hasClass("card--fullscreen")?(c.removeClass("card--fullscreen"),$("body").removeClass("data-table-toggled")):(c.addClass("card--fullscreen"),$("body").addClass("data-table-toggled"))}})}if($(".textarea-autosize")[0]&&autosize($(".textarea-autosize")),$("input-mask")[0]&&$(".input-mask").mask(),$("select.select2")[0]){var a=$(".select2-parent")[0]?$(".select2-parent"):$("body");$("select.select2").select2({dropdownAutoWidth:!0,width:"100%",dropdownParent:a})}if($("#dropzone-upload")[0]&&$("#dropzone-upload").dropzone({url:"/file/post",addRemoveLinks:!0}),$(".datetime-picker")[0]&&$(".datetime-picker").flatpickr({enableTime:!0,nextArrow:'<i class="zmdi zmdi-long-arrow-right" />',prevArrow:'<i class="zmdi zmdi-long-arrow-left" />'}),$(".date-picker")[0]&&$(".date-picker").flatpickr({enableTime:!1,nextArrow:'<i class="zmdi zmdi-long-arrow-right" />',prevArrow:'<i class="zmdi zmdi-long-arrow-left" />'}),$(".time-picker")[0]&&$(".time-picker").flatpickr({noCalendar:!0,enableTime:!0}),$("#input-slider")[0]){var b=document.getElementById("input-slider");noUiSlider.create(b,{start:[20],connect:"lower",range:{min:0,max:100}}),b.noUiSlider.on("update",function(a,b){document.getElementById("input-slider-value").value=a[b]})}if($("#input-slider-range")[0]){var c=document.getElementById("input-slider-range"),d=document.getElementById("input-slider-range-value-1"),e=document.getElementById("input-slider-range-value-2"),f=[d,e];noUiSlider.create(c,{start:[20,80],connect:!0,range:{min:0,max:100}}),c.noUiSlider.on("update",function(a,b){f[b].value=a[b]})}if($(".input-slider")[0])for(var g=document.getElementsByClassName("input-slider"),h=0;h<g.length;h++)noUiSlider.create(g[h],{start:[20],connect:"lower",range:{min:0,max:100}});if($(".color-picker")[0]&&($(".color-picker__value").colorpicker(),$("body").on("change",".color-picker__value",function(){$(this).closest(".color-picker").find(".color-picker__preview").css("backgroundColor",$(this).val())})),$(".wysiwyg-editor")[0]&&$(".wysiwyg-editor").trumbowyg({autogrow:!0}),$(".lightbox")[0]&&$(".lightbox").lightGallery({enableTouch:!0}),$('[data-toggle="popover"]')[0]&&$('[data-toggle="popover"]').popover(),$('[data-toggle="tooltip"]')[0]&&$('[data-toggle="tooltip"]').tooltip(),$(".widget-calendar__body")[0]){$(".widget-calendar__body").fullCalendar({contentHeight:"auto",theme:!1,buttonIcons:{prev:" zmdi zmdi-long-arrow-left",next:" zmdi zmdi-long-arrow-right"},header:{right:"next",center:"title, ",left:"prev"},defaultDate:"2016-08-12",editable:!0,events:[{title:"Dolor Pellentesque",start:"2016-08-01"},{title:"Purus Nibh",start:"2016-08-07"},{title:"Amet Condimentum",start:"2016-08-09"},{title:"Tellus",start:"2016-08-12"},{title:"Vestibulum",start:"2016-08-18"},{title:"Ipsum",start:"2016-08-24"},{title:"Fringilla Sit",start:"2016-08-27"},{title:"Amet Pharetra",url:"http://google.com/",start:"2016-08-30"}]});var i=moment().format("YYYY"),j=moment().format("dddd, MMM D");$(".widget-calendar__year").html(i),$(".widget-calendar__day").html(j)}if($(".notes__body")[0]){var k;$(".notes__body").each(function(a,b){k=$(this).prev().is(".notes__title")?4:6,$clamp(b,{clamp:k})})}$(".scrollbar-inner")[0]&&$(".scrollbar-inner").scrollbar().scrollLock();var l=[{name:"node1",children:[{name:"node1_1",children:[{name:"node1_1_1"},{name:"node1_1_2"},{name:"node1_1_3"}]},{name:"node1_2"},{name:"node1_3"}]},{name:"node2",children:[{name:"node2_1"},{name:"node2_2"},{name:"node2_3"}]},{name:"node3",children:[{name:"node3_1"},{name:"node3_2"},{name:"node3_3"}]}],m=[{name:"node1",children:[{name:"node1_1"},{name:"node1_2"},{name:"node1_3"}]},{name:"node2",children:[{name:"node2_1"},{name:"node2_2"},{name:"node2_3"}]}],n=[{label:"node1",children:[{name:'<a href="example1.html">node1_1</a>'},{name:'<a href="example2.html">node1_2</a>'},'<a href="example3.html">Example </a>']}];$(".treeview")[0]&&$(".treeview").tree({data:l,closedIcon:$('<i class="zmdi zmdi-plus"></i>'),openedIcon:$('<i class="zmdi zmdi-minus"></i>')}),$(".treeview-expanded")[0]&&$(".treeview-expanded").tree({data:m,autoOpen:!0,closedIcon:$('<i class="zmdi zmdi-plus"></i>'),openedIcon:$('<i class="zmdi zmdi-minus"></i>')}),$(".treeview-drag")[0]&&$(".treeview-drag").tree({data:m,dragAndDrop:!0,autoOpen:!0,closedIcon:$('<i class="zmdi zmdi-plus"></i>'),openedIcon:$('<i class="zmdi zmdi-minus"></i>')}),$(".treeview-drag")[0]&&$(".treeview-drag").tree({data:m,dragAndDrop:!0,autoOpen:!0,closedIcon:$('<i class="zmdi zmdi-plus"></i>'),openedIcon:$('<i class="zmdi zmdi-minus"></i>')}),$(".treeview-escape")[0]&&$(".treeview-escape").tree({data:n,autoEscape:!1,autoOpen:!0,closedIcon:$('<i class="zmdi zmdi-plus"></i>'),openedIcon:$('<i class="zmdi zmdi-minus"></i>')}),$(".rating")[0]&&$(".rating").each(function(){var a=$(this).data("rating");$(this).rateYo({rating:a,normalFill:"rgba(255,255,255,0.3)",ratedFill:"#ffc107"})}),$(".text-counter")[0]&&$(".text-counter").each(function(){var a=$(this).data("min-length")||0,b=$(this).data("max-length");$(this).textcounter({min:a,max:b,countDown:!0,inputErrorClass:"is-invalid",counterErrorClass:"text-orange"})})}),$(document).ready(function(){function a(a){a.requestFullscreen?a.requestFullscreen():a.mozRequestFullScreen?a.mozRequestFullScreen():a.webkitRequestFullscreen?a.webkitRequestFullscreen():a.msRequestFullscreen&&a.msRequestFullscreen()}$("body").on("click","[data-sa-action]",function(b){b.preventDefault();var c=$(this),d=c.data("sa-action"),e="";switch(d){case"search-open":$(".search").addClass("search--toggled");break;case"search-close":$(".search").removeClass("search--toggled");break;case"aside-open":e=c.data("sa-target"),c.addClass("toggled"),$("body").addClass("aside-toggled"),$(e).addClass("toggled"),$(".content, .header").append('<div class="sa-backdrop" data-sa-action="aside-close" data-sa-target='+e+" />");break;case"aside-close":e=c.data("sa-target"),$("body").removeClass("aside-toggled"),$('[data-sa-action="aside-open"], '+e).removeClass("toggled"),$(".content, .header").find(".sa-backdrop").remove();break;case"fullscreen":a(document.documentElement);break;case"print":window.print();break;case"login-switch":e=c.data("sa-target"),$(".login__block").removeClass("active"),$(e).addClass("active");break;case"notifications-clear":b.stopPropagation();var f=$(".top-nav__notifications .listview__item"),g=f.length,h=0;c.fadeOut(),f.each(function(){var a=$(this);setTimeout(function(){a.addClass("animated fadeOutRight")},h+=150)}),setTimeout(function(){f.remove(),$(".top-nav__notifications").addClass("top-nav__notifications--cleared")},180*g);break;case"toolbar-search-open":$(this).closest(".toolbar").find(".toolbar__search").fadeIn(200),$(this).closest(".toolbar").find(".toolbar__search input").focus();break;case"toolbar-search-close":$(this).closest(".toolbar").find(".toolbar__search input").val(""),$(this).closest(".toolbar").find(".toolbar__search").fadeOut(200)}})});
/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.12.5
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const nativeHints = ['native code', '[object MutationObserverConstructor]'];

/**
 * Determine if a function is implemented natively (as opposed to a polyfill).
 * @method
 * @memberof Popper.Utils
 * @argument {Function | undefined} fn the function to check
 * @returns {Boolean}
 */
var isNative = (fn => nativeHints.some(hint => (fn || '').toString().indexOf(hint) > -1));

const isBrowser = typeof window !== 'undefined';
const longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
let timeoutDuration = 0;
for (let i = 0; i < longerTimeoutBrowsers.length; i += 1) {
  if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
    timeoutDuration = 1;
    break;
  }
}

function microtaskDebounce(fn) {
  let scheduled = false;
  let i = 0;
  const elem = document.createElement('span');

  // MutationObserver provides a mechanism for scheduling microtasks, which
  // are scheduled *before* the next task. This gives us a way to debounce
  // a function but ensure it's called *before* the next paint.
  const observer = new MutationObserver(() => {
    fn();
    scheduled = false;
  });

  observer.observe(elem, { attributes: true });

  return () => {
    if (!scheduled) {
      scheduled = true;
      elem.setAttribute('x-index', i);
      i = i + 1; // don't use compund (+=) because it doesn't get optimized in V8
    }
  };
}

function taskDebounce(fn) {
  let scheduled = false;
  return () => {
    if (!scheduled) {
      scheduled = true;
      setTimeout(() => {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

// It's common for MutationObserver polyfills to be seen in the wild, however
// these rely on Mutation Events which only occur when an element is connected
// to the DOM. The algorithm used in this module does not use a connected element,
// and so we must ensure that a *native* MutationObserver is available.
const supportsNativeMutationObserver = isBrowser && isNative(window.MutationObserver);

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce = supportsNativeMutationObserver ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  const getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  const css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element || ['HTML', 'BODY', '#document'].indexOf(element.nodeName) !== -1) {
    return window.document.body;
  }

  // Firefox want us to check `-x` and `-y` variations as well
  const { overflow, overflowX, overflowY } = getStyleComputedProperty(element);
  if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  // NOTE: 1 DOM access here
  const offsetParent = element && element.offsetParent;
  const nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return window.document.documentElement;
  }

  // .offsetParent will return the closest TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  const { nodeName } = element;
  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return window.document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  const order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  const start = order ? element1 : element2;
  const end = order ? element2 : element1;

  // Get common ancestor container
  const range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  const { commonAncestorContainer } = range;

  // Both nodes are inside #document
  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  const element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
function getScroll(element, side = 'top') {
  const upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  const nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    const html = window.document.documentElement;
    const scrollingElement = window.document.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element, subtract = false) {
  const scrollTop = getScroll(element, 'top');
  const scrollLeft = getScroll(element, 'left');
  const modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  const sideA = axis === 'x' ? 'Left' : 'Top';
  const sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return +styles[`border${sideA}Width`].split('px')[0] + +styles[`border${sideB}Width`].split('px')[0];
}

/**
 * Tells if you are running Internet Explorer 10
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean} isIE10
 */
let isIE10 = undefined;

var isIE10$1 = function () {
  if (isIE10 === undefined) {
    isIE10 = navigator.appVersion.indexOf('MSIE 10') !== -1;
  }
  return isIE10;
};

function getSize(axis, body, html, computedStyle) {
  return Math.max(body[`offset${axis}`], body[`scroll${axis}`], html[`client${axis}`], html[`offset${axis}`], html[`scroll${axis}`], isIE10$1() ? html[`offset${axis}`] + computedStyle[`margin${axis === 'Height' ? 'Top' : 'Left'}`] + computedStyle[`margin${axis === 'Height' ? 'Bottom' : 'Right'}`] : 0);
}

function getWindowSizes() {
  const body = window.document.body;
  const html = window.document.documentElement;
  const computedStyle = isIE10$1() && window.getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  let rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  if (isIE10$1()) {
    try {
      rect = element.getBoundingClientRect();
      const scrollTop = getScroll(element, 'top');
      const scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } catch (err) {}
  } else {
    rect = element.getBoundingClientRect();
  }

  const result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  const sizes = element.nodeName === 'HTML' ? getWindowSizes() : {};
  const width = sizes.width || element.clientWidth || result.right - result.left;
  const height = sizes.height || element.clientHeight || result.bottom - result.top;

  let horizScrollbar = element.offsetWidth - width;
  let vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    const styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  const isIE10 = isIE10$1();
  const isHTML = parent.nodeName === 'HTML';
  const childrenRect = getBoundingClientRect(children);
  const parentRect = getBoundingClientRect(parent);
  const scrollParent = getScrollParent(children);

  const styles = getStyleComputedProperty(parent);
  const borderTopWidth = +styles.borderTopWidth.split('px')[0];
  const borderLeftWidth = +styles.borderLeftWidth.split('px')[0];

  let offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    const marginTop = +styles.marginTop.split('px')[0];
    const marginLeft = +styles.marginLeft.split('px')[0];

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  const html = window.document.documentElement;
  const relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  const width = Math.max(html.clientWidth, window.innerWidth || 0);
  const height = Math.max(html.clientHeight, window.innerHeight || 0);

  const scrollTop = getScroll(html);
  const scrollLeft = getScroll(html, 'left');

  const offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width,
    height
  };

  return getClientRect(offset);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
  const nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  return isFixed(getParentNode(element));
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  // NOTE: 1 DOM access here
  let boundaries = { top: 0, left: 0 };
  const offsetParent = findCommonOffsetParent(popper, reference);

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent);
  } else {
    // Handle other cases based on DOM element used as boundaries
    let boundariesNode;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(popper));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = window.document.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = window.document.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    const offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      const { height, width } = getWindowSizes();
      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  boundaries.left += padding;
  boundaries.top += padding;
  boundaries.right -= padding;
  boundaries.bottom -= padding;

  return boundaries;
}

function getArea({ width, height }) {
  return width * height;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement, padding = 0) {
  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  const boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  const rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  const sortedAreas = Object.keys(rects).map(key => _extends({
    key
  }, rects[key], {
    area: getArea(rects[key])
  })).sort((a, b) => b.area - a.area);

  const filteredAreas = sortedAreas.filter(({ width, height }) => width >= popper.clientWidth && height >= popper.clientHeight);

  const computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  const variation = placement.split('-')[1];

  return computedPlacement + (variation ? `-${variation}` : '');
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  const commonOffsetParent = findCommonOffsetParent(popper, reference);
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
  const styles = window.getComputedStyle(element);
  const x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
  const y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
  const result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  const hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, matched => hash[matched]);
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  const popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  const popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  const isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  const mainSide = isHoriz ? 'top' : 'left';
  const secondarySide = isHoriz ? 'left' : 'top';
  const measurement = isHoriz ? 'height' : 'width';
  const secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(cur => cur[prop] === value);
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  const match = find(arr, obj => obj[prop] === value);
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  const modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(modifier => {
    if (modifier.function) {
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    const fn = modifier.function || modifier.fn;
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  let data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
  data.offsets.popper.position = 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(({ name, enabled }) => enabled && name === modifierName);
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  const prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  const upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (let i = 0; i < prefixes.length - 1; i++) {
    const prefix = prefixes[i];
    const toCheck = prefix ? `${prefix}${upperProp}` : property;
    if (typeof window.document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
}

/**
 * Destroy the popper
 * @method
 * @memberof Popper
 */
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.left = '';
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners();

  // remove the popper if user explicity asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  const isBody = scrollParent.nodeName === 'BODY';
  const target = isBody ? window : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  window.addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  const scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  window.removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(target => {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger onUpdate callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    window.cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(prop => {
    let unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    const value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper.
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  const referenceOffsets = getReferenceOffsets(state, popper, reference);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  const placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  const { x, y } = options;
  const { popper } = data.offsets;

  // Remove this legacy support in Popper.js v2
  const legacyGpuAccelerationOption = find(data.instance.modifiers, modifier => modifier.name === 'applyStyle').gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  const gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  const offsetParent = getOffsetParent(data.instance.popper);
  const offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  const styles = {
    position: popper.position
  };

  // floor sides to avoid blurry text
  const offsets = {
    left: Math.floor(popper.left),
    top: Math.floor(popper.top),
    bottom: Math.floor(popper.bottom),
    right: Math.floor(popper.right)
  };

  const sideA = x === 'bottom' ? 'top' : 'bottom';
  const sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  const prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  let left, top;
  if (sideA === 'bottom') {
    top = -offsetParentRect.height + offsets.bottom;
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    left = -offsetParentRect.width + offsets.right;
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = `translate3d(${left}px, ${top}px, 0)`;
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    const invertTop = sideA === 'bottom' ? -1 : 1;
    const invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = `${sideA}, ${sideB}`;
  }

  // Attributes
  const attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  const requesting = find(modifiers, ({ name }) => name === requestingName);

  const isRequired = !!requesting && modifiers.some(modifier => {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    const requesting = `\`${requestingName}\``;
    const requested = `\`${requestedName}\``;
    console.warn(`${requested} modifier is required by ${requesting} modifier in order to work, be sure to include it before ${requesting}!`);
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  let arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  const placement = data.placement.split('-')[0];
  const { popper, reference } = data.offsets;
  const isVertical = ['left', 'right'].indexOf(placement) !== -1;

  const len = isVertical ? 'height' : 'width';
  const sideCapitalized = isVertical ? 'Top' : 'Left';
  const side = sideCapitalized.toLowerCase();
  const altSide = isVertical ? 'left' : 'top';
  const opSide = isVertical ? 'bottom' : 'right';
  const arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjuction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }

  // compute center of the popper
  const center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  const popperMarginSide = getStyleComputedProperty(data.instance.popper, `margin${sideCapitalized}`).replace('px', '');
  let sideValue = center - getClientRect(data.offsets.popper)[side] - popperMarginSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = {};
  data.offsets.arrow[side] = Math.round(sideValue);
  data.offsets.arrow[altSide] = ''; // make sure to unset any eventual altSide value from the DOM node

  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-right` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
const validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement, counter = false) {
  const index = validPlacements.indexOf(placement);
  const arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

const BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  const boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement);

  let placement = data.placement.split('-')[0];
  let placementOpposite = getOppositePlacement(placement);
  let variation = data.placement.split('-')[1] || '';

  let flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach((step, index) => {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    const popperOffsets = data.offsets.popper;
    const refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    const floor = Math.floor;
    const overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    const overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    const overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    const overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    const overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    const overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    const isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    const flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  const { popper, reference } = data.offsets;
  const placement = data.placement.split('-')[0];
  const floor = Math.floor;
  const isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  const side = isVertical ? 'right' : 'bottom';
  const opSide = isVertical ? 'left' : 'top';
  const measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  const split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  const value = +split[1];
  const unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    let element;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    const rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    let size;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  const offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  const useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  const fragments = offset.split(/(\+|\-)/).map(frag => frag.trim());

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  const divider = fragments.indexOf(find(fragments, frag => frag.search(/,|\s/) !== -1));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  const splitRegex = /\s*,\s*|\s+/;
  let ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map((op, index) => {
    // Most of the units rely on the orientation of the popper
    const measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    let mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce((a, b) => {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(str => toValue(str, measurement, popperOffsets, referenceOffsets));
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach((op, index) => {
    op.forEach((frag, index2) => {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset(data, { offset }) {
  const { placement, offsets: { popper, reference } } = data;
  const basePlacement = placement.split('-')[0];

  let offsets;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  let boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  const boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement);
  options.boundaries = boundaries;

  const order = options.priority;
  let popper = data.offsets.popper;

  const check = {
    primary(placement) {
      let value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return { [placement]: value };
    },
    secondary(placement) {
      const mainSide = placement === 'right' ? 'left' : 'top';
      let value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return { [mainSide]: value };
    }
  };

  order.forEach(placement => {
    const side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends({}, popper, check[side](placement));
  });

  data.offsets.popper = popper;

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  const placement = data.placement;
  const basePlacement = placement.split('-')[0];
  const shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    const { reference, popper } = data.offsets;
    const isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    const side = isVertical ? 'left' : 'top';
    const measurement = isVertical ? 'width' : 'height';

    const shiftOffsets = {
      start: { [side]: reference[side] },
      end: {
        [side]: reference[side] + reference[measurement] - popper[measurement]
      }
    };

    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  const refRect = data.offsets.reference;
  const bound = find(data.instance.modifiers, modifier => modifier.name === 'preventOverflow').boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  const placement = data.placement;
  const basePlacement = placement.split('-')[0];
  const { popper, reference } = data.offsets;
  const isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  const subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unitless, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the height.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > More on this [reading this issue](https://github.com/FezVrasta/popper.js/issues/373)
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * An scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper this makes sure the popper has always a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier, can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near eachothers
   * without leaving any gap between the two. Expecially useful when the arrow is
   * enabled and you want to assure it to point to its reference element.
   * It cares only about the first axis, you can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjuction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations).
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position,
     * the popper will never be placed outside of the defined boundaries
     * (except if keepTogether is enabled)
     */
    boundariesElement: 'viewport'
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3d transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties.
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define you own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3d transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties.
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the informations used by Popper.js
 * this object get passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper.
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper, it expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow, it expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements.
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overriden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass as 3rd argument an object with the same
 * structure of this object, example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Whether events (resize, scroll) are initially enabled
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: () => {},

  /**
   * Callback called when the popper is updated, this callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: () => {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js
   * @prop {modifiers}
   */
  modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
class Popper {
  /**
   * Create a new Popper.js instance
   * @class Popper
   * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper.
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  constructor(reference, popper, options = {}) {
    this.scheduleUpdate = () => requestAnimationFrame(this.update);

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference.jquery ? reference[0] : reference;
    this.popper = popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(name => {
      this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(name => _extends({
      name
    }, this.options.modifiers[name]))
    // sort the modifiers by order
    .sort((a, b) => a.order - b.order);

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(modifierOptions => {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(this.reference, this.popper, this.options, modifierOptions, this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    const eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs
  update() {
    return update.call(this);
  }
  destroy() {
    return destroy.call(this);
  }
  enableEventListeners() {
    return enableEventListeners.call(this);
  }
  disableEventListeners() {
    return disableEventListeners.call(this);
  }

  /**
   * Schedule an update, it will run on the next UI update available
   * @method scheduleUpdate
   * @memberof Popper
   */


  /**
   * Collection of utilities useful when writing custom modifiers.
   * Starting from version 1.7, this method is available only if you
   * include `popper-utils.js` before `popper.js`.
   *
   * **DEPRECATION**: This way to access PopperUtils is deprecated
   * and will be removed in v2! Use the PopperUtils module directly instead.
   * Due to the high instability of the methods contained in Utils, we can't
   * guarantee them to follow semver. Use them at your own risk!
   * @static
   * @private
   * @type {Object}
   * @deprecated since version 1.8
   * @member Utils
   * @memberof Popper
   */
}

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */

Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

// export default Popper;
//# sourceMappingURL=popper.js.map
;
/*!
 * Bootstrap v4.0.0-beta (https://getbootstrap.com)
 * Copyright 2011-2017 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");!function(t){var e=jQuery.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1==e[0]&&9==e[1]&&e[2]<1||e[0]>=4)throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")}(),function(){function t(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function e(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=function(t){function e(t){return{}.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}function n(t){return(t[0]||t).nodeType}function i(){return{bindType:s.end,delegateType:s.end,handle:function(e){if(t(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}}}function o(){if(window.QUnit)return!1;var t=document.createElement("bootstrap");for(var e in a)if(void 0!==t.style[e])return{end:a[e]};return!1}function r(e){var n=this,i=!1;return t(this).one(l.TRANSITION_END,function(){i=!0}),setTimeout(function(){i||l.triggerTransitionEnd(n)},e),this}var s=!1,a={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},l={TRANSITION_END:"bsTransitionEnd",getUID:function(t){do{t+=~~(1e6*Math.random())}while(document.getElementById(t));return t},getSelectorFromElement:function(e){var n=e.getAttribute("data-target");n&&"#"!==n||(n=e.getAttribute("href")||"");try{return t(n).length>0?n:null}catch(t){return null}},reflow:function(t){return t.offsetHeight},triggerTransitionEnd:function(e){t(e).trigger(s.end)},supportsTransitionEnd:function(){return Boolean(s)},typeCheckConfig:function(t,i,o){for(var r in o)if(o.hasOwnProperty(r)){var s=o[r],a=i[r],l=a&&n(a)?"element":e(a);if(!new RegExp(s).test(l))throw new Error(t.toUpperCase()+': Option "'+r+'" provided type "'+l+'" but expected type "'+s+'".')}}};return s=o(),t.fn.emulateTransitionEnd=r,l.supportsTransitionEnd()&&(t.event.special[l.TRANSITION_END]=i()),l}(jQuery),s=(function(t){var e="alert",i=t.fn[e],s={DISMISS:'[data-dismiss="alert"]'},a={CLOSE:"close.bs.alert",CLOSED:"closed.bs.alert",CLICK_DATA_API:"click.bs.alert.data-api"},l={ALERT:"alert",FADE:"fade",SHOW:"show"},h=function(){function e(t){n(this,e),this._element=t}return e.prototype.close=function(t){t=t||this._element;var e=this._getRootElement(t);this._triggerCloseEvent(e).isDefaultPrevented()||this._removeElement(e)},e.prototype.dispose=function(){t.removeData(this._element,"bs.alert"),this._element=null},e.prototype._getRootElement=function(e){var n=r.getSelectorFromElement(e),i=!1;return n&&(i=t(n)[0]),i||(i=t(e).closest("."+l.ALERT)[0]),i},e.prototype._triggerCloseEvent=function(e){var n=t.Event(a.CLOSE);return t(e).trigger(n),n},e.prototype._removeElement=function(e){var n=this;t(e).removeClass(l.SHOW),r.supportsTransitionEnd()&&t(e).hasClass(l.FADE)?t(e).one(r.TRANSITION_END,function(t){return n._destroyElement(e,t)}).emulateTransitionEnd(150):this._destroyElement(e)},e.prototype._destroyElement=function(e){t(e).detach().trigger(a.CLOSED).remove()},e._jQueryInterface=function(n){return this.each(function(){var i=t(this),o=i.data("bs.alert");o||(o=new e(this),i.data("bs.alert",o)),"close"===n&&o[n](this)})},e._handleDismiss=function(t){return function(e){e&&e.preventDefault(),t.close(this)}},o(e,null,[{key:"VERSION",get:function(){return"4.0.0-beta"}}]),e}();t(document).on(a.CLICK_DATA_API,s.DISMISS,h._handleDismiss(new h)),t.fn[e]=h._jQueryInterface,t.fn[e].Constructor=h,t.fn[e].noConflict=function(){return t.fn[e]=i,h._jQueryInterface}}(jQuery),function(t){var e="button",i=t.fn[e],r={ACTIVE:"active",BUTTON:"btn",FOCUS:"focus"},s={DATA_TOGGLE_CARROT:'[data-toggle^="button"]',DATA_TOGGLE:'[data-toggle="buttons"]',INPUT:"input",ACTIVE:".active",BUTTON:".btn"},a={CLICK_DATA_API:"click.bs.button.data-api",FOCUS_BLUR_DATA_API:"focus.bs.button.data-api blur.bs.button.data-api"},l=function(){function e(t){n(this,e),this._element=t}return e.prototype.toggle=function(){var e=!0,n=!0,i=t(this._element).closest(s.DATA_TOGGLE)[0];if(i){var o=t(this._element).find(s.INPUT)[0];if(o){if("radio"===o.type)if(o.checked&&t(this._element).hasClass(r.ACTIVE))e=!1;else{var a=t(i).find(s.ACTIVE)[0];a&&t(a).removeClass(r.ACTIVE)}if(e){if(o.hasAttribute("disabled")||i.hasAttribute("disabled")||o.classList.contains("disabled")||i.classList.contains("disabled"))return;o.checked=!t(this._element).hasClass(r.ACTIVE),t(o).trigger("change")}o.focus(),n=!1}}n&&this._element.setAttribute("aria-pressed",!t(this._element).hasClass(r.ACTIVE)),e&&t(this._element).toggleClass(r.ACTIVE)},e.prototype.dispose=function(){t.removeData(this._element,"bs.button"),this._element=null},e._jQueryInterface=function(n){return this.each(function(){var i=t(this).data("bs.button");i||(i=new e(this),t(this).data("bs.button",i)),"toggle"===n&&i[n]()})},o(e,null,[{key:"VERSION",get:function(){return"4.0.0-beta"}}]),e}();t(document).on(a.CLICK_DATA_API,s.DATA_TOGGLE_CARROT,function(e){e.preventDefault();var n=e.target;t(n).hasClass(r.BUTTON)||(n=t(n).closest(s.BUTTON)),l._jQueryInterface.call(t(n),"toggle")}).on(a.FOCUS_BLUR_DATA_API,s.DATA_TOGGLE_CARROT,function(e){var n=t(e.target).closest(s.BUTTON)[0];t(n).toggleClass(r.FOCUS,/^focus(in)?$/.test(e.type))}),t.fn[e]=l._jQueryInterface,t.fn[e].Constructor=l,t.fn[e].noConflict=function(){return t.fn[e]=i,l._jQueryInterface}}(jQuery),function(t){var e="carousel",s="bs.carousel",a="."+s,l=t.fn[e],h={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0},c={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean"},u={NEXT:"next",PREV:"prev",LEFT:"left",RIGHT:"right"},d={SLIDE:"slide"+a,SLID:"slid"+a,KEYDOWN:"keydown"+a,MOUSEENTER:"mouseenter"+a,MOUSELEAVE:"mouseleave"+a,TOUCHEND:"touchend"+a,LOAD_DATA_API:"load.bs.carousel.data-api",CLICK_DATA_API:"click.bs.carousel.data-api"},f={CAROUSEL:"carousel",ACTIVE:"active",SLIDE:"slide",RIGHT:"carousel-item-right",LEFT:"carousel-item-left",NEXT:"carousel-item-next",PREV:"carousel-item-prev",ITEM:"carousel-item"},p={ACTIVE:".active",ACTIVE_ITEM:".active.carousel-item",ITEM:".carousel-item",NEXT_PREV:".carousel-item-next, .carousel-item-prev",INDICATORS:".carousel-indicators",DATA_SLIDE:"[data-slide], [data-slide-to]",DATA_RIDE:'[data-ride="carousel"]'},_=function(){function l(e,i){n(this,l),this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this._config=this._getConfig(i),this._element=t(e)[0],this._indicatorsElement=t(this._element).find(p.INDICATORS)[0],this._addEventListeners()}return l.prototype.next=function(){this._isSliding||this._slide(u.NEXT)},l.prototype.nextWhenVisible=function(){document.hidden||this.next()},l.prototype.prev=function(){this._isSliding||this._slide(u.PREV)},l.prototype.pause=function(e){e||(this._isPaused=!0),t(this._element).find(p.NEXT_PREV)[0]&&r.supportsTransitionEnd()&&(r.triggerTransitionEnd(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null},l.prototype.cycle=function(t){t||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config.interval&&!this._isPaused&&(this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))},l.prototype.to=function(e){var n=this;this._activeElement=t(this._element).find(p.ACTIVE_ITEM)[0];var i=this._getItemIndex(this._activeElement);if(!(e>this._items.length-1||e<0))if(this._isSliding)t(this._element).one(d.SLID,function(){return n.to(e)});else{if(i===e)return this.pause(),void this.cycle();var o=e>i?u.NEXT:u.PREV;this._slide(o,this._items[e])}},l.prototype.dispose=function(){t(this._element).off(a),t.removeData(this._element,s),this._items=null,this._config=null,this._element=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null},l.prototype._getConfig=function(n){return n=t.extend({},h,n),r.typeCheckConfig(e,n,c),n},l.prototype._addEventListeners=function(){var e=this;this._config.keyboard&&t(this._element).on(d.KEYDOWN,function(t){return e._keydown(t)}),"hover"===this._config.pause&&(t(this._element).on(d.MOUSEENTER,function(t){return e.pause(t)}).on(d.MOUSELEAVE,function(t){return e.cycle(t)}),"ontouchstart"in document.documentElement&&t(this._element).on(d.TOUCHEND,function(){e.pause(),e.touchTimeout&&clearTimeout(e.touchTimeout),e.touchTimeout=setTimeout(function(t){return e.cycle(t)},500+e._config.interval)}))},l.prototype._keydown=function(t){if(!/input|textarea/i.test(t.target.tagName))switch(t.which){case 37:t.preventDefault(),this.prev();break;case 39:t.preventDefault(),this.next();break;default:return}},l.prototype._getItemIndex=function(e){return this._items=t.makeArray(t(e).parent().find(p.ITEM)),this._items.indexOf(e)},l.prototype._getItemByDirection=function(t,e){var n=t===u.NEXT,i=t===u.PREV,o=this._getItemIndex(e),r=this._items.length-1;if((i&&0===o||n&&o===r)&&!this._config.wrap)return e;var s=(o+(t===u.PREV?-1:1))%this._items.length;return-1===s?this._items[this._items.length-1]:this._items[s]},l.prototype._triggerSlideEvent=function(e,n){var i=this._getItemIndex(e),o=this._getItemIndex(t(this._element).find(p.ACTIVE_ITEM)[0]),r=t.Event(d.SLIDE,{relatedTarget:e,direction:n,from:o,to:i});return t(this._element).trigger(r),r},l.prototype._setActiveIndicatorElement=function(e){if(this._indicatorsElement){t(this._indicatorsElement).find(p.ACTIVE).removeClass(f.ACTIVE);var n=this._indicatorsElement.children[this._getItemIndex(e)];n&&t(n).addClass(f.ACTIVE)}},l.prototype._slide=function(e,n){var i=this,o=t(this._element).find(p.ACTIVE_ITEM)[0],s=this._getItemIndex(o),a=n||o&&this._getItemByDirection(e,o),l=this._getItemIndex(a),h=Boolean(this._interval),c=void 0,_=void 0,g=void 0;if(e===u.NEXT?(c=f.LEFT,_=f.NEXT,g=u.LEFT):(c=f.RIGHT,_=f.PREV,g=u.RIGHT),a&&t(a).hasClass(f.ACTIVE))this._isSliding=!1;else if(!this._triggerSlideEvent(a,g).isDefaultPrevented()&&o&&a){this._isSliding=!0,h&&this.pause(),this._setActiveIndicatorElement(a);var m=t.Event(d.SLID,{relatedTarget:a,direction:g,from:s,to:l});r.supportsTransitionEnd()&&t(this._element).hasClass(f.SLIDE)?(t(a).addClass(_),r.reflow(a),t(o).addClass(c),t(a).addClass(c),t(o).one(r.TRANSITION_END,function(){t(a).removeClass(c+" "+_).addClass(f.ACTIVE),t(o).removeClass(f.ACTIVE+" "+_+" "+c),i._isSliding=!1,setTimeout(function(){return t(i._element).trigger(m)},0)}).emulateTransitionEnd(600)):(t(o).removeClass(f.ACTIVE),t(a).addClass(f.ACTIVE),this._isSliding=!1,t(this._element).trigger(m)),h&&this.cycle()}},l._jQueryInterface=function(e){return this.each(function(){var n=t(this).data(s),o=t.extend({},h,t(this).data());"object"===(void 0===e?"undefined":i(e))&&t.extend(o,e);var r="string"==typeof e?e:o.slide;if(n||(n=new l(this,o),t(this).data(s,n)),"number"==typeof e)n.to(e);else if("string"==typeof r){if(void 0===n[r])throw new Error('No method named "'+r+'"');n[r]()}else o.interval&&(n.pause(),n.cycle())})},l._dataApiClickHandler=function(e){var n=r.getSelectorFromElement(this);if(n){var i=t(n)[0];if(i&&t(i).hasClass(f.CAROUSEL)){var o=t.extend({},t(i).data(),t(this).data()),a=this.getAttribute("data-slide-to");a&&(o.interval=!1),l._jQueryInterface.call(t(i),o),a&&t(i).data(s).to(a),e.preventDefault()}}},o(l,null,[{key:"VERSION",get:function(){return"4.0.0-beta"}},{key:"Default",get:function(){return h}}]),l}();t(document).on(d.CLICK_DATA_API,p.DATA_SLIDE,_._dataApiClickHandler),t(window).on(d.LOAD_DATA_API,function(){t(p.DATA_RIDE).each(function(){var e=t(this);_._jQueryInterface.call(e,e.data())})}),t.fn[e]=_._jQueryInterface,t.fn[e].Constructor=_,t.fn[e].noConflict=function(){return t.fn[e]=l,_._jQueryInterface}}(jQuery),function(t){var e="collapse",s="bs.collapse",a=t.fn[e],l={toggle:!0,parent:""},h={toggle:"boolean",parent:"string"},c={SHOW:"show.bs.collapse",SHOWN:"shown.bs.collapse",HIDE:"hide.bs.collapse",HIDDEN:"hidden.bs.collapse",CLICK_DATA_API:"click.bs.collapse.data-api"},u={SHOW:"show",COLLAPSE:"collapse",COLLAPSING:"collapsing",COLLAPSED:"collapsed"},d={WIDTH:"width",HEIGHT:"height"},f={ACTIVES:".show, .collapsing",DATA_TOGGLE:'[data-toggle="collapse"]'},p=function(){function a(e,i){n(this,a),this._isTransitioning=!1,this._element=e,this._config=this._getConfig(i),this._triggerArray=t.makeArray(t('[data-toggle="collapse"][href="#'+e.id+'"],[data-toggle="collapse"][data-target="#'+e.id+'"]'));for(var o=t(f.DATA_TOGGLE),s=0;s<o.length;s++){var l=o[s],h=r.getSelectorFromElement(l);null!==h&&t(h).filter(e).length>0&&this._triggerArray.push(l)}this._parent=this._config.parent?this._getParent():null,this._config.parent||this._addAriaAndCollapsedClass(this._element,this._triggerArray),this._config.toggle&&this.toggle()}return a.prototype.toggle=function(){t(this._element).hasClass(u.SHOW)?this.hide():this.show()},a.prototype.show=function(){var e=this;if(!this._isTransitioning&&!t(this._element).hasClass(u.SHOW)){var n=void 0,i=void 0;if(this._parent&&((n=t.makeArray(t(this._parent).children().children(f.ACTIVES))).length||(n=null)),!(n&&(i=t(n).data(s))&&i._isTransitioning)){var o=t.Event(c.SHOW);if(t(this._element).trigger(o),!o.isDefaultPrevented()){n&&(a._jQueryInterface.call(t(n),"hide"),i||t(n).data(s,null));var l=this._getDimension();t(this._element).removeClass(u.COLLAPSE).addClass(u.COLLAPSING),this._element.style[l]=0,this._triggerArray.length&&t(this._triggerArray).removeClass(u.COLLAPSED).attr("aria-expanded",!0),this.setTransitioning(!0);var h=function(){t(e._element).removeClass(u.COLLAPSING).addClass(u.COLLAPSE).addClass(u.SHOW),e._element.style[l]="",e.setTransitioning(!1),t(e._element).trigger(c.SHOWN)};if(r.supportsTransitionEnd()){var d="scroll"+(l[0].toUpperCase()+l.slice(1));t(this._element).one(r.TRANSITION_END,h).emulateTransitionEnd(600),this._element.style[l]=this._element[d]+"px"}else h()}}}},a.prototype.hide=function(){var e=this;if(!this._isTransitioning&&t(this._element).hasClass(u.SHOW)){var n=t.Event(c.HIDE);if(t(this._element).trigger(n),!n.isDefaultPrevented()){var i=this._getDimension();if(this._element.style[i]=this._element.getBoundingClientRect()[i]+"px",r.reflow(this._element),t(this._element).addClass(u.COLLAPSING).removeClass(u.COLLAPSE).removeClass(u.SHOW),this._triggerArray.length)for(var o=0;o<this._triggerArray.length;o++){var s=this._triggerArray[o],a=r.getSelectorFromElement(s);null!==a&&(t(a).hasClass(u.SHOW)||t(s).addClass(u.COLLAPSED).attr("aria-expanded",!1))}this.setTransitioning(!0);var l=function(){e.setTransitioning(!1),t(e._element).removeClass(u.COLLAPSING).addClass(u.COLLAPSE).trigger(c.HIDDEN)};this._element.style[i]="",r.supportsTransitionEnd()?t(this._element).one(r.TRANSITION_END,l).emulateTransitionEnd(600):l()}}},a.prototype.setTransitioning=function(t){this._isTransitioning=t},a.prototype.dispose=function(){t.removeData(this._element,s),this._config=null,this._parent=null,this._element=null,this._triggerArray=null,this._isTransitioning=null},a.prototype._getConfig=function(n){return n=t.extend({},l,n),n.toggle=Boolean(n.toggle),r.typeCheckConfig(e,n,h),n},a.prototype._getDimension=function(){return t(this._element).hasClass(d.WIDTH)?d.WIDTH:d.HEIGHT},a.prototype._getParent=function(){var e=this,n=t(this._config.parent)[0],i='[data-toggle="collapse"][data-parent="'+this._config.parent+'"]';return t(n).find(i).each(function(t,n){e._addAriaAndCollapsedClass(a._getTargetFromElement(n),[n])}),n},a.prototype._addAriaAndCollapsedClass=function(e,n){if(e){var i=t(e).hasClass(u.SHOW);n.length&&t(n).toggleClass(u.COLLAPSED,!i).attr("aria-expanded",i)}},a._getTargetFromElement=function(e){var n=r.getSelectorFromElement(e);return n?t(n)[0]:null},a._jQueryInterface=function(e){return this.each(function(){var n=t(this),o=n.data(s),r=t.extend({},l,n.data(),"object"===(void 0===e?"undefined":i(e))&&e);if(!o&&r.toggle&&/show|hide/.test(e)&&(r.toggle=!1),o||(o=new a(this,r),n.data(s,o)),"string"==typeof e){if(void 0===o[e])throw new Error('No method named "'+e+'"');o[e]()}})},o(a,null,[{key:"VERSION",get:function(){return"4.0.0-beta"}},{key:"Default",get:function(){return l}}]),a}();t(document).on(c.CLICK_DATA_API,f.DATA_TOGGLE,function(e){/input|textarea/i.test(e.target.tagName)||e.preventDefault();var n=t(this),i=r.getSelectorFromElement(this);t(i).each(function(){var e=t(this),i=e.data(s)?"toggle":n.data();p._jQueryInterface.call(e,i)})}),t.fn[e]=p._jQueryInterface,t.fn[e].Constructor=p,t.fn[e].noConflict=function(){return t.fn[e]=a,p._jQueryInterface}}(jQuery),function(t){if("undefined"==typeof Popper)throw new Error("Bootstrap dropdown require Popper.js (https://popper.js.org)");var e="dropdown",s="bs.dropdown",a="."+s,l=t.fn[e],h=new RegExp("38|40|27"),c={HIDE:"hide"+a,HIDDEN:"hidden"+a,SHOW:"show"+a,SHOWN:"shown"+a,CLICK:"click"+a,CLICK_DATA_API:"click.bs.dropdown.data-api",KEYDOWN_DATA_API:"keydown.bs.dropdown.data-api",KEYUP_DATA_API:"keyup.bs.dropdown.data-api"},u={DISABLED:"disabled",SHOW:"show",DROPUP:"dropup",MENURIGHT:"dropdown-menu-right",MENULEFT:"dropdown-menu-left"},d={DATA_TOGGLE:'[data-toggle="dropdown"]',FORM_CHILD:".dropdown form",MENU:".dropdown-menu",NAVBAR_NAV:".navbar-nav",VISIBLE_ITEMS:".dropdown-menu .dropdown-item:not(.disabled)"},f={TOP:"top-start",TOPEND:"top-end",BOTTOM:"bottom-start",BOTTOMEND:"bottom-end"},p={placement:f.BOTTOM,offset:0,flip:!0},_={placement:"string",offset:"(number|string)",flip:"boolean"},g=function(){function l(t,e){n(this,l),this._element=t,this._popper=null,this._config=this._getConfig(e),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar(),this._addEventListeners()}return l.prototype.toggle=function(){if(!this._element.disabled&&!t(this._element).hasClass(u.DISABLED)){var e=l._getParentFromElement(this._element),n=t(this._menu).hasClass(u.SHOW);if(l._clearMenus(),!n){var i={relatedTarget:this._element},o=t.Event(c.SHOW,i);if(t(e).trigger(o),!o.isDefaultPrevented()){var r=this._element;t(e).hasClass(u.DROPUP)&&(t(this._menu).hasClass(u.MENULEFT)||t(this._menu).hasClass(u.MENURIGHT))&&(r=e),this._popper=new Popper(r,this._menu,this._getPopperConfig()),"ontouchstart"in document.documentElement&&!t(e).closest(d.NAVBAR_NAV).length&&t("body").children().on("mouseover",null,t.noop),this._element.focus(),this._element.setAttribute("aria-expanded",!0),t(this._menu).toggleClass(u.SHOW),t(e).toggleClass(u.SHOW).trigger(t.Event(c.SHOWN,i))}}}},l.prototype.dispose=function(){t.removeData(this._element,s),t(this._element).off(a),this._element=null,this._menu=null,null!==this._popper&&this._popper.destroy(),this._popper=null},l.prototype.update=function(){this._inNavbar=this._detectNavbar(),null!==this._popper&&this._popper.scheduleUpdate()},l.prototype._addEventListeners=function(){var e=this;t(this._element).on(c.CLICK,function(t){t.preventDefault(),t.stopPropagation(),e.toggle()})},l.prototype._getConfig=function(n){var i=t(this._element).data();return void 0!==i.placement&&(i.placement=f[i.placement.toUpperCase()]),n=t.extend({},this.constructor.Default,t(this._element).data(),n),r.typeCheckConfig(e,n,this.constructor.DefaultType),n},l.prototype._getMenuElement=function(){if(!this._menu){var e=l._getParentFromElement(this._element);this._menu=t(e).find(d.MENU)[0]}return this._menu},l.prototype._getPlacement=function(){var e=t(this._element).parent(),n=this._config.placement;return e.hasClass(u.DROPUP)||this._config.placement===f.TOP?(n=f.TOP,t(this._menu).hasClass(u.MENURIGHT)&&(n=f.TOPEND)):t(this._menu).hasClass(u.MENURIGHT)&&(n=f.BOTTOMEND),n},l.prototype._detectNavbar=function(){return t(this._element).closest(".navbar").length>0},l.prototype._getPopperConfig=function(){var t={placement:this._getPlacement(),modifiers:{offset:{offset:this._config.offset},flip:{enabled:this._config.flip}}};return this._inNavbar&&(t.modifiers.applyStyle={enabled:!this._inNavbar}),t},l._jQueryInterface=function(e){return this.each(function(){var n=t(this).data(s),o="object"===(void 0===e?"undefined":i(e))?e:null;if(n||(n=new l(this,o),t(this).data(s,n)),"string"==typeof e){if(void 0===n[e])throw new Error('No method named "'+e+'"');n[e]()}})},l._clearMenus=function(e){if(!e||3!==e.which&&("keyup"!==e.type||9===e.which))for(var n=t.makeArray(t(d.DATA_TOGGLE)),i=0;i<n.length;i++){var o=l._getParentFromElement(n[i]),r=t(n[i]).data(s),a={relatedTarget:n[i]};if(r){var h=r._menu;if(t(o).hasClass(u.SHOW)&&!(e&&("click"===e.type&&/input|textarea/i.test(e.target.tagName)||"keyup"===e.type&&9===e.which)&&t.contains(o,e.target))){var f=t.Event(c.HIDE,a);t(o).trigger(f),f.isDefaultPrevented()||("ontouchstart"in document.documentElement&&t("body").children().off("mouseover",null,t.noop),n[i].setAttribute("aria-expanded","false"),t(h).removeClass(u.SHOW),t(o).removeClass(u.SHOW).trigger(t.Event(c.HIDDEN,a)))}}}},l._getParentFromElement=function(e){var n=void 0,i=r.getSelectorFromElement(e);return i&&(n=t(i)[0]),n||e.parentNode},l._dataApiKeydownHandler=function(e){if(!(!h.test(e.which)||/button/i.test(e.target.tagName)&&32===e.which||/input|textarea/i.test(e.target.tagName)||(e.preventDefault(),e.stopPropagation(),this.disabled||t(this).hasClass(u.DISABLED)))){var n=l._getParentFromElement(this),i=t(n).hasClass(u.SHOW);if((i||27===e.which&&32===e.which)&&(!i||27!==e.which&&32!==e.which)){var o=t(n).find(d.VISIBLE_ITEMS).get();if(o.length){var r=o.indexOf(e.target);38===e.which&&r>0&&r--,40===e.which&&r<o.length-1&&r++,r<0&&(r=0),o[r].focus()}}else{if(27===e.which){var s=t(n).find(d.DATA_TOGGLE)[0];t(s).trigger("focus")}t(this).trigger("click")}}},o(l,null,[{key:"VERSION",get:function(){return"4.0.0-beta"}},{key:"Default",get:function(){return p}},{key:"DefaultType",get:function(){return _}}]),l}();t(document).on(c.KEYDOWN_DATA_API,d.DATA_TOGGLE,g._dataApiKeydownHandler).on(c.KEYDOWN_DATA_API,d.MENU,g._dataApiKeydownHandler).on(c.CLICK_DATA_API+" "+c.KEYUP_DATA_API,g._clearMenus).on(c.CLICK_DATA_API,d.DATA_TOGGLE,function(e){e.preventDefault(),e.stopPropagation(),g._jQueryInterface.call(t(this),"toggle")}).on(c.CLICK_DATA_API,d.FORM_CHILD,function(t){t.stopPropagation()}),t.fn[e]=g._jQueryInterface,t.fn[e].Constructor=g,t.fn[e].noConflict=function(){return t.fn[e]=l,g._jQueryInterface}}(jQuery),function(t){var e="modal",s=".bs.modal",a=t.fn[e],l={backdrop:!0,keyboard:!0,focus:!0,show:!0},h={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean",show:"boolean"},c={HIDE:"hide.bs.modal",HIDDEN:"hidden.bs.modal",SHOW:"show.bs.modal",SHOWN:"shown.bs.modal",FOCUSIN:"focusin.bs.modal",RESIZE:"resize.bs.modal",CLICK_DISMISS:"click.dismiss.bs.modal",KEYDOWN_DISMISS:"keydown.dismiss.bs.modal",MOUSEUP_DISMISS:"mouseup.dismiss.bs.modal",MOUSEDOWN_DISMISS:"mousedown.dismiss.bs.modal",CLICK_DATA_API:"click.bs.modal.data-api"},u={SCROLLBAR_MEASURER:"modal-scrollbar-measure",BACKDROP:"modal-backdrop",OPEN:"modal-open",FADE:"fade",SHOW:"show"},d={DIALOG:".modal-dialog",DATA_TOGGLE:'[data-toggle="modal"]',DATA_DISMISS:'[data-dismiss="modal"]',FIXED_CONTENT:".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",NAVBAR_TOGGLER:".navbar-toggler"},f=function(){function a(e,i){n(this,a),this._config=this._getConfig(i),this._element=e,this._dialog=t(e).find(d.DIALOG)[0],this._backdrop=null,this._isShown=!1,this._isBodyOverflowing=!1,this._ignoreBackdropClick=!1,this._originalBodyPadding=0,this._scrollbarWidth=0}return a.prototype.toggle=function(t){return this._isShown?this.hide():this.show(t)},a.prototype.show=function(e){var n=this;if(!this._isTransitioning){r.supportsTransitionEnd()&&t(this._element).hasClass(u.FADE)&&(this._isTransitioning=!0);var i=t.Event(c.SHOW,{relatedTarget:e});t(this._element).trigger(i),this._isShown||i.isDefaultPrevented()||(this._isShown=!0,this._checkScrollbar(),this._setScrollbar(),t(document.body).addClass(u.OPEN),this._setEscapeEvent(),this._setResizeEvent(),t(this._element).on(c.CLICK_DISMISS,d.DATA_DISMISS,function(t){return n.hide(t)}),t(this._dialog).on(c.MOUSEDOWN_DISMISS,function(){t(n._element).one(c.MOUSEUP_DISMISS,function(e){t(e.target).is(n._element)&&(n._ignoreBackdropClick=!0)})}),this._showBackdrop(function(){return n._showElement(e)}))}},a.prototype.hide=function(e){var n=this;if(e&&e.preventDefault(),!this._isTransitioning&&this._isShown){var i=r.supportsTransitionEnd()&&t(this._element).hasClass(u.FADE);i&&(this._isTransitioning=!0);var o=t.Event(c.HIDE);t(this._element).trigger(o),this._isShown&&!o.isDefaultPrevented()&&(this._isShown=!1,this._setEscapeEvent(),this._setResizeEvent(),t(document).off(c.FOCUSIN),t(this._element).removeClass(u.SHOW),t(this._element).off(c.CLICK_DISMISS),t(this._dialog).off(c.MOUSEDOWN_DISMISS),i?t(this._element).one(r.TRANSITION_END,function(t){return n._hideModal(t)}).emulateTransitionEnd(300):this._hideModal())}},a.prototype.dispose=function(){t.removeData(this._element,"bs.modal"),t(window,document,this._element,this._backdrop).off(s),this._config=null,this._element=null,this._dialog=null,this._backdrop=null,this._isShown=null,this._isBodyOverflowing=null,this._ignoreBackdropClick=null,this._scrollbarWidth=null},a.prototype.handleUpdate=function(){this._adjustDialog()},a.prototype._getConfig=function(n){return n=t.extend({},l,n),r.typeCheckConfig(e,n,h),n},a.prototype._showElement=function(e){var n=this,i=r.supportsTransitionEnd()&&t(this._element).hasClass(u.FADE);this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||document.body.appendChild(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.scrollTop=0,i&&r.reflow(this._element),t(this._element).addClass(u.SHOW),this._config.focus&&this._enforceFocus();var o=t.Event(c.SHOWN,{relatedTarget:e}),s=function(){n._config.focus&&n._element.focus(),n._isTransitioning=!1,t(n._element).trigger(o)};i?t(this._dialog).one(r.TRANSITION_END,s).emulateTransitionEnd(300):s()},a.prototype._enforceFocus=function(){var e=this;t(document).off(c.FOCUSIN).on(c.FOCUSIN,function(n){document===n.target||e._element===n.target||t(e._element).has(n.target).length||e._element.focus()})},a.prototype._setEscapeEvent=function(){var e=this;this._isShown&&this._config.keyboard?t(this._element).on(c.KEYDOWN_DISMISS,function(t){27===t.which&&(t.preventDefault(),e.hide())}):this._isShown||t(this._element).off(c.KEYDOWN_DISMISS)},a.prototype._setResizeEvent=function(){var e=this;this._isShown?t(window).on(c.RESIZE,function(t){return e.handleUpdate(t)}):t(window).off(c.RESIZE)},a.prototype._hideModal=function(){var e=this;this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._isTransitioning=!1,this._showBackdrop(function(){t(document.body).removeClass(u.OPEN),e._resetAdjustments(),e._resetScrollbar(),t(e._element).trigger(c.HIDDEN)})},a.prototype._removeBackdrop=function(){this._backdrop&&(t(this._backdrop).remove(),this._backdrop=null)},a.prototype._showBackdrop=function(e){var n=this,i=t(this._element).hasClass(u.FADE)?u.FADE:"";if(this._isShown&&this._config.backdrop){var o=r.supportsTransitionEnd()&&i;if(this._backdrop=document.createElement("div"),this._backdrop.className=u.BACKDROP,i&&t(this._backdrop).addClass(i),t(this._backdrop).appendTo(document.body),t(this._element).on(c.CLICK_DISMISS,function(t){n._ignoreBackdropClick?n._ignoreBackdropClick=!1:t.target===t.currentTarget&&("static"===n._config.backdrop?n._element.focus():n.hide())}),o&&r.reflow(this._backdrop),t(this._backdrop).addClass(u.SHOW),!e)return;if(!o)return void e();t(this._backdrop).one(r.TRANSITION_END,e).emulateTransitionEnd(150)}else if(!this._isShown&&this._backdrop){t(this._backdrop).removeClass(u.SHOW);var s=function(){n._removeBackdrop(),e&&e()};r.supportsTransitionEnd()&&t(this._element).hasClass(u.FADE)?t(this._backdrop).one(r.TRANSITION_END,s).emulateTransitionEnd(150):s()}else e&&e()},a.prototype._adjustDialog=function(){var t=this._element.scrollHeight>document.documentElement.clientHeight;!this._isBodyOverflowing&&t&&(this._element.style.paddingLeft=this._scrollbarWidth+"px"),this._isBodyOverflowing&&!t&&(this._element.style.paddingRight=this._scrollbarWidth+"px")},a.prototype._resetAdjustments=function(){this._element.style.paddingLeft="",this._element.style.paddingRight=""},a.prototype._checkScrollbar=function(){this._isBodyOverflowing=document.body.clientWidth<window.innerWidth,this._scrollbarWidth=this._getScrollbarWidth()},a.prototype._setScrollbar=function(){var e=this;if(this._isBodyOverflowing){t(d.FIXED_CONTENT).each(function(n,i){var o=t(i)[0].style.paddingRight,r=t(i).css("padding-right");t(i).data("padding-right",o).css("padding-right",parseFloat(r)+e._scrollbarWidth+"px")}),t(d.NAVBAR_TOGGLER).each(function(n,i){var o=t(i)[0].style.marginRight,r=t(i).css("margin-right");t(i).data("margin-right",o).css("margin-right",parseFloat(r)+e._scrollbarWidth+"px")});var n=document.body.style.paddingRight,i=t("body").css("padding-right");t("body").data("padding-right",n).css("padding-right",parseFloat(i)+this._scrollbarWidth+"px")}},a.prototype._resetScrollbar=function(){t(d.FIXED_CONTENT).each(function(e,n){var i=t(n).data("padding-right");void 0!==i&&t(n).css("padding-right",i).removeData("padding-right")}),t(d.NAVBAR_TOGGLER).each(function(e,n){var i=t(n).data("margin-right");void 0!==i&&t(n).css("margin-right",i).removeData("margin-right")});var e=t("body").data("padding-right");void 0!==e&&t("body").css("padding-right",e).removeData("padding-right")},a.prototype._getScrollbarWidth=function(){var t=document.createElement("div");t.className=u.SCROLLBAR_MEASURER,document.body.appendChild(t);var e=t.getBoundingClientRect().width-t.clientWidth;return document.body.removeChild(t),e},a._jQueryInterface=function(e,n){return this.each(function(){var o=t(this).data("bs.modal"),r=t.extend({},a.Default,t(this).data(),"object"===(void 0===e?"undefined":i(e))&&e);if(o||(o=new a(this,r),t(this).data("bs.modal",o)),"string"==typeof e){if(void 0===o[e])throw new Error('No method named "'+e+'"');o[e](n)}else r.show&&o.show(n)})},o(a,null,[{key:"VERSION",get:function(){return"4.0.0-beta"}},{key:"Default",get:function(){return l}}]),a}();t(document).on(c.CLICK_DATA_API,d.DATA_TOGGLE,function(e){var n=this,i=void 0,o=r.getSelectorFromElement(this);o&&(i=t(o)[0]);var s=t(i).data("bs.modal")?"toggle":t.extend({},t(i).data(),t(this).data());"A"!==this.tagName&&"AREA"!==this.tagName||e.preventDefault();var a=t(i).one(c.SHOW,function(e){e.isDefaultPrevented()||a.one(c.HIDDEN,function(){t(n).is(":visible")&&n.focus()})});f._jQueryInterface.call(t(i),s,this)}),t.fn[e]=f._jQueryInterface,t.fn[e].Constructor=f,t.fn[e].noConflict=function(){return t.fn[e]=a,f._jQueryInterface}}(jQuery),function(t){var e="scrollspy",s=t.fn[e],a={offset:10,method:"auto",target:""},l={offset:"number",method:"string",target:"(string|element)"},h={ACTIVATE:"activate.bs.scrollspy",SCROLL:"scroll.bs.scrollspy",LOAD_DATA_API:"load.bs.scrollspy.data-api"},c={DROPDOWN_ITEM:"dropdown-item",DROPDOWN_MENU:"dropdown-menu",ACTIVE:"active"},u={DATA_SPY:'[data-spy="scroll"]',ACTIVE:".active",NAV_LIST_GROUP:".nav, .list-group",NAV_LINKS:".nav-link",LIST_ITEMS:".list-group-item",DROPDOWN:".dropdown",DROPDOWN_ITEMS:".dropdown-item",DROPDOWN_TOGGLE:".dropdown-toggle"},d={OFFSET:"offset",POSITION:"position"},f=function(){function s(e,i){var o=this;n(this,s),this._element=e,this._scrollElement="BODY"===e.tagName?window:e,this._config=this._getConfig(i),this._selector=this._config.target+" "+u.NAV_LINKS+","+this._config.target+" "+u.LIST_ITEMS+","+this._config.target+" "+u.DROPDOWN_ITEMS,this._offsets=[],this._targets=[],this._activeTarget=null,this._scrollHeight=0,t(this._scrollElement).on(h.SCROLL,function(t){return o._process(t)}),this.refresh(),this._process()}return s.prototype.refresh=function(){var e=this,n=this._scrollElement!==this._scrollElement.window?d.POSITION:d.OFFSET,i="auto"===this._config.method?n:this._config.method,o=i===d.POSITION?this._getScrollTop():0;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight(),t.makeArray(t(this._selector)).map(function(e){var n=void 0,s=r.getSelectorFromElement(e);if(s&&(n=t(s)[0]),n){var a=n.getBoundingClientRect();if(a.width||a.height)return[t(n)[i]().top+o,s]}return null}).filter(function(t){return t}).sort(function(t,e){return t[0]-e[0]}).forEach(function(t){e._offsets.push(t[0]),e._targets.push(t[1])})},s.prototype.dispose=function(){t.removeData(this._element,"bs.scrollspy"),t(this._scrollElement).off(".bs.scrollspy"),this._element=null,this._scrollElement=null,this._config=null,this._selector=null,this._offsets=null,this._targets=null,this._activeTarget=null,this._scrollHeight=null},s.prototype._getConfig=function(n){if("string"!=typeof(n=t.extend({},a,n)).target){var i=t(n.target).attr("id");i||(i=r.getUID(e),t(n.target).attr("id",i)),n.target="#"+i}return r.typeCheckConfig(e,n,l),n},s.prototype._getScrollTop=function(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop},s.prototype._getScrollHeight=function(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)},s.prototype._getOffsetHeight=function(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height},s.prototype._process=function(){var t=this._getScrollTop()+this._config.offset,e=this._getScrollHeight(),n=this._config.offset+e-this._getOffsetHeight();if(this._scrollHeight!==e&&this.refresh(),t>=n){var i=this._targets[this._targets.length-1];this._activeTarget!==i&&this._activate(i)}else{if(this._activeTarget&&t<this._offsets[0]&&this._offsets[0]>0)return this._activeTarget=null,void this._clear();for(var o=this._offsets.length;o--;)this._activeTarget!==this._targets[o]&&t>=this._offsets[o]&&(void 0===this._offsets[o+1]||t<this._offsets[o+1])&&this._activate(this._targets[o])}},s.prototype._activate=function(e){this._activeTarget=e,this._clear();var n=this._selector.split(",");n=n.map(function(t){return t+'[data-target="'+e+'"],'+t+'[href="'+e+'"]'});var i=t(n.join(","));i.hasClass(c.DROPDOWN_ITEM)?(i.closest(u.DROPDOWN).find(u.DROPDOWN_TOGGLE).addClass(c.ACTIVE),i.addClass(c.ACTIVE)):(i.addClass(c.ACTIVE),i.parents(u.NAV_LIST_GROUP).prev(u.NAV_LINKS+", "+u.LIST_ITEMS).addClass(c.ACTIVE)),t(this._scrollElement).trigger(h.ACTIVATE,{relatedTarget:e})},s.prototype._clear=function(){t(this._selector).filter(u.ACTIVE).removeClass(c.ACTIVE)},s._jQueryInterface=function(e){return this.each(function(){var n=t(this).data("bs.scrollspy"),o="object"===(void 0===e?"undefined":i(e))&&e;if(n||(n=new s(this,o),t(this).data("bs.scrollspy",n)),"string"==typeof e){if(void 0===n[e])throw new Error('No method named "'+e+'"');n[e]()}})},o(s,null,[{key:"VERSION",get:function(){return"4.0.0-beta"}},{key:"Default",get:function(){return a}}]),s}();t(window).on(h.LOAD_DATA_API,function(){for(var e=t.makeArray(t(u.DATA_SPY)),n=e.length;n--;){var i=t(e[n]);f._jQueryInterface.call(i,i.data())}}),t.fn[e]=f._jQueryInterface,t.fn[e].Constructor=f,t.fn[e].noConflict=function(){return t.fn[e]=s,f._jQueryInterface}}(jQuery),function(t){var e=t.fn.tab,i={HIDE:"hide.bs.tab",HIDDEN:"hidden.bs.tab",SHOW:"show.bs.tab",SHOWN:"shown.bs.tab",CLICK_DATA_API:"click.bs.tab.data-api"},s={DROPDOWN_MENU:"dropdown-menu",ACTIVE:"active",DISABLED:"disabled",FADE:"fade",SHOW:"show"},a={DROPDOWN:".dropdown",NAV_LIST_GROUP:".nav, .list-group",ACTIVE:".active",DATA_TOGGLE:'[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',DROPDOWN_TOGGLE:".dropdown-toggle",DROPDOWN_ACTIVE_CHILD:"> .dropdown-menu .active"},l=function(){function e(t){n(this,e),this._element=t}return e.prototype.show=function(){var e=this;if(!(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&t(this._element).hasClass(s.ACTIVE)||t(this._element).hasClass(s.DISABLED))){var n=void 0,o=void 0,l=t(this._element).closest(a.NAV_LIST_GROUP)[0],h=r.getSelectorFromElement(this._element);l&&(o=t.makeArray(t(l).find(a.ACTIVE)),o=o[o.length-1]);var c=t.Event(i.HIDE,{relatedTarget:this._element}),u=t.Event(i.SHOW,{relatedTarget:o});if(o&&t(o).trigger(c),t(this._element).trigger(u),!u.isDefaultPrevented()&&!c.isDefaultPrevented()){h&&(n=t(h)[0]),this._activate(this._element,l);var d=function(){var n=t.Event(i.HIDDEN,{relatedTarget:e._element}),r=t.Event(i.SHOWN,{relatedTarget:o});t(o).trigger(n),t(e._element).trigger(r)};n?this._activate(n,n.parentNode,d):d()}}},e.prototype.dispose=function(){t.removeData(this._element,"bs.tab"),this._element=null},e.prototype._activate=function(e,n,i){var o=this,l=t(n).find(a.ACTIVE)[0],h=i&&r.supportsTransitionEnd()&&l&&t(l).hasClass(s.FADE),c=function(){return o._transitionComplete(e,l,h,i)};l&&h?t(l).one(r.TRANSITION_END,c).emulateTransitionEnd(150):c(),l&&t(l).removeClass(s.SHOW)},e.prototype._transitionComplete=function(e,n,i,o){if(n){t(n).removeClass(s.ACTIVE);var l=t(n.parentNode).find(a.DROPDOWN_ACTIVE_CHILD)[0];l&&t(l).removeClass(s.ACTIVE),n.setAttribute("aria-expanded",!1)}if(t(e).addClass(s.ACTIVE),e.setAttribute("aria-expanded",!0),i?(r.reflow(e),t(e).addClass(s.SHOW)):t(e).removeClass(s.FADE),e.parentNode&&t(e.parentNode).hasClass(s.DROPDOWN_MENU)){var h=t(e).closest(a.DROPDOWN)[0];h&&t(h).find(a.DROPDOWN_TOGGLE).addClass(s.ACTIVE),e.setAttribute("aria-expanded",!0)}o&&o()},e._jQueryInterface=function(n){return this.each(function(){var i=t(this),o=i.data("bs.tab");if(o||(o=new e(this),i.data("bs.tab",o)),"string"==typeof n){if(void 0===o[n])throw new Error('No method named "'+n+'"');o[n]()}})},o(e,null,[{key:"VERSION",get:function(){return"4.0.0-beta"}}]),e}();t(document).on(i.CLICK_DATA_API,a.DATA_TOGGLE,function(e){e.preventDefault(),l._jQueryInterface.call(t(this),"show")}),t.fn.tab=l._jQueryInterface,t.fn.tab.Constructor=l,t.fn.tab.noConflict=function(){return t.fn.tab=e,l._jQueryInterface}}(jQuery),function(t){if("undefined"==typeof Popper)throw new Error("Bootstrap tooltips require Popper.js (https://popper.js.org)");var e="tooltip",s=".bs.tooltip",a=t.fn[e],l=new RegExp("(^|\\s)bs-tooltip\\S+","g"),h={animation:"boolean",template:"string",title:"(string|element|function)",trigger:"string",delay:"(number|object)",html:"boolean",selector:"(string|boolean)",placement:"(string|function)",offset:"(number|string)",container:"(string|element|boolean)",fallbackPlacement:"(string|array)"},c={AUTO:"auto",TOP:"top",RIGHT:"right",BOTTOM:"bottom",LEFT:"left"},u={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,selector:!1,placement:"top",offset:0,container:!1,fallbackPlacement:"flip"},d={SHOW:"show",OUT:"out"},f={HIDE:"hide"+s,HIDDEN:"hidden"+s,SHOW:"show"+s,SHOWN:"shown"+s,INSERTED:"inserted"+s,CLICK:"click"+s,FOCUSIN:"focusin"+s,FOCUSOUT:"focusout"+s,MOUSEENTER:"mouseenter"+s,MOUSELEAVE:"mouseleave"+s},p={FADE:"fade",SHOW:"show"},_={TOOLTIP:".tooltip",TOOLTIP_INNER:".tooltip-inner",ARROW:".arrow"},g={HOVER:"hover",FOCUS:"focus",CLICK:"click",MANUAL:"manual"},m=function(){function a(t,e){n(this,a),this._isEnabled=!0,this._timeout=0,this._hoverState="",this._activeTrigger={},this._popper=null,this.element=t,this.config=this._getConfig(e),this.tip=null,this._setListeners()}return a.prototype.enable=function(){this._isEnabled=!0},a.prototype.disable=function(){this._isEnabled=!1},a.prototype.toggleEnabled=function(){this._isEnabled=!this._isEnabled},a.prototype.toggle=function(e){if(e){var n=this.constructor.DATA_KEY,i=t(e.currentTarget).data(n);i||(i=new this.constructor(e.currentTarget,this._getDelegateConfig()),t(e.currentTarget).data(n,i)),i._activeTrigger.click=!i._activeTrigger.click,i._isWithActiveTrigger()?i._enter(null,i):i._leave(null,i)}else{if(t(this.getTipElement()).hasClass(p.SHOW))return void this._leave(null,this);this._enter(null,this)}},a.prototype.dispose=function(){clearTimeout(this._timeout),t.removeData(this.element,this.constructor.DATA_KEY),t(this.element).off(this.constructor.EVENT_KEY),t(this.element).closest(".modal").off("hide.bs.modal"),this.tip&&t(this.tip).remove(),this._isEnabled=null,this._timeout=null,this._hoverState=null,this._activeTrigger=null,null!==this._popper&&this._popper.destroy(),this._popper=null,this.element=null,this.config=null,this.tip=null},a.prototype.show=function(){var e=this;if("none"===t(this.element).css("display"))throw new Error("Please use show on visible elements");var n=t.Event(this.constructor.Event.SHOW);if(this.isWithContent()&&this._isEnabled){t(this.element).trigger(n);var i=t.contains(this.element.ownerDocument.documentElement,this.element);if(n.isDefaultPrevented()||!i)return;var o=this.getTipElement(),s=r.getUID(this.constructor.NAME);o.setAttribute("id",s),this.element.setAttribute("aria-describedby",s),this.setContent(),this.config.animation&&t(o).addClass(p.FADE);var l="function"==typeof this.config.placement?this.config.placement.call(this,o,this.element):this.config.placement,h=this._getAttachment(l);this.addAttachmentClass(h);var c=!1===this.config.container?document.body:t(this.config.container);t(o).data(this.constructor.DATA_KEY,this),t.contains(this.element.ownerDocument.documentElement,this.tip)||t(o).appendTo(c),t(this.element).trigger(this.constructor.Event.INSERTED),this._popper=new Popper(this.element,o,{placement:h,modifiers:{offset:{offset:this.config.offset},flip:{behavior:this.config.fallbackPlacement},arrow:{element:_.ARROW}},onCreate:function(t){t.originalPlacement!==t.placement&&e._handlePopperPlacementChange(t)},onUpdate:function(t){e._handlePopperPlacementChange(t)}}),t(o).addClass(p.SHOW),"ontouchstart"in document.documentElement&&t("body").children().on("mouseover",null,t.noop);var u=function(){e.config.animation&&e._fixTransition();var n=e._hoverState;e._hoverState=null,t(e.element).trigger(e.constructor.Event.SHOWN),n===d.OUT&&e._leave(null,e)};r.supportsTransitionEnd()&&t(this.tip).hasClass(p.FADE)?t(this.tip).one(r.TRANSITION_END,u).emulateTransitionEnd(a._TRANSITION_DURATION):u()}},a.prototype.hide=function(e){var n=this,i=this.getTipElement(),o=t.Event(this.constructor.Event.HIDE),s=function(){n._hoverState!==d.SHOW&&i.parentNode&&i.parentNode.removeChild(i),n._cleanTipClass(),n.element.removeAttribute("aria-describedby"),t(n.element).trigger(n.constructor.Event.HIDDEN),null!==n._popper&&n._popper.destroy(),e&&e()};t(this.element).trigger(o),o.isDefaultPrevented()||(t(i).removeClass(p.SHOW),"ontouchstart"in document.documentElement&&t("body").children().off("mouseover",null,t.noop),this._activeTrigger[g.CLICK]=!1,this._activeTrigger[g.FOCUS]=!1,this._activeTrigger[g.HOVER]=!1,r.supportsTransitionEnd()&&t(this.tip).hasClass(p.FADE)?t(i).one(r.TRANSITION_END,s).emulateTransitionEnd(150):s(),this._hoverState="")},a.prototype.update=function(){null!==this._popper&&this._popper.scheduleUpdate()},a.prototype.isWithContent=function(){return Boolean(this.getTitle())},a.prototype.addAttachmentClass=function(e){t(this.getTipElement()).addClass("bs-tooltip-"+e)},a.prototype.getTipElement=function(){return this.tip=this.tip||t(this.config.template)[0]},a.prototype.setContent=function(){var e=t(this.getTipElement());this.setElementContent(e.find(_.TOOLTIP_INNER),this.getTitle()),e.removeClass(p.FADE+" "+p.SHOW)},a.prototype.setElementContent=function(e,n){var o=this.config.html;"object"===(void 0===n?"undefined":i(n))&&(n.nodeType||n.jquery)?o?t(n).parent().is(e)||e.empty().append(n):e.text(t(n).text()):e[o?"html":"text"](n)},a.prototype.getTitle=function(){var t=this.element.getAttribute("data-original-title");return t||(t="function"==typeof this.config.title?this.config.title.call(this.element):this.config.title),t},a.prototype._getAttachment=function(t){return c[t.toUpperCase()]},a.prototype._setListeners=function(){var e=this;this.config.trigger.split(" ").forEach(function(n){if("click"===n)t(e.element).on(e.constructor.Event.CLICK,e.config.selector,function(t){return e.toggle(t)});else if(n!==g.MANUAL){var i=n===g.HOVER?e.constructor.Event.MOUSEENTER:e.constructor.Event.FOCUSIN,o=n===g.HOVER?e.constructor.Event.MOUSELEAVE:e.constructor.Event.FOCUSOUT;t(e.element).on(i,e.config.selector,function(t){return e._enter(t)}).on(o,e.config.selector,function(t){return e._leave(t)})}t(e.element).closest(".modal").on("hide.bs.modal",function(){return e.hide()})}),this.config.selector?this.config=t.extend({},this.config,{trigger:"manual",selector:""}):this._fixTitle()},a.prototype._fixTitle=function(){var t=i(this.element.getAttribute("data-original-title"));(this.element.getAttribute("title")||"string"!==t)&&(this.element.setAttribute("data-original-title",this.element.getAttribute("title")||""),this.element.setAttribute("title",""))},a.prototype._enter=function(e,n){var i=this.constructor.DATA_KEY;(n=n||t(e.currentTarget).data(i))||(n=new this.constructor(e.currentTarget,this._getDelegateConfig()),t(e.currentTarget).data(i,n)),e&&(n._activeTrigger["focusin"===e.type?g.FOCUS:g.HOVER]=!0),t(n.getTipElement()).hasClass(p.SHOW)||n._hoverState===d.SHOW?n._hoverState=d.SHOW:(clearTimeout(n._timeout),n._hoverState=d.SHOW,n.config.delay&&n.config.delay.show?n._timeout=setTimeout(function(){n._hoverState===d.SHOW&&n.show()},n.config.delay.show):n.show())},a.prototype._leave=function(e,n){var i=this.constructor.DATA_KEY;(n=n||t(e.currentTarget).data(i))||(n=new this.constructor(e.currentTarget,this._getDelegateConfig()),t(e.currentTarget).data(i,n)),e&&(n._activeTrigger["focusout"===e.type?g.FOCUS:g.HOVER]=!1),n._isWithActiveTrigger()||(clearTimeout(n._timeout),n._hoverState=d.OUT,n.config.delay&&n.config.delay.hide?n._timeout=setTimeout(function(){n._hoverState===d.OUT&&n.hide()},n.config.delay.hide):n.hide())},a.prototype._isWithActiveTrigger=function(){for(var t in this._activeTrigger)if(this._activeTrigger[t])return!0;return!1},a.prototype._getConfig=function(n){return(n=t.extend({},this.constructor.Default,t(this.element).data(),n)).delay&&"number"==typeof n.delay&&(n.delay={show:n.delay,hide:n.delay}),n.title&&"number"==typeof n.title&&(n.title=n.title.toString()),n.content&&"number"==typeof n.content&&(n.content=n.content.toString()),r.typeCheckConfig(e,n,this.constructor.DefaultType),n},a.prototype._getDelegateConfig=function(){var t={};if(this.config)for(var e in this.config)this.constructor.Default[e]!==this.config[e]&&(t[e]=this.config[e]);return t},a.prototype._cleanTipClass=function(){var e=t(this.getTipElement()),n=e.attr("class").match(l);null!==n&&n.length>0&&e.removeClass(n.join(""))},a.prototype._handlePopperPlacementChange=function(t){this._cleanTipClass(),this.addAttachmentClass(this._getAttachment(t.placement))},a.prototype._fixTransition=function(){var e=this.getTipElement(),n=this.config.animation;null===e.getAttribute("x-placement")&&(t(e).removeClass(p.FADE),this.config.animation=!1,this.hide(),this.show(),this.config.animation=n)},a._jQueryInterface=function(e){return this.each(function(){var n=t(this).data("bs.tooltip"),o="object"===(void 0===e?"undefined":i(e))&&e;if((n||!/dispose|hide/.test(e))&&(n||(n=new a(this,o),t(this).data("bs.tooltip",n)),"string"==typeof e)){if(void 0===n[e])throw new Error('No method named "'+e+'"');n[e]()}})},o(a,null,[{key:"VERSION",get:function(){return"4.0.0-beta"}},{key:"Default",get:function(){return u}},{key:"NAME",get:function(){return e}},{key:"DATA_KEY",get:function(){return"bs.tooltip"}},{key:"Event",get:function(){return f}},{key:"EVENT_KEY",get:function(){return s}},{key:"DefaultType",get:function(){return h}}]),a}();return t.fn[e]=m._jQueryInterface,t.fn[e].Constructor=m,t.fn[e].noConflict=function(){return t.fn[e]=a,m._jQueryInterface},m}(jQuery));!function(r){var a="popover",l=".bs.popover",h=r.fn[a],c=new RegExp("(^|\\s)bs-popover\\S+","g"),u=r.extend({},s.Default,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'}),d=r.extend({},s.DefaultType,{content:"(string|element|function)"}),f={FADE:"fade",SHOW:"show"},p={TITLE:".popover-header",CONTENT:".popover-body"},_={HIDE:"hide"+l,HIDDEN:"hidden"+l,SHOW:"show"+l,SHOWN:"shown"+l,INSERTED:"inserted"+l,CLICK:"click"+l,FOCUSIN:"focusin"+l,FOCUSOUT:"focusout"+l,MOUSEENTER:"mouseenter"+l,MOUSELEAVE:"mouseleave"+l},g=function(s){function h(){return n(this,h),t(this,s.apply(this,arguments))}return e(h,s),h.prototype.isWithContent=function(){return this.getTitle()||this._getContent()},h.prototype.addAttachmentClass=function(t){r(this.getTipElement()).addClass("bs-popover-"+t)},h.prototype.getTipElement=function(){return this.tip=this.tip||r(this.config.template)[0]},h.prototype.setContent=function(){var t=r(this.getTipElement());this.setElementContent(t.find(p.TITLE),this.getTitle()),this.setElementContent(t.find(p.CONTENT),this._getContent()),t.removeClass(f.FADE+" "+f.SHOW)},h.prototype._getContent=function(){return this.element.getAttribute("data-content")||("function"==typeof this.config.content?this.config.content.call(this.element):this.config.content)},h.prototype._cleanTipClass=function(){var t=r(this.getTipElement()),e=t.attr("class").match(c);null!==e&&e.length>0&&t.removeClass(e.join(""))},h._jQueryInterface=function(t){return this.each(function(){var e=r(this).data("bs.popover"),n="object"===(void 0===t?"undefined":i(t))?t:null;if((e||!/destroy|hide/.test(t))&&(e||(e=new h(this,n),r(this).data("bs.popover",e)),"string"==typeof t)){if(void 0===e[t])throw new Error('No method named "'+t+'"');e[t]()}})},o(h,null,[{key:"VERSION",get:function(){return"4.0.0-beta"}},{key:"Default",get:function(){return u}},{key:"NAME",get:function(){return a}},{key:"DATA_KEY",get:function(){return"bs.popover"}},{key:"Event",get:function(){return _}},{key:"EVENT_KEY",get:function(){return l}},{key:"DefaultType",get:function(){return d}}]),h}(s);r.fn[a]=g._jQueryInterface,r.fn[a].Constructor=g,r.fn[a].noConflict=function(){return r.fn[a]=h,g._jQueryInterface}}(jQuery)}();
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.moment=t()}(this,function(){"use strict";function e(){return Yt.apply(null,arguments)}function t(e){return e instanceof Array||"[object Array]"===Object.prototype.toString.call(e)}function n(e){return null!=e&&"[object Object]"===Object.prototype.toString.call(e)}function s(e){if(Object.getOwnPropertyNames)return 0===Object.getOwnPropertyNames(e).length;var t;for(t in e)if(e.hasOwnProperty(t))return!1;return!0}function i(e){return void 0===e}function r(e){return"number"==typeof e||"[object Number]"===Object.prototype.toString.call(e)}function a(e){return e instanceof Date||"[object Date]"===Object.prototype.toString.call(e)}function o(e,t){var n,s=[];for(n=0;n<e.length;++n)s.push(t(e[n],n));return s}function u(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function l(e,t){for(var n in t)u(t,n)&&(e[n]=t[n]);return u(t,"toString")&&(e.toString=t.toString),u(t,"valueOf")&&(e.valueOf=t.valueOf),e}function d(e,t,n,s){return je(e,t,n,s,!0).utc()}function h(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],meridiem:null,rfc2822:!1,weekdayMismatch:!1}}function c(e){return null==e._pf&&(e._pf=h()),e._pf}function f(e){if(null==e._isValid){var t=c(e),n=Ot.call(t.parsedDateParts,function(e){return null!=e}),s=!isNaN(e._d.getTime())&&t.overflow<0&&!t.empty&&!t.invalidMonth&&!t.invalidWeekday&&!t.weekdayMismatch&&!t.nullInput&&!t.invalidFormat&&!t.userInvalidated&&(!t.meridiem||t.meridiem&&n);if(e._strict&&(s=s&&0===t.charsLeftOver&&0===t.unusedTokens.length&&void 0===t.bigHour),null!=Object.isFrozen&&Object.isFrozen(e))return s;e._isValid=s}return e._isValid}function m(e){var t=d(NaN);return null!=e?l(c(t),e):c(t).userInvalidated=!0,t}function _(e,t){var n,s,r;if(i(t._isAMomentObject)||(e._isAMomentObject=t._isAMomentObject),i(t._i)||(e._i=t._i),i(t._f)||(e._f=t._f),i(t._l)||(e._l=t._l),i(t._strict)||(e._strict=t._strict),i(t._tzm)||(e._tzm=t._tzm),i(t._isUTC)||(e._isUTC=t._isUTC),i(t._offset)||(e._offset=t._offset),i(t._pf)||(e._pf=c(t)),i(t._locale)||(e._locale=t._locale),xt.length>0)for(n=0;n<xt.length;n++)i(r=t[s=xt[n]])||(e[s]=r);return e}function y(t){_(this,t),this._d=new Date(null!=t._d?t._d.getTime():NaN),this.isValid()||(this._d=new Date(NaN)),!1===Tt&&(Tt=!0,e.updateOffset(this),Tt=!1)}function g(e){return e instanceof y||null!=e&&null!=e._isAMomentObject}function p(e){return e<0?Math.ceil(e)||0:Math.floor(e)}function w(e){var t=+e,n=0;return 0!==t&&isFinite(t)&&(n=p(t)),n}function v(e,t,n){var s,i=Math.min(e.length,t.length),r=Math.abs(e.length-t.length),a=0;for(s=0;s<i;s++)(n&&e[s]!==t[s]||!n&&w(e[s])!==w(t[s]))&&a++;return a+r}function M(t){!1===e.suppressDeprecationWarnings&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+t)}function k(t,n){var s=!0;return l(function(){if(null!=e.deprecationHandler&&e.deprecationHandler(null,t),s){for(var i,r=[],a=0;a<arguments.length;a++){if(i="","object"==typeof arguments[a]){i+="\n["+a+"] ";for(var o in arguments[0])i+=o+": "+arguments[0][o]+", ";i=i.slice(0,-2)}else i=arguments[a];r.push(i)}M(t+"\nArguments: "+Array.prototype.slice.call(r).join("")+"\n"+(new Error).stack),s=!1}return n.apply(this,arguments)},n)}function S(t,n){null!=e.deprecationHandler&&e.deprecationHandler(t,n),bt[t]||(M(n),bt[t]=!0)}function D(e){return e instanceof Function||"[object Function]"===Object.prototype.toString.call(e)}function Y(e,t){var s,i=l({},e);for(s in t)u(t,s)&&(n(e[s])&&n(t[s])?(i[s]={},l(i[s],e[s]),l(i[s],t[s])):null!=t[s]?i[s]=t[s]:delete i[s]);for(s in e)u(e,s)&&!u(t,s)&&n(e[s])&&(i[s]=l({},i[s]));return i}function O(e){null!=e&&this.set(e)}function x(e,t){var n=e.toLowerCase();Ut[n]=Ut[n+"s"]=Ut[t]=e}function T(e){return"string"==typeof e?Ut[e]||Ut[e.toLowerCase()]:void 0}function b(e){var t,n,s={};for(n in e)u(e,n)&&(t=T(n))&&(s[t]=e[n]);return s}function P(e,t){Nt[e]=t}function W(e){var t=[];for(var n in e)t.push({unit:n,priority:Nt[n]});return t.sort(function(e,t){return e.priority-t.priority}),t}function R(e,t,n){var s=""+Math.abs(e),i=t-s.length;return(e>=0?n?"+":"":"-")+Math.pow(10,Math.max(0,i)).toString().substr(1)+s}function C(e,t,n,s){var i=s;"string"==typeof s&&(i=function(){return this[s]()}),e&&(Vt[e]=i),t&&(Vt[t[0]]=function(){return R(i.apply(this,arguments),t[1],t[2])}),n&&(Vt[n]=function(){return this.localeData().ordinal(i.apply(this,arguments),e)})}function F(e){return e.match(/\[[\s\S]/)?e.replace(/^\[|\]$/g,""):e.replace(/\\/g,"")}function U(e){var t,n,s=e.match(Ht);for(t=0,n=s.length;t<n;t++)Vt[s[t]]?s[t]=Vt[s[t]]:s[t]=F(s[t]);return function(t){var i,r="";for(i=0;i<n;i++)r+=D(s[i])?s[i].call(t,e):s[i];return r}}function N(e,t){return e.isValid()?(t=H(t,e.localeData()),Gt[t]=Gt[t]||U(t),Gt[t](e)):e.localeData().invalidDate()}function H(e,t){var n=5;for(Lt.lastIndex=0;n>=0&&Lt.test(e);)e=e.replace(Lt,function(e){return t.longDateFormat(e)||e}),Lt.lastIndex=0,n-=1;return e}function L(e,t,n){rn[e]=D(t)?t:function(e,s){return e&&n?n:t}}function G(e,t){return u(rn,e)?rn[e](t._strict,t._locale):new RegExp(V(e))}function V(e){return j(e.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(e,t,n,s,i){return t||n||s||i}))}function j(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function I(e,t){var n,s=t;for("string"==typeof e&&(e=[e]),r(t)&&(s=function(e,n){n[t]=w(e)}),n=0;n<e.length;n++)an[e[n]]=s}function E(e,t){I(e,function(e,n,s,i){s._w=s._w||{},t(e,s._w,s,i)})}function A(e,t,n){null!=t&&u(an,e)&&an[e](t,n._a,n,e)}function z(e){return Z(e)?366:365}function Z(e){return e%4==0&&e%100!=0||e%400==0}function $(t,n){return function(s){return null!=s?(J(this,t,s),e.updateOffset(this,n),this):q(this,t)}}function q(e,t){return e.isValid()?e._d["get"+(e._isUTC?"UTC":"")+t]():NaN}function J(e,t,n){e.isValid()&&!isNaN(n)&&("FullYear"===t&&Z(e.year())?e._d["set"+(e._isUTC?"UTC":"")+t](n,e.month(),Q(n,e.month())):e._d["set"+(e._isUTC?"UTC":"")+t](n))}function B(e,t){return(e%t+t)%t}function Q(e,t){if(isNaN(e)||isNaN(t))return NaN;var n=B(t,12);return e+=(t-n)/12,1===n?Z(e)?29:28:31-n%7%2}function X(e,t,n){var s,i,r,a=e.toLocaleLowerCase();if(!this._monthsParse)for(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],s=0;s<12;++s)r=d([2e3,s]),this._shortMonthsParse[s]=this.monthsShort(r,"").toLocaleLowerCase(),this._longMonthsParse[s]=this.months(r,"").toLocaleLowerCase();return n?"MMM"===t?-1!==(i=yn.call(this._shortMonthsParse,a))?i:null:-1!==(i=yn.call(this._longMonthsParse,a))?i:null:"MMM"===t?-1!==(i=yn.call(this._shortMonthsParse,a))?i:-1!==(i=yn.call(this._longMonthsParse,a))?i:null:-1!==(i=yn.call(this._longMonthsParse,a))?i:-1!==(i=yn.call(this._shortMonthsParse,a))?i:null}function K(e,t){var n;if(!e.isValid())return e;if("string"==typeof t)if(/^\d+$/.test(t))t=w(t);else if(t=e.localeData().monthsParse(t),!r(t))return e;return n=Math.min(e.date(),Q(e.year(),t)),e._d["set"+(e._isUTC?"UTC":"")+"Month"](t,n),e}function ee(t){return null!=t?(K(this,t),e.updateOffset(this,!0),this):q(this,"Month")}function te(){function e(e,t){return t.length-e.length}var t,n,s=[],i=[],r=[];for(t=0;t<12;t++)n=d([2e3,t]),s.push(this.monthsShort(n,"")),i.push(this.months(n,"")),r.push(this.months(n,"")),r.push(this.monthsShort(n,""));for(s.sort(e),i.sort(e),r.sort(e),t=0;t<12;t++)s[t]=j(s[t]),i[t]=j(i[t]);for(t=0;t<24;t++)r[t]=j(r[t]);this._monthsRegex=new RegExp("^("+r.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+i.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+s.join("|")+")","i")}function ne(e,t,n,s,i,r,a){var o=new Date(e,t,n,s,i,r,a);return e<100&&e>=0&&isFinite(o.getFullYear())&&o.setFullYear(e),o}function se(e){var t=new Date(Date.UTC.apply(null,arguments));return e<100&&e>=0&&isFinite(t.getUTCFullYear())&&t.setUTCFullYear(e),t}function ie(e,t,n){var s=7+t-n;return-((7+se(e,0,s).getUTCDay()-t)%7)+s-1}function re(e,t,n,s,i){var r,a,o=1+7*(t-1)+(7+n-s)%7+ie(e,s,i);return o<=0?a=z(r=e-1)+o:o>z(e)?(r=e+1,a=o-z(e)):(r=e,a=o),{year:r,dayOfYear:a}}function ae(e,t,n){var s,i,r=ie(e.year(),t,n),a=Math.floor((e.dayOfYear()-r-1)/7)+1;return a<1?s=a+oe(i=e.year()-1,t,n):a>oe(e.year(),t,n)?(s=a-oe(e.year(),t,n),i=e.year()+1):(i=e.year(),s=a),{week:s,year:i}}function oe(e,t,n){var s=ie(e,t,n),i=ie(e+1,t,n);return(z(e)-s+i)/7}function ue(e,t){return"string"!=typeof e?e:isNaN(e)?"number"==typeof(e=t.weekdaysParse(e))?e:null:parseInt(e,10)}function le(e,t){return"string"==typeof e?t.weekdaysParse(e)%7||7:isNaN(e)?null:e}function de(e,t,n){var s,i,r,a=e.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],s=0;s<7;++s)r=d([2e3,1]).day(s),this._minWeekdaysParse[s]=this.weekdaysMin(r,"").toLocaleLowerCase(),this._shortWeekdaysParse[s]=this.weekdaysShort(r,"").toLocaleLowerCase(),this._weekdaysParse[s]=this.weekdays(r,"").toLocaleLowerCase();return n?"dddd"===t?-1!==(i=yn.call(this._weekdaysParse,a))?i:null:"ddd"===t?-1!==(i=yn.call(this._shortWeekdaysParse,a))?i:null:-1!==(i=yn.call(this._minWeekdaysParse,a))?i:null:"dddd"===t?-1!==(i=yn.call(this._weekdaysParse,a))?i:-1!==(i=yn.call(this._shortWeekdaysParse,a))?i:-1!==(i=yn.call(this._minWeekdaysParse,a))?i:null:"ddd"===t?-1!==(i=yn.call(this._shortWeekdaysParse,a))?i:-1!==(i=yn.call(this._weekdaysParse,a))?i:-1!==(i=yn.call(this._minWeekdaysParse,a))?i:null:-1!==(i=yn.call(this._minWeekdaysParse,a))?i:-1!==(i=yn.call(this._weekdaysParse,a))?i:-1!==(i=yn.call(this._shortWeekdaysParse,a))?i:null}function he(){function e(e,t){return t.length-e.length}var t,n,s,i,r,a=[],o=[],u=[],l=[];for(t=0;t<7;t++)n=d([2e3,1]).day(t),s=this.weekdaysMin(n,""),i=this.weekdaysShort(n,""),r=this.weekdays(n,""),a.push(s),o.push(i),u.push(r),l.push(s),l.push(i),l.push(r);for(a.sort(e),o.sort(e),u.sort(e),l.sort(e),t=0;t<7;t++)o[t]=j(o[t]),u[t]=j(u[t]),l[t]=j(l[t]);this._weekdaysRegex=new RegExp("^("+l.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+u.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+o.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+a.join("|")+")","i")}function ce(){return this.hours()%12||12}function fe(e,t){C(e,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),t)})}function me(e,t){return t._meridiemParse}function _e(e){return e?e.toLowerCase().replace("_","-"):e}function ye(e){for(var t,n,s,i,r=0;r<e.length;){for(t=(i=_e(e[r]).split("-")).length,n=(n=_e(e[r+1]))?n.split("-"):null;t>0;){if(s=ge(i.slice(0,t).join("-")))return s;if(n&&n.length>=t&&v(i,n,!0)>=t-1)break;t--}r++}return null}function ge(e){var t=null;if(!Fn[e]&&"undefined"!=typeof module&&module&&module.exports)try{t=Pn._abbr,require("./locale/"+e),pe(t)}catch(e){}return Fn[e]}function pe(e,t){var n;return e&&(n=i(t)?ve(e):we(e,t))&&(Pn=n),Pn._abbr}function we(e,t){if(null!==t){var n=Cn;if(t.abbr=e,null!=Fn[e])S("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),n=Fn[e]._config;else if(null!=t.parentLocale){if(null==Fn[t.parentLocale])return Un[t.parentLocale]||(Un[t.parentLocale]=[]),Un[t.parentLocale].push({name:e,config:t}),null;n=Fn[t.parentLocale]._config}return Fn[e]=new O(Y(n,t)),Un[e]&&Un[e].forEach(function(e){we(e.name,e.config)}),pe(e),Fn[e]}return delete Fn[e],null}function ve(e){var n;if(e&&e._locale&&e._locale._abbr&&(e=e._locale._abbr),!e)return Pn;if(!t(e)){if(n=ge(e))return n;e=[e]}return ye(e)}function Me(e){var t,n=e._a;return n&&-2===c(e).overflow&&(t=n[un]<0||n[un]>11?un:n[ln]<1||n[ln]>Q(n[on],n[un])?ln:n[dn]<0||n[dn]>24||24===n[dn]&&(0!==n[hn]||0!==n[cn]||0!==n[fn])?dn:n[hn]<0||n[hn]>59?hn:n[cn]<0||n[cn]>59?cn:n[fn]<0||n[fn]>999?fn:-1,c(e)._overflowDayOfYear&&(t<on||t>ln)&&(t=ln),c(e)._overflowWeeks&&-1===t&&(t=mn),c(e)._overflowWeekday&&-1===t&&(t=_n),c(e).overflow=t),e}function ke(e,t,n){return null!=e?e:null!=t?t:n}function Se(t){var n=new Date(e.now());return t._useUTC?[n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate()]:[n.getFullYear(),n.getMonth(),n.getDate()]}function De(e){var t,n,s,i,r=[];if(!e._d){for(s=Se(e),e._w&&null==e._a[ln]&&null==e._a[un]&&Ye(e),null!=e._dayOfYear&&(i=ke(e._a[on],s[on]),(e._dayOfYear>z(i)||0===e._dayOfYear)&&(c(e)._overflowDayOfYear=!0),n=se(i,0,e._dayOfYear),e._a[un]=n.getUTCMonth(),e._a[ln]=n.getUTCDate()),t=0;t<3&&null==e._a[t];++t)e._a[t]=r[t]=s[t];for(;t<7;t++)e._a[t]=r[t]=null==e._a[t]?2===t?1:0:e._a[t];24===e._a[dn]&&0===e._a[hn]&&0===e._a[cn]&&0===e._a[fn]&&(e._nextDay=!0,e._a[dn]=0),e._d=(e._useUTC?se:ne).apply(null,r),null!=e._tzm&&e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),e._nextDay&&(e._a[dn]=24),e._w&&void 0!==e._w.d&&e._w.d!==e._d.getDay()&&(c(e).weekdayMismatch=!0)}}function Ye(e){var t,n,s,i,r,a,o,u;if(null!=(t=e._w).GG||null!=t.W||null!=t.E)r=1,a=4,n=ke(t.GG,e._a[on],ae(Ie(),1,4).year),s=ke(t.W,1),((i=ke(t.E,1))<1||i>7)&&(u=!0);else{r=e._locale._week.dow,a=e._locale._week.doy;var l=ae(Ie(),r,a);n=ke(t.gg,e._a[on],l.year),s=ke(t.w,l.week),null!=t.d?((i=t.d)<0||i>6)&&(u=!0):null!=t.e?(i=t.e+r,(t.e<0||t.e>6)&&(u=!0)):i=r}s<1||s>oe(n,r,a)?c(e)._overflowWeeks=!0:null!=u?c(e)._overflowWeekday=!0:(o=re(n,s,i,r,a),e._a[on]=o.year,e._dayOfYear=o.dayOfYear)}function Oe(e){var t,n,s,i,r,a,o=e._i,u=Nn.exec(o)||Hn.exec(o);if(u){for(c(e).iso=!0,t=0,n=Gn.length;t<n;t++)if(Gn[t][1].exec(u[1])){i=Gn[t][0],s=!1!==Gn[t][2];break}if(null==i)return void(e._isValid=!1);if(u[3]){for(t=0,n=Vn.length;t<n;t++)if(Vn[t][1].exec(u[3])){r=(u[2]||" ")+Vn[t][0];break}if(null==r)return void(e._isValid=!1)}if(!s&&null!=r)return void(e._isValid=!1);if(u[4]){if(!Ln.exec(u[4]))return void(e._isValid=!1);a="Z"}e._f=i+(r||"")+(a||""),Fe(e)}else e._isValid=!1}function xe(e,t,n,s,i,r){var a=[Te(e),vn.indexOf(t),parseInt(n,10),parseInt(s,10),parseInt(i,10)];return r&&a.push(parseInt(r,10)),a}function Te(e){var t=parseInt(e,10);return t<=49?2e3+t:t<=999?1900+t:t}function be(e){return e.replace(/\([^)]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").trim()}function Pe(e,t,n){return!e||Yn.indexOf(e)===new Date(t[0],t[1],t[2]).getDay()||(c(n).weekdayMismatch=!0,n._isValid=!1,!1)}function We(e,t,n){if(e)return En[e];if(t)return 0;var s=parseInt(n,10),i=s%100;return 60*((s-i)/100)+i}function Re(e){var t=In.exec(be(e._i));if(t){var n=xe(t[4],t[3],t[2],t[5],t[6],t[7]);if(!Pe(t[1],n,e))return;e._a=n,e._tzm=We(t[8],t[9],t[10]),e._d=se.apply(null,e._a),e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),c(e).rfc2822=!0}else e._isValid=!1}function Ce(t){var n=jn.exec(t._i);null===n?(Oe(t),!1===t._isValid&&(delete t._isValid,Re(t),!1===t._isValid&&(delete t._isValid,e.createFromInputFallback(t)))):t._d=new Date(+n[1])}function Fe(t){if(t._f!==e.ISO_8601)if(t._f!==e.RFC_2822){t._a=[],c(t).empty=!0;var n,s,i,r,a,o=""+t._i,u=o.length,l=0;for(i=H(t._f,t._locale).match(Ht)||[],n=0;n<i.length;n++)r=i[n],(s=(o.match(G(r,t))||[])[0])&&((a=o.substr(0,o.indexOf(s))).length>0&&c(t).unusedInput.push(a),o=o.slice(o.indexOf(s)+s.length),l+=s.length),Vt[r]?(s?c(t).empty=!1:c(t).unusedTokens.push(r),A(r,s,t)):t._strict&&!s&&c(t).unusedTokens.push(r);c(t).charsLeftOver=u-l,o.length>0&&c(t).unusedInput.push(o),t._a[dn]<=12&&!0===c(t).bigHour&&t._a[dn]>0&&(c(t).bigHour=void 0),c(t).parsedDateParts=t._a.slice(0),c(t).meridiem=t._meridiem,t._a[dn]=Ue(t._locale,t._a[dn],t._meridiem),De(t),Me(t)}else Re(t);else Oe(t)}function Ue(e,t,n){var s;return null==n?t:null!=e.meridiemHour?e.meridiemHour(t,n):null!=e.isPM?((s=e.isPM(n))&&t<12&&(t+=12),s||12!==t||(t=0),t):t}function Ne(e){var t,n,s,i,r;if(0===e._f.length)return c(e).invalidFormat=!0,void(e._d=new Date(NaN));for(i=0;i<e._f.length;i++)r=0,t=_({},e),null!=e._useUTC&&(t._useUTC=e._useUTC),t._f=e._f[i],Fe(t),f(t)&&(r+=c(t).charsLeftOver,r+=10*c(t).unusedTokens.length,c(t).score=r,(null==s||r<s)&&(s=r,n=t));l(e,n||t)}function He(e){if(!e._d){var t=b(e._i);e._a=o([t.year,t.month,t.day||t.date,t.hour,t.minute,t.second,t.millisecond],function(e){return e&&parseInt(e,10)}),De(e)}}function Le(e){var t=new y(Me(Ge(e)));return t._nextDay&&(t.add(1,"d"),t._nextDay=void 0),t}function Ge(e){var n=e._i,s=e._f;return e._locale=e._locale||ve(e._l),null===n||void 0===s&&""===n?m({nullInput:!0}):("string"==typeof n&&(e._i=n=e._locale.preparse(n)),g(n)?new y(Me(n)):(a(n)?e._d=n:t(s)?Ne(e):s?Fe(e):Ve(e),f(e)||(e._d=null),e))}function Ve(s){var u=s._i;i(u)?s._d=new Date(e.now()):a(u)?s._d=new Date(u.valueOf()):"string"==typeof u?Ce(s):t(u)?(s._a=o(u.slice(0),function(e){return parseInt(e,10)}),De(s)):n(u)?He(s):r(u)?s._d=new Date(u):e.createFromInputFallback(s)}function je(e,i,r,a,o){var u={};return!0!==r&&!1!==r||(a=r,r=void 0),(n(e)&&s(e)||t(e)&&0===e.length)&&(e=void 0),u._isAMomentObject=!0,u._useUTC=u._isUTC=o,u._l=r,u._i=e,u._f=i,u._strict=a,Le(u)}function Ie(e,t,n,s){return je(e,t,n,s,!1)}function Ee(e,n){var s,i;if(1===n.length&&t(n[0])&&(n=n[0]),!n.length)return Ie();for(s=n[0],i=1;i<n.length;++i)n[i].isValid()&&!n[i][e](s)||(s=n[i]);return s}function Ae(e){for(var t in e)if(-1===yn.call(Zn,t)||null!=e[t]&&isNaN(e[t]))return!1;for(var n=!1,s=0;s<Zn.length;++s)if(e[Zn[s]]){if(n)return!1;parseFloat(e[Zn[s]])!==w(e[Zn[s]])&&(n=!0)}return!0}function ze(e){var t=b(e),n=t.year||0,s=t.quarter||0,i=t.month||0,r=t.week||0,a=t.day||0,o=t.hour||0,u=t.minute||0,l=t.second||0,d=t.millisecond||0;this._isValid=Ae(t),this._milliseconds=+d+1e3*l+6e4*u+1e3*o*60*60,this._days=+a+7*r,this._months=+i+3*s+12*n,this._data={},this._locale=ve(),this._bubble()}function Ze(e){return e instanceof ze}function $e(e){return e<0?-1*Math.round(-1*e):Math.round(e)}function qe(e,t){C(e,0,0,function(){var e=this.utcOffset(),n="+";return e<0&&(e=-e,n="-"),n+R(~~(e/60),2)+t+R(~~e%60,2)})}function Je(e,t){var n=(t||"").match(e);if(null===n)return null;var s=((n[n.length-1]||[])+"").match($n)||["-",0,0],i=60*s[1]+w(s[2]);return 0===i?0:"+"===s[0]?i:-i}function Be(t,n){var s,i;return n._isUTC?(s=n.clone(),i=(g(t)||a(t)?t.valueOf():Ie(t).valueOf())-s.valueOf(),s._d.setTime(s._d.valueOf()+i),e.updateOffset(s,!1),s):Ie(t).local()}function Qe(e){return 15*-Math.round(e._d.getTimezoneOffset()/15)}function Xe(){return!!this.isValid()&&(this._isUTC&&0===this._offset)}function Ke(e,t){var n,s,i,a=e,o=null;return Ze(e)?a={ms:e._milliseconds,d:e._days,M:e._months}:r(e)?(a={},t?a[t]=e:a.milliseconds=e):(o=qn.exec(e))?(n="-"===o[1]?-1:1,a={y:0,d:w(o[ln])*n,h:w(o[dn])*n,m:w(o[hn])*n,s:w(o[cn])*n,ms:w($e(1e3*o[fn]))*n}):(o=Jn.exec(e))?(n="-"===o[1]?-1:(o[1],1),a={y:et(o[2],n),M:et(o[3],n),w:et(o[4],n),d:et(o[5],n),h:et(o[6],n),m:et(o[7],n),s:et(o[8],n)}):null==a?a={}:"object"==typeof a&&("from"in a||"to"in a)&&(i=nt(Ie(a.from),Ie(a.to)),(a={}).ms=i.milliseconds,a.M=i.months),s=new ze(a),Ze(e)&&u(e,"_locale")&&(s._locale=e._locale),s}function et(e,t){var n=e&&parseFloat(e.replace(",","."));return(isNaN(n)?0:n)*t}function tt(e,t){var n={milliseconds:0,months:0};return n.months=t.month()-e.month()+12*(t.year()-e.year()),e.clone().add(n.months,"M").isAfter(t)&&--n.months,n.milliseconds=+t-+e.clone().add(n.months,"M"),n}function nt(e,t){var n;return e.isValid()&&t.isValid()?(t=Be(t,e),e.isBefore(t)?n=tt(e,t):((n=tt(t,e)).milliseconds=-n.milliseconds,n.months=-n.months),n):{milliseconds:0,months:0}}function st(e,t){return function(n,s){var i,r;return null===s||isNaN(+s)||(S(t,"moment()."+t+"(period, number) is deprecated. Please use moment()."+t+"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),r=n,n=s,s=r),n="string"==typeof n?+n:n,i=Ke(n,s),it(this,i,e),this}}function it(t,n,s,i){var r=n._milliseconds,a=$e(n._days),o=$e(n._months);t.isValid()&&(i=null==i||i,o&&K(t,q(t,"Month")+o*s),a&&J(t,"Date",q(t,"Date")+a*s),r&&t._d.setTime(t._d.valueOf()+r*s),i&&e.updateOffset(t,a||o))}function rt(e,t){var n,s=12*(t.year()-e.year())+(t.month()-e.month()),i=e.clone().add(s,"months");return n=t-i<0?(t-i)/(i-e.clone().add(s-1,"months")):(t-i)/(e.clone().add(s+1,"months")-i),-(s+n)||0}function at(e){var t;return void 0===e?this._locale._abbr:(null!=(t=ve(e))&&(this._locale=t),this)}function ot(){return this._locale}function ut(e,t){C(0,[e,e.length],0,t)}function lt(e,t,n,s,i){var r;return null==e?ae(this,s,i).year:(r=oe(e,s,i),t>r&&(t=r),dt.call(this,e,t,n,s,i))}function dt(e,t,n,s,i){var r=re(e,t,n,s,i),a=se(r.year,0,r.dayOfYear);return this.year(a.getUTCFullYear()),this.month(a.getUTCMonth()),this.date(a.getUTCDate()),this}function ht(e){return e}function ct(e,t,n,s){var i=ve(),r=d().set(s,t);return i[n](r,e)}function ft(e,t,n){if(r(e)&&(t=e,e=void 0),e=e||"",null!=t)return ct(e,t,n,"month");var s,i=[];for(s=0;s<12;s++)i[s]=ct(e,s,n,"month");return i}function mt(e,t,n,s){"boolean"==typeof e?(r(t)&&(n=t,t=void 0),t=t||""):(n=t=e,e=!1,r(t)&&(n=t,t=void 0),t=t||"");var i=ve(),a=e?i._week.dow:0;if(null!=n)return ct(t,(n+a)%7,s,"day");var o,u=[];for(o=0;o<7;o++)u[o]=ct(t,(o+a)%7,s,"day");return u}function _t(e,t,n,s){var i=Ke(t,n);return e._milliseconds+=s*i._milliseconds,e._days+=s*i._days,e._months+=s*i._months,e._bubble()}function yt(e){return e<0?Math.floor(e):Math.ceil(e)}function gt(e){return 4800*e/146097}function pt(e){return 146097*e/4800}function wt(e){return function(){return this.as(e)}}function vt(e){return function(){return this.isValid()?this._data[e]:NaN}}function Mt(e,t,n,s,i){return i.relativeTime(t||1,!!n,e,s)}function kt(e,t,n){var s=Ke(e).abs(),i=ks(s.as("s")),r=ks(s.as("m")),a=ks(s.as("h")),o=ks(s.as("d")),u=ks(s.as("M")),l=ks(s.as("y")),d=i<=Ss.ss&&["s",i]||i<Ss.s&&["ss",i]||r<=1&&["m"]||r<Ss.m&&["mm",r]||a<=1&&["h"]||a<Ss.h&&["hh",a]||o<=1&&["d"]||o<Ss.d&&["dd",o]||u<=1&&["M"]||u<Ss.M&&["MM",u]||l<=1&&["y"]||["yy",l];return d[2]=t,d[3]=+e>0,d[4]=n,Mt.apply(null,d)}function St(e){return(e>0)-(e<0)||+e}function Dt(){if(!this.isValid())return this.localeData().invalidDate();var e,t,n,s=Ds(this._milliseconds)/1e3,i=Ds(this._days),r=Ds(this._months);t=p((e=p(s/60))/60),s%=60,e%=60;var a=n=p(r/12),o=r%=12,u=i,l=t,d=e,h=s?s.toFixed(3).replace(/\.?0+$/,""):"",c=this.asSeconds();if(!c)return"P0D";var f=c<0?"-":"",m=St(this._months)!==St(c)?"-":"",_=St(this._days)!==St(c)?"-":"",y=St(this._milliseconds)!==St(c)?"-":"";return f+"P"+(a?m+a+"Y":"")+(o?m+o+"M":"")+(u?_+u+"D":"")+(l||d||h?"T":"")+(l?y+l+"H":"")+(d?y+d+"M":"")+(h?y+h+"S":"")}var Yt,Ot;Ot=Array.prototype.some?Array.prototype.some:function(e){for(var t=Object(this),n=t.length>>>0,s=0;s<n;s++)if(s in t&&e.call(this,t[s],s,t))return!0;return!1};var xt=e.momentProperties=[],Tt=!1,bt={};e.suppressDeprecationWarnings=!1,e.deprecationHandler=null;var Pt;Pt=Object.keys?Object.keys:function(e){var t,n=[];for(t in e)u(e,t)&&n.push(t);return n};var Wt={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},Rt={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},Ct=/\d{1,2}/,Ft={future:"in %s",past:"%s ago",s:"a few seconds",ss:"%d seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},Ut={},Nt={},Ht=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,Lt=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Gt={},Vt={},jt=/\d/,It=/\d\d/,Et=/\d{3}/,At=/\d{4}/,zt=/[+-]?\d{6}/,Zt=/\d\d?/,$t=/\d\d\d\d?/,qt=/\d\d\d\d\d\d?/,Jt=/\d{1,3}/,Bt=/\d{1,4}/,Qt=/[+-]?\d{1,6}/,Xt=/\d+/,Kt=/[+-]?\d+/,en=/Z|[+-]\d\d:?\d\d/gi,tn=/Z|[+-]\d\d(?::?\d\d)?/gi,nn=/[+-]?\d+(\.\d{1,3})?/,sn=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,rn={},an={},on=0,un=1,ln=2,dn=3,hn=4,cn=5,fn=6,mn=7,_n=8;C("Y",0,0,function(){var e=this.year();return e<=9999?""+e:"+"+e}),C(0,["YY",2],0,function(){return this.year()%100}),C(0,["YYYY",4],0,"year"),C(0,["YYYYY",5],0,"year"),C(0,["YYYYYY",6,!0],0,"year"),x("year","y"),P("year",1),L("Y",Kt),L("YY",Zt,It),L("YYYY",Bt,At),L("YYYYY",Qt,zt),L("YYYYYY",Qt,zt),I(["YYYYY","YYYYYY"],on),I("YYYY",function(t,n){n[on]=2===t.length?e.parseTwoDigitYear(t):w(t)}),I("YY",function(t,n){n[on]=e.parseTwoDigitYear(t)}),I("Y",function(e,t){t[on]=parseInt(e,10)}),e.parseTwoDigitYear=function(e){return w(e)+(w(e)>68?1900:2e3)};var yn,gn=$("FullYear",!0);yn=Array.prototype.indexOf?Array.prototype.indexOf:function(e){var t;for(t=0;t<this.length;++t)if(this[t]===e)return t;return-1},C("M",["MM",2],"Mo",function(){return this.month()+1}),C("MMM",0,0,function(e){return this.localeData().monthsShort(this,e)}),C("MMMM",0,0,function(e){return this.localeData().months(this,e)}),x("month","M"),P("month",8),L("M",Zt),L("MM",Zt,It),L("MMM",function(e,t){return t.monthsShortRegex(e)}),L("MMMM",function(e,t){return t.monthsRegex(e)}),I(["M","MM"],function(e,t){t[un]=w(e)-1}),I(["MMM","MMMM"],function(e,t,n,s){var i=n._locale.monthsParse(e,s,n._strict);null!=i?t[un]=i:c(n).invalidMonth=e});var pn=/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,wn="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),vn="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),Mn=sn,kn=sn;C("w",["ww",2],"wo","week"),C("W",["WW",2],"Wo","isoWeek"),x("week","w"),x("isoWeek","W"),P("week",5),P("isoWeek",5),L("w",Zt),L("ww",Zt,It),L("W",Zt),L("WW",Zt,It),E(["w","ww","W","WW"],function(e,t,n,s){t[s.substr(0,1)]=w(e)});var Sn={dow:0,doy:6};C("d",0,"do","day"),C("dd",0,0,function(e){return this.localeData().weekdaysMin(this,e)}),C("ddd",0,0,function(e){return this.localeData().weekdaysShort(this,e)}),C("dddd",0,0,function(e){return this.localeData().weekdays(this,e)}),C("e",0,0,"weekday"),C("E",0,0,"isoWeekday"),x("day","d"),x("weekday","e"),x("isoWeekday","E"),P("day",11),P("weekday",11),P("isoWeekday",11),L("d",Zt),L("e",Zt),L("E",Zt),L("dd",function(e,t){return t.weekdaysMinRegex(e)}),L("ddd",function(e,t){return t.weekdaysShortRegex(e)}),L("dddd",function(e,t){return t.weekdaysRegex(e)}),E(["dd","ddd","dddd"],function(e,t,n,s){var i=n._locale.weekdaysParse(e,s,n._strict);null!=i?t.d=i:c(n).invalidWeekday=e}),E(["d","e","E"],function(e,t,n,s){t[s]=w(e)});var Dn="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),Yn="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),On="Su_Mo_Tu_We_Th_Fr_Sa".split("_"),xn=sn,Tn=sn,bn=sn;C("H",["HH",2],0,"hour"),C("h",["hh",2],0,ce),C("k",["kk",2],0,function(){return this.hours()||24}),C("hmm",0,0,function(){return""+ce.apply(this)+R(this.minutes(),2)}),C("hmmss",0,0,function(){return""+ce.apply(this)+R(this.minutes(),2)+R(this.seconds(),2)}),C("Hmm",0,0,function(){return""+this.hours()+R(this.minutes(),2)}),C("Hmmss",0,0,function(){return""+this.hours()+R(this.minutes(),2)+R(this.seconds(),2)}),fe("a",!0),fe("A",!1),x("hour","h"),P("hour",13),L("a",me),L("A",me),L("H",Zt),L("h",Zt),L("k",Zt),L("HH",Zt,It),L("hh",Zt,It),L("kk",Zt,It),L("hmm",$t),L("hmmss",qt),L("Hmm",$t),L("Hmmss",qt),I(["H","HH"],dn),I(["k","kk"],function(e,t,n){var s=w(e);t[dn]=24===s?0:s}),I(["a","A"],function(e,t,n){n._isPm=n._locale.isPM(e),n._meridiem=e}),I(["h","hh"],function(e,t,n){t[dn]=w(e),c(n).bigHour=!0}),I("hmm",function(e,t,n){var s=e.length-2;t[dn]=w(e.substr(0,s)),t[hn]=w(e.substr(s)),c(n).bigHour=!0}),I("hmmss",function(e,t,n){var s=e.length-4,i=e.length-2;t[dn]=w(e.substr(0,s)),t[hn]=w(e.substr(s,2)),t[cn]=w(e.substr(i)),c(n).bigHour=!0}),I("Hmm",function(e,t,n){var s=e.length-2;t[dn]=w(e.substr(0,s)),t[hn]=w(e.substr(s))}),I("Hmmss",function(e,t,n){var s=e.length-4,i=e.length-2;t[dn]=w(e.substr(0,s)),t[hn]=w(e.substr(s,2)),t[cn]=w(e.substr(i))});var Pn,Wn=/[ap]\.?m?\.?/i,Rn=$("Hours",!0),Cn={calendar:Wt,longDateFormat:Rt,invalidDate:"Invalid date",ordinal:"%d",dayOfMonthOrdinalParse:Ct,relativeTime:Ft,months:wn,monthsShort:vn,week:Sn,weekdays:Dn,weekdaysMin:On,weekdaysShort:Yn,meridiemParse:Wn},Fn={},Un={},Nn=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Hn=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Ln=/Z|[+-]\d\d(?::?\d\d)?/,Gn=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],Vn=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],jn=/^\/?Date\((\-?\d+)/i,In=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,En={UT:0,GMT:0,EDT:-240,EST:-300,CDT:-300,CST:-360,MDT:-360,MST:-420,PDT:-420,PST:-480};e.createFromInputFallback=k("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",function(e){e._d=new Date(e._i+(e._useUTC?" UTC":""))}),e.ISO_8601=function(){},e.RFC_2822=function(){};var An=k("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=Ie.apply(null,arguments);return this.isValid()&&e.isValid()?e<this?this:e:m()}),zn=k("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=Ie.apply(null,arguments);return this.isValid()&&e.isValid()?e>this?this:e:m()}),Zn=["year","quarter","month","week","day","hour","minute","second","millisecond"];qe("Z",":"),qe("ZZ",""),L("Z",tn),L("ZZ",tn),I(["Z","ZZ"],function(e,t,n){n._useUTC=!0,n._tzm=Je(tn,e)});var $n=/([\+\-]|\d\d)/gi;e.updateOffset=function(){};var qn=/^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,Jn=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;Ke.fn=ze.prototype,Ke.invalid=function(){return Ke(NaN)};var Bn=st(1,"add"),Qn=st(-1,"subtract");e.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",e.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";var Xn=k("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(e){return void 0===e?this.localeData():this.locale(e)});C(0,["gg",2],0,function(){return this.weekYear()%100}),C(0,["GG",2],0,function(){return this.isoWeekYear()%100}),ut("gggg","weekYear"),ut("ggggg","weekYear"),ut("GGGG","isoWeekYear"),ut("GGGGG","isoWeekYear"),x("weekYear","gg"),x("isoWeekYear","GG"),P("weekYear",1),P("isoWeekYear",1),L("G",Kt),L("g",Kt),L("GG",Zt,It),L("gg",Zt,It),L("GGGG",Bt,At),L("gggg",Bt,At),L("GGGGG",Qt,zt),L("ggggg",Qt,zt),E(["gggg","ggggg","GGGG","GGGGG"],function(e,t,n,s){t[s.substr(0,2)]=w(e)}),E(["gg","GG"],function(t,n,s,i){n[i]=e.parseTwoDigitYear(t)}),C("Q",0,"Qo","quarter"),x("quarter","Q"),P("quarter",7),L("Q",jt),I("Q",function(e,t){t[un]=3*(w(e)-1)}),C("D",["DD",2],"Do","date"),x("date","D"),P("date",9),L("D",Zt),L("DD",Zt,It),L("Do",function(e,t){return e?t._dayOfMonthOrdinalParse||t._ordinalParse:t._dayOfMonthOrdinalParseLenient}),I(["D","DD"],ln),I("Do",function(e,t){t[ln]=w(e.match(Zt)[0],10)});var Kn=$("Date",!0);C("DDD",["DDDD",3],"DDDo","dayOfYear"),x("dayOfYear","DDD"),P("dayOfYear",4),L("DDD",Jt),L("DDDD",Et),I(["DDD","DDDD"],function(e,t,n){n._dayOfYear=w(e)}),C("m",["mm",2],0,"minute"),x("minute","m"),P("minute",14),L("m",Zt),L("mm",Zt,It),I(["m","mm"],hn);var es=$("Minutes",!1);C("s",["ss",2],0,"second"),x("second","s"),P("second",15),L("s",Zt),L("ss",Zt,It),I(["s","ss"],cn);var ts=$("Seconds",!1);C("S",0,0,function(){return~~(this.millisecond()/100)}),C(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),C(0,["SSS",3],0,"millisecond"),C(0,["SSSS",4],0,function(){return 10*this.millisecond()}),C(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),C(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),C(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),C(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),C(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),x("millisecond","ms"),P("millisecond",16),L("S",Jt,jt),L("SS",Jt,It),L("SSS",Jt,Et);var ns;for(ns="SSSS";ns.length<=9;ns+="S")L(ns,Xt);for(ns="S";ns.length<=9;ns+="S")I(ns,function(e,t){t[fn]=w(1e3*("0."+e))});var ss=$("Milliseconds",!1);C("z",0,0,"zoneAbbr"),C("zz",0,0,"zoneName");var is=y.prototype;is.add=Bn,is.calendar=function(t,n){var s=t||Ie(),i=Be(s,this).startOf("day"),r=e.calendarFormat(this,i)||"sameElse",a=n&&(D(n[r])?n[r].call(this,s):n[r]);return this.format(a||this.localeData().calendar(r,this,Ie(s)))},is.clone=function(){return new y(this)},is.diff=function(e,t,n){var s,i,r;if(!this.isValid())return NaN;if(!(s=Be(e,this)).isValid())return NaN;switch(i=6e4*(s.utcOffset()-this.utcOffset()),t=T(t)){case"year":r=rt(this,s)/12;break;case"month":r=rt(this,s);break;case"quarter":r=rt(this,s)/3;break;case"second":r=(this-s)/1e3;break;case"minute":r=(this-s)/6e4;break;case"hour":r=(this-s)/36e5;break;case"day":r=(this-s-i)/864e5;break;case"week":r=(this-s-i)/6048e5;break;default:r=this-s}return n?r:p(r)},is.endOf=function(e){return void 0===(e=T(e))||"millisecond"===e?this:("date"===e&&(e="day"),this.startOf(e).add(1,"isoWeek"===e?"week":e).subtract(1,"ms"))},is.format=function(t){t||(t=this.isUtc()?e.defaultFormatUtc:e.defaultFormat);var n=N(this,t);return this.localeData().postformat(n)},is.from=function(e,t){return this.isValid()&&(g(e)&&e.isValid()||Ie(e).isValid())?Ke({to:this,from:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()},is.fromNow=function(e){return this.from(Ie(),e)},is.to=function(e,t){return this.isValid()&&(g(e)&&e.isValid()||Ie(e).isValid())?Ke({from:this,to:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()},is.toNow=function(e){return this.to(Ie(),e)},is.get=function(e){return e=T(e),D(this[e])?this[e]():this},is.invalidAt=function(){return c(this).overflow},is.isAfter=function(e,t){var n=g(e)?e:Ie(e);return!(!this.isValid()||!n.isValid())&&("millisecond"===(t=T(i(t)?"millisecond":t))?this.valueOf()>n.valueOf():n.valueOf()<this.clone().startOf(t).valueOf())},is.isBefore=function(e,t){var n=g(e)?e:Ie(e);return!(!this.isValid()||!n.isValid())&&("millisecond"===(t=T(i(t)?"millisecond":t))?this.valueOf()<n.valueOf():this.clone().endOf(t).valueOf()<n.valueOf())},is.isBetween=function(e,t,n,s){return("("===(s=s||"()")[0]?this.isAfter(e,n):!this.isBefore(e,n))&&(")"===s[1]?this.isBefore(t,n):!this.isAfter(t,n))},is.isSame=function(e,t){var n,s=g(e)?e:Ie(e);return!(!this.isValid()||!s.isValid())&&("millisecond"===(t=T(t||"millisecond"))?this.valueOf()===s.valueOf():(n=s.valueOf(),this.clone().startOf(t).valueOf()<=n&&n<=this.clone().endOf(t).valueOf()))},is.isSameOrAfter=function(e,t){return this.isSame(e,t)||this.isAfter(e,t)},is.isSameOrBefore=function(e,t){return this.isSame(e,t)||this.isBefore(e,t)},is.isValid=function(){return f(this)},is.lang=Xn,is.locale=at,is.localeData=ot,is.max=zn,is.min=An,is.parsingFlags=function(){return l({},c(this))},is.set=function(e,t){if("object"==typeof e)for(var n=W(e=b(e)),s=0;s<n.length;s++)this[n[s].unit](e[n[s].unit]);else if(e=T(e),D(this[e]))return this[e](t);return this},is.startOf=function(e){switch(e=T(e)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":case"date":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===e&&this.weekday(0),"isoWeek"===e&&this.isoWeekday(1),"quarter"===e&&this.month(3*Math.floor(this.month()/3)),this},is.subtract=Qn,is.toArray=function(){var e=this;return[e.year(),e.month(),e.date(),e.hour(),e.minute(),e.second(),e.millisecond()]},is.toObject=function(){var e=this;return{years:e.year(),months:e.month(),date:e.date(),hours:e.hours(),minutes:e.minutes(),seconds:e.seconds(),milliseconds:e.milliseconds()}},is.toDate=function(){return new Date(this.valueOf())},is.toISOString=function(){if(!this.isValid())return null;var e=this.clone().utc();return e.year()<0||e.year()>9999?N(e,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):D(Date.prototype.toISOString)?this.toDate().toISOString():N(e,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},is.inspect=function(){if(!this.isValid())return"moment.invalid(/* "+this._i+" */)";var e="moment",t="";this.isLocal()||(e=0===this.utcOffset()?"moment.utc":"moment.parseZone",t="Z");var n="["+e+'("]',s=0<=this.year()&&this.year()<=9999?"YYYY":"YYYYYY",i=t+'[")]';return this.format(n+s+"-MM-DD[T]HH:mm:ss.SSS"+i)},is.toJSON=function(){return this.isValid()?this.toISOString():null},is.toString=function(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},is.unix=function(){return Math.floor(this.valueOf()/1e3)},is.valueOf=function(){return this._d.valueOf()-6e4*(this._offset||0)},is.creationData=function(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}},is.year=gn,is.isLeapYear=function(){return Z(this.year())},is.weekYear=function(e){return lt.call(this,e,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)},is.isoWeekYear=function(e){return lt.call(this,e,this.isoWeek(),this.isoWeekday(),1,4)},is.quarter=is.quarters=function(e){return null==e?Math.ceil((this.month()+1)/3):this.month(3*(e-1)+this.month()%3)},is.month=ee,is.daysInMonth=function(){return Q(this.year(),this.month())},is.week=is.weeks=function(e){var t=this.localeData().week(this);return null==e?t:this.add(7*(e-t),"d")},is.isoWeek=is.isoWeeks=function(e){var t=ae(this,1,4).week;return null==e?t:this.add(7*(e-t),"d")},is.weeksInYear=function(){var e=this.localeData()._week;return oe(this.year(),e.dow,e.doy)},is.isoWeeksInYear=function(){return oe(this.year(),1,4)},is.date=Kn,is.day=is.days=function(e){if(!this.isValid())return null!=e?this:NaN;var t=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=e?(e=ue(e,this.localeData()),this.add(e-t,"d")):t},is.weekday=function(e){if(!this.isValid())return null!=e?this:NaN;var t=(this.day()+7-this.localeData()._week.dow)%7;return null==e?t:this.add(e-t,"d")},is.isoWeekday=function(e){if(!this.isValid())return null!=e?this:NaN;if(null!=e){var t=le(e,this.localeData());return this.day(this.day()%7?t:t-7)}return this.day()||7},is.dayOfYear=function(e){var t=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==e?t:this.add(e-t,"d")},is.hour=is.hours=Rn,is.minute=is.minutes=es,is.second=is.seconds=ts,is.millisecond=is.milliseconds=ss,is.utcOffset=function(t,n,s){var i,r=this._offset||0;if(!this.isValid())return null!=t?this:NaN;if(null!=t){if("string"==typeof t){if(null===(t=Je(tn,t)))return this}else Math.abs(t)<16&&!s&&(t*=60);return!this._isUTC&&n&&(i=Qe(this)),this._offset=t,this._isUTC=!0,null!=i&&this.add(i,"m"),r!==t&&(!n||this._changeInProgress?it(this,Ke(t-r,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,e.updateOffset(this,!0),this._changeInProgress=null)),this}return this._isUTC?r:Qe(this)},is.utc=function(e){return this.utcOffset(0,e)},is.local=function(e){return this._isUTC&&(this.utcOffset(0,e),this._isUTC=!1,e&&this.subtract(Qe(this),"m")),this},is.parseZone=function(){if(null!=this._tzm)this.utcOffset(this._tzm,!1,!0);else if("string"==typeof this._i){var e=Je(en,this._i);null!=e?this.utcOffset(e):this.utcOffset(0,!0)}return this},is.hasAlignedHourOffset=function(e){return!!this.isValid()&&(e=e?Ie(e).utcOffset():0,(this.utcOffset()-e)%60==0)},is.isDST=function(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()},is.isLocal=function(){return!!this.isValid()&&!this._isUTC},is.isUtcOffset=function(){return!!this.isValid()&&this._isUTC},is.isUtc=Xe,is.isUTC=Xe,is.zoneAbbr=function(){return this._isUTC?"UTC":""},is.zoneName=function(){return this._isUTC?"Coordinated Universal Time":""},is.dates=k("dates accessor is deprecated. Use date instead.",Kn),is.months=k("months accessor is deprecated. Use month instead",ee),is.years=k("years accessor is deprecated. Use year instead",gn),is.zone=k("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",function(e,t){return null!=e?("string"!=typeof e&&(e=-e),this.utcOffset(e,t),this):-this.utcOffset()}),is.isDSTShifted=k("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",function(){if(!i(this._isDSTShifted))return this._isDSTShifted;var e={};if(_(e,this),(e=Ge(e))._a){var t=e._isUTC?d(e._a):Ie(e._a);this._isDSTShifted=this.isValid()&&v(e._a,t.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted});var rs=O.prototype;rs.calendar=function(e,t,n){var s=this._calendar[e]||this._calendar.sameElse;return D(s)?s.call(t,n):s},rs.longDateFormat=function(e){var t=this._longDateFormat[e],n=this._longDateFormat[e.toUpperCase()];return t||!n?t:(this._longDateFormat[e]=n.replace(/MMMM|MM|DD|dddd/g,function(e){return e.slice(1)}),this._longDateFormat[e])},rs.invalidDate=function(){return this._invalidDate},rs.ordinal=function(e){return this._ordinal.replace("%d",e)},rs.preparse=ht,rs.postformat=ht,rs.relativeTime=function(e,t,n,s){var i=this._relativeTime[n];return D(i)?i(e,t,n,s):i.replace(/%d/i,e)},rs.pastFuture=function(e,t){var n=this._relativeTime[e>0?"future":"past"];return D(n)?n(t):n.replace(/%s/i,t)},rs.set=function(e){var t,n;for(n in e)D(t=e[n])?this[n]=t:this["_"+n]=t;this._config=e,this._dayOfMonthOrdinalParseLenient=new RegExp((this._dayOfMonthOrdinalParse.source||this._ordinalParse.source)+"|"+/\d{1,2}/.source)},rs.months=function(e,n){return e?t(this._months)?this._months[e.month()]:this._months[(this._months.isFormat||pn).test(n)?"format":"standalone"][e.month()]:t(this._months)?this._months:this._months.standalone},rs.monthsShort=function(e,n){return e?t(this._monthsShort)?this._monthsShort[e.month()]:this._monthsShort[pn.test(n)?"format":"standalone"][e.month()]:t(this._monthsShort)?this._monthsShort:this._monthsShort.standalone},rs.monthsParse=function(e,t,n){var s,i,r;if(this._monthsParseExact)return X.call(this,e,t,n);for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),s=0;s<12;s++){if(i=d([2e3,s]),n&&!this._longMonthsParse[s]&&(this._longMonthsParse[s]=new RegExp("^"+this.months(i,"").replace(".","")+"$","i"),this._shortMonthsParse[s]=new RegExp("^"+this.monthsShort(i,"").replace(".","")+"$","i")),n||this._monthsParse[s]||(r="^"+this.months(i,"")+"|^"+this.monthsShort(i,""),this._monthsParse[s]=new RegExp(r.replace(".",""),"i")),n&&"MMMM"===t&&this._longMonthsParse[s].test(e))return s;if(n&&"MMM"===t&&this._shortMonthsParse[s].test(e))return s;if(!n&&this._monthsParse[s].test(e))return s}},rs.monthsRegex=function(e){return this._monthsParseExact?(u(this,"_monthsRegex")||te.call(this),e?this._monthsStrictRegex:this._monthsRegex):(u(this,"_monthsRegex")||(this._monthsRegex=kn),this._monthsStrictRegex&&e?this._monthsStrictRegex:this._monthsRegex)},rs.monthsShortRegex=function(e){return this._monthsParseExact?(u(this,"_monthsRegex")||te.call(this),e?this._monthsShortStrictRegex:this._monthsShortRegex):(u(this,"_monthsShortRegex")||(this._monthsShortRegex=Mn),this._monthsShortStrictRegex&&e?this._monthsShortStrictRegex:this._monthsShortRegex)},rs.week=function(e){return ae(e,this._week.dow,this._week.doy).week},rs.firstDayOfYear=function(){return this._week.doy},rs.firstDayOfWeek=function(){return this._week.dow},rs.weekdays=function(e,n){return e?t(this._weekdays)?this._weekdays[e.day()]:this._weekdays[this._weekdays.isFormat.test(n)?"format":"standalone"][e.day()]:t(this._weekdays)?this._weekdays:this._weekdays.standalone},rs.weekdaysMin=function(e){return e?this._weekdaysMin[e.day()]:this._weekdaysMin},rs.weekdaysShort=function(e){return e?this._weekdaysShort[e.day()]:this._weekdaysShort},rs.weekdaysParse=function(e,t,n){var s,i,r;if(this._weekdaysParseExact)return de.call(this,e,t,n);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),s=0;s<7;s++){if(i=d([2e3,1]).day(s),n&&!this._fullWeekdaysParse[s]&&(this._fullWeekdaysParse[s]=new RegExp("^"+this.weekdays(i,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[s]=new RegExp("^"+this.weekdaysShort(i,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[s]=new RegExp("^"+this.weekdaysMin(i,"").replace(".",".?")+"$","i")),this._weekdaysParse[s]||(r="^"+this.weekdays(i,"")+"|^"+this.weekdaysShort(i,"")+"|^"+this.weekdaysMin(i,""),this._weekdaysParse[s]=new RegExp(r.replace(".",""),"i")),n&&"dddd"===t&&this._fullWeekdaysParse[s].test(e))return s;if(n&&"ddd"===t&&this._shortWeekdaysParse[s].test(e))return s;if(n&&"dd"===t&&this._minWeekdaysParse[s].test(e))return s;if(!n&&this._weekdaysParse[s].test(e))return s}},rs.weekdaysRegex=function(e){return this._weekdaysParseExact?(u(this,"_weekdaysRegex")||he.call(this),e?this._weekdaysStrictRegex:this._weekdaysRegex):(u(this,"_weekdaysRegex")||(this._weekdaysRegex=xn),this._weekdaysStrictRegex&&e?this._weekdaysStrictRegex:this._weekdaysRegex)},rs.weekdaysShortRegex=function(e){return this._weekdaysParseExact?(u(this,"_weekdaysRegex")||he.call(this),e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):(u(this,"_weekdaysShortRegex")||(this._weekdaysShortRegex=Tn),this._weekdaysShortStrictRegex&&e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex)},rs.weekdaysMinRegex=function(e){return this._weekdaysParseExact?(u(this,"_weekdaysRegex")||he.call(this),e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):(u(this,"_weekdaysMinRegex")||(this._weekdaysMinRegex=bn),this._weekdaysMinStrictRegex&&e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex)},rs.isPM=function(e){return"p"===(e+"").toLowerCase().charAt(0)},rs.meridiem=function(e,t,n){return e>11?n?"pm":"PM":n?"am":"AM"},pe("en",{dayOfMonthOrdinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(e){var t=e%10;return e+(1===w(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th")}}),e.lang=k("moment.lang is deprecated. Use moment.locale instead.",pe),e.langData=k("moment.langData is deprecated. Use moment.localeData instead.",ve);var as=Math.abs,os=wt("ms"),us=wt("s"),ls=wt("m"),ds=wt("h"),hs=wt("d"),cs=wt("w"),fs=wt("M"),ms=wt("y"),_s=vt("milliseconds"),ys=vt("seconds"),gs=vt("minutes"),ps=vt("hours"),ws=vt("days"),vs=vt("months"),Ms=vt("years"),ks=Math.round,Ss={ss:44,s:45,m:45,h:22,d:26,M:11},Ds=Math.abs,Ys=ze.prototype;return Ys.isValid=function(){return this._isValid},Ys.abs=function(){var e=this._data;return this._milliseconds=as(this._milliseconds),this._days=as(this._days),this._months=as(this._months),e.milliseconds=as(e.milliseconds),e.seconds=as(e.seconds),e.minutes=as(e.minutes),e.hours=as(e.hours),e.months=as(e.months),e.years=as(e.years),this},Ys.add=function(e,t){return _t(this,e,t,1)},Ys.subtract=function(e,t){return _t(this,e,t,-1)},Ys.as=function(e){if(!this.isValid())return NaN;var t,n,s=this._milliseconds;if("month"===(e=T(e))||"year"===e)return t=this._days+s/864e5,n=this._months+gt(t),"month"===e?n:n/12;switch(t=this._days+Math.round(pt(this._months)),e){case"week":return t/7+s/6048e5;case"day":return t+s/864e5;case"hour":return 24*t+s/36e5;case"minute":return 1440*t+s/6e4;case"second":return 86400*t+s/1e3;case"millisecond":return Math.floor(864e5*t)+s;default:throw new Error("Unknown unit "+e)}},Ys.asMilliseconds=os,Ys.asSeconds=us,Ys.asMinutes=ls,Ys.asHours=ds,Ys.asDays=hs,Ys.asWeeks=cs,Ys.asMonths=fs,Ys.asYears=ms,Ys.valueOf=function(){return this.isValid()?this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*w(this._months/12):NaN},Ys._bubble=function(){var e,t,n,s,i,r=this._milliseconds,a=this._days,o=this._months,u=this._data;return r>=0&&a>=0&&o>=0||r<=0&&a<=0&&o<=0||(r+=864e5*yt(pt(o)+a),a=0,o=0),u.milliseconds=r%1e3,e=p(r/1e3),u.seconds=e%60,t=p(e/60),u.minutes=t%60,n=p(t/60),u.hours=n%24,a+=p(n/24),i=p(gt(a)),o+=i,a-=yt(pt(i)),s=p(o/12),o%=12,u.days=a,u.months=o,u.years=s,this},Ys.clone=function(){return Ke(this)},Ys.get=function(e){return e=T(e),this.isValid()?this[e+"s"]():NaN},Ys.milliseconds=_s,Ys.seconds=ys,Ys.minutes=gs,Ys.hours=ps,Ys.days=ws,Ys.weeks=function(){return p(this.days()/7)},Ys.months=vs,Ys.years=Ms,Ys.humanize=function(e){if(!this.isValid())return this.localeData().invalidDate();var t=this.localeData(),n=kt(this,!e,t);return e&&(n=t.pastFuture(+this,n)),t.postformat(n)},Ys.toISOString=Dt,Ys.toString=Dt,Ys.toJSON=Dt,Ys.locale=at,Ys.localeData=ot,Ys.toIsoString=k("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",Dt),Ys.lang=Xn,C("X",0,0,"unix"),C("x",0,0,"valueOf"),L("x",Kt),L("X",nn),I("X",function(e,t,n){n._d=new Date(1e3*parseFloat(e,10))}),I("x",function(e,t,n){n._d=new Date(w(e))}),e.version="2.19.1",function(e){Yt=e}(Ie),e.fn=is,e.min=function(){return Ee("isBefore",[].slice.call(arguments,0))},e.max=function(){return Ee("isAfter",[].slice.call(arguments,0))},e.now=function(){return Date.now?Date.now():+new Date},e.utc=d,e.unix=function(e){return Ie(1e3*e)},e.months=function(e,t){return ft(e,t,"months")},e.isDate=a,e.locale=pe,e.invalid=m,e.duration=Ke,e.isMoment=g,e.weekdays=function(e,t,n){return mt(e,t,n,"weekdays")},e.parseZone=function(){return Ie.apply(null,arguments).parseZone()},e.localeData=ve,e.isDuration=Ze,e.monthsShort=function(e,t){return ft(e,t,"monthsShort")},e.weekdaysMin=function(e,t,n){return mt(e,t,n,"weekdaysMin")},e.defineLocale=we,e.updateLocale=function(e,t){if(null!=t){var n,s=Cn;null!=Fn[e]&&(s=Fn[e]._config),(n=new O(t=Y(s,t))).parentLocale=Fn[e],Fn[e]=n,pe(e)}else null!=Fn[e]&&(null!=Fn[e].parentLocale?Fn[e]=Fn[e].parentLocale:null!=Fn[e]&&delete Fn[e]);return Fn[e]},e.locales=function(){return Pt(Fn)},e.weekdaysShort=function(e,t,n){return mt(e,t,n,"weekdaysShort")},e.normalizeUnits=T,e.relativeTimeRounding=function(e){return void 0===e?ks:"function"==typeof e&&(ks=e,!0)},e.relativeTimeThreshold=function(e,t){return void 0!==Ss[e]&&(void 0===t?Ss[e]:(Ss[e]=t,"s"===e&&(Ss.ss=t-1),!0))},e.calendarFormat=function(e,t){var n=e.diff(t,"days",!0);return n<-6?"sameElse":n<-1?"lastWeek":n<0?"lastDay":n<1?"sameDay":n<2?"nextDay":n<7?"nextWeek":"sameElse"},e.prototype=is,e});
'use strict';

$(document).ready(function(){

    // Chart Data
    var barChartData = [
        {
            label: '2015',
            data: [[1,60], [2,30], [3,50], [4,100], [5,10], [6,90], [7,85]],
            bars: {
                order: 0,
                fillColor: '#fff'
            },
            color: '#fff'
        },
        {
            label: '2016',
            data: [[1,20], [2,90], [3,60], [4,40], [5,100], [6,25], [7,65]],
            bars: {
                order: 1,
                fillColor: 'rgba(255,255,255,0.5)'
            },
            color: 'rgba(255,255,255,0.5)'
        },
        {
            label: '2017',
            data: [[1,100], [2,20], [3,60], [4,90], [5,80], [6,10], [7,5]],
            bars: {
                order: 2,
                fillColor: 'rgba(255,255,255,0.15)'
            },
            color: 'rgba(255,255,255,0.15)'
        }
    ];


    // Chart Options
    var barChartOptions = {
        series: {
            bars: {
                show: true,
                barWidth: 0.075,
                fill: 1,
                lineWidth: 0
            }
        },
        grid : {
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.1)',
            show : true,
            hoverable : true,
            clickable : true
        },
        yaxis: {
            tickColor: 'rgba(255,255,255,0.1)',
            tickDecimals: 0,
            font: {
                lineHeight: 13,
                style: 'normal',
                color: 'rgba(255,255,255,0.75)',
                size: 11
            },
            shadowSize: 0
        },
        xaxis: {
            tickColor: 'rgba(255,255,255,0.1)',
            tickDecimals: 0,
            font: {
                lineHeight: 13,
                style: 'normal',
                color: 'rgba(255,255,255,0.75)',
                size: 11
            },
            shadowSize: 0
        },
        legend:{
            container: '.flot-chart-legends--bar',
            backgroundOpacity: 0.5,
            noColumns: 0,
            lineWidth: 0,
            labelBoxBorderColor: 'rgba(255,255,255,0)'
        }
    };

    // Create chart
    if ($('.flot-bar')[0]) {
        $.plot($('.flot-bar'), barChartData, barChartOptions);
    }
});
'use strict';

$(document).ready(function() {

    // Tooltips for Flot Charts
    if ($('.flot-chart')[0]) {
        $('.flot-chart').bind('plothover', function (event, pos, item) {
            if (item) {
                var x = item.datapoint[0].toFixed(2),
                    y = item.datapoint[1].toFixed(2);
                $('.flot-tooltip').html(item.series.label + ' of ' + x + ' = ' + y).css({top: item.pageY+5, left: item.pageX+5}).show();
            }
            else {
                $('.flot-tooltip').hide();
            }
        });

        $('<div class="flot-tooltip"></div>').appendTo('body');
    }
});
'use strict';

$(document).ready(function(){
    // Chart Data

    // Main
    var curvedLineChartData = [
        {
            label: '2016',
            color: 'rgba(255,255,255,0.08)',
            lines: {
                show: true,
                lineWidth: 0,
                fill: 1,
                fillColor: {
                    colors: ['rgba(255,255,255,0.0)', 'rgba(255,255,255,0.1)']
                }
            },
            data: [[10, 90], [20, 40], [30, 80], [40, 20], [50, 90], [60, 20], [70, 60]],

        },
        {
            label: '2017',
            color: 'rgba(255,255,255,0.8)',
            lines: {
                show: true,
                lineWidth: 0.1,
                fill: 1,
                fillColor: {
                    colors: ['rgba(255,255,255,0.01)', '#fff']
                }
            },
            data: [[10, 80], [20, 30], [30, 70], [40, 10], [50, 80], [60, 10], [70, 50]]
        }
    ];


    // Past Days
    var pastDaysChartData = [{
        label: 'Data',
        stack: true,
        lines: {
            show: true,
            lineWidth: 0,
            fill: 1,
            fillColor: {
                colors: ['rgba(255,255,255,0)', 'rgba(255,255,255,0.3)']
            }
        },
        data: [[10, 90], [20, 40], [30, 80], [40, 20], [50, 90], [60, 20], [70, 60]]
    }];


    // Stats Charts
    var stats1ChartData = [{
        label: 'Data',
        stack: true,
        color: '#fff',
        lines: {
            show: true,
            fill: 1,
            fillColor: {
                colors: ['rgba(255,255,255,0)', 'rgba(255,255,255,0.35)']
            }
        },
        data: [[10, 100], [20, 10], [30, 90], [40, 20], [50, 60], [60, 20], [70, 60]]
    }];

    var stats2ChartData = [{
        label: 'Data',
        stack: true,
        color: '#fff',
        lines: {
            show: true,
            fill: 1,
            fillColor: {
                colors: ['rgba(255,255,255,0)', 'rgba(255,255,255,0.35)']
            }
        },
        data: [[10, 0], [20, 30], [30, 30], [40, 90], [50, 0], [60, 20], [70, 60]]
    }];

    var stats3ChartData = [{
        label: 'Data',
        stack: true,
        color: '#fff',
        lines: {
            show: true,
            fill: 1,
            fillColor: {
                colors: ['rgba(255,255,255,0)', 'rgba(255,255,255,0.35)']
            }
        },
        data: [[10, 100], [20, 30], [30, 50], [40, 30], [50, 20], [60, 10], [70, 100]]
    }];

    var stats4ChartData = [{
        label: 'Data',
        stack: true,
        color: '#fff',
        lines: {
            show: true,
            fill: 1,
            fillColor: {
                colors: ['rgba(255,255,255,0)', 'rgba(255,255,255,0.35)']
            }
        },
        data: [[10, 45], [20, 10], [30, 32], [40, 12], [50, 5], [60, 6], [70, 15]]
    }];


    // Chart Options

    // Main
    var curvedLineChartOptions = {
        series: {
            shadowSize: 0,
            curvedLines: {
                apply: true,
                active: true,
                monotonicFit: true
            },
            points: {
                show: false
            }
        },
        grid: {
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.1)',
            show: true,
            hoverable: true,
            clickable: true
        },
        xaxis: {
            tickColor: 'rgba(255,255,255,0.1)',
            tickDecimals: 0,
            font: {
                lineHeight: 13,
                style: 'normal',
                color: 'rgba(255,255,255,0.75)',
                size: 11
            }
        },
        yaxis: {
            tickColor: 'rgba(255,255,255,0.1)',
            font: {
                lineHeight: 13,
                style: 'normal',
                color: 'rgba(255,255,255,0.75)',
                size: 11
            },
            min: +5
        },
        legend:{
            container: '.flot-chart-legends--curved',
            backgroundOpacity: 0.5,
            noColumns: 0,
            lineWidth: 0,
            labelBoxBorderColor: 'rgba(255,255,255,0)'
        }
    };


    // Past days
    var pastDaysChartOptions = {
        series: {
            shadowSize: 0,
            curvedLines: {
                apply: true,
                active: true,
                monotonicFit: true
            },
            lines: {
                show: false,
                lineWidth: 0
            }
        },
        grid: {
            borderWidth: 0,
            labelMargin:10,
            hoverable: true,
            clickable: true,
            mouseActiveRadius:6

        },
        xaxis: {
            tickDecimals: 0,
            ticks: false
        },

        yaxis: {
            tickDecimals: 0,
            ticks: false
        },

        legend: {
            show: false
        }
    };


    // Stats Charts
    var statsChartOptions = {
        series: {
            shadowSize: 0,
            curvedLines: {
                apply: true,
                active: true,
                monotonicFit: true
            },
            lines: {
                show: false,
                lineWidth: 0
            }
        },
        grid: {
            borderWidth: 0,
            labelMargin:10,
            hoverable: true,
            clickable: true,
            mouseActiveRadius:6

        },
        xaxis: {
            tickDecimals: 0,
            ticks: false
        },

        yaxis: {
            tickDecimals: 0,
            ticks: false
        },

        legend: {
            show: false
        }
    };


    // Create charts

    // Main
    if ($('.flot-curved-line')[0]) {
        $.plot($('.flot-curved-line'), curvedLineChartData, curvedLineChartOptions);
    }

    // Past Days
    if ($('.flot-past-days')[0]) {
        $.plot($('.flot-past-days'), pastDaysChartData, pastDaysChartOptions);
    }

    // Stats Charts
    if ($('.stats')[0]) {
        $.plot($('.stats-chart-1'), stats1ChartData, statsChartOptions);
        $.plot($('.stats-chart-2'), stats2ChartData, statsChartOptions);
        $.plot($('.stats-chart-3'), stats3ChartData, statsChartOptions);
        $.plot($('.stats-chart-4'), stats4ChartData, statsChartOptions);
    }
});
'use strict';

$(document).ready(function () {
    /*--------------------------------------
        Animation
    ---------------------------------------*/
    var animationDuration;


    $('body').on('click', '.animation-demo .card-body .btn', function(){
        var animation = $(this).text();
        var cardImg = $(this).closest('.card').find('img');
        if (animation === "hinge") {
            animationDuration = 2100;
        }
        else {
            animationDuration = 1200;
        }

        cardImg.removeAttr('class');
        cardImg.addClass('animated '+animation);

        setTimeout(function(){
            cardImg.removeClass(animation);
        }, animationDuration);
    });
});
'use strict';

$(document).ready(function(){

    // Chart Data
    var data = [];
    var totalPoints = 300;

    function dynamicChartData() {
        if (data.length > 0)
            data = data.slice(1);

        while (data.length < totalPoints) {

            var prev = data.length > 0 ? data[data.length - 1] : 50,
                y = prev + Math.random() * 10 - 5;
            if (y < 0) {
                y = 0;
            } else if (y > 90) {
                y = 90;
            }

            data.push(y);
        }

        var res = [];
        for (var i = 0; i < data.length; ++i) {
            res.push([i, data[i]])
        }

        return res;
    }

    // Chart Options
    var dynamicChartOptions = {
        series: {
            label: "Server Process Data",
            lines: {
                show: true,
                lineWidth: 0.2,
                fill: 1,
                fillColor: {
                    colors: ['rgba(255,255,255,0.03)', '#fff']
                }
            },
            color: '#fff',
            shadowSize: 0
        },
        yaxis: {
            min: 0,
            max: 100,
            tickColor: 'rgba(255,255,255,0.1)',
            font: {
                lineHeight: 13,
                style: 'normal',
                color: 'rgba(255,255,255,0.75)',
                size: 11
            },
            shadowSize: 0

        },
        xaxis: {
            tickColor: 'rgba(255,255,255,0.1)',
            show: true,
            font: {
                lineHeight: 13,
                style: 'normal',
                color: 'rgba(255,255,255,0.75)',
                size: 11
            },
            shadowSize: 0,
            min: 0,
            max: 250
        },
        grid: {
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.1)',
            labelMargin:10,
            hoverable: true,
            clickable: true,
            mouseActiveRadius:6
        },
        legend:{
            container: '.flot-chart-legends--dynamic',
            backgroundOpacity: 0.5,
            noColumns: 0,
            lineWidth: 0,
            labelBoxBorderColor: 'rgba(255,255,255,0)'
        }
    };

    // Create Chart
    if ($('.flot-dynamic')[0]) {
        var plot = $.plot('.flot-dynamic', [ dynamicChartData() ], dynamicChartOptions);
    }

    // Update function
    var updateInterval = 30;
    function chartUpdate() {
        plot.setData([dynamicChartData()]);
        // Since the axes don't change, we don't need to call plot.setupGrid()

        plot.draw();
        setTimeout(chartUpdate, updateInterval);
    }
    chartUpdate();
});
'use strict';

$(document).ready(function(){

    // Chart Data
    var lineChartData = [
        {
            label: '2015',
            data: [[1,60], [2,30], [3,50], [4,100], [5,10], [6,90], [7,85]],
            color: '#fff'
        },
        {
            label: '2016',
            data: [[1,20], [2,90], [3,60], [4,40], [5,100], [6,25], [7,65]],
            color: 'rgba(255,255,255,0.5)'
        },
        {
            label: '2017',
            data: [[1,100], [2,20], [3,60], [4,90], [5,80], [6,10], [7,5]],
            color: 'rgba(255,255,255,0.15)'
        }
    ];

    // Chart Options
    var lineChartOptions = {
        series: {
            lines: {
                show: true,
                barWidth: 0.05,
                fill: 0
            }
        },
        shadowSize: 0.1,
        grid : {
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.1)',
            show : true,
            hoverable : true,
            clickable : true
        },
        yaxis: {
            tickColor: 'rgba(255,255,255,0.1)',
            tickDecimals: 0,
            font: {
                lineHeight: 13,
                style: 'normal',
                color: 'rgba(255,255,255,0.75)',
                size: 11
            },
            shadowSize: 0
        },

        xaxis: {
            tickColor: 'rgba(255,255,255,0.1)',
            tickDecimals: 0,
            font: {
                lineHeight: 13,
                style: 'normal',
                color: 'rgba(255,255,255,0.75)',
                size: 11
            },
            shadowSize: 0
        },
        legend:{
            container: '.flot-chart-legends--line',
            backgroundOpacity: 0.5,
            noColumns: 0,
            lineWidth: 0,
            labelBoxBorderColor: 'rgba(255,255,255,0)'
        }
    };

    // Create chart
    if ($('.flot-line')[0]) {
        $.plot($('.flot-line'), lineChartData, lineChartOptions);
    }
});
'use strict';

$(document).ready(function () {
    /*---------------------------------------
        Peity
    ----------------------------------------*/

    // Bar
    if($('.peity-bar')[0]) {
        $('.peity-bar').each(function() {
            var peityWidth = ($(this).attr('data-width')) ? $(this).attr('data-width') : 65;

            $(this).peity('bar', {
                height: 36,
                fill: ['rgba(255,255,255,0.85)'],
                width: peityWidth,
                padding: 0.2
            });
        });
    }

    // Line
    if($('.peity-line')[0]) {
        $('.peity-line').each(function() {
            var peityWidth = ($(this).attr('data-width')) ? $(this).attr('data-width') : 65;

            $(this).peity('line', {
                height: 50,
                fill: 'rgba(255,255,255,0.8)',
                stroke: 'rgba(255,255,255,0)',
                width: peityWidth,
                padding: 0.2
            });
        });
    }
 
    // Pie
    if($('.peity-pie')[0]) {
        $('.peity-pie').each(function() {
            $(this).peity('pie', {
                fill: ['#fff', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0.2)'],
                height: 50,
                width: 50
            });
        });
    }

    // Donut
    if($('.peity-donut')[0]) {
        $('.peity-donut').each(function() {
            $(this).peity('donut', {
                fill: ['#fff', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0.2)'],
                height: 50,
                width: 50
            });
        });
    }


    /*---------------------------------------
        Easy Pie Charts
    ----------------------------------------*/
    if($('.easy-pie-chart')[0]) {
        $('.easy-pie-chart').each(function () {
            var value = $(this).data('value');
            var size = $(this).data('size');
            var trackColor = $(this).data('track-color');
            var barColor = $(this).data('bar-color');

            $(this).find('.easy-pie-chart__value').css({
                lineHeight: (size - 2)+'px',
                fontSize: (size/5)+'px',
                color: barColor
            });

            $(this).easyPieChart ({
                easing: 'easeOutBounce',
                barColor: barColor,
                trackColor: trackColor,
                scaleColor: 'rgba(255,255,255,0.15)',
                lineCap: 'round',
                lineWidth: 1,
                size: size,
                animate: 3000,
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            })
        });
    }
});
'use strict';

$(document).ready(function(){
    // Make some sample data
    var pieData = [
        {data: 1, color: 'rgba(255,255,255,0.25)', label: 'Toyota'},
        {data: 2, color: 'rgba(255,255,255,0.5)', label: 'Nissan'},
        {data: 3, color: 'rgba(255,255,255,0.75)', label: 'Hyundai'},
        {data: 5, color: '#fff', label: 'Daihatsu'}
    ];
    
    // Pie Chart
    if($('.flot-pie')[0]){
        $.plot('.flot-pie', pieData, {
            series: {
                pie: {
                    show: true,
                    stroke: {
                        width: 0
                    }
                }
            },
            legend: {
                container: '.flot-chart-legend--pie',
                noColumns: 0,
                lineWidth: 0,
                labelBoxBorderColor: 'rgba(255,255,255,0)'
            }
        });
    }
    
    // Donut Chart
    if($('.flot-donut')[0]){
        $.plot('.flot-donut', pieData, {
            series: {
                pie: {
                    innerRadius: 0.5,
                    show: true,
                    stroke: { 
                        width: 0
                    }
                }
            },
            legend: {
                container: '.flot-chart-legend--donut',
                noColumns: 0,
                lineWidth: 0,
                labelBoxBorderColor: 'rgba(255,255,255,0)'
            }
        });
    }
});
/*!
 * FullCalendar v3.6.1
 * Docs & License: https://fullcalendar.io/
 * (c) 2017 Adam Shaw
 */

!function(t){"function"==typeof define&&define.amd?define(["jquery","moment"],t):"object"==typeof exports?module.exports=t(require("jquery"),require("moment")):t(jQuery,moment)}(function(t,e){function n(t){return j(t,qt)}function i(t,e){e.left&&t.css({"border-left-width":1,"margin-left":e.left-1}),e.right&&t.css({"border-right-width":1,"margin-right":e.right-1})}function r(t){t.css({"margin-left":"","margin-right":"","border-left-width":"","border-right-width":""})}function s(){t("body").addClass("fc-not-allowed")}function o(){t("body").removeClass("fc-not-allowed")}function a(e,n,i){var r=Math.floor(n/e.length),s=Math.floor(n-r*(e.length-1)),o=[],a=[],u=[],c=0;l(e),e.each(function(n,i){var l=n===e.length-1?s:r,h=t(i).outerHeight(!0);h<l?(o.push(i),a.push(h),u.push(t(i).height())):c+=h}),i&&(n-=c,r=Math.floor(n/o.length),s=Math.floor(n-r*(o.length-1))),t(o).each(function(e,n){var i=e===o.length-1?s:r,l=a[e],c=u[e],h=i-(l-c);l<i&&t(n).height(h)})}function l(t){t.height("")}function u(e){var n=0;return e.find("> *").each(function(e,i){var r=t(i).outerWidth();r>n&&(n=r)}),n++,e.width(n),n}function c(t,e){var n,i=t.add(e);return i.css({position:"relative",left:-1}),n=t.outerHeight()-e.outerHeight(),i.css({position:"",left:""}),n}function h(e){var n=e.css("position"),i=e.parents().filter(function(){var e=t(this);return/(auto|scroll)/.test(e.css("overflow")+e.css("overflow-y")+e.css("overflow-x"))}).eq(0);return"fixed"!==n&&i.length?i:t(e[0].ownerDocument||document)}function d(t,e){var n=t.offset(),i=n.left-(e?e.left:0),r=n.top-(e?e.top:0);return{left:i,right:i+t.outerWidth(),top:r,bottom:r+t.outerHeight()}}function f(t,e){var n=t.offset(),i=p(t),r=n.left+w(t,"border-left-width")+i.left-(e?e.left:0),s=n.top+w(t,"border-top-width")+i.top-(e?e.top:0);return{left:r,right:r+t[0].clientWidth,top:s,bottom:s+t[0].clientHeight}}function g(t,e){var n=t.offset(),i=n.left+w(t,"border-left-width")+w(t,"padding-left")-(e?e.left:0),r=n.top+w(t,"border-top-width")+w(t,"padding-top")-(e?e.top:0);return{left:i,right:i+t.width(),top:r,bottom:r+t.height()}}function p(t){var e,n=t[0].offsetWidth-t[0].clientWidth,i=t[0].offsetHeight-t[0].clientHeight;return n=v(n),i=v(i),e={left:0,right:0,top:0,bottom:i},m()&&"rtl"==t.css("direction")?e.left=n:e.right=n,e}function v(t){return t=Math.max(0,t),t=Math.round(t)}function m(){return null===Yt&&(Yt=y()),Yt}function y(){var e=t("<div><div/></div>").css({position:"absolute",top:-1e3,left:0,border:0,padding:0,overflow:"scroll",direction:"rtl"}).appendTo("body"),n=e.children(),i=n.offset().left>e.offset().left;return e.remove(),i}function w(t,e){return parseFloat(t.css(e))||0}function D(t){return 1==t.which&&!t.ctrlKey}function b(t){var e=t.originalEvent.touches;return e&&e.length?e[0].pageX:t.pageX}function E(t){var e=t.originalEvent.touches;return e&&e.length?e[0].pageY:t.pageY}function S(t){return/^touch/.test(t.type)}function C(t){t.addClass("fc-unselectable").on("selectstart",T)}function R(t){t.removeClass("fc-unselectable").off("selectstart",T)}function T(t){t.preventDefault()}function I(t,e){var n={left:Math.max(t.left,e.left),right:Math.min(t.right,e.right),top:Math.max(t.top,e.top),bottom:Math.min(t.bottom,e.bottom)};return n.left<n.right&&n.top<n.bottom&&n}function H(t,e){return{left:Math.min(Math.max(t.left,e.left),e.right),top:Math.min(Math.max(t.top,e.top),e.bottom)}}function M(t){return{left:(t.left+t.right)/2,top:(t.top+t.bottom)/2}}function x(t,e){return{left:t.left-e.left,top:t.top-e.top}}function P(e){var n,i,r=[],s=[];for("string"==typeof e?s=e.split(/\s*,\s*/):"function"==typeof e?s=[e]:t.isArray(e)&&(s=e),n=0;n<s.length;n++)i=s[n],"string"==typeof i?r.push("-"==i.charAt(0)?{field:i.substring(1),order:-1}:{field:i,order:1}):"function"==typeof i&&r.push({func:i});return r}function z(t,e,n){var i,r;for(i=0;i<n.length;i++)if(r=F(t,e,n[i]))return r;return 0}function F(t,e,n){return n.func?n.func(t,e):k(t[n.field],e[n.field])*(n.order||1)}function k(e,n){return e||n?null==n?-1:null==e?1:"string"===t.type(e)||"string"===t.type(n)?String(e).localeCompare(String(n)):e-n:0}function B(t,n){return e.duration({days:t.clone().stripTime().diff(n.clone().stripTime(),"days"),ms:t.time()-n.time()})}function A(t,n){return e.duration({days:t.clone().stripTime().diff(n.clone().stripTime(),"days")})}function L(t,n,i){return e.duration(Math.round(t.diff(n,i,!0)),i)}function O(t,e){var n,i,r;for(n=0;n<Zt.length&&(i=Zt[n],!((r=V(i,t,e))>=1&&at(r)));n++);return i}function N(t,e){var n=O(t);return"week"===n&&"object"==typeof e&&e.days&&(n="day"),n}function V(t,n,i){return null!=i?i.diff(n,t,!0):e.isDuration(n)?n.as(t):n.end.diff(n.start,t,!0)}function G(t,e,n){var i;return _(n)?(e-t)/n:(i=n.asMonths(),Math.abs(i)>=1&&at(i)?e.diff(t,"months",!0)/i:e.diff(t,"days",!0)/n.asDays())}function U(t,e){var n,i;return _(t)||_(e)?t/e:(n=t.asMonths(),i=e.asMonths(),Math.abs(n)>=1&&at(n)&&Math.abs(i)>=1&&at(i)?n/i:t.asDays()/e.asDays())}function W(t,n){var i;return _(t)?e.duration(t*n):(i=t.asMonths(),Math.abs(i)>=1&&at(i)?e.duration({months:i*n}):e.duration({days:t.asDays()*n}))}function _(t){return Boolean(t.hours()||t.minutes()||t.seconds()||t.milliseconds())}function q(t){return"[object Date]"===Object.prototype.toString.call(t)||t instanceof Date}function Y(t){return"string"==typeof t&&/^\d+\:\d+(?:\:\d+\.?(?:\d{3})?)?$/.test(t)}function j(t,e){var n,i,r,s,o,a,l={};if(e)for(n=0;n<e.length;n++){for(i=e[n],r=[],s=t.length-1;s>=0;s--)if("object"==typeof(o=t[s][i]))r.unshift(o);else if(void 0!==o){l[i]=o;break}r.length&&(l[i]=j(r))}for(n=t.length-1;n>=0;n--){a=t[n];for(i in a)i in l||(l[i]=a[i])}return l}function Z(t,e){for(var n in t)Q(t,n)&&(e[n]=t[n])}function Q(t,e){return Qt.call(t,e)}function $(e,n,i){if(t.isFunction(e)&&(e=[e]),e){var r,s;for(r=0;r<e.length;r++)s=e[r].apply(n,i)||s;return s}}function X(t,e){for(var n=0,i=0;i<t.length;)e(t[i])?(t.splice(i,1),n++):i++;return n}function K(t,e){for(var n=0,i=0;i<t.length;)t[i]===e?(t.splice(i,1),n++):i++;return n}function J(t,e){var n,i=t.length;if(null==i||i!==e.length)return!1;for(n=0;n<i;n++)if(t[n]!==e[n])return!1;return!0}function tt(){for(var t=0;t<arguments.length;t++)if(void 0!==arguments[t])return arguments[t]}function et(t){return(t+"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#039;").replace(/"/g,"&quot;").replace(/\n/g,"<br />")}function nt(t){return t.replace(/&.*?;/g,"")}function it(e){var n=[];return t.each(e,function(t,e){null!=e&&n.push(t+":"+e)}),n.join(";")}function rt(e){var n=[];return t.each(e,function(t,e){null!=e&&n.push(t+'="'+et(e)+'"')}),n.join(" ")}function st(t){return t.charAt(0).toUpperCase()+t.slice(1)}function ot(t,e){return t-e}function at(t){return t%1==0}function lt(t,e){var n=t[e];return function(){return n.apply(t,arguments)}}function ut(t,e,n){var i,r,s,o,a,l=function(){var u=+new Date-o;u<e?i=setTimeout(l,e-u):(i=null,n||(a=t.apply(s,r),s=r=null))};return function(){s=this,r=arguments,o=+new Date;var u=n&&!i;return i||(i=setTimeout(l,e)),u&&(a=t.apply(s,r),s=r=null),a}}function ct(n,i,r){var s,o,a,l,u=n[0],c=1==n.length&&"string"==typeof u;return e.isMoment(u)||q(u)||void 0===u?l=e.apply(null,n):(s=!1,o=!1,c?$t.test(u)?(u+="-01",n=[u],s=!0,o=!0):(a=Xt.exec(u))&&(s=!a[5],o=!0):t.isArray(u)&&(o=!0),l=i||s?e.utc.apply(e,n):e.apply(null,n),s?(l._ambigTime=!0,l._ambigZone=!0):r&&(o?l._ambigZone=!0:c&&l.utcOffset(u))),l._fullCalendar=!0,l}function ht(t){return"en"!==t.locale()?t.clone().locale("en"):t}function dt(){}function ft(t,e){var n;return Q(e,"constructor")&&(n=e.constructor),"function"!=typeof n&&(n=e.constructor=function(){t.apply(this,arguments)}),n.prototype=Object.create(t.prototype),Z(e,n.prototype),Z(t,n),n}function gt(t,e){t.then=function(n){return"function"==typeof n?ce.resolve(n(e)):t}}function pt(t){t.then=function(e,n){return"function"==typeof n&&n(),t}}function vt(t,e){return!t&&!e||!(!t||!e)&&(t.component===e.component&&mt(t,e)&&mt(e,t))}function mt(t,e){for(var n in t)if(!/^(component|left|right|top|bottom)$/.test(n)&&t[n]!==e[n])return!1;return!0}function yt(t){this.items=t||[]}function wt(n){var i,r,s,o,a=Wt.dataAttrPrefix;return a&&(a+="-"),i=n.data(a+"event")||null,i&&(i="object"==typeof i?t.extend({},i):{},r=i.start,null==r&&(r=i.time),s=i.duration,o=i.stick,delete i.start,delete i.time,delete i.duration,delete i.stick),null==r&&(r=n.data(a+"start")),null==r&&(r=n.data(a+"time")),null==s&&(s=n.data(a+"duration")),null==o&&(o=n.data(a+"stick")),r=null!=r?e.duration(r):null,s=null!=s?e.duration(s):null,o=Boolean(o),{eventProps:i,startTime:r,duration:s,stick:o}}function Dt(t){var e,n,i,r=[];for(e in t)for(n=t[e].eventInstances,i=0;i<n.length;i++)r.push(n[i].toLegacy());return r}function bt(e,n){function i(t){n=t}function r(){n.layout?(g?g.empty():g=this.el=t("<div class='fc-toolbar "+n.extraClasses+"'/>"),g.append(o("left")).append(o("right")).append(o("center")).append('<div class="fc-clear"/>')):s()}function s(){g&&(g.remove(),g=f.el=null)}function o(i){var r=e.theme,s=t('<div class="fc-'+i+'"/>'),o=n.layout[i],a=e.opt("customButtons")||{},l=e.overrides.buttonText||{},u=e.opt("buttonText")||{};return o&&t.each(o.split(" "),function(n){var i,o=t(),c=!0;t.each(this.split(","),function(n,i){var s,h,d,f,g,v,m,y;"title"==i?(o=o.add(t("<h2>&nbsp;</h2>")),c=!1):((s=a[i])?(d=function(t){s.click&&s.click.call(y[0],t)},(f=r.getCustomButtonIconClass(s))||(f=r.getIconClass(i))||(g=s.text)):(h=e.getViewSpec(i))?(p.push(i),d=function(){e.changeView(i)},(g=h.buttonTextOverride)||(f=r.getIconClass(i))||(g=h.buttonTextDefault)):e[i]&&(d=function(){e[i]()},(g=l[i])||(f=r.getIconClass(i))||(g=u[i])),d&&(m=["fc-"+i+"-button",r.getClass("button"),r.getClass("stateDefault")],g?v=et(g):f&&(v="<span class='"+f+"'></span>"),y=t('<button type="button" class="'+m.join(" ")+'">'+v+"</button>").click(function(t){y.hasClass(r.getClass("stateDisabled"))||(d(t),(y.hasClass(r.getClass("stateActive"))||y.hasClass(r.getClass("stateDisabled")))&&y.removeClass(r.getClass("stateHover")))}).mousedown(function(){y.not("."+r.getClass("stateActive")).not("."+r.getClass("stateDisabled")).addClass(r.getClass("stateDown"))}).mouseup(function(){y.removeClass(r.getClass("stateDown"))}).hover(function(){y.not("."+r.getClass("stateActive")).not("."+r.getClass("stateDisabled")).addClass(r.getClass("stateHover"))},function(){y.removeClass(r.getClass("stateHover")).removeClass(r.getClass("stateDown"))}),o=o.add(y)))}),c&&o.first().addClass(r.getClass("cornerLeft")).end().last().addClass(r.getClass("cornerRight")).end(),o.length>1?(i=t("<div/>"),c&&i.addClass(r.getClass("buttonGroup")),i.append(o),s.append(i)):s.append(o)}),s}function a(t){g&&g.find("h2").text(t)}function l(t){g&&g.find(".fc-"+t+"-button").addClass(e.theme.getClass("stateActive"))}function u(t){g&&g.find(".fc-"+t+"-button").removeClass(e.theme.getClass("stateActive"))}function c(t){g&&g.find(".fc-"+t+"-button").prop("disabled",!0).addClass(e.theme.getClass("stateDisabled"))}function h(t){g&&g.find(".fc-"+t+"-button").prop("disabled",!1).removeClass(e.theme.getClass("stateDisabled"))}function d(){return p}var f=this;f.setToolbarOptions=i,f.render=r,f.removeElement=s,f.updateTitle=a,f.activateButton=l,f.deactivateButton=u,f.disableButton=c,f.enableButton=h,f.getViewsWithButtons=d,f.el=null;var g,p=[]}function Et(t,e,n){var i;for(i=0;i<t.length;i++)if(!e(t[i].eventInstance.toLegacy(),n?n.toLegacy():null))return!1;return!0}function St(t,e){var n,i,r,s,o=e.toLegacy();for(n=0;n<t.length;n++){if(i=t[n].eventInstance,r=i.def,!1===(s=r.getOverlap()))return!1;if("function"==typeof s&&!s(i.toLegacy(),o))return!1}return!0}function Ct(e,n){return null==n?e:t.isFunction(n)?e.filter(n):(n+="",e.filter(function(t){return t.id==n||t._id===n}))}function Rt(e){t.each(Ge,function(t,n){null==e[t]&&(e[t]=n(e))})}function Tt(t){return e.localeData(t)||e.localeData("en")}function It(t,e){var n,i,r=[],s=e.startMs;for(t.sort(Ht),n=0;n<t.length;n++)i=t[n],i.startMs>s&&r.push(new Ue(s,i.startMs)),i.endMs>s&&(s=i.endMs);return s<e.endMs&&r.push(new Ue(s,e.endMs)),r}function Ht(t,e){return t.startMs-e.startMs}function Mt(t,e){return t.getPrimitive()==e.getPrimitive()}function xt(t,e){var n,i=[];for(n=0;n<t.length;n++)i.push.apply(i,t[n].buildInstances(e));return i}function Pt(t){return new en(t.dateProfile.unzonedRange,t.def,t)}function zt(t){return new nn(new We(t.unzonedRange,t.eventDef.isAllDay()),t.eventDef,t.eventInstance)}function Ft(t){return t.dateProfile.unzonedRange}function kt(t){return t.componentFootprint}function Bt(t,e){var n,i;for(n=0;n<e.length;n++)if(i=e[n],i.leftCol<=t.rightCol&&i.rightCol>=t.leftCol)return!0;return!1}function At(t,e){return t.leftCol-e.leftCol}function Lt(t){var e,n,i,r=[];for(e=0;e<t.length;e++){for(n=t[e],i=0;i<r.length&&Vt(n,r[i]).length;i++);n.level=i,(r[i]||(r[i]=[])).push(n)}return r}function Ot(t){var e,n,i,r,s;for(e=0;e<t.length;e++)for(n=t[e],i=0;i<n.length;i++)for(r=n[i],r.forwardSegs=[],s=e+1;s<t.length;s++)Vt(r,t[s],r.forwardSegs)}function Nt(t){var e,n,i=t.forwardSegs,r=0;if(void 0===t.forwardPressure){for(e=0;e<i.length;e++)n=i[e],Nt(n),r=Math.max(r,1+n.forwardPressure);t.forwardPressure=r}}function Vt(t,e,n){n=n||[];for(var i=0;i<e.length;i++)Gt(t,e[i])&&n.push(e[i]);return n}function Gt(t,e){return t.bottom>e.top&&t.top<e.bottom}function Ut(t){var e,n=[],i=[];for(e=0;e<t.length;e++)t[e].componentFootprint.isAllDay?n.push(t[e]):i.push(t[e]);return{allDay:n,timed:i}}var Wt=t.fullCalendar={version:"3.6.1",internalApiVersion:11},_t=Wt.views={};t.fn.fullCalendar=function(e){var n=Array.prototype.slice.call(arguments,1),i=this;return this.each(function(r,s){var o,a=t(s),l=a.data("fullCalendar");"string"==typeof e?"getCalendar"===e?r||(i=l):"destroy"===e?l&&(l.destroy(),a.removeData("fullCalendar")):l?t.isFunction(l[e])?(o=l[e].apply(l,n),r||(i=o),"destroy"===e&&a.removeData("fullCalendar")):Wt.warn("'"+e+"' is an unknown FullCalendar method."):Wt.warn("Attempting to call a FullCalendar method on an element with no calendar."):l||(l=new Le(a,e),a.data("fullCalendar",l),l.render())}),i};var qt=["header","footer","buttonText","buttonIcons","themeButtonIcons"];Wt.applyAll=$,Wt.debounce=ut,Wt.isInt=at,Wt.htmlEscape=et,Wt.cssToStr=it,Wt.proxy=lt,Wt.capitaliseFirstLetter=st,Wt.getOuterRect=d,Wt.getClientRect=f,Wt.getContentRect=g,Wt.getScrollbarWidths=p;var Yt=null;Wt.preventDefault=T,Wt.intersectRects=I,Wt.parseFieldSpecs=P,Wt.compareByFieldSpecs=z,Wt.compareByFieldSpec=F,Wt.flexibleCompare=k,Wt.computeGreatestUnit=O,Wt.divideRangeByDuration=G,Wt.divideDurationByDuration=U,Wt.multiplyDuration=W,Wt.durationHasTime=_;var jt=["sun","mon","tue","wed","thu","fri","sat"],Zt=["year","month","week","day","hour","minute","second","millisecond"];Wt.log=function(){var t=window.console;if(t&&t.log)return t.log.apply(t,arguments)},Wt.warn=function(){var t=window.console;return t&&t.warn?t.warn.apply(t,arguments):Wt.log.apply(Wt,arguments)};var Qt={}.hasOwnProperty;Wt.removeExact=K;var $t=/^\s*\d{4}-\d\d$/,Xt=/^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?)?$/,Kt=e.fn,Jt=t.extend({},Kt),te=e.momentProperties;te.push("_fullCalendar"),te.push("_ambigTime"),te.push("_ambigZone"),Wt.moment=function(){return ct(arguments)},Wt.moment.utc=function(){var t=ct(arguments,!0);return t.hasTime()&&t.utc(),t},Wt.moment.parseZone=function(){return ct(arguments,!0,!0)},Kt.week=Kt.weeks=function(t){var e=this._locale._fullCalendar_weekCalc;return null==t&&"function"==typeof e?e(this):"ISO"===e?Jt.isoWeek.apply(this,arguments):Jt.week.apply(this,arguments)},Kt.time=function(t){if(!this._fullCalendar)return Jt.time.apply(this,arguments);if(null==t)return e.duration({hours:this.hours(),minutes:this.minutes(),seconds:this.seconds(),milliseconds:this.milliseconds()});this._ambigTime=!1,e.isDuration(t)||e.isMoment(t)||(t=e.duration(t));var n=0;return e.isDuration(t)&&(n=24*Math.floor(t.asDays())),this.hours(n+t.hours()).minutes(t.minutes()).seconds(t.seconds()).milliseconds(t.milliseconds())},Kt.stripTime=function(){return this._ambigTime||(this.utc(!0),this.set({hours:0,minutes:0,seconds:0,ms:0}),this._ambigTime=!0,this._ambigZone=!0),this},Kt.hasTime=function(){return!this._ambigTime},Kt.stripZone=function(){var t;return this._ambigZone||(t=this._ambigTime,this.utc(!0),this._ambigTime=t||!1,this._ambigZone=!0),this},Kt.hasZone=function(){return!this._ambigZone},Kt.local=function(t){return Jt.local.call(this,this._ambigZone||t),this._ambigTime=!1,this._ambigZone=!1,this},Kt.utc=function(t){return Jt.utc.call(this,t),this._ambigTime=!1,this._ambigZone=!1,this},Kt.utcOffset=function(t){return null!=t&&(this._ambigTime=!1,this._ambigZone=!1),Jt.utcOffset.apply(this,arguments)},Kt.format=function(){return this._fullCalendar&&arguments[0]?ee(this,arguments[0]):this._ambigTime?ie(ht(this),"YYYY-MM-DD"):this._ambigZone?ie(ht(this),"YYYY-MM-DD[T]HH:mm:ss"):this._fullCalendar?ie(ht(this)):Jt.format.apply(this,arguments)},Kt.toISOString=function(){return this._ambigTime?ie(ht(this),"YYYY-MM-DD"):this._ambigZone?ie(ht(this),"YYYY-MM-DD[T]HH:mm:ss"):this._fullCalendar?Jt.toISOString.apply(ht(this),arguments):Jt.toISOString.apply(this,arguments)},function(){function t(t,e){return c(r(e).fakeFormatString,t)}function e(t,e){return Jt.format.call(t,e)}function n(t,e,n,s,o){var a;return t=Wt.moment.parseZone(t),e=Wt.moment.parseZone(e),a=t.localeData(),n=a.longDateFormat(n)||n,i(r(n),t,e,s||" - ",o)}function i(t,e,n,i,r){var s,o,a,l=t.sameUnits,u=e.clone().stripZone(),c=n.clone().stripZone(),f=h(t.fakeFormatString,e),g=h(t.fakeFormatString,n),p="",v="",m="",y="",w="";for(s=0;s<l.length&&(!l[s]||u.isSame(c,l[s]));s++)p+=f[s];for(o=l.length-1;o>s&&(!l[o]||u.isSame(c,l[o]))&&(o-1!==s||"."!==f[o]);o--)v=f[o]+v;for(a=s;a<=o;a++)m+=f[a],y+=g[a];return(m||y)&&(w=r?y+i+m:m+i+y),d(p+w+v)}function r(t){return D[t]||(D[t]=s(t))}function s(t){var e=o(t);return{fakeFormatString:l(e),sameUnits:u(e)}}function o(t){for(var e,n=[],i=/\[([^\]]*)\]|\(([^\)]*)\)|(LTS|LT|(\w)\4*o?)|([^\w\[\(]+)/g;e=i.exec(t);)e[1]?n.push.apply(n,a(e[1])):e[2]?n.push({maybe:o(e[2])}):e[3]?n.push({token:e[3]}):e[5]&&n.push.apply(n,a(e[5]));return n}function a(t){return". "===t?["."," "]:[t]}function l(t){var e,n,i=[];for(e=0;e<t.length;e++)n=t[e],"string"==typeof n?i.push("["+n+"]"):n.token?n.token in y?i.push(p+"["+n.token+"]"):i.push(n.token):n.maybe&&i.push(v+l(n.maybe)+v);return i.join(g)}function u(t){var e,n,i,r=[];for(e=0;e<t.length;e++)n=t[e],n.token?(i=w[n.token.charAt(0)],r.push(i?i.unit:"second")):n.maybe?r.push.apply(r,u(n.maybe)):r.push(null);return r}function c(t,e){return d(h(t,e).join(""))}function h(t,n){var i,r,s=[],o=e(n,t),a=o.split(g);for(i=0;i<a.length;i++)r=a[i],r.charAt(0)===p?s.push(y[r.substring(1)](n)):s.push(r);return s}function d(t){return t.replace(m,function(t,e){return e.match(/[1-9]/)?e:""})}function f(t){var e,n,i,r,s=o(t);for(e=0;e<s.length;e++)n=s[e],n.token&&(i=w[n.token.charAt(0)])&&(!r||i.value>r.value)&&(r=i);return r?r.unit:null}Wt.formatDate=t,Wt.formatRange=n,Wt.oldMomentFormat=e,Wt.queryMostGranularFormatUnit=f;var g="\v",p="",v="",m=new RegExp(v+"([^"+v+"]*)"+v,"g"),y={t:function(t){return e(t,"a").charAt(0)},T:function(t){return e(t,"A").charAt(0)}},w={Y:{value:1,unit:"year"},M:{value:2,unit:"month"},W:{value:3,unit:"week"},w:{value:3,unit:"week"},D:{value:4,unit:"day"},d:{value:4,unit:"day"}},D={}}();var ee=Wt.formatDate,ne=Wt.formatRange,ie=Wt.oldMomentFormat;Wt.Class=dt,dt.extend=function(){var t,e={};for(t=0;t<arguments.length;t++)Z(arguments[t],e);return ft(this,e)},dt.mixin=function(t){Z(t,this.prototype)};var re=Wt.EmitterMixin={on:function(e,n){return t(this).on(e,this._prepareIntercept(n)),this},one:function(e,n){return t(this).one(e,this._prepareIntercept(n)),this},_prepareIntercept:function(e){var n=function(t,n){return e.apply(n.context||this,n.args||[])};return e.guid||(e.guid=t.guid++),n.guid=e.guid,n},off:function(e,n){return t(this).off(e,n),this},trigger:function(e){var n=Array.prototype.slice.call(arguments,1);return t(this).triggerHandler(e,{args:n}),this},triggerWith:function(e,n,i){return t(this).triggerHandler(e,{context:n,args:i}),this},hasHandlers:function(e){var n=t._data(this,"events");return n&&n[e]&&n[e].length>0}},se=Wt.ListenerMixin=function(){var e=0;return{listenerId:null,listenTo:function(e,n,i){if("object"==typeof n)for(var r in n)n.hasOwnProperty(r)&&this.listenTo(e,r,n[r]);else"string"==typeof n&&e.on(n+"."+this.getListenerNamespace(),t.proxy(i,this))},stopListeningTo:function(t,e){t.off((e||"")+"."+this.getListenerNamespace())},getListenerNamespace:function(){return null==this.listenerId&&(this.listenerId=e++),"_listener"+this.listenerId}}}(),oe={standardPropMap:{},applyProps:function(t){var e,n=this.standardPropMap,i={},r={};for(e in t)!0===n[e]?this[e]=t[e]:!1===n[e]?i[e]=t[e]:r[e]=t[e];return this.applyMiscProps(r),this.applyManualStandardProps(i)},applyManualStandardProps:function(t){return!0},applyMiscProps:function(t){},isStandardProp:function(t){return t in this.standardPropMap}},ae=function(t){var e=this.prototype;e.hasOwnProperty("standardPropMap")||(e.standardPropMap=Object.create(e.standardPropMap)),Z(t,e.standardPropMap)},le=function(t,e){var n,i=this.prototype.standardPropMap;for(n in i)null!=t[n]&&!0===i[n]&&(e[n]=t[n])},ue=dt.extend(re,se,{_props:null,_watchers:null,_globalWatchArgs:{},constructor:function(){this._watchers={},this._props={},this.applyGlobalWatchers(),this.constructed()},constructed:function(){},applyGlobalWatchers:function(){var t,e=this._globalWatchArgs;for(t in e)this.watch.apply(this,e[t])},has:function(t){return t in this._props},get:function(t){return void 0===t?this._props:this._props[t]},set:function(t,e){var n;"string"==typeof t?(n={},n[t]=void 0===e?null:e):n=t,this.setProps(n)},reset:function(t){var e,n=this._props,i={};for(e in n)i[e]=void 0;for(e in t)i[e]=t[e];this.setProps(i)},unset:function(t){var e,n,i={};for(e="string"==typeof t?[t]:t,n=0;n<e.length;n++)i[e[n]]=void 0;this.setProps(i)},setProps:function(t){var e,n,i={},r=0;for(e in t)"object"!=typeof(n=t[e])&&n===this._props[e]||(i[e]=n,r++);if(r){this.trigger("before:batchChange",i);for(e in i)n=i[e],this.trigger("before:change",e,n),this.trigger("before:change:"+e,n);for(e in i)n=i[e],void 0===n?delete this._props[e]:this._props[e]=n,this.trigger("change:"+e,n),this.trigger("change",e,n);this.trigger("batchChange",i)}},watch:function(t,e,n,i){var r=this;this.unwatch(t),this._watchers[t]=this._watchDeps(e,function(e){var i=n.call(r,e);i&&i.then?(r.unset(t),i.then(function(e){r.set(t,e)})):r.set(t,i)},function(e){r.unset(t),i&&i.call(r,e)})},unwatch:function(t){var e=this._watchers[t];e&&(delete this._watchers[t],e.teardown())},_watchDeps:function(t,e,n){function i(t,e,i){1===++a&&u===l&&(d=!0,n(c),d=!1)}function r(t,n,i){void 0===n?(i||void 0===c[t]||u--,delete c[t]):(i||void 0!==c[t]||u++,c[t]=n),--a||u===l&&(d||e(c))}function s(t,e){o.on(t,e),h.push([t,e])}var o=this,a=0,l=t.length,u=0,c={},h=[],d=!1;return t.forEach(function(t){var e=!1;"?"===t.charAt(0)&&(t=t.substring(1),e=!0),s("before:change:"+t,function(n){i(t,n,e)}),s("change:"+t,function(n){r(t,n,e)})}),t.forEach(function(t){var e=!1;"?"===t.charAt(0)&&(t=t.substring(1),e=!0),o.has(t)?(c[t]=o.get(t),u++):e&&u++}),u===l&&e(c),{teardown:function(){for(var t=0;t<h.length;t++)o.off(h[t][0],h[t][1]);h=null,u===l&&n()},flash:function(){u===l&&(n(),e(c))}}},flash:function(t){var e=this._watchers[t];e&&e.flash()}});ue.watch=function(t){this.prototype.hasOwnProperty("_globalWatchArgs")||(this.prototype._globalWatchArgs=Object.create(this.prototype._globalWatchArgs)),this.prototype._globalWatchArgs[t]=arguments},Wt.Model=ue;var ce={construct:function(e){var n=t.Deferred(),i=n.promise();return"function"==typeof e&&e(function(t){n.resolve(t),gt(i,t)},function(){n.reject(),pt(i)}),i},resolve:function(e){var n=t.Deferred().resolve(e),i=n.promise();return gt(i,e),i},reject:function(){var e=t.Deferred().reject(),n=e.promise();return pt(n),n}};Wt.Promise=ce;var he=dt.extend(re,{q:null,isPaused:!1,isRunning:!1,constructor:function(){this.q=[]},queue:function(){this.q.push.apply(this.q,arguments),this.tryStart()},pause:function(){this.isPaused=!0},resume:function(){this.isPaused=!1,this.tryStart()},getIsIdle:function(){return!this.isRunning&&!this.isPaused},tryStart:function(){!this.isRunning&&this.canRunNext()&&(this.isRunning=!0,this.trigger("start"),this.runRemaining())},canRunNext:function(){return!this.isPaused&&this.q.length},runRemaining:function(){var t,e,n=this;do{if(t=this.q.shift(),(e=this.runTask(t))&&e.then)return void e.then(function(){n.canRunNext()&&n.runRemaining()})}while(this.canRunNext());this.trigger("stop"),this.isRunning=!1,this.tryStart()},runTask:function(t){return t()}});Wt.TaskQueue=he;var de=he.extend({waitsByNamespace:null,waitNamespace:null,waitId:null,constructor:function(t){he.call(this),this.waitsByNamespace=t||{}},queue:function(t,e,n){var i,r={func:t,namespace:e,type:n};e&&(i=this.waitsByNamespace[e]),this.waitNamespace&&(e===this.waitNamespace&&null!=i?this.delayWait(i):(this.clearWait(),this.tryStart())),this.compoundTask(r)&&(this.waitNamespace||null==i?this.tryStart():this.startWait(e,i))},startWait:function(t,e){this.waitNamespace=t,this.spawnWait(e)},delayWait:function(t){clearTimeout(this.waitId),this.spawnWait(t)},spawnWait:function(t){var e=this;this.waitId=setTimeout(function(){e.waitNamespace=null,e.tryStart()},t)},clearWait:function(){this.waitNamespace&&(clearTimeout(this.waitId),this.waitId=null,this.waitNamespace=null)},canRunNext:function(){if(!he.prototype.canRunNext.apply(this,arguments))return!1;if(this.waitNamespace){for(var t=this.q,e=0;e<t.length;e++)if(t[e].namespace!==this.waitNamespace)return!0;return!1}return!0},runTask:function(t){t.func()},compoundTask:function(t){var e,n,i=this.q,r=!0;if(t.namespace&&"destroy"===t.type)for(e=i.length-1;e>=0;e--)switch(n=i[e],n.type){case"init":r=!1;case"add":case"remove":i.splice(e,1)}return r&&i.push(t),r}});Wt.RenderQueue=de;var fe=dt.extend(se,{isHidden:!0,options:null,el:null,margin:10,constructor:function(t){this.options=t||{}},show:function(){this.isHidden&&(this.el||this.render(),this.el.show(),this.position(),this.isHidden=!1,this.trigger("show"))},hide:function(){this.isHidden||(this.el.hide(),this.isHidden=!0,this.trigger("hide"))},render:function(){var e=this,n=this.options;this.el=t('<div class="fc-popover"/>').addClass(n.className||"").css({top:0,left:0}).append(n.content).appendTo(n.parentEl),this.el.on("click",".fc-close",function(){e.hide()}),n.autoHide&&this.listenTo(t(document),"mousedown",this.documentMousedown)},documentMousedown:function(e){this.el&&!t(e.target).closest(this.el).length&&this.hide()},removeElement:function(){this.hide(),this.el&&(this.el.remove(),this.el=null),this.stopListeningTo(t(document),"mousedown")},position:function(){var e,n,i,r,s,o=this.options,a=this.el.offsetParent().offset(),l=this.el.outerWidth(),u=this.el.outerHeight(),c=t(window),d=h(this.el);r=o.top||0,s=void 0!==o.left?o.left:void 0!==o.right?o.right-l:0,d.is(window)||d.is(document)?(d=c,e=0,n=0):(i=d.offset(),e=i.top,n=i.left),e+=c.scrollTop(),n+=c.scrollLeft(),!1!==o.viewportConstrain&&(r=Math.min(r,e+d.outerHeight()-u-this.margin),r=Math.max(r,e+this.margin),s=Math.min(s,n+d.outerWidth()-l-this.margin),s=Math.max(s,n+this.margin)),this.el.css({top:r-a.top,left:s-a.left})},trigger:function(t){this.options[t]&&this.options[t].apply(this,Array.prototype.slice.call(arguments,1))}}),ge=Wt.CoordCache=dt.extend({els:null,forcedOffsetParentEl:null,origin:null,boundingRect:null,isHorizontal:!1,isVertical:!1,lefts:null,rights:null,tops:null,bottoms:null,constructor:function(e){this.els=t(e.els),this.isHorizontal=e.isHorizontal,this.isVertical=e.isVertical,this.forcedOffsetParentEl=e.offsetParent?t(e.offsetParent):null},build:function(){var t=this.forcedOffsetParentEl;!t&&this.els.length>0&&(t=this.els.eq(0).offsetParent()),this.origin=t?t.offset():null,this.boundingRect=this.queryBoundingRect(),this.isHorizontal&&this.buildElHorizontals(),this.isVertical&&this.buildElVerticals()},clear:function(){this.origin=null,this.boundingRect=null,this.lefts=null,this.rights=null,this.tops=null,this.bottoms=null},ensureBuilt:function(){this.origin||this.build()},buildElHorizontals:function(){var e=[],n=[];this.els.each(function(i,r){var s=t(r),o=s.offset().left,a=s.outerWidth();e.push(o),n.push(o+a)}),this.lefts=e,this.rights=n},buildElVerticals:function(){var e=[],n=[];this.els.each(function(i,r){var s=t(r),o=s.offset().top,a=s.outerHeight();e.push(o),n.push(o+a)}),this.tops=e,this.bottoms=n},getHorizontalIndex:function(t){this.ensureBuilt();var e,n=this.lefts,i=this.rights,r=n.length;for(e=0;e<r;e++)if(t>=n[e]&&t<i[e])return e},getVerticalIndex:function(t){this.ensureBuilt();var e,n=this.tops,i=this.bottoms,r=n.length;for(e=0;e<r;e++)if(t>=n[e]&&t<i[e])return e},getLeftOffset:function(t){return this.ensureBuilt(),this.lefts[t]},getLeftPosition:function(t){return this.ensureBuilt(),this.lefts[t]-this.origin.left},getRightOffset:function(t){return this.ensureBuilt(),this.rights[t]},getRightPosition:function(t){return this.ensureBuilt(),this.rights[t]-this.origin.left},getWidth:function(t){return this.ensureBuilt(),this.rights[t]-this.lefts[t]},getTopOffset:function(t){return this.ensureBuilt(),this.tops[t]},getTopPosition:function(t){return this.ensureBuilt(),this.tops[t]-this.origin.top},getBottomOffset:function(t){return this.ensureBuilt(),this.bottoms[t]},getBottomPosition:function(t){return this.ensureBuilt(),this.bottoms[t]-this.origin.top},getHeight:function(t){return this.ensureBuilt(),this.bottoms[t]-this.tops[t]},queryBoundingRect:function(){var t;return this.els.length>0&&(t=h(this.els.eq(0)),!t.is(document))?f(t):null},isPointInBounds:function(t,e){return this.isLeftInBounds(t)&&this.isTopInBounds(e)},isLeftInBounds:function(t){return!this.boundingRect||t>=this.boundingRect.left&&t<this.boundingRect.right},isTopInBounds:function(t){return!this.boundingRect||t>=this.boundingRect.top&&t<this.boundingRect.bottom}}),pe=Wt.DragListener=dt.extend(se,{options:null,subjectEl:null,originX:null,originY:null,scrollEl:null,isInteracting:!1,isDistanceSurpassed:!1,isDelayEnded:!1,isDragging:!1,isTouch:!1,isGeneric:!1,delay:null,delayTimeoutId:null,minDistance:null,shouldCancelTouchScroll:!0,scrollAlwaysKills:!1,constructor:function(t){this.options=t||{}},startInteraction:function(e,n){if("mousedown"===e.type){if(me.get().shouldIgnoreMouse())return;if(!D(e))return;e.preventDefault()}this.isInteracting||(n=n||{},this.delay=tt(n.delay,this.options.delay,0),this.minDistance=tt(n.distance,this.options.distance,0),this.subjectEl=this.options.subjectEl,C(t("body")),this.isInteracting=!0,this.isTouch=S(e),this.isGeneric="dragstart"===e.type,this.isDelayEnded=!1,this.isDistanceSurpassed=!1,this.originX=b(e),this.originY=E(e),this.scrollEl=h(t(e.target)),this.bindHandlers(),this.initAutoScroll(),this.handleInteractionStart(e),this.startDelay(e),this.minDistance||this.handleDistanceSurpassed(e))},handleInteractionStart:function(t){this.trigger("interactionStart",t)},endInteraction:function(e,n){this.isInteracting&&(this.endDrag(e),this.delayTimeoutId&&(clearTimeout(this.delayTimeoutId),this.delayTimeoutId=null),this.destroyAutoScroll(),this.unbindHandlers(),this.isInteracting=!1,this.handleInteractionEnd(e,n),R(t("body")))},handleInteractionEnd:function(t,e){this.trigger("interactionEnd",t,e||!1)},bindHandlers:function(){var e=me.get();this.isGeneric?this.listenTo(t(document),{drag:this.handleMove,dragstop:this.endInteraction}):this.isTouch?this.listenTo(e,{touchmove:this.handleTouchMove,touchend:this.endInteraction,scroll:this.handleTouchScroll}):this.listenTo(e,{mousemove:this.handleMouseMove,mouseup:this.endInteraction}),this.listenTo(e,{selectstart:T,contextmenu:T})},unbindHandlers:function(){this.stopListeningTo(me.get()),this.stopListeningTo(t(document))},startDrag:function(t,e){this.startInteraction(t,e),this.isDragging||(this.isDragging=!0,
this.handleDragStart(t))},handleDragStart:function(t){this.trigger("dragStart",t)},handleMove:function(t){var e=b(t)-this.originX,n=E(t)-this.originY,i=this.minDistance;this.isDistanceSurpassed||e*e+n*n>=i*i&&this.handleDistanceSurpassed(t),this.isDragging&&this.handleDrag(e,n,t)},handleDrag:function(t,e,n){this.trigger("drag",t,e,n),this.updateAutoScroll(n)},endDrag:function(t){this.isDragging&&(this.isDragging=!1,this.handleDragEnd(t))},handleDragEnd:function(t){this.trigger("dragEnd",t)},startDelay:function(t){var e=this;this.delay?this.delayTimeoutId=setTimeout(function(){e.handleDelayEnd(t)},this.delay):this.handleDelayEnd(t)},handleDelayEnd:function(t){this.isDelayEnded=!0,this.isDistanceSurpassed&&this.startDrag(t)},handleDistanceSurpassed:function(t){this.isDistanceSurpassed=!0,this.isDelayEnded&&this.startDrag(t)},handleTouchMove:function(t){this.isDragging&&this.shouldCancelTouchScroll&&t.preventDefault(),this.handleMove(t)},handleMouseMove:function(t){this.handleMove(t)},handleTouchScroll:function(t){this.isDragging&&!this.scrollAlwaysKills||this.endInteraction(t,!0)},trigger:function(t){this.options[t]&&this.options[t].apply(this,Array.prototype.slice.call(arguments,1)),this["_"+t]&&this["_"+t].apply(this,Array.prototype.slice.call(arguments,1))}});pe.mixin({isAutoScroll:!1,scrollBounds:null,scrollTopVel:null,scrollLeftVel:null,scrollIntervalId:null,scrollSensitivity:30,scrollSpeed:200,scrollIntervalMs:50,initAutoScroll:function(){var t=this.scrollEl;this.isAutoScroll=this.options.scroll&&t&&!t.is(window)&&!t.is(document),this.isAutoScroll&&this.listenTo(t,"scroll",ut(this.handleDebouncedScroll,100))},destroyAutoScroll:function(){this.endAutoScroll(),this.isAutoScroll&&this.stopListeningTo(this.scrollEl,"scroll")},computeScrollBounds:function(){this.isAutoScroll&&(this.scrollBounds=d(this.scrollEl))},updateAutoScroll:function(t){var e,n,i,r,s=this.scrollSensitivity,o=this.scrollBounds,a=0,l=0;o&&(e=(s-(E(t)-o.top))/s,n=(s-(o.bottom-E(t)))/s,i=(s-(b(t)-o.left))/s,r=(s-(o.right-b(t)))/s,e>=0&&e<=1?a=e*this.scrollSpeed*-1:n>=0&&n<=1&&(a=n*this.scrollSpeed),i>=0&&i<=1?l=i*this.scrollSpeed*-1:r>=0&&r<=1&&(l=r*this.scrollSpeed)),this.setScrollVel(a,l)},setScrollVel:function(t,e){this.scrollTopVel=t,this.scrollLeftVel=e,this.constrainScrollVel(),!this.scrollTopVel&&!this.scrollLeftVel||this.scrollIntervalId||(this.scrollIntervalId=setInterval(lt(this,"scrollIntervalFunc"),this.scrollIntervalMs))},constrainScrollVel:function(){var t=this.scrollEl;this.scrollTopVel<0?t.scrollTop()<=0&&(this.scrollTopVel=0):this.scrollTopVel>0&&t.scrollTop()+t[0].clientHeight>=t[0].scrollHeight&&(this.scrollTopVel=0),this.scrollLeftVel<0?t.scrollLeft()<=0&&(this.scrollLeftVel=0):this.scrollLeftVel>0&&t.scrollLeft()+t[0].clientWidth>=t[0].scrollWidth&&(this.scrollLeftVel=0)},scrollIntervalFunc:function(){var t=this.scrollEl,e=this.scrollIntervalMs/1e3;this.scrollTopVel&&t.scrollTop(t.scrollTop()+this.scrollTopVel*e),this.scrollLeftVel&&t.scrollLeft(t.scrollLeft()+this.scrollLeftVel*e),this.constrainScrollVel(),this.scrollTopVel||this.scrollLeftVel||this.endAutoScroll()},endAutoScroll:function(){this.scrollIntervalId&&(clearInterval(this.scrollIntervalId),this.scrollIntervalId=null,this.handleScrollEnd())},handleDebouncedScroll:function(){this.scrollIntervalId||this.handleScrollEnd()},handleScrollEnd:function(){}});var ve=pe.extend({component:null,origHit:null,hit:null,coordAdjust:null,constructor:function(t,e){pe.call(this,e),this.component=t},handleInteractionStart:function(t){var e,n,i,r=this.subjectEl;this.component.hitsNeeded(),this.computeScrollBounds(),t?(n={left:b(t),top:E(t)},i=n,r&&(e=d(r),i=H(i,e)),this.origHit=this.queryHit(i.left,i.top),r&&this.options.subjectCenter&&(this.origHit&&(e=I(this.origHit,e)||e),i=M(e)),this.coordAdjust=x(i,n)):(this.origHit=null,this.coordAdjust=null),pe.prototype.handleInteractionStart.apply(this,arguments)},handleDragStart:function(t){var e;pe.prototype.handleDragStart.apply(this,arguments),(e=this.queryHit(b(t),E(t)))&&this.handleHitOver(e)},handleDrag:function(t,e,n){var i;pe.prototype.handleDrag.apply(this,arguments),i=this.queryHit(b(n),E(n)),vt(i,this.hit)||(this.hit&&this.handleHitOut(),i&&this.handleHitOver(i))},handleDragEnd:function(){this.handleHitDone(),pe.prototype.handleDragEnd.apply(this,arguments)},handleHitOver:function(t){var e=vt(t,this.origHit);this.hit=t,this.trigger("hitOver",this.hit,e,this.origHit)},handleHitOut:function(){this.hit&&(this.trigger("hitOut",this.hit),this.handleHitDone(),this.hit=null)},handleHitDone:function(){this.hit&&this.trigger("hitDone",this.hit)},handleInteractionEnd:function(){pe.prototype.handleInteractionEnd.apply(this,arguments),this.origHit=null,this.hit=null,this.component.hitsNotNeeded()},handleScrollEnd:function(){pe.prototype.handleScrollEnd.apply(this,arguments),this.isDragging&&(this.component.releaseHits(),this.component.prepareHits())},queryHit:function(t,e){return this.coordAdjust&&(t+=this.coordAdjust.left,e+=this.coordAdjust.top),this.component.queryHit(t,e)}});Wt.touchMouseIgnoreWait=500;var me=dt.extend(se,re,{isTouching:!1,mouseIgnoreDepth:0,handleScrollProxy:null,bind:function(){var e=this;this.listenTo(t(document),{touchstart:this.handleTouchStart,touchcancel:this.handleTouchCancel,touchend:this.handleTouchEnd,mousedown:this.handleMouseDown,mousemove:this.handleMouseMove,mouseup:this.handleMouseUp,click:this.handleClick,selectstart:this.handleSelectStart,contextmenu:this.handleContextMenu}),window.addEventListener("touchmove",this.handleTouchMoveProxy=function(n){e.handleTouchMove(t.Event(n))},{passive:!1}),window.addEventListener("scroll",this.handleScrollProxy=function(n){e.handleScroll(t.Event(n))},!0)},unbind:function(){this.stopListeningTo(t(document)),window.removeEventListener("touchmove",this.handleTouchMoveProxy),window.removeEventListener("scroll",this.handleScrollProxy,!0)},handleTouchStart:function(t){this.stopTouch(t,!0),this.isTouching=!0,this.trigger("touchstart",t)},handleTouchMove:function(t){this.isTouching&&this.trigger("touchmove",t)},handleTouchCancel:function(t){this.isTouching&&(this.trigger("touchcancel",t),this.stopTouch(t))},handleTouchEnd:function(t){this.stopTouch(t)},handleMouseDown:function(t){this.shouldIgnoreMouse()||this.trigger("mousedown",t)},handleMouseMove:function(t){this.shouldIgnoreMouse()||this.trigger("mousemove",t)},handleMouseUp:function(t){this.shouldIgnoreMouse()||this.trigger("mouseup",t)},handleClick:function(t){this.shouldIgnoreMouse()||this.trigger("click",t)},handleSelectStart:function(t){this.trigger("selectstart",t)},handleContextMenu:function(t){this.trigger("contextmenu",t)},handleScroll:function(t){this.trigger("scroll",t)},stopTouch:function(t,e){this.isTouching&&(this.isTouching=!1,this.trigger("touchend",t),e||this.startTouchMouseIgnore())},startTouchMouseIgnore:function(){var t=this,e=Wt.touchMouseIgnoreWait;e&&(this.mouseIgnoreDepth++,setTimeout(function(){t.mouseIgnoreDepth--},e))},shouldIgnoreMouse:function(){return this.isTouching||Boolean(this.mouseIgnoreDepth)}});!function(){var t=null,e=0;me.get=function(){return t||(t=new me,t.bind()),t},me.needed=function(){me.get(),e++},me.unneeded=function(){--e||(t.unbind(),t=null)}}();var ye=dt.extend(se,{options:null,sourceEl:null,el:null,parentEl:null,top0:null,left0:null,y0:null,x0:null,topDelta:null,leftDelta:null,isFollowing:!1,isHidden:!1,isAnimating:!1,constructor:function(e,n){this.options=n=n||{},this.sourceEl=e,this.parentEl=n.parentEl?t(n.parentEl):e.parent()},start:function(e){this.isFollowing||(this.isFollowing=!0,this.y0=E(e),this.x0=b(e),this.topDelta=0,this.leftDelta=0,this.isHidden||this.updatePosition(),S(e)?this.listenTo(t(document),"touchmove",this.handleMove):this.listenTo(t(document),"mousemove",this.handleMove))},stop:function(e,n){function i(){r.isAnimating=!1,r.removeElement(),r.top0=r.left0=null,n&&n()}var r=this,s=this.options.revertDuration;this.isFollowing&&!this.isAnimating&&(this.isFollowing=!1,this.stopListeningTo(t(document)),e&&s&&!this.isHidden?(this.isAnimating=!0,this.el.animate({top:this.top0,left:this.left0},{duration:s,complete:i})):i())},getEl:function(){var t=this.el;return t||(t=this.el=this.sourceEl.clone().addClass(this.options.additionalClass||"").css({position:"absolute",visibility:"",display:this.isHidden?"none":"",margin:0,right:"auto",bottom:"auto",width:this.sourceEl.width(),height:this.sourceEl.height(),opacity:this.options.opacity||"",zIndex:this.options.zIndex}),t.addClass("fc-unselectable"),t.appendTo(this.parentEl)),t},removeElement:function(){this.el&&(this.el.remove(),this.el=null)},updatePosition:function(){var t,e;this.getEl(),null===this.top0&&(t=this.sourceEl.offset(),e=this.el.offsetParent().offset(),this.top0=t.top-e.top,this.left0=t.left-e.left),this.el.css({top:this.top0+this.topDelta,left:this.left0+this.leftDelta})},handleMove:function(t){this.topDelta=E(t)-this.y0,this.leftDelta=b(t)-this.x0,this.isHidden||this.updatePosition()},hide:function(){this.isHidden||(this.isHidden=!0,this.el&&this.el.hide())},show:function(){this.isHidden&&(this.isHidden=!1,this.updatePosition(),this.getEl().show())}}),we=Wt.Scroller=dt.extend({el:null,scrollEl:null,overflowX:null,overflowY:null,constructor:function(t){t=t||{},this.overflowX=t.overflowX||t.overflow||"auto",this.overflowY=t.overflowY||t.overflow||"auto"},render:function(){this.el=this.renderEl(),this.applyOverflow()},renderEl:function(){return this.scrollEl=t('<div class="fc-scroller"></div>')},clear:function(){this.setHeight("auto"),this.applyOverflow()},destroy:function(){this.el.remove()},applyOverflow:function(){this.scrollEl.css({"overflow-x":this.overflowX,"overflow-y":this.overflowY})},lockOverflow:function(t){var e=this.overflowX,n=this.overflowY;t=t||this.getScrollbarWidths(),"auto"===e&&(e=t.top||t.bottom||this.scrollEl[0].scrollWidth-1>this.scrollEl[0].clientWidth?"scroll":"hidden"),"auto"===n&&(n=t.left||t.right||this.scrollEl[0].scrollHeight-1>this.scrollEl[0].clientHeight?"scroll":"hidden"),this.scrollEl.css({"overflow-x":e,"overflow-y":n})},setHeight:function(t){this.scrollEl.height(t)},getScrollTop:function(){return this.scrollEl.scrollTop()},setScrollTop:function(t){this.scrollEl.scrollTop(t)},getClientWidth:function(){return this.scrollEl[0].clientWidth},getClientHeight:function(){return this.scrollEl[0].clientHeight},getScrollbarWidths:function(){return p(this.scrollEl)}});yt.prototype.proxyCall=function(t){var e=Array.prototype.slice.call(arguments,1),n=[];return this.items.forEach(function(i){n.push(i[t].apply(i,e))}),n};var De=dt.extend({view:null,component:null,constructor:function(t){this.view=t._getView(),this.component=t},opt:function(t){return this.view.opt(t)},end:function(){}}),be=De.extend({dragListener:null,constructor:function(t){De.call(this,t),this.dragListener=this.buildDragListener()},end:function(){this.dragListener.endInteraction()},bindToEl:function(t){var e=this.component,n=this.dragListener;e.bindDateHandlerToEl(t,"mousedown",function(t){e.shouldIgnoreMouse()||n.startInteraction(t)}),e.bindDateHandlerToEl(t,"touchstart",function(t){e.shouldIgnoreTouch()||n.startInteraction(t)})},buildDragListener:function(){var t,e=this,n=this.component,i=new ve(n,{scroll:this.opt("dragScroll"),interactionStart:function(){t=i.origHit},hitOver:function(e,n,i){n||(t=null)},hitOut:function(){t=null},interactionEnd:function(i,r){var s;!r&&t&&(s=n.getSafeHitFootprint(t))&&e.view.triggerDayClick(s,n.getHitEl(t),i)}});return i.shouldCancelTouchScroll=!1,i.scrollAlwaysKills=!0,i}}),Ee=Wt.DateSelecting=De.extend({dragListener:null,constructor:function(t){De.call(this,t),this.dragListener=this.buildDragListener()},end:function(){this.dragListener.endInteraction()},getDelay:function(){var t=this.opt("selectLongPressDelay");return null==t&&(t=this.opt("longPressDelay")),t},bindToEl:function(t){var e=this,n=this.component,i=this.dragListener;n.bindDateHandlerToEl(t,"mousedown",function(t){e.opt("selectable")&&!n.shouldIgnoreMouse()&&i.startInteraction(t,{distance:e.opt("selectMinDistance")})}),n.bindDateHandlerToEl(t,"touchstart",function(t){e.opt("selectable")&&!n.shouldIgnoreTouch()&&i.startInteraction(t,{delay:e.getDelay()})}),C(t)},buildDragListener:function(){var t,e=this,n=this.component;return new ve(n,{scroll:this.opt("dragScroll"),interactionStart:function(){t=null},dragStart:function(t){e.view.unselect(t)},hitOver:function(i,r,o){var a,l;o&&(a=n.getSafeHitFootprint(o),l=n.getSafeHitFootprint(i),t=a&&l?e.computeSelection(a,l):null,t?n.renderSelectionFootprint(t):!1===t&&s())},hitOut:function(){t=null,n.unrenderSelection()},hitDone:function(){o()},interactionEnd:function(n,i){!i&&t&&e.view.reportSelection(t,n)}})},computeSelection:function(t,e){var n=this.computeSelectionFootprint(t,e);return!(n&&!this.isSelectionFootprintAllowed(n))&&n},computeSelectionFootprint:function(t,e){var n=[t.unzonedRange.startMs,t.unzonedRange.endMs,e.unzonedRange.startMs,e.unzonedRange.endMs];return n.sort(ot),new We(new Ue(n[0],n[3]),t.isAllDay)},isSelectionFootprintAllowed:function(t){return this.component.dateProfile.validUnzonedRange.containsRange(t.unzonedRange)&&this.view.calendar.isSelectionFootprintAllowed(t)}}),Se=Wt.EventDragging=De.extend({eventPointing:null,dragListener:null,isDragging:!1,constructor:function(t,e){De.call(this,t),this.eventPointing=e},end:function(){this.dragListener&&this.dragListener.endInteraction()},getSelectionDelay:function(){var t=this.opt("eventLongPressDelay");return null==t&&(t=this.opt("longPressDelay")),t},bindToEl:function(t){var e=this.component;e.bindSegHandlerToEl(t,"mousedown",this.handleMousedown.bind(this)),e.bindSegHandlerToEl(t,"touchstart",this.handleTouchStart.bind(this))},handleMousedown:function(t,e){this.component.canStartDrag(t,e)&&this.buildDragListener(t).startInteraction(e,{distance:5})},handleTouchStart:function(t,e){var n=this.component,i={delay:this.view.isEventDefSelected(t.footprint.eventDef)?0:this.getSelectionDelay()};n.canStartDrag(t,e)?this.buildDragListener(t).startInteraction(e,i):n.canStartSelection(t,e)&&this.buildSelectListener(t).startInteraction(e,i)},buildSelectListener:function(t){var e=this,n=this.view,i=t.footprint.eventDef,r=t.footprint.eventInstance;if(this.dragListener)return this.dragListener;var s=this.dragListener=new pe({dragStart:function(t){s.isTouch&&!n.isEventDefSelected(i)&&r&&n.selectEventInstance(r)},interactionEnd:function(t){e.dragListener=null}});return s},buildDragListener:function(t){var e,n,i,r=this,a=this.component,l=this.view,u=l.calendar,c=u.eventManager,h=t.el,d=t.footprint.eventDef,f=t.footprint.eventInstance;if(this.dragListener)return this.dragListener;var g=this.dragListener=new ve(l,{scroll:this.opt("dragScroll"),subjectEl:h,subjectCenter:!0,interactionStart:function(i){t.component=a,e=!1,n=new ye(t.el,{additionalClass:"fc-dragging",parentEl:l.el,opacity:g.isTouch?null:r.opt("dragOpacity"),revertDuration:r.opt("dragRevertDuration"),zIndex:2}),n.hide(),n.start(i)},dragStart:function(n){g.isTouch&&!l.isEventDefSelected(d)&&f&&l.selectEventInstance(f),e=!0,r.eventPointing.handleMouseout(t,n),r.segDragStart(t,n),l.hideEventsWithId(t.footprint.eventDef.id)},hitOver:function(e,o,h){var f,p,v,m=!0;t.hit&&(h=t.hit),f=h.component.getSafeHitFootprint(h),p=e.component.getSafeHitFootprint(e),f&&p?(i=r.computeEventDropMutation(f,p,d),i?(v=c.buildMutatedEventInstanceGroup(d.id,i),m=a.isEventInstanceGroupAllowed(v)):m=!1):m=!1,m||(i=null,s()),i&&l.renderDrag(a.eventRangesToEventFootprints(v.sliceRenderRanges(a.dateProfile.renderUnzonedRange,u)),t,g.isTouch)?n.hide():n.show(),o&&(i=null)},hitOut:function(){l.unrenderDrag(t),n.show(),i=null},hitDone:function(){o()},interactionEnd:function(s){delete t.component,n.stop(!i,function(){e&&(l.unrenderDrag(t),r.segDragStop(t,s)),l.showEventsWithId(t.footprint.eventDef.id),i&&l.reportEventDrop(f,i,h,s)}),r.dragListener=null}});return g},segDragStart:function(t,e){this.isDragging=!0,this.component.publiclyTrigger("eventDragStart",{context:t.el[0],args:[t.footprint.getEventLegacy(),e,{},this.view]})},segDragStop:function(t,e){this.isDragging=!1,this.component.publiclyTrigger("eventDragStop",{context:t.el[0],args:[t.footprint.getEventLegacy(),e,{},this.view]})},computeEventDropMutation:function(t,e,n){var i=new rn;return i.setDateMutation(this.computeEventDateMutation(t,e)),i},computeEventDateMutation:function(t,e){var n,i,r=t.unzonedRange.getStart(),s=e.unzonedRange.getStart(),o=!1,a=!1,l=!1;return t.isAllDay!==e.isAllDay&&(o=!0,e.isAllDay?(l=!0,r.stripTime()):a=!0),n=this.component.diffDates(s,r),i=new sn,i.clearEnd=o,i.forceTimed=a,i.forceAllDay=l,i.setDateDelta(n),i}}),Ce=Wt.EventResizing=De.extend({eventPointing:null,dragListener:null,isResizing:!1,constructor:function(t,e){De.call(this,t),this.eventPointing=e},end:function(){this.dragListener&&this.dragListener.endInteraction()},bindToEl:function(t){var e=this.component;e.bindSegHandlerToEl(t,"mousedown",this.handleMouseDown.bind(this)),e.bindSegHandlerToEl(t,"touchstart",this.handleTouchStart.bind(this))},handleMouseDown:function(e,n){this.component.canStartResize(e,n)&&this.buildDragListener(e,t(n.target).is(".fc-start-resizer")).startInteraction(n,{distance:5})},handleTouchStart:function(e,n){this.component.canStartResize(e,n)&&this.buildDragListener(e,t(n.target).is(".fc-start-resizer")).startInteraction(n)},buildDragListener:function(t,e){var n,i,r=this,a=this.component,l=this.view,u=l.calendar,c=u.eventManager,h=t.el,d=t.footprint.eventDef,f=t.footprint.eventInstance;return this.dragListener=new ve(a,{scroll:this.opt("dragScroll"),subjectEl:h,interactionStart:function(){n=!1},dragStart:function(e){n=!0,r.eventPointing.handleMouseout(t,e),r.segResizeStart(t,e)},hitOver:function(n,o,h){var f,g=!0,p=a.getSafeHitFootprint(h),v=a.getSafeHitFootprint(n);p&&v?(i=e?r.computeEventStartResizeMutation(p,v,t.footprint):r.computeEventEndResizeMutation(p,v,t.footprint),i?(f=c.buildMutatedEventInstanceGroup(d.id,i),g=a.isEventInstanceGroupAllowed(f)):g=!1):g=!1,g?i.isEmpty()&&(i=null):(i=null,s()),i&&(l.hideEventsWithId(t.footprint.eventDef.id),l.renderEventResize(a.eventRangesToEventFootprints(f.sliceRenderRanges(a.dateProfile.renderUnzonedRange,u)),t))},hitOut:function(){i=null},hitDone:function(){l.unrenderEventResize(t),l.showEventsWithId(t.footprint.eventDef.id),o()},interactionEnd:function(e){n&&r.segResizeStop(t,e),i&&l.reportEventResize(f,i,h,e),r.dragListener=null}})},segResizeStart:function(t,e){this.isResizing=!0,this.component.publiclyTrigger("eventResizeStart",{context:t.el[0],args:[t.footprint.getEventLegacy(),e,{},this.view]})},segResizeStop:function(t,e){this.isResizing=!1,this.component.publiclyTrigger("eventResizeStop",{context:t.el[0],args:[t.footprint.getEventLegacy(),e,{},this.view]})},computeEventStartResizeMutation:function(t,e,n){var i,r,s=n.componentFootprint.unzonedRange,o=this.component.diffDates(e.unzonedRange.getStart(),t.unzonedRange.getStart());return s.getStart().add(o)<s.getEnd()&&(i=new sn,i.setStartDelta(o),r=new rn,r.setDateMutation(i),r)},computeEventEndResizeMutation:function(t,e,n){var i,r,s=n.componentFootprint.unzonedRange,o=this.component.diffDates(e.unzonedRange.getEnd(),t.unzonedRange.getEnd());return s.getEnd().add(o)>s.getStart()&&(i=new sn,i.setEndDelta(o),r=new rn,r.setDateMutation(i),r)}}),Re=Wt.ExternalDropping=De.extend(se,{dragListener:null,isDragging:!1,end:function(){this.dragListener&&this.dragListener.endInteraction()},bindToDocument:function(){this.listenTo(t(document),{dragstart:this.handleDragStart,sortstart:this.handleDragStart})},unbindFromDocument:function(){this.stopListeningTo(t(document))},handleDragStart:function(e,n){var i,r;this.opt("droppable")&&(i=t((n?n.item:null)||e.target),r=this.opt("dropAccept"),(t.isFunction(r)?r.call(i[0],i):i.is(r))&&(this.isDragging||this.listenToExternalDrag(i,e,n)))},listenToExternalDrag:function(t,e,n){var i,r=this,a=this.component,l=this.view,u=wt(t);(r.dragListener=new ve(a,{interactionStart:function(){r.isDragging=!0},hitOver:function(t){var e,n=!0,o=t.component.getSafeHitFootprint(t);o?(i=r.computeExternalDrop(o,u),i?(e=new Je(i.buildInstances()),n=u.eventProps?a.isEventInstanceGroupAllowed(e):a.isExternalInstanceGroupAllowed(e)):n=!1):n=!1,n||(i=null,s()),i&&a.renderDrag(a.eventRangesToEventFootprints(e.sliceRenderRanges(a.dateProfile.renderUnzonedRange,l.calendar)))},hitOut:function(){i=null},hitDone:function(){o(),a.unrenderDrag()},interactionEnd:function(e){i&&l.reportExternalDrop(i,Boolean(u.eventProps),Boolean(u.stick),t,e,n),r.isDragging=!1,r.dragListener=null}})).startDrag(e)},computeExternalDrop:function(e,n){var i,r=this.view.calendar,s=Wt.moment.utc(e.unzonedRange.startMs).stripZone();return e.isAllDay&&(n.startTime?s.time(n.startTime):s.stripTime()),n.duration&&(i=s.clone().add(n.duration)),s=r.applyTimezone(s),i&&(i=r.applyTimezone(i)),$e.parse(t.extend({},n.eventProps,{start:s,end:i}),new on(r))}});Wt.dataAttrPrefix="";var Te=Wt.EventPointing=De.extend({mousedOverSeg:null,bindToEl:function(t){var e=this.component;e.bindSegHandlerToEl(t,"click",this.handleClick.bind(this)),e.bindSegHandlerToEl(t,"mouseenter",this.handleMouseover.bind(this)),e.bindSegHandlerToEl(t,"mouseleave",this.handleMouseout.bind(this))},handleClick:function(t,e){!1===this.component.publiclyTrigger("eventClick",{context:t.el[0],args:[t.footprint.getEventLegacy(),e,this.view]})&&e.preventDefault()},handleMouseover:function(t,e){me.get().shouldIgnoreMouse()||this.mousedOverSeg||(this.mousedOverSeg=t,this.view.isEventDefResizable(t.footprint.eventDef)&&t.el.addClass("fc-allow-mouse-resize"),this.component.publiclyTrigger("eventMouseover",{context:t.el[0],args:[t.footprint.getEventLegacy(),e,this.view]}))},handleMouseout:function(t,e){this.mousedOverSeg&&(this.mousedOverSeg=null,this.view.isEventDefResizable(t.footprint.eventDef)&&t.el.removeClass("fc-allow-mouse-resize"),this.component.publiclyTrigger("eventMouseout",{context:t.el[0],args:[t.footprint.getEventLegacy(),e||{},this.view]}))},end:function(){this.mousedOverSeg&&this.handleMouseout(this.mousedOverSeg)}}),Ie=Wt.StandardInteractionsMixin={dateClickingClass:be,dateSelectingClass:Ee,eventPointingClass:Te,eventDraggingClass:Se,eventResizingClass:Ce,externalDroppingClass:Re},He=Wt.EventRenderer=dt.extend({view:null,component:null,fillRenderer:null,fgSegs:null,bgSegs:null,eventTimeFormat:null,displayEventTime:null,displayEventEnd:null,constructor:function(t,e){this.view=t._getView(),this.component=t,this.fillRenderer=e},opt:function(t){return this.view.opt(t)},rangeUpdated:function(){var t,e;this.eventTimeFormat=this.opt("eventTimeFormat")||this.opt("timeFormat")||this.computeEventTimeFormat(),t=this.opt("displayEventTime"),null==t&&(t=this.computeDisplayEventTime()),e=this.opt("displayEventEnd"),null==e&&(e=this.computeDisplayEventEnd()),this.displayEventTime=t,this.displayEventEnd=e},render:function(t){var e,n,i,r=this.component._getDateProfile(),s=[],o=[];for(e in t)n=t[e],i=n.sliceRenderRanges(r.activeUnzonedRange),n.getEventDef().hasBgRendering()?s.push.apply(s,i):o.push.apply(o,i);this.renderBgRanges(s),this.renderFgRanges(o)},unrender:function(){this.unrenderBgRanges(),this.unrenderFgRanges()},renderFgRanges:function(t){var e=this.component.eventRangesToEventFootprints(t),n=this.component.eventFootprintsToSegs(e);n=this.renderFgSegEls(n),!1!==this.renderFgSegs(n)&&(this.fgSegs=n)},unrenderFgRanges:function(){this.unrenderFgSegs(this.fgSegs||[]),this.fgSegs=null},renderBgRanges:function(t){var e=this.component.eventRangesToEventFootprints(t),n=this.component.eventFootprintsToSegs(e);!1!==this.renderBgSegs(n)&&(this.bgSegs=n)},unrenderBgRanges:function(){this.unrenderBgSegs(),this.bgSegs=null},getSegs:function(){return(this.bgSegs||[]).concat(this.fgSegs||[])},renderFgSegs:function(t){return!1},unrenderFgSegs:function(t){},renderBgSegs:function(t){var e=this;if(!this.fillRenderer)return!1;this.fillRenderer.renderSegs("bgEvent",t,{getClasses:function(t){return e.getBgClasses(t.footprint.eventDef)},getCss:function(t){return{"background-color":e.getBgColor(t.footprint.eventDef)}},filterEl:function(t,n){return e.filterEventRenderEl(t.footprint,n)}})},unrenderBgSegs:function(){this.fillRenderer&&this.fillRenderer.unrender("bgEvent")},renderFgSegEls:function(e,n){var i,r=this,s=this.view.hasPublicHandlers("eventRender"),o="",a=[];if(e.length){for(i=0;i<e.length;i++)this.beforeFgSegHtml(e[i]),o+=this.fgSegHtml(e[i],n);t(o).each(function(n,i){var o=e[n],l=t(i);s&&(l=r.filterEventRenderEl(o.footprint,l)),l&&(l.data("fc-seg",o),o.el=l,a.push(o))})}return a},beforeFgSegHtml:function(t){},fgSegHtml:function(t,e){},getSegClasses:function(t,e,n){var i=["fc-event",t.isStart?"fc-start":"fc-not-start",t.isEnd?"fc-end":"fc-not-end"].concat(this.getClasses(t.footprint.eventDef));return e&&i.push("fc-draggable"),n&&i.push("fc-resizable"),this.view.isEventDefSelected(t.footprint.eventDef)&&i.push("fc-selected"),i},filterEventRenderEl:function(e,n){var i=e.getEventLegacy(),r=this.view.publiclyTrigger("eventRender",{context:i,args:[i,n,this.view]});return!1===r?n=null:r&&!0!==r&&(n=t(r)),n},getTimeText:function(t,e,n){return this._getTimeText(t.eventInstance.dateProfile.start,t.eventInstance.dateProfile.end,t.componentFootprint.isAllDay,e,n)},_getTimeText:function(t,e,n,i,r){return null==i&&(i=this.eventTimeFormat),null==r&&(r=this.displayEventEnd),this.displayEventTime&&!n?r&&e?this.view.formatRange({start:t,end:e},!1,i):t.format(i):""},computeEventTimeFormat:function(){return this.opt("smallTimeFormat")},computeDisplayEventTime:function(){return!0},computeDisplayEventEnd:function(){return!0},getBgClasses:function(t){var e=this.getClasses(t);return e.push("fc-bgevent"),e},getClasses:function(t){var e,n=this.getStylingObjs(t),i=[];for(e=0;e<n.length;e++)i.push.apply(i,n[e].eventClassName||n[e].className||[]);return i},getSkinCss:function(t){return{"background-color":this.getBgColor(t),"border-color":this.getBorderColor(t),color:this.getTextColor(t)}},getBgColor:function(t){var e,n,i=this.getStylingObjs(t);for(e=0;e<i.length&&!n;e++)n=i[e].eventBackgroundColor||i[e].eventColor||i[e].backgroundColor||i[e].color;return n||(n=this.opt("eventBackgroundColor")||this.opt("eventColor")),n},getBorderColor:function(t){var e,n,i=this.getStylingObjs(t);for(e=0;e<i.length&&!n;e++)n=i[e].eventBorderColor||i[e].eventColor||i[e].borderColor||i[e].color;return n||(n=this.opt("eventBorderColor")||this.opt("eventColor")),n},getTextColor:function(t){var e,n,i=this.getStylingObjs(t);for(e=0;e<i.length&&!n;e++)n=i[e].eventTextColor||i[e].textColor;return n||(n=this.opt("eventTextColor")),n},getStylingObjs:function(t){var e=this.getFallbackStylingObjs(t);return e.unshift(t),e},getFallbackStylingObjs:function(t){return[t.source]},sortEventSegs:function(t){t.sort(lt(this,"compareEventSegs"))},compareEventSegs:function(t,e){var n=t.footprint.componentFootprint,i=n.unzonedRange,r=e.footprint.componentFootprint,s=r.unzonedRange;return i.startMs-s.startMs||s.endMs-s.startMs-(i.endMs-i.startMs)||r.isAllDay-n.isAllDay||z(t.footprint.eventDef,e.footprint.eventDef,this.view.eventOrderSpecs)}}),Me=Wt.BusinessHourRenderer=dt.extend({component:null,fillRenderer:null,segs:null,constructor:function(t,e){this.component=t,this.fillRenderer=e},render:function(t){var e=this.component,n=e._getDateProfile().activeUnzonedRange,i=t.buildEventInstanceGroup(e.hasAllDayBusinessHours,n),r=i?e.eventRangesToEventFootprints(i.sliceRenderRanges(n)):[];this.renderEventFootprints(r)},renderEventFootprints:function(t){var e=this.component.eventFootprintsToSegs(t);this.renderSegs(e),this.segs=e},renderSegs:function(t){this.fillRenderer&&this.fillRenderer.renderSegs("businessHours",t,{getClasses:function(t){return["fc-nonbusiness","fc-bgevent"]}})},unrender:function(){this.fillRenderer&&this.fillRenderer.unrender("businessHours"),this.segs=null},getSegs:function(){return this.segs||[]}}),xe=Wt.FillRenderer=dt.extend({fillSegTag:"div",component:null,elsByFill:null,constructor:function(t){this.component=t,this.elsByFill={}},renderFootprint:function(t,e,n){this.renderSegs(t,this.component.componentFootprintToSegs(e),n)},renderSegs:function(t,e,n){var i;return e=this.buildSegEls(t,e,n),i=this.attachSegEls(t,e),i&&this.reportEls(t,i),e},unrender:function(t){var e=this.elsByFill[t];e&&(e.remove(),delete this.elsByFill[t])},buildSegEls:function(e,n,i){var r,s=this,o="",a=[];if(n.length){for(r=0;r<n.length;r++)o+=this.buildSegHtml(e,n[r],i);t(o).each(function(e,r){var o=n[e],l=t(r);i.filterEl&&(l=i.filterEl(o,l)),l&&(l=t(l),l.is(s.fillSegTag)&&(o.el=l,a.push(o)))})}return a},buildSegHtml:function(t,e,n){var i=n.getClasses?n.getClasses(e):[],r=it(n.getCss?n.getCss(e):{});return"<"+this.fillSegTag+(i.length?' class="'+i.join(" ")+'"':"")+(r?' style="'+r+'"':"")+" />"},attachSegEls:function(t,e){},reportEls:function(e,n){this.elsByFill[e]?this.elsByFill[e]=this.elsByFill[e].add(n):this.elsByFill[e]=t(n)}}),Pe=Wt.HelperRenderer=dt.extend({view:null,component:null,eventRenderer:null,helperEls:null,constructor:function(t,e){this.view=t._getView(),this.component=t,this.eventRenderer=e},renderComponentFootprint:function(t){this.renderEventFootprints([this.fabricateEventFootprint(t)])},renderEventDraggingFootprints:function(t,e,n){this.renderEventFootprints(t,e,"fc-dragging",n?null:this.view.opt("dragOpacity"))},renderEventResizingFootprints:function(t,e,n){this.renderEventFootprints(t,e,"fc-resizing")},renderEventFootprints:function(t,e,n,i){var r,s=this.component.eventFootprintsToSegs(t),o="fc-helper "+(n||"");for(s=this.eventRenderer.renderFgSegEls(s),r=0;r<s.length;r++)s[r].el.addClass(o);if(null!=i)for(r=0;r<s.length;r++)s[r].el.css("opacity",i);this.helperEls=this.renderSegs(s,e)},renderSegs:function(t,e){},unrender:function(){this.helperEls&&(this.helperEls.remove(),this.helperEls=null)},fabricateEventFootprint:function(t){var e,n=this.view.calendar,i=n.footprintToDateProfile(t),r=new $e(new on(n));return r.dateProfile=i,e=r.buildInstance(),new nn(t,r,e)}}),ze=ue.extend({el:null,setElement:function(t){this.el=t,this.bindGlobalHandlers(),this.renderSkeleton(),this.set("isInDom",!0)},removeElement:function(){this.unset("isInDom"),this.unrenderSkeleton(),this.unbindGlobalHandlers(),this.el.remove()},bindGlobalHandlers:function(){},unbindGlobalHandlers:function(){},renderSkeleton:function(){},unrenderSkeleton:function(){}}),Fe=Wt.DateComponent=ze.extend({uid:null,childrenByUid:null,isRTL:!1,nextDayThreshold:null,dateProfile:null,eventRendererClass:null,helperRendererClass:null,businessHourRendererClass:null,fillRendererClass:null,eventRenderer:null,helperRenderer:null,businessHourRenderer:null,fillRenderer:null,hitsNeededDepth:0,hasAllDayBusinessHours:!1,isDatesRendered:!1,constructor:function(){ze.call(this),this.uid=String(Fe.guid++),this.childrenByUid={},this.nextDayThreshold=e.duration(this.opt("nextDayThreshold")),this.isRTL=this.opt("isRTL"),this.fillRendererClass&&(this.fillRenderer=new this.fillRendererClass(this)),this.eventRendererClass&&(this.eventRenderer=new this.eventRendererClass(this,this.fillRenderer)),this.helperRendererClass&&this.eventRenderer&&(this.helperRenderer=new this.helperRendererClass(this,this.eventRenderer)),this.businessHourRendererClass&&this.fillRenderer&&(this.businessHourRenderer=new this.businessHourRendererClass(this,this.fillRenderer))},addChild:function(t){return!this.childrenByUid[t.uid]&&(this.childrenByUid[t.uid]=t,!0)},removeChild:function(t){return!!this.childrenByUid[t.uid]&&(delete this.childrenByUid[t.uid],!0)},updateSize:function(t,e,n){this.callChildren("updateSize",arguments)},opt:function(t){return this._getView().opt(t)},publiclyTrigger:function(){var t=this._getCalendar();return t.publiclyTrigger.apply(t,arguments)},hasPublicHandlers:function(){var t=this._getCalendar();return t.hasPublicHandlers.apply(t,arguments)},executeDateRender:function(t){this.dateProfile=t,this.renderDates(t),this.isDatesRendered=!0,this.callChildren("executeDateRender",arguments)},executeDateUnrender:function(){
this.callChildren("executeDateUnrender",arguments),this.dateProfile=null,this.unrenderDates(),this.isDatesRendered=!1},renderDates:function(t){},unrenderDates:function(){},getNowIndicatorUnit:function(){},renderNowIndicator:function(t){this.callChildren("renderNowIndicator",arguments)},unrenderNowIndicator:function(){this.callChildren("unrenderNowIndicator",arguments)},renderBusinessHours:function(t){this.businessHourRenderer&&this.businessHourRenderer.render(t),this.callChildren("renderBusinessHours",arguments)},unrenderBusinessHours:function(){this.callChildren("unrenderBusinessHours",arguments),this.businessHourRenderer&&this.businessHourRenderer.unrender()},executeEventRender:function(t){this.eventRenderer?(this.eventRenderer.rangeUpdated(),this.eventRenderer.render(t)):this.renderEvents&&this.renderEvents(Dt(t)),this.callChildren("executeEventRender",arguments)},executeEventUnrender:function(){this.callChildren("executeEventUnrender",arguments),this.eventRenderer?this.eventRenderer.unrender():this.destroyEvents&&this.destroyEvents()},getBusinessHourSegs:function(){var t=this.getOwnBusinessHourSegs();return this.iterChildren(function(e){t.push.apply(t,e.getBusinessHourSegs())}),t},getOwnBusinessHourSegs:function(){return this.businessHourRenderer?this.businessHourRenderer.getSegs():[]},getEventSegs:function(){var t=this.getOwnEventSegs();return this.iterChildren(function(e){t.push.apply(t,e.getEventSegs())}),t},getOwnEventSegs:function(){return this.eventRenderer?this.eventRenderer.getSegs():[]},triggerAfterEventsRendered:function(){this.triggerAfterEventSegsRendered(this.getEventSegs()),this.publiclyTrigger("eventAfterAllRender",{context:this,args:[this]})},triggerAfterEventSegsRendered:function(t){var e=this;this.hasPublicHandlers("eventAfterRender")&&t.forEach(function(t){var n;t.el&&(n=t.footprint.getEventLegacy(),e.publiclyTrigger("eventAfterRender",{context:n,args:[n,t.el,e]}))})},triggerBeforeEventsDestroyed:function(){this.triggerBeforeEventSegsDestroyed(this.getEventSegs())},triggerBeforeEventSegsDestroyed:function(t){var e=this;this.hasPublicHandlers("eventDestroy")&&t.forEach(function(t){var n;t.el&&(n=t.footprint.getEventLegacy(),e.publiclyTrigger("eventDestroy",{context:n,args:[n,t.el,e]}))})},showEventsWithId:function(t){this.getEventSegs().forEach(function(e){e.footprint.eventDef.id===t&&e.el&&e.el.css("visibility","")}),this.callChildren("showEventsWithId",arguments)},hideEventsWithId:function(t){this.getEventSegs().forEach(function(e){e.footprint.eventDef.id===t&&e.el&&e.el.css("visibility","hidden")}),this.callChildren("hideEventsWithId",arguments)},renderDrag:function(t,e,n){var i=!1;return this.iterChildren(function(r){r.renderDrag(t,e,n)&&(i=!0)}),i},unrenderDrag:function(){this.callChildren("unrenderDrag",arguments)},renderEventResize:function(t,e,n){this.callChildren("renderEventResize",arguments)},unrenderEventResize:function(){this.callChildren("unrenderEventResize",arguments)},renderSelectionFootprint:function(t){this.renderHighlight(t),this.callChildren("renderSelectionFootprint",arguments)},unrenderSelection:function(){this.unrenderHighlight(),this.callChildren("unrenderSelection",arguments)},renderHighlight:function(t){this.fillRenderer&&this.fillRenderer.renderFootprint("highlight",t,{getClasses:function(){return["fc-highlight"]}}),this.callChildren("renderHighlight",arguments)},unrenderHighlight:function(){this.fillRenderer&&this.fillRenderer.unrender("highlight"),this.callChildren("unrenderHighlight",arguments)},hitsNeeded:function(){this.hitsNeededDepth++||this.prepareHits(),this.callChildren("hitsNeeded",arguments)},hitsNotNeeded:function(){this.hitsNeededDepth&&!--this.hitsNeededDepth&&this.releaseHits(),this.callChildren("hitsNotNeeded",arguments)},prepareHits:function(){},releaseHits:function(){},queryHit:function(t,e){var n,i,r=this.childrenByUid;for(n in r)if(i=r[n].queryHit(t,e))break;return i},getSafeHitFootprint:function(t){var e=this.getHitFootprint(t);return this.dateProfile.activeUnzonedRange.containsRange(e.unzonedRange)?e:null},getHitFootprint:function(t){},getHitEl:function(t){},eventRangesToEventFootprints:function(t){var e,n=[];for(e=0;e<t.length;e++)n.push.apply(n,this.eventRangeToEventFootprints(t[e]));return n},eventRangeToEventFootprints:function(t){return[zt(t)]},eventFootprintsToSegs:function(t){var e,n=[];for(e=0;e<t.length;e++)n.push.apply(n,this.eventFootprintToSegs(t[e]));return n},eventFootprintToSegs:function(t){var e,n,i,r=t.componentFootprint.unzonedRange;for(e=this.componentFootprintToSegs(t.componentFootprint),n=0;n<e.length;n++)i=e[n],r.isStart||(i.isStart=!1),r.isEnd||(i.isEnd=!1),i.footprint=t;return e},componentFootprintToSegs:function(t){return[]},callChildren:function(t,e){this.iterChildren(function(n){n[t].apply(n,e)})},iterChildren:function(t){var e,n=this.childrenByUid;for(e in n)t(n[e])},_getCalendar:function(){return this.calendar||this.view.calendar},_getView:function(){return this.view},_getDateProfile:function(){return this._getView().get("dateProfile")}});Fe.guid=0,Fe.mixin({buildGotoAnchorHtml:function(e,n,i){var r,s,o,a;return t.isPlainObject(e)?(r=e.date,s=e.type,o=e.forceOff):r=e,r=Wt.moment(r),a={date:r.format("YYYY-MM-DD"),type:s||"day"},"string"==typeof n&&(i=n,n=null),n=n?" "+rt(n):"",i=i||"",!o&&this.opt("navLinks")?"<a"+n+' data-goto="'+et(JSON.stringify(a))+'">'+i+"</a>":"<span"+n+">"+i+"</span>"},getAllDayHtml:function(){return this.opt("allDayHtml")||et(this.opt("allDayText"))},getDayClasses:function(t,e){var n,i=this._getView(),r=[];return this.dateProfile.activeUnzonedRange.containsDate(t)?(r.push("fc-"+jt[t.day()]),i.isDateInOtherMonth(t,this.dateProfile)&&r.push("fc-other-month"),n=i.calendar.getNow(),t.isSame(n,"day")?(r.push("fc-today"),!0!==e&&r.push(i.calendar.theme.getClass("today"))):t<n?r.push("fc-past"):r.push("fc-future")):r.push("fc-disabled-day"),r},formatRange:function(t,e,n,i){var r=t.end;return e&&(r=r.clone().subtract(1)),ne(t.start,r,n,i,this.isRTL)},currentRangeAs:function(t){return this._getDateProfile().currentUnzonedRange.as(t)},computeDayRange:function(t){var e=this._getCalendar(),n=e.msToUtcMoment(t.startMs,!0),i=e.msToUtcMoment(t.endMs),r=+i.time(),s=i.clone().stripTime();return r&&r>=this.nextDayThreshold&&s.add(1,"days"),s<=n&&(s=n.clone().add(1,"days")),{start:n,end:s}},isMultiDayRange:function(t){var e=this.computeDayRange(t);return e.end.diff(e.start,"days")>1}});var ke=Wt.InteractiveDateComponent=Fe.extend({dateClickingClass:null,dateSelectingClass:null,eventPointingClass:null,eventDraggingClass:null,eventResizingClass:null,externalDroppingClass:null,dateClicking:null,dateSelecting:null,eventPointing:null,eventDragging:null,eventResizing:null,externalDropping:null,segSelector:".fc-event-container > *",largeUnit:null,constructor:function(){Fe.call(this),this.dateSelectingClass&&(this.dateClicking=new this.dateClickingClass(this)),this.dateSelectingClass&&(this.dateSelecting=new this.dateSelectingClass(this)),this.eventPointingClass&&(this.eventPointing=new this.eventPointingClass(this)),this.eventDraggingClass&&this.eventPointing&&(this.eventDragging=new this.eventDraggingClass(this,this.eventPointing)),this.eventResizingClass&&this.eventPointing&&(this.eventResizing=new this.eventResizingClass(this,this.eventPointing)),this.externalDroppingClass&&(this.externalDropping=new this.externalDroppingClass(this))},setElement:function(t){Fe.prototype.setElement.apply(this,arguments),this.dateClicking&&this.dateClicking.bindToEl(t),this.dateSelecting&&this.dateSelecting.bindToEl(t),this.bindAllSegHandlersToEl(t)},unrender:function(){this.endInteractions(),Fe.prototype.unrender.apply(this,arguments)},executeEventUnrender:function(){this.endInteractions(),Fe.prototype.executeEventUnrender.apply(this,arguments)},bindGlobalHandlers:function(){Fe.prototype.bindGlobalHandlers.apply(this,arguments),this.externalDropping&&this.externalDropping.bindToDocument()},unbindGlobalHandlers:function(){Fe.prototype.unbindGlobalHandlers.apply(this,arguments),this.externalDropping&&this.externalDropping.unbindFromDocument()},bindDateHandlerToEl:function(e,n,i){var r=this;this.el.on(n,function(e){if(!t(e.target).is(r.segSelector+","+r.segSelector+" *,.fc-more,a[data-goto]"))return i.call(r,e)})},bindAllSegHandlersToEl:function(t){[this.eventPointing,this.eventDragging,this.eventResizing].forEach(function(e){e&&e.bindToEl(t)})},bindSegHandlerToEl:function(e,n,i){var r=this;e.on(n,this.segSelector,function(e){var n=t(this).data("fc-seg");if(n&&!r.shouldIgnoreEventPointing())return i.call(r,n,e)})},shouldIgnoreMouse:function(){return me.get().shouldIgnoreMouse()},shouldIgnoreTouch:function(){var t=this._getView();return t.isSelected||t.selectedEvent},shouldIgnoreEventPointing:function(){return this.eventDragging&&this.eventDragging.isDragging||this.eventResizing&&this.eventResizing.isResizing},canStartSelection:function(t,e){return S(e)&&!this.canStartResize(t,e)&&(this.isEventDefDraggable(t.footprint.eventDef)||this.isEventDefResizable(t.footprint.eventDef))},canStartDrag:function(t,e){return!this.canStartResize(t,e)&&this.isEventDefDraggable(t.footprint.eventDef)},canStartResize:function(e,n){var i=this._getView(),r=e.footprint.eventDef;return(!S(n)||i.isEventDefSelected(r))&&this.isEventDefResizable(r)&&t(n.target).is(".fc-resizer")},endInteractions:function(){[this.dateClicking,this.dateSelecting,this.eventPointing,this.eventDragging,this.eventResizing].forEach(function(t){t&&t.end()})},isEventDefDraggable:function(t){return this.isEventDefStartEditable(t)},isEventDefStartEditable:function(t){var e=t.isStartExplicitlyEditable();return null==e&&null==(e=this.opt("eventStartEditable"))&&(e=this.isEventDefGenerallyEditable(t)),e},isEventDefGenerallyEditable:function(t){var e=t.isExplicitlyEditable();return null==e&&(e=this.opt("editable")),e},isEventDefResizableFromStart:function(t){return this.opt("eventResizableFromStart")&&this.isEventDefResizable(t)},isEventDefResizableFromEnd:function(t){return this.isEventDefResizable(t)},isEventDefResizable:function(t){var e=t.isDurationExplicitlyEditable();return null==e&&null==(e=this.opt("eventDurationEditable"))&&(e=this.isEventDefGenerallyEditable(t)),e},diffDates:function(t,e){return this.largeUnit?L(t,e,this.largeUnit):B(t,e)},isEventInstanceGroupAllowed:function(t){var e,n=this._getView(),i=this.dateProfile,r=this.eventRangesToEventFootprints(t.getAllEventRanges());for(e=0;e<r.length;e++)if(!i.validUnzonedRange.containsRange(r[e].componentFootprint.unzonedRange))return!1;return n.calendar.isEventInstanceGroupAllowed(t)},isExternalInstanceGroupAllowed:function(t){var e,n=this._getView(),i=this.dateProfile,r=this.eventRangesToEventFootprints(t.getAllEventRanges());for(e=0;e<r.length;e++)if(!i.validUnzonedRange.containsRange(r[e].componentFootprint.unzonedRange))return!1;for(e=0;e<r.length;e++)if(!n.calendar.isSelectionFootprintAllowed(r[e].componentFootprint))return!1;return!0}}),Be=Wt.DayTableMixin={breakOnWeeks:!1,dayDates:null,dayIndices:null,daysPerRow:null,rowCnt:null,colCnt:null,colHeadFormat:null,updateDayTable:function(){for(var t,e,n,i=this.view,r=i.calendar,s=r.msToUtcMoment(this.dateProfile.renderUnzonedRange.startMs,!0),o=r.msToUtcMoment(this.dateProfile.renderUnzonedRange.endMs,!0),a=-1,l=[],u=[];s.isBefore(o);)i.isHiddenDay(s)?l.push(a+.5):(a++,l.push(a),u.push(s.clone())),s.add(1,"days");if(this.breakOnWeeks){for(e=u[0].day(),t=1;t<u.length&&u[t].day()!=e;t++);n=Math.ceil(u.length/t)}else n=1,t=u.length;this.dayDates=u,this.dayIndices=l,this.daysPerRow=t,this.rowCnt=n,this.updateDayTableCols()},updateDayTableCols:function(){this.colCnt=this.computeColCnt(),this.colHeadFormat=this.opt("columnFormat")||this.computeColHeadFormat()},computeColCnt:function(){return this.daysPerRow},getCellDate:function(t,e){return this.dayDates[this.getCellDayIndex(t,e)].clone()},getCellRange:function(t,e){var n=this.getCellDate(t,e);return{start:n,end:n.clone().add(1,"days")}},getCellDayIndex:function(t,e){return t*this.daysPerRow+this.getColDayIndex(e)},getColDayIndex:function(t){return this.isRTL?this.colCnt-1-t:t},getDateDayIndex:function(t){var e=this.dayIndices,n=t.diff(this.dayDates[0],"days");return n<0?e[0]-1:n>=e.length?e[e.length-1]+1:e[n]},computeColHeadFormat:function(){return this.rowCnt>1||this.colCnt>10?"ddd":this.colCnt>1?this.opt("dayOfMonthFormat"):"dddd"},sliceRangeByRow:function(t){var e,n,i,r,s,o=this.daysPerRow,a=this.view.computeDayRange(t),l=this.getDateDayIndex(a.start),u=this.getDateDayIndex(a.end.clone().subtract(1,"days")),c=[];for(e=0;e<this.rowCnt;e++)n=e*o,i=n+o-1,r=Math.max(l,n),s=Math.min(u,i),r=Math.ceil(r),s=Math.floor(s),r<=s&&c.push({row:e,firstRowDayIndex:r-n,lastRowDayIndex:s-n,isStart:r===l,isEnd:s===u});return c},sliceRangeByDay:function(t){var e,n,i,r,s,o,a=this.daysPerRow,l=this.view.computeDayRange(t),u=this.getDateDayIndex(l.start),c=this.getDateDayIndex(l.end.clone().subtract(1,"days")),h=[];for(e=0;e<this.rowCnt;e++)for(n=e*a,i=n+a-1,r=n;r<=i;r++)s=Math.max(u,r),o=Math.min(c,r),s=Math.ceil(s),o=Math.floor(o),s<=o&&h.push({row:e,firstRowDayIndex:s-n,lastRowDayIndex:o-n,isStart:s===u,isEnd:o===c});return h},renderHeadHtml:function(){var t=this.view.calendar.theme;return'<div class="fc-row '+t.getClass("headerRow")+'"><table class="'+t.getClass("tableGrid")+'"><thead>'+this.renderHeadTrHtml()+"</thead></table></div>"},renderHeadIntroHtml:function(){return this.renderIntroHtml()},renderHeadTrHtml:function(){return"<tr>"+(this.isRTL?"":this.renderHeadIntroHtml())+this.renderHeadDateCellsHtml()+(this.isRTL?this.renderHeadIntroHtml():"")+"</tr>"},renderHeadDateCellsHtml:function(){var t,e,n=[];for(t=0;t<this.colCnt;t++)e=this.getCellDate(0,t),n.push(this.renderHeadDateCellHtml(e));return n.join("")},renderHeadDateCellHtml:function(t,e,n){var i=this.view,r=this.dateProfile.activeUnzonedRange.containsDate(t),s=["fc-day-header",i.calendar.theme.getClass("widgetHeader")],o=et(t.format(this.colHeadFormat));return 1===this.rowCnt?s=s.concat(this.getDayClasses(t,!0)):s.push("fc-"+jt[t.day()]),'<th class="'+s.join(" ")+'"'+(1===(r&&this.rowCnt)?' data-date="'+t.format("YYYY-MM-DD")+'"':"")+(e>1?' colspan="'+e+'"':"")+(n?" "+n:"")+">"+(r?i.buildGotoAnchorHtml({date:t,forceOff:this.rowCnt>1||1===this.colCnt},o):o)+"</th>"},renderBgTrHtml:function(t){return"<tr>"+(this.isRTL?"":this.renderBgIntroHtml(t))+this.renderBgCellsHtml(t)+(this.isRTL?this.renderBgIntroHtml(t):"")+"</tr>"},renderBgIntroHtml:function(t){return this.renderIntroHtml()},renderBgCellsHtml:function(t){var e,n,i=[];for(e=0;e<this.colCnt;e++)n=this.getCellDate(t,e),i.push(this.renderBgCellHtml(n));return i.join("")},renderBgCellHtml:function(t,e){var n=this.view,i=this.dateProfile.activeUnzonedRange.containsDate(t),r=this.getDayClasses(t);return r.unshift("fc-day",n.calendar.theme.getClass("widgetContent")),'<td class="'+r.join(" ")+'"'+(i?' data-date="'+t.format("YYYY-MM-DD")+'"':"")+(e?" "+e:"")+"></td>"},renderIntroHtml:function(){},bookendCells:function(t){var e=this.renderIntroHtml();e&&(this.isRTL?t.append(e):t.prepend(e))}},Ae=Wt.View=ke.extend({type:null,name:null,title:null,calendar:null,viewSpec:null,options:null,renderQueue:null,batchRenderDepth:0,queuedScroll:null,isSelected:!1,selectedEventInstance:null,eventOrderSpecs:null,isHiddenDayHash:null,isNowIndicatorRendered:null,initialNowDate:null,initialNowQueriedMs:null,nowIndicatorTimeoutID:null,nowIndicatorIntervalID:null,constructor:function(t,e){this.calendar=t,this.viewSpec=e,this.type=e.type,this.options=e.options,this.name=this.type,ke.call(this),this.initRenderQueue(),this.initHiddenDays(),this.bindBaseRenderHandlers(),this.eventOrderSpecs=P(this.opt("eventOrder")),this.initialize&&this.initialize()},_getView:function(){return this},opt:function(t){return this.options[t]},initRenderQueue:function(){this.renderQueue=new de({event:this.opt("eventRenderWait")}),this.renderQueue.on("start",this.onRenderQueueStart.bind(this)),this.renderQueue.on("stop",this.onRenderQueueStop.bind(this)),this.on("before:change",this.startBatchRender),this.on("change",this.stopBatchRender)},onRenderQueueStart:function(){this.calendar.freezeContentHeight(),this.addScroll(this.queryScroll())},onRenderQueueStop:function(){this.calendar.updateViewSize()&&this.popScroll(),this.calendar.thawContentHeight()},startBatchRender:function(){this.batchRenderDepth++||this.renderQueue.pause()},stopBatchRender:function(){--this.batchRenderDepth||this.renderQueue.resume()},requestRender:function(t,e,n){this.renderQueue.queue(t,e,n)},whenSizeUpdated:function(t){this.renderQueue.isRunning?this.renderQueue.one("stop",t.bind(this)):t.call(this)},computeTitle:function(t){var e;return e=/^(year|month)$/.test(t.currentRangeUnit)?t.currentUnzonedRange:t.activeUnzonedRange,this.formatRange({start:this.calendar.msToMoment(e.startMs,t.isRangeAllDay),end:this.calendar.msToMoment(e.endMs,t.isRangeAllDay)},t.isRangeAllDay,this.opt("titleFormat")||this.computeTitleFormat(t),this.opt("titleRangeSeparator"))},computeTitleFormat:function(t){var e=t.currentRangeUnit;return"year"==e?"YYYY":"month"==e?this.opt("monthYearFormat"):t.currentUnzonedRange.as("days")>1?"ll":"LL"},setDate:function(t){var e=this.get("dateProfile"),n=this.buildDateProfile(t,null,!0);e&&e.activeUnzonedRange.equals(n.activeUnzonedRange)||this.set("dateProfile",n)},unsetDate:function(){this.unset("dateProfile")},fetchInitialEvents:function(t){var e=this.calendar,n=t.isRangeAllDay&&!this.usesMinMaxTime;return e.requestEvents(e.msToMoment(t.activeUnzonedRange.startMs,n),e.msToMoment(t.activeUnzonedRange.endMs,n))},bindEventChanges:function(){this.listenTo(this.calendar,"eventsReset",this.resetEvents)},unbindEventChanges:function(){this.stopListeningTo(this.calendar,"eventsReset")},setEvents:function(t){this.set("currentEvents",t),this.set("hasEvents",!0)},unsetEvents:function(){this.unset("currentEvents"),this.unset("hasEvents")},resetEvents:function(t){this.startBatchRender(),this.unsetEvents(),this.setEvents(t),this.stopBatchRender()},requestDateRender:function(t){var e=this;this.requestRender(function(){e.executeDateRender(t)},"date","init")},requestDateUnrender:function(){var t=this;this.requestRender(function(){t.executeDateUnrender()},"date","destroy")},executeDateRender:function(t){Fe.prototype.executeDateRender.apply(this,arguments),this.render&&this.render(),this.trigger("datesRendered"),this.addScroll({isDateInit:!0}),this.startNowIndicator()},executeDateUnrender:function(){this.unselect(),this.stopNowIndicator(),this.trigger("before:datesUnrendered"),this.destroy&&this.destroy(),Fe.prototype.executeDateUnrender.apply(this,arguments)},bindBaseRenderHandlers:function(){var t=this;this.on("datesRendered",function(){t.whenSizeUpdated(t.triggerViewRender)}),this.on("before:datesUnrendered",function(){t.triggerViewDestroy()})},triggerViewRender:function(){this.publiclyTrigger("viewRender",{context:this,args:[this,this.el]})},triggerViewDestroy:function(){this.publiclyTrigger("viewDestroy",{context:this,args:[this,this.el]})},requestEventsRender:function(t){var e=this;this.requestRender(function(){e.executeEventRender(t),e.whenSizeUpdated(e.triggerAfterEventsRendered)},"event","init")},requestEventsUnrender:function(){var t=this;this.requestRender(function(){t.triggerBeforeEventsDestroyed(),t.executeEventUnrender()},"event","destroy")},requestBusinessHoursRender:function(t){var e=this;this.requestRender(function(){e.renderBusinessHours(t)},"businessHours","init")},requestBusinessHoursUnrender:function(){var t=this;this.requestRender(function(){t.unrenderBusinessHours()},"businessHours","destroy")},bindGlobalHandlers:function(){ke.prototype.bindGlobalHandlers.apply(this,arguments),this.listenTo(me.get(),{touchstart:this.processUnselect,mousedown:this.handleDocumentMousedown})},unbindGlobalHandlers:function(){ke.prototype.unbindGlobalHandlers.apply(this,arguments),this.stopListeningTo(me.get())},startNowIndicator:function(){var t,n,i,r=this;this.opt("nowIndicator")&&(t=this.getNowIndicatorUnit())&&(n=lt(this,"updateNowIndicator"),this.initialNowDate=this.calendar.getNow(),this.initialNowQueriedMs=+new Date,i=this.initialNowDate.clone().startOf(t).add(1,t)-this.initialNowDate,this.nowIndicatorTimeoutID=setTimeout(function(){r.nowIndicatorTimeoutID=null,n(),i=+e.duration(1,t),i=Math.max(100,i),r.nowIndicatorIntervalID=setInterval(n,i)},i))},updateNowIndicator:function(){this.isDatesRendered&&this.initialNowDate&&(this.unrenderNowIndicator(),this.renderNowIndicator(this.initialNowDate.clone().add(new Date-this.initialNowQueriedMs)),this.isNowIndicatorRendered=!0)},stopNowIndicator:function(){this.isNowIndicatorRendered&&(this.nowIndicatorTimeoutID&&(clearTimeout(this.nowIndicatorTimeoutID),this.nowIndicatorTimeoutID=null),this.nowIndicatorIntervalID&&(clearTimeout(this.nowIndicatorIntervalID),this.nowIndicatorIntervalID=null),this.unrenderNowIndicator(),this.isNowIndicatorRendered=!1)},updateSize:function(t,e,n){this.setHeight?this.setHeight(t,e):ke.prototype.updateSize.apply(this,arguments),this.updateNowIndicator()},addScroll:function(e){var n=this.queuedScroll||(this.queuedScroll={});t.extend(n,e)},popScroll:function(){this.applyQueuedScroll(),this.queuedScroll=null},applyQueuedScroll:function(){this.queuedScroll&&this.applyScroll(this.queuedScroll)},queryScroll:function(){var e={};return this.isDatesRendered&&t.extend(e,this.queryDateScroll()),e},applyScroll:function(e){e.isDateInit&&this.isDatesRendered&&t.extend(e,this.computeInitialDateScroll()),this.isDatesRendered&&this.applyDateScroll(e)},computeInitialDateScroll:function(){return{}},queryDateScroll:function(){return{}},applyDateScroll:function(t){},reportEventDrop:function(t,n,i,r){var s=this.calendar.eventManager,o=s.mutateEventsWithId(t.def.id,n,this.calendar),a=n.dateMutation;a&&(t.dateProfile=a.buildNewDateProfile(t.dateProfile,this.calendar)),this.triggerEventDrop(t,a&&a.dateDelta||e.duration(),o,i,r)},triggerEventDrop:function(t,e,n,i,r){this.publiclyTrigger("eventDrop",{context:i[0],args:[t.toLegacy(),e,n,r,{},this]})},reportExternalDrop:function(t,e,n,i,r,s){e&&this.calendar.eventManager.addEventDef(t,n),this.triggerExternalDrop(t,e,i,r,s)},triggerExternalDrop:function(t,e,n,i,r){this.publiclyTrigger("drop",{context:n[0],args:[t.dateProfile.start.clone(),i,r,this]}),e&&this.publiclyTrigger("eventReceive",{context:this,args:[t.buildInstance().toLegacy(),this]})},reportEventResize:function(t,e,n,i){var r=this.calendar.eventManager,s=r.mutateEventsWithId(t.def.id,e,this.calendar);t.dateProfile=e.dateMutation.buildNewDateProfile(t.dateProfile,this.calendar),this.triggerEventResize(t,e.dateMutation.endDelta,s,n,i)},triggerEventResize:function(t,e,n,i,r){this.publiclyTrigger("eventResize",{context:i[0],args:[t.toLegacy(),e,n,r,{},this]})},select:function(t,e){this.unselect(e),this.renderSelectionFootprint(t),this.reportSelection(t,e)},renderSelectionFootprint:function(t,e){this.renderSelection?this.renderSelection(t.toLegacy(this.calendar)):ke.prototype.renderSelectionFootprint.apply(this,arguments)},reportSelection:function(t,e){this.isSelected=!0,this.triggerSelect(t,e)},triggerSelect:function(t,e){var n=this.calendar.footprintToDateProfile(t);this.publiclyTrigger("select",{context:this,args:[n.start,n.end,e,this]})},unselect:function(t){this.isSelected&&(this.isSelected=!1,this.destroySelection&&this.destroySelection(),this.unrenderSelection(),this.publiclyTrigger("unselect",{context:this,args:[t,this]}))},selectEventInstance:function(t){this.selectedEventInstance&&this.selectedEventInstance===t||(this.unselectEventInstance(),this.getEventSegs().forEach(function(e){e.footprint.eventInstance===t&&e.el&&e.el.addClass("fc-selected")}),this.selectedEventInstance=t)},unselectEventInstance:function(){this.selectedEventInstance&&(this.getEventSegs().forEach(function(t){t.el&&t.el.removeClass("fc-selected")}),this.selectedEventInstance=null)},isEventDefSelected:function(t){return this.selectedEventInstance&&this.selectedEventInstance.def.id===t.id},handleDocumentMousedown:function(t){D(t)&&this.processUnselect(t)},processUnselect:function(t){this.processRangeUnselect(t),this.processEventUnselect(t)},processRangeUnselect:function(e){var n;this.isSelected&&this.opt("unselectAuto")&&((n=this.opt("unselectCancel"))&&t(e.target).closest(n).length||this.unselect(e))},processEventUnselect:function(e){this.selectedEventInstance&&(t(e.target).closest(".fc-selected").length||this.unselectEventInstance())},triggerBaseRendered:function(){this.publiclyTrigger("viewRender",{context:this,args:[this,this.el]})},triggerBaseUnrendered:function(){this.publiclyTrigger("viewDestroy",{context:this,args:[this,this.el]})},triggerDayClick:function(t,e,n){var i=this.calendar.footprintToDateProfile(t);this.publiclyTrigger("dayClick",{context:e,args:[i.start,n,this]})}});Ae.watch("displayingDates",["isInDom","dateProfile"],function(t){this.requestDateRender(t.dateProfile)},function(){this.requestDateUnrender()}),Ae.watch("displayingBusinessHours",["displayingDates","businessHourGenerator"],function(t){this.requestBusinessHoursRender(t.businessHourGenerator)},function(){this.requestBusinessHoursUnrender()}),Ae.watch("initialEvents",["dateProfile"],function(t){return this.fetchInitialEvents(t.dateProfile)}),Ae.watch("bindingEvents",["initialEvents"],function(t){this.setEvents(t.initialEvents),this.bindEventChanges()},function(){this.unbindEventChanges(),this.unsetEvents()}),Ae.watch("displayingEvents",["displayingDates","hasEvents"],function(){this.requestEventsRender(this.get("currentEvents"))},function(){this.requestEventsUnrender()}),Ae.watch("title",["dateProfile"],function(t){return this.title=this.computeTitle(t.dateProfile)}),Ae.watch("legacyDateProps",["dateProfile"],function(t){var e=this.calendar,n=t.dateProfile;this.start=e.msToMoment(n.activeUnzonedRange.startMs,n.isRangeAllDay),this.end=e.msToMoment(n.activeUnzonedRange.endMs,n.isRangeAllDay),this.intervalStart=e.msToMoment(n.currentUnzonedRange.startMs,n.isRangeAllDay),this.intervalEnd=e.msToMoment(n.currentUnzonedRange.endMs,n.isRangeAllDay)}),Ae.mixin({usesMinMaxTime:!1,start:null,end:null,intervalStart:null,intervalEnd:null,buildPrevDateProfile:function(t){var e=this.get("dateProfile"),n=t.clone().startOf(e.currentRangeUnit).subtract(e.dateIncrement);return this.buildDateProfile(n,-1)},buildNextDateProfile:function(t){var e=this.get("dateProfile"),n=t.clone().startOf(e.currentRangeUnit).add(e.dateIncrement);return this.buildDateProfile(n,1)},buildDateProfile:function(t,n,i){var r,s,o,a,l,u,c=!t.hasTime(),h=null,d=null;return r=this.buildValidRange(),r=this.trimHiddenDays(r),i&&(t=this.calendar.msToUtcMoment(r.constrainDate(t),c)),s=this.buildCurrentRangeInfo(t,n),o=/^(year|month|week|day)$/.test(s.unit),a=this.buildRenderRange(this.trimHiddenDays(s.unzonedRange),s.unit,o),a=this.trimHiddenDays(a),l=a.clone(),this.opt("showNonCurrentDates")||(l=l.intersect(s.unzonedRange)),h=e.duration(this.opt("minTime")),d=e.duration(this.opt("maxTime")),l=this.adjustActiveRange(l,h,d),l=l.intersect(r),l&&(t=this.calendar.msToUtcMoment(l.constrainDate(t),c)),u=s.unzonedRange.intersectsWith(r),{validUnzonedRange:r,currentUnzonedRange:s.unzonedRange,currentRangeUnit:s.unit,isRangeAllDay:o,activeUnzonedRange:l,renderUnzonedRange:a,minTime:h,maxTime:d,isValid:u,date:t,dateIncrement:this.buildDateIncrement(s.duration)}},buildValidRange:function(){return this.getUnzonedRangeOption("validRange",this.calendar.getNow())||new Ue},buildCurrentRangeInfo:function(t,e){var n,i=null,r=null,s=null;return this.viewSpec.duration?(i=this.viewSpec.duration,r=this.viewSpec.durationUnit,s=this.buildRangeFromDuration(t,e,i,r)):(n=this.opt("dayCount"))?(r="day",s=this.buildRangeFromDayCount(t,e,n)):(s=this.buildCustomVisibleRange(t))?r=O(s.getStart(),s.getEnd()):(i=this.getFallbackDuration(),r=O(i),s=this.buildRangeFromDuration(t,e,i,r)),{duration:i,unit:r,unzonedRange:s}},getFallbackDuration:function(){return e.duration({days:1})},adjustActiveRange:function(t,e,n){var i=t.getStart(),r=t.getEnd();return this.usesMinMaxTime&&(e<0&&i.time(0).add(e),n>864e5&&r.time(n-864e5)),new Ue(i,r)},buildRangeFromDuration:function(t,n,i,r){var s,o,a,l=this.opt("dateAlignment"),u=t.clone();return i.as("days")<=1&&this.isHiddenDay(u)&&(u=this.skipHiddenDays(u,n),u.startOf("day")),l||(o=this.opt("dateIncrement"),o?(a=e.duration(o),l=a<i?N(a,o):r):l=r),u.startOf(l),s=u.clone().add(i),new Ue(u,s)},buildRangeFromDayCount:function(t,e,n){var i,r=this.opt("dateAlignment"),s=0,o=t.clone();r&&o.startOf(r),o.startOf("day"),o=this.skipHiddenDays(o,e),i=o.clone();do{i.add(1,"day"),this.isHiddenDay(i)||s++}while(s<n);return new Ue(o,i)},buildCustomVisibleRange:function(t){var e=this.getUnzonedRangeOption("visibleRange",this.calendar.applyTimezone(t));return!e||null!==e.startMs&&null!==e.endMs?e:null},buildRenderRange:function(t,e,n){return t.clone()},buildDateIncrement:function(t){var n,i=this.opt("dateIncrement");return i?e.duration(i):(n=this.opt("dateAlignment"))?e.duration(1,n):t||e.duration({days:1})},trimHiddenDays:function(t){var e=t.getStart(),n=t.getEnd();return e&&(e=this.skipHiddenDays(e)),n&&(n=this.skipHiddenDays(n,-1,!0)),new Ue(e,n)},isDateInOtherMonth:function(t,e){return!1},getUnzonedRangeOption:function(t){var e=this.opt(t);if("function"==typeof e&&(e=e.apply(null,Array.prototype.slice.call(arguments,1))),e)return this.calendar.parseUnzonedRange(e)},initHiddenDays:function(){var e,n=this.opt("hiddenDays")||[],i=[],r=0;for(!1===this.opt("weekends")&&n.push(0,6),e=0;e<7;e++)(i[e]=-1!==t.inArray(e,n))||r++;if(!r)throw"invalid hiddenDays";this.isHiddenDayHash=i},isHiddenDay:function(t){return e.isMoment(t)&&(t=t.day()),this.isHiddenDayHash[t]},skipHiddenDays:function(t,e,n){var i=t.clone();for(e=e||1;this.isHiddenDayHash[(i.day()+(n?e:0)+7)%7];)i.add(e,"days");return i}});var Le=Wt.Calendar=dt.extend(re,se,{view:null,viewsByType:null,currentDate:null,theme:null,businessHourGenerator:null,loadingLevel:0,constructor:function(t,e){me.needed(),this.el=t,this.viewsByType={},this.viewSpecCache={},this.initOptionsInternals(e),this.initMomentInternals(),this.initCurrentDate(),this.initEventManager(),this.constructed()},constructed:function(){},getView:function(){return this.view},publiclyTrigger:function(e,n){var i,r,s=this.opt(e);if(t.isPlainObject(n)?(i=n.context,r=n.args):t.isArray(n)&&(r=n),null==i&&(i=this.el[0]),r||(r=[]),this.triggerWith(e,i,r),s)return s.apply(i,r)},hasPublicHandlers:function(t){return this.hasHandlers(t)||this.opt(t)},instantiateView:function(t){var e=this.getViewSpec(t);return new e.class(this,e)},isValidViewType:function(t){return Boolean(this.getViewSpec(t))},changeView:function(t,e){e&&(e.start&&e.end?this.recordOptionOverrides({visibleRange:e}):this.currentDate=this.moment(e).stripZone()),this.renderView(t)},zoomTo:function(t,e){var n;e=e||"day",n=this.getViewSpec(e)||this.getUnitViewSpec(e),this.currentDate=t.clone(),this.renderView(n?n.type:null)},initCurrentDate:function(){var t=this.opt("defaultDate");this.currentDate=null!=t?this.moment(t).stripZone():this.getNow()},prev:function(){var t=this.view.buildPrevDateProfile(this.currentDate);t.isValid&&(this.currentDate=t.date,this.renderView())},next:function(){var t=this.view.buildNextDateProfile(this.currentDate);t.isValid&&(this.currentDate=t.date,this.renderView())},prevYear:function(){this.currentDate.add(-1,"years"),this.renderView()},nextYear:function(){this.currentDate.add(1,"years"),this.renderView()},today:function(){this.currentDate=this.getNow(),this.renderView()},gotoDate:function(t){this.currentDate=this.moment(t).stripZone(),this.renderView()},incrementDate:function(t){this.currentDate.add(e.duration(t)),this.renderView()},getDate:function(){return this.applyTimezone(this.currentDate)},pushLoading:function(){this.loadingLevel++||this.publiclyTrigger("loading",[!0,this.view])},popLoading:function(){--this.loadingLevel||this.publiclyTrigger("loading",[!1,this.view])},select:function(t,e){
this.view.select(this.buildSelectFootprint.apply(this,arguments))},unselect:function(){this.view&&this.view.unselect()},buildSelectFootprint:function(t,e){var n,i=this.moment(t).stripZone();return n=e?this.moment(e).stripZone():i.hasTime()?i.clone().add(this.defaultTimedEventDuration):i.clone().add(this.defaultAllDayEventDuration),new We(new Ue(i,n),!i.hasTime())},parseUnzonedRange:function(t){var e=null,n=null;return t.start&&(e=this.moment(t.start).stripZone()),t.end&&(n=this.moment(t.end).stripZone()),e||n?e&&n&&n.isBefore(e)?null:new Ue(e,n):null},rerenderEvents:function(){this.view.flash("displayingEvents")},initEventManager:function(){var t=this,e=new qe(this),n=this.opt("eventSources")||[],i=this.opt("events");this.eventManager=e,i&&n.unshift(i),e.on("release",function(e){t.trigger("eventsReset",e)}),e.freeze(),n.forEach(function(n){var i=an.parse(n,t);i&&e.addSource(i)}),e.thaw()},requestEvents:function(t,e){return this.eventManager.requestEvents(t,e,this.opt("timezone"),!this.opt("lazyFetching"))}});Le.mixin({dirDefaults:null,localeDefaults:null,overrides:null,dynamicOverrides:null,optionsModel:null,initOptionsInternals:function(e){this.overrides=t.extend({},e),this.dynamicOverrides={},this.optionsModel=new ue,this.populateOptionsHash()},option:function(t,e){var n;if("string"==typeof t){if(void 0===e)return this.optionsModel.get(t);n={},n[t]=e,this.setOptions(n)}else"object"==typeof t&&this.setOptions(t)},opt:function(t){return this.optionsModel.get(t)},setOptions:function(t){var e,n=0;this.recordOptionOverrides(t);for(e in t)n++;if(1===n){if("height"===e||"contentHeight"===e||"aspectRatio"===e)return void this.updateViewSize(!0);if("defaultDate"===e)return;if("businessHours"===e)return;if("timezone"===e)return void this.view.flash("initialEvents")}this.renderHeader(),this.renderFooter(),this.viewsByType={},this.reinitView()},populateOptionsHash:function(){var t,e,i,r,s;t=tt(this.dynamicOverrides.locale,this.overrides.locale),e=Oe[t],e||(t=Le.defaults.locale,e=Oe[t]||{}),i=tt(this.dynamicOverrides.isRTL,this.overrides.isRTL,e.isRTL,Le.defaults.isRTL),r=i?Le.rtlDefaults:{},this.dirDefaults=r,this.localeDefaults=e,s=n([Le.defaults,r,e,this.overrides,this.dynamicOverrides]),Rt(s),this.optionsModel.reset(s)},recordOptionOverrides:function(t){var e;for(e in t)this.dynamicOverrides[e]=t[e];this.viewSpecCache={},this.populateOptionsHash()}}),Le.mixin({defaultAllDayEventDuration:null,defaultTimedEventDuration:null,localeData:null,initMomentInternals:function(){var t=this;this.defaultAllDayEventDuration=e.duration(this.opt("defaultAllDayEventDuration")),this.defaultTimedEventDuration=e.duration(this.opt("defaultTimedEventDuration")),this.optionsModel.watch("buildingMomentLocale",["?locale","?monthNames","?monthNamesShort","?dayNames","?dayNamesShort","?firstDay","?weekNumberCalculation"],function(e){var n,i=e.weekNumberCalculation,r=e.firstDay;"iso"===i&&(i="ISO");var s=Object.create(Tt(e.locale));e.monthNames&&(s._months=e.monthNames),e.monthNamesShort&&(s._monthsShort=e.monthNamesShort),e.dayNames&&(s._weekdays=e.dayNames),e.dayNamesShort&&(s._weekdaysShort=e.dayNamesShort),null==r&&"ISO"===i&&(r=1),null!=r&&(n=Object.create(s._week),n.dow=r,s._week=n),"ISO"!==i&&"local"!==i&&"function"!=typeof i||(s._fullCalendar_weekCalc=i),t.localeData=s,t.currentDate&&t.localizeMoment(t.currentDate)})},moment:function(){var t;return"local"===this.opt("timezone")?(t=Wt.moment.apply(null,arguments),t.hasTime()&&t.local()):t="UTC"===this.opt("timezone")?Wt.moment.utc.apply(null,arguments):Wt.moment.parseZone.apply(null,arguments),this.localizeMoment(t),t},msToMoment:function(t,e){var n=Wt.moment.utc(t);return e?n.stripTime():n=this.applyTimezone(n),this.localizeMoment(n),n},msToUtcMoment:function(t,e){var n=Wt.moment.utc(t);return e&&n.stripTime(),this.localizeMoment(n),n},localizeMoment:function(t){t._locale=this.localeData},getIsAmbigTimezone:function(){return"local"!==this.opt("timezone")&&"UTC"!==this.opt("timezone")},applyTimezone:function(t){if(!t.hasTime())return t.clone();var e,n=this.moment(t.toArray()),i=t.time()-n.time();return i&&(e=n.clone().add(i),t.time()-e.time()==0&&(n=e)),n},footprintToDateProfile:function(t,e){var n,i=Wt.moment.utc(t.unzonedRange.startMs);return e||(n=Wt.moment.utc(t.unzonedRange.endMs)),t.isAllDay?(i.stripTime(),n&&n.stripTime()):(i=this.applyTimezone(i),n&&(n=this.applyTimezone(n))),new tn(i,n,this)},getNow:function(){var t=this.opt("now");return"function"==typeof t&&(t=t()),this.moment(t).stripZone()},humanizeDuration:function(t){return t.locale(this.opt("locale")).humanize()},getEventEnd:function(t){return t.end?t.end.clone():this.getDefaultEventEnd(t.allDay,t.start)},getDefaultEventEnd:function(t,e){var n=e.clone();return t?n.stripTime().add(this.defaultAllDayEventDuration):n.add(this.defaultTimedEventDuration),this.getIsAmbigTimezone()&&n.stripZone(),n}}),Le.mixin({viewSpecCache:null,getViewSpec:function(t){var e=this.viewSpecCache;return e[t]||(e[t]=this.buildViewSpec(t))},getUnitViewSpec:function(e){var n,i,r;if(-1!=t.inArray(e,Zt))for(n=this.header.getViewsWithButtons(),t.each(Wt.views,function(t){n.push(t)}),i=0;i<n.length;i++)if((r=this.getViewSpec(n[i]))&&r.singleUnit==e)return r},buildViewSpec:function(t){for(var i,r,s,o,a,l=this.overrides.views||{},u=[],c=[],h=[],d=t;d;)i=_t[d],r=l[d],d=null,"function"==typeof i&&(i={class:i}),i&&(u.unshift(i),c.unshift(i.defaults||{}),s=s||i.duration,d=d||i.type),r&&(h.unshift(r),s=s||r.duration,d=d||r.type);return i=j(u),i.type=t,!!i.class&&(s=s||this.dynamicOverrides.duration||this.overrides.duration,s&&(o=e.duration(s),o.valueOf()&&(a=N(o,s),i.duration=o,i.durationUnit=a,1===o.as(a)&&(i.singleUnit=a,h.unshift(l[a]||{})))),i.defaults=n(c),i.overrides=n(h),this.buildViewSpecOptions(i),this.buildViewSpecButtonText(i,t),i)},buildViewSpecOptions:function(t){t.options=n([Le.defaults,t.defaults,this.dirDefaults,this.localeDefaults,this.overrides,t.overrides,this.dynamicOverrides]),Rt(t.options)},buildViewSpecButtonText:function(t,e){function n(n){var i=n.buttonText||{};return i[e]||(t.buttonTextKey?i[t.buttonTextKey]:null)||(t.singleUnit?i[t.singleUnit]:null)}t.buttonTextOverride=n(this.dynamicOverrides)||n(this.overrides)||t.overrides.buttonText,t.buttonTextDefault=n(this.localeDefaults)||n(this.dirDefaults)||t.defaults.buttonText||n(Le.defaults)||(t.duration?this.humanizeDuration(t.duration):null)||e}}),Le.mixin({el:null,contentEl:null,suggestedViewHeight:null,ignoreUpdateViewSize:0,freezeContentHeightDepth:0,windowResizeProxy:null,render:function(){this.contentEl?this.elementVisible()&&(this.calcSize(),this.renderView()):this.initialRender()},initialRender:function(){var e=this,n=this.el;n.addClass("fc"),n.on("click.fc","a[data-goto]",function(n){var i=t(this),r=i.data("goto"),s=e.moment(r.date),o=r.type,a=e.view.opt("navLink"+st(o)+"Click");"function"==typeof a?a(s,n):("string"==typeof a&&(o=a),e.zoomTo(s,o))}),this.optionsModel.watch("settingTheme",["?theme","?themeSystem"],function(t){var i=hn.getThemeClass(t.themeSystem||t.theme),r=new i(e.optionsModel),s=r.getClass("widget");e.theme=r,s&&n.addClass(s)},function(){var t=e.theme.getClass("widget");e.theme=null,t&&n.removeClass(t)}),this.optionsModel.watch("settingBusinessHourGenerator",["?businessHours"],function(t){e.businessHourGenerator=new je(t.businessHours,e),e.view&&e.view.set("businessHourGenerator",e.businessHourGenerator)},function(){e.businessHourGenerator=null}),this.optionsModel.watch("applyingDirClasses",["?isRTL","?locale"],function(t){n.toggleClass("fc-ltr",!t.isRTL),n.toggleClass("fc-rtl",t.isRTL)}),this.contentEl=t("<div class='fc-view-container'/>").prependTo(n),this.initToolbars(),this.renderHeader(),this.renderFooter(),this.renderView(this.opt("defaultView")),this.opt("handleWindowResize")&&t(window).resize(this.windowResizeProxy=ut(this.windowResize.bind(this),this.opt("windowResizeDelay")))},destroy:function(){this.view&&this.clearView(),this.toolbarsManager.proxyCall("removeElement"),this.contentEl.remove(),this.el.removeClass("fc fc-ltr fc-rtl"),this.optionsModel.unwatch("settingTheme"),this.optionsModel.unwatch("settingBusinessHourGenerator"),this.el.off(".fc"),this.windowResizeProxy&&(t(window).unbind("resize",this.windowResizeProxy),this.windowResizeProxy=null),me.unneeded()},elementVisible:function(){return this.el.is(":visible")},bindViewHandlers:function(t){var e=this;t.watch("titleForCalendar",["title"],function(n){t===e.view&&e.setToolbarsTitle(n.title)}),t.watch("dateProfileForCalendar",["dateProfile"],function(n){t===e.view&&(e.currentDate=n.dateProfile.date,e.updateToolbarButtons(n.dateProfile))})},unbindViewHandlers:function(t){this.stopListeningTo(t),t.unwatch("titleForCalendar"),t.unwatch("dateProfileForCalendar")},renderView:function(e){var n,i=this.view;this.freezeContentHeight(),i&&e&&i.type!==e&&this.clearView(),!this.view&&e&&(n=this.view=this.viewsByType[e]||(this.viewsByType[e]=this.instantiateView(e)),this.bindViewHandlers(n),n.setElement(t("<div class='fc-view fc-"+e+"-view' />").appendTo(this.contentEl)),this.toolbarsManager.proxyCall("activateButton",e)),this.view&&(this.view.get("businessHourGenerator")!==this.businessHourGenerator&&this.view.set("businessHourGenerator",this.businessHourGenerator),this.view.setDate(this.currentDate)),this.thawContentHeight()},clearView:function(){var t=this.view;this.toolbarsManager.proxyCall("deactivateButton",t.type),this.unbindViewHandlers(t),t.removeElement(),this.view=null},reinitView:function(){var t=this.view,e=t.queryScroll();this.freezeContentHeight(),this.clearView(),this.calcSize(),this.renderView(t.type),this.view.applyScroll(e),this.thawContentHeight()},getSuggestedViewHeight:function(){return null===this.suggestedViewHeight&&this.calcSize(),this.suggestedViewHeight},isHeightAuto:function(){return"auto"===this.opt("contentHeight")||"auto"===this.opt("height")},updateViewSize:function(t){var e,n=this.view;if(!this.ignoreUpdateViewSize&&n)return t&&(this.calcSize(),e=n.queryScroll()),this.ignoreUpdateViewSize++,n.updateSize(this.getSuggestedViewHeight(),this.isHeightAuto(),t),this.ignoreUpdateViewSize--,t&&n.applyScroll(e),!0},calcSize:function(){this.elementVisible()&&this._calcSize()},_calcSize:function(){var t=this.opt("contentHeight"),e=this.opt("height");this.suggestedViewHeight="number"==typeof t?t:"function"==typeof t?t():"number"==typeof e?e-this.queryToolbarsHeight():"function"==typeof e?e()-this.queryToolbarsHeight():"parent"===e?this.el.parent().height()-this.queryToolbarsHeight():Math.round(this.contentEl.width()/Math.max(this.opt("aspectRatio"),.5))},windowResize:function(t){t.target===window&&this.view&&this.view.isDatesRendered&&this.updateViewSize(!0)&&this.publiclyTrigger("windowResize",[this.view])},freezeContentHeight:function(){this.freezeContentHeightDepth++||this.forceFreezeContentHeight()},forceFreezeContentHeight:function(){this.contentEl.css({width:"100%",height:this.contentEl.height(),overflow:"hidden"})},thawContentHeight:function(){this.freezeContentHeightDepth--,this.contentEl.css({width:"",height:"",overflow:""}),this.freezeContentHeightDepth&&this.forceFreezeContentHeight()}}),Le.mixin({header:null,footer:null,toolbarsManager:null,initToolbars:function(){this.header=new bt(this,this.computeHeaderOptions()),this.footer=new bt(this,this.computeFooterOptions()),this.toolbarsManager=new yt([this.header,this.footer])},computeHeaderOptions:function(){return{extraClasses:"fc-header-toolbar",layout:this.opt("header")}},computeFooterOptions:function(){return{extraClasses:"fc-footer-toolbar",layout:this.opt("footer")}},renderHeader:function(){var t=this.header;t.setToolbarOptions(this.computeHeaderOptions()),t.render(),t.el&&this.el.prepend(t.el)},renderFooter:function(){var t=this.footer;t.setToolbarOptions(this.computeFooterOptions()),t.render(),t.el&&this.el.append(t.el)},setToolbarsTitle:function(t){this.toolbarsManager.proxyCall("updateTitle",t)},updateToolbarButtons:function(t){var e=this.getNow(),n=this.view,i=n.buildDateProfile(e),r=n.buildPrevDateProfile(this.currentDate),s=n.buildNextDateProfile(this.currentDate);this.toolbarsManager.proxyCall(i.isValid&&!t.currentUnzonedRange.containsDate(e)?"enableButton":"disableButton","today"),this.toolbarsManager.proxyCall(r.isValid?"enableButton":"disableButton","prev"),this.toolbarsManager.proxyCall(s.isValid?"enableButton":"disableButton","next")},queryToolbarsHeight:function(){return this.toolbarsManager.items.reduce(function(t,e){return t+(e.el?e.el.outerHeight(!0):0)},0)}}),Le.prototype.isEventInstanceGroupAllowed=function(t){var e,n=t.getEventDef(),i=this.eventRangesToEventFootprints(t.getAllEventRanges()),r=this.getPeerEventInstances(n),s=r.map(Pt),o=this.eventRangesToEventFootprints(s),a=n.getConstraint(),l=n.getOverlap(),u=this.opt("eventAllow");for(e=0;e<i.length;e++)if(!this.isFootprintAllowed(i[e].componentFootprint,o,a,l,i[e].eventInstance))return!1;if(u)for(e=0;e<i.length;e++)if(!1===u(i[e].componentFootprint.toLegacy(this),i[e].getEventLegacy()))return!1;return!0},Le.prototype.getPeerEventInstances=function(t){return this.eventManager.getEventInstancesWithoutId(t.id)},Le.prototype.isSelectionFootprintAllowed=function(t){var e,n=this.eventManager.getEventInstances(),i=n.map(Pt),r=this.eventRangesToEventFootprints(i);return!!this.isFootprintAllowed(t,r,this.opt("selectConstraint"),this.opt("selectOverlap"))&&(!(e=this.opt("selectAllow"))||!1!==e(t.toLegacy(this)))},Le.prototype.isFootprintAllowed=function(t,e,n,i,r){var s,o;if(null!=n&&(s=this.constraintValToFootprints(n,t.isAllDay),!this.isFootprintWithinConstraints(t,s)))return!1;if(o=this.collectOverlapEventFootprints(e,t),!1===i){if(o.length)return!1}else if("function"==typeof i&&!Et(o,i,r))return!1;return!(r&&!St(o,r))},Le.prototype.isFootprintWithinConstraints=function(t,e){var n;for(n=0;n<e.length;n++)if(this.footprintContainsFootprint(e[n],t))return!0;return!1},Le.prototype.constraintValToFootprints=function(t,e){var n;return"businessHours"===t?this.buildCurrentBusinessFootprints(e):"object"==typeof t?(n=this.parseEventDefToInstances(t),n?this.eventInstancesToFootprints(n):this.parseFootprints(t)):null!=t?(n=this.eventManager.getEventInstancesWithId(t),this.eventInstancesToFootprints(n)):void 0},Le.prototype.buildCurrentBusinessFootprints=function(t){var e=this.view,n=e.get("businessHourGenerator"),i=e.dateProfile.activeUnzonedRange,r=n.buildEventInstanceGroup(t,i);return r?this.eventInstancesToFootprints(r.eventInstances):[]},Le.prototype.eventInstancesToFootprints=function(t){var e=t.map(Pt);return this.eventRangesToEventFootprints(e).map(kt)},Le.prototype.collectOverlapEventFootprints=function(t,e){var n,i=[];for(n=0;n<t.length;n++)this.footprintsIntersect(e,t[n].componentFootprint)&&i.push(t[n]);return i},Le.prototype.parseEventDefToInstances=function(t){var e=this.eventManager,n=Ze.parse(t,new on(this));return!!n&&n.buildInstances(e.currentPeriod.unzonedRange)},Le.prototype.eventRangesToEventFootprints=function(t){var e,n=[];for(e=0;e<t.length;e++)n.push.apply(n,this.eventRangeToEventFootprints(t[e]));return n},Le.prototype.eventRangeToEventFootprints=function(t){return[zt(t)]},Le.prototype.parseFootprints=function(t){var e,n;return t.start&&(e=this.moment(t.start),e.isValid()||(e=null)),t.end&&(n=this.moment(t.end),n.isValid()||(n=null)),[new We(new Ue(e,n),e&&!e.hasTime()||n&&!n.hasTime())]},Le.prototype.footprintContainsFootprint=function(t,e){return t.unzonedRange.containsRange(e.unzonedRange)},Le.prototype.footprintsIntersect=function(t,e){return t.unzonedRange.intersectsWith(e.unzonedRange)},Le.mixin({getEventSources:function(){return this.eventManager.otherSources.slice()},getEventSourceById:function(t){return this.eventManager.getSourceById(on.normalizeId(t))},addEventSource:function(t){var e=an.parse(t,this);e&&this.eventManager.addSource(e)},removeEventSources:function(t){var e,n,i=this.eventManager;if(null==t)this.eventManager.removeAllSources();else{for(e=i.multiQuerySources(t),i.freeze(),n=0;n<e.length;n++)i.removeSource(e[n]);i.thaw()}},removeEventSource:function(t){var e,n=this.eventManager,i=n.querySources(t);for(n.freeze(),e=0;e<i.length;e++)n.removeSource(i[e]);n.thaw()},refetchEventSources:function(t){var e,n=this.eventManager,i=n.multiQuerySources(t);for(n.freeze(),e=0;e<i.length;e++)n.refetchSource(i[e]);n.thaw()},refetchEvents:function(){this.eventManager.refetchAllSources()},renderEvents:function(t,e){this.eventManager.freeze();for(var n=0;n<t.length;n++)this.renderEvent(t[n],e);this.eventManager.thaw()},renderEvent:function(t,e){var n=this.eventManager,i=Ze.parse(t,t.source||n.stickySource);i&&n.addEventDef(i,e)},removeEvents:function(t){var e,n,i=this.eventManager,r=[],s={};if(null==t)i.removeAllEventDefs(!0);else{for(i.getEventInstances().forEach(function(t){r.push(t.toLegacy())}),r=Ct(r,t),n=0;n<r.length;n++)e=this.eventManager.getEventDefByUid(r[n]._id),s[e.id]=!0;i.freeze();for(n in s)i.removeEventDefsById(n,!0);i.thaw()}},clientEvents:function(t){var e=[];return this.eventManager.getEventInstances().forEach(function(t){e.push(t.toLegacy())}),Ct(e,t)},updateEvents:function(t){this.eventManager.freeze();for(var e=0;e<t.length;e++)this.updateEvent(t[e]);this.eventManager.thaw()},updateEvent:function(t){var e,n,i=this.eventManager.getEventDefByUid(t._id);i instanceof $e&&(e=i.buildInstance(),n=rn.createFromRawProps(e,t,null),this.eventManager.mutateEventsWithId(i.id,n))}}),Le.defaults={titleRangeSeparator:" – ",monthYearFormat:"MMMM YYYY",defaultTimedEventDuration:"02:00:00",defaultAllDayEventDuration:{days:1},forceEventDuration:!1,nextDayThreshold:"09:00:00",columnHeader:!0,defaultView:"month",aspectRatio:1.35,header:{left:"title",center:"",right:"today prev,next"},weekends:!0,weekNumbers:!1,weekNumberTitle:"W",weekNumberCalculation:"local",scrollTime:"06:00:00",minTime:"00:00:00",maxTime:"24:00:00",showNonCurrentDates:!0,lazyFetching:!0,startParam:"start",endParam:"end",timezoneParam:"timezone",timezone:!1,isRTL:!1,buttonText:{prev:"prev",next:"next",prevYear:"prev year",nextYear:"next year",year:"year",today:"today",month:"month",week:"week",day:"day"},allDayText:"all-day",agendaEventMinHeight:0,theme:!1,dragOpacity:.75,dragRevertDuration:500,dragScroll:!0,unselectAuto:!0,dropAccept:"*",eventOrder:"title",eventLimit:!1,eventLimitText:"more",eventLimitClick:"popover",dayPopoverFormat:"LL",handleWindowResize:!0,windowResizeDelay:100,longPressDelay:1e3},Le.englishDefaults={dayPopoverFormat:"dddd, MMMM D"},Le.rtlDefaults={header:{left:"next,prev today",center:"",right:"title"},buttonIcons:{prev:"right-single-arrow",next:"left-single-arrow",prevYear:"right-double-arrow",nextYear:"left-double-arrow"},themeButtonIcons:{prev:"circle-triangle-e",next:"circle-triangle-w",nextYear:"seek-prev",prevYear:"seek-next"}};var Oe=Wt.locales={};Wt.datepickerLocale=function(e,n,i){var r=Oe[e]||(Oe[e]={});r.isRTL=i.isRTL,r.weekNumberTitle=i.weekHeader,t.each(Ne,function(t,e){r[t]=e(i)}),t.datepicker&&(t.datepicker.regional[n]=t.datepicker.regional[e]=i,t.datepicker.regional.en=t.datepicker.regional[""],t.datepicker.setDefaults(i))},Wt.locale=function(e,i){var r,s;r=Oe[e]||(Oe[e]={}),i&&(r=Oe[e]=n([r,i])),s=Tt(e),t.each(Ve,function(t,e){null==r[t]&&(r[t]=e(s,r))}),Le.defaults.locale=e};var Ne={buttonText:function(t){return{prev:nt(t.prevText),next:nt(t.nextText),today:nt(t.currentText)}},monthYearFormat:function(t){return t.showMonthAfterYear?"YYYY["+t.yearSuffix+"] MMMM":"MMMM YYYY["+t.yearSuffix+"]"}},Ve={dayOfMonthFormat:function(t,e){var n=t.longDateFormat("l");return n=n.replace(/^Y+[^\w\s]*|[^\w\s]*Y+$/g,""),e.isRTL?n+=" ddd":n="ddd "+n,n},mediumTimeFormat:function(t){return t.longDateFormat("LT").replace(/\s*a$/i,"a")},smallTimeFormat:function(t){return t.longDateFormat("LT").replace(":mm","(:mm)").replace(/(\Wmm)$/,"($1)").replace(/\s*a$/i,"a")},extraSmallTimeFormat:function(t){return t.longDateFormat("LT").replace(":mm","(:mm)").replace(/(\Wmm)$/,"($1)").replace(/\s*a$/i,"t")},hourFormat:function(t){return t.longDateFormat("LT").replace(":mm","").replace(/(\Wmm)$/,"").replace(/\s*a$/i,"a")},noMeridiemTimeFormat:function(t){return t.longDateFormat("LT").replace(/\s*a$/i,"")}},Ge={smallDayDateFormat:function(t){return t.isRTL?"D dd":"dd D"},weekFormat:function(t){return t.isRTL?"w[ "+t.weekNumberTitle+"]":"["+t.weekNumberTitle+" ]w"},smallWeekFormat:function(t){return t.isRTL?"w["+t.weekNumberTitle+"]":"["+t.weekNumberTitle+"]w"}};Wt.locale("en",Le.englishDefaults);var Ue=Wt.UnzonedRange=dt.extend({startMs:null,endMs:null,isStart:!0,isEnd:!0,constructor:function(t,n){e.isMoment(t)&&(t=t.clone().stripZone()),e.isMoment(n)&&(n=n.clone().stripZone()),t&&(this.startMs=t.valueOf()),n&&(this.endMs=n.valueOf())},intersect:function(t){var e=this.startMs,n=this.endMs,i=null;return null!==t.startMs&&(e=null===e?t.startMs:Math.max(e,t.startMs)),null!==t.endMs&&(n=null===n?t.endMs:Math.min(n,t.endMs)),(null===e||null===n||e<n)&&(i=new Ue(e,n),i.isStart=this.isStart&&e===this.startMs,i.isEnd=this.isEnd&&n===this.endMs),i},intersectsWith:function(t){return(null===this.endMs||null===t.startMs||this.endMs>t.startMs)&&(null===this.startMs||null===t.endMs||this.startMs<t.endMs)},containsRange:function(t){return(null===this.startMs||null!==t.startMs&&t.startMs>=this.startMs)&&(null===this.endMs||null!==t.endMs&&t.endMs<=this.endMs)},containsDate:function(t){var e=t.valueOf();return(null===this.startMs||e>=this.startMs)&&(null===this.endMs||e<this.endMs)},constrainDate:function(t){var e=t.valueOf();return null!==this.startMs&&e<this.startMs&&(e=this.startMs),null!==this.endMs&&e>=this.endMs&&(e=this.endMs-1),e},equals:function(t){return this.startMs===t.startMs&&this.endMs===t.endMs},clone:function(){var t=new Ue(this.startMs,this.endMs);return t.isStart=this.isStart,t.isEnd=this.isEnd,t},getStart:function(){if(null!==this.startMs)return Wt.moment.utc(this.startMs).stripZone()},getEnd:function(){if(null!==this.endMs)return Wt.moment.utc(this.endMs).stripZone()},as:function(t){return e.utc(this.endMs).diff(e.utc(this.startMs),t,!0)}}),We=Wt.ComponentFootprint=dt.extend({unzonedRange:null,isAllDay:!1,constructor:function(t,e){this.unzonedRange=t,this.isAllDay=e},toLegacy:function(t){return{start:t.msToMoment(this.unzonedRange.startMs,this.isAllDay),end:t.msToMoment(this.unzonedRange.endMs,this.isAllDay)}}}),_e=dt.extend(re,{start:null,end:null,timezone:null,unzonedRange:null,requestsByUid:null,pendingCnt:0,freezeDepth:0,stuntedReleaseCnt:0,releaseCnt:0,eventDefsByUid:null,eventDefsById:null,eventInstanceGroupsById:null,constructor:function(t,e,n){this.start=t,this.end=e,this.timezone=n,this.unzonedRange=new Ue(t.clone().stripZone(),e.clone().stripZone()),this.requestsByUid={},this.eventDefsByUid={},this.eventDefsById={},this.eventInstanceGroupsById={}},isWithinRange:function(t,e){return!t.isBefore(this.start)&&!e.isAfter(this.end)},requestSources:function(t){this.freeze();for(var e=0;e<t.length;e++)this.requestSource(t[e]);this.thaw()},requestSource:function(t){var e=this,n={source:t,status:"pending"};this.requestsByUid[t.uid]=n,this.pendingCnt+=1,t.fetch(this.start,this.end,this.timezone).then(function(t){"cancelled"!==n.status&&(n.status="completed",n.eventDefs=t,e.addEventDefs(t),e.pendingCnt--,e.tryRelease())},function(){"cancelled"!==n.status&&(n.status="failed",e.pendingCnt--,e.tryRelease())})},purgeSource:function(t){var e=this.requestsByUid[t.uid];e&&(delete this.requestsByUid[t.uid],"pending"===e.status?(e.status="cancelled",this.pendingCnt--,this.tryRelease()):"completed"===e.status&&e.eventDefs.forEach(this.removeEventDef.bind(this)))},purgeAllSources:function(){var t,e,n=this.requestsByUid,i=0;for(t in n)e=n[t],"pending"===e.status?e.status="cancelled":"completed"===e.status&&i++;this.requestsByUid={},this.pendingCnt=0,i&&this.removeAllEventDefs()},getEventDefByUid:function(t){return this.eventDefsByUid[t]},getEventDefsById:function(t){var e=this.eventDefsById[t];return e?e.slice():[]},addEventDefs:function(t){for(var e=0;e<t.length;e++)this.addEventDef(t[e])},addEventDef:function(t){var e,n=this.eventDefsById,i=t.id,r=n[i]||(n[i]=[]),s=t.buildInstances(this.unzonedRange);for(r.push(t),this.eventDefsByUid[t.uid]=t,e=0;e<s.length;e++)this.addEventInstance(s[e],i)},removeEventDefsById:function(t){var e=this;this.getEventDefsById(t).forEach(function(t){e.removeEventDef(t)})},removeAllEventDefs:function(){var e=t.isEmptyObject(this.eventDefsByUid);this.eventDefsByUid={},this.eventDefsById={},this.eventInstanceGroupsById={},e||this.tryRelease()},removeEventDef:function(t){var e=this.eventDefsById,n=e[t.id];delete this.eventDefsByUid[t.uid],n&&(K(n,t),n.length||delete e[t.id],this.removeEventInstancesForDef(t))},getEventInstances:function(){var t,e=this.eventInstanceGroupsById,n=[];for(t in e)n.push.apply(n,e[t].eventInstances);return n},getEventInstancesWithId:function(t){var e=this.eventInstanceGroupsById[t];return e?e.eventInstances.slice():[]},getEventInstancesWithoutId:function(t){var e,n=this.eventInstanceGroupsById,i=[];for(e in n)e!==t&&i.push.apply(i,n[e].eventInstances);return i},addEventInstance:function(t,e){var n=this.eventInstanceGroupsById;(n[e]||(n[e]=new Je)).eventInstances.push(t),this.tryRelease()},removeEventInstancesForDef:function(t){var e,n=this.eventInstanceGroupsById,i=n[t.id];i&&(e=X(i.eventInstances,function(e){return e.def===t}),i.eventInstances.length||delete n[t.id],e&&this.tryRelease())},tryRelease:function(){this.pendingCnt||(this.freezeDepth?this.stuntedReleaseCnt++:this.release())},release:function(){this.releaseCnt++,this.trigger("release",this.eventInstanceGroupsById)},whenReleased:function(){var t=this;return this.releaseCnt?ce.resolve(this.eventInstanceGroupsById):ce.construct(function(e){t.one("release",e)})},freeze:function(){this.freezeDepth++||(this.stuntedReleaseCnt=0)},thaw:function(){--this.freezeDepth||!this.stuntedReleaseCnt||this.pendingCnt||this.release()}}),qe=dt.extend(re,se,{currentPeriod:null,calendar:null,stickySource:null,otherSources:null,constructor:function(t){this.calendar=t,this.stickySource=new ln(t),this.otherSources=[]},requestEvents:function(t,e,n,i){return!i&&this.currentPeriod&&this.currentPeriod.isWithinRange(t,e)&&n===this.currentPeriod.timezone||this.setPeriod(new _e(t,e,n)),this.currentPeriod.whenReleased()},addSource:function(t){this.otherSources.push(t),this.currentPeriod&&this.currentPeriod.requestSource(t)},removeSource:function(t){K(this.otherSources,t),this.currentPeriod&&this.currentPeriod.purgeSource(t)},removeAllSources:function(){this.otherSources=[],this.currentPeriod&&this.currentPeriod.purgeAllSources()},refetchSource:function(t){var e=this.currentPeriod;e&&(e.freeze(),e.purgeSource(t),e.requestSource(t),e.thaw())},refetchAllSources:function(){var t=this.currentPeriod;t&&(t.freeze(),t.purgeAllSources(),t.requestSources(this.getSources()),t.thaw())},getSources:function(){return[this.stickySource].concat(this.otherSources)},multiQuerySources:function(e){e?t.isArray(e)||(e=[e]):e=[];var n,i=[];for(n=0;n<e.length;n++)i.push.apply(i,this.querySources(e[n]));return i},querySources:function(e){var n,i,r=this.otherSources;for(n=0;n<r.length;n++)if((i=r[n])===e)return[i];return(i=this.getSourceById(on.normalizeId(e)))?[i]:(e=an.parse(e,this.calendar),e?t.grep(r,function(t){return Mt(e,t)}):void 0)},getSourceById:function(e){return t.grep(this.otherSources,function(t){return t.id&&t.id===e})[0]},setPeriod:function(t){this.currentPeriod&&(this.unbindPeriod(this.currentPeriod),this.currentPeriod=null),this.currentPeriod=t,this.bindPeriod(t),t.requestSources(this.getSources())},bindPeriod:function(t){this.listenTo(t,"release",function(t){this.trigger("release",t)})},unbindPeriod:function(t){this.stopListeningTo(t)},getEventDefByUid:function(t){if(this.currentPeriod)return this.currentPeriod.getEventDefByUid(t)},addEventDef:function(t,e){e&&this.stickySource.addEventDef(t),this.currentPeriod&&this.currentPeriod.addEventDef(t)},removeEventDefsById:function(t){this.getSources().forEach(function(e){e.removeEventDefsById(t)}),this.currentPeriod&&this.currentPeriod.removeEventDefsById(t)},removeAllEventDefs:function(){this.getSources().forEach(function(t){t.removeAllEventDefs()}),this.currentPeriod&&this.currentPeriod.removeAllEventDefs()},mutateEventsWithId:function(t,e){var n,i=this.currentPeriod,r=[];return i?(i.freeze(),n=i.getEventDefsById(t),n.forEach(function(t){i.removeEventDef(t),r.push(e.mutateSingle(t)),i.addEventDef(t)}),i.thaw(),function(){i.freeze();for(var t=0;t<n.length;t++)i.removeEventDef(n[t]),r[t](),i.addEventDef(n[t]);i.thaw()}):function(){}},buildMutatedEventInstanceGroup:function(t,e){var n,i,r=this.getEventDefsById(t),s=[];for(n=0;n<r.length;n++)(i=r[n].clone())instanceof $e&&(e.mutateSingle(i),s.push.apply(s,i.buildInstances()));return new Je(s)},freeze:function(){this.currentPeriod&&this.currentPeriod.freeze()},thaw:function(){this.currentPeriod&&this.currentPeriod.thaw()}});["getEventDefsById","getEventInstances","getEventInstancesWithId","getEventInstancesWithoutId"].forEach(function(t){qe.prototype[t]=function(){var e=this.currentPeriod;return e?e[t].apply(e,arguments):[]}});var Ye={start:"09:00",end:"17:00",dow:[1,2,3,4,5],rendering:"inverse-background"},je=Wt.BusinessHourGenerator=dt.extend({rawComplexDef:null,calendar:null,constructor:function(t,e){this.rawComplexDef=t,this.calendar=e},buildEventInstanceGroup:function(t,e){var n,i=this.buildEventDefs(t);if(i.length)return n=new Je(xt(i,e)),n.explicitEventDef=i[0],n},buildEventDefs:function(e){var n,i=this.rawComplexDef,r=[],s=!1,o=[];for(!0===i?r=[{}]:t.isPlainObject(i)?r=[i]:t.isArray(i)&&(r=i,s=!0),n=0;n<r.length;n++)s&&!r[n].dow||o.push(this.buildEventDef(e,r[n]));return o},buildEventDef:function(e,n){var i=t.extend({},Ye,n);return e&&(i.start=null,i.end=null),Xe.parse(i,new on(this.calendar))}}),Ze={parse:function(t,n){return Y(t.start)||e.isDuration(t.start)||Y(t.end)||e.isDuration(t.end)?Xe.parse(t,n):$e.parse(t,n)}},Qe=Wt.EventDef=dt.extend(oe,{source:null,id:null,rawId:null,uid:null,title:null,url:null,rendering:null,constraint:null,overlap:null,editable:null,startEditable:null,durationEditable:null,color:null,backgroundColor:null,borderColor:null,textColor:null,className:null,miscProps:null,constructor:function(t){this.source=t,this.className=[],this.miscProps={}},isAllDay:function(){},buildInstances:function(t){},clone:function(){var e=new this.constructor(this.source);return e.id=this.id,e.rawId=this.rawId,e.uid=this.uid,Qe.copyVerbatimStandardProps(this,e),e.className=this.className.slice(),e.miscProps=t.extend({},this.miscProps),e},hasInverseRendering:function(){return"inverse-background"===this.getRendering()},hasBgRendering:function(){var t=this.getRendering();return"inverse-background"===t||"background"===t},getRendering:function(){return null!=this.rendering?this.rendering:this.source.rendering},getConstraint:function(){return null!=this.constraint?this.constraint:null!=this.source.constraint?this.source.constraint:this.source.calendar.opt("eventConstraint")},getOverlap:function(){return null!=this.overlap?this.overlap:null!=this.source.overlap?this.source.overlap:this.source.calendar.opt("eventOverlap")},isStartExplicitlyEditable:function(){return null!==this.startEditable?this.startEditable:this.source.startEditable},isDurationExplicitlyEditable:function(){return null!==this.durationEditable?this.durationEditable:this.source.durationEditable},isExplicitlyEditable:function(){return null!==this.editable?this.editable:this.source.editable},toLegacy:function(){var e=t.extend({},this.miscProps);return e._id=this.uid,e.source=this.source,e.className=this.className.slice(),e.allDay=this.isAllDay(),null!=this.rawId&&(e.id=this.rawId),Qe.copyVerbatimStandardProps(this,e),e},applyManualStandardProps:function(e){return null!=e.id?this.id=Qe.normalizeId(this.rawId=e.id):this.id=Qe.generateId(),null!=e._id?this.uid=String(e._id):this.uid=Qe.generateId(),t.isArray(e.className)&&(this.className=e.className),
"string"==typeof e.className&&(this.className=e.className.split(/\s+/)),!0},applyMiscProps:function(e){t.extend(this.miscProps,e)}});Qe.defineStandardProps=ae,Qe.copyVerbatimStandardProps=le,Qe.uuid=0,Qe.normalizeId=function(t){return String(t)},Qe.generateId=function(){return"_fc"+Qe.uuid++},Qe.defineStandardProps({_id:!1,id:!1,className:!1,source:!1,title:!0,url:!0,rendering:!0,constraint:!0,overlap:!0,editable:!0,startEditable:!0,durationEditable:!0,color:!0,backgroundColor:!0,borderColor:!0,textColor:!0}),Qe.parse=function(t,e){var n=new this(e),i=e.calendar.opt("eventDataTransform"),r=e.eventDataTransform;return i&&(t=i(t)),r&&(t=r(t)),!!n.applyProps(t)&&n};var $e=Qe.extend({dateProfile:null,buildInstances:function(){return[this.buildInstance()]},buildInstance:function(){return new Ke(this,this.dateProfile)},isAllDay:function(){return this.dateProfile.isAllDay()},clone:function(){var t=Qe.prototype.clone.call(this);return t.dateProfile=this.dateProfile,t},rezone:function(){var t=this.source.calendar,e=this.dateProfile;this.dateProfile=new tn(t.moment(e.start),e.end?t.moment(e.end):null,t)},applyManualStandardProps:function(t){var e=Qe.prototype.applyManualStandardProps.apply(this,arguments),n=tn.parse(t,this.source);return!!n&&(this.dateProfile=n,null!=t.date&&(this.miscProps.date=t.date),e)}});$e.defineStandardProps({start:!1,date:!1,end:!1,allDay:!1});var Xe=Qe.extend({startTime:null,endTime:null,dowHash:null,isAllDay:function(){return!this.startTime&&!this.endTime},buildInstances:function(t){for(var e,n,i,r=this.source.calendar,s=t.getStart(),o=t.getEnd(),a=[];s.isBefore(o);)this.dowHash&&!this.dowHash[s.day()]||(e=r.applyTimezone(s),n=e.clone(),i=null,this.startTime?n.time(this.startTime):n.stripTime(),this.endTime&&(i=e.clone().time(this.endTime)),a.push(new Ke(this,new tn(n,i,r)))),s.add(1,"days");return a},setDow:function(t){this.dowHash||(this.dowHash={});for(var e=0;e<t.length;e++)this.dowHash[t[e]]=!0},clone:function(){var n=Qe.prototype.clone.call(this);return n.startTime&&(n.startTime=e.duration(this.startTime)),n.endTime&&(n.endTime=e.duration(this.endTime)),this.dowHash&&(n.dowHash=t.extend({},this.dowHash)),n},applyProps:function(t){var n=Qe.prototype.applyProps.apply(this,arguments);return t.start&&(this.startTime=e.duration(t.start)),t.end&&(this.endTime=e.duration(t.end)),t.dow&&this.setDow(t.dow),n}});Xe.defineStandardProps({start:!1,end:!1,dow:!1});var Ke=dt.extend({def:null,dateProfile:null,constructor:function(t,e){this.def=t,this.dateProfile=e},toLegacy:function(){var t=this.dateProfile,e=this.def.toLegacy();return e.start=t.start.clone(),e.end=t.end?t.end.clone():null,e}}),Je=Wt.EventInstanceGroup=dt.extend({eventInstances:null,explicitEventDef:null,constructor:function(t){this.eventInstances=t||[]},getAllEventRanges:function(t){return t?this.sliceNormalRenderRanges(t):this.eventInstances.map(Pt)},sliceRenderRanges:function(t){return this.isInverse()?this.sliceInverseRenderRanges(t):this.sliceNormalRenderRanges(t)},sliceNormalRenderRanges:function(t){var e,n,i,r=this.eventInstances,s=[];for(e=0;e<r.length;e++)n=r[e],(i=n.dateProfile.unzonedRange.intersect(t))&&s.push(new en(i,n.def,n));return s},sliceInverseRenderRanges:function(t){var e=this.eventInstances.map(Ft),n=this.getEventDef();return e=It(e,t),e.map(function(t){return new en(t,n)})},isInverse:function(){return this.getEventDef().hasInverseRendering()},getEventDef:function(){return this.explicitEventDef||this.eventInstances[0].def}}),tn=dt.extend({start:null,end:null,unzonedRange:null,constructor:function(t,e,n){this.start=t,this.end=e||null,this.unzonedRange=this.buildUnzonedRange(n)},isAllDay:function(){return!(this.start.hasTime()||this.end&&this.end.hasTime())},buildUnzonedRange:function(t){var e=this.start.clone().stripZone().valueOf(),n=this.getEnd(t).stripZone().valueOf();return new Ue(e,n)},getEnd:function(t){return this.end?this.end.clone():t.getDefaultEventEnd(this.isAllDay(),this.start)}});tn.isStandardProp=function(t){return"start"===t||"date"===t||"end"===t||"allDay"===t},tn.parse=function(t,e){var n=t.start||t.date,i=t.end;if(!n)return!1;var r=e.calendar,s=r.moment(n),o=i?r.moment(i):null,a=t.allDay,l=r.opt("forceEventDuration");return!!s.isValid()&&(!o||o.isValid()&&o.isAfter(s)||(o=null),null==a&&null==(a=e.allDayDefault)&&(a=r.opt("allDayDefault")),!0===a?(s.stripTime(),o&&o.stripTime()):!1===a&&(s.hasTime()||s.time(0),o&&!o.hasTime()&&o.time(0)),!o&&l&&(o=r.getDefaultEventEnd(!s.hasTime(),s)),new tn(s,o,r))};var en=dt.extend({unzonedRange:null,eventDef:null,eventInstance:null,constructor:function(t,e,n){this.unzonedRange=t,this.eventDef=e,n&&(this.eventInstance=n)}}),nn=Wt.EventFootprint=dt.extend({componentFootprint:null,eventDef:null,eventInstance:null,constructor:function(t,e,n){this.componentFootprint=t,this.eventDef=e,n&&(this.eventInstance=n)},getEventLegacy:function(){return(this.eventInstance||this.eventDef).toLegacy()}}),rn=Wt.EventDefMutation=dt.extend({dateMutation:null,eventDefId:null,className:null,verbatimStandardProps:null,miscProps:null,mutateSingle:function(t){var e;return this.dateMutation&&(e=t.dateProfile,t.dateProfile=this.dateMutation.buildNewDateProfile(e,t.source.calendar)),null!=this.eventDefId&&(t.id=Qe.normalizeId(t.rawId=this.eventDefId)),this.className&&(t.className=this.className),this.verbatimStandardProps&&$e.copyVerbatimStandardProps(this.verbatimStandardProps,t),this.miscProps&&t.applyMiscProps(this.miscProps),e?function(){t.dateProfile=e}:function(){}},setDateMutation:function(t){t&&!t.isEmpty()?this.dateMutation=t:this.dateMutation=null},isEmpty:function(){return!this.dateMutation}});rn.createFromRawProps=function(t,e,n){var i,r,s,o,a=t.def,l={},u={},c={},h={},d=null,f=null;for(i in e)tn.isStandardProp(i)?l[i]=e[i]:a.isStandardProp(i)?u[i]=e[i]:a.miscProps[i]!==e[i]&&(c[i]=e[i]);return r=tn.parse(l,a.source),r&&(s=sn.createFromDiff(t.dateProfile,r,n)),u.id!==a.id&&(d=u.id),J(u.className,a.className)||(f=u.className),Qe.copyVerbatimStandardProps(u,h),o=new rn,o.eventDefId=d,o.className=f,o.verbatimStandardProps=h,o.miscProps=c,s&&(o.dateMutation=s),o};var sn=dt.extend({clearEnd:!1,forceTimed:!1,forceAllDay:!1,dateDelta:null,startDelta:null,endDelta:null,buildNewDateProfile:function(t,e){var n=t.start.clone(),i=null,r=!1;return t.end&&!this.clearEnd?i=t.end.clone():this.endDelta&&!i&&(i=e.getDefaultEventEnd(t.isAllDay(),n)),this.forceTimed?(r=!0,n.hasTime()||n.time(0),i&&!i.hasTime()&&i.time(0)):this.forceAllDay&&(n.hasTime()&&n.stripTime(),i&&i.hasTime()&&i.stripTime()),this.dateDelta&&(r=!0,n.add(this.dateDelta),i&&i.add(this.dateDelta)),this.endDelta&&(r=!0,i.add(this.endDelta)),this.startDelta&&(r=!0,n.add(this.startDelta)),r&&(n=e.applyTimezone(n),i&&(i=e.applyTimezone(i))),!i&&e.opt("forceEventDuration")&&(i=e.getDefaultEventEnd(t.isAllDay(),n)),new tn(n,i,e)},setDateDelta:function(t){t&&t.valueOf()?this.dateDelta=t:this.dateDelta=null},setStartDelta:function(t){t&&t.valueOf()?this.startDelta=t:this.startDelta=null},setEndDelta:function(t){t&&t.valueOf()?this.endDelta=t:this.endDelta=null},isEmpty:function(){return!(this.clearEnd||this.forceTimed||this.forceAllDay||this.dateDelta||this.startDelta||this.endDelta)}});sn.createFromDiff=function(t,e,n){function i(t,i){return n?L(t,i,n):e.isAllDay()?A(t,i):B(t,i)}var r,s,o,a,l=t.end&&!e.end,u=t.isAllDay()&&!e.isAllDay(),c=!t.isAllDay()&&e.isAllDay();return r=i(e.start,t.start),e.end&&(s=i(e.unzonedRange.getEnd(),t.unzonedRange.getEnd()),o=s.subtract(r)),a=new sn,a.clearEnd=l,a.forceTimed=u,a.forceAllDay=c,a.setDateDelta(r),a.setEndDelta(o),a};var on=dt.extend(oe,{calendar:null,id:null,uid:null,color:null,backgroundColor:null,borderColor:null,textColor:null,className:null,editable:null,startEditable:null,durationEditable:null,rendering:null,overlap:null,constraint:null,allDayDefault:null,eventDataTransform:null,constructor:function(t){this.calendar=t,this.className=[],this.uid=String(on.uuid++)},fetch:function(t,e,n){},removeEventDefsById:function(t){},removeAllEventDefs:function(){},getPrimitive:function(t){},parseEventDefs:function(t){var e,n,i=[];for(e=0;e<t.length;e++)(n=Ze.parse(t[e],this))&&i.push(n);return i},applyManualStandardProps:function(e){return null!=e.id&&(this.id=on.normalizeId(e.id)),t.isArray(e.className)?this.className=e.className:"string"==typeof e.className&&(this.className=e.className.split(/\s+/)),!0}});on.defineStandardProps=ae,on.uuid=0,on.normalizeId=function(t){return t?String(t):null},on.defineStandardProps({id:!1,className:!1,color:!0,backgroundColor:!0,borderColor:!0,textColor:!0,editable:!0,startEditable:!0,durationEditable:!0,rendering:!0,overlap:!0,constraint:!0,allDayDefault:!0,eventDataTransform:!0}),on.parse=function(t,e){var n=new this(e);return!("object"!=typeof t||!n.applyProps(t))&&n},Wt.EventSource=on;var an={sourceClasses:[],registerClass:function(t){this.sourceClasses.unshift(t)},parse:function(t,e){var n,i,r=this.sourceClasses;for(n=0;n<r.length;n++)if(i=r[n].parse(t,e))return i}};Wt.EventSourceParser=an;var ln=on.extend({rawEventDefs:null,eventDefs:null,currentTimezone:null,constructor:function(t){on.apply(this,arguments),this.eventDefs=[]},setRawEventDefs:function(t){this.rawEventDefs=t,this.eventDefs=this.parseEventDefs(t)},fetch:function(t,e,n){var i,r=this.eventDefs;if(null!==this.currentTimezone&&this.currentTimezone!==n)for(i=0;i<r.length;i++)r[i]instanceof $e&&r[i].rezone();return this.currentTimezone=n,ce.resolve(r)},addEventDef:function(t){this.eventDefs.push(t)},removeEventDefsById:function(t){return X(this.eventDefs,function(e){return e.id===t})},removeAllEventDefs:function(){this.eventDefs=[]},getPrimitive:function(){return this.rawEventDefs},applyManualStandardProps:function(t){var e=on.prototype.applyManualStandardProps.apply(this,arguments);return this.setRawEventDefs(t.events),e}});ln.defineStandardProps({events:!1}),ln.parse=function(e,n){var i;return t.isArray(e.events)?i=e:t.isArray(e)&&(i={events:e}),!!i&&on.parse.call(this,i,n)},an.registerClass(ln),Wt.ArrayEventSource=ln;var un=on.extend({func:null,fetch:function(t,e,n){var i=this;return this.calendar.pushLoading(),ce.construct(function(r){i.func.call(i.calendar,t.clone(),e.clone(),n,function(t){i.calendar.popLoading(),r(i.parseEventDefs(t))})})},getPrimitive:function(){return this.func},applyManualStandardProps:function(t){var e=on.prototype.applyManualStandardProps.apply(this,arguments);return this.func=t.events,e}});un.defineStandardProps({events:!1}),un.parse=function(e,n){var i;return t.isFunction(e.events)?i=e:t.isFunction(e)&&(i={events:e}),!!i&&on.parse.call(this,i,n)},an.registerClass(un),Wt.FuncEventSource=un;var cn=on.extend({url:null,startParam:null,endParam:null,timezoneParam:null,ajaxSettings:null,fetch:function(e,n,i){var r=this,s=this.ajaxSettings,o=s.success,a=s.error,l=this.buildRequestParams(e,n,i);return this.calendar.pushLoading(),ce.construct(function(e,n){t.ajax(t.extend({},cn.AJAX_DEFAULTS,s,{url:r.url,data:l,success:function(i){var s;r.calendar.popLoading(),i?(s=$(o,this,arguments),t.isArray(s)&&(i=s),e(r.parseEventDefs(i))):n()},error:function(){r.calendar.popLoading(),$(a,this,arguments),n()}}))})},buildRequestParams:function(e,n,i){var r,s,o,a,l=this.calendar,u=this.ajaxSettings,c={};return r=this.startParam,null==r&&(r=l.opt("startParam")),s=this.endParam,null==s&&(s=l.opt("endParam")),o=this.timezoneParam,null==o&&(o=l.opt("timezoneParam")),a=t.isFunction(u.data)?u.data():u.data||{},t.extend(c,a),c[r]=e.format(),c[s]=n.format(),i&&"local"!==i&&(c[o]=i),c},getPrimitive:function(){return this.url},applyMiscProps:function(t){on.prototype.applyMiscProps.apply(this,arguments),this.ajaxSettings=t}});cn.AJAX_DEFAULTS={dataType:"json",cache:!1},cn.defineStandardProps({url:!0,startParam:!0,endParam:!0,timezoneParam:!0}),cn.parse=function(t,e){var n;return"string"==typeof t.url?n=t:"string"==typeof t&&(n={url:t}),!!n&&on.parse.call(this,n,e)},an.registerClass(cn),Wt.JsonFeedEventSource=cn;var hn=Wt.ThemeRegistry={themeClassHash:{},register:function(t,e){this.themeClassHash[t]=e},getThemeClass:function(t){return t?!0===t?gn:this.themeClassHash[t]:fn}},dn=Wt.Theme=dt.extend({classes:{},iconClasses:{},baseIconClass:"",iconOverrideOption:null,iconOverrideCustomButtonOption:null,iconOverridePrefix:"",constructor:function(t){this.optionsModel=t,this.processIconOverride()},processIconOverride:function(){this.iconOverrideOption&&this.setIconOverride(this.optionsModel.get(this.iconOverrideOption))},setIconOverride:function(e){var n,i;if(t.isPlainObject(e)){n=t.extend({},this.iconClasses);for(i in e)n[i]=this.applyIconOverridePrefix(e[i]);this.iconClasses=n}else!1===e&&(this.iconClasses={})},applyIconOverridePrefix:function(t){var e=this.iconOverridePrefix;return e&&0!==t.indexOf(e)&&(t=e+t),t},getClass:function(t){return this.classes[t]||""},getIconClass:function(t){var e=this.iconClasses[t];return e?this.baseIconClass+" "+e:""},getCustomButtonIconClass:function(t){var e;return this.iconOverrideCustomButtonOption&&(e=t[this.iconOverrideCustomButtonOption])?this.baseIconClass+" "+this.applyIconOverridePrefix(e):""}}),fn=dn.extend({classes:{widget:"fc-unthemed",widgetHeader:"fc-widget-header",widgetContent:"fc-widget-content",buttonGroup:"fc-button-group",button:"fc-button",cornerLeft:"fc-corner-left",cornerRight:"fc-corner-right",stateDefault:"fc-state-default",stateActive:"fc-state-active",stateDisabled:"fc-state-disabled",stateHover:"fc-state-hover",stateDown:"fc-state-down",popoverHeader:"fc-widget-header",popoverContent:"fc-widget-content",headerRow:"fc-widget-header",dayRow:"fc-widget-content",listView:"fc-widget-content"},baseIconClass:"fc-icon",iconClasses:{close:"fc-icon-x",prev:"fc-icon-left-single-arrow",next:"fc-icon-right-single-arrow",prevYear:"fc-icon-left-double-arrow",nextYear:"fc-icon-right-double-arrow"},iconOverrideOption:"buttonIcons",iconOverrideCustomButtonOption:"icon",iconOverridePrefix:"fc-icon-"});hn.register("standard",fn);var gn=dn.extend({classes:{widget:"ui-widget",widgetHeader:"ui-widget-header",widgetContent:"ui-widget-content",buttonGroup:"fc-button-group",button:"ui-button",cornerLeft:"ui-corner-left",cornerRight:"ui-corner-right",stateDefault:"ui-state-default",stateActive:"ui-state-active",stateDisabled:"ui-state-disabled",stateHover:"ui-state-hover",stateDown:"ui-state-down",today:"ui-state-highlight",popoverHeader:"ui-widget-header",popoverContent:"ui-widget-content",headerRow:"ui-widget-header",dayRow:"ui-widget-content",listView:"ui-widget-content"},baseIconClass:"ui-icon",iconClasses:{close:"ui-icon-closethick",prev:"ui-icon-circle-triangle-w",next:"ui-icon-circle-triangle-e",prevYear:"ui-icon-seek-prev",nextYear:"ui-icon-seek-next"},iconOverrideOption:"themeButtonIcons",iconOverrideCustomButtonOption:"themeIcon",iconOverridePrefix:"ui-icon-"});hn.register("jquery-ui",gn);var pn=dn.extend({classes:{widget:"fc-bootstrap3",tableGrid:"table-bordered",tableList:"table table-striped",buttonGroup:"btn-group",button:"btn btn-default",stateActive:"active",stateDisabled:"disabled",today:"alert alert-info",popover:"panel panel-default",popoverHeader:"panel-heading",popoverContent:"panel-body",headerRow:"panel-default",dayRow:"panel-default",listView:"panel panel-default"},baseIconClass:"glyphicon",iconClasses:{close:"glyphicon-remove",prev:"glyphicon-chevron-left",next:"glyphicon-chevron-right",prevYear:"glyphicon-backward",nextYear:"glyphicon-forward"},iconOverrideOption:"bootstrapGlyphicons",iconOverrideCustomButtonOption:"bootstrapGlyphicon",iconOverridePrefix:"glyphicon-"});hn.register("bootstrap3",pn);var vn=xe.extend({fillSegTag:"td",attachSegEls:function(t,e){var n,i,r,s=[];for(n=0;n<e.length;n++)i=e[n],r=this.renderFillRow(t,i),this.component.rowEls.eq(i.row).append(r),s.push(r[0]);return s},renderFillRow:function(e,n){var i,r,s,o=this.component.colCnt,a=n.leftCol,l=n.rightCol+1;return i="businessHours"===e?"bgevent":e.toLowerCase(),r=t('<div class="fc-'+i+'-skeleton"><table><tr/></table></div>'),s=r.find("tr"),a>0&&s.append('<td colspan="'+a+'"/>'),s.append(n.el.attr("colspan",l-a)),l<o&&s.append('<td colspan="'+(o-l)+'"/>'),this.component.bookendCells(s),r}}),mn=He.extend({dayGrid:null,rowStructs:null,constructor:function(t){He.apply(this,arguments),this.dayGrid=t},renderBgRanges:function(e){e=t.grep(e,function(t){return t.eventDef.isAllDay()}),He.prototype.renderBgRanges.call(this,e)},renderFgSegs:function(e){var n=this.rowStructs=this.renderSegRows(e);this.dayGrid.rowEls.each(function(e,i){t(i).find(".fc-content-skeleton > table").append(n[e].tbodyEl)})},unrenderFgSegs:function(){for(var t,e=this.rowStructs||[];t=e.pop();)t.tbodyEl.remove();this.rowStructs=null},renderSegRows:function(t){var e,n,i=[];for(e=this.groupSegRows(t),n=0;n<e.length;n++)i.push(this.renderSegRow(n,e[n]));return i},renderSegRow:function(e,n){function i(e){for(;o<e;)c=(m[r-1]||[])[o],c?c.attr("rowspan",parseInt(c.attr("rowspan")||1,10)+1):(c=t("<td/>"),a.append(c)),v[r][o]=c,m[r][o]=c,o++}var r,s,o,a,l,u,c,h=this.dayGrid.colCnt,d=this.buildSegLevels(n),f=Math.max(1,d.length),g=t("<tbody/>"),p=[],v=[],m=[];for(r=0;r<f;r++){if(s=d[r],o=0,a=t("<tr/>"),p.push([]),v.push([]),m.push([]),s)for(l=0;l<s.length;l++){for(u=s[l],i(u.leftCol),c=t('<td class="fc-event-container"/>').append(u.el),u.leftCol!=u.rightCol?c.attr("colspan",u.rightCol-u.leftCol+1):m[r][o]=c;o<=u.rightCol;)v[r][o]=c,p[r][o]=u,o++;a.append(c)}i(h),this.dayGrid.bookendCells(a),g.append(a)}return{row:e,tbodyEl:g,cellMatrix:v,segMatrix:p,segLevels:d,segs:n}},buildSegLevels:function(t){var e,n,i,r=[];for(this.sortEventSegs(t),e=0;e<t.length;e++){for(n=t[e],i=0;i<r.length&&Bt(n,r[i]);i++);n.level=i,(r[i]||(r[i]=[])).push(n)}for(i=0;i<r.length;i++)r[i].sort(At);return r},groupSegRows:function(t){var e,n=[];for(e=0;e<this.dayGrid.rowCnt;e++)n.push([]);for(e=0;e<t.length;e++)n[t[e].row].push(t[e]);return n},computeEventTimeFormat:function(){return this.opt("extraSmallTimeFormat")},computeDisplayEventEnd:function(){return 1===this.dayGrid.colCnt},fgSegHtml:function(t,e){var n,i,r=this.view,s=t.footprint.eventDef,o=t.footprint.componentFootprint.isAllDay,a=r.isEventDefDraggable(s),l=!e&&o&&t.isStart&&r.isEventDefResizableFromStart(s),u=!e&&o&&t.isEnd&&r.isEventDefResizableFromEnd(s),c=this.getSegClasses(t,a,l||u),h=it(this.getSkinCss(s)),d="";return c.unshift("fc-day-grid-event","fc-h-event"),t.isStart&&(n=this.getTimeText(t.footprint))&&(d='<span class="fc-time">'+et(n)+"</span>"),i='<span class="fc-title">'+(et(s.title||"")||"&nbsp;")+"</span>",'<a class="'+c.join(" ")+'"'+(s.url?' href="'+et(s.url)+'"':"")+(h?' style="'+h+'"':"")+'><div class="fc-content">'+(this.isRTL?i+" "+d:d+" "+i)+"</div>"+(l?'<div class="fc-resizer fc-start-resizer" />':"")+(u?'<div class="fc-resizer fc-end-resizer" />':"")+"</a>"}}),yn=Pe.extend({renderSegs:function(e,n){var i,r=[];return i=this.eventRenderer.renderSegRows(e),this.component.rowEls.each(function(e,s){var o,a,l=t(s),u=t('<div class="fc-helper-skeleton"><table/></div>');n&&n.row===e?a=n.el.position().top:(o=l.find(".fc-content-skeleton tbody"),o.length||(o=l.find(".fc-content-skeleton table")),a=o.position().top),u.css("top",a).find("table").append(i[e].tbodyEl),l.append(u),r.push(u[0])}),t(r)}}),wn=Wt.DayGrid=ke.extend(Ie,Be,{eventRendererClass:mn,businessHourRendererClass:Me,helperRendererClass:yn,fillRendererClass:vn,view:null,helperRenderer:null,cellWeekNumbersVisible:!1,bottomCoordPadding:0,headContainerEl:null,rowEls:null,cellEls:null,rowCoordCache:null,colCoordCache:null,isRigid:!1,hasAllDayBusinessHours:!0,constructor:function(t){this.view=t,ke.call(this)},componentFootprintToSegs:function(t){var e,n,i=this.sliceRangeByRow(t.unzonedRange);for(e=0;e<i.length;e++)n=i[e],this.isRTL?(n.leftCol=this.daysPerRow-1-n.lastRowDayIndex,n.rightCol=this.daysPerRow-1-n.firstRowDayIndex):(n.leftCol=n.firstRowDayIndex,n.rightCol=n.lastRowDayIndex);return i},renderDates:function(t){this.dateProfile=t,this.updateDayTable(),this.renderGrid()},unrenderDates:function(){this.removeSegPopover()},renderGrid:function(){var t,e,n=this.view,i=this.rowCnt,r=this.colCnt,s="";for(this.headContainerEl&&this.headContainerEl.html(this.renderHeadHtml()),t=0;t<i;t++)s+=this.renderDayRowHtml(t,this.isRigid);for(this.el.html(s),this.rowEls=this.el.find(".fc-row"),this.cellEls=this.el.find(".fc-day, .fc-disabled-day"),this.rowCoordCache=new ge({els:this.rowEls,isVertical:!0}),this.colCoordCache=new ge({els:this.cellEls.slice(0,this.colCnt),isHorizontal:!0}),t=0;t<i;t++)for(e=0;e<r;e++)this.publiclyTrigger("dayRender",{context:n,args:[this.getCellDate(t,e),this.getCellEl(t,e),n]})},renderDayRowHtml:function(t,e){var n=this.view.calendar.theme,i=["fc-row","fc-week",n.getClass("dayRow")];return e&&i.push("fc-rigid"),'<div class="'+i.join(" ")+'"><div class="fc-bg"><table class="'+n.getClass("tableGrid")+'">'+this.renderBgTrHtml(t)+'</table></div><div class="fc-content-skeleton"><table>'+(this.getIsNumbersVisible()?"<thead>"+this.renderNumberTrHtml(t)+"</thead>":"")+"</table></div></div>"},getIsNumbersVisible:function(){return this.getIsDayNumbersVisible()||this.cellWeekNumbersVisible},getIsDayNumbersVisible:function(){return this.rowCnt>1},renderNumberTrHtml:function(t){return"<tr>"+(this.isRTL?"":this.renderNumberIntroHtml(t))+this.renderNumberCellsHtml(t)+(this.isRTL?this.renderNumberIntroHtml(t):"")+"</tr>"},renderNumberIntroHtml:function(t){return this.renderIntroHtml()},renderNumberCellsHtml:function(t){var e,n,i=[];for(e=0;e<this.colCnt;e++)n=this.getCellDate(t,e),i.push(this.renderNumberCellHtml(n));return i.join("")},renderNumberCellHtml:function(t){var e,n,i=this.view,r="",s=this.dateProfile.activeUnzonedRange.containsDate(t),o=this.getIsDayNumbersVisible()&&s;return o||this.cellWeekNumbersVisible?(e=this.getDayClasses(t),e.unshift("fc-day-top"),this.cellWeekNumbersVisible&&(n="ISO"===t._locale._fullCalendar_weekCalc?1:t._locale.firstDayOfWeek()),r+='<td class="'+e.join(" ")+'"'+(s?' data-date="'+t.format()+'"':"")+">",this.cellWeekNumbersVisible&&t.day()==n&&(r+=i.buildGotoAnchorHtml({date:t,type:"week"},{class:"fc-week-number"},t.format("w"))),o&&(r+=i.buildGotoAnchorHtml(t,{class:"fc-day-number"},t.date())),r+="</td>"):"<td/>"},prepareHits:function(){this.colCoordCache.build(),this.rowCoordCache.build(),this.rowCoordCache.bottoms[this.rowCnt-1]+=this.bottomCoordPadding},releaseHits:function(){this.colCoordCache.clear(),this.rowCoordCache.clear()},queryHit:function(t,e){if(this.colCoordCache.isLeftInBounds(t)&&this.rowCoordCache.isTopInBounds(e)){var n=this.colCoordCache.getHorizontalIndex(t),i=this.rowCoordCache.getVerticalIndex(e);if(null!=i&&null!=n)return this.getCellHit(i,n)}},getHitFootprint:function(t){var e=this.getCellRange(t.row,t.col);return new We(new Ue(e.start,e.end),!0)},getHitEl:function(t){return this.getCellEl(t.row,t.col)},getCellHit:function(t,e){return{row:t,col:e,component:this,left:this.colCoordCache.getLeftOffset(e),right:this.colCoordCache.getRightOffset(e),top:this.rowCoordCache.getTopOffset(t),bottom:this.rowCoordCache.getBottomOffset(t)}},getCellEl:function(t,e){return this.cellEls.eq(t*this.colCnt+e)},unrenderEvents:function(){this.removeSegPopover(),ke.prototype.unrenderEvents.apply(this,arguments)},getOwnEventSegs:function(){return ke.prototype.getOwnEventSegs.apply(this,arguments).concat(this.popoverSegs||[])},renderDrag:function(t,e,n){var i;for(i=0;i<t.length;i++)this.renderHighlight(t[i].componentFootprint);if(t.length&&e&&e.component!==this)return this.helperRenderer.renderEventDraggingFootprints(t,e,n),!0},unrenderDrag:function(t){this.unrenderHighlight(),this.helperRenderer.unrender()},renderEventResize:function(t,e,n){var i;for(i=0;i<t.length;i++)this.renderHighlight(t[i].componentFootprint);this.helperRenderer.renderEventResizingFootprints(t,e,n)},unrenderEventResize:function(t){this.unrenderHighlight(),this.helperRenderer.unrender()}});wn.mixin({segPopover:null,popoverSegs:null,removeSegPopover:function(){this.segPopover&&this.segPopover.hide()},limitRows:function(t){var e,n,i=this.eventRenderer.rowStructs||[];for(e=0;e<i.length;e++)this.unlimitRow(e),!1!==(n=!!t&&("number"==typeof t?t:this.computeRowLevelLimit(e)))&&this.limitRow(e,n)},computeRowLevelLimit:function(e){function n(e,n){s=Math.max(s,t(n).outerHeight())}var i,r,s,o=this.rowEls.eq(e),a=o.height(),l=this.eventRenderer.rowStructs[e].tbodyEl.children();for(i=0;i<l.length;i++)if(r=l.eq(i).removeClass("fc-limited"),s=0,r.find("> td > :first-child").each(n),r.position().top+s>a)return i;return!1},limitRow:function(e,n){function i(i){for(;E<i;)u=w.getCellSegs(e,E,n),u.length&&(d=s[n-1][E],y=w.renderMoreLink(e,E,u),m=t("<div/>").append(y),d.append(m),b.push(m[0])),E++}var r,s,o,a,l,u,c,h,d,f,g,p,v,m,y,w=this,D=this.eventRenderer.rowStructs[e],b=[],E=0;if(n&&n<D.segLevels.length){for(r=D.segLevels[n-1],s=D.cellMatrix,o=D.tbodyEl.children().slice(n).addClass("fc-limited").get(),a=0;a<r.length;a++){for(l=r[a],i(l.leftCol),h=[],c=0;E<=l.rightCol;)u=this.getCellSegs(e,E,n),h.push(u),c+=u.length,E++;if(c){for(d=s[n-1][l.leftCol],f=d.attr("rowspan")||1,g=[],p=0;p<h.length;p++)v=t('<td class="fc-more-cell"/>').attr("rowspan",f),u=h[p],y=this.renderMoreLink(e,l.leftCol+p,[l].concat(u)),m=t("<div/>").append(y),v.append(m),g.push(v[0]),b.push(v[0]);d.addClass("fc-limited").after(t(g)),o.push(d[0])}}i(this.colCnt),D.moreEls=t(b),D.limitedEls=t(o)}},unlimitRow:function(t){var e=this.eventRenderer.rowStructs[t];e.moreEls&&(e.moreEls.remove(),e.moreEls=null),e.limitedEls&&(e.limitedEls.removeClass("fc-limited"),e.limitedEls=null)},renderMoreLink:function(e,n,i){var r=this,s=this.view;return t('<a class="fc-more"/>').text(this.getMoreLinkText(i.length)).on("click",function(o){var a=r.opt("eventLimitClick"),l=r.getCellDate(e,n),u=t(this),c=r.getCellEl(e,n),h=r.getCellSegs(e,n),d=r.resliceDaySegs(h,l),f=r.resliceDaySegs(i,l);"function"==typeof a&&(a=r.publiclyTrigger("eventLimitClick",{context:s,args:[{date:l.clone(),dayEl:c,moreEl:u,segs:d,hiddenSegs:f},o,s]})),"popover"===a?r.showSegPopover(e,n,u,d):"string"==typeof a&&s.calendar.zoomTo(l,a)})},showSegPopover:function(t,e,n,i){var r,s,o=this,a=this.view,l=n.parent();r=1==this.rowCnt?a.el:this.rowEls.eq(t),s={className:"fc-more-popover "+a.calendar.theme.getClass("popover"),content:this.renderSegPopoverContent(t,e,i),parentEl:a.el,top:r.offset().top,autoHide:!0,viewportConstrain:this.opt("popoverViewportConstrain"),hide:function(){o.popoverSegs&&o.triggerBeforeEventSegsDestroyed(o.popoverSegs),o.segPopover.removeElement(),o.segPopover=null,o.popoverSegs=null}},this.isRTL?s.right=l.offset().left+l.outerWidth()+1:s.left=l.offset().left-1,this.segPopover=new fe(s),this.segPopover.show(),this.bindAllSegHandlersToEl(this.segPopover.el),this.triggerAfterEventSegsRendered(i)},renderSegPopoverContent:function(e,n,i){var r,s=this.view,o=s.calendar.theme,a=this.getCellDate(e,n).format(this.opt("dayPopoverFormat")),l=t('<div class="fc-header '+o.getClass("popoverHeader")+'"><span class="fc-close '+o.getIconClass("close")+'"></span><span class="fc-title">'+et(a)+'</span><div class="fc-clear"/></div><div class="fc-body '+o.getClass("popoverContent")+'"><div class="fc-event-container"></div></div>'),u=l.find(".fc-event-container");for(i=this.eventRenderer.renderFgSegEls(i,!0),this.popoverSegs=i,r=0;r<i.length;r++)this.hitsNeeded(),i[r].hit=this.getCellHit(e,n),this.hitsNotNeeded(),u.append(i[r].el);return l},resliceDaySegs:function(e,n){var i,r,s,o=n.clone(),a=o.clone().add(1,"days"),l=new Ue(o,a),u=[];for(i=0;i<e.length;i++)r=e[i],(s=r.footprint.componentFootprint.unzonedRange.intersect(l))&&u.push(t.extend({},r,{footprint:new nn(new We(s,r.footprint.componentFootprint.isAllDay),r.footprint.eventDef,r.footprint.eventInstance),isStart:r.isStart&&s.isStart,isEnd:r.isEnd&&s.isEnd}));return this.eventRenderer.sortEventSegs(u),u},getMoreLinkText:function(t){var e=this.opt("eventLimitText");return"function"==typeof e?e(t):"+"+t+" "+e},getCellSegs:function(t,e,n){for(var i,r=this.eventRenderer.rowStructs[t].segMatrix,s=n||0,o=[];s<r.length;)i=r[s][e],i&&o.push(i),s++;return o}});var Dn=Wt.BasicView=Ae.extend({scroller:null,dayGridClass:wn,dayGrid:null,weekNumberWidth:null,constructor:function(){Ae.apply(this,arguments),this.dayGrid=this.instantiateDayGrid(),this.dayGrid.isRigid=this.hasRigidRows(),this.opt("weekNumbers")&&(this.opt("weekNumbersWithinDays")?(this.dayGrid.cellWeekNumbersVisible=!0,this.dayGrid.colWeekNumbersVisible=!1):(this.dayGrid.cellWeekNumbersVisible=!1,this.dayGrid.colWeekNumbersVisible=!0)),this.addChild(this.dayGrid),this.scroller=new we({overflowX:"hidden",overflowY:"auto"})},instantiateDayGrid:function(){return new(this.dayGridClass.extend(bn))(this)},buildRenderRange:function(t,e,n){var i=Ae.prototype.buildRenderRange.apply(this,arguments),r=this.calendar.msToUtcMoment(i.startMs,n),s=this.calendar.msToUtcMoment(i.endMs,n);return/^(year|month)$/.test(e)&&(r.startOf("week"),s.weekday()&&s.add(1,"week").startOf("week")),new Ue(r,s)},executeDateRender:function(t){this.dayGrid.breakOnWeeks=/year|month|week/.test(t.currentRangeUnit),Ae.prototype.executeDateRender.apply(this,arguments)},renderSkeleton:function(){var e,n;this.el.addClass("fc-basic-view").html(this.renderSkeletonHtml()),this.scroller.render(),e=this.scroller.el.addClass("fc-day-grid-container"),n=t('<div class="fc-day-grid" />').appendTo(e),this.el.find(".fc-body > tr > td").append(e),this.dayGrid.headContainerEl=this.el.find(".fc-head-container"),this.dayGrid.setElement(n)},unrenderSkeleton:function(){this.dayGrid.removeElement(),this.scroller.destroy()},renderSkeletonHtml:function(){var t=this.calendar.theme;return'<table class="'+t.getClass("tableGrid")+'">'+(this.opt("columnHeader")?'<thead class="fc-head"><tr><td class="fc-head-container '+t.getClass("widgetHeader")+'">&nbsp;</td></tr></thead>':"")+'<tbody class="fc-body"><tr><td class="'+t.getClass("widgetContent")+'"></td></tr></tbody></table>'},weekNumberStyleAttr:function(){return null!==this.weekNumberWidth?'style="width:'+this.weekNumberWidth+'px"':""},hasRigidRows:function(){var t=this.opt("eventLimit");return t&&"number"!=typeof t},updateSize:function(t,e,n){var s,o,a=this.opt("eventLimit"),l=this.dayGrid.headContainerEl.find(".fc-row");if(!this.dayGrid.rowEls)return void(e||(s=this.computeScrollerHeight(t),this.scroller.setHeight(s)));Ae.prototype.updateSize.apply(this,arguments),this.dayGrid.colWeekNumbersVisible&&(this.weekNumberWidth=u(this.el.find(".fc-week-number"))),this.scroller.clear(),r(l),this.dayGrid.removeSegPopover(),a&&"number"==typeof a&&this.dayGrid.limitRows(a),s=this.computeScrollerHeight(t),this.setGridHeight(s,e),a&&"number"!=typeof a&&this.dayGrid.limitRows(a),e||(this.scroller.setHeight(s),o=this.scroller.getScrollbarWidths(),(o.left||o.right)&&(i(l,o),s=this.computeScrollerHeight(t),this.scroller.setHeight(s)),this.scroller.lockOverflow(o))},computeScrollerHeight:function(t){return t-c(this.el,this.scroller.el)},setGridHeight:function(t,e){e?l(this.dayGrid.rowEls):a(this.dayGrid.rowEls,t,!0)},computeInitialDateScroll:function(){return{top:0}},queryDateScroll:function(){return{top:this.scroller.getScrollTop()}},applyDateScroll:function(t){void 0!==t.top&&this.scroller.setScrollTop(t.top)}}),bn={colWeekNumbersVisible:!1,renderHeadIntroHtml:function(){var t=this.view;return this.colWeekNumbersVisible?'<th class="fc-week-number '+t.calendar.theme.getClass("widgetHeader")+'" '+t.weekNumberStyleAttr()+"><span>"+et(this.opt("weekNumberTitle"))+"</span></th>":""},renderNumberIntroHtml:function(t){var e=this.view,n=this.getCellDate(t,0);return this.colWeekNumbersVisible?'<td class="fc-week-number" '+e.weekNumberStyleAttr()+">"+e.buildGotoAnchorHtml({date:n,type:"week",forceOff:1===this.colCnt},n.format("w"))+"</td>":""},renderBgIntroHtml:function(){var t=this.view;return this.colWeekNumbersVisible?'<td class="fc-week-number '+t.calendar.theme.getClass("widgetContent")+'" '+t.weekNumberStyleAttr()+"></td>":""},renderIntroHtml:function(){var t=this.view
;return this.colWeekNumbersVisible?'<td class="fc-week-number" '+t.weekNumberStyleAttr()+"></td>":""},getIsNumbersVisible:function(){return wn.prototype.getIsNumbersVisible.apply(this,arguments)||this.colWeekNumbersVisible}},En=Wt.MonthView=Dn.extend({buildRenderRange:function(t,e,n){var i,r=Dn.prototype.buildRenderRange.apply(this,arguments),s=this.calendar.msToUtcMoment(r.startMs,n),o=this.calendar.msToUtcMoment(r.endMs,n);return this.isFixedWeeks()&&(i=Math.ceil(o.diff(s,"weeks",!0)),o.add(6-i,"weeks")),new Ue(s,o)},setGridHeight:function(t,e){e&&(t*=this.rowCnt/6),a(this.dayGrid.rowEls,t,!e)},isFixedWeeks:function(){return this.opt("fixedWeekCount")},isDateInOtherMonth:function(t,n){return t.month()!==e.utc(n.currentUnzonedRange.startMs).month()}});_t.basic={class:Dn},_t.basicDay={type:"basic",duration:{days:1}},_t.basicWeek={type:"basic",duration:{weeks:1}},_t.month={class:En,duration:{months:1},defaults:{fixedWeekCount:!0}};var Sn=xe.extend({attachSegEls:function(t,e){var n,i=this.component;return"bgEvent"===t?n=i.bgContainerEls:"businessHours"===t?n=i.businessContainerEls:"highlight"===t&&(n=i.highlightContainerEls),i.updateSegVerticals(e),i.attachSegsByCol(i.groupSegsByCol(e),n),e.map(function(t){return t.el[0]})}}),Cn=He.extend({timeGrid:null,constructor:function(t){He.apply(this,arguments),this.timeGrid=t},renderFgSegs:function(t){this.renderFgSegsIntoContainers(t,this.timeGrid.fgContainerEls)},renderFgSegsIntoContainers:function(t,e){var n,i;for(n=this.timeGrid.groupSegsByCol(t),i=0;i<this.timeGrid.colCnt;i++)this.updateFgSegCoords(n[i]);this.timeGrid.attachSegsByCol(n,e)},unrenderFgSegs:function(){this.fgSegs&&this.fgSegs.forEach(function(t){t.el.remove()})},computeEventTimeFormat:function(){return this.opt("noMeridiemTimeFormat")},computeDisplayEventEnd:function(){return!0},fgSegHtml:function(t,e){var n,i,r,s=this.view,o=s.calendar,a=t.footprint.componentFootprint,l=a.isAllDay,u=t.footprint.eventDef,c=s.isEventDefDraggable(u),h=!e&&t.isStart&&s.isEventDefResizableFromStart(u),d=!e&&t.isEnd&&s.isEventDefResizableFromEnd(u),f=this.getSegClasses(t,c,h||d),g=it(this.getSkinCss(u));if(f.unshift("fc-time-grid-event","fc-v-event"),s.isMultiDayRange(a.unzonedRange)){if(t.isStart||t.isEnd){var p=o.msToMoment(t.startMs),v=o.msToMoment(t.endMs);n=this._getTimeText(p,v,l),i=this._getTimeText(p,v,l,"LT"),r=this._getTimeText(p,v,l,null,!1)}}else n=this.getTimeText(t.footprint),i=this.getTimeText(t.footprint,"LT"),r=this.getTimeText(t.footprint,null,!1);return'<a class="'+f.join(" ")+'"'+(u.url?' href="'+et(u.url)+'"':"")+(g?' style="'+g+'"':"")+'><div class="fc-content">'+(n?'<div class="fc-time" data-start="'+et(r)+'" data-full="'+et(i)+'"><span>'+et(n)+"</span></div>":"")+(u.title?'<div class="fc-title">'+et(u.title)+"</div>":"")+'</div><div class="fc-bg"/>'+(d?'<div class="fc-resizer fc-end-resizer" />':"")+"</a>"},updateFgSegCoords:function(t){this.timeGrid.computeSegVerticals(t),this.computeFgSegHorizontals(t),this.timeGrid.assignSegVerticals(t),this.assignFgSegHorizontals(t)},computeFgSegHorizontals:function(t){var e,n,i;if(this.sortEventSegs(t),e=Lt(t),Ot(e),n=e[0]){for(i=0;i<n.length;i++)Nt(n[i]);for(i=0;i<n.length;i++)this.computeFgSegForwardBack(n[i],0,0)}},computeFgSegForwardBack:function(t,e,n){var i,r=t.forwardSegs;if(void 0===t.forwardCoord)for(r.length?(this.sortForwardSegs(r),this.computeFgSegForwardBack(r[0],e+1,n),t.forwardCoord=r[0].backwardCoord):t.forwardCoord=1,t.backwardCoord=t.forwardCoord-(t.forwardCoord-n)/(e+1),i=0;i<r.length;i++)this.computeFgSegForwardBack(r[i],0,t.forwardCoord)},sortForwardSegs:function(t){t.sort(lt(this,"compareForwardSegs"))},compareForwardSegs:function(t,e){return e.forwardPressure-t.forwardPressure||(t.backwardCoord||0)-(e.backwardCoord||0)||this.compareEventSegs(t,e)},assignFgSegHorizontals:function(t){var e,n;for(e=0;e<t.length;e++)n=t[e],n.el.css(this.generateFgSegHorizontalCss(n)),n.bottom-n.top<30&&n.el.addClass("fc-short")},generateFgSegHorizontalCss:function(t){var e,n,i=this.opt("slotEventOverlap"),r=t.backwardCoord,s=t.forwardCoord,o=this.timeGrid.generateSegVerticalCss(t);return i&&(s=Math.min(1,r+2*(s-r))),this.timeGrid.isRTL?(e=1-s,n=r):(e=r,n=1-s),o.zIndex=t.level+1,o.left=100*e+"%",o.right=100*n+"%",i&&t.forwardPressure&&(o[this.isRTL?"marginLeft":"marginRight"]=20),o}}),Rn=Pe.extend({renderSegs:function(e,n){var i,r,s,o=[];for(this.eventRenderer.renderFgSegsIntoContainers(e,this.component.helperContainerEls),i=0;i<e.length;i++)r=e[i],n&&n.col===r.col&&(s=n.el,r.el.css({left:s.css("left"),right:s.css("right"),"margin-left":s.css("margin-left"),"margin-right":s.css("margin-right")})),o.push(r.el[0]);return t(o)}}),Tn=Wt.TimeGrid=ke.extend(Ie,Be,{eventRendererClass:Cn,businessHourRendererClass:Me,helperRendererClass:Rn,fillRendererClass:Sn,view:null,helperRenderer:null,dayRanges:null,slotDuration:null,snapDuration:null,snapsPerSlot:null,labelFormat:null,labelInterval:null,headContainerEl:null,colEls:null,slatContainerEl:null,slatEls:null,nowIndicatorEls:null,colCoordCache:null,slatCoordCache:null,bottomRuleEl:null,colContainerEls:null,fgContainerEls:null,bgContainerEls:null,helperContainerEls:null,highlightContainerEls:null,businessContainerEls:null,helperSegs:null,highlightSegs:null,businessSegs:null,constructor:function(t){this.view=t,ke.call(this),this.processOptions()},componentFootprintToSegs:function(t){var e,n=this.sliceRangeByTimes(t.unzonedRange);for(e=0;e<n.length;e++)this.isRTL?n[e].col=this.daysPerRow-1-n[e].dayIndex:n[e].col=n[e].dayIndex;return n},sliceRangeByTimes:function(t){var e,n,i=[];for(n=0;n<this.daysPerRow;n++)(e=t.intersect(this.dayRanges[n]))&&i.push({startMs:e.startMs,endMs:e.endMs,isStart:e.isStart,isEnd:e.isEnd,dayIndex:n});return i},processOptions:function(){var n,i=this.opt("slotDuration"),r=this.opt("snapDuration");i=e.duration(i),r=r?e.duration(r):i,this.slotDuration=i,this.snapDuration=r,this.snapsPerSlot=i/r,n=this.opt("slotLabelFormat"),t.isArray(n)&&(n=n[n.length-1]),this.labelFormat=n||this.opt("smallTimeFormat"),n=this.opt("slotLabelInterval"),this.labelInterval=n?e.duration(n):this.computeLabelInterval(i)},computeLabelInterval:function(t){var n,i,r;for(n=Pn.length-1;n>=0;n--)if(i=e.duration(Pn[n]),r=U(i,t),at(r)&&r>1)return i;return e.duration(t)},renderDates:function(t){this.dateProfile=t,this.updateDayTable(),this.renderSlats(),this.renderColumns()},renderSkeleton:function(){var t=this.view.calendar.theme;this.el.html('<div class="fc-bg"></div><div class="fc-slats"></div><hr class="fc-divider '+t.getClass("widgetHeader")+'" style="display:none" />'),this.bottomRuleEl=this.el.find("hr")},renderSlats:function(){var t=this.view.calendar.theme;this.slatContainerEl=this.el.find("> .fc-slats").html('<table class="'+t.getClass("tableGrid")+'">'+this.renderSlatRowHtml()+"</table>"),this.slatEls=this.slatContainerEl.find("tr"),this.slatCoordCache=new ge({els:this.slatEls,isVertical:!0})},renderSlatRowHtml:function(){for(var t,n,i,r=this.view,s=r.calendar,o=s.theme,a=this.isRTL,l=this.dateProfile,u="",c=e.duration(+l.minTime),h=e.duration(0);c<l.maxTime;)t=s.msToUtcMoment(l.renderUnzonedRange.startMs).time(c),n=at(U(h,this.labelInterval)),i='<td class="fc-axis fc-time '+o.getClass("widgetContent")+'" '+r.axisStyleAttr()+">"+(n?"<span>"+et(t.format(this.labelFormat))+"</span>":"")+"</td>",u+='<tr data-time="'+t.format("HH:mm:ss")+'"'+(n?"":' class="fc-minor"')+">"+(a?"":i)+'<td class="'+o.getClass("widgetContent")+'"/>'+(a?i:"")+"</tr>",c.add(this.slotDuration),h.add(this.slotDuration);return u},renderColumns:function(){var t=this.dateProfile,e=this.view.calendar.theme;this.dayRanges=this.dayDates.map(function(e){return new Ue(e.clone().add(t.minTime),e.clone().add(t.maxTime))}),this.headContainerEl&&this.headContainerEl.html(this.renderHeadHtml()),this.el.find("> .fc-bg").html('<table class="'+e.getClass("tableGrid")+'">'+this.renderBgTrHtml(0)+"</table>"),this.colEls=this.el.find(".fc-day, .fc-disabled-day"),this.colCoordCache=new ge({els:this.colEls,isHorizontal:!0}),this.renderContentSkeleton()},renderContentSkeleton:function(){var e,n,i="";for(e=0;e<this.colCnt;e++)i+='<td><div class="fc-content-col"><div class="fc-event-container fc-helper-container"></div><div class="fc-event-container"></div><div class="fc-highlight-container"></div><div class="fc-bgevent-container"></div><div class="fc-business-container"></div></div></td>';n=t('<div class="fc-content-skeleton"><table><tr>'+i+"</tr></table></div>"),this.colContainerEls=n.find(".fc-content-col"),this.helperContainerEls=n.find(".fc-helper-container"),this.fgContainerEls=n.find(".fc-event-container:not(.fc-helper-container)"),this.bgContainerEls=n.find(".fc-bgevent-container"),this.highlightContainerEls=n.find(".fc-highlight-container"),this.businessContainerEls=n.find(".fc-business-container"),this.bookendCells(n.find("tr")),this.el.append(n)},groupSegsByCol:function(t){var e,n=[];for(e=0;e<this.colCnt;e++)n.push([]);for(e=0;e<t.length;e++)n[t[e].col].push(t[e]);return n},attachSegsByCol:function(t,e){var n,i,r;for(n=0;n<this.colCnt;n++)for(i=t[n],r=0;r<i.length;r++)e.eq(n).append(i[r].el)},getNowIndicatorUnit:function(){return"minute"},renderNowIndicator:function(e){var n,i=this.componentFootprintToSegs(new We(new Ue(e,e.valueOf()+1),!1)),r=this.computeDateTop(e,e),s=[];for(n=0;n<i.length;n++)s.push(t('<div class="fc-now-indicator fc-now-indicator-line"></div>').css("top",r).appendTo(this.colContainerEls.eq(i[n].col))[0]);i.length>0&&s.push(t('<div class="fc-now-indicator fc-now-indicator-arrow"></div>').css("top",r).appendTo(this.el.find(".fc-content-skeleton"))[0]),this.nowIndicatorEls=t(s)},unrenderNowIndicator:function(){this.nowIndicatorEls&&(this.nowIndicatorEls.remove(),this.nowIndicatorEls=null)},updateSize:function(t,e,n){ke.prototype.updateSize.apply(this,arguments),this.slatCoordCache.build(),n&&this.updateSegVerticals([].concat(this.eventRenderer.getSegs(),this.businessSegs||[]))},getTotalSlatHeight:function(){return this.slatContainerEl.outerHeight()},computeDateTop:function(t,n){return this.computeTimeTop(e.duration(t-n.clone().stripTime()))},computeTimeTop:function(t){var e,n,i=this.slatEls.length,r=this.dateProfile,s=(t-r.minTime)/this.slotDuration;return s=Math.max(0,s),s=Math.min(i,s),e=Math.floor(s),e=Math.min(e,i-1),n=s-e,this.slatCoordCache.getTopPosition(e)+this.slatCoordCache.getHeight(e)*n},updateSegVerticals:function(t){this.computeSegVerticals(t),this.assignSegVerticals(t)},computeSegVerticals:function(t){var e,n,i,r=this.opt("agendaEventMinHeight");for(e=0;e<t.length;e++)n=t[e],i=this.dayDates[n.dayIndex],n.top=this.computeDateTop(n.startMs,i),n.bottom=Math.max(n.top+r,this.computeDateTop(n.endMs,i))},assignSegVerticals:function(t){var e,n;for(e=0;e<t.length;e++)n=t[e],n.el.css(this.generateSegVerticalCss(n))},generateSegVerticalCss:function(t){return{top:t.top,bottom:-t.bottom}},prepareHits:function(){this.colCoordCache.build(),this.slatCoordCache.build()},releaseHits:function(){this.colCoordCache.clear()},queryHit:function(t,e){var n=this.snapsPerSlot,i=this.colCoordCache,r=this.slatCoordCache;if(i.isLeftInBounds(t)&&r.isTopInBounds(e)){var s=i.getHorizontalIndex(t),o=r.getVerticalIndex(e);if(null!=s&&null!=o){var a=r.getTopOffset(o),l=r.getHeight(o),u=(e-a)/l,c=Math.floor(u*n),h=o*n+c,d=a+c/n*l,f=a+(c+1)/n*l;return{col:s,snap:h,component:this,left:i.getLeftOffset(s),right:i.getRightOffset(s),top:d,bottom:f}}}},getHitFootprint:function(t){var e,n=this.getCellDate(0,t.col),i=this.computeSnapTime(t.snap);return n.time(i),e=n.clone().add(this.snapDuration),new We(new Ue(n,e),!1)},computeSnapTime:function(t){return e.duration(this.dateProfile.minTime+this.snapDuration*t)},getHitEl:function(t){return this.colEls.eq(t.col)},renderDrag:function(t,e,n){var i;if(e){if(t.length)return this.helperRenderer.renderEventDraggingFootprints(t,e,n),!0}else for(i=0;i<t.length;i++)this.renderHighlight(t[i].componentFootprint)},unrenderDrag:function(t){this.unrenderHighlight(),this.helperRenderer.unrender()},renderEventResize:function(t,e,n){this.helperRenderer.renderEventResizingFootprints(t,e,n)},unrenderEventResize:function(t){this.helperRenderer.unrender()},renderSelectionFootprint:function(t){this.opt("selectHelper")?this.helperRenderer.renderComponentFootprint(t):this.renderHighlight(t)},unrenderSelection:function(){this.helperRenderer.unrender(),this.unrenderHighlight()}}),In=Wt.AgendaView=Ae.extend({scroller:null,timeGridClass:Tn,timeGrid:null,dayGridClass:wn,dayGrid:null,axisWidth:null,usesMinMaxTime:!0,constructor:function(){Ae.apply(this,arguments),this.timeGrid=this.instantiateTimeGrid(),this.addChild(this.timeGrid),this.opt("allDaySlot")&&(this.dayGrid=this.instantiateDayGrid(),this.addChild(this.dayGrid)),this.scroller=new we({overflowX:"hidden",overflowY:"auto"})},instantiateTimeGrid:function(){return new(this.timeGridClass.extend(Hn))(this)},instantiateDayGrid:function(){return new(this.dayGridClass.extend(Mn))(this)},renderSkeleton:function(){var e,n;this.el.addClass("fc-agenda-view").html(this.renderSkeletonHtml()),this.scroller.render(),e=this.scroller.el.addClass("fc-time-grid-container"),n=t('<div class="fc-time-grid" />').appendTo(e),this.el.find(".fc-body > tr > td").append(e),this.timeGrid.headContainerEl=this.el.find(".fc-head-container"),this.timeGrid.setElement(n),this.dayGrid&&(this.dayGrid.setElement(this.el.find(".fc-day-grid")),this.dayGrid.bottomCoordPadding=this.dayGrid.el.next("hr").outerHeight())},unrenderSkeleton:function(){this.timeGrid.removeElement(),this.dayGrid&&this.dayGrid.removeElement(),this.scroller.destroy()},renderSkeletonHtml:function(){var t=this.calendar.theme;return'<table class="'+t.getClass("tableGrid")+'">'+(this.opt("columnHeader")?'<thead class="fc-head"><tr><td class="fc-head-container '+t.getClass("widgetHeader")+'">&nbsp;</td></tr></thead>':"")+'<tbody class="fc-body"><tr><td class="'+t.getClass("widgetContent")+'">'+(this.dayGrid?'<div class="fc-day-grid"/><hr class="fc-divider '+t.getClass("widgetHeader")+'"/>':"")+"</td></tr></tbody></table>"},axisStyleAttr:function(){return null!==this.axisWidth?'style="width:'+this.axisWidth+'px"':""},getNowIndicatorUnit:function(){return this.timeGrid.getNowIndicatorUnit()},updateSize:function(t,e,n){var s,o,a;if(Ae.prototype.updateSize.apply(this,arguments),this.axisWidth=u(this.el.find(".fc-axis")),!this.timeGrid.colEls)return void(e||(o=this.computeScrollerHeight(t),this.scroller.setHeight(o)));var l=this.el.find(".fc-row:not(.fc-scroller *)");this.timeGrid.bottomRuleEl.hide(),this.scroller.clear(),r(l),this.dayGrid&&(this.dayGrid.removeSegPopover(),s=this.opt("eventLimit"),s&&"number"!=typeof s&&(s=xn),s&&this.dayGrid.limitRows(s)),e||(o=this.computeScrollerHeight(t),this.scroller.setHeight(o),a=this.scroller.getScrollbarWidths(),(a.left||a.right)&&(i(l,a),o=this.computeScrollerHeight(t),this.scroller.setHeight(o)),this.scroller.lockOverflow(a),this.timeGrid.getTotalSlatHeight()<o&&this.timeGrid.bottomRuleEl.show())},computeScrollerHeight:function(t){return t-c(this.el,this.scroller.el)},computeInitialDateScroll:function(){var t=e.duration(this.opt("scrollTime")),n=this.timeGrid.computeTimeTop(t);return n=Math.ceil(n),n&&n++,{top:n}},queryDateScroll:function(){return{top:this.scroller.getScrollTop()}},applyDateScroll:function(t){void 0!==t.top&&this.scroller.setScrollTop(t.top)},getHitFootprint:function(t){return t.component.getHitFootprint(t)},getHitEl:function(t){return t.component.getHitEl(t)},executeEventRender:function(t){var e,n,i={},r={};for(e in t)n=t[e],n.getEventDef().isAllDay()?i[e]=n:r[e]=n;this.timeGrid.executeEventRender(r),this.dayGrid&&this.dayGrid.executeEventRender(i)},renderDrag:function(t,e,n){var i=Ut(t),r=!1;return r=this.timeGrid.renderDrag(i.timed,e,n),this.dayGrid&&(r=this.dayGrid.renderDrag(i.allDay,e,n)||r),r},renderEventResize:function(t,e,n){var i=Ut(t);this.timeGrid.renderEventResize(i.timed,e,n),this.dayGrid&&this.dayGrid.renderEventResize(i.allDay,e,n)},renderSelectionFootprint:function(t){t.isAllDay?this.dayGrid&&this.dayGrid.renderSelectionFootprint(t):this.timeGrid.renderSelectionFootprint(t)}}),Hn={renderHeadIntroHtml:function(){var t,e=this.view,n=e.calendar,i=n.msToUtcMoment(this.dateProfile.renderUnzonedRange.startMs,!0);return this.opt("weekNumbers")?(t=i.format(this.opt("smallWeekFormat")),'<th class="fc-axis fc-week-number '+n.theme.getClass("widgetHeader")+'" '+e.axisStyleAttr()+">"+e.buildGotoAnchorHtml({date:i,type:"week",forceOff:this.colCnt>1},et(t))+"</th>"):'<th class="fc-axis '+n.theme.getClass("widgetHeader")+'" '+e.axisStyleAttr()+"></th>"},renderBgIntroHtml:function(){var t=this.view;return'<td class="fc-axis '+t.calendar.theme.getClass("widgetContent")+'" '+t.axisStyleAttr()+"></td>"},renderIntroHtml:function(){return'<td class="fc-axis" '+this.view.axisStyleAttr()+"></td>"}},Mn={renderBgIntroHtml:function(){var t=this.view;return'<td class="fc-axis '+t.calendar.theme.getClass("widgetContent")+'" '+t.axisStyleAttr()+"><span>"+t.getAllDayHtml()+"</span></td>"},renderIntroHtml:function(){return'<td class="fc-axis" '+this.view.axisStyleAttr()+"></td>"}},xn=5,Pn=[{hours:1},{minutes:30},{minutes:15},{seconds:30},{seconds:15}];_t.agenda={class:In,defaults:{allDaySlot:!0,slotDuration:"00:30:00",slotEventOverlap:!0}},_t.agendaDay={type:"agenda",duration:{days:1}},_t.agendaWeek={type:"agenda",duration:{weeks:1}};var zn=Wt.ListView=Ae.extend({segSelector:".fc-list-item",scroller:null,contentEl:null,dayDates:null,dayRanges:null,constructor:function(){Ae.apply(this,arguments),this.scroller=new we({overflowX:"hidden",overflowY:"auto"})},renderSkeleton:function(){this.el.addClass("fc-list-view "+this.calendar.theme.getClass("listView")),this.scroller.render(),this.scroller.el.appendTo(this.el),this.contentEl=this.scroller.scrollEl},unrenderSkeleton:function(){this.scroller.destroy()},updateSize:function(t,e,n){this.scroller.setHeight(this.computeScrollerHeight(t))},computeScrollerHeight:function(t){return t-c(this.el,this.scroller.el)},renderDates:function(t){for(var e=this.calendar,n=e.msToUtcMoment(t.renderUnzonedRange.startMs,!0),i=e.msToUtcMoment(t.renderUnzonedRange.endMs,!0),r=[],s=[];n<i;)r.push(n.clone()),s.push(new Ue(n,n.clone().add(1,"day"))),n.add(1,"day");this.dayDates=r,this.dayRanges=s},componentFootprintToSegs:function(t){var e,n,i,r=this.dayRanges,s=[];for(e=0;e<r.length;e++)if((n=t.unzonedRange.intersect(r[e]))&&(i={startMs:n.startMs,endMs:n.endMs,isStart:n.isStart,isEnd:n.isEnd,dayIndex:e},s.push(i),!i.isEnd&&!t.isAllDay&&e+1<r.length&&t.unzonedRange.endMs<r[e+1].startMs+this.nextDayThreshold)){i.endMs=t.unzonedRange.endMs,i.isEnd=!0;break}return s},eventRendererClass:He.extend({renderFgSegs:function(t){t.length?this.component.renderSegList(t):this.component.renderEmptyMessage()},fgSegHtml:function(t){var e,n=this.view,i=n.calendar,r=i.theme,s=t.footprint,o=s.eventDef,a=s.componentFootprint,l=o.url,u=["fc-list-item"].concat(this.getClasses(o)),c=this.getBgColor(o);return e=a.isAllDay?n.getAllDayHtml():n.isMultiDayRange(a.unzonedRange)?t.isStart||t.isEnd?et(this._getTimeText(i.msToMoment(t.startMs),i.msToMoment(t.endMs),a.isAllDay)):n.getAllDayHtml():et(this.getTimeText(s)),l&&u.push("fc-has-url"),'<tr class="'+u.join(" ")+'">'+(this.displayEventTime?'<td class="fc-list-item-time '+r.getClass("widgetContent")+'">'+(e||"")+"</td>":"")+'<td class="fc-list-item-marker '+r.getClass("widgetContent")+'"><span class="fc-event-dot"'+(c?' style="background-color:'+c+'"':"")+'></span></td><td class="fc-list-item-title '+r.getClass("widgetContent")+'"><a'+(l?' href="'+et(l)+'"':"")+">"+et(o.title||"")+"</a></td></tr>"},computeEventTimeFormat:function(){return this.opt("mediumTimeFormat")}}),eventPointingClass:Te.extend({handleClick:function(e,n){var i;Te.prototype.handleClick.apply(this,arguments),t(n.target).closest("a[href]").length||(i=e.footprint.eventDef.url)&&!n.isDefaultPrevented()&&(window.location.href=i)}}),renderEmptyMessage:function(){this.contentEl.html('<div class="fc-list-empty-wrap2"><div class="fc-list-empty-wrap1"><div class="fc-list-empty">'+et(this.opt("noEventsMessage"))+"</div></div></div>")},renderSegList:function(e){var n,i,r,s=this.groupSegsByDay(e),o=t('<table class="fc-list-table '+this.calendar.theme.getClass("tableList")+'"><tbody/></table>'),a=o.find("tbody");for(n=0;n<s.length;n++)if(i=s[n])for(a.append(this.dayHeaderHtml(this.dayDates[n])),this.eventRenderer.sortEventSegs(i),r=0;r<i.length;r++)a.append(i[r].el);this.contentEl.empty().append(o)},groupSegsByDay:function(t){var e,n,i=[];for(e=0;e<t.length;e++)n=t[e],(i[n.dayIndex]||(i[n.dayIndex]=[])).push(n);return i},dayHeaderHtml:function(t){var e=this.opt("listDayFormat"),n=this.opt("listDayAltFormat");return'<tr class="fc-list-heading" data-date="'+t.format("YYYY-MM-DD")+'"><td class="'+this.calendar.theme.getClass("widgetHeader")+'" colspan="3">'+(e?this.buildGotoAnchorHtml(t,{class:"fc-list-heading-main"},et(t.format(e))):"")+(n?this.buildGotoAnchorHtml(t,{class:"fc-list-heading-alt"},et(t.format(n))):"")+"</td></tr>"}});return _t.list={class:zn,buttonTextKey:"list",defaults:{buttonText:"list",listDayFormat:"LL",noEventsMessage:"No events to display"}},_t.listDay={type:"list",duration:{days:1},defaults:{listDayFormat:"dddd"}},_t.listWeek={type:"list",duration:{weeks:1},defaults:{listDayFormat:"dddd",listDayAltFormat:"LL"}},_t.listMonth={type:"list",duration:{month:1},defaults:{listDayAltFormat:"dddd"}},_t.listYear={type:"list",duration:{year:1},defaults:{listDayAltFormat:"dddd"}},Wt});
/*!
 * Scroll Lock v3.1.3
 * https://github.com/MohammadYounes/jquery-scrollLock
 *
 * Copyright (c) 2017 Mohammad Younes
 * Licensed under GPL 3.
 */

(function(n){typeof define=="function"&&define.amd?define(["jquery"],n):n(jQuery)})(function(n){"use strict";var i={space:32,pageup:33,pagedown:34,end:35,home:36,up:38,down:40},r=function(t,i){var u=i.scrollTop(),h=i.prop("scrollHeight"),c=i.prop("clientHeight"),f=t.originalEvent.wheelDelta||-1*t.originalEvent.detail||-1*t.originalEvent.deltaY,r=0,e,o,s;return t.type==="wheel"?(e=i.height()/n(window).height(),r=t.originalEvent.deltaY*e):this.options.touch&&t.type==="touchmove"&&(f=t.originalEvent.changedTouches[0].clientY-this.startClientY),s=(o=f>0&&u+r<=0)||f<0&&u+r>=h-c,{prevent:s,top:o,scrollTop:u,deltaY:r}},u=function(n,t){var u=t.scrollTop(),r={top:!1,bottom:!1},f,e;return r.top=u===0&&(n.keyCode===i.pageup||n.keyCode===i.home||n.keyCode===i.up),r.top||(f=t.prop("scrollHeight"),e=t.prop("clientHeight"),r.bottom=f===u+e&&(n.keyCode===i.space||n.keyCode===i.pagedown||n.keyCode===i.end||n.keyCode===i.down)),r},t=function(i,r){if(this.$element=i,this.options=n.extend({},t.DEFAULTS,this.$element.data(),r),this.enabled=!0,this.startClientY=0,this.options.unblock)this.$element.on(t.CORE.wheelEventName+t.NAMESPACE,this.options.unblock,n.proxy(t.CORE.unblockHandler,this));this.$element.on(t.CORE.wheelEventName+t.NAMESPACE,this.options.selector,n.proxy(t.CORE.handler,this));if(this.options.touch){this.$element.on("touchstart"+t.NAMESPACE,this.options.selector,n.proxy(t.CORE.touchHandler,this));this.$element.on("touchmove"+t.NAMESPACE,this.options.selector,n.proxy(t.CORE.handler,this));if(this.options.unblock)this.$element.on("touchmove"+t.NAMESPACE,this.options.unblock,n.proxy(t.CORE.unblockHandler,this))}if(this.options.keyboard){this.$element.attr("tabindex",this.options.keyboard.tabindex||0);this.$element.on("keydown"+t.NAMESPACE,this.options.selector,n.proxy(t.CORE.keyboardHandler,this));if(this.options.unblock)this.$element.on("keydown"+t.NAMESPACE,this.options.unblock,n.proxy(t.CORE.unblockHandler,this))}},f;t.NAME="ScrollLock";t.VERSION="3.1.2";t.NAMESPACE=".scrollLock";t.ANIMATION_NAMESPACE=t.NAMESPACE+".effect";t.DEFAULTS={strict:!1,strictFn:function(n){return n.prop("scrollHeight")>n.prop("clientHeight")},selector:!1,animation:!1,touch:"ontouchstart"in window,keyboard:!1,unblock:!1};t.CORE={wheelEventName:"onwheel"in document.createElement("div")?"wheel":document.onmousewheel!==undefined?"mousewheel":"DOMMouseScroll",animationEventName:["webkitAnimationEnd","mozAnimationEnd","MSAnimationEnd","oanimationend","animationend"].join(t.ANIMATION_NAMESPACE+" ")+t.ANIMATION_NAMESPACE,unblockHandler:function(n){n.__currentTarget=n.currentTarget},handler:function(i){var f,u,e;this.enabled&&!i.ctrlKey&&(f=n(i.currentTarget),(this.options.strict!==!0||this.options.strictFn(f))&&(i.stopPropagation(),u=n.proxy(r,this)(i,f),i.__currentTarget&&(u.prevent&=n.proxy(r,this)(i,n(i.__currentTarget)).prevent),u.prevent&&(i.preventDefault(),u.deltaY&&f.scrollTop(u.scrollTop+u.deltaY),e=u.top?"top":"bottom",this.options.animation&&setTimeout(t.CORE.animationHandler.bind(this,f,e),0),f.trigger(n.Event(e+t.NAMESPACE)))))},touchHandler:function(n){this.startClientY=n.originalEvent.touches[0].clientY},animationHandler:function(n,i){var r=this.options.animation[i],u=this.options.animation.top+" "+this.options.animation.bottom;n.off(t.ANIMATION_NAMESPACE).removeClass(u).addClass(r).one(t.CORE.animationEventName,function(){n.removeClass(r)})},keyboardHandler:function(i){var r=n(i.currentTarget),o=r.scrollTop(),f=u(i,r),e;return(i.__currentTarget&&(e=u(i,n(i.__currentTarget)),f.top&=e.top,f.bottom&=e.bottom),f.top)?(r.trigger(n.Event("top"+t.NAMESPACE)),this.options.animation&&setTimeout(t.CORE.animationHandler.bind(this,r,"top"),0),!1):f.bottom?(r.trigger(n.Event("bottom"+t.NAMESPACE)),this.options.animation&&setTimeout(t.CORE.animationHandler.bind(this,r,"bottom"),0),!1):void 0}};t.prototype.toggleStrict=function(){this.options.strict=!this.options.strict};t.prototype.enable=function(){this.enabled=!0};t.prototype.disable=function(){this.enabled=!1};t.prototype.destroy=function(){this.disable();this.$element.off(t.NAMESPACE);this.$element=null;this.options=null};f=n.fn.scrollLock;n.fn.scrollLock=function(i){return this.each(function(){var u=n(this),f=typeof i=="object"&&i,r=u.data(t.NAME);(r||"destroy"!==i)&&(r||u.data(t.NAME,r=new t(u,f)),typeof i=="string"&&r[i]())})};n.fn.scrollLock.defaults=t.DEFAULTS;n.fn.scrollLock.noConflict=function(){return n.fn.scrollLock=f,this}});
//# sourceMappingURL=jquery-scrollLock.min.js.map
;
/**!
 * easyPieChart
 * Lightweight plugin to render simple, animated and retina optimized pie charts
 *
 * @license 
 * @author Robert Fleischmann <rendro87@gmail.com> (http://robert-fleischmann.de)
 * @version 2.1.6
 **/

!function(a,b){"object"==typeof exports?module.exports=b(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],b):b(a.jQuery)}(this,function(a){var b=function(a,b){var c,d=document.createElement("canvas");a.appendChild(d),"undefined"!=typeof G_vmlCanvasManager&&G_vmlCanvasManager.initElement(d);var e=d.getContext("2d");d.width=d.height=b.size;var f=1;window.devicePixelRatio>1&&(f=window.devicePixelRatio,d.style.width=d.style.height=[b.size,"px"].join(""),d.width=d.height=b.size*f,e.scale(f,f)),e.translate(b.size/2,b.size/2),e.rotate((-0.5+b.rotate/180)*Math.PI);var g=(b.size-b.lineWidth)/2;b.scaleColor&&b.scaleLength&&(g-=b.scaleLength+2),Date.now=Date.now||function(){return+new Date};var h=function(a,b,c){c=Math.min(Math.max(-1,c||0),1);var d=0>=c?!0:!1;e.beginPath(),e.arc(0,0,g,0,2*Math.PI*c,d),e.strokeStyle=a,e.lineWidth=b,e.stroke()},i=function(){var a,c;e.lineWidth=1,e.fillStyle=b.scaleColor,e.save();for(var d=24;d>0;--d)d%6===0?(c=b.scaleLength,a=0):(c=.6*b.scaleLength,a=b.scaleLength-c),e.fillRect(-b.size/2+a,0,c,1),e.rotate(Math.PI/12);e.restore()},j=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(a){window.setTimeout(a,1e3/60)}}(),k=function(){b.scaleColor&&i(),b.trackColor&&h(b.trackColor,b.trackWidth||b.lineWidth,1)};this.getCanvas=function(){return d},this.getCtx=function(){return e},this.clear=function(){e.clearRect(b.size/-2,b.size/-2,b.size,b.size)},this.draw=function(a){b.scaleColor||b.trackColor?e.getImageData&&e.putImageData?c?e.putImageData(c,0,0):(k(),c=e.getImageData(0,0,b.size*f,b.size*f)):(this.clear(),k()):this.clear(),e.lineCap=b.lineCap;var d;d="function"==typeof b.barColor?b.barColor(a):b.barColor,h(d,b.lineWidth,a/100)}.bind(this),this.animate=function(a,c){var d=Date.now();b.onStart(a,c);var e=function(){var f=Math.min(Date.now()-d,b.animate.duration),g=b.easing(this,f,a,c-a,b.animate.duration);this.draw(g),b.onStep(a,c,g),f>=b.animate.duration?b.onStop(a,c):j(e)}.bind(this);j(e)}.bind(this)},c=function(a,c){var d={barColor:"#ef1e25",trackColor:"#f9f9f9",scaleColor:"#dfe0e0",scaleLength:5,lineCap:"round",lineWidth:3,trackWidth:void 0,size:110,rotate:0,animate:{duration:1e3,enabled:!0},easing:function(a,b,c,d,e){return b/=e/2,1>b?d/2*b*b+c:-d/2*(--b*(b-2)-1)+c},onStart:function(){},onStep:function(){},onStop:function(){}};if("undefined"!=typeof b)d.renderer=b;else{if("undefined"==typeof SVGRenderer)throw new Error("Please load either the SVG- or the CanvasRenderer");d.renderer=SVGRenderer}var e={},f=0,g=function(){this.el=a,this.options=e;for(var b in d)d.hasOwnProperty(b)&&(e[b]=c&&"undefined"!=typeof c[b]?c[b]:d[b],"function"==typeof e[b]&&(e[b]=e[b].bind(this)));e.easing="string"==typeof e.easing&&"undefined"!=typeof jQuery&&jQuery.isFunction(jQuery.easing[e.easing])?jQuery.easing[e.easing]:d.easing,"number"==typeof e.animate&&(e.animate={duration:e.animate,enabled:!0}),"boolean"!=typeof e.animate||e.animate||(e.animate={duration:1e3,enabled:e.animate}),this.renderer=new e.renderer(a,e),this.renderer.draw(f),a.dataset&&a.dataset.percent?this.update(parseFloat(a.dataset.percent)):a.getAttribute&&a.getAttribute("data-percent")&&this.update(parseFloat(a.getAttribute("data-percent")))}.bind(this);this.update=function(a){return a=parseFloat(a),e.animate.enabled?this.renderer.animate(f,a):this.renderer.draw(a),f=a,this}.bind(this),this.disableAnimation=function(){return e.animate.enabled=!1,this},this.enableAnimation=function(){return e.animate.enabled=!0,this},g()};a.fn.easyPieChart=function(b){return this.each(function(){var d;a.data(this,"easyPieChart")||(d=a.extend({},b,a(this).data()),a.data(this,"easyPieChart",new c(this,d)))})}});
/* Javascript plotting library for jQuery, version 0.8.3.

Copyright (c) 2007-2014 IOLA and Ole Laursen.
Licensed under the MIT license.

*/

// first an inline dependency, jquery.colorhelpers.js, we inline it here
// for convenience

/* Plugin for jQuery for working with colors.
 *
 * Version 1.1.
 *
 * Inspiration from jQuery color animation plugin by John Resig.
 *
 * Released under the MIT license by Ole Laursen, October 2009.
 *
 * Examples:
 *
 *   $.color.parse("#fff").scale('rgb', 0.25).add('a', -0.5).toString()
 *   var c = $.color.extract($("#mydiv"), 'background-color');
 *   console.log(c.r, c.g, c.b, c.a);
 *   $.color.make(100, 50, 25, 0.4).toString() // returns "rgba(100,50,25,0.4)"
 *
 * Note that .scale() and .add() return the same modified object
 * instead of making a new one.
 *
 * V. 1.1: Fix error handling so e.g. parsing an empty string does
 * produce a color rather than just crashing.
 */

(function($){$.color={};$.color.make=function(r,g,b,a){var o={};o.r=r||0;o.g=g||0;o.b=b||0;o.a=a!=null?a:1;o.add=function(c,d){for(var i=0;i<c.length;++i)o[c.charAt(i)]+=d;return o.normalize()};o.scale=function(c,f){for(var i=0;i<c.length;++i)o[c.charAt(i)]*=f;return o.normalize()};o.toString=function(){if(o.a>=1){return"rgb("+[o.r,o.g,o.b].join(",")+")"}else{return"rgba("+[o.r,o.g,o.b,o.a].join(",")+")"}};o.normalize=function(){function clamp(min,value,max){return value<min?min:value>max?max:value}o.r=clamp(0,parseInt(o.r),255);o.g=clamp(0,parseInt(o.g),255);o.b=clamp(0,parseInt(o.b),255);o.a=clamp(0,o.a,1);return o};o.clone=function(){return $.color.make(o.r,o.b,o.g,o.a)};return o.normalize()};$.color.extract=function(elem,css){var c;do{c=elem.css(css).toLowerCase();if(c!=""&&c!="transparent")break;elem=elem.parent()}while(elem.length&&!$.nodeName(elem.get(0),"body"));if(c=="rgba(0, 0, 0, 0)")c="transparent";return $.color.parse(c)};$.color.parse=function(str){var res,m=$.color.make;if(res=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(str))return m(parseInt(res[1],10),parseInt(res[2],10),parseInt(res[3],10));if(res=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(str))return m(parseInt(res[1],10),parseInt(res[2],10),parseInt(res[3],10),parseFloat(res[4]));if(res=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(str))return m(parseFloat(res[1])*2.55,parseFloat(res[2])*2.55,parseFloat(res[3])*2.55);if(res=/rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(str))return m(parseFloat(res[1])*2.55,parseFloat(res[2])*2.55,parseFloat(res[3])*2.55,parseFloat(res[4]));if(res=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(str))return m(parseInt(res[1],16),parseInt(res[2],16),parseInt(res[3],16));if(res=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(str))return m(parseInt(res[1]+res[1],16),parseInt(res[2]+res[2],16),parseInt(res[3]+res[3],16));var name=$.trim(str).toLowerCase();if(name=="transparent")return m(255,255,255,0);else{res=lookupColors[name]||[0,0,0];return m(res[0],res[1],res[2])}};var lookupColors={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0]}})(jQuery);

// the actual Flot code
(function($) {

	// Cache the prototype hasOwnProperty for faster access

	var hasOwnProperty = Object.prototype.hasOwnProperty;

    // A shim to provide 'detach' to jQuery versions prior to 1.4.  Using a DOM
    // operation produces the same effect as detach, i.e. removing the element
    // without touching its jQuery data.

    // Do not merge this into Flot 0.9, since it requires jQuery 1.4.4+.

    if (!$.fn.detach) {
        $.fn.detach = function() {
            return this.each(function() {
                if (this.parentNode) {
                    this.parentNode.removeChild( this );
                }
            });
        };
    }

	///////////////////////////////////////////////////////////////////////////
	// The Canvas object is a wrapper around an HTML5 <canvas> tag.
	//
	// @constructor
	// @param {string} cls List of classes to apply to the canvas.
	// @param {element} container Element onto which to append the canvas.
	//
	// Requiring a container is a little iffy, but unfortunately canvas
	// operations don't work unless the canvas is attached to the DOM.

	function Canvas(cls, container) {

		var element = container.children("." + cls)[0];

		if (element == null) {

			element = document.createElement("canvas");
			element.className = cls;

			$(element).css({ direction: "ltr", position: "absolute", left: 0, top: 0 })
				.appendTo(container);

			// If HTML5 Canvas isn't available, fall back to [Ex|Flash]canvas

			if (!element.getContext) {
				if (window.G_vmlCanvasManager) {
					element = window.G_vmlCanvasManager.initElement(element);
				} else {
					throw new Error("Canvas is not available. If you're using IE with a fall-back such as Excanvas, then there's either a mistake in your conditional include, or the page has no DOCTYPE and is rendering in Quirks Mode.");
				}
			}
		}

		this.element = element;

		var context = this.context = element.getContext("2d");

		// Determine the screen's ratio of physical to device-independent
		// pixels.  This is the ratio between the canvas width that the browser
		// advertises and the number of pixels actually present in that space.

		// The iPhone 4, for example, has a device-independent width of 320px,
		// but its screen is actually 640px wide.  It therefore has a pixel
		// ratio of 2, while most normal devices have a ratio of 1.

		var devicePixelRatio = window.devicePixelRatio || 1,
			backingStoreRatio =
				context.webkitBackingStorePixelRatio ||
				context.mozBackingStorePixelRatio ||
				context.msBackingStorePixelRatio ||
				context.oBackingStorePixelRatio ||
				context.backingStorePixelRatio || 1;

		this.pixelRatio = devicePixelRatio / backingStoreRatio;

		// Size the canvas to match the internal dimensions of its container

		this.resize(container.width(), container.height());

		// Collection of HTML div layers for text overlaid onto the canvas

		this.textContainer = null;
		this.text = {};

		// Cache of text fragments and metrics, so we can avoid expensively
		// re-calculating them when the plot is re-rendered in a loop.

		this._textCache = {};
	}

	// Resizes the canvas to the given dimensions.
	//
	// @param {number} width New width of the canvas, in pixels.
	// @param {number} width New height of the canvas, in pixels.

	Canvas.prototype.resize = function(width, height) {

		if (width <= 0 || height <= 0) {
			throw new Error("Invalid dimensions for plot, width = " + width + ", height = " + height);
		}

		var element = this.element,
			context = this.context,
			pixelRatio = this.pixelRatio;

		// Resize the canvas, increasing its density based on the display's
		// pixel ratio; basically giving it more pixels without increasing the
		// size of its element, to take advantage of the fact that retina
		// displays have that many more pixels in the same advertised space.

		// Resizing should reset the state (excanvas seems to be buggy though)

		if (this.width != width) {
			element.width = width * pixelRatio;
			element.style.width = width + "px";
			this.width = width;
		}

		if (this.height != height) {
			element.height = height * pixelRatio;
			element.style.height = height + "px";
			this.height = height;
		}

		// Save the context, so we can reset in case we get replotted.  The
		// restore ensure that we're really back at the initial state, and
		// should be safe even if we haven't saved the initial state yet.

		context.restore();
		context.save();

		// Scale the coordinate space to match the display density; so even though we
		// may have twice as many pixels, we still want lines and other drawing to
		// appear at the same size; the extra pixels will just make them crisper.

		context.scale(pixelRatio, pixelRatio);
	};

	// Clears the entire canvas area, not including any overlaid HTML text

	Canvas.prototype.clear = function() {
		this.context.clearRect(0, 0, this.width, this.height);
	};

	// Finishes rendering the canvas, including managing the text overlay.

	Canvas.prototype.render = function() {

		var cache = this._textCache;

		// For each text layer, add elements marked as active that haven't
		// already been rendered, and remove those that are no longer active.

		for (var layerKey in cache) {
			if (hasOwnProperty.call(cache, layerKey)) {

				var layer = this.getTextLayer(layerKey),
					layerCache = cache[layerKey];

				layer.hide();

				for (var styleKey in layerCache) {
					if (hasOwnProperty.call(layerCache, styleKey)) {
						var styleCache = layerCache[styleKey];
						for (var key in styleCache) {
							if (hasOwnProperty.call(styleCache, key)) {

								var positions = styleCache[key].positions;

								for (var i = 0, position; position = positions[i]; i++) {
									if (position.active) {
										if (!position.rendered) {
											layer.append(position.element);
											position.rendered = true;
										}
									} else {
										positions.splice(i--, 1);
										if (position.rendered) {
											position.element.detach();
										}
									}
								}

								if (positions.length == 0) {
									delete styleCache[key];
								}
							}
						}
					}
				}

				layer.show();
			}
		}
	};

	// Creates (if necessary) and returns the text overlay container.
	//
	// @param {string} classes String of space-separated CSS classes used to
	//     uniquely identify the text layer.
	// @return {object} The jQuery-wrapped text-layer div.

	Canvas.prototype.getTextLayer = function(classes) {

		var layer = this.text[classes];

		// Create the text layer if it doesn't exist

		if (layer == null) {

			// Create the text layer container, if it doesn't exist

			if (this.textContainer == null) {
				this.textContainer = $("<div class='flot-text'></div>")
					.css({
						position: "absolute",
						top: 0,
						left: 0,
						bottom: 0,
						right: 0,
						'font-size': "smaller",
						color: "#545454"
					})
					.insertAfter(this.element);
			}

			layer = this.text[classes] = $("<div></div>")
				.addClass(classes)
				.css({
					position: "absolute",
					top: 0,
					left: 0,
					bottom: 0,
					right: 0
				})
				.appendTo(this.textContainer);
		}

		return layer;
	};

	// Creates (if necessary) and returns a text info object.
	//
	// The object looks like this:
	//
	// {
	//     width: Width of the text's wrapper div.
	//     height: Height of the text's wrapper div.
	//     element: The jQuery-wrapped HTML div containing the text.
	//     positions: Array of positions at which this text is drawn.
	// }
	//
	// The positions array contains objects that look like this:
	//
	// {
	//     active: Flag indicating whether the text should be visible.
	//     rendered: Flag indicating whether the text is currently visible.
	//     element: The jQuery-wrapped HTML div containing the text.
	//     x: X coordinate at which to draw the text.
	//     y: Y coordinate at which to draw the text.
	// }
	//
	// Each position after the first receives a clone of the original element.
	//
	// The idea is that that the width, height, and general 'identity' of the
	// text is constant no matter where it is placed; the placements are a
	// secondary property.
	//
	// Canvas maintains a cache of recently-used text info objects; getTextInfo
	// either returns the cached element or creates a new entry.
	//
	// @param {string} layer A string of space-separated CSS classes uniquely
	//     identifying the layer containing this text.
	// @param {string} text Text string to retrieve info for.
	// @param {(string|object)=} font Either a string of space-separated CSS
	//     classes or a font-spec object, defining the text's font and style.
	// @param {number=} angle Angle at which to rotate the text, in degrees.
	//     Angle is currently unused, it will be implemented in the future.
	// @param {number=} width Maximum width of the text before it wraps.
	// @return {object} a text info object.

	Canvas.prototype.getTextInfo = function(layer, text, font, angle, width) {

		var textStyle, layerCache, styleCache, info;

		// Cast the value to a string, in case we were given a number or such

		text = "" + text;

		// If the font is a font-spec object, generate a CSS font definition

		if (typeof font === "object") {
			textStyle = font.style + " " + font.variant + " " + font.weight + " " + font.size + "px/" + font.lineHeight + "px " + font.family;
		} else {
			textStyle = font;
		}

		// Retrieve (or create) the cache for the text's layer and styles

		layerCache = this._textCache[layer];

		if (layerCache == null) {
			layerCache = this._textCache[layer] = {};
		}

		styleCache = layerCache[textStyle];

		if (styleCache == null) {
			styleCache = layerCache[textStyle] = {};
		}

		info = styleCache[text];

		// If we can't find a matching element in our cache, create a new one

		if (info == null) {

			var element = $("<div></div>").html(text)
				.css({
					position: "absolute",
					'max-width': width,
					top: -9999
				})
				.appendTo(this.getTextLayer(layer));

			if (typeof font === "object") {
				element.css({
					font: textStyle,
					color: font.color
				});
			} else if (typeof font === "string") {
				element.addClass(font);
			}

			info = styleCache[text] = {
				width: element.outerWidth(true),
				height: element.outerHeight(true),
				element: element,
				positions: []
			};

			element.detach();
		}

		return info;
	};

	// Adds a text string to the canvas text overlay.
	//
	// The text isn't drawn immediately; it is marked as rendering, which will
	// result in its addition to the canvas on the next render pass.
	//
	// @param {string} layer A string of space-separated CSS classes uniquely
	//     identifying the layer containing this text.
	// @param {number} x X coordinate at which to draw the text.
	// @param {number} y Y coordinate at which to draw the text.
	// @param {string} text Text string to draw.
	// @param {(string|object)=} font Either a string of space-separated CSS
	//     classes or a font-spec object, defining the text's font and style.
	// @param {number=} angle Angle at which to rotate the text, in degrees.
	//     Angle is currently unused, it will be implemented in the future.
	// @param {number=} width Maximum width of the text before it wraps.
	// @param {string=} halign Horizontal alignment of the text; either "left",
	//     "center" or "right".
	// @param {string=} valign Vertical alignment of the text; either "top",
	//     "middle" or "bottom".

	Canvas.prototype.addText = function(layer, x, y, text, font, angle, width, halign, valign) {

		var info = this.getTextInfo(layer, text, font, angle, width),
			positions = info.positions;

		// Tweak the div's position to match the text's alignment

		if (halign == "center") {
			x -= info.width / 2;
		} else if (halign == "right") {
			x -= info.width;
		}

		if (valign == "middle") {
			y -= info.height / 2;
		} else if (valign == "bottom") {
			y -= info.height;
		}

		// Determine whether this text already exists at this position.
		// If so, mark it for inclusion in the next render pass.

		for (var i = 0, position; position = positions[i]; i++) {
			if (position.x == x && position.y == y) {
				position.active = true;
				return;
			}
		}

		// If the text doesn't exist at this position, create a new entry

		// For the very first position we'll re-use the original element,
		// while for subsequent ones we'll clone it.

		position = {
			active: true,
			rendered: false,
			element: positions.length ? info.element.clone() : info.element,
			x: x,
			y: y
		};

		positions.push(position);

		// Move the element to its final position within the container

		position.element.css({
			top: Math.round(y),
			left: Math.round(x),
			'text-align': halign	// In case the text wraps
		});
	};

	// Removes one or more text strings from the canvas text overlay.
	//
	// If no parameters are given, all text within the layer is removed.
	//
	// Note that the text is not immediately removed; it is simply marked as
	// inactive, which will result in its removal on the next render pass.
	// This avoids the performance penalty for 'clear and redraw' behavior,
	// where we potentially get rid of all text on a layer, but will likely
	// add back most or all of it later, as when redrawing axes, for example.
	//
	// @param {string} layer A string of space-separated CSS classes uniquely
	//     identifying the layer containing this text.
	// @param {number=} x X coordinate of the text.
	// @param {number=} y Y coordinate of the text.
	// @param {string=} text Text string to remove.
	// @param {(string|object)=} font Either a string of space-separated CSS
	//     classes or a font-spec object, defining the text's font and style.
	// @param {number=} angle Angle at which the text is rotated, in degrees.
	//     Angle is currently unused, it will be implemented in the future.

	Canvas.prototype.removeText = function(layer, x, y, text, font, angle) {
		if (text == null) {
			var layerCache = this._textCache[layer];
			if (layerCache != null) {
				for (var styleKey in layerCache) {
					if (hasOwnProperty.call(layerCache, styleKey)) {
						var styleCache = layerCache[styleKey];
						for (var key in styleCache) {
							if (hasOwnProperty.call(styleCache, key)) {
								var positions = styleCache[key].positions;
								for (var i = 0, position; position = positions[i]; i++) {
									position.active = false;
								}
							}
						}
					}
				}
			}
		} else {
			var positions = this.getTextInfo(layer, text, font, angle).positions;
			for (var i = 0, position; position = positions[i]; i++) {
				if (position.x == x && position.y == y) {
					position.active = false;
				}
			}
		}
	};

	///////////////////////////////////////////////////////////////////////////
	// The top-level container for the entire plot.

    function Plot(placeholder, data_, options_, plugins) {
        // data is on the form:
        //   [ series1, series2 ... ]
        // where series is either just the data as [ [x1, y1], [x2, y2], ... ]
        // or { data: [ [x1, y1], [x2, y2], ... ], label: "some label", ... }

        var series = [],
            options = {
                // the color theme used for graphs
                colors: ["#edc240", "#afd8f8", "#cb4b4b", "#4da74d", "#9440ed"],
                legend: {
                    show: true,
                    noColumns: 1, // number of colums in legend table
                    labelFormatter: null, // fn: string -> string
                    labelBoxBorderColor: "#ccc", // border color for the little label boxes
                    container: null, // container (as jQuery object) to put legend in, null means default on top of graph
                    position: "ne", // position of default legend container within plot
                    margin: 5, // distance from grid edge to default legend container within plot
                    backgroundColor: null, // null means auto-detect
                    backgroundOpacity: 0.85, // set to 0 to avoid background
                    sorted: null    // default to no legend sorting
                },
                xaxis: {
                    show: null, // null = auto-detect, true = always, false = never
                    position: "bottom", // or "top"
                    mode: null, // null or "time"
                    font: null, // null (derived from CSS in placeholder) or object like { size: 11, lineHeight: 13, style: "italic", weight: "bold", family: "sans-serif", variant: "small-caps" }
                    color: null, // base color, labels, ticks
                    tickColor: null, // possibly different color of ticks, e.g. "rgba(0,0,0,0.15)"
                    transform: null, // null or f: number -> number to transform axis
                    inverseTransform: null, // if transform is set, this should be the inverse function
                    min: null, // min. value to show, null means set automatically
                    max: null, // max. value to show, null means set automatically
                    autoscaleMargin: null, // margin in % to add if auto-setting min/max
                    ticks: null, // either [1, 3] or [[1, "a"], 3] or (fn: axis info -> ticks) or app. number of ticks for auto-ticks
                    tickFormatter: null, // fn: number -> string
                    labelWidth: null, // size of tick labels in pixels
                    labelHeight: null,
                    reserveSpace: null, // whether to reserve space even if axis isn't shown
                    tickLength: null, // size in pixels of ticks, or "full" for whole line
                    alignTicksWithAxis: null, // axis number or null for no sync
                    tickDecimals: null, // no. of decimals, null means auto
                    tickSize: null, // number or [number, "unit"]
                    minTickSize: null // number or [number, "unit"]
                },
                yaxis: {
                    autoscaleMargin: 0.02,
                    position: "left" // or "right"
                },
                xaxes: [],
                yaxes: [],
                series: {
                    points: {
                        show: false,
                        radius: 3,
                        lineWidth: 2, // in pixels
                        fill: true,
                        fillColor: "#ffffff",
                        symbol: "circle" // or callback
                    },
                    lines: {
                        // we don't put in show: false so we can see
                        // whether lines were actively disabled
                        lineWidth: 2, // in pixels
                        fill: false,
                        fillColor: null,
                        steps: false
                        // Omit 'zero', so we can later default its value to
                        // match that of the 'fill' option.
                    },
                    bars: {
                        show: false,
                        lineWidth: 2, // in pixels
                        barWidth: 1, // in units of the x axis
                        fill: true,
                        fillColor: null,
                        align: "left", // "left", "right", or "center"
                        horizontal: false,
                        zero: true
                    },
                    shadowSize: 3,
                    highlightColor: null
                },
                grid: {
                    show: true,
                    aboveData: false,
                    color: "#545454", // primary color used for outline and labels
                    backgroundColor: null, // null for transparent, else color
                    borderColor: null, // set if different from the grid color
                    tickColor: null, // color for the ticks, e.g. "rgba(0,0,0,0.15)"
                    margin: 0, // distance from the canvas edge to the grid
                    labelMargin: 5, // in pixels
                    axisMargin: 8, // in pixels
                    borderWidth: 2, // in pixels
                    minBorderMargin: null, // in pixels, null means taken from points radius
                    markings: null, // array of ranges or fn: axes -> array of ranges
                    markingsColor: "#f4f4f4",
                    markingsLineWidth: 2,
                    // interactive stuff
                    clickable: false,
                    hoverable: false,
                    autoHighlight: true, // highlight in case mouse is near
                    mouseActiveRadius: 10 // how far the mouse can be away to activate an item
                },
                interaction: {
                    redrawOverlayInterval: 1000/60 // time between updates, -1 means in same flow
                },
                hooks: {}
            },
        surface = null,     // the canvas for the plot itself
        overlay = null,     // canvas for interactive stuff on top of plot
        eventHolder = null, // jQuery object that events should be bound to
        ctx = null, octx = null,
        xaxes = [], yaxes = [],
        plotOffset = { left: 0, right: 0, top: 0, bottom: 0},
        plotWidth = 0, plotHeight = 0,
        hooks = {
            processOptions: [],
            processRawData: [],
            processDatapoints: [],
            processOffset: [],
            drawBackground: [],
            drawSeries: [],
            draw: [],
            bindEvents: [],
            drawOverlay: [],
            shutdown: []
        },
        plot = this;

        // public functions
        plot.setData = setData;
        plot.setupGrid = setupGrid;
        plot.draw = draw;
        plot.getPlaceholder = function() { return placeholder; };
        plot.getCanvas = function() { return surface.element; };
        plot.getPlotOffset = function() { return plotOffset; };
        plot.width = function () { return plotWidth; };
        plot.height = function () { return plotHeight; };
        plot.offset = function () {
            var o = eventHolder.offset();
            o.left += plotOffset.left;
            o.top += plotOffset.top;
            return o;
        };
        plot.getData = function () { return series; };
        plot.getAxes = function () {
            var res = {}, i;
            $.each(xaxes.concat(yaxes), function (_, axis) {
                if (axis)
                    res[axis.direction + (axis.n != 1 ? axis.n : "") + "axis"] = axis;
            });
            return res;
        };
        plot.getXAxes = function () { return xaxes; };
        plot.getYAxes = function () { return yaxes; };
        plot.c2p = canvasToAxisCoords;
        plot.p2c = axisToCanvasCoords;
        plot.getOptions = function () { return options; };
        plot.highlight = highlight;
        plot.unhighlight = unhighlight;
        plot.triggerRedrawOverlay = triggerRedrawOverlay;
        plot.pointOffset = function(point) {
            return {
                left: parseInt(xaxes[axisNumber(point, "x") - 1].p2c(+point.x) + plotOffset.left, 10),
                top: parseInt(yaxes[axisNumber(point, "y") - 1].p2c(+point.y) + plotOffset.top, 10)
            };
        };
        plot.shutdown = shutdown;
        plot.destroy = function () {
            shutdown();
            placeholder.removeData("plot").empty();

            series = [];
            options = null;
            surface = null;
            overlay = null;
            eventHolder = null;
            ctx = null;
            octx = null;
            xaxes = [];
            yaxes = [];
            hooks = null;
            highlights = [];
            plot = null;
        };
        plot.resize = function () {
        	var width = placeholder.width(),
        		height = placeholder.height();
            surface.resize(width, height);
            overlay.resize(width, height);
        };

        // public attributes
        plot.hooks = hooks;

        // initialize
        initPlugins(plot);
        parseOptions(options_);
        setupCanvases();
        setData(data_);
        setupGrid();
        draw();
        bindEvents();


        function executeHooks(hook, args) {
            args = [plot].concat(args);
            for (var i = 0; i < hook.length; ++i)
                hook[i].apply(this, args);
        }

        function initPlugins() {

            // References to key classes, allowing plugins to modify them

            var classes = {
                Canvas: Canvas
            };

            for (var i = 0; i < plugins.length; ++i) {
                var p = plugins[i];
                p.init(plot, classes);
                if (p.options)
                    $.extend(true, options, p.options);
            }
        }

        function parseOptions(opts) {

            $.extend(true, options, opts);

            // $.extend merges arrays, rather than replacing them.  When less
            // colors are provided than the size of the default palette, we
            // end up with those colors plus the remaining defaults, which is
            // not expected behavior; avoid it by replacing them here.

            if (opts && opts.colors) {
            	options.colors = opts.colors;
            }

            if (options.xaxis.color == null)
                options.xaxis.color = $.color.parse(options.grid.color).scale('a', 0.22).toString();
            if (options.yaxis.color == null)
                options.yaxis.color = $.color.parse(options.grid.color).scale('a', 0.22).toString();

            if (options.xaxis.tickColor == null) // grid.tickColor for back-compatibility
                options.xaxis.tickColor = options.grid.tickColor || options.xaxis.color;
            if (options.yaxis.tickColor == null) // grid.tickColor for back-compatibility
                options.yaxis.tickColor = options.grid.tickColor || options.yaxis.color;

            if (options.grid.borderColor == null)
                options.grid.borderColor = options.grid.color;
            if (options.grid.tickColor == null)
                options.grid.tickColor = $.color.parse(options.grid.color).scale('a', 0.22).toString();

            // Fill in defaults for axis options, including any unspecified
            // font-spec fields, if a font-spec was provided.

            // If no x/y axis options were provided, create one of each anyway,
            // since the rest of the code assumes that they exist.

            var i, axisOptions, axisCount,
                fontSize = placeholder.css("font-size"),
                fontSizeDefault = fontSize ? +fontSize.replace("px", "") : 13,
                fontDefaults = {
                    style: placeholder.css("font-style"),
                    size: Math.round(0.8 * fontSizeDefault),
                    variant: placeholder.css("font-variant"),
                    weight: placeholder.css("font-weight"),
                    family: placeholder.css("font-family")
                };

            axisCount = options.xaxes.length || 1;
            for (i = 0; i < axisCount; ++i) {

                axisOptions = options.xaxes[i];
                if (axisOptions && !axisOptions.tickColor) {
                    axisOptions.tickColor = axisOptions.color;
                }

                axisOptions = $.extend(true, {}, options.xaxis, axisOptions);
                options.xaxes[i] = axisOptions;

                if (axisOptions.font) {
                    axisOptions.font = $.extend({}, fontDefaults, axisOptions.font);
                    if (!axisOptions.font.color) {
                        axisOptions.font.color = axisOptions.color;
                    }
                    if (!axisOptions.font.lineHeight) {
                        axisOptions.font.lineHeight = Math.round(axisOptions.font.size * 1.15);
                    }
                }
            }

            axisCount = options.yaxes.length || 1;
            for (i = 0; i < axisCount; ++i) {

                axisOptions = options.yaxes[i];
                if (axisOptions && !axisOptions.tickColor) {
                    axisOptions.tickColor = axisOptions.color;
                }

                axisOptions = $.extend(true, {}, options.yaxis, axisOptions);
                options.yaxes[i] = axisOptions;

                if (axisOptions.font) {
                    axisOptions.font = $.extend({}, fontDefaults, axisOptions.font);
                    if (!axisOptions.font.color) {
                        axisOptions.font.color = axisOptions.color;
                    }
                    if (!axisOptions.font.lineHeight) {
                        axisOptions.font.lineHeight = Math.round(axisOptions.font.size * 1.15);
                    }
                }
            }

            // backwards compatibility, to be removed in future
            if (options.xaxis.noTicks && options.xaxis.ticks == null)
                options.xaxis.ticks = options.xaxis.noTicks;
            if (options.yaxis.noTicks && options.yaxis.ticks == null)
                options.yaxis.ticks = options.yaxis.noTicks;
            if (options.x2axis) {
                options.xaxes[1] = $.extend(true, {}, options.xaxis, options.x2axis);
                options.xaxes[1].position = "top";
                // Override the inherit to allow the axis to auto-scale
                if (options.x2axis.min == null) {
                    options.xaxes[1].min = null;
                }
                if (options.x2axis.max == null) {
                    options.xaxes[1].max = null;
                }
            }
            if (options.y2axis) {
                options.yaxes[1] = $.extend(true, {}, options.yaxis, options.y2axis);
                options.yaxes[1].position = "right";
                // Override the inherit to allow the axis to auto-scale
                if (options.y2axis.min == null) {
                    options.yaxes[1].min = null;
                }
                if (options.y2axis.max == null) {
                    options.yaxes[1].max = null;
                }
            }
            if (options.grid.coloredAreas)
                options.grid.markings = options.grid.coloredAreas;
            if (options.grid.coloredAreasColor)
                options.grid.markingsColor = options.grid.coloredAreasColor;
            if (options.lines)
                $.extend(true, options.series.lines, options.lines);
            if (options.points)
                $.extend(true, options.series.points, options.points);
            if (options.bars)
                $.extend(true, options.series.bars, options.bars);
            if (options.shadowSize != null)
                options.series.shadowSize = options.shadowSize;
            if (options.highlightColor != null)
                options.series.highlightColor = options.highlightColor;

            // save options on axes for future reference
            for (i = 0; i < options.xaxes.length; ++i)
                getOrCreateAxis(xaxes, i + 1).options = options.xaxes[i];
            for (i = 0; i < options.yaxes.length; ++i)
                getOrCreateAxis(yaxes, i + 1).options = options.yaxes[i];

            // add hooks from options
            for (var n in hooks)
                if (options.hooks[n] && options.hooks[n].length)
                    hooks[n] = hooks[n].concat(options.hooks[n]);

            executeHooks(hooks.processOptions, [options]);
        }

        function setData(d) {
            series = parseData(d);
            fillInSeriesOptions();
            processData();
        }

        function parseData(d) {
            var res = [];
            for (var i = 0; i < d.length; ++i) {
                var s = $.extend(true, {}, options.series);

                if (d[i].data != null) {
                    s.data = d[i].data; // move the data instead of deep-copy
                    delete d[i].data;

                    $.extend(true, s, d[i]);

                    d[i].data = s.data;
                }
                else
                    s.data = d[i];
                res.push(s);
            }

            return res;
        }

        function axisNumber(obj, coord) {
            var a = obj[coord + "axis"];
            if (typeof a == "object") // if we got a real axis, extract number
                a = a.n;
            if (typeof a != "number")
                a = 1; // default to first axis
            return a;
        }

        function allAxes() {
            // return flat array without annoying null entries
            return $.grep(xaxes.concat(yaxes), function (a) { return a; });
        }

        function canvasToAxisCoords(pos) {
            // return an object with x/y corresponding to all used axes
            var res = {}, i, axis;
            for (i = 0; i < xaxes.length; ++i) {
                axis = xaxes[i];
                if (axis && axis.used)
                    res["x" + axis.n] = axis.c2p(pos.left);
            }

            for (i = 0; i < yaxes.length; ++i) {
                axis = yaxes[i];
                if (axis && axis.used)
                    res["y" + axis.n] = axis.c2p(pos.top);
            }

            if (res.x1 !== undefined)
                res.x = res.x1;
            if (res.y1 !== undefined)
                res.y = res.y1;

            return res;
        }

        function axisToCanvasCoords(pos) {
            // get canvas coords from the first pair of x/y found in pos
            var res = {}, i, axis, key;

            for (i = 0; i < xaxes.length; ++i) {
                axis = xaxes[i];
                if (axis && axis.used) {
                    key = "x" + axis.n;
                    if (pos[key] == null && axis.n == 1)
                        key = "x";

                    if (pos[key] != null) {
                        res.left = axis.p2c(pos[key]);
                        break;
                    }
                }
            }

            for (i = 0; i < yaxes.length; ++i) {
                axis = yaxes[i];
                if (axis && axis.used) {
                    key = "y" + axis.n;
                    if (pos[key] == null && axis.n == 1)
                        key = "y";

                    if (pos[key] != null) {
                        res.top = axis.p2c(pos[key]);
                        break;
                    }
                }
            }

            return res;
        }

        function getOrCreateAxis(axes, number) {
            if (!axes[number - 1])
                axes[number - 1] = {
                    n: number, // save the number for future reference
                    direction: axes == xaxes ? "x" : "y",
                    options: $.extend(true, {}, axes == xaxes ? options.xaxis : options.yaxis)
                };

            return axes[number - 1];
        }

        function fillInSeriesOptions() {

            var neededColors = series.length, maxIndex = -1, i;

            // Subtract the number of series that already have fixed colors or
            // color indexes from the number that we still need to generate.

            for (i = 0; i < series.length; ++i) {
                var sc = series[i].color;
                if (sc != null) {
                    neededColors--;
                    if (typeof sc == "number" && sc > maxIndex) {
                        maxIndex = sc;
                    }
                }
            }

            // If any of the series have fixed color indexes, then we need to
            // generate at least as many colors as the highest index.

            if (neededColors <= maxIndex) {
                neededColors = maxIndex + 1;
            }

            // Generate all the colors, using first the option colors and then
            // variations on those colors once they're exhausted.

            var c, colors = [], colorPool = options.colors,
                colorPoolSize = colorPool.length, variation = 0;

            for (i = 0; i < neededColors; i++) {

                c = $.color.parse(colorPool[i % colorPoolSize] || "#666");

                // Each time we exhaust the colors in the pool we adjust
                // a scaling factor used to produce more variations on
                // those colors. The factor alternates negative/positive
                // to produce lighter/darker colors.

                // Reset the variation after every few cycles, or else
                // it will end up producing only white or black colors.

                if (i % colorPoolSize == 0 && i) {
                    if (variation >= 0) {
                        if (variation < 0.5) {
                            variation = -variation - 0.2;
                        } else variation = 0;
                    } else variation = -variation;
                }

                colors[i] = c.scale('rgb', 1 + variation);
            }

            // Finalize the series options, filling in their colors

            var colori = 0, s;
            for (i = 0; i < series.length; ++i) {
                s = series[i];

                // assign colors
                if (s.color == null) {
                    s.color = colors[colori].toString();
                    ++colori;
                }
                else if (typeof s.color == "number")
                    s.color = colors[s.color].toString();

                // turn on lines automatically in case nothing is set
                if (s.lines.show == null) {
                    var v, show = true;
                    for (v in s)
                        if (s[v] && s[v].show) {
                            show = false;
                            break;
                        }
                    if (show)
                        s.lines.show = true;
                }

                // If nothing was provided for lines.zero, default it to match
                // lines.fill, since areas by default should extend to zero.

                if (s.lines.zero == null) {
                    s.lines.zero = !!s.lines.fill;
                }

                // setup axes
                s.xaxis = getOrCreateAxis(xaxes, axisNumber(s, "x"));
                s.yaxis = getOrCreateAxis(yaxes, axisNumber(s, "y"));
            }
        }

        function processData() {
            var topSentry = Number.POSITIVE_INFINITY,
                bottomSentry = Number.NEGATIVE_INFINITY,
                fakeInfinity = Number.MAX_VALUE,
                i, j, k, m, length,
                s, points, ps, x, y, axis, val, f, p,
                data, format;

            function updateAxis(axis, min, max) {
                if (min < axis.datamin && min != -fakeInfinity)
                    axis.datamin = min;
                if (max > axis.datamax && max != fakeInfinity)
                    axis.datamax = max;
            }

            $.each(allAxes(), function (_, axis) {
                // init axis
                axis.datamin = topSentry;
                axis.datamax = bottomSentry;
                axis.used = false;
            });

            for (i = 0; i < series.length; ++i) {
                s = series[i];
                s.datapoints = { points: [] };

                executeHooks(hooks.processRawData, [ s, s.data, s.datapoints ]);
            }

            // first pass: clean and copy data
            for (i = 0; i < series.length; ++i) {
                s = series[i];

                data = s.data;
                format = s.datapoints.format;

                if (!format) {
                    format = [];
                    // find out how to copy
                    format.push({ x: true, number: true, required: true });
                    format.push({ y: true, number: true, required: true });

                    if (s.bars.show || (s.lines.show && s.lines.fill)) {
                        var autoscale = !!((s.bars.show && s.bars.zero) || (s.lines.show && s.lines.zero));
                        format.push({ y: true, number: true, required: false, defaultValue: 0, autoscale: autoscale });
                        if (s.bars.horizontal) {
                            delete format[format.length - 1].y;
                            format[format.length - 1].x = true;
                        }
                    }

                    s.datapoints.format = format;
                }

                if (s.datapoints.pointsize != null)
                    continue; // already filled in

                s.datapoints.pointsize = format.length;

                ps = s.datapoints.pointsize;
                points = s.datapoints.points;

                var insertSteps = s.lines.show && s.lines.steps;
                s.xaxis.used = s.yaxis.used = true;

                for (j = k = 0; j < data.length; ++j, k += ps) {
                    p = data[j];

                    var nullify = p == null;
                    if (!nullify) {
                        for (m = 0; m < ps; ++m) {
                            val = p[m];
                            f = format[m];

                            if (f) {
                                if (f.number && val != null) {
                                    val = +val; // convert to number
                                    if (isNaN(val))
                                        val = null;
                                    else if (val == Infinity)
                                        val = fakeInfinity;
                                    else if (val == -Infinity)
                                        val = -fakeInfinity;
                                }

                                if (val == null) {
                                    if (f.required)
                                        nullify = true;

                                    if (f.defaultValue != null)
                                        val = f.defaultValue;
                                }
                            }

                            points[k + m] = val;
                        }
                    }

                    if (nullify) {
                        for (m = 0; m < ps; ++m) {
                            val = points[k + m];
                            if (val != null) {
                                f = format[m];
                                // extract min/max info
                                if (f.autoscale !== false) {
                                    if (f.x) {
                                        updateAxis(s.xaxis, val, val);
                                    }
                                    if (f.y) {
                                        updateAxis(s.yaxis, val, val);
                                    }
                                }
                            }
                            points[k + m] = null;
                        }
                    }
                    else {
                        // a little bit of line specific stuff that
                        // perhaps shouldn't be here, but lacking
                        // better means...
                        if (insertSteps && k > 0
                            && points[k - ps] != null
                            && points[k - ps] != points[k]
                            && points[k - ps + 1] != points[k + 1]) {
                            // copy the point to make room for a middle point
                            for (m = 0; m < ps; ++m)
                                points[k + ps + m] = points[k + m];

                            // middle point has same y
                            points[k + 1] = points[k - ps + 1];

                            // we've added a point, better reflect that
                            k += ps;
                        }
                    }
                }
            }

            // give the hooks a chance to run
            for (i = 0; i < series.length; ++i) {
                s = series[i];

                executeHooks(hooks.processDatapoints, [ s, s.datapoints]);
            }

            // second pass: find datamax/datamin for auto-scaling
            for (i = 0; i < series.length; ++i) {
                s = series[i];
                points = s.datapoints.points;
                ps = s.datapoints.pointsize;
                format = s.datapoints.format;

                var xmin = topSentry, ymin = topSentry,
                    xmax = bottomSentry, ymax = bottomSentry;

                for (j = 0; j < points.length; j += ps) {
                    if (points[j] == null)
                        continue;

                    for (m = 0; m < ps; ++m) {
                        val = points[j + m];
                        f = format[m];
                        if (!f || f.autoscale === false || val == fakeInfinity || val == -fakeInfinity)
                            continue;

                        if (f.x) {
                            if (val < xmin)
                                xmin = val;
                            if (val > xmax)
                                xmax = val;
                        }
                        if (f.y) {
                            if (val < ymin)
                                ymin = val;
                            if (val > ymax)
                                ymax = val;
                        }
                    }
                }

                if (s.bars.show) {
                    // make sure we got room for the bar on the dancing floor
                    var delta;

                    switch (s.bars.align) {
                        case "left":
                            delta = 0;
                            break;
                        case "right":
                            delta = -s.bars.barWidth;
                            break;
                        default:
                            delta = -s.bars.barWidth / 2;
                    }

                    if (s.bars.horizontal) {
                        ymin += delta;
                        ymax += delta + s.bars.barWidth;
                    }
                    else {
                        xmin += delta;
                        xmax += delta + s.bars.barWidth;
                    }
                }

                updateAxis(s.xaxis, xmin, xmax);
                updateAxis(s.yaxis, ymin, ymax);
            }

            $.each(allAxes(), function (_, axis) {
                if (axis.datamin == topSentry)
                    axis.datamin = null;
                if (axis.datamax == bottomSentry)
                    axis.datamax = null;
            });
        }

        function setupCanvases() {

            // Make sure the placeholder is clear of everything except canvases
            // from a previous plot in this container that we'll try to re-use.

            placeholder.css("padding", 0) // padding messes up the positioning
                .children().filter(function(){
                    return !$(this).hasClass("flot-overlay") && !$(this).hasClass('flot-base');
                }).remove();

            if (placeholder.css("position") == 'static')
                placeholder.css("position", "relative"); // for positioning labels and overlay

            surface = new Canvas("flot-base", placeholder);
            overlay = new Canvas("flot-overlay", placeholder); // overlay canvas for interactive features

            ctx = surface.context;
            octx = overlay.context;

            // define which element we're listening for events on
            eventHolder = $(overlay.element).unbind();

            // If we're re-using a plot object, shut down the old one

            var existing = placeholder.data("plot");

            if (existing) {
                existing.shutdown();
                overlay.clear();
            }

            // save in case we get replotted
            placeholder.data("plot", plot);
        }

        function bindEvents() {
            // bind events
            if (options.grid.hoverable) {
                eventHolder.mousemove(onMouseMove);

                // Use bind, rather than .mouseleave, because we officially
                // still support jQuery 1.2.6, which doesn't define a shortcut
                // for mouseenter or mouseleave.  This was a bug/oversight that
                // was fixed somewhere around 1.3.x.  We can return to using
                // .mouseleave when we drop support for 1.2.6.

                eventHolder.bind("mouseleave", onMouseLeave);
            }

            if (options.grid.clickable)
                eventHolder.click(onClick);

            executeHooks(hooks.bindEvents, [eventHolder]);
        }

        function shutdown() {
            if (redrawTimeout)
                clearTimeout(redrawTimeout);

            eventHolder.unbind("mousemove", onMouseMove);
            eventHolder.unbind("mouseleave", onMouseLeave);
            eventHolder.unbind("click", onClick);

            executeHooks(hooks.shutdown, [eventHolder]);
        }

        function setTransformationHelpers(axis) {
            // set helper functions on the axis, assumes plot area
            // has been computed already

            function identity(x) { return x; }

            var s, m, t = axis.options.transform || identity,
                it = axis.options.inverseTransform;

            // precompute how much the axis is scaling a point
            // in canvas space
            if (axis.direction == "x") {
                s = axis.scale = plotWidth / Math.abs(t(axis.max) - t(axis.min));
                m = Math.min(t(axis.max), t(axis.min));
            }
            else {
                s = axis.scale = plotHeight / Math.abs(t(axis.max) - t(axis.min));
                s = -s;
                m = Math.max(t(axis.max), t(axis.min));
            }

            // data point to canvas coordinate
            if (t == identity) // slight optimization
                axis.p2c = function (p) { return (p - m) * s; };
            else
                axis.p2c = function (p) { return (t(p) - m) * s; };
            // canvas coordinate to data point
            if (!it)
                axis.c2p = function (c) { return m + c / s; };
            else
                axis.c2p = function (c) { return it(m + c / s); };
        }

        function measureTickLabels(axis) {

            var opts = axis.options,
                ticks = axis.ticks || [],
                labelWidth = opts.labelWidth || 0,
                labelHeight = opts.labelHeight || 0,
                maxWidth = labelWidth || (axis.direction == "x" ? Math.floor(surface.width / (ticks.length || 1)) : null),
                legacyStyles = axis.direction + "Axis " + axis.direction + axis.n + "Axis",
                layer = "flot-" + axis.direction + "-axis flot-" + axis.direction + axis.n + "-axis " + legacyStyles,
                font = opts.font || "flot-tick-label tickLabel";

            for (var i = 0; i < ticks.length; ++i) {

                var t = ticks[i];

                if (!t.label)
                    continue;

                var info = surface.getTextInfo(layer, t.label, font, null, maxWidth);

                labelWidth = Math.max(labelWidth, info.width);
                labelHeight = Math.max(labelHeight, info.height);
            }

            axis.labelWidth = opts.labelWidth || labelWidth;
            axis.labelHeight = opts.labelHeight || labelHeight;
        }

        function allocateAxisBoxFirstPhase(axis) {
            // find the bounding box of the axis by looking at label
            // widths/heights and ticks, make room by diminishing the
            // plotOffset; this first phase only looks at one
            // dimension per axis, the other dimension depends on the
            // other axes so will have to wait

            var lw = axis.labelWidth,
                lh = axis.labelHeight,
                pos = axis.options.position,
                isXAxis = axis.direction === "x",
                tickLength = axis.options.tickLength,
                axisMargin = options.grid.axisMargin,
                padding = options.grid.labelMargin,
                innermost = true,
                outermost = true,
                first = true,
                found = false;

            // Determine the axis's position in its direction and on its side

            $.each(isXAxis ? xaxes : yaxes, function(i, a) {
                if (a && (a.show || a.reserveSpace)) {
                    if (a === axis) {
                        found = true;
                    } else if (a.options.position === pos) {
                        if (found) {
                            outermost = false;
                        } else {
                            innermost = false;
                        }
                    }
                    if (!found) {
                        first = false;
                    }
                }
            });

            // The outermost axis on each side has no margin

            if (outermost) {
                axisMargin = 0;
            }

            // The ticks for the first axis in each direction stretch across

            if (tickLength == null) {
                tickLength = first ? "full" : 5;
            }

            if (!isNaN(+tickLength))
                padding += +tickLength;

            if (isXAxis) {
                lh += padding;

                if (pos == "bottom") {
                    plotOffset.bottom += lh + axisMargin;
                    axis.box = { top: surface.height - plotOffset.bottom, height: lh };
                }
                else {
                    axis.box = { top: plotOffset.top + axisMargin, height: lh };
                    plotOffset.top += lh + axisMargin;
                }
            }
            else {
                lw += padding;

                if (pos == "left") {
                    axis.box = { left: plotOffset.left + axisMargin, width: lw };
                    plotOffset.left += lw + axisMargin;
                }
                else {
                    plotOffset.right += lw + axisMargin;
                    axis.box = { left: surface.width - plotOffset.right, width: lw };
                }
            }

             // save for future reference
            axis.position = pos;
            axis.tickLength = tickLength;
            axis.box.padding = padding;
            axis.innermost = innermost;
        }

        function allocateAxisBoxSecondPhase(axis) {
            // now that all axis boxes have been placed in one
            // dimension, we can set the remaining dimension coordinates
            if (axis.direction == "x") {
                axis.box.left = plotOffset.left - axis.labelWidth / 2;
                axis.box.width = surface.width - plotOffset.left - plotOffset.right + axis.labelWidth;
            }
            else {
                axis.box.top = plotOffset.top - axis.labelHeight / 2;
                axis.box.height = surface.height - plotOffset.bottom - plotOffset.top + axis.labelHeight;
            }
        }

        function adjustLayoutForThingsStickingOut() {
            // possibly adjust plot offset to ensure everything stays
            // inside the canvas and isn't clipped off

            var minMargin = options.grid.minBorderMargin,
                axis, i;

            // check stuff from the plot (FIXME: this should just read
            // a value from the series, otherwise it's impossible to
            // customize)
            if (minMargin == null) {
                minMargin = 0;
                for (i = 0; i < series.length; ++i)
                    minMargin = Math.max(minMargin, 2 * (series[i].points.radius + series[i].points.lineWidth/2));
            }

            var margins = {
                left: minMargin,
                right: minMargin,
                top: minMargin,
                bottom: minMargin
            };

            // check axis labels, note we don't check the actual
            // labels but instead use the overall width/height to not
            // jump as much around with replots
            $.each(allAxes(), function (_, axis) {
                if (axis.reserveSpace && axis.ticks && axis.ticks.length) {
                    if (axis.direction === "x") {
                        margins.left = Math.max(margins.left, axis.labelWidth / 2);
                        margins.right = Math.max(margins.right, axis.labelWidth / 2);
                    } else {
                        margins.bottom = Math.max(margins.bottom, axis.labelHeight / 2);
                        margins.top = Math.max(margins.top, axis.labelHeight / 2);
                    }
                }
            });

            plotOffset.left = Math.ceil(Math.max(margins.left, plotOffset.left));
            plotOffset.right = Math.ceil(Math.max(margins.right, plotOffset.right));
            plotOffset.top = Math.ceil(Math.max(margins.top, plotOffset.top));
            plotOffset.bottom = Math.ceil(Math.max(margins.bottom, plotOffset.bottom));
        }

        function setupGrid() {
            var i, axes = allAxes(), showGrid = options.grid.show;

            // Initialize the plot's offset from the edge of the canvas

            for (var a in plotOffset) {
                var margin = options.grid.margin || 0;
                plotOffset[a] = typeof margin == "number" ? margin : margin[a] || 0;
            }

            executeHooks(hooks.processOffset, [plotOffset]);

            // If the grid is visible, add its border width to the offset

            for (var a in plotOffset) {
                if(typeof(options.grid.borderWidth) == "object") {
                    plotOffset[a] += showGrid ? options.grid.borderWidth[a] : 0;
                }
                else {
                    plotOffset[a] += showGrid ? options.grid.borderWidth : 0;
                }
            }

            $.each(axes, function (_, axis) {
                var axisOpts = axis.options;
                axis.show = axisOpts.show == null ? axis.used : axisOpts.show;
                axis.reserveSpace = axisOpts.reserveSpace == null ? axis.show : axisOpts.reserveSpace;
                setRange(axis);
            });

            if (showGrid) {

                var allocatedAxes = $.grep(axes, function (axis) {
                    return axis.show || axis.reserveSpace;
                });

                $.each(allocatedAxes, function (_, axis) {
                    // make the ticks
                    setupTickGeneration(axis);
                    setTicks(axis);
                    snapRangeToTicks(axis, axis.ticks);
                    // find labelWidth/Height for axis
                    measureTickLabels(axis);
                });

                // with all dimensions calculated, we can compute the
                // axis bounding boxes, start from the outside
                // (reverse order)
                for (i = allocatedAxes.length - 1; i >= 0; --i)
                    allocateAxisBoxFirstPhase(allocatedAxes[i]);

                // make sure we've got enough space for things that
                // might stick out
                adjustLayoutForThingsStickingOut();

                $.each(allocatedAxes, function (_, axis) {
                    allocateAxisBoxSecondPhase(axis);
                });
            }

            plotWidth = surface.width - plotOffset.left - plotOffset.right;
            plotHeight = surface.height - plotOffset.bottom - plotOffset.top;

            // now we got the proper plot dimensions, we can compute the scaling
            $.each(axes, function (_, axis) {
                setTransformationHelpers(axis);
            });

            if (showGrid) {
                drawAxisLabels();
            }

            insertLegend();
        }

        function setRange(axis) {
            var opts = axis.options,
                min = +(opts.min != null ? opts.min : axis.datamin),
                max = +(opts.max != null ? opts.max : axis.datamax),
                delta = max - min;

            if (delta == 0.0) {
                // degenerate case
                var widen = max == 0 ? 1 : 0.01;

                if (opts.min == null)
                    min -= widen;
                // always widen max if we couldn't widen min to ensure we
                // don't fall into min == max which doesn't work
                if (opts.max == null || opts.min != null)
                    max += widen;
            }
            else {
                // consider autoscaling
                var margin = opts.autoscaleMargin;
                if (margin != null) {
                    if (opts.min == null) {
                        min -= delta * margin;
                        // make sure we don't go below zero if all values
                        // are positive
                        if (min < 0 && axis.datamin != null && axis.datamin >= 0)
                            min = 0;
                    }
                    if (opts.max == null) {
                        max += delta * margin;
                        if (max > 0 && axis.datamax != null && axis.datamax <= 0)
                            max = 0;
                    }
                }
            }
            axis.min = min;
            axis.max = max;
        }

        function setupTickGeneration(axis) {
            var opts = axis.options;

            // estimate number of ticks
            var noTicks;
            if (typeof opts.ticks == "number" && opts.ticks > 0)
                noTicks = opts.ticks;
            else
                // heuristic based on the model a*sqrt(x) fitted to
                // some data points that seemed reasonable
                noTicks = 0.3 * Math.sqrt(axis.direction == "x" ? surface.width : surface.height);

            var delta = (axis.max - axis.min) / noTicks,
                dec = -Math.floor(Math.log(delta) / Math.LN10),
                maxDec = opts.tickDecimals;

            if (maxDec != null && dec > maxDec) {
                dec = maxDec;
            }

            var magn = Math.pow(10, -dec),
                norm = delta / magn, // norm is between 1.0 and 10.0
                size;

            if (norm < 1.5) {
                size = 1;
            } else if (norm < 3) {
                size = 2;
                // special case for 2.5, requires an extra decimal
                if (norm > 2.25 && (maxDec == null || dec + 1 <= maxDec)) {
                    size = 2.5;
                    ++dec;
                }
            } else if (norm < 7.5) {
                size = 5;
            } else {
                size = 10;
            }

            size *= magn;

            if (opts.minTickSize != null && size < opts.minTickSize) {
                size = opts.minTickSize;
            }

            axis.delta = delta;
            axis.tickDecimals = Math.max(0, maxDec != null ? maxDec : dec);
            axis.tickSize = opts.tickSize || size;

            // Time mode was moved to a plug-in in 0.8, and since so many people use it
            // we'll add an especially friendly reminder to make sure they included it.

            if (opts.mode == "time" && !axis.tickGenerator) {
                throw new Error("Time mode requires the flot.time plugin.");
            }

            // Flot supports base-10 axes; any other mode else is handled by a plug-in,
            // like flot.time.js.

            if (!axis.tickGenerator) {

                axis.tickGenerator = function (axis) {

                    var ticks = [],
                        start = floorInBase(axis.min, axis.tickSize),
                        i = 0,
                        v = Number.NaN,
                        prev;

                    do {
                        prev = v;
                        v = start + i * axis.tickSize;
                        ticks.push(v);
                        ++i;
                    } while (v < axis.max && v != prev);
                    return ticks;
                };

				axis.tickFormatter = function (value, axis) {

					var factor = axis.tickDecimals ? Math.pow(10, axis.tickDecimals) : 1;
					var formatted = "" + Math.round(value * factor) / factor;

					// If tickDecimals was specified, ensure that we have exactly that
					// much precision; otherwise default to the value's own precision.

					if (axis.tickDecimals != null) {
						var decimal = formatted.indexOf(".");
						var precision = decimal == -1 ? 0 : formatted.length - decimal - 1;
						if (precision < axis.tickDecimals) {
							return (precision ? formatted : formatted + ".") + ("" + factor).substr(1, axis.tickDecimals - precision);
						}
					}

                    return formatted;
                };
            }

            if ($.isFunction(opts.tickFormatter))
                axis.tickFormatter = function (v, axis) { return "" + opts.tickFormatter(v, axis); };

            if (opts.alignTicksWithAxis != null) {
                var otherAxis = (axis.direction == "x" ? xaxes : yaxes)[opts.alignTicksWithAxis - 1];
                if (otherAxis && otherAxis.used && otherAxis != axis) {
                    // consider snapping min/max to outermost nice ticks
                    var niceTicks = axis.tickGenerator(axis);
                    if (niceTicks.length > 0) {
                        if (opts.min == null)
                            axis.min = Math.min(axis.min, niceTicks[0]);
                        if (opts.max == null && niceTicks.length > 1)
                            axis.max = Math.max(axis.max, niceTicks[niceTicks.length - 1]);
                    }

                    axis.tickGenerator = function (axis) {
                        // copy ticks, scaled to this axis
                        var ticks = [], v, i;
                        for (i = 0; i < otherAxis.ticks.length; ++i) {
                            v = (otherAxis.ticks[i].v - otherAxis.min) / (otherAxis.max - otherAxis.min);
                            v = axis.min + v * (axis.max - axis.min);
                            ticks.push(v);
                        }
                        return ticks;
                    };

                    // we might need an extra decimal since forced
                    // ticks don't necessarily fit naturally
                    if (!axis.mode && opts.tickDecimals == null) {
                        var extraDec = Math.max(0, -Math.floor(Math.log(axis.delta) / Math.LN10) + 1),
                            ts = axis.tickGenerator(axis);

                        // only proceed if the tick interval rounded
                        // with an extra decimal doesn't give us a
                        // zero at end
                        if (!(ts.length > 1 && /\..*0$/.test((ts[1] - ts[0]).toFixed(extraDec))))
                            axis.tickDecimals = extraDec;
                    }
                }
            }
        }

        function setTicks(axis) {
            var oticks = axis.options.ticks, ticks = [];
            if (oticks == null || (typeof oticks == "number" && oticks > 0))
                ticks = axis.tickGenerator(axis);
            else if (oticks) {
                if ($.isFunction(oticks))
                    // generate the ticks
                    ticks = oticks(axis);
                else
                    ticks = oticks;
            }

            // clean up/labelify the supplied ticks, copy them over
            var i, v;
            axis.ticks = [];
            for (i = 0; i < ticks.length; ++i) {
                var label = null;
                var t = ticks[i];
                if (typeof t == "object") {
                    v = +t[0];
                    if (t.length > 1)
                        label = t[1];
                }
                else
                    v = +t;
                if (label == null)
                    label = axis.tickFormatter(v, axis);
                if (!isNaN(v))
                    axis.ticks.push({ v: v, label: label });
            }
        }

        function snapRangeToTicks(axis, ticks) {
            if (axis.options.autoscaleMargin && ticks.length > 0) {
                // snap to ticks
                if (axis.options.min == null)
                    axis.min = Math.min(axis.min, ticks[0].v);
                if (axis.options.max == null && ticks.length > 1)
                    axis.max = Math.max(axis.max, ticks[ticks.length - 1].v);
            }
        }

        function draw() {

            surface.clear();

            executeHooks(hooks.drawBackground, [ctx]);

            var grid = options.grid;

            // draw background, if any
            if (grid.show && grid.backgroundColor)
                drawBackground();

            if (grid.show && !grid.aboveData) {
                drawGrid();
            }

            for (var i = 0; i < series.length; ++i) {
                executeHooks(hooks.drawSeries, [ctx, series[i]]);
                drawSeries(series[i]);
            }

            executeHooks(hooks.draw, [ctx]);

            if (grid.show && grid.aboveData) {
                drawGrid();
            }

            surface.render();

            // A draw implies that either the axes or data have changed, so we
            // should probably update the overlay highlights as well.

            triggerRedrawOverlay();
        }

        function extractRange(ranges, coord) {
            var axis, from, to, key, axes = allAxes();

            for (var i = 0; i < axes.length; ++i) {
                axis = axes[i];
                if (axis.direction == coord) {
                    key = coord + axis.n + "axis";
                    if (!ranges[key] && axis.n == 1)
                        key = coord + "axis"; // support x1axis as xaxis
                    if (ranges[key]) {
                        from = ranges[key].from;
                        to = ranges[key].to;
                        break;
                    }
                }
            }

            // backwards-compat stuff - to be removed in future
            if (!ranges[key]) {
                axis = coord == "x" ? xaxes[0] : yaxes[0];
                from = ranges[coord + "1"];
                to = ranges[coord + "2"];
            }

            // auto-reverse as an added bonus
            if (from != null && to != null && from > to) {
                var tmp = from;
                from = to;
                to = tmp;
            }

            return { from: from, to: to, axis: axis };
        }

        function drawBackground() {
            ctx.save();
            ctx.translate(plotOffset.left, plotOffset.top);

            ctx.fillStyle = getColorOrGradient(options.grid.backgroundColor, plotHeight, 0, "rgba(255, 255, 255, 0)");
            ctx.fillRect(0, 0, plotWidth, plotHeight);
            ctx.restore();
        }

        function drawGrid() {
            var i, axes, bw, bc;

            ctx.save();
            ctx.translate(plotOffset.left, plotOffset.top);

            // draw markings
            var markings = options.grid.markings;
            if (markings) {
                if ($.isFunction(markings)) {
                    axes = plot.getAxes();
                    // xmin etc. is backwards compatibility, to be
                    // removed in the future
                    axes.xmin = axes.xaxis.min;
                    axes.xmax = axes.xaxis.max;
                    axes.ymin = axes.yaxis.min;
                    axes.ymax = axes.yaxis.max;

                    markings = markings(axes);
                }

                for (i = 0; i < markings.length; ++i) {
                    var m = markings[i],
                        xrange = extractRange(m, "x"),
                        yrange = extractRange(m, "y");

                    // fill in missing
                    if (xrange.from == null)
                        xrange.from = xrange.axis.min;
                    if (xrange.to == null)
                        xrange.to = xrange.axis.max;
                    if (yrange.from == null)
                        yrange.from = yrange.axis.min;
                    if (yrange.to == null)
                        yrange.to = yrange.axis.max;

                    // clip
                    if (xrange.to < xrange.axis.min || xrange.from > xrange.axis.max ||
                        yrange.to < yrange.axis.min || yrange.from > yrange.axis.max)
                        continue;

                    xrange.from = Math.max(xrange.from, xrange.axis.min);
                    xrange.to = Math.min(xrange.to, xrange.axis.max);
                    yrange.from = Math.max(yrange.from, yrange.axis.min);
                    yrange.to = Math.min(yrange.to, yrange.axis.max);

                    var xequal = xrange.from === xrange.to,
                        yequal = yrange.from === yrange.to;

                    if (xequal && yequal) {
                        continue;
                    }

                    // then draw
                    xrange.from = Math.floor(xrange.axis.p2c(xrange.from));
                    xrange.to = Math.floor(xrange.axis.p2c(xrange.to));
                    yrange.from = Math.floor(yrange.axis.p2c(yrange.from));
                    yrange.to = Math.floor(yrange.axis.p2c(yrange.to));

                    if (xequal || yequal) {
                        var lineWidth = m.lineWidth || options.grid.markingsLineWidth,
                            subPixel = lineWidth % 2 ? 0.5 : 0;
                        ctx.beginPath();
                        ctx.strokeStyle = m.color || options.grid.markingsColor;
                        ctx.lineWidth = lineWidth;
                        if (xequal) {
                            ctx.moveTo(xrange.to + subPixel, yrange.from);
                            ctx.lineTo(xrange.to + subPixel, yrange.to);
                        } else {
                            ctx.moveTo(xrange.from, yrange.to + subPixel);
                            ctx.lineTo(xrange.to, yrange.to + subPixel);                            
                        }
                        ctx.stroke();
                    } else {
                        ctx.fillStyle = m.color || options.grid.markingsColor;
                        ctx.fillRect(xrange.from, yrange.to,
                                     xrange.to - xrange.from,
                                     yrange.from - yrange.to);
                    }
                }
            }

            // draw the ticks
            axes = allAxes();
            bw = options.grid.borderWidth;

            for (var j = 0; j < axes.length; ++j) {
                var axis = axes[j], box = axis.box,
                    t = axis.tickLength, x, y, xoff, yoff;
                if (!axis.show || axis.ticks.length == 0)
                    continue;

                ctx.lineWidth = 1;

                // find the edges
                if (axis.direction == "x") {
                    x = 0;
                    if (t == "full")
                        y = (axis.position == "top" ? 0 : plotHeight);
                    else
                        y = box.top - plotOffset.top + (axis.position == "top" ? box.height : 0);
                }
                else {
                    y = 0;
                    if (t == "full")
                        x = (axis.position == "left" ? 0 : plotWidth);
                    else
                        x = box.left - plotOffset.left + (axis.position == "left" ? box.width : 0);
                }

                // draw tick bar
                if (!axis.innermost) {
                    ctx.strokeStyle = axis.options.color;
                    ctx.beginPath();
                    xoff = yoff = 0;
                    if (axis.direction == "x")
                        xoff = plotWidth + 1;
                    else
                        yoff = plotHeight + 1;

                    if (ctx.lineWidth == 1) {
                        if (axis.direction == "x") {
                            y = Math.floor(y) + 0.5;
                        } else {
                            x = Math.floor(x) + 0.5;
                        }
                    }

                    ctx.moveTo(x, y);
                    ctx.lineTo(x + xoff, y + yoff);
                    ctx.stroke();
                }

                // draw ticks

                ctx.strokeStyle = axis.options.tickColor;

                ctx.beginPath();
                for (i = 0; i < axis.ticks.length; ++i) {
                    var v = axis.ticks[i].v;

                    xoff = yoff = 0;

                    if (isNaN(v) || v < axis.min || v > axis.max
                        // skip those lying on the axes if we got a border
                        || (t == "full"
                            && ((typeof bw == "object" && bw[axis.position] > 0) || bw > 0)
                            && (v == axis.min || v == axis.max)))
                        continue;

                    if (axis.direction == "x") {
                        x = axis.p2c(v);
                        yoff = t == "full" ? -plotHeight : t;

                        if (axis.position == "top")
                            yoff = -yoff;
                    }
                    else {
                        y = axis.p2c(v);
                        xoff = t == "full" ? -plotWidth : t;

                        if (axis.position == "left")
                            xoff = -xoff;
                    }

                    if (ctx.lineWidth == 1) {
                        if (axis.direction == "x")
                            x = Math.floor(x) + 0.5;
                        else
                            y = Math.floor(y) + 0.5;
                    }

                    ctx.moveTo(x, y);
                    ctx.lineTo(x + xoff, y + yoff);
                }

                ctx.stroke();
            }


            // draw border
            if (bw) {
                // If either borderWidth or borderColor is an object, then draw the border
                // line by line instead of as one rectangle
                bc = options.grid.borderColor;
                if(typeof bw == "object" || typeof bc == "object") {
                    if (typeof bw !== "object") {
                        bw = {top: bw, right: bw, bottom: bw, left: bw};
                    }
                    if (typeof bc !== "object") {
                        bc = {top: bc, right: bc, bottom: bc, left: bc};
                    }

                    if (bw.top > 0) {
                        ctx.strokeStyle = bc.top;
                        ctx.lineWidth = bw.top;
                        ctx.beginPath();
                        ctx.moveTo(0 - bw.left, 0 - bw.top/2);
                        ctx.lineTo(plotWidth, 0 - bw.top/2);
                        ctx.stroke();
                    }

                    if (bw.right > 0) {
                        ctx.strokeStyle = bc.right;
                        ctx.lineWidth = bw.right;
                        ctx.beginPath();
                        ctx.moveTo(plotWidth + bw.right / 2, 0 - bw.top);
                        ctx.lineTo(plotWidth + bw.right / 2, plotHeight);
                        ctx.stroke();
                    }

                    if (bw.bottom > 0) {
                        ctx.strokeStyle = bc.bottom;
                        ctx.lineWidth = bw.bottom;
                        ctx.beginPath();
                        ctx.moveTo(plotWidth + bw.right, plotHeight + bw.bottom / 2);
                        ctx.lineTo(0, plotHeight + bw.bottom / 2);
                        ctx.stroke();
                    }

                    if (bw.left > 0) {
                        ctx.strokeStyle = bc.left;
                        ctx.lineWidth = bw.left;
                        ctx.beginPath();
                        ctx.moveTo(0 - bw.left/2, plotHeight + bw.bottom);
                        ctx.lineTo(0- bw.left/2, 0);
                        ctx.stroke();
                    }
                }
                else {
                    ctx.lineWidth = bw;
                    ctx.strokeStyle = options.grid.borderColor;
                    ctx.strokeRect(-bw/2, -bw/2, plotWidth + bw, plotHeight + bw);
                }
            }

            ctx.restore();
        }

        function drawAxisLabels() {

            $.each(allAxes(), function (_, axis) {
                var box = axis.box,
                    legacyStyles = axis.direction + "Axis " + axis.direction + axis.n + "Axis",
                    layer = "flot-" + axis.direction + "-axis flot-" + axis.direction + axis.n + "-axis " + legacyStyles,
                    font = axis.options.font || "flot-tick-label tickLabel",
                    tick, x, y, halign, valign;

                // Remove text before checking for axis.show and ticks.length;
                // otherwise plugins, like flot-tickrotor, that draw their own
                // tick labels will end up with both theirs and the defaults.

                surface.removeText(layer);

                if (!axis.show || axis.ticks.length == 0)
                    return;

                for (var i = 0; i < axis.ticks.length; ++i) {

                    tick = axis.ticks[i];
                    if (!tick.label || tick.v < axis.min || tick.v > axis.max)
                        continue;

                    if (axis.direction == "x") {
                        halign = "center";
                        x = plotOffset.left + axis.p2c(tick.v);
                        if (axis.position == "bottom") {
                            y = box.top + box.padding;
                        } else {
                            y = box.top + box.height - box.padding;
                            valign = "bottom";
                        }
                    } else {
                        valign = "middle";
                        y = plotOffset.top + axis.p2c(tick.v);
                        if (axis.position == "left") {
                            x = box.left + box.width - box.padding;
                            halign = "right";
                        } else {
                            x = box.left + box.padding;
                        }
                    }

                    surface.addText(layer, x, y, tick.label, font, null, null, halign, valign);
                }
            });
        }

        function drawSeries(series) {
            if (series.lines.show)
                drawSeriesLines(series);
            if (series.bars.show)
                drawSeriesBars(series);
            if (series.points.show)
                drawSeriesPoints(series);
        }

        function drawSeriesLines(series) {
            function plotLine(datapoints, xoffset, yoffset, axisx, axisy) {
                var points = datapoints.points,
                    ps = datapoints.pointsize,
                    prevx = null, prevy = null;

                ctx.beginPath();
                for (var i = ps; i < points.length; i += ps) {
                    var x1 = points[i - ps], y1 = points[i - ps + 1],
                        x2 = points[i], y2 = points[i + 1];

                    if (x1 == null || x2 == null)
                        continue;

                    // clip with ymin
                    if (y1 <= y2 && y1 < axisy.min) {
                        if (y2 < axisy.min)
                            continue;   // line segment is outside
                        // compute new intersection point
                        x1 = (axisy.min - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y1 = axisy.min;
                    }
                    else if (y2 <= y1 && y2 < axisy.min) {
                        if (y1 < axisy.min)
                            continue;
                        x2 = (axisy.min - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y2 = axisy.min;
                    }

                    // clip with ymax
                    if (y1 >= y2 && y1 > axisy.max) {
                        if (y2 > axisy.max)
                            continue;
                        x1 = (axisy.max - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y1 = axisy.max;
                    }
                    else if (y2 >= y1 && y2 > axisy.max) {
                        if (y1 > axisy.max)
                            continue;
                        x2 = (axisy.max - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y2 = axisy.max;
                    }

                    // clip with xmin
                    if (x1 <= x2 && x1 < axisx.min) {
                        if (x2 < axisx.min)
                            continue;
                        y1 = (axisx.min - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x1 = axisx.min;
                    }
                    else if (x2 <= x1 && x2 < axisx.min) {
                        if (x1 < axisx.min)
                            continue;
                        y2 = (axisx.min - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x2 = axisx.min;
                    }

                    // clip with xmax
                    if (x1 >= x2 && x1 > axisx.max) {
                        if (x2 > axisx.max)
                            continue;
                        y1 = (axisx.max - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x1 = axisx.max;
                    }
                    else if (x2 >= x1 && x2 > axisx.max) {
                        if (x1 > axisx.max)
                            continue;
                        y2 = (axisx.max - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x2 = axisx.max;
                    }

                    if (x1 != prevx || y1 != prevy)
                        ctx.moveTo(axisx.p2c(x1) + xoffset, axisy.p2c(y1) + yoffset);

                    prevx = x2;
                    prevy = y2;
                    ctx.lineTo(axisx.p2c(x2) + xoffset, axisy.p2c(y2) + yoffset);
                }
                ctx.stroke();
            }

            function plotLineArea(datapoints, axisx, axisy) {
                var points = datapoints.points,
                    ps = datapoints.pointsize,
                    bottom = Math.min(Math.max(0, axisy.min), axisy.max),
                    i = 0, top, areaOpen = false,
                    ypos = 1, segmentStart = 0, segmentEnd = 0;

                // we process each segment in two turns, first forward
                // direction to sketch out top, then once we hit the
                // end we go backwards to sketch the bottom
                while (true) {
                    if (ps > 0 && i > points.length + ps)
                        break;

                    i += ps; // ps is negative if going backwards

                    var x1 = points[i - ps],
                        y1 = points[i - ps + ypos],
                        x2 = points[i], y2 = points[i + ypos];

                    if (areaOpen) {
                        if (ps > 0 && x1 != null && x2 == null) {
                            // at turning point
                            segmentEnd = i;
                            ps = -ps;
                            ypos = 2;
                            continue;
                        }

                        if (ps < 0 && i == segmentStart + ps) {
                            // done with the reverse sweep
                            ctx.fill();
                            areaOpen = false;
                            ps = -ps;
                            ypos = 1;
                            i = segmentStart = segmentEnd + ps;
                            continue;
                        }
                    }

                    if (x1 == null || x2 == null)
                        continue;

                    // clip x values

                    // clip with xmin
                    if (x1 <= x2 && x1 < axisx.min) {
                        if (x2 < axisx.min)
                            continue;
                        y1 = (axisx.min - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x1 = axisx.min;
                    }
                    else if (x2 <= x1 && x2 < axisx.min) {
                        if (x1 < axisx.min)
                            continue;
                        y2 = (axisx.min - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x2 = axisx.min;
                    }

                    // clip with xmax
                    if (x1 >= x2 && x1 > axisx.max) {
                        if (x2 > axisx.max)
                            continue;
                        y1 = (axisx.max - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x1 = axisx.max;
                    }
                    else if (x2 >= x1 && x2 > axisx.max) {
                        if (x1 > axisx.max)
                            continue;
                        y2 = (axisx.max - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x2 = axisx.max;
                    }

                    if (!areaOpen) {
                        // open area
                        ctx.beginPath();
                        ctx.moveTo(axisx.p2c(x1), axisy.p2c(bottom));
                        areaOpen = true;
                    }

                    // now first check the case where both is outside
                    if (y1 >= axisy.max && y2 >= axisy.max) {
                        ctx.lineTo(axisx.p2c(x1), axisy.p2c(axisy.max));
                        ctx.lineTo(axisx.p2c(x2), axisy.p2c(axisy.max));
                        continue;
                    }
                    else if (y1 <= axisy.min && y2 <= axisy.min) {
                        ctx.lineTo(axisx.p2c(x1), axisy.p2c(axisy.min));
                        ctx.lineTo(axisx.p2c(x2), axisy.p2c(axisy.min));
                        continue;
                    }

                    // else it's a bit more complicated, there might
                    // be a flat maxed out rectangle first, then a
                    // triangular cutout or reverse; to find these
                    // keep track of the current x values
                    var x1old = x1, x2old = x2;

                    // clip the y values, without shortcutting, we
                    // go through all cases in turn

                    // clip with ymin
                    if (y1 <= y2 && y1 < axisy.min && y2 >= axisy.min) {
                        x1 = (axisy.min - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y1 = axisy.min;
                    }
                    else if (y2 <= y1 && y2 < axisy.min && y1 >= axisy.min) {
                        x2 = (axisy.min - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y2 = axisy.min;
                    }

                    // clip with ymax
                    if (y1 >= y2 && y1 > axisy.max && y2 <= axisy.max) {
                        x1 = (axisy.max - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y1 = axisy.max;
                    }
                    else if (y2 >= y1 && y2 > axisy.max && y1 <= axisy.max) {
                        x2 = (axisy.max - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y2 = axisy.max;
                    }

                    // if the x value was changed we got a rectangle
                    // to fill
                    if (x1 != x1old) {
                        ctx.lineTo(axisx.p2c(x1old), axisy.p2c(y1));
                        // it goes to (x1, y1), but we fill that below
                    }

                    // fill triangular section, this sometimes result
                    // in redundant points if (x1, y1) hasn't changed
                    // from previous line to, but we just ignore that
                    ctx.lineTo(axisx.p2c(x1), axisy.p2c(y1));
                    ctx.lineTo(axisx.p2c(x2), axisy.p2c(y2));

                    // fill the other rectangle if it's there
                    if (x2 != x2old) {
                        ctx.lineTo(axisx.p2c(x2), axisy.p2c(y2));
                        ctx.lineTo(axisx.p2c(x2old), axisy.p2c(y2));
                    }
                }
            }

            ctx.save();
            ctx.translate(plotOffset.left, plotOffset.top);
            ctx.lineJoin = "round";

            var lw = series.lines.lineWidth,
                sw = series.shadowSize;
            // FIXME: consider another form of shadow when filling is turned on
            if (lw > 0 && sw > 0) {
                // draw shadow as a thick and thin line with transparency
                ctx.lineWidth = sw;
                ctx.strokeStyle = "rgba(0,0,0,0.1)";
                // position shadow at angle from the mid of line
                var angle = Math.PI/18;
                plotLine(series.datapoints, Math.sin(angle) * (lw/2 + sw/2), Math.cos(angle) * (lw/2 + sw/2), series.xaxis, series.yaxis);
                ctx.lineWidth = sw/2;
                plotLine(series.datapoints, Math.sin(angle) * (lw/2 + sw/4), Math.cos(angle) * (lw/2 + sw/4), series.xaxis, series.yaxis);
            }

            ctx.lineWidth = lw;
            ctx.strokeStyle = series.color;
            var fillStyle = getFillStyle(series.lines, series.color, 0, plotHeight);
            if (fillStyle) {
                ctx.fillStyle = fillStyle;
                plotLineArea(series.datapoints, series.xaxis, series.yaxis);
            }

            if (lw > 0)
                plotLine(series.datapoints, 0, 0, series.xaxis, series.yaxis);
            ctx.restore();
        }

        function drawSeriesPoints(series) {
            function plotPoints(datapoints, radius, fillStyle, offset, shadow, axisx, axisy, symbol) {
                var points = datapoints.points, ps = datapoints.pointsize;

                for (var i = 0; i < points.length; i += ps) {
                    var x = points[i], y = points[i + 1];
                    if (x == null || x < axisx.min || x > axisx.max || y < axisy.min || y > axisy.max)
                        continue;

                    ctx.beginPath();
                    x = axisx.p2c(x);
                    y = axisy.p2c(y) + offset;
                    if (symbol == "circle")
                        ctx.arc(x, y, radius, 0, shadow ? Math.PI : Math.PI * 2, false);
                    else
                        symbol(ctx, x, y, radius, shadow);
                    ctx.closePath();

                    if (fillStyle) {
                        ctx.fillStyle = fillStyle;
                        ctx.fill();
                    }
                    ctx.stroke();
                }
            }

            ctx.save();
            ctx.translate(plotOffset.left, plotOffset.top);

            var lw = series.points.lineWidth,
                sw = series.shadowSize,
                radius = series.points.radius,
                symbol = series.points.symbol;

            // If the user sets the line width to 0, we change it to a very 
            // small value. A line width of 0 seems to force the default of 1.
            // Doing the conditional here allows the shadow setting to still be 
            // optional even with a lineWidth of 0.

            if( lw == 0 )
                lw = 0.0001;

            if (lw > 0 && sw > 0) {
                // draw shadow in two steps
                var w = sw / 2;
                ctx.lineWidth = w;
                ctx.strokeStyle = "rgba(0,0,0,0.1)";
                plotPoints(series.datapoints, radius, null, w + w/2, true,
                           series.xaxis, series.yaxis, symbol);

                ctx.strokeStyle = "rgba(0,0,0,0.2)";
                plotPoints(series.datapoints, radius, null, w/2, true,
                           series.xaxis, series.yaxis, symbol);
            }

            ctx.lineWidth = lw;
            ctx.strokeStyle = series.color;
            plotPoints(series.datapoints, radius,
                       getFillStyle(series.points, series.color), 0, false,
                       series.xaxis, series.yaxis, symbol);
            ctx.restore();
        }

        function drawBar(x, y, b, barLeft, barRight, fillStyleCallback, axisx, axisy, c, horizontal, lineWidth) {
            var left, right, bottom, top,
                drawLeft, drawRight, drawTop, drawBottom,
                tmp;

            // in horizontal mode, we start the bar from the left
            // instead of from the bottom so it appears to be
            // horizontal rather than vertical
            if (horizontal) {
                drawBottom = drawRight = drawTop = true;
                drawLeft = false;
                left = b;
                right = x;
                top = y + barLeft;
                bottom = y + barRight;

                // account for negative bars
                if (right < left) {
                    tmp = right;
                    right = left;
                    left = tmp;
                    drawLeft = true;
                    drawRight = false;
                }
            }
            else {
                drawLeft = drawRight = drawTop = true;
                drawBottom = false;
                left = x + barLeft;
                right = x + barRight;
                bottom = b;
                top = y;

                // account for negative bars
                if (top < bottom) {
                    tmp = top;
                    top = bottom;
                    bottom = tmp;
                    drawBottom = true;
                    drawTop = false;
                }
            }

            // clip
            if (right < axisx.min || left > axisx.max ||
                top < axisy.min || bottom > axisy.max)
                return;

            if (left < axisx.min) {
                left = axisx.min;
                drawLeft = false;
            }

            if (right > axisx.max) {
                right = axisx.max;
                drawRight = false;
            }

            if (bottom < axisy.min) {
                bottom = axisy.min;
                drawBottom = false;
            }

            if (top > axisy.max) {
                top = axisy.max;
                drawTop = false;
            }

            left = axisx.p2c(left);
            bottom = axisy.p2c(bottom);
            right = axisx.p2c(right);
            top = axisy.p2c(top);

            // fill the bar
            if (fillStyleCallback) {
                c.fillStyle = fillStyleCallback(bottom, top);
                c.fillRect(left, top, right - left, bottom - top)
            }

            // draw outline
            if (lineWidth > 0 && (drawLeft || drawRight || drawTop || drawBottom)) {
                c.beginPath();

                // FIXME: inline moveTo is buggy with excanvas
                c.moveTo(left, bottom);
                if (drawLeft)
                    c.lineTo(left, top);
                else
                    c.moveTo(left, top);
                if (drawTop)
                    c.lineTo(right, top);
                else
                    c.moveTo(right, top);
                if (drawRight)
                    c.lineTo(right, bottom);
                else
                    c.moveTo(right, bottom);
                if (drawBottom)
                    c.lineTo(left, bottom);
                else
                    c.moveTo(left, bottom);
                c.stroke();
            }
        }

        function drawSeriesBars(series) {
            function plotBars(datapoints, barLeft, barRight, fillStyleCallback, axisx, axisy) {
                var points = datapoints.points, ps = datapoints.pointsize;

                for (var i = 0; i < points.length; i += ps) {
                    if (points[i] == null)
                        continue;
                    drawBar(points[i], points[i + 1], points[i + 2], barLeft, barRight, fillStyleCallback, axisx, axisy, ctx, series.bars.horizontal, series.bars.lineWidth);
                }
            }

            ctx.save();
            ctx.translate(plotOffset.left, plotOffset.top);

            // FIXME: figure out a way to add shadows (for instance along the right edge)
            ctx.lineWidth = series.bars.lineWidth;
            ctx.strokeStyle = series.color;

            var barLeft;

            switch (series.bars.align) {
                case "left":
                    barLeft = 0;
                    break;
                case "right":
                    barLeft = -series.bars.barWidth;
                    break;
                default:
                    barLeft = -series.bars.barWidth / 2;
            }

            var fillStyleCallback = series.bars.fill ? function (bottom, top) { return getFillStyle(series.bars, series.color, bottom, top); } : null;
            plotBars(series.datapoints, barLeft, barLeft + series.bars.barWidth, fillStyleCallback, series.xaxis, series.yaxis);
            ctx.restore();
        }

        function getFillStyle(filloptions, seriesColor, bottom, top) {
            var fill = filloptions.fill;
            if (!fill)
                return null;

            if (filloptions.fillColor)
                return getColorOrGradient(filloptions.fillColor, bottom, top, seriesColor);

            var c = $.color.parse(seriesColor);
            c.a = typeof fill == "number" ? fill : 0.4;
            c.normalize();
            return c.toString();
        }

        function insertLegend() {

            if (options.legend.container != null) {
                $(options.legend.container).html("");
            } else {
                placeholder.find(".legend").remove();
            }

            if (!options.legend.show) {
                return;
            }

            var fragments = [], entries = [], rowStarted = false,
                lf = options.legend.labelFormatter, s, label;

            // Build a list of legend entries, with each having a label and a color

            for (var i = 0; i < series.length; ++i) {
                s = series[i];
                if (s.label) {
                    label = lf ? lf(s.label, s) : s.label;
                    if (label) {
                        entries.push({
                            label: label,
                            color: s.color
                        });
                    }
                }
            }

            // Sort the legend using either the default or a custom comparator

            if (options.legend.sorted) {
                if ($.isFunction(options.legend.sorted)) {
                    entries.sort(options.legend.sorted);
                } else if (options.legend.sorted == "reverse") {
                	entries.reverse();
                } else {
                    var ascending = options.legend.sorted != "descending";
                    entries.sort(function(a, b) {
                        return a.label == b.label ? 0 : (
                            (a.label < b.label) != ascending ? 1 : -1   // Logical XOR
                        );
                    });
                }
            }

            // Generate markup for the list of entries, in their final order

            for (var i = 0; i < entries.length; ++i) {

                var entry = entries[i];

                if (i % options.legend.noColumns == 0) {
                    if (rowStarted)
                        fragments.push('</tr>');
                    fragments.push('<tr>');
                    rowStarted = true;
                }

                fragments.push(
                    '<td class="legendColorBox"><div style="border:1px solid ' + options.legend.labelBoxBorderColor + ';padding:1px"><div style="width:4px;height:0;border:5px solid ' + entry.color + ';overflow:hidden"></div></div></td>' +
                    '<td class="legendLabel">' + entry.label + '</td>'
                );
            }

            if (rowStarted)
                fragments.push('</tr>');

            if (fragments.length == 0)
                return;

            var table = '<table style="font-size:smaller;color:' + options.grid.color + '">' + fragments.join("") + '</table>';
            if (options.legend.container != null)
                $(options.legend.container).html(table);
            else {
                var pos = "",
                    p = options.legend.position,
                    m = options.legend.margin;
                if (m[0] == null)
                    m = [m, m];
                if (p.charAt(0) == "n")
                    pos += 'top:' + (m[1] + plotOffset.top) + 'px;';
                else if (p.charAt(0) == "s")
                    pos += 'bottom:' + (m[1] + plotOffset.bottom) + 'px;';
                if (p.charAt(1) == "e")
                    pos += 'right:' + (m[0] + plotOffset.right) + 'px;';
                else if (p.charAt(1) == "w")
                    pos += 'left:' + (m[0] + plotOffset.left) + 'px;';
                var legend = $('<div class="legend">' + table.replace('style="', 'style="position:absolute;' + pos +';') + '</div>').appendTo(placeholder);
                if (options.legend.backgroundOpacity != 0.0) {
                    // put in the transparent background
                    // separately to avoid blended labels and
                    // label boxes
                    var c = options.legend.backgroundColor;
                    if (c == null) {
                        c = options.grid.backgroundColor;
                        if (c && typeof c == "string")
                            c = $.color.parse(c);
                        else
                            c = $.color.extract(legend, 'background-color');
                        c.a = 1;
                        c = c.toString();
                    }
                    var div = legend.children();
                    $('<div style="position:absolute;width:' + div.width() + 'px;height:' + div.height() + 'px;' + pos +'background-color:' + c + ';"> </div>').prependTo(legend).css('opacity', options.legend.backgroundOpacity);
                }
            }
        }


        // interactive features

        var highlights = [],
            redrawTimeout = null;

        // returns the data item the mouse is over, or null if none is found
        function findNearbyItem(mouseX, mouseY, seriesFilter) {
            var maxDistance = options.grid.mouseActiveRadius,
                smallestDistance = maxDistance * maxDistance + 1,
                item = null, foundPoint = false, i, j, ps;

            for (i = series.length - 1; i >= 0; --i) {
                if (!seriesFilter(series[i]))
                    continue;

                var s = series[i],
                    axisx = s.xaxis,
                    axisy = s.yaxis,
                    points = s.datapoints.points,
                    mx = axisx.c2p(mouseX), // precompute some stuff to make the loop faster
                    my = axisy.c2p(mouseY),
                    maxx = maxDistance / axisx.scale,
                    maxy = maxDistance / axisy.scale;

                ps = s.datapoints.pointsize;
                // with inverse transforms, we can't use the maxx/maxy
                // optimization, sadly
                if (axisx.options.inverseTransform)
                    maxx = Number.MAX_VALUE;
                if (axisy.options.inverseTransform)
                    maxy = Number.MAX_VALUE;

                if (s.lines.show || s.points.show) {
                    for (j = 0; j < points.length; j += ps) {
                        var x = points[j], y = points[j + 1];
                        if (x == null)
                            continue;

                        // For points and lines, the cursor must be within a
                        // certain distance to the data point
                        if (x - mx > maxx || x - mx < -maxx ||
                            y - my > maxy || y - my < -maxy)
                            continue;

                        // We have to calculate distances in pixels, not in
                        // data units, because the scales of the axes may be different
                        var dx = Math.abs(axisx.p2c(x) - mouseX),
                            dy = Math.abs(axisy.p2c(y) - mouseY),
                            dist = dx * dx + dy * dy; // we save the sqrt

                        // use <= to ensure last point takes precedence
                        // (last generally means on top of)
                        if (dist < smallestDistance) {
                            smallestDistance = dist;
                            item = [i, j / ps];
                        }
                    }
                }

                if (s.bars.show && !item) { // no other point can be nearby

                    var barLeft, barRight;

                    switch (s.bars.align) {
                        case "left":
                            barLeft = 0;
                            break;
                        case "right":
                            barLeft = -s.bars.barWidth;
                            break;
                        default:
                            barLeft = -s.bars.barWidth / 2;
                    }

                    barRight = barLeft + s.bars.barWidth;

                    for (j = 0; j < points.length; j += ps) {
                        var x = points[j], y = points[j + 1], b = points[j + 2];
                        if (x == null)
                            continue;

                        // for a bar graph, the cursor must be inside the bar
                        if (series[i].bars.horizontal ?
                            (mx <= Math.max(b, x) && mx >= Math.min(b, x) &&
                             my >= y + barLeft && my <= y + barRight) :
                            (mx >= x + barLeft && mx <= x + barRight &&
                             my >= Math.min(b, y) && my <= Math.max(b, y)))
                                item = [i, j / ps];
                    }
                }
            }

            if (item) {
                i = item[0];
                j = item[1];
                ps = series[i].datapoints.pointsize;

                return { datapoint: series[i].datapoints.points.slice(j * ps, (j + 1) * ps),
                         dataIndex: j,
                         series: series[i],
                         seriesIndex: i };
            }

            return null;
        }

        function onMouseMove(e) {
            if (options.grid.hoverable)
                triggerClickHoverEvent("plothover", e,
                                       function (s) { return s["hoverable"] != false; });
        }

        function onMouseLeave(e) {
            if (options.grid.hoverable)
                triggerClickHoverEvent("plothover", e,
                                       function (s) { return false; });
        }

        function onClick(e) {
            triggerClickHoverEvent("plotclick", e,
                                   function (s) { return s["clickable"] != false; });
        }

        // trigger click or hover event (they send the same parameters
        // so we share their code)
        function triggerClickHoverEvent(eventname, event, seriesFilter) {
            var offset = eventHolder.offset(),
                canvasX = event.pageX - offset.left - plotOffset.left,
                canvasY = event.pageY - offset.top - plotOffset.top,
            pos = canvasToAxisCoords({ left: canvasX, top: canvasY });

            pos.pageX = event.pageX;
            pos.pageY = event.pageY;

            var item = findNearbyItem(canvasX, canvasY, seriesFilter);

            if (item) {
                // fill in mouse pos for any listeners out there
                item.pageX = parseInt(item.series.xaxis.p2c(item.datapoint[0]) + offset.left + plotOffset.left, 10);
                item.pageY = parseInt(item.series.yaxis.p2c(item.datapoint[1]) + offset.top + plotOffset.top, 10);
            }

            if (options.grid.autoHighlight) {
                // clear auto-highlights
                for (var i = 0; i < highlights.length; ++i) {
                    var h = highlights[i];
                    if (h.auto == eventname &&
                        !(item && h.series == item.series &&
                          h.point[0] == item.datapoint[0] &&
                          h.point[1] == item.datapoint[1]))
                        unhighlight(h.series, h.point);
                }

                if (item)
                    highlight(item.series, item.datapoint, eventname);
            }

            placeholder.trigger(eventname, [ pos, item ]);
        }

        function triggerRedrawOverlay() {
            var t = options.interaction.redrawOverlayInterval;
            if (t == -1) {      // skip event queue
                drawOverlay();
                return;
            }

            if (!redrawTimeout)
                redrawTimeout = setTimeout(drawOverlay, t);
        }

        function drawOverlay() {
            redrawTimeout = null;

            // draw highlights
            octx.save();
            overlay.clear();
            octx.translate(plotOffset.left, plotOffset.top);

            var i, hi;
            for (i = 0; i < highlights.length; ++i) {
                hi = highlights[i];

                if (hi.series.bars.show)
                    drawBarHighlight(hi.series, hi.point);
                else
                    drawPointHighlight(hi.series, hi.point);
            }
            octx.restore();

            executeHooks(hooks.drawOverlay, [octx]);
        }

        function highlight(s, point, auto) {
            if (typeof s == "number")
                s = series[s];

            if (typeof point == "number") {
                var ps = s.datapoints.pointsize;
                point = s.datapoints.points.slice(ps * point, ps * (point + 1));
            }

            var i = indexOfHighlight(s, point);
            if (i == -1) {
                highlights.push({ series: s, point: point, auto: auto });

                triggerRedrawOverlay();
            }
            else if (!auto)
                highlights[i].auto = false;
        }

        function unhighlight(s, point) {
            if (s == null && point == null) {
                highlights = [];
                triggerRedrawOverlay();
                return;
            }

            if (typeof s == "number")
                s = series[s];

            if (typeof point == "number") {
                var ps = s.datapoints.pointsize;
                point = s.datapoints.points.slice(ps * point, ps * (point + 1));
            }

            var i = indexOfHighlight(s, point);
            if (i != -1) {
                highlights.splice(i, 1);

                triggerRedrawOverlay();
            }
        }

        function indexOfHighlight(s, p) {
            for (var i = 0; i < highlights.length; ++i) {
                var h = highlights[i];
                if (h.series == s && h.point[0] == p[0]
                    && h.point[1] == p[1])
                    return i;
            }
            return -1;
        }

        function drawPointHighlight(series, point) {
            var x = point[0], y = point[1],
                axisx = series.xaxis, axisy = series.yaxis,
                highlightColor = (typeof series.highlightColor === "string") ? series.highlightColor : $.color.parse(series.color).scale('a', 0.5).toString();

            if (x < axisx.min || x > axisx.max || y < axisy.min || y > axisy.max)
                return;

            var pointRadius = series.points.radius + series.points.lineWidth / 2;
            octx.lineWidth = pointRadius;
            octx.strokeStyle = highlightColor;
            var radius = 1.5 * pointRadius;
            x = axisx.p2c(x);
            y = axisy.p2c(y);

            octx.beginPath();
            if (series.points.symbol == "circle")
                octx.arc(x, y, radius, 0, 2 * Math.PI, false);
            else
                series.points.symbol(octx, x, y, radius, false);
            octx.closePath();
            octx.stroke();
        }

        function drawBarHighlight(series, point) {
            var highlightColor = (typeof series.highlightColor === "string") ? series.highlightColor : $.color.parse(series.color).scale('a', 0.5).toString(),
                fillStyle = highlightColor,
                barLeft;

            switch (series.bars.align) {
                case "left":
                    barLeft = 0;
                    break;
                case "right":
                    barLeft = -series.bars.barWidth;
                    break;
                default:
                    barLeft = -series.bars.barWidth / 2;
            }

            octx.lineWidth = series.bars.lineWidth;
            octx.strokeStyle = highlightColor;

            drawBar(point[0], point[1], point[2] || 0, barLeft, barLeft + series.bars.barWidth,
                    function () { return fillStyle; }, series.xaxis, series.yaxis, octx, series.bars.horizontal, series.bars.lineWidth);
        }

        function getColorOrGradient(spec, bottom, top, defaultColor) {
            if (typeof spec == "string")
                return spec;
            else {
                // assume this is a gradient spec; IE currently only
                // supports a simple vertical gradient properly, so that's
                // what we support too
                var gradient = ctx.createLinearGradient(0, top, 0, bottom);

                for (var i = 0, l = spec.colors.length; i < l; ++i) {
                    var c = spec.colors[i];
                    if (typeof c != "string") {
                        var co = $.color.parse(defaultColor);
                        if (c.brightness != null)
                            co = co.scale('rgb', c.brightness);
                        if (c.opacity != null)
                            co.a *= c.opacity;
                        c = co.toString();
                    }
                    gradient.addColorStop(i / (l - 1), c);
                }

                return gradient;
            }
        }
    }

    // Add the plot function to the top level of the jQuery object

    $.plot = function(placeholder, data, options) {
        //var t0 = new Date();
        var plot = new Plot($(placeholder), data, options, $.plot.plugins);
        //(window.console ? console.log : alert)("time used (msecs): " + ((new Date()).getTime() - t0.getTime()));
        return plot;
    };

    $.plot.version = "0.8.3";

    $.plot.plugins = [];

    // Also add the plot function as a chainable property

    $.fn.plot = function(data, options) {
        return this.each(function() {
            $.plot(this, data, options);
        });
    };

    // round to nearby lower multiple of base
    function floorInBase(n, base) {
        return base * Math.floor(n / base);
    }

})(jQuery);
/* Flot plugin for automatically redrawing plots as the placeholder resizes.

Copyright (c) 2007-2014 IOLA and Ole Laursen.
Licensed under the MIT license.

It works by listening for changes on the placeholder div (through the jQuery
resize event plugin) - if the size changes, it will redraw the plot.

There are no options. If you need to disable the plugin for some plots, you
can just fix the size of their placeholders.

*/

/* Inline dependency:
 * jQuery resize event - v1.1 - 3/14/2010
 * http://benalman.com/projects/jquery-resize-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

(function($,e,t){"$:nomunge";var i=[],n=$.resize=$.extend($.resize,{}),a,r=false,s="setTimeout",u="resize",m=u+"-special-event",o="pendingDelay",l="activeDelay",f="throttleWindow";n[o]=200;n[l]=20;n[f]=true;$.event.special[u]={setup:function(){if(!n[f]&&this[s]){return false}var e=$(this);i.push(this);e.data(m,{w:e.width(),h:e.height()});if(i.length===1){a=t;h()}},teardown:function(){if(!n[f]&&this[s]){return false}var e=$(this);for(var t=i.length-1;t>=0;t--){if(i[t]==this){i.splice(t,1);break}}e.removeData(m);if(!i.length){if(r){cancelAnimationFrame(a)}else{clearTimeout(a)}a=null}},add:function(e){if(!n[f]&&this[s]){return false}var i;function a(e,n,a){var r=$(this),s=r.data(m)||{};s.w=n!==t?n:r.width();s.h=a!==t?a:r.height();i.apply(this,arguments)}if($.isFunction(e)){i=e;return a}else{i=e.handler;e.handler=a}}};function h(t){if(r===true){r=t||1}for(var s=i.length-1;s>=0;s--){var l=$(i[s]);if(l[0]==e||l.is(":visible")){var f=l.width(),c=l.height(),d=l.data(m);if(d&&(f!==d.w||c!==d.h)){l.trigger(u,[d.w=f,d.h=c]);r=t||true}}else{d=l.data(m);d.w=0;d.h=0}}if(a!==null){if(r&&(t==null||t-r<1e3)){a=e.requestAnimationFrame(h)}else{a=setTimeout(h,n[o]);r=false}}}if(!e.requestAnimationFrame){e.requestAnimationFrame=function(){return e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(t,i){return e.setTimeout(function(){t((new Date).getTime())},n[l])}}()}if(!e.cancelAnimationFrame){e.cancelAnimationFrame=function(){return e.webkitCancelRequestAnimationFrame||e.mozCancelRequestAnimationFrame||e.oCancelRequestAnimationFrame||e.msCancelRequestAnimationFrame||clearTimeout}()}})(jQuery,this);

(function ($) {
    var options = { }; // no options

    function init(plot) {
        function onResize() {
            var placeholder = plot.getPlaceholder();

            // somebody might have hidden us and we can't plot
            // when we don't have the dimensions
            if (placeholder.width() == 0 || placeholder.height() == 0)
                return;

            plot.resize();
            plot.setupGrid();
            plot.draw();
        }
        
        function bindEvents(plot, eventHolder) {
            plot.getPlaceholder().resize(onResize);
        }

        function shutdown(plot, eventHolder) {
            plot.getPlaceholder().unbind("resize", onResize);
        }
        
        plot.hooks.bindEvents.push(bindEvents);
        plot.hooks.shutdown.push(shutdown);
    }
    
    $.plot.plugins.push({
        init: init,
        options: options,
        name: 'resize',
        version: '1.0'
    });
})(jQuery);
// Peity jQuery plugin version 3.2.1
// (c) 2016 Ben Pickles
//
// http://benpickles.github.io/peity
//
// Released under MIT license.
(function(k,w,h,v){var d=k.fn.peity=function(a,b){y&&this.each(function(){var e=k(this),c=e.data("_peity");c?(a&&(c.type=a),k.extend(c.opts,b)):(c=new x(e,a,k.extend({},d.defaults[a],e.data("peity"),b)),e.change(function(){c.draw()}).data("_peity",c));c.draw()});return this},x=function(a,b,e){this.$el=a;this.type=b;this.opts=e},o=x.prototype,q=o.svgElement=function(a,b){return k(w.createElementNS("http://www.w3.org/2000/svg",a)).attr(b)},y="createElementNS"in w&&q("svg",{})[0].createSVGRect;o.draw=
function(){var a=this.opts;d.graphers[this.type].call(this,a);a.after&&a.after.call(this,a)};o.fill=function(){var a=this.opts.fill;return k.isFunction(a)?a:function(b,e){return a[e%a.length]}};o.prepare=function(a,b){this.$svg||this.$el.hide().after(this.$svg=q("svg",{"class":"peity"}));return this.$svg.empty().data("peity",this).attr({height:b,width:a})};o.values=function(){return k.map(this.$el.text().split(this.opts.delimiter),function(a){return parseFloat(a)})};d.defaults={};d.graphers={};d.register=
function(a,b,e){this.defaults[a]=b;this.graphers[a]=e};d.register("pie",{fill:["#ff9900","#fff4dd","#ffc66e"],radius:8},function(a){if(!a.delimiter){var b=this.$el.text().match(/[^0-9\.]/);a.delimiter=b?b[0]:","}b=k.map(this.values(),function(a){return 0<a?a:0});if("/"==a.delimiter)var e=b[0],b=[e,h.max(0,b[1]-e)];for(var c=0,e=b.length,t=0;c<e;c++)t+=b[c];t||(e=2,t=1,b=[0,1]);var l=2*a.radius,l=this.prepare(a.width||l,a.height||l),c=l.width(),f=l.height(),j=c/2,d=f/2,f=h.min(j,d),a=a.innerRadius;
"donut"==this.type&&!a&&(a=0.5*f);for(var r=h.PI,s=this.fill(),g=this.scale=function(a,b){var c=a/t*r*2-r/2;return[b*h.cos(c)+j,b*h.sin(c)+d]},m=0,c=0;c<e;c++){var u=b[c],i=u/t;if(0!=i){if(1==i)if(a)var i=j-0.01,p=d-f,n=d-a,i=q("path",{d:["M",j,p,"A",f,f,0,1,1,i,p,"L",i,n,"A",a,a,0,1,0,j,n].join(" ")});else i=q("circle",{cx:j,cy:d,r:f});else p=m+u,n=["M"].concat(g(m,f),"A",f,f,0,0.5<i?1:0,1,g(p,f),"L"),a?n=n.concat(g(p,a),"A",a,a,0,0.5<i?1:0,0,g(m,a)):n.push(j,d),m+=u,i=q("path",{d:n.join(" ")});
i.attr("fill",s.call(this,u,c,b));l.append(i)}}});d.register("donut",k.extend(!0,{},d.defaults.pie),function(a){d.graphers.pie.call(this,a)});d.register("line",{delimiter:",",fill:"#c6d9fd",height:16,min:0,stroke:"#4d89f9",strokeWidth:1,width:32},function(a){var b=this.values();1==b.length&&b.push(b[0]);for(var e=h.max.apply(h,a.max==v?b:b.concat(a.max)),c=h.min.apply(h,a.min==v?b:b.concat(a.min)),d=this.prepare(a.width,a.height),l=a.strokeWidth,f=d.width(),j=d.height()-l,k=e-c,e=this.x=function(a){return a*
(f/(b.length-1))},r=this.y=function(a){var b=j;k&&(b-=(a-c)/k*j);return b+l/2},s=r(h.max(c,0)),g=[0,s],m=0;m<b.length;m++)g.push(e(m),r(b[m]));g.push(f,s);a.fill&&d.append(q("polygon",{fill:a.fill,points:g.join(" ")}));l&&d.append(q("polyline",{fill:"none",points:g.slice(2,g.length-2).join(" "),stroke:a.stroke,"stroke-width":l,"stroke-linecap":"square"}))});d.register("bar",{delimiter:",",fill:["#4D89F9"],height:16,min:0,padding:0.1,width:32},function(a){for(var b=this.values(),e=h.max.apply(h,a.max==
v?b:b.concat(a.max)),c=h.min.apply(h,a.min==v?b:b.concat(a.min)),d=this.prepare(a.width,a.height),l=d.width(),f=d.height(),j=e-c,a=a.padding,k=this.fill(),r=this.x=function(a){return a*l/b.length},s=this.y=function(a){return f-(j?(a-c)/j*f:1)},g=0;g<b.length;g++){var m=r(g+a),u=r(g+1-a)-m,i=b[g],p=s(i),n=p,o;j?0>i?n=s(h.min(e,0)):p=s(h.max(c,0)):o=1;o=p-n;0==o&&(o=1,0<e&&j&&n--);d.append(q("rect",{fill:k.call(this,i,g,b),x:m,y:n,width:u,height:o}))}})})(jQuery,document,Math);
/**
 * jQuery CSS Customizable Scrollbar
 *
 * Copyright 2015, Yuriy Khabarov
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * If you found bug, please contact me via email <13real008@gmail.com>
 *
 * Compressed by http://jscompress.com/
 *
 * @author Yuriy Khabarov aka Gromo
 * @version 0.2.11
 * @url https://github.com/gromo/jquery.scrollbar/
 *
 */

!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],b):b("undefined"!=typeof exports?require("jquery"):a.jQuery)}(this,function(a){"use strict";function h(b){if(c.webkit&&!b)return{height:0,width:0};if(!c.data.outer){var d={border:"none","box-sizing":"content-box",height:"200px",margin:"0",padding:"0",width:"200px"};c.data.inner=a("<div>").css(a.extend({},d)),c.data.outer=a("<div>").css(a.extend({left:"-1000px",overflow:"scroll",position:"absolute",top:"-1000px"},d)).append(c.data.inner).appendTo("body")}return c.data.outer.scrollLeft(1e3).scrollTop(1e3),{height:Math.ceil(c.data.outer.offset().top-c.data.inner.offset().top||0),width:Math.ceil(c.data.outer.offset().left-c.data.inner.offset().left||0)}}function i(){var a=h(!0);return!(a.height||a.width)}function j(a){var b=a.originalEvent;return(!b.axis||b.axis!==b.HORIZONTAL_AXIS)&&!b.wheelDeltaX}var b=!1,c={data:{index:0,name:"scrollbar"},firefox:/firefox/i.test(navigator.userAgent),macosx:/mac/i.test(navigator.platform),msedge:/edge\/\d+/i.test(navigator.userAgent),msie:/(msie|trident)/i.test(navigator.userAgent),mobile:/android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent),overlay:null,scroll:null,scrolls:[],webkit:/webkit/i.test(navigator.userAgent)&&!/edge\/\d+/i.test(navigator.userAgent)};c.scrolls.add=function(a){this.remove(a).push(a)},c.scrolls.remove=function(b){for(;a.inArray(b,this)>=0;)this.splice(a.inArray(b,this),1);return this};var d={autoScrollSize:!0,autoUpdate:!0,debug:!1,disableBodyScroll:!1,duration:200,ignoreMobile:!1,ignoreOverlay:!1,isRtl:!1,scrollStep:30,showArrows:!1,stepScrolling:!0,scrollx:null,scrolly:null,onDestroy:null,onFallback:null,onInit:null,onScroll:null,onUpdate:null},e=function(b){c.scroll||(c.overlay=i(),c.scroll=h(),g(),a(window).resize(function(){var a=!1;if(c.scroll&&(c.scroll.height||c.scroll.width)){var b=h();b.height===c.scroll.height&&b.width===c.scroll.width||(c.scroll=b,a=!0)}g(a)})),this.container=b,this.namespace=".scrollbar_"+c.data.index++,this.options=a.extend({},d,window.jQueryScrollbarOptions||{}),this.scrollTo=null,this.scrollx={},this.scrolly={},b.data(c.data.name,this),c.scrolls.add(this)};e.prototype={destroy:function(){if(this.wrapper){this.container.removeData(c.data.name),c.scrolls.remove(this);var b=this.container.scrollLeft(),d=this.container.scrollTop();this.container.insertBefore(this.wrapper).css({height:"",margin:"","max-height":""}).removeClass("scroll-content scroll-scrollx_visible scroll-scrolly_visible").off(this.namespace).scrollLeft(b).scrollTop(d),this.scrollx.scroll.removeClass("scroll-scrollx_visible").find("div").addBack().off(this.namespace),this.scrolly.scroll.removeClass("scroll-scrolly_visible").find("div").addBack().off(this.namespace),this.wrapper.remove(),a(document).add("body").off(this.namespace),a.isFunction(this.options.onDestroy)&&this.options.onDestroy.apply(this,[this.container])}},init:function(b){var d=this,e=this.container,f=this.containerWrapper||e,g=this.namespace,h=a.extend(this.options,b||{}),i={x:this.scrollx,y:this.scrolly},k=this.wrapper,l={},m={scrollLeft:e.scrollLeft(),scrollTop:e.scrollTop()};if(c.mobile&&h.ignoreMobile||c.overlay&&h.ignoreOverlay||c.macosx&&!c.webkit)return a.isFunction(h.onFallback)&&h.onFallback.apply(this,[e]),!1;if(k)l={height:"auto","margin-bottom":c.scroll.height*-1+"px","max-height":""},l[h.isRtl?"margin-left":"margin-right"]=c.scroll.width*-1+"px",f.css(l);else{if(this.wrapper=k=a("<div>").addClass("scroll-wrapper").addClass(e.attr("class")).css("position","absolute"===e.css("position")?"absolute":"relative").insertBefore(e).append(e),h.isRtl&&k.addClass("scroll--rtl"),e.is("textarea")&&(this.containerWrapper=f=a("<div>").insertBefore(e).append(e),k.addClass("scroll-textarea")),l={height:"auto","margin-bottom":c.scroll.height*-1+"px","max-height":""},l[h.isRtl?"margin-left":"margin-right"]=c.scroll.width*-1+"px",f.addClass("scroll-content").css(l),e.on("scroll"+g,function(b){var f=e.scrollLeft(),g=e.scrollTop();if(h.isRtl)switch(!0){case c.firefox:f=Math.abs(f);case c.msedge||c.msie:f=e[0].scrollWidth-e[0].clientWidth-f}a.isFunction(h.onScroll)&&h.onScroll.call(d,{maxScroll:i.y.maxScrollOffset,scroll:g,size:i.y.size,visible:i.y.visible},{maxScroll:i.x.maxScrollOffset,scroll:f,size:i.x.size,visible:i.x.visible}),i.x.isVisible&&i.x.scroll.bar.css("left",f*i.x.kx+"px"),i.y.isVisible&&i.y.scroll.bar.css("top",g*i.y.kx+"px")}),k.on("scroll"+g,function(){k.scrollTop(0).scrollLeft(0)}),h.disableBodyScroll){var n=function(a){j(a)?i.y.isVisible&&i.y.mousewheel(a):i.x.isVisible&&i.x.mousewheel(a)};k.on("MozMousePixelScroll"+g,n),k.on("mousewheel"+g,n),c.mobile&&k.on("touchstart"+g,function(b){var c=b.originalEvent.touches&&b.originalEvent.touches[0]||b,d={pageX:c.pageX,pageY:c.pageY},f={left:e.scrollLeft(),top:e.scrollTop()};a(document).on("touchmove"+g,function(a){var b=a.originalEvent.targetTouches&&a.originalEvent.targetTouches[0]||a;e.scrollLeft(f.left+d.pageX-b.pageX),e.scrollTop(f.top+d.pageY-b.pageY),a.preventDefault()}),a(document).on("touchend"+g,function(){a(document).off(g)})})}a.isFunction(h.onInit)&&h.onInit.apply(this,[e])}a.each(i,function(b,f){var k=null,l=1,m="x"===b?"scrollLeft":"scrollTop",n=h.scrollStep,o=function(){var a=e[m]();e[m](a+n),1==l&&a+n>=p&&(a=e[m]()),l==-1&&a+n<=p&&(a=e[m]()),e[m]()==a&&k&&k()},p=0;f.scroll||(f.scroll=d._getScroll(h["scroll"+b]).addClass("scroll-"+b),h.showArrows&&f.scroll.addClass("scroll-element_arrows_visible"),f.mousewheel=function(a){if(!f.isVisible||"x"===b&&j(a))return!0;if("y"===b&&!j(a))return i.x.mousewheel(a),!0;var c=a.originalEvent.wheelDelta*-1||a.originalEvent.detail,g=f.size-f.visible-f.offset;return c||("x"===b&&a.originalEvent.deltaX?c=40*a.originalEvent.deltaX:"y"===b&&a.originalEvent.deltaY&&(c=40*a.originalEvent.deltaY)),(c>0&&p<g||c<0&&p>0)&&(p+=c,p<0&&(p=0),p>g&&(p=g),d.scrollTo=d.scrollTo||{},d.scrollTo[m]=p,setTimeout(function(){d.scrollTo&&(e.stop().animate(d.scrollTo,240,"linear",function(){p=e[m]()}),d.scrollTo=null)},1)),a.preventDefault(),!1},f.scroll.on("MozMousePixelScroll"+g,f.mousewheel).on("mousewheel"+g,f.mousewheel).on("mouseenter"+g,function(){p=e[m]()}),f.scroll.find(".scroll-arrow, .scroll-element_track").on("mousedown"+g,function(g){if(1!=g.which)return!0;l=1;var i={eventOffset:g["x"===b?"pageX":"pageY"],maxScrollValue:f.size-f.visible-f.offset,scrollbarOffset:f.scroll.bar.offset()["x"===b?"left":"top"],scrollbarSize:f.scroll.bar["x"===b?"outerWidth":"outerHeight"]()},j=0,q=0;if(a(this).hasClass("scroll-arrow")){if(l=a(this).hasClass("scroll-arrow_more")?1:-1,n=h.scrollStep*l,p=l>0?i.maxScrollValue:0,h.isRtl)switch(!0){case c.firefox:p=l>0?0:i.maxScrollValue*-1;break;case c.msie||c.msedge:}}else l=i.eventOffset>i.scrollbarOffset+i.scrollbarSize?1:i.eventOffset<i.scrollbarOffset?-1:0,"x"===b&&h.isRtl&&(c.msie||c.msedge)&&(l*=-1),n=Math.round(.75*f.visible)*l,p=i.eventOffset-i.scrollbarOffset-(h.stepScrolling?1==l?i.scrollbarSize:0:Math.round(i.scrollbarSize/2)),p=e[m]()+p/f.kx;return d.scrollTo=d.scrollTo||{},d.scrollTo[m]=h.stepScrolling?e[m]()+n:p,h.stepScrolling&&(k=function(){p=e[m](),clearInterval(q),clearTimeout(j),j=0,q=0},j=setTimeout(function(){q=setInterval(o,40)},h.duration+100)),setTimeout(function(){d.scrollTo&&(e.animate(d.scrollTo,h.duration),d.scrollTo=null)},1),d._handleMouseDown(k,g)}),f.scroll.bar.on("mousedown"+g,function(i){if(1!=i.which)return!0;var j=i["x"===b?"pageX":"pageY"],k=e[m]();return f.scroll.addClass("scroll-draggable"),a(document).on("mousemove"+g,function(a){var d=parseInt((a["x"===b?"pageX":"pageY"]-j)/f.kx,10);"x"===b&&h.isRtl&&(c.msie||c.msedge)&&(d*=-1),e[m](k+d)}),d._handleMouseDown(function(){f.scroll.removeClass("scroll-draggable"),p=e[m]()},i)}))}),a.each(i,function(a,b){var c="scroll-scroll"+a+"_visible",d="x"==a?i.y:i.x;b.scroll.removeClass(c),d.scroll.removeClass(c),f.removeClass(c)}),a.each(i,function(b,c){a.extend(c,"x"==b?{offset:parseInt(e.css("left"),10)||0,size:e.prop("scrollWidth"),visible:k.width()}:{offset:parseInt(e.css("top"),10)||0,size:e.prop("scrollHeight"),visible:k.height()})}),this._updateScroll("x",this.scrollx),this._updateScroll("y",this.scrolly),a.isFunction(h.onUpdate)&&h.onUpdate.apply(this,[e]),a.each(i,function(a,b){var c="x"===a?"left":"top",d="x"===a?"outerWidth":"outerHeight",f="x"===a?"width":"height",g=parseInt(e.css(c),10)||0,i=b.size,j=b.visible+g,k=b.scroll.size[d]()+(parseInt(b.scroll.size.css(c),10)||0);h.autoScrollSize&&(b.scrollbarSize=parseInt(k*j/i,10),b.scroll.bar.css(f,b.scrollbarSize+"px")),b.scrollbarSize=b.scroll.bar[d](),b.kx=(k-b.scrollbarSize)/(i-j)||1,b.maxScrollOffset=i-j}),e.scrollLeft(m.scrollLeft).scrollTop(m.scrollTop).trigger("scroll")},_getScroll:function(b){var c={advanced:['<div class="scroll-element">','<div class="scroll-element_corner"></div>','<div class="scroll-arrow scroll-arrow_less"></div>','<div class="scroll-arrow scroll-arrow_more"></div>','<div class="scroll-element_outer">','<div class="scroll-element_size"></div>','<div class="scroll-element_inner-wrapper">','<div class="scroll-element_inner scroll-element_track">','<div class="scroll-element_inner-bottom"></div>',"</div>","</div>",'<div class="scroll-bar">','<div class="scroll-bar_body">','<div class="scroll-bar_body-inner"></div>',"</div>",'<div class="scroll-bar_bottom"></div>','<div class="scroll-bar_center"></div>',"</div>","</div>","</div>"].join(""),simple:['<div class="scroll-element">','<div class="scroll-element_outer">','<div class="scroll-element_size"></div>','<div class="scroll-element_track"></div>','<div class="scroll-bar"></div>',"</div>","</div>"].join("")};return c[b]&&(b=c[b]),b||(b=c.simple),b="string"==typeof b?a(b).appendTo(this.wrapper):a(b),a.extend(b,{bar:b.find(".scroll-bar"),size:b.find(".scroll-element_size"),track:b.find(".scroll-element_track")}),b},_handleMouseDown:function(b,c){var d=this.namespace;return a(document).on("blur"+d,function(){a(document).add("body").off(d),b&&b()}),a(document).on("dragstart"+d,function(a){return a.preventDefault(),!1}),a(document).on("mouseup"+d,function(){a(document).add("body").off(d),b&&b()}),a("body").on("selectstart"+d,function(a){return a.preventDefault(),!1}),c&&c.preventDefault(),!1},_updateScroll:function(b,d){var e=this.container,f=this.containerWrapper||e,g="scroll-scroll"+b+"_visible",h="x"===b?this.scrolly:this.scrollx,i=parseInt(this.container.css("x"===b?"left":"top"),10)||0,j=this.wrapper,k=d.size,l=d.visible+i;d.isVisible=k-l>1,d.isVisible?(d.scroll.addClass(g),h.scroll.addClass(g),f.addClass(g)):(d.scroll.removeClass(g),h.scroll.removeClass(g),f.removeClass(g)),"y"===b&&(e.is("textarea")||k<l?f.css({height:l+c.scroll.height+"px","max-height":"none"}):f.css({"max-height":l+c.scroll.height+"px"})),d.size==e.prop("scrollWidth")&&h.size==e.prop("scrollHeight")&&d.visible==j.width()&&h.visible==j.height()&&d.offset==(parseInt(e.css("left"),10)||0)&&h.offset==(parseInt(e.css("top"),10)||0)||(a.extend(this.scrollx,{offset:parseInt(e.css("left"),10)||0,size:e.prop("scrollWidth"),visible:j.width()}),a.extend(this.scrolly,{offset:parseInt(e.css("top"),10)||0,size:this.container.prop("scrollHeight"),visible:j.height()}),this._updateScroll("x"===b?"y":"x",h))}};var f=e;a.fn.scrollbar=function(b,d){return"string"!=typeof b&&(d=b,b="init"),"undefined"==typeof d&&(d=[]),a.isArray(d)||(d=[d]),this.not("body, .scroll-wrapper").each(function(){var e=a(this),g=e.data(c.data.name);(g||"init"===b)&&(g||(g=new f(e)),g[b]&&g[b].apply(g,d))}),this},a.fn.scrollbar.options=d;var g=function(){var a=0,d=0;return function(e){var f,h,i,j,k,l,m;for(f=0;f<c.scrolls.length;f++)j=c.scrolls[f],h=j.container,i=j.options,k=j.wrapper,l=j.scrollx,m=j.scrolly,(e||i.autoUpdate&&k&&k.is(":visible")&&(h.prop("scrollWidth")!=l.size||h.prop("scrollHeight")!=m.size||k.width()!=l.visible||k.height()!=m.visible))&&(j.init(),i.debug&&(window.console&&console.log({scrollHeight:h.prop("scrollHeight")+":"+j.scrolly.size,scrollWidth:h.prop("scrollWidth")+":"+j.scrollx.size,visibleHeight:k.height()+":"+j.scrolly.visible,visibleWidth:k.width()+":"+j.scrollx.visible},!0),d++));b&&d>10?(window.console&&console.log("Scroll updates exceed 10"),g=function(){}):(clearTimeout(a),a=setTimeout(g,300))}}();window.angular&&!function(a){a.module("jQueryScrollbar",[]).provider("jQueryScrollbar",function(){var b=d;return{setOptions:function(c){a.extend(b,c)},$get:function(){return{options:a.copy(b)}}}}).directive("jqueryScrollbar",["jQueryScrollbar","$parse",function(a,b){return{restrict:"AC",link:function(c,d,e){var f=b(e.jqueryScrollbar),g=f(c);d.scrollbar(g||a.options).on("$destroy",function(){d.scrollbar("destroy")})}}}])}(window.angular)});
/*!
 * JQVMap: jQuery Vector Map Library
 * @author JQVMap <me@peterschmalfeldt.com>
 * @version 1.5.1
 * @link http://jqvmap.com
 * @license https://github.com/manifestinteractive/jqvmap/blob/master/LICENSE
 * @builddate 2016/05/18
 */


var VectorCanvas = function (width, height, params) {
  this.mode = window.SVGAngle ? 'svg' : 'vml';
  this.params = params;

  if (this.mode === 'svg') {
    this.createSvgNode = function (nodeName) {
      return document.createElementNS(this.svgns, nodeName);
    };
  } else {
    try {
      if (!document.namespaces.rvml) {
        document.namespaces.add('rvml', 'urn:schemas-microsoft-com:vml');
      }
      this.createVmlNode = function (tagName) {
        return document.createElement('<rvml:' + tagName + ' class="rvml">');
      };
    } catch (e) {
      this.createVmlNode = function (tagName) {
        return document.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
      };
    }

    document.createStyleSheet().addRule('.rvml', 'behavior:url(#default#VML)');
  }

  if (this.mode === 'svg') {
    this.canvas = this.createSvgNode('svg');
  } else {
    this.canvas = this.createVmlNode('group');
    this.canvas.style.position = 'absolute';
  }

  this.setSize(width, height);
};

VectorCanvas.prototype = {
  svgns: 'http://www.w3.org/2000/svg',
  mode: 'svg',
  width: 0,
  height: 0,
  canvas: null
};

var ColorScale = function (colors, normalizeFunction, minValue, maxValue) {
  if (colors) {
    this.setColors(colors);
  }
  if (normalizeFunction) {
    this.setNormalizeFunction(normalizeFunction);
  }
  if (minValue) {
    this.setMin(minValue);
  }
  if (minValue) {
    this.setMax(maxValue);
  }
};

ColorScale.prototype = {
  colors: []
};

var JQVMap = function (params) {
  params = params || {};
  var map = this;
  var mapData = JQVMap.maps[params.map];
  var mapPins;

  if( !mapData){
    throw new Error('Invalid "' + params.map + '" map parameter. Please make sure you have loaded this map file in your HTML.');
  }

  this.selectedRegions = [];
  this.multiSelectRegion = params.multiSelectRegion;

  this.container = params.container;

  this.defaultWidth = mapData.width;
  this.defaultHeight = mapData.height;

  this.color = params.color;
  this.selectedColor = params.selectedColor;
  this.hoverColor = params.hoverColor;
  this.hoverColors = params.hoverColors;
  this.hoverOpacity = params.hoverOpacity;
  this.setBackgroundColor(params.backgroundColor);

  this.width = params.container.width();
  this.height = params.container.height();

  this.resize();

  jQuery(window).resize(function () {
    var newWidth = params.container.width();
    var newHeight = params.container.height();

    if(newWidth && newHeight){
      map.width = newWidth;
      map.height = newHeight;
      map.resize();
      map.canvas.setSize(map.width, map.height);
      map.applyTransform();

      var resizeEvent = jQuery.Event('resize.jqvmap');
      jQuery(params.container).trigger(resizeEvent, [newWidth, newHeight]);

      if(mapPins){
        jQuery('.jqvmap-pin').remove();
        map.pinHandlers = false;
        map.placePins(mapPins.pins, mapPins.mode);
      }
    }
  });

  this.canvas = new VectorCanvas(this.width, this.height, params);
  params.container.append(this.canvas.canvas);

  this.makeDraggable();

  this.rootGroup = this.canvas.createGroup(true);

  this.index = JQVMap.mapIndex;
  this.label = jQuery('<div/>').addClass('jqvmap-label').appendTo(jQuery('body')).hide();

  if (params.enableZoom) {
    jQuery('<div/>').addClass('jqvmap-zoomin').text('+').appendTo(params.container);
    jQuery('<div/>').addClass('jqvmap-zoomout').html('&#x2212;').appendTo(params.container);
  }

  map.countries = [];

  for (var key in mapData.paths) {
    var path = this.canvas.createPath({
      path: mapData.paths[key].path
    });

    path.setFill(this.color);
    path.id = map.getCountryId(key);
    map.countries[key] = path;

    if (this.canvas.mode === 'svg') {
      path.setAttribute('class', 'jqvmap-region');
    } else {
      jQuery(path).addClass('jqvmap-region');
    }

    jQuery(this.rootGroup).append(path);
  }

  jQuery(params.container).delegate(this.canvas.mode === 'svg' ? 'path' : 'shape', 'mouseover mouseout', function (e) {
    var containerPath = e.target,
      code = e.target.id.split('_').pop(),
      labelShowEvent = jQuery.Event('labelShow.jqvmap'),
      regionMouseOverEvent = jQuery.Event('regionMouseOver.jqvmap');

    code = code.toLowerCase();

    if (e.type === 'mouseover') {
      jQuery(params.container).trigger(regionMouseOverEvent, [code, mapData.paths[code].name]);
      if (!regionMouseOverEvent.isDefaultPrevented()) {
        map.highlight(code, containerPath);
      }
      if (params.showTooltip) {
        map.label.text(mapData.paths[code].name);
        jQuery(params.container).trigger(labelShowEvent, [map.label, code]);

        if (!labelShowEvent.isDefaultPrevented()) {
          map.label.show();
          map.labelWidth = map.label.width();
          map.labelHeight = map.label.height();
        }
      }
    } else {
      map.unhighlight(code, containerPath);

      map.label.hide();
      jQuery(params.container).trigger('regionMouseOut.jqvmap', [code, mapData.paths[code].name]);
    }
  });

  jQuery(params.container).delegate(this.canvas.mode === 'svg' ? 'path' : 'shape', 'click', function (regionClickEvent) {

    var targetPath = regionClickEvent.target;
    var code = regionClickEvent.target.id.split('_').pop();
    var mapClickEvent = jQuery.Event('regionClick.jqvmap');

    code = code.toLowerCase();

    jQuery(params.container).trigger(mapClickEvent, [code, mapData.paths[code].name]);

    if ( !params.multiSelectRegion && !mapClickEvent.isDefaultPrevented()) {
      for (var keyPath in mapData.paths) {
        map.countries[keyPath].currentFillColor = map.countries[keyPath].getOriginalFill();
        map.countries[keyPath].setFill(map.countries[keyPath].getOriginalFill());
      }
    }

    if ( !mapClickEvent.isDefaultPrevented()) {
      if (map.isSelected(code)) {
        map.deselect(code, targetPath);
      } else {
        map.select(code, targetPath);
      }
    }
  });

  if (params.showTooltip) {
    params.container.mousemove(function (e) {
      if (map.label.is(':visible')) {
        var left = e.pageX - 15 - map.labelWidth;
        var top = e.pageY - 15 - map.labelHeight;

        if(left < 0) {
          left = e.pageX + 15;
        }
        if(top < 0) {
          top = e.pageY + 15;
        }

        map.label.css({
          left: left,
          top: top
        });
      }
    });
  }

  this.setColors(params.colors);

  this.canvas.canvas.appendChild(this.rootGroup);

  this.applyTransform();

  this.colorScale = new ColorScale(params.scaleColors, params.normalizeFunction, params.valueMin, params.valueMax);

  if (params.values) {
    this.values = params.values;
    this.setValues(params.values);
  }

  if (params.selectedRegions) {
    if (params.selectedRegions instanceof Array) {
      for(var k in params.selectedRegions) {
        this.select(params.selectedRegions[k].toLowerCase());
      }
    } else {
      this.select(params.selectedRegions.toLowerCase());
    }
  }

  this.bindZoomButtons();

  if(params.pins) {
    mapPins = {
      pins: params.pins,
      mode: params.pinMode
    };

    this.pinHandlers = false;
    this.placePins(params.pins, params.pinMode);
  }

  if(params.showLabels){
    this.pinHandlers = false;

    var pins = {};
    for (key in map.countries){
      if (typeof map.countries[key] !== 'function') {
        if( !params.pins || !params.pins[key] ){
          pins[key] = key.toUpperCase();
        }
      }
    }

    mapPins = {
      pins: pins,
      mode: 'content'
    };

    this.placePins(pins, 'content');
  }

  JQVMap.mapIndex++;
};

JQVMap.prototype = {
  transX: 0,
  transY: 0,
  scale: 1,
  baseTransX: 0,
  baseTransY: 0,
  baseScale: 1,
  width: 0,
  height: 0,
  countries: {},
  countriesColors: {},
  countriesData: {},
  zoomStep: 1.4,
  zoomMaxStep: 4,
  zoomCurStep: 1
};

JQVMap.xlink = 'http://www.w3.org/1999/xlink';
JQVMap.mapIndex = 1;
JQVMap.maps = {};

(function(){

  var apiParams = {
    colors: 1,
    values: 1,
    backgroundColor: 1,
    scaleColors: 1,
    normalizeFunction: 1,
    enableZoom: 1,
    showTooltip: 1,
    borderColor: 1,
    borderWidth: 1,
    borderOpacity: 1,
    selectedRegions: 1,
    multiSelectRegion: 1
  };

  var apiEvents = {
    onLabelShow: 'labelShow',
    onLoad: 'load',
    onRegionOver: 'regionMouseOver',
    onRegionOut: 'regionMouseOut',
    onRegionClick: 'regionClick',
    onRegionSelect: 'regionSelect',
    onRegionDeselect: 'regionDeselect',
    onResize: 'resize'
  };

  jQuery.fn.vectorMap = function (options) {

    var defaultParams = {
      map: 'world_en',
      backgroundColor: '#a5bfdd',
      color: '#f4f3f0',
      hoverColor: '#c9dfaf',
      hoverColors: {},
      selectedColor: '#c9dfaf',
      scaleColors: ['#b6d6ff', '#005ace'],
      normalizeFunction: 'linear',
      enableZoom: true,
      showTooltip: true,
      borderColor: '#818181',
      borderWidth: 1,
      borderOpacity: 0.25,
      selectedRegions: null,
      multiSelectRegion: false
    }, map = this.data('mapObject');

    if (options === 'addMap') {
      JQVMap.maps[arguments[1]] = arguments[2];
    } else if (options === 'set' && apiParams[arguments[1]]) {
      map['set' + arguments[1].charAt(0).toUpperCase() + arguments[1].substr(1)].apply(map, Array.prototype.slice.call(arguments, 2));
    } else if (typeof options === 'string' &&
      typeof map[options] === 'function') {
      return map[options].apply(map, Array.prototype.slice.call(arguments, 1));
    } else {
      jQuery.extend(defaultParams, options);
      defaultParams.container = this;
      this.css({ position: 'relative', overflow: 'hidden' });

      map = new JQVMap(defaultParams);

      this.data('mapObject', map);

      this.unbind('.jqvmap');

      for (var e in apiEvents) {
        if (defaultParams[e]) {
          this.bind(apiEvents[e] + '.jqvmap', defaultParams[e]);
        }
      }

      var loadEvent = jQuery.Event('load.jqvmap');
      jQuery(defaultParams.container).trigger(loadEvent, map);

      return map;
    }
  };

})(jQuery);

ColorScale.arrayToRgb = function (ar) {
  var rgb = '#';
  var d;
  for (var i = 0; i < ar.length; i++) {
    d = ar[i].toString(16);
    rgb += d.length === 1 ? '0' + d : d;
  }
  return rgb;
};

ColorScale.prototype.getColor = function (value) {
  if (typeof this.normalize === 'function') {
    value = this.normalize(value);
  }

  var lengthes = [];
  var fullLength = 0;
  var l;

  for (var i = 0; i < this.colors.length - 1; i++) {
    l = this.vectorLength(this.vectorSubtract(this.colors[i + 1], this.colors[i]));
    lengthes.push(l);
    fullLength += l;
  }

  var c = (this.maxValue - this.minValue) / fullLength;

  for (i = 0; i < lengthes.length; i++) {
    lengthes[i] *= c;
  }

  i = 0;
  value -= this.minValue;

  while (value - lengthes[i] >= 0) {
    value -= lengthes[i];
    i++;
  }

  var color;
  if (i === this.colors.length - 1) {
    color = this.vectorToNum(this.colors[i]).toString(16);
  } else {
    color = (this.vectorToNum(this.vectorAdd(this.colors[i], this.vectorMult(this.vectorSubtract(this.colors[i + 1], this.colors[i]), (value) / (lengthes[i]))))).toString(16);
  }

  while (color.length < 6) {
    color = '0' + color;
  }
  return '#' + color;
};

ColorScale.rgbToArray = function (rgb) {
  rgb = rgb.substr(1);
  return [parseInt(rgb.substr(0, 2), 16), parseInt(rgb.substr(2, 2), 16), parseInt(rgb.substr(4, 2), 16)];
};

ColorScale.prototype.setColors = function (colors) {
  for (var i = 0; i < colors.length; i++) {
    colors[i] = ColorScale.rgbToArray(colors[i]);
  }
  this.colors = colors;
};

ColorScale.prototype.setMax = function (max) {
  this.clearMaxValue = max;
  if (typeof this.normalize === 'function') {
    this.maxValue = this.normalize(max);
  } else {
    this.maxValue = max;
  }
};

ColorScale.prototype.setMin = function (min) {
  this.clearMinValue = min;

  if (typeof this.normalize === 'function') {
    this.minValue = this.normalize(min);
  } else {
    this.minValue = min;
  }
};

ColorScale.prototype.setNormalizeFunction = function (f) {
  if (f === 'polynomial') {
    this.normalize = function (value) {
      return Math.pow(value, 0.2);
    };
  } else if (f === 'linear') {
    delete this.normalize;
  } else {
    this.normalize = f;
  }
  this.setMin(this.clearMinValue);
  this.setMax(this.clearMaxValue);
};

ColorScale.prototype.vectorAdd = function (vector1, vector2) {
  var vector = [];
  for (var i = 0; i < vector1.length; i++) {
    vector[i] = vector1[i] + vector2[i];
  }
  return vector;
};

ColorScale.prototype.vectorLength = function (vector) {
  var result = 0;
  for (var i = 0; i < vector.length; i++) {
    result += vector[i] * vector[i];
  }
  return Math.sqrt(result);
};

ColorScale.prototype.vectorMult = function (vector, num) {
  var result = [];
  for (var i = 0; i < vector.length; i++) {
    result[i] = vector[i] * num;
  }
  return result;
};

ColorScale.prototype.vectorSubtract = function (vector1, vector2) {
  var vector = [];
  for (var i = 0; i < vector1.length; i++) {
    vector[i] = vector1[i] - vector2[i];
  }
  return vector;
};

ColorScale.prototype.vectorToNum = function (vector) {
  var num = 0;
  for (var i = 0; i < vector.length; i++) {
    num += Math.round(vector[i]) * Math.pow(256, vector.length - i - 1);
  }
  return num;
};

JQVMap.prototype.applyTransform = function () {
  var maxTransX, maxTransY, minTransX, minTransY;
  if (this.defaultWidth * this.scale <= this.width) {
    maxTransX = (this.width - this.defaultWidth * this.scale) / (2 * this.scale);
    minTransX = (this.width - this.defaultWidth * this.scale) / (2 * this.scale);
  } else {
    maxTransX = 0;
    minTransX = (this.width - this.defaultWidth * this.scale) / this.scale;
  }

  if (this.defaultHeight * this.scale <= this.height) {
    maxTransY = (this.height - this.defaultHeight * this.scale) / (2 * this.scale);
    minTransY = (this.height - this.defaultHeight * this.scale) / (2 * this.scale);
  } else {
    maxTransY = 0;
    minTransY = (this.height - this.defaultHeight * this.scale) / this.scale;
  }

  if (this.transY > maxTransY) {
    this.transY = maxTransY;
  } else if (this.transY < minTransY) {
    this.transY = minTransY;
  }
  if (this.transX > maxTransX) {
    this.transX = maxTransX;
  } else if (this.transX < minTransX) {
    this.transX = minTransX;
  }

  this.canvas.applyTransformParams(this.scale, this.transX, this.transY);
};

JQVMap.prototype.bindZoomButtons = function () {
  var map = this;
  this.container.find('.jqvmap-zoomin').click(function(){
    map.zoomIn();
  });
  this.container.find('.jqvmap-zoomout').click(function(){
    map.zoomOut();
  });
};

JQVMap.prototype.deselect = function (cc, path) {
  cc = cc.toLowerCase();
  path = path || jQuery('#' + this.getCountryId(cc))[0];

  if (this.isSelected(cc)) {
    this.selectedRegions.splice(this.selectIndex(cc), 1);

    jQuery(this.container).trigger('regionDeselect.jqvmap', [cc]);
    path.currentFillColor = path.getOriginalFill();
    path.setFill(path.getOriginalFill());
  } else {
    for (var key in this.countries) {
      this.selectedRegions.splice(this.selectedRegions.indexOf(key), 1);
      this.countries[key].currentFillColor = this.color;
      this.countries[key].setFill(this.color);
    }
  }
};

JQVMap.prototype.getCountryId = function (cc) {
  return 'jqvmap' + this.index + '_' + cc;
};

JQVMap.prototype.getPin = function(cc){
  var pinObj = jQuery('#' + this.getPinId(cc));
  return pinObj.html();
};

JQVMap.prototype.getPinId = function (cc) {
  return this.getCountryId(cc) + '_pin';
};

JQVMap.prototype.getPins = function(){
  var pins = this.container.find('.jqvmap-pin');
  var ret = {};
  jQuery.each(pins, function(index, pinObj){
    pinObj = jQuery(pinObj);
    var cc = pinObj.attr('for').toLowerCase();
    var pinContent = pinObj.html();
    ret[cc] = pinContent;
  });
  return JSON.stringify(ret);
};

JQVMap.prototype.highlight = function (cc, path) {
  path = path || jQuery('#' + this.getCountryId(cc))[0];
  if (this.hoverOpacity) {
    path.setOpacity(this.hoverOpacity);
  } else if (this.hoverColors && (cc in this.hoverColors)) {
    path.currentFillColor = path.getFill() + '';
    path.setFill(this.hoverColors[cc]);
  } else if (this.hoverColor) {
    path.currentFillColor = path.getFill() + '';
    path.setFill(this.hoverColor);
  }
};

JQVMap.prototype.isSelected = function(cc) {
  return this.selectIndex(cc) >= 0;
};

JQVMap.prototype.makeDraggable = function () {
  var mouseDown = false;
  var oldPageX, oldPageY;
  var self = this;

  self.isMoving = false;
  self.isMovingTimeout = false;

  var lastTouchCount;
  var touchCenterX;
  var touchCenterY;
  var touchStartDistance;
  var touchStartScale;
  var touchX;
  var touchY;

  this.container.mousemove(function (e) {

    if (mouseDown) {
      self.transX -= (oldPageX - e.pageX) / self.scale;
      self.transY -= (oldPageY - e.pageY) / self.scale;

      self.applyTransform();

      oldPageX = e.pageX;
      oldPageY = e.pageY;

      self.isMoving = true;
      if (self.isMovingTimeout) {
        clearTimeout(self.isMovingTimeout);
      }

      self.container.trigger('drag');
    }

    return false;

  }).mousedown(function (e) {

    mouseDown = true;
    oldPageX = e.pageX;
    oldPageY = e.pageY;

    return false;

  }).mouseup(function () {

    mouseDown = false;

    clearTimeout(self.isMovingTimeout);
    self.isMovingTimeout = setTimeout(function () {
      self.isMoving = false;
    }, 100);

    return false;

  }).mouseout(function () {

    if(mouseDown && self.isMoving){

      clearTimeout(self.isMovingTimeout);
      self.isMovingTimeout = setTimeout(function () {
        mouseDown = false;
        self.isMoving = false;
      }, 100);

      return false;
    }
  });

  jQuery(this.container).bind('touchmove', function (e) {

    var offset;
    var scale;
    var touches = e.originalEvent.touches;
    var transformXOld;
    var transformYOld;

    if (touches.length === 1) {
      if (lastTouchCount === 1) {

        if(touchX === touches[0].pageX && touchY === touches[0].pageY){
          return;
        }

        transformXOld = self.transX;
        transformYOld = self.transY;

        self.transX -= (touchX - touches[0].pageX) / self.scale;
        self.transY -= (touchY - touches[0].pageY) / self.scale;

        self.applyTransform();

        if (transformXOld !== self.transX || transformYOld !== self.transY) {
          e.preventDefault();
        }

        self.isMoving = true;
        if (self.isMovingTimeout) {
          clearTimeout(self.isMovingTimeout);
        }
      }

      touchX = touches[0].pageX;
      touchY = touches[0].pageY;

    } else if (touches.length === 2) {

      if (lastTouchCount === 2) {
        scale = Math.sqrt(
            Math.pow(touches[0].pageX - touches[1].pageX, 2) +
            Math.pow(touches[0].pageY - touches[1].pageY, 2)
          ) / touchStartDistance;

        self.setScale(
          touchStartScale * scale,
          touchCenterX,
          touchCenterY
        );

        e.preventDefault();

      } else {

        offset = jQuery(self.container).offset();
        if (touches[0].pageX > touches[1].pageX) {
          touchCenterX = touches[1].pageX + (touches[0].pageX - touches[1].pageX) / 2;
        } else {
          touchCenterX = touches[0].pageX + (touches[1].pageX - touches[0].pageX) / 2;
        }

        if (touches[0].pageY > touches[1].pageY) {
          touchCenterY = touches[1].pageY + (touches[0].pageY - touches[1].pageY) / 2;
        } else {
          touchCenterY = touches[0].pageY + (touches[1].pageY - touches[0].pageY) / 2;
        }

        touchCenterX -= offset.left;
        touchCenterY -= offset.top;
        touchStartScale = self.scale;

        touchStartDistance = Math.sqrt(
          Math.pow(touches[0].pageX - touches[1].pageX, 2) +
          Math.pow(touches[0].pageY - touches[1].pageY, 2)
        );
      }
    }

    lastTouchCount = touches.length;
  });

  jQuery(this.container).bind('touchstart', function () {
    lastTouchCount = 0;
  });

  jQuery(this.container).bind('touchend', function () {
    lastTouchCount = 0;
  });
};

JQVMap.prototype.placePins = function(pins, pinMode){
  var map = this;

  if(!pinMode || (pinMode !== 'content' && pinMode !== 'id')) {
    pinMode = 'content';
  }

  if(pinMode === 'content') {//treat pin as content
    jQuery.each(pins, function(index, pin){
      if(jQuery('#' + map.getCountryId(index)).length === 0){
        return;
      }

      var pinIndex = map.getPinId(index);
      var $pin = jQuery('#' + pinIndex);
      if($pin.length > 0){
        $pin.remove();
      }
      map.container.append('<div id="' + pinIndex + '" for="' + index + '" class="jqvmap-pin" style="position:absolute">' + pin + '</div>');
    });
  } else { //treat pin as id of an html content
    jQuery.each(pins, function(index, pin){
      if(jQuery('#' + map.getCountryId(index)).length === 0){
        return;
      }
      var pinIndex = map.getPinId(index);
      var $pin = jQuery('#' + pinIndex);
      if($pin.length > 0){
        $pin.remove();
      }
      map.container.append('<div id="' + pinIndex + '" for="' + index + '" class="jqvmap-pin" style="position:absolute"></div>');
      $pin.append(jQuery('#' + pin));
    });
  }

  this.positionPins();
  if(!this.pinHandlers){
    this.pinHandlers = true;
    var positionFix = function(){
      map.positionPins();
    };
    this.container.bind('zoomIn', positionFix)
      .bind('zoomOut', positionFix)
      .bind('drag', positionFix);
  }
};

JQVMap.prototype.positionPins = function(){
  var map = this;
  var pins = this.container.find('.jqvmap-pin');
  jQuery.each(pins, function(index, pinObj){
    pinObj = jQuery(pinObj);
    var countryId = map.getCountryId(pinObj.attr('for').toLowerCase());
    var countryObj = jQuery('#' + countryId);

    var bbox = document.getElementById(countryId).getBBox();
    var position = countryObj.position();

    var scale = map.scale;

    var left = position.left + (bbox.width / 2) * scale - pinObj.width() / 2,
      top = position.top + (bbox.height / 2) * scale - pinObj.height() / 2;

    pinObj.css('left', left).css('top', top);
  });
};

JQVMap.prototype.removePin = function(cc) {
  cc = cc.toLowerCase();
  jQuery('#' + this.getPinId(cc)).remove();
};

JQVMap.prototype.removePins = function(){
  this.container.find('.jqvmap-pin').remove();
};

JQVMap.prototype.reset = function () {
  for (var key in this.countries) {
    // this.countries[key].setFill(this.color);
  }
  this.scale = this.baseScale;
  this.transX = this.baseTransX;
  this.transY = this.baseTransY;
  this.applyTransform();
};

JQVMap.prototype.resize = function () {
  var curBaseScale = this.baseScale;
  if (this.width / this.height > this.defaultWidth / this.defaultHeight) {
    this.baseScale = this.height / this.defaultHeight;
    this.baseTransX = Math.abs(this.width - this.defaultWidth * this.baseScale) / (2 * this.baseScale);
  } else {
    this.baseScale = this.width / this.defaultWidth;
    this.baseTransY = Math.abs(this.height - this.defaultHeight * this.baseScale) / (2 * this.baseScale);
  }
  this.scale *= this.baseScale / curBaseScale;
  this.transX *= this.baseScale / curBaseScale;
  this.transY *= this.baseScale / curBaseScale;
};

JQVMap.prototype.select = function (cc, path) {
  cc = cc.toLowerCase();
  path = path || jQuery('#' + this.getCountryId(cc))[0];

  if (!this.isSelected(cc)) {
    if (this.multiSelectRegion) {
      this.selectedRegions.push(cc);
    } else {
      this.selectedRegions = [cc];
    }

    jQuery(this.container).trigger('regionSelect.jqvmap', [cc]);
    if (this.selectedColor && path) {
      path.currentFillColor = this.selectedColor;
      // path.setFill(this.selectedColor);
    }
  }
};

JQVMap.prototype.selectIndex = function (cc) {
  cc = cc.toLowerCase();
  for (var i = 0; i < this.selectedRegions.length; i++) {
    if (cc === this.selectedRegions[i]) {
      return i;
    }
  }
  return -1;
};

JQVMap.prototype.setBackgroundColor = function (backgroundColor) {
  this.container.css('background-color', backgroundColor);
};

JQVMap.prototype.setColors = function (key, color) {
  if (typeof key === 'string') {
    this.countries[key].setFill(color);
    this.countries[key].setAttribute('original', color);
  } else {
    var colors = key;

    for (var code in colors) {
      if (this.countries[code]) {
        this.countries[code].setFill(colors[code]);
        this.countries[code].setAttribute('original', colors[code]);
      }
    }
  }
};

JQVMap.prototype.setNormalizeFunction = function (f) {
  this.colorScale.setNormalizeFunction(f);

  if (this.values) {
    this.setValues(this.values);
  }
};

JQVMap.prototype.setScale = function (scale) {
  this.scale = scale;
  this.applyTransform();
};

JQVMap.prototype.setScaleColors = function (colors) {
  this.colorScale.setColors(colors);

  if (this.values) {
    this.setValues(this.values);
  }
};

JQVMap.prototype.setValues = function (values) {
  var max = 0,
    min = Number.MAX_VALUE,
    val;

  for (var cc in values) {
    cc = cc.toLowerCase();
    val = parseFloat(values[cc]);

    if (isNaN(val)) {
      continue;
    }
    if (val > max) {
      max = values[cc];
    }
    if (val < min) {
      min = val;
    }
  }

  if (min === max) {
    max++;
  }

  this.colorScale.setMin(min);
  this.colorScale.setMax(max);

  var colors = {};
  for (cc in values) {
    cc = cc.toLowerCase();
    val = parseFloat(values[cc]);
    colors[cc] = isNaN(val) ? this.color : this.colorScale.getColor(val);
  }
  this.setColors(colors);
  this.values = values;
};

JQVMap.prototype.unhighlight = function (cc, path) {
  cc = cc.toLowerCase();
  path = path || jQuery('#' + this.getCountryId(cc))[0];
  path.setOpacity(1);
  if (path.currentFillColor) {
    path.setFill(path.currentFillColor);
  }
};

JQVMap.prototype.zoomIn = function () {
  var map = this;
  var sliderDelta = (jQuery('#zoom').innerHeight() - 6 * 2 - 15 * 2 - 3 * 2 - 7 - 6) / (this.zoomMaxStep - this.zoomCurStep);

  if (map.zoomCurStep < map.zoomMaxStep) {
    map.transX -= (map.width / map.scale - map.width / (map.scale * map.zoomStep)) / 2;
    map.transY -= (map.height / map.scale - map.height / (map.scale * map.zoomStep)) / 2;
    map.setScale(map.scale * map.zoomStep);
    map.zoomCurStep++;

    var $slider = jQuery('#zoomSlider');

    $slider.css('top', parseInt($slider.css('top'), 10) - sliderDelta);

    map.container.trigger('zoomIn');
  }
};

JQVMap.prototype.zoomOut = function () {
  var map = this;
  var sliderDelta = (jQuery('#zoom').innerHeight() - 6 * 2 - 15 * 2 - 3 * 2 - 7 - 6) / (this.zoomMaxStep - this.zoomCurStep);

  if (map.zoomCurStep > 1) {
    map.transX += (map.width / (map.scale / map.zoomStep) - map.width / map.scale) / 2;
    map.transY += (map.height / (map.scale / map.zoomStep) - map.height / map.scale) / 2;
    map.setScale(map.scale / map.zoomStep);
    map.zoomCurStep--;

    var $slider = jQuery('#zoomSlider');

    $slider.css('top', parseInt($slider.css('top'), 10) + sliderDelta);

    map.container.trigger('zoomOut');
  }
};

VectorCanvas.prototype.applyTransformParams = function (scale, transX, transY) {
  if (this.mode === 'svg') {
    this.rootGroup.setAttribute('transform', 'scale(' + scale + ') translate(' + transX + ', ' + transY + ')');
  } else {
    this.rootGroup.coordorigin = (this.width - transX) + ',' + (this.height - transY);
    this.rootGroup.coordsize = this.width / scale + ',' + this.height / scale;
  }
};

VectorCanvas.prototype.createGroup = function (isRoot) {
  var node;
  if (this.mode === 'svg') {
    node = this.createSvgNode('g');
  } else {
    node = this.createVmlNode('group');
    node.style.width = this.width + 'px';
    node.style.height = this.height + 'px';
    node.style.left = '0px';
    node.style.top = '0px';
    node.coordorigin = '0 0';
    node.coordsize = this.width + ' ' + this.height;
  }

  if (isRoot) {
    this.rootGroup = node;
  }
  return node;
};

VectorCanvas.prototype.createPath = function (config) {
  var node;
  if (this.mode === 'svg') {
    node = this.createSvgNode('path');
    node.setAttribute('d', config.path);

    if (this.params.borderColor !== null) {
      node.setAttribute('stroke', this.params.borderColor);
    }
    if (this.params.borderWidth > 0) {
      node.setAttribute('stroke-width', this.params.borderWidth);
      node.setAttribute('stroke-linecap', 'round');
      node.setAttribute('stroke-linejoin', 'round');
    }
    if (this.params.borderOpacity > 0) {
      node.setAttribute('stroke-opacity', this.params.borderOpacity);
    }

    node.setFill = function (color) {
      this.setAttribute('fill', color);
      if (this.getAttribute('original') === null) {
        this.setAttribute('original', color);
      }
    };

    node.getFill = function () {
      return this.getAttribute('fill');
    };

    node.getOriginalFill = function () {
      return this.getAttribute('original');
    };

    node.setOpacity = function (opacity) {
      this.setAttribute('fill-opacity', opacity);
    };
  } else {
    node = this.createVmlNode('shape');
    node.coordorigin = '0 0';
    node.coordsize = this.width + ' ' + this.height;
    node.style.width = this.width + 'px';
    node.style.height = this.height + 'px';
    node.fillcolor = JQVMap.defaultFillColor;
    node.stroked = false;
    node.path = VectorCanvas.pathSvgToVml(config.path);

    var scale = this.createVmlNode('skew');
    scale.on = true;
    scale.matrix = '0.01,0,0,0.01,0,0';
    scale.offset = '0,0';

    node.appendChild(scale);

    var fill = this.createVmlNode('fill');
    node.appendChild(fill);

    node.setFill = function (color) {
      this.getElementsByTagName('fill')[0].color = color;
      if (this.getAttribute('original') === null) {
        this.setAttribute('original', color);
      }
    };

    node.getFill = function () {
      return this.getElementsByTagName('fill')[0].color;
    };
    node.getOriginalFill = function () {
      return this.getAttribute('original');
    };
    node.setOpacity = function (opacity) {
      this.getElementsByTagName('fill')[0].opacity = parseInt(opacity * 100, 10) + '%';
    };
  }
  return node;
};

VectorCanvas.prototype.pathSvgToVml = function (path) {
  var result = '';
  var cx = 0, cy = 0, ctrlx, ctrly;

  return path.replace(/([MmLlHhVvCcSs])((?:-?(?:\d+)?(?:\.\d+)?,?\s?)+)/g, function (segment, letter, coords) {
    coords = coords.replace(/(\d)-/g, '$1,-').replace(/\s+/g, ',').split(',');
    if (!coords[0]) {
      coords.shift();
    }

    for (var i = 0, l = coords.length; i < l; i++) {
      coords[i] = Math.round(100 * coords[i]);
    }

    switch (letter) {
      case 'm':
        cx += coords[0];
        cy += coords[1];
        result = 't' + coords.join(',');
        break;

      case 'M':
        cx = coords[0];
        cy = coords[1];
        result = 'm' + coords.join(',');
        break;

      case 'l':
        cx += coords[0];
        cy += coords[1];
        result = 'r' + coords.join(',');
        break;

      case 'L':
        cx = coords[0];
        cy = coords[1];
        result = 'l' + coords.join(',');
        break;

      case 'h':
        cx += coords[0];
        result = 'r' + coords[0] + ',0';
        break;

      case 'H':
        cx = coords[0];
        result = 'l' + cx + ',' + cy;
        break;

      case 'v':
        cy += coords[0];
        result = 'r0,' + coords[0];
        break;

      case 'V':
        cy = coords[0];
        result = 'l' + cx + ',' + cy;
        break;

      case 'c':
        ctrlx = cx + coords[coords.length - 4];
        ctrly = cy + coords[coords.length - 3];
        cx += coords[coords.length - 2];
        cy += coords[coords.length - 1];
        result = 'v' + coords.join(',');
        break;

      case 'C':
        ctrlx = coords[coords.length - 4];
        ctrly = coords[coords.length - 3];
        cx = coords[coords.length - 2];
        cy = coords[coords.length - 1];
        result = 'c' + coords.join(',');
        break;

      case 's':
        coords.unshift(cy - ctrly);
        coords.unshift(cx - ctrlx);
        ctrlx = cx + coords[coords.length - 4];
        ctrly = cy + coords[coords.length - 3];
        cx += coords[coords.length - 2];
        cy += coords[coords.length - 1];
        result = 'v' + coords.join(',');
        break;

      case 'S':
        coords.unshift(cy + cy - ctrly);
        coords.unshift(cx + cx - ctrlx);
        ctrlx = coords[coords.length - 4];
        ctrly = coords[coords.length - 3];
        cx = coords[coords.length - 2];
        cy = coords[coords.length - 1];
        result = 'c' + coords.join(',');
        break;

      default:
        break;
    }

    return result;

  }).replace(/z/g, '');
};

VectorCanvas.prototype.setSize = function (width, height) {
  if (this.mode === 'svg') {
    this.canvas.setAttribute('width', width);
    this.canvas.setAttribute('height', height);
  } else {
    this.canvas.style.width = width + 'px';
    this.canvas.style.height = height + 'px';
    this.canvas.coordsize = width + ' ' + height;
    this.canvas.coordorigin = '0 0';
    if (this.rootGroup) {
      var paths = this.rootGroup.getElementsByTagName('shape');
      for (var i = 0, l = paths.length; i < l; i++) {
        paths[i].coordsize = width + ' ' + height;
        paths[i].style.width = width + 'px';
        paths[i].style.height = height + 'px';
      }
      this.rootGroup.coordsize = width + ' ' + height;
      this.rootGroup.style.width = width + 'px';
      this.rootGroup.style.height = height + 'px';
    }
  }
  this.width = width;
  this.height = height;
};
/** Add World Map Data Points */

jQuery.fn.vectorMap('addMap', 'world_en', {"width":950,"height":550,"paths":{"id":{"path":"M781.68,324.4l-2.31,8.68l-12.53,4.23l-3.75-4.4l-1.82,0.5l3.4,13.12l5.09,0.57l6.79,2.57v2.57l3.11-0.57l4.53-6.27v-5.13l2.55-5.13l2.83,0.57l-3.4-7.13l-0.52-4.59L781.68,324.4L781.68,324.4M722.48,317.57l-0.28,2.28l6.79,11.41h1.98l14.15,23.67l5.66,0.57l2.83-8.27l-4.53-2.85l-0.85-4.56L722.48,317.57L722.48,317.57M789.53,349.11l2.26,2.77l-1.47,4.16v0.79h3.34l1.18-10.4l1.08,0.3l1.96,9.5l1.87,0.5l1.77-4.06l-1.77-6.14l-1.47-2.67l4.62-3.37l-1.08-1.49l-4.42,2.87h-1.18l-2.16-3.17l0.69-1.39l3.64-1.78l5.5,1.68l1.67-0.1l4.13-3.86l-1.67-1.68l-3.83,2.97h-2.46l-3.73-1.78l-2.65,0.1l-2.95,4.75l-1.87,8.22L789.53,349.11L789.53,349.11M814.19,330.5l-1.87,4.55l2.95,3.86h0.98l1.28-2.57l0.69-0.89l-1.28-1.39l-1.87-0.69L814.19,330.5L814.19,330.5M819.99,345.45l-4.03,0.89l-1.18,1.29l0.98,1.68l2.65-0.99l1.67-0.99l2.46,1.98l1.08-0.89l-1.96-2.38L819.99,345.45L819.99,345.45M753.17,358.32l-2.75,1.88l0.59,1.58l8.75,1.98l4.42,0.79l1.87,1.98l5.01,0.4l2.36,1.98l2.16-0.5l1.97-1.78l-3.64-1.68l-3.14-2.67l-8.16-1.98L753.17,358.32L753.17,358.32M781.77,366.93l-2.16,1.19l1.28,1.39l3.14-1.19L781.77,366.93L781.77,366.93M785.5,366.04l0.39,1.88l2.26,0.59l0.88-1.09l-0.98-1.49L785.5,366.04L785.5,366.04M790.91,370.99l-2.75,0.4l2.46,2.08h1.96L790.91,370.99L790.91,370.99M791.69,367.72l-0.59,1.19l4.42,0.69l3.44-1.98l-1.96-0.59l-3.14,0.89l-1.18-0.99L791.69,367.72L791.69,367.72M831.93,339.34l-4.17,0.47l-2.68,1.96l1.11,2.24l4.54,0.84v0.84l-2.87,2.33l1.39,4.85l1.39,0.09l1.2-4.76h2.22l0.93,4.66l10.83,8.96l0.28,7l3.7,4.01l1.67-0.09l0.37-24.72l-6.29-4.38l-5.93,4.01l-2.13,1.31l-3.52-2.24l-0.09-7.09L831.93,339.34L831.93,339.34z","name":"Indonesia"},"pg":{"path":"M852.76,348.29l-0.37,24.44l3.52-0.19l4.63-5.41l3.89,0.19l2.5,2.24l0.83,6.9l7.96,4.2l2.04-0.75v-2.52l-6.39-5.32l-3.15-7.28l2.5-1.21l-1.85-4.01l-3.7-0.09l-0.93-4.29l-9.81-6.62L852.76,348.29L852.76,348.29M880.48,349l-0.88,1.25l4.81,4.26l0.66,2.5l1.31-0.15l0.15-2.57l-1.46-1.32L880.48,349L880.48,349M882.89,355.03l-0.95,0.22l-0.58,2.57l-1.82,1.18l-5.47,0.96l0.22,2.06l5.76-0.29l3.65-2.28l-0.22-3.97L882.89,355.03L882.89,355.03M889.38,359.51l1.24,3.45l2.19,2.13l0.66-0.59l-0.22-2.28l-2.48-3.01L889.38,359.51L889.38,359.51z","name":"Papua New Guinea"},"mx":{"path":"M137.49,225.43l4.83,15.21l-2.25,1.26l0.25,3.02l4.25,3.27v6.05l5.25,5.04l-2.25-14.86l-3-9.83l0.75-6.8l2.5,0.25l1,2.27l-1,5.79l13,25.44v9.07l10.5,12.34l11.5,5.29l4.75-2.77l6.75,5.54l4-4.03l-1.75-4.54l5.75-1.76l1.75,1.01l1.75-1.76h2.75l5-8.82l-2.5-2.27l-9.75,2.27l-2.25,6.55l-5.75,1.01l-6.75-2.77l-3-9.57l2.27-12.07l-4.64-2.89l-2.21-11.59l-1.85-0.79l-3.38,3.43l-3.88-2.07l-1.52-7.73l-15.37-1.61l-7.94-5.97L137.49,225.43L137.49,225.43z","name":"Mexico"},"ee":{"path":"M517.77,143.66l-5.6-0.2l-3.55,2.17l-0.05,1.61l2.3,2.17l7.15,1.21L517.77,143.66L517.77,143.66M506.76,147.64l-1.55-0.05l-0.9,0.91l0.65,0.96l1.55,0.1l0.8-1.16L506.76,147.64L506.76,147.64z","name":"Estonia"},"dz":{"path":"M473.88,227.49l-4.08-1.37l-16.98,3.19l-3.7,2.81l2.26,11.67l-6.75,0.27l-4.06,6.53l-9.67,2.32l0.03,4.75l31.85,24.35l5.43,0.46l18.11-14.15l-1.81-2.28l-3.4-0.46l-2.04-3.42v-14.15l-1.36-1.37l0.23-3.65l-3.62-3.65l-0.45-3.88l1.58-1.14l-0.68-4.11L473.88,227.49L473.88,227.49z","name":"Algeria"},"ma":{"path":"M448.29,232.28h-11.55l-2.26,5.02l-5.21,2.51l-4.3,11.64l-8.38,5.02l-11.77,19.39l11.55-0.23l0.45-5.7h2.94v-7.76h10.19l0.23-10.04l9.74-2.28l4.08-6.62l6.34-0.23L448.29,232.28L448.29,232.28z","name":"Morocco"},"mr":{"path":"M404.9,276.66l2.18,2.85l-0.45,12.32l3.17-2.28l2.26-0.46l3.17,1.14l3.62,5.02l3.4-2.28l16.53-0.23l-4.08-27.61l4.38-0.02l-8.16-6.25l0.01,4.06l-10.33,0.01l-0.05,7.75l-2.97-0.01l-0.38,5.72L404.9,276.66L404.9,276.66z","name":"Mauritania"},"sn":{"path":"M412.03,289.84L410.12,290.31L406.18,293.18L405.28,294.78L405,296.37L406.43,297.40L411.28,297.34L414.40,296.5L414.75,298.03L414.46,300.06L414.53,300.09L406.78,300.21L408.03,303.21L408.71,301.37L418,302.15L418.06,302.21L419.03,302.25L422,302.37L422.12,300.62L418.53,296.31L414.53,290.87L412.03,289.84z","name":"Senegal"},"gm":{"path":"M406.89,298.34l-0.13,1.11l6.92-0.1l0.35-1.03l-0.15-1.04l-1.99,0.81L406.89,298.34L406.89,298.34z","name":"Gambia"},"gw":{"path":"M408.6,304.53l1.4,2.77l3.93-3.38l0.04-1.04l-4.63-0.67L408.6,304.53L408.6,304.53z","name":"Guinea-Bissau"},"gn":{"path":"M410.42,307.94l3.04,4.68l3.96-3.44l4.06-0.18l3.38,4.49l2.87,1.89l1.08-2.1l0.96-0.54l-0.07-4.62l-1.91-5.48l-5.86,0.65l-7.25-0.58l-0.04,1.86L410.42,307.94L410.42,307.94z","name":"Guinea"},"sl":{"path":"M413.93,313.13l5.65,5.46l4.03-4.89l-2.52-3.95l-3.47,0.35L413.93,313.13L413.93,313.13z","name":"Sierra Leone"},"lr":{"path":"M420.17,319.19l10.98,7.34l-0.26-5.56l-3.32-3.91l-3.24-2.87L420.17,319.19L420.17,319.19z","name":"Liberia"},"ci":{"path":"M432.07,326.75l4.28-3.03l5.32-0.93l5.43,1.17l-2.77-4.19l-0.81-2.56l0.81-7.57l-4.85,0.23l-2.2-2.1l-4.62,0.12l-2.2,0.35l0.23,5.12l-1.16,0.47l-1.39,2.56l3.58,4.19L432.07,326.75L432.07,326.75z","name":"Cote d'Ivoire"},"ml":{"path":"M419.46,295.84l3.08-2.11l17.12-0.1l-3.96-27.54l4.52-0.13l21.87,16.69l2.94,0.42l-1.11,9.28l-13.75,1.25l-10.61,7.92l-1.93,5.42l-7.37,0.31l-1.88-5.41l-5.65,0.4l0.22-1.77L419.46,295.84L419.46,295.84z","name":"Mali"},"bf":{"path":"M450.59,294.28l3.64-0.29l5.97,8.44l-5.54,4.18l-4.01-1.03l-5.39,0.07l-0.87,3.16l-4.52,0.22l-1.24-1.69l1.6-5.14L450.59,294.28L450.59,294.28z","name":"Burkina Faso"},"ne":{"path":"M460.89,302l2.55-0.06l2.3-3.45l3.86-0.69l4.11,2.51l8.77,0.25l6.78-2.76l2.55-2.19l0.19-2.88l4.73-4.77l1.25-10.53l-3.11-6.52l-7.96-1.94l-18.42,14.36l-2.61-0.25l-1.12,9.97l-9.4,0.94L460.89,302L460.89,302z","name":"Niger"},"gh":{"path":"M444.34,317.05l1.12,2.63l2.92,4.58l1.62-0.06l4.42-2.51l-0.31-14.29l-3.42-1l-4.79,0.13L444.34,317.05L444.34,317.05z","name":"Ghana"},"tg":{"path":"M455.22,321.25l2.68-1.57l-0.06-10.35l-1.74-2.82l-1.12,0.94L455.22,321.25L455.22,321.25z","name":"Togo"},"bj":{"path":"M458.71,319.49h2.12l0.12-6.02l2.68-3.89l-0.12-6.77l-2.43-0.06l-4.17,3.26l1.74,3.32L458.71,319.49L458.71,319.49z","name":"Benin"},"ng":{"path":"M461.57,319.37l3.92,0.19l4.73,5.27l2.3,0.63l1.8-0.88l2.74-0.38l0.93-3.82l3.73-2.45l4.04-0.19l7.4-13.61l-0.12-3.07l-3.42-2.63l-6.84,3.01l-9.15-0.13l-4.36-2.76l-3.11,0.69l-1.62,2.82l-0.12,7.96l-2.61,3.7L461.57,319.37L461.57,319.37z","name":"Nigeria"},"tn":{"path":"M474.91,227.33l5.53-2.23l1.82,1.18l0.07,1.44l-0.85,1.11l0.13,1.97l0.85,0.46v3.54l-0.98,1.64l0.13,1.05l3.71,1.31l-2.99,4.65l-1.17-0.07l-0.2,3.74l-1.3,0.2l-1.11-0.98l0.26-3.8l-3.64-3.54l-0.46-3.08l1.76-1.38L474.91,227.33L474.91,227.33z","name":"Tunisia"},"ly":{"path":"M480.05,248.03l1.56-0.26l0.46-3.6h0.78l3.19-5.24l7.87,2.29l2.15,3.34l7.74,3.54l4.03-1.7l-0.39-1.7l-1.76-1.7l0.2-1.18l2.86-2.42h5.66l2.15,2.88l4.55,0.66l0.59,36.89l-3.38-0.13l-20.42-10.62l-2.21,1.25l-8.39-2.1l-2.28-3.01l-3.32-0.46l-1.69-3.01L480.05,248.03L480.05,248.03z","name":"Libya"},"eg":{"path":"M521.93,243.06l2.67,0.07l5.2,1.44l2.47,0.07l3.06-2.56h1.43l2.6,1.44h3.29l0.59-0.04l2.08,5.98l0.59,1.93l0.55,2.89l-0.98,0.72l-1.69-0.85l-1.95-6.36l-1.76-0.13l-0.13,2.16l1.17,3.74l9.37,11.6l0.2,4.98l-2.73,3.15L522.32,273L521.93,243.06L521.93,243.06z","name":"Egypt"},"td":{"path":"M492.79,296l0.13-2.95l4.74-4.61l1.27-11.32l-3.16-6.04l2.21-1.13l21.4,11.15l-0.13,10.94l-3.77,3.21v5.64l2.47,4.78h-4.36l-7.22,7.14l-0.19,2.16l-5.33-0.07l-0.07,0.98l-3.04-0.4l-2.08-3.93l-1.56-0.77l0.2-1.2l1.96-1.5v-7.02l-2.71-0.42l-3.27-2.43L492.79,296L492.79,296L492.79,296z","name":"Chad"},"sd":{"path":"M520.15,292.43l0.18-11.83l2.46,0.07l-0.28-6.57l25.8,0.23l3.69-3.72l7.96,12.73l-4.36,5.14v7.85l-6.86,14.75l-2.36,1.04l0.75,4.11h2.94l3.99,5.79l-3.2,0.41l-0.82,1.49l-0.08,2.15l-9.6-0.17l-0.98-1.49l-6.71-0.38l-12.32-12.68l1.23-0.74l0.33-2.98l-2.95-1.74l-2.69-5.31l0.15-4.94L520.15,292.43L520.15,292.43z","name":"Sudan"},"cm":{"path":"M477.82,324.28l3.22,2.96l-0.23,4.58l17.66-0.41l1.44-1.62l-5.06-5.45l-0.75-1.97l3.22-6.03l-2.19-4l-1.84-0.99v-2.03l2.13-1.39l0.12-6.32l-1.69-0.19l-0.03,3.32l-7.42,13.85l-4.54,0.23l-3.11,2.14L477.82,324.28L477.82,324.28z","name":"Cameroon"},"er":{"path":"M556.71,294.7l-0.25-5.89l3.96-4.62l1.07,0.82l1.95,6.52l9.36,6.97l-1.7,2.09l-6.85-5.89H556.71L556.71,294.7z","name":"Eritrea"},"dj":{"path":"M571.48,301.54l-0.57,3.36l3.96-0.06l0.06-4.94l-1.45-0.89L571.48,301.54L571.48,301.54z","name":"Djibouti"},"et":{"path":"M549.49,311.76l7.28-16.2l7.23,0.04l6.41,5.57l-0.45,4.59h4.97l0.51,2.76l8.04,4.81l4.96,0.25l-9.43,10.13l-12.95,3.99h-3.21l-5.72-4.88l-2.26-0.95l-4.38-6.45l-2.89,0.04l-0.34-2.96L549.49,311.76L549.49,311.76z","name":"Ethiopia"},"so":{"path":"M575.74,305.04l4.08,2.78l1.21-0.06l10.13-3.48l1.15,3.71l-0.81,3.13l-2.19,1.74l-5.47-0.35l-7.83-4.81L575.74,305.04L575.74,305.04M591.97,304.05l4.37-1.68l1.55,0.93l-0.17,3.88l-4.03,11.48l-21.81,23.36l-2.53-1.74l-0.17-9.86l3.28-3.77l6.96-2.15l10.21-10.78l2.67-2.38l0.75-3.48L591.97,304.05L591.97,304.05z","name":"Somalia"},"ye":{"path":"M599.62,299.65l2.13,2.38l2.88-1.74l1.04-0.35l-1.32-1.28l-2.53,0.75L599.62,299.65L599.62,299.65M571.99,289.23l1.44,4.28v4.18l3.46,3.14l24.38-9.93l0.23-2.73l-3.91-7.02l-9.81,3.13l-5.63,5.54l-6.53-3.86L571.99,289.23L571.99,289.23z","name":"Yemen"},"cf":{"path":"M495.66,324.05l4.66,5.04l1.84-2.38l2.93,0.12l0.63-2.32l2.88-1.8l5.98,4.12l3.45-3.42l13.39,0.59L519,311.18l1.67-1.04l0.23-2.26l-2.82-1.33h-4.14l-6.67,6.61l-0.23,2.72l-5.29-0.17l-0.17,1.16l-3.45-0.35l-3.11,5.91L495.66,324.05L495.66,324.05z","name":"Central African Republic"},"st":{"path":"M470.74,337.15l1.15-0.58l0.86,0.7l-0.86,1.33l-1.04-0.41L470.74,337.15L470.74,337.15M473.05,333.5l1.73-0.29l0.58,1.1l-0.86,0.93l-0.86-0.12L473.05,333.5L473.05,333.5z","name":"Sao Tome and Principe"},"gq":{"path":"M476.84,327.41l-0.46,1.97l1.38,0.75l1.32-0.99l-0.46-2.03L476.84,327.41L476.84,327.41M480.99,332.69l-0.06,1.39l4.54,0.23l-0.06-1.57L480.99,332.69L480.99,332.69z","name":"Equatorial Guinea"},"ga":{"path":"M486.39,332.63l-0.12,2.49l-5.64-0.12l-3.45,6.67l8.11,8.87l2.01-1.68l-0.06-1.74l-1.38-0.64v-1.22l3.11-1.97l2.76,2.09l3.05,0.06l-0.06-10.49l-4.83-0.23l-0.06-2.2L486.39,332.63L486.39,332.63z","name":"Gabon"},"cg":{"path":"M491,332.52l-0.06,1.45l4.78,0.12l0.17,12.41l-4.37-0.12l-2.53-1.97l-1.96,1.1l-0.09,0.55l1.01,0.49l0.29,2.55l-2.7,2.32l0.58,1.22l2.99-2.32h1.44l0.46,1.39l1.9,0.81l6.1-5.16l-0.12-3.77l1.27-3.07l3.91-2.9l1.05-9.81l-2.78,0.01l-3.22,4.41L491,332.52L491,332.52z","name":"Congo"},"ao":{"path":"M486.55,353.23l1.74,2.26l2.25-2.13l-0.66-2.21l-0.56-0.04L486.55,353.23L486.55,353.23M488.62,356.71l3.41,12.73l-0.08,4.02l-4.99,5.36l-0.75,8.71l19.2,0.17l6.24,2.26l5.15-0.67l-3-3.76l0.01-10.74l5.9-0.25v-4.19l-4.79-0.2l-0.96-9.92l-2.02,0.03l-1.09-0.98l-1.19,0.06l-1.58,3.06H502l-1.41-1.42l0.42-2.01l-1.66-2.43L488.62,356.71L488.62,356.71z","name":"Angola"},"cd":{"path":"M489.38,355.71l10.31-0.18l2.09,2.97l-0.08,2.19l0.77,0.7h5.12l1.47-2.89h2.09l0.85,0.86l2.87-0.08l0.85,10.08l4.96,0.16v0.78l13.33,6.01l0.62,1.17h2.79l-0.31-4.22l-5.04-2.42l0.31-3.2l2.17-5.08l4.96-0.16l-4.26-14.14l0.08-6.01l6.74-10.54l0.08-1.48l-1.01-0.55l0.04-2.86l-1.23-0.11l-1.24-1.58l-20.35-0.92l-3.73,3.63l-6.11-4.02l-2.15,1.32l-1.56,13.13l-3.86,2.98l-1.16,2.64l0.21,3.91l-6.96,5.69l-1.85-0.84l0.25,1.09L489.38,355.71L489.38,355.71z","name":"Congo"},"rw":{"path":"M537.82,339.9l2.81,2.59l-0.12,2.77l-4.36,0.09v-3.06L537.82,339.9L537.82,339.9z","name":"Rwanda"},"bi":{"path":"M536.21,346.21l4.27-0.09l-1.11,3.74l-1.08,0.94h-1.32l-0.94-2.53L536.21,346.21L536.21,346.21z","name":"Burundi"},"ug":{"path":"M538.3,339.09l3.03,2.84l1.9-1.21l5.14-0.84l0.88,0.09l0.33-1.95l2.9-6.1l-2.44-5.08l-7.91,0.05l-0.05,2.09l1.06,1.02l-0.16,2.09L538.3,339.09L538.3,339.09z","name":"Uganda"},"ke":{"path":"M550.83,326.52l2.66,5.19l-3.19,6.69l-0.42,2.03l15.93,9.85l4.94-7.76l-2.5-2.03l-0.05-10.22l3.13-3.42l-4.99,1.66l-3.77,0.05l-5.9-4.98l-1.86-0.8l-3.45,0.32l-0.61,1.02L550.83,326.52L550.83,326.52z","name":"Kenya"},"tz":{"path":"M550.57,371.42l17.47-2.14l-3.93-7.6l-0.21-7.28l1.27-3.48l-16.62-10.44l-5.21,0.86l-1.81,1.34l-0.16,3.05l-1.17,4.23l-1.22,1.45l-1.75,0.16l3.35,11.61l5.47,2.57l3.77,0.11L550.57,371.42L550.57,371.42z","name":"Tanzania"},"zm":{"path":"M514.55,384.7l3.17,4.4l4.91,0.3l1.74,0.96l5.14,0.06l4.43-6.21l12.38-5.54l1.08-4.88l-1.44-6.99l-6.46-3.68l-4.31,0.3l-2.15,4.76l0.06,2.17l5.08,2.47l0.3,5.37l-4.37,0.24l-1.08-1.81l-12.14-5.18l-0.36,3.98l-5.74,0.18L514.55,384.7L514.55,384.7z","name":"Zambia"},"mw":{"path":"M547.16,379.4l3.11,3.25l-0.06,4.16l0.6,1.75l4.13-4.46l-0.48-5.67l-2.21-1.69l-1.97-9.95l-3.41-0.12l1.55,7.17L547.16,379.4L547.16,379.4z","name":"Malawi"},"mz":{"path":"M541.17,413.28l2.69,2.23l6.34-3.86l1.02-5.73v-9.46l10.17-8.32l1.74,0.06l6.16-5.91l-0.96-12.18L552,372.17l0.48,3.68l2.81,2.17l0.66,6.63l-5.5,5.37l-1.32-3.01l0.24-3.98l-3.17-3.44l-7.78,3.62l7.24,3.68l0.24,10.73l-4.79,7.11L541.17,413.28L541.17,413.28z","name":"Mozambique"},"zw":{"path":"M524.66,392.3l8.97,10.13l6.88,1.75l4.61-7.23l-0.36-9.58l-7.48-3.86l-2.81,1.27l-4.19,6.39l-5.8-0.06L524.66,392.3L524.66,392.3z","name":"Zimbabwe"},"na":{"path":"M496.55,421.96l3.35,0.24l1.97,1.99l4.67,0.06l1.14-13.26v-8.68l2.99-0.6l1.14-9.1l7.6-0.24l2.69-2.23l-4.55-0.18l-6.16,0.84l-6.64-2.41h-18.66l0.48,5.3l6.22,9.16l-1.08,4.7l0.06,2.47L496.55,421.96L496.55,421.96z","name":"Namibia"},"bw":{"path":"M508.51,411.23l2.15,0.66l-0.3,6.15l2.21,0.3l5.08-4.58l6.1,0.66l1.62-4.1l7.72-7.05l-9.27-10.67l-0.12-1.75l-1.02-0.3l-2.81,2.59l-7.3,0.18l-1.02,9.1l-2.87,0.66L508.51,411.23L508.51,411.23z","name":"Botswana"},"sz":{"path":"M540.87,414l-2.51,0.42l-1.08,2.95l1.92,1.75h2.33l1.97-2.83L540.87,414L540.87,414z","name":"Swaziland"},"ls":{"path":"M527.41,425.39l3.05-2.35l1.44,0.06l1.74,2.17l-0.18,2.17l-2.93,1.08v0.84l-3.23-0.18l-0.78-2.35L527.41,425.39L527.41,425.39z","name":"Lesotho"},"za":{"path":"M534.16,403.63l-7.9,7.3l-1.88,4.51l-6.26-0.78l-5.21,4.63l-3.46-0.34l0.28-6.4l-1.23-0.43l-0.86,13.09l-6.14-0.06l-1.85-2.18l-2.71-0.03l2.47,7.09l4.41,4.17l-3.15,3.67l2.04,4.6l4.72,1.8l3.76-3.2l10.77,0.06l0.77-0.96l4.78-0.84l16.17-16.1l-0.06-5.07l-1.73,2.24h-2.59l-3.15-2.64l1.6-3.98l2.75-0.56l-0.25-8.18L534.16,403.63L534.16,403.63z M530.37,422.13l1.51-0.06l2.45,2.66l-0.07,3.08l-2.87,1.45l-0.18,1.02l-4.38,0.05l-1.37-3.3l1.25-2.42L530.37,422.13L530.37,422.13z","name":"South Africa"},"gl":{"path":"M321.13,50.07l-1.36,2.17l2.45,2.45l-1.09,2.45l3.54,4.62l4.35-1.36l5.71-0.54l6.53,7.07l4.35,11.69l-3.53,7.34l4.89-0.82l2.72,1.63l0.27,3.54l-5.98,0.27l3.26,3.26l4.08,0.82l-8.97,11.96l-1.09,7.34l1.9,5.98l-1.36,3.54l2.45,7.61l4.62,5.17l1.36-0.27l2.99-0.82l0.27,4.35l1.9,2.72l3.53-0.27l2.72-10.06l8.16-10.06l12.24-4.89l7.61-9.52l3.53,1.63h7.34l5.98-5.98l7.34-2.99l0.82-4.62l-4.62-4.08l-4.08-1.36l-2.18-5.71l5.17-2.99l8.16,4.35l2.72-2.99l-4.35-2.45l9.25-12.51l-1.63-5.44l-4.35-0.27l1.63-4.89l5.44-2.45l11.15-9.79l-3.26-3.53l-12.51,1.09l-6.53,6.53l3.81-8.43l-4.35-1.09l-2.45,4.35l-3.53-2.99l-9.79,1.09l2.72-4.35l16.04-0.54l-4.08-5.44l-17.4-3.26l-7.07,1.09l0.27,3.54l-7.34-2.45l0.27-2.45l-5.17,1.09l-1.09,2.72l5.44,1.9l-5.71,4.08l-4.08-4.62l-5.71-1.63l-0.82,4.35h-5.71l-2.18-4.62l-8.97-1.36l-4.89,2.45l-0.27,3.26l-6.25-0.82l-3.81,1.63l0.27,3.81v1.9l-7.07,1.36l-3.26-2.17l-2.18,3.53l3.26,3.54l6.8-0.82l0.54,2.18l-5.17,2.45L321.13,50.07L321.13,50.07M342.89,92.49l1.63,2.45l-0.82,2.99h-1.63l-2.18-2.45l0.54-1.9L342.89,92.49L342.89,92.49M410.87,85.69l4.62,1.36l-0.27,3.81l-4.89-2.45l-1.09-1.36L410.87,85.69L410.87,85.69z","name":"Greenland"},"au":{"path":"M761.17,427.98l-0.35,25.38l-3.9,2.86l-0.35,2.5l5.32,3.57l13.13-2.5h6.74l2.48-3.58l14.9-2.86l10.64,3.22l-0.71,4.29l1.42,4.29l8.16-1.43l0.35,2.14l-5.32,3.93l1.77,1.43l3.9-1.43l-1.06,11.8l7.45,5.72l4.26-1.43l2.13,2.14l12.42-1.79l11.71-18.95l4.26-1.07l8.51-15.73l2.13-13.58l-5.32-6.79l2.13-1.43l-4.26-13.23l-4.61-3.22l0.71-17.87l-4.26-3.22l-1.06-10.01h-2.13l-7.1,23.59l-3.9,0.36l-8.87-8.94l4.97-13.23l-9.22-1.79l-10.29,2.86l-2.84,8.22l-4.61,1.07l-0.35-5.72l-18.8,11.44l0.35,4.29l-2.84,3.93h-7.1l-15.26,6.43L761.17,427.98L761.17,427.98M825.74,496.26l-1.77,7.15l0.35,5l5.32-0.36l6.03-9.29L825.74,496.26L825.74,496.26z","name":"Australia"},"nz":{"path":"M913.02,481.96l1.06,11.8l-1.42,5.36l-5.32,3.93l0.35,4.65v5l1.42,1.79l14.55-12.51v-2.86h-3.55l-4.97-16.8L913.02,481.96L913.02,481.96M902.38,507.7l2.84,5.36l-7.81,7.51l-0.71,3.93l-5.32,0.71l-8.87,8.22l-8.16-3.93l-0.71-2.86l14.9-6.43L902.38,507.7L902.38,507.7z","name":"New Zealand"},"nc":{"path":"M906.64,420.47l-0.35,1.79l4.61,6.43l2.48,1.07l0.35-2.5L906.64,420.47L906.64,420.47z","name":"New Caledonia"},"my":{"path":"M764.14,332.92l3.02,3.49l11.58-4.01l2.29-8.84l5.16-0.37l4.72-3.42l-6.12-4.46l-1.4-2.45l-3.02,5.57l1.11,3.2l-1.84,2.67l-3.47-0.89l-8.41,6.17l0.22,3.57L764.14,332.92L764.14,332.92M732.71,315.45l2.01,4.51l0.45,5.86l2.69,4.17l6.49,3.94l2.46,0.23l-0.45-4.06l-2.13-5.18l-3.12-6.63l-0.26,1.16l-3.76-0.17l-2.7-3.88L732.71,315.45L732.71,315.45z","name":"Malaysia"},"bn":{"path":"M779.77,319.25l-2.88,3.49l2.36,0.74l1.33-1.86L779.77,319.25L779.77,319.25z","name":"Brunei Darussalam"},"tl":{"path":"M806.14,368.42l-5.11,4.26l0.49,1.09l2.16-0.4l2.55-2.38l5.01-0.69l-0.98-1.68L806.14,368.42L806.14,368.42z","name":"Timor-Leste"},"sb":{"path":"M895.43,364.65l0.15,2.28l1.39,1.32l1.31-0.81l-1.17-2.43L895.43,364.65L895.43,364.65M897.18,370.31l-1.17,1.25l1.24,2.28l1.46,0.44l-0.07-1.54L897.18,370.31L897.18,370.31M900.03,368.99l1.02,2.5l1.97,2.35l1.09-1.76l-1.46-2.5L900.03,368.99L900.03,368.99M905.14,372.74l0.58,3.09l1.39,1.91l1.17-2.42L905.14,372.74L905.14,372.74M906.74,379.65l-0.51,0.88l1.68,2.21l1.17,0.07l-0.73-2.87L906.74,379.65L906.74,379.65M903.02,384.05l-1.75,0.81l1.53,2.13l1.31-0.74L903.02,384.05L903.02,384.05z","name":"Solomon Islands"},"vu":{"path":"M920.87,397.22l-1.24,1.66l0.52,1.87l0.62,0.42l1.13-1.46L920.87,397.22L920.87,397.22M921.49,402.31l0.1,1.35l1.34,0.42l0.93-0.52l-0.93-1.46L921.49,402.31L921.49,402.31M923.45,414.37l-0.62,0.94l0.93,1.04l1.55-0.52L923.45,414.37L923.45,414.37z","name":"Vanuatu"},"fj":{"path":"M948.62,412.29l-1.24,1.66l-0.1,1.87l1.44,1.46L948.62,412.29L948.62,412.29z","name":"Fiji"},"ph":{"path":"M789.37,297.53l-0.86,1.64l-0.48,2.02l-4.78,6.07l0.29,1.25l2.01-0.29l6.21-6.94L789.37,297.53L789.37,297.53M797.11,295.22l-0.1,5.01l1.82,1.83l0.67,3.56l1.82,0.39l0.86-2.22l-1.43-1.06l-0.38-6.26L797.11,295.22L797.11,295.22M802.28,297.15l-0.1,4.43l1.05,1.73l1.82-2.12l-0.48-3.85L802.28,297.15L802.28,297.15M803.42,293.29l1.82,2.41l0.86,2.31h1.63l-0.29-3.95l-1.82-1.25L803.42,293.29L803.42,293.29M806.96,302.35l0.38,2.89l-3.35,2.7l-2.77,0.29l-2.96,3.18l0.1,1.45l2.77-0.87l1.91-1.25l1.63,4.14l2.87,2.02l1.15-0.39l1.05-1.25l-2.29-2.31l1.34-1.06l1.53,1.25l1.05-1.73l-1.05-2.12l-0.19-4.72L806.96,302.35L806.96,302.35M791.38,272.97l-2.58,1.83l-0.29,5.78l4.02,7.8l1.34,1.06l1.72-1.16l2.96,0.48l0.57,2.6l2.2,0.19l1.05-1.44l-1.34-1.83l-1.63-1.54l-3.44-0.38l-1.82-2.99l2.1-3.18l0.19-2.79l-1.43-3.56L791.38,272.97L791.38,272.97M792.72,290.21l0.76,2.7l1.34,0.87l0.96-1.25l-1.53-2.12L792.72,290.21L792.72,290.21z","name":"Philippines"},"cn":{"path":"M759.83,270.17l-2.39,0.67l-1.72,2.12l1.43,2.79l2.1,0.19l2.39-2.12l0.57-2.79L759.83,270.17L759.83,270.17M670.4,170.07l-3.46,8.7l-4.77-0.25l-5.03,11.01l4.27,5.44l-8.8,12.15l-4.52-0.76l-3.02,3.8l0.75,2.28l3.52,0.25l1.76,4.05l3.52,0.76l10.81,13.93v7.09l5.28,3.29l5.78-1.01l7.29,4.3l8.8,2.53l4.27-0.51l4.78-0.51l10.05-6.58l3.27,0.51l1.25,2.97l2.77,0.83l3.77,5.57l-2.51,5.57l1.51,3.8l4.27,1.52l0.75,4.56l5.03,0.51l0.75-2.28l7.29-3.8l4.52,0.25l5.28,5.82l3.52-1.52l2.26,0.25l1.01,2.79l1.76,0.25l2.51-3.54l10.05-3.8l9.05-10.89l3.02-10.38l-0.25-6.84l-3.77-0.76l2.26-2.53l-0.5-4.05l-9.55-9.62v-4.81l2.76-3.54l2.76-1.27l0.25-2.79h-7.04l-1.26,3.8l-3.27-0.76l-4.02-4.3l2.51-6.58l3.52-3.8l3.27,0.25l-0.5,5.82l1.76,1.52l4.27-4.3l1.51-0.25l-0.5-3.29l4.02-4.81l3.02,0.25l1.76-5.57l2.06-1.09l0.21-3.47l-2-2.1l-0.17-5.48l3.85-0.25l-0.25-14.13l-2.7,1.62l-1.01,3.62l-4.51-0.01l-13.07-7.35l-9.44-11.38l-9.58-0.1l-2.44,2.12l3.1,7.1l-1.08,6.66l-3.86,1.6l-2.17-0.17l-0.16,6.59l2.26,0.51l4.02-1.77l5.28,2.53v2.53l-3.77,0.25l-3.02,6.58l-2.76,0.25l-9.8,12.91l-10.3,4.56l-7.04,0.51l-4.77-3.29l-6.79,3.55l-7.29-2.28l-1.76-4.81l-12.31-0.76l-6.53-10.63h-2.76l-2.22-4.93L670.4,170.07z","name":"China"},"tw":{"path":"M787.46,248.31l-3.54,2.7l-0.19,5.2l3.06,3.56l0.76-0.67L787.46,248.31L787.46,248.31z","name":"Taiwan"},"jp":{"path":"M803.23,216.42l-1.63,1.64l0.67,2.31l1.43,0.1l0.96,5.01l1.15,1.25l2.01-1.83l0.86-3.28l-2.49-3.56L803.23,216.42L803.23,216.42M812.03,213.15l-2.77,2.6l-0.1,2.99l0.67,0.87l3.73-3.18l-0.29-3.18L812.03,213.15L812.03,213.15M808.2,206.98l-4.88,5.59l0.86,1.35l2.39,0.29l4.49-3.47l3.16-0.58l2.87,3.37l2.2-0.77l0.86-3.28l4.11-0.1l4.02-4.82l-2.1-8l-0.96-4.24l2.1-1.73l-4.78-7.22l-1.24,0.1l-2.58,2.89v2.41l1.15,1.35l0.38,6.36l-2.96,3.66l-1.72-1.06l-1.34,2.99l-0.29,2.79l1.05,1.64l-0.67,1.25l-2.2-1.83h-1.53l-1.34,0.77L808.2,206.98L808.2,206.98M816.43,163.44l-1.53,1.35l0.77,2.89l1.34,1.35l-0.1,4.43l-1.72,0.67l-1.34,2.99l3.92,5.39l2.58-0.87l0.48-1.35l-2.77-2.5l1.72-2.22l1.82,0.29l1.43,1.54l0.1-3.18l3.92-3.18l2.2-0.58l-1.82-3.08l-0.86-1.35l-1.43,0.96l-1.24,1.54l-2.68-0.58l-2.77-1.83L816.43,163.44L816.43,163.44z","name":"Japan"},"ru":{"path":"M506.61,151.72l-1.5-0.15l-2.7,3.23v1.51l0.9,0.35l1.75,0.05l2.9-2.37l0.4-0.81L506.61,151.72L506.61,151.72M830.86,160.45l-2.68,3.76l0.19,1.83l1.34-0.58l3.15-3.95L830.86,160.45L830.86,160.45M834.4,154.96l-0.96,2.6l0.1,1.73l1.63-1.06l1.53-3.08V154L834.4,154.96L834.4,154.96M840.04,132.03l-1.24,1.54l0.1,2.41l1.15-0.1l1.91-3.37L840.04,132.03L840.04,132.03M837.75,137.91v4.24l1.34,0.48l0.96-1.54v-3.27L837.75,137.91L837.75,137.91M798.64,122.59l-0.09,6.17l7.74,11.95l2.77,10.4l4.88,9.25l1.91,0.67l1.63-1.35l0.76-2.22l-6.98-7.61l0.19-3.95l1.53-0.67l0.38-2.31l-13.67-19.36L798.64,122.59L798.64,122.59M852.57,103.42l-1.91,0.19l1.15,1.64l2.39,1.64l0.67-0.77L852.57,103.42L852.57,103.42M856.29,104.58l0.29,1.64l2.96,0.87l0.29-1.16L856.29,104.58L856.29,104.58M547.82,38.79l1.72,0.69l-1.21,2.08v2.95l-2.58,1.56H543l-1.55-1.91l0.17-2.08l1.21-1.56h2.41L547.82,38.79L547.82,38.79M554.36,36.88v2.08l1.72,1.39l2.41-0.17l2.07-1.91v-1.39h-1.89l-1.55,0.52l-1.21-1.39L554.36,36.88L554.36,36.88M564.18,37.06l1.21,2.6l2.41,0.17l1.72-0.69l-0.86-2.43l-2.24-0.52L564.18,37.06L564.18,37.06M573.99,33.59l-1.89-0.35l-1.72,1.74l0.86,1.56l0.52,2.43l2.24-1.73l0.52-1.91L573.99,33.59L573.99,33.59M584.49,51.98l-0.52,2.43l-3.96,3.47l-8.44,1.91l-6.89,11.45l-1.21,3.3l6.89,1.74l1.03-4.16l2.07-6.42l5.34-2.78l4.48-3.47l3.27-1.39h1.72v-4.68L584.49,51.98L584.49,51.98M562.28,77.31l4.65,0.52l1.55,5.38l3.96,4.16l-1.38,2.78h-2.41l-2.24-2.6l-4.99-0.17l-2.07-2.78v-1.91l3.1-0.87L562.28,77.31L562.28,77.31M634.95,18.15l-2.24-1.39h-2.58l-0.52,1.56l-2.75,1.56l-2.07,0.69l-0.34,2.08l4.82,0.35L634.95,18.15L634.95,18.15M640.28,18.67l-1.21,2.6l-2.41-0.17l-3.79,2.78l-1.03,3.47h2.41l1.38-2.26l3.27,2.43l3.1-1.39l2.24-1.91l-0.86-2.95l-1.21-2.08L640.28,18.67L640.28,18.67M645.28,20.58l1.21,4.86l1.89,4.51l2.07-3.64l3.96-0.87v-2.6l-2.58-1.91L645.28,20.58L645.28,20.58M739.76,12.8l2.69,2.26l1.91-0.79l0.56-3.17L741,8.39l-2.58,1.7l-6.28,0.57v2.83l-6.62,0.11v4.63l7.74,5.76l2.02-1.47l-0.45-4.07l4.94-1.24l-1.01-1.92l-1.79-1.81L739.76,12.8L739.76,12.8M746.94,10.09l1.79,3.39l6.96-0.79l1.91-2.49l-0.45-2.15l-1.91-0.79l-1.79,1.36l-5.16,1.13L746.94,10.09L746.94,10.09M746.49,23.31l-3.48-0.9L741,24.56l-0.9,2.94l4.71-0.45l3.59-1.81L746.49,23.31L746.49,23.31M836.68,3.76l-2.92-0.9L830.4,4.1l-1.68,2.49l2.13,2.83l5.61-2.49l1.12-1.24L836.68,3.76L836.68,3.76M817.97,72.93l1.76,6.08l3.52,1.01l3.52-5.57l-2.01-3.8l0.75-3.29h5.28l-1.26,2.53l0.5,9.12l-7.54,18.74l0.75,4.05l-0.25,6.84l14.07,20.51l2.76,0.76l0.25-16.71l2.76-2.53l-3.02-6.58l2.51-2.79l-5.53-7.34l-3.02,0.25l-1-12.15l7.79-2.03l0.5-3.55l4.02-1.01l2.26,2.03l2.76-11.14l4.77-8.1l3.77-2.03l3.27,0.25v-3.8l-5.28-1.01l-7.29-6.08l3.52-4.05l-3.02-6.84l2.51-2.53l3.02,4.05l7.54,2.79l8.29,0.76l1.01-3.54l-4.27-4.3l4.77-6.58l-10.81-3.8l-2.76,5.57l-3.52-4.56l-19.85-6.84l-18.85,3.29l-2.76,1.52v1.52l4.02,2.03l-0.5,4.81l-7.29-3.04l-16.08,6.33l-2.76-5.82h-11.06l-5.03,5.32l-17.84-4.05l-16.33,3.29l-2.01,5.06l2.51,0.76l-0.25,3.8l-15.83,1.77l1.01,5.06l-14.58-2.53l3.52-6.58l-14.83-0.76l1.26,6.84l-4.77,2.28l-4.02-3.8l-16.33,2.79l-6.28,5.82l-0.25,3.54l-4.02,0.25l-0.5-4.05l12.82-11.14v-7.6l-8.29-2.28l-10.81,3.54l-4.52-4.56h-2.01l-2.51,5.06l2.01,2.28l-14.33,7.85l-12.31,9.37l-7.54,10.38v4.3l8.04,3.29l-4.02,3.04l-8.54-3.04l-3.52,3.04l-5.28-6.08l-1.01,2.28l5.78,18.23l1.51,0.51l4.02-2.03l2.01,1.52v3.29l-3.77-1.52l-2.26,1.77l1.51,3.29l-1.26,8.61l-7.79,0.76l-0.5-2.79l4.52-2.79l1.01-7.6l-5.03-6.58l-1.76-11.39l-8.04-1.27l-0.75,4.05l1.51,2.03l-3.27,2.79l1.26,7.6l4.77,2.03l1.01,5.57l-4.78-3.04l-12.31-2.28l-1.51,4.05l-9.8,3.54l-1.51-2.53l-12.82,7.09l-0.25,4.81l-5.03,0.76l1.51-3.54v-3.54l-5.03-1.77l-3.27,1.27l2.76,5.32l2.01,3.54v2.79l-3.77-0.76l-0.75-0.76l-3.77,4.05l2.01,3.54l-8.54-0.25l2.76,3.55l-0.75,1.52h-4.52l-3.27-2.28l-0.75-6.33l-5.28-2.03v-2.53l11.06,2.28l6.03,0.51l2.51-3.8l-2.26-4.05l-16.08-6.33l-5.55,1.38l-1.9,1.63l0.59,3.75l2.36,0.41l-0.55,5.9l7.28,17.1l-5.26,8.34l-0.36,1.88l2.67,1.88l-2.41,1.59l-1.6,0.03l0.3,7.35l2.21,3.13l0.03,3.04l2.83,0.26l4.33,1.65l4.58,6.3l0.05,1.66l-1.49,2.55l3.42-0.19l3.33,0.96l4.5,6.37l11.08,1.01l-0.48,7.58l-3.82,3.27l0.79,1.28l-3.77,4.05l-1,3.8l2.26,3.29l7.29,2.53l3.02-1.77l19.35,7.34l0.75-2.03l-4.02-3.8v-4.81l-2.51-0.76l0.5-4.05l4.02-4.81l-7.21-5.4l0.5-7.51l7.71-5.07l9.05,0.51l1.51,2.79l9.3,0.51l6.79-3.8l-3.52-3.8l0.75-7.09l17.59-8.61l13.53,6.1l4.52-4.05l13.32,12.66l10.05-1.01l3.52,3.54l9.55,1.01l6.28-8.61l8.04,3.55l4.27,0.76l4.27-3.8l-3.77-2.53l3.27-5.06l9.3,3.04l2.01,4.05l4.02,0.25l2.51-1.77l6.79-0.25l0.75,1.77l7.79,0.51l5.28-5.57l10.81,1.27l3.27-1.27l1-6.08l-3.27-7.34l3.27-2.79h10.3l9.8,11.65l12.56,7.09h3.77l0.5-3.04l4.52-2.79l0.5,16.46l-4.02,0.25v4.05l2.26,2.79l-0.42,3.62l1.67,0.69l1.01-2.53l1.51,0.51l1,1.01l4.52-1.01l4.52-13.17l0.5-16.46l-5.78-13.17l-7.29-8.86l-3.52,0.51v2.79l-8.54-3.29l3.27-7.09l2.76-18.74l11.56-3.54l5.53-3.54h6.03L805.86,96l1.51,2.53l5.28-5.57l3.02,0.25l-0.5-3.29l-4.78-1.01l3.27-11.9L817.97,72.93L817.97,72.93z","name":"Russian Federation"},"us":{"path":"M69.17,53.35l3.46,6.47l2.22-0.5v-2.24L69.17,53.35L69.17,53.35M49.66,110.26l-0.17,3.01l2.16-0.5v-1.34L49.66,110.26L49.66,110.26M46.34,111.6l-4.32,2.18l0.67,2.34l1.66-1.34l3.32-1.51L46.34,111.6L46.34,111.6M28.39,114.44l-2.99-0.67l-0.5,1.34l0.33,2.51L28.39,114.44L28.39,114.44M22.07,114.28l-2.83-1.17l-1,1.84l1.83,1.84L22.07,114.28L22.07,114.28M12.27,111.6l-1.33-1.84l-1.33,0.5v2.51l1.5,1L12.27,111.6L12.27,111.6M1.47,99.71l1.66,1.17l-0.5,1.34H1.47V99.71L1.47,99.71M10,248.7l-0.14,2.33l2.04,1.37l1.22-1.09L10,248.7L10,248.7M15.29,252.13l-1.9,1.37l1.63,2.05l1.9-1.64L15.29,252.13L15.29,252.13M19.1,255.41l-1.63,2.19l0.54,1.37l2.31-1.09L19.1,255.41L19.1,255.41M21.81,259.65l-0.95,5.47l0.95,2.05l3.12-0.96l1.63-2.74l-3.4-3.15L21.81,259.65L21.81,259.65M271.05,281.06l-2.64-0.89l-2.12,1.33l1.06,1.24l3.61,0.53L271.05,281.06L271.05,281.06M93.11,44.89l-8.39,1.99l1.73,9.45l9.13,2.49l0.49,1.99L82.5,65.04l-7.65,12.68l2.71,13.43L82,94.13l3.46-3.23l0.99,1.99l-4.2,4.97l-16.29,7.46l-10.37,2.49l-0.25,3.73l23.94-6.96l9.87-2.74l9.13-11.19l10.12-6.71l-5.18,8.7l5.68,0.75l9.63-4.23l1.73,6.96l6.66,1.49l6.91,6.71l0.49,4.97l-0.99,1.24l1.23,4.72h1.73l0.25-7.96h1.97l0.49,19.64l4.94-4.23l-3.46-20.39h-5.18l-5.68-7.21l27.89-47.25l-27.64-21.63l-30.85,5.97l-1.23,9.45l6.66,3.98l-2.47,6.47L93.11,44.89L93.11,44.89M148.76,158.34l-1,4.02l-3.49-2.26h-1.74l-1,4.27l-12.21,27.36l3.24,23.84l3.99,2.01l0.75,6.53h8.22l7.97,6.02l15.69,1.51l1.74,8.03l2.49,1.76l3.49-3.51l2.74,1.25l2.49,11.54l4.23,2.76l3.49-6.53l10.71-7.78l6.97,3.26l5.98,0.5l0.25-3.76l12.45,0.25l2.49,2.76l0.5,6.27l-1.49,3.51l1.74,6.02h3.74l3.74-5.77l-1.49-2.76l-1.49-6.02l2.24-6.78l10.21-8.78l7.72-2.26l-1-7.28l10.71-11.55l10.71-1.76L272.8,199l10.46-6.02v-8.03l-1-0.5l-3.74,1.25l-0.5,4.92l-12.43,0.15l-9.74,6.47l-15.29,5l-2.44-2.99l6.94-10.5l-3.43-3.27l-2.33-4.44l-4.83-3.88l-5.25-0.44l-9.92-6.77L148.76,158.34L148.76,158.34z","name":"United States of America"},"mu":{"path":"M613.01,398.99l-1.52,1.99l0.3,2.15l3.2-2.61L613.01,398.99L613.01,398.99z","name":"Mauritius"},"re":{"path":"M607.38,402.37l-2.28,0.15l-0.15,1.99l1.52,0.31l2.28-1.07L607.38,402.37L607.38,402.37z","name":"Reunion"},"mg":{"path":"M592.3,372.92l-2.13,5.06l-3.65,6.44l-6.39,0.46l-2.74,3.22l0.46,9.82l-3.96,4.6l0.46,7.82l3.35,3.83l3.96-0.46l3.96-2.92l-0.91-4.6l9.13-15.8l-1.83-1.99l1.83-3.83l1.98,0.61l0.61-1.53l-1.83-7.82l-1.07-3.22L592.3,372.92L592.3,372.92z","name":"Madagascar"},"km":{"path":"M577.69,371.23l0.46,1.53l1.98,0.31l0.76-1.99L577.69,371.23L577.69,371.23M580.58,374.3l0.76,1.69h1.22l0.61-2.15L580.58,374.3L580.58,374.3z","name":"Comoros"},"sc":{"path":"M602.35,358.34l-0.61,1.23l1.67,1.38l1.22-1.38L602.35,358.34L602.35,358.34M610.88,349.14l-1.83,1.23l1.37,2.15h1.83L610.88,349.14L610.88,349.14M611.64,354.51l-1.22,1.38l0.91,1.38l1.67,0.31l0.15-2.92L611.64,354.51L611.64,354.51z","name":"Seychelles"},"mv":{"path":"M656.4,320.76l0.3,2.61l1.67,0.61l0.3-2.3L656.4,320.76L656.4,320.76M658.53,326.28l-0.15,3.22l1.22,0.61l1.07-2.15L658.53,326.28L658.53,326.28M658.84,332.57l-1.07,1.07l1.22,1.07l1.52-1.07L658.84,332.57L658.84,332.57z","name":"Maldives"},"pt":{"path":"M372.64,217.02l-1.36,1.37l2.44,1.37l0.27-1.91L372.64,217.02L372.64,217.02M379.97,216.2l-1.63,1.09l1.36,1.09l2.17-0.55L379.97,216.2L379.97,216.2M381.05,220.03l-0.81,2.19l1.08,1.37l1.36-1.09L381.05,220.03L381.05,220.03M387.56,224.4l-0.54,1.37l0.81,0.82l2.17-1.37L387.56,224.4L387.56,224.4M408.18,236.42l-1.08,1.37l1.08,1.37l1.63-0.82L408.18,236.42L408.18,236.42M430.93,211.24l-0.62,8.65l-1.77,1.6l0.18,0.98l1.24,2.05l-0.8,2.5l1.33,0.45l3.1-0.36l-0.18-2.5l2.03-11.59l-0.44-1.6L430.93,211.24L430.93,211.24z","name":"Portugal"},"es":{"path":"M415.62,253.73l-1.75,1.01l0.81,0.82L415.62,253.73L415.62,253.73M409.54,253.92l-2.17,0.55l1.08,1.64h1.63L409.54,253.92L409.54,253.92M404.38,252.28l-1.36,1.37l1.9,1.64l1.08-2.46L404.38,252.28L404.38,252.28M448.36,205h-12.74l-2.57-1.16l-1.24,0.09l-1.5,3.12l0.53,3.21l4.87,0.45l0.62,2.05l-2.12,11.95l0.09,2.14l3.45,1.87l3.98,0.27l7.96-1.96l3.89-4.9l0.09-4.99l6.9-6.24l0.35-2.76l-6.28-0.09L448.36,205L448.36,205M461.1,217.21l-1.59,0.54l0.35,1.43h2.3l0.97-1.07L461.1,217.21L461.1,217.21z","name":"Spain"},"cv":{"path":"M387.56,290.54l-1.9,1.09l1.36,1.09l1.63-0.82L387.56,290.54L387.56,290.54M392.23,292.74l-1.24,1.1l0.88,1.63l2.12-0.95L392.23,292.74L392.23,292.74M389.52,295.83l-1.59,0.95l1.71,2.29l1.35-0.71L389.52,295.83L389.52,295.83z","name":"Cape Verde"},"pf":{"path":"M27.25,402.68l-1.9-0.14l-0.14,1.78l1.49,0.96l1.77-1.09L27.25,402.68L27.25,402.68M33.77,404.6l-2.72,1.78l2.04,2.46l1.77-0.41l0.95-1.23L33.77,404.6L33.77,404.6z","name":"French Polynesia"},"kn":{"path":"M276.6,283.37l-1.5,0.62l0.53,1.33l1.76-1.15l-0.35-0.36L276.6,283.37L276.6,283.37z","name":"Saint Kitts and Nevis"},"ag":{"path":"M279.07,284.88l-0.88,1.87l1.06,1.42l1.32-1.15L279.07,284.88L279.07,284.88z","name":"Antigua and Barbuda"},"dm":{"path":"M282.07,290.03l-1.06,0.98l0.79,1.6l1.5-0.44L282.07,290.03L282.07,290.03z","name":"Dominica"},"lc":{"path":"M281.98,294.03l-0.71,1.51l1.15,1.24l1.5-0.8L281.98,294.03L281.98,294.03z","name":"Saint Lucia"},"bb":{"path":"M282.07,297.85l-1.23,0.89l0.97,1.78l1.59-0.89L282.07,297.85L282.07,297.85z","name":"Barbados"},"gd":{"path":"M280.57,301.31l-1.15,1.15l0.44,0.71h1.41l0.44-1.16L280.57,301.31L280.57,301.31z","name":"Grenada"},"tt":{"path":"M282.24,304.78l-1.06,0.98l-1.15,0.18v1.42l2.12,1.95l0.88-1.42l0.53-1.6l-0.18-1.33L282.24,304.78L282.24,304.78z","name":"Trinidad and Tobago"},"do":{"path":"M263.11,280.44l-5.29-3.46l-2.5-0.85l-0.84,6l0.88,1.69l1.15-1.33l3.35-0.89l2.91,0.62L263.11,280.44L263.11,280.44z","name":"Dominican Republic"},"ht":{"path":"M250.86,275.38l3.44,0.36l-0.41,4.22l-0.34,2.22l-4.01-0.22l-0.71,1.07l-1.23-0.09l-0.44-2.31l4.23-0.35l-0.26-2.4l-1.94-0.8L250.86,275.38L250.86,275.38z","name":"Haiti"},"fk":{"path":"M307.95,508.18l-2.63-0.29l-2.62,1.76l1.9,2.06L307.95,508.18L307.95,508.18M310.57,506.86l-0.87,2.79l-2.48,2.2l0.15,0.73l4.23-1.62l1.75-2.2L310.57,506.86L310.57,506.86z","name":"Falkland Islands"},"is":{"path":"M406.36,117.31l-1.96-1.11l-2.64,1.67l-2.27,2.1l0.06,1.17l2.94,0.37l-0.18,2.1l-1.04,1.05l0.25,0.68l2.94,0.19v3.4l4.23,0.74l2.51,1.42l2.82,0.12l4.84-2.41l3.74-4.94l0.06-3.34l-2.27-1.92l-1.9-1.61l-0.86,0.62l-1.29,1.67l-1.47-0.19l-1.47-1.61l-1.9,0.18l-2.76,2.29l-1.66,1.79l-0.92-0.8l-0.06-1.98l0.92-0.62L406.36,117.31L406.36,117.31z","name":"Iceland"},"no":{"path":"M488.26,53.96l-1.65-1.66l-3.66,1.78h-6.72L475.17,58l3.77,3.33l1.65-0.24l2.36-4.04l2,1.43l-1.42,2.85l-0.71,4.16l1.65,2.61l3.54-5.94l4.6-5.59l-1.77-1.54L488.26,53.96L488.26,53.96M490.26,46.83l-2.95,2.73l1.77,2.73h3.18l1.3,1.78l3.89,2.02l4.48-2.61l3.07-2.61l-1.06-2.14l-3.07-1.78l-2.24,2.02l-1.53-1.9l-1.18,0.12l-1.53,3.33l-2.24-2.26l-0.24-1.54L490.26,46.83L490.26,46.83M496.98,59.07l-2.36,2.14l-2,1.54l0.94,1.66l1.89,0.59l3.07-1.43l1.42-1.78l-1.3-2.14L496.98,59.07L496.98,59.07M515.46,102.14l2.02-1.48L517.3,99l-1.28-0.74l0.18-2.03h1.1v-1.11l-4.77-1.29l-7.15,0.74l-0.73,3.14L503,97.16l-1.1-1.85l-3.49,0.18L498.04,99l-1.65,0.74l-0.92-1.85l-7.34,5.91l1.47,1.66l-2.75,1.29l-6.24,12.38l-2.2,1.48l0.18,1.11l2.2,1.11l-0.55,2.4l-3.67-0.19l-1.1-1.29l-2.38,2.77l-1.47,1.11l-0.37,2.59l-1.28,0.74l-3.3,0.74l-1.65,5.18l1.1,8.5l1.28,3.88l1.47,1.48l3.3-0.18l4.77-4.62l1.83-3.14l0.55,4.62l3.12-5.54l0.18-15.53l2.54-1.6l0.76-8.57l7.7-11.09l3.67-1.29l1.65-2.03l5.5,1.29l2.75,1.66l0.92-4.62l4.59-2.77L515.46,102.14L515.46,102.14z","name":"Norway"},"lk":{"path":"M680.54,308.05l0.25,2.72l0.25,1.98l-1.47,0.25l0.74,4.45l2.21,1.24l3.43-1.98l-0.98-4.69l0.25-1.73l-3.19-2.96L680.54,308.05L680.54,308.05z","name":"Sri Lanka"},"cu":{"path":"M220.85,266.92v1.27l5.32,0.1l2.51-1.46l0.39,1.07l5.22,1.27l4.64,4.19l-1.06,1.46l0.19,1.66l3.87,0.97l3.87-1.75l1.74-1.75l-2.51-1.27l-12.95-7.6l-4.54-0.49L220.85,266.92L220.85,266.92z","name":"Cuba"},"bs":{"path":"M239.61,259.13l-1.26-0.39l-0.1,2.43l1.55,1.56l1.06-1.56L239.61,259.13L239.61,259.13M242.12,262.93l-1.74,0.97l1.64,2.34l0.87-1.17L242.12,262.93L242.12,262.93M247.73,264.68l-1.84-0.1l0.19,1.17l1.35,1.95l1.16-1.27L247.73,264.68L247.73,264.68M246.86,262.35l-3-1.27l-0.58-3.02l1.16-0.49l1.16,2.34l1.16,0.88L246.86,262.35L246.86,262.35M243.96,256.21l-1.55-0.39l-0.29-1.95l-1.64-0.58l1.06-1.07l1.93,0.68l1.45,0.88L243.96,256.21L243.96,256.21z","name":"Bahamas"},"jm":{"path":"M238.93,279.59l-3.48,0.88v0.97l2.03,1.17h2.13l1.35-1.56L238.93,279.59L238.93,279.59z","name":"Jamaica"},"ec":{"path":"M230.2,335.85l-4.73,2.94l-0.34,4.36l-0.95,1.43l2.98,2.86l-1.29,1.41l0.3,3.6l5.33,1.27l8.07-9.55l-0.02-3.33l-3.87-0.25L230.2,335.85L230.2,335.85z","name":"Ecuador"},"ca":{"path":"M203.73,35.89l0.22,4.02l-7.98,8.27l2,6.7l5.76-1.56l3.33-4.92l8.42-3.13l6.87-0.45l-5.32-5.81l-2.66,2.01l-2-0.67l-1.11-2.46l-2.44-2.46L203.73,35.89L203.73,35.89M214.15,24.05l-1.77,3.13l8.65,3.13l3.1-4.69l1.33,3.13h2.22l4.21-4.69l-5.1-1.34l-2-1.56l-2.66,2.68L214.15,24.05L214.15,24.05M229.23,30.31l-6.87,2.9v2.23l8.87,3.35l-2,2.23l1.33,2.9l5.54-2.46h4.66l2.22,3.57l3.77-3.8l-0.89-3.58l-3.1,1.12l-0.44-4.47l1.55-2.68h-1.55l-2.44,1.56l-1.11,0.89l0.67,3.13l-1.77,1.34l-2.66-0.22l-0.67-4.02L229.23,30.31L229.23,30.31M238.32,23.38l-0.67,2.23l4.21,2.01l3.1-1.79l-0.22-1.34L238.32,23.38L238.32,23.38M241.64,19.58l-3.1,1.12l0.22,1.56l6.87-0.45l-0.22-1.56L241.64,19.58L241.64,19.58M256.5,23.38l-0.44,1.56l-1.11,1.56v2.23l4.21-0.67l4.43,3.8h1.55v-3.8l-4.43-4.92L256.5,23.38L256.5,23.38M267.81,27.85l1.77,2.01l-1.55,2.68l1.11,2.9l4.88-2.68v-2.01l-2.88-3.35L267.81,27.85L267.81,27.85M274.24,22.71l0.22,3.57h5.99l1.55,1.34l-0.22,1.56l-5.32,0.67l3.77,5.14l5.1,0.89l7.09-3.13l-10.2-15.42l-3.1,2.01l0.22,2.68l-3.55-1.34L274.24,22.71L274.24,22.71M222.58,47.96l-8.42,2.23l-4.88,4.25l0.44,4.69l8.87,2.68l-2,4.47l-6.43-4.02l-1.77,3.35l4.21,2.9l-0.22,4.69l6.43,1.79l7.76-0.45l1.33-2.46l5.76,6.48l3.99-1.34l0.67-4.47l2.88,2.01l0.44-4.47l-3.55-2.23l0.22-14.07l-3.1-2.46L231.89,56L222.58,47.96L222.58,47.96M249.63,57.79l-2.88-1.34l-1.55,2.01l3.1,4.92l0.22,4.69l6.65-4.02v-5.81l2.44-2.46l-2.44-1.79h-3.99L249.63,57.79L249.63,57.79M263.82,55.78l-4.66,3.8l1.11,4.69h2.88l1.33-2.46l2,2.01l2-0.22l5.32-4.47L263.82,55.78L263.82,55.78M263.37,48.4l-1.11,2.23l4.88,1.79l1.33-2.01L263.37,48.4L263.37,48.4M260.49,39.91l-4.88,0.67l-2.88,2.68l5.32,0.22l-1.55,4.02l1.11,1.79l1.55-0.22l3.77-6.03L260.49,39.91L260.49,39.91M268.92,38.35l-2.66,0.89l0.44,3.57l4.43,2.9l0.22,2.23l-1.33,1.34l0.67,4.47l17.07,5.58l4.66,1.56l4.66-4.02l-5.54-4.47l-5.1,1.34l-7.09-0.67l-2.66-2.68l-0.67-7.37l-4.43-2.23L268.92,38.35L268.92,38.35M282.88,61.59L278,61.14l-5.76,2.23l-3.1,4.24l0.89,11.62l9.53,0.45l9.09,4.47l6.43,7.37l4.88-0.22l-1.33,6.92l-4.43,7.37l-4.88,2.23l-3.55-0.67l-1.77-1.56l-2.66,3.57l1.11,3.57l3.77,0.22l4.66-2.23l3.99,10.28l9.98,6.48l6.87-8.71l-5.76-9.38l3.33-3.8l4.66,7.82l8.42-7.37l-1.55-3.35l-5.76,1.79l-3.99-10.95l3.77-6.25l-7.54-8.04l-4.21,2.9l-3.99-8.71l-8.42,1.12l-2.22-10.5l-6.87,4.69l-0.67,5.81h-3.77l0.44-5.14L282.88,61.59L282.88,61.59M292.86,65.61l-1.77,1.79l1.55,2.46l7.32,0.89l-4.66-4.92L292.86,65.61L292.86,65.61M285.77,40.36v2.01l-4.88,1.12l1.33,2.23l5.54,2.23l6.21,0.67l4.43,3.13l4.43-2.46l-3.1-3.13h3.99l2.44-2.68l5.99-0.89v-1.34l-3.33-2.23l0.44-2.46l9.31,1.56l13.75-5.36l-5.1-1.56l1.33-1.79h10.64l1.77-1.79l-21.51-7.6l-5.1-1.79l-5.54,4.02l-6.21-5.14l-3.33-0.22l-0.67,4.25l-4.21-3.8l-4.88,1.56l0.89,2.46l7.32,1.56l-0.44,3.57l3.99,2.46l9.76-2.46l0.22,3.35l-7.98,3.8l-4.88-3.8l-4.43,0.45l4.43,6.26l-2.22,1.12l-3.33-2.9l-2.44,1.56l2.22,4.24h3.77l-0.89,4.02l-3.1-0.45l-3.99-4.25L285.77,40.36L285.77,40.36M266.01,101.85l-4.23,5.32l-0.26,5.86l3.7-2.13h4.49l3.17,2.93l2.91-2.4L266.01,101.85L266.01,101.85M317.52,171.05l-10.57,10.12l1.06,2.4l12.94,4.79l1.85-3.19l-1.06-5.32l-4.23,0.53l-2.38-2.66l3.96-3.99L317.52,171.05L317.52,171.05M158.22,48.66l1.99,3.01l1,4.02l4.98,1.25l3.49-3.76l2.99,1.51l8.47,0.75l5.98-2.51l1,8.28h3.49V57.7l3.49,0.25l8.72,10.29l5.73,3.51l-2.99,4.77l1.25,1.25L219,80.03l0.25,5.02l2.99,0.5l0.75-7.53l4.73-1.25l3.49,5.27l7.47,3.51l3.74,0.75l2.49-3.01l0.25-4.77l4.48-2.76l1.49,4.02l-3.99,7.03l0.5,3.51l2.24-3.51l4.48-4.02l0.25-5.27l-2.49-4.02l0.75-3.26l5.98-3.01l2.74,2.01l0.5,17.57l4.23-3.76l2.49,1.51l-3.49,6.02l4.48,1l6.48-10.04l5.48,5.77l-2.24,10.29l-5.48,3.01l-5.23-2.51l-9.46,2.01l1,3.26l-2.49,4.02l-7.72,1.76l-8.72,6.78l-7.72,10.29l-1,3.26l5.23,2.01l1.99,5.02l7.22,7.28l11.46,5.02l-2.49,11.54l-0.25,3.26l2.99,2.01l3.99-5.27l0.5-10.04l6.23-0.25l2.99-5.77l0.5-8.78l7.97-15.56l9.96,3.51l5.23,7.28l-2.24,7.28l3.99,2.26l9.71-6.53l2.74,17.82l8.97,10.79l0.25,5.52l-9.96,2.51l-4.73,5.02l-9.96-2.26l-4.98-0.25l-8.72,6.78l5.23-1.25l6.48-1.25l1.25,1.51l-1.74,5.52l0.25,5.02l2.99,2.01l2.99-0.75l1.5-2.26h1.99l-3.24,6.02l-6.23,0.25l-2.74,4.02h-3.49l-1-3.01l4.98-5.02l-5.98,2.01l-0.27-8.53l-1.72-1l-5.23,2.26l-0.5,4.27h-11.96l-10.21,7.03l-13.7,4.52l-1.49-2.01l6.9-10.3l-3.92-3.77l-2.49-4.78l-5.07-3.87l-5.44-0.45l-9.75-6.83l-70.71-11.62l-1.17-4.79l-6.48-6.02v-5.02l1-4.52l-0.5-2.51l-2.49-2.51l-0.5-4.02l6.48-4.52l-3.99-21.58l-5.48-0.25l-4.98-6.53L158.22,48.66L158.22,48.66M133.83,128.41l-1.7,3.26l0.59,2.31l1.11,0.69l-0.26,0.94l-1.19,0.34l0.34,3.43l1.28,1.29l1.02-1.11l-1.28-3.34l0.76-2.66l1.87-2.49l-1.36-2.31L133.83,128.41L133.83,128.41M139.45,147.95l-1.53,0.6l2.81,3.26l0.68,3.86l2.81,3l2.38-0.43v-3.94l-2.89-1.8L139.45,147.95L139.45,147.95z","name":"Canada"},"gt":{"path":"M194.88,291.52l5.93,4.34l5.98-7.43l-1.02-1.54l-2.04-0.07v-4.35l-1.53-0.93l-4.63,1.38l1.77,4.08L194.88,291.52L194.88,291.52z","name":"Guatemala"},"hn":{"path":"M207.55,288.78l9.24-0.35l2.74,3.26l-1.71-0.39l-3.29,0.14l-4.3,4.04l-1.84,4.09l-1.21-0.64l-0.01-4.48l-2.66-1.78L207.55,288.78L207.55,288.78z","name":"Honduras"},"sv":{"path":"M201.65,296.27l4.7,2.34l-0.07-3.71l-2.41-1.47L201.65,296.27L201.65,296.27z","name":"El Salvador"},"ni":{"path":"M217.74,292.11l2.19,0.44l0.07,4.49l-2.55,7.28l-6.87-0.68l-1.53-3.51l2.04-4.26l3.87-3.6L217.74,292.11L217.74,292.11z","name":"Nicaragua"},"cr":{"path":"M217.38,304.98l1.39,2.72l1.13,1.5l-1.52,4.51l-2.9-2.04l-4.74-4.34v-2.87L217.38,304.98L217.38,304.98z","name":"Costa Rica"},"pa":{"path":"M220.59,309.61l-1.46,4.56l4.82,1.25l2.99,0.59l0.51-3.53l3.21-1.62l2.85,1.47l1.12,1.79l1.36-0.16l1.07-3.25l-3.56-1.47l-2.7-1.47l-2.7,1.84l-3.21,1.62l-3.28-1.32L220.59,309.61L220.59,309.61z","name":"Panama"},"co":{"path":"M253.73,299.78l-2.06-0.21l-13.62,11.23l-1.44,3.95l-1.86,0.21l0.83,8.73l-4.75,11.65l5.16,4.37l6.61,0.42l4.54,6.66l6.6,0.21l-0.21,4.99H256l2.68-9.15l-2.48-3.12l0.62-5.82l5.16-0.42l-0.62-13.52l-11.56-3.74l-2.68-7.28L253.73,299.78L253.73,299.78z","name":"Colombia"},"ve":{"path":"M250.46,305.92l0.44,2.59l3.25,1.03l0.74-4.77l3.43-3.55l3.43,4.02l7.89,2.15l6.68-1.4l4.55,5.61l3.43,2.15l-3.76,5.73l1.26,4.34l-2.15,2.66l-2.23,1.87l-4.83-2.43l-1.11,1.12v3.46l3.53,1.68l-2.6,2.81l-2.6,2.81l-3.43-0.28l-3.45-3.79l-0.73-14.26l-11.78-4.02l-2.14-6.27L250.46,305.92L250.46,305.92z","name":"Venezuela"},"gy":{"path":"M285.05,314.13l7.22,6.54l-2.87,3.32l-0.23,1.97l3.77,3.89l-0.09,3.74l-6.56,2.5l-3.93-5.31l0.84-6.38l-1.68-4.75L285.05,314.13L285.05,314.13z","name":"Guyana"},"sr":{"path":"M293.13,321.14l2.04,1.87l3.16-1.96l2.88,0.09l-0.37,1.12l-1.21,2.52l-0.19,6.27l-5.75,2.34l0.28-4.02l-3.71-3.46l0.19-1.78L293.13,321.14L293.13,321.14z","name":"Suriname"},"gf":{"path":"M302.13,321.8l5.85,3.65l-3.06,6.08l-1.11,1.4l-3.25-1.87l0.09-6.55L302.13,321.8L302.13,321.8z","name":"French Guiana"},"pe":{"path":"M225.03,349.52l-1.94,1.96l0.13,3.13l16.94,30.88l17.59,11.34l2.72-4.56l0.65-10.03l-1.42-6.25l-4.79-8.08l-2.85,0.91l-1.29,1.43l-5.69-6.52l1.42-7.69l6.6-4.3l-0.52-4.04l-6.72-0.26l-3.49-5.86l-1.94-0.65l0.13,3.52l-8.66,10.29l-6.47-1.56L225.03,349.52L225.03,349.52z","name":"Peru"},"bo":{"path":"M258.71,372.79l8.23-3.59l2.72,0.26l1.81,7.56l12.54,4.17l2.07,6.39l5.17,0.65l2.2,5.47l-1.55,4.95l-8.41,0.65l-3.1,7.95l-6.6-0.13l-2.07-0.39l-3.81,3.7l-1.88-0.18l-6.47-14.99l1.79-2.68l0.63-10.6l-1.6-6.31L258.71,372.79L258.71,372.79z","name":"Bolivia"},"py":{"path":"M291.76,399.51l2.2,2.4l-0.26,5.08l6.34-0.39l4.79,6.13l-0.39,5.47l-3.1,4.69l-6.34,0.26l-0.26-2.61l1.81-4.3l-6.21-3.91h-5.17l-3.88-4.17l2.82-8.06L291.76,399.51L291.76,399.51z","name":"Paraguay"},"uy":{"path":"M300.36,431.93l-2.05,2.19l0.85,11.78l6.44,1.87l8.19-8.21L300.36,431.93L300.36,431.93z","name":"Uruguay"},"ar":{"path":"M305.47,418.2l1.94,1.82l-7.37,10.95l-2.59,2.87l0.9,12.51l5.69,6.91l-4.78,8.34l-3.62,1.56h-4.14l1.16,6.51l-6.47,2.22l1.55,5.47l-3.88,12.38l4.79,3.91l-2.59,6.38l-4.4,6.91l2.33,4.82l-5.69,0.91l-4.66-5.73l-0.78-17.85l-7.24-30.32l2.19-10.6l-4.66-13.55l3.1-17.59l2.85-3.39l-0.7-2.57l3.66-3.34l8.16,0.56l4.56,4.87l5.27,0.09l5.4,3.3l-1.59,3.72l0.38,3.76l7.65-0.36L305.47,418.2L305.47,418.2M288.92,518.79l0.26,5.73l4.4-0.39l3.75-2.48l-6.34-1.3L288.92,518.79L288.92,518.79z","name":"Argentina"},"cl":{"path":"M285.04,514.1l-4.27,9.38l7.37,0.78l0.13-6.25L285.04,514.1L285.04,514.1M283.59,512.63l-3.21,3.55l-0.39,4.17l-6.21-3.52l-6.6-9.51l-1.94-3.39l2.72-3.52l-0.26-4.43l-3.1-1.3l-2.46-1.82l0.52-2.48l3.23-0.91l0.65-14.33l-5.04-2.87l-3.29-74.59l0.85-1.48l6.44,14.85l2.06,0.04l0.67,2.37l-2.74,3.32l-3.15,17.87l4.48,13.76l-2.07,10.42l7.3,30.64l0.77,17.92l5.23,6.05L283.59,512.63L283.59,512.63M262.28,475.14l-1.29,1.95l0.65,3.39l1.29,0.13l0.65-4.3L262.28,475.14L262.28,475.14z","name":"Chile"},"br":{"path":"M314.24,438.85l6.25-12.02l0.23-10.1l11.66-7.52h6.53l5.13-8.69l0.93-16.68l-2.1-4.46l12.36-11.28l0.47-12.45l-16.79-8.22l-20.28-6.34l-9.56-0.94l2.57-5.4l-0.7-8.22l-2.09-0.69l-3.09,6.14l-1.62,2.03l-4.16-1.84l-13.99,4.93l-4.66-5.87l0.75-6.13l-4.4,4.48l-4.86-2.62l-0.49,0.69l0.01,2.13l4.19,2.25l-6.29,6.63l-3.97-0.04l-4.02-4.09l-4.55,0.14l-0.56,4.86l2.61,3.17l-3.08,9.87l-3.6,0.28l-5.73,3.62l-1.4,7.11l4.97,5.32l0.91-1.03l3.49-0.94l2.98,5.02l8.53-3.66l3.31,0.19l2.28,8.07l12.17,3.86l2.1,6.44l5.18,0.62l2.47,6.15l-1.67,5.47l2.18,2.86l-0.32,4.26l5.84-0.55l5.35,6.76l-0.42,4.75l3.17,2.68l-7.6,11.51L314.24,438.85L314.24,438.85z","name":"Brazil"},"bz":{"path":"M204.56,282.4l-0.05,3.65h0.84l2.86-5.34h-1.94L204.56,282.4L204.56,282.4z","name":"Belize"},"mn":{"path":"M673.8,170.17l5.82-7.72l6.99,3.23l4.75,1.27l5.82-5.34l-3.95-2.91l2.6-3.67l7.76,2.74l2.69,4.41l4.86,0.13l2.54-1.89l5.23-0.21l1.14,1.94l8.69,0.44l5.5-5.61l7.61,0.8l-0.44,7.64l3.33,0.76l4.09-1.86l4.33,2.14l-0.1,1.08l-3.14,0.09l-3.27,6.86l-2.54,0.25l-9.88,12.91l-10.09,4.45l-6.31,0.49l-5.24-3.38l-6.7,3.58l-6.6-2.05l-1.87-4.79l-12.5-0.88l-6.4-10.85l-3.11-0.2L673.8,170.17L673.8,170.17z","name":"Mongolia"},"kp":{"path":"M778.28,194.27l1.84,0.77l0.56,6.44l3.65,0.21l3.44-4.03l-1.19-1.06l0.14-4.32l3.16-3.82l-1.61-2.9l1.05-1.2l0.58-3l-1.83-0.83l-1.56,0.79l-1.93,5.86l-3.12-0.27l-3.61,4.26L778.28,194.27L778.28,194.27z","name":"North Korea"},"kr":{"path":"M788.34,198.2l6.18,5.04l1.05,4.88l-0.21,2.62l-3.02,3.4l-2.6,0.14l-2.95-6.37l-1.12-3.04l1.19-0.92l-0.28-1.27l-1.47-0.66L788.34,198.2L788.34,198.2z","name":"South Korea"},"kz":{"path":"M576.69,188.62l4.1-1.75l4.58-0.16l0.32,7h-2.68l-2.05,3.34l2.68,4.45l3.95,2.23l0.36,2.55l1.45-0.48l1.34-1.59l2.21,0.48l1.11,2.23h2.84v-2.86l-1.74-5.09l-0.79-4.13l5.05-2.23l6.79,1.11l4.26,4.29l9.63-0.95l5.37,7.63l6.31,0.32l1.74-2.86l2.21-0.48l0.32-3.18l3.31-0.16l1.74,2.07l1.74-4.13l14.99,2.07l2.52-3.34l-4.26-5.25l5.68-12.4l4.58,0.32l3.16-7.63l-6.31-0.64l-3.63-3.5l-10,1.16l-12.88-12.45l-4.54,4.03l-13.77-6.25l-16.89,8.27l-0.47,5.88l3.95,4.61l-7.7,4.35l-9.99-0.22l-2.09-3.07l-7.83-0.43l-7.42,4.77l-0.16,6.52L576.69,188.62L576.69,188.62z","name":"Kazakhstan"},"tm":{"path":"M593.85,207.59l-0.62,2.63h-4.15v3.56l4.46,2.94l-1.38,4.03v1.86l1.85,0.31l2.46-3.25l5.54-1.24l11.84,4.49l0.15,3.25l6.61,0.62l7.38-7.75l-0.92-2.48l-4.92-1.08l-13.84-8.99l-0.62-3.25h-5.23l-2.31,4.34h-2.31L593.85,207.59L593.85,207.59z","name":"Turkmenistan"},"uz":{"path":"M628.92,219.06l3.08,0.16v-5.27l-2.92-1.7l4.92-6.2h2l2,2.33l5.23-2.01l-7.23-2.48l-0.28-1.5l-1.72,0.42l-1.69,2.94l-7.29-0.24l-5.35-7.57l-9.4,0.93l-4.48-4.44l-6.2-1.05l-4.5,1.83l2.61,8.68l0.03,2.92l1.9,0.04l2.33-4.44l6.2,0.08l0.92,3.41l13.29,8.82l5.14,1.18L628.92,219.06L628.92,219.06z","name":"Uzbekistan"},"tj":{"path":"M630.19,211.84l4.11-5.1h1.55l0.54,1.14l-1.9,1.38v1.14l1.25,0.9l6.01,0.36l1.96-0.84l0.89,0.18l0.6,1.92l3.57,0.36l1.79,3.78l-0.54,1.14l-0.71,0.06l-0.71-1.44l-1.55-0.12l-2.68,0.36l-0.18,2.52l-2.68-0.18l0.12-3.18l-1.96-1.92l-2.98,2.46l0.06,1.62l-2.62,0.9h-1.55l0.12-5.58L630.19,211.84L630.19,211.84z","name":"Tajikistan"},"kg":{"path":"M636.81,199.21l-0.31,2.53l0.25,1.56l8.7,2.92l-7.64,3.08l-0.87-0.72l-1.65,1.06l0.08,0.58l0.88,0.4l5.36,0.14l2.72-0.82l3.49-4.4l4.37,0.76l5.27-7.3l-14.1-1.92l-1.95,4.73l-2.46-2.64L636.81,199.21L636.81,199.21z","name":"Kyrgyz Republic"},"af":{"path":"M614.12,227.05l1.59,12.46l3.96,0.87l0.37,2.24l-2.84,2.37l5.29,4.27l10.28-3.7l0.82-4.38l6.47-4.04l2.48-9.36l1.85-1.99l-1.92-3.34l6.26-3.87l-0.8-1.12l-2.89,0.18l-0.26,2.66l-3.88-0.04l-0.07-3.55l-1.25-1.49l-2.1,1.91l0.06,1.75l-3.17,1.2l-5.85-0.37l-7.6,7.96L614.12,227.05L614.12,227.05z","name":"Afghanistan"},"pk":{"path":"M623.13,249.84l2.6,3.86l-0.25,1.99l-3.46,1.37l-0.25,3.24h3.96l1.36-1.12h7.54l6.8,5.98l0.87-2.87h5.07l0.12-3.61l-5.19-4.98l1.11-2.74l5.32-0.37l7.17-14.95l-3.96-3.11l-1.48-5.23l9.64-0.87l-5.69-8.1l-3.03-0.82l-1.24,1.5l-0.93,0.07l-5.69,3.61l1.86,3.12l-2.1,2.24l-2.6,9.59l-6.43,4.11l-0.87,4.49L623.13,249.84L623.13,249.84z","name":"Pakistan"},"in":{"path":"M670.98,313.01l4.58-2.24l2.72-9.84l-0.12-12.08l15.58-16.82v-3.99l3.21-1.25l-0.12-4.61l-3.46-6.73l1.98-3.61l4.33,3.99l5.56,0.25v2.24l-1.73,1.87l0.37,1l2.97,0.12l0.62,3.36h0.87l2.23-3.99l1.11-10.46l3.71-2.62l0.12-3.61l-1.48-2.87l-2.35-0.12l-9.2,6.08l0.58,3.91l-6.46-0.02l-2.28-2.79l-1.24,0.16l0.42,3.88l-13.97-1l-8.66-3.86l-0.46-4.75l-5.77-3.58l-0.07-7.37l-3.96-4.53l-9.1,0.87l0.99,3.96l4.46,3.61l-7.71,15.78l-5.16,0.39l-0.85,1.9l5.08,4.7l-0.25,4.75l-5.19-0.08l-0.56,2.36l4.31-0.19l0.12,1.87l-3.09,1.62l1.98,3.74l3.83,1.25l2.35-1.74l1.11-3.11l1.36-0.62l1.61,1.62l-0.49,3.99l-1.11,1.87l0.25,3.24L670.98,313.01L670.98,313.01z","name":"India"},"np":{"path":"M671.19,242.56l0.46,4.27l8.08,3.66l12.95,0.96l-0.49-3.13l-8.65-2.38l-7.34-4.37L671.19,242.56L671.19,242.56z","name":"Nepal"},"bt":{"path":"M695.4,248.08l1.55,2.12l5.24,0.04l-0.53-2.9L695.4,248.08L695.4,248.08z","name":"Bhutan"},"bd":{"path":"M695.57,253.11l-1.31,2.37l3.4,6.46l0.1,5.04l0.62,1.35l3.99,0.07l2.26-2.17l1.64,0.99l0.33,3.07l1.31-0.82l0.08-3.92l-1.1-0.13l-0.69-3.33l-2.78-0.1l-0.69-1.85l1.7-2.27l0.03-1.12h-4.94L695.57,253.11L695.57,253.11z","name":"Bangladesh"},"mm":{"path":"M729.44,303.65l-2.77-4.44l2.01-2.82l-1.9-3.49l-1.79-0.34l-0.34-5.86l-2.68-5.19l-0.78,1.24l-1.79,3.04l-2.24,0.34l-1.12-1.47l-0.56-3.95l-1.68-3.16l-6.84-6.45l1.68-1.11l0.31-4.67l2.5-4.2l1.08-10.45l3.62-2.47l0.12-3.81l2.17,0.72l3.42,4.95l-2.54,5.44l1.71,4.27l4.23,1.66l0.77,4.65l5.68,0.88l-1.57,2.71l-7.16,2.82l-0.78,4.62l5.26,6.76l0.22,3.61l-1.23,1.24l0.11,1.13l3.92,5.75l0.11,5.97L729.44,303.65L729.44,303.65z","name":"Myanmar"},"th":{"path":"M730.03,270.47l3.24,4.17v5.07l1.12,0.56l5.15-2.48l1.01,0.34l6.15,7.1l-0.22,4.85l-2.01-0.34l-1.79-1.13l-1.34,0.11l-2.35,3.94l0.45,2.14l1.9,1.01l-0.11,2.37l-1.34,0.68l-4.59-3.16v-2.82l-1.9-0.11l-0.78,1.24l-0.4,12.62l2.97,5.42l5.26,5.07l-0.22,1.47l-2.8-0.11l-2.57-3.83h-2.69l-3.36-2.71l-1.01-2.82l1.45-2.37l0.5-2.14l1.58-2.8l-0.07-6.44l-3.86-5.58l-0.16-0.68l1.25-1.26l-0.29-4.43l-5.14-6.51l0.6-3.75L730.03,270.47L730.03,270.47z","name":"Thailand"},"kh":{"path":"M740.48,299.47l4.09,4.37l7.61-5.64l0.67-8.9l-3.93,2.71l-2.04-1.14l-2.77-0.37l-1.55-1.09l-0.75,0.04l-2.03,3.33l0.33,1.54l2.06,1.15l-0.25,3.13L740.48,299.47L740.48,299.47z","name":"Cambodia"},"la":{"path":"M735.47,262.93l-2.42,1.23l-2.01,5.86l3.36,4.28l-0.56,4.73l0.56,0.23l5.59-2.71l7.5,8.38l-0.18,5.28l1.63,0.88l4.03-3.27l-0.33-2.59l-11.63-11.05l0.11-1.69l1.45-1.01l-1.01-2.82l-4.81-0.79L735.47,262.93L735.47,262.93z","name":"Lao People's Democratic Republic"},"vn":{"path":"M745.06,304.45l1.19,1.87l0.22,2.14l3.13,0.34l3.8-5.07l3.58-1.01l1.9-5.18l-0.89-8.34l-3.69-5.07l-3.89-3.11l-4.95-8.5l3.55-5.94l-5.08-5.83l-4.07-0.18l-3.66,1.97l1.09,4.71l4.88,0.86l1.31,3.63l-1.72,1.12l0.11,0.9l11.45,11.2l0.45,3.29l-0.69,10.4L745.06,304.45L745.06,304.45z","name":"Vietnam"},"ge":{"path":"M555.46,204.16l3.27,4.27l4.08,1.88l2.51-0.01l4.31-1.17l1.08-1.69l-12.75-4.77L555.46,204.16L555.46,204.16z","name":"Georgia"},"am":{"path":"M569.72,209.89l4.8,6.26l-1.41,1.65l-3.4-0.59l-4.22-3.78l0.23-2.48L569.72,209.89L569.72,209.89z","name":"Armenia"},"az":{"path":"M571.41,207.72l-1.01,1.72l4.71,6.18l1.64-0.53l2.7,2.83l1.17-4.96l2.93,0.47l-0.12-1.42l-4.82-4.22l-0.92,2.48L571.41,207.72L571.41,207.72z","name":"Azerbaijan"},"ir":{"path":"M569.65,217.95l-1.22,1.27l0.12,2.01l1.52,2.13l5.39,5.9l-0.82,2.36h-0.94l-0.47,2.36l3.05,3.9l2.81,0.24l5.63,7.79l3.16,0.24l2.46,1.77l0.12,3.54l9.73,5.67h3.63l2.23-1.89l2.81-0.12l1.64,3.78l10.51,1.46l0.31-3.86l3.48-1.26l0.16-1.38l-2.77-3.78l-6.17-4.96l3.24-2.95l-0.23-1.3l-4.06-0.63l-1.72-13.7l-0.2-3.15l-11.01-4.21l-4.88,1.1l-2.73,3.35l-2.42-0.16l-0.7,0.59l-5.39-0.35l-6.8-4.96l-2.53-2.77l-1.16,0.28l-2.09,2.39L569.65,217.95L569.65,217.95z","name":"Iran"},"tr":{"path":"M558.7,209.19l-2.23,2.36l-8.2-0.24l-4.92-2.95l-4.8-0.12l-5.51,3.9l-5.16,0.24l-0.47,2.95h-5.86l-2.34,2.13v1.18l1.41,1.18v1.3l-0.59,1.54l0.59,1.3l1.88-0.94l1.88,2.01l-0.47,1.42l-0.7,0.95l1.05,1.18l5.16,1.06l3.63-1.54v-2.24l1.76,0.35l4.22,2.48l4.57-0.71l1.99-1.89l1.29,0.47v2.13h1.76l1.52-2.95l13.36-1.42l5.83-0.71l-1.54-2.02l-0.03-2.73l1.17-1.4l-4.26-3.42l0.23-2.95h-2.34L558.7,209.19L558.7,209.19M523.02,209.7l-0.16,3.55l3.1-0.95l1.42-0.95l-0.42-1.54l-1.47-1.17L523.02,209.7L523.02,209.7z","name":"Turkey"},"om":{"path":"M598.38,280.84l7.39-4.26l1.31-6.25l-1.62-0.93l0.67-6.7l1.41-0.82l1.51,2.37l8.99,4.7v2.61l-10.89,16.03l-5.01,0.17L598.38,280.84L598.38,280.84z","name":"Oman"},"ae":{"path":"M594.01,264.94l0.87,3.48l9.86,0.87l0.69-7.14l1.9-1.04l0.52-2.61l-3.11,0.87l-3.46,5.23L594.01,264.94L594.01,264.94z","name":"United Arab Emirates"},"qa":{"path":"M592.63,259.02l-0.52,4.01l1.54,1.17l1.4-0.13l0.52-5.05l-1.21-0.87L592.63,259.02L592.63,259.02z","name":"Qatar"},"kw":{"path":"M583.29,247.17l-2.25-1.22l-1.56,1.57l0.17,3.14l3.63,1.39L583.29,247.17L583.29,247.17z","name":"Kuwait"},"sa":{"path":"M584,253.24l7.01,9.77l2.26,1.8l1.01,4.38l10.79,0.85l1.22,0.64l-1.21,5.4l-7.09,4.18l-10.37,3.14l-5.53,5.4l-6.57-3.83l-3.98,3.48L566,279.4l-3.8-1.74l-1.38-2.09v-4.53l-13.83-16.72l-0.52-2.96h3.98l4.84-4.18l0.17-2.09l-1.38-1.39l2.77-2.26l5.88,0.35l10.03,8.36l5.92-0.27l0.38,1.46L584,253.24L584,253.24z","name":"Saudi Arabia"},"sy":{"path":"M546.67,229.13l-0.35,2.54l2.82,1.18l-0.12,7.04l2.82-0.06l2.82-2.13l1.06-0.18l6.4-5.09l1.29-7.39l-12.79,1.3l-1.35,2.96L546.67,229.13L546.67,229.13z","name":"Syrian Arab Republic"},"iq":{"path":"M564.31,225.03l-1.56,7.71l-6.46,5.38l0.41,2.54l6.31,0.43l10.05,8.18l5.62-0.16l0.15-1.89l2.06-2.21l2.88,1.63l0.38-0.36l-5.57-7.41l-2.64-0.16l-3.51-4.51l0.7-3.32l1.07-0.14l0.37-1.47l-4.78-5.03L564.31,225.03L564.31,225.03z","name":"Iraq"},"jo":{"path":"M548.9,240.78l-2.46,8.58l-0.11,1.31h3.87l4.33-3.82l0.11-1.45l-1.77-1.81l3.17-2.63l-0.46-2.44l-0.87,0.2l-2.64,1.89L548.9,240.78L548.9,240.78z","name":"Jordan"},"lb":{"path":"M546.2,232.44l0.06,1.95l-0.82,2.96l2.82,0.24l0.18-4.2L546.2,232.44L546.2,232.44z","name":"Lebanon"},"il":{"path":"M545.32,238.06l-1.58,5.03l2.05,6.03l2.35-8.81v-1.89L545.32,238.06L545.32,238.06z","name":"Israel"},"cy":{"path":"M543.21,229.84l1.23,0.89l-3.81,3.61l-1.82-0.06l-1.35-0.95l0.18-1.77l2.76-0.18L543.21,229.84L543.21,229.84z","name":"Cyprus"},"gb":{"path":"M446.12,149.08l-1.83,2.77l0.73,1.11h4.22v1.85l-1.1,1.48l0.73,3.88l2.38,4.62l1.83,4.25l2.93,1.11l1.28,2.22l-0.18,2.03l-1.83,1.11l-0.18,0.92l1.28,0.74l-1.1,1.48l-2.57,1.11l-4.95-0.55l-7.71,3.51l-2.57-1.29l7.34-4.25l-0.92-0.55l-3.85-0.37l2.38-3.51l0.37-2.96l3.12-0.37l-0.55-5.73l-3.67-0.18l-1.1-1.29l0.18-4.25l-2.2,0.18l2.2-7.39l4.04-2.96L446.12,149.08L446.12,149.08M438.42,161.47l-3.3,0.37l-0.18,2.96l2.2,1.48l2.38-0.55l0.92-1.66L438.42,161.47L438.42,161.47z","name":"United Kingdom"},"ie":{"path":"M439.51,166.55l-0.91,6l-8.07,2.96h-2.57l-1.83-1.29v-1.11l4.04-2.59l-1.1-2.22l0.18-3.14l3.49,0.18l1.6-3.76l-0.21,3.34l2.71,2.15L439.51,166.55L439.51,166.55z","name":"Ireland"},"se":{"path":"M497.72,104.58l1.96,1.81h3.67l2.02,3.88l0.55,6.65l-4.95,3.51v3.51l-3.49,4.81l-2.02,0.18l-2.75,4.62l0.18,4.44l4.77,3.51l-0.37,2.03l-1.83,2.77l-2.75,2.4l0.18,7.95l-4.22,1.48l-1.47,3.14h-2.02l-1.1-5.54l-4.59-7.04l3.77-6.31l0.26-15.59l2.6-1.43l0.63-8.92l7.41-10.61L497.72,104.58L497.72,104.58M498.49,150.17l-2.11,1.67l1.06,2.45l1.87-1.82L498.49,150.17L498.49,150.17z","name":"Sweden"},"fi":{"path":"M506.79,116.94l2.07,0.91l1.28,2.4l-1.28,1.66l-6.42,7.02l-1.1,3.7l1.47,5.36l4.95,3.7l6.6-3.14l5.32-0.74l4.95-7.95l-3.67-8.69l-3.49-8.32l0.55-5.36l-2.2-0.37l-0.57-3.91l-2.96-4.83l-3.28,2.27l-1.29,5.27l-3.48-2.09l-4.84-1.18l-1.08,1.26l1.86,1.68l3.39-0.06l2.73,4.41L506.79,116.94L506.79,116.94z","name":"Finland"},"lv":{"path":"M518.07,151.37l-6.85-1.11l0.15,3.83l6.35,3.88l2.6-0.76l-0.15-2.92L518.07,151.37L518.07,151.37z","name":"Latvia"},"lt":{"path":"M510.81,154.7l-2.15-0.05l-2.95,2.82h-2.5l0.15,3.53l-1.5,2.77l5.4,0.05l1.55-0.2l1.55,1.87l3.55-0.15l3.4-4.33l-0.2-2.57L510.81,154.7L510.81,154.7z","name":"Lithuania"},"by":{"path":"M510.66,166.29l1.5,2.47l-0.6,1.97l0.1,1.56l0.55,1.87l3.1-1.76l3.85,0.1l2.7,1.11h6.85l2-4.79l1.2-1.81v-1.21l-4.3-6.05l-3.8-1.51l-3.1-0.35l-2.7,0.86l0.1,2.72l-3.75,4.74L510.66,166.29L510.66,166.29z","name":"Belarus"},"pl":{"path":"M511.46,174.76l0.85,1.56l0.2,1.66l-0.7,1.61l-1.6,3.08l-1.35,0.61l-1.75-0.76l-1.05,0.05l-2.55,0.96l-2.9-0.86l-4.7-3.33l-4.6-2.47l-1.85-2.82l-0.35-6.65l3.6-3.13l4.7-1.56l1.75-0.2l-0.7,1.41l0.45,0.55l7.91,0.15l1.7-0.05l2.8,4.29l-0.7,1.76l0.3,2.07L511.46,174.76L511.46,174.76z","name":"Poland"},"it":{"path":"M477.56,213.38l-2.65,1.34l0.35,5.17l2.12,0.36l1.59-1.52v-4.9L477.56,213.38L477.56,213.38M472.27,196.98l-0.62,1.57l0.17,1.71l2.39,2.79l3.76-0.13l8.3,9.64l5.18,1.5l3.06,2.89l0.73,6.59l1.64-0.96l1.42-3.59l-0.35-2.58l2.43-0.22l0.35-1.46l-6.85-3.28l-6.5-6.39l-2.59-3.82l-0.63-3.63l3.31-0.79l-0.85-2.39l-2.03-1.71l-1.75-0.08l-2.44,0.67l-2.3,3.22l-1.39,0.92l-2.15-1.32L472.27,196.98L472.27,196.98M492.44,223.02l-1.45-0.78l-4.95,0.78l0.17,1.34l4.45,2.24l0.67,0.73l1.17,0.17L492.44,223.02L492.44,223.02z","name":"Italy"},"fr":{"path":"M477.83,206.96l-1.95,1.96l-0.18,1.78l1.59,0.98l0.62-0.09l0.35-2.59L477.83,206.96L477.83,206.96M460.4,178.7l-2.21,0.54l-4.42,4.81l-1.33,0.09l-1.77-1.25l-1.15,0.27l-0.88,2.76l-6.46,0.18l0.18,1.43l4.42,2.94l5.13,4.1l-0.09,4.9l-2.74,4.81l5.93,2.85l6.02,0.18l1.86-2.14l3.8,0.09l1.06,0.98l3.8-0.27l1.95-2.5l-2.48-2.94l-0.18-1.87l0.53-2.05l-1.24-1.78l-2.12,0.62l-0.27-1.6l4.69-5.17v-3.12l-3.1-1.78l-1.59-0.27L460.4,178.7L460.4,178.7z","name":"France"},"nl":{"path":"M470.09,168.27l-4.53,2.23l0.96,0.87l0.1,2.23l-0.96-0.19l-1.06-1.65l-2.53,4.01l3.89,0.81l1.45,1.53l0.77,0.02l0.51-3.46l2.45-1.03L470.09,168.27L470.09,168.27z","name":"Netherlands"},"be":{"path":"M461.61,176.52l-0.64,1.6l6.88,4.54l1.98,0.47l0.07-2.15l-1.73-1.94h-1.06l-1.45-1.65L461.61,176.52L461.61,176.52z","name":"Belgium"},"de":{"path":"M471.14,167.88l3.57-0.58v-2.52l2.99-0.49l1.64,1.65l1.73,0.19l2.7-1.17l2.41,0.68l2.12,1.84l0.29,6.89l2.12,2.82l-2.79,0.39l-4.63,2.91l0.39,0.97l4.14,3.88l-0.29,1.94l-3.85,1.94l-3.57,0.1l-0.87,1.84h-1.83l-0.87-1.94l-3.18-0.78l-0.1-3.2l-2.7-1.84l0.29-2.33l-1.83-2.52l0.48-3.3l2.5-1.17L471.14,167.88L471.14,167.88z","name":"Germany"},"dk":{"path":"M476.77,151.5l-4.15,4.59l-0.15,2.99l1.89,4.93l2.96-0.56l-0.37-4.03l2.04-2.28l-0.04-1.79l-1.44-3.73L476.77,151.5L476.77,151.5M481.44,159.64l-0.93-0.04l-1.22,1.12l0.15,1.75l2.89,0.08l0.15-1.98L481.44,159.64L481.44,159.64z","name":"Denmark"},"ch":{"path":"M472.91,189.38l-4.36,4.64l0.09,0.47l1.79-0.56l1.61,2.24l2.72-0.96l1.88,1.46l0.77-0.44l2.32-3.64l-0.59-0.56l-2.29-0.06l-1.11-2.27L472.91,189.38L472.91,189.38z","name":"Switzerland"},"cz":{"path":"M488.43,184.87h2.97h1.46l2.37,1.69l4.39-3.65l-4.26-3.04l-4.22-2.04l-2.89,0.52l-3.92,2.52L488.43,184.87L488.43,184.87z","name":"Czech Republic"},"sk":{"path":"M495.84,187.13l0.69,0.61l0.09,1.04l7.63-0.17l5.64-2.43l-0.09-2.47l-1.08,0.48l-1.55-0.83l-0.95-0.04l-2.5,1l-3.4-0.82L495.84,187.13L495.84,187.13z","name":"Slovakia"},"at":{"path":"M480.63,190.12l-0.65,1.35l0.56,0.96l2.33-0.48h1.98l2.15,1.82l4.57-0.83l3.36-2l0.86-1.35l-0.13-1.74l-3.02-2.26l-4.05,0.04l-0.34,2.3l-4.26,2.08L480.63,190.12L480.63,190.12z","name":"Austria"},"hu":{"path":"M496.74,189.6l-1.16,1.82l0.09,2.78l1.85,0.95l5.69,0.17l7.93-6.68l0.04-1.48l-0.86-0.43l-5.73,2.6L496.74,189.6L496.74,189.6z","name":"Hungary"},"si":{"path":"M494.8,191.99l-2.54,1.52l-4.74,1.04l0.95,2.74l3.32,0.04l3.06-2.56L494.8,191.99L494.8,191.99z","name":"Slovenia"},"hr":{"path":"M495.62,195.16l-3.53,2.91h-3.58l-0.43,2.52l1.64,0.43l0.82-1.22l1.29,1.13l1.03,3.6l7.07,3.3l0.7-0.8l-7.17-7.4l0.73-1.35l6.81-0.26l0.69-2.17l-4.44,0.13L495.62,195.16L495.62,195.16z","name":"Croatia"},"ba":{"path":"M494.8,198.94l-0.37,0.61l6.71,6.92l2.46-3.62l-0.09-1.43l-2.15-2.61L494.8,198.94L494.8,198.94z","name":"Bosnia and Herzegovina"},"mt":{"path":"M492.61,230.47l-1.67,0.34l0.06,1.85l1.5,0.5l0.67-0.56L492.61,230.47L492.61,230.47z","name":"Malta"},"ua":{"path":"M515.57,173.15l-2.9,1.63l0.72,3.08l-2.68,5.65l0.02,2.49l1.26,0.8l8.08,0.4l2.26-1.87l2.42,0.81l3.47,4.63l-2.54,4.56l3.02,0.88l3.95-4.55l2.26,0.41l2.1,1.46l-1.85,2.44l2.5,3.9h2.66l1.37-2.6l2.82-0.57l0.08-2.11l-5.24-0.81l0.16-2.27h5.08l5.48-4.39l2.42-2.11l0.4-6.66l-10.8-0.97l-4.43-6.25l-3.06-1.05l-3.71,0.16l-1.67,4.13l-7.6,0.1l-2.47-1.14L515.57,173.15L515.57,173.15z","name":"Ukraine"},"md":{"path":"M520.75,187.71l3.1,4.77l-0.26,2.7l1.11,0.05l2.63-4.45l-3.16-3.92l-1.79-0.74L520.75,187.71L520.75,187.71z","name":"Moldova"},"ro":{"path":"M512.18,187.6l-0.26,1.48l-5.79,4.82l4.84,7.1l3.1,2.17h5.58l1.84-1.54l2.47-0.32l1.84,1.11l3.26-3.71l-0.63-1.86l-3.31-0.85l-2.26-0.11l0.11-3.18l-3-4.72L512.18,187.6L512.18,187.6z","name":"Romania"},"rs":{"path":"M505.55,194.54l-2.05,1.54h-1l-0.68,2.12l2.42,2.81l0.16,2.23l-3,4.24l0.42,1.27l1.74,0.32l1.37-1.86l0.74-0.05l1.26,1.22l3.84-1.17l-0.32-5.46L505.55,194.54L505.55,194.54z","name":"Serbia"},"bg":{"path":"M511.44,202.39l0.16,4.98l1.68,3.5l6.31,0.11l2.84-2.01l2.79-1.11l-0.68-3.18l0.63-1.7l-1.42-0.74l-1.95,0.16l-1.53,1.54l-6.42,0.05L511.44,202.39L511.44,202.39z","name":"Bulgaria"},"al":{"path":"M504.02,209.76v4.61l1.32,2.49l0.95-0.11l1.63-2.97l-0.95-1.33l-0.37-3.29l-1.26-1.17L504.02,209.76L504.02,209.76z","name":"Albania"},"mk":{"path":"M510.92,208.01l-3.37,1.11l0.16,2.86l0.79,1.01l4-1.86L510.92,208.01L510.92,208.01z","name":"Macedonia"},"gr":{"path":"M506.71,217.6l-0.11,1.33l4.63,2.33l2.21,0.85l-1.16,1.22l-2.58,0.26l-0.37,1.17l0.89,2.01l2.89,1.54l1.26,0.11l0.16-3.45l1.89-2.28l-5.16-6.1l0.68-2.07l1.21-0.05l1.84,1.48l1.16-0.58l0.37-2.07l5.42,0.05l0.21-3.18l-2.26,1.59l-6.63-0.16l-4.31,2.23L506.71,217.6L506.71,217.6M516.76,230.59l1.63,0.05l0.68,1.01h2.37l1.58-0.58l0.53,0.64l-1.05,1.38l-4.63,0.16l-0.84-1.11l-0.89-0.53L516.76,230.59L516.76,230.59z","name":"Greece"}}});
'use strict';

$(document).ready(function () {

    // Realtime visitors widget map
    if($('.map-visitors')[0]) {
        $('.map-visitors').vectorMap({
            map: 'world_en',
            backgroundColor: 'rgba(0,0,0,0)',
            color: 'rgba(255,255,255,0.2)',
            borderColor: 'rgba(255,255,255,0.2)',
            hoverOpacity: 1,
            selectedColor: 'rgba(255,255,255,0.9)',
            enableZoom: false,
            showTooltip: true,
            normalizeFunction: 'polynomial',
            selectedRegions: ['US', 'EN', 'NZ', 'CN', 'JP', 'SL', 'BR', 'AU', 'EG', 'BA'],
            onRegionClick: function (event) {
                event.preventDefault();
            }
        });
    }
});
/*!
 * Salvattore 1.0.9 by @rnmp and @ppold
 * https://github.com/rnmp/salvattore
 */

!function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?module.exports=t():e.salvattore=t()}(this,function(){/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */
window.matchMedia||(window.matchMedia=function(){"use strict";var e=window.styleMedia||window.media;if(!e){var t=document.createElement("style"),n=document.getElementsByTagName("script")[0],r=null;t.type="text/css",t.id="matchmediajs-test",n.parentNode.insertBefore(t,n),r="getComputedStyle"in window&&window.getComputedStyle(t,null)||t.currentStyle,e={matchMedium:function(e){var n="@media "+e+"{ #matchmediajs-test { width: 1px; } }";return t.styleSheet?t.styleSheet.cssText=n:t.textContent=n,"1px"===r.width}}}return function(t){return{matches:e.matchMedium(t||"all"),media:t||"all"}}}()),/*! matchMedia() polyfill addListener/removeListener extension. Author & copyright (c) 2012: Scott Jehl. Dual MIT/BSD license */
function(){"use strict";if(window.matchMedia&&window.matchMedia("all").addListener)return!1;var e=window.matchMedia,t=e("only all").matches,n=!1,r=0,a=[],i=function(t){clearTimeout(r),r=setTimeout(function(){for(var t=0,n=a.length;n>t;t++){var r=a[t].mql,i=a[t].listeners||[],o=e(r.media).matches;if(o!==r.matches){r.matches=o;for(var c=0,l=i.length;l>c;c++)i[c].call(window,r)}}},30)};window.matchMedia=function(r){var o=e(r),c=[],l=0;return o.addListener=function(e){t&&(n||(n=!0,window.addEventListener("resize",i,!0)),0===l&&(l=a.push({mql:o,listeners:c})),c.push(e))},o.removeListener=function(e){for(var t=0,n=c.length;n>t;t++)c[t]===e&&c.splice(t,1)},o}}(),function(){"use strict";for(var e=0,t=["ms","moz","webkit","o"],n=0;n<t.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[t[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[t[n]+"CancelAnimationFrame"]||window[t[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t,n){var r=(new Date).getTime(),a=Math.max(0,16-(r-e)),i=window.setTimeout(function(){t(r+a)},a);return e=r+a,i}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})}(),"function"!=typeof window.CustomEvent&&!function(){"use strict";function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}e.prototype=window.Event.prototype,window.CustomEvent=e}();var e=function(e,t,n){"use strict";var r={},a=[],i=[],o=[],c=function(e,t,n){e.dataset?e.dataset[t]=n:e.setAttribute("data-"+t,n)};return r.obtainGridSettings=function(t){var n=e.getComputedStyle(t,":before"),r=n.getPropertyValue("content").slice(1,-1),a=r.match(/^\s*(\d+)(?:\s?\.(.+))?\s*$/),i=1,o=[];return a?(i=a[1],o=a[2],o=o?o.split("."):["column"]):(a=r.match(/^\s*\.(.+)\s+(\d+)\s*$/),a&&(o=a[1],i=a[2],i&&(i=i.split(".")))),{numberOfColumns:i,columnClasses:o}},r.addColumns=function(e,n){for(var a,i=r.obtainGridSettings(e),o=i.numberOfColumns,l=i.columnClasses,s=new Array(+o),u=t.createDocumentFragment(),d=o;0!==d--;)a="[data-columns] > *:nth-child("+o+"n-"+d+")",s.push(n.querySelectorAll(a));s.forEach(function(e){var n=t.createElement("div"),r=t.createDocumentFragment();n.className=l.join(" "),Array.prototype.forEach.call(e,function(e){r.appendChild(e)}),n.appendChild(r),u.appendChild(n)}),e.appendChild(u),c(e,"columns",o)},r.removeColumns=function(n){var r=t.createRange();r.selectNodeContents(n);var a=Array.prototype.filter.call(r.extractContents().childNodes,function(t){return t instanceof e.HTMLElement}),i=a.length,o=a[0].childNodes.length,l=new Array(o*i);Array.prototype.forEach.call(a,function(e,t){Array.prototype.forEach.call(e.children,function(e,n){l[n*i+t]=e})});var s=t.createElement("div");return c(s,"columns",0),l.filter(function(e){return!!e}).forEach(function(e){s.appendChild(e)}),s},r.recreateColumns=function(t){e.requestAnimationFrame(function(){r.addColumns(t,r.removeColumns(t));var e=new CustomEvent("columnsChange");t.dispatchEvent(e)})},r.mediaQueryChange=function(e){e.matches&&Array.prototype.forEach.call(a,r.recreateColumns)},r.getCSSRules=function(e){var t;try{t=e.sheet.cssRules||e.sheet.rules}catch(n){return[]}return t||[]},r.getStylesheets=function(){var e=Array.prototype.slice.call(t.querySelectorAll("style"));return e.forEach(function(t,n){"text/css"!==t.type&&""!==t.type&&e.splice(n,1)}),Array.prototype.concat.call(e,Array.prototype.slice.call(t.querySelectorAll("link[rel='stylesheet']")))},r.mediaRuleHasColumnsSelector=function(e){var t,n;try{t=e.length}catch(r){t=0}for(;t--;)if(n=e[t],n.selectorText&&n.selectorText.match(/\[data-columns\](.*)::?before$/))return!0;return!1},r.scanMediaQueries=function(){var t=[];if(e.matchMedia){r.getStylesheets().forEach(function(e){Array.prototype.forEach.call(r.getCSSRules(e),function(e){try{e.media&&e.cssRules&&r.mediaRuleHasColumnsSelector(e.cssRules)&&t.push(e)}catch(n){}})});var n=i.filter(function(e){return-1===t.indexOf(e)});o.filter(function(e){return-1!==n.indexOf(e.rule)}).forEach(function(e){e.mql.removeListener(r.mediaQueryChange)}),o=o.filter(function(e){return-1===n.indexOf(e.rule)}),t.filter(function(e){return-1==i.indexOf(e)}).forEach(function(t){var n=e.matchMedia(t.media.mediaText);n.addListener(r.mediaQueryChange),o.push({rule:t,mql:n})}),i.length=0,i=t}},r.rescanMediaQueries=function(){r.scanMediaQueries(),Array.prototype.forEach.call(a,r.recreateColumns)},r.nextElementColumnIndex=function(e,t){var n,r,a,i=e.children,o=i.length,c=0,l=0;for(a=0;o>a;a++)n=i[a],r=n.children.length+(t[a].children||t[a].childNodes).length,0===c&&(c=r),c>r&&(l=a,c=r);return l},r.createFragmentsList=function(e){for(var n=new Array(e),r=0;r!==e;)n[r]=t.createDocumentFragment(),r++;return n},r.appendElements=function(e,t){var n=e.children,a=n.length,i=r.createFragmentsList(a);Array.prototype.forEach.call(t,function(t){var n=r.nextElementColumnIndex(e,i);i[n].appendChild(t)}),Array.prototype.forEach.call(n,function(e,t){e.appendChild(i[t])})},r.prependElements=function(e,n){var a=e.children,i=a.length,o=r.createFragmentsList(i),c=i-1;n.forEach(function(e){var t=o[c];t.insertBefore(e,t.firstChild),0===c?c=i-1:c--}),Array.prototype.forEach.call(a,function(e,t){e.insertBefore(o[t],e.firstChild)});for(var l=t.createDocumentFragment(),s=n.length%i;0!==s--;)l.appendChild(e.lastChild);e.insertBefore(l,e.firstChild)},r.registerGrid=function(n){if("none"!==e.getComputedStyle(n).display){var i=t.createRange();i.selectNodeContents(n);var o=t.createElement("div");o.appendChild(i.extractContents()),c(o,"columns",0),r.addColumns(n,o),a.push(n)}},r.init=function(){var e=t.createElement("style");e.innerHTML="[data-columns]::before{display:block;visibility:hidden;position:absolute;font-size:1px;}",t.head.appendChild(e);var n=t.querySelectorAll("[data-columns]");Array.prototype.forEach.call(n,r.registerGrid),r.scanMediaQueries()},r.init(),{appendElements:r.appendElements,prependElements:r.prependElements,registerGrid:r.registerGrid,recreateColumns:r.recreateColumns,rescanMediaQueries:r.rescanMediaQueries,init:r.init,append_elements:r.appendElements,prepend_elements:r.prependElements,register_grid:r.registerGrid,recreate_columns:r.recreateColumns,rescan_media_queries:r.rescanMediaQueries}}(window,window.document);return e});
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//




;
