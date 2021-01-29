(function() { 
	'use strict';
    function CanvasObjectContainer(divID, width, height, rootCanvasObjectContainer, floorColorString) {
		tabageos.EventDispatcher.call(this);
        if (divID || width || height || rootCanvasObjectContainer) {
            this.init(divID, width, height, rootCanvasObjectContainer, floorColorString);
        }
    }
    ;
	CanvasObjectContainer.prototype.constructor = CanvasObjectContainer;
	CanvasObjectContainer.prototype = Object.create(tabageos.EventDispatcher.prototype);
    CanvasObjectContainer.prototype.init = function(divID, width, height, rootCanvasObjectContainer, floorColorString) {
        this._w = width || 300;
        this._h = height || 400;
        if (divID) {
            this.div = document.getElementById(divID);
			this.floor = null;
        } else {
            this.div = document.createElement("div");
            this.div.setAttribute("style", "position:absolute");
            this.div.setAttribute("width", this._w);
            this.div.setAttribute("height", this._h);
            if (rootCanvasObjectContainer) {
                rootCanvasObjectContainer.addChild(this);
			}
			
			if (floorColorString) {
				this.floor = new tabageos.CanvasObject(null,this._w,this._h);
				this.floor.context.fillStyle = floorColorString;
				this.floor.context.fillRect(0, 0, this._w, this._h);
				this.div.appendChild(this.floor.canvas);
				this._floorContext = this.floor.context;
				this.floor.canvas.setAttribute("style", "position:absolute;top:0px;z-index:-1");
			}
			
        }
        this._children = [];
        
    };
    CanvasObjectContainer.prototype._w = null;
    CanvasObjectContainer.prototype._h = null;
    CanvasObjectContainer.prototype.div = null;
    CanvasObjectContainer.prototype.floor = null;
    CanvasObjectContainer.prototype._floorContext = null;
    CanvasObjectContainer.prototype._children = [];
    CanvasObjectContainer.prototype.getWidth = function() {
        return this._w;
    }
    ;
    CanvasObjectContainer.prototype.getHeight = function() {
        return this._h;
    }
    ;
    CanvasObjectContainer.prototype.getNumChildren = function() {
        return this._children.length;
    }
    ;
    CanvasObjectContainer.prototype.addChild = function(child, x, y) {
        if (this._children.indexOf(child) == -1) {
            this._children.unshift(child);
            this.div.appendChild(child.canvas || child.div);
            this._setUpChild(child, this._children.length - 1, x || 0, y || 0);
        }
        return child;
    }
    ;
    CanvasObjectContainer.prototype.addChildAt = function(child, index, x, y) {
        if (this._children.indexOf(child) == -1) {
            this._children.splice(index, 0, child);
            this.div.appendChild(child.canvas || child.div);
            this._setUpChild(child, index + 1, x || 0, y || 0);
        }
        return child;
    }
    ;
    CanvasObjectContainer.prototype.getChildIndex = function(child) {
        return this._children.indexOf(child);
    }
    ;
    CanvasObjectContainer.prototype.setChildIndex = function(child, index, x, y) {
        if (this.contains(child)) {
            this.removeChild(child);
        }
        this.addChildAt(child, index, x, y);
    }
    ;
    CanvasObjectContainer.prototype.removeChild = function(child) {
        if (this._children.indexOf(child) != -1) {
            this.div.removeChild(child.canvas || child.div);
            this._children.splice(this._children.indexOf(child), 1);
        }
        return child;
    }
    ;
    CanvasObjectContainer.prototype.getChildAt = function(index) {
        return this._children[index] || null;
    }
    ;
    CanvasObjectContainer.prototype.contains = function(child) {
        return this._children.indexOf(child) != -1;
    }
    ;
    CanvasObjectContainer.prototype._setUpChild = function(child, indx, x, y) {
        var ele = child.canvas || child.div;
        ele.setAttribute("style", "position:" + (child.canvas ? "absolute" : "relative") + ";z-index:" + indx + ";left:" + x + ";top:" + y + "");
    }
    ;
    tabageos.CanvasObjectContainer = CanvasObjectContainer;
})();


