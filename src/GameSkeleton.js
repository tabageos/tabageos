(function() { 
	'use strict';
	
	function GameSkeleton(specs) {
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

		this._manuelControllerUse = specs.specialControllerUse || 0;
        GameSkeleton.game = this;
        if(!specs.controllerDivId) {
            window.console.log("GameSkeleton: no controller div id given, a ControllerPad will not be created");
        }
        GameSkeleton.establish(this, specs.spriteSheetImage || null, specs.containerDivId || "container", specs.rootDivId || "root", specs.controllerDivId , specs.gameScale === 0 ? 0 : (specs.gameScale||2), specs.useScreenOrganizer === false ? false : true, specs.startWidth || 50, specs.startHeight || 25);

	}

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
	GameSkeleton.prototype._pr;
	GameSkeleton.prototype._ts = 0;
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
	
	GameSkeleton.prototype.resizeRootForNoTouch = 0;
	GameSkeleton.prototype.dontResizeVertical = 0;
	GameSkeleton.prototype.dontResizeHorizontal = 0;
	
	GameSkeleton.prototype.horizontalCameraMove = 0;
	GameSkeleton.prototype.verticalCameraMove = 0;
	
	GameSkeleton.prototype.cameraTweenType = "InOutLinear";
	GameSkeleton.prototype.frameRate = 60;
	GameSkeleton.prototype.frameTime = (1000/60) * (60 / (60) ) - (1000/60) * 0.5;
	
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

    GameSkeleton.prototype.createHud = function() {

        var listnfr = tabageos.seekTouch() ? "touchstart" : "click";
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
        gref._playerHUD.setAttribute("style", "position:absolute; top:0px;width:"+(gref.cameraWidth)+"px;height:90px;z-index:999999999999999999999999999999999999999999999999999999999999999999999999999999999999;");
		gref._healthBar = document.createElement("div");
		gref._scoreTextDisplay = document.createElement("div");
		
		gref._playerHUD.appendChild(gref._healthBar);
		gref._playerHUD.appendChild(gref._scoreTextDisplay);
		
		this.container.appendChild(gref._playerHUD);

    };
	
	GameSkeleton.prototype.healthBarIsDisplayed = 0;
	GameSkeleton.prototype.scoreTextIsDisplayed = 0;
	
	GameSkeleton.prototype.showHealthBar = function(health, firstColor, secondColor, height) {
		
		if(height && height > 80) { height = 80; }
		GameSkeleton.game._healthBar.setAttribute("style", "position:absolute; top:0px;width:"+(health||100)+"px;height:"+(height||10)+"px;border:thin solid black;background:linear-gradient("+(firstColor||'red')+","+(secondColor||'#ffc8c8')+","+(firstColor||'red')+"");
		GameSkeleton.game.healthBarIsDisplayed = 1;
	};
	GameSkeleton.prototype.hideHealthBar = function() {
		GameSkeleton.game._healthBar.setAttribute("style", "display:none");
		GameSkeleton.game.healthBarIsDisplayed = 0;
	};
	
	GameSkeleton.prototype.showScoreText = function(value, topPosition, width, height) {
		
		GameSkeleton.game._scoreTextDisplay.setAttribute("style", "position:absolute; top:"+(topPosition||0)+"px;width:"+(width||160)+"px;height:"+(height||70)+"px;");
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
		
		if(handleMouseHeldDown) {
			this.container.removeEventListener("mousedown", this.handleMouseDown, false);
			this.container.addEventListener("mousedown", this.handleMouseDown, false);
			this.container.removeEventListener("mouseup", this.handleMouseUp, false);
			this.container.addEventListener("mouseup", this.handleMouseUp, false);
		}
		
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
                tabageos.GameSkeleton.game.mousePoint.y = ty - dmrect.y - tabageos.GameSkeleton.game.mouseMoveOffset;
            }
        } else {
 
            var upmp = tabageos.MouseController.mouseMoverPoint();
            tabageos.GameSkeleton.game.mousePoint.x = upmp.x - dmrect.x + tabageos.GameSkeleton.game.camera.v.x - tabageos.GameSkeleton.game.mouseMoveOffset;
			tabageos.GameSkeleton.game.mousePoint.y = upmp.y - dmrect.y - tabageos.GameSkeleton.game.mouseMoveOffset;
			
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
			
            if(controllerDivId) {
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
			
			
			if(useScreenOrganizer) {
				this.title = new tabageos.CanvasObjectContainer(null, cameraWidth,cameraHeight, null, "#ffffff");
				
				this.gameOverContainer = new tabageos.CanvasObjectContainer(null,cameraWidth,cameraHeight, null, "#ffffff"); 
				
				
				
				this.startButton = document.createElement("div");
				this.startButton.innerHTML = " Start ";
				var swid = startWidth || (cameraWidth/8); var shei = startHeight || (cameraHeight/8);
				this.startButton.setAttribute("style", "color:black;position:absolute;text-align:center;width:"+swid+"px;height:"+shei+"px;left:"+( this.startLocations ? this.startLocations.x : ((cameraWidth/2) - (swid/2)) )+"px;top:"+(this.startLocations ? this.startLocations.y : ((cameraHeight/2) - (shei/2) ))+"px;cursor:pointer;z-index:9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999");
				this.startButton.addEventListener((tabageos.seekTouch() ? "touchstart" : "mouseup"), GameSkeleton.game.changeToMainCamera, false);
				
				this.title.div.appendChild(this.startButton);
				
				this.screenOrganizer = new tabageos.IrisScreenOrganizer(this.root, [this.title, this.cameraLayer, this.gameOverContainer]);
				
				this.screenOrganizer.changeScreen(0);
				
				
				if(!dontUseSceneChanger) {
					this.sceneChanger = new tabageos.TileSceneChanger(this._image, this.display, this.gameWidth,this.gameHeight, this.tileWidth, this.tileHeight, this.player);
					
					
					
					
				}
			
			}

            this.createHud();
			
			if(this.addedInitializationMethod) {   
				this.addedInitializationMethod(); 
				
				
				if(this.player && this.initialPlayerPosition) {  this.player.setX(this.initialPlayerPosition.x);  this.player.setY(this.initialPlayerPosition.y); }  
			
				if(this.sceneChanger) {
					
					if(this.player) {
						
						this.sceneChanger.mainChar = this.player;
						
					}
				}
            }
			
			
			
			if(this.horizontalCameraMove) {
				
				GameSkeleton.game.cameraPoint.x = -9999;
				
			}
			if(this.verticalCameraMove) {
				
				GameSkeleton.game.cameraPoint.y = -9999;
			}
            
            if(!this.player) {
                window.console.log("a player has not been created, set this.player to some new Character Class");
            }
			
			
	};
	
	
	GameSkeleton.seeAndChaseRoutine = function(obj,enemies,player,helperPoint,chaseRadius, dontOnlyChaseToX, separationDistance, map,tw,th) {
		var rightTile, leftTile;
		
		if(map) {
			
			rightTile = tabageos.BlitMath.checkTileValueAt(obj.x + obj.width + 4,obj.y+obj.height+2,map,tw,th);
			leftTile = tabageos.BlitMath.checkTileValueAt(obj.x - 4,obj.y+obj.height+2,map,tw,th);
			rightTile = rightTile[0] ? (rightTile[0] == 0 && (!rightTile[1] || rightTile[1] == 0)) : rightTile;
			leftTile = leftTile[0] ? (leftTile[0] == 0 && (!leftTile[1] || leftTile[1] == 0)) : leftTile;
		}
		
		if(!obj._grounded && obj._jumps) { 
			obj._state = 3;obj._veloc.y = 4; 
		}
		
        if(obj._pRight || (map && !rightTile)) { //collision detect and change direction
            obj.dX = obj._pLeft ? 0 : 1;
        } else if (obj._pLeft || (map && !leftTile)) {
            obj.dX = 0;
        }
		if(tabageos.GeometricMath.testForPointInCircle(obj._pos,chaseRadius || (128),player._pos) && !obj._pRight && !obj._pLeft) {
			helperPoint.x = player.x+1-1; helperPoint.y = dontOnlyChaseToX ? player.y+1-1 : obj.y+1-1;
			obj.easeTo(helperPoint);
			obj.separationDistance = separationDistance || 48;
			if(enemies && enemies.length >=2) { obj.separate(enemies); obj.align(enemies); }
			if(!obj._pRight && !(map && !rightTile && player.x > obj.x) && !obj._pLeft && !(map && !leftTile && player.x < obj.x)) {
				obj.update(0,0,0);
			} else { if(obj.autoAnimation) obj.autoAnimation(); }
			if(obj.x < player.x) {
				obj.dX = 0;//opposite of ease direction
			} else if (obj.x > player.x + player.width) {
				obj.dX = 1; 
			}
			
		} else {
			if(obj._pRight || (map && !rightTile)) {
				obj.dX = obj._pLeft ? 0 : 1;
			} else if (obj._pLeft || (map && !leftTile)) {
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
		GameSkeleton.game.startButton.removeEventListener((tabageos.seekTouch() ? "touchstart" : "mouseup"), GameSkeleton.game.changeToMainCamera, false);
		
		if(GameSkeleton.game.screenOrganizer) {
			GameSkeleton.game.screenOrganizer.addEventListener(tabageos.ScreenChangeEvent.COVER, "startGameLoop", GameSkeleton.game);
	
			GameSkeleton.game.screenOrganizer.switchScreen(1);
		} else { 
		
			GameSkeleton.game.startGameLoop();
		}
	
	};
	
	
	GameSkeleton.prototype.updateAndResetCamera = function(horizontalOffset,verticalOffset,ts) {
		if(horizontalOffset) {
			this.sceneChanger._cameraPoint.x = Math.round(this.player.x) + horizontalOffset;
			this.sceneChanger._cameraPoint.y = Math.round(this.player.y) -  this.camera.cameraFollowOffsetY;
			
			this.camera.reset( this.camera.width,this.camera.v.y );
			this.camera.tweenedBlitLayerRender(this.cameraPoint, this.tweenLimitX || 0,this.tweenLimitY || 0, Math.round(this.frameTime / (ts||this._ts)),this.cameraTweenType,0,0);
		}
		if(verticalOffset) {
			this.sceneChanger._cameraPoint.x = Math.round(this.player.x) - this.camera.cameraFollowOffsetX;;
			this.sceneChanger._cameraPoint.y = Math.round(this.player.y) + verticalOffset;
			
			this.camera.reset( this.camera.v.x,this.camera.height );
			this.camera.tweenedBlitLayerRender(this.cameraPoint, this.tweenLimitX || 0,this.tweenLimitY || 0, Math.round(this.frameTime / (ts||this._ts)),this.cameraTweenType,0,0);
		}
		
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
			
			GameSkeleton.game.beforeStartGameLoop();
		}
		
		if(gameFunc && !this.gameFunction) {this.gameFunction = gameFunc};
		
		this.charLayer.canvas.setAttribute("style","image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;image-rendering: pixelated;image-rendering: crisp-edges;");
		this.cameraLayer.canvas.setAttribute("style", "image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;image-rendering: pixelated;image-rendering: crisp-edges;");
		if(this.display && this.display.canvas) {
			this.display.canvas.setAttribute("style", "image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;image-rendering: pixelated;image-rendering: crisp-edges;");
		}
		this.backgroundLayer.canvas.setAttribute("style", "image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;image-rendering: pixelated;image-rendering: crisp-edges;");
			
		if(this._aid) { window.cancelAnimationFrame(this._aid); }
		this._aid = window.requestAnimationFrame(this._loop);
		
	};
	GameSkeleton.prototype.readyHorizontalCameraMove = function() {
		
		this.cameraPoint.x = -9999;
	};
	GameSkeleton.prototype.readyVerticalCameraMove = function() {
		
		this.cameraPoint.y = -9999;
	};
	
	GameSkeleton.prototype.tweenLimitX = 0;
	GameSkeleton.prototype.tweenLimitY = 0;
	
	GameSkeleton.prototype._loop = function(ts) {
		GameSkeleton.game._ts = ts;
		if(GameSkeleton.game._thrott === 0) GameSkeleton.game._thrott = ts;
		GameSkeleton.game._pr = ts - GameSkeleton.game._thrott;
			
			if(GameSkeleton.game._pr >= GameSkeleton.game.frameTime) {
				
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
					if(!GameSkeleton.game.paused) {
						GameSkeleton.game._aid = window.requestAnimationFrame(GameSkeleton.game._loop);
					}
					return;
				}
				
				if(GameSkeleton.game._cameraType >= 1) {
					
					GameSkeleton.game.charLayer.context.clearRect(GameSkeleton.game.camera.v.x,GameSkeleton.game.camera.v.y,GameSkeleton.game.camera.v.width,GameSkeleton.game.camera.v.height);
				}
				var lsce;
				if(GameSkeleton.game.sceneChanger && GameSkeleton.game.player.x >= ((GameSkeleton.game.gameWidth) - GameSkeleton.game.tileWidth + 1)) {
					
					lsce = GameSkeleton.game.sceneChanger.currentScene + 1; if (lsce > GameSkeleton.game.sceneChanger._totalScenes.length-1) lsce = 1;
					if(!GameSkeleton.game.sceneChanger._totalScenes[lsce]) lsce = GameSkeleton.game.sceneChanger.currentScene;
					if(GameSkeleton.game.priorToSceneChange) GameSkeleton.game.priorToSceneChange(lsce);
					GameSkeleton.game.sceneChanger.changeScene(0,1,GameSkeleton.game.camera,"sceneChangeSpecifics",GameSkeleton.game,0,0,1,0,GameSkeleton.game.frameTime, GameSkeleton.game._ts,GameSkeleton.game.cameraTweenType); 
					if(GameSkeleton.game.afterSceneChange) GameSkeleton.game.afterSceneChange(lsce);
					
					GameSkeleton.game.camera.renderB1();
					GameSkeleton.game.camera.renderB2();
				
				}
				if(GameSkeleton.game.sceneChanger && GameSkeleton.game.player.x <= (GameSkeleton.game.tileWidth - 1)) {
					
					lsce = GameSkeleton.game.sceneChanger.currentScene - 1; if (lsce == 0) lsce = GameSkeleton.game.sceneChanger._totalScenes.length-1;
					if(!GameSkeleton.game.sceneChanger._totalScenes[lsce]) lsce = GameSkeleton.game.sceneChanger.currentScene;
					if(GameSkeleton.game.priorToSceneChange) GameSkeleton.game.priorToSceneChange(lsce);
					GameSkeleton.game.sceneChanger.changeScene(0,0,GameSkeleton.game.camera,"sceneChangeSpecifics",GameSkeleton.game,0,0,1,0,GameSkeleton.game.frameTime, GameSkeleton.game._ts,GameSkeleton.game.cameraTweenType); 
					if(GameSkeleton.game.afterSceneChange) GameSkeleton.game.afterSceneChange(lsce);
					
					GameSkeleton.game.camera.renderB1();
					GameSkeleton.game.camera.renderB2();
				}
				
				
				if(GameSkeleton.game.topDownSceneChange && GameSkeleton.game.sceneChanger && GameSkeleton.game.player.y >= ((GameSkeleton.game.gameHeight))) {
					
					lsce = GameSkeleton.game.sceneChanger.currentScene + 1; if (lsce > GameSkeleton.game.sceneChanger._totalScenes.length-1) lsce = 1;
					if(!GameSkeleton.game.sceneChanger._totalScenes[lsce]) lsce = GameSkeleton.game.sceneChanger.currentScene;
					if(GameSkeleton.game.priorToSceneChange) GameSkeleton.game.priorToSceneChange(lsce);
					GameSkeleton.game.sceneChanger.changeScene(0,2,GameSkeleton.game.camera,"sceneChangeSpecifics",GameSkeleton.game,0,1,0,0,GameSkeleton.game.frameTime, GameSkeleton.game._ts,GameSkeleton.game.cameraTweenType); 
					if(GameSkeleton.game.afterSceneChange) GameSkeleton.game.afterSceneChange(lsce);
					
					GameSkeleton.game.camera.renderB1();
					GameSkeleton.game.camera.renderB2();
				
				}
				if(GameSkeleton.game.topDownSceneChange && GameSkeleton.game.sceneChanger && GameSkeleton.game.player.y <= (1)) {
					
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
					
					
					GameSkeleton.game.camera.tweenedBlitLayerRender(GameSkeleton.game.cameraPoint, GameSkeleton.game.tweenLimitX || 0,GameSkeleton.game.tweenLimitY || 0, Math.round(GameSkeleton.game.frameTime / GameSkeleton.game._ts),GameSkeleton.game.cameraTweenType,0,0);
				}
				
                GameSkeleton.game._thrott = ts;
                
                if(!GameSkeleton.game.controller.gamePadButtonsUserDefined && GameSkeleton.game.enableGamePad) {
                    GameSkeleton.game.controller.configureGamePadButtons();
                } else if(GameSkeleton.game.enableGamePad && GameSkeleton.game.controller.gamePadButtonsUserDefined) {
                    
                    GameSkeleton.game.controller.handleGamePad();
                    
                }

			}
			if(GameSkeleton.game._doReset === 1) {
				return;
			}
			

			if(!GameSkeleton.game.paused) {
				GameSkeleton.game._aid = window.requestAnimationFrame(GameSkeleton.game._loop);
			}
	};
	GameSkeleton.prototype.callCamera = function( ts, pxoffset, pyoffset ) {
		GameSkeleton.game.cameraPoint.x = (Math.round(GameSkeleton.game.player.x ) - GameSkeleton.game.cameraFollowOffsetX)+ (pxoffset); 
		GameSkeleton.game.cameraPoint.y = (Math.round(GameSkeleton.game.player.y ) - GameSkeleton.game.cameraFollowOffsetY)+ (pyoffset);
		
		GameSkeleton.game.camera.tweenedBlitLayerRender(GameSkeleton.game.cameraPoint, GameSkeleton.game.tweenLimitX || 0,GameSkeleton.game.tweenLimitY || 0, Math.round(GameSkeleton.game.frameTime / (ts||GameSkeleton.game._ts)),GameSkeleton.game.cameraTweenType,0,0);
		
	};
	
	GameSkeleton.prototype.cancelAniFrame = function() {
		window.cancelAnimationFrame(GameSkeleton.game._aid);
	};
	
	GameSkeleton.prototype.pause = function(e) {
        if(e) e.preventDefault();
       
		if(!GameSkeleton.game.screenOrganizer || (GameSkeleton.game.screenOrganizer && GameSkeleton.game.screenOrganizer.currentScreen == 1)) {
			if(!GameSkeleton.game.paused) {
				GameSkeleton.game.paused = 1;
				window.cancelAnimationFrame(GameSkeleton.game._aid);  
				GameSkeleton.game._aid = window.requestAnimationFrame(GameSkeleton.game._justGamePad);
			} else {
				GameSkeleton.game.paused = 0;
				window.cancelAnimationFrame(GameSkeleton.game._aid);
				GameSkeleton.game._aid = window.requestAnimationFrame(GameSkeleton.game._loop);
			}
		}
	};
    GameSkeleton.prototype._justGamePad = function(ts) {
    
        if(GameSkeleton.game._thrott === 0) GameSkeleton.game._thrott = ts;GameSkeleton.game._pr = ts - GameSkeleton.game._thrott;
		if(GameSkeleton.game._pr >= 15) {
			if(!GameSkeleton.game.controller.gamePadButtonsUserDefined && GameSkeleton.game.enableGamePad) {
				GameSkeleton.game.controller.configureGamePadButtons();
			} else if(GameSkeleton.game.controller.gamePadButtonsUserDefined && GameSkeleton.game.enableGamePad) {  
				GameSkeleton.game.controller.handleGamePad();
			}
			GameSkeleton.game._thrott = ts;
		}
		if(GameSkeleton.game.paused) {
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
				GameSkeleton.game._doReset = 1;
				GameSkeleton.game.reset({keyCode:399});
				GameSkeleton.game.alternateLoopMethod = levelCompleteMethod || null;
			} else {
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
		
		GameSkeleton.game._doReset = 1;
		GameSkeleton.game.reset({keyCode:399});
		GameSkeleton.game.alternateLoopMethod = gameCompleteMethod || null;
		
		
		if(autoToTitleTime) {
			window.setTimeout( function() {
				
				window.cancelAnimationFrame(GameSkeleton.game._aid);
				GameSkeleton.game.fullResetToTitle(0);
			}, autoToTileTime);
		
		}
		
		return;
		
		
	};
	GameSkeleton.prototype.waitForStart = function(ts) {
		if(this.controller.buttons.start) {
			
			this.controller.buttons.start = 0;
			GameSkeleton.game.fullResetToTitle(0);
			
		}
		
	};
	GameSkeleton.prototype.gameOver = function(onlyRestPositionOnLooseLife, waitTime) {
			if(this.lives > 1) {
				this.lives -= 1;
				GameSkeleton.game._doReset = 1;
				GameSkeleton.game.reset({keyCode:onlyRestPositionOnLooseLife ? 82 : 299});
				
				
				return;
			} else {
				if(this.lives == 1) { this.lives = this._initLives+1-1;
				
					
					window.cancelAnimationFrame(GameSkeleton.game._aid);
					GameSkeleton.game._doReset = 1;
					GameSkeleton.game.alternateLoopMethod = GameSkeleton.game.waitForStart;
					this.screenOrganizer.addEventListener(tabageos.ScreenChangeEvent.SCREEN_CHANGE, "endLevel", GameSkeleton.game);
					this.screenOrganizer.switchScreen(2);
					
					
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
					GameSkeleton.game.reset({keyCode:82});
				}
			}
	};
	GameSkeleton.prototype.fullResetToTitle = function(e) {
		
		window.cancelAnimationFrame(GameSkeleton.game._aid);
		GameSkeleton.game._doReset = 1;
			
		window.setTimeout( function() {
			GameSkeleton.game._theReset();
		}, 700); return;

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
			
			if(GameSkeleton.game.screenOrganizer) {
				GameSkeleton.game.screenOrganizer.removeEventListener(tabageos.ScreenChangeEvent.COVER, "resetPosition", GameSkeleton.game);
			}
			
			if(GameSkeleton.game.positionResetSpecifics) {
				GameSkeleton.game.positionResetSpecifics();
			} 
			
			window.setTimeout( function() { GameSkeleton.game._doReset = 0;
				GameSkeleton.game._aid = window.requestAnimationFrame(GameSkeleton.game._loop);
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
				GameSkeleton.game._aid = window.requestAnimationFrame(GameSkeleton.game._loop);
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
	
	GameSkeleton.prototype.endLevel = function(e) {
			
			if(GameSkeleton.game.screenOrganizer) {
				GameSkeleton.game.screenOrganizer.removeEventListener(tabageos.ScreenChangeEvent.COVER, "endLevel", GameSkeleton.game);
				GameSkeleton.game.screenOrganizer.removeEventListener(tabageos.ScreenChangeEvent.SCREEN_CHANGE, "endLevel", GameSkeleton.game);
			}
			
			window.setTimeout( function() { GameSkeleton.game._doReset = 0;  GameSkeleton.game._doAlternate = 1;
				GameSkeleton.game._aid = window.requestAnimationFrame(GameSkeleton.game._loop);
			}, 1000);
    };
	
	
    
    GameSkeleton.prototype.muteUnmute = function() {



    };
        
    GameSkeleton.prototype.hudExit = function(e) {

        if(e) e.preventDefault();
        if(GameSkeleton.game.screenOrganizer && GameSkeleton.game.screenOrganizer.currentScreen == 0) {
            
            
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
		
	GameSkeleton.prototype._theReset = function() {
        
            GameSkeleton.game._doReset = 1;
			window.cancelAnimationFrame(GameSkeleton.game._aid);
            window.removeEventListener("keyup", GameSkeleton.game.reset, false);
            
			if(GameSkeleton.game.fullResetSpecifics) {
				GameSkeleton.game.fullResetSpecifics();
            }
            var listnr = tabageos.seekTouch() ? "touchstart" : "click";
            GameSkeleton.game.hExit.removeEventListener(listnr, GameSkeleton.game.hudExit, false);
            GameSkeleton.game.hPause.removeEventListener(listnr, GameSkeleton.game.pause, false);
            GameSkeleton.game.hMute.removeEventListener(listnr,GameSkeleton.game.muteUnmute, false);
            GameSkeleton.game.hWalkthrough.removeEventListener(listnr, GameSkeleton.game.hudToWalkthrough, false);
            GameSkeleton.game.hReset.removeEventListener(listnr, GameSkeleton.game.goBack, false);
				
			this.cameraLayer.context.clearRect(0,0,this.gameWidth,this.gameHeight);
			this.camera = null;this.cameraLayer = null;
			this.charLayer.context.clearRect(0,0,this.gameWidth,this.gameHeight);
			this.charLayer = null;
			if(this.display && this.display.context) {
				this.display.context.clearRect(0,0,this.gameWidth,this.gameHeight);
				this.display = null;
			}
				
			this.title.div.removeChild(this.startButton);
			this._thrott = 0;
			this.paused = 0;
				
			
			this.title = null;this.root = null;this.player = null;
			this.container = null; this.screenOrganizer = null; tabageos.ScreenOrganizer._instance = null; tabageos.GameSkeleton.game = null;
			window.location.reload();
			return;
	};
	
	GameSkeleton.prototype._scaleRectRef = null;
	GameSkeleton.prototype.removeHUD = function() {
        var listnr = tabageos.seekTouch() ? "touchstart" : "click";
		if(GameSkeleton.game._HUD) {
			GameSkeleton.game.hExit.removeEventListener(listnr, GameSkeleton.game.hudExit, false);
			GameSkeleton.game.hPause.removeEventListener(listnr, GameSkeleton.game.pause, false);
			GameSkeleton.game.hMute.removeEventListener(listnr,GameSkeleton.game.muteUnmute, false);
			GameSkeleton.game.hWalkthrough.removeEventListener(listnr, GameSkeleton.game.hudToWalkthrough, false);
			GameSkeleton.game.hReset.removeEventListener(listnr, GameSkeleton.game.goBack, false);
			if(GameSkeleton.game._playerHUD) this.container.removeChild(GameSkeleton.game._playerHUD);
			document.body.removeChild(GameSkeleton.game._HUD);
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
				tabageos.ResizeGame(cameraWidth,cameraHeight+controllerHeight,GameSkeleton.game.dontResizeHorizontal ? 0 : (gameScale || 1), GameSkeleton.game.dontResizeVertical ? 0 : (gameScale || 1),gameScale ? GameSkeleton.game.container : null,GameSkeleton.game._manuelControllerUse ? null : GameSkeleton.game.controller,1,1,GameSkeleton.game._scaleRectRef,1,cameraWidth, controllerHeight);
				
				
			} else { 
				tabageos.ResizeGame(cameraWidth,cameraHeight,GameSkeleton.game.dontResizeHorizontal ? 0 : (gameScale || 1), GameSkeleton.game.dontResizeVertical ? 0 : (gameScale || 1),gameScale ? (GameSkeleton.game.resizeRootForNoTouch ? ( GameSkeleton.game.screenOrganizer ? GameSkeleton.game.root.div : GameSkeleton.game.root) : GameSkeleton.game.container) : null,GameSkeleton.game._manuelControllerUse ? null : GameSkeleton.game.controller,0,1,GameSkeleton.game._scaleRectRef,1); 
				
			}
			
	};
	
	
	GameSkeleton.establish = function(gameInstance, spriteSheetImage,containerDivId, rootDivId, controllerDivId, gameScale, useScreenOrganizer, startWidth,startHeight) {
            
			if(spriteSheetImage) {
				GameSkeleton.img = new Image();
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
					window.addEventListener('resize', GameSkeleton.game.__instanceBasicTwoLayerResize, false);
					window.addEventListener('orientationchange', GameSkeleton.game.__instanceBasicTwoLayerResize, false);
				}; GameSkeleton.img.src = spriteSheetImage;
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
				window.addEventListener('resize', GameSkeleton.game.__instanceBasicTwoLayerResize, false);
				window.addEventListener('orientationchange', GameSkeleton.game.__instanceBasicTwoLayerResize, false);
				
			}
			
	};
	
	GameSkeleton.prototype.__instanceBasicTwoLayerResize = function() {
		
		GameSkeleton.game._basicTwoLayerResize(GameSkeleton.game.cameraLayer,GameSkeleton.game.display,GameSkeleton.game.charLayer, GameSkeleton.game.cameraWidth,GameSkeleton.game.cameraHeight,GameSkeleton.game.controllerHeight,GameSkeleton.game.container,GameSkeleton.game.controller, GameSkeleton.game.gameScale);
		
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
		
	};
	tabageos.GameSkeleton = GameSkeleton;
	
    
	
})();