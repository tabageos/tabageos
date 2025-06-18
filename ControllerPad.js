this.tabageos = this.tabageos || {};
(function() {
	
	
		/**
		*  
		*  HTML5 ControllerPad with 10 possible buttons. 
		*  Also handles keyboard input for when touches are not available.
		*  (for a game that is using tabageos and the tabageos.MouseController class)
		*  this class uses tabageos.GeometricMath and extends tabageos.EventDispatcher.
		*  Must instantiate and then call establish. The constructors params (besides the Numbers) are tabgeos.MoverPoints or Objects with x and y properties.
		*  Use the controller.keyboardEquivalents Object to define the keyboard key values that correspond to the buttons.
		* 
		*  Users may need to mash their touch screens to be sure and send a new touchstart event, when needing to press two buttons simultaineously 
		*  one needs to be sure and make definite presses, then smooth normal nintendo like play is what you get. 
		*  So your buttons should be big, at least all thumb size.
		*  The MoverPoints you pass during construction should define the middle point of each button.
		*
		*  Includes usb game pad support; see .handleGamePad()
		*  
		*  
		*/
		function ControllerPad(holder, x, y, w, h, leftp, rightp, upp, downp, startp,backp,ap,bp,cp,dp, directionButtonsWidth, directionButtonsHeight, startAndBackWidth, startAndBackHeight, buttonWidth, buttonHeight) {
			tabageos.EventDispatcher.call(this);
			this.x = x; this.y = y;
			this.width = w; this.height =h;
			
			this._customSpecs = {};
			this._customSpecs.leftp = leftp;
			this._customSpecs.rightp = rightp;
			this._customSpecs.upp = upp;
			this._customSpecs.downp = downp;
			this._customSpecs.startp = startp;
			this._customSpecs.backp = backp;
			this._customSpecs.ap = ap;
			this._customSpecs.bp = bp;
			this._customSpecs.cp = cp;
			this._customSpecs.dp = dp;
			this._customSpecs.directionButtonsWidth = directionButtonsWidth;
			this._customSpecs.directionButtonsHeight = directionButtonsHeight;
			this._customSpecs.startAndBackWidth = startAndBackWidth;
			this._customSpecs.startAndBackHeight = startAndBackHeight;
			this._customSpecs.buttonWidth = buttonWidth;
			this._customSpecs.buttonHeight = buttonHeight;
			this.__recurse = -1;
			this._style = -1;
			this.__mouseEnabled = 0;
			this._buttonRectColor = "#6495edbb";
			this.holderDiv = holder;
			this._holderDivParent = holder ? holder.offsetParent : null;
			this.avg =  55;
			this.buttons = {"right":0, "left":0, "up":0, "down":0, "a":0, "b":0, "c":0, "d":0, "start":0, "back":0};
			this.basicArrows = {"right":39, "left":37, "up":38, "down":40, "a":32, "b":66, "c":67, "d":77, "start":16, "back":27};
			this.arrows = {"right":39, "left":37, "up":38, "down":40, "a":37, "b":38, "c":39, "d":40, "start":16, "back":27};
			this.basicWasd = {"right":68, "left":65, "up":87, "down":83, "a":32, "b":66, "c":67, "d":77, "start":16, "back":27};
			this.wasd = {"right":68, "left":65, "up":87, "down":83, "a":37, "b":38, "c":39, "d":40, "start":16, "back":27};
			this.keyboardEquivalents = {"right":68, "left":65, "up":87, "down":83, "a":69, "b":32, "c":81, "d":66, "start":16, "back":27};
			if(ControllerPad.instance) {
				throw "ControllerPad constructed already.";
			}
			this._gpb = {a:-1, b:-1, c:-1, d:-1, s:-1, st:-1};
			ControllerPad.instance = this;
		}
	
		ControllerPad.prototype = Object.create(tabageos.EventDispatcher.prototype);
		ControllerPad.prototype.x = 0;
		ControllerPad.prototype.y = 0;
		ControllerPad.prototype.width = 0;
		ControllerPad.prototype.height = 0;
		ControllerPad.prototype.avg = 52;
		ControllerPad.prototype._customSpecs;
		ControllerPad.prototype.buttonA;
		ControllerPad.prototype.buttonB;
		ControllerPad.prototype.buttonC;
		ControllerPad.prototype.buttonD;
		ControllerPad.prototype.startButton;
		ControllerPad.prototype.backButton;
		ControllerPad.prototype.dLeft;
		ControllerPad.prototype.dRight;
		ControllerPad.prototype.dUp;
		ControllerPad.prototype.dDown;
		ControllerPad.prototype.holderDiv;
		ControllerPad.prototype._holderDivParent;
		ControllerPad.prototype._style = 3;
		ControllerPad.prototype.customStyleTotalWidth = 0;
		ControllerPad.prototype.customStyleTotalHeight = 0;
		ControllerPad.prototype.basicArrows = {"right":39, "left":37, "up":38, "down":40, "a":32, "b":66, "c":67, "d":77, "start":16, "back":27};
		ControllerPad.prototype.arrows = {"right":39, "left":37, "up":38, "down":40, "a":37, "b":38, "c":39, "d":40, "start":16, "back":27};
		ControllerPad.prototype.basicWasd = {"right":68, "left":65, "up":87, "down":83, "a":32, "b":66, "c":67, "d":77, "start":16, "back":27};
		ControllerPad.prototype.wasd = {"right":68, "left":65, "up":87, "down":83, "a":37, "b":38, "c":39, "d":40, "start":16, "back":27};
		ControllerPad.prototype.keyboardEquivalents = {"right":68, "left":65, "up":87, "down":83, "a":69, "b":32, "c":81, "d":66, "start":16, "back":27};
		ControllerPad.instance;
		/* 
		* test as follows: if(controller.buttons.right) { move right code }
		*
		*/
		ControllerPad.prototype.buttons = {"right":0, "left":0, "up":0, "down":0, "a":0, "b":0, "c":0, "d":0, "start":0, "back":0};
		ControllerPad.prototype.canvasObject;
		ControllerPad.prototype.firstGamePadInstance = null;
		ControllerPad.prototype.__mouseEnabled = 0;
		
		ControllerPad.prototype.rotation = 0;
		
		ControllerPad.prototype.deg0;
		ControllerPad.prototype.deg30;
		ControllerPad.prototype.deg60;
		ControllerPad.prototype.deg90;
		ControllerPad.prototype.deg120;
		ControllerPad.prototype.deg150;
		ControllerPad.prototype.deg180;
		ControllerPad.prototype.deg210;
		ControllerPad.prototype.deg240;
		ControllerPad.prototype.deg270;
		ControllerPad.prototype.deg300;
		ControllerPad.prototype.deg330;
		ControllerPad.prototype.deg360;
		
		ControllerPad.prototype.rotationPad;
		
		ControllerPad.prototype.enableMouseControl = function() {
			
			this.__mouseEnabled = 1;
			
		};
		
		
		/* 
		*  If you put anything for addEvents, events will Not be added
		*  just don't pass anything, leave addEvents out, if you intended to use the controller as normal
		*/
		ControllerPad.prototype.establish = function(addEvents, recordPlay) {
			
			var dontad = false;
			if(addEvents || addEvents === false) { dontad = true; }
			
			if(dontad != true) {
				
				window.removeEventListener("keydown", ControllerPad.instance.handleKeys, false);
				window.removeEventListener("keyup",  ControllerPad.instance.releaseKeys, false);
				window.addEventListener("keydown", ControllerPad.instance.handleKeys, false);
				window.addEventListener("keyup",  ControllerPad.instance.releaseKeys, false);
				window.onfocus = ControllerPad.instance.keyEstablish;
				
				this.dLeft = this._scriptDiv();
				this.dRight = this._scriptDiv();
				this.dUp = this._scriptDiv();
				this.dDown = this._scriptDiv();
				this.buttonA = this._scriptDiv();
				this.buttonB = this._scriptDiv();
				this.buttonC = this._scriptDiv();
				this.buttonD = this._scriptDiv();
				this.startButton = this._scriptDiv();
				this.backButton = this._scriptDiv();
				this.rotationPad = this._scriptDiv();
				
				
				if(this._holderDivParent && this._holderDivParent.contains(this.holderDiv)) {
					window.console.log(this.holderDiv.id + "   " + this._holderDivParent);
					try { this._holderDivParent.removeChild(this.holderDiv); } catch (e) {
						window.console.log("caught e during controller.establish:  " + e +"  Most likely the controller is in a whole bunch of other divs and html, using position:absolute or position:relative for the container div style normally will solve this error.");
					}
				}
				
			}
			
			
		};
		
		
		ControllerPad.prototype._scriptDiv = function() {
			
			var dv = document.createElement("div");
			if( !('ontouchstart' in window) && !this.__mouseEnabled) {
				
				dv.removeEventListener("pointerdown", ControllerPad.instance.dispatch, false);
				dv.removeEventListener("pointerup", ControllerPad.instance.dispatch, false);
				dv.removeEventListener("pointermove", ControllerPad.instance.dispatch, false);
				dv.addEventListener("pointerdown", ControllerPad.instance.dispatch, false);
				dv.addEventListener("pointerup", ControllerPad.instance.dispatch, false);
				dv.addEventListener("pointermove", ControllerPad.instance.dispatch, false);
				
			} else {
				dv.removeEventListener("touchstart", ControllerPad.instance.dispatch, false);
				dv.removeEventListener("touchend", ControllerPad.instance.dispatch, false);
				dv.removeEventListener("touchmove", ControllerPad.instance.dispatch, false);
				dv.addEventListener("touchstart", ControllerPad.instance.dispatch, false);
				dv.addEventListener("touchend", ControllerPad.instance.dispatch, false);
				dv.addEventListener("touchmove", ControllerPad.instance.dispatch, false);
			
			}
			
			
			if(this.__mouseEnabled) {
				dv.removeEventListener("mouseup", ControllerPad.instance.dispatch, false);
				dv.removeEventListener("mousedown", ControllerPad.instance.dispatch, false);
			
				dv.addEventListener("mouseup", ControllerPad.instance.dispatch, false);
				dv.addEventListener("mousedown", ControllerPad.instance.dispatch, false);
				
			}
			return dv;
			
		};
		ControllerPad.prototype.removeTouchMove = function(nr) {
			this.dLeft.removeEventListener("touchmove", ControllerPad.instance.dispatch, false);
			this.dRight.removeEventListener("touchmove", ControllerPad.instance.dispatch, false);
			this.dUp.removeEventListener("touchmove", ControllerPad.instance.dispatch, false);
			this.dDown.removeEventListener("touchmove", ControllerPad.instance.dispatch, false);
			this.buttonA.removeEventListener("touchmove", ControllerPad.instance.dispatch, false);
			this.buttonB.removeEventListener("touchmove", ControllerPad.instance.dispatch, false);
			this.buttonC.removeEventListener("touchmove", ControllerPad.instance.dispatch, false);
			this.buttonD.removeEventListener("touchmove", ControllerPad.instance.dispatch, false);
			this.startButton.removeEventListener("touchmove", ControllerPad.instance.dispatch, false);
			this.backButton.removeEventListener("touchmove", ControllerPad.instance.dispatch, false);
			if(!nr) {
				this.rotationPad.removeEventListener("touchmove", ControllerPad.instance.dispatch, false);
			}
			
		};
		ControllerPad.prototype._unscriptDiv = function(dv) {
			
			dv.removeEventListener("touchstart", ControllerPad.instance.dispatch, false);
			dv.removeEventListener("touchend", ControllerPad.instance.dispatch, false);
			dv.removeEventListener("touchmove", ControllerPad.instance.dispatch, false);
			dv.removeEventListener("mouseup", ControllerPad.instance.dispatch, false);
			dv.removeEventListener("mousedown", ControllerPad.instance.dispatch, false);
			dv.removeEventListener("pointerdown", ControllerPad.instance.dispatch, false);
			dv.removeEventListener("pointerup", ControllerPad.instance.dispatch, false);
			dv.removeEventListener("pointermove", ControllerPad.instance.dispatch, false);
			
		};
		
		
		ControllerPad.prototype._ccStore = null;
		ControllerPad.prototype.addCustomImage = function(imgLocation, customStyleName, imgElement) {
			//
			if(imgLocation && !imgElement) {
				ControllerPad._selfStyle(customStyleName, imgLocation);
			} else {
				
				this._ccStore = new tabageos.CanvasObject(null,imgElement.width,imgElement.height);
				this._ccStore.copyPixels(imgElement, new tabageos.Rectangle(0,0,imgElement.width,imgElement.height),new tabageos.MoverPoint(),imgElement.width,imgElement.height);
				ControllerPad._selfStyle(customStyleName, this._ccStore.canvas.toDataURL());
			}
			
		};
		
		/*
		* For use with ControllerPad.css, this setup does not include a specific up down or D buttons.
		* You can still assign any one of the buttons to do anything, just that the specific 'up' 'down' and 'D' buttons are not set up via this method.
		* This image has a big left and right button, and big A B and C buttons with start and back buttons in the middle.
		* 
		* Used with .show(w,h) (no style param passed)
		* These methods automagically assign the button positions, 
		* you need to also call tabageos.MouseController.defineMousePositionOffset during any resizing of the games container,
		* or use the tabageos.Resize method passing in an intance of the controller.
		*/
		ControllerPad.prototype.basicControllerButtonSetup = function() {
			this._configBasic("blue");
			this.holderDiv.appendChild(this.dLeft);
			this.holderDiv.appendChild(this.dRight);
			this.holderDiv.appendChild(this.startButton);
			this.holderDiv.appendChild(this.backButton);
			this.holderDiv.appendChild(this.buttonA);
			this.holderDiv.appendChild(this.buttonB);
			this.holderDiv.appendChild(this.buttonC);
		};
		ControllerPad.prototype._basicControllerButtonTakedown = function() {
			this.holderDiv.removeChild(this.dLeft);
			this.holderDiv.removeChild(this.dRight);
			this.holderDiv.removeChild(this.startButton);
			this.holderDiv.removeChild(this.backButton);
			this.holderDiv.removeChild(this.buttonA);
			this.holderDiv.removeChild(this.buttonB);
			this.holderDiv.removeChild(this.buttonC);
		};
		/*
		* For use with ControllerPad.css and the .show method
		* Use .show(w,h,2) to display the directionalsController image.
		*
		*/
		ControllerPad.prototype.directionalsControllerButtonSetup = function(hAdjust) {
			this._configDirectional("blue");
			this.holderDiv.appendChild(this.dLeft);
			this.holderDiv.appendChild(this.dRight);
			this.holderDiv.appendChild(this.dUp);
			this.holderDiv.appendChild(this.dDown);
			this.holderDiv.appendChild(this.startButton);
			this.holderDiv.appendChild(this.backButton);
			this.holderDiv.appendChild(this.buttonA);
			this.holderDiv.appendChild(this.buttonB);
			this.holderDiv.appendChild(this.buttonC);
			this.holderDiv.appendChild(this.buttonD);
		};
		
		ControllerPad.prototype.rotationalControllerButtonSetup = function(hAdjust) {
			
			this._configRotational("blue");
			
			this.holderDiv.appendChild(this.rotationPad);
			this.holderDiv.appendChild(this.startButton);
			this.holderDiv.appendChild(this.backButton);
			this.holderDiv.appendChild(this.buttonA);
			this.holderDiv.appendChild(this.buttonB);
			this.holderDiv.appendChild(this.dLeft);
			this.holderDiv.appendChild(this.dRight);
			this.holderDiv.appendChild(this.dUp);
			this.holderDiv.appendChild(this.dDown);
		};
		ControllerPad.prototype._rotationalControllerButtonTakedown = function(hAdjust) {
			
			this.holderDiv.removeChild(this.dLeft);
			this.holderDiv.removeChild(this.dRight);
			this.holderDiv.removeChild(this.dUp);
			this.holderDiv.removeChild(this.dDown);
			this.holderDiv.removeChild(this.startButton);
			this.holderDiv.removeChild(this.backButton);
			this.holderDiv.removeChild(this.buttonA);
			this.holderDiv.removeChild(this.buttonB);
			this.holderDiv.removeChild(this.rotationPad);
		};
		
		ControllerPad.prototype._directionalsControllerButtonTakedown = function(hAdjust) {
			
			this.holderDiv.removeChild(this.dLeft);
			this.holderDiv.removeChild(this.dRight);
			this.holderDiv.removeChild(this.dUp);
			this.holderDiv.removeChild(this.dDown);
			this.holderDiv.removeChild(this.startButton);
			this.holderDiv.removeChild(this.backButton);
			this.holderDiv.removeChild(this.buttonA);
			this.holderDiv.removeChild(this.buttonB);
			this.holderDiv.removeChild(this.buttonC);
			this.holderDiv.removeChild(this.buttonD);
		};
		ControllerPad.prototype.standardControllerButtonSetup = function(hAdjust) {
			this._configStandard("blue");
			this.holderDiv.appendChild(this.dLeft);
			this.holderDiv.appendChild(this.dRight);
			this.holderDiv.appendChild(this.dUp);
			this.holderDiv.appendChild(this.dDown);
			this.holderDiv.appendChild(this.startButton);
			this.holderDiv.appendChild(this.backButton);
			this.holderDiv.appendChild(this.buttonA);
			this.holderDiv.appendChild(this.buttonB);
			this.holderDiv.appendChild(this.buttonC);
			this.holderDiv.appendChild(this.buttonD);
		};
		ControllerPad.prototype._standardControllerButtonTakedown = function(hAdjust) {
			
			this.holderDiv.removeChild(this.dLeft);
			this.holderDiv.removeChild(this.dRight);
			this.holderDiv.removeChild(this.dUp);
			this.holderDiv.removeChild(this.dDown);
			this.holderDiv.removeChild(this.startButton);
			this.holderDiv.removeChild(this.backButton);
			this.holderDiv.removeChild(this.buttonA);
			this.holderDiv.removeChild(this.buttonB);
			this.holderDiv.removeChild(this.buttonC);
			this.holderDiv.removeChild(this.buttonD);
		};
		ControllerPad.prototype.customControllerButtonSetup = function(leftp, rightp, upp, downp, startp,backp,ap,bp,cp,dp, directionButtonsWidth, directionButtonsHeight, startAndBackWidth, startAndBackHeight, buttonWidth, buttonHeight, totalWidth, totalHeight) {
			
			if(leftp) {
				this._customSpecs.leftp = leftp;
				this._customSpecs.rightp = rightp;
				this._customSpecs.upp = upp;
				this._customSpecs.downp = downp;
				this._customSpecs.startp = startp;
				this._customSpecs.backp = backp;
				this._customSpecs.ap = ap;
				this._customSpecs.bp = bp;
				this._customSpecs.cp = cp;
				this._customSpecs.dp = dp;
				this._customSpecs.directionButtonsWidth = directionButtonsWidth;
				this._customSpecs.directionButtonsHeight = directionButtonsHeight;
				this._customSpecs.startAndBackWidth = startAndBackWidth;
				this._customSpecs.startAndBackHeight = startAndBackHeight;
				this._customSpecs.buttonWidth = buttonWidth;
				this._customSpecs.buttonHeight = buttonHeight;
			}
			this.customStyleTotalWidth = totalWidth; this.customStyleTotalHeight = totalHeight;
			this._configCustom("blue");
			this.holderDiv.appendChild(this.dLeft);
			this.holderDiv.appendChild(this.dRight);
			this.holderDiv.appendChild(this.dUp);
			this.holderDiv.appendChild(this.dDown);
			this.holderDiv.appendChild(this.startButton);
			this.holderDiv.appendChild(this.backButton);
			this.holderDiv.appendChild(this.buttonA);
			this.holderDiv.appendChild(this.buttonB);
			this.holderDiv.appendChild(this.buttonC);
			this.holderDiv.appendChild(this.buttonD);
			
		};
		ControllerPad.prototype._customControllerButtonTakedown = function() {
			
			this.holderDiv.removeChild(this.dLeft);
			this.holderDiv.removeChild(this.dRight);
			this.holderDiv.removeChild(this.dUp);
			this.holderDiv.removeChild(this.dDown);
			this.holderDiv.removeChild(this.startButton);
			this.holderDiv.removeChild(this.backButton);
			this.holderDiv.removeChild(this.buttonA);
			this.holderDiv.removeChild(this.buttonB);
			this.holderDiv.removeChild(this.buttonC);
			this.holderDiv.removeChild(this.buttonD);
			
		};
		ControllerPad.prototype.assignStartAndBackMethods = function(startMethodString, backMethodString, methodObjectRef) {
			
			ControllerPad.instance.removeEventListener("padStart", startMethodString, methodObjectRef);
			ControllerPad.instance.removeEventListener("keyStart", startMethodString, methodObjectRef);
			ControllerPad.instance.removeEventListener("touchStart", startMethodString, methodObjectRef);
			ControllerPad.instance.removeEventListener("padBack", backMethodString, methodObjectRef);
			ControllerPad.instance.removeEventListener("keyBack", backMethodString, methodObjectRef);
			ControllerPad.instance.removeEventListener("touchBack", backMethodString, methodObjectRef);
			
			ControllerPad.instance.addEventListener("padStart", startMethodString, methodObjectRef);
			ControllerPad.instance.addEventListener("keyStart", startMethodString, methodObjectRef);
			ControllerPad.instance.addEventListener("touchStart", startMethodString, methodObjectRef);
			ControllerPad.instance.addEventListener("padBack", backMethodString, methodObjectRef);
			ControllerPad.instance.addEventListener("keyBack", backMethodString, methodObjectRef);
			ControllerPad.instance.addEventListener("touchBack", backMethodString, methodObjectRef);
			
		};
		
		ControllerPad.prototype.removeStartAndBackMethods = function(startMethodString, backMethodString, methodObjectRef) {
			
			ControllerPad.instance.removeEventListener("padStart", startMethodString, methodObjectRef);
			ControllerPad.instance.removeEventListener("keyStart", startMethodString, methodObjectRef);
			ControllerPad.instance.removeEventListener("touchStart", startMethodString, methodObjectRef);
			ControllerPad.instance.removeEventListener("padBack", backMethodString, methodObjectRef);
			ControllerPad.instance.removeEventListener("keyBack", backMethodString, methodObjectRef);
			ControllerPad.instance.removeEventListener("touchBack", backMethodString, methodObjectRef);
		
		};
		
		
		ControllerPad.prototype.destroy = function(startMethodString, backMethodString, methodObjectRef) {
			
			if(ControllerPad.instance) {
				
				if(ControllerPad.instance._style == 1) {
					
					ControllerPad.instance._basicControllerButtonTakedown();
				}
				if(ControllerPad.instance._style == 2) {
					
					ControllerPad.instance._directionalsControllerButtonTakedown();
				}
				if(ControllerPad.instance._style == 3) {
					
					ControllerPad.instance._standardControllerButtonTakedown();
				}
				if(ControllerPad.instance._style == 4) {
					
					ControllerPad.instance._customControllerButtonTakedown();
				}
				if(ControllerPad.instance.dLeft) {
					ControllerPad.instance._unscriptDiv(ControllerPad.instance.dLeft);
				}
				if(ControllerPad.instance.dRight) {
					ControllerPad.instance._unscriptDiv(ControllerPad.instance.dRight);
				}
				if(ControllerPad.instance.dUp) {
					ControllerPad.instance._unscriptDiv(ControllerPad.instance.dUp);
				}
				if(ControllerPad.instance.dDown) {
					ControllerPad.instance._unscriptDiv(ControllerPad.instance.dDown);
				}
				if(ControllerPad.instance.startButton) {
					ControllerPad.instance._unscriptDiv(ControllerPad.instance.startButton);
				}
				if(ControllerPad.instance.backButton) {
					ControllerPad.instance._unscriptDiv(ControllerPad.instance.backButton);
				}
				if(ControllerPad.instance.buttonA) {
					ControllerPad.instance._unscriptDiv(ControllerPad.instance.buttonA);
				}
				if(ControllerPad.instance.buttonB) {
					ControllerPad.instance._unscriptDiv(ControllerPad.instance.buttonB);
				}
				if(ControllerPad.instance.buttonC) {
					ControllerPad.instance._unscriptDiv(ControllerPad.instance.buttonC);
				}
				if(ControllerPad.instance.buttonD) {
					ControllerPad.instance._unscriptDiv(ControllerPad.instance.buttonD);
				}
				if(startMethodString && backMethodString && methodObjectRef) {
					ControllerPad.instance.removeEventListener("padStart", startMethodString, methodObjectRef);
					ControllerPad.instance.removeEventListener("keyStart", startMethodString, methodObjectRef);
					ControllerPad.instance.removeEventListener("touchStart", startMethodString, methodObjectRef);
					ControllerPad.instance.removeEventListener("padBack", backMethodString, methodObjectRef);
					ControllerPad.instance.removeEventListener("keyBack", backMethodString, methodObjectRef);
					ControllerPad.instance.removeEventListener("touchBack", backMethodString, methodObjectRef);
				}
				if(ControllerPad.instance.canvasObject) {
					ControllerPad.instance.canvasObject.canvas.removeEventListener("touchstart", ControllerPad.instance.dispatch, false);
					ControllerPad.instance.canvasObject.canvas.removeEventListener("touchend", ControllerPad.instance.dispatch, false);
					ControllerPad.instance.canvasObject.canvas.removeEventListener("touchmove", ControllerPad.instance.dispatch, false);
					ControllerPad.instance.canvasObject = null;
				}
				
				window.removeEventListener("keydown", ControllerPad.instance.handleKeys, false);
				window.removeEventListener("keyup",  ControllerPad.instance.releaseKeys, false);
				ControllerPad.instance = null;
			}
		};
		ControllerPad.prototype._dontAbsolutePositionHolder = 0;
		/*
		* Default style is 'standardController' see ControllerPad.css
		* The other built in style option is 'directionalsController'
		* The ControllerPad.css stylesheet needs to be applied to the page before this method is called.
		*
		* @param w The width the controller should be, it will get scaled down if smaller than default
		* @param h The height the controller should be, both w and h must be defined, otherwise it uses the default w/h.
		* @param style The style id string, to define a custom style use the addCustomImag method and pass in your customStyleName here for this param.
		* @param styleOriginalWidth
		* @param styleOriginalHeight
		* @memberof ControllerPad
		*/
		ControllerPad.prototype.show = function(w,h,style,styleOriginalWidth,styleOriginalHeight) {
			if(this._style != -1) { //one of the setup methods must be called to establish inital style.
				var sty; //select style, premade or custom string
				if(style && typeof style == "number") {
				  sty = (style == 2 ? "directionalsController" : (style == 1 ?  "basicController" : "standardController") );
				} else { 
					sty = style || "standardController"; 
					if(sty != "standardController") {
						this._style = 4; //custom;
					}
				}
				if(this._style != 4 && this._style != 5) {
					this._style = (sty == "basicController" ? 1 : (sty == "directionalsController" ? 2 : 3));
				}
				
				if(this._style == 1) {
					styleOriginalWidth = 640;
					styleOriginalHeight = 144;
				}
				
				if(this._style == 2) {
					styleOriginalWidth = 640;
					styleOriginalHeight = 191;
				}
				
				if(this._style == 3) {
					styleOriginalWidth = 737;
					styleOriginalHeight = 144;
				}
				if(this._style == 5) {
					sty = "rotationController";
					styleOriginalWidth = 737;
					styleOriginalHeight = 192;
				}
				
				
				
				if(!styleOriginalWidth) {
					
					styleOriginalWidth = this.customStyleTotalWidth;
					styleOriginalHeight = this.customStyleTotalHeight;
				}
				
				//ready the holder div to display background and hold button divs
				if(!this._holderDivParent.contains(this.holderDiv)) {
					this._holderDivParent.appendChild(this.holderDiv);
				}
				
				
				//assign the holder div an id to style it with the controllers image as its background, see ControllerPad.css.
				this.holderDiv.setAttribute("id", sty);
				var toposition = this._dontAbsolutePositionHolder ? "" : "position:absolute;";
				//set the holder div to the actual width and height of the image
				this.holderDiv.setAttribute("style", toposition+"width:"+styleOriginalWidth+"px;height:"+styleOriginalHeight+"px");
				//alert("ffo");
				//now scale the holderDiv to the page, relative to the known width and height of the image,
				//and the given width height desired.
				//passing bigger or smaller w,h values will stretch/scale the image more
				var scaleX = ((w / window.innerWidth) *  (w / styleOriginalWidth) * 10);
				var scaleY = ((h / window.innerHeight) *  (h / styleOriginalHeight) * 10);
				
				var xOffset = ( w / window.innerWidth ) * 10;
				var yOffset = ( h / window.innerHeight ) * 10;
				
				//all the internal button divs will scale as well, (which does not happen correctly without transformations)
				this.holderDiv.style.transformOrigin = "0 0";
				this.holderDiv.style.transform = "scale(" + scaleX/xOffset + " , " + scaleY/yOffset + ")";
				this.hideButtons();
			}
			
		};
		ControllerPad.prototype.hide = function() {
			if(this._holderDivParent && this._holderDivParent.contains(this.holderDiv)) {
				try { this._holderDivParent.removeChild(this.holderDiv); } catch (e) {
					window.console.log("caught e during controller.hide:  " + e +"  most likely the controller is in a whole bunch of other divs and html");
				}
			}
		};
		
		ControllerPad.prototype.keyEstablish = function() {
			window.removeEventListener("keydown", this.handleKeys, false);
			window.removeEventListener("keyup",  this.releaseKeys, false);
			window.addEventListener("keydown", this.handleKeys, false);
			window.addEventListener("keyup",  this.releaseKeys, false);
		};
		ControllerPad.prototype._configBasic = function(str, prs)  { this._style = 1;
			this.dLeft.setAttribute("style", "position:absolute;left:16px;top:16px;width:96px;height:112px;background:"+ (prs ? (this.buttons.left ? str : "transparent") : str) );
			this.dRight.setAttribute("style", "position:absolute;left:128px;top:16px;width:96px;height:112px;background:"+ (prs ? (this.buttons.right ? str : "transparent") : str) );
			this.startButton.setAttribute("style", "position:absolute;left:240px;top:16px;width:96px;height:48px;background:"+ (prs ? (this.buttons.start ? str : "transparent") : str) );
			this.backButton.setAttribute("style", "position:absolute;left:240px;top:80px;width:96px;height:48px;background:"+ (prs ? (this.buttons.back ? str : "transparent") : str) );
			this.buttonA.setAttribute("style", "position:absolute;left:352px;top:16px;width:80px;height:100px;background:"+ (prs ? (this.buttons.a ? str : "transparent") : str) );
			this.buttonB.setAttribute("style", "position:absolute;left:448px;top:16px;width:80px;height:100px;background:"+ (prs ? (this.buttons.b ? str : "transparent") : str) );
			this.buttonC.setAttribute("style", "position:absolute;left:544px;top:16px;width:80px;height:100px;background:"+ (prs ? (this.buttons.c ? str : "transparent") : str) );
			
		};
		ControllerPad.prototype._configDirectional = function(str, prs) { this._style = 2;
			this.dLeft.setAttribute("style", "position:absolute;left:33px;top:63px;width:64px;height:64px;background:"+ (prs ? (this.buttons.left ? str : "transparent") : str) );
			this.dRight.setAttribute("style", "position:absolute;left:161px;top:63px;width:64px;height:64px;background:"+ (prs ? (this.buttons.right ? str : "transparent") : str) );
			this.dUp.setAttribute("style", "position:absolute;left:96px;top:2px;width:64px;height:64px;background:"+ (prs ? (this.buttons.up ? str : "transparent") : str) );
			this.dDown.setAttribute("style", "position:absolute;left:96px;top:128px;width:64px;height:64px;background:"+ (prs ? (this.buttons.down ? str : "transparent") : str) );
			this.startButton.setAttribute("style", "position:absolute;left:272px;top:32px;width:96px;height:48px;background:"+ (prs ? (this.buttons.start ? str : "transparent") : str) );
			this.backButton.setAttribute("style", "position:absolute;left:272px;top:112px;width:96px;height:48px;background:"+ (prs ? (this.buttons.back ? str : "transparent") : str) );
			this.buttonA.setAttribute("style", "position:absolute;left:416px;top:65px;width:64px;height:64px;background:"+ (prs ? (this.buttons.a ? str : "transparent") : str) );
			this.buttonB.setAttribute("style", "position:absolute;left:480px;top:2px;width:64px;height:64px;background:"+  (prs ? (this.buttons.b ? str : "transparent") : str) );
			this.buttonC.setAttribute("style", "position:absolute;left:544px;top:62px;width:64px;height:64px;background:"+  (prs ? (this.buttons.c ? str : "transparent") : str) );
			this.buttonD.setAttribute("style", "position:absolute;left:480px;top:128px;width:64px;height:64px;background:"+  (prs ? (this.buttons.d ? str : "transparent") : str) );
		};
		
		
		
		ControllerPad.prototype._configRotational = function(str, prs) { this._style = 5;
		
			this.rotationPad.setAttribute("style","position:absolute;left:32px;top:16px;width:160px;height:160px;background:"+ (prs ? (this.buttons.start ? str : "transparent") : str) );
			this.startButton.setAttribute("style", "position:absolute;left:224px;top:32px;width:96px;height:48px;background:"+ (prs ? (this.buttons.start ? str : "transparent") : str) );
			this.backButton.setAttribute("style", "position:absolute;left:224px;top:112px;width:96px;height:48px;background:"+ (prs ? (this.buttons.back ? str : "transparent") : str) );
			
			this.buttonA.setAttribute("style", "position:absolute;left:368px;top:32px;width:96px;height:48px;background:"+str);
			this.buttonB.setAttribute("style", "position:absolute;left:368px;top:112px;width:96px;height:48px;background:"+str);
			
			this.dLeft.setAttribute("style", "position:absolute;left:504px;top:65px;width:64px;height:64px;background:"+ (prs ? (this.buttons.a ? str : "transparent") : str) );
			this.dUp.setAttribute("style", "position:absolute;left:568px;top:2px;width:64px;height:64px;background:"+  (prs ? (this.buttons.b ? str : "transparent") : str) );
			this.dRight.setAttribute("style", "position:absolute;left:632px;top:62px;width:64px;height:64px;background:"+  (prs ? (this.buttons.c ? str : "transparent") : str) );
			this.dDown.setAttribute("style", "position:absolute;left:568px;top:128px;width:64px;height:64px;background:"+  (prs ? (this.buttons.d ? str : "transparent") : str) );
		};
		ControllerPad.prototype._configStandard = function(str, prs) { this._style = 3;
			this.dLeft.setAttribute("style", "position:absolute;left:21px;top:42px;width:50px;height:50px;background:"+str);
			this.dRight.setAttribute("style", "position:absolute;left:167px;top:42px;width:50px;height:50px;background:"+str);
			this.dUp.setAttribute("style", "position:absolute;left:91px;top:8px;width:50px;height:50px;background:"+str);
			this.dDown.setAttribute("style", "position:absolute;left:90px;top:85px;width:50px;height:50px;background:"+str);
			this.startButton.setAttribute("style", "position:absolute;left:240px;top:16px;width:96px;height:48px;background:"+str);
			this.backButton.setAttribute("style", "position:absolute;left:240px;top:80px;width:96px;height:48px;background:"+str);
			this.buttonA.setAttribute("style", "position:absolute;left:352px;top:16px;width:80px;height:100px;background:"+str);
			this.buttonB.setAttribute("style", "position:absolute;left:448px;top:16px;width:80px;height:100px;background:"+str);
			this.buttonC.setAttribute("style", "position:absolute;left:544px;top:16px;width:80px;height:100px;background:"+str);
			this.buttonD.setAttribute("style", "position:absolute;left:644px;top:16px;width:80px;height:100px;background:"+str);
		};
		ControllerPad.prototype._configCustom = function(str, prs) { this._style = 4;
			
			this.dLeft.setAttribute("style", "position:absolute;left:"+this._customSpecs.leftp.x+"px;top:"+this._customSpecs.leftp.y+"px;width:"+this._customSpecs.directionButtonsWidth+"px;height:"+this._customSpecs.directionButtonsHeight+"px;background:"+ (prs ? (this.buttons.left ? str : "transparent") : str) );
			this.dRight.setAttribute("style", "position:absolute;left:"+this._customSpecs.rightp.x+"px;top:"+this._customSpecs.rightp.y+"px;width:"+this._customSpecs.directionButtonsWidth+"px;height:"+this._customSpecs.directionButtonsHeight+"px;background:"+ (prs ? (this.buttons.right ? str : "transparent") : str) );
			this.dUp.setAttribute("style", "position:absolute;left:"+this._customSpecs.upp.x+"px;top:"+this._customSpecs.upp.y+"px;width:"+this._customSpecs.directionButtonsWidth+"px;height:"+this._customSpecs.directionButtonsHeight+"px;background:"+ (prs ? (this.buttons.up ? str : "transparent") : str) );
			this.dDown.setAttribute("style", "position:absolute;left:"+this._customSpecs.downp.x+"px;top:"+this._customSpecs.downp.y+"px;width:"+this._customSpecs.directionButtonsWidth+"px;height:"+this._customSpecs.directionButtonsHeight+"px;background:"+ (prs ? (this.buttons.down ? str : "transparent") : str) );
			this.startButton.setAttribute("style", "position:absolute;left:"+this._customSpecs.startp.x+"px;top:"+this._customSpecs.startp.y+"px;width:"+this._customSpecs.startAndBackWidth+"px;height:"+this._customSpecs.startAndBackHeight+"px;background:"+ (prs ? (this.buttons.start ? str : "transparent") : str) );
			this.backButton.setAttribute("style", "position:absolute;left:"+this._customSpecs.backp.x+"px;top:"+this._customSpecs.backp.y+"px;width:"+this._customSpecs.startAndBackWidth+"px;height:"+this._customSpecs.startAndBackHeight+"px;background:"+ (prs ? (this.buttons.back ? str : "transparent") : str) );
			this.buttonA.setAttribute("style", "position:absolute;"+this._addedButtonRectStyle+"left:"+this._customSpecs.ap.x+"px;top:"+this._customSpecs.ap.y+"px;width:"+this._customSpecs.buttonWidth+"px;height:"+this._customSpecs.buttonHeight+"px;background:"+ (prs ? (this.buttons.a ? str : "transparent") : str) );
			this.buttonB.setAttribute("style", "position:absolute;"+this._addedButtonRectStyle+"left:"+this._customSpecs.bp.x+"px;top:"+this._customSpecs.bp.y+"px;width:"+this._customSpecs.buttonWidth+"px;height:"+this._customSpecs.buttonHeight+"px;background:"+ (prs ? (this.buttons.b ? str : "transparent") : str) );
			this.buttonC.setAttribute("style", "position:absolute;"+this._addedButtonRectStyle+"left:"+this._customSpecs.cp.x+"px;top:"+this._customSpecs.cp.y+"px;width:"+this._customSpecs.buttonWidth+"px;height:"+this._customSpecs.buttonHeight+"px;background:"+ (prs ? (this.buttons.c ? str : "transparent") : str) );
			this.buttonD.setAttribute("style", "position:absolute;"+this._addedButtonRectStyle+"left:"+this._customSpecs.dp.x+"px;top:"+this._customSpecs.dp.y+"px;width:"+this._customSpecs.buttonWidth+"px;height:"+this._customSpecs.buttonHeight+"px;background:"+ (prs ? (this.buttons.d ? str : "transparent") : str) );
		};
		
		ControllerPad.prototype.__recurse = -1;
		ControllerPad.prototype._buttonRectColor = "#6495edbb";
		ControllerPad.prototype._addedButtonRectStyle = "";
		
		ControllerPad.prototype.showButtons = function(ifPressed) {
			if(this.__recurse == -1 && ifPressed) {
				this.__recurse = 1;
			}
			if(ifPressed == -1) { this.__recurse = -1; return; }
			if(this._style == 1) {
				this._configBasic(this._buttonRectColor, ifPressed || 0);
			}
			if(this._style == 2) {
				this._configDirectional(this._buttonRectColor, ifPressed || 0);
			}
			if(this._style == 3) {
				this._configStandard(this._buttonRectColor, ifPressed || 0);
			}
			if(this._style == 4) {
				this._configCustom(this._buttonRectColor, ifPressed || 0);
			}
		};
		ControllerPad.prototype.hideButtons = function() {
			if(this._style == 1) {
				this._configBasic("transparent");
			}
			if(this._style == 2) {
				this._configDirectional("transparent");
			}
			if(this._style == 3) {
				this._configStandard("transparent");
			}
			if(this._style == 4) {
				this._configCustom("transparent");
			}
			if(this._style == 5) {
				this._configRotational("transparent");
			}
		};
		
		ControllerPad.prototype.dispatch = function(e) {
			if(e) e.preventDefault();
			
			if(e.type == "touchstart" || e.type == "pointerdown") {
				ControllerPad.instance.handleTouches(e); 
				if(ControllerPad.instance.__recurse >= 1) { ControllerPad.instance.showButtons(1); }
				return;
			}
			if(e.type == "touchend" || e.type == "pointerup") {
				ControllerPad.instance.releaseTouches(e); 
				if(ControllerPad.instance.__recurse === 1) { ControllerPad.instance.showButtons(1); }
				return;
			}
			if(e.type == "touchmove" || e.type == "pointermove") {
				ControllerPad.instance.changeTouches(e);
				if(ControllerPad.instance.__recurse === 1) { ControllerPad.instance.showButtons(1); }
				return;
			}
			
			if(e.type == "mousedown") { 
				ControllerPad.instance.handleTouches(e); 
				if(ControllerPad.instance.__recurse >= 1) { ControllerPad.instance.showButtons(1); }
				return;
			}
			if(e.type == "mouseup") {
				ControllerPad.instance.releaseTouches(e); 
				if(ControllerPad.instance.__recurse === 1) { ControllerPad.instance.showButtons(1); }
				return;
			}
		};
		ControllerPad.prototype.changeTouches = function(e) {
			e.preventDefault();//touchmove
			var tx,ty,i,touches;
			if(e && e.targetTouches && e.targetTouches.length) {
				//var i = 0;
				//for (i; i < e.targetTouches.length; i++) {
					//var touches = e.targetTouches[i];
					//var tx = touches.pageX * tabageos.MouseController._oX;//oX/Y defined during resize
					//var ty = touches.pageY * tabageos.MouseController._oY;
					//var tpoint = new tabageos.MoverPoint(tx,ty); var tstri = "";
					
					
					if(this._style == 5 && e.target == this.rotationPad) {
						i = 0;
						for (i; i < e.targetTouches.length; i++) {
							touches = e.targetTouches[i];
							tx = touches.pageX * tabageos.MouseController._oX;//oX/Y defined during resize
							ty = touches.pageY * tabageos.MouseController._oY;
						}
						//window.console.log([tx,ty]);
						
						this.rotateWithPoint(tx,ty);
					}
					
					
					if(e.target == this.dRight) {
						this.buttons.right = 1; this.buttons.left = 0;
					} 
					if(e.target == this.dLeft) {
						this.buttons.left = 1; this.buttons.right = 0;
					} 
					if(e.target == this.dUp) {
						this.buttons.up = 1; this.buttons.down = 0;
					} 
					if(e.target == this.dDown) {
						this.buttons.down = 1; this.buttons.up = 0;
					} 
					if(e.target == this.buttonA) {
						this.buttons.a = 1; this.buttons.b = 0; this.buttons.c = 0; this.buttons.d = 0;
					} 
					if(e.target == this.buttonB) {
						this.buttons.b = 1; this.buttons.c = 0; this.buttons.a = 0;this.buttons.d = 0;
					} 
					if(e.target == this.buttonC) {
						this.buttons.c = 1; this.buttons.b = 0;  this.buttons.a = 0;this.buttons.d = 0;
					}
					if(e.target == this.buttonD) {
						this.buttons.c = 0; this.buttons.b = 0;  this.buttons.a = 0; this.buttons.d = 1;
					}
					if(e.target == this.startButton) {
						//if(this.buttons.a == 0 && this.buttons.right == 0 && this.buttons.left == 0) { this.buttons.start = 1; tstri = "Start"; }
					} 
					if(e.target == this.backButton) {
						//if(this.buttons.a == 0 && this.buttons.right == 0 && this.buttons.left == 0) { this.buttons.back = 1; tstri = "Back"; }
					}
					
				//}
				
			} else if (e && e.pointerType && e.pointerType == "touch") {
				
				if(this._style == 5 && e.target == this.rotationPad) {
					tx = e.pageX * tabageos.MouseController._oX;
					ty = e.pageY * tabageos.MouseController._oY;
					this.rotateWithPoint(tx,ty);
				}
				
				if(e.target == this.dRight) {
						this.buttons.right = 1; this.buttons.left = 0;
					} 
					if(e.target == this.dLeft) {
						this.buttons.left = 1; this.buttons.right = 0;
					} 
					if(e.target == this.dUp) {
						this.buttons.up = 1; this.buttons.down = 0;
					} 
					if(e.target == this.dDown) {
						this.buttons.down = 1; this.buttons.up = 0;
					} 
					if(e.target == this.buttonA) {
						this.buttons.a = 1; this.buttons.b = 0; this.buttons.c = 0; this.buttons.d = 0;
					} 
					if(e.target == this.buttonB) {
						this.buttons.b = 1; this.buttons.c = 0; this.buttons.a = 0;this.buttons.d = 0;
					} 
					if(e.target == this.buttonC) {
						this.buttons.c = 1; this.buttons.b = 0;  this.buttons.a = 0;this.buttons.d = 0;
					}
					if(e.target == this.buttonD) {
						this.buttons.c = 0; this.buttons.b = 0;  this.buttons.a = 0; this.buttons.d = 1;
					}
					if(e.target == this.startButton) {
						//if(this.buttons.a == 0 && this.buttons.right == 0 && this.buttons.left == 0) { this.buttons.start = 1; tstri = "Start"; }
					} 
					if(e.target == this.backButton) {
						//if(this.buttons.a == 0 && this.buttons.right == 0 && this.buttons.left == 0) { this.buttons.back = 1; tstri = "Back"; }
					}
				
				
				
				
			}
		};
		ControllerPad.prototype.handleTouches = function(e) {
			e.preventDefault();var tstri = "";//touchstart 
			if((e && e.targetTouches && e.targetTouches.length) || e.type == "mousedown" || (e.pointerType && e.pointerType == "touch")) {
				
					if(e.target == this.rotationPad && e.type == "touchstart" && this.buttons.start == 1) {
						var i = 0;
						for (i; i < e.targetTouches.length; i++) {
							var touches = e.targetTouches[i];
							var tx = touches.pageX * tabageos.MouseController._oX;//oX/Y defined during resize
							var ty = touches.pageY * tabageos.MouseController._oY;
							this.centerRotationX = tx+1-1;
							this.centerRotationY = ty+1-1;
							
						}
					}
					if(e.target == this.dRight) {
						this.buttons.right = 1; this.buttons.left = 0;
					} 
					if(e.target == this.dLeft) {
						this.buttons.left = 1; this.buttons.right = 0;
					} 
					if(e.target == this.dUp) {
						this.buttons.up = 1; this.buttons.down = 0;
					} 
					if(e.target == this.dDown) {
						this.buttons.down = 1; this.buttons.up = 0;
					} 
					if(e.target == this.buttonA) {
						this.buttons.a = 1;this.buttons.b = 0;this.buttons.c = 0;this.buttons.d = 0;
					} 
					if(e.target == this.buttonB) {
						this.buttons.b = 1; this.buttons.c = 0;this.buttons.d = 0;this.buttons.a = 0;
					} 
					if(e.target == this.buttonC) {
						this.buttons.c = 1; this.buttons.b = 0;this.buttons.a = 0;this.buttons.d = 0;
					} 
					if(e.target == this.buttonD) {
						this.buttons.d = 1; this.buttons.b = 0; this.buttons.c = 0;this.buttons.a = 0;
					}
					if(e.target == this.startButton) {
						if(this.buttons.a == 0 && this.buttons.right == 0 && this.buttons.left == 0) { this.buttons.start = 1; tstri = "Start"; }
					} 
					if(e.target == this.backButton) {
						if(this.buttons.a == 0 && this.buttons.right == 0 && this.buttons.left == 0) { this.buttons.back = 1; tstri = "Back"; }
					} 
				
			}
			
			if(tstri != "") { ControllerPad.instance.dispatchEvent(new tabageos.Event("touch"+tstri)); }
		};
		ControllerPad.prototype.addedRotationX = 0;
		ControllerPad.prototype.addedRotationY = 0;
		/**
		*
		* The center x of the rotation pads circle on the whole screen.
		* For example, if the game has a width of 496, the middle of the rotation circle at full screen is about 80.
		* If the game is not full screen you will need to calculate where the game edge starts and count from there plus about 80.
		*  This number should define the middle x of the rotation circle image when the controller is shown.
		* This is pretty much a number arrived at by trial and error, unless the game is full screen.
		* The controller should generally work in dev tools with your finger able to rotate around the black part of the rotation circle.
		*
		*  For example:
		*  var fif = window.innerWidth/2;//50%
		*  var containerleft = fif - 248;//50% - half game width is what the container is positioned at.
		*
		*  controller.centerRotationX = containerleft + 80;
		*
		*/
		ControllerPad.prototype.centerRotationX = 360;
		/**
		*
		*
		* The center y of the rotation pads circle on the whole screen.
		* see centerRotationX
		*
		*/
		ControllerPad.prototype.centerRotationY = 360;
		//for rotation the principle is to get the middle point and use atan2() * 180 / pi.
		//the other things making this possible are in the MouseController Class and the static tabageos.Resize method. Together they translate the touch point into a point within gameWidth/Height.
		//when set up for capturing rotation, the controller calls rotateWithPoint on touchmove with the translate cords.
		//the Rotating[Traveler/Shooter] Classes then need only use .setRotation(controller.rotation) to rotate via the controller.
		ControllerPad.prototype.rotateWithPoint = function(x,y, addedX, addedY, centerX,centerY) {
			this.rotation = Math.atan2((y + (addedY || this.addedRotationY)) - (centerY||this.centerRotationY), (x + (addedX || this.addedRotationX)) - (centerX||this.centerRotationX)) * 180 / Math.PI;
		};
		
		
		ControllerPad.prototype.releaseTouches = function(e) {
			e.preventDefault();//touch end
			//var touches = e.changedTouches;
			//var tx = touches[0].pageX * tabageos.MouseController._oX;//oX/Y defined during resize
			//var ty = touches[0].pageY * tabageos.MouseController._oY;
			//var tpoint = new tabageos.MoverPoint(tx,ty);
			
			if(e.target == this.dRight) {
				this.buttons.right = 0; 
			} 
			if(e.target == this.dLeft) {
				this.buttons.left = 0; 
			} 
			if(e.target == this.dUp) {
				this.buttons.up = 0; 
			} 
			if(e.target == this.dDown) {
				this.buttons.down = 0; 
			} 
			if(e.target == this.buttonA) {
				this.buttons.a = 0;
			} 
			if(e.target == this.buttonB) {
				this.buttons.b = 0; 
			} 
			if(e.target == this.buttonC) {
				this.buttons.c = 0;
			} 
			if(e.target == this.buttonD) {
				this.buttons.d = 0;
			}
			this.buttons.start = 0; this.buttons.back = 0;
		};
		
		
		/* 
		*   For override, called before keyCode checks during handleKeys.
		*	let's say you wanted users to be able to use either wasd or arrows
		*	then you can overide ._preHandleKeys and do for example;
		*	 if(e.keyCode == 39 || e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 40) {
		*		controller.keyboardEquivalents = controller.arrows;
		*	 } else {
		*		controller.keyboardEquivalents = controller.wasd;
		*	 }
		*	or you wanted the keyboard equivalents to change based on the level
		*	or some other factor, then this overideable blank function is for that
		*	it gets called just before any checks of keyboardEquivalents are done.
		*
		*    If you want both WASD and Arrows to be used, you can also
		*    just call .acceptWASDAndArrows, which overrides ._preHandleKeys for you.
		*
		*/
		ControllerPad.prototype._preHandleKeys = function(e) {
			
		};
		ControllerPad.prototype.acceptWASDAndArrows = function() {
			this._preHandleKeys = function(e) { if(!e.keyCode) { e.keyCode = ControllerPad.keyCodes[e.key] }
				if(e.keyCode == 39 || e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 40) {
					this.keyboardEquivalents = (this._style != 2 ? this.basicArrows : this.arrows);
				} else {
					this.keyboardEquivalents = (this._style != 2 ? this.basicWasd : this.wasd);
				}
			};
		};
		ControllerPad.keyCodes = {
			
			"a":65,
			"b":66,
			"c":67,
			"d":68,
			"e":69,
			"f":70,
			"g":71,
			"h":72,
			"i":73,
			"j":74,
			"k":75,
			"l":76,
			"m":77,
			"n":78,
			"o":79,
			"p":80,
			"q":81,
			"r":82,
			"s":83,
			"t":84,
			"u":85,
			"v":86,
			"w":87,
			"x":88,
			"y":89,
			"z":90,
			"1":49,
			"2":50,
			"3":51,
			"4":52,
			"5":53,
			"6":54,
			"7":55,
			"8":56,
			"9":57,
			"0":48,
			"ShiftLeft":16,
			"ShiftRight":16,
			"Shift":16,
			"Enter":13,
			"Space":32,
			"Control":17,
			" ":32,
			"Tab":9,
			"Delete":46,
			"ArrowDown":40,
			"ArrowLeft":37,
			"ArrowRight":39,
			"ArrowUp":38,
			"Escape":27,
			".":190,
			",":188,
			"'":187,
			"-":189,
			"=":222
			
		};
		ControllerPad.prototype.__kadjust = 0;
		ControllerPad.prototype.adjustKeyboardEquivalents = function() {
			
			
			if( ControllerPad.instance ) {
				
				for ( var k in ControllerPad.instance.keyboardEquivalents ) {
					
					if (typeof ControllerPad.instance.keyboardEquivalents[k] === 'string') {
						
						ControllerPad.instance.keyboardEquivalents[k] = ControllerPad.keyCodes[ ControllerPad.instance.keyboardEquivalents[k] ];
						
					}
					
				}
				ControllerPad.instance.__kadjust = 1;
			}
			
		};
		ControllerPad.prototype.handleKeys = function(e) {
			if (typeof e == 'undefined') e = window.event;
			if(!ControllerPad.instance.__kadjust) {
				ControllerPad.instance.adjustKeyboardEquivalents();
			}
			if(!e.keyCode) {
				e.keyCode = ControllerPad.keyCodes[e.key] || 0;
			}
			if([37,38,39,40,32].indexOf(e.keyCode) != -1) {
				e.preventDefault();
			}
			//var oe = new tabageos.Event("touchstart");
			var inst = ControllerPad.instance; inst._preHandleKeys(e);
			if(e.keyCode == inst.keyboardEquivalents.right) { inst.buttons.right = 1; inst.buttons.left = 0;
				//oe.potato.targetTouches = [{pageX: inst.dRight.x/tabageos.MouseController._oX, pageY: inst.dRight.y/tabageos.MouseController._oY}];
			} 
			if(e.keyCode == inst.keyboardEquivalents.left) { inst.buttons.left = 1; inst.buttons.right = 0; 
				//oe.potato.targetTouches = [{pageX: inst.dLeft.x/tabageos.MouseController._oX, pageY: inst.dLeft.y/tabageos.MouseController._oY}];
			} 
			if(e.keyCode == inst.keyboardEquivalents.up) { inst.buttons.up = 1; inst.buttons.down = 0;
				//oe.potato.targetTouches = [{pageX: inst.dUp.x/tabageos.MouseController._oX, pageY: inst.dUp.y/tabageos.MouseController._oY}];
			} 
			if(e.keyCode == inst.keyboardEquivalents.down) { inst.buttons.up = 0; inst.buttons.down = 1;
				//oe.potato.targetTouches = [{pageX: inst.dDown.x/tabageos.MouseController._oX, pageY: inst.dDown.y/tabageos.MouseController._oY}];
			}
			if(e.keyCode == inst.keyboardEquivalents.a) { inst.buttons.a = 1;
				//oe.potato.targetTouches = [{pageX: inst.buttonA.x/tabageos.MouseController._oX, pageY: inst.buttonA.y/tabageos.MouseController._oY}];
			}
			if(e.keyCode == inst.keyboardEquivalents.b) { inst.buttons.b = 1; 
				//oe.potato.targetTouches = [{pageX: inst.buttonB.x/tabageos.MouseController._oX, pageY: inst.buttonB.y/tabageos.MouseController._oY}];
			}
			if(e.keyCode == inst.keyboardEquivalents.c) { inst.buttons.c = 1;
				//oe.potato.targetTouches = [{pageX: inst.buttonC.x/tabageos.MouseController._oX, pageY: inst.buttonC.y/tabageos.MouseController._oY}];
			} 
			if(e.keyCode == inst.keyboardEquivalents.d) { inst.buttons.d = 1;
				//oe.potato.targetTouches = [{pageX: inst.buttonD.x/tabageos.MouseController._oX, pageY: inst.buttonD.y/tabageos.MouseController._oY}];
			}
			if(e.keyCode == inst.keyboardEquivalents.start) { inst.buttons.start = 1;
				//oe.potato.targetTouches = [{pageX: inst.startButton.x/tabageos.MouseController._oX, pageY: inst.startButton.y/tabageos.MouseController._oY}];
			}
			if(e.keyCode == inst.keyboardEquivalents.back) { inst.buttons.back = 1;
				//oe.potato.targetTouches = [{pageX: inst.backButton.x/tabageos.MouseController._oX, pageY: inst.backButton.y/tabageos.MouseController._oY}];
			}
			//ControllerPad.instance.dispatch(oe);
			//inst.canvasObject.canvas.dispatchEvent(oe);
			
			if(e.keyCode == 118 && inst._gamePlayRecorder) {
				
				//inst._gamePlayRecorder.exportPressLog();
			}
		};
		ControllerPad.prototype.releaseKeys = function(e) {
			if (typeof e == 'undefined') e = window.event;
			if(!e.keyCode) {
				e.keyCode = ControllerPad.keyCodes[e.key] || 0;
			}
			//e.preventDefault();
			//var changedTouches; 
			var inst = ControllerPad.instance;
			var kstri = "";
			if(e.keyCode == inst.keyboardEquivalents.right) { inst.buttons.right = 0; 
				//changedTouches = [{pageX: inst.dRight.x/tabageos.MouseController._oX, pageY: inst.dRight.y/tabageos.MouseController._oY}];
			} 
			if(e.keyCode == inst.keyboardEquivalents.left) { inst.buttons.left = 0; 
				//changedTouches = [{pageX: inst.dLeft.x/tabageos.MouseController._oX, pageY: inst.dLeft.y/tabageos.MouseController._oY}];
			} 
			if(e.keyCode == inst.keyboardEquivalents.up) { inst.buttons.up = 0; 
				//changedTouches = [{pageX: inst.dUp.x/tabageos.MouseController._oX, pageY: inst.dUp.y/tabageos.MouseController._oY}];
			} 
			if(e.keyCode == inst.keyboardEquivalents.down) { inst.buttons.down = 0; 
				//changedTouches = [{pageX: inst.dDown.x/tabageos.MouseController._oX, pageY: inst.dDown.y/tabageos.MouseController._oY}];
			}
			if(e.keyCode == inst.keyboardEquivalents.a) { inst.buttons.a = 0; 
				//changedTouches = [{pageX: inst.buttonA.x/tabageos.MouseController._oX, pageY: inst.buttonA.y/tabageos.MouseController._oY}];
			}
			if(e.keyCode == inst.keyboardEquivalents.b) { inst.buttons.b = 0; 
				//changedTouches = [{pageX: inst.buttonB.x/tabageos.MouseController._oX, pageY: inst.buttonB.y/tabageos.MouseController._oY}];
			}
			if(e.keyCode == inst.keyboardEquivalents.c) { inst.buttons.c = 0; 
				//changedTouches = [{pageX: inst.buttonC.x/tabageos.MouseController._oX, pageY: inst.buttonC.y/tabageos.MouseController._oY}];
			} 
			if(e.keyCode == inst.keyboardEquivalents.d) { inst.buttons.d = 0; 
				//changedTouches = [{pageX: inst.buttonD.x/tabageos.MouseController._oX, pageY: inst.buttonD.y/tabageos.MouseController._oY}];
			} 
			if(e.keyCode == inst.keyboardEquivalents.start) { inst.buttons.start = 0; kstri = "Start";
				//changedTouches = [{pageX: inst.startButton.x/tabageos.MouseController._oX, pageY: inst.startButton.y/tabageos.MouseController._oY}];
			}
			if(e.keyCode == inst.keyboardEquivalents.back) { inst.buttons.back = 0; kstri = "Back";
				//changedTouches = [{pageX: inst.backButton.x/tabageos.MouseController._oX, pageY: inst.backButton.y/tabageos.MouseController._oY}];
			} 
			
			if(kstri != "") { inst.dispatchEvent(new tabageos.Event("key"+kstri)); }
			//var oe = new tabageos.Event("touchend", changedTouches); 
			//ControllerPad.instance.dispatch(oe);
			//inst.canvasObject.canvas.dispatchEvent(oe);
		};
		
		ControllerPad.prototype.usingGamePad = 0;
		/*
		* the pad.buttons[index] of each button
		* In general you should not change these yourself, unless you know the specific usb controller
		* your players will be using. Use .configureGamePadButtons when you don't know what specific usb game pad your users will have.
		* As is, these indexes are the numbers given by the Radio Shack Playstation controller to usb converter,
		* obviously it is most likely that players will have many different types of usb controllers.
		*/
		ControllerPad.prototype.gamePadButtons = {a:0, b:3, c:2, d:1, s:9, st:11};
		/*
		* ._gpb is the private mirror of .gamePadButtons. (in JavaScript many developers will use ._ to denote private or static vars, which is the case in tbgs.js. ControllerPad.js is using them as setter/getters, so very strictly not supposed to be changed, because that JavaScript can't do real getters/setters in all browers)
		* Your not supposed to change ._gpb, together with .configureGamePadButtons, .gamePadButtons therefore opperates as a setter.
		* Call .configureGamePadButtons() during a loop to properly set up buttons based on the users usb controller inputs.
		* There is no better way to accomplish setting up the buttons in a universal manner, because each controller may send
		* out different numbers for each button, therefore the best thing to do is let the user press the buttons first, and assign them that way,
		* all that is set up already and done for you by simply calling .configureGamePadButtons in a loop, see .handleGamePad.
		*/
		ControllerPad.prototype._gpb = {a:-1, b:-1, c:-1, d:-1, s:-1, st:-1};
		ControllerPad.prototype.gamePadButtonsUserDefined = 0;
		ControllerPad.prototype.requestForAButton = "please press your game pads a button";//for example in Subsist Giants, its "please press the jump button"
		ControllerPad.prototype.requestForBButton = "please press your game pads b button";
		ControllerPad.prototype.requestForCButton = "please press your game pads c button";
		ControllerPad.prototype.requestForDButton = "please press your game pads d button";
		ControllerPad.prototype.requestForSButton = "please press your game pads select/back button";
		ControllerPad.prototype.requestForSTButton = "please press your game pads start button";
		ControllerPad.prototype._createRequestDiv = function(inner, clear) {
			var div = document.getElementById("buttonsRequest") || document.createElement("div");
			div.setAttribute("id", "buttonsRequest");
			div.setAttribute("style", "position:absolute;color:black;top:8px;left:25%;width:250px;height:75px;border:thin solid black;background:white;z-index:999999999999999999999999999999999999999999999");
			div.innerHTML = inner;document.body.appendChild(div);
			if(clear) { document.body.removeChild(div); }
		};
		ControllerPad.prototype._gpa = 0;
		ControllerPad.prototype.gamePadAvailable = function() { //window.gamePadEvent
			var pads, pad, i, l;
			if(ControllerPad.instance._gpa == 0) {
				pads = (navigator && navigator.getGamepads) ? navigator.getGamepads() : []; l = pads.length; i = 0;
				for(i;i<l;i++) { pad = pads[i]; if(pad) { ControllerPad.instance._gpa = 1; break; } }
				return ControllerPad.instance._gpa;
			} else {
				return 1;
			}
		};
   
		/*
		* To be called during a loop.
		* see .handleGamePad
		*/
		ControllerPad.prototype.configureGamePadButtons = function() {
			var pads, pad, i, l;
			if(ControllerPad.instance._gpb.a == -1) {
				//window.console.log(navigator.getGamepads());
                
				pads = (navigator && navigator.getGamepads) ? navigator.getGamepads() : 0; l = pads ? pads.length : 0; i = 0;
				for(i;i<l;i++) { pad = pads[i]; if(pad) { break; } }
				if(!pad) return 0;
               // window.console.log(ControllerPad.instance._gpb.a);
				ControllerPad.instance._createRequestDiv(ControllerPad.instance.requestForAButton);
				
				if(pad && pad.buttons) { i = 0; l = pad.buttons.length;
					for(i;i<l;i++) { if(pad.buttons[i].pressed) { ControllerPad.instance._gpb.a = i; break;  } }
				} return 0;
			}
			if(ControllerPad.instance._gpb.b == -1) {
				ControllerPad.instance._createRequestDiv(ControllerPad.instance.requestForBButton);
				pads = (navigator && navigator.getGamepads) ? navigator.getGamepads() : 0; l = pads ? pads.length : 0; i = 0;
				for(i;i<l;i++) { pad = pads[i]; if(pad) { break; } }
				
				if(pad && pad.buttons) { i = 0; l = pad.buttons.length;
					for(i;i<l;i++) {
						if(pad.buttons[i].pressed && i != ControllerPad.instance._gpb.a && i != ControllerPad.instance._gpb.c && i != ControllerPad.instance._gpb.d) {
							ControllerPad.instance._gpb.b = i; break; 
						}
					}
				} return 0;
			}
			if(ControllerPad.instance._gpb.c == -1) {
				ControllerPad.instance._createRequestDiv(ControllerPad.instance.requestForCButton);
				pads = (navigator && navigator.getGamepads) ? navigator.getGamepads() : 0; l = pads ? pads.length : 0; i = 0;
				for(i;i<l;i++) { pad = pads[i]; if(pad) { break; } }
				
				if(pad && pad.buttons) { i = 0; l = pad.buttons.length;
					for(i;i<l;i++) {
						if(pad.buttons[i].pressed && i != ControllerPad.instance._gpb.a && i != ControllerPad.instance._gpb.b && i != ControllerPad.instance._gpb.d) {
							ControllerPad.instance._gpb.c = i;  break; 
						}
					}
				} return 0;
			}
			if(ControllerPad.instance._gpb.d == -1) {
				ControllerPad.instance._createRequestDiv(ControllerPad.instance.requestForDButton);
				pads = (navigator && navigator.getGamepads) ? navigator.getGamepads() : 0; l = pads ? pads.length : 0; i = 0;
				for(i;i<l;i++) { pad = pads[i]; if(pad) { break; } }
				
				if(pad && pad.buttons) { i = 0; l = pad.buttons.length;
					for(i;i<l;i++) {
						if(pad.buttons[i].pressed && i != ControllerPad.instance._gpb.a && i != ControllerPad.instance._gpb.c && i != ControllerPad.instance._gpb.b) {
							ControllerPad.instance._gpb.d = i; break; 
						}
					}
				} return 0;
			}
			if(ControllerPad.instance._gpb.s == -1) {
				ControllerPad.instance._createRequestDiv(ControllerPad.instance.requestForSButton);
				pads = (navigator && navigator.getGamepads) ? navigator.getGamepads() : 0; l = pads ? pads.length : 0; i = 0;
				for(i;i<l;i++) { pad = pads[i]; if(pad) { break; } }
				
				if(pad && pad.buttons) { i = 0; l = pad.buttons.length;
					for(i;i<l;i++) {
						if(pad.buttons[i].pressed && i != ControllerPad.instance._gpb.a && i != ControllerPad.instance._gpb.c && i != ControllerPad.instance._gpb.b && i != ControllerPad.instance._gpb.d) {
							ControllerPad.instance._gpb.s = i; break; 
						}
					}
				} return 0;
			}
			if(ControllerPad.instance._gpb.st == -1) {
				ControllerPad.instance._createRequestDiv(ControllerPad.instance.requestForSTButton);
				pads = (navigator && navigator.getGamepads) ? navigator.getGamepads() : 0; l = pads ? pads.length : 0; i = 0;
				for(i;i<l;i++) { pad = pads[i]; if(pad) { break; } }
				
				if(pad && pad.buttons) { i = 0; l = pad.buttons.length;
					for(i;i<l;i++) {
						if(pad.buttons[i].pressed && i != ControllerPad.instance._gpb.a && i != ControllerPad.instance._gpb.c && i != ControllerPad.instance._gpb.b && i != ControllerPad.instance._gpb.d && i != ControllerPad.instance._gpb.s) {
							ControllerPad.instance._gpb.st = i; break; 
						}
					}
				} return 0;
			}
			
			ControllerPad.instance.gamePadButtons.a = ControllerPad.instance._gpb.a;
			ControllerPad.instance.gamePadButtons.b = ControllerPad.instance._gpb.b;
			ControllerPad.instance.gamePadButtons.c = ControllerPad.instance._gpb.c;
			ControllerPad.instance.gamePadButtons.d = ControllerPad.instance._gpb.d;
			ControllerPad.instance.gamePadButtons.s = ControllerPad.instance._gpb.s;
			ControllerPad.instance.gamePadButtons.st = ControllerPad.instance._gpb.st;
			ControllerPad.instance._createRequestDiv("",1);
			ControllerPad.instance.gamePadButtonsUserDefined = 1;
			
			ControllerPad.instance.buttons.start = 1;//so that pause is not called when start button is first pressed for defining.
			
			return 1;
		};
		/**
		*
		*  Call during your game loop, after movement has already happened.
		*  Basic GamePad functionality. Should produce correct directional response from any pad,
		*  But each game pad is different and each may send out different index values for the specific buttons.
		*  Directional input is done by axsis therefore it should work for all pads,
		*  button input however may vary more, best thing is to let the user set the buttons (not directionals)
		*  call configureGamePadButtons during your game loop, until it returns 1 or until gamePadButtonsUserDefined is 1.
		*  then start calling handleGamePad, for example; 
		*
		*   	 	if(!controller.gamePadButtonsUserDefined) {
		*				controller.configureGamePadButtons();
		*			} else {
		*				controller.handleGamePad();
		*			}
		*    
		*
		*/
		ControllerPad.prototype.handleGamePad = function() { // call during the game loop
			var pads, pad, i, l, inst, hoff, voff, doff, boff, aoff, coff;
			hoff = 1; voff = 1; doff = 1; boff = 1; aoff = 1; coff = 1;
			pads = (navigator && navigator.getGamepads) ? navigator.getGamepads() : []; l = pads.length; i = 0;
			for(i;i<l;i++) { pad = pads[i]; if(pad) { break; } }
			if(pad) { inst = ControllerPad.instance; 
				if(pad.axes && pad.axes[0]) { //horizontal
					if(pad.axes[0] >= 1) { //right 
						inst.buttons.right = 1;inst.buttons.left = 0;inst.usingGamePad = 1; hoff = 0;
					}
					if(pad.axes[0] <= -1) {
						inst.buttons.left = 1;inst.buttons.right = 0;inst.usingGamePad = 1; hoff = 0;
					}
					if(pad.axes[0] < 1 && pad.axes[0] > -1 && inst.usingGamePad == 1) {
						inst.buttons.right = 0;inst.buttons.left = 0; hoff = 1;
					}
				}
				if(pad.axes && pad.axes[1]) { //vertical 
					if(pad.axes[1] >= 1) { //down
						inst.buttons.down = 1;inst.usingGamePad = 1; voff = 0;
					}
					if(pad.axes[1] <= -1) {
						inst.buttons.up = 1;inst.usingGamePad = 1; voff = 0;
					}
					if(pad.axes[1] < 1 && pad.axes[1] > -1 && inst.usingGamePad == 1) {
						inst.buttons.up = 0;inst.buttons.down = 0; voff = 1;
					}
				}
				if(pad.buttons && pad.buttons[inst.gamePadButtons.d]) { // existence checks
					if(pad.buttons[inst.gamePadButtons.d].pressed) { //'pressed' is what pads send out, also 'value' 0.0 to 1.0.
						inst.buttons.d = 1;inst.usingGamePad = 1; doff = 0;
					} else { if(inst.usingGamePad == 1) { inst.buttons.d = 0; doff = 1;} }
				}
				if(pad.buttons && pad.buttons[inst.gamePadButtons.b]) { // 
					if(pad.buttons[inst.gamePadButtons.b].pressed) {
						inst.buttons.b = 1;inst.usingGamePad = 1; boff = 0;
					} else { if(inst.usingGamePad == 1) { inst.buttons.b = 0; boff = 1;} }
				}
				if(pad.buttons && pad.buttons[inst.gamePadButtons.c]) { // 
					if(pad.buttons[inst.gamePadButtons.c].pressed) {
						inst.buttons.c = 1;inst.usingGamePad = 1; coff = 0;
					} else { if(inst.usingGamePad == 1) { inst.buttons.c = 0; coff = 1;} }
				}
				if(pad.buttons && pad.buttons[inst.gamePadButtons.a]) { // 
					if(pad.buttons[inst.gamePadButtons.a].pressed) {
						inst.buttons.a = 1;inst.usingGamePad = 1; aoff = 0;
					} else { if(inst.usingGamePad == 1) {inst.buttons.a = 0; aoff = 1;} }
				} //with my controller (radioshack playstation controller to usb adapter)
				//the button indexes are as above (gamePadButtons)
				//however,as noted, different game controllers may send out different indexes for each button.
				//when controller buttons are needed, call configureGamePadButtons in your loop first,
				//until gamePadButtonsUserDefined is 1. configureGamePadButtons will ask the user to press each button
				//and stores the indexes in gamePadButtons
				
				//start
				if(pad.buttons && pad.buttons[inst.gamePadButtons.st]) { // 
					if(pad.buttons[inst.gamePadButtons.st].pressed ) {
						if(inst.buttons.start == 0) inst.dispatchEvent(new tabageos.Event("padStart"));
						inst.buttons.start = 1;inst.usingGamePad = 1; 
					} else { inst.buttons.start = 0; }
				}
				
				//select
				if(pad.buttons && pad.buttons[inst.gamePadButtons.s]) { // 
					if(pad.buttons[inst.gamePadButtons.s].pressed) {
						if(inst.buttons.back == 0) inst.dispatchEvent(new tabageos.Event("padBack"));
						inst.buttons.back = 1;inst.usingGamePad = 1; 
					} else { inst.buttons.back = 0; }
				}
				
				if(hoff && voff && doff && boff && coff && aoff) { inst.usingGamePad = 0; }
			} 
			
		};
		
		ControllerPad._selfStyle = function(customStyleName, customStyleData) {
			
			var controllerCss = 'div#basicController {position:relative;z-index:9999999999999999999999; background: no-repeat url("data:image/png;base64,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");}'+
						'  div#hidden {position:absolute;width:0px;height:0px;top:0px;left:0px; z-index:-9;background: white; }'+
						'  div#directionalsController {position:relative;z-index:9999999999999999999999; background: no-repeat url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAn8AAAC/CAYAAACPObpmAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADhGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMjEgNzkuMTU1NzcyLCAyMDE0LzAxLzEzLTE5OjQ0OjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmNlNzRkNDI3LTVmYWMtZTY0Ny05ZWYwLWRmMjU4OWU1NWE3YyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFMTg3QTM3MTE0MzIxMUU3QTVGMjhGMTExRjJGNUJCMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFMTg3QTM3MDE0MzIxMUU3QTVGMjhGMTExRjJGNUJCMCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNCAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDplMjJlZjk4Zi1kYzA1LTFkNDUtOTY3NS1mYzQ0MGIxOTNlZGEiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpjMDk4OTMyNC0wMGU0LTExZTctODUxNi1jNDAxYTcwYWRkZTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz52hpCWAACLW0lEQVR4Xu29CYAdV3UmfCW1epXU2uVVtjE2jlkMNoNBZAzEkBA8SVgCyYQJkOA4IQTIvvyQDIEwgSzkT/5kMpmskMnKkky2CYZMFscGG4yxbMna15bUknrfN0n/+b5zT737quu11K1+S6vPV3363rpVr+69Z6tTt25Vrfi3h/7tQktLS2htbQ3NLc2hqakprFy5MgAXLlxgWoQVsvBvhfwT2G+s3JEDWCl8AU9nZmbC5ORkOHTgUOjp6SGdOXMmnD17NvT29oaBgYEwODgYRkdHw8TERJiamuJvzp07F86fP88UxzH55NNGBXTFqLm5ObzsnpeFjo6O0N7WHtra20JrS2tob2+nLq5ZsyasXbM2rF0nJCnWsR+2rV69mrRq5aqwctVKPabrncPhaFS4/3f/Xy3kxC6aEXOB+sLYTIrOX1DdgU5Bt1Z87sHPXQBDOzs7yWAIAYLBD4qUCYyulGb5ZSYF6/dcWLVqVVjVJCQp9ocxH9x/MKzqaAsnT50K3adPk/r6+8LwyEgYGYPhT4ap6akwLftif8gDwmQK2UT5mJhSoTcCUv3J8pJCPx7++38Md3/93WH9+vVhfef6zMjhDKCPa9fKulDnus4snxo/LlKMl2UXHg6Hw1FDXI7/v+E5t4bTEvj19EoQ2NsXhkaG6fcnpuD7p2W/c+HceQ36Ur+PfOZdUYaE/xsTaL/1Ad76Yz/zfvf/l4lK53s71yJFgNy0uqlsUG9sdCz0D/SHFX/65396oa2tLWzZvCVs3LhRg8C1a0LTqqbs4BlTLRGGm8JjW175rfLlgCIBpMw3IKBuWtkU10qYETp8/Gg4dPhwOHr8GB3B0PAwg7/x8XG56pvW4O9cefCnpMdgK5K66gGrPuNH0h5kafy4YhVHhrY++uD/DS988Qupa6Z7mzZt0is8ufpDCsOHPtqFSUd7R8AotRk/lHnlClVooN48cDgcywuX6/+BCTnGsePHw4lTp3jxPzY+ESanpsKkXPhzxI++U/w+FjmmEn4Z6+G/Ul31QFZ7bEdZa6TsnASx0+wP/P/58Bsf+gX3/5eBfMyVB3VEFg7kMdwuB7at2rFjxwcn5SrDrkxs6HV182plbiREkNwHQ62R6QwKYxtQGYYVrdIrfkE/oWz4i3lQeoVjeRCvVIR3eUAsnXLlMz4xHgYHh8LY2Biv9HRoH3tciFc34LukUQaUxSqRS1xHsK5ltaVMP9gW0xUMxZvuxIsD6cy5GbmSxdWsBLSnj3WFjZs3ooNhhewDnetY08EUBo4LElzpmTOwq76WZjX+1U2rqX+QhfHbF1988aUmC/wNHPRl+n+gCZ5MzrfDQ0NyHpjgeRSEY9splueAlOBbEx+rae1Jz00V8kJIQbjwn5S+TYyPh/HR0fDkY192/385S9Q3ZaAmAHhiPId+VLrg4H4/9J4furDu7g/HIkct8ZG3ro+5EHqGh8JXn/hqOHj4cBgUJzA8MixXgOMc+p8WsoDw/HkVPv+iwhtMF6qOWBFrt3Yw8I9l0sbsQiDStFzJwugnxibC1ORk2PP4E+FHfvckj+NwOBzLDan/B/YcORyOdXWFsQkJkDDlB3P9zuGuj/p986lw+fCzWVpjsA0Rlqef14zmY9ts+/jYWBjo6wvDg0NhdGQk/O8//TP3/3WC6d2K137zay/c+dY/44qjtkiNHybyxK6nwr4DBzjZd3B4mKOBExIoYegfhCsc3ALg/mZkanK1AQw6GrMatt7Otbac59wUzfNWBUnKZH1Sgr7Bgf4wgtFNMf6je/eHH/29UzyWw+FwLDfkg7+TvT3hyNGjYRSjYxN66xdTfuxBD/hRu8hWD8ykZmCNsT7Lc4QS6/D/bF+J0nPDiJzPTp88Fc6ePh36JQj8989/wf1/nZAFfy94wQsu/Kef/FeuOGqL1PgHJsbCkcNHQq84gH487TUkQZI4AQR/5SN/avwwPhgVVyJKuerBjBkw40agd0HIAj60kyRtxhwPlI2K8ff2SN96esPwwGA4dfRY+LHf7+ZxHA6HY7khH/ydlovjs2fOhJGxsTDG4A++PwZ/EmTZ6J/GXfxX7vOTc0G1oDXgHIDq9FxglLYRPp/5ePE/0N8fuo4cDSePHw9nurvDk1/+ivv/OiEL/p77vOde+Laf/neuAF/5s++YJVQs+heVK807CNxDx1+a5331ZN4D6MX/+S90J8HPfFsT5zRMSf7E6ZPh8KHDHBVb07FGgr9BOgE8lo1RP1wB0qAoEzUsBdZrJwtUZXoBI+ctXgR8MTgF4TYFgr6ZGXtY5VwYHhwI3XLl19MtV369vaHv9NmyYX/XO4fDsVQBX4+/NI/0Uvy/4eDJE2Ggrz+0tbZw9A+vg5mKI3+gWb5RINmaAnVbaoRzkp6bSgEfBgLOndPzAh5WwStsDu3fH44dOhROSAB4aO8+9/+LAOgY/tI80rn0zoK/VVu2bPngbf/xnVwBTjz1qYz56VUG1gnnfWVkLCoxCXkIw3Dt898ccyHc0N4VOrdsCb0jg+HM2bOhW66IhoaGOGF2fWdnaFq1ihOFMcG1pbmZE2FbhTDpFalSKyfC1oQwEVdSawfqbmnRdiFtXi0k7WzGhFw8kbU6PoQi/cEVLEb/RoaGw9jwCOf9vfRbfjRywvXO4XAscSzA/8v5l/lxoW686UEu+vGgREd7O88DTXyYr3QeyKhJU/jaZtnGtMpk9a1GfWyPvkIE69qmVcyzvfD7eAAwPpQyOTEe+vBOQznPDfT2yXlgyP3/YmGeenfvC1qZrrj99tsvvP7/eZgrwGN/8uZMAGQ8/zQl4vF44NKxlzeMRzFPkD3KI0TefDpa0pe89VNxhxC+6fqd4baX3BX6+/vDqZMnw5HDhyVAGgkb+e6jzrCmvYNzP/DQx7lzuALUqyszElI8FgF5VRlWp9XPUT+5KtXRv/McpdSRymm2G5OWQb09veGo9O/EseOh98zZMCR9fu//OK4HFbjeORyOJQnzVTFP0E2pr5rL/99zzz3M901PhQP79nE+3Bo+3YqXHrdE368jafCx5ncBTazCNFdFoH5LY15H/fRcYOcD3O1Band+cKv3mV27wr5n9vDW74ljx9z/Xy6MRzFPkD3Ko0p6ZyN/K7MfR8wSQEztYDwgHuXG4+Uxql/WBObGR+2NP+BVyrsyniYYGRkJE5MTkSYjlfII/DDSBtLRtzjSZ4RtGI2LVLatWhTb08Z1HQnEY/kk25bsg1HKZj6er686UB6pLqUo41HCO9c7JyenhqXL9P8GXizbBbMQgiak2YhbU9EoXPloIEcAq0xab6lOjgLGsjzpPhgZXBVWyX7qt5U/7v8vky5D7wyzRv6+9Mdv4s5GRCKAMmJtDgTQKc8y3hn7Ep699Ls/o4WCO1v/Kdxxz8s58td96lQ4fOgQH4Pf2LleX2zZ3sEgCoZkV1K8+kvqAyytNqwarU8U6zzaoFd9vDoVsnZyxE+uZvHKAsxdweeLOOfj8JHQE0f+3vPbx/SAAtc7h8OxFCEeq8x3ZT7M3Fjiu/L+/01vehPzJ0aGwv69+/g6FNzy7YgjfwigcAvVRtXga3FcqUHrqCHS+rQZpb5q+5DqKCXOA3YHCFN+uk91h6ef2hn27t4duo4dCyePHXf/f5lI+V/GO2NfwrNU70oPfDz3uRe+7WdKD3x88Y/fWH6QKIAs0kSKA0qeQljuciCbZGEgFCNtGEFyFWM8BL3suz+rvxM8f9U/hjte8fVhYAC3fU/F277DYeP6DfG2r77YEnPp4AA4eTbWQ8JiddQIWZ3IS2oBIIM/MXqkuGrFE8o2komnls90nwkH9+9j8Icn2ob6ym/7ut45HI4lB7orWRbo/7/zO78z4GUpXYP94cC+/aG/r5cX/Qj+MJcaI35NTfoy/cz3s1L+z+qvGZL6zF+jm9ZvPvhn5wGMYmIEc2qK57c0+DtxtPy2r/v/eSLKYSF6l932ncVE/K5AAFA+3LbDh5R1Er9+4cFJKPKCvAGPbFhWeEf+pjxNUHqFSwyehGzOhFKSl/2yY0MWqC+mtSLTAXxNxPLZV0akzL4yopN909+AF9p9KGzGjxRWhmLXOycnp6VC0SctxP8DCP44aiYnbh090xE+TVGm5folD/hFpKgjriNfC4r1wZ+bb1aKZbH/ur3URvBB/gQIVJi4/18MWqDeGURslEoGnpwjsI2CSxTMmT8HmQCEeIUC3iX8TXkLWLCHoXJ9eWd8ObKkyJc5A0mxjYaF48uxUyNkXVWmrF809lJfQemn3Sy19qkmCtgv5UPe+FPeSA1ap+udk5PTUqEF+H8ApeYTi8jOB6DUH+MTmkgZYNViifWR4JtZt/r4rB2x3xkfUCbEfrL70o/Y1xQoM8gvSnXE47j/n4PmqXcGkVdppwzYF8VC2E7hJoJIiUJZxlTEEzUMVXzjYxH/NajTYM+CPB3G1XIzeC4xj31pdFIHDkxBS1avAGtAibGjnykPNADU9RXGC7ZvhbRdWEDSDNM8UBT5hd+43jk5OTUyFfmm+fh/AJvMvxcRdpBctm4+lYfHv+w8UEOyOqWvaX8tIEz3ZR/ZSe1nluaBosgvPZb7/0pUxJNL1TuD7BlzhmTnVIA4aFGFTgVUoPxEThBmzAz4sCAf07LtkbIyWeTIUpcdv3akfZKc/EM/UYy2WF/Rfx3xK5UBaLPNR0BPrD8ZklX7HY/neufk5LSUaB7+n2n8Z74d6+k2luT9pcCOjaR2JP/o7zWvazFvFM9LoBTaj9gn9/+LT5eodwaIKWYVqnoUr6Y4UCJMI6swX77cqCIfssCsxEvjraHMAGKWDkDy2cgflpgieMKOGCXEguOiCgsCa0GKUp4KJ/WXFA+bkeJ2r0L7NJtSSAlT+aWmOIbrnZOTUwPTYvn/bBsTXeNm85fMIq+pweqrJVBd1rdYP8uwIB/LU7AH7Ad7UtYHQMv1GExxHPf/Fely9M4gv465PKQcP86WfCVOc1Oy4K8IaswQTUxhEDQKFRb/c1331ZQJU/yOxxdIlTUiqRGZWGcK9hbbszZpirZno34JFQJ1pEusz6mxyNEYKJKNUwNQsuCvCOYD+Z/+PJIWC+DhI3KZvP8sbEMVqBy5dVvN7Wf+XucuYn12+zPIT6Wm0pKr3+kilCz4mwul4ZkiZMIskVXiKEfGl4RXxBysUqOIaVyycuYUNBQUZIWyHWWakyrmqGSRUS56XaGqWd8TaP8wpzHObeRops5zmRN2HKSRXO8aB6Z7laByd1osmgsX2+6oDRbq/w0iafwrISdXbLeSeoo89cGlrGTQ/4LOmg5nD62wFxfpgB0GaST3/8VYiN4ZMEgYs45aYyGOu8xhxCwMqpZypK5FQ8zyFapHG/n+IXyajsGf9mEhfXfUDyazcv0rlVlwrzIuX3daOBXx1shQVOZofCxEXulP6iXv8iAMwUdF90+gneW6W7+2O0qYe+TPUV9EQ7kUyJ4MAKu5zA9q6DB6vKNwJr78M73962h85GVl6+bM06DE8pVIXwDrVImKeJZSEb+Rggz5dcfSBaW4RGVpesi7PvD5id7adkd9UXnOn8MxH8CWoz2L2avhi7Ej4JuZkZPbzAzfa6VPNrvxLwWkMkLeKB98qJxLwYu9v5JBDV5QHomjv+mLy51IhXyJ/OR242ssK5KBkSHNOxzVBn06/yOjKXVS/D0/VoC7PyhHGRbXz7rDR/7qiPLh86WLWScdIX13IU5advJSgzcH4GhsmEyRGqWBBmWazOW02/oWrKRBTJYXmjmnFwFOJZrFk4RnKU+Nx6TI+yLZgEx2jsbFleP/YyYCq9TJSNTJYPoZd3DUHR78OaoKOoFkxMItv/GhcipPU8qCPl7Rzw5YbH3WaFZKHA12KuSNUBlvjRJeZ4Egbqnl5GMyS1OHox6A/pWCQFmP5Y76w4M/x6KD5xsYOxM1d6xpiaORURQ8pMSAIwYdFgBmgWAMTC5pdA+BjFMxbxIiL+N+Ka/LZCCUl5PJLk0djpoAOhjTDFrArKMx4MGfw+EoRBpMgLJAI3l6Ox/MZOUIXtJ12x6P4VROZfwRnnEdAV+6npCVUxbxGHl5ORwORyV48OdwOAgLGPJBBMiCCws00lEnBngxyDPi7zjJW9bt1iTmfTpVJvDX+GXrCU9n8TmRge1LPufIZOpwOBwGD/4cDscspMFDGlxkAYcEIRyBsmAkBixM8bsYvPBOjxHmtztVpoRXKQ9T3lbiPVKTEX8byeFwOIqw4o4X3nHhvh//l7gawsOfeD2dD7/XuhIf6V8VVjUJrYok6+k35RzRUUfHy9sycb4OJ3THWzRw3nDwL3/7X8dfhXDD6F+Gu179qjAw0B+6T50KRw4fDmPDI2HD+vVhfef6sKa9PbS2tIbm5tWhaVUT+Q+e41u+OJjKQI8FzP9dfPOD9DLm0GftN0rtSV70GXOUpqamw8TkRBgZGwsDgwOhf2AgHDt+PBw6cCB0d50Ig339YaCnN/zUJ3r0YALXu/rD9DglBhdGMcjYsH1H2HrLN4W1W26Lv3TUA8Nn94Qz+z8X+o89QtvIfwTfbCUlx+IjtZX5+v8HHnggTEi+q+dMOLBvf+jv66Pf72hrCy0tLaG5qSk0CWUyzfn9eskU/dU09p/nAfUPMzNyDhCanJwMo+PjPA8cF/+/a+fOcGDvvtB94kQ4evCg+//LxEL17iNvXc/UR/4cDkfmzIHMqSDYw6hTXIcjQeB38473eeDXAIAMIAvIBLKpJDdDmnc4HMsbHvw5HI4MFiAwcIgBBa/o46gfRvwcjQXIJJVRKjvAUofD4TD4bd9FAJ1tPEnOd9jfb/sqXO/qC9Nh02MGEunDBVG3737rp+Mv9PbBAZHprl27mB47diwMDQ3FrY7FxOjoaOjp6Yk2p9hx/1/FXAiP/sm3ZzaS0SqheCvY7MZtZ/GR2s18/b/f9lW4/58/Fqp3dtvXg79FwEKF4MGfG3+jINXhVJezhwtkHfmXfvdn4i9KTgRB3zPPPBP27t0bent7WeZYXAyIDR09ejQMDg7GkvLg70t//CYN9qLtIJ/ajNtO9ZDaznz9vwd/Cvf/88dC9c6Dv0XEQoXgwZ8bf6Mg1WEjyNN02kYBX/a2z8ZflJwIcPLkyfD000+H7u7uWOJYTJw9ezbs3r07HDp0KJaUB39f/OQbaR9p0Ae7YVkkt53qILWd+fp/D/4U7v/nj4XqnQd/i4iFCsGDPzf+RoHpL+UInbURvyTFreAdbysFHGnwB8DBIwh0LD7A18cffzw8+eSTYWRkhGVp8PfIJ9+gt3gt+Mul6jfUfhyLC9iM2Q9sZT7+34M/hfv/+WOheufB3yJioULw4M+Nv1Fg+ptSpseJDu94e+XgD+jv7485x2ICJ89HHnkkPProo+HIkSMsKwv+PvGGctuJdoP1lNx2Fh+X4/89+FO4/58/Fqp35rf9aV+HwzEL5liw4E8TZObGhg0bnKpE69atCx0dHZHT5cjLyeTncDgcRfDgz+FY5sgHCvm8LY7GRiapuWSZrDscjuULD/4cDgeRBgfMy2J5zWjiaECYiEx+WFJZmgwdDodD4MGfw+Eog4Z9EiwgXrCYwWOHxkcqK6FMjg6Hw5GDB38Oh6McMV7IgocYSDgaG6msMnm52BwORwE8+HM4HLOBoMHIsbTgsnM4HBeBB38NAjzCX4Zkjo5lS3N4mMyCXfFXa5nVxgrgk/j+OP4VA8jesTTgslqayPvWVIrZfM3M8Te4jPE6lph1NC48+Ksj8L4ivLMPL2dlXtIUnKgdDT2fAjqRO67UAKjbzDqN7fy9S1cOUv0qA4pdzI0LyKai6GroJByXDPOb/C//ZrlR+v+I2RmiXg/ypD7f3f/ShL/keRGgQdj8X7Z40/inw4tfg5c8D4Tuk/qS55Hh4bChszN0rl0XOvCS59bWsLppdWgSGeBFz5QLg0UcoSSDWooCASDcEvxO1vcLpZcCT01NhXG84HN0NAwMDYa+/v5w/HgXX/J8qqvLX/LcYMjrL77mgZd1mzwv9rLQxQReBtvT0xO6RE+mp/HC8Cm+LLa5uTnccsst4cUvvov74WXSv/RLvyz7TIcZsTO0H3oBO1mBL12IHgHWrwce+L5w6623suwLX/gnfocYn0tD/1DP6tWrw+te99pw9913h23btnE/wwHR269+9Ynwe7/3+zweABW85557wp133im/+2aW/dZv/ffw4IOfZ34Vvqwh9orjglpampmiH0hvu+228L3f+z3c91IAvjz00EN80fOuXbtYlr7keZb9RLuBz8h/59ftZ3GRtx+zm0vx//fff3+YknxXX084sG9f6OvtDR1t7aG9rS20Rl1pEjmqT0zlh5SHIeohU7OFUv/160AztKnpMCG2Ozo2pi957joedj35VDggducveV4cLFTv/CXPDQAosxm15UW141baggqPucAAC1kVOkpU+LZeC4q1sp1mg6W0VFDqheSwnpWVtjgaE5BvPbBr124GZPp94KgzkYaGhhj4/O7v/m6YmMA3EQzYDhXDSQO6panZE22KI+orwvj4ePjVX/14+Nu//buwb9/+bBvSMTlB/emf/nl497vfE3bu3MkjA//4j58LP/zDPxL+8A//iOtaF7Ph3/7tofAbv/H/hfe//wNaEGHbDda+PNUC9ZKl4+KA3gHQhJWmF1xTQHIlX4+8lXEtKwdK54HqUoqSDse0LIn/JUGOazHvaAx48FdH2Gd7eJUTr+5w5QMTyQxOFvt8GizfynQ7jqIGme1fZdK2oFYNALMTLkYjsUQHhlRPrrLVnIRZvq07GhuqWjUBRgow2gclgb7g01bf+I2vCd/xHW8JmzdvzuxjaGg4fO1rX+MXL37xF/9b+JVf+aXwa7/28fBt3/Ytsh12JPa0qim89KV3c/tHP/qL4Zd/+WPh1ltvCf/8z/8STp06FVavxohcU7jrrrvCb//2b4V3vev7dWSdIw0rJUD8NbYJ39D9nd/5HWkPjglaFT7xiU+Ez372M+Haa69le0D43u5nPvNZCRx/MPzv//1X4a//+q+4D34D+7C2//zPfzB8/OO/Gj72sY+G7/med7COqqGGsnMsDPD/AE7C6iuj/4R7pJONvh0L/C+EyjKsxy26S81g5wGDtZdpXEcBE93DMpY4GgQe/NURMH4M6WN4mycenLzECWQQI2OwJQtSjPyBMBrIhYaYGmRtCHVZu2DyNHiBOoISZWXZPkhZnG13OACM7F3AyDZ0SoIt3Ca1T5ndeOMNPDkiiILNYN88sF2DOtxaXS376ok1BUYUm5tbIjXLcW9k+Q033MB1I9xqPnPmTDh8+HA8Xrz9JnVfffVVYc2aNeEVr3iF2m8k1J+HtdfI4UhhOrFKCPpjAaCB3lYdPFOlWEY/rHuVb6s+sVbLpDBfn61qnmWZ41dy/19/ePC3SDADVIuNBBTYiMFOKpjTB9KRAh0twM/O85j6sWykOD7yWQCIdWzPtlWf2EX8kxayTPLZLQsaeymvzkyIt+GS7ez9HEh5Fwl1ar2OKxGQ7blzmDequq63ahWY92q2grQosENZS0traMNcKcyTlX3zwGhie3tbpPbs5Au9xHpraxt/39bWGvV3FctaW1t4bBzX0NnZyeMZIdDLA21N241jOq5MZP4p8VnEHC4LOmHgnDbRefpJWXiIeEw9D+i6+vq4DQu3lbZXm9AhzZfqo1+Pvp1/tp4SFqbcZW6gGksjlep3LBYaMvgzQS81Kmt7slQCT2qr5QTBAFBHB2AggB2Hhi9Blk3mZBkCwDjJk0EgAzMNAKtNFnyei/VpO87HeYsa8DFF0Cd9QWDI0UwYfiTLV4LUVFpivSyP+aVGjosDun+OD5nM8AEM3HLFHD0AOoUTJexFA8HZgR1G/To62jlaCEJAlgeCvrVr12aE0UUAx8f6unVavmbNWtHPldKmVRzlA+GYCBANaC+CRG1TWxZIprD2ghA8zqXzjhKKbGgpUFnbk6USoBcG3gESPdTwSJAcF8SLfF58xzzK47qS+OMaLBqIgsrPN+bbywYCckQwTdYLgHqyJR6f5Ul9S4kaFXUJ/ooYtFTJAjHLp9tEd2OHY5oDTiitGDmIowM4gWAEgaMe8XgI+PTJS80raeCH7dwW86Xt1SerDynz0gabu6ikt+lAOLlaSkcgfa9o/AnPUl6iDkstf6WQI4T169czwMMtV8z/Q/rlL3+F+Y0bN/Kp2pe85D+El73spbxNmwd+i9G4devWMcUIXh4I6jBX0AhBGwC9RB2bNm1iunHjBupvU9Nq2W8924YUxzUguFy7dl0MJNcUBqQIFtEOpAg85zrhLScU2cBSpdQf5f3Spfh/Q+oroSf4SXp8UgwA03VceNsdmLJ9q0pJfUyVsot/jmAiTQcDSoEhTgDu/0tUL9Qs+CvqbFpmQs0LeSlQUfuNqMRRozXsKQEnjrZ4OwknL4z+8epPdsMv7HgIsiwAnJ6ZYR6jIzPIz8g2ISuvBbE9aX3WDinHFSxeL4HbcHBmXJd+NcX5jLgFDMPPG7/xhrzCX8LDPG/T9UanovYbGYrKliNuv/32MDmJV7tM8Ine06dPh4ce+nfy5dnPvpmvasErUrZv3x5/UQJsyII6BHBr1pROrIbOznVhy5bNYevWLSQbyYOebt26tYxQhoAO+S1btjAw3Lx5E/c/ePBgePrpp2JdGxgc3nTTs7gtBU7uGDXU4K+98glvGaBIx9OyvI2k641ORe03UnemfS7y/wZ72EiDI+wX+ZI7dnahD5LzgZWlF+LVJquPgWc2EKH1M9jDhT+DPiUMCqyIefCAi/t/9hcoKqsFqh78VeponjFpvhJR6RqM2K4Cw8uG5KHJFYCRhHYRQasEgBj9y0b+ZDF+aJClwd3UzHQcFZFU8lk6baMl1SXUYaMyU2l9yEsblKZ5GxuEPiGo5W1tOZGyf9nclsqqR66Bd7yiLOer8bpIFvWmfFvzVKTv7KeQIb++nICgDiN7uJDAq1fGx8fCyZMnwz/8wz/wPXdzAcEfgi2cVBA4jo3pLeMUeO9kf/9A6O3tCz09vQwyDQgWr7rqqnDNNdeQYIcY3bP1q6++mvTf//tvh//zf/6Ro4IIIDEi+fa3vy3cfPPs4A8nd7QJhBHAuXT+SkUl/a5kD3NRkc3Vm9iuy/D/htUrcHEcR/5kXX6aBX4a6El9kXA+0FTPDdk6L8KrSLGuUv2gOBgASgYAeOGPi/4sH/vGi38dba8Ecg28c/9fVVTVGxV1CpTvPNKUeWUClrwRrjJ4pZGUNRJZ+3VOhvaNtg+CRZdf7HDEAAJow5wgPIG4ulmvksQ68Fsz+jTomkTgNTUZJiaFkMqJjoTRkioTXtxsNKvOCS0bj4Q+4Za2kga3HNkURwAHgLQMxp/IL+pF5GOqF41IhXoZ9Znbrf2xLK/7SI0MaX454aabbgrf+q3fyhGz0dExBmxI8fLkf/7nf457zQbmB+Ll0EaYM5gHXqaOp3gxogj63OceDL/+67/Bd/idPHmKgSZeHo2XShugpwjiLPhTuoovggbpwyk5w47ALWgLAJfjyF9en42KbGC5+n8DJg1YgGT7XSAPtL8IqjAAkBHOCZbi3CD5apPVxfqmdV0v/CPZ4ISQzWO3gYDV8U6Q3tnSaUBlMP5EflEv3P9XFVUL/qzxacfSjiKfCpYMlNSYlTIxywvZlUZDEdoYyfrDfsalEsz42+SqD0ESjASvfdGThD7kwRE/MSackCywGpMTHUZGQHiDOt+iLidJvEm9qoQ6eDKOaSzTt7hb/bI+ruma9o7QQdI31mMkRW9t69VgJWScMz2BPiQ8nsX/OtMsnUzaaLrMfkQdJ0XdT+3B8iDyIabLDbg9+5a3vDls3349LyhM159+ehdH3YqAiw8EbgjwkGL/PPCKmDRAPHv2LINBCwjxKhi8BxCEkQ7YnK2DhoeHwhve8Ppw7733so0YuUFgd/DgodDb2xtrKcECP3sCeTkFf6kOG+X13f1/KfjD40JZcCQLeSSE46PPFugxyIqDACB8RYMkugp9rSZxwAHEOjVv7SDF7WyXpJzPDpIL/5bVpWlNfAjQ/T/T1B4sDyIfYlotVCX4yzfeOmSUGT2iZWNUXqiyzu1pWUozDUKxPRRsFG76FJbZPgwaSwp7HQXMILvty6H/FXKcGPwh8BNDw2jbmARVoxJUDY2MkAblZATCJ9RIgwO1IdY3FPpjvn8QdSsNJnmU41N1oHVr1jIA5OimBLjoa4oy/oBtpi829B/526jyzxPbWqDTlpquwBayvkYiC3LplY5Tp7r5BY+HH1b64he/GO677z5+bo0jyvGCBy9U/trXnoy/KgGj4cPDwwzwQPakcIqREdz27eetXwSJr3zlK8JHPvIL4b3vfQ9vBSOAQ1B45sxZkdN5nmQRIJaCxLM8jp60V3Bf/A7HRD4PC/pARU8fX6ko0uGU3P8r8q8jym77SnCE3xpPpqUePQ9ogDXOuzBxECCh0VoRLsZwLor5jMq2a75DbAAX/3gy3s5x6KP7f9WVevr/RQ/+ihqfEjscO50JNabGmEu6ugMjG4GS9uSFaYZPnTaqgOyBD14RReOX42JOHw1+Qo1qWIK+4ZFhDfoGEYBJkIXRDqG+KlNWj5zs+gZAyGObrWtZb3+fbotlG+RkuX7dOn6zsqVFv1U56z1seR6BfaYzUVfy/G4IsvZUIOpy3C/VddMVpkLWVyOyIJdeyThx4kT4h3/4P+Hv//4fOMfvS196lOX4UgceBOE0g0hFt3Qx9xTlIASBsJk8EDwOD2O7Boh4uATAhdYQLmgGQBoYYgI7Rv/6+hAslsiAerAfLnZwLNSfh74fsIW6jpPdchj5K9LdlEzf3f/PBny/PRErR5DjXRBeaODHuz8S/HHazQQGAjT407sskeIdmaqR1cO6kObKuJ6Uxd+ssTs/CP54+xcvZHf/X2//X7XbvkDaGVDWUUTzkQF5ZmblYF66btvjMRqGzNjRpwqGD2POrmoqwE4QOieidOWXGb0YOowdBsVRPznhaACoI2x9gxKYVZlQh5EFgtxmeSEGiRaQYl9JEaSuW9vJeU/4ugIcQP7KDyCXcIKs4ADsijo1mkahMv0UneU6DD5dT8jKsytbIeur0XICgi2MtOFEB0LgZcAtVt7q4pPAk8LX0jYDysblhGhUFIzhGLAj3Wc8qwPz9hAY6vxCJfAf8kMewaSRYQIXY3Ff/HZGLtLygC5Dz/EOQsznWm7I63Om5+7/C0HfL0TI73F88AEBxOS03lrF7VRO/RH9A42OaQBYNvJWLUIdkUZinaXATynbnuTx23bOa9cBjqKRP8D9v/bPqNpY1ODPGpzvBMg6Zx0tEyAMPBq5EX8XDSozKgi/UUnaR4MHQXnN6M3w43olrG/rKL1rbMOG0Lm+k3OGMPG9TYKmlta2sBrGg6snBIpyQsEj9SsxTwQGJekKPCxSRUIdeVoR27Ai0sqm0jr3wRxGvMJADH7rls28ZYZXaOSN34zeHICtkyJfl4IOZPpq64lOz9LzxAZsX/YxR4ClVyrw2hSe8JNRH4NNgcA2PFEIPuWB7QjujIoCRI6gFOwD3mLOoL5iZpKBHcpw67cULCoZEFwiEDVK22tAWxFYUqtX6EXdlYxUV/OU6jgp0X33/wrcIYHvhy10Sp4PDK1bGzriS8bbOtrlXNAWWjGKJueDZgRUuJ0qaXNrS00JLy1n/SRZJ2mZlmO/uN4ieaFNm+D/Ozn1x/2/UGIDti/7mCPA0sVE1Ub+0sanncs6LExgBGzMiAxjit9F5mUGBTJlaFAypc1Tto07FgOC2LZ1K18rcdXVV4dt264KW2R90+bNDAo34H1iG8QhdHZyojlS0FpxEGvEQaxbh/V11SXUwXqkXlkHYR0pgtVSu3R/tI0vwsUt37US3IrxX3/99WHrtm2zjR9LyqsCIvsamRJdTXU41e1Kuo/UbIS/jbRccN111/EWKV9gLoQ5dH19fdy2c+dO8kW3zUh+Nl94i2xGX0mBQAz754FyjNDp6GLpOGCzBoa2bTry/3y2rtv1NjGAwM72R51F9eH3qEMDwOUjSyDV4VS357KB5ez/gU0da/S1QlddFa6KT5Nv2bI1bN68Rc8DmzbJeUBo00bJ42Xkcl5gsIjzQ+1oI9qQrUv9TLWsfJsQ2odzl+S3XbUtXL99u6RXuf9vAP+/4o4X3nHhvh//l7gawsOfeD0br99j1Rc0YoI+n0QCYQQIw9MmkARpo43YOaPYyQ3bd4Stt3xTWLvltvjL5YmPvLX0tBcwMDEWuk+f5tA+53OM6S0l5DHUj1eq4ISDR+p1JMQ+96Yah3y1oTJXudMeox6YXsCo8dQy5ju1t7WH9RIc4or2vJwgT3Z1CZ0Iz+zeHR59+JFw30+U9G45YvjsnnBm/+dC/7FHyLvszfiRjLcpVQOprcIpmW5xQjOclJTDeUHsL3/7X8dfzdbfy8UXvvBP4W/+5m/ZT/1CDG4RaZ8tiMLI8Y/+6I9kL2g2PPjgg+Ev/uJTDNCmp6fCK1/5yvADP/D9cavi/e//QHj88a9qf6S/99//zvAd3/EWPsn7Pd/zzozv8HP/83/+j9DdfTp86EMfFp3WOaqYl/sHf/D7PNbv/M7/DEeOHFF9l/Jv/MZvDHff/RJuM/zN3/yNHA9+U2X5ile8gg+BLAR4z+FDDz3Eh2J27drFsh33/xVT4HL89mLB9Cgl+n0j9/9lKLIfjC3Dv0OP8VQtbvVypBoXH1JeurgR3go/M17jx5JWHdCfmIVDgCqZTtlTvCCcA3Cbt721jXP+xuU8duTw4XB4//7w5NeeDP8k9ur+//L8f2pjC/Hbizbyh0YYskbB2FMFlYbA8G/e8b5lb/hFwInC3o/HdyM14dUvTbxlKpIXkjQ690xBhHBywW/tVmy1SE/GSLVO+4oHy7GOk0084eh+SFVpMaqDkUxc+b3gjheE5z3vebHXyxewAdgCbMKuEovsxpDmr0S8+tX3hne/+wfDjh0vm+XoNm3aGO6773Xhx37sR2cFfvPHbD7SUZK/JgeUIp0tB0VpPd9Wg/1k1k+vQKT8MX65/58/8Ex4i/h9TvHB9B7x//Cp9K/0tfCxWpau82XKLK8eoS1pPZh6xDKj2F4QzglMhXDugM3iHZnPuuWWcNeLX+z+X1Bv/79oI3/WMHOiSEnoCIY3Y3rbaz7khh/xvtdMcV6fPcGIpwftdRV4shC3vUAoRxkml2Nf3GqyKB88BvKKUg2YvC01PaCeiG7A2OGw8GoLjHDgNjBuTWzevJnD/yjDdvQBr8441PomHme5A1eAez7/c3TwvPqzVPia8hhIbW6xYLoDXVrMkT+O1sU8ISuldc1dmspeZKey45ZQVlZ5JSLha3E2Q7kIdIX/Y3m2uWw/oLxgVRzVvBQ0+sif+R7qStQlkvv/inD/7/4fWKj/N5lDBxbitxc1+Esbkxk98pHQoLvf+un4ixD+46YvhT179oTDhw/TueElq3h1AiZZQ0Ewkdrm8dgx0noMab7aSPucCiZVftwG4sstMYIXr+CwHSkm7uJbofiU1Yrn/mQ80vLEK7d+mSezvXv3Zl9XgIOzSfQ6Kb/k5FLZ10v+l4q52mQ69NOfLL0Y+NE/+fbMtjJKnIDZW6p/iwXjp9nofJ2Io/pYCsFfqkfu/93/Xwzu/y/P/xsfzLbm67cXPfgzIVmD4ACsIci/9Ls/E38RwrtfNRZO9pwNz+x5JhzcfyAcOnQonJV1GD7muGGew8y0vieHv4/HBgExySBbYq46kB5bhjnjA/kE41+lr3XA00y4bQvDRwqngL6jX5hwDh5iDtxL3vEpPd4yxQfe2BL2Hz0cHnvsMZ4Ejh09xlfE0PFPifHjCjdV5Cj7esm/EFmVpbqLWjE9NR0mxsbCOekTMNjbV2b8X/rjN6mxR5tDPrW1IptbLBhPzWYzJxKJvPfgr66Yd/Bn/voifnuxkOpQqksX8/8z0t5ndj8T9u3fFw7s3x/wzWXYPR+kibqYHVNIMpl9oaweIPciH0GY6wbegpqEzzwXyDlTX2mlvIffH5PABn4AU3XGhofd/4v/HxCf+Nhjj4ZnnnkmHD1yhP4fD2Mx6If/ER0w2VPeDSD/IlysLRNj42Ggvy9MxjcGHD148LL9P+okb6KtZT67nsGfkRmuOQHkX/a2z8ZfaCOmwvmwc+dTdGgIAnEFgIcc8J4gBAAwlkwJpCM4BsRPXmf8ZknMVw/SY/2PKXiykA9CmAdhLy7Ogj5c/TXL1R+u/CT4m5IrGXxBYKCvP4yI4WMC7Bs/8EU98DKFKeETu58OX338cXEAe8IpufrnO9fGx+QkgMn7cATQI3u4pX7yT8H6Cc3oemyXtSbbJ1D+o0PDYUJOAMCAnOR+5o/1aVbgi598I/UpNXrYG8si5W1usZB3IrDV9EW75LkHf3XFQoM/BCD5E0m1dcjoUvw/cPx0t/Rpd9i9ezcfvuGXLOD7LQDAceLxQbSvxLaIWQVVQOSbJsLnyEvap/AYgZ8FfBwFFLL1sdGxcLr7VOg928PRzcH+fvf/Uf4YAPrqE0+E3aIDp8+cDnyfp/h+CwBNnyj5eso/gdYm7WAqSKrXNpYVhbGRkXD2VHfo6+1h7HDkwIHL9v9mD2Zj5q/rEvyxMknN2PMpbgXseFvJYVkjMBbyxJNPhMclADgmTm5IgqPh0RG+V8ucwHl0ypSAXDVHwGxMYqZKgND4J9Ef5uuooDC5FYEfjF2fcNJh/1Lwh/Wx4ZHQJX07eeKEXAH0h6mJyfCmn/1SPHIIj/6vb2f70z5l/alR/y4X5I9mYqL8Yh76Isvd/6V028fkjzekPbHzyfDYlx8LR49B/kN8mbWO/kL+0J/6y9+AeqxqZHRuW2wX1oWsbZbiim9YrmpHBgbFOGdmBX+PfPINOsRvxp9LwT+zu8UG2ggyJ0KbNUdCvuuFF2TpwV99MJ/gjz7b/LVQekLJ++3FgukP0vn6f+CYBIAIALq6uvjyYrxvkSOAYivQQRw7G/kDxd8B5WvVhXox5bPekoNdgs82CBCDvhj8WR4+/9DBg+HY4SN8jdHI0JD7/0T+xyXow/n/eNdxfr0Eb7zgnb8kkGkE+QMlGWmqzbJWaPuYi+XAsAT8J8WGu+X8j4GAowcOXrb/Z51C5rczf12v4C+l9ORhDdnx9mLjn5JK//3hfw/7JCLGlyHwBYvR0XEJ/nSCKwMAOQ7rESeCNrLzyETIalWB7kJAKggzegn8MmNH0BfnfGAEsKUltOKD1rI+LP05tP9AOCwO4HR3N4O/b/85/YQV8KX/9Sb2h/3Sf5oCMVkyMINHhn8xFb699L+UbvuUy/98ePiRL4a9+/fNkj9GAGdmoFP1lT8R69RXj6AtkkLfMccp0X0St+l+E+PjYbC3Nwz19YeJ0bHZwd8n3lBuc9HesJ5SanOLBfIRfYntzuw2sV9sB6tf/g4P/uqBiwZ/fyR+O9pYqj95PcL2aulQme6nenQJ/h945tChcOjIYX4VAq+30gv/3DGoq1BF1UemNYTxD4RzAb7KYW9baEIAGAM+PO1qwR/43y/2vnvX02HP7mc4CIDgz/1/ufz3HD4UDh6eLX/chTCdqrf8KSOm+g+LXeyD7JVUaRloqH9AAv/D4cSRo6G/r3d28LcA/1+qs8GCvzLDx1UfyoUpc40cHDx+LDwtBsJPgg0Nysl/jB+wxrvt7M3/eaZiqSWgyKkgwBNe8YmR261f5O1VLViHAxiSyP/Avv3h4L59YvxdEvxNhLd88MvxqCF88Y/fSL6zR9Kvsm5FNpsRNSRi2y2fAU2GrsS2v+y7Z9/2ATD6e0zkv2v3bn4buCHljz5KnWhDSdeh56rvcFJ2m0pJjRLB4TjmfOCWT29fGBXHnw/+YHc6kiAUr/aKHEBqc4sF4+Us241ktov+e/BXH1xq8Gc6lPnrnA7l/fZiIdWfMh2ah/8fmhiXi7/92WfB8J47zv2D7fO4JbuHMtLya2j+BN0YzgHKx4zf4C+CP/A72i7zkXrPng27du4MTz/1VDgiQe7QwKD7/wL5Y/AHd30aUf6sEX9SP3RZ05zeZ3ndB3nsh9v8RyTgOy4B4JlTp2YFfwvx/8YLrTfx2ZcY/Onzw5cJa4Qhn7dlLgxMjvN2Lz9xI7ShU4hpp66nZNuENkreiOVVJK2jM6wX6ly7LnSuWxfWrVkT1nR08MPVeJSdt3kl4IPwICj0HwrB4Ws6w6g0kuZBLoF3xioznOhkEJBbPlWIuhLahTbiYsHyQmg7ge5EHcjDvuAADIzgO8UDwtt1DSt/yB2ENlEPIH98wSTqQEe76EFrG9/TyKAf78Gi8YouoJP4Z3wpgHJJFuhARD6frlcV1tY52utoUNRYdnm9nKWzcbkYMM0DLwTuiJTPp8SyttJ2kvjfqhLrQF1ttHOQvZcVfr8Fny1bpSN98I3Gf94ZQDCA4CUGMO7/y/0/gG8AZ3wWajj5R9mTJI9zPr5ZXNIBIdzpa1odLwLiRQH4ITC2CIe4nodySZac/RjIx2T9crEowZ8hbRzzslheM5oY8P4iYFKoTyLjvoF+Pu2zcf2GSOvDpg0bmZbKhDZgPZbh8zEWCFSZrB4NACX444l/LU/+UL42cQZ4vJ8vZxbh0wik0wj6OCrE+SvxCkHKygDeGAFQlGhIZuzp1QDzjUBJe8qcgWk6kO9bhBn/0Lnp0D84yBHfRpa/1Z8FhFJmAWH5hYDqgj3prbeFIl/Y4wJE3mT2gyW1JbOhWiA2Eq1li/lXseWOBkEqq0xeNRRbqqfMR6XOdDenwub/DXjID8QTvNhR6WSPfLoeyzrSdSH8ppoU68lO/G048beEthj88W4PbF78IUcGZUHfMTqEkRg+vYzRIKy7/58d/C0J+eMiv1QnA8KCCwH7fj15Qr6oPlRE5E1mP1gsL2lmQ4uIRQ3+DGr20li019pc0Ha86BFfy+wfHeJtPqUhBgI2wsYTa5LXERekcuKVEy7y6zkqUwNCXUIc9RPCyR7EER+c8GP0DwcAg4ADwNUeDR9PLoE4hK3rKTKeAYnh2+13DAVzONiMDbfiG4Fie6x9aKtdoaYOoKx/EXiv03A4FwaHh8JglD9k36jytzalbcOIo7YhBoBr7WIAI4CtZQHgnMYPpLYiVMSzWgDtZFvRXGvyRZruaACkshLK5FhjZHob9ZgoUGP4fwNegIGRH37WMo4AIcAqG9FB3ojbS/lakAZ8JWoT+wbxnX5ywtcpPtEnSjAE/8fgDxf7uA1nt7/lnOD+X/2/Ae9AsNv9jSp/1MU2ZfXGNJJeDOgFAQNAjAAmASABnlRCaitCRTxbTFQl+LP2Zo2PHckDkf/IzGQYHhnhfX4jfNN2RIhRtjC4FPXHqFui8CydFZlXkWK9FLSRKIMKXJ2AzvXToX9oPowf9+Dx1No0vskrKZxA3vhTwGFzEUUxxSm82moUStpm7aXxx6US8DZ7GHpm9Bk1pvxR51rUI8EdAry1HWuY75SAb90aoZhiH1wQtIkzaJaLAfAIrwSCU6TxgzcFTiC1lcxeZptN1ZA5bMtH2WVtnd1kR6PARGTyw5LK0mRYC2SqG/U46nQe6cjPuPhGPOEJwgt+kdooCtOYN0JZq9hWq+VtnyqS1in1Je3ga73g86Pfz277Rp6j35wHFuf/4s4PHghw/6/+34BXu+grfoQaVf5SFwZ4QFYn12PAVxr9k1hA9sXoH2MB4QveEJLaYJE9praS2ctss1k0VCf4A9BoowqA8McnxjnXw2hiUh/zBmHdAit8MqZVGAzGZoRtJgAKI9lWLbK2QPGkTpzcVdDxyk9IDUKFzeBPjF6fWI4PBBSM/GW8gk4I0fAx3B+H/OkA8kbXYGTttHZTwWN/inQBb/I3Qy9R48oft3K1Tltv1eBfSK9SEYwiSJSUFwXlc0B16P8SYLzK8atagJxSZ5TP2+JobGSSmkuWyXpVcQk6nJ78cWGMp/rxeg97xQtSC6wwioK8Ecvweq2Y132aqk5ZfZZHGil7wAO+X4iQ/mO0D36/9M662SN/Ga8gHiHIaTn4fwPlTx1oYPmndZH0vK8BqcYBpYsDHQiyi4F52Z7xKsevxUb1gr8EWRSbg578xeCn8E4fpNH44xWAKULGaJLkJaImMV8KurLyKpEKXSd0ct1SlEveHIAN9ULY6Hv5nD996OOiV35QFhvyT8iMLL3aqielbUopG/qn5RcDX/JgUBxlvlTkjzwNHQFnvAhgUIhgEFd/HP7XBz+wn00AxtWfesLKqGQrtYY5K8oPTWYyd9sd1cN6zC8VwhQI6GEeeTmZ/BoBc/l/Ax6Is4fiGChFX4m8+tTS07N8cXKWTwj+t4pUXl9pHWlG5gPJfz1/221f9AdvB8BToO7/1f8blpb8dV3f7atkwaGNBIPg97OLgowfc6OW/n/Rg7+KjUdxrucY9UHEzxExUBQ6Ugger/dg0JQqAJkZSfIlZag+UZBsg7ZDn+bUcn3Jp7YnMwDpI+Zp2tO+2jd9ZxH6l8L4RvXAH52HUplR5dYbgYraaKTdASdm60ZpNFRlvHTkH2UP47aAUIhXgDYCyVHKGPzJPpgPQ3YoS2YDhRVNp8KGKsBkpiu6TuJKLHfUHGvXrg3XXXdduP7668M111wTSxNQPFFWBTKsFebr/wE898o5cTFI0tEx5PV2KfLqW2LAgblvsg7btwCkFpTWB39vgd6sNpgM0GE5AXDe3zm9/XsuPvHr/l/9P7DU5G+yB2kwGM8JRhb88RxRignAjsiQ2UBZRdOpsOEyUbWRPzTYlkqA8DXaF0GTogJkJ/8kL0qRCtoYSoHUiFiftAGBgOWpCNk+5QEgpI35HWi/BTEVn/Y1mGJARxIjwvEstXwjUNqefLvSvhSBV3ci11TOS0H+XI+yt4sB3IIoBYMYGdR5IhyZFAfQtFJ05hJG/oBLsZ1qgDJDigUytNRIFkf9cO2114Ybbrgh3HTTTQwGU1A6OVmlMkO+lrgUHU5P/rB7fS+aPiCRvT+NZVquL9YXkr7QDzCN+VpQrI9BX3I7VtuUrkc/KP1KH/jAK1/0hfCzg78MJiZJM1my3ivT/wMqf+HTEpH/7G2lc4QFgjgn2B0fnCewHxgBtlwMl2I7i4GqBH+X2mgIXwWLk75+RYDRvqQ0mlQZJMU2u9qCcqVGmCpdtYj1iPBBaSCCbSZ8DtUnvwHYrzikjb6YQ6gE+WVpSY5j+UalsjYmSyUYP1T2ypelIH+TeykIVJp15ReDQb360zbOwY5CVNsBFCHrM3Q9l3fUD5s2bQo33nhjeM5znkNKUUle9ZDZfPw/gL3N5oso3Zb1j6Q2RX9biyXWR4IfYN2xDVxPtgvJv9g/9V3q29z/GywAhvzBI5NxnhpN/ip3yFzPAyZ7nI9wHtDRQAkAY17jApyrKvOiEqTXMbf4qNrIH3GRdvOkjhM8BBxP8voSTJzs1UhIiWJgX2U8GAmBgKQjEECVSQUPIUYjRznWRbDaDsuroNFC65cavwU72reKMB3RLpL0+Lah8ZC1L2kzMUeTjRdLUv4oi/JOA0AaPYI9IQSAehUY54DiGGXMmQPVs/k5kemYJGxtrs+O+gIjf7fffnu48847Y4ki00fICTahAtRtJtNa4xL8P4DdMlsvIOwguWyd/SNZ32y92qT1kbI6xfcYz5m3ciH2TX0bfRoDP+0x+1UJ+KGlkeyYjYqsfUmbiTmavKTlH0nPRTgPWGrnhDg4AEKZ6MhcvJiFOdRjsbAon3czoUCYehsvEka7YsBT9JmRmyc/G+689xX86PWpU6fCkUOHw+jICF+oi/e44dUamD+FCfZ2O5UMjydRVQitv7Yo1cslC/DOhelpfaULnlYdGxsLQ9IfvMfuxIkT4eC+/fy4c39vXxjs6Q0/8Yel91wt9LN6jYCFyv9ZE58Jd736laG/rz90dy9R+aPf4tS1z5jbqbLHk8rDoyNhAO8tHBgIJ0+eDEcOHgqnT54KQ7KOT7399Cd74/HqL3/jIWWFPklKwkkLUxViettrPhTWbrmN+zoaA8Nn94Q9n/85fc8aAkBLRV9MZ5AC1dId05n5+v/v/d7v5Uv+T/T2hP379oov6Av6iqfSl3I4epL0Je2D6W0toVWqD9AUPsD6r74At7Tx0Bo+Tzk2PhG6urr4ebd9e/aEU10nwrFDh9z/i/9/5zvfuaTlL/+zvpv8EQPgAVacB0bH9cXVJ0Tmzzz9dDi4f384LbEAPvV2uf5/oXxf1M+7LRRsHDsgK2SodSjZFpmLBScg7MgrKVmEDcIIHfUxplSbFMjLf5QxjxVdt8CktL+0FO2V/lif0EGmyxwqaxN8TFi2dOQvWbZDT7YoR1oyWJLk+XsaL3/SsLA+anvRH3VGFkyc2f85bnc0DiCTVEap7ABLGw2wcQPsOWb4DwldA/2BrSOvqYF9rXH/tDrUqykyXGJKYKOQtReEADHrX9KH5YqUByphZvgPCTfLP/KPWeQ1NdRb/siSYjtAOA/QHs0mhbgv/hGW1hd1Df4AFWwUsEoWpbqN/2I+S5kwxe/M2JS5tSBTtih8/sNwv7FSyuF44xqAdurQfySUWUeWMUr8iCl4Qr4ob/if67qvpkyY4nf1kL9C5U/DhryzQCnORRSyNKP4u0ZEqV+aZ18yx6Xr6GP/sUfCwUd+naNNjvoCMoAsIBPTvyK5GdJ8I0HtXFMSCwBYeEQuY/7AYH2tNhk0izL8t3VNua+uEvRvWKTNusxu/3JE5tPjP/IFpMUC5RWRyzSO/HMUy7Lb/2KXDAbFHqEUqV7UG3W97Xvj2KfCnfe+MgwM9Idu3PY9fDiMDY/Eb6au51cb8PJeHfotPUWr1SpTNae3AGsF6F2muOj3Be0f+oqnlznkOzHBr1Xwk2UDA6Gr60Q4tH9/OCnpYF9fGOjpDT/1iR4eA1iOw/43jP5luOvVr7pi5T88OsrbvvhmNW77HD5wMHRD/v39ob/BbvsCZX2CzCRN80itr2me+6Hx/NNjWFKGxlLbxsMcPIOO65/Kn3qCIA86keZlW6onlucxYrrYSPVkPvYP//993/d9/LRbV8+ZcGDf/njbr33WbT/0g8Q+oG/V68/FgL4arO/a/+gDpO+47TsxNcXP1eG2X1fX8fD0zqfCwT17w6kTJ8LRgwfd/4v/f+CBB65Y+Y9j6hflPxqOH+8Ku596KhzYuzd0nzgZjhw4sLxv+6Lh80X6G8sKC6AOulID5BXP6k7TvGLyRMnc/PvsKGGpyB+wqz8zWhbrpln60WhA+4ys/ep8oxNepQ6K88tiuQUh/J3kkWZ9BkFeTpUp4VXKw5S3lXiP1GTE30ZqZCzM/8eMYCG/XwzM5mtcT5PcPmyqUH1afOVgycgfadxPLLFUGDONYJt1v+07J0S4lypfCwCquRTBZJgJOt0tJ2C00TEPLGH5c12IiRY1PEp9QLvLKQ0u0oCDhCDEApFI/J0FLAhe4rrTHAT+Gr9sPeHpLD4nMrB9yeccmUyXGmj6dTrBXzoiXwv4PJvj7v/ngyUtf0mR4zrzsbyB0NjBn8PhqBvguFLKAg0JTCwI4e2JhLJyu1WR28+O4VROZfwRnnHdbnfZekJWTlnEY+Tl5XA4HJXgwZ/D4chgQUOapmSBRjbqFIM7Bigx4LP5mXNSLphZtlTEm4TIy7hfyusyGQjl5WSyS1OHw+EwePDncDjKUBQ8pJQGflkAkw9kZD0LCIsIk5mdinkjVMZbo4TXaQCYl4/JLE0dDocjhQd/DodjFtLgwSgdYbLAg2kMBJEycIlpWcAS6ZJGBZcZzeJJwrOUp1nAB4q8L5INyGTncDgcRfDgz+FwFCINHtLAwgKNNOVolKTMW9CSC/wYvGBEKylzqsCXyE9uN77GsiIZGBnSvMPhcOThwZ/D4aiIoqAClAYf+XwlYjDoVJGKeJZSEb+Rggz5dYfD4SiCB38Oh+OisKCiKNAAWVCSBiZOl09FvDUyFJU5HA7HXPDgz+FwzAtpsOFUf3I4HI75woM/h8OxqCgKUJwWTg6Hw7HY8ODP4XA4HA6HYxnBgz+Hw+FwOByOZQQP/hwOh8PhcDiWETz4czgci4oLFy44LSI5HA7HYsODP4fDMS8UBShO9SOHw+GYLzz4czgcF0VRsJGWnT9/PqP8utPCqYi3RoaiMofD4ZgLHvw5HI6KqBRo5AOTNF+Jzp0/5zQHFfEspSJ+IwUZ8usOh8NRBA/+HA5HIYqCClA++ECaBi/nzmmeQY3kjc6fk+1CaZlTBb5EfnK78TWWFcnAyJDmHQ6HIw8P/hwOxyxY8JAGFmmggfz5CxqUkBDASGrBShrEZHmhmXMzZetOBTxJeJby1HhMirwvkg3IZOdwOBxF8ODP4XCUIR88WEBhlAV9GK2yQCUX5HGUKj+aldKME6mIN0JlvDVKeJ0FgiKLvHxMZmnqcDgcKTz4czgcGYqCh5QYcMSgwwLALBCMgcklje4hkHEq5k1C5GXcL+V1mQyE8nIy2aWpw+FwGDz4czgchUiDCVAWaJyXfAxA8sFMVo7gJV237fEYTuVUxh/hGdcR8KXrCVk5ZRGPkZeXw+FwVEJjBX/ir+Cy6LcSB2Z+LL+eh/yiqssKWS4F/Ba7f5B9XpjF20TILv/aoMRf6W2OLLiwQCMddWKAF4M8I/4OgQn2s1uTsu40B4G/xi9bT3g6i8+JDGxf8jlHJtNGh7QWDdV2syDX9qwPljYoxPbd+88PeY6lEnb5Vwd1Df5KQlW5Yj1zZHFbdAOzUgD7xd1qAtRtYk3P7SuW4Im+EQC+rVwptGKl5iVNQflGeedTwOVfPShvldLgIgs4JAjhCJQFIzFgYYrfxeCF4jICm5wqU8KrlIcpbyvxHqnJiL+N1Miw9mWtRL/jWtE2RZYh6tXH1OavQPOvCYyH/C//ZvEROhyzLv/Fx4o7XnjHhft+/F/iaggPf+L15O8KnJRXrgyrVq4Kq5qEVkWSdZSj88YACAAEx8PbEnG+Cic0x1sUcF4Q8Mvf/tf8DbB95C/Ci1/zqtDf3x+6T54Khw4dCqPDw2FD53qhzrBmzZrQ1tIamptXh6amJtaPujVYwBG0fm0LszUBAgCoJfQu67s4YOv31NRUGJ+cDKOjo2FgaDD0Sf+OH+8Khw4cCKe6usJgX38Y6OkNP/WJnnjEhfG9UbBQ+d80/mnKf2BggPI/cvhwGKH8O0Pn2nWho709tLa2htVNkP+q0LSqSfmTyN944fK/fFhfUoLsMopBxobtO8LWW74prN1yW/ylox4YPrsnnNn/udB/7JHMLzKNZLqSUjWQ6sp8/f/3f//3h3HJd509Hfbv3Rf6+3pp9x1t7eL7W8Lq1WL7YverVsV+Zf1AysMQ1erbXECfLdX+X2B/Z6Tv09PTYUL8wOjYWBgROt51POx68qlwYO/e0H3iRDh68KD7f/H/999/f5iSfFdfTziwb1/o6xX5i+zb29pCa3NzlL/2fVVZ/13+C+X7R966nmlD3PZlB2InjM6VpdpJdASEk5Cs4pfZ77FeC2J9sogIMuUrpaWCmBNIDutZWWnLcgeU2Yza8innwG4qb5Qz5I6syRsrmnf5Xy7AQ4PxlMEebS3yWGSBwO/mHe/zwK8BABlAFpAJfWMFuRnSfCMBrcraHX28rsc+ldm5En7FJCK/vVqUIrN3s+myJP6XBDmuxbxDAX8PgCcW1Kee0/TC2I5Uy7iWlQN5OVWLUix1+dc9+DOmnpdI9YIYPyNXRLExkrVyOAU6NIgff/wdj1B2nGqTBqKoVQMA3LaESDkahSUqMFIGMxC4KYlJ3taXOTCaq8GfXt2QX5GfGc9lseAforYy3Y6jLC35M4t9rKzBgD5amp2EcQFGGzzPET9HYwEySWWUyg6wtJHBNksz2YfYDyXtR0bYl/vzVzGtHawdBtp7tHE1bTVyJrqHZSxxRMD/AwhC1FeqXwTvKNjIZ0hdZW9lWI9bdJea4bLlb3nsUGfU/bbvnfe+MvT394WuLr0tNjQ4FNZ3doaNnet521eHf+PwP9qR1I/j4aRrqB0/tSKc+LGko5Z4NcPU1HSYmJwII9ltv4Fw/PjxcHD/ft72G+jrD4M9veEn/+gsjwMsx2H/5674h3DnN9wTBgcHQ/epUyL/QyL/gbCmY01YF2XfLLLnbf+yWz/Ch8j7lBdLRf5227eR5G8yNDnyBJw+XCAEWd791k/HX+jtgwNis7t27WJ67NixMDQ0FLcuHoQtyxYmaUwh6OnpoXwMO+7/q5gL4dE/+fZMRzKCvcRbwaY31dQd05H5+H/c9h2V/PHuk2Hv3r2hT/qI23649Yvbvs249SdBgt36I6EP6Iv8rrw/i9+3IliVVnfWf5DYDH3A9HSYzN32e/rJnbztd+rEiXDs4CH3/+L/v+u7vov5ruHBsE9403u2J7S1tsTpXkWyBw+M9+AFfx5RG75YnfWW/0L5XpvbvheRBRsvizXyHBg3M0MC887FPN91ZR2LncLJCb+xK0VlQvVJqmFdkBTLJJ8NWYOokEoqLCEKNNmu3a8MHN7SSCboRkXWvqTNxBxNpnFLUI85faAsuBNe4WfgrY76Qr4m45Lsub4E5Q8gPycuqiTVgfYNGfzleCz9zePZz352eNGLXhSe97znhZtvvjls37590emGZUzGg6uvvjqsW7cucn028r4QC/64zWRaa1yC/2ca87BtTPMp+Xq1/RLpPuoX8qTHqDahtZov1Wf2TtvGn62nhIXpJZi2skXTSKX6GxNZ+5I2E3M0Gf7fwOCGFyrKKx4iHlPlreuq33EbFm4rba82oUOaL9WXyph/tp4SFqYqf+TnxEU2LwaqEvxpFy8OMjMykoYvBo9gD5Mlp2emGQBqXsqE0gAQqTkFOj6kURjVJHU+6qRsHXmdt6YnfKa8QkG6gttkRYUPoVtaAVJTaYn1sjzmG5XK2pgslYCHOZpXNwsh+JMrPCHjix2Hhi/yNdmzDDIg32Vdti0V+VuZ0aVA9oy52iHrL3ibyxcBwcnzn//8cNtttzEAdFp8Ao83bdoUOT4bleRVSWbVxKXqbNo22DltSWwcE+aVcOFvPl/tLgsAuS752EdeHNZgKasvy5cCgLILwRwRTJP1AqCebInHZ3lSXyNSWRuTpRLg/w0Y3YOfFM5oQXJckMk+y6M81fclIH/5uyT5p5A9Y27xUZXbvnwVgRktDVdP0uhHOvx43dCfhbte/UrezsAtIwz79vf185Zfp1zlrlu7NnS0d4Q2UZIWuUpo4ghR8tSvtDFjbBWZNAtSldVp9aMt4A2c1dT0VJiYmOBw78DgYOgb6A/Hjh8PB/buCyePHQ/9vb1hsLcv/PgfnI4HTPiO48Vj4bYN+Z/1d/7BQ7WRGoA5ZZM59cACNNkOvqXyf/U1T4Tn7bg7DPT3hxMnToR9+/aFXtGFttY23vJpiU/76dC/3vYFLzCaZrIHyA8cvFZYoPwPivxPiPwH+voo/x/7/e54wHK7M5kbmR7k7W4xYfJDmsouTeF0d7ytdKvRbh8YcGv75MmTcc2xmABfH3/88fDkk0+GkZERlqW3fR/55Bt4cZHpSi5VHVX9WWyk9p/pjPn+6Asq+f93vetdYVjyR08cD8/s3h3OnjlLf9/eJiR+AH7fLg5pDwV+EAv+agWrj1XG+pW/K8iDmRnxATPTYRJP/I+Pix8YDcfF7p8S2e2Xc9zJrq5w/NBh9//i/1/1qlcx3yc+c88zz4Qzp0+rvDO/X95/vYCOfIo8kByPXStYfawS7cAi6UXlv3Nn2L9nD6f+HD985LL9f8p38Dmzt0u87bvowV8m/JSgABC+/L38HeXG/6J7X8Hg77gEf3ue2cOT/5qODgZ+69ZI8NfRrk6gIBAoBQE6gBmbU3VYv40HWMgr4Q+UFSOW4zz5j3I+W9/gQDh29BgNv0v62d+jwV8q/Ec+8QblkRyaThyKngg9JcDaUG+wzQKTfaYD0fi5LkGDObYdby+dsN7wnAPhthffGfolOELgsFcM4+yZM5R1C+b6RSdgDiB71YvwQHkOHqgMgFqxpFTfPOW/b284IWm/yH5ILnJ+5HdLgdLDfyR2J4fF8fLGDzLZW52LjdR+Mxkm9ot1OJJUfvngD8BrmxyLD9jHI488Eh599NFw5MgRlpUFf+I/ynx2Tm9S/VlsQHdS/Snz/VF/6CcK/D+CP8wSPdp1LOzetUtO/mdCq9g/AkAQXveRzv2aZQu0fz1eNfo2F6x+/GHEx9qFC0C+6iOe/DHv66j4/acl+Nsn5zgGf4cPu/8X///iF7+Y+aEL5xj8d5/qjud59ffU46TvOAZ4LRnyPmVD48t/Z9i355lw6nhX6Dp69LL9f2p34Hdmbw0x5y+CDCqAKY5k2FAM8+N2LyZKgnHjE+NhfHwijCGVkylGU1A+MSUkKfbD5HqMtIDZzFeReAua9Ui9aX3ISxuUphm0gHjValeu9q5CGHM07koQkapgRXA0noQgXKYQdgNQ2qaU7GoPSyV0dnaGdlHB1hYb2VVjh76YUuucTzEmSXE1ZXLmtABLl4r8xZmthCFHR1GESrZSa1B2Jj+IkEllWRo2bNjgVCXCnL8OuTAuQl5OJr9GwMX8P/7jdhpu7Zqt27QftbNob3H6D2m6NB8cv4EP4no1CXVEYn0knY7EvJx0kWYXq0nAiocVefLmYIWceN3/0/8bVq8QPsVAF9oC1YBO8PggqcOoxP+STLheJLPFpFhXqX7Qpcufc9rl3I/grRH8f/WCP/TBaA5AQczwwUQYOYI6BH4aNY+G0dExpmOyPi7ElIHgRBgXQlCI/bFeTcKLe400EE1oQsvQLhCvWuUKVkmDG7t1waFdSctgvIKtCClfxJBA0aDAn0Yma6e1m8499qdIF9avX08F1Nv6GOlrpgOAceC3phNp0KUBvwb/vAiAHPKyqBJdjvyRIghkABiv7CrCeJXjV7VAJw1ZReTztjgaG5mk5pJlsl5VzEOH0aIL9B06txcnVD0PwManSLB7rKv9ly60Mt8AkhN0Ncnq0vp0nfUa2cWpEC/4xN/bheDqZBQLd6rc/6v/N6wWsgDZ9oNO2DkAQVUW+JssEpkUyWuxyepiffOVPx9o1ACw8PyfwniV49diozrBX2w0olhGsvyb3RNVDnVIdpUDQePkjhE/BHzDo6NhaGQ4DA0LSTooKea8DI8KSap5CRDH9JHqqpLUA8JrF5jGMq1bymI6Oq7pmvYOzlnEawvw2hLeukYAeJGTPx04FjiAaFBlV1zR2BqGkrZZeynTuFSCGX+bXPVZcIQpBjqsrScCGDiMCfMnLLBC8D8mvAaB9yaHWfJabDK5WxrLLiZ/TGPA6yv0ARd9qhm3NvJIbSWzl9lmUzVQZkJZPsrOyuYQpaPeMBGZ/LCksjQZ1gKZ6kY9jjqdR9ombaP6Odr8lN0BijbPuz/RB+DiK1J2MYbgUNJqktWpAanmNSiNFLdruyfp03QKS3NokQtb9f0Y/Zn75E/ZRfktB/8P4I1/DI448hfv/Ajh+LgYsECPQVbCc7s4IN+rTJQ9iHVeuvyZ4g5QHPxBgNsI/r8qwV/WeDTcGj9XJyhoBH56mw8ChtGPjo0zwEPgNzg0xMnzfG/a4IDmhfrLUpTXgKQNA9Ke/pi3NoAwxyttGz5VBsL8Rb63DqNbmM8gipAi4xkg9qLOUMiG/jF/AhNozeBwX78RKLbH2kfDtyF/IbP9sv5FmAHADWa3fTn0j4mzMfhD4IeLATGmMQmqcEEwBJ0QGhweIqk8wPOcnKpF85T/+vjwEi8AYj+LjD9jD1KhIp7VAnDYWCi7KL8sdTQuUlkJZXKsMTK9jXpMzKHG1koLHHgOmLE7QBrwjXEwoHSxhwssS3ExqPl4t6jaJHXRF8V8RmXbNd8hNs93FraVprbg5O/+v+T/Ddlt3+zOjx57WurR84AGWLjbB+IgQEIZ/6tN85Q//H47LvxF/hwBln42gv9f1OAPQtNRm5iPDbeyon5AN0gibHzNIw0AcSsXTMboCk/2FgDixDowwJMvCE9TKiFfPWKdyPcn9fVjm61rWW9/n26LZRvkCgcBAEZ/Wlr0AYZZwgdvjIDEAdjQf9lVX7zSqjsl7aGTisP9IDP8WX0rgE3q1iviaPw0fBv1U6PCxcAwR4ChCwjAoi6Q39Wly5N/J0cAcSUIx4/+liHyJrMfLKktmQ3VAlFuIkUu+mfCdDQqUlll8qqh2FI9ZT4qdaa7c6iw+rkY6AjxHJCN/sUAED4AhHOC+AIQfEI26h5H5KtGsU6tK6k3I6wnZfE3a+zOD4I/3v4tGPkBb4wAyDH60eXg/wGOikUdgv5iAIC3ezHaF4M/jvTKBQEuBjTASvifl9dik9XDupDmyuaQP4JAjACuXo3gb2VD+P9FCf7yjcvnbSmCKQpJ1hEAqsB1mBeGT6MHU4WZOhKI0Z544o/BoI60yMm5ioQRRyMLBLjN8jzho6wUnGIdQcq6tZ2hXZQAX6yAA8hf+QHkEnhnrMo5ALuiMmfQEGTGjivUCoZvOjAX4AzBE50TU7ryy4xeDB3GDh2wCwENAFUHKJMq00Lljzy+WsLgP54Aiq78lEuy5OzHQD4m61UF5GfkWFqosezyejlLZ+NSCfD89BmCbP63kM7zEvufxm01vaWmQWDpxI+7QyQbiakmyYncaIR120m/RNn2JI/fYuQHto8L3KKRP4BcAu+MVcIS86dXuv8H6PuFCPk9jo/AErd9VQfKLwQ0LoBsSnyuKiUynY/8kbdbvxWDf4FySZa5bClZv1xUZ86fwBqKBX+alDcc0W8bhsXxahfcGgN1dvIdf2vXreXn3bANQVOr7NfcKpFzizAQTEQEjWABk0TlimEFaGV1iU9q5mgFnuBhqrSyqbTOfTCHjZM8V4atWzZzngM/V5Yzfgo18igTMtgFgiGZI4ADaEQygwfFdud1gH2qgPVtHWHjxo18ke3GDRtC5/rOsHat6kCbyL+ltS2shvOk7IV/In+8CgE8hh6Q5wUyW0yiPHOUl3+qj9wH65C1WBr6B/m3iA7n5/wYjzSJfJuDX7WESDfmHI2ORpFV3vY1KddnG/3oEOMw/48nQEHI4xygPmBt6MDnHuVcAF+AcwbOB6CWtlaeF1pwW03SWlELPj+GgI6E+q0NVo794rqc+EGbNsH/d3Lqj/v/2cAdEvh+PNneKXnTAcgecUBbh8i+PcpdzgfkM26nk8/l8qk2VZJ/1i7uV9pndXOL9E39P/S+Efz/qquuuuqDt+54R1wN4fiTf87UKs/eOWQUH1UuahwVACkWKCo0gX+l9Po7vpP7ANc2Hw03ft1zuC9G+TCBH4Cw10LgUegaAILaxPDbYypKIEwlUQFMANUjPrULokBRhqc4JS/1oz0kaRuCVbQZgUvnuk4KHKyaxutC5OqFD6kMDoXnvvIB9hc4sfNTKnwBeatakOXJa2xvYDKdyFO2TZbrXvAW2Vlx7wtKb3jHIc6vxHB/iMatTpMBnwR7eFUKX5cieRgPyi3FBYHKZbbMFpMuRf6tlL/KHs5rfed6OjNR8jAhV6rTk9N8YGR4aCh83T3vZN+B4zv/oszW+M422BpSrKf8rBJgh+nVe0oUjFS9/YUl+03l56gu8M1kvAgf7/s7e1a/CXr9nSVZ0G+LjKAfeZ+d6VKVdYh6ghQL9AYN4l8pzft/fBkGYdAFsSfz/7AdI/r/NXoOwNw5nguEEATCz8LmLK0Vtcs5iPl4HmJAyvMTvkms7VsjbUbQirm+nZ3ryPPJiYkwMT4ushwOfb297v9z/qNdfPlKoVSerXjHL/1tpOhvcc7Pzv+yD84Z9ptq01zyh++HvkJ3ceEC2esrbS6EMfH74+NjYWR4JPT39S2a/0/9NCkG4yDYHfhf5LcX5SXPgFWWDgljyJYp5gPEyaAve9tn4y9CeGHz58NLXvvq0CuGgC887N+/P3NsAOvQTMwj5SYtS9drBO2zVoqs8cH4gis6PNHZKs4MSoK5XriiOT8zw5d7nuw6wZdZPvrwI+G+nyjxfTki/5LggYmx0H36tN7q5zD7qD7VK3kM9eMhIL5Xb2Y6m2uiOgcNj8peZcwlfwzn4ys0kD8meONEsBHBn8gfTv/4kaPhyOHD4cC+fWHnE18L3/QjX+BxgC9+8o3Un/TFrpwDg7JIVtdiI7Vds1V7f5XZMBwKul30slBH9YGg76GHHuKLnnft2sWy9CXPs/x29Nd8tVCiU7XQIaNL8f9vfvObmceLnvcfPjjL/5elulKW17UaoqxO8BJFylN7ihcEH4DbfPhAAeZ8jYsfg+0flnPck197MvzTgw+6/y/wHxNC8O94opdPcAuV3vM4zbmgqle5C1X8WNKqYy75w+6EshiguYUXLJD/8OAg/f7eZ54Ju57eFb708MOX7f9Tm4ONmb/mgziwOSmfy29X5bavNRKOKJ/P45wIE6N+ECo6iNEcIx3xiS/JFYbyRYmSgsBgu8VWK1oFRxpP8kq4fx/Lsc72YV32535Itd+Y6L9l69Zw/fbt4QV3vIAfwneUAzyz9+OpzPHqF3zVQ9QUuiNXQuJhqSeZQQhBFvhtkcwWk+aSv8pedRS6CaLOrlbCiAVuYUAHrr3u+nDttdfGXisq2Quo1oiu1HEFoB6yLNLhSv7fMBPO057z/j87Dwhh1D/N6zmgdkS7hr3bOmzbyrmubQLBJzAVgu/AqNDVV18dnnXLLeGuF7/Y/X8FtIDwGdcod+Uh/C/8LXyt8T/m43oql2oRZZvUk5c/zlfUT0sTgv/v3LAhXH3NteHGm25sCP+/6CN/FolyUmq82jNCNHr3Wz8dfxHCc879TRgYGODV3unTp8OpU6ey71Ya0jqqyYhLgdVvqfGBfBLeUAFE0BiKxnAwhnsxz2vz5s289YcybMfLgM+cORMOtb6Jx1mueN9rpjg0Dn5A7tCFYbzPEQ/z4Inavj4SylGG26XYFxcLdpUDvQJM96qJIvkbQf6QLU5WcPQY9ofMt0qwt23bNsre+oi+Qdc7/sMHeRzg0T/59sy2MkJQG28FoE6jxUZqtwu5gnRUH/Me+btEv71YMB0yPXL/7/7/YnD/f3n+P7W3hfjtRQ3+AFYYG0QyJxDT217zobB2y23cd7njlVu/TGe+Fx/7PnmSSgEFt5dKYrg7VXITtpEhzVcbqcxND6gnifODAfDlphjBi1dwZhy4AtqyZUvYvn17WPHcn4xHWt4YPrsn7Pn8z5WMPTH6lMdAyv/FgukTdMyDv8bEUgj+APNT9P0g9/8V4f7f/T+wUP9vegDdaIjgzxrDFAYfG4AUtH77y8LNO97HfZc7PvDGlrD/6OHw2GOPhT179vDj/3gtCK5u8GoDzHMoE2QUdonXTDLIlpirDkTilmEuVUwa/yoYP+Y76K16GD5SOAU4fvRrZmaaOoQ5kC95x6f0eMscBx/59TBw7IvkI3kabQ8OwPhrtpba3GLBdAo61mjB37FjeMDhTDhy5ChPiJgDiito8OT5z39eeNWrXhX3VBw8eDA88cQT4fd+7w8ymwHuuec/hhe96EXhP/2n+7huwBX4v/3bQ+Ev//JTPPHaFALgHe94e/j6r385r9yBnTufCh/+8C/wuIbPfKakwz/wA+/iiA5+D53/2Z99f3juc58bt14elkrwZ3rE1P3/nID/HxB9fuyxR8MzzzwTjh45Qv9f+m6x2p/yMvp9pPH3xvNag9oT9Qhk3yoHNUHvcC4Q3dNXmqnuwe/jgQc89IipOmPDw+7/Ixbq/yF/6obY1UL89qIFf4A1JiUzelJ0Bhu27whbb/mmZX8FaEJ4YvfT4auPPy4OYE841d2tny0bH5Pgbyo6AgjSHm4QgWKB3We2z5KYrx40+JP/mIIniyqqGDyMXYhXfRb04eqvWa7+cOUnJ8IpOXHjwZ6Bvv4wIoaPCdBv/MAX9cDLFLjiO7P/c6H/2COZsTONZDaWUjWQ2mojBX+7du2W4O8o9R+3etLgD19SGR4e4W219773hzii8IUvfCH85m/+lp44aTOlW0KW3nXXneFjH/so1/GA2bvf/R7mjd8I/vDtVeP32rVrws///AfDzTffnAV/xi/Agr+dO3eG//pfP8jfIPh70YteGN7//v+H2xYDjR78AcaXlCCDjNz/l8Hs52TP2fBVuWDZLfp++sxp0fMpvtfOAkDjHzQOPIWgmaSYVVAFRL3RRPQs6hL9ldgNAj8L+DgKKGTrY6Nj4XT3qdB7toe2O9jf7/7/Mv1/amMNEfxZyoqTxlkKB5BdCcY890Ol/NNjWFKG8uoaDsIRy8REMpYHv2S5+7+U5ryYEM4JPbHzyfDYlx8LR48d50us8TJjPOE6NT3Jz9uch1DBM/ISv1K+EVlSxLTFg/WHHyaHfojBr1rZRL3AiB8muiLY02H/UvCH9TE5UXfJCezkiRNhQAx/amIyvOlnvxSPHMKj/+vb2f60T3ldqHb/LhtFzcvpArUAugD+RWMvy8u21L4sz2PEdLFB+xOCbjVK8Idg7//+33+WHL70cp63wF796leLLq0Of/7nfyHBUJcEgfqd79e97nUc2XvnO7+Pv9MnAmfCr/3ar4Vbbnl2eM973hv27t2nBxbcf/87w1ve8ubwi7/4UY76GV9f97pvDj/0Q+8ODz/8SPiVX/mVWL4i3HHHHRLY/Wx46qmnwi/8wkeEHypo8OzTn/5L5n/1Vz8uv3tYfqNy/IEf+P5w773fwG2LgaUS/FmqfqqkV5a6/5/t/4HjEvQ9/vjj4XjX8YCvV+CNB7jzg4sYs0GM/gmzIr9KKF+rLrQXkmY+C/oGHbNBgBj0xeDP8vD5hw4eDMcOHwk9PT1hZGjI/f9l+n/qgRB0YyF+W28kVwHW+LQDSK2TGjiIQ5LUyo0J/J3kkaLhGYG5DUwmjDxl27jjbOAm0wte8PzwdV93e7jpWTeF7TfeEK69/jo+GXTV1deEbVdtC1u2XRW2btsmeUmv2so8aMu2rWGLrJO4XkWSOlA/2rMVhDZJetXVKANdHbYhD5L9sY2p0KatW8LadesYCGZ8SUDupLwqILKvkSnR1VSHU92upPtIzUb420jLFZjgjQ/9AzyxyAkE706D/jznOc9hEGjzixDcHD16jHmUGSHwA2677Tbub4Rbs8C4nGSxH09Ukt566y0sf/azb07Km8Izz+xmOeRResJbZCgEnD59JnzpS4+K7DTAWrdu7aIGfksRqQ6nuj2XDSxX/w9cv3Ub9fRZNz9bzgHPCjfceGPYfsP2cL3QdduvV5JzAs4L115/vabXXReuue5apjUj1Ctt0TagTdJGtk3aifXYVtsOukZ+d7Wcx/AABN7Vl/ElAbmT8qqAyL5GpkRXUx1OdbuS7iM1G+FvI1UTixr8WWPTxhulnUs7TAITjBGR+DtjGJgX1xuWpH15J5UpLld0vRKkp2E7DEUCqKvEEWzbKoGWBEyYHLtlswR7WzZLuplPjm3ZvIVpnrZgnyoS6sAXOLS+LczzixwbN5I2bNC38/Ot/EJ4z11rezuffsPkXzy+jxMn39EkVyUpzLjJrcg3rJMiX5eCDmT6auuJTs/S88QGbF/2MUeApcsF0BH9xOMMdQXBmKEDb/pvK710FUEaAjG8WxEvgMc7NvEyWAPevciXw0ayYyEQxL5GCOwA8Nr2xecYV6/WL1FgVA+/LQWGehzM2bIy0Otf/3qWLzekupqnVMdJie67/1dcc7VcPIvf30qfrz52M/xt9LP4QohSLNuMVParIbEdG61N5vcllcBuPYhf5ohfaME5AC/qFsLXOXAewOtRwAz3/0KJDdi+7GOOAEsXE1Ub+QPyncg6KowxJiACTikrt1sVuf3sGA1DiWPK8kJUWAA6bA4gBzzGbhgYwXdqB8L6znVhoxjQhvhy4A14XQDSlGybEF4ibMTyKpLW0SltlCBv7Tp+hm+dGPaajg5+uBwnYt7mlRMhZAU+oO/8TieGouOta5TljR8ww89YZQYvVGZQidE0CpXpp+gs10WHy9YTsnLqTTyG9dVoOQOjfny5qxDmQCE1INCyN+iDdPSvSfLrsnKkBkxBwDrmBYIQ0AE4GaXlCNwAyAKjjAgyjQALMPViRi9oRkfHwoMPPshAUp9wbA4vfend3H+5I6/PmZ67/ydS/w/g+7Ed4kP5JRO8LiSmlk+JZW2l7ST8tprEOlBXG19eDbL3ssLvt+CzdXFkHLwxHlwQX68X/MIFkPv/rLye/n/Rgz9rdJqmZB3NBBiNmwyKBm8KNCflmFk3Stpj/bK+pg4gowRm/EPnpkP/4GDowzuAhDau3xBpfdiEqyoEeVmZ0AasxzK52soCwSqT1aMBoAR/crJdu0ZOwDiBimNow6d4MMLXpI/2kwfSaQR9+GKEzsXSeYsoK0OeR2Cf6UzUlTy/G4KsPRWIuhz3S3XddIWpkPXViCzIpcsJ0BE8Hc4vvOABqNHRuAX8WMkRBhtxRkCG27M6ErGJIxG4xWTAe7ewvxEuUgAEfhiptnIEbgDkgXIjBJUAZIjfaGCon3P62teeEF2+IMfEaGRrePnLXx4wWr9cUaS7KZm+u/8vCP7wMJMQAzzRr1Kwh3y6HsvkoqSsDL+pJsV6EADiYr9d9L2ttSW0xeCPL+bHCLjwgx83kIWBnhDmoM1gXppc1HHd/X/d/X9VRv6KGp9SavgZA/OMlPXMIRQRJjM3AsX2UKBRqHaFAjIHwKuaTLMVeK/TcDgXBoeHwuDQYBgQQhAIshE2jrIleZbjk3GdcsLCt2Px7WDka0GoS4ijfkIY9QPxe5Y4+dEJ4DaZBn9wALjao+HzCUw8vSYBYFxPUcYfsM30xa6MIn8bVf55YlsLdNpS05X0ZGFEFuTS5QZcJOBhDnvpK+jJJ3eGxx//qtBXeFLBLahbb72V34fFaB7ml16FOaica7o1HilwJFBftrpV0i1h3TodFYRdcVpFJIzoAQgoP/rRX+RTwaBf/uWPsRy3jxEk4neY14fjoj14IhjBIALDV77yFdx3OaNIh1Ny/6+A/zfg0gbBHymOACLAKhvRQ96I20v5WpAGfCVqa5HgL46AI/iD319tPBH5of82yscHEOKFP84J7v9VV+rp/6t22zdtvBENI8mnka8xg4yLaRnDIl3SVWGtCW2MZP1hP+NSCTixwdAzo89oVK4AR+Uqq0OMDldbdtUl60jlRJOldlUG4j5VpFgvCKMeJDgBOWmC4AR49cc5WHiMJd72nTkXpsXYp/FNXknhBPLGnyLjnOkJ9CHh8Sz+15lm6WTSRtNl9sMMHhR1P7UHy4PIh5guR+BpXQv67K34uL36r//6r+Hs2R4+tAH+vOIV9/C2L0b+8MmklAwbNqyX9WvCNdcodcqFDLB58ybuZ+X4KPtcwK1dneOkc5sQBOJ1MwgCEQwi+Lvuuuvj3ssbqQ4b5fXd/f9wzAW+2gXfsSVNTvJpX7udyjTmjVCGb8e2Wt72qSJpnVJf0g7Yno342atdwBN7DQwCOr6lQnw+AkBc1GFKh/t/TVN7sDyIfIhptVD1OX+GtGPW0TRNDSdjWk7QZJ5QWtZIZO2nYIXQN9o+CBc15Rd+YVwCPzP0Eulj/iC86sUCK4xKcGK6XGllhG1ikEZl26pF1hY4HqkTIy7mBOgAhMgP4QP6z+BPjB6v4EAAaC8unWX8xp/IL+pF5GOqF41IhXoZ9Znbrf2xLK/7SI0MaX45AvqB94Eh8DN6yUtewndF4lURCP7wMuc//MM/YoAIOzpx4gR/g9/iZPW3f/t34e/+7u/lN30cDbzmmqsZ7CFwAxC8YTTQRgpt5K8SoOMYIbSHnHAcPCGMye1GTz/9VNzbkddnoyIbWK7+34AL4ymQ+EkQfCVSC6yam4SQRmIZXq8V87pPU9Upq8/ySCPxu7cg4QG/xw5InzHaB79femfh7JE/9/+19/9VDf6Aok6B0s7n85WIzqDBiO1KBGyUDf1Tm4th3ykE2eR2Gn+8AjRHoAaPKyy9yrJXVmi+FHRl5VUi1iFtwJw+rluKcsmbA8DEefJA+s8rPxq+zfnThz5mGX8Ccg28syH/hIzXRbKoN+XbmqcifWc/hQz59eUK6MnQ0HC87TssQd0QR/k+8pFfEB1YyYCup6c37N9/gC9YxkMh+FoHAkCjrq6ujPBeQBDKEUgCCCS7urCf0thYaV5hEXAhgwuwNAB87nNvlyBQn24EYVTSUUIl/a5kD3NRkc3Vm9iuy/D/BjwQZw/FMVCKvhJ59akYYZI6kV9VCrS4zQj+t4pUXl9pHWlGxgPKWeM5u+2L/uBjBXi/o/v/kg2ADPn1aqLqwZ/BOlXUUZAxJWXMUqGi9hvB9iXH/mZzGiJKo2E6ImZGj5RBEst1XY0bJIZI408NMimrIjG4Yxu0HbjVZuU4ISNvxkk+SB/lfBmDPeubvroD/UthvCGv8JfwMM/bdL3Rqaj9RoaisuUO6Ace8rB5f+ktMjxcMYQ5srwd3McRlOnpqXDmzFkJvs6G06dPh+7u7vCud/0AX7aMW75YB5061c2RQqC/f4D72v5jYzoSg1vMH/rQhyXQxLy/Xwof//ivsXxqappBJ+rFfFYEexhJXLNGb/liCga2oc2OchTpeFqWt5F0vdGpqP1G6s60z0X+H8BzrwiOLEjS0THk9XYp8nrsGGRglEnWNdi6eNCxWJTWB39vgd6sNljf0W85AXDe3zm9/XsuPvHr/l91AigqqwVqFvylSDu71Ckv5HRbtPlSmgOv7nhFpMEQyAIjpSQv+6VGll0BwSBrRKxP2oAgz/J0Atk+5QGgMEEMX/tgQWzFp30NCc9SXuJ4llr+SiHHbEBPENSBMEKSjpLgFi8CQwsKMeqHi4vBQQSDOj+wr680mX5kZJSjhBjp6+vrzZ4cRhCIMi3v43EB6Cd+j8ASx7KJ+fg+KYI7/A5z/fAUMm4d47axvQIGdOLESe7vKEaRDSxVSv1R3i9div8HEPzxVSh4Ehap6B+eiNVU/SXK9WsaQlYv05ivBcX6GPQlt2O1Tel65IP0K33gA6984WtfpMz9f4nqhboEfxdDEYOWApW1PVkqAQagho3v9ur773i1JymNJnUGuFqS1K62UEdqhFm9VSTWI4YOSgNRbLMAkEP1yW8A9ive0kBfzCFUgvyytCTHsfxSI8f8Af1AMGaUBn+YFoGvc0xMjHO0jhdRolt4555+8g0jhslk+skJruP2MciOhd8iiDPKRmKk7nTE0UbytI7RjGzO1rZtVwXOfW3RJ91Pn+5muWNhKLKhpUBlbU+WSrAACGNeGPmCXywiOx+A0vrsG9T0t7VYYn2k6Odx/mEbYgCYbReSf7F/eu7Sc5v7/0ZBQwZ/SxGZoCFrI2AO2cMASDQGNQh9CaaWm8FziXnsa1dgOLjWK4KE8VWZUBeDTTNylGM9Cz4tj31knX3Ufqnxl25poC8VkfIukh7fNjiudNgTgSkZMMqnc2QxP3aS26BTGiSCMGKYBovTDPRQDsJvtdz2HSNhmgUA3bRjpKOOqMNGI1GXHQfvF8SJHBc/mAqB4BMPnjiWDzL/lPgsYg6XBX0CGPxF/15E2EFy2brVxerwTyoplVWTtD5SVqece+x8wLyVC7Fvem7jOY2Bn/aY/aoE/NDSSHZMx+LBg786IjN+GIcZd2IYZuxGWZksMC0LyMqspIqUGbWsMsViASADPy1Dyp0iLPDjLV84ACmz/jgcRcD8Oc55jXNFbZQEwEg51jUoPBduvvlm6hNG7nBrFsGejeIB2BfrVm7Hwi1a/Y0GlwcOHGT5wYOHWG6/wfxWAPZq5UYAnvrFnD+c4HDhg+kPmEfocMyFNPjDP/PtqX9kHv8L/KUFQ+qPa0Hi3ZHhuYA1x7JkW0y5OQJ9YQCIgYAYALr/rz88+KsjaOxmBJawTB0D81hiCsPBjjQkWWBisDcLAmtBCuSjwTOPFV23ALC0v7SUhp+M+LGPbvwNDxN3HYCADl/LyOxA6Ad/8N18EOMrX3mc5aDXvvabwote9EJuR1BXmlNaGinUfTVgxHbTvW/91m+RALCNZaAHH/x8eNOb3hx+5Vd+lev2m9e+9rXcHz/TY8wOSPEaGdgl9B2M6+6uc/BXR9k5Lg2pD4Q/jxn+oybFf9R/ZpHX1FDys7WDVod6NUWGS0wJbBSy9oJw1yrrX9IHR33gwV8dYUbBJeblH7bodv6L+SxlwhS/M2OLtlYDUiOXXLaOJmDkTyHlDABLQDt16D8SyqwjjoZDufTqh5/5mZ8OP/zD7w333HMP9WXv3n3hX//135i/8847Zdv7SCVAz5KLjAjkUWbbbdOznvWs8LGP/WL4ru/6z6G9vS37nc2//YZvuDe8973vCffd9zr9QfZ7PUBax+bNm+NvtQy3hvEgSb3RKLJ0zEamR/EfUpIWC9RXErlMqnuA+eVqk0GzKMN/W9eU++oqgV5wgX1wmd1+R+2x4o4X3nHhvh//l7gawsOfeD31i7fzVsYnOtPPmMSJ/nllWM6gUgvhxKC3NyPhIQdZ5wkDowLCrpe//a/jr0K4YfQvw12vflUYGOgP3adOhSOHD4ex4RF+PxefU8MXNfDyZkwiT5+iVbbH26vM6fv0agXYrRkv+42TpfQPfeV8rOkpzpPC10r4ybqBAb5H7dD+/eGkpIN9fWGgpzf81CdK70Rzvasf8vrLt/GbDoOkrEh/P/JWfVmyo/o4fvx4eOihh8IjjzwSdu3axbId9/8VUyC1H9qO2Q18Bl/L4fZTLeTtZz7+/4EHHgiYUdrVcyYc2Lc/9ItvxNeU8Dk1vERffb/KjkTZQYbyv05yRF8N1nftfzwHSN8xJWJiaiqMyUUQvlfc1XU8PL3zqXBwz95w6sSJcPTgQff/l4kS3+end+a3feRviQHCNlhWVADuQFdqgLzjsbrTNG+gNtePFu5oWFTUIxS76BoXkE1F0VXY4FhySNx/2bmglpgdfMX1NMntw6YK1afFjiJ48NfIEIu5VPu2ALCaSxHMxs0hlNl83gG46S9JVJK9o/HgsrpyQG9ZpwDv0hH1LfP/Jf2brYnu/xsJHvw5HI7ZgOc2ciwtuOwcDsdF4MGfw+EoRwwashFf/nkk0ehIZZXJy8XmcDgK4MGfw+EoQxY8IHCw4MGDiMZHKiuhTI4Oh8ORgwd/DoeDwHyd0tzNUuCQzePxOKJxYSIy+WFJZWkydDgcDoEHfw7HMkc+OMjnbXE0NjJJzSXLZN3hcCxfePDncDhmwQIFLPjTxAOHegGfkAN1dnby3W955OXkgZ7D4ZgLHvw5HI4MDBgsZkA2HwQ66oK1a9eG6667Llx//fXhmmuuiaUJKJ4oqwIZOhwORwoP/hwOB2FBQhZEWGoki6N+uPbaa8MNN9wQbrrpJgaDKSidnKxSmSHvcDgcBg/+HA5HGbIAYmVMk7yjfti0aVO48cYbw3Oe8xxSikrycpk5HI4iePDncDgyZMGCJBI6cH3lCnxTdCUDCkd9gZG/22+/Pdx5552xRAHZZHJC0KcC1G0eADocjhxW3PHCOy7c9+P/Elf9A8sLwUI/sIwPe9/16leFgYH+0H3qVDhy+HAYGx4JGzC5u3M9P/Dd2tIampvxce8m8p8nY56Elf+pCOjwq4j082z46pB+W1I/6I08+jxzbiZMTU2HickJftB7YHAg9A8MhGPHj4dDBw6E7q4TYbCvPwz09PqHvRsI9p1Q6mrUZdIFoXOl9LbXfCis3XIb93U0BobP7gl7Pv9zYeUqDf6yVOzFbAYp4Laz+IC9mM3M1/8/8MADYULyXT1nwoF9+0N/Xx/9fkdbW2hpaQnNTU2hSSiTZc7v10ue5i+QsP88D6jPmJmRc4DQ5ORkGB0f53nguPj/XTt3hgN794XuEyfC0YMH3f9fJhaqdx9563qmPvLncDgymGOlkxVHjJQnnhhMnNn/OW53NA4gk1RGqewASx0Oh8PgwZ/D4SgLEBg8CDGYELJ1BBT9xx4JBx/5dY42OeoLyACygEws2CuSmyHNOxyO5Q2/7bsIWOjwq9/29WH/RoLKU1PqrKRpHilu/0KX0zz3g/D4p8ewpAwutrkxB89o2/xT/aed2EhfmpdtqZ1YnseIqWNxkdrJfP2/3/ZVuP+fPxaqd37b1+FwVIQ5WZA5XZ6AYpCBeWV0yJhfFsstCOHvJI8UjicjnC+cKlPCq5SHKW8r8R6pyYi/jeRwOBxF8ODP4XAQFiykwYNRGlykAQcJQYgFIpH4OwtYELzEdac5CPw1ftl6wtNZfE5kYPuSzzkymTocDofBgz+Hw1GIfBCRBRoSmFgQwtszCWXldqsmt58dw6mcyvgjPOO68LBsPSErpyziMfLycjgcjkrw4K/OgI+ms46LlsUcnTiLHI6awIKGNE3JAo1s1CkGdwxQYsBn81PnpFwws2ypiDcJkZdxv5TXZTIQysvJZJemjsaFSA3/SoAcY+pwVAMe/NURmdOWxZz4SnH07qwd9URR8JBSGvhlAUw+kJH1LCAsIkzmdirmjVAZb40SXqcBYF4+JrM0dTQeID8AEuIIrsgK5DJz1AIe/NUR5qxXRUe+isEfKN7WgRPIOYMrxTHY02KOxoTpmekoCDqZ5tORJwtGGLjEtCxgiXRJo4LLjGbxJOFZytMs4ANF3hfJBmSyczQuTD44CWvQpzJMg8C8BKXoioD7//rDg786InP2QnicfxUf64fzTxy7mT+SK8TwHUsDafBAXYxkupmmHI2KepsFLbnAj8GLUFrmVIEvkZ/cbnyNZUUyMDKkeUdjArIFGPxRvpC3yDM+7EPEVErc/TsWFR781RE0eHEAuPJvYlpy+mr88zN3fdtS9ZZLdT/adHdVVwKKggpQGnzk85WIwaBTRSriWUpF/EYKMuTXHY0LyI+pUCZ/jOgmt/KXJND2mHU0Ljz4qyM42icGj6s9u+LXq764Qx4XdLjcRszTfC2QBoBpGxfipPwEtbRgJ6NUbmmZBSUWkKTrTgunIt4aGYrKHI0P+H8AUsOL+02+lQBXr/6+5PTrdfu0XP9iZh5wXa0/5g7+TK+odUoacNRH4RoZGV8SXhFzsIoBH676Y+BHB8+rvgIngEOjjoID11Ic5QEg0tjOmC1zCqC4jt/Y7y6KtIuRXO8aBxdz3NjutHg0Fy623VEbLNT/G9T3V5Y5/T79nx4wdYX19IvWVCTScl0xpP1gNre9Eqw71l0h9//FWIjeGSoHfzxessRKnC6RkgV/ReDInwWAWeCnBoJjMMUSj5cibi7Vh2pqQKxTFhh6ZvhZWioombnksJ6VlbYUAvWki1Tq1HjkaAwUycapAShZ8FcEG/kDKt7qlWNpqkkJ5QWFbagCpSi1NaZlSfwvCXJci/k5IVVITaWloA1Oc1Cy4G8uzAr+7BTNHyPFAe37nQnZd/zy5cuNKvIh8ow8jLxMQyJAg794O4dUbvwXLpzHP/zxWNl3VVHO7ThuIqcakH7HF7VqAGjfGabzwgIHFlO9jSFbrU/l3S8DfgPguExRn+udk5NTA9Pl+n8D/ab5yQgeJ0txvJi34zLPbM2Q1g9ou2Ma11HARPewTK735TDeoJ9MUY/7/4p0OXpnmD3yl+yXHhQBh1XodBFCkJbwLkNOBtnIH0f/NHgCSjy/EM7FY2bHg0Dlr1SH7s/CGhHbBiWTBW02p6WOoERZWbYPUhZm2zMkq1lfUY/rnZOT01Kiefh/Q94fZr/PB0DYlm3nnlm+VsRaLZMCfp2LrWqeZdY/LXD/Xw26RL0zFN/2xc74LYWtAoASFlV47vy5ZU1FPCGvoiAyay0QAIzfJvkqKb/Jcx7Hjil1nSsdH/WaU6Bx0EDwm+oTu4R/0imWST6dq8Il5rVvQpzMnGzX7s+G652Tk9MSoiLfNB//bzCfCeB3RurfS3n6ffphISxxW60IndF8qZ3Wdnp2/Nl6SliYFrJCgQ2RXziu+//KVMSTS9U7Q8XbvoCIVgWcCICVn3MqpEQoqYEaUt4C6Xw/GIZCBYgRPxv1y9IkANTyGARG+bC+KhPrju2zdeQ5ZzE+scY0zmFBYIhtsqLGj35amsD1zsnJaUnTAvy/wdxhmZ/FccwPWrn4XiUtt/0xRUj+V32xdrC+LF8KAMsGAnJEME3WI6Qk5tz/z5vmqXeGVVddddUHb93xjrgaQtfOv4g5Qen3BA+Iv3hwE/yyJhpmifHIZ6lsB7/AezOA6+/4DmWm4Jb1Z8K27deHycnJMDI8HHp6esPo6KjeDk6CwpKhqEBwWMuzHuTxl7arygRYqrjANjMn5RitnBHFnJqaChPSv2HpX39fXxgZGgoT4+Nhcnwi7Pi2n+D+gOudk5PTkqPL9P833ngj8xPy+7Nnz4bRkZGwUoJCBFG4kJYfcTtO4OoWsa45wOpASVm7qkhWn6zEFP8CL/oB7IIg8bz4f5wDpmemw7D4/bOnT4e+3l45FwyFoYEB9/+XQ5ehd/e+oJXprODvxM6/jLliSLXlApAKlzUJDyiESBlfhCgAgQkAdF0ihOds7Albr7+OwRCCo56enjA2Mkqj55veschv9FhyTPkNCXVZ3VmKukvtqCaV6ot9ZRvYJb6oGnmMBs6cmwnTEvxNTk+J8WvwBydQCv5+XH8kcL1zcnJaciS+KO8bjeisBXP5/+3btzOP4K9Hgr8RBH+cIhPvlnCrHar0n8TVpD6WldarTlo9WqAZAc5dXJPteg6QAHDmXBhE8HfmTOjr6Q0jci7Q4M/9/4JJeLBQvasc/D31KTIZKKleBI+r27LKsCQVLzsSQaTMz3ikbCLjwUakuBV63QveohsEuPLbfO01YUyCoUExBhjH8PBIJjD8LqtH9kdqQRdSnXOnQ+JYx23hapLWiTyGmiWflJV4EELz6tXaRimbnpkJUwj+xKkx+BvU4G96cjK89Ft+TBkhcL1zcnJacnSZ/t+CvzHxk2fo/4ews/4uAY6JQ5bVHSm7JWy+uFoU68rqY5oGHtptHQDQMpwrEAAOjwyHMxz56+FAAO4Auf+/DLoMvbPgb/acv7hz+mPKAseNFUERrPJZCrLcCAIALySfCiLlXRlPE6T37TVImg5TU5NhUmh8ciKMT+RIgiaS5HEr1faZ4Hr1aZx1Ks2qc0LLrK1tra2htaUlUmtoaW4Oq+PTzeBFOt8FKONRwjvXOycnp4aly/T/BlzAz8g5YHpGzgXTkuJcUIFwrsB224cpzh9VJqtT6y1o40ypTRgAgL9Hyvyq6PtX6sus3f9fJl2G3hlmjfydfPrTTC36Zmq/RYoKDMg7lQM8AsuE4UYmANC1z3+z7ifYtvJg2HjNNl4J9fX3hZMnT4aBgQEdVRPSETebNzHD26gYQsccitQBwGmo8cW0ymQGntaPNiFFW+HIoIwd7e2S6rzEsdHR0MeRv8EwPjYWZuR3/+F174uccL1zcnJaopQCvgqu6xL9/6233sr8gFzUn+o+FQbFP+roGk7qpZM9H3jgOUHPB1zP8np7FevVJNRBSutj2yLJOoMRCUrg/3Hhz6BNCLezOeevByN/QzwfuP+/TEoBHoFll6B3c478Ff04y8dXdlhlTkopbwr5FikFhvl7JSAaGBoMQ2IQo2OjYVScwIgYBuYADgkNDg+FQdkOGhDHoDQU+gcHsvV+pNyOshoQ6pL2Wr1MYzvgvPolgO0TQrp2zZqwcf36sL6zM6yTfGtrKx9oWS1XgylSHrneOTk5LSVKfdR8/D8wJjQivn98And9psIE7vxIfmxiQmic5wSSXDQjxTSh0TEt0/yYprUi1oe2CKFNKcn2kVg+IoQ7QGvaO4TaQ7vkm5ub+SCj+//FoZQ3l6p3hhV33HHHhft+4l/iqqOWaDv8m+El33ivXBUNh1OnusOB/fv50AeGxpua4mtgVinxIRAhfAnEngJGGTCXgBcTZTXEOrnIBrYPbZU2w7Bx1dfe1hY6160LGyT4Q/++9tWvhl1PPx0OHTgYxuRK8G0ffSoezOFwOJYX4P/f94EPSLA0yrs++8X/44lffdIXPl99PE7k6euzyglHkpRHrDK0MiJWqzXLX9pGnAdWr24KLc1yDmDw1y7+/1T4yle+Ep584mthz+7doVf66f6/PvjIW9cz1du+Ly/d9nXUDief/FTYdN3VYSje9j17tocTY89lt3eRzvB1KXhoArdaeWU4Ga8QJyf4mhidfydpOgevCsQ5hpE4x4914io1tkMI7UTb7Na03rI4T2cxI+VDgzrKiaeAn/eq71dGOBwOxzID/P+Lvn4H7/AM9A/wwh+v+rLbvEztVitJp/7oFBucHzDtJs69s6lA1aQ4zSerDynqt7qZj1N/4i1gezgE67jV29/fz4cbMfXH/X99kD3tu+2qbRL8fQ9XHLXFVz/3m2Hz9deK8Q/xdikCQDzQYfMnbI4fDZ5GLkFVNtFWgsEpDQYnZZ3pZHUJQSjrEWJAyrwEfMijbeIE0CbOAZQ24V1/ZvyY44cA8Zz0B4aPeR+3v+L+yAmHw+FYXoD/v+vlO3SKD6bRSFCEC3kLmvRtCjEIjOeEsmAwBmVpvlbE4NMGKWJQagFq9kUq+H4sFwIv9uH3p+U8gncZ4n1/7v/rg6/b2seLixX33HPPBczjAjBcy6Ha9vawujm5Jy/CgxDLkJ9wuJyQDHfb00c0ShqGXAVJAJQFRBL0oBxD9Jjr1tzSzHlv7R3toetIV/jm73oLh/Zh9AgAx8RAsC8PLrAXZ2qZwob8a43s5oIlaAcWDvfrrQq8n5BPeYkeYb4H5vytW7M2tKxeHaakj/29faH75MmwZ9fugDmO0CP8HnrX1t4W0rkg+foMWbnD4XDUGuJ+6IPk73L9/3/77d+a5f9l58zD5f2+oR7+35D6ZeR4Hohk03/wdG+zxBCc/tPahkeb2b/uEyfDsSNHwuOPPeb+f75Iuk0e5NlQEKe1tbWF9evXh61bt4Zrrr2GLxW/7rrrwtq1a8OK733n917AVQeUF79bKSdvTsoUARZWkEd5XVc2El5gNItPMuEqDVdlcgU0NRNHw3hLVG+FYh0OAPvCMJpWNzGwbhGj2L1zd3jtf34zeY0rKIz6Yf8yu44rpvBl2+oAdTqltqRGj7RJjF6Dv9VUPEz2XSeKhkBwhTjKKeENnvg9tG8/nSavbiXF75tXN1P/DFpXMZatA3A4HPVB4nIWy/9/RII/+P9zEiCa/6djjchysazuXk/akbYOzbJzABb4b8xJR6DbIv4cr/hqb2sNq1as5MU/3u/Xe7YnPP7oo+7/LxX5ruaCPOhWJUDPEOht2LAhbN68OVx19VVh06ZNoaOjI6z48Ic/fGFkbIRXK1BiMByCAFmllRi9rAQgMIZnhh+VF4EzDBy3QDn/TghPQzE/PsFt2OfCCnEAmBiL0TG5wtn51Z3hVW/8tkzhbT/DXMpfD5i8s2ZBV4RMZ5DySV4Ef2LIra0tDP4w+tfe1s7RP2FcODc9E44fPBRa2lqyF0Xj6q9pZRPTi2I5XXA4HI6GQDX8/3/9fz8u6/rOO4wQpv6/0ZB55ngCwH+eo+D/hew8gIf+8MAi3u/X2tzC80DzqibZ+0KYmZwWnoyFrzzyRff/l4hM75DGvucDvvw6wPOxXGy0tbaFNXIO7lzXGTZs3MB8S0tL+P8BFPfCmppIxRsAAAAASUVORK5CYII=");}'+
						'  div#standardController {position:relative;z-index:9999999999999999999999; background: no-repeat url("data:image/png;base64,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");}' +
						' ' + customStyleName ? ('div#'+customStyleName+' {position:relative;z-index:99999999999999999999999999999999; background: no-repeat url("'+customStyleData+'");};') : '';
			
			
			var head = window.document.head || window.document.getElementsByTagName("head")[0];
			var style = window.document.createElement("style");
			head.appendChild(style); style.type= 'text/css';
			if (style.styleSheet){ style.styleSheet.cssText = controllerCss; } else {
			  style.appendChild(window.document.createTextNode(controllerCss));
			}
			
		};
		  //ControllerPad._selfStyle();
	tabageos.ControllerPad = ControllerPad;

})();