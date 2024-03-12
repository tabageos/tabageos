(function() {
	
	let maps = new gameClasses.AreaMaps();
	let bullets = [];
	let mBullets = [];
	let enemies = [];
	let avoids = [];
	let exF = null;
	let autoFire = 1;
	let bulletTime = 0;
	let _hpt;
	let healthBarer = null;
	let coindisplay = null;
	let eTally = [0,0,0,0,0,0,0,0,0,0,0];
	let bulletAnimation = "small";
	let instruc = 17000;
	let gun = null;
	let pmp = new tabageos.MoverPoint();
	let coins = [];
	let magnetStrength = 4;
	let grenSpeed = 4000;
	let rightGunFace = new tabageos.Rectangle(912,80,96,96);
	let leftGunFace = new tabageos.Rectangle(1056,80,96,96);
	let upgrader = null;
	let showStats = 0;
	let enemyType = function() {
		let rane = Math.round(Math.random() * 8);
		return  rane > upgrader.getEnemyTypeMax(rane) ? upgrader.getEnemyTypeMax(rane) : rane; 
	};
	let spawnTimer = 7000;
	let onspot = 0;
	let firstBody;
	let grena = null;
	let grenadeInfo = 0;
	let gameTime = 0;
	let timeCount = 0;
	let now = 0;
	let bodyparts = 1; 
	let centhead;
	let itemPoints = [];
	let pauseTime = 0;
	const coinAnimation = {
		"spin":[54,[17,54,18,54,19,54,20,54]],
		"smallHeart":[14,[5,14,5,14]]
	};
	const lightFromRect = new tabageos.Rectangle(2064,800,192 + 16,160 + 16);
	const slowLightFromRect = new tabageos.Rectangle(208*10,192*8,208,192);
	let slowLight = 0;
	let fireLight = 0;
	let gameDarkness = .39;
	let timedisplay = null;
	let fireLightAnimation = null;
	let showingOptions = 0;
	const crosshairRect = new tabageos.Rectangle(16,352,16,16);
	let titleBackFromRect = new tabageos.Rectangle(800,2224,320,200);
	let enSeparationThrott = 1;
	let titleBackLoopTime = 7500;
	let bit8002224 = tabageos.combineTwoNumbers(800,2224);
	let bit4642224 = tabageos.combineTwoNumbers(464,2224);
	let bit8002016 = tabageos.combineTwoNumbers(800,2016);
	let combined = bit8002224+1-1;
	const randtxy = function() {
		let rn = Math.random() * 6;
		if(rn >= 4.8) {
			return bit8002224;
		}
		if(rn > 2) {
			return bit4642224;
		}
		if(rn <= 2) {
			return bit8002016;
		}
	};
	let controllerIsSetup = 0;
	let spawnAreaLeftHealth = 5000;
	let spawnAreaRightHealth = 7000;
	let spawnAreaLeft = new tabageos.MoverPoint(48,352);//48, 352   1232, 252
	let spawnAreaRight = new tabageos.MoverPoint(1232,252);
	
	let useWorkers = true;
	
	
	class Shooter extends tabageos.GameSkeleton {

		constructor() {
			super();

			let specs = { 
				gWidth:1280, gHeight:800,cameraWidth:320, cameraHeight:200, 
				cameraFollowOffsetX:-(160), cameraFollowOffsetY:-100,  tileW:16, tileH:16, 
				spriteSheetImage: "rsoSheetUU.png", containerDivId:"container", rootDivId:"root",
				controllerDivId:"controller", gameScale:1, useScreenOrganizer:true,startWidth:128, startHeight:28, startLocations: new tabageos.MoverPoint(96,96),
				controllerHeight:144, initialLives:3, initPlayerPosition:new tabageos.MoverPoint(32,180), beforeStartGameLoop:this.beforeStartGame, sesceneChangeSpecifics:this.levelSetup,
				gameLoop:this.loop,initializationSpecifics:this.initialSetup, disableBackgroundAlpha:0, priorToSceneChange:this.levelChanging, afterSceneChange:this.levelHasChanged,
				addedResizeMethod:null, sceneResetSpecifics:null,fullResetSpecifics:this.backToTitle, additionalSceneResetSpecifics:null, 
				positionResetSpecifics:this.scenePositionReset, cameraType:1, backgroundColor:"#c8c8c8",transitionBackgroundColor:"#000000" 
			};
			this.initialConstruction(specs);
			exF = new tabageos.ExplosionFactory(32,32,11,528,1);
			exF.readyExplosions(251);
			_hpt = new tabageos.MoverPoint();
			
			if(!window.Worker || !useWorkers) {
				this.dontEstablishWorkers();
			}
			this.enableGamePad = 1;
			now = window.performance.now();
			
		}
		
		
		
		turnOnSlowLight = function(off) {
			slowLight = off ? 0 : 1;
		};
		turnOnFireLight = function(off) {
			fireLight = off ? 0 : 1;
		};
		
		initialSetup = function(e) {
			document.body.addEventListener('contextmenu', function(e) { e.preventDefault(); return false;});
			
			var playerAni = new tabageos.CanvasAnimation(this._image, this.charLayer,null,0,0,16,16);
			
			this.camera.v.width = 320;
			this.camera.v.height = 200;
			this.tweenLimitX = 960;
			this.tweenLimitY = 600;
			
			this.title.floor.copyPixels(this._image,  new tabageos.Rectangle(800,2224,320,200),new tabageos.MoverPoint());
			
			this.title.floor.copyPixels(this._image, new tabageos.Rectangle(416,736,320,200),new tabageos.MoverPoint());
			this.title.floor.canvas.setAttribute("style","image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;image-rendering: pixelated;image-rendering: crisp-edges;");
			this.gameOverContainer.floor.copyPixels(this._image, new tabageos.Rectangle(752,736,320,208),new tabageos.MoverPoint());
			this.gameOverContainer.floor.canvas.setAttribute("style","image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;image-rendering: pixelated;image-rendering: crisp-edges;");
			this.startButton.innerHTML = "";
			
			this.setupStandardButtons(0,16,16,16,0,80,16,16,0,32,16,16,0,64,16,16,"help", "");
			
			if(!this.getButton("toggleStatsB")) {
				this.makeButton("toggleStatsB",0,48,16,16,"tabageos.GameSkeleton.game.toggleStatsShown()","toggle stats");
			}
			playerAni.animationSpecs = { 
				"left":[24, [38,24,38,24,38,24,38,24,37,24,37,24,37,24,37,24] ],
				"right":[24, [28,24,28,24,28,24,28,24,29,24,29,24,29,24,29,24] ],
				"up":[24, [29,24,29,24,29,24,29,24,28,24,28,24,28,24,28,24] ],
				"down":[24, [37,24,37,24,37,24,37,24,38,24,38,24,38,24,38,24] ],
				"upleft":[24, [37,24,37,24,37,24,37,24,38,24,38,24,38,24,38,24] ],
				"upright":[24, [29,24,29,24,29,24,29,24,28,24,28,24,28,24,28,24] ],
				"downleft":[24, [37,24,37,24,37,24,37,24,38,24,38,24,38,24,38,24] ],
				"downright":[24, [29,24,29,24,29,24,29,24,28,24,28,24,28,24,28,24] ],
				"rightidle":[23, [29,23,29,23,29,23,29,23,28,23,28,23,28,23,28,23] ],
				"leftidle":[23, [37,23,37,23,37,23,37,23,38,23,38,23,38,23,38,23] ],
				"upidle":[23, [38,23,38,23,38,23,38,23] ],
				"downidle":[23, [29,23,29,23,29,23,29,23,28,23,28,23,28,23,28,23] ],
				"idle":[23, [29,23,29,23,29,23,29,23,28,23,28,23,28,23,28,23] ] 
			};
			playerAni.currentAnimation = "right";
			playerAni.animate();
			this.player = new tabageos.MapTraveler(320,96,16,16,maps.level1,playerAni,0,0,16,16);
			//this.player._autoAnimate = 1;
			
			var rotationImage = new tabageos.CanvasObject(null,96,96);
			
			var wd = new tabageos.WayDeterminer(0,null);
			wd._defaultReturn = true;//a defaulted WayDeterminer, we wont actually be using it.
			
			//just the gun is a RotatingShooter
			gun = new tabageos.RotatingShooter(wd,this._image,this.charLayer,null,0,0,32,32, rotationImage, rightGunFace,this.charLayer,new tabageos.Rectangle(48,96,16,16), this.player._map);
			
			tabageos.BlitMath.ignoredArrays = [[33,26],[85,3],[77,3],[23,12],[33,47]];
			tabageos.BlitMath.specificPatternBlit(this.display, this._image,maps.back1,16,16);
			tabageos.BlitMath.specificPatternBlit(this.display, this._image,maps.level1,16,16);
			
			this.player.health = 500;
			
			this.controller.basicWasd.a = 6;
			this.controller.basicWasd.b = 90;//z
			this.controller.basicWasd.c = 8;
			this.controller.basicWasd.d = 8;
			
			this.controller.wasd.a = 6;
			this.controller.wasd.b = 90;//z
			this.controller.wasd.c = 8;
			this.controller.wasd.d = 8;
			
			this.sceneChanger.addScene(maps.level1);
			
			this.sceneChanger.changeCurrentMap(1);
			enemies = this.sceneChanger.changeSceneEnemies(1);
			
			coins = this.sceneChanger.changeSceneryObjects(1);
			
			this.player._map = tabageos.BlitMath.replaceValuesFromMultiArray(this.player._map, [[3,18], [1,1], [2,1]],0,0);

			this.setupCustomHealthHud("goldhudback"); //_healthBar.setAttribute("id", backgroundId);
			var mxhlth = Math.round(this.player.health / 9.8);
			var toff = window.navigator.userAgent.indexOf("Firefox") != -1  ? 7 : 8.7;
			this.addToCustomHud("healthba", "position:absolute;top:0px;left:0px;width:"+mxhlth+"px;height:16px");
			this.addToCustomHud("coinamount", "position:absolute;top:"+toff+"px;left:8px;height:10px;width:320px");
			this.addToCustomHud("timedisplay", "position:absolute;top:2px;left:225px;width:100px;height:12px;");
			healthBarer = this.getCustomHudPart(1);
			coindisplay = this.getCustomHudPart(2);
			timedisplay = this.getCustomHudPart(3);
			
			this.hideCustomHud();
			
			tabageos.BlitMath.functionAssignments = [ [3,65],[3,69],[2,69],[2,67],[2,65],[8,2],[14,5],[15,5],[17,10], [33,26],[85,3], [77,3],[23,12], [33,7], [26,1], [33,47], [3,18], [10,40] ];
			tabageos.BlitMath.dispatchFunctionAssignments(this,"levelSetup",this,this.sceneChanger.currentMap,16,16);
			
			this.setupMouseTouchHandle(1);
			
			if(controllerIsSetup === 0) {
				this.controller._basicControllerButtonTakedown();
				if(tabageos.seekTouch()) {
					this.controller.rotationalControllerButtonSetup();
				} else {
					this.controller.standardControllerButtonSetup();
				}
				controllerIsSetup = 1;
			}
			
			this.spawnEnemyAt(48, 352,1);this.spawnEnemyAt(48, 352,1);this.spawnEnemyAt(48, 352,1);
			this.spawnEnemyAt(48, 352,1);this.spawnEnemyAt(48, 352,1);this.spawnEnemyAt(48, 352,1);this.spawnEnemyAt(48, 352,1);
			this.spawnEnemyAt(48, 352,1);this.spawnEnemyAt(48, 352,1);this.spawnEnemyAt(48, 352,1);
			this.spawnEnemyAt(48, 352,1);this.spawnEnemyAt(48, 352,1);this.spawnEnemyAt(48, 352,1);this.spawnEnemyAt(48, 352,1);
			this.spawnEnemyAt(48, 352,1);this.spawnEnemyAt(48, 352,1);this.spawnEnemyAt(48, 352,1);
			this.spawnEnemyAt(48, 352,1);this.spawnEnemyAt(48, 352,1);this.spawnEnemyAt(48, 352,1);this.spawnEnemyAt(48, 352,1);
			
			if(!upgrader) {
				upgrader = new gameClasses.RSUpgrades(coindisplay, healthBarer, gun);
				upgrader.usingRectLeft = leftGunFace;
				upgrader.usingRectRight = rightGunFace;
			} else {
				upgrader.propsReset(coindisplay, healthBarer, gun);
			}
			
			this.player._walkSpeed = upgrader.getSpeed();
			
			while(bullets.length < 51) {//enemy bullet setup
				
				var nebca = new tabageos.CanvasAnimation(this._image, this.charLayer,null,0,0,16,16);
				nebca.animationSpecs = {
					"shotleft":[10, [7,10,7,10,7,10,7,10,6,10,6,10,6,10,6,10,5,10,5,10,5,10,5,10] ],
					"shotright":[9, [5,9,5,9,5,9,5,9,6,9,6,9,6,9,6,9,7,9,7,9,7,9,7,9] ],
					"eyeshot":[0,[16,77]]
				};
				nebca.currentAnimation = "shotleft"; nebca.animate(0);
				var neb = new tabageos.MapTraveler(0,0,16,16,this.sceneChanger.currentMap,nebca);
				neb.health = 8.4; bullets.push(neb);
				
			}
			
			this.removeEventListener("pauseEvent", "pauseTimer", this);
			this.addEventListener("pauseEvent", "pauseTimer", this);
			
			fireLightAnimation = new tabageos.CanvasAnimation(this._image, this.charLayer,null,0,0,173,193);
			
			fireLightAnimation.defineAnimation("shine",[14,6, 15,6, 16,6, 17,6, 18,6, 19,6,   14,7, 15,7, 16,7, 17,7, 18,7, 19,7, 14,8, 15,8, 16,8, 17,8, 18,8, 19,8, 14,9, 15,9, 16,9, 17,9, 18,9, 19,9, 14,10, 15,10, 16,10, 17,10, 18,10, 19,10]);
			fireLightAnimation.currentAnimation = "shine";
			
			this.initializeLights(gameDarkness, "#000000",2);
			
			if(!this.getButton("toOptionsB")) {
				this.makeButton("backToTitleB",320-32,2,32,32,"tabageos.GameSkeleton.game.showTitle()","back",0,1);
				this.makeButton("toOptionsB",96,128,128,28,"tabageos.GameSkeleton.game.showOptions()","options",0,1);
				this.makeButton("toCreditsB",96,160,128,28,"tabageos.GameSkeleton.game.showCredits()","credits",0,1);
				this.makeButton("toChangeDarkB",160,32,112,16,"tabageos.GameSkeleton.game.readyToChangeGameDarkness()","use slider to change darkness",0,1);
				this.makeButton("toChangeVolumeB",32,32,112,16,"tabageos.GameSkeleton.game.readyToChangeVolume()","use slider to change volume",0,1);
				
				
				this.getButton("toOptionsB").setAttribute("class", "hoverable");
				this.getButton("toCreditsB").setAttribute("class", "hoverable");
				
				
			}
			
			this.appendButton("toOptionsB");this.appendButton("toCreditsB");
			this.startButton.setAttribute("class", "hoverable");
			
			this.levelComplete(this.titleScreenLoop);
			
			
			if(!this.soundSystem._currentTrack) {
			
				this.playMusic("newfactory");
			
			}

		};
		
		
		
		titleScreenLoop = function(ts) {
			
			
			titleBackLoopTime -= 33.3;
			if(titleBackLoopTime <= 0) {
				combined = randtxy();
				titleBackLoopTime = 2000;
			} 
			titleBackFromRect.x = tabageos.getAFromCombined(combined);
			titleBackFromRect.y = tabageos.getBFromCombined(combined);
			
			
			this.title.floor.copyPixels(this._image, titleBackFromRect,new tabageos.MoverPoint());
			
			titleBackFromRect.x = 416; titleBackFromRect.y = 736;
			this.title.floor.copyPixels(this._image, titleBackFromRect,new tabageos.MoverPoint());
			
		};
		
		showOptions = function() { 
			
			var ths = tabageos.GameSkeleton.game;
			//ths.playMusic("newfactory");
			ths.removeStartButton();
			ths.removeButton("toOptionsB");
			ths.removeButton("toCreditsB");
			
			ths.appendButton("toChangeDarkB");
			ths.appendButton("toChangeVolumeB");
			ths.removeButton("backToTitleB");
				
				
			ths.title.floor.copyPixels(ths._image, new tabageos.Rectangle(1232,976,320,200), new tabageos.MoverPoint());
				
			if(tabageos.GameSkeleton.game._sliderForOtherThanVolume) {
					
				ths.readyToChangeGameDarkness();
			} else {
				ths.readyToChangeVolume();
					
			}
				
			ths.appendButton("backToTitleB");
				
			ths.initVolumeSliderAnimation((320/2) - 40,58,ths.title.floor, 1);
			ths.removeEventListener('volumeSliderEvent','changeGameDarkness', this);
			ths.addEventListener('volumeSliderEvent','changeGameDarkness', this);
				
			showingOptions = 1;
				
			ths.initializeLights(gameDarkness, "#000000",1);//_lightComp set to destination-in
			ths._lightComp = 'multiply';//because the title floor does not have alpha
			ths.readyLights(lightFromRect,64,32);
			ths.applyLights();
			ths._actualApplyLights(ths.title.floor);//manullay apply lights to the title floor canvas.
				
			ths.levelComplete(ths.optionsLoop);
				
		};
			
		readyToChangeGameDarkness = function() {
				
			tabageos.GameSkeleton.game._sliderForOtherThanVolume = 1;
			var ths = tabageos.GameSkeleton.game;
			ths._sliderValue = gameDarkness+1-1;
			ths.title.floor.copyPixels(ths._image, new tabageos.Rectangle(1392,960,128,16), new tabageos.MoverPoint(160,32));
			ths.title.floor.copyPixels(ths._image, new tabageos.Rectangle(1264,960 - 16,112,16), new tabageos.MoverPoint(32,32));
				
		};
		readyToChangeVolume = function() {
			tabageos.GameSkeleton.game._sliderForOtherThanVolume = 0;
			var ths = tabageos.GameSkeleton.game;
			ths._sliderValue = ths.soundSystem._globalVolume+1-1;
			ths.title.floor.copyPixels(ths._image, new tabageos.Rectangle(1264,960,112,16), new tabageos.MoverPoint(32,32));
			ths.title.floor.copyPixels(ths._image, new tabageos.Rectangle(1392,960 -16,128,16), new tabageos.MoverPoint(160,32));
		};
		changeGameDarkness = function(e) {
				
			var dec = e.potato;//e is a tabageos.Event 
			gameDarkness = dec * 1.1;
				
			if(gameDarkness >= 1) {
				gameDarkness = .99;
			}
			if(gameDarkness < .1) {
				gameDarkness = .1;
			}
				
			var ths = tabageos.GameSkeleton.game;
			ths.title.floor.copyPixels(ths._image, new tabageos.Rectangle(1232,976,320,200), new tabageos.MoverPoint());
			ths.title.floor.copyPixels(ths._image, new tabageos.Rectangle(1392,960,128,16), new tabageos.MoverPoint(160,32));
			ths.initializeLights(gameDarkness, "#000000",1);//_lightComp set to destination-in
			ths._lightComp = 'multiply';//because the title floor does not have alpha
			ths.readyLights(lightFromRect,64,32);
			ths.applyLights();
			ths._actualApplyLights(ths.title.floor);//normally called for us in _loop and done on the cameraLayer , (most underscore properties/methods are called automatically in their class)
				
		};
			
		optionsLoop = function(ts) {
			var ths = tabageos.GameSkeleton.game;
			
			if(showingOptions == 1) {
				
				ths.volumeSliderLoop(ts);
			}
		};
			
		showCredits = function() {
				
			var ths = tabageos.GameSkeleton.game;
			ths._doAlternate = 0;
			showingOptions = 0;
			ths.levelComplete(ths.optionsLoop);
			//ths.playMusic("newfactory");
			ths.removeStartButton();
			ths.removeButton("toOptionsB");ths.removeButton("toCreditsB");
			ths.removeButton("toChangeDarkB");
			ths.removeButton("toChangeVolumeB");
			ths.removeButton("backToTitleB");
				
				//mattwalkden.itch.io
				//codemanu
				
				
			ths.title.floor.copyPixels(ths._image, new tabageos.Rectangle(1504,496,320,208), new tabageos.MoverPoint());
				
			ths.appendButton("backToTitleB");
				
				
		};
		showTitle = function() { 
				
			var ths = tabageos.GameSkeleton.game;
			ths.removeVolumeSliderAnimation();
				
			ths.removeButton("backToTitleB");
			ths.removeButton("toChangeDarkB");
			ths.removeButton("toChangeVolumeB");
				
			ths.title.floor.copyPixels(ths._image,  new tabageos.Rectangle(800,2224,320,200),new tabageos.MoverPoint());
			
			ths.title.floor.copyPixels(ths._image, new tabageos.Rectangle(416,736,320,200),new tabageos.MoverPoint());
			showingOptions = 0;
			ths.appendStartButton();
			ths.appendButton("toOptionsB");ths.appendButton("toCreditsB");
			ths.startButton.setAttribute("class", "hoverable");
			ths._doAlternate = 0;
			ths.levelComplete(ths.titleScreenLoop);
				
		};
		
		pauseTimer = function(e) {
			
			if(this.paused) {
				pauseTime = window.performance.now();
			}
			
			if(!this.paused) {
				if(pauseTime) {
					now += ( window.performance.now() - pauseTime);
				}
			}
			
		};
		
		beforeStartGame = function(e) { 
			
			this.appendStandardButtons();
			
			if(!this.soundSystem._currentTrack) {
				this.playMusic("newfactory");
			}
			this.appendButton("toggleStatsB");
			this.removeButton("toOptionsB");this.removeButton("toCreditsB");
			this.controller.centerRotationX = 55;
			this.controller.centerRotationY = (this._scaleRectRef.height||200) + 64;//can be calibrated by the player
			coindisplay.innerText = (upgrader.coinsCollected  || "0") + "";
			this.showCustomHud(this.player.health,0,0,0,"position:absolute;top:0px;left:0px;height:96px; width:64px;");
			this._doAlternate = 0;
			
		};
		
		levelChanging = function(s) {
			enemies = this.sceneChanger.changeSceneEnemies(s);
			coins = this.sceneChanger.changeSceneryObjects(s);
			avoids = [];
		};
		
		showGrenadeInfo = function(ts) {
			
			this.callCamera(ts);
			this.applyLights();
			this._actualApplyLights();
			
			this.cameraLayer.copyPixels(this._image, new tabageos.Rectangle(640,1136,144,64), new tabageos.MoverPoint(88,68-32));
			
			if(!this.getButton("closeGrenInfo")) {
				this.makeButton("closeGrenInfo", 88,68-32,144, 56, "tabageos.GameSkeleton.game.finishGrenadeInfo()"," click to close");
				this.appendButton("closeGrenInfo");
			}
		};
		finishGrenadeInfo = function() {
			this.removeButton("closeGrenInfo");
			this.trashButton("closeGrenInfo");
			tabageos.GameSkeleton.game._doAlternate = 0;
		};
		
		baughtGrenades = function() {
			if(grenadeInfo < 500) {
				grenadeInfo = 1;
			}
		};
		toggleStatsShown = function() {
			showStats = showStats ? 0 : 1;
		};
		
		scenePositionReset = function(e) {
			
			this.player.setX(48);
			this.player.setY(48);
			this.camera.reset();
			this.player.health = 200;
			healthBarer.style.width = Math.round(this.player.health / 7.81) + "px";
			this.callCamera(e);
			if(this.lives == 0) {
				this.lives = 3;
			}
			
		};
		levelHasChanged = function(lv) {
			
			var bdrw;
			if(lv == 1) {
				bdrw = maps.back1;
			}
			
			var i = 0;var b;
			for (i; i < mBullets.length;i++) {
				b = mBullets[i];
				if(b.health >= 100) {
					gun.reclaimBullet(b);
				} else {
					bullets.push(b);
				}
			}
			mBullets = [];
			enemies = this.sceneChanger.changeSceneEnemies(lv);
			coins = this.sceneChanger.changeSceneryObjects(lv);
			avoids = [];
			
			tabageos.BlitMath.specificPatternBlit(this.display, this._image,bdrw,16,16);
			tabageos.BlitMath.specificPatternBlit(this.display, this._image,this.sceneChanger.currentMap,16,16);
			this.player._map = tabageos.BlitMath.replaceValuesFromMultiArray(this.player._map,[[33,26],[14,5],[15,5], [85,3],[77,3],[17,10],[8,3],[8,2],[2,66],[2,65],[2,68],[2,67],[2,70],[2,69],[3,70],[3,69],[3,66],[3,65],[71,5], [3,18], [6,38], [6,39], [7,38],[7,39], [8,38],[8,39], [15,5] ]);
		
		};
		
		spawnCoinAt = function(x,y, h) {
			
			var coin = new tabageos.BlittedTraveler(this._image, this.charLayer, null,x,y,16,16);
			coin.animationSpecs = coinAnimation; coin.currentAnimation = "spin";
			coin.separationDistance = 8;
			if(h) { coin.currentAnimation = "smallHeart"; }
			coins.push(coin);
			
		};
		
		spawnEnemyAt = function(ex,ey,e) {
			if(enemies.length >= 78) {
				return;
			}
			if(e == 1) {
				this.levelSetup(  {x:ex, y:ey, tileValue:[23,12], spawn:1} );
			} //"bettle"
			if(e == 2) {
				this.levelSetup(  {x:ex, y:ey, tileValue:[33,7], spawn:1} );
			}
			if(e == 3) {
				this.levelSetup(  {x:ex, y:ey, tileValue:[26,1], spawn:1} );
			}
			if(e == 4) {
				this.levelSetup(  {x:ex, y:ey, tileValue:[33,47], spawn:1} );
			}
			if(e == 5) {
				this.levelSetup(  {x:ex, y:ey, tileValue:[33,26], spawn:1} );
			}
			if(e == 7) { bodyparts = 1;
				this.levelSetup(  {x:ex, y:ey, tileValue:[77,3], spawn:1} );
				this.levelSetup(  {x:ex, y:ey, tileValue:[85,3], spawn:1} );
				this.levelSetup(  {x:ex, y:ey, tileValue:[85,3], spawn:1} );
				this.levelSetup(  {x:ex, y:ey, tileValue:[85,3], spawn:1} );
			}
			
		};
		
		levelSetup = function(e) {
			if(!e.spawn) {
				this.player._map[e.y/16][e.x/16] = [0,0];
				this.sceneChanger.currentMap[e.y/16][e.x/16] = [0,0];
			}
			if(e.tileValue[1] == 3 && e.tileValue[0] == 77) {
				gameClasses.EnemyDetails.centChaserPart(e, enemies);
			}
			if(e.tileValue[1] == 3 && e.tileValue[0] == 85 && bodyparts < 10) {
				bodyparts += 1;
				gameClasses.EnemyDetails.centBodyPart(e,enemies, bodyparts);
			}
			if(e.tileValue[1] == 26 && e.tileValue[0] == 33) {//shooting enemy
				gameClasses.EnemyDetails.shooter(e,enemies);
			}
			if(e.tileValue[1] == 12 && e.tileValue[0] == 23) {//beetle
				gameClasses.EnemyDetails.beetle(e,enemies);
			}
			if(e.tileValue[1] == 7 && e.tileValue[0] == 33) {//hornet
				gameClasses.EnemyDetails.hornet(e,enemies);
			}
			if(e.tileValue[1] == 1 && e.tileValue[0] == 26) {//other bug
				gameClasses.EnemyDetails.otherBug(e,enemies);
			}
			if(e.tileValue[1] == 47 && e.tileValue[0] == 33) {//car
				gameClasses.EnemyDetails.car(e,enemies);
			}
		};
		
		backToTitle = function(e) {
			this.sceneChanger.clearAllArrays();
			enemies = [];
			bullets = [];
			mBullets.length = 0;
			bulletAnimation = "small";
			//bulletStrength = 1;
			//haveForceField = 0;
			//haveMultiShot = 0;
			//haveSeeker = 0;
			//bulletSeeking = 0;
			healthBarer = null;
			avoids = [];
			now = window.performance.now();
			//upgrader.reset();
			this.removeCustomHudParts();
			this.removeHUD();
			this.removeStandardButtons();
			this.removeButton("toggleStatsB");
			this.startButton.setAttribute("class", "hoverable");
			if(this._mute == 0) {
				//this.soundSystem.stopMusic();
			}
			if(this.lives == 0) {
				this.lives = 3;
			}
			this.player.health = 300;
			
		};
		
		spawnCoins = function(en, max, rs) {
			max = max || 25;
			var ranfc = Math.floor(Math.random() * max) + 10;
			var cio = 0;rs = rs || 75;
			for(cio;cio < ranfc;cio++) {
				this.spawnCoinAt((en.x + 4) - (.1*cio), en.y + (.2*cio), (Math.random() * rs > rs-2) ? 1 : 0);
			}
		};
		
		checkCoinsAndUpgrade = function(a,g) {
			upgrader.checkCoinsAndUpgrade(a,g);
			now += ( window.performance.now() - upgrader.upgradeTime );
			
		};
		
		doGameOver = function(victory) { //on seeming one loss life went to reset upgrades err
			
			if(this.lives <= 1 || victory == 2) {
				timeCount = window.performance.now();
				
				gameTime = Math.floor((timeCount - now)/1000);
				
				var hours = Math.floor(gameTime/3600);
				var mins = hours >= 1 ? Math.floor( (gameTime - (hours*3600)) / 60) : Math.floor(gameTime/60);
				var secs = mins >= 1 ? gameTime-(mins*60) : gameTime;
				var frontString = (victory >= 2 ? "Victory!.You held back.all waves of enemies!.Time ." : "You survived for .");
				this.pixelParagraph((320/2), 64, 10, frontString+secs+"  secs. "+mins+"  mins. "+hours+"  hours",this.gameOverContainer.floor);
			
				var quickStartClick = function(e) {
					spawnAreaLeftHealth = 5000;
					spawnAreaRightHealth = 7000;
					tabageos.GameSkeleton.game.controller.buttons.start = 1;
					tabageos.GameSkeleton.game.gameOverContainer.floor.canvas.removeEventListener("click", quickStartClick, false);
				};
			
				this.gameOverContainer.floor.canvas.addEventListener("click", quickStartClick, false);
				
				if(victory != 2) {
					upgrader.reset();
				} else {
					this.lives = 1;
				}
			}
			
			this.gameOver(1);
			
		};
		
		loop = function(ts) {
			
			var cb = this.controller.buttons;
			
			
			if(!this.healthBarIsDisplayed) { 
				this.showCustomHud(this.player.health,0,0,0,"position:absolute;top:0px;left:0px;height:96px; width:64px;");
			}
			
			this.player.move(cb.a||cb.left,cb.b||cb.right,cb.c||cb.up, cb.d||cb.down);
			
			gun.setX( this.player.x - 8 );//set the gun to be in middle of player
			gun.setY( this.player.y - 8 );
			
			if(!this.device) {
				gun.rotateWithMoverPoint(this.mousePoint, 16,16);//gun rotates with the mouse/pointer.
			} else {
				gun.setRotation(this.controller.rotation);//rotation touch controllerpad
			}
			var i = 0;
			
			
			var gr = gun.getRotation();
			if(gr < -90 || gr > 90) {//when rotated to the left side, change to keep hands under gun
				gun.rFromRect = upgrader.usingRectLeft;//leftGunFace;//this is how to change what the rotation image is on the fly, just change the rFromRect
			} else {
				gun.rFromRect = upgrader.usingRectRight;//rightGunFace;
			}
			
			spawnTimer -= 33.3;
			var ransp = Math.random()* 9;
			var etyp = 1;
			if(spawnTimer <= 0) {
				if(ransp < 7 && spawnAreaLeftHealth > 0) {
					if(upgrader.getEnemyTypeMax() <= 3) {
						this.spawnEnemyAt(48, 352, enemyType());this.spawnEnemyAt(48, 352, enemyType());
						this.spawnEnemyAt(48, 352, enemyType());this.spawnEnemyAt(48, 352, enemyType());
						this.spawnEnemyAt(48, 352, enemyType());this.spawnEnemyAt(48, 352, enemyType());
						this.spawnEnemyAt(48, 352, enemyType());this.spawnEnemyAt(48, 352, enemyType());
					} else {
						etyp = enemyType();
						if(etyp <=3) {
							this.spawnEnemyAt(48, 352, etyp);this.spawnEnemyAt(48, 352, etyp);
							this.spawnEnemyAt(48, 352, etyp);this.spawnEnemyAt(48, 352, etyp);
							this.spawnEnemyAt(48, 352, etyp);this.spawnEnemyAt(48, 352, etyp);
						} else {
							this.spawnEnemyAt(48, 352, etyp);
						}
						
					}
				} else if (spawnAreaRightHealth > 0) { //only 1-3 enemies come out of the  right side spawn area.
					etyp = enemyType();
					if(etyp <= 3) {
						if(upgrader.getEnemyTypeMax() <= 3) {
							this.spawnEnemyAt(1232, 252, etyp);this.spawnEnemyAt(1232, 252, etyp);
							this.spawnEnemyAt(1232, 252, etyp);this.spawnEnemyAt(1232, 252, etyp);
						} else {
							this.spawnEnemyAt(1232, 252, etyp);this.spawnEnemyAt(1232, 252, etyp);
							
						}
					}
				}
				spawnTimer = upgrader.getSpawnTimeOver();//spawnTimeOver +1-1;
			}
			
			var bullet;var ei = 0; var el;var en;
			
			i = 0;var cin;
			if(coins.length > 10) { //leave only 10 coins to actually be displayed
				upgrader.coinsCollected += coins.length -10;
				coins.splice(10, coins.length-10);
				coindisplay.innerText = upgrader.coinsCollected + "";
			}
			for(i; i < coins.length;i++) {//animate and show the last ten coins collected
					//in the other games this would show all coins, when it gets to 300+ coins it can make the game slow down
					//so in this game we tally most of the coins above and then here just show the last 10 easing to the player
				cin = coins[i];
					cin.easeProximity = magnetStrength * 2;
					cin.maxSpeed = magnetStrength * 9;
					cin.maxForce = magnetStrength * 50;
					cin.easeTo(this.player._pos);
					cin.separate(coins);
					cin.update();
					cin.animate(.4);
					cin.blit();
					
					if(tabageos.GeometricMath.testForPointInCircle(cin.getPosition(), 24, this.player._pos)) {
						upgrader.coinsCollected += 1;
						if(cin.currentAnimation == "smallHeart" && this.player.health < 500) {
							this.player.health += 35;
							healthBarer.style.width = Math.round(this.player.health / 9.8)+ "px";
						}
						this.playSound("coin");
						
						tabageos.GeometricMath.splice(coins,coins.indexOf(cin));
						coindisplay.innerText = upgrader.coinsCollected + "";
						break;
					}
			}
			
			enSeparationThrott -= 1;
			if(enSeparationThrott < 0) {
				enSeparationThrott = 3;
			}
			
			
			i = 0;
			for(i; i < enemies.length;i++) {
				en = enemies[i];
				
				if( (en.maxSpeed >= 9.1 && en.maxSpeed <= 9.97)) { //centipede
					gameClasses.Centipede.routine(en,bullets,mBullets);
				} else {//end centipede
				
					if(slowLight && tabageos.GeometricMath.testForPointInCircle(this.player._pos, 104,en._pos)) {
						var origMaxp = en.maxSpeed+1-1;
						en.maxSpeed = .4;//
						en.easeTo(this.player._pos);
						en.maxSpeed = origMaxp+1-1;
					} else {
						en.easeTo(this.player._pos);//normal enemy
					}
				
					if(enSeparationThrott == 0) {
						en.separate(enemies);
					} 
				}
				
				if(en.separationDistance == 12.5) {//missile shooter enemy
					gameClasses.MissileShooter.routine(en,bullets,mBullets);
				} //end missle shooter
				
				en.boundingMethod(en,en._wallObject);//
				
				en.update(0,0,1);//no map collision
				en._canvasAnimation.x = en.x;
				en._canvasAnimation.y = en.y;
				en._canvasAnimation.currentAnimation = en._leftRightFace ? "right" : "left";
				en._canvasAnimation.animate(.5);
				en._canvasAnimation.blit();
				
				if(fireLight && tabageos.GeometricMath.testForPointInCircle(this.player._pos, 75, en._pos) && en.health < 9999) {
					exF.addExplosion(en.x,en.y,0,160,112,8,8,2);
					en.health -= 1;
					
					
				}
				
				//enemy health bar from sprite sheet
				if(en.health < 9999 && en.health > 0 && en.x > this.camera.v.x && en.y > this.camera.v.y && en.x < this.camera.v.x + this.camera.v.width && en.y < this.camera.v.y + this.camera.v.height) {
					this._helperRect.x = 144; this._helperRect.y =320;
					this._helperRect.height = 16; this._helperRect.width = (en.health/100)*16;
				
					this._helperPoint.x = en.x;
					this._helperPoint.y = en.y - 10 - en._canvasAnimation.fromHeightOffset;
				
					this.charLayer.copyPixels(this._image,this._helperRect,this._helperPoint);
				}
				if(en.health < 9999 && en.health > 0 && tabageos.GeometricMath.testForPointInCircle(en._pos,16,this.player._pos)) {//touching any enemy
					
					if(this.player.health > 0) {
						this.player.health -= Math.floor(3 - upgrader.getStamina());//stamina in multiples of  .2   max  2.8  14 possible ups to stam
					}
					healthBarer.style.width = Math.round(this.player.health / 9.8)+ "px";
					
					if( this.player.health <=0 ) {
						this.hideCustomHud();
						this.doGameOver(1); return;
					} 
					
				}
				if(en.health <= 0) { //if the enemy has no more health.
					if(en.x > this.camera.v.x && en.y > this.camera.v.y && en.x < this.camera.v.x + this.camera.v.width && en.y < this.camera.v.y + this.camera.v.height) {
						exF.addExplosion(en.x,en.y);//big explosion.
						this.playSound("explo");
						this.shake(51);
					}
					
					this.spawnCoins(en,en.bird * upgrader.getCoinMultiplier(), 90);
					enemies.splice(enemies.indexOf(en), 1);
					break;
				}
				
			}//end enemies
			
			if(this.controller.buttons.b && upgrader.getGrenades() > 0 && !grena) {//grenades
				this.controller.buttons.b = 0;
				grena = new gameClasses.RSGrenade( gun.shoot(-8,-8) );
				upgrader.setGrenades(upgrader.getGrenades()-1);//grenades -= 1;
				grenSpeed = 4000;
			}
			if(grena && grena.bullet._pathIndex < grena.bullet.path.length) {
				grena.bulletRoutine();
			} else if(grena) {
				grena.explosionRoutine(exF, enemies);
				grena = null;
			}
			
			var tileUnder;var obullet;
			var bulletSpeed = upgrader.getBulletSpeed();
			if(autoFire && bulletTime >= bulletSpeed) {//initial firing of bullets
				bulletTime = 0;
				bullet = gun.shoot(-8,-8);
				this.playSound("shot1");
				bullet.health = 100;
				bullet.maxForce = 20;bullet.maxSpeed = 10;
				mBullets.push(bullet);
				
				if(upgrader.haveForceField) {
					obullet = gun.shoot(-8,-8);
					obullet.health = 107;
					obullet.maxForce = 5;obullet.maxSpeed = 9;
					mBullets.push(obullet);	
				}
			}
			
			if(bulletTime < bulletSpeed) {
				bulletTime+= 33.3;
			}
			
			i = 0;//move bullets.
					var circLength = 0; var everyOther = 1;var fbull;var mbincer = upgrader.haveForceField ? 2 : 1;
					for(i; i < mBullets.length; i++) { 
						bullet = mBullets[i];
						//we are going to do some advanced bullet movements.
						//bullet._canvasAnimation.currentAnimation = bulletAnimation;
						bullet.strength = upgrader.getBaseStrength() + upgrader.getBulletStrength();
						
						//a bullet that will be part of the circle of bullets if player has force field
						if(bullet.health == 107 && upgrader.haveForceField && bullet.health != 12000 && bullet.health >= 100 && bullet.health != 700 && circLength < 21) {
							bullet.circleDistance = 10;
							bullet.separationDistance = 4;
							_hpt.x = this.player._pos.x + 5;
							_hpt.y = this.player._pos.y + 8;
							circLength += 1;
							bullet._canvasAnimation.currentAnimation = bulletAnimation;
							bullet.strength = upgrader.getBaseStrength() + upgrader.getBulletStrength();
							bullet.circle(_hpt);
						} 
						bullet.update(0,0,1);//we pass a 1 so that bullets do not do collision checks, as such the games performance increases a lot.
						bullet._canvasAnimation.x = bullet.x; bullet._canvasAnimation.y = bullet.y;
						if(bullet.health == 8.4 || bullet.health == 101) {
							bullet._canvasAnimation.animate();
						}
						bullet._canvasAnimation.blit();
						
						ei = 0; el = enemies.length;
						if(bullet.health >= 100) { //a player bullet
							for (ei; ei < el; ei++) {
								en = enemies[ei];
								//if this bullet has hit an enemy.
								if(bullet._pos.dist(en._pos) <= 15 && en.health < 9999 ) {
									en.health-=bullet.strength;ei = -999;//hurt the enemy.
									if(bullet.health == 101) {
										en.health -= 350;
									}
									en.hurt = 500;
									en._veloc.x = -(en._veloc.x*(bullet.strength+5));//knock back the enemy a bit
									en.update(0,0,1);
									exF.addExplosion(bullet.x,bullet.y,0,64,80,16,16,.5);//smoke explosion, total frames used will be 11 so define the start at a bit before.
									this.shake(bullet.strength);
									this.playSound("impact");
									tabageos.GeometricMath.splice(mBullets, mBullets.indexOf(bullet));
									gun.reclaimBullet(bullet);
									var ranfc; var cio;
									//enemy health at 0 taken care of in enemy loop above
									break;
								}
							}
							
							
							if(spawnAreaLeftHealth >= 1 && tabageos.GeometricMath.testForPointInCircle(spawnAreaLeft, 16, bullet._pos)) {
								exF.addExplosion(bullet.x,bullet.y,0,64,80,16,16,.5);
								spawnAreaLeftHealth -= bullet.strength;
								this.pixelType(spawnAreaLeft.x, spawnAreaLeft.y - 16, spawnAreaLeftHealth + "");
								this.playSound("impact");
								
								if(spawnAreaLeftHealth <= 0) {
									exF.addExplosion(bullet.x,bullet.y);//big explosion.
									this.playSound("explo");
									this.shake(51);
									this.display.copyPixels(this._image,new tabageos.Rectangle(544,192,16,16), new tabageos.MoverPoint(spawnAreaLeft.x, spawnAreaLeft.y - 16));
								}
								tabageos.GeometricMath.splice(mBullets, mBullets.indexOf(bullet));
								gun.reclaimBullet(bullet);
								
								break;
							}
							
							if(spawnAreaRightHealth >= 1 && tabageos.GeometricMath.testForPointInCircle(spawnAreaRight, 12, bullet._pos)) {
								exF.addExplosion(bullet.x,bullet.y,0,64,80,16,16,.5);
								spawnAreaRightHealth -= bullet.strength;
								this.pixelType(spawnAreaRight.x, spawnAreaRight.y - 16, spawnAreaRightHealth + "");
								this.playSound("impact");
								
								if(spawnAreaRightHealth <= 0) {
									exF.addExplosion(bullet.x,bullet.y);//big explosion.
									this.playSound("explo");
									this.shake(51);
									this.display.copyPixels(this._image,new tabageos.Rectangle(544,224,16,16), new tabageos.MoverPoint(spawnAreaRight.x, spawnAreaRight.y - 8));
								}
								
								tabageos.GeometricMath.splice(mBullets, mBullets.indexOf(bullet));
								gun.reclaimBullet(bullet);
								break;
							}
							
							
							
						} else { //an enemy bullet
						
							if(bullet._pos.dist(this.player._pos) <= 15) {
								this.player.health -= Math.floor(bullet.health - upgrader.getStamina());
								//this.player.hurt = 500;
								exF.addExplosion(bullet.x,bullet.y,0,64,80,16,16,.5);
								tabageos.GeometricMath.splice(mBullets, mBullets.indexOf(bullet));
								bullets.push( bullet );
								healthBarer.style.width = Math.round(this.player.health / 9.8)+ "px";
								if( this.player.health <=0 ) {
									this.hideCustomHud();
									this.doGameOver(1); 
									return;
								}
								ei = -999; break;
							}
						}
						if(ei == -999) break;
						
						//if the bullet hits the map, take it out of movingBullets.
						if(bullet.x < 1 || bullet.x > 1280 - 32 || bullet.y < 16 || bullet.y >  800-32 || bullet._pLeft || bullet._pRight || bullet._grounded || bullet._atCeiling) {
							if(bullet.health > 9000) { bullet.health = 100; bulletSeeking = 0;  }
							
							if(this.player.x + 608 >= bullet.x && bullet.x >= this.camera.v.x-16  &&  this.player.y + 168 >= bullet.y && bullet.y >= this.camera.v.y-16) {
								exF.addExplosion(bullet.x,bullet.y);  //only do explosion if it can be seen
								this.playSound("explo");
							}
							tabageos.GeometricMath.splice(mBullets, mBullets.indexOf(bullet));
							if(bullet.health >= 100) {
								gun.reclaimBullet( bullet );
							} else {
								bullets.push( bullet );//enemy bullet recycle
							}
							break;
						}
					}//end moving bullets
					
					
				this.player._canvasAnimation.x = Math.round(this.player.x);//player animation and drawing
				this.player._canvasAnimation.y = Math.round(this.player.y); 
				if(gr < -90 || gr > 90) {//face the way the gun faces, left or right
					this.player._canvasAnimation.changeLeftRightUpDownAnimation(1,0,0,0);
				} else {
					this.player._canvasAnimation.changeLeftRightUpDownAnimation(0,1,0,0);
				}
				if(!cb.a && !cb.b && !cb.c && !cb.d && !cb.up && !cb.down && !cb.left && !cb.right) {
					this.player._canvasAnimation.currentAnimation = ((gr < -90 || gr > 90) ? "left" : "right") + "idle";
				}
				
				this.player._canvasAnimation.animate(.5);
				//draw the player   
				if(this.player.hurt > 0) { this.player.hurt -= 33.3;
					//shake the player animation a bit when hurt
					if(_hAlt == 1) {
						 _hAlt = -1;
					} else { _hAlt += 1; }
					this.player._canvasAnimation.x += _hAlt;
				} else { this.player.hurt = 0;
					this.player._canvasAnimation.x = Math.round(this.player.x);
				}
				this.player._canvasAnimation.blit();
			
				exF.displayExplosions(this.charLayer, this._image);
				
				pmp.x = gun.x - 32; pmp.y = gun.y - 32;//offset the drawing of the rotation
				gun.blit(0,0, pmp);
				
				
				if(!this.device) {
					pmp.x = this.mousePoint.x +24;
					pmp.y = this.mousePoint.y +24;
					
				} else {
					pmp.x = gun.x + (Math.cos(Math.PI * (gr/180)) * 80) + 8;
					pmp.y = gun.y + (Math.sin(Math.PI * (gr/180)) * 80) + 8;
				}
				this.charLayer.copyPixels(this._image, crosshairRect, pmp);//crosshair
				
				
				//upgrades
				upgrader.determineUpgrades();
				
				var lightToShow = slowLight ? slowLightFromRect : lightFromRect;
				
				if(fireLight) { 
					this.animateLights(fireLightAnimation, this.player.x + 8 -  (173/2) - this.camera.v.x, this.player.y + 8 - (193/2) - this.camera.v.y, .5); 
					this.readyAdditionalLights(lightToShow,this.player.x + 8 -  (208/2) - this.camera.v.x, this.player.y + 8 - (192/2) - this.camera.v.y);
				} else {
					this.readyLights(lightToShow,this.player.x + 8 -  (208/2) - this.camera.v.x, this.player.y + 8 - (192/2) - this.camera.v.y);
				}
				
				if(showStats) {
					upgrader.showStats();
				}
				
				if(instruc > 0) { instruc -= this.device ? 16.65 : 33.3;
					this.pixelDialogBox( this.device ? "Use rotation circle to aim. use the arrows to move. B to throw grenades. To calibrate rotation. hold start then tap. the middle of the circle." : "Use wasd to move. Mouse to aim. Shift to start and pause. z to throw grenades",this.camera.v.x + 24, this.camera.v.y + 24, this.camera.v.x + 24 + 4, this.camera.v.y + 24 + 4,9);
				}
				
				if(grenadeInfo >= 1 && grenadeInfo < 500) {
					grenadeInfo += 33.3;
					if(grenadeInfo >= 500) {
						this.levelComplete(this.showGrenadeInfo);
						return;	
					}
				}
				
				timeCount = window.performance.now();
				gameTime = Math.floor((timeCount - now)/1000);
				var hours = Math.floor(gameTime/3600);
				var mins = hours >= 1 ? Math.floor( (gameTime - (hours*3600)) / 60) : Math.floor(gameTime/60);
				var secs = mins >= 1 ? gameTime-(mins*60) : gameTime;
				timedisplay.innerText = secs+" : "+mins+" : "+hours;
				
				
				if( spawnAreaLeftHealth <= 0 && spawnAreaRightHealth <= 0 ) {
					this.hideCustomHud();
					this.doGameOver(2);//victory
					return;
				}
				
				
		};
	}
	
	let fperformance = document.createElement("div");
	fperformance.setAttribute("title", "Use a web worker for faster performance, or just regular requestAnimationFrame");
	fperformance.setAttribute("style","width:100%;text-align:center;position:absolute;top:30%;font-size:large;cursor:pointer");
	
	function allBegin(e) {
		if(e && e.target && e.target.id && e.target.id == "sa") {
			useWorkers = false;
		}
		window.setTimeout( function() {
			document.getElementById("phld").setAttribute("style", "display:none");
			fperformance.removeEventListener("click", allBegin);
			document.body.removeChild(fperformance);
			new Shooter();
		}, 500);
	};
	fperformance.innerHTML = "please select:  <span id='fp'> faster performance </span>   -or-   <span id='sa'> smoother animation </span>";
	fperformance.addEventListener("click", allBegin);
	document.body.appendChild(fperformance);
	
	
})();