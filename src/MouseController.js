(function() { 
	'use strict';
    function MouseController() {
        throw "This is a static class, construction is not needed.";
    }
    ;MouseController.ready = false;
    MouseController._mX = 0;
    MouseController._mY = 0;
    MouseController._oX = 1;
    MouseController._oY = 1;
    MouseController._mmp = new tabageos.MoverPoint();
    MouseController._ed = new tabageos.EventDispatcher();
    MouseController._muE = new tabageos.MouseEvent(tabageos.MouseEvent.MOUSE_UP);
    MouseController._mdE = new tabageos.MouseEvent(tabageos.MouseEvent.MOUSE_DOWN);
    MouseController._mmE = new tabageos.MouseEvent(tabageos.MouseEvent.MOUSE_MOVE);
    MouseController.mouseX = function() {
        if (tabageos.MouseController.ready == false || document.onmousemove != tabageos.MouseController.updateMousePosition) {
            document.onmousemove = tabageos.MouseController.updateMousePosition;
            tabageos.MouseController.ready = true;
            tabageos.MouseController._mmp = new tabageos.MoverPoint();
        }
        return tabageos.MouseController._mX;
    }
    ;
    MouseController.mouseY = function() {
        if (tabageos.MouseController.ready == false || document.onmousemove != tabageos.MouseController.updateMousePosition) {
            document.onmousemove = tabageos.MouseController.updateMousePosition;
            tabageos.MouseController.ready = true;
            tabageos.MouseController._mmp = new tabageos.MoverPoint();
        }
        return tabageos.MouseController._mY;
    }
    ;
    MouseController.mouseMoverPoint = function() {
        if (tabageos.MouseController.ready == false || document.onmousemove != tabageos.MouseController.updateMousePosition) {
            document.onmousemove = tabageos.MouseController.updateMousePosition;
            tabageos.MouseController.ready = true;
            tabageos.MouseController._mmp = new tabageos.MoverPoint();
        }
        return tabageos.MouseController._mmp;
    }
    ;
    MouseController.updateMousePosition = function(e) {
        e = tabageos.MouseController._defineMouseEvent(e);
        tabageos.MouseController._origPX = e.pageX;
        tabageos.MouseController._origPY = e.pageY;
        tabageos.MouseController._mX = e.pageX * MouseController._oX;
        tabageos.MouseController._mY = e.pageY * MouseController._oY;
        tabageos.MouseController._mmp.y = e.pageY * MouseController._oY;
        tabageos.MouseController._mmp.x = e.pageX * MouseController._oX;
        tabageos.MouseController._mmE.x = e.pageX * MouseController._oX;
        tabageos.MouseController._mmE.y = e.pageY * MouseController._oY;
        tabageos.MouseController.dispatchEvent(tabageos.MouseController._mmE);
    }
    ;
    MouseController.mouseUpHandler = function(e) {
        e = tabageos.MouseController._defineMouseEvent(e);
        tabageos.MouseController._muE.x = e.pageX * MouseController._oX;
        tabageos.MouseController._muE.y = e.pageY * MouseController._oY;
        tabageos.MouseController.dispatchEvent(tabageos.MouseController._muE);
    }
    ;
    MouseController.mouseDownHandler = function(e) {
        e = tabageos.MouseController._defineMouseEvent(e);
        tabageos.MouseController._mdE.x = e.pageX * MouseController._oX;
        tabageos.MouseController._mdE.y = e.pageY * MouseController._oY;
        tabageos.MouseController.dispatchEvent(tabageos.MouseController._mdE);
    }
    ;
    MouseController.addEventListener = function(type, listenerString, listenerObject) {
        tabageos.MouseController._ed.addEventListener(type, listenerString, listenerObject);
        if (type == "mouseUp" || type == "MouseUp" || type == "up" || type == "onmouseup" || type == "UP" || type == "Up") {
            document.onmouseup = tabageos.MouseController.mouseUpHandler;
        }
        if (type == "mouseDown" || type == "MouseDown" || type == "down" || type == "onmousedown" || type == "DOWN" || type == "Down") {
            document.onmousedown = tabageos.MouseController.mouseDownHandler;
        }
        if (type == "mouseMove" || type == "MouseMove" || type == "move" || type == "onmousemove" || type == "MOVE" || type == "Move") {
            document.onmousemove = tabageos.MouseController.updateMousePosition;
        }
    }
    ;
    MouseController.removeEventListener = function(type, listenerString, listenerObject) {
        return tabageos.MouseController._ed.removeEventListener(type, listenerString, listenerObject);
    }
    ;
    MouseController.dispatchEvent = function(event) {
        tabageos.MouseController._ed.dispatchEvent(event);
    }
    ;
    MouseController.defineMousePositionOffset = function(origWidth, origHeight, scaledWidth, scaledHeight) {
        MouseController._oX = origWidth / scaledWidth;
        MouseController._oY = origHeight / scaledHeight;
    }
    ;
    MouseController._defineMouseEvent = function(e) {
        if (typeof e == 'undefined')
            e = window.event;
        return e;
    }
    ;
    tabageos.MouseController = MouseController;
})();




