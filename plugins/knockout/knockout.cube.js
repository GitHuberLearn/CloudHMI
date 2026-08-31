(function (factory) {
	if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
		factory(require("knockout"), exports);
	} else if (typeof define === "function" && define["amd"]) {
		define(["knockout", "exports"], factory);
	} else {
		factory(ko, ko.mapping = {});
	}
}(function (ko, exports) {
	var base = {};
	
    var commentNodesHaveTextProperty = document && document.createComment("test").text === "<!--test-->";

    var startCommentRegex = commentNodesHaveTextProperty ? /^<!--\s*ko(?:\s+([\s\S]+))?\s*-->$/ : /^\s*ko(?:\s+([\s\S]+))?\s*$/;
    var endCommentRegex =   commentNodesHaveTextProperty ? /^<!--\s*\/ko\s*-->$/ : /^\s*\/ko\s*$/;
    var htmlTagsWithOptionallyClosingChildren = { 'ul': true, 'ol': true };
    
	function isStartComment(node) {
        return (node.nodeType == 8) && startCommentRegex.test(commentNodesHaveTextProperty ? node.text : node.nodeValue);
    }

	//组件嵌套    
	ko.virtualElements.setDomNodeChildren = function(node, childNodes){
		if (cube.importedComponents.indexOf(node.nodeName.toLocaleLowerCase())!=-1) {
			//判断表单组件是否使用自定义模板
			if (node.nodeName.toLocaleLowerCase() == "dataform" && node.childNodes.length > 0 && !(node.childNodes.length == 1 && node.childNodes[0].nodeType == 3)) {
				childNodes = ko.utils.cloneNodes(node.childNodes);
			} else {
				childNodes = ko.utils.cloneNodes(node.childNodes).concat(childNodes);
			}
        }
		
		if (!isStartComment(node))
            ko.utils.setDomNodeChildren(node, childNodes);
        else {
            ko.virtualElements.emptyNode(node);
            var endCommentNode = node.nextSibling; // Must be the next sibling, as we just emptied the children
            for (var i = 0, j = childNodes.length; i < j; i++)
                endCommentNode.parentNode.insertBefore(childNodes[i], endCommentNode);
        }
	}
	
	//自动注册页面vvm
	var cubeLoader = {
        'getConfig': function(componentName, callback) {
        	var result = cube.loadSubWebPageVVM(componentName);
            callback(result);
        }
    };
    
    //压缩模式加载模板
    var cubeTemplateLoader = {
        'loadTemplate': function(componentName, templateConfig, callback) {
        	if (cube.importedComponents.indexOf(componentName) != -1 && templateConfig['id']) {
          		var element = templateConfig['id'];
          		if (typeof element === 'string') {
          			var elemInstance = cube.template.filter("cubetemplate#" + element).get(0);
	                if (elemInstance) {
	                    callback(ko.utils.cloneNodes(elemInstance.childNodes));
	                } else {
	                    throw new Error('Component \'' + componentName + '\': ' + 'Cannot find element with ID ' + element);
	                }
          		} else {
          			throw new Error('Component \'' + componentName + '\': ' + 'Cannot find element with ID ' + element);
          		}
        	} else {
        		callback(null);
        	}
        }
    }; 
    
    ko.components.loaders.splice(0, 0, cubeTemplateLoader);
    ko.components.loaders.push(cubeLoader);
    
    //调用组件onload方法
    base.applyBindingsToDescendants = ko.applyBindingsToDescendants;
    ko.applyBindingsToDescendants = function(viewModelOrBindingContext, rootNode) {
    	if (!isStartComment(rootNode) && viewModelOrBindingContext['$data'] 
    	   && typeof(viewModelOrBindingContext['$data'].onloading) == "function" 
    	   && !cube.isObservable(viewModelOrBindingContext['$data'].onloading)) {
			viewModelOrBindingContext['$data'].onloading(rootNode, viewModelOrBindingContext.$parent);
	   }
    	
       base.applyBindingsToDescendants(viewModelOrBindingContext, rootNode);
       
       if (!isStartComment(rootNode) && viewModelOrBindingContext['$data'] 
       	   && typeof(viewModelOrBindingContext['$data'].onload) == "function" 
       	   && !cube.isObservable(viewModelOrBindingContext['$data'].onload)) {
   			viewModelOrBindingContext['$data'].onload(rootNode, viewModelOrBindingContext.$parent);
       }
    };
    
    //重写样式绑定
    ko.bindingHandlers['style'] = {
	    'update': function (element, valueAccessor) {
	        var value = ko.utils.unwrapObservable(valueAccessor() || {});
	        ko.utils.objectForEach(value, function(styleName, styleValue) {
	            styleValue = ko.utils.unwrapObservable(styleValue);
	
	            if (styleValue === null || styleValue === undefined || styleValue === false) {
	                // Empty string removes the value, whereas null/undefined have no effect
	                styleValue = "";
	            }
	            
	            if(!(element.style[styleName] == "" && styleValue == "")){
	            	element.style[styleName] = styleValue;
	            }
	           
	        });
	    }
	};
	
	//报错提示扩展
	ko.expressionRewriting.preProcessBindings = function (bindingsStringOrKeyValueArray, bindingOptions) {
        bindingOptions = bindingOptions || {};

        function processKeyValue(key, val) {
            var writableVal;
            function callPreprocessHook(obj) {
                return (obj && obj['preprocess']) ? (val = obj['preprocess'](val, key, processKeyValue)) : true;
            }
            if (!bindingParams) {
                if (!callPreprocessHook(ko['getBindingHandler'](key)))
                    return;

                if (ko.expressionRewriting.twoWayBindings[key] && (writableVal = getWriteableValue(val))) {
                    // For two-way bindings, provide a write method in case the value
                    // isn't a writable observable.
                    propertyAccessorResultStrings.push("'" + key + "':function(_z){" + writableVal + "=_z}");
                }
            }
            // Values are wrapped in a function so that each value can be accessed independently
            if (makeValueAccessors) {
                val = 'function(){try{return ' + val + '}catch(e){ e.message+=" \\nat "+$element.outerHTML;throw e;} }';
            }
            resultStrings.push("'" + key + "':" + val);
        }

        var resultStrings = [],
            propertyAccessorResultStrings = [],
            makeValueAccessors = bindingOptions['valueAccessors'],
            bindingParams = bindingOptions['bindingParams'],
            keyValueArray = typeof bindingsStringOrKeyValueArray === "string" ?
                ko.expressionRewriting.parseObjectLiteral(bindingsStringOrKeyValueArray) : bindingsStringOrKeyValueArray;

        ko.utils.arrayForEach(keyValueArray, function(keyValue) {
            processKeyValue(keyValue.key || keyValue['unknown'], keyValue.value);
        });

        if (propertyAccessorResultStrings.length)
            processKeyValue('_ko_property_writers', "{" + propertyAccessorResultStrings.join(",") + " }");

        return resultStrings.join(",");
    }
    
    var javaScriptReservedWords = ["true", "false", "null", "undefined"];
    var javaScriptAssignmentTarget = /^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i;
    function getWriteableValue(expression) {
        if (ko.utils.arrayIndexOf(javaScriptReservedWords, expression) >= 0)
            return false;
        var match = expression.match(javaScriptAssignmentTarget);
        return match === null ? false : match[1] ? ('Object(' + match[1] + ')' + match[2]) : expression;
    }
    
}));

(function($) {

// jQuery on an empty object, we are going to use this as our Queue
var ajaxQueue = $({});

$.ajaxQueue = function( ajaxOpts ) {
    var jqXHR,
        dfd = $.Deferred(),
        promise = dfd.promise();

    // run the actual query
    function doRequest( next ) {
        jqXHR = $.ajax( ajaxOpts )
            .done( dfd.resolve )
            .fail( dfd.reject )
            .then( next, next );
    }

    // queue our ajax request
    ajaxQueue.queue( doRequest );

    // add the abort method
    promise.abort = function( statusText ) {

        // proxy abort to the jqXHR if it is active
        if ( jqXHR ) {
            return jqXHR.abort( statusText );
        }

        // if there wasn't already a jqXHR we need to remove from queue
        var queue = ajaxQueue.queue(),
            index = $.inArray( doRequest, queue );

        if ( index > -1 ) {
            queue.splice( index, 1 );
        }

        // and then reject the deferred
        dfd.rejectWith( ajaxOpts.context || ajaxOpts, [ promise, statusText, "" ] );
        return promise;
    };

    return promise;
};

})(jQuery);