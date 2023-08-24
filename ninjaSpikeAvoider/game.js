

(function() {
	
	//vars
    var maps = new LevelMaps();
	var coins = [];
	var spikes = [];
	var dontDraws = [[12,50], [77,77], [5,25]];
	var resetCoins = [];
	var currentLevel = 1;
	var leTween = null;
	var leTime = 8000;
	var levelStars = [0];
	var anySounds = 1;
	var saved = null;
	
	class NinjaGame extends tabageos.GameSkeleton {
        constructor() {
            super();
            
             var gameSpecs = { 
                gWidth:1088, gHeight:320,cameraWidth:544, cameraHeight:320, 
                cameraFollowOffsetX:-272, cameraFollowOffsetY:0,  tileW:16, tileH:16, 
                spriteSheetImage: "firstNinja.png", containerDivId:"container", rootDivId:"root", startLocations: new tabageos.MoverPoint(208,176),
                controllerDivId:"controller", gameScale:1, useScreenOrganizer:true,startWidth:128, startHeight:32,
                controllerHeight:144, initialLives:3, initPlayerPosition:new tabageos.MoverPoint(64,104), onSelectLevel:this.whenSelectLevel,
                gameLoop:this.loop,initializationSpecifics:this.initialSetup, beforeStartGameLoop: this.beforeStartGame,
                addedResizeMethod:null, afterSceneChange:this.levelHasChanged, priorToSceneChange:this.levelChanging, sceneChangeSpecifics:this.levelSetup, 
                sceneResetSpecifics:null,fullResetSpecifics:this.backToTitle, additionalSceneResetSpecifics:null, 
                positionResetSpecifics:this.scenePositionReset, cameraType:1, backgroundColor:"#6495ed" 
            };
            this.dontEstablishWorkers();
            this.initialConstruction(gameSpecs);
            this.enableGamePad = 1;
            this.establishKeyEventsForReset();
        }
		
		initialSetup = function() {
			
			
			this.title.floor.copyPixels(this._image, new tabageos.Rectangle(544,768,544,320), new tabageos.MoverPoint());
			this.startButton.innerHTML = "";
			this.backgroundLayer.copyPixels(this._image, new tabageos.Rectangle(0,1472,1088,320), new tabageos.MoverPoint(0,0));

			var playerAnimation = new tabageos.CanvasAnimation(this._image, this.charLayer, null, 0,0,16,16);

			playerAnimation.defineAnimation("left", [4,26,6,26,8,26,10,26,12,26,14,26,16,26,18,26,20,26,22,26,24,26,26,26]);
            playerAnimation.defineAnimation("right", [4,22,6,22,8,22,10,22,12,22,14,22,16,22,18,22,20,22,22,22,24,22,26,22]);
            playerAnimation.defineAnimation("up", [4,16]);
            playerAnimation.defineAnimation("upright", [4,16]);
            playerAnimation.defineAnimation("upleft", [8,16]);
            playerAnimation.defineAnimation("down", [4,18]);
            playerAnimation.defineAnimation("downright", [4,18]);
            playerAnimation.defineAnimation("downleft", [8,18]);
            playerAnimation.defineAnimation("onwallright", [4,8]);
            playerAnimation.defineAnimation("onwallleft", [4,12]);
            playerAnimation.defineAnimation("rightidle", [4,30]);
            playerAnimation.defineAnimation("leftidle", [4,34]);
            playerAnimation.defineAnimation("flip", [4,4,6,4,8,4,10,4,12,4,14,4]);
            playerAnimation.defineAnimation("flipright", [4,4,6,4,8,4,10,4,12,4,14,4]);
            playerAnimation.defineAnimation("flipleft", [4,4,6,4,8,4,10,4,12,4,14,4]);
			
			playerAnimation.fromWidthOffset = 16;
			playerAnimation.fromHeightOffset = 16;

			playerAnimation.currentAnimation = "left";
			playerAnimation.animate();
			

			this.player = new tabageos.BasicNinja(0,0,16,16,maps.level1,playerAnimation,1,0,16,16);

			this.player._map = tabageos.BlitMath.replaceValuesFromMultiArray(this.player._map, [[12,50], [9,23], [77,77], [5,25]], 0,0);

			this.player._autoAnimate = 1;
			this.player._gravityLevel = .400;//.285
			
			this.sceneChanger.addScene(maps.level1);
			this.sceneChanger.addScene(maps.level2);
			this.sceneChanger.addScene(maps.level3);
			this.sceneChanger.addScene(maps.level4);
			this.sceneChanger.addScene(maps.level5);
			this.sceneChanger.addScene(maps.level6);
			this.sceneChanger.addScene(maps.level7);
			this.sceneChanger.addScene(maps.level8);
			this.sceneChanger.addScene(maps.level9);
			this.sceneChanger.addScene(maps.level10);

			this.sceneChanger.changeCurrentMap(1);


			tabageos.BlitMath.ignoredArrays = dontDraws;
			//tabageos.BlitMath.specificPatternBlit(this.display, this._image, maps.level1);
			tabageos.BlitMath.functionAssignments = dontDraws;
			//tabageos.BlitMath.dispatchFunctionAssignments(this, "levelSetup", this, maps.level1, 16,16);

			this.setupCustomHealthHud("hudBack");
			this.hideCustomHud();

			this.setupStandardButtons(457,0,16,16,480,0,16,16,504,0,16,16,528,0,16,16,"more games", "https://www.tabageos.com/arcade");


			if(!this.getButton("soundToggle")) {

				this.makeButton("soundToggle", 192, 240, 160, 32, "tabageos.GameSkeleton.game.toggleAnySound()", "toggle sound", null, 1);

			} this.appendButton("soundToggle", 1);

			
			this.setupSounds();


			saved = this.getLocalSaved('ninjaSpikeAvoiderLevelStars');
			if(saved) {
				currentLevel = (String(saved).split(",").length - 1) || 1;
				
			}

			this.setupLevelSelect(176,272,192,32, currentLevel, new tabageos.Rectangle(544,768,544,320),"levelSetup", 0);

			this.autoPause = 0;
			
		};
		setupSounds = function() {
			if(anySounds) {
				if(this._mute) {
					this.muteUnmute();
				}
				this.playMusic("gameMusic");

				this.title.floor.copyPixels(this._image, new tabageos.Rectangle(736,1008,160,32), new tabageos.MoverPoint(192,240));
			} else {
				if(!this._mute) {
					this.muteUnmute();
				}
				this.title.floor.copyPixels(this._image, new tabageos.Rectangle(736,1088,160,32), new tabageos.MoverPoint(192,240));
			}
		};
		
		toggleAnySound = function() {
			anySounds = anySounds ? 0 : 1;
			this.setupSounds();

		};
		
		backToTitle = function() {
			this.disableAutoPause();
			this.removeStandardButtons();
		};
		
		beforeStartGame = function() { 
			this.enableAutoPause();

			this.setupSounds();
			this.showCustomHud(0,0,0,0, "position:absolute;left:448px;top:2px;width:96px;height:16px");
			this.appendStandardButtons();
			this.gotoSceneByDoor(currentLevel);
			
		};
		scenePositionReset = function() {
			
			this.player.setX(64);
			this.player.setY(104);
			if(resetCoins.length) {
				var i = 0; var l = resetCoins.length;
				for(i;i<l;i++) {
					coins.push(resetCoins.pop());
				}
			}

			this.updateAndResetCamera();

		
		};
		whenSelectLevel = function() { 
			this.enableAutoPause();
			
			coins = []; spikes = []; resetCoins = [];
			
			this.player._map = tabageos.BlitMath.replaceValuesFromMultiArray(this.sceneChanger.currentMap, [[12,50], [9,23], [77,77], [5,25]], 0,0);
			this.scenePositionReset();
			currentLevel = this.sceneChanger.currentScene;
			

		};
		
		levelSetup = function(e) {
			
			if(this.valuesMatch([5,25], e.tileValue) || this.valuesMatch([77,77], e.tileValue)) {

				var coin = new tabageos.CanvasAnimation(this._image, this.charLayer, null, e.x,e.y,16,16);
				coin.defineAnimation("spin", [25,5,26,5,27,5,28,5]);
				coin.currentAnimation = "spin";
				coins.push(coin);

			}

			if(this.valuesMatch([12,50], e.tileValue)) {

				var spikeAni = new tabageos.CanvasAnimation(this._image, this.charLayer, new tabageos.Rectangle(800,192,32,32), e.x,e.y, 32, 32);
				var spike = new tabageos.MapTraveler(e.x,e.y,32,32, this.sceneChanger.currentMap, spikeAni,0,0,16,16);
				spike._map = tabageos.BlitMath.replaceValuesFromMultiArray(spike._map, dontDraws, 0,0);
				spike._veloc.x = Math.random() * 4 >= 2 ? 4 : -4;
				spikes.push(spike);

			}

			
		};
		
		levelChanging = function(l) {
			
			spikes = [];
			coins = [];
			resetCoins = [];


		};
		
		levelHasChanged = function(lvl) {
			if(!saved || String(saved).split(",").length < levelStars.length) {
				this.localSave('ninjaSpikeAvoiderLevelStars', levelStars.toString());
			}

			this.player._map = tabageos.BlitMath.replaceValuesFromMultiArray(this.player._map, [[12,50], [9,23], [77,77], [5,25]], 0,0);
			this.player.setX(64);
			this.player.setY(104);
			currentLevel = lvl;

			if(lvl % 3 == 0) {
				this.backgroundLayer.copyPixels(this._image, new tabageos.Rectangle(16, 1136, 1088, 320), new tabageos.MoverPoint());
			} else {
				this.backgroundLayer.copyPixels(this._image, new tabageos.Rectangle(0,1472,1088,320), new tabageos.MoverPoint(0,0));
			}

		};
		

		levelCompleting = function() {	
			this.callCamera();

			if(this.sceneChanger.currentScene == 10) {
				this.pixelParagraph(32,32,10,"Well Done!. You have completed all 10 levels!. Thank You For Playing!.", this.cameraLayer);
			}

			if(leTween && leTween.length) {

				this._helperRect.x = 880;
				this._helperRect.y = 272;
				this._helperRect.width = 80;
				this._helperRect.height = 80;
				this._helperPoint.y = leTween.shift();
				this._helperPoint.x = 232;
				this.cameraLayer.copyPixels(this._image, this._helperRect, this._helperPoint);



			} else {

				leTime -= 33.3;
				if(leTime > 0) {
					this._helperRect.x = 880;
					this._helperRect.y = 272;
					this._helperRect.width = 80;
					this._helperRect.height = 80;
					this._helperPoint.y = 120;
					this._helperPoint.x = 232;
					this.cameraLayer.copyPixels(this._image, this._helperRect, this._helperPoint);
					this.cameraLayer.copyPixels(this._image, new tabageos.Rectangle(864,256,16,16), new tabageos.MoverPoint(232 + 8,120 + 56));
					levelStars[this.sceneChanger.currentScene] = 1;
					if(coins.length <= 3) {
						this.cameraLayer.copyPixels(this._image, new tabageos.Rectangle(864,256,16,16), new tabageos.MoverPoint(232 + 32,120 + 56));
						levelStars[this.sceneChanger.currentScene] = 2;
					}
					if(coins.length <= 0) {
						this.cameraLayer.copyPixels(this._image, new tabageos.Rectangle(864,256,16,16), new tabageos.MoverPoint(232 + 56,120 + 56));
						levelStars[this.sceneChanger.currentScene] = 3;
					}

					


				} else {

					this.charLayer.clearRect(0,0,1088,320);
					this.player.move(0,1,0,0);
					if(this.player.x > 1088) {
						if(this.sceneChanger.currentScene < 10) {
							this._doAlternate = 0;
						} else {
							this.fullResetToTitle(); return;
						}
					}



				}



			}



		};


		
		loop = function() {

			var cb = this.controller.buttons;

			this.player.move(cb.left,cb.right,cb.up || cb.a,cb.down);

			if(this.player._veloc.y < 0 && this.player._veloc.y > -.5) {
				this.playSound("jump");
			}
			
			
			var i = 0;var cn;
			for(i; i < coins.length; i++) {
				cn = coins[i];
				cn.animate(.2);
				cn.blit();

				if(tabageos.GeometricMath.testForPointInCircle(this.player._pos, 24, cn.getPosition()) ) {
					tabageos.GeometricMath.splice(coins, coins.indexOf(cn) );
					this.playSound("coin");resetCoins.push(cn);
					break;
				}

			}
			i = 0;var spike;
			for(i; i < spikes.length; i++) {
				spike = spikes[i];
				if(spike._pRight) {
					spike._veloc.x = -4;
				}
				if(spike._pLeft) {
					spike._veloc.x = 4;
				}
				spike.update();
				spike._canvasAnimation.matchPosition(spike);
				spike._canvasAnimation.blit();
				
				if(tabageos.GeometricMath.testForPointInArea(this.player._pos, spike._pos.x, spike._pos.y, spike._pos.x + 32, spike._pos.y + 32)) {
					this.playSound("impact");this.resetScene(0);
					return;
				}


			}

			var endTile = tabageos.BlitMath.checkTileValueAt(this.player.x, this.player.y, this.sceneChanger.currentMap,16,16);

			if(endTile[0] == 9 && endTile[1] == 23) {
				leTween = tabageos.TweenMath.tweenArray(-80,120, 1000, "OutBounce");leTime = 8000;
				this.levelComplete(this.levelCompleting);
				return;
			}





		};
		
		
	}
	
	new NinjaGame();
	
	
	setTimeout(function() {document.getElementById("phld").setAttribute("style", "display:none")}, 1000);

})();


