(function() { 
	'use strict';
	function CanvasObject(canvas, width, height, dontPixelate, scaleToPix, noAlpha, useWebgl) {
		tabageos.EventDispatcher.call(this);
		if (canvas || width >= 0 || height >= 0) {
			this.init(canvas, width, height, 0, dontPixelate, scaleToPix, noAlpha, useWebgl);
		}
	};
	CanvasObject.prototype.constructor = CanvasObject;
	CanvasObject.prototype = Object.create(tabageos.EventDispatcher.prototype);
	CanvasObject.prototype.init = function(canvas, width, height, placePixelData, dontPixelate, scaleToPix, noAlpha, useWebgl) {
		this.width = width || 1;
		this.height = height || 1;
		this.canvas = (canvas == null ? document.createElement("canvas") : canvas);
		this.canvas.setAttribute("width", this.width);
		this.canvas.setAttribute("height", this.height);
		if(useWebgl) {
			
			this._wrenderer = new tabageos.WebGlRenderer(this.canvas);
			this.context = this._wrenderer.getContext();
			
		} else {  
			var cspecs = {alpha: true}; 
			if(noAlpha) { cspecs.alpha = false; }
			this.context = this.canvas.getContext("2d", cspecs);
		}
		if (canvas == null && placePixelData) {
			this._pixelData = this.context.createImageData(this.width, this.height);
		} else if (placePixelData) {
			this._pixelData = this.context.getImageData(0, 0, this.width, this.height);
		}
		if(this._pixelData) this.pixelDataArray = this._pixelData.data;
		this._alpha = 1;
		if(!dontPixelate) {
			this.canvas.setAttribute("style", "image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;image-rendering: pixelated;image-rendering: crisp-edges;");
			if(scaleToPix) {
				var wpix = window.devicePixelRatio || 1;
				this.context.scale(wpix,wpix);
				window.console.log(window.devicePixelRatio + " is the window.devicePixelRatio. CanvasObject has been scaled to it or 1.");
			}
		}
		
	};
	CanvasObject.prototype.width = 0;
	CanvasObject.prototype.height = 0;
	CanvasObject.prototype.canvas = null;
	CanvasObject.prototype.context = null;
	CanvasObject.prototype._wrenderer = null;
	CanvasObject.prototype._pixelData = null;
	CanvasObject.prototype.pixelDataArray = null;
	CanvasObject.prototype._alpha = 1;
	CanvasObject.prototype.setAlpha = function(value) {
		this.context.globalAlpha = value;
		this._alpha = value * 100;
	};
	CanvasObject.prototype.setStrokeStyle = function(colorString) {
		this.context.strokeStyle = colorString;
	};
	CanvasObject.prototype.setFillStyle = function(colorString) {
		this.context.fillStyle = colorString;
	};
	CanvasObject.prototype.copyPixels = function(source, fromRect, toMoverPoint, copyWidth, copyHeight, commit) {
		
		if(this._wrenderer) {
			this._wrenderer.copyPixels(source, fromRect, toMoverPoint, copyWidth,copyHeight);
		} else {
			
			this.context.drawImage(source, fromRect.x, fromRect.y, fromRect.width, fromRect.height, Math.round(toMoverPoint.x), Math.round(toMoverPoint.y), copyWidth || fromRect.width, copyHeight || fromRect.height);
			if (commit) {
				this._pixelData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
				this.pixelDataArray = this._pixelData.data;
			}
		}
	};
	
	
	CanvasObject.prototype.drawImage = function(img, toX, toY, commit) {
		this.context.drawImage(img, toX, toY);
		if (commit) {
			this._pixelData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
			this.pixelDataArray = this._pixelData.data;
		}
	};
	CanvasObject.prototype.drawTriangle = function(trianglePointX, trianglePointY, width, height, color, horizontal, commit) {
		commit = commit || false;
		horizontal = horizontal || false;
		this.context.beginPath();
		this.context.moveTo(trianglePointX, trianglePointY);
		if (horizontal == false) {
			this.context.lineTo(trianglePointX + (width / 2), trianglePointY + height);
			this.context.lineTo(trianglePointX - width, trianglePointY + height);
		} else {
			this.context.lineTo(trianglePointX - height, trianglePointY - (width / 2));
			this.context.lineTo(trianglePointX - height, trianglePointY + width);
		}
		this.context.closePath();
		this.context.stroke();
		if (color) {
			this.context.fillStyle = color;
			this.context.fill();
		}
		if (commit == true) {
			this._pixelData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
			this.pixelDataArray = this._pixelData.data;
		}
	};
	CanvasObject.mathPI = Math.PI;
	CanvasObject.prototype.drawCircle = function(x, y, radius, color, commit) {
		this.context.beginPath();
		this.context.arc(x, y, radius, 0, CanvasObject.mathPI * 2);
		this.context.closePath();
		this.context.stroke();
		if (color) {
			this.context.fillStyle = color;
			this.context.fill();
		}
		if (commit == true) {
			this._pixelData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
			this.pixelDataArray = this._pixelData.data;
		}
	};
	CanvasObject.prototype.writeText = function(text, toX, toY, font, fontSize, color, commit) {
		this.context.font = font && fontSize ? "" + fontSize + "px" + " " + font + "" : "24px Arial";
		if (!fontSize && font) {
			this.context.font = "24px " + font + "";
		}
		if (!font && fontSize) {
			this.context.font = "" + fontSize + "px Arial";
		}
		if (color) {
			this.context.fillStyle = color;
			this.context.fillText(text || "undefined", toX || 0, toY || 0);
		} else {
			this.context.strokeText(text || "undefined", toX || 0, toY || 0);
		}
		if (commit == true) {
			this._pixelData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
			this.pixelDataArray = this._pixelData.data;
		}
	};
	CanvasObject.prototype.clear = function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this._pixelData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
		this.pixelDataArray = this._pixelData.data;
	}
	;
	CanvasObject.prototype.clearRect = function(x,y,width,height) {
		this.context.clearRect(x,y,width,height);      
	};
	CanvasObject.prototype.webglClearRect = function(x,y,width,height) {
		var c = this.context || this;
		c.enable(c.SCISSOR_TEST);
		c.scissor(x,(c.canvas.height - y) - height,width,height);
		c.clearColor(0,0,0,0);
		c.clear(c.COLOR_BUFFER_BIT);
		c.disable(c.SCISSOR_TEST);
		
	};
	CanvasObject.prototype.drawRect = function(rect, colorString, commit) {
		if (colorString) {
			this.context.fillStyle = colorString;
			this.context.fillRect(rect.x, rect.y, rect.width, rect.height);
		} else {
			this.context.strokeRect(rect.x, rect.y, rect.width, rect.height);
		}
		if (commit == true) {
			this._pixelData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
			this.pixelDataArray = this._pixelData.data;
		}
	};
	CanvasObject.prototype.setPixel = function(x, y, color, pixelCommit, endCommit) {
		var p = ((Math.round(y) * this._pixelData.width) + Math.round(x)) * 4;
		var d = this._pixelData.data;
		d[p + 0] = (color & 0xff0000) >> 16;
		d[p + 1] = (color & 0x00ff00) >> 8;
		d[p + 2] = (color & 0x0000ff);
		if (pixelCommit == true) {
			this.context.putImageData(this._pixelData, 0, 0, x, y, 1, 1);
		}
		if (endCommit == true) {
			this.context.putImageData(this._pixelData, 0, 0);
		}
	};
	CanvasObject.prototype.getPixel = function(x, y) {
		var p = ((Math.round(y) * this._pixelData.width) + Math.round(x)) * 4;
		var d = this._pixelData.data;
		return d[p + 0] << 16 | d[p + 1] << 8 | d[p + 2];
	};
	CanvasObject.prototype.update = function() {
		this._pixelData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
		this.pixelDataArray = this._pixelData.data;
		this.context.putImageData(this._pixelData, 0, 0);
	};
	tabageos.CanvasObject = CanvasObject;
})();


