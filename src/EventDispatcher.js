(function() { 
	'use strict';
    function EventDispatcher() {
        this._listeners = {};
    };
	EventDispatcher.prototype.constructor = EventDispatcher;
	EventDispatcher.prototype._listeners = {};
    EventDispatcher.prototype.addEventListener = function(type, listenerMethod, listenerObject) {
        if (this._listeners[type]) {
            this._listeners[type].push({
                m: listenerMethod,
                o: listenerObject
            });
        } else {
            this._listeners[type] = [{
                m: listenerMethod,
                o: listenerObject
            }];
        }
    };
    EventDispatcher.prototype.removeEventListener = function(type, listenerMethod, listenerObject) {
        var i;
        var a;
        var result;
        if (this._listeners[type]) {
            i = 0;
            a = this._listeners[type];
            result = false;
            
            for (i = 0; i < a.length; i++) {
                if (a[i].m == listenerMethod && a[i].o == listenerObject) {
                    a.splice(i, 1);
                    result = true;
                }
            }
        }
        return result;
    };
    EventDispatcher.prototype.dispatchEvent = function(event, applyTarget) {
        var a;
        var l;
        var caller;
        if (this._listeners[event.type]) {
            if(applyTarget) event.target = this;
            a = this._listeners[event.type];
            l = a.length;
            while (l--) {
                caller = a[l];
                if (caller.o && caller.o[caller.m]) {
					if(applyTarget && applyTarget == 2) event.target = caller.o;
					
                   try { caller.o[caller.m](event); } catch(e) { }
                } 
            }
        }
    };

    tabageos.EventDispatcher = EventDispatcher;
})();

