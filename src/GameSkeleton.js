(function() { 
	'use strict';
	
	function GameSkeleton(specs) {
		if(specs) {
			this.initialConstruction(specs);
		}
		tabageos.EventDispatcher.call(this);
	}
	
	GameSkeleton.prototype = Object.create(tabageos.EventDispatcher.prototype);
	
	GameSkeleton.prototype.initialConstruction = function(specs) {
		
		
		if(GameSkeleton.game) {
			throw "An instance of GameSkeleton has been created already.";
		}
		
		this.gameWidth = specs.gWidth || 640; this.gameHeight = specs.gHeight || 320;
		this.tileWidth = specs.tileW || 16; this.tileHeight = specs.tileH || 16;
		this.lives = specs.initialLives || 3;
		this.controllerHeight = specs.controllerHeight || 144;
		this.initialPlayerPosition = specs.initPlayerPosition || new tabageos.MoverPoint(32,32);
		this.cameraWidth = specs.cameraWidth || (this.gameWidth/2); this.cameraHeight = specs.cameraHeight || (this.gameHeight+1-1);
        
        if(!specs.cameraFollowOffsetX && specs.cameraFollowOffsetX != 0) {
           this.cameraFollowOffsetX = -(this.cameraWidth/2);
        } else {
            this.cameraFollowOffsetX = specs.cameraFollowOffsetX;
        }
       
		this.cameraFollowOffsetY = specs.cameraFollowOffsetY || 0;
		this._initLives = specs.initialLives || 3;
		this._scaleRectRef = new tabageos.Rectangle();
		this.gameFunction = specs.gameLoop;
		this.addedInitializationMethod = specs.initializationSpecifics;
		this.addedResizeMethod = specs.addedResizeMethod;
		this.sceneResetSpecifics = specs.sceneResetSpecifics;
		this.sceneChangeSpecifics = specs.sceneChangeSpecifics;
		this.fullResetSpecifics = specs.fullResetSpecifics;
		this.additionalSceneResetSpecifics = specs.additionalSceneResetSpecifics;
		this.positionResetSpecifics = specs.positionResetSpecifics;
        this._cameraType = specs.cameraType || 0; 
		this.backgroundColor = specs.backgroundColor || "#FFFFFF";
        
		this.disableBackgroundAlpha = (specs.disableBackgroundAlpha === 0 ? 0 : (specs.disableBackgroundAlpha || 1));
		
		this.initForISO = specs.initForISO || 0;
		
		this.beforeStartGameLoop = specs.beforeStartGameLoop || null;
		
		this.useSceneChanger = specs.useSceneChanger === 0 ? 0 : 1;
		
		this.tweenLimitX = specs.tweenLimitX || 0;
		this.tweenLimitY = specs.tweenLimitY || 0;
		
		this.cameraTweenType = specs.cameraTweenType || "InOutLinear";
		this.frameRate = specs.frameRate || 60;
		this.frameTime = 1000/this.frameRate;
		
		this._helperPoint = new tabageos.MoverPoint();
		this._helperRect = new tabageos.Rectangle(0,0,this.tileWidth, this.tileHeight);
		this.gameScale = specs.gameScale || 1.01;
		this.hudScale = specs.hudScale || this.gameScale;
		this.walkthroughLink = specs.walkthroughLink || "";
		
		this.topDownSceneChange = specs.topDownSceneChange || 0;
		
		this.startLocations = specs.startLocations || null;
		
		this.enableGamePad = specs.enableGamePad || 0;
		this.underCoverSpecifics = specs.underCoverSpecifics || null;
		
		this.priorToSceneChange = specs.priorToSceneChange || null;
		
		this.afterSceneChange = specs.afterSceneChange || null;
		this.autoPause = ( specs.autoPause === 0 ? 0 : 1);

		this._manuelControllerUse = specs.specialControllerUse || 0;
		
		this.onSelectLevel = specs.onSelectLevel || null;
		
        GameSkeleton.game = this;
		GameSkeleton.game._pr = window.performance.now();
		this.__specs = specs;
        if(!specs.controllerDivId) {
            window.console.log("GameSkeleton: no controller div id given, a ControllerPad will not be created");
        }
        GameSkeleton.establish(this, specs.spriteSheetImage || null, specs.containerDivId || "container", specs.rootDivId || "root", specs.controllerDivId , specs.gameScale === 0 ? 0 : (specs.gameScale||2), specs.useScreenOrganizer === false ? false : true, specs.startWidth || 50, specs.startHeight || 25);

		
	};

	GameSkeleton.STANDARD_CAMERA = 1;
	GameSkeleton.STILL_CAMERA = 2;
    GameSkeleton.prototype._cameraType = 0;
    GameSkeleton.prototype.enableGamePad = 0;
	GameSkeleton.prototype.backgroundColor = "#FFFFFF";
	GameSkeleton.prototype.disableBackgroundAlpha = 1;
	GameSkeleton.prototype.useSceneChanger = 1;
	GameSkeleton.prototype.topDownSceneChange = 0;
	GameSkeleton.prototype.device = 0;
	GameSkeleton.prototype.paused = 0;
	GameSkeleton.prototype._thrott = 0;
	GameSkeleton.prototype._aid;
	GameSkeleton.prototype._pr = -1;
	GameSkeleton.prototype._ts = 1;
	GameSkeleton.prototype._textTime = 0;
	GameSkeleton.prototype._doReset = 0;
	GameSkeleton.prototype._doAlternate = 0;
	GameSkeleton.game = null;
	GameSkeleton.prototype.cameraLayer;
	GameSkeleton.prototype.backgroundLayer;
	GameSkeleton.prototype.display;
	GameSkeleton.prototype.charLayer;
	GameSkeleton.prototype.gameWidth;
	GameSkeleton.prototype.gameHeight;
	GameSkeleton.prototype.camera = null;
	GameSkeleton.prototype.sceneChanger = null;
	GameSkeleton.prototype.cameraWidth;
	GameSkeleton.prototype.cameraHeight;
	GameSkeleton.prototype.cameraFollowOffsetX;
	GameSkeleton.prototype.cameraFollowOffsetY;
	GameSkeleton.prototype.title;
	GameSkeleton.prototype.startButton;
	GameSkeleton.prototype.controllerHeight;
	GameSkeleton.prototype.container;
	GameSkeleton.prototype.root;
	GameSkeleton.prototype.controller;
	GameSkeleton.prototype.gameScale = 1.01;
	GameSkeleton.prototype.hudScale = 1.01;
	GameSkeleton.prototype.tileWidth = 16;
	GameSkeleton.prototype.tileHeight = 16;
	GameSkeleton.prototype.startLocations = null;
	
	GameSkeleton.prototype.gameOverContainer;
	GameSkeleton.prototype.creditsContainer;
	GameSkeleton.prototype.speechBubble;
	
	GameSkeleton.prototype.player = null;
	GameSkeleton.prototype.initialPlayerPosition;
	GameSkeleton.prototype.lives = 3;
	GameSkeleton.prototype._initLives = 3;
	
	GameSkeleton.prototype.screenOrganizer = null;
	GameSkeleton.prototype._image = null;
	GameSkeleton._loadedSpriteSheet = null;
	
	GameSkeleton.prototype.resizeRootForNoTouch = 0;
	GameSkeleton.prototype.dontResizeVertical = 0;
	GameSkeleton.prototype.dontResizeHorizontal = 0;
	
	GameSkeleton.prototype.horizontalCameraMove = 0;
	GameSkeleton.prototype.verticalCameraMove = 0;
	
	GameSkeleton.prototype.cameraTweenType = "InOutLinear";
	GameSkeleton.prototype.frameRate = 60;
	GameSkeleton.prototype.frameTime = (1000/60);// * (60 / (60) ) - (1000/60) * 0.5;
	
	GameSkeleton.prototype.addedInitializationMethod = null;
	GameSkeleton.prototype.addedResizeMethod = null;
	GameSkeleton.prototype.gameFunction = null;
	GameSkeleton.prototype.sceneResetSpecifics = null;
	GameSkeleton.prototype.fullResetSpecifics = null;
	GameSkeleton.prototype.additionalSceneResetSpecifics = null;
	GameSkeleton.prototype.positionResetSpecifics = null;
	GameSkeleton.prototype.alternateLoopMethod = null;
	GameSkeleton.prototype.sceneChangeSpecifics = null;
	GameSkeleton.prototype.priorToSceneChange = null;
	GameSkeleton.prototype.afterSceneChange = null;
	GameSkeleton.prototype.beforeStartGameLoop = null;
	GameSkeleton.prototype.underCoverSpecifics = null;
	GameSkeleton.prototype.onSelectLevel = null;
	
    GameSkeleton.prototype._HUD = null;
    GameSkeleton.prototype.hPause = null;
    GameSkeleton.prototype.hReset = null;
    GameSkeleton.prototype.hMute = null;
    GameSkeleton.prototype.hExit = null;
    GameSkeleton.prototype.hWalkthrough = null;
	GameSkeleton.prototype.walkthroughLink = "";
	
	GameSkeleton.prototype._playerHUD = null;
	GameSkeleton.prototype._healthBar = null;
	GameSkeleton.prototype._scoreTextDisplay = null;
	GameSkeleton.prototype._manuelControllerUse = 0;
	GameSkeleton.prototype.initForISO = 0;
	GameSkeleton.prototype._helperPoint = null;
	GameSkeleton.prototype._helperRect = null;
	
	GameSkeleton.prototype.__specs = null;
	GameSkeleton._str = ["","","","","","","","","","","",""];
	
	GameSkeleton.prototype.healthBarIsDisplayed = 0;
	GameSkeleton.prototype.scoreTextIsDisplayed = 0; 
	
	GameSkeleton.prototype.soundSystem = null;
	GameSkeleton.prototype._mute = 0;
	GameSkeleton.prototype.autoPause = 1;
	GameSkeleton.prototype._lhelperPoint = null;
	GameSkeleton.prototype._lhelperRect = null;
	
	GameSkeleton.prototype._lightCanvas = null;
	/**
	* Call this first to set up lighting.
	*  Then just call readyLights or animateLights,
	*  and then readyAdditionalLights or animateAdditionalLights if needing more than 1 light.
	*  a dim as 1 and composion as 1 causes the whole screen to be black except for the light areas.
	*  Performance actually increases significantly when that is done because most of the screen becomes just black.
	*  But a 2 composition and decimal dim values will slow down the game if used in too large of an area or with too many lights.
	*  But if what your after is a grey day effect or some similar color application to the whole scene a decimal dim and some color value with a 2 composition is what to use.
	*  If you want for example fire to be lit around the player, a dim of 1 with red as the color and 2 as composition would allow for that, and you'd have a colored fire animation that you'd then pass to animateLights.
	*/
	GameSkeleton.prototype.initializeLights = function(dim, color, composition) {
		var ths = tabageos.GameSkeleton.game;
		ths._lhelperPoint = new tabageos.MoverPoint();
		ths._lhelperRect = new tabageos.Rectangle();
		ths._lightCanvas = new tabageos.CanvasObject(null,ths.gameWidth, ths.gameHeight);
		ths._lightCanvas.context.fillStyle = color;
		ths.changeLightShade(dim,color);
		ths._lightCanvas.context.fillRect(0,0,ths.gameWidth,ths.gameHeight);
		ths._lightComp = ths.lightType(composition || 1);
		
		return true;
	};
	GameSkeleton.prototype._lightDim = .5;
	GameSkeleton.prototype.changeLightShade = function(dim,color) {
		if(!tabageos.GameSkeleton.game._lightCanvas) return;
		if(dim || dim === 0) {
			tabageos.GameSkeleton.game._lightDim = dim;
		}
		if(color) {
			tabageos.GameSkeleton.game._lightCanvas.context.fillStyle = color;
		}
		
	};
	GameSkeleton.prototype.turnOffLights = function(dim, apply) {
		if(!tabageos.GameSkeleton.game._lightCanvas) return;
		dim = dim || tabageos.GameSkeleton.game._lightDim;
		tabageos.GameSkeleton.game._lightCanvas.context.globalAlpha  = dim;
		tabageos.GameSkeleton.game._lightCanvas.context.clearRect(0,0,tabageos.GameSkeleton.game.gameWidth,tabageos.GameSkeleton.game.gameHeight);
		tabageos.GameSkeleton.game._lightCanvas.context.globalAlpha  = dim;
		if(dim && dim != 1) {
			tabageos.GameSkeleton.game._lightCanvas.context.fillRect(0,0,tabageos.GameSkeleton.game.gameWidth,tabageos.GameSkeleton.game.gameHeight);
		}
		if(apply) {
			tabageos.GameSkeleton.game.applyLights();
		}
	};
	GameSkeleton.prototype.turnOnLights = function(fromRect,toX,toY, apply) {
		if(!tabageos.GameSkeleton.game._lightCanvas) return;
		var ths = tabageos.GameSkeleton.game;
		ths._lhelperPoint.x = toX; ths._lhelperPoint.y = toY;
		ths._lightCanvas.copyPixels(ths._image, fromRect, ths._lhelperPoint);
		
		if(apply) {
			ths.applyLights();
		}
		
	};
	GameSkeleton.prototype._lightComp = 'destination-in';//'multiply';
	GameSkeleton.prototype.lightType = function(number) {
		if(!number) {
			return tabageos.GameSkeleton.game._lightComp;
		}
		if(number != 1) {
			return 'multiply';
		} else {
			return 'destination-in';
		}
	};
	GameSkeleton.prototype.readyLights = function(fromRect,toX,toY, composition) {
		if(tabageos.GameSkeleton.game._lightCanvas) {
			tabageos.GameSkeleton.game._lightComp = tabageos.GameSkeleton.game.lightType(composition);
			tabageos.GameSkeleton.game.turnOffLights();
			tabageos.GameSkeleton.game.turnOnLights(fromRect,toX,toY);
			tabageos.GameSkeleton.game.applyLights();
		}
		
	};
	GameSkeleton.prototype.readyAdditionalLights = function(fromRect,toX,toY, composition) {
		if(tabageos.GameSkeleton.game._lightCanvas) {
			tabageos.GameSkeleton.game._lightComp = tabageos.GameSkeleton.game.lightType(composition);
			tabageos.GameSkeleton.game.turnOnLights(fromRect,toX,toY);
			tabageos.GameSkeleton.game.applyLights();
		}
		
	};
	GameSkeleton.prototype.animateLights = function(canvasAnimation,toX,toY, speed, composition) {
		if(tabageos.GameSkeleton.game._lightCanvas) {
			tabageos.GameSkeleton.game._lightComp = tabageos.GameSkeleton.game.lightType(composition);
			tabageos.GameSkeleton.game.turnOffLights();
			canvasAnimation.animate(speed || .5);
			tabageos.GameSkeleton.game.turnOnLights(canvasAnimation.fromRect,toX,toY);
			tabageos.GameSkeleton.game.applyLights();
		}
		
	};
	GameSkeleton.prototype.animateAdditionalLights = function(canvasAnimation,toX,toY, speed, composition) {
		if(tabageos.GameSkeleton.game._lightCanvas) {
		
			tabageos.GameSkeleton.game._lightComp = tabageos.GameSkeleton.game.lightType(composition);
			canvasAnimation.animate(speed || .5);
			tabageos.GameSkeleton.game.turnOnLights(canvasAnimation.fromRect,toX,toY);
			tabageos.GameSkeleton.game.applyLights();
		}
	};
	GameSkeleton.prototype._doLights = 0;
	GameSkeleton.prototype.applyLights = function() {
		if(!tabageos.GameSkeleton.game._lightCanvas) return;
		tabageos.GameSkeleton.game._doLights = 1;
	};
	//happens in _loop after the cameras tweenedBlitLayerRender method 
	//cameras globalCompositeOperation is changed then it copys the _lightCanvas
	//then its globalCompositeOperation is changed back.
	GameSkeleton.prototype._actualApplyLights = function(to) {
		var ths = tabageos.GameSkeleton.game;
		
		if(ths._doLights) {
		
			ths._lhelperRect.x= 0;ths._lhelperRect.y = 0;ths._lhelperRect.width = ths.gameWidth; ths._lhelperRect.height = ths.gameHeight;
			ths._lhelperPoint.x = 0; ths._lhelperPoint.y = 0;
			(to || ths.cameraLayer).context.globalCompositeOperation = ths._lightComp;//'multiply';//'destination-in';
			(to || ths.cameraLayer).copyPixels(ths._lightCanvas.canvas, ths._lhelperRect, ths._lhelperPoint );
			(to || ths.cameraLayer).context.globalCompositeOperation = 'source-over';
			ths._doLights = 0;
		} 
		
	};
	

    GameSkeleton.prototype.createHud = function() {

        var listnfr = tabageos.seekTouch() ? (tabageos._pointerEvents ? "pointerdown" : "touchstart") : "click";
        var gref = GameSkeleton.game;
			
        gref._HUD = document.createElement("div");
        gref._HUD.setAttribute("id", "headsUpDisplay");
        gref._HUD.setAttribute("style", "position:absolute; top:0px;width:160px;height:32px;z-index:999999999999999999999999999999999999999999999999999999999999999999999999999999999999;background: no-repeat url('data:image/png;base64,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'");

        document.body.appendChild(gref._HUD);
        gref.hPause = document.createElement("div");
        gref.hPause.setAttribute("style", "position:absolute;top:0px;left:0px;width:32px;height:32px;background:rgba(255,255,255,0.1)");
        gref._HUD.appendChild(gref.hPause);
        gref.hPause.addEventListener(listnfr, gref.pause, false);
        
        gref.hReset = document.createElement("div");
        gref.hReset.setAttribute("style", "position:absolute;top:0px;left:32px;width:32px;height:32px;background:rgba(255,255,255,0.1)");
        gref._HUD.appendChild(gref.hReset);
        gref.hReset.addEventListener(listnfr, gref.goBack, false);
        
        gref.hMute = document.createElement("div");
        gref.hMute.setAttribute("style", "position:absolute;top:0px;left:64px;width:32px;height:32px;background:rgba(255,255,255,0.1)");
        gref._HUD.appendChild(gref.hMute);
        gref.hMute.addEventListener(listnfr, gref.muteUnmute, false);
        
        gref.hExit = document.createElement("div");
        gref.hExit.setAttribute("style", "position:absolute;top:0px;left:96px;width:32px;height:32px;background:rgba(255,255,255,0.1)");
        gref._HUD.appendChild(gref.hExit);
        gref.hExit.addEventListener(listnfr, gref.hudExit, false);
        
        gref.hWalkthrough = document.createElement("div");
        gref.hWalkthrough.setAttribute("style", "position:absolute;top:0px;left:128px;width:32px;height:32px;background:rgba(255,255,255,0.1)");
        gref._HUD.appendChild(gref.hWalkthrough);
        gref.hWalkthrough.addEventListener(listnfr, gref.hudToWalkthrough, false);

		gref._playerHUD = document.createElement("div");
		gref._playerHUD.setAttribute("id", "playerStatDisplay");
        gref._playerHUD.setAttribute("style", "position:absolute; top:0px;width:"+(gref.cameraWidth)+"px;height:"+(gref.cameraHeight/4)+"px;z-index:999999999999999999999999999999999999999999999999999999999999999999999999999999999999;");
		gref._healthBar = document.createElement("div");
		gref._scoreTextDisplay = document.createElement("div");
		
		gref._playerHUD.appendChild(gref._healthBar);
		gref._playerHUD.appendChild(gref._scoreTextDisplay);
		
		this.container.appendChild(gref._playerHUD);

    };
	//new
	GameSkeleton.prototype.valuesMatch = function(v1,v2) {
		return tabageos.BlitMath.valuesMatch(v1,v2);
	};
	
	GameSkeleton.prototype._playerHudParts = [0];
	GameSkeleton.prototype.setupCustomHealthHud = function( backgroundId ) {
		
		GameSkeleton.game.hideHUD();
		GameSkeleton.game._playerHUD.style.display = "inline";
		if(backgroundId) {
			GameSkeleton.game._healthBar.setAttribute("id", backgroundId);
		}
	};
	
	GameSkeleton.prototype.changeCustomHud = function( backgroundId, x, y, additionalStyle ) {
		
		
		if(backgroundId) {
			GameSkeleton.game._healthBar.setAttribute("id", backgroundId);
		}
		GameSkeleton.game._healthBar.setAttribute("style", "left:"+(x||0)+"px;top:"+(y||0)+"px" + (additionalStyle || ""));
		
	};
	
	GameSkeleton.prototype.addToCustomHud = function( divID, style ) {
		
		var div = document.createElement("div");
		div.setAttribute("id", divID);
		div.setAttribute("style", style);
		GameSkeleton.game._healthBar.appendChild(div);
		GameSkeleton.game._playerHudParts.push(div);
		return GameSkeleton.game._playerHudParts.length - 1;
		
	};
	
	GameSkeleton.prototype.getCustomHudPart = function(partNumber) {
		
		return GameSkeleton.game._playerHudParts[partNumber || 1];
		
	};
	GameSkeleton.prototype.removeCustomHudParts = function() {
		
		var i = 1;
		for(i;i<GameSkeleton.game._playerHudParts.length;i++) {
			
			GameSkeleton.game._healthBar.removeChild(GameSkeleton.game._playerHudParts[i]);
			
		}
		GameSkeleton.game._playerHudParts = [0];
	};
	
	GameSkeleton.prototype.hideCustomHud = function() {
		
		GameSkeleton.game.hideHealthBar();
	};
	
	GameSkeleton.prototype.showCustomHud = function(health, firstColor, secondColor, height, replacementStyle, additionalStyle) {
		
		GameSkeleton.game.showHealthBar(health, firstColor, secondColor, height, replacementStyle, additionalStyle);
	};
	
	
	
	
	
	
	
	
	//new
	GameSkeleton._volumeSliderFimg = null;
	GameSkeleton._volumeSliderBimg = null;	
	GameSkeleton._volumeSliderFront = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAQCAYAAACBSfjBAAAA00lEQVRYR2NkYGD4zzAKyA4BRg4evv+hwelYDVi9diZYfFQed/jAA9DLVRclELftvsyAHICj8tjDZzQAoTmM3AQyGoCUBqCmgMB/E/9UBmwxcGbjbHC2HpXHHT6MowFIWQIZDUAKcxjWALx19TLDzkNnGd5fPYc1C4/KI8IHIwBBgQMCuAJwVB41fFACEBY4uAJwVB4SeMjhAw5AQW0jBnc7Y5SGNHIKHJXHHT6jAcjAwEBJAhkNQGoFILbRBFgtDIqhUXnMEACFD+PocBbZI1lgjQDrfnmQJjfmSAAAAABJRU5ErkJggg==";
	GameSkeleton._volumeSliderBack = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAQCAYAAADpunr5AAABb0lEQVRYR+2YsUoDQRCG57oIEiLCYashQoKVIBYhjTaSNu/gQ+Ud0oqNNpJCBCu5gKK2ISAGEUx38l8yce8yE8ztlrPd7r93xf/NzuxOREQp2fBxIPL6uLJdTU9bR+I/7pOnbN103Z/Z99cSwE68lwXz52QsQpH0iAE0DnZzEF7ePsgFYLrsDwOAuaPLY3p/HVL3ZmsFAvSr8x/ar7ep2X9c6gZgccLLBhgAsPkcwUUIrvm8hyEYgEAAOLqLEDDXNKSqqFmrpfFhi6QImDwn2f9M1/0ZTadZvpeiHCcBA2lHOx0GwDPAGIAGwS2sUn0wAAEBrIOgFWcRwOD2gXpnJzS8vhNTkOl//rgnIAgAmIuhATA970/QFMTmagBMn5vv+hOkCLcvOuSaWwRguu4PAGg3IDzI/nUNNYPLByADwCu41EMM7wAD4AeAi2+pVgQDyDWCFhO+BQGQ6asOwJ9iEcaujZpx1o4WY2uTRa929C8sYfw+WfhqmQAAAABJRU5ErkJggg==";
	GameSkeleton._volumeSliderCords = {x:0,y:0};
	GameSkeleton.prototype._sliderForOtherThanVolume = 0;
	
	GameSkeleton.prototype.volumeSliderPosition = function(x,y) {
		
		GameSkeleton._volumeSliderCords.x = x+1-1;
		GameSkeleton._volumeSliderCords.y = y+1-1;
		
	};
	GameSkeleton.prototype._volumeSliderAnimation = null;
	GameSkeleton.prototype._volumeSliderDiv = null;
	
	GameSkeleton.prototype._sliderValue = 1;
	GameSkeleton._volumeSliderHandler = function(e) {
		
		var xoff = e.offsetX;
		
		if(xoff > 85 && !GameSkeleton.game._volumeSliderAnimation.nox) { 
			if(GameSkeleton.game._volumeSliderDiv && GameSkeleton.game.container.contains(GameSkeleton.game._volumeSliderDiv)) {
				GameSkeleton.game._volumeSliderDiv.removeEventListener("click", GameSkeleton._volumeSliderHandler);
				GameSkeleton.game.container.removeChild(GameSkeleton.game._volumeSliderDiv);
			}
			if(GameSkeleton.game._volumeSliderAnimation._canvas == GameSkeleton.game.charLayer) {
				GameSkeleton.game.charLayer.context.clearRect(0,0,GameSkeleton.game.gameWidth,GameSkeleton.game.gameHeight);
				GameSkeleton.game.callCamera(1);
			}
			
			GameSkeleton.game._doAlternate = 0;
			return;
		}
		
		if(xoff > 80) { xoff = 80; }
		if(xoff < 0) { xoff = 0; }
		GameSkeleton.game._topota = (xoff/8)/10;
		GameSkeleton.game._sliderValue = (xoff/8)/10;
		if(!GameSkeleton.game._sliderForOtherThanVolume) {
			GameSkeleton.game.soundSystem.changeVolume( (xoff/8)/10 );
		} else {
			GameSkeleton.game.dispatchEvent(    new tabageos.Event('volumeSliderEvent', (xoff/8)/10 )    );
		}
	};
	GameSkeleton.prototype.removeVolumeSliderAnimation = function() {
		
		if(GameSkeleton.game._volumeSliderDiv && GameSkeleton.game.container.contains(GameSkeleton.game._volumeSliderDiv)) {
			GameSkeleton.game._volumeSliderDiv.removeEventListener("click", GameSkeleton._volumeSliderHandler);
			GameSkeleton.game.container.removeChild(GameSkeleton.game._volumeSliderDiv);
		}
		
	};
	
	GameSkeleton.prototype.initVolumeSliderAnimation = function(x,y, clayer, nox, dontChangeVolume) {
		var ths = GameSkeleton.game;
		if(GameSkeleton.game._volumeSliderDiv) {
			GameSkeleton.game._volumeSliderAnimation.nox = 0;
			GameSkeleton._volumeSliderHandler({offsetX:90});
			GameSkeleton.game._volumeSliderAnimation = null;
		}
		if(!ths._volumeSliderAnimation) {
			GameSkeleton._volumeSliderBimg = new Image();
			GameSkeleton._volumeSliderBimg.src = GameSkeleton._volumeSliderBack;
			GameSkeleton._volumeSliderFimg = new Image();
			GameSkeleton._volumeSliderFimg.src = GameSkeleton._volumeSliderFront;
			var millis = 15 + 24 * 9 * 7 + 4 + Math.PI + 51;
			
			ths._volumeSliderAnimation = new tabageos.CanvasAnimation(GameSkeleton._volumeSliderBimg,clayer || ths.charLayer,new tabageos.Rectangle(0,0,(nox ? 80 : 96),16),0,0,(nox ? 80 : 96),16);
			ths._volumeSliderAnimation.nox = nox || 0 ;
		}
		ths.volumeSliderPosition(x,y);
		ths._volumeSliderAnimation.x= x;
		ths._volumeSliderAnimation.y= y;
		
		if(dontChangeVolume) {
			GameSkeleton.game._sliderForOtherThanVolume = 1;
		}
		
	};
	
	//new
	GameSkeleton.prototype._topota = 0;
	
	GameSkeleton.prototype.volumeSliderLoop = function(ts) {
		
		var ths = GameSkeleton.game;
		
		if(ths.controller) {
			
			if(!GameSkeleton.game._sliderForOtherThanVolume) {
				if(ths.controller.buttons.left) {ths.controller.buttons.left = 0;
					if(ths.soundSystem._globalVolume > 0.1) {
						ths.soundSystem.changeVolume(ths.soundSystem._globalVolume - .1);ths._sliderValue = ths.soundSystem._globalVolume+1-1;
					}
				}
				if(ths.controller.buttons.right) {ths.controller.buttons.right = 0;
					if(ths.soundSystem._globalVolume < .9) {
						ths.soundSystem.changeVolume(ths.soundSystem._globalVolume + .1);ths._sliderValue = ths.soundSystem._globalVolume+1-1;
					}	
				}
				
			} else {
				if(!ths._topota) ths._topota = ths.soundSystem._globalVolume+1-1;
				
				
				if(ths.controller.buttons.left && ths._topota > 0.1 ) {ths.controller.buttons.left = 0;
					ths._topota -= .1;GameSkeleton.game.dispatchEvent(    new tabageos.Event('volumeSliderEvent', ths._topota )    );ths._sliderValue = ths._topota+1-1;
				} 
				if(ths.controller.buttons.right && ths._topota < .9) {ths.controller.buttons.right = 0;
					ths._topota += .1;GameSkeleton.game.dispatchEvent(    new tabageos.Event('volumeSliderEvent', ths._topota )    );ths._sliderValue = ths._topota+1-1;
				}
				
				
			}
			
			
		}
		
		if(!GameSkeleton.game._volumeSliderDiv) {
			ths._volumeSliderDiv = document.createElement("div");
			ths._volumeSliderDiv.setAttribute("style", "cursor:pointer;position:absolute;top:"+GameSkeleton._volumeSliderCords.y+"px;left:"+GameSkeleton._volumeSliderCords.x+"px;width:96px;height:16px;z-index:9999999999999999999999999999999999999999999999999999999999999999999");
			ths._volumeSliderDiv.removeEventListener("click", GameSkeleton._volumeSliderHandler);
			ths._volumeSliderDiv.addEventListener("click", GameSkeleton._volumeSliderHandler);
			ths.container.appendChild(ths._volumeSliderDiv);
		} else if(!GameSkeleton.game.container.contains(ths._volumeSliderDiv)) {
			ths._volumeSliderDiv.setAttribute("style", "cursor:pointer;position:absolute;top:"+GameSkeleton._volumeSliderCords.y+"px;left:"+GameSkeleton._volumeSliderCords.x+"px;width:96px;height:16px;z-index:9999999999999999999999999999999999999999999999999999999999999999999");
			ths._volumeSliderDiv.removeEventListener("click", GameSkeleton._volumeSliderHandler);
			ths._volumeSliderDiv.addEventListener("click", GameSkeleton._volumeSliderHandler);
			ths.container.appendChild(ths._volumeSliderDiv);
		}
		
		if(!GameSkeleton.game._volumeSliderAnimation) { 
			GameSkeleton._volumeSliderBimg = new Image();
			GameSkeleton._volumeSliderBimg.src = GameSkeleton._volumeSliderBack;
			GameSkeleton._volumeSliderFimg = new Image();
			GameSkeleton._volumeSliderFimg.src = GameSkeleton._volumeSliderFront;
			var millis = 15 + 24 * 9 * 7 + 4 + Math.PI + 51;
			ths._volumeSliderAnimation = new tabageos.CanvasAnimation(GameSkeleton._volumeSliderBimg,ths.charLayer,new tabageos.Rectangle(0,0,96,16),0,0,96,16);
			ths._volumeSliderAnimation.x= GameSkeleton._volumeSliderCords.x +1-1;
			ths._volumeSliderAnimation.y= GameSkeleton._volumeSliderCords.y +1-1;
		}
		
		ths._volumeSliderAnimation._source = GameSkeleton._volumeSliderBimg;
		ths._volumeSliderAnimation.fromRect.width = ths._volumeSliderAnimation.nox ? 80 : 96;
		ths._volumeSliderAnimation.blit();
			
		ths._volumeSliderAnimation._source = GameSkeleton._volumeSliderFimg;
		ths._volumeSliderAnimation.fromRect.width = (ths._sliderValue * 80);
		ths._volumeSliderAnimation.blit();
		
		//ths.pixelParagraph(GameSkeleton._volumeSliderCords.x,GameSkeleton._volumeSliderCords.y + 17,10,"Arrows to change.A to go back.");
		
		
		ths.callCamera(ts);
	};
	GameSkeleton.prototype.showHealthBar = function(health, firstColor, secondColor, height, replacementStyle, additionalStyle) {
		
		if(height && height > 80) { height = 80; }
		GameSkeleton.game._healthBar.setAttribute("style", replacementStyle || "position:absolute; top:0px;width:"+(health||100)+"px;height:"+(height||10)+"px;border:thin solid black;background:linear-gradient("+(firstColor||'red')+","+(secondColor||'#ffc8c8')+","+(firstColor||'red')+");"+additionalStyle);
		GameSkeleton.game.healthBarIsDisplayed = 1;
	};
	GameSkeleton.prototype.hideHealthBar = function() {
		GameSkeleton.game._healthBar.setAttribute("style", "display:none");
		GameSkeleton.game.healthBarIsDisplayed = 0;
	};
	
	GameSkeleton.prototype.showScoreText = function(value, topPosition, width, height,additionalStyle) {
		
		GameSkeleton.game._scoreTextDisplay.setAttribute("style", "position:absolute; top:"+(topPosition||0)+"px;width:"+(width||160)+"px;height:"+(height||70)+"px;background:none;"+additionalStyle);
		GameSkeleton.game._scoreTextDisplay.innerHTML = value + "";
		GameSkeleton.game.scoreTextIsDisplayed = 1;
	};
	GameSkeleton.prototype.hideScoreText = function() {
		GameSkeleton.game._scoreTextDisplay.setAttribute("style", "display:none");
		GameSkeleton.game.scoreTextIsDisplayed = 0;
	};
	GameSkeleton.prototype.changeHUDBackgroundImage = function(imageString) {
		
		GameSkeleton.game._HUD.setAttribute("style", "position:absolute; top:0px;width:160px;height:32px;z-index:999999999999999999999999999999999999999999999999999999999999999999999999999999999999;background: no-repeat url('"+imageString+"')");

	};

	GameSkeleton.prototype.establishKeyEventsForReset = function() {
		
		window.removeEventListener("keyup", this.reset, false);
		window.addEventListener("keyup", this.reset, false);
	};
	
	GameSkeleton.prototype.mouseMoveOffset = 32;
	GameSkeleton.prototype.mousePoint = null;
	GameSkeleton.prototype.setupMouseTouchHandle = function(handleMouseHeldDown) {
		this.mousePoint = new tabageos.MoverPoint();
		this.container.removeEventListener("mousemove", this.handleMouseTouchMove, false);
		this.container.removeEventListener("touchmove", this.handleMouseTouchMove, false);
        this.container.addEventListener("mousemove", this.handleMouseTouchMove, false);
		this.container.addEventListener("touchmove", this.handleMouseTouchMove, false);
		
		this.container.removeEventListener("pointermove", this.handleMouseTouchMove, false);
       
		
		this.container.addEventListener("pointermove", this.handleMouseTouchMove, false);
		
		
		if(handleMouseHeldDown) {
			this.container.removeEventListener("mousedown", this.handleMouseDown, false);
			this.container.addEventListener("mousedown", this.handleMouseDown, false);
			this.container.removeEventListener("pointerdown", this.handleMouseDown, false);
			this.container.addEventListener("pointerdown", this.handleMouseDown, false);
			this.container.removeEventListener("pointerup", this.handleMouseUp, false);
			this.container.addEventListener("pointerup", this.handleMouseUp, false);
			this.container.removeEventListener("mouseup", this.handleMouseUp, false);
			this.container.addEventListener("mouseup", this.handleMouseUp, false);
		}
		
	};
	GameSkeleton.prototype.takeDownMouseTouchHandle = function() {
		
		this.container.removeEventListener("mousemove", this.handleMouseTouchMove, false);
		this.container.removeEventListener("touchmove", this.handleMouseTouchMove, false);
        
		this.container.removeEventListener("pointermove", this.handleMouseTouchMove, false);
       
		
			this.container.removeEventListener("mousedown", this.handleMouseDown, false);
			
			this.container.removeEventListener("pointerdown", this.handleMouseDown, false);
			
			this.container.removeEventListener("pointerup", this.handleMouseUp, false);
			
			this.container.removeEventListener("mouseup", this.handleMouseUp, false);
			
		
		
	};
	GameSkeleton.prototype.handleMouseTouchMove = function(e) {
       var dmrect = tabageos.GameSkeleton.game.container.getBoundingClientRect();
		//var dmrect = tabageos.GameSkeleton.game._scaleRectRef;
		
        if(e && e.targetTouches && e.targetTouches.length) {
            var i = 0;
            for (i; i < e.targetTouches.length; i++) {
                var touches = e.targetTouches[i];
                var tx = touches.pageX;
                var ty = touches.pageY;
                tabageos.GameSkeleton.game.mousePoint.x = tx - dmrect.x + tabageos.GameSkeleton.game.camera.v.x - tabageos.GameSkeleton.game.mouseMoveOffset;  
                tabageos.GameSkeleton.game.mousePoint.y = ty - dmrect.y + tabageos.GameSkeleton.game.camera.v.y - tabageos.GameSkeleton.game.mouseMoveOffset;
            }
        } else {
 
            var upmp = tabageos.MouseController.mouseMoverPoint();
            tabageos.GameSkeleton.game.mousePoint.x = upmp.x - dmrect.x + tabageos.GameSkeleton.game.camera.v.x - tabageos.GameSkeleton.game.mouseMoveOffset;
			tabageos.GameSkeleton.game.mousePoint.y = upmp.y - dmrect.y + tabageos.GameSkeleton.game.camera.v.y - tabageos.GameSkeleton.game.mouseMoveOffset;
			
        }
    };
	GameSkeleton.prototype.mouseIsDown = 0;
	GameSkeleton.prototype.handleMouseDown = function(e) {
		
		tabageos.GameSkeleton.game.mouseIsDown = 1;
		
	};
	GameSkeleton.prototype.handleMouseUp = function(e) {
		
		tabageos.GameSkeleton.game.mouseIsDown = 0;
		
	};
	
	GameSkeleton.prototype.basicInitialize = function(containerDivId, rootDivId, displayWidth,displayHeight, cameraWidth,cameraHeight, controllerDivId, useScreenOrganizer, startWidth,startHeight, dontUseSceneChanger, justCreateController) {
			//window.console.log("b ini");
			this.container = document.getElementById(containerDivId);
			this.root = useScreenOrganizer ? new tabageos.CanvasObjectContainer(rootDivId, cameraWidth,cameraHeight) : document.getElementById(rootDivId);
			
			this.cameraWidth = cameraWidth;
			this.cameraHeight = cameraHeight;
			this.frameTime = (1000/60) * (60 / this.frameRate ) - (1000/60) * 0.5;
			
			this.backgroundLayer = new tabageos.CanvasObject(null, displayWidth, displayHeight,0,0,GameSkeleton.game.disableBackgroundAlpha,0);
			
			this.backgroundLayer.drawRect(new tabageos.Rectangle(0,0,displayWidth, displayHeight), this.backgroundColor);
			if(displayWidth < 4000) {
				this.display = new tabageos.CanvasObject(null, displayWidth, displayHeight,0,0,0);
			} else {
				this.display = {"placeHolder":1};
			}
			
			this.charLayer = new tabageos.CanvasObject(null,displayWidth,displayHeight);
			this.cameraLayer = new tabageos.CanvasObject(null, cameraWidth, cameraHeight,0,0,1);
			if(!useScreenOrganizer) this.root.appendChild(this.cameraLayer.canvas);
			
			this.speechBubble = document.createElement("textarea");
			
			this.speechBubble.setAttribute("style", "background: #ffffffaa;border-radius:20px;width:250px;height:150px;position:absolute;border: thin solid black;display:none");
			//document.body.appendChild(this.speechBubble);
			
            if(controllerDivId && !this.controller) {
                this.controller = new tabageos.ControllerPad(justCreateController ? null : document.getElementById(controllerDivId));
                this.controller.establish( );
                if(!justCreateController) this.controller.basicControllerButtonSetup();
                this.controller.acceptWASDAndArrows();
               
                if(!justCreateController) this.controller.assignStartAndBackMethods("maybeStartGame", "maybeGoBack", GameSkeleton.game);
            }
			
            this.camera = new tabageos.BasicCamera(this.cameraLayer, this.backgroundLayer, this.display, this.charLayer);
            
			if(this.initForISO) {
				
				this.camera.viewPortWidth = cameraWidth;
				this.camera.viewPortHeight = cameraHeight;
			}
			
            if(displayWidth > cameraWidth) {
                this.camera.v.width = displayWidth - cameraWidth; 
            } else {
                this.camera.v.width = cameraWidth; 

            }
			
			this.camera.cameraFollowOffsetX = this.cameraFollowOffsetX;
			this.camera.cameraFollowOffsetY = this.cameraFollowOffsetY;

            this.camera.v.height = cameraHeight;
			
			this.cameraPoint = new tabageos.MoverPoint();
			GameSkeleton.game._doReset = 0;
			GameSkeleton.game._doAlternate = 0;
			GameSkeleton.game._endingLevel = 0;
			GameSkeleton.game.paused = 0;
			
			if(useScreenOrganizer) { 
				this.title = new tabageos.CanvasObjectContainer(null, cameraWidth,cameraHeight, null, "#ffffff");
				
				this.gameOverContainer = new tabageos.CanvasObjectContainer(null,cameraWidth,cameraHeight, null, "#ffffff"); 
				
				this.startButton = document.createElement("div");
				this.startButton.innerHTML = " Start ";
				var swid = startWidth || (cameraWidth/8); var shei = startHeight || (cameraHeight/8);
				this.startButton.setAttribute("style", "color:black;position:absolute;text-align:center;width:"+swid+"px;height:"+shei+"px;left:"+( this.startLocations ? this.startLocations.x : ((cameraWidth/2) - (swid/2)) )+"px;top:"+(this.startLocations ? this.startLocations.y : ((cameraHeight/2) - (shei/2) ))+"px;cursor:pointer;z-index:9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999");
				this.startButton.addEventListener((tabageos.seekTouch() ? (tabageos._pointerEvents ? "pointerdown" : "touchstart") : "mouseup"), GameSkeleton.game.changeToMainCamera, false);
				
				this.title.div.appendChild(this.startButton);
				if(this.__specs.screenOrganizerType) {
					this.screenOrganizer = new tabageos[this.__specs.screenOrganizerType](this.root, [this.title, this.cameraLayer, this.gameOverContainer], null);
				} else {
					this.screenOrganizer = new tabageos.IrisScreenOrganizer(this.root, [this.title, this.cameraLayer, this.gameOverContainer], null);
				}
				this.screenOrganizer.changeScreen(0);
				
				
				if(!dontUseSceneChanger) {
					this.sceneChanger = new tabageos.TileSceneChanger(this._image, this.display, this.gameWidth,this.gameHeight, this.tileWidth, this.tileHeight, this.player);
					
					
				}
			
			}

            this.createHud();
			if(!this.soundSystem) {//changes volume back to full when new
			
				if(tabageos.GameSkeleton.__preloadSoundSystem != null) {
					this.soundSystem = tabageos.GameSkeleton.__preloadSoundSystem;
				} else {
					this.soundSystem = new tabageos.SoundSystem();
				}
			
				tabageos.GameSkeleton.__preloadSoundSystem = null;
			}
			this.useClintBlockFont();
			
			if(this.addedInitializationMethod) {   
				this.addedInitializationMethod(); 
				
				
				if(this.player && this.initialPlayerPosition) {  this.player.setX(this.initialPlayerPosition.x);  this.player.setY(this.initialPlayerPosition.y); }  
			
				if(this.sceneChanger) {
					
					if(this.player) {
						
						this.sceneChanger.mainChar = this.player;
						
					}
				}
            }
			this.title.floor.canvas.setAttribute("style","image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;image-rendering: pixelated;image-rendering: crisp-edges;");
			this.gameOverContainer.floor.canvas.setAttribute("style","image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;image-rendering: pixelated;image-rendering: crisp-edges;");
			
			if(this.horizontalCameraMove) {
				
				GameSkeleton.game.cameraPoint.x = -9999;
				
			}
			if(this.verticalCameraMove) {
				
				GameSkeleton.game.cameraPoint.y = -9999;
			}
			
			if(this.autoPause) {
				
				this.enableAutoPause();
			}
			
			
            if(!this.player) {
                window.console.log("a player has not been created, set this.player to some new Character Class");
            }
			
			if(this.__worker === null) { 
				this.initWorkerLoop();
			} else if(this.__worker === 1) {
				this.__worker = 0;
				
			}
			
	};
	GameSkeleton.prototype.enableAutoPause = function() {
				window.onblur = function(e) {
					if(!tabageos.GameSkeleton.game.paused) {
						tabageos.GameSkeleton.game.pause();
					}
					if(tabageos.GameSkeleton.game._mute == 0) {
						tabageos.GameSkeleton.game.muteUnmute();
					}
				};
				window.onfocus = function(e) {
					if(tabageos.GameSkeleton.game.paused) {
						tabageos.GameSkeleton.game.pause();
					}
					if(tabageos.GameSkeleton.game._mute == 1) {
						tabageos.GameSkeleton.game.muteUnmute();
					}
				};
	};
	GameSkeleton.prototype.disableAutoPause = function() {
				window.onblur = function(e) {
					
				};
				window.onfocus = function(e) {
					
				};
	};
	
	
    
    GameSkeleton.prototype.muteUnmute = function() {
		
		GameSkeleton.game._mute = GameSkeleton.game._mute ? 0 : 1;
			if(GameSkeleton.game._mute) { 
				GameSkeleton.game.soundSystem.stopMusic();//st
			} else {
				GameSkeleton.game.soundSystem.playMusic();
			}
		return GameSkeleton.game._mute +1-1;
    };
	
	GameSkeleton.prototype.playSound = function(soundString, poolAmount, stype) {
		if(this.soundSystem._soundNames.indexOf(soundString) === -1) {
			this.soundSystem.addSound(soundString+(stype||".ogg"),soundString,this.soundSystem._globalVolume,poolAmount || 2);
		}
		
		if(!this._mute) {
			this.soundSystem.playSound(soundString, 1);
		}
	};
	GameSkeleton.prototype.playMusic = function(soundString, loop, stype, index) {
		if(soundString) {
			this.soundSystem.clearMusicTracks();
			this.soundSystem.addMusic(soundString+(stype||".ogg"),this.soundSystem._globalVolume,loop === 0 || loop === -1 ? 0 : 1);
		}
		if(!this._mute) {
			this.soundSystem.playMusic(index || 0);
		}
	};
	
	
	GameSkeleton.basicPlatformerSceneryRoutine = function(player, checkToThrowMethod, checkToPickUpMethod, thePickUpMethod, tileValuesArray, sceneryObjects, sceneryObjectLayer, landLayer, source, map, tw, th, maxThrowSpeed, minThrowSpeed, gameWidth, gameHeight, hp, sceneChanger) {
		
		
		var i = 0;var obj;var ttw = tw||16; var tth = th||16;var re = false;
						
						if(player.holding && checkToThrowMethod()) {
							
							obj = player.throwSceneryObjectTraveler(16,16,1,1);
							obj.xDirection = player._leftRightFace == 1 ? 1 : 0;
							obj._jumpSpeed = 10;
							obj._fromEnemyAi = 0;
							obj._map = player._map;
							obj._walkSpeed = Math.abs(player._veloc.x) >= player._walkSpeed ? maxThrowSpeed||14 : minThrowSpeed||4;
							obj._veloc.y = -(Math.abs(player._veloc.y) < player._walkSpeed ? 2 : 3);obj._state = 3;
							obj._solidSit = 0;obj._eHit = 0;obj._grounded = 0;
							sceneryObjects.push(obj);
						}
						
						
						for(i;i < sceneryObjects.length;i++) {//move and interact with sceneryObejcts
							obj = sceneryObjects[i];
							
							if(sceneChanger) {
								sceneChanger.sceneryObjectSceneChange(obj,sceneryObjects,ttw-4,gameWidth-ttw,0,0);
							}
							if(!obj) break;//
							
							if(!obj._grounded) { //until it lands on the ground, move the scenery object
									//no longer try to move horizontally once it reaches a horizontal collision
								if(obj._pLeft || obj._pRight) { obj.xDirection = -2; }
								
								//move applies velocity ._veloc, in the desired direction.
								obj.move(obj.xDirection != -2 ? (obj.xDirection ? 0 : 1) : 0,  obj.xDirection != -2 ? obj.xDirection : 0,  0, 0, 1);
							} else {
								obj._eHit = 0;
								obj._fromEnemyAi = 0;
							
							}
							sceneryObjectLayer.copyPixels(source,obj.tileRect, obj._pos,ttw,tth);//
							
							var exrec = obj.getRectangle(); exrec.x -= 2; exrec.width += 4;
							//
							var checkToPickUp = checkToPickUpMethod();
							if(!player.holding && (checkToPickUp) && tabageos.GeometricMath.rectanglesOverlapAmount(exrec, player.getRectangle())/ttw > 0) {
								
								
								if(!thePickUpMethod) {
									player.pickUp(obj);
								} else {
									
									thePickUpMethod(obj);
									
								}
								sceneryObjects.splice(sceneryObjects.indexOf(obj),1);
								sceneryObjectLayer.context.clearRect(obj.x,obj.y,ttw,tth);
								re = true;
								
								break;
								
							}
							
							
						
						}
						
						
						if(player.holding) {
						
							sceneryObjectLayer.copyPixels(source,player.holding.tileRect, player._pos,ttw,tth);
							
						}
		
		return re;
		
		
	};
	
	GameSkeleton.basicTopDownSceneryRoutine = function(player, checkToThrowMethod, checkToPickUpMethod, thePickUpMethod, tileValuesArray, sceneryObjects, sceneryObjectLayer, landLayer, source, map, tw, th, maxThrowSpeed, minThrowSpeed, gameWidth, gameHeight, hp) {
		
		var i = 0;var obj;var objtile;//move and interact with sceneryObejcts.
		var ttw = tw||16; var tth = th||16;
		var xts = maxThrowSpeed || 14; var mts = minThrowSpeed || 4;
		var throwSpeed = (xts - mts) / 2;
		
		var helperPoint = hp || (tabageos.GameSkeleton.game ? tabageos.GameSkeleton.game._helperPoint : new tabageos.MoverPoint());
		
		if(!gameWidth) {
			
			gameWidth = tabageos.GameSkeleton.game.gameWidth;
		}
		if(!gameHeight) {
			gameHeight = tabageos.GameSkeleton.game.gameHeight;
		}
		if(!tileValuesArray) {
			tileValuesArray = [];
		}
		var re = false;
		
                if(player.holding && checkToThrowMethod()) {//throw what the player is holding when q is pressed
                    
					
                    obj = player.throwSceneryObjectTraveler(ttw,tth,1, player.holding.setX ? 1 : 0);
					
                    obj.xDirection = player._leftRightFace == 1 ? 1 : 0;
                    obj._fromEnemyAi = 0;
                    obj._jumps = 0;
                    obj._map = player._map;
                    obj._walkSpeed = Math.abs(player._veloc.x) >= player._walkSpeed ? xts : mts;
                    obj._veloc.y = -(Math.abs(player._veloc.y) < player._walkSpeed ? 2 : 3);obj._state = 3;
                    obj._solidSit = 0;obj._eHit = 0;obj._grounded = 0;
                    sceneryObjects.push(obj);
                }
                
              
                
                for(i;i < sceneryObjects.length;i++) {
                    obj = sceneryObjects[i];//sceneryObjects is a reference to the stored array in the sceneChanger holding the SceneryObjects for the currentScene.
                    
                    
                    if(!obj) break;//objects can be thrown quickly into other scenes, its remotely possible for them to be thrown fast enough to cause this, when transfering from sceneryObejcts to an array stored in the TileSceneChanger.
                    
                    if(!obj._grounded) { //_grounded is being used to run this block once.
                                    
                        obj.maxSpeed = 25; obj.maxForce = 50;
                        obj._veloc.x = player._veloc.x*throwSpeed;//set the veloctity to throwSpeed times players velocity that will send it foward.
                        obj._veloc.y = player._veloc.y*throwSpeed;
                        if(obj._veloc.x == 0 && obj._veloc.y == 0) {//if player is not moving determine veloc based on players animation direction, and use less velocity.
                            obj._veloc.x = player._canvasAnimation.currentAnimation.indexOf("right") != -1 ? throwSpeed : (player._canvasAnimation.currentAnimation.indexOf("left") != -1 ? -(throwSpeed) : 0);
                            obj._veloc.y = player._canvasAnimation.currentAnimation.indexOf("down") != -1 ? throwSpeed : (player._canvasAnimation.currentAnimation.indexOf("up") != -1 ? -(throwSpeed) : 0);
                        }
                        obj.update();//apply velocity and handle collisions.
                        obj._grounded = 1;//manually set grounded, which is a setting normally for objects with gravity, but we are not using gravity, we've set _jumps to 0 for all objects and the player.
                    } else {//if grounded is 1.
                      
                      
                        if(!obj._solidSit) {//if the obejct is not stopped.
                            obj._veloc.x *= .9;//apply friction.
                            obj._veloc.y *= .9;//friction causes veloc to reach 0 eventually.
                            obj.update();//update applies veloc to position and potentially collides.
                            obj._grounded = 1;//keep grounded at 1.
                        }
                        if(obj._veloc.x < 1 && obj._veloc.y < 1 && obj._veloc.x > -1 && obj._veloc.y > -1 && !obj._solidSit) {
                            //if it has basically stopped, make the tile position it is in solid. And mark it to not move anymore.
                            objtile = tabageos.BlitMath.checkTileValueAt(obj.x,obj.y,map,ttw,tth,helperPoint);
                            if(objtile[0] == 0 && objtile[1] == 0) {
                                player._map[helperPoint.y][helperPoint.x] = obj.tileValue;//checkTilveValueAt is a loose check returning the tile closest to the x,y given, and placing the index of the exact tile found into _helperPoint.
                                obj.setX(helperPoint.x*ttw);obj.setY(helperPoint.y*tth);
                                obj._solidSit = 1;
                                obj._eHit = 0;
                          
                            }
                        }
                    
                    }
                    //draw the SceneryObject.
                    sceneryObjectLayer.copyPixels(source,obj.tileRect, obj._pos,ttw,tth);
                    
                    var exrec = obj.getRectangle(); exrec.x -= 2; exrec.width += 4; exrec.y -= 2; exrec.height += 4;
					var checkToPickUp = checkToPickUpMethod();
                    //picking up a SceneryObject that has been picked up before and thrown or that is a RPGSceneryObject added above
                     if(!player.holding && (checkToPickUp) && tabageos.GeometricMath.rectanglesOverlapAmount(exrec, player.getRectangle())/ttw > 0) {
                      
                        
                      
                        if(!thePickUpMethod) {
                            player.pickUp(obj);
                        } else {
							
							thePickUpMethod(obj);
							
						}
                        //remove scenery object
                        sceneryObjects.splice(sceneryObjects.indexOf(obj),1);
                        sceneryObjectLayer.context.clearRect(obj.x,obj.y,ttw,tth);
                        objtile = tabageos.BlitMath.checkTileValueAt(obj.x,obj.y,player._map,ttw,tth,helperPoint);
                        if(objtile[0] != 0 || objtile[1] != 0) {
                            if(player._map[helperPoint.y] && player._map[helperPoint.y][helperPoint.x]) {
                                player._map[helperPoint.y][helperPoint.x] = [0,0];
                            }
                        }
						re = true;
                        break;
                      
                    } else if (!player.holding && (!checkToPickUp) && tabageos.GeometricMath.rectanglesOverlapAmount(exrec, player.getRectangle())/ttw > 0) {
                        
                        if(obj.description) {
                          
                          re = obj.abilityDescription;
                          
                          
                        }    
                        
                        
                    }
                
                }
              
              
                if(player.holding) {//draw what the player is holding.
                    helperPoint.x = player.x +8;
                    helperPoint.y = player.y +4;
                    sceneryObjectLayer.copyPixels(source,player.holdingRect,helperPoint,ttw,tth);
                }
                var svn = ttw+2;
				
                var tileRight = tabageos.BlitMath.checkTileValueAt(player.x + svn,player.y,map,ttw,tth, helperPoint);
                var tileLeft = tabageos.BlitMath.checkTileValueAt(player.x - 2,player.y,map,ttw,tth, helperPoint);
                var tileUp = tabageos.BlitMath.checkTileValueAt(player.x ,player.y - 2,map,ttw,tth, helperPoint);
                var tileDown = tabageos.BlitMath.checkTileValueAt(player.x,player.y + svn,map,ttw,tth, helperPoint);
                //the optional last param of checkTileValueAt lets us do the above, therefpre helperPoint will only be populated if the result is the value we gave.
				
				i = 0;var tileNextTo = 0;
				for(i; i < tileValuesArray.length; i++) {
					
					if(tabageos.BlitMath.valuesMatch(tileValuesArray[i],tileRight)) {
						
						tileNextTo = tileRight; break;
					}
					if(tabageos.BlitMath.valuesMatch(tileValuesArray[i],tileLeft)) {
						
						tileNextTo = tileLeft; break;
					}
					if(tabageos.BlitMath.valuesMatch(tileValuesArray[i],tileUp)) {
						
						tileNextTo = tileUp; break;
					}
					if(tabageos.BlitMath.valuesMatch(tileValuesArray[i],tileDown)) {
						
						tileNextTo = tileDown; break;
					}
				}
				
              
                //if any tile around the player is a SceneryObject, one of the throwable tiles, and the b button is pressed, pick it up from the map.
                if(!player.holding && tileNextTo && checkToPickUpMethod() && tabageos.BlitMath.valuesMatch(player._map[helperPoint.y][helperPoint.x], tileNextTo) ) {//because of checkTileValueAt behavior, we can check all the values together
					//create a TileData Object to be picked up.
                    var td = tabageos.TileData.make(helperPoint.x*ttw,helperPoint.y*tth,tileNextTo);//and still we know that helperPoint is only set to the matching value found.
					//picking up TileData.
                    player.pickUpTileData(td);
					//remove TileData from the currentMap, this method also redraws for the spot the tile was at.
                    tabageos.BlitMath.removeTileData(td,map,landLayer,source,ttw,tth,gameWidth,gameHeight,1);
					//update the players map to be able to walk past the spot
                    player._map[helperPoint.y][helperPoint.x] = [0,0];
					re = true;
                }
		
		
		return re;
		
		
	};
	
	
	GameSkeleton.seeAndChaseRoutine = function(obj,enemies,player,helperPoint,chaseRadius, dontOnlyChaseToX, separationDistance, map,tw,th) {
		var blft,brght;
		
		if(map) {
			
			//rightTile = tabageos.BlitMath.checkTileValueAt(obj.x + obj.width + 4,obj.y+obj.height-2,map,tw,th);
			//leftTile = tabageos.BlitMath.checkTileValueAt(obj.x - 4,obj.y+obj.height-2,map,tw,th);
			//rightTile = (rightTile[0] === 0 || rightTile[0]) ? (rightTile[0] == 0 && (!rightTile[1] || rightTile[1] == 0)) : (rightTile == 0);
			//leftTile = (leftTile[0] === 0 || leftTile[0]) ? (leftTile[0] == 0 && (!leftTile[1] || leftTile[1] == 0)) : (leftTile == 0);
			
			brght = tabageos.BlitMath.checkTileValueAt(obj.x + obj.width + 4,obj.y+obj.height+2,map,tw,th);
			blft = tabageos.BlitMath.checkTileValueAt(obj.x - 4,obj.y+obj.height+2,map,tw,th);
			
			blft = (blft[0] === 0 || blft[0]) ? (blft[0] == 0 && (!blft[1] || blft[1] == 0)) : (blft == 0);
			brght = (brght[0] === 0 || brght[0]) ? (brght[0] == 0 && (!brght[1] || brght[1] == 0)) : (brght == 0);
			
			
		}
		
		if(!obj._grounded && obj._jumps) { 
			obj._state = 3;obj._veloc.y = 4; 
		}
		
        if(obj._pRight || (map && brght)) { //collision detect and change direction
            obj.dX = obj._pLeft ? 0 : 1;
        } else if (obj._pLeft || (map && blft)) {
            obj.dX = 0;
        }
		if(tabageos.GeometricMath.testForPointInCircle(obj._pos,chaseRadius || (128),player._pos) && !obj._pRight && !obj._pLeft) {
			helperPoint.x = player.x+1-1; helperPoint.y = dontOnlyChaseToX ? player.y+1-1 : obj.y+1-1;
			obj.easeTo(helperPoint);
			obj.separationDistance = separationDistance || 48;
			if(enemies && enemies.length >=2) { obj.separate(enemies); obj.align(enemies); }
			if(!obj._pRight && !(map && brght && player.x > obj.x) && !obj._pLeft && !(map && blft && player.x < obj.x)) {
				obj.update(0,0,0);
			} else { if(obj.autoAnimation) obj.autoAnimation(); }
			if(obj.x < player.x) {
				obj.dX = 0;//opposite of ease direction
			} else if (obj.x > player.x + player.width) {
				obj.dX = 1; 
			}
			
		} else {
			if(obj._pRight || (map && brght)) {
				obj.dX = obj._pLeft ? 0 : 1;
			} else if (obj._pLeft || (map && blft)) {
				obj.dX = 0;
			}
			obj.move(obj.dX,obj.dX ? 0 : 1,0,0,0);
		}
		
	};
	
	
	GameSkeleton.prototype.maybeStartGame = function(e) {
			
		if(tabageos.GameSkeleton.game.screenOrganizer.currentScreen === 0) {
			//title screen
			tabageos.GameSkeleton.game.changeToMainCamera(e);
		} 
		if(tabageos.GameSkeleton.game.screenOrganizer.currentScreen === 2) {
			//game over screen
			tabageos.GameSkeleton.game.hudExit();
		}
		if(tabageos.GameSkeleton.game.screenOrganizer.currentScreen === 1) {
			
			tabageos.GameSkeleton.game.pause(e);
		}
		
	};
	GameSkeleton.prototype.maybeGoBack = function(e) {
		
		if(tabageos.GameSkeleton.game.screenOrganizer.currentScreen === 2) {
				//game over screen
			tabageos.GameSkeleton.game.hudExit();
		}
		if(tabageos.GameSkeleton.game.screenOrganizer.currentScreen === 1) {
			tabageos.GameSkeleton.game.goBack();
		}
		
	};
	
	
	GameSkeleton.prototype.changeToMainCamera = function(e) {
		
		if(e) e.preventDefault();//
		GameSkeleton.game.startButton.removeEventListener((tabageos.seekTouch() ? (tabageos._pointerEvents ? "pointerdown" : "touchstart") : "mouseup"), GameSkeleton.game.changeToMainCamera, false);
		
		if(GameSkeleton.game.screenOrganizer) {
			GameSkeleton.game.screenOrganizer.addEventListener(tabageos.ScreenChangeEvent.COVER, "startGameLoop", GameSkeleton.game);
	
			GameSkeleton.game.screenOrganizer.switchScreen(1);
		} else { 
		
			GameSkeleton.game.startGameLoop();
		}
	
	};
	
	
	GameSkeleton.prototype.updateAndResetCamera = function(horizontalOffset,verticalOffset,ts) {
		if(horizontalOffset) {
			this.cameraPoint.x = Math.round(this.player.x) + horizontalOffset;
			this.cameraPoint.y = Math.round(this.player.y) -  this.cameraFollowOffsetY;
			
			this.camera.reset( this.camera.width,this.camera.v.y );
			this.camera.tweenedBlitLayerRender(this.cameraPoint, this.tweenLimitX || 0,this.tweenLimitY || 0, this._frameTimeCalc(),this.cameraTweenType,0,0);
		}
		if(verticalOffset) {
			this.cameraPoint.x = Math.round(this.player.x) - this.cameraFollowOffsetX;;
			this.cameraPoint.y = Math.round(this.player.y) + verticalOffset;
			
			this.camera.reset( this.camera.v.x,this.camera.height );
			this.camera.tweenedBlitLayerRender(this.cameraPoint, this.tweenLimitX || 0,this.tweenLimitY || 0, this._frameTimeCalc(),this.cameraTweenType,0,0);
		}
		if(!horizontalOffset && !verticalOffset) {
			
			
			
			this.cameraPoint.x = Math.round(this.player.x) - this.cameraFollowOffsetX;
			this.cameraPoint.y = Math.round(this.player.y) -  this.cameraFollowOffsetY;
			
			this.camera.reset( 0,0 );
			this.camera.tweenedBlitLayerRender(this.cameraPoint, this.tweenLimitX || 0,this.tweenLimitY || 0, this._frameTimeCalc(),this.cameraTweenType,0,0);
		
			
		}
		this.sceneChanger._cameraPoint.x = this.cameraPoint.x+1-1;
		this.sceneChanger._cameraPoint.y = this.cameraPoint.y+1-1;
		
	};
	
	
	GameSkeleton.prototype.changeSceneEnemies = function(scene) {
            
			var storedEnemies = this.sceneChanger.getEnemyArray(scene);
			var obj;var i = 0;var  tl;var enemyArray;
			if(storedEnemies) {
				enemyArray = storedEnemies; 
				
				this.updateEnemyMaps(enemyArray);
			} else {
				this.sceneChanger.addEnemyArray([], scene);
				storedEnemies = this.sceneChanger.getEnemyArray(scene);
				enemyArray = storedEnemies;
			}
			return enemyArray;
	};
	GameSkeleton.prototype.changeSceneScenery = function(scene) {
		
		var storedScenery = this.sceneChanger.getStoredArray(scene);
            var sceneryArray;
			if(storedScenery) {
				sceneryArray = storedScenery;
			} else {
				this.sceneChanger.addStoredArray([], scene);
				storedScenery = this.sceneChanger.getStoredArray(scene);
				sceneryArray = storedScenery;
			}
			return sceneryArray;
	};
	
	
	GameSkeleton.prototype.updateEnemyMaps = function(enemies) {
            var i = 0;var en;
            for(i;i<enemies.length;i++) {
				en = enemies[i];
				en._map = this.player._map;
            }
    };
	
	GameSkeleton.prototype.updateSceneryObjectMaps = function(sceneryObjects) {
            var i = 0;var sco;
            for(i;i<sceneryObjects.length;i++) {
				sco = sceneryObjects[i];
				sco._map = this.player._map;
            }
    };
	
	GameSkeleton.prototype.startGameLoop = function(gameFunc) {
		GameSkeleton.game.screenOrganizer.removeEventListener(tabageos.ScreenChangeEvent.COVER, "startGameLoop", GameSkeleton.game);
		if(GameSkeleton.game.beforeStartGameLoop) {
			if(GameSkeleton.game.__specs.transitionBackgroundColor) {
				
				GameSkeleton.game.container.style.backgroundColor = GameSkeleton.game.__specs.transitionBackgroundColor;
			}
			GameSkeleton.game.beforeStartGameLoop();
		}
		
		if(gameFunc && !GameSkeleton.game.gameFunction) {GameSkeleton.game.gameFunction = gameFunc};
		
		GameSkeleton.game.charLayer.canvas.setAttribute("style","image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;image-rendering: pixelated;image-rendering: crisp-edges;");
		GameSkeleton.game.cameraLayer.canvas.setAttribute("style", "image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;image-rendering: pixelated;image-rendering: crisp-edges;");
		if(GameSkeleton.game.display && GameSkeleton.game.display.canvas) {
			GameSkeleton.game.display.canvas.setAttribute("style", "image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;image-rendering: pixelated;image-rendering: crisp-edges;");
		}
		GameSkeleton.game.backgroundLayer.canvas.setAttribute("style", "image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;image-rendering: pixelated;image-rendering: crisp-edges;");
		
		if(!GameSkeleton.game.__worker) {
			
			if(GameSkeleton.game._aid) { window.cancelAnimationFrame(GameSkeleton.game._aid); }
			GameSkeleton.game._aid = window.requestAnimationFrame(GameSkeleton.game._loop);
		} else {
			
			GameSkeleton.game.__workLoop = 1;
			
		}
	};
	
	GameSkeleton.prototype.stopWorker = function(e) {
		
		if(GameSkeleton.game.__worker && GameSkeleton.game.__worker != 1) {
			
			GameSkeleton.game.__worker.terminate();
			GameSkeleton.game.__worker = null;
			GameSkeleton.game.__workLoop = 0;
		}
	};
	
	GameSkeleton.prototype.startWorker = function(e) {
		
		if(GameSkeleton.game.__worker === null) { 
			GameSkeleton.game.initWorkerLoop();
			GameSkeleton.game.__workLoop = 1;
		}
	};
	
	
	GameSkeleton.prototype.readyHorizontalCameraMove = function() {
		
		this.cameraPoint.x = -9999;
	};
	GameSkeleton.prototype.readyVerticalCameraMove = function() {
		
		this.cameraPoint.y = -9999;
	};
	
	GameSkeleton.prototype.tweenLimitX = 0;
	GameSkeleton.prototype.tweenLimitY = 0;
	GameSkeleton.prototype.screenRightExitOffset = 1;
	GameSkeleton.prototype.screenLeftExitOffset = 1;
	GameSkeleton.prototype.screenUpExitOffset = 1;
	GameSkeleton.prototype.screenDownExitOffset = 1;
	GameSkeleton.prototype._shakesToInclude = 0;
	
	
	GameSkeleton.prototype.shake = function(time) {
		GameSkeleton.game.camera.shake(time, GameSkeleton.game.container);
		if(GameSkeleton.game._cameraType == 2) {
			GameSkeleton.game.includeShake(time);
		}
	};
	
	GameSkeleton.prototype.includeShake = function(time) {
		
		GameSkeleton.game._shakesToInclude = Math.round(time / 33.3) + 1;
		if(GameSkeleton.game._shakesToInclude % 2 === 0) {
			GameSkeleton.game._shakesToInclude += 3;
		}
		
	};
	GameSkeleton.prototype.dontEstablishWorkers = function() {
		
		this.__worker = 1;
	};
	
	GameSkeleton.prototype.__workLoop = 0;
	GameSkeleton.prototype.__worker = null;
	GameSkeleton.prototype.changeFrameRate = function(to) {
		
		
		if(GameSkeleton.game && GameSkeleton.game.__worker && GameSkeleton.game.__worker != 1) {
			
			GameSkeleton.game.__worker.postMessage({frameRate:to});GameSkeleton.game.frameRate = to;
			GameSkeleton.game.frameTime = 1000/to;
		} else {
			
			GameSkeleton.game.frameRate = to;
			GameSkeleton.game.frameTime = 1000/to;
		}
	};
	
	GameSkeleton.prototype.changeGameSpeed = function(to) {
		tabageos.TimeKeeper._sae = (1000 / to) - Math.floor(1000/to); 
	};
	
	GameSkeleton.prototype.__loopWorker = function() { 
		
		var blb;var retw = null;
			blb = URL.createObjectURL( new Blob([ '(',
			
				function() {
					var tck = {tick:1};
					var rate = 1000/60;
					var nw = 1;
					var elap = 1;
					var thn = 1;
					var intervl = null;
					onmessage = function(e) {
						if(e.data.frameRate) {
							rate = (1000/e.data.frameRate);
							if(e.data.now) { thn = e.data.now; }
						}
					};
					function constantLoop(ts) {
						
						requestAnimationFrame(constantLoop);
						nw = ts;
						elap = nw - thn;
						tck.tick = nw;
						if(elap > rate) {
							
							self.postMessage(tck);
							thn = (elap % rate);
						}
						
					};
					requestAnimationFrame(constantLoop);
					
				}.toString(),
				
			')()' ], {type: 'application/javascript'} ) );
		
		try {
			retw = new Worker( blb );
		} catch(e) {
			
		}
		return retw;
		
	};
	GameSkeleton.prototype.__methodForWorker = null;
	
	GameSkeleton.prototype.initWorkerLoop = function() { 
		if(!this.__worker) {
			this.__worker = GameSkeleton.game.__loopWorker();
			try {
				GameSkeleton.game.__worker.postMessage({frameRate:GameSkeleton.game.frameRate, now:window.performance.now()});
				
			} catch(e) {
				this.__worker = null;
				
			}
			if(this.__worker != null) {
				this.__workLoop = 0;
				this.__methodForWorker = GameSkeleton.game._loop;
				
				this.__worker.addEventListener("message", function(e) {
				  if(e.data.tick) { GameSkeleton.game._ts = e.data.tick+1-1;
					GameSkeleton.game.__methodForWorker(e.data.tick+1-1);
				  }
				});
			} else {
				
				this.changeFrameRate(GameSkeleton.game.frameRate);
				
				
				
				
			}
		}
	};
	GameSkeleton.prototype.changeMainLoopMethod = function(toThis) {
		
		
		GameSkeleton.game.__methodForWorker = toThis;
		
	};
	GameSkeleton.prototype.restoreMainLoopMethod = function() {
		
		GameSkeleton.game.__methodForWorker = GameSkeleton.game._loop;
		
	};
	GameSkeleton.prototype._el = 0;
	
	GameSkeleton.prototype._loop = function(ts) {
		if(GameSkeleton.game._doReset === 1) {
			return;
		}
		
		if(!GameSkeleton.game.paused && !GameSkeleton.game.__workLoop) {
			if(!GameSkeleton.game.__worker) { 
				GameSkeleton.game._aid = window.requestAnimationFrame(GameSkeleton.game._loop);
			}
		}
		
		if(!GameSkeleton.game.__worker) {
			GameSkeleton.game._ts = ts;
			GameSkeleton.game._thrott = ts;
			GameSkeleton.game._el = GameSkeleton.game._thrott - GameSkeleton.game._pr;
		}
			
			if( (!GameSkeleton.game.paused && GameSkeleton.game.__workLoop) || (!GameSkeleton.game.__worker && !GameSkeleton.game.__workLoop && GameSkeleton.game._el > GameSkeleton.game.frameTime)) {
					
					
					if(!GameSkeleton.game.__worker) {GameSkeleton.game._pr = GameSkeleton.game._thrott - (GameSkeleton.game._el % GameSkeleton.game.frameTime);}
				
					if(!GameSkeleton.game.__workLoop && GameSkeleton.game.__methodForWorker && GameSkeleton.game.__methodForWorker != GameSkeleton.game._loop) {
						GameSkeleton.game.__methodForWorker(1);
						GameSkeleton.game._aid = window.requestAnimationFrame(GameSkeleton.game._loop);
						return;
					}
				
				
					if(GameSkeleton.game._textTime > 0) {
						GameSkeleton.game._textTime -= 33.3;
						if(GameSkeleton.game._textTime <= 0) {
							GameSkeleton.game.hideText();
							GameSkeleton.game._textTime = 0;
						}
					}
					
					if(GameSkeleton.game._doAlternate == 1 && GameSkeleton.game.alternateLoopMethod) {
						
						GameSkeleton.game.alternateLoopMethod(ts);
						GameSkeleton.game._thrott = ts;
						
						if(!GameSkeleton.game.paused && !GameSkeleton.game.__workLoop) {
							window.cancelAnimationFrame(GameSkeleton.game._aid); 
							GameSkeleton.game._aid = window.requestAnimationFrame(GameSkeleton.game._loop);
						}
						return;
					}
					
					if(GameSkeleton.game._cameraType >= 1) {
						
						GameSkeleton.game.charLayer.context.clearRect(GameSkeleton.game.camera.v.x,GameSkeleton.game.camera.v.y,GameSkeleton.game.camera.v.width,GameSkeleton.game.camera.v.height);
					}
					var lsce;
					if(GameSkeleton.game.sceneChanger && GameSkeleton.game.player.x > ((GameSkeleton.game.gameWidth) - GameSkeleton.game.screenRightExitOffset) ) {
						
						lsce = GameSkeleton.game.sceneChanger.currentScene + 1; if (lsce > GameSkeleton.game.sceneChanger._totalScenes.length-1) lsce = 1;
						if(!GameSkeleton.game.sceneChanger._totalScenes[lsce]) lsce = GameSkeleton.game.sceneChanger.currentScene;
						if(GameSkeleton.game.priorToSceneChange) GameSkeleton.game.priorToSceneChange(lsce);
						GameSkeleton.game.sceneChanger.changeScene(0,1,GameSkeleton.game.camera,"sceneChangeSpecifics",GameSkeleton.game,0,0,1,0,GameSkeleton.game.frameTime, GameSkeleton.game._ts,GameSkeleton.game.cameraTweenType); 
						if(GameSkeleton.game.afterSceneChange) GameSkeleton.game.afterSceneChange(lsce);
						
						GameSkeleton.game.camera.renderB1();
						GameSkeleton.game.camera.renderB2();
					
					}
					if(GameSkeleton.game.sceneChanger && GameSkeleton.game.player.x <= ((GameSkeleton.game.tileWidth) - GameSkeleton.game.screenLeftExitOffset) ) {
						
						lsce = GameSkeleton.game.sceneChanger.currentScene - 1; if (lsce == 0) lsce = GameSkeleton.game.sceneChanger._totalScenes.length-1;
						if(!GameSkeleton.game.sceneChanger._totalScenes[lsce]) lsce = GameSkeleton.game.sceneChanger.currentScene;
						if(GameSkeleton.game.priorToSceneChange) GameSkeleton.game.priorToSceneChange(lsce);
						GameSkeleton.game.sceneChanger.changeScene(0,0,GameSkeleton.game.camera,"sceneChangeSpecifics",GameSkeleton.game,0,0,1,0,GameSkeleton.game.frameTime, GameSkeleton.game._ts,GameSkeleton.game.cameraTweenType); 
						if(GameSkeleton.game.afterSceneChange) GameSkeleton.game.afterSceneChange(lsce);
						
						GameSkeleton.game.camera.renderB1();
						GameSkeleton.game.camera.renderB2();
					}
					
					
					if(GameSkeleton.game.topDownSceneChange && GameSkeleton.game.sceneChanger && GameSkeleton.game.player.y >= ((GameSkeleton.game.gameHeight) - GameSkeleton.game.screenDownExitOffset) ) {
						
						lsce = GameSkeleton.game.sceneChanger.currentScene + 1; if (lsce > GameSkeleton.game.sceneChanger._totalScenes.length-1) lsce = 1;
						if(!GameSkeleton.game.sceneChanger._totalScenes[lsce]) lsce = GameSkeleton.game.sceneChanger.currentScene;
						if(GameSkeleton.game.priorToSceneChange) GameSkeleton.game.priorToSceneChange(lsce);
						GameSkeleton.game.sceneChanger.changeScene(0,2,GameSkeleton.game.camera,"sceneChangeSpecifics",GameSkeleton.game,0,1,0,0,GameSkeleton.game.frameTime, GameSkeleton.game._ts,GameSkeleton.game.cameraTweenType); 
						if(GameSkeleton.game.afterSceneChange) GameSkeleton.game.afterSceneChange(lsce);
						
						GameSkeleton.game.camera.renderB1();
						GameSkeleton.game.camera.renderB2();
					
					}
					if(GameSkeleton.game.topDownSceneChange && GameSkeleton.game.sceneChanger && GameSkeleton.game.player.y <= (GameSkeleton.game.screenUpExitOffset)) {
						
						lsce = GameSkeleton.game.sceneChanger.currentScene - 1; if (lsce == 0) lsce = GameSkeleton.game.sceneChanger._totalScenes.length-1;
						if(!GameSkeleton.game.sceneChanger._totalScenes[lsce]) lsce = GameSkeleton.game.sceneChanger.currentScene;
						if(GameSkeleton.game.priorToSceneChange) GameSkeleton.game.priorToSceneChange(lsce);
						GameSkeleton.game.sceneChanger.changeScene(0,3,GameSkeleton.game.camera,"sceneChangeSpecifics",GameSkeleton.game,0,1,0,0,GameSkeleton.game.frameTime, GameSkeleton.game._ts,GameSkeleton.game.cameraTweenType); 
						if(GameSkeleton.game.afterSceneChange) GameSkeleton.game.afterSceneChange(lsce);
						
						GameSkeleton.game.camera.renderB1();
						GameSkeleton.game.camera.renderB2();
					}
					
					GameSkeleton.game.gameFunction();
					
					if(GameSkeleton.game._cameraType === 2) {
						GameSkeleton.game.camera.justRender();
						if(GameSkeleton.game._shakesToInclude) {
							GameSkeleton.game.camera.executeShake();
							GameSkeleton.game._shakesToInclude -= 1;
						}
					}
					
					if(GameSkeleton.game._cameraType === 1) {
						
						if(GameSkeleton.game.horizontalCameraMove) { 
							if(GameSkeleton.game.cameraPoint.x == -9999) {
								GameSkeleton.game.cameraPoint.x = (Math.round(GameSkeleton.game.player.x) - GameSkeleton.game.cameraFollowOffsetX) + (GameSkeleton.game.gameWidth/10);
							}
							GameSkeleton.game.cameraPoint.y = Math.round(GameSkeleton.game.player.y) - GameSkeleton.game.cameraFollowOffsetY;
							GameSkeleton.game.cameraPoint.x += GameSkeleton.game.horizontalCameraMove;
							
							
						} else if (GameSkeleton.game.verticalCameraMove) {
							if(GameSkeleton.game.cameraPoint.y == -9999) {
								GameSkeleton.game.cameraPoint.y = (Math.round(GameSkeleton.game.player.y) - GameSkeleton.game.cameraFollowOffsetY) - (GameSkeleton.game.gameHeight/10);
							}
							GameSkeleton.game.cameraPoint.y -= GameSkeleton.game.verticalCameraMove;
							GameSkeleton.game.cameraPoint.x = Math.round(GameSkeleton.game.player.x) - GameSkeleton.game.cameraFollowOffsetX;
							
						} else { 
							
							GameSkeleton.game.cameraPoint.x = Math.round(GameSkeleton.game.player.x) - GameSkeleton.game.cameraFollowOffsetX; 
							GameSkeleton.game.cameraPoint.y = Math.round(GameSkeleton.game.player.y)- GameSkeleton.game.cameraFollowOffsetY;
						
						}					
						var ftcalc = (!GameSkeleton.game.__worker && !GameSkeleton.game.__workLoop) ?  Math.round(GameSkeleton.game.frameTime / GameSkeleton.game._ts) : GameSkeleton.game.frameTime ;
						GameSkeleton.game.camera.tweenedBlitLayerRender(GameSkeleton.game.cameraPoint, GameSkeleton.game.tweenLimitX || 0,GameSkeleton.game.tweenLimitY || 0, ftcalc ,GameSkeleton.game.cameraTweenType,0,0);
					}
					
					if(GameSkeleton.game._cameraType === 0 && GameSkeleton.game.initForISO) {
						
						
						GameSkeleton.game.camera.isoTweenedBlitLayerRender(GameSkeleton.game.tileWidth,GameSkeleton.game.tileHeight,GameSkeleton.game.player.scene,GameSkeleton.game.player, 
							GameSkeleton.game.camera.cameraFollowOffsetX,GameSkeleton.game.camera.cameraFollowOffsetY, 0,0,60 / GameSkeleton.game._ts,"Linear",0,0);
						
						
					}
					
					if(GameSkeleton.game._doLights) {
						
						GameSkeleton.game._actualApplyLights();
						
					}
					
					
					if(!GameSkeleton.game.controller.gamePadButtonsUserDefined && GameSkeleton.game.enableGamePad) {
					   
						//window.console.log("hmmm");
					   GameSkeleton.game.controller.configureGamePadButtons();
					  
					} else if(GameSkeleton.game.enableGamePad && GameSkeleton.game.controller.gamePadButtonsUserDefined) {
						
						GameSkeleton.game.controller.handleGamePad();
						
					}
					
					
					if(GameSkeleton.game.exitToTitleScreen == 2 && GameSkeleton.game.screenOrganizer) {
							
						if(GameSkeleton.game.screenOrganizer.transitionForward()) {
							GameSkeleton.game.root.removeChild(GameSkeleton.game.screenOrganizer.coverShape);
							GameSkeleton.game.exitToTitleScreen = 0;
							GameSkeleton.game._fullResetToTitle(1);
							return;
						}
					}
					if(GameSkeleton.game.exitToTitleScreen == 1 && GameSkeleton.game.screenOrganizer) {
						
						GameSkeleton.game.root.addChild(GameSkeleton.game.screenOrganizer.coverShape);
						GameSkeleton.game.screenOrganizer.initializeTransition();
						GameSkeleton.game.exitToTitleScreen = 2;
					}
					
					
					

			} 
			
	};
	GameSkeleton.prototype._frameTimeCalc = function() {
		return (!GameSkeleton.game.__worker && !GameSkeleton.game.__workLoop) ?  Math.round(GameSkeleton.game.frameTime / GameSkeleton.game._ts) : GameSkeleton.game.frameTime;
	};
	GameSkeleton.prototype.callCamera = function( ts, pxoffset, pyoffset, playerPosition, alwaysRepositionX, alwaysRepositionY ) {
		GameSkeleton.game.cameraPoint.x = (Math.round(GameSkeleton.game.player.x ) - GameSkeleton.game.cameraFollowOffsetX)+ (pxoffset); 
		GameSkeleton.game.cameraPoint.y = (Math.round(GameSkeleton.game.player.y ) - GameSkeleton.game.cameraFollowOffsetY)+ (pyoffset);
		var gm = GameSkeleton.game;
		if(playerPosition) {
			var ry = playerPosition.y < gm.camera.v.y ? 0 : gm.camera.v.y;
			var rx = playerPosition.x < gm.camera.v.x ? 0 : gm.camera.v.x;
			rx = (gm.camera.v.x + gm.cameraWidth < playerPosition.x || alwaysRepositionX) ? gm.camera.v.x + (gm.gameWidth - (gm.camera.v.x+gm.cameraWidth)) : rx;
			ry = (gm.camera.v.y + (gm.cameraHeight) < playerPosition.y || alwaysRepositionY) ?  gm.camera.v.y  + (gm.gameHeight - (gm.camera.v.y+gm.cameraHeight)) : ry;
			gm.player.setX(playerPosition.x);
			gm.player.setY(playerPosition.y);
			//(playerPosition.x - (gm.camera.v.x + gm.cameraWidth)) + -(gm.cameraFollowOffsetX/(gm.tileWidth/2))
			//(playerPosition.y - -(gm.cameraFollowOffsetY*2)+gm.tileHeight+gm.tileHeight+gm.player.height+gm.tileHeight)
			gm.camera.reset(rx,ry);
			
		}
		var ftcalc = (!GameSkeleton.game.__worker && !GameSkeleton.game.__workLoop) ?  Math.round(GameSkeleton.game.frameTime / GameSkeleton.game._ts) : GameSkeleton.game.frameTime ;
		GameSkeleton.game.camera.tweenedBlitLayerRender(GameSkeleton.game.cameraPoint, GameSkeleton.game.tweenLimitX || 0,GameSkeleton.game.tweenLimitY || 0, ftcalc,GameSkeleton.game.cameraTweenType,0,0);
		
	};
	
	GameSkeleton.prototype.cancelAniFrame = function() {
		window.cancelAnimationFrame(GameSkeleton.game._aid);
	};
	
	GameSkeleton.prototype.pause = function(e) {
        if(e) e.preventDefault();
       
		if(!GameSkeleton.game.screenOrganizer || (GameSkeleton.game.screenOrganizer && GameSkeleton.game.screenOrganizer.currentScreen == 1)) {
			if(!GameSkeleton.game.paused) {
				GameSkeleton.game.paused = 1;
				if(!GameSkeleton.game.__worker) {
					window.cancelAnimationFrame(GameSkeleton.game._aid);  
					GameSkeleton.game._aid = window.requestAnimationFrame(GameSkeleton.game._justGamePad);
				} else {
					GameSkeleton.game.__methodForWorker = GameSkeleton.game._justGamePad;
				}
			} else {
				GameSkeleton.game.paused = 0;
				if(!GameSkeleton.game.__worker) {
					window.cancelAnimationFrame(GameSkeleton.game._aid);  
					GameSkeleton.game._aid = window.requestAnimationFrame(GameSkeleton.game._loop);
				} else {
					GameSkeleton.game.__methodForWorker = GameSkeleton.game._loop;
				}
			}
		}
		
		if(GameSkeleton.game) {
			GameSkeleton.game.dispatchEvent(new tabageos.Event("pauseEvent"));
		}
	};
    GameSkeleton.prototype._justGamePad = function(ts) {
    
        if(GameSkeleton.game._thrott === 0) GameSkeleton.game._thrott = ts;GameSkeleton.game._pr = ts - GameSkeleton.game._thrott;
		if(GameSkeleton.game.controller && (GameSkeleton.game.__worker || GameSkeleton.game._pr >= 15) ) {
			if(!GameSkeleton.game.controller.gamePadButtonsUserDefined && GameSkeleton.game.enableGamePad) {
				GameSkeleton.game.controller.configureGamePadButtons();
			} else if(GameSkeleton.game.controller.gamePadButtonsUserDefined && GameSkeleton.game.enableGamePad) {  
				GameSkeleton.game.controller.handleGamePad();
			}
			GameSkeleton.game._thrott = ts;
		}
		if(GameSkeleton.game.paused && !GameSkeleton.game.__worker) {
			
			window.cancelAnimationFrame(GameSkeleton.game._aid);  
			GameSkeleton.game._aid = window.requestAnimationFrame(GameSkeleton.game._justGamePad);
		}
	};
	GameSkeleton.prototype._textTimeChosen = 0;
	GameSkeleton.prototype.showText = function(text, ttime, tsz, wth, hgt, tp, lft, fontfamilyname, backgroundCss,additionalCss) {
			
			if(!GameSkeleton.game.container.contains(GameSkeleton.game.speechBubble)) {
				GameSkeleton.game._textTime = ttime || 4000;
				GameSkeleton.game._textTimeChosen = GameSkeleton.game._textTime+1-1;
				GameSkeleton.game.speechBubble.setAttribute("style", (fontfamilyname ? "font-family:"+fontfamilyname : "")+";font-size:"+((tsz||16)/5)+"vmin; background: "+(backgroundCss || 'rgba(255,255,255,0.3)')+";text-align:center;border-radius:20px;width:"+(wth ? (wth+"px") : "75%")+";height:"+(hgt ? (hgt+"px") : "44%")+";position:absolute;border: thin solid black;top:"+(tp||0)+"px;left:"+(lft||0)+"px;"+(additionalCss||""));
			
				GameSkeleton.game.speechBubble.value = "\n"+ text.replace(/&#13/g, "\n");
				GameSkeleton.game.container.appendChild(GameSkeleton.game.speechBubble);
				GameSkeleton.game.textShown = 1;
			}
	};
	GameSkeleton.prototype.hideText = function() {
		if(GameSkeleton.game.container.contains(GameSkeleton.game.speechBubble)) {
			GameSkeleton.game.container.removeChild(GameSkeleton.game.speechBubble);
			GameSkeleton.game.textShown = 0;
		}
		
	};
	GameSkeleton.prototype.textIsShown = function() {
		
		return GameSkeleton.game.container.contains(GameSkeleton.game.speechBubble);
		
	};
	GameSkeleton.prototype.textShown = 0;
	GameSkeleton.prototype.textFinished = function() {
		
		return GameSkeleton.game.container.contains(GameSkeleton.game.speechBubble) && GameSkeleton.game._textTime < Math.floor(GameSkeleton.game._textTimeChosen/4);
	};
	GameSkeleton.prototype._setATimeO = 0;
	GameSkeleton.prototype.levelComplete = function(levelCompleteMethod, levelCompleteTime, dontRunAlternate) {
		if(levelCompleteTime && levelCompleteTime <= 1000 && levelCompleteMethod) {
			window.console.warn("levelCompleteMethod will not happen until 1000, so if levelCompleteTime is less than 1000, its like there is no levelCompleteMethod");
		}
		if(!GameSkeleton.game._endingLevel) { 
			if(levelCompleteMethod && !dontRunAlternate) { 
				GameSkeleton.game._doReset = 1;GameSkeleton.game.__workLoop = 0;
				GameSkeleton.game.reset({keyCode:399});
				GameSkeleton.game.alternateLoopMethod = levelCompleteMethod || null;
			} else { //window.console.log("do a");
				if(!levelCompleteMethod) GameSkeleton.game.alternateLoopMethod = null;
				GameSkeleton.game._doAlternate = 1;
			}
			if(levelCompleteTime && !GameSkeleton.game._endingLevel && GameSkeleton.game._setATimeO == 0) {  GameSkeleton.game._setATimeO = 1;
				window.setTimeout( function() {GameSkeleton.game._setATimeO = 0;
					if(GameSkeleton.game._doAlternate && !GameSkeleton.game._endingLevel) {
						GameSkeleton.game._endingLevel =1;
						GameSkeleton.game.screenOrganizer.addEventListener(tabageos.ScreenChangeEvent.COVER, "_changeDoAlternate", GameSkeleton.game);
						GameSkeleton.game.screenOrganizer.changeScreen(1);
					}
				}, levelCompleteTime);
			}
		}
		return;
		
	};
	GameSkeleton.prototype._transitionByDoorTo = 0;
	GameSkeleton.prototype._endingLevel = 0;
	GameSkeleton.prototype.endLevelComplete = function(e) {
		if(!GameSkeleton.game._endingLevel) {
			GameSkeleton.game._endingLevel =1;
			GameSkeleton.game.screenOrganizer.addEventListener(tabageos.ScreenChangeEvent.COVER, "_changeDoAlternate", GameSkeleton.game);
			GameSkeleton.game.screenOrganizer.changeScreen(1);
		}
		
	};
	GameSkeleton.prototype._changeDoAlternate = function(e) {
		GameSkeleton.game.screenOrganizer.removeEventListener(tabageos.ScreenChangeEvent.COVER, "_changeDoAlternate", GameSkeleton.game);
		if(GameSkeleton.game.positionResetSpecifics) {
			GameSkeleton.game.positionResetSpecifics();
		}
		if(GameSkeleton.game.underCoverSpecifics) {
			GameSkeleton.game.underCoverSpecifics();
		}
		if(GameSkeleton.game._transitionByDoorTo) {
			if(GameSkeleton.game.priorToSceneChange) {GameSkeleton.game.priorToSceneChange(GameSkeleton.game._transitionByDoorTo);}
			GameSkeleton.game.sceneChanger.changeScene(0,0,GameSkeleton.game.camera,"sceneChangeSpecifics",GameSkeleton.game,GameSkeleton.game._transitionByDoorTo,0,0,0,GameSkeleton.game.frameTime, GameSkeleton.game._ts,GameSkeleton.game.cameraTweenType); 
			if(GameSkeleton.game.afterSceneChange) {GameSkeleton.game.afterSceneChange(GameSkeleton.game._transitionByDoorTo);}
						
			GameSkeleton.game.camera.renderB1();
			GameSkeleton.game.camera.renderB2();
			GameSkeleton.game._transitionByDoorTo = 0;
		}
		GameSkeleton.game._doAlternate = 0;
		GameSkeleton.game._endingLevel = 0;
		
	};
	GameSkeleton.prototype.gameComplete = function(gameCompleteMethod, autoToTitleTime) {
		
		GameSkeleton.game._doReset = 1;GameSkeleton.game.__workLoop = 0;
		GameSkeleton.game.reset({keyCode:399});
		GameSkeleton.game.alternateLoopMethod = gameCompleteMethod || null;
		
		
		if(autoToTitleTime) {
			window.setTimeout( function() {
				GameSkeleton.game.__workLoop = 0;
				window.cancelAnimationFrame(GameSkeleton.game._aid);
				GameSkeleton.game.fullResetToTitle(0);
			}, autoToTitleTime);
		
		}
		
		return;
		
		
	};
	GameSkeleton.prototype.waitForStart = function(ts) {
		if(GameSkeleton.game.controller.buttons.start) {
			
			GameSkeleton.game.controller.buttons.start = 0;
			GameSkeleton.game._doAlternate = 0;
			
			GameSkeleton.game._fullResetToTitle(0);
			
		}
		
	};
	GameSkeleton.prototype.gameOver = function(onlyRestPositionOnLooseLife, waitTime) { 
			if(GameSkeleton.game.lives > 1) {
				GameSkeleton.game.lives -= 1;
				GameSkeleton.game._doReset = 1;GameSkeleton.game.__workLoop = 0;
				GameSkeleton.game.reset({keyCode:onlyRestPositionOnLooseLife ? 82 : 299});
				
				
				return;
			} else {
				if(GameSkeleton.game.lives == 1) { GameSkeleton.game.lives = 0; 
				//this.lives = this._initLives+1-1;
					window.cancelAnimationFrame(GameSkeleton.game._aid);
					GameSkeleton.game._doReset = 1;GameSkeleton.game.__workLoop = 0;
					GameSkeleton.game.alternateLoopMethod = GameSkeleton.game.waitForStart;
					GameSkeleton.game.screenOrganizer.addEventListener(tabageos.ScreenChangeEvent.SCREEN_CHANGE, "endLevel", GameSkeleton.game);
					GameSkeleton.game.screenOrganizer.switchScreen(2);
					
					
					return;
				}
			}
	};
	GameSkeleton.prototype.goBack = function(e) {
			if(e) e.preventDefault();
			
			if(!GameSkeleton.game.screenOrganizer || (GameSkeleton.game.screenOrganizer && GameSkeleton.game.screenOrganizer.currentScreen == 1)) {
				if(GameSkeleton.game.paused) {
					GameSkeleton.game.fullResetToTitle(0);
				} else {
					window.cancelAnimationFrame(GameSkeleton.game._aid);
					GameSkeleton.game.__workLoop = 0;
					GameSkeleton.game.reset({keyCode:82});
				}
			}
	};
	GameSkeleton.prototype.exitToTitleScreen = 0;
	GameSkeleton.prototype._fullResetToTitle = function() {
		window.cancelAnimationFrame(GameSkeleton.game._aid);
		GameSkeleton.game._doReset = 1;
			GameSkeleton.game.__workLoop = 0;
		//window.setTimeout( function() {
			GameSkeleton.game._theReset();
		//}, 700); return;
		
	};
	GameSkeleton.prototype.fullResetToTitle = function(e) {
		if(GameSkeleton.game.paused) { GameSkeleton.game.pause(); }
		if(GameSkeleton.game.exitToTitleScreen == 0) {
			GameSkeleton.game.exitToTitleScreen = 1;
		}
	};
	GameSkeleton.prototype.simpleReset = function() {
		GameSkeleton.game._doReset = 1;GameSkeleton.game.__workLoop = 0;
		GameSkeleton.game.reset({keyCode:82});
	};
	
	GameSkeleton.prototype.reset = function(e) {
			if (typeof e == 'undefined') e = window.event;
			
			if(e && e.keyCode == 82) {
				window.cancelAnimationFrame(GameSkeleton.game._aid);
				if(GameSkeleton.game.screenOrganizer) { 
					GameSkeleton.game.screenOrganizer.addEventListener(tabageos.ScreenChangeEvent.COVER, "resetPosition", GameSkeleton.game);
					
					GameSkeleton.game.screenOrganizer.changeScreen(1);
				} else {
					GameSkeleton.game.resetPosition(0);
				}
				return;
			}
			
			if(e && e.keyCode == 299) {  
				window.cancelAnimationFrame(GameSkeleton.game._aid);
				if(GameSkeleton.game.sceneResetSpecifics) { GameSkeleton.game.sceneResetSpecifics(); }
				
				if(GameSkeleton.game.screenOrganizer) {
					GameSkeleton.game.screenOrganizer.addEventListener(tabageos.ScreenChangeEvent.COVER, "resetScene", GameSkeleton.game);
					
					GameSkeleton.game.screenOrganizer.changeScreen(1);
				} else {
					
					GameSkeleton.game.resetScene(0);
				}
				return;
			}
			
			if(e && e.keyCode == 399) {
				window.cancelAnimationFrame(GameSkeleton.game._aid);
				
				if(GameSkeleton.game.screenOrganizer) {

					
					GameSkeleton.game.endLevel(0);
				} else {
					
					GameSkeleton.game.endLevel(0);
				}
				return;
			}
			
			
			
	};
		
	GameSkeleton.prototype.resetPosition = function(e) {
			//window.console.log("rp1");
			if(GameSkeleton.game.screenOrganizer) {
				GameSkeleton.game.screenOrganizer.removeEventListener(tabageos.ScreenChangeEvent.COVER, "resetPosition", GameSkeleton.game);
			}
			
			if(GameSkeleton.game.positionResetSpecifics) { //window.console.log("rp");
				GameSkeleton.game.positionResetSpecifics();
			} 
			
			window.setTimeout( function() { GameSkeleton.game._doReset = 0;
				if(GameSkeleton.game.__worker && GameSkeleton.game.__worker != 1) {
					GameSkeleton.game.__workLoop = 1;
				} else { window.cancelAnimationFrame(GameSkeleton.game._aid); 
					GameSkeleton.game._aid = window.requestAnimationFrame(GameSkeleton.game._loop);
				}
				
			}, 1000);
		
	};
	
	GameSkeleton.prototype.resetScene = function(e) {
		
			if(GameSkeleton.game.screenOrganizer) {
				GameSkeleton.game.screenOrganizer.removeEventListener(tabageos.ScreenChangeEvent.COVER, "resetScene", GameSkeleton.game);
			}
			
			if(GameSkeleton.game.positionResetSpecifics) {
				GameSkeleton.game.positionResetSpecifics();
			} 
			
			if(GameSkeleton.game.additionalSceneResetSpecifics) {
				GameSkeleton.game.additionalSceneResetSpecifics();
			}
			
			window.setTimeout( function() { GameSkeleton.game._doReset = 0; 
				if(GameSkeleton.game.__worker) {
					GameSkeleton.game.__workLoop = 1;
				} else { window.cancelAnimationFrame(GameSkeleton.game._aid); 
					GameSkeleton.game._aid = window.requestAnimationFrame(GameSkeleton.game._loop);
				}
			}, 1000);
    };
	
	GameSkeleton.prototype.moveForwardOneScene = function() {
		
		
		var lsce = GameSkeleton.game.sceneChanger.currentScene + 1; if (lsce > GameSkeleton.game.sceneChanger._totalScenes.length-1) lsce = 1;
		if(!GameSkeleton.game.sceneChanger._totalScenes[lsce]) lsce = GameSkeleton.game.sceneChanger.currentScene;
		if(GameSkeleton.game.priorToSceneChange) GameSkeleton.game.priorToSceneChange(lsce);
		GameSkeleton.game.sceneChanger.changeScene(0,1,GameSkeleton.game.camera,"sceneChangeSpecifics",GameSkeleton.game,0,0,1,0,GameSkeleton.game.frameTime, GameSkeleton.game._ts,GameSkeleton.game.cameraTweenType); 
		if(GameSkeleton.game.afterSceneChange) GameSkeleton.game.afterSceneChange(lsce);
		
		GameSkeleton.game.camera.renderB1();
		GameSkeleton.game.camera.renderB2();
		
	};
	
	GameSkeleton.prototype.moveBackOneScene = function() {
		
		var lsce = GameSkeleton.game.sceneChanger.currentScene - 1; if (lsce == 0) lsce = GameSkeleton.game.sceneChanger._totalScenes.length-1;
		if(!GameSkeleton.game.sceneChanger._totalScenes[lsce]) lsce = GameSkeleton.game.sceneChanger.currentScene;
		if(GameSkeleton.game.priorToSceneChange) GameSkeleton.game.priorToSceneChange(lsce);
		GameSkeleton.game.sceneChanger.changeScene(0,0,GameSkeleton.game.camera,"sceneChangeSpecifics",GameSkeleton.game,0,0,1,0,GameSkeleton.game.frameTime, GameSkeleton.game._ts,GameSkeleton.game.cameraTweenType); 
		if(GameSkeleton.game.afterSceneChange) GameSkeleton.game.afterSceneChange(lsce);
		
		GameSkeleton.game.camera.renderB1();
		GameSkeleton.game.camera.renderB2();
		
		
	};
	GameSkeleton.prototype.moveUpOneScene = function() {
		
		var lsce = GameSkeleton.game.sceneChanger.currentScene - 1; if (lsce == 0) lsce = GameSkeleton.game.sceneChanger._totalScenes.length-1;
		if(!GameSkeleton.game.sceneChanger._totalScenes[lsce]) lsce = GameSkeleton.game.sceneChanger.currentScene;
		if(GameSkeleton.game.priorToSceneChange) GameSkeleton.game.priorToSceneChange(lsce);
		GameSkeleton.game.sceneChanger.changeScene(0,3,GameSkeleton.game.camera,"sceneChangeSpecifics",GameSkeleton.game,0,1,0,0,GameSkeleton.game.frameTime, GameSkeleton.game._ts,GameSkeleton.game.cameraTweenType); 
		if(GameSkeleton.game.afterSceneChange) GameSkeleton.game.afterSceneChange(lsce);
			
		GameSkeleton.game.camera.renderB1();
		GameSkeleton.game.camera.renderB2();
		
	};
	GameSkeleton.prototype.moveDownOneScene = function() {
		
		var lsce = GameSkeleton.game.sceneChanger.currentScene + 1; if (lsce > GameSkeleton.game.sceneChanger._totalScenes.length-1) lsce = 1;
		if(!GameSkeleton.game.sceneChanger._totalScenes[lsce]) lsce = GameSkeleton.game.sceneChanger.currentScene;
		if(GameSkeleton.game.priorToSceneChange) GameSkeleton.game.priorToSceneChange(lsce);
		GameSkeleton.game.sceneChanger.changeScene(0,2,GameSkeleton.game.camera,"sceneChangeSpecifics",GameSkeleton.game,0,1,0,0,GameSkeleton.game.frameTime, GameSkeleton.game._ts,GameSkeleton.game.cameraTweenType); 
		if(GameSkeleton.game.afterSceneChange) GameSkeleton.game.afterSceneChange(lsce);
		
		GameSkeleton.game.camera.renderB1();
		GameSkeleton.game.camera.renderB2();
		
	};
	
	GameSkeleton.prototype.gotoSceneByDoor = function(sceneToGoTo) {
		
		//lsce = GameSkeleton.game.sceneChanger.currentScene - 1; if (lsce == 0) lsce = GameSkeleton.game.sceneChanger._totalScenes.length-1;
		//if(!GameSkeleton.game.sceneChanger._totalScenes[lsce]) lsce = GameSkeleton.game.sceneChanger.currentScene;
		if(GameSkeleton.game.priorToSceneChange) GameSkeleton.game.priorToSceneChange(sceneToGoTo);
		GameSkeleton.game.sceneChanger.changeScene(0,0,GameSkeleton.game.camera,"sceneChangeSpecifics",GameSkeleton.game,sceneToGoTo,0,0,0,GameSkeleton.game.frameTime, GameSkeleton.game._ts,GameSkeleton.game.cameraTweenType); 
		if(GameSkeleton.game.afterSceneChange) GameSkeleton.game.afterSceneChange(sceneToGoTo);
		
		GameSkeleton.game.camera.renderB1();
		GameSkeleton.game.camera.renderB2();
		
		
	};
	GameSkeleton.prototype.transitionToSceneByDoor = function(scene, transitionTime) {
		
		this._transitionByDoorTo = scene;
		
		this.levelComplete(null, transitionTime || 1000);
		
	};
	GameSkeleton.prototype._toScene = function(e) {
		
		
	};
	GameSkeleton.prototype._endLevelTime = 1000;
	
	GameSkeleton.prototype.endLevel = function(e) {
			
			if(GameSkeleton.game.screenOrganizer) {
				GameSkeleton.game.screenOrganizer.removeEventListener(tabageos.ScreenChangeEvent.COVER, "endLevel", GameSkeleton.game);
				GameSkeleton.game.screenOrganizer.removeEventListener(tabageos.ScreenChangeEvent.SCREEN_CHANGE, "endLevel", GameSkeleton.game);
			}
			
			window.setTimeout( function() { GameSkeleton.game._doReset = 0;  GameSkeleton.game._doAlternate = 1;
				if(GameSkeleton.game.__worker) {
					GameSkeleton.game.__workLoop = 1;
				} else { window.cancelAnimationFrame(GameSkeleton.game._aid); 
					GameSkeleton.game._aid = window.requestAnimationFrame(GameSkeleton.game._loop);
				}
			}, GameSkeleton.game._endLevelTime);
    };
	
	//new start 23
	
	
	
	
	GameSkeleton.prototype.__buttons = [];
	
	GameSkeleton.prototype.getButton = function(name) {
		
		var i = 0;var b = null; var ret = null;
		var l = this.__buttons.length;
		for(i; i < l;i++) {
			b = this.__buttons[i];
			if(b && b.id && b.id == name) {
				ret = b; break;
			}
		}
		return ret;
	};
	
	GameSkeleton.prototype.makeButton = function(name, x,y,width,height,methodCallString,altString,linkString, forTitle) {
		
		var bttn = (linkString ? document.createElement("a") : document.createElement("div"));
		bttn.setAttribute("style", "position:absolute; left:"+x+"px;top:"+y+"px;width:"+width+"px;height:"+height+"px;cursor:pointer;z-index:99999999999999999999999999999999999999999999999999999999999999999999999999");
		bttn.setAttribute("title", altString || "");
		bttn.setAttribute("id", name );
		bttn.setAttribute("name", (forTitle ? "ForTitleScreen" : ""));
		bttn.setAttribute("alt", altString);
		if(methodCallString && methodCallString.indexOf("(") == -1) {
			throw "the makeButton methodCallString param needs to be in the with parens 'methodName()' format";
			return;
		}
		if(!linkString) {
			bttn.setAttribute("onclick", methodCallString);
		} else {
			bttn.setAttribute("target", "_blank");
			bttn.setAttribute("href", linkString);
			
		}
		var i = 0;var b;var na = 0;
		var l = this.__buttons.length;
		for(i; i < l;i++) {
			b = this.__buttons[i];
			if(b.id && b.id == name) {
				na = 1; break;
			}
			
			
		}
		
		if(!na) {
			
			this.__buttons.push(bttn);
		} else {
			window.console.log("makeButton: Button name, " + name + ", is not unique, button not created");
		}
		
	};
	
	GameSkeleton.prototype.removeAllButtons = function(notstart) {
		
		var i = 0;var b;
		var l = this.__buttons.length;
		for(i; i < l;i++) {
			b = this.__buttons[i];
			if(b && b.id) {	
				if(this.title.div.contains(b)) {
					this.title.div.removeChild(b);
				} else if(this.container.contains(b)) {
					this.container.removeChild(b);
				}
			}	
		}
		
		if(!notstart && this.title.div.contains(this.startButton)) { 
			this.title.div.removeChild(this.startButton);
		}
		
		
	};
	GameSkeleton.prototype.replaceAllButtons = function() {
		
		var i = 0;var b;
		var l = this.__buttons.length;
		for(i; i < l;i++) {
			b = this.__buttons[i];
			if(b && b.id) {	
				if(b.name && b.name.indexOf("ForTitleScreen") != -1) {
					this.title.div.appendChild(b);
				} else if(!this.container.contains(b)) {
					this.container.appendChild(b);
				}
			}	
		}
		
		if(!this.title.div.contains(this.startButton)) { 
			this.title.div.appendChild(this.startButton);
		}
		
		
	};
	GameSkeleton.prototype.trashButton = function(name) {
		var i = 0;var b = null;
		var l = this.__buttons.length;
		for(i; i < l;i++) {
			b = this.__buttons[i];
			if(b.id && b.id == name) {
				this.removeButton(b);
				this.__buttons.splice(this.__buttons.indexOf(b), 1);
				break;
			}
		}
		
	};
	GameSkeleton.prototype.trashAllButtons = function() {
		this.removeAllButtons(1);
		this.__buttons = [];
		
	};
	GameSkeleton.prototype.removeStartButton = function() {
		if(this.title.div.contains(this.startButton)) { 
			this.title.div.removeChild(this.startButton);
		}
		
	};
	GameSkeleton.prototype.appendStartButton = function() {
		if(!this.title.div.contains(this.startButton)) { 
			this.title.div.appendChild(this.startButton);
			if(this.startLocations) {
				this.startButton.style.left = this.startLocations.x +"px";
				this.startButton.style.top = this.startLocations.y +"px";
			}
			
		}
	};
	
	GameSkeleton.prototype.removeButton = function(name, fromTitle) {
		
		
		var i = 0;var b;
		var l = this.__buttons.length;
		for(i; i < l;i++) {
			b = this.__buttons[i];
			if(b && b.id && b.id == name) { fromTitle = fromTitle || (b.name && b.name.indexOf("ForTitleScreen") != -1);
				if(fromTitle) {
					
					if(this.title.div.contains(b)) {
						this.title.div.removeChild(b);
					}
				} else {
					if(this.container.contains(b)) {
						this.container.removeChild(b);
					}
					
					
				}
				
				break;
			}
			
			
		}
		
		
	};
	
	GameSkeleton.prototype.appendButton = function(name, toTitle) {
		
		var i = 0;var b;
		var l = this.__buttons.length;
		for(i; i < l;i++) {
			b = this.__buttons[i];
			if(b && b.id && b.id == name) {toTitle = toTitle || (b.name && b.name.indexOf("ForTitleScreen") != -1);
				if(toTitle) {
					
					if(!this.title.div.contains(b)) {
						this.title.div.appendChild(b);
					}
				} else {
					if(!this.container.contains(b)) {
						this.container.appendChild(b);
					} 
					
					
				}
				
				break;
			}
			
			
		}
		
		
	};
	
	GameSkeleton.prototype.setupStandardButtons = function(pauseX,pauseY,pw,ph,homeX,homeY,hw,hh,muteX,muteY,mw,mh,linkX,linkY,lw,lh, linkaltstring, thelink) {
		
		if(!this.getButton("pauseButton") && !this.getButton("muteButton") && !this.getButton("homeButton") && !this.getButton("linkButton")) {
			
			this.makeButton("pauseButton", pauseX, pauseY, pw || 16, ph || 16, "tabageos.GameSkeleton.game.pause()", "pause unpause");
			
			this.makeButton("homeButton", homeX, homeY, hw || 16, hh || 16, "tabageos.GameSkeleton.game.fullResetToTitle()", "exit to title");
			
			this.makeButton("muteButton", muteX, muteY, mw || 16, mh || 16, "tabageos.GameSkeleton.game.muteUnmute()", "mute unmute");
			
			if(linkaltstring && thelink) {
				this.makeButton("linkButton", linkX, linkY, lw || 16, lh || 16, null, linkaltstring, thelink);
			}
			
		}
		
		
	};
	GameSkeleton.prototype.appendStandardButtons = function() {
		
		this.appendButton("pauseButton");
		this.appendButton("homeButton");
		this.appendButton("muteButton");
		this.appendButton("linkButton");
		
	};
	GameSkeleton.prototype.removeStandardButtons = function() {
		this.removeButton("pauseButton");
		this.removeButton("homeButton");
		this.removeButton("muteButton");
		this.removeButton("linkButton");
		
	};
	
	
	GameSkeleton.prototype.setupLevelSelect = function(lsButtonX,lsButtonY,lsButtonWidth,lsButtonHeight, amountOfLevels, titleScreenFromRect, setupMethodString, dontAppend) {
		
		if(this.getButton("levelSelect")) {
			this.trashButton("levelSelect");
		}
		
		this.makeButton("levelSelect", lsButtonX, lsButtonY, lsButtonWidth,lsButtonHeight, "tabageos.GameSkeleton.game.showLevelSelect()", "Level Select");
		
		
		
		if(!this.__levelSelectSpriteSheet) {
			
			this.__levelSelectSpriteSheet = new Image();
			this.__levelSelectSpriteSheet.src = this.__levelSelectSpriteSheetString;
			
		}
		
		this.addedInitializationMethodString = setupMethodString || "setup";
		
		if(titleScreenFromRect) {
			this.__titleScreenRect = titleScreenFromRect;
		}
		this._levelSelectAmount = amountOfLevels || 10;
		if(!dontAppend) { this.appendButton("levelSelect", 1); }
		
		
	};
	GameSkeleton.prototype.removeLevelSelect = function() {
		
		this.removeButton("levelSelect", 1);
		
	};
	
	GameSkeleton.prototype._levelSelectAmount = 10;
	GameSkeleton.prototype.__levelSelectSpriteSheetString = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAALuCAYAAADxHZPKAAAgAElEQVR4Xuy9C5dtTVnfO3evXr2/ApGY5JiYkOSYIZc3mheMGEMIURARRdHjMSfJyMVxvsXJ9ZhELoIgBCRKIKISEQkh3IVouHjBC0nGON/j3d29+4yqOWuuWrWey/+pOVfvXrv/e8DY++1Zs+qpfz016/c8XbPmg4F/qAAVoAJUgApQASpABagAFbjzCjy48xbSQCpABagAFaACVIAKUAEqQAUGgjudgApQASpABagAFaACVIAKnIACBPcTGCSaSAWoABWgAlSAClABKkAFCO70ASpABagAFaACVIAKUAEqcAIKENxPYJBoIhWgAlSAClABKkAFqAAVILjTB6gAFaACVIAKUAEqQAWowAkoQHA/gUGiiVSAClABKkAFqAAVoAJUgOBOH6ACVIAKUAEqQAWoABWgAiegAMH9BAaJJlIBKkAFqAAVoAJUgApQAYI7fYAKUAEqQAWoABWgAlSACpyAAgT3ExgkmkgFqAAVoAJUgApQASpABQju9AEqQAWoABWgAlSAClABKnACChDcT2CQaCIVoAJUgApQASpABagAFSC40weoABWgAlSAClABKkAFqMAJKEBwP4FBoolUgApQASpABagAFaACVIDgTh+gAlSAClABKkAFqAAVoAInoADB/QQGiSZSASpABagAFaACVIAKUAGCO32AClABKkAFqAAVoAJUgAqcgAIE9xMYJJpIBagAFaACVIAKUAEqQAUI7vQBKkAFqAAVoAJUgApQASpwAgoQ3E9gkGgiFaACVIAKUAEqQAWoABUguNMHqAAVoAJUgApQASpABajACShAcD+BQaKJVIAKUAEqQAWoABWgAlSA4E4foAJUgApQASpABagAFaACJ6AAwf0EBokmUgEqQAWoABWgAlSAClABgjt9gApQASpABagAFaACVIAKnIACBPcTGCSaSAWoABWgAlSAClABKkAFCO70ASpABagAFaACVIAKUAEqcAIKENxPYJBoIhWgAlSAClABKkAFqAAVILjTB6gAFaACVIAKUAEqQAWowAkoQHA/gUGiiVSAClABKkAFqAAVoAJUgOBOH6ACVIAKUAEqQAWoABWgAiegAMH9BAaJJlIBKkAFqAAVoAJUgApQAYI7fYAKUAEqQAWoABWgAlSACpyAAgT3ExgkmkgFqAAVoAJUgApQASpABQju9AEqQAWoABWgAlSAClABKnACChDcT2CQaCIVoAJUgApQASpABagAFSC40weoABWgAlSAClABKkAFqMAJKEBwP4FBoolUgApQASpABagAFaACVIDgTh+gAlSAClABKkAFqAAVoAInoADB/QQGiSZSASpABagAFaACVIAKUAGCO32AClABKkAFqAAVoAJUgAqcgAIE9xMYJJpIBagAFaACVIAKUAEqQAUI7vQBKkAFqAAVoAJUgApQASpwAgoQ3E9gkGgiFaACVIAKUAEqQAWoABUguNMHqAAVoAJUgApQASpABajACShAcD+BQaKJVIAKUAEqQAWoABWgAlSA4E4foAJUgApQASpABagAFaACJ6AAwf0EBokmUgEqQAWoABWgAlSAClABgjt9gApQASpABagAFaACVIAKnIACBPcTGCSaSAWoABWgAlSAClABKkAFCO70ASpABagAFaACVIAKUAEqcAIKENxPYJBoIhWgAlSAClABKkAFqAAVILjTB6gAFaACVIAKUAEqQAWowAkoQHA/gUGiiVSAClABKkAFqAAVoAJUgOBOH6ACVIAKUAEqQAWoABWgAiegAMH9BAaJJlIBKkAFqAAVoAJUgApQAYI7fYAKUAEqQAWoABWgAlSACpyAAgT3ExgkmkgFqAAVoAJUgApQASpABQju9AEqQAWoABWgAlSAClABKnACChDcT2CQaCIVoAJUgApQASpABagAFSC40weoABWgAlSAClABKkAFqMAJKEBwP4FBoolUgApQASpABagAFaACVIDgTh+gAlSAClABKkAFqAAVoAInoADB/QQGiSZSASpABagAFaACVIAKUAGCO32AClABKkAFqAAVoAJUgAqcgAIE9xMYJJpIBagAFaACVIAKUAEqQAUI7vQBKkAFqAAVoAJUgApQASpwAgoQ3E9gkGgiFaACVIAKUAEqQAWoABUguNMHqAAVoAJUgApQASpABajACShAcD+BQaKJVIAKUAEqQAWoABWgAlSA4E4foAJUgApQASpABagAFaACJ6AAwf0EBokmUgEqQAWoABWgAlSAClABgjt9gApQASpABagAFaACVIAKnIACBPcTGCSaSAWoABWgAlSAClABKkAFCO70ASpABagAFaACVIAKUAEqcAIKENxPYJBoIhWgAlSAClABKkAFqAAVILjTB6gAFaACVIAKUAEqQAWowAkoQHA/gUGiiVSAClABKkAFqAAVoAJUgOBOH6ACVIAKUAEqQAWoABWgAiegAMH9BAaJJlIBKkAFqAAVoAJUgApQAYI7fYAKUAEqQAWoABWgAlSACpyAAgT3ExgkmkgFqAAVoAJUgApQASpABQju9AEqQAWoABWgAlSAClABKnACChDcT2CQaCIVoAJUgApQASpABagAFSC40weoABWgAlSAClABKkAFqMAJKEBwP4FBoolUgApQASpABagAFaACVIDgTh+gAlSAClABKkAFqAAVoAInoADB/QQGiSZSASpABagAFaACVIAKUAGCO32AClABKkAFqAAVoAJUgAqcgAIE9xMYJJpIBagAFaACVIAKUAEqQAUI7vQBKkAFqAAVoAJUgApQASpwAgoQ3E9gkGgiFaACVIAKUAEqQAWoABUguNMHqAAVoAJUgApQASpABajACShAcD+BQaKJVIAKUAEqQAWoABWgAlSA4E4foAJUgApQASpABagAFaACJ6AAwf0EBokmUgEqQAWoABWgAlSAClABgjt9gApQASpABagAFaACVIAKnIACBPcTGCSaSAWoABWgAlSAClABKkAFCO70ASpABagAFaACVIAKUAEqcAIKENxPYJBoIhWgAlSAClABKkAFqAAVILjTB6gAFaACVIAKUAEqQAWowAkoQHA/gUGiiVSAClABKkAFqAAVoAJUgOBOH6ACVIAKUAEqQAWoABWgAiegAMH9BAaJJlIBKkAFqAAVoAJUgApQAYI7fYAKUAEqQAWoABWgAlSACpyAAgT3ExgkmkgFqAAVoAJUgApQASpABQju9AEqQAWoABWgAlSAClABKnACChDcT2CQaCIVoAJUgApQASpABagAFSC40weoABWgAlSAClABKkAFqMAJKEBwP4FBoolUgApQASpABagAFaACVIDgTh+gAlSAClABKkAFqAAVoAInoADB/QQGiSZSASpABagAFaACVIAKUAGCO32AClABKkAFqAAVoAJUgAqcgAIE9xMYJJpIBagAFaACVIAKUAEqQAUI7vQBKkAFqAAVoAJUgApQASpwAgoQ3E9gkGgiFaACVIAKUAEqQAWoABUguNMHqAAVoAJUgApQASpABajACShAcD+BQaKJVIAKUAEqQAWoABWgAlSA4E4foAJUgApQASpABagAFaACJ6AAwf0EBokmUgEqQAWoABWgAlSAClABgjt9gApQASpABagAFaACVIAKnIACBPcTGCSaSAWoABWgAlSAClABKkAFCO70ASpABagAFaACVIAKUAEqcAIKENxPYJBoIhWgAlSAClABKkAFqAAVILjTB6gAFaACVIAKUAEqQAWowAkoQHA/gUGiiVSAClABKkAFqAAVoAJUgOBOH6ACVIAKUAEqQAWoABWgAiegAMH9BAaJJlIBKkAFqAAVoAJUgApQAYI7fYAKUAEqQAWoABWgAlSACpyAAgT3ExgkmkgFqAAVoAJUgApQASpABQju9AEqQAWoABWgAlSAClABKnACChDcT2CQaCIVoAJUgApQASpABagAFSC40weoABWgAlSAClABKkAFqMAJKEBwP4FBoolUgApQASpABagAFaACVIDgTh+gAlSAClABKkAFqAAVoAInoADB/QQGiSZSASpABagAFaACVIAKUAGCO32AClABKkAFqAAVoAJUgAqcgAIE9xMYJJpIBagAFaACVIAKUAEqQAUI7vQBKkAFqAAVoAJUgApQASpwAgoQ3E9gkGgiFaACVIAKUAEqQAWoABUguNMHqAAVoAJUgApQASpABajACShAcD+BQaKJVIAKUAEqQAWoABWgAlSA4L6iD7zoJc/erFgdq6ICVIAKHCjw1S9/kc9t+gUVoAJU4J4qwAWgc+AJ6Z3C8TYqQAVWV4Awv7qkrJAKUAEqcCcVILgHhoWwHhCLRakAFXgiChDin4jsbJQKUAEqcCsKENwdmQnrt+KHbIQKUIEjKECIP4KorJIKUAEq8AQVILgr4q8B7F/50hee4NCyaSpABZ4GBV78zEsXd4MAv1hCVkAFqAAVuBMKENybYegFdkL6nfBnGkEF7oUCvTBPgL8X7sFOUgEq8BQrQHCvBjcK7RFY///+1xeG7cVm2J6fD0NSfen5Mz11tPdY/713LRkruIp0f9Gz3FL307O5vl7+Pf9sqlC1+WYYHjzQdZXqRie2ZrdVZ5ErOs4PbobhptZa6LenY+kXYjeqgVdOakvTR7XfGUOrX5be0bGQyluaW/1J8wYdr9S/qe3nfcNLPMXn61GIJ7zD0rIgFaACVODOKUBwH4YhAuwIrP/2b31s2G43w3Z7PmzP098jsKe/HyS4jP4xoWECvRZ0czMT9O1B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";;
	GameSkeleton.prototype.__levelSelectSpriteSheet = null;
	GameSkeleton.prototype.__latestLevel = 1;
	GameSkeleton.prototype.__levelSelectDivs = [];
	GameSkeleton.prototype.addedInitializationMethodString = "setup";
	GameSkeleton.prototype.__titleScreenRect = null;
	GameSkeleton.prototype.__gameOverScreenRect = null;
	GameSkeleton.prototype.__lsShown = 0;
	
	
	GameSkeleton.prototype.showLevelSelect = function(latestLevel) {
		
		if(this.__lsShown == 0) {
			this.__lsShown = 1;
			this.paused = 0;
			this.pause();
			latestLevel = latestLevel || this.__latestLevel;
			var ti = 0; var cplyr = null;
			var lsBackTo = new tabageos.MoverPoint(this.cameraWidth/2 - (352/2), this.gameHeight/2 - (240/2));
			if(GameSkeleton.game.screenOrganizer && GameSkeleton.game.screenOrganizer.currentScreen == 0) { //title
				ti = 1;
				cplyr = this.title.floor;
				this.title.floor.copyPixels(this.__levelSelectSpriteSheet, new tabageos.Rectangle(48,144,352,240), lsBackTo);
				this.removeStartButton();
				
			} else {
				ti = 0;this.__lsShown = 2;lsBackTo.x += this.camera.v.x; lsBackTo.y += this.camera.v.y;
				cplyr = this.charLayer;
				this.charLayer.copyPixels(this.__levelSelectSpriteSheet, new tabageos.Rectangle(48,144,352,240), lsBackTo);
			
				
				
			} 
			var i = 1;var xi = 1;var yi = 1;var lstrs;var col;var loff = 0;var row;
				
			for(i; i <= this._levelSelectAmount; i+=1) { 
				if(i == 10) { col = 0; } else if(i == 20) { col = 1; } else if (i == 30) { col = 2; } else if (i == 40) { col = 3; } else if (i == 50) { col = 4; } else { 
					col = Math.floor( (i / 10) ); 
				}
				if(col <0) {col=0;} 
				
				if(i == 10 || i == 20 || i == 30 || i == 40 || i == 50) {
					row = 9;
				} else {
					row = (i == 0 ? 0 : (i % 10) - 1);
					if(i >= 31) {
						row += 1;
					}
				}
				
				cplyr.copyPixels( this.__levelSelectSpriteSheet, new tabageos.Rectangle(416 + (row*32),176 + (col*48),32,48), new tabageos.MoverPoint(lsBackTo.x + 16 + (row*32), lsBackTo.y + 32 + (col*48) ) );
				
				if(!this.__levelSelectDivs[i]) {
					this.__levelSelectDivs[i] = document.createElement("div");
					this.__levelSelectDivs[i].setAttribute("style", "position:absolute;width:32px;height:32px;top:"+(lsBackTo.y + 32 + (col*48))+"px;left:"+(lsBackTo.x + 16 + (row*32))+"px;cursor:pointer");
					this.__levelSelectDivs[i].setAttribute("id", "l"+i);
					
				}
				
			}
			
			this.placeLevelSelectDivs(ti);
			return;
		
		} else {
			
			this.hideLevelSelect();
			
			
			this.__lsShown  = 0;
			return;
		}
		
		
			
			
		
		
	};
	
	
	GameSkeleton.prototype._selectLevel = function(e) {
		
		var lv = Number(e.target.id.replace("l",""));
		var ths = tabageos.GameSkeleton.game;
		ths.display.clearRect(0,0,ths.gameWidth,ths.gameHeight);
		ths.sceneChanger.currentScene = lv;
		ths.sceneChanger.changeCurrentMap(lv);
		if(ths.__lsShown) {
			
			ths.hideLevelSelect();
		}
		
		if(ths.onSelectLevel) {
			ths.onSelectLevel();
		}
		
		
		tabageos.BlitMath.specificPatternBlit(ths.display, ths._image, ths.sceneChanger.currentMap);//drawing of the level.
		tabageos.BlitMath.dispatchFunctionAssignments(ths,ths.addedInitializationMethodString,ths,ths.sceneChanger.currentMap,ths.tileWidth,ths.tileHeight);
		
		tabageos.GameSkeleton.game.changeToMainCamera();
		
		
	};
	
	GameSkeleton.prototype.hideLevelSelect = function() {
		var ti = 0;
		if(!this.title.div.contains(this.startButton)) { ti = 1;
			this.title.floor.copyPixels(this._image, this.__titleScreenRect, new tabageos.MoverPoint());
			this.title.div.appendChild(this.startButton);
		}
		this.removeLevelSelectDivs();
		this.__lsShown = 0;
		if(this.paused) {
			this.pause();
		}
	};
	
	
	GameSkeleton.prototype.placeLevelSelectDivs = function(ontitle) {
						
		var i = 1;var l = this.__levelSelectDivs.length;
		for(i;i<=l;i++) {
			
			if(ontitle && this.__levelSelectDivs[i] && !this.title.div.contains(this.__levelSelectDivs[i])) {
				this.__levelSelectDivs[i].removeEventListener("click", tabageos.GameSkeleton.game._selectLevel, false);
				this.__levelSelectDivs[i].addEventListener("click", tabageos.GameSkeleton.game._selectLevel, false);
				this.title.div.appendChild(this.__levelSelectDivs[i]);
			}
			
			if(!ontitle && this.__levelSelectDivs[i] && !this.container.contains(this.__levelSelectDivs[i])) {
				this.__levelSelectDivs[i].removeEventListener("click", tabageos.GameSkeleton.game._selectLevel, false);
				this.__levelSelectDivs[i].addEventListener("click", tabageos.GameSkeleton.game._selectLevel, false);
				this.container.appendChild(this.__levelSelectDivs[i]);
			}
			
		}
		
	};
	
	GameSkeleton.prototype.removeLevelSelectDivs = function(fromtitle) {
	
		var i = 1;var l = this.__levelSelectDivs.length;
		for(i;i<=l;i++) {
			if(this.__levelSelectDivs[i] && this.title.div.contains(this.__levelSelectDivs[i])) {
				this.__levelSelectDivs[i].removeEventListener("click", tabageos.GameSkeleton.game._selectLevel, false);
				this.title.div.removeChild(this.__levelSelectDivs[i]);
			} else if(this.__levelSelectDivs[i] && this.container.contains(this.__levelSelectDivs[i])) {
				this.__levelSelectDivs[i].removeEventListener("click", tabageos.GameSkeleton.game._selectLevel, false);
				this.container.removeChild(this.__levelSelectDivs[i]);
			}
		
		}
		
	};
	GameSkeleton.prototype.saveError = "";
	
	//new
	GameSkeleton.prototype.cookieSave = function(saveName, saveData) {
		
		var d = new Date();
		d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = saveName + "=" + saveData + ";" + expires + ";path=/";
		//window.console.log(document.cookie);
		return true;
	};
	GameSkeleton.prototype.getCookieSaved = function(saveName) {
		
		var ck = saveName + "=";
			var data = "";
			var co = document.cookie.split(';');
			//window.console.log(co);
			for(var i = 0; i < co.length; i++) {
				var c = co[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(ck) == 0) {
					data = c.substring(ck.length, c.length);
				}
			}
			return data;
		
	};
	
	GameSkeleton.prototype.localSave = function(saveName, saveData) {
		var ret = 1;
		try {
			
			window.localStorage.setItem(saveName, saveData);
			tabageos.GameSkeleton.game.saveError = "";
			
		} catch(e) {
			
			tabageos.GameSkeleton.game.saveError = e.message;
			ret = 0;
		}
		
		return ret;
	};
	GameSkeleton.prototype.getLocalSaved = function(saveName) {
		var ret = -1;var str = "";
		try {
			ret = 1;
			str = window.localStorage.getItem(saveName);
			
		} catch(e) {
			
			tabageos.GameSkeleton.game.saveError = e.message;
			ret = 0;
		}
		return (ret === 0 ? ret : str);
		
	};
	
	
	
	GameSkeleton.prototype._pixelTypeSpecs = {
		dialogBackImage:null,sourceImg:null,canvas:null,lineFromXp:0,lineFromYp:0,tw:10,th:10,space:8,  
		s33:0,s34:10,s35:20,s36:30,s37:40,s38:50,s39:60,s40:70,s41:80,s42:90,s43:100,s44:110,s45:120,s46:130,s47:140, 
		s58:250,s59:260,s60:270,s61:280,s62:290,s63:300,s64:310,  
		l0:150, l1:160,l2:170,l3:180,l4:190,l5:200,l6:210,l7:220,l8:230,l9:240,
		la:320,lb:330,lc:340,ld:350,le:360,lf:370,lg:380,lh:390,li:400,lj:410,lk:420,ll:430,lm:440,ln:450,lo:460,lp:470,
		lq:480,lr:490,ls:500,lt:510,lu:520,lv:530,lw:540,lx:550,ly:560,lz:570,
		ua:320,ub:330,uc:340,ud:350,ue:360,uf:370,ug:380,uh:390,ui:400,uj:410,uk:420,ul:430,um:440,un:450,uo:460,up:470,
		uq:480,ur:490,us:500,ut:510,uu:520,uv:530,uw:540,ux:550,uy:560,uz:570
	};
	
	GameSkeleton.prototype.__alphabet = {a0:"a",a1:"b",a2:"c",a3:"d",a4:"e",a5:"f",a6:"g",a7:"h",a8:"i",a9:"j",a10:"k",a11:"l",a12:"m",a13:"n",a14:"o",a15:"p",a16:"q",a17:"r",a18:"s",a19:"t",a20:"u",a21:"v",a22:"w",a23:"x",a24:"y",a25:"z"};
	GameSkeleton.prototype.__ClintBlockLine = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAqgAAAAKCAYAAAB486yQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH6AcUAh0MrsbbzgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAPRSURBVHja7VzrjiohDJ6e+P6v3P2xa3YWgX69AXraxERnKvRG+xUZ6fpL3Hym65X4GhMl8M3uW+fU6OuxDTnG0sq3m0ayanxyYvx9Gl9W/EXFqjcG0Ng73W/0ZnFviQFOkA/Ny8i1Vfbz2Dhr3pX6krN+ZGEEVuqgzW0RuCQ6H+/AOUN6vIzI32MSjce68wz4WeDju7DPe380uY13v/+8zsxdGaWxLPr29AHH41HQA3wa+c5AqANZNT7R2FgaT8s3iefUeVfzaeIqcH2gQAxaGz1d0dg73W8jvXfLJ60PS75C1hu6LpV5ufu99tqqfGBZu1nzRvpDqgmSP4zjhfhthD08tXk2ngUfBOTuCJzjxkMj+pcNVmbvewFCRF2l2yRy+8w9JTtjMNBpuR3SLhCNbQBZPTrw4BXiboQpCmQ/YwTxBcK3a36tfNF8kb5Hk9r9pVhDLNkY9dkOO2viRcodGfGftU5ObqIlG0v3s+JF44OI+Guv74gDja1X5m+lrSNqIE/wgddIrPFFZK0WcM5LTbi/f3gmnSnSdjto5y11SL0E08pzV1Dacd2RlDX2iAycwU4NGtDkBSiLExp9s3L0uEgXrOLLlG9FUe34nhxz0nVdfF/HSMOq6eaj7az0LUXFwc+8tKrYBAEJdup71DraCcQscX9aE4I0DKOaPuPR1FZvHb/lKPau7x5uGeVAg3wqOVbUrBYjtvo/sgDbbAe1naMFkTMgdefp8UoKn7IoUeCskF8ElJYg1STA1TZGADayKzU6TmLl6zUiAlBhTcKJkC/St2iiBhskdcOTseOp8a8ymbuLWOc4FdIQUJSfVwEro51ZyoGj2pGha0BtnfpX28QNclDosw7a2ivZulfTZyA1Om9kgUBEpsmY0JEpq0yRO6hozerNaTmDSlrBNGf7OsrQ7y2GizAY1BQdiGiiz+hoDwLjtHpHAj1rtHIHZPX8GT+VRYK1iHOJvZzQ8EKxt2tHO/Jc12o9snbPVuWDrEYlUg9pM+cEv2ryAXqsxdkQ0KU4425ZRx1dkIfqPD4RHwATcppJvmjA7cQk5H0KE+1krbtHml0m1CEUpAsZ+XgQgO5/GUB/+jPqbH1S7/Sn+NH5P2ne7H+b0MQBGdeaN/ay7XwKn8ZnK+Jqh13QurAiXjz/SvEOfkPWsKZOn6yHukYH4RFNPl2BcyhL37SHpAKNtmK8rPlocI0mn+1C/icPOhQdF/cE8vRep631XXOeKMM7yJSlB33Q+twtFwXpUcXtveOJPiXAi/zdT/m2qKioqKioqKioqKioqKioqKjIS1//bNCh2YPFTQAAAABJRU5ErkJggg==";
	GameSkeleton.prototype.__dialogBack = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANIAAAAyCAYAAAAp3YXAAAABk0lEQVR4Xu3ToXECYRhF0V2TWlARqDjog14Q9EIf4KIQUdQSQ+bPBCaSnbmOgwDE7hNnvjtPf5/Nan27//dLgMBzAufrZR5P/n6NiI777XNveooAgYfA7nCaRkzzPaK39w88BAgsFPj++pxGTEJaCOdxAv8FhOQeCAQCQgoQTRAQkhsgEAgIKUA0QUBIboBAICCkANEEASG5AQKBgJACRBMEhOQGCAQCQgoQTRAQkhsgEAgIKUA0QUBIboBAICCkANEEASG5AQKBgJACRBMEhOQGCAQCQgoQTRAQkhsgEAgIKUA0QUBIboBAICCkANEEASG5AQKBgJACRBMEhOQGCAQCQgoQTRAQkhsgEAgIKUA0QUBIboBAICCkANEEASG5AQKBgJACRBMEhOQGCAQCQgoQTRAQkhsgEAgIKUA0QUBIboBAICCkANEEASG5AQKBgJACRBMEhOQGCAQCQgoQTRAQkhsgEAgIKUA0QeAR0qDYrNa3435LhQCBhQK7w2k6Xy/zfH9vxLRww+MEXl5gRDQQfgCimXOSRF7rtQAAAABJRU5ErkJggg==";
	GameSkeleton.prototype.__OldSchoolLine = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdsAAAAHCAYAAABA8efUAAAEE0lEQVRoQ81a2W7cMAzs/v9Hb7BFFBCTuWhv0vZlW1uiKGoOWujjz+ef5/P5fDweD/z3fH7+rsa+5r7evX5nrPmcvTvvzxyMj+9Pjv/i9+wP98FqcvKb+8JnWLMZf47FddtxTe1/qo6sVs0z3JuqHxvH6sL294rJaooc2NSGzWU8SOMmzxQGJv4SNlj93L6a/Bj+N8/U+lgvlydqDdMNnP+uMSyvFFtpo9LguYaL7TR3U88N1t81NtXsXeu0cVrvuZL3N3PFg09mq8QNCe6MdJppAtURSfb706bsGhIUv0aw0l4aEs4xrdhdaWoSuFwDhg3FlZzbveE4hQnVHLGGM+GKiZ0TwJOja9yu7neTC8NXW5c7+alGPDUmzuBmg5IMZovlO0K95XDKXeXSmkS7l98al87it/JwHFc5bnOXZoubdKaakmmJ0CQ/Y50clUC+86BQxFAomyZh5sPiTfPFsY6Eqr5KeLeExoYL68rM24k2YqlpTBoTdQbXCLlrGNL5smbLCaDDcWuYd8YpfN0x29QAN/VgutNg/w7XGZdnPHczxbCc4rFmi+XPbl+YhqAOOr2dmGEYRBzP2Iq3zBtm7u3NCtO/Oxh3c5mGJR/bYvPbGlc6LyW+zvQ2RuqIww5WjWckVcBIa6av0PagEOxJJJBwaDpKHBVpmGk1e095Ohwh+RXJ3Tk6oZ5rKxKheKp4TSPBSKfEOZm8Ez/WhKR9OHyjCbAzu2u2r5jNWeE4pw9X37WYZQZ2pQFU4q5MpFnD3UIp3Dc3V8jBJhemPeoZ0x+lx8k32nWTRjNsusak8cbG106cW1+2eKgqcSW2TLTSVxcT6vbLdlMYJUQIogbYjPRM1FxzwPaYYrSih2LjDCKJeZrbNA8NuRRxWDOR6nDFhJxAOwInM3O5uL0l8WzOpa2pahDUl60TuUbQlIG75xujdZg+azS4YnHOvG1zt21GmC453Ce8OBP9Mo/P/+OT6seaAqWbiR/qPOY8FYPl3XiH8o2tn3yZbQNOZppzHnZwTDhSgu69Mm1X6GQkbt8bM9uMbcQHAfoTZptMaFO7dK5KGO+Q66opb0yFicLVnDfrXtmbMvl0zkmo1BfDNBIUMmcWKR/Fyavzthxvaj8bDsfV+c59SKh4/zv+sLZsH6z+DKuuBkn71XuWH7tpUPr0rud/82vBMBdNxsLANwuZhPk3SOUAkAo8hWU2FI7U+EWnvjQw3iQbCpqqExvHxFAB0e1j+04Z0xRqdoU111E1YLVS5+FuDTa5KINx+8SaNVd2DC+KN8gtZRaspgzrs4aq828bDmUWCkfpZmvOc8LOcKBiJw4nDmJdFS4Z51FLEhc2+GswlAzO5ac0FPF3MObwN+c4DXQfHcqXEM8OG633OC4qfn8AOLtMi72b33wAAAAASUVORK5CYII=";
	GameSkeleton.prototype.__GoodNeighborsLine = "data:image/png;base64,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";
	GameSkeleton.prototype.__SuperPowersLine = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAvgAAAAICAYAAACML4vTAAAABmJLR0QAtwByAEaTbjfgAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH6AkIAhYXYqidrwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAP/SURBVHja7VzbssMgCIxn+v+/nPOUGccRWBZRm+pTW+OFq7CSlqtq933f13VdpZRyJbX7vu92/t667W/P9+j+NBpn0D+rafxj6NfGt329OTxzW3O0/ch4i36EP98gb5a+UfJlxlvyi8pXsoVSSmHmbp/T5md8DjPfSvlZz6DyHU0vO7/lOy0eaXtB7Fd6duX51Du3d5hrlzWt+VfQfNppfx4FfhxM/TnSLznO3ljE4Uprow4SnZ9Ze2WwV9Mt0YjQrI1H+q1Wmqbtoe7XxiH7R+kbIRdWR7Sx1m/P4VI3hv4o/zz9mn6w+onM2VtD07lRQVjtG72+Z7X8erap8cqS827N8i8IMGDpoycBYH3TLufTt4Ak7DOn/S7frPiT6Yu0z2jh9QKLFjFrAwwECdlJQXdG+hn+RRUrmw8efmfKxpobvaVA0M/2udpmJDRICr6kW7AsVCk6JxtE7WJ77P5O8JAXoLcHaFRG6HjEbr1rPrS8DRGO+NcRsQMy5qDw7w3Ma/tibvgj/r/2Ucjc6Fp/rAF4P2tokGWgkavTrKClTUraoMpzWN9CmxHcS7KQ+q0gFik5QPjg7e/JoKc/vb30+lcnXZYOtnNa8qlRfAZ90Pg3A/3wyEdD17ODaJYvzzgPkhvhLxtoIvYzmsetbjM0aOcSav8s79ByL3b/o3QT9b8Z42v/JPl3tD/iX6JJ+IjbFe1GNlK9EJGfVp3h3YPFN+RG2uK79j1aXZANzmgVGN51PiMcTG8DPfRRc9AIwmllOTMybIbJM9GPTB54SpzQTFSSd2+8Nr+keygC5qkJzwrusuXjDaQY+WYGx54bHCuQy+JrhC8I/RHf4+WfZCOI/exWZ63Rhdj/CNtikXzttm6UDkg3fZL9SAACipCywXOkvEvbf0ZgxuqIdLuK9Gn0ofKzkjDW983wB6xsUd+6+uZMi3PMAD9yfeg5HNpAXUJbUYc0k7lI4OC9YvSW0qA3H7OCe+ZFstHyiyKTnv0z8tUOd+YlY++h36u7X5UIZo5fmYAjAMTuzXuA7ARwaOiulqBES0NmBPm/0CIJ/g7AW3YCsVpfUABi5cvMEb8WSXBG6p8VH3ro/0QdWa/GXkJEWAOWaigZJMSLLr/BQVo1qJ6XmtFacgsd9/xLR7SG1ho/skY363Bn/2WjtpMoTVH+efrZwJpNmhEeIv5B8zEj/qmpd5Bk2weDXI5e35JBDb549YjRX+0ZJhCNll5FA0KEb5r+a+/VIfNHE0sEgfYkiO35NDK5yz5fmEQ1GqAiwTOqH8gthZZcMDccyO0EysPI+T5cL2ahKztmpKtQpoPVHPmu2Nuv299pp532bv+b5de+HfzznE2/Gqe86W/Sn/YP830UK/Bwk8cAAAAASUVORK5CYII=";
	GameSkeleton.prototype.__SolarLine = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAkAAAAAHCAYAAADgWPLLAAAABmJLR0QAtwByAEaTbjfgAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH6AoWFSEGdhDy4AAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAJwSURBVGje7VrZjsMwCEyk/P8vZ192pdYyMMPhOFp4a+sSc3gYcI5jA7nv+z5aWlpaWlpaWhbJKZGR8zzN32ZrP79DdH1tRtCj7WvUM3uWZVfWGnTP6LOeJKMVfrZirpFhS59Xj2VXlp4ncjUjz6z/IzHN8o/3WRK2ROPuzY1qrNPOBovhmv7Z/irsysqxyvzJ8PMua7IwE8WmDDz04ti1YqqjHYzZQWKLcgaJQHX97Xm278/fEJDaTVA/S/Zbk7zZ+lEPCsTo1DBKIhAbEf+gPlwRTwbstHxHYzr7HPEP42ckNxj7KnIM7laNplJaW0mOx4KKkqXquFfmD9LgvnIa4vQDUyM1P1r5EcFLaU9XxEnaIdMO60gUJDJhBWI0ygpadaJKxVFj2d5DxExKMglgFHStyQ1CbmZTRu+z0DWajxDiO1vjKajomsyzgAAaGtPzVyLX3isbjIr8iZL6anKcgUNP2pZBMt/UxHrxp3LigpIgJkczSND43cUAI9MhaROg0RhroiCRG/S6bVUSz4DdQ+yQRGTsQa8xVviI7Sy0Q6TlGDKZYCYB7NWnRuqZridCcFDfWXkV6Qa9tkcnNxVdcWQNQtiRjjiL1GQUKHTPUcKb1aigelD8WUm2GLywbihW1YJojkXrHiJXlQM0Z4+FS1tjge44AYo4G/l/RiHcSVg/ox2sdUVmvaOAkEgkfyw9Gd0eogd9/6AKYDUfZhRVZFKLPJ8ZizOTNvYdMilubMyYyR9DADKu4FmSXDEdZvacVQuQK7Co3ahdFikZpx6V9QTB52iN3m0q+Fhh3p0YvIGYtHRutDdaWlr+OxZ6SesPEJwwXoMxODsAAAAASUVORK5CYII=";
	GameSkeleton.prototype.__SolarLineBlack = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAkAAAAAHCAYAAADgWPLLAAAABmJLR0QAtwByAEaTbjfgAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH6AoWFTYwvCnj7wAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAJ7SURBVGje7VrbbcMwDHQAr5EN+tf9R8hfNsgg7VcBQ5DIO/Eo2yj5l0ShxYeOR8rbdgF5fn3/bCUlJSUlJSUli+QxIiOf98v9rbf2+B2i6ygjPda+Wj29Z3l2qdage0afdSYZzfCzF3OLDHv6ZvV4dqn0nJGrijzz/o/EVOWf2WeNsCUa99ncyMY662ywGG7p7+0vwy5VjmXmj8LPV1mjwkwUmxR4OItj+4qpjnUwegeJLcoKEoHq+ttzb9/H3xCQupqgfh7Z703yeutbPSgQo1PDKIlAbET8g/pwRTwZsLPyHY1p73PEP4yfkdxg7MvIMVS8pnK0NpMctwUVJUvZcc/MH6TBvaPM+oGpkZYfvfyI4OVoT3vESdYhsw5rSxRGZMILRGuUF7TsRB0VR4tlzx4iZlKiJIBR0PUmNwi56U0ZZ5+FrrF8hBDf3pqZgoquUZ4FBNDQmH7erweaJ5GYZpxpVf5ESX02OVbg0Jm2KUjmnZrYWfzJnLigJIjJUQUJar/bGWBkOiRrAtQa400URuQGvW5blcQ9YJ8hdkgiMvag1xgrfMR2FtYhsnIMmUwwkwD26tMi9UzXEyE4qO+8vIp0g7O2Ryc3GV1xZA1C2JGOWEVqFAUK3XOU8KoaFVQPij8ryRaDF94NxapaEM2xaN1DZM9ygOXstnBZazzQbSdAEWcj/1cUwisJ62e0g/WuyLx3FBASieSPp0fR7SF60PcPsgDW8qGiqCKTWuT5zFicmbSx75CN4sbGjJn8MQRAcQXPkuSM6TCzZ1UtQK7AonajdnmkpJ16ZNYTBJ+jNfpqU8HTCvPVicEdiElJ5UZ5o6Sk5L9j4Sxp/QXZujBewFc3IwAAAABJRU5ErkJggg==";
	
	GameSkeleton.prototype.__FightBlackLine = "data:image/png;base64,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";
	GameSkeleton.prototype.__FightGreyLine = "data:image/png;base64,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";
	GameSkeleton.prototype.__FightWhiteLine = "data:image/png;base64,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";
	
	GameSkeleton.prototype.__SaikyoStandardLine = "data:image/png;base64,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";
	GameSkeleton.prototype.__SaikyoRedLine = "data:image/png;base64,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";
	GameSkeleton.prototype.__SaikyoBlueLine = "data:image/png;base64,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";
	
	
	
	GameSkeleton.prototype.useFightFont = function(letterSpacing, canv, blackGreyWhite) {
		
		var ctn = blackGreyWhite ? 8 : 7;
		if(blackGreyWhite && blackGreyWhite >= 2) ctn = 9;
		
		this.setPixelTypingSpecs(null,canv || this.charLayer,0,0,17,17,letterSpacing || 10, ctn);
		this.calibratePixelType(255,544,null,17,17);
		
		
	};
	
	GameSkeleton.prototype.useSaikyoFont = function(letterSpacing, canv, standardRedBlue) {
		
		var ctn = standardRedBlue ? 11 : 10;
		if(standardRedBlue && standardRedBlue >= 2) ctn = 12;
		
		this.setPixelTypingSpecs(null,canv || this.charLayer,0,0,9,9,letterSpacing || 10, ctn);
		this.calibratePixelType(135,288,288,9,9);
		
		
	};
	
	GameSkeleton.prototype.useSolarFont = function(letterSpacing, canv) {
		this.setPixelTypingSpecs(null,canv || this.charLayer,0,0,9,7,letterSpacing || 7, 5);
		this.calibratePixelType(136,288,null,9,7);
	};
	GameSkeleton.prototype.useSolarBlackFont = function(letterSpacing, canv) {
		this.setPixelTypingSpecs(null,canv || this.charLayer,0,0,9,7,letterSpacing || 7, 6);
		this.calibratePixelType(136,288,null,9,7);
	};
	GameSkeleton.prototype.useClintBlockFont = function(letterSpacing, canv) {
		this.setPixelTypingSpecs(null,canv || this.charLayer,0,0,10,10,letterSpacing || 7, 1);
		this.calibratePixelType(150,320,null,10,10);
	};
	GameSkeleton.prototype.useOldSchoolFont = function(letterSpacing, canv) {
		this.setPixelTypingSpecs(null,canv || this.charLayer,0,0,5,7,letterSpacing || 6, 2);
		this.calibratePixelType(75,320,160,5,7);
	};
	GameSkeleton.prototype.useGoodNeighborsFont = function(letterSpacing, canv) {
		this.setPixelTypingSpecs(null,canv || this.charLayer,0,0,16,16,letterSpacing || 9, 3);
		this.calibratePixelType(240,1024,512,16,16);
	};
	GameSkeleton.prototype.useSuperPowersFont = function(letterSpacing, canv) {
		this.setPixelTypingSpecs(null,canv || this.charLayer,0,0,8,8,letterSpacing || 5, 4);
		this.calibratePixelType(120,512,256,8,8);
	};
	
	GameSkeleton.prototype.setPixelTypingSpecs = function(source,canv,lineFromX,lineFromY,tw,th,spacing, font) {
		if(!source) {
			source = new Image();
			if(font == 2) {
				source.src = GameSkeleton.game.__OldSchoolLine;
			}
			if(!font || font == 1) {
				source.src = GameSkeleton.game.__ClintBlockLine;
			}
			if(font == 3) {
				source.src = GameSkeleton.game.__GoodNeighborsLine;
			}
			if(font == 4) {
				source.src = GameSkeleton.game.__SuperPowersLine;
			}
			if(font == 5) {
				source.src = GameSkeleton.game.__SolarLine;
			}
			if(font == 6) {
				source.src = GameSkeleton.game.__SolarLineBlack;
			}
			
			if(font == 7) {
				source.src = GameSkeleton.game.__FightBlackLine;
			}
			if(font == 8) {
				source.src = GameSkeleton.game.__FightGreyLine;
			}
			if(font == 9) {
				source.src = GameSkeleton.game.__FightWhiteLine;
			}
			
			if(font == 10) {
				source.src = GameSkeleton.game.__SaikyoStandardLine;
			}
			if(font == 11) {
				source.src = GameSkeleton.game.__SaikyoRedLine;
			}
			if(font == 12) {
				source.src = GameSkeleton.game.__SaikyoBlueLine;
			}
			
			
		}
		if(!GameSkeleton.game._pixelTypeSpecs.dialogBackImage) {
			GameSkeleton.game._pixelTypeSpecs.dialogBackImage = new Image();
			GameSkeleton.game._pixelTypeSpecs.dialogBackImage.src = GameSkeleton.game.__dialogBack;
		}
		GameSkeleton.game._pixelTypeSpecs.sourceImg = source;
		GameSkeleton.game._pixelTypeSpecs.canvas = canv;
		GameSkeleton.game._pixelTypeSpecs.lineFromXp = lineFromX || 0;
		GameSkeleton.game._pixelTypeSpecs.lineFromYp = lineFromY || 0;
		GameSkeleton.game._pixelTypeSpecs.tw = tw || 5;
		GameSkeleton.game._pixelTypeSpecs.th = th || 7;
		GameSkeleton.game._pixelTypeSpecs.space = spacing || 8;
	};
	GameSkeleton.prototype.calibratePixelType = function(zeroIsAtX, aIsAtX, uAIsAtX, tileWidth, tileHeight) {
		//calculate and store x position of each character in the line.
		var px = GameSkeleton.prototype._pixelTypeSpecs;
		var incer = 0;
		var i = 0;
		var l = 9;
		if(zeroIsAtX || zeroIsAtX === 0) {//numbers denoted by themselves after l
			for(i; i <= l; i++) {
				px["l"+i] = zeroIsAtX + (i*tileWidth);
			}
		}
		if(zeroIsAtX || zeroIsAtX === 0) {
			i = 58;//the few symbols after the numbers
			l = 64;//symbols denoted by charCode after s
			for(i; i <= l; i++) {		
				px["s"+i] = (zeroIsAtX + (incer*tileWidth)) + (tileWidth*10);
				incer++;
			}
		}
		i = 33;//the symbols before the numbers, at the start of the line.
		l = 47;
		incer = 0;
		for(i; i <=l; i++) {
			px["s"+i] = incer*tileWidth;
			incer++;
		}
		i = 0; l = 26;
		if(aIsAtX || aIsAtX === 0) {//alphabet denoted by the letter itself after l
			for(i; i < l; i++) {
				px[ "l"+GameSkeleton.prototype.__alphabet["a"+i] ] = aIsAtX + (i*tileWidth);
			}
		}
		i = 0; l = 26;
		if(uAIsAtX || uAIsAtX === 0) {//upper case denoted by u before lowercase of itself
			for(i; i < l; i++) {
				px[ "u"+GameSkeleton.prototype.__alphabet["a"+i] ] = uAIsAtX + (i*tileWidth);
			}
		}
		
	}; 
	
	GameSkeleton.prototype.pixelType = function(x,y,alphaText,source,canv,lineFromX,lineFromY,tw,th,spacing,fw,fh) {
		
		var px = GameSkeleton.game._pixelTypeSpecs;
		var i = 0;
		var l = alphaText.length;
		GameSkeleton.game._helperPoint.x = x+1-1;
		GameSkeleton.game._helperPoint.y = y+1-1;
		var sp = spacing || px.space;
		
		for(i; i < l; i++) {
			
			var xSpot = px["l" +alphaText.charAt(i)] != undefined ?  px["l" +alphaText.charAt(i)] : (px["s" +alphaText.charCodeAt(i)] != undefined ? px["s" +alphaText.charCodeAt(i)] : px["u" +alphaText.charAt(i).toLowerCase()]) ;
			
			GameSkeleton.game._helperRect.x = (lineFromX || px.lineFromXp) +  xSpot; 
			GameSkeleton.game._helperRect.y = (lineFromY || px.lineFromYp);
			GameSkeleton.game._helperRect.width = (tw || px.tw);
			GameSkeleton.game._helperRect.height = (th || px.th);
			GameSkeleton.game._helperPoint.x = x + (i*sp);
			(canv || px.canvas).copyPixels(source || px.sourceImg, GameSkeleton.game._helperRect, GameSkeleton.game._helperPoint,fw || GameSkeleton.game._helperRect.width, fh || GameSkeleton.game._helperRect.height );
		}
		
	};
	GameSkeleton.prototype.pixelParagraph = function(startX,startY,lineSpace,paragraphTextByDots,canv,fw,fh, pDemarc) {
		var demarc = pDemarc || ".";
		var pstr = paragraphTextByDots.split(demarc);
		var i = 0;
		var l = pstr.length;
		
		
		for(i;i<l;i++) {
			this.pixelType(startX,startY + (i*(lineSpace||9)), pstr[i], 0, canv, 0,0,0,0,0,fw,fh);
		}
	}; 
	GameSkeleton.prototype._pixli = 0;
	GameSkeleton.prototype.animatePixelParagraph = function(startX,startY,lineSpace,paragraphTextByDots,canv,fw,fh,speed) {
		var pstr = paragraphTextByDots.split(".");
		var i = 0;
		var l = pstr.length;
		var letter = -1;
		var linesalready = 0;
		if(GameSkeleton.game._pixli > 0) {
			linesalready = GameSkeleton.game._pixli - 1;
			for(i;i<=linesalready;i++) {
				this.pixelType(startX,startY + (i*(lineSpace||9)), pstr[i],0, canv, 0,0,0,0,0,fw,fh);
			}
		}
		i = GameSkeleton.game._pixli;
		letter = this.animatePixelType(startX,startY + (i*(lineSpace||9)), pstr[i], speed,0, canv, 0,0,0,0,0,fw,fh);
		if(letter === 0) {
			GameSkeleton.game._pixli += 1;
		}
		if(GameSkeleton.game._pixli >= l) {
			GameSkeleton.game._pixli = 0;
		}
	}; 
	GameSkeleton.prototype.pixelDialogBox = function(dialog,dx,dy,tx,ty,lineSpace,animate,speed,fw,fh,canv,dialogBackFromRect,source,sw,sh) {
		
		if(dialogBackFromRect) {
			GameSkeleton.game._helperRect.x = dialogBackFromRect.x;
			GameSkeleton.game._helperRect.y = dialogBackFromRect.y;
			GameSkeleton.game._helperRect.width = dialogBackFromRect.width;
			GameSkeleton.game._helperRect.height = dialogBackFromRect.height;
		} else {
			GameSkeleton.game._helperRect.x = 0;
			GameSkeleton.game._helperRect.y = 0;
			GameSkeleton.game._helperRect.width = 210;
			GameSkeleton.game._helperRect.height = 50;
		}
		
		GameSkeleton.game._helperPoint.x = dx;
		GameSkeleton.game._helperPoint.y = dy;
		
		
		(canv || GameSkeleton.game.charLayer).copyPixels(source || GameSkeleton.game._pixelTypeSpecs.dialogBackImage,GameSkeleton.game._helperRect,GameSkeleton.game._helperPoint,sw||GameSkeleton.game._helperRect.width,sh||GameSkeleton.game._helperRect.height);
		
		if(!animate) {
			GameSkeleton.game.pixelParagraph(tx,ty,lineSpace,dialog,canv || GameSkeleton.game.charLayer,fw,fh);
		} else {
			GameSkeleton.game.animatePixelParagraph(tx,ty,lineSpace,dialog,canv || GameSkeleton.game.charLayer,fw,fh,speed);
		
		}
		
		
	};
	GameSkeleton.prototype._pixai = 0;
	GameSkeleton.prototype.animatePixelType = function(x,y,alphaText,speed,source,canv,lineFromX,lineFromY,tw,th,spacing,fw,fh) {
		
		var px = GameSkeleton.game._pixelTypeSpecs;
		var i = 0;//GameSkeleton.game._pixai;
		var l = alphaText.length;
		var letterthan = Math.round(GameSkeleton.game._pixai);
		GameSkeleton.game._helperPoint.x = x+1-1;
		GameSkeleton.game._helperPoint.y = y+1-1;
		var sp = spacing || px.space;
		
		for(i; i <= letterthan; i++) {
			
			var xSpot = px["l" +alphaText.charAt(i)] != undefined ?  px["l" +alphaText.charAt(i)] : (px["s" +alphaText.charCodeAt(i)] != undefined ? px["s" +alphaText.charCodeAt(i)] : px["u" +alphaText.charAt(i).toLowerCase()]) ;
			
			GameSkeleton.game._helperRect.x = (lineFromX || px.lineFromXp) +  xSpot; 
			GameSkeleton.game._helperRect.y = (lineFromY || px.lineFromYp);
			GameSkeleton.game._helperRect.width = (tw || px.tw);
			GameSkeleton.game._helperRect.height = (th || px.th);
			GameSkeleton.game._helperPoint.x = x + (i*sp);
			(canv || px.canvas).copyPixels(source || px.sourceImg, GameSkeleton.game._helperRect, GameSkeleton.game._helperPoint,fw || GameSkeleton.game._helperRect.width, fh || GameSkeleton.game._helperRect.height );
		}
	
		GameSkeleton.game._pixai += (speed || 1);
	
		if(GameSkeleton.game._pixai >= l) {
			GameSkeleton.game._pixai = 0;
		}
		return GameSkeleton.game._pixai;
		
		
	};
    GameSkeleton.prototype.hudExit = function(e) {

        if(e) e.preventDefault();
        if(GameSkeleton.game.screenOrganizer && GameSkeleton.game.screenOrganizer.currentScreen == 0) {
            //title screen.
            
        } else {
            GameSkeleton.game.paused = 1;
            window.cancelAnimationFrame(GameSkeleton.game._aid);
            GameSkeleton.game._doReset = 1;
            
            window.setTimeout( function() {
                GameSkeleton.game._theReset();
            }, 700);
        }

    };

    GameSkeleton.prototype.hudToWalkthrough = function(e) {

        if(e) e.preventDefault();
			if(GameSkeleton.game.walkthroughLink && GameSkeleton.game.walkthroughLink.indexOf("http") != -1) {
				window.open(GameSkeleton.game.walkthroughLink, "_blank");
			}

    };
	
	GameSkeleton.prototype._reEstablish = function(e) {
		
		GameSkeleton.game.screenOrganizer.removeEventListener(tabageos.ScreenOrganizer.COVER,"_reEstablish", GameSkeleton.game);
		
		GameSkeleton.establish(GameSkeleton.game, GameSkeleton.game.__specs.spriteSheetImage || null, GameSkeleton.game.__specs.containerDivId || "container", GameSkeleton.game.__specs.rootDivId || "root", GameSkeleton.game.__specs.controllerDivId , GameSkeleton.game.__specs.gameScale === 0 ? 0 : (GameSkeleton.game.__specs.gameScale||2), GameSkeleton.game.__specs.useScreenOrganizer === false ? false : true, GameSkeleton.game.__specs.startWidth || 50, GameSkeleton.game.__specs.startHeight || 25);

		
	};
		
	GameSkeleton.prototype._theReset = function(dontEstablish, terminateWorker) {
        
            GameSkeleton.game._doReset = 1;GameSkeleton.game.__workLoop = 0;
			GameSkeleton.game.alternateLoopMethod = null;
			if(GameSkeleton.game.__worker && terminateWorker) {
				GameSkeleton.game.__worker.terminate();
				GameSkeleton.game.__worker = null;
			}
			window.cancelAnimationFrame(GameSkeleton.game._aid);
            window.removeEventListener("keyup", GameSkeleton.game.reset, false);
            
			if(GameSkeleton.game.fullResetSpecifics) {
				GameSkeleton.game.fullResetSpecifics();
            }
            
			this.hideScoreText();
			this.hideHealthBar();
			this.hideText();
			this.removeHUD();
			this.takeDownMouseTouchHandle();
           
			this.cameraLayer.context.clearRect(0,0,this.gameWidth,this.gameHeight);
			this.backgroundLayer = null;
			this.gameOverContainer = null;
			this.camera = null;this.cameraLayer = null;
			this.charLayer.context.clearRect(0,0,this.gameWidth,this.gameHeight);
			this.charLayer = null;
			if(this.display && this.display.context) {
				this.display.context.clearRect(0,0,this.gameWidth,this.gameHeight);
				this.display = null;
			}
			if(this.startButton && this.title.div.contains(this.startButton)) {
				this.title.div.removeChild(this.startButton);
			}
			this._thrott = 0;
			this.paused = 0;
			
			while(this.screenOrganizer && this.screenOrganizer.theGame.getNumChildren()) {
				
				this.screenOrganizer.theGame.removeChild(this.screenOrganizer.theGame.getChildAt(this.screenOrganizer.theGame.getNumChildren() - 1));
			}
			if(!this.screenOrganizer && this.root.contains(this.cameraLayer.canavs)) this.root.removeChild(this.cameraLayer.canvas);
			this.title = null;this.root = null;this.player = null;
			this.container = null; tabageos.ScreenOrganizer._instance = null;
			if(!dontEstablish) GameSkeleton.game._reEstablish(0);
			//window.location.reload();
			return;
	};
	
	GameSkeleton.prototype._scaleRectRef = null;
	GameSkeleton.prototype.removeHUD = function() {
        var listnr = tabageos.seekTouch() ? (tabageos._pointerEvents ? "pointerdown" : "touchstart") : "click";
		if(GameSkeleton.game._HUD) {
			GameSkeleton.game.hExit.removeEventListener(listnr, GameSkeleton.game.hudExit, false);
			GameSkeleton.game.hPause.removeEventListener(listnr, GameSkeleton.game.pause, false);
			GameSkeleton.game.hMute.removeEventListener(listnr,GameSkeleton.game.muteUnmute, false);
			GameSkeleton.game.hWalkthrough.removeEventListener(listnr, GameSkeleton.game.hudToWalkthrough, false);
			GameSkeleton.game.hReset.removeEventListener(listnr, GameSkeleton.game.goBack, false);
			if(GameSkeleton.game._playerHUD && this.container.contains(GameSkeleton.game._playerHUD)) this.container.removeChild(GameSkeleton.game._playerHUD);
			if(document.body.contains(GameSkeleton.game._HUD)) document.body.removeChild(GameSkeleton.game._HUD);
		}
    };
	GameSkeleton.prototype.hideHUD = function() {
		
		if(GameSkeleton.game._HUD) {
			if(GameSkeleton.game._playerHUD) GameSkeleton.game._playerHUD.style.display = "none";
			GameSkeleton.game._HUD.style.display = "none";
			
		}
		
	};
	GameSkeleton.prototype.showHUD = function() {
		
		if(GameSkeleton.game._HUD) {
			if(GameSkeleton.game._playerHUD) GameSkeleton.game._playerHUD.style.display = "block";
			GameSkeleton.game._HUD.style.display = "block";
			GameSkeleton.game.__instanceBasicTwoLayerResize();
		}
		
	};
	GameSkeleton.prototype._basicTwoLayerResize = function(cameraLayer,display,charLayer, cameraWidth,cameraHeight,controllerHeight,containerDiv,controllerInstance, gameScale) { 
			
			
			cameraLayer.context.webkitImageSmoothingEnabled = false;
			cameraLayer.context.mozImageSmoothingEnabled = false;
			cameraLayer.context.imageSmoothingEnabled = false;
			if(display && display.context) {
				display.context.webkitImageSmoothingEnabled = false;
				display.context.mozImageSmoothingEnabled = false;
				display.context.imageSmoothingEnabled = false;
			}
			charLayer.context.webkitImageSmoothingEnabled = false;
			charLayer.context.mozImageSmoothingEnabled = false;
			charLayer.context.imageSmoothingEnabled = false;
			GameSkeleton.game.device = tabageos.seekTouch();
			
			if (GameSkeleton.game.device == 1) { 
				tabageos.ResizeGame(cameraWidth,cameraHeight+controllerHeight,GameSkeleton.game.dontResizeHorizontal ? 0 : (gameScale || 1), GameSkeleton.game.dontResizeVertical ? 0 : (gameScale || 1),gameScale ? GameSkeleton.game.container : null,GameSkeleton.game._manuelControllerUse ? null : GameSkeleton.game.controller,1,GameSkeleton.game.controller ? GameSkeleton.game.controller._style : 1,GameSkeleton.game._scaleRectRef,1,cameraWidth, controllerHeight);
				
			} else { 
				tabageos.ResizeGame(cameraWidth,cameraHeight,GameSkeleton.game.dontResizeHorizontal ? 0 : (gameScale || 1), GameSkeleton.game.dontResizeVertical ? 0 : (gameScale || 1),gameScale ? (GameSkeleton.game.resizeRootForNoTouch ? ( GameSkeleton.game.screenOrganizer ? GameSkeleton.game.root.div : GameSkeleton.game.root) : GameSkeleton.game.container) : null,GameSkeleton.game._manuelControllerUse ? null : GameSkeleton.game.controller,0,1,GameSkeleton.game._scaleRectRef,1, cameraWidth,controllerHeight,GameSkeleton.game.camera,1,1); 
				
			}
			
	};
	
	//png streamlining methods
	GameSkeleton.__baseToCol = function(w,h,str) {
		
		var bine = window.atob(str);//general binary decode
		var l = bine.length;
		var ua = new Uint8Array(l);
		var i = 0;
		for(i;i<l;i++) {
			ua[i] = bine.charCodeAt(i);//general binary array
		}
		var u8c = new Uint8ClampedArray(ua.buffer);//ImageData wants Clamped
		
		var p = new PNG(u8c);//for specific png pixel decode 
		
		GameSkeleton.__eventBuildObject = {w:w,h:h,c:p.decode(),imd:null};
		
		GameSkeleton.__eventBuildColors();//worker build each pixel as ImageData
		
	};
	
	//zipped png to colors, this is not used, JSzip would be needed if you want to do this.
	GameSkeleton.__binaryToCol = function(name, innerName, w, h) {
		
		var jsZip;
		try {
			jsZip = new JSZip();
		} catch(e) {
			window.console.log("GameSkeleton.__binaryToCol requires J"+"S"+"Z"+"i"+"p");
			return;
		}
		if(!w || !h) {
			throw "for GameSkeleton.__binaryToCol w and h must be defined as the width and height of the binary";
		}
		tabageos.GameSkeleton.__bnCords = new tabageos.Rectangle(0,0,w,h);
		var xmlhtt = new XMLHttpRequest();
		xmlhtt.onreadystatechange = function() {
			if(xmlhtt.status == 200 && xmlhtt.readyState == 4) {
				var srcData = xmlhtt.response; 
				jsZip.loadAsync(srcData)
				.then(function(ip) {
					ip.file(innerName).async("string").then(function(str) {
						var d = str.split(',').map(Number);
						tabageos.GameSkeleton.__buildColors(tabageos.GameSkeleton.__bnCords.width,tabageos.GameSkeleton.__bnCords.height,d);
					}) 
				});
			}
		}
		xmlhtt.open("GET", name);
		xmlhtt.responseType = "b"+"l"+"o"+"b";
		xmlhtt.send();
	};
	
	GameSkeleton.__streamlineWorker = null;
	GameSkeleton.__streamWorker = function() { 
		var blb = URL.createObjectURL( new Blob([ '(',
			function() {
				self.onmessage = function(e) {
					var d = e.data.data;
					var c = e.data.c;
					var i,j; var lo = 0;
					for (i = 0, j=0; j < c.length; j=j+4) {
						d[i] = c[j];
						d[i+1] = c[j+1];
						d[i+2] = c[j+2];
						d[i+3] = c[j+3];
						i+=4;
						lo+=4;
						if(lo % 200 == 0) {
							self.postMessage( { prog:(j/c.length) } );
						}
					}
					self.postMessage( { imd:d } );
				};
			}.toString(),
		')()' ], {type: 'application/javascript'} ) );
		return new Worker( blb );
	};
	
	GameSkeleton.__eventBuildCA = null;
	GameSkeleton.__eventBuildPDiv = null;
	GameSkeleton.__eProgEvent = null;
	GameSkeleton.loadingDispatcher = null;
	GameSkeleton._totalLoad = 0;
	
	
	GameSkeleton.__afterWorkerPreload = function() {
		
		if(tabageos.GameSkeleton.__eProgEvent) {
			var i = 0; var l = tabageos.GameSkeleton.__eProgEvent.potato.length;var pl;
				var allone = 1;var tot = 0;var ft = l+1-1;
				for(i; i < l;i++) {
					pl = tabageos.GameSkeleton.__eProgEvent.potato[i];
					if(pl) {
						tot += pl;
					}
					if( pl < 0.99 ) {
						allone = 0;
					}
				}
				
				tabageos.GameSkeleton.__eProgEvent.totalLoaded = (tot / ft) || tabageos.GameSkeleton.__eProgEvent.totalLoaded;
				
				if(allone >= 1) {
					
					var ev = document.createEvent("MouseEvents");
					ev.initEvent("GameSkeleton", true, true);
					window.dispatchEvent(ev);
					
				} else {
					
					setTimeout(tabageos.GameSkeleton.__afterWorkerPreload, 50);
				}
				
		} else {
			var ev = document.createEvent("MouseEvents");
			ev.initEvent("GameSkeleton", true, true);
			window.dispatchEvent(ev);
			
		}
		
	};
		
		
	
	
	GameSkeleton.__eventBuildObject = {w:0,h:0,c:0,imd:null};
	GameSkeleton.__eventBuildColors = function() { 
		try {
			if(!GameSkeleton.__eventBuildCA) {
				GameSkeleton.__eventBuildCA = new tabageos.CanvasObject(null,GameSkeleton.__eventBuildObject.w, GameSkeleton.__eventBuildObject.h);
			}
			if(!GameSkeleton.__eventBuildObject.imd) {
				GameSkeleton.__eventBuildObject.imd = GameSkeleton.__eventBuildCA.context.createImageData(GameSkeleton.__eventBuildObject.w, GameSkeleton.__eventBuildObject.h);
			}
			GameSkeleton.__streamlineWorker = GameSkeleton.__streamWorker();
			GameSkeleton.__streamlineWorker.addEventListener("message", function(e) {
				if(e.data.imd) { 
					GameSkeleton.__sprites = GameSkeleton.__eventBuildCA;
					//we do it this way because passing a whole ImageData via the worker can cause a memory error.
					var dt = new ImageData(e.data.imd, GameSkeleton.__eventBuildObject.w, GameSkeleton.__eventBuildObject.h);
					GameSkeleton.__sprites.context.putImageData(dt,0,0);
					GameSkeleton.__streamlineWorker.terminate();
					GameSkeleton.__streamlineWorker = null;
					
					GameSkeleton.__afterWorkerPreload();
					
					
					
				}
				if(e.data.prog) {  
					if(!tabageos.GameSkeleton.__eProgEvent) {
						var loadDataArray = new Array(tabageos.GameSkeleton._totalLoad);
						loadDataArray[tabageos.GameSkeleton._totalLoad-1] = e.data.prog;
						tabageos.GameSkeleton.__eProgEvent = new tabageos.Event("loading", loadDataArray);
						tabageos.GameSkeleton.__eProgEvent.totalLoaded = e.data.prog;
						if(GameSkeleton.loadingDispatcher) {
							GameSkeleton.loadingDispatcher.dispatchEvent(tabageos.GameSkeleton.__eProgEvent);
						}
						
					} else {
						tabageos.GameSkeleton.__eProgEvent.potato[tabageos.GameSkeleton._totalLoad-1] = e.data.prog;
						
						var i = 0; var l = tabageos.GameSkeleton.__eProgEvent.potato.length;var pl;
						var allone = 1;var tot = 0;var ft = l+1-1;
						for(i; i < l;i++) {
							pl = tabageos.GameSkeleton.__eProgEvent.potato[i];
							if(pl) {
								tot += pl;
							}
							if( pl < 0.99 ) {
								allone = 0;
							}
						}
						
						tabageos.GameSkeleton.__eProgEvent.totalLoaded = (tot / ft) || 0;
						
						
						if(GameSkeleton.loadingDispatcher) {
							GameSkeleton.loadingDispatcher.dispatchEvent(tabageos.GameSkeleton.__eProgEvent);
						}
						
					}
					
					
					
				}
				
			}, false);
			GameSkeleton.__streamlineWorker.postMessage( {data:GameSkeleton.__eventBuildObject.imd.data, c:GameSkeleton.__eventBuildObject.c} );
			
			
			
		} catch(e) {
			window.console.log(e);
			window.document.body.getElementsByTagName("div")[8].innerHTML += e+"";
		}
	};

	//construcs ImageData pixel by pixel and applies it to the canvas to be drawn from.
	GameSkeleton.__buildColors = function(w,h,c) {//this brute force method is not used.
		var i,j,d;
		try {
			var ca = new tabageos.CanvasObject(null,w,h);
			var imd = ca.context.createImageData(w,h);
			var data = imd.data;
			
			for (i = 0, j=0; j < c.length; j=j+4) {//very memory intensive and heavy, millions of iterations.
				data[i] = c[j];
				data[i+1] = c[j+1];
				data[i+2] = c[j+2];
				data[i+3] = c[j+3];
				i+=4;
			}//a worker is used to do this, see __streamWorker
			
			GameSkeleton.__sprites = ca;
			GameSkeleton.__sprites.context.putImageData(imd,0,0);
			
			var ev = document.createEvent("MouseEvents");
			ev.initEvent("GameSkeleton", true, true);
			window.dispatchEvent(ev);
		} catch(e) {
			window.console.log(e);
		}
	};
	//when spriteSheetImage is set to 'streamline' this will be the spriteSheet canvas.
	GameSkeleton.__sprites = null;
	
	GameSkeleton.__dispatch = function() {
		var ev = document.createEvent("MouseEvents");
		ev.initEvent("GameSkeleton", true, true);
		window.dispatchEvent(ev);
	};
	//can be used if you have the ImageData programically.
	GameSkeleton.__initializei = function(w,h,d) {
		tabageos.GameSkeleton.__sprites = new tabageos.CanvasObject(null,w,h);
		tabageos.GameSkeleton.__sprites.context.putImageData(d,0,0);
		var ev = document.createEvent("MouseEvents");
		ev.initEvent("GameSkeleton", true, true);
		window.dispatchEvent(ev);
	};
	//end streamlining methods
	
	
	GameSkeleton.prototype.dlOut = null;
	GameSkeleton.prototype.sclrcthld = null;
	GameSkeleton.prototype.delayedM = function(func, delay) {
		
		window.clearTimeout(GameSkeleton.game.dlOut);
		GameSkeleton.game.dlOut = window.setTimeout(func, delay || 250);
		
		
	}; 
	GameSkeleton.prototype._delayedInstanceTwoLayerResize = function(e) {
		if(!GameSkeleton.game.paused) { GameSkeleton.game.pause(); }
		
		if(GameSkeleton.game.camera && GameSkeleton.game.cameraPoint && !GameSkeleton.game.sclrcthld) {
			GameSkeleton.game.sclrcthld = GameSkeleton.game._scaleRectRef.clone();
		}
		
		//if(GameSkeleton.game.dlOut == null) {
			GameSkeleton.game.delayedM(GameSkeleton.game.__instanceBasicTwoLayerResize, 200);
		//}
	};
	
	GameSkeleton.__requests = [];
	GameSkeleton.__reqDest = [];
	GameSkeleton.__preloadSoundSystem = null;
	GameSkeleton.__buffs = [];
	GameSkeleton.__sll = 0;
	
	GameSkeleton.__soundLoadLoop = function() {
		var buffs = tabageos.GameSkeleton.__buffs;
		var i = 0; var buff;var curl = 0;var sload = 0;
		if(!tabageos.GameSkeleton.__eProgEvent) {
			var loadDataArray = new Array(tabageos.GameSkeleton._totalLoad);
			
			loadDataArray[tabageos.GameSkeleton._totalLoad-1] = sload;
			
			tabageos.GameSkeleton.__eProgEvent = new tabageos.Event("loading", loadDataArray);
			tabageos.GameSkeleton.__eProgEvent.totalLoaded = 0;
		}
		
		for(i; i < buffs.length; i++) {
			
			buff = buffs[i];
			if(buff.buffered.length) {
				sload = Number( buff.buffered.end(0) / buff.duration );
			}
			curl = tabageos.GameSkeleton.__eProgEvent.potato[ tabageos.GameSkeleton.__requests.indexOf(buff) ];
			if (!curl || curl < 1) {
				tabageos.GameSkeleton.__eProgEvent.potato[ tabageos.GameSkeleton.__requests.indexOf(buff) ] = sload;
			}
			
			if(tabageos.GameSkeleton.loadingDispatcher) {
				tabageos.GameSkeleton.loadingDispatcher.dispatchEvent(tabageos.GameSkeleton.__eProgEvent);
			}
			
			if(curl >= 1) {
				tabageos.GameSkeleton.__buffs.splice(tabageos.GameSkeleton.__buffs.indexOf(buff),1); break;
			}
			
		}
		
		if(tabageos.GameSkeleton.__buffs.length) {
			tabageos.GameSkeleton.__sll = setTimeout(tabageos.GameSkeleton.__soundLoadLoop, 25);
		} else {
			tabageos.GameSkeleton.__sll = null;
		}
		
	};
	
	GameSkeleton.loadByXhr = function(itemloc, soundn, stype, music) {
		var success = false;
		try {
			
			if(soundn) { 
				var ss = tabageos.GameSkeleton.__preloadSoundSystem ? tabageos.GameSkeleton.__preloadSoundSystem : null;
				if( ss && ss._soundNames.indexOf(soundn) === -1 ) {
					
					if(!music) {
						ss.addSound(soundn+(stype||".ogg"),soundn,ss._globalVolume,4);
					} else {
						ss.addMusic(soundn+(stype||".ogg"), 1, 1);
					}
					var newSoundBuffer;
					if(!music) {
						newSoundBuffer = ss._sounds[ss._sounds.length-1][0];
					} else {
						newSoundBuffer = ss._soundTracks[ss._soundTracks.length-1];
					}
					tabageos.GameSkeleton._totalLoad += 1;
					tabageos.GameSkeleton.__requests.push(newSoundBuffer);
					tabageos.GameSkeleton.__reqDest.push(function() {});
					var ptFunc = function(e) {
						tabageos.GameSkeleton.__eProgEvent.potato[ tabageos.GameSkeleton.__requests.indexOf(e.target) ] = 1;
						e.target.removeEventListener('canplaythrough', ptFunc,false);
					};
					newSoundBuffer.addEventListener('canplaythrough', ptFunc, false);
					
					tabageos.GameSkeleton.__buffs.push(newSoundBuffer);
					if(!tabageos.GameSkeleton.__sll || tabageos.GameSkeleton.__buffs.length <= 1) {
						tabageos.GameSkeleton.__soundLoadLoop();
					}	
				}
				
			} else {
				
				var stloc = window.location.href.charAt(0);
				
				if(stloc == 'h' || stloc == 'l') {
					var xhr = new XMLHttpRequest();
					xhr.responseType = "blob";
					xhr.open("GET", itemloc);
					xhr.addEventListener("load", tabageos.GameSkeleton.completeXhr);
					xhr.addEventListener("progress", tabageos.GameSkeleton.progressXhr);
					xhr.send();
					tabageos.GameSkeleton.__requests.push(xhr);
				} else {
					
					if(!tabageos.GameSkeleton.__eProgEvent) {
						var loadDataArray = new Array(tabageos.GameSkeleton._totalLoad);
						
						loadDataArray[tabageos.GameSkeleton._totalLoad-1] = 1;
						
						tabageos.GameSkeleton.__eProgEvent = new tabageos.Event("loading", loadDataArray);
						tabageos.GameSkeleton.__eProgEvent.totalLoaded = 0;
					}
					tabageos.GameSkeleton.__requests.push({'response':itemloc});
					return false;
					
				}
				
			}
			success = true;
		} catch(e) {
			window.console.log("could not load");
			window.console.log(e);
			
		} return success;
		
	};
	
	GameSkeleton.progressXhr = function(e) {
		
		if(!GameSkeleton.__eProgEvent) {
			var loadDataArray = new Array(tabageos.GameSkeleton._totalLoad);
			loadDataArray[tabageos.GameSkeleton.__requests.indexOf(e.target)] = (e.loaded / e.total);
			tabageos.GameSkeleton.__eProgEvent = new tabageos.Event("loading", loadDataArray);
			tabageos.GameSkeleton.__eProgEvent.totalLoaded = 0;
			if(GameSkeleton.loadingDispatcher) {
				GameSkeleton.loadingDispatcher.dispatchEvent(GameSkeleton.__eProgEvent);
			}
		
		} else {
			tabageos.GameSkeleton.__eProgEvent.potato[tabageos.GameSkeleton.__requests.indexOf(e.target)] = (e.loaded / e.total);
			
			var i = 0; var l = GameSkeleton.__eProgEvent.potato.length;var pl;
				var allone = 1;var tot = 0;var ft = l+1-1;
				for(i; i < l;i++) {
					pl = GameSkeleton.__eProgEvent.potato[i];
					if(pl) {
						tot += pl;
					}
					if( pl < 0.99 ) {
						allone = 0;
					}
				}
				
				tabageos.GameSkeleton.__eProgEvent.totalLoaded = (tot / ft) || 0;
			
			if(tabageos.GameSkeleton.loadingDispatcher) {
				tabageos.GameSkeleton.loadingDispatcher.dispatchEvent(tabageos.GameSkeleton.__eProgEvent);
			}	
		}
	};
	
	GameSkeleton.assignPreloadMethod = function(meth) {
		
		tabageos.GameSkeleton.loadingDispatcher = new tabageos.EventDispatcher();
		var seep = {};
		seep.seeProgress = meth;
		tabageos.GameSkeleton.loadingDispatcher.addEventListener('loading', 'seeProgress', seep);
		
	};
	
	GameSkeleton.completeXhr = function(e) {
		
			if(typeof tabageos.GameSkeleton.__reqDest[ tabageos.GameSkeleton.__requests.indexOf(e.target) ] != 'function') {
				var allone = 1;
				if(tabageos.GameSkeleton.__eProgEvent && tabageos.GameSkeleton.__eProgEvent.potato) {
					var i = 0; var l = GameSkeleton.__eProgEvent.potato.length;var pl;
					var tot = 0;var ft = l+1-1;
					for(i; i < l;i++) {
						pl = GameSkeleton.__eProgEvent.potato[i];
						if(pl) {
							tot += pl;
						}
						if( pl < 0.99 ) {
							allone = 0;
						}
					}
					
					tabageos.GameSkeleton.__eProgEvent.totalLoaded = (tot / ft) || 0;
					if(tabageos.GameSkeleton.loadingDispatcher) {
						tabageos.GameSkeleton.loadingDispatcher.dispatchEvent(tabageos.GameSkeleton.__eProgEvent);
					}
				
				}
				
				
				
				if(allone == 1) {
					
					if(tabageos.GameSkeleton.loadingDispatcher && tabageos.GameSkeleton.__eProgEvent) {
						tabageos.GameSkeleton.loadingDispatcher.dispatchEvent(tabageos.GameSkeleton.__eProgEvent);
					}
					
					var toblob = typeof e.target.response == 'string';
					
					tabageos.GameSkeleton.__reqDest[ tabageos.GameSkeleton.__requests.indexOf(e.target) ].src = (toblob == true) ? e.target.response : URL.createObjectURL(e.target.response);
					
					tabageos.GameSkeleton.__requests[ tabageos.GameSkeleton.__requests.indexOf(e.target) ] = 0;
					
					//URL.revokeObjectURL(unblobed);
					
				} else {
					setTimeout(tabageos.GameSkeleton.completeXhr, 50, e);
				}
				
			} else {
				
				
				
				
				
			}
	};
	GameSkeleton.__loadingOfMusic = function() {
		
		//game is in under construction, last line is about to happen in constructor
					//.game has been set to 'this' but only specs have been defined, no methods a loose this at this point
					if(tabageos.GameSkeleton.game && tabageos.GameSkeleton.game.__specs.preloadMusic) {
						if(!tabageos.GameSkeleton.__preloadSoundSystem) tabageos.GameSkeleton.__preloadSoundSystem = new tabageos.SoundSystem();//the loading soundsystem gets applied as this.soundSystem once basicInitialize is called.
						var i = 0; var l = tabageos.GameSkeleton.game.__specs.preloadMusic.length;
						for(i; i < l; i++) {
							
							var inis = tabageos.GameSkeleton.game.__specs.preloadMusic[i];
							var stype = inis.indexOf(".") != -1 ? ("."+inis.split(".")[1]) : ".ogg";
							var nme = inis.replace(stype,"");
							
							tabageos.GameSkeleton.loadByXhr(0,nme,stype, 1);//when all loading is complete the src will be set to the image loaded, either by xhr or streamline.
							//that causes basicInitialize to be called.
							
						}
						
					}
		
		
		
	};
	GameSkeleton.__loadingOfSounds = function() {
		
		//game is in under construction, last line is about to happen in constructor
					//.game has been set to 'this' but only specs have been defined, no methods a loose this at this point
					if(tabageos.GameSkeleton.game && tabageos.GameSkeleton.game.__specs.preloadSounds) {
						tabageos.GameSkeleton.__preloadSoundSystem = new tabageos.SoundSystem();//the loading soundsystem gets applied as this.soundSystem once basicInitialize is called.
						var i = 0; var l = tabageos.GameSkeleton.game.__specs.preloadSounds.length;
						for(i; i < l; i++) {
							
							var inis = tabageos.GameSkeleton.game.__specs.preloadSounds[i];
							var stype = inis.indexOf(".") != -1 ? ("."+inis.split(".")[1]) : ".ogg";
							var nme = inis.replace(stype,""); 
							
							tabageos.GameSkeleton.loadByXhr(0,nme,stype);//when all loading is complete the src will be set to the image loaded, either by xhr or streamline.
							//that causes basicInitialize to be called.
							
						}
						
					}
		
		
		
	};
	
	GameSkeleton.__checkFinishPreloadFromStreamline = function() {
				var allone = 1;
				if(tabageos.GameSkeleton.__eProgEvent && tabageos.GameSkeleton.__eProgEvent.potato) {
					var i = 0; var l = tabageos.GameSkeleton.__eProgEvent.potato.length;var pl;
					var tot = 0;var ft = l+1-1;
					for(i; i < l;i++) {
						pl = tabageos.GameSkeleton.__eProgEvent.potato[i];
						if(pl) {
							tot += pl;
						}
						if( pl < 0.99 ) {
							allone = 0;
						}
					}
					
					tabageos.GameSkeleton.__eProgEvent.totalLoaded = (tot / ft) || 0;
					if(tabageos.GameSkeleton.loadingDispatcher) {
						tabageos.GameSkeleton.loadingDispatcher.dispatchEvent(tabageos.GameSkeleton.__eProgEvent);
					}
				}
				
				if(allone == 1) {
					
					if(tabageos.GameSkeleton.loadingDispatcher && tabageos.GameSkeleton.__eProgEvent) {
						tabageos.GameSkeleton.loadingDispatcher.dispatchEvent(tabageos.GameSkeleton.__eProgEvent);
					}
					
					tabageos.GameSkeleton.img.onload(0);
					
					setTimeout(function() {
						tabageos.GameSkeleton.__requests = null;
						tabageos.GameSkeleton.__reqDest = null;
					}, 1500);
					
				} else {
					
					setTimeout(tabageos.GameSkeleton.__checkFinishPreloadFromStreamline, 50);
					
				}
		
		
		
	};
	
	GameSkeleton.establish = function(gameInstance, spriteSheetImage,containerDivId, rootDivId, controllerDivId, gameScale, useScreenOrganizer, startWidth,startHeight) {
            
			if(spriteSheetImage) {
				GameSkeleton.img = ((spriteSheetImage != "streamline" && !GameSkeleton.__sprites) ? new Image() : GameSkeleton.__sprites.canvas);
				
				GameSkeleton.img.onload = function(e) { 
					GameSkeleton.game = gameInstance;
					GameSkeleton.game._image = GameSkeleton.img;
					
					GameSkeleton.game.basicInitialize(containerDivId, rootDivId, GameSkeleton.game.gameWidth,GameSkeleton.game.gameHeight, GameSkeleton.game.cameraWidth,GameSkeleton.game.cameraHeight, controllerDivId,useScreenOrganizer, startWidth,startHeight,GameSkeleton.game.useSceneChanger === 0 ? 1 : 0, GameSkeleton.game._manuelControllerUse);
					GameSkeleton.game.gameScale = gameScale || 0;
					GameSkeleton.game._basicTwoLayerResize(GameSkeleton.game.cameraLayer,GameSkeleton.game.display,GameSkeleton.game.charLayer, GameSkeleton.game.cameraWidth,GameSkeleton.game.cameraHeight,GameSkeleton.game.controllerHeight,GameSkeleton.game.containerDiv,GameSkeleton.game.controller, GameSkeleton.game.gameScale);
					
					if(GameSkeleton.game.gameScale >= 1 || GameSkeleton.game.gameScale === 0) {
						
						var scaw = GameSkeleton.game._scaleRectRef.width || GameSkeleton.game.cameraWidth;
						var scah = (GameSkeleton.game._scaleRectRef.height - GameSkeleton.game.tileHeight) >= GameSkeleton.game.gameHeight;
						
                        GameSkeleton.game.container.style.left = "calc(50% - "+(    (scaw/2)    )+"px)";
                        GameSkeleton.game._HUD.style.left = "calc(50% - "+(  (scaw/2)  - (scaw-160)  )+"px)";

                        var scaleX = window.innerWidth / GameSkeleton.game.cameraWidth;
                        var scaleY = window.innerHeight / GameSkeleton.game.cameraHeight;

                        GameSkeleton.game._HUD.style.transformOrigin = "0 0";
                        GameSkeleton.game._HUD.style.transform = "scale(" + ( scaleX / GameSkeleton.game.hudScale) + "," + ( scaleY / GameSkeleton.game.hudScale) + ")";

                        var hudupr = GameSkeleton.game._HUD.getBoundingClientRect();

                        GameSkeleton.game._HUD.style.left = "calc(50% - "+(  (scaw/2)  - (scaw-hudupr.width)  )+"px)";
					}
					if(GameSkeleton.game.addedResizeMethod) {
						GameSkeleton.game.addedResizeMethod();
					}
					window.removeEventListener('resize', GameSkeleton.game._delayedInstanceTwoLayerResize, false);
					window.addEventListener('resize', GameSkeleton.game._delayedInstanceTwoLayerResize, false);
					
				}; 
				if(spriteSheetImage != "streamline" && !GameSkeleton.__sprites) {
					
					//load each sound in specs.preloadSounds
					tabageos.GameSkeleton.__loadingOfSounds();
					tabageos.GameSkeleton.__loadingOfMusic();
					
					tabageos.GameSkeleton._totalLoad += 1;
					tabageos.GameSkeleton.__reqDest.push(  GameSkeleton.img );
					var aload = tabageos.GameSkeleton.loadByXhr(spriteSheetImage);
					if ( !aload ) {
						//offline
						GameSkeleton.completeXhr( {target:tabageos.GameSkeleton.__requests[tabageos.GameSkeleton._totalLoad-1]}  );
					}
					
				} else {
					tabageos.GameSkeleton.__loadingOfSounds();
					tabageos.GameSkeleton.__loadingOfMusic();
					
					if(tabageos.GameSkeleton.game.__specs.preloadSounds || tabageos.GameSkeleton.game.__specs.preloadMusic) {
						
						var m1 = tabageos.GameSkeleton.game.__specs.preloadSounds ? tabageos.GameSkeleton.game.__specs.preloadSounds.length : 0;
						var m2 = tabageos.GameSkeleton.game.__specs.preloadMusic ? tabageos.GameSkeleton.game.__specs.preloadMusic.length : 0;
						tabageos.GameSkeleton.__eProgEvent.totalLoaded = ( m1 + m2 - 1 ) / ( m1 + m2 + 1 );
					}
					
					tabageos.GameSkeleton.__checkFinishPreloadFromStreamline();
					
				}
				
			} else {
				GameSkeleton.game = gameInstance;
				GameSkeleton.game.basicInitialize(containerDivId, rootDivId, GameSkeleton.game.gameWidth,GameSkeleton.game.gameHeight, GameSkeleton.game.cameraWidth,GameSkeleton.game.cameraHeight, controllerDivId, useScreenOrganizer, startWidth,startHeight,GameSkeleton.game.useSceneChanger === 0 ? 1 : 0,GameSkeleton.game._manuelControllerUse);
				GameSkeleton.game.gameScale = gameScale || 0;
				GameSkeleton.game._basicTwoLayerResize(GameSkeleton.game.cameraLayer,GameSkeleton.game.display,GameSkeleton.game.charLayer, GameSkeleton.game.cameraWidth,GameSkeleton.game.cameraHeight,GameSkeleton.game.controllerHeight,GameSkeleton.game.containerDiv,GameSkeleton.game.controller, GameSkeleton.game.gameScale);	
				if(GameSkeleton.game.gameScale >= 1 || GameSkeleton.game.gameScale === 0) {
			
					var scaw = GameSkeleton.game._scaleRectRef.width || GameSkeleton.game.cameraWidth;
					var scah = (GameSkeleton.game._scaleRectRef.height - GameSkeleton.game.tileHeight) >= GameSkeleton.game.gameHeight;
					
                    GameSkeleton.game.container.style.left = "calc(50% - "+(    (scaw/2)    )+"px)";
                    GameSkeleton.game._HUD.style.left = "calc(50% - "+(  (scaw/2)  - (scaw-160)  )+"px)";


                    var scaleX = window.innerWidth / GameSkeleton.game.cameraWidth;
                    var scaleY = window.innerHeight / GameSkeleton.game.cameraHeight;
					
                    GameSkeleton.game._HUD.style.transformOrigin = "0 0";
                    GameSkeleton.game._HUD.style.transform = "scale(" + ( scaleX / GameSkeleton.game.hudScale) + "," + ( scaleY / GameSkeleton.game.hudScale) + ")";

                    var hudupr = GameSkeleton.game._HUD.getBoundingClientRect();

                    GameSkeleton.game._HUD.style.left = "calc(50% - "+(  (scaw/2)  - (scaw-hudupr.width)  )+"px)";

				}
				if(GameSkeleton.game.addedResizeMethod) {
					GameSkeleton.game.addedResizeMethod();
				}
				window.removeEventListener('resize', GameSkeleton.game._delayedInstanceTwoLayerResize, false);
				window.addEventListener('resize', GameSkeleton.game._delayedInstanceTwoLayerResize, false);
				//window.addEventListener('orientationchange', GameSkeleton.game.__instanceBasicTwoLayerResize, false);
				
			}
			
	};
	
	GameSkeleton.prototype.__instanceBasicTwoLayerResize = function() {
		
		GameSkeleton.game._basicTwoLayerResize(GameSkeleton.game.cameraLayer,GameSkeleton.game.display,GameSkeleton.game.charLayer, GameSkeleton.game.cameraWidth,GameSkeleton.game.cameraHeight,GameSkeleton.game.controllerHeight,GameSkeleton.game.container,GameSkeleton.game.controller, GameSkeleton.game.gameScale);
		
		if(GameSkeleton.game.gameScale >= 1 || GameSkeleton.game.gameScale === 0) {
			let newrec = GameSkeleton.game.container.getBoundingClientRect();
			window.console.log(GameSkeleton.game._scaleRectRef.width);
			var scaw =  GameSkeleton.game._scaleRectRef.width+1-1 || GameSkeleton.game.cameraWidth; 
			var scah = (GameSkeleton.game._scaleRectRef.height - GameSkeleton.game.tileHeight) >= GameSkeleton.game.gameHeight;
			
           GameSkeleton.game.container.style.left = "calc(50% - "+(  (scaw/2)  )+"px)";
            
            GameSkeleton.game._HUD.style.left = "calc(50% - "+(  (scaw/2)  - (scaw-160)  )+"px)";

            var scaleX = window.innerWidth / GameSkeleton.game.cameraWidth;
            var scaleY = window.innerHeight / GameSkeleton.game.cameraHeight;

            GameSkeleton.game._HUD.style.transformOrigin = "0 0";
            GameSkeleton.game._HUD.style.transform = "scale(" + ( scaleX / GameSkeleton.game.hudScale) + "," + ( scaleY / GameSkeleton.game.hudScale) + ")";

            var hudupr = GameSkeleton.game._HUD.getBoundingClientRect();

            GameSkeleton.game._HUD.style.left = "calc(50% - "+(  (scaw/2) - (scaw-hudupr.width)  )+"px)";
           
		}
        
		
		if(GameSkeleton.game.addedResizeMethod) {
			
			GameSkeleton.game.addedResizeMethod();
		}
		
		if(GameSkeleton.game.camera) {
			//GameSkeleton.game.camera.reset(0,0);
			
			
		}
		
		if(GameSkeleton.game.paused) { window.setTimeout(GameSkeleton.game.pause, 250); }
		
	};
	tabageos.GameSkeleton = GameSkeleton;
	
})();