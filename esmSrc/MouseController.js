import { MoverPoint } from './MoverPoint.js';
import { EventDispatcher } from './EventDispatcher.js';
import { MouseEvent } from './MouseEvent.js';

	'use strict';
    function MouseController() {
        throw "This is a static class, construction is not needed.";
    }
    ;MouseController.ready = false;
    MouseController._mX = 0;
    MouseController._mY = 0;
    MouseController._oX = 1;
    MouseController._oY = 1;
    MouseController._mmp = new MoverPoint();
    MouseController._ed = new EventDispatcher();
    MouseController._muE = new MouseEvent(MouseEvent.MOUSE_UP);
    MouseController._mdE = new MouseEvent(MouseEvent.MOUSE_DOWN);
    MouseController._mmE = new MouseEvent(MouseEvent.MOUSE_MOVE);
    MouseController.mouseX = function() {
        if (MouseController.ready == false || document.onmousemove != MouseController.updateMousePosition) {
            document.onmousemove = MouseController.updateMousePosition;
            MouseController.ready = true;
            MouseController._mmp = new MoverPoint();
        }
        return MouseController._mX;
    }
    ;
    MouseController.mouseY = function() {
        if (MouseController.ready == false || document.onmousemove != MouseController.updateMousePosition) {
            document.onmousemove = MouseController.updateMousePosition;
            MouseController.ready = true;
            MouseController._mmp = new MoverPoint();
        }
        return MouseController._mY;
    }
    ;
    MouseController.mouseMoverPoint = function() {
        if (MouseController.ready == false || document.onmousemove != MouseController.updateMousePosition) {
            document.onmousemove = MouseController.updateMousePosition;
			//document.onpointermove = MouseController.updateMousePosition;
            MouseController.ready = true;
            MouseController._mmp = new MoverPoint();
        }
        return MouseController._mmp;
    }
    ;
    MouseController.updateMousePosition = function(e) {
        e = MouseController._defineMouseEvent(e);
        MouseController._origPX = e.pageX;
        MouseController._origPY = e.pageY;
        MouseController._mX = e.pageX * MouseController._oX;
        MouseController._mY = e.pageY * MouseController._oY;
        MouseController._mmp.y = e.pageY * MouseController._oY;
        MouseController._mmp.x = e.pageX * MouseController._oX;
        MouseController._mmE.x = e.pageX * MouseController._oX;
        MouseController._mmE.y = e.pageY * MouseController._oY;
        MouseController.dispatchEvent(MouseController._mmE);
    }
    ;
    MouseController.mouseUpHandler = function(e) {
        e = MouseController._defineMouseEvent(e);
        MouseController._muE.x = e.pageX * MouseController._oX;
        MouseController._muE.y = e.pageY * MouseController._oY;
        MouseController.dispatchEvent(MouseController._muE);
    }
    ;
    MouseController.mouseDownHandler = function(e) {
        e = MouseController._defineMouseEvent(e);
        MouseController._mdE.x = e.pageX * MouseController._oX;
        MouseController._mdE.y = e.pageY * MouseController._oY;
        MouseController.dispatchEvent(MouseController._mdE);
    }
    ;
    MouseController.addEventListener = function(type, listenerString, listenerObject) {
        MouseController._ed.addEventListener(type, listenerString, listenerObject);
        if (type == "mouseUp" || type == "MouseUp" || type == "up" || type == "onmouseup" || type == "UP" || type == "Up") {
            document.onmouseup = MouseController.mouseUpHandler;
        }
        if (type == "mouseDown" || type == "MouseDown" || type == "down" || type == "onmousedown" || type == "DOWN" || type == "Down") {
            document.onmousedown = MouseController.mouseDownHandler;
        }
        if (type == "mouseMove" || type == "MouseMove" || type == "move" || type == "onmousemove" || type == "MOVE" || type == "Move") {
            document.onmousemove = MouseController.updateMousePosition;
        }
    }
    ;
    MouseController.removeEventListener = function(type, listenerString, listenerObject) {
        return MouseController._ed.removeEventListener(type, listenerString, listenerObject);
    }
    ;
    MouseController.dispatchEvent = function(event) {
        MouseController._ed.dispatchEvent(event);
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
    export { MouseController   };





