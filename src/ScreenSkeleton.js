(function() { 
	'use strict';
	function ScreenSkeleton(screenOrg, divID, width, height, rootCanvasObjectContainer, floorColorString) {
		tabageos.EventDispatcher.call(this);
		tabageos.CanvasObjectContainer.call(this, divID, width, height, rootCanvasObjectContainer, floorColorString);
		this._screenOrg = screenOrg || null;
		this.init(divID, width, height, rootCanvasObjectContainer, floorColorString);
	};
	ScreenSkeleton.prototype.constructor = ScreenSkeleton;
	ScreenSkeleton.prototype = Object.create(tabageos.EventDispatcher.prototype);
	Object.assign(ScreenSkeleton.prototype, tabageos.CanvasObjectContainer.prototype);
	ScreenSkeleton.prototype._buttons = {};
	ScreenSkeleton.prototype._screenOrg = null;
	ScreenSkeleton.prototype._index = null;
	ScreenSkeleton.prototype._currentArea = "";
	ScreenSkeleton.prototype.establishClickArea = function(name, clickObject, clickHandlerString, left, right, top, bottom, overHandler, outHandler) {
		this._buttons[name] = [clickObject, clickHandlerString, left, right, top, bottom, overHandler, outHandler];
		tabageos.MouseController.removeEventListener("mouseUp", "handleClicks", this);
		tabageos.MouseController.removeEventListener("mouseMove", "mousePositionHandler", this);
		tabageos.MouseController.addEventListener("mouseUp", "handleClicks", this);
		tabageos.MouseController.addEventListener("mouseMove", "mousePositionHandler", this);
		this._index = this._screenOrg._screens.indexOf(this);
	};
	ScreenSkeleton.prototype.disableClickAreas = function() {
		tabageos.MouseController.removeEventListener("mouseUp", "handleClicks", this);
		tabageos.MouseController.removeEventListener("mouseMove", "mousePositionHandler", this);
	};
	ScreenSkeleton.prototype.enableClickAreas = function() {
		tabageos.MouseController.removeEventListener("mouseUp", "handleClicks", this);
		tabageos.MouseController.removeEventListener("mouseMove", "mousePositionHandler", this);
		tabageos.MouseController.addEventListener("mouseUp", "handleClicks", this);
		tabageos.MouseController.addEventListener("mouseMove", "mousePositionHandler", this);
	};
	ScreenSkeleton.prototype.remove = function(e) {
		this._screenOrg.removeEventListener(tabageos.ScreenChangeEvent.COVER, "remove", this);
		if (!e || e.screenChangeNumber != this._index) {
			this._screenOrg.theGame.removeChild(this);
		}
		tabageos.MouseController.removeEventListener("mouseUp", "handleClicks", this);
		tabageos.MouseController.removeEventListener("mouseMove", "mousePositionHandler", this);
	};
	ScreenSkeleton.prototype.handleClicks = function(e) {
		var a;
		var s;
		var cs = this._screenOrg.currentScreen;
		for (s in this._buttons) {
			a = this._buttons[s];
			if (e.x > a[2] && e.x < a[3] && e.y > a[4] && e.y < a[5] && cs == this._index) {
				if (a[0] != null && a[0][a[1]])
				a[0][a[1]]();
			}
		}
	};
	ScreenSkeleton.prototype.mousePositionHandler = function(e) {
		var show;
		var a;
		var s;
		for (s in this._buttons) {
			a = this._buttons[s];
			if (e.x > a[2] && e.x < a[3] && e.y > a[4] && e.y < a[5]) {
				show = true;
				this._currentArea = s;
				if (a[6] != null)
				a[6]();
			} else {
				if (a[7] != null && this._currentArea == s) {
					a[7]();
					this._currentArea = "";
				}
				if (this._currentArea == s) {
					this._currentArea = "";
				}
			}
		}
		if (show) {
			this.floor.canvas.setAttribute("style", "position:absolute;z-index:-1;cursor:pointer");
		} else {
			this.floor.canvas.setAttribute("style", "position:absolute;z-index:-1;cursor:auto");
		}
	};
	tabageos.ScreenSkeleton = ScreenSkeleton;
})();

