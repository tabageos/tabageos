import * as tabageos from './tabageos.js';

class BasicActionPlatformerGame extends tabageos.GameSkeleton {
	
	constructor(gameWidth,gameHeight,camerasWidth,camerasHeight,containerDivId, rootDivId, controllerDivId, tileset, tileWidth, tileHeight, 
				titleImageFromRect, optionsImageFromRect, creditsImageFromRect, backgroundImageFromRect, 
				startLocationRect, optionsLocationRect, creditsLocationRect, mapsObject, playerDefinitionObject, enemyDefinitionObject, npcDefinitionObject,
				secondaryAttackMethod, arrayOfCreditStrings, addedSetupMethod, addedLevelSetupMethod, loadbarColor,loadbarCSS, soundDefinitionObject, bAlpha, establishWorkers) {
					
		if( tileset && tileset !== "streamline" ) { //preloading
			let ddiv = document.createElement("div");ddiv.setAttribute("id","gmeloader1");
			let barleft = "calc(50% - 50px)";
			let bartop = (gameHeight/2) - 4; loadbarColor = loadbarColor || "#f8dfa6";
			ddiv.setAttribute("style", loadbarCSS || "position:absolute;left:"+barleft+";top:"+bartop+"px;height:8px;width:1px;background:"+(loadbarColor)+";border: thin solid #aaa399");
			window.document.body.appendChild(ddiv);
			
			tabageos.GameSkeleton.assignPreloadMethod(function(e) { //this method actually only really pre-loads when setting up a GameSkeleton with e6 classes, otherwise its not true preloading. the preloading built in with loadSpriteSheetAndStart works for es5 or 6.
				var ld = document.getElementById("gmeloader1");
				if(ld) {
					ld.style.width = (e.totalLoaded * 100) + "px";
					if(e.totalLoaded * 100 >= 100) {
						window.setTimeout( function(e) { var ldi = window.document.getElementById("gmeloader1");
							if(ldi) window.document.body.removeChild(ldi);
						}, 500);
					}
				}
			});
		}
		super();//GameSkeleton, "this" is now available
		this.mapDefinitions = mapsObject || new tabageos.MapDefinitionObject();
		this.playerDefinition = playerDefinitionObject || new tabageos.PlayerDefinitionObject();
		this.enemyDefinitions = enemyDefinitionObject || new tabageos.EnemyDefinitionObject();
		this.npcDefinitions = npcDefinitionObject || new tabageos.NPCDefinitionObject();
		camerasWidth = camerasWidth || this.mapDefinitions._defaultCameraWidth;
		camerasHeight = camerasHeight || this.mapDefinitions._defaultCameraHeight;
		gameWidth = gameWidth || this.mapDefinitions._defaultGameWidth;
		gameHeight = gameHeight || this.mapDefinitions._defaultGameHeight;
		
		let cFollowOffsetX = (camerasWidth != gameWidth) ? -(camerasWidth/2) : 0;
		let cFollowOffsetY = (camerasHeight != gameHeight) ? ( -( (camerasHeight/2) + (tileWidth*2) ) ) : 0;
		if((!tileset || tileset === null) && this.playerDefinition && this.playerDefinition._defaultSpriteSheet) {
			tileset = this.playerDefinition._defaultSpriteSheet;
			if(this.enemyDefinitions && this.enemyDefinitions.addDefault) {
				this.enemyDefinitions.addDefault(1);
				this.enemyDefinitions.addDefault(2);
				this.enemyDefinitions.addDefault(3);
			}
		}
		startLocationRect = startLocationRect || this.mapDefinitions._defaultStartButtonLocation || new tabageos.Rectangle(80,96,96,32);
		let stmp = startLocationRect ? new tabageos.MoverPoint(startLocationRect.x, startLocationRect.y) : new tabageos.MoverPoint(this.mapDefinitions._defaultStartButtonLocation.x, this.mapDefinitions._defaultStartButtonLocation.y);//new tabageos.MoverPoint(80,96);
		let gameSpecs = {
			gWidth:gameWidth || this.mapDefinitions._defaultGameWidth, gHeight:gameHeight || this.mapDefinitions._defaultGameHeight,
			cameraWidth:camerasWidth || this.mapDefinitions._defaultCameraWidth, cameraHeight:camerasHeight || this.mapDefinitions._defaultCameraHeight, 
            cameraFollowOffsetX:cFollowOffsetX, cameraFollowOffsetY:cFollowOffsetY, tileW:tileWidth || 16, tileH:tileHeight || 16, 
            spriteSheetImage:tileset, containerDivId:containerDivId || 'container', rootDivId:rootDivId || 'root',
            controllerDivId:controllerDivId || 'controller', gameScale:1, hudScale:3, useScreenOrganizer:true,startWidth:(startLocationRect ? startLocationRect.width : this.mapDefinitions._defaultStartButtonLocation.width), startHeight:(startLocationRect ? startLocationRect.height : this.mapDefinitions._defaultStartButtonLocation.height),
            controllerHeight:144, initialLives:3, initPlayerPosition:new tabageos.MoverPoint( this.playerDefinition.x || 96, this.playerDefinition.y || (gameHeight-(tileHeight*2)) ), startLocations:stmp,
            gameLoop:this.loop,initializationSpecifics:this.setup, disableBackgroundAlpha: (bAlpha === 0 ? 0 : 1),
            addedResizeMethod:null, priorToSceneChange:this.initialSceneChanges, sceneChangeSpecifics:this.setupLevel,sceneResetSpecifics:null,fullResetSpecifics:this.onFullReset, additionalSceneResetSpecifics:null, 
            positionResetSpecifics:null, underCoverSpecifics:this.underCoverChanges, cameraType:1,afterSceneChange:this.afterSceneChanges, 
			preloadSounds: [], preloadMusic: []
		
		};
		//defining properties of BasicActionPlatformerGame class.
		
		this.optionsRectangle = optionsImageFromRect || this.mapDefinitions._defaultOptionsImageRect;
		if(!this.optionsRectangle) {  this.optionsRectangle  = new tabageos.Rectangle(1808,544,256,208); }
		this.creditsRectanlge = creditsImageFromRect || this.mapDefinitions._defaultCreditsImageRect; 
		if(!this.creditsRectanlge) { this.creditsRectanlge =  new tabageos.Rectangle(2112,544,256,208); }
		this.optionsButtonLocationRect = optionsLocationRect || this.mapDefinitions._defaultOptionsButtonLocation;
		this.creditsButtonLocationRect = creditsLocationRect || this.mapDefinitions._defaultCreditsButtonLocation;
		this.titleRectangle = titleImageFromRect || this.mapDefinitions._defaultTitleImageRect;
		this.backgroundRectangle = backgroundImageFromRect || this.mapDefinitions._defaultBackgroundRect;
		
		
		
		this.transValues = this.mapDefinitions.walkPastValues || [];
		this.foreValues = this.mapDefinitions.foregroundValues || [];
		this.attackStrength = this.playerDefinition ? (this.playerDefinition.attackStrength || 3) : 3;
		this.enemies = [];
		this.scenery = [];
		this.npcs = [];
		this.foregroundObjects = [];
		this.explosionFactory = new tabageos.ExplosionFactory(32,32,9,400,0);
		this.secondaryExtra = secondaryAttackMethod || null;
		this.addToSetup = addedSetupMethod || null;
		this.addToLevelSetup = addedLevelSetupMethod || null;
		this.gameOverRect = null;
		this.gameOverVictoryRect = null;
		if(this.mapDefinitions.gameOverRectangle) {
			this.gameOverRect = this.mapDefinitions.gameOverRectangle;
		}
		if(this.mapDefinitions.gameOverVictoryRectangle) {
			this.gameOverVictoryRect = this.mapDefinitions.gameOverVictoryRectangle;
		}
		
		var pd = this.playerDefinition || {};
		
		this.heartsValue = pd.heartValue || [12,17];
		this.powerUpsValue = pd.powerUpValue || [1,14];
		
		this.baseHUDImage = pd.baseHudImage || "data:image/png;base64,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";
		this.basePowerBarImage = pd.basePowerBarImage || "data:image/png;base64,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";
		this.baseHealthBarImage = pd.baseHealthBarImage || "data:image/png;base64,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";
		this.bustImage = "data:image/png;base64,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";
		
		this.healthBarSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAADCAYAAADV7IyEAAAABmJLR0QA1gBvADSdyUkuAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH6QIXByg7o4iNpwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABYSURBVCjPY/Th4/7PwMDAwMvMxIAOPv/9x/Dlzx8GBgYGBh4WFrg4utrPf/9h1Y/NPGrrJ6iLh4UFxfHYALKBMEtwqUNWy8PJSbF+wt7GETv4QohcQI5+AJHDIBYYuhVjAAAAAElFTkSuQmCC";
		this.coinImageSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAQCAYAAADpunr5AAAABmJLR0QAOgAEACAutZNMAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH6QQBCzIBJoGqSQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAEvSURBVFjD7Zc9DoJAEIVHobfwJ7YmVBbb2xkTjkBpxWE4BZWNdzAxdrbGwsrE1gAWHsCs1SLKAjsDEWPmJRRs9puZN5OFLACLxWKxWCwWi/U7GoyFVE8bvIpR10NbvKl/uwiOT176PpyCTK7HDiZ5HT4bg8K2zWP820Xwfb9N1yiFKL43WwDVPADAOeyD4wtSE7MesPnPYZ/sHZO/W9V8FSg+eUZH8nP6ygT2ONcZoFITLHaIWP9d06lhCtENkKp/YMti5QZw2UXajUXrVXsPwRrFZlWHxdasYw/BuhG2rI63ASTXY8ddWTngsovAXVlg8h1UMbIyZXXNm8xH5CY2wWKHiPVv6wMIuYGokQZSlNawfIDj34DyA3zVYJHyO76QmyXNe74H+Br4HvCle8ATYn8N83dl2y4AAAAASUVORK5CYII=";
		this.coinImage = new Image();
		this.coinImage.src = this.coinImageSrc;
		this.coinValue = pd.coinValue || [77,77];
		this.coinsCollected = 0;
		
		this.healthBarImage = new Image();
		this.healthBarImage.src = this.healthBarSrc;
		this.wholeHudStyle = "";//css string
		this.hudStyle = null;//actual style css element
		this.healthBarDisplayDiv = null;
		this.powerBarDisplayDiv = null;
		this.bustDisplayDiv = null;
		
		this.initialHealthLevel = this.playerDefinition ? (this.playerDefinition.healthAmount || 500) : 500;
		
		this.initialPowerLevel = this.playerDefinition ? (this.playerDefinition.powerAmount || 300) : 300;
		
		this.secondaryPowerLevel = this.playerDefinition ? (this.playerDefinition.powerAmount || 300) : 300;
		this.secondaryPowerDrainAmount = this.playerDefinition ? (this.playerDefinition.powerDrainAmount || 10) : 10;
		
		this.powerBarPercent = 5.454;
		this.healthBarPercent = 8.064;
		
		this.powerBarPercent = (this.secondaryPowerLevel / (pd.powerBarWidth || 55));
		
		this.healthBarPercent = (this.initialHealthLevel / (pd.healthBarWidth || 62));
		
		this.creditsArray = arrayOfCreditStrings || ["made with Tads Basic Game Objects", "art by Grafx Kid"];
		
		this.attackExplosion = pd.attackExplosion || null;
		this.attackWithExplosion = 0;
		this.projectileExplosion = pd.projectileExplosion || null;
		
		this.gameDifficulty = 1;
		this.showingOptions = 0;
		this._hudEstablished = 0;
		
		this.playerProjectiles = [];
		this.enemyProjectiles = [];//not used
		this.movingProjectiles = [];
		
		this.__holdingC = 0;//holding the controller button c signifier, for only being able to shoot one projectile at a time.
		
		this.heldScenery = [];
		this.canHold = pd.itemValuesToHold || [];
		
		this._memory = { entries:[] };
		
		this._doorUnits = [];
		this.lightsReady = 0;
		this.lightsFrom = null;
		this.lightsTileValues = [];
		this.lightsCanvasAnimation = null;
		this.__lightsInit = 0;//two underscroes mean the property is wanting to be completely private, you should not change it, it also propably is not documented.
		
		this.basicPlatformer = 0;
		this.playerAnimationChangeBypass = 0;//either set this to some millisecond time, or call animateThePlayer passing a time, to bypass the default change of animation behavior.
		//by default the player is assumed to be a WeaponHoldingAttacker and various animation calculations are automatically done based on if it is attacking or not.
		//to change the players animation yourself, do so then either set this or call animateThePlayer with a time, the animation changed to is still automatically animated and displayed.
		this.throwCheck = function() { return false; };//never throw
        this.pickUpCheck = function() { return true; };//always pick up by just walking past it, alternately you could use the methods from the SceneryThrower class
		//but by default to store things picked up you pass those values as itemValuesToHold in the json def for the player.
		this.pTypeString = "";
		this.pTypeTime = 0;
		this.pTypeMP = new tabageos.MoverPoint();
		this.currentNpcTalking = null;
		this.npcTypeTime = 0;
		this.bossblit = null;
		this.newestMap = null;
		
		this.__genMaps = {};//level1, level2, level3, etc... used during level generation
		
		this.dialogBoxFromRectangle = null;
		this.lastMinutePlayerPosition = null;
		this.gameOverPosition = null;
		this.difficultyButtonsLocationRect = null;
		if(this.mapDefinitions.difficultyButtonsLocationRect) {
			this.difficultyButtonsLocationRect = this.mapDefinitions.difficultyButtonsLocationRect;
		}
		
		if (this.npcDefinitions && this.npcDefinitions.dialogBoxFromRectangle)  {
			this.dialogBoxFromRectangle = this.npcDefinitions.dialogBoxFromRectangle;
		}
		
		let usedSoundNames = ["coinCollect", "playerHurt", "playerJump", "playerAttack", "playerAttackTwo", 
			"playerPickup", "enemyHurt", "enemyAttack", "bossHurt", "bossAttack", "bossAttackTwo", "dialog"]; //these are the names/properties recognized off of any given SoundDefinitionObject which can be that class or just an object with these properties.
		
		this.coinCollectSound = "coinCollect";
		this.lastTrack = "";
		this.stringProp = new RegExp(/[\{]{1}[a-zA-Z_\.]{1,}[\}]{1}/);
		
		gameSpecs.preloadSoundsArray = [];
		gameSpecs.preloadMusicArray = [];
		if( soundDefinitionObject ) { 
			
		
			for ( var soundString in soundDefinitionObject ) {
				
				for ( var sn of usedSoundNames ) { //this.coinCollectSound , and all in usedSoundNames with 'Sound' added
					if ( soundString === sn && soundDefinitionObject[soundString] ) {
						if(soundDefinitionObject[soundString].indexOf('base64') != -1) {
							this[sn+"Sound"] = soundDefinitionObject[soundString];
						} else {
							this[sn+"Sound"] = soundDefinitionObject[soundString].split(".")[0];
						}
					}
				}
				
				if(soundString.indexOf("level") == -1 && soundDefinitionObject[soundString] && soundDefinitionObject[soundString].indexOf('base64') == -1) {
					gameSpecs.preloadSoundsArray.push(soundDefinitionObject[soundString]);
				} else if(soundString.indexOf("level") != -1 && soundDefinitionObject[soundString] && soundDefinitionObject[soundString].indexOf('base64') == -1) {
					var lvnum = soundString.replace(/[a-zA-Z/-/_]{1,}/g,"");
					this["level"+lvnum+"Track"] = soundDefinitionObject[soundString].split(".")[0];
					
					gameSpecs.preloadMusicArray.push(soundDefinitionObject[soundString]);
				}
				
				
			}
		} else {
			//no sound definition
			
		}
		
		
		
		if(!establishWorkers) {
			this.dontEstablishWorkers();//workers are useful if the game is going to primarely be a phone app, dont establish workers if there are other workers on the page other than the games.
		}
		this.initialConstruction(gameSpecs);//manual super, actual completion of construction, ultimately GameSkeleton.establish 
	}
	
	
	establishHUD(x,y, w, h, hbw, hbh, pbw, pbh, hbx, hby, pbx, pby, bw, bh) {
		
		if(!this.hudStyle) {
			this.hudStyle = document.createElement("style");
		} else {
			this.removeCustomHudParts();
			document.getElementsByTagName("head")[0].removeChild(this.hudStyle);
		}
		
		this.hudStyle.innerHTML = "#basehud { position:absolute;top:"+(y||0)+"px;left:"+(x||0)+"px;image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;image-rendering: pixelated;image-rendering: crisp-edges;width:"+(w||96)+"px;height:"+(h||32)+"px;background: no-repeat url( "+ this.baseHUDImage + ") }";
		
		var hbwcalc = Math.floor(this.player.health / this.healthBarPercent);
		
		var healthStyle = "position:absolute;left:"+(hbx ? hbx : 32)+"px;top:"+(hby ? hby : 21)+"px;image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;image-rendering: pixelated;image-rendering: crisp-edges;width:"+(hbwcalc)+"px;height:"+hbh+"px;background: no-repeat url( "+ this.baseHealthBarImage + ")";
		
		var customBust = (this.playerDefinition && this.playerDefinition.hudBustImage) ? this.playerDefinition.hudBustImage : this.bustImage;
		
		var bustStyle = "position:absolute;left:0px;top:0px;image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;image-rendering: pixelated;image-rendering: crisp-edges;width:"+(bw||32)+"px;height:"+(bh||32)+"px;background: no-repeat url( "+ customBust + ")";
		
		this.hudStyle.innerHTML += "#healthbar {  "+ healthStyle +" } ";
		
		var pbwcalc = Math.floor(this.secondaryPowerLevel / this.powerBarPercent);
		
		var powerStyle = "position:absolute;left:"+(pbx ? pbx : 32)+"px;top:"+(pby ? pby : 27)+"px;image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;image-rendering: pixelated;image-rendering: crisp-edges;width:"+(pbwcalc)+"px;height:"+pbh+"px;background: no-repeat url( "+ this.basePowerBarImage + ")";
		
		this.hudStyle.innerHTML += "#powerbar { "+powerStyle+"  } ";
		
		this.hudStyle.innerHTML += "#bust {" + bustStyle + "}";
		
		document.getElementsByTagName("head")[0].appendChild(this.hudStyle);
		
		this.wholeHudStyle = "position:absolute;top:"+(y||0)+"px;left:"+(x||0)+"px;height:"+(h||32)+"px; width:"+(w||96)+"px;";
		
		this.setupCustomHealthHud("basehud");
		this.addToCustomHud("healthbar", healthStyle);
		this.addToCustomHud("powerbar", powerStyle);
		this.addToCustomHud("bust", bustStyle);
		this.healthBarDisplayDiv = this.getCustomHudPart(1);
		this.powerBarDisplayDiv = this.getCustomHudPart(2);
		this.bustDisplayDiv = this.getCustomHudPart(3);
		this.hideCustomHud();
		
		this._hudEstablished = 1;
	};
	
	hideTheHud(maintainHiddenDuringLoop) {
		this.hideCustomHud(); //changes healthBarIsDisplayed to 0, among other things to hide the hud, the hud is css and html on top of everything.
		this.healthBarIsDisplayed = maintainHiddenDuringLoop || 0;//during the loop if healthBarIsDisplayed is 0 the hud gets shown again by default.
		//GameSkeleton methods to show/hide the hud assume it is happening during setup, or outside of the game loop.
		//if what we want is to hide the hud on demand, we need to pass 1 to this method.
	};
	
	establishLights() {
		
		this.lightsReady = 0;
		if(!this.lightsCanvasAnimation) {
			this.lightsCanvasAnimation = new tabageos.CanvasAnimation(this._image, this.charLayer,null,0,0,this.mapDefinitions.lightAnimationWidth || this.tileWidth,this.mapDefinitions.lightAnimationHeight || this.tileHeight);
		}
		
		if(this.mapDefinitions && this.mapDefinitions.lightValues) {//initalize lights
				let lightsToBeOn = 0;
				for (let lval of this.mapDefinitions.lightValues) {
					let lftv = lval[0];
					let lightp = lval[1];
					let lwi = lval[2];
					let lhi = lval[3];
					let ldim = lval[4] || 1;
					let lcolor = lval[5] || "#000000";
					let lcomp = lval[6] || 1;
					
					//testing if it is in the map at all, and we also potentially need that location if an animation has been passed
					let lightPos = tabageos.BlitMath.getLocationOfTile(lftv, this.sceneChanger.currentMap, this.tileWidth,this.tileHeight);
					
					if ( lightPos ) {
						if(!this.__lightsInit) {this.__lightsInit = 1;
							this.initializeLights(ldim, lcolor, lcomp);
						}
						lightsToBeOn = 1;
						//this._lightComp = 'multiply';
						this.lightsReady = 0;
						this.lightsTileValues.push(  lftv );
						if (lightp.length > 2) {
							let lcanv = new tabageos.CanvasAnimation(this._image, this._lightCanvas, null,lightPos.x,lightPos.y, lwi, lhi);
							lcanv.animationSpecs = { "anim":[0, lightp] };
							lcanv.currentAnimation = "anim";
							this.lightsFrom = lcanv;
							this.lightsReady = -2;
						} else {
							this.lightsFrom = new tabageos.Rectangle(lightp[0], lightp[1], lwi, lhi);
							this.lightsReady = -1;
						} 
						
						
					}
					
				}
				
				if(!lightsToBeOn) {
					this.turnOffLights();
				}
				
		}
		
		
	};
	
	onFullReset() {
		
		this.heldScenery = [];
		this._memory = { entries:[] }; //or from saved, load happens during setup.
		this.foregroundObjects = [];
		this._doorUnits = [];
		this.__lightsInit = 0;
		this.lightsReady = -1;
		this.pTypeTime = 0;
		this.npcTypeTime = 0;
		this.lives = 3;
		this.bossblit = null;
		this.newestMap = null;
		this.playerProjectiles = [];
		this.lightsTileValues = [];
		this.lightsCanvasAnimation = null;
		this.sceneChanger.clearAllArrays();this.bossblit = null;
		this.enemies = [];this.foregroundObjects = [];this.movingProjectiles = [];this.scenery = [];
		this.removeStandardButtons();
		
	};
	
	saveGame() {
		
		let datasv = ""+this.sceneChanger.currentScene+","+this.player.x+","+this.player.y+","+this.coinsCollected+","+this.attackStrength+"ainit7";
		
		for ( var entry of this._memory.entries ) {
			datasv += "e.:"+entry[0]+","+entry[1]+","+(entry[2] || 0);
		}
		datasv += ":.half.:";
		for ( var scenery of this.heldScenery ) {
			datasv += "hs.:"+scenery[0]+","+scenery[1];
		}
		
		this.localSave(this.playerDefinition.saveGameName || "bapGameSave", datasv);
		
		
	};
	
	
	loadSavedGame() {
		
		let dt = this.getLocalSaved(this.playerDefinition.saveGameName || "bapGameSave");
		let lpp = null;
		if(dt) {
			
			var init = dt.split("ainit7");
			lpp =  init[0].split(",");
			
			var hlf = init[1].split(":.half.:");
			var ents = hlf[0] ? hlf[0].split("e.:") : "";
			var scen = hlf[1] ? hlf[1].split("hs.:") : "";
			
			if( ents.length ) {
				for ( var en of ents ) {
					var aen = en.split(",");
					//memory only stores numbers, but saved data is one long string
					for ( var ma of aen ) { aen[aen.indexOf(ma)] = Number(ma); }
					this._memory.entries.push(aen);
				}
			}
			if( scen.length ) {
				for( var s of scen ) {
					if(s.indexOf(",") != -1) {
						var ao = s.split(",");
						var aos = [ Number(ao[0]), Number(ao[1] || 0) ];
						this.heldScenery.push(aos);
					}
				}
			}
			
			
		}
		return lpp; //[level, player x, player y, coinsCollected, attackStrength]
		
	};
	
	setup() { //before title screen is shown, inital whole game setup
		
		this.camera.v.width = this.cameraWidth+1-1;
        this.camera.v.height = this.cameraHeight+1-1;
		
		//assuming bigger world much smaller camera space, if the camera width is half game width and camera height half game height
		//then these tweenLimits do not have to be manually set, by default GameSkeleton assumes half width and height, but BasicActionPlatformerGame assumes a longer gameWidth and taller height
		//therefore this formula is used within the assumtption the game is a standard platformer style with bigger world to the camera
		//for best performance the game width and height should not exceed 1500 ~ 2000. 
		//3k with lights and foreground and enemies is pushing things. 
		//This example shows every advanced feature and will run fast and smooth everywhere, without workers, utlizing a minimal space, but yet it still feel like a lot because of how the camera behaves
        this.tweenLimitX = this.gameWidth - this.cameraWidth;//1024 - 256
        this.tweenLimitY = this.gameHeight - this.cameraHeight;//416 - 208
		
		this.title.floor.copyPixels(this._image, this.titleRectangle, new tabageos.MoverPoint());
        this.startButton.innerHTML = "";//assume no html being used for the title screen and other screens, all screens are drawn from the sprite sheet.
		this.gameOverContainer.floor.copyPixels(this._image, this.gameOverRect || new tabageos.Rectangle(2416,544,256,208), new tabageos.MoverPoint());
		
		let pd = this.playerDefinition;
        
		let playerCA = new tabageos.CanvasAnimation(this._image,this.charLayer,null,0,0,pd.aniWidth,pd.aniHeight);
		playerCA.fromWidthOffset = pd.aniFromWidthOffset || 0;
		playerCA.fromHeightOffset = pd.aniFromHeightOffset || 0;
		playerCA.fromXOffset = pd.aniFromXOffset || 0;
		playerCA.fromYOffset = pd.aniFromYOffset || 0;
		playerCA.animationSpecs = pd.animationSpecs;
		
		playerCA.currentAnimation = "right";
		playerCA.animate();
		
		this.attackStrength = pd.attackStrength || 3;
		
		tabageos.BlitMath._specs = new tabageos.BlitSpecs(this.tileWidth,this.tileHeight);//all BlitMath calls go off these specs as the base tile width and height
		
		let md = this.mapDefinitions;
		let lvToSetup = 1;
		let levelsAdded = 0;
		let ldarr = this.loadSavedGame();//potentially populates heldScenery, and populates _memory.entries
		if(ldarr) {  //[level, player.x, player.y, coins]
			lvToSetup = Number(ldarr[0]);
			if(ldarr[4]) {
				this.attackStrength = Number(ldarr[4]);
			}
			//this.coinsCollected = Number(ldarr[3] || 0);
			//coins respawn even after save, you could check for amount of coins per level and if less than what has been saved remove them up to the level saved.
			//as is the class saves how many coins were picked up but that data is not used, on full exit the browser and come back the player would have to collect coins again.
		}
		
		
		
			for ( var map in md ) { 
				if(map.indexOf('background') == -1 && map.indexOf('level') != -1)  {
					if( md[map] && (md[map][0] || md[map][0] === 0) && (md[map][0][0] || md[map][0][0] === 0) )  { 
					
						var levelOfMap = Number(map.match(/[0-9]{1}/)[0]);
						if(ldarr && levelOfMap <= lvToSetup) {
							for ( var hsce of this.heldScenery ) { //take away scenery that has already been picked up, designated by the save state.
								md[map] = tabageos.BlitMath.replaceAllOfValueFromMultiArray(md[map], hsce, 0, 0);
							}
						}
						this.sceneChanger.addScene(md[map]); levelsAdded+=1;
					}
				}
			}
		
		if(md.generate > 0) { //auto genration of a very basic level with floor and random horizontal upper floor
		//to variate it define walls ground or platforms as functions in the json that would put different tiles based on what position it is.
			let lGen = md.generate +1-1;
			
			while ( lGen > 0 ) {
				
				levelsAdded += 1;
				if(this.__genMaps["level"+levelsAdded]) { //for game over or reset to title keep same generated maps
					this.sceneChanger.addScene(this.__genMaps["level"+levelsAdded]);
				} else {
					let acols = (this.gameWidth/this.tileWidth)-1;
					let arows = (this.gameHeight/this.tileHeight) -1;
					let level = levelsAdded+1-1;
					
					let walls = function(x,y) {//this method is used by GeometricMath.create2DMap to get what tile to place at each tile spot in the map.
						
						let tl = [0,0];
						if(md.methodForEveryTile) {
							tl = md.methodForEveryTile(x,y,level);
						}
						
						if(x == 0 || x == acols) { //make a left and right wall
							if(typeof md.walls == 'function') {
								tl = md.walls(x,y, level);
							} else {
								tl = md.walls;
							}
						}
						if(y == arows) {//the ground on the very bottom
							if(typeof md.ground == 'function') {
								tl = md.ground(x,y, level);
							} else {
								tl = md.ground;
							}
						}
						return tl;
					};
					
					//blank map with left and right walls and bottom ground, walls could also just be a value, and then all the tiles would be that value.
					let newMap = tabageos.GeometricMath.create2DMap(this.gameWidth/this.tileWidth, this.gameHeight/this.tileHeight, walls, level);
					
					//random ground path horizontal
					let ipath = tabageos.GeometricMath.createRandomIndexPath(this.gameWidth/this.tileWidth, 5,1, (this.gameWidth/this.tileWidth) - 2);
					
					//push the path down to the bottom using rowOffset
					//these methods are primarely used in a top down sense, but we are using them for horizontal ground in this case
					tabageos.GeometricMath.applyIndexPathToMap(ipath, newMap, md.platforms, (this.gameHeight/this.tileHeight) -(md.platformsIndexAboveGround || 10) , level );
					
					
					//apply bushes just above the path, as the tiles above the path, the value(s) for bushes should be in the walkPastValues also
					tabageos.GeometricMath.applyIndexPathToMap(ipath, newMap, md.bushes, (this.gameHeight/this.tileHeight) -(md.platformsIndexAboveGround || 10) - 1 , level );
					
					if(md.afterGenerate) {

						this.newestMap = tabageos.BlitMath.cloneMultiArray(newMap);
						tabageos.GeometricMath.populate2DMap(newMap, md.afterGenerate, level);
						
					}
					
					this.sceneChanger.addScene(newMap);
					this.__genMaps["level"+levelsAdded] = tabageos.BlitMath.cloneMultiArray(newMap);
					this.newestMap = null;
				}
				lGen -= 1;
			}
			
			//todo  generate md.generate amount of maps, planned for 1.7 , auto generation of levels if no level maps given.
			//fill with wall, using the new path methods of GeometricMath
			//non enclosed path of transparent left to right up higher
			//and another lower or crossing
			
			
		}
		
		
		this.sceneChanger.changeCurrentMap(lvToSetup);
		
		this.sceneChanger.currentScene = lvToSetup;
		
		//functionAssignments to place enemies and foreground
		var j2vals = [];
		for ( var v of this.foreValues ) {
			
			var v2 = [v[0],v[1]];
			j2vals.push(v2);
			
		}
		
		tabageos.BlitMath.functionAssignments = tabageos.BlitMath.cloneMultiArray(j2vals);
		
		
		//dont draw these during patterBlit and the other draw methods
		tabageos.BlitMath.ignoredArrays = tabageos.BlitMath.cloneMultiArray(j2vals);
		
		for ( var eo of Object.values(this.enemyDefinitions) ) {
			if(eo && eo.tileValue) {
				tabageos.BlitMath.functionAssignments.push(eo.tileValue);
				tabageos.BlitMath.ignoredArrays.push(eo.tileValue);
			}
		}
		
		for ( var npco of Object.values(this.npcDefinitions) ) {
			if(npco && npco.tileValue) {
				tabageos.BlitMath.functionAssignments.push(npco.tileValue);
				tabageos.BlitMath.ignoredArrays.push(npco.tileValue);
			}
		}
		
		for ( var holdable of this.canHold ) { 
			if( (holdable[0] || holdable[1])
				&& !this.valuesMatch(this.coinValue, holdable)	
				&& !this.valuesMatch(this.heartsValue, holdable)
				&& !this.valuesMatch(this.powerUpsValue, holdable) ) {
					
				tabageos.BlitMath.functionAssignments.push(holdable);
				tabageos.BlitMath.ignoredArrays.push(holdable);
			}
		}
		
		tabageos.BlitMath.functionAssignments.push(this.coinValue);
		tabageos.BlitMath.ignoredArrays.push(this.coinValue);
		
		tabageos.BlitMath.functionAssignments.push(this.heartsValue);
		tabageos.BlitMath.ignoredArrays.push(this.heartsValue);
		
		tabageos.BlitMath.functionAssignments.push(this.powerUpsValue);
		tabageos.BlitMath.ignoredArrays.push(this.powerUpsValue);
		
		//draw the first level
		tabageos.BlitMath.specificPatternBlit(this.display,this._image,this.sceneChanger.currentMap);
		
		this.backgroundLayer.clearRect(0,0,this.gameWidth,this.gameHeight);
		
		if(md && md.backgroundMap1) {
			tabageos.BlitMath.specificPatternBlit(this.backgroundLayer, this._image, md.backgroundMap1);
		} else {
			var bmpp = new tabageos.MoverPoint(0,0);
			this.backgroundLayer.copyPixels(this._image, this.backgroundRectangle, bmpp);
			//assume paint the whole background
			while(this.backgroundRectangle.width < this.gameWidth && bmpp.x < this.gameWidth) {
				bmpp.x += this.backgroundRectangle.width;
				this.backgroundLayer.copyPixels(this._image, this.backgroundRectangle, bmpp);
			}
		}
		
		var plax1;
		if(md && md.backgroundParallax1) {
			plax1 = new tabageos.CanvasObject(null,this.gameWidth,this.gameHeight);
			tabageos.BlitMath.specificPatternBlit(plax1, this._image, md.backgroundParallax1);
			this.camera.addParallaxLayer(plax1);//this.camera._pLayer1 = null; to reset for another call
			this.camera.pTweenType1 = "InCirc";
			this.camera.pTweenTime1 = 160;
		}
		//this.transValues.push([17,28]);
		
		//all user given values for ladders are replaced with [17,28] in the ladder map only, therefore the player can use [17,28] in all cases
		let ladderMap1 = tabageos.BlitMath.replaceValuesFromMultiArray(this.sceneChanger.currentMap, pd.ladderValues, 17, 28);
		
		
		if(!pd.basicPlatformer) {
		
			this.player = new tabageos.WeaponHoldingAttacker(pd.x || 0,pd.y || 0,pd.width,pd.height,this.sceneChanger.currentMap,playerCA,0,0,this.tileWidth,this.tileHeight,this.sceneChanger.currentMap.length,this.sceneChanger.currentMap[0].length, ladderMap1,this.controller,[17,28], pd.attackButton || 69, pd.attackTwoButton || 81);
			this.player.health = pd.healthAmount || 500;
			this.player.crouchHeightOffset = pd.crouchHeightOffset || 1;//because all of the widths and heights are the same for this animation, we need to set 1 to crouchHeightOffset, because normally it would be different than the other frames, but in this case each animation is the same width and height.
			this.player.crouchWidthOffset = pd.crouchWidthOffset || 0;
			this.player.attackWidthOffset = pd.attackWidthOffset || 0;
			this.player.attackHeightOffset = pd.attackHeightOffset || 0;
			this.player.attackTwoWidthOffset = pd.attackTwoWidthOffset || 0;
			this.player.attackTwoHeightOffset = pd.attackTwoHeightOffset || 0;
			this.player.attackTwoName = pd.attackTwoName || "fireball";
			this.player._gravityLevel = pd.gravityLevel || .301;
			this.player._walkSpeed = pd.walkSpeed || 4;
			this.player.maxSpeed = pd.walkSpeed || 4;
			this.player._jumpSpeed = pd.jumpSpeed || 4;
		
		} else {
			this.basicPlatformer = 1;
			this.player = new tabageos.BasicPlatformer(pd.x || 0,pd.y || 0,pd.width,pd.height,this.sceneChanger.currentMap,playerCA,0,0,this.tileWidth,this.tileHeight,0,0,ladderMap1,this.controller,[17,28]);
			this.player.health = pd.healthAmount || 500;
			this.player._gravityLevel = pd.gravityLevel || .286;
			this.player._walkSpeed = pd.walkSpeed || 4;
			this.player.maxSpeed = pd.walkSpeed || 4;
			this.player._jumpSpeed = pd.jumpSpeed || 4;
			
			this.controller.basicWasd.b = pd.attackButton || "e";
			this.controller.basicWasd.c = pd.attackTwoButton || "q";
			this.controller.basicArrows.b = pd.attackButton || "e";
			this.controller.basicArrows.c = pd.attackTwoButton || "q";
			
		}
		
        this.player._map = tabageos.BlitMath.replaceValuesFromMultiArray(this.player._map,this.transValues,0,0);
		
		
		this.enemies = this.changeSceneEnemies(lvToSetup);//changing what this.enemies is a reference to
		
		this.scenery = this.changeSceneScenery(lvToSetup);
		
		
		// setup methods called now
		
		//this is a main map based setup method, each tile is fired as an event to setupLevel if found in functionAssignments
		tabageos.BlitMath.dispatchFunctionAssignments(this,"setupLevel",this,this.sceneChanger.currentMap,this.tileWidth,this.tileHeight);
		
		
		this.establishHUD(pd.hudX || 0, pd.hudY || 0,pd.hudWidth || 96, pd.hudHeight || 32, pd.healthBarWidth || 62, pd.healthBarHeight || 16, pd.powerBarWidth || 55, pd.powerBarHeight || 16, pd.healthBarX || 32, pd.healthBarY || 16, pd.powerBarX || 32, pd.powerBarY || 16, pd.bustWidth || 32, pd.bustHeight || 32);
		
		
        this.setupStandardButtons(pd.pauseX||32, pd.pauseY||0,16,16,pd.homeX||80,pd.homeY||0,16,16,pd.muteX||48,pd.muteY||0,16,16,pd.linkX||64,pd.linkY||0,16,16,"help",(this.playerDefinition && this.playerDefinition.helpLink) ? this.playerDefinition.helpLink : "");
		
		
		this.beforeStartGameLoop = function(e) { //happens just after the start button is pressed
            this._doAlternate = 0;
           // this.player.setY(this.gameHeight-(this.tileHeight*3)-this.player._canvasAnimation.height);
			if( ldarr && ldarr[1] ) {
				this.player.setX(Number(ldarr[1])); this.player.setY(Number(ldarr[2])); 
			}
			this.callCamera(1,0,0,this.player._pos.addBy(0,this.player._canvasAnimation.height,1));//focus around the player.
			this.removeButton("toOptionsB");
			this.removeButton("toCreditsB");
			this.removeButton("backToTitleB");
			this.removeButton("diffOneB");
			this.removeButton("diffTwoB");
			this.removeButton("diffThreeB");
			this.removeButton("diffFourB");
			this.appendStandardButtons();
			if( this["level"+this.sceneChanger.currentScene+"Track"] && this.lastTrack != "level"+this.sceneChanger.currentScene+"Track" ) {
				this.lastTrack = "level"+this.sceneChanger.currentScene+"Track";
				this.playMusic(this["level"+this.sceneChanger.currentScene+"Track"]);
			}
            
        };
		
		if(!this.getButton("toOptionsB")) {
			
			this.makeButton("backToTitleB",this.cameraWidth-32,0,32,32,this.showTitle,"back",0,1);
			
			var opabs = [64,132,128,32];
			var crabs = [64,160,128,32];
			var dfabs = [91,121,16,24];
			var cr;
			if(this.optionsButtonLocationRect) {
				cr = this.optionsButtonLocationRect;
				opabs =[cr.x+1-1,cr.y+1-1,cr.width+1-1,cr.height+1-1];
			}
			if(this.creditsButtonLocationRect) {
				cr = this.creditsButtonLocationRect;
				crabs =[cr.x+1-1,cr.y+1-1,cr.width+1-1,cr.height+1-1];
			}
			this.makeButton("toOptionsB",opabs[0],opabs[1],opabs[2],opabs[3],this.showOptions,"options",0,1);
			this.makeButton("toCreditsB",crabs[0],crabs[1],crabs[2],crabs[3],this.showCredits,"credits",0,1);
			
			if(this.difficultyButtonsLocationRect) {
				cr = this.difficultyButtonsLocationRect;
				dfabs =[cr.x+1-1,cr.y+1-1,cr.width+1-1,cr.height+1-1];
			
			
			
				this.makeButton("diffOneB",dfabs[0],dfabs[1],dfabs[2],dfabs[3], this.changeDifficulty,"easy");
				this.makeButton("diffTwoB",dfabs[0]+this.tileWidth,dfabs[1],dfabs[2],dfabs[3], this.changeDifficulty,"mid");
				this.makeButton("diffThreeB",dfabs[0]+(this.tileWidth*2),dfabs[1],dfabs[2],dfabs[3], this.changeDifficulty,"midhard");
				this.makeButton("diffFourB",dfabs[0]+(this.tileWidth*3),dfabs[1],dfabs[2],dfabs[3], this.changeDifficulty,"hard");
			
			}
			
			//this.getButton("toOptionsB").setAttribute("class", "hoverable");
			//this.getButton("toCreditsB").setAttribute("class", "hoverable");
		}
		this.appendButton("toOptionsB");this.appendButton("toCreditsB");
		
		
		this.screenRightExitOffset = this.tileWidth*2;
		this.screenLeftExitOffset = 1;
		
		
		if(pd.projectileValue) {
			
			for (var pi = 51; pi > 0; pi--) { 
				var pval = [ pd.projectileValue[0] || 5, pd.projectileValue[1] || 30 ];
				var proj = new tabageos.BlittedTraveler(this._image, this.charLayer, new tabageos.Rectangle(pval[1]*this.tileWidth, pval[0]*this.tileHeight, pd.projectileWidth,pd.projectileHeight),0,0,this.tileWidth, this.tileHeight);
				proj.fromWidthOffset = pd.projectileWidth - this.tileWidth;
				proj.fromHeightOffset = pd.projectileHeight - this.tileHeight;
				if(pd.projectileValue[2]) {
					proj.defineAnimation("right", pd.projectileValue[2]);
				}
				if(pd.projectileValue[3]) {
					proj.defineAnimation("left", pd.projectileValue[3]);
				}
				proj.currentAnimation = "right";
				this.playerProjectiles.push(proj);
			}
		}
		
		this.useClintBlockFont();
		
		
		this.establishLights();
		
		if(this.mapDefinitions["level"+lvToSetup+"Doors"]) {
			var fi = 0;var doorv;var tonum = 0;
			for (fi; fi < this.mapDefinitions["level"+lvToSetup+"Doors"].length;fi++) {
				doorv = this.mapDefinitions["level"+lvToSetup+"Doors"][fi];
				
				this._doorUnits.push(doorv);
			}
		}
		
		
		if(this.addToSetup != null && typeof this.addToSetup == 'function') {
			this.addToSetup();//you can alter or add to setup from the json by defining and passing an additionalSetupMethod
		}
		
		
		if(this.addToLevelSetup && typeof this.addToLevelSetup == 'function') {//for initial level optional setups
			
			this.addToLevelSetup(lvToSetup, this.player,this.enemies,this.sceneChanger.currentMap);
		}
		
	};
	
	
	changeDifficulty(e) {
		var diffs = {"easy":1, "mid":2, "midhard":3, "hard":5}
		var ths = this._gameParent;
		ths.gameDifficulty = diffs[e.target.title];
		
		
	};
	
	
	showTitle(e) {
		
		var ths = this._gameParent;
		ths.removeVolumeSliderAnimation();
		ths.removeButton("backToTitleB");
		ths.removeButton("diffOneB");
		ths.removeButton("diffTwoB");
		ths.removeButton("diffThreeB");
		ths.removeButton("diffFourB");
		ths.title.floor.copyPixels(ths._image,  ths.titleRectangle,new tabageos.MoverPoint());
		ths.showingOptions = -2;
		ths.appendStartButton();
		ths.appendButton("toOptionsB");ths.appendButton("toCreditsB");
		//ths.startButton.setAttribute("class", "hoverable");
		//ths._doAlternate = 0;
	};
	
	showCredits(e) {
			
		var ths = this._gameParent;
		//ths._doAlternate = 0;
		ths.showingOptions = 0;
		ths.removeVolumeSliderAnimation();
		ths.removeStartButton();
		ths.removeButton("toOptionsB");ths.removeButton("toCreditsB");
		ths.removeButton("backToTitleB");
		ths.removeButton("diffOneB");
		ths.removeButton("diffTwoB");
		ths.removeButton("diffThreeB");
		ths.removeButton("diffFourB");
		ths.title.floor.copyPixels(ths._image, ths.creditsRectanlge, new tabageos.MoverPoint());
		ths.appendButton("backToTitleB");
		ths.levelComplete(ths.creditsLoop);
		
	};
	
	creditsLoop(ts) {
		
		if(this.showingOptions === 0) {
			
			var creds = this.creditsArray.toString().split(",").join(".");
			
			this.pixelParagraph(this.cameraWidth/2 - this.cameraWidth/4,64,16,creds,this.title.floor);
			
		}
		
	}
	
	showOptions(e) { 
		
		var ths = this._gameParent;//the buttons game parent is the GameSkeleton, 'this' here refers to the event listener fired from the button. _gameParent is applied to each button made with makeButton
		ths.removeStartButton();
		ths.removeButton("toOptionsB");
		ths.removeButton("toCreditsB");
		ths.removeButton("backToTitleB");
		ths.removeButton("diffOneB");
		ths.removeButton("diffTwoB");
		ths.removeButton("diffThreeB");
		ths.removeButton("diffFourB");
		ths.title.floor.copyPixels(ths._image, ths.optionsRectangle, new tabageos.MoverPoint());
		ths._sliderValue = ths.soundSystem._globalVolume+1-1;
		ths.appendButton("backToTitleB");
		
		if(ths.getButton("diffOneB")) {
			ths.appendButton("diffOneB");
			ths.appendButton("diffTwoB");
			ths.appendButton("diffThreeB");
			ths.appendButton("diffFourB");
		}
		ths.initVolumeSliderAnimation((256/2) - 40,58,ths.title.floor, 1);
		//ths.removeEventListener('volumeSliderEvent','changeOtherThanVolume', this);
		//ths.addEventListener('volumeSliderEvent','changeOtherThanVolume', this);
		ths.showingOptions = 1;
		ths.levelComplete(ths.optionsLoop);
	};
	
	optionsLoop(ts) {
		
		if(this.showingOptions === 1) {
			
			this.volumeSliderLoop(ts);
		}
	};
	
	enemy(x,y,fwo,fho,aspecs,spee, hea, w, h, s, aoffwidth, aoffheight, dropvf, expo, exs,awords,bwords,dropwords, tlv, mandwords) {
        var eA,en;
        eA = new tabageos.CanvasAnimation(this._image, this.charLayer,null,x,y,w || this.tileWidth, h || this.tileHeight);
        eA.animationSpecs = aspecs;
		eA.currentAnimation = "idle";
        eA.fromWidthOffset = fwo;
        eA.fromHeightOffset = fho;
        en = new tabageos.MapTraveler(x,y,this.tileWidth,this.tileHeight,this.sceneChanger.currentMap,eA,0,0,this.tileWidth,this.tileHeight);
        en._jumps = 1;//gravity is now applied
        en._map = this.player._map;//collision map
        en._walkSpeed = spee || 3;
        en.maxSpeed = spee || 3;
        en._veloc.y = 4;
		en.attackStrength = s || 2;
		
		if(hea < this.cameraWidth) { 
			en.health = (hea || 25) * this.gameDifficulty;
			en.maxHealth = en.health+1-1;
		} else {
			en.health = hea;
			en.maxHealth = hea+1-1;
		}
		en.origAWOffset = fwo +1-1;
		en.origAHOffset = fho +1-1;
		en.attackFromWidthOffset = aoffwidth || 0;
		en.attackFromHeightOffset = aoffheight || 0;
		en.drops = dropvf || null;
		en.explosion = expo || null;
		en.exSpeed = exs || 1;
		en.aWords = awords || "";
		en.bWords = bwords || "";
		en.dropWords = dropwords || "";
		en.manditoryWords = mandwords || "";
		en._currentWords = "";
		en._wordCounter = 0;
		en.tileValue  = tlv || [];
        return en;
        
    };
	dropEnemy(x,y,enemyTileValue) {
		
		for ( var eo of Object.values(this.enemyDefinitions) ) { 
			
			if(eo && eo.tileValue) {
				if( this.valuesMatch(eo.tileValue,enemyTileValue) ) {//drop an enemy
					
					this.enemies.push( 
						this.enemy(x,y,eo.fromWidthOffset,eo.fromHeightOffset,eo.animationSpecs,eo.speed, eo.health,eo.width,eo.height, eo.attackStrength, eo.attackFromWidthOffset, eo.attackFromHeightOffset, eo.dropValueFunction, eo.explosion, eo.exSpeed) 
					);
					break;
				
				}
			}
		}
		
	};
	
	dropScenery(x,y,todrop, source) {
		
		var soca = new tabageos.CanvasAnimation(source || this._image,this.charLayer,new tabageos.Rectangle(todrop[1]*this.tileWidth,todrop[0]*this.tileHeight,this.tileWidth,this.tileHeight),x,y,this.tileWidth,this.tileHeight);
		if(todrop[2]) {
			//animation frames array in 2
			soca.defineAnimation("frames",todrop[2]);
			soca.currentAnimation = "frames";
			soca.animate();
		}
		var so = new tabageos.SceneryObjectTraveler(x,y,this.tileWidth,this.tileHeight,this.sceneChanger.currentMap,soca,0,0,this.tileWidth,this.tileHeight);
		so.tileRect = new tabageos.Rectangle(todrop[1]*this.tileWidth,todrop[0]*this.tileHeight,this.tileWidth,this.tileHeight);
		so.tileValue = [todrop[0]+1-1, todrop[1]+1-1];
		this.scenery.push(so);
		
		
	}
	
	dropCoin(x,y,customValue) { window.console.log("cdrop");
		var todrop = customValue || [0,0];
		var soca = new tabageos.CanvasAnimation( ((todrop[0] || todrop[1]) ? this._image : this.coinImage),this.charLayer,new tabageos.Rectangle(todrop[1]*this.tileWidth,todrop[0]*this.tileHeight,this.tileWidth,this.tileHeight),x,y,this.tileWidth,this.tileHeight);
		if(todrop[2]) {
			//animation frames array in 2
			soca.defineAnimation("frames",todrop[2]);
			soca.currentAnimation = "frames";
			soca.animate();
		} else if (todrop[0] === 0 && todrop[1] === 0) {
			soca.defineAnimation("frames",[0,0,1,0,2,0,3,0,4,0,5,0]);
			soca.currentAnimation = "frames";
			soca.animate();
		}
		var so = new tabageos.SceneryObjectTraveler(x,y,this.tileWidth,this.tileHeight,this.sceneChanger.currentMap,soca,0,0,this.tileWidth,this.tileHeight);
		so.tileRect = new tabageos.Rectangle(todrop[1]*this.tileWidth,todrop[0]*this.tileHeight,this.tileWidth,this.tileHeight);
		so.tileValue = [0, 0];
		this.scenery.push(so);
		
		
	}
	
	setupLevel(e) { //called during the setup of individual levels, based on the values in BlitMath.functionAssignments the event causing this method contains the tile from functionAssignments found in the map as e.tileValue, and its location as e.x and e.y
		
		//this method gets called for enemy values, and walkPastValues and foreground values for each map when going to a scene
		//this method is an event handler, and gets called multiple times during the setup of each level.
		//found tiles in BlitMath.functionAssignments are dispatched as events causing this method to fire for each one.
		
		//assume each to be walk past and drawn some other way, ie  an enemy becomes moving, a lamp, foreground waterfall perhaps, and such
		this.player._map[e.tileYIndex][e.tileXIndex] = [0,0];
        //this.sceneChanger.currentMap[e.tileYIndex][e.tileXIndex] = [0,0];
		
		var ed = this.enemyDefinitions;
		var evalues = [];
		for ( var eo of Object.values(this.enemyDefinitions) ) { 
			
			if(eo && eo.tileValue && this.valuesMatch(e.tileValue, eo.tileValue)) { this.sceneChanger.currentMap[e.tileYIndex][e.tileXIndex] = [0,0];
				this.enemies.push( this.enemy(e.x,e.y,eo.fromWidthOffset,eo.fromHeightOffset,eo.animationSpecs,eo.speed, eo.health,eo.width,eo.height, eo.attackStrength, eo.attackFromWidthOffset, eo.attackFromHeightOffset, eo.dropValueFunction, eo.explosion, eo.exSpeed,"","","", eo.tileValue) );
			}
			
		}
		
		for ( var npc of Object.values(this.npcDefinitions) ) {
			
			if(npc && npc.tileValue && this.valuesMatch(e.tileValue, npc.tileValue)) { 
				
				this.npcs.push(
					this.enemy(e.x,e.y,npc.width - this.tileWidth,npc.height - this.tileHeight,npc.animationSpecs,0, 0,this.tileWidth,this.tileHeight, 0,0, 0, npc.dropValueFunction, 0, 7000,npc.aWords,npc.bWords,npc.dropWords, npc.tileValue,npc.manditoryWords)
				
				); 
				var newNpc = this.npcs[this.npcs.length-1];
				var ef = 0;
				for (var entry of this._memory.entries) {
					if((entry[0] == npc.tileValue[0]) && (entry[1] == npc.tileValue[1])) {
						ef = 1;
						if( entry[2] ) {
							newNpc.aWords = ""+ (newNpc.dropWords.indexOf("|") != -1 ? newNpc.dropWords.split("|")[1] : newNpc.dropWords);
							newNpc.bWords = ""+ (newNpc.dropWords.indexOf("|") != -1 ? newNpc.dropWords.split("|")[1] : newNpc.dropWords);
							
						}
					}
				
				}
				if(!ef) {
					this._memory.entries.push( [npc.tileValue[0] +1-1, npc.tileValue[1] +1-1] );
				}
				
				
				
			}
			
		}
		
		for ( var holdable of this.canHold ) { //turn holdable vales found in the map into loose scenery ready to be picked up
			var alreadyh = 0;
			for ( var aheld of this.heldScenery ) {
				if(this.valuesMatch(aheld, e.tileValue)) {
					//already holding the item
					this.sceneChanger.currentMap[e.tileYIndex][e.tileXIndex] = [0,0];
					alreadyh = 1;
				}
			}
			if(!alreadyh && this.valuesMatch(e.tileValue, holdable) && this.valuesMatch(this.sceneChanger.currentMap[e.tileYIndex][e.tileXIndex], holdable) ) {
				this.sceneChanger.currentMap[e.tileYIndex][e.tileXIndex] = [0,0];
				
				var todrop = holdable;
						if(todrop[0] && todrop[1]) {
							
							var soca = new tabageos.CanvasAnimation(this._image,this.charLayer,new tabageos.Rectangle(todrop[1]*this.tileWidth,todrop[0]*this.tileHeight,this.tileWidth,this.tileHeight),e.x,e.y,this.tileWidth,this.tileHeight);
							if(todrop[2]) {
								//animation frames array in 2
								soca.defineAnimation("frames",todrop[2]);
								soca.currentAnimation = "frames";
								soca.animate();
							}
							var so = new tabageos.SceneryObjectTraveler(e.x,e.y,this.tileWidth,this.tileHeight,this.sceneChanger.currentMap,soca,0,0,this.tileWidth,this.tileHeight);
							so.tileRect = new tabageos.Rectangle(todrop[1]*this.tileWidth,todrop[0]*this.tileHeight,this.tileWidth,this.tileHeight);
							so.tileValue = [todrop[0]+1-1, todrop[1]+1-1];
							this.scenery.push(so);
							
						}
				
			}
		}
		
		if(this.valuesMatch(e.tileValue, this.coinValue ) && this.valuesMatch(this.sceneChanger.currentMap[e.tileYIndex][e.tileXIndex], this.coinValue)) {
			this.dropCoin(e.x,e.y);
			this.sceneChanger.currentMap[e.tileYIndex][e.tileXIndex] = [0,0];
		}
		if(this.valuesMatch(e.tileValue, this.heartsValue) && this.valuesMatch(this.sceneChanger.currentMap[e.tileYIndex][e.tileXIndex], this.heartsValue) ) {
			this.dropScenery(e.x,e.y, e.tileValue);
			this.sceneChanger.currentMap[e.tileYIndex][e.tileXIndex] = [0,0];
		}
		if(this.valuesMatch(e.tileValue, this.powerUpsValue) && this.valuesMatch(this.sceneChanger.currentMap[e.tileYIndex][e.tileXIndex], this.powerUpsValue) ) {
			this.dropScenery(e.x,e.y, e.tileValue);
			this.sceneChanger.currentMap[e.tileYIndex][e.tileXIndex] = [0,0];
		}
		
		var fi = 0;var fia;var fia2;
        for(fi;fi < this.foreValues.length;fi++) {
            
            fia = this.foreValues[fi];
            fia2 = [fia[0]+1-1, fia[1]+1-1];
            
            if( this.valuesMatch(e.tileValue, fia2) && !fia[4] ) { 
                var afrct = new tabageos.Rectangle(fia[1]*this.tileWidth,fia[0]*this.tileHeight,fia[2] || this.tileWidth, fia[3] || this.tileHeight);
                var fobj = new tabageos.CanvasAnimation(this._image, this.charLayer, afrct,e.x + (fia[5] || 0),e.y + (fia[6] || 0),afrct.width,afrct.height);
                
                
                this.foregroundObjects.push(fobj);
                return;
                break; 
            }
            
            if( this.valuesMatch(e.tileValue, fia2) && fia[4] && fia[4].length ) { 
                
                //x and y setup but with tiles smaller than the animation
                var afrcta = new tabageos.Rectangle(fia[1]*this.tileWidth,fia[0]*this.tileHeight,fia[2] || this.tileWidth, fia[3] || this.tileHeight);
                var fwbj = new tabageos.CanvasAnimation(this._image, this.charLayer, afrcta,e.x + (fia[5] || 0),e.y + (fia[6] || 0),this.tileWidth,this.tileHeight);
                
                
                fwbj.defineAnimation("anim", fia[4]);//the value of this setup is we use the same values that are in the map for the animation itself.
                fwbj.currentAnimation = "anim";
                fwbj.fromWidthOffset = fia[2]-this.tileWidth;//to use smaller tiles as the frame indexes we just have to define width and height offsets.
                fwbj.fromHeightOffset = fia[3]-this.tileHeight;
                
				this.foregroundObjects.push(fwbj);
                return;
                break; 
            }
            
        }
		
		
		//then underCoverChanges happens
		//then afterSceneChanges happens

	}
	turnLightsOff() {
		this.turnOffLights();
		this.applyLights();//because _actualApplyLights happens during the _loop of GameSkeleton, out of loop we have to do this
		this._actualApplyLights();
	};
	initialSceneChanges(l) {
		this.bossblit = null;
		this.enemies = this.changeSceneEnemies(l);
		this.scenery = this.changeSceneScenery(l);
		this.movingProjectiles = [];
		this.playerProjectiles = [];
		this.npcs = [];
		this.pTypeTime = 0;
		this.npcTypeTime = 0;
		this._doorUnits = [];
		this.foregroundObjects = [];
		this.__lightsInit = 0;
		this.lightsReady = -1;
		this.lightsTileValues = [];
		this.turnLightsOff();
		this.gameOverPosition = null;
		
		if(this.lastMinutePlayerPosition) {
			
			this.player.setX(this.lastMinutePlayerPosition.x+1-1);
			this.player.setY(this.lastMinutePlayerPosition.y+1-1);
			this.gameOverPosition = new tabageos.MoverPoint(this.player.x+1-1,this.player.y+1-1);
			this.lastMinutePlayerPosition = null;
			
		}
		
	};
	underCoverChanges() {
		//sceneChanger.changeScene is called with all its needed params from GameSkeleton then TileSceneChanger
	};
	afterSceneChanges(l) {//this is also called during the setup of initial levels, as the result of an event, it happens shortly after the initial scene changes have happened. sceneChanger.changeScene is being called with all its needed params in the background by GameSkeleton.
		//l is the level being changed to
		//this method only happens if there has been a change from one scene to another, not from the title screen to a scene.
		
		this.player._map = tabageos.BlitMath.replaceValuesFromMultiArray(this.player._map,this.transValues,0,0);
        
        this.updateEnemyMaps(this.enemies);
		this.updateSceneryObjectMaps(this.scenery);
		this._doorUnits = [];
		
		let ladderMap = tabageos.BlitMath.replaceValuesFromMultiArray(this.sceneChanger.currentMap, this.playerDefinition.ladderValues, 17, 28);
		this.player.tileMap = ladderMap;
		
		this.backgroundLayer.context.clearRect(0,0,this.gameWidth,this.gameHeight);
		
		if(this.mapDefinitions && this.mapDefinitions["backgroundMap"+l+""] ) {
			tabageos.BlitMath.specificPatternBlit(this.backgroundLayer, this._image, this.mapDefinitions["backgroundMap"+l+""]);
		} else {
			
			var bmppb = new tabageos.MoverPoint(0,0);
			this.backgroundLayer.copyPixels(this._image, this.backgroundRectangle, bmppb);
			//assume paint the whole background
			while(this.backgroundRectangle.width < this.gameWidth && bmppb.x < this.gameWidth) {
				bmppb.x += this.backgroundRectangle.width;
				this.backgroundLayer.copyPixels(this._image, this.backgroundRectangle, bmppb);
			}
			
		}
		
		if( this.player._canvasAnimation.getDirectionOfAnimation(this.player._canvasAnimation.currentAnimation,1) == "left" ) {
			
			
		} else {
			
			//player position can be offset here if desired, use setX() or set both ._pos.x and .x;
		}
		
		
		this.establishLights();
		
		
		
		if(this.mapDefinitions["level"+l+"Doors"]) {
			var fi = 0;var doorv;var tonum = 0;
			for (fi; fi < this.mapDefinitions["level"+l+"Doors"].length;fi++) {
				doorv = this.mapDefinitions["level"+l+"Doors"][fi];
				this._doorUnits.push(doorv);
			}
		}
		
		
		
		//adjust camera to center on player
		this.camera.v.x = (this.player.x - this.camera.v.width) > 0 ? this.player.x - this.camera.v.width + (this.player._canvasAnimation.width/2) : 0;
		//this.camera.v.y = this.player.y - this.camera.v.height + (this.player._canvasAnimation.height) + this.tileHeight;

		this.callCamera(1,0,0, this.player._pos, 0, 1);   //sus, perhaps only  basicPlatformer, if needing long transitioning levels
		
		
		if(this["level"+l+"Track"] && this.lastTrack != "level"+l+"Track") {
			this.playMusic(this["level"+l+"Track"]); this.lastTrack = "level"+l+"Track";
		} else if (this.level1Track) {
			if(this.soundSystem._soundTracks.length >= 1) {
				//music is already playing of the same track
			} else {
				this.playMusic(this.level1Track);
			}
		}
		
		let pd = this.playerDefinition;
		
		if(pd.projectileValue) {
			
			for (var pi = 51; pi > 0; pi--) { 
				var pval = [ pd.projectileValue[0] || 5, pd.projectileValue[1] || 30 ];
				var proj = new tabageos.BlittedTraveler(this._image, this.charLayer, new tabageos.Rectangle(pval[1]*this.tileWidth, pval[0]*this.tileHeight, pd.projectileWidth,pd.projectileHeight),0,0,this.tileWidth, this.tileHeight);
				proj.fromWidthOffset = pd.projectileWidth - this.tileWidth;
				proj.fromHeightOffset = pd.projectileHeight - this.tileHeight;
				if(pd.projectileValue[2]) {
					proj.defineAnimation("right", pd.projectileValue[2]);
				}
				if(pd.projectileValue[3]) {
					proj.defineAnimation("left", pd.projectileValue[3]);
				}
				proj.currentAnimation = "right";
				this.playerProjectiles.push(proj);
			}
		}
		
		if(this.addToLevelSetup && typeof this.addToLevelSetup == 'function') {
			
			this.addToLevelSetup(l, this.player,this.enemies,this.sceneChanger.currentMap);
		}
		
		
	}
	
	
	animateThePlayer(bypassTime) {
        if(bypassTime) {
			this.playerAnimationChangeBypass = bypassTime +1-1;
		} 
        if(this.playerAnimationChangeBypass <= 0 && ( this.player._canvasAnimation.currentAnimation.indexOf("hurt") == -1 || (this.player._canvasAnimation.finishedCurrentAnimation()) || (this.player._canvasAnimation.ani >= 4) ) ) {
            //changeDirectionAnimation is overridden via WeaponHoldingAttacker, it needs to get called, we can't use the other auto animation changing functions from CanvasAnimation if we want attacking functionality to work.
           this.playerAnimationChangeBypass = 0;
		   this.player._canvasAnimation.changeDirectionAnimation(this.player._veloc.x < 0,this.player._lastVeloc.x > 0, this.player._veloc.y < 0, this.player._veloc.y > 0);
        } else if (this.playerAnimationChangeBypass > 0) {
			
			this.playerAnimationChangeBypass -= 33.3;
			
		}
        this.player._canvasAnimation.animate(this.player._canvasAnimation.currentAnimation.indexOf("attak") != -1 ? 0 : this.player._autoAnimationThrottle);
		 
        this.player._canvasAnimation.matchPosition(this.player,(this.player._canvasAnimation.width/2)-(this.tileWidth/2),this.player._canvasAnimation.height-this.tileHeight);
        this.player._canvasAnimation.blit();
		
		if(this.player._canvasAnimation.currentAnimation.indexOf("attak") != -1 ) {
			if(this.playerAttackSound) {
				this.playSound(this.playerAttackSound);
			}
		}
        
    };
	
	typePixels(stringToType) {
		
		this.pTypeString = stringToType;//type on top of everything, and for some time
		this.pTypeTime = 5000;//these params are used in the game loop
		this.pTypeMP.x = this.player.x - 48;
		this.pTypeMP.y = this.player.y - 32;
		
	};
	displayPlayerHealth() {
		this.healthBarDisplayDiv.style.width = Math.floor(this.player.health / this.healthBarPercent) + "px";
	};
	displayPlayerPower() {
		this.powerBarDisplayDiv.style.width = Math.floor(this.secondaryPowerLevel / this.powerBarPercent) + "px";
	};
	
	
	loop(ts) {//BasicActionPlatformerGame loop, called within GameSkeleton ._loop, the game loop
		
		
		if(!this.healthBarIsDisplayed) { 
			//the custom hud buttons are always on the top right and in the standard positions.
			//to change the hud more either recall setupCustomHealthHud and the related methods, or copy and paste the class code and edit it, or extend GameSkeleton directly constructing your own setup method.
            this.showCustomHud(this.player.health,0,0,0,this.wholeHudStyle);
            this.healthBarDisplayDiv.style.width = Math.floor(this.player.health / this.healthBarPercent) + "px";//max 500 health.  62 width
			
        }
		
		
		this.player.move(this.controller.buttons.left , this.controller.buttons.right,this.controller.buttons.up || this.controller.buttons.a,this.controller.buttons.down);
        
		
		if( (this.controller.buttons.up || this.controller.buttons.a) && this.player._veloc.y < 0 && this.player._veloc.y > -(this.player._jumpSpeed) ) {	
			if(this.playerJumpSound) {
				this.playSound(this.playerJumpSound);
			}
		}
		
		let passAfterRoutine = -7;
		if(this.enemyDefinitions.enemyRoutine && typeof this.enemyDefinitions.enemyRoutine == 'function') {
			
			passAfterRoutine = this.enemyDefinitions.enemyRoutine(this.player,this.enemies,this.sceneChanger.currentMap, this.sceneChanger.currentScene, this.camera, this.explosionFactory);
			
		}
		
		if (passAfterRoutine === -7 || passAfterRoutine === true) {
		
			var i = 0;var en;
            for(i; i < this.enemies.length; i++) {//enemies
                
                en = this.enemies[i];
                
                if(!en._grounded) {//initially the enemy can be placed in the air and so falls to the ground.
                    en.move(0,0,0,1);//move down.  left, right, up, down
                }
                if(en._canvasAnimation.currentAnimation.indexOf("death") == -1 && en._canvasAnimation.currentAnimation.indexOf("hurt") == -1) { //if en is hurt we let that animation finish before doing anything else. 
                    
                    if(tabageos.GeometricMath.testForPointInCircle(this.player._pos,200,en._pos)) {
						//seeAndChaseRoutine causes it to chase the player and not fall off of ledges or go over empty spots.
						//the method is only for platformers, for a top down game we would just use the .chase method of the TravelerSkeleton Class
                        tabageos.GameSkeleton.seeAndChaseRoutine(en,this.enemies,this.player,this._helperPoint,180,0,32,this.sceneChanger.currentMap,this.tileWidth,this.tileHeight);
                        //seeAndChaseRoutine causes the enemy to move changing its velocity.
                        en._canvasAnimation.x = en.x;
                        en._canvasAnimation.y = en.y;
                        en._canvasAnimation.fromWidthOffset = en.origAWOffset;
						en._canvasAnimation.fromHeightOffset = en.origAHOffset;
                        en._canvasAnimation.currentAnimation = en._veloc.x > 0 ? "right" : "left";
                    } else {
                        en._canvasAnimation.x = en.x;
                        en._canvasAnimation.y = en.y;
                        en._canvasAnimation.fromWidthOffset = en.origAWOffset;
						en._canvasAnimation.fromHeightOffset = en.origAHOffset;
                        en._canvasAnimation.currentAnimation = en._canvasAnimation.currentAnimation.indexOf("right") != -1 ? "idleright" : "idleleft";
                    }
                }
				var eacalc = en.origAWOffset +1-1;
                if(eacalc <= 0) {
					eacalc = this.tileWidth+1-1;
				}
                if(tabageos.GeometricMath.testForPointInCircle(this.player._pos,eacalc < this.tileWidth*2 ? eacalc*2 : eacalc - this.tileWidth/2,en._pos)) {
                //if close to the player and not hurt show attack animation, assumes all enemies have an attack animation with attackFromWidthOffset defined.
                    
                    if(en._canvasAnimation.currentAnimation.indexOf("death") == -1 && en._canvasAnimation.currentAnimation.indexOf("hurt") == -1) {
                        en._canvasAnimation.currentAnimation = en._canvasAnimation.currentAnimation.indexOf("right") != -1 ? "attackright" : "attackleft";
                        en._veloc.x = 0;en._veloc.y = 0;
                        en._canvasAnimation.fromWidthOffset = en.attackFromWidthOffset;
						en._canvasAnimation.fromHeightOffset = en.attackFromHeightOffset;
						if(this.enemyAttackSound) {
							this.playSound(this.enemyAttackSound);
						}
                    }
                    
                    this._helperPoint.x = this.player.x  + (this.player._leftRightFace ?  (this.tileWidth/2) : -(this.tileWidth/2));
                    this._helperPoint.y = this.player.y;
                    
                    if( !this.basicPlatformer && ( (this.attackWithExplosion && tabageos.GeometricMath.testForPointInCircle(this.attackWithExplosion,this.attackWithExplosion.width,en._pos)) || tabageos.GeometricMath.testForPointInCircle(this._helperPoint,eacalc-(this.tileWidth/2),en._pos) )  ) {
                        //if the player is real close
                        
                        //and the player is facing the enemy and the player is attacking
                        if(this.attackWithExplosion || (this.player.atApexOfAttack && this.player._leftRightFace != en._leftRightFace && this.player._canvasAnimation.currentAnimation.indexOf("attack") != -1)) {
                            //hurt the enemy and knock it back a little.
                            en._canvasAnimation.fromWidthOffset = en.origAWOffset;
							en._canvasAnimation.fromHeightOffset = en.origAHOffset;
                            en._canvasAnimation.currentAnimation = en._canvasAnimation.currentAnimation.replace("attack","hurt");
                            if(en.maxHealth < 4500) {//no knock back if maxHealth is 4500 or more, assuming a boss.
								en.setX( this.player._leftRightFace ? en.x + 4 : en.x - 4 );
							}
                            //en.setX(en.x - (en._veloc.x*8));
							if(en.maxHealth > 4500) {
								en.health -= (this.attackStrength/25);//attack strength is only 1/25 as strong on bosses.
							} else  {
								en.health -= this.attackStrength;
							}
                            this.attackWithExplosion = 0;
							if(this.enemyHurtSound) {
								this.playSound(this.enemyHurtSound);
							}
							
                        } else {//otherwise the enemy should be attacking
                            en._canvasAnimation.currentAnimation = en._canvasAnimation.currentAnimation.indexOf("right") != -1 ? "attackright" : "attackleft";
                            en._veloc.x = 0;en._veloc.y = 0;
                            en._canvasAnimation.fromWidthOffset = en.attackFromWidthOffset;//will vary with each enemy
							en._canvasAnimation.fromHeightOffset = en.attackFromHeightOffset;
                            
                        }
                    } else if ( this.basicPlatformer ) {
						
						this._helperPoint.x = this.player.x + (this.tileWidth/2);
						this._helperPoint.y = this.player.y + this.player._canvasAnimation.height;
						
						//this._helperPoint.y += this.player._canvasAnimation.height;
						//if(tabageos.GeometricMath.testForPointInCircle(this._helperPoint,en.origAWOffset-(this.tileWidth/2),en._pos)) {
							if(tabageos.GeometricMath.testForPointInCircle(this._helperPoint,this.tileWidth+4,en._pos) && this.player._state === 3 && en._pos.y <= this._helperPoint.y && this.player.x >= en.x && this.player.x <= en.x + en.width) {
								en._canvasAnimation.fromWidthOffset = en.origAWOffset;
								en._canvasAnimation.fromHeightOffset = en.origAHOffset;
								en._canvasAnimation.currentAnimation = en._canvasAnimation.currentAnimation.replace("attack","hurt");
								
								
								if(en.maxHealth > 4500) {
									en.health = 0;//(this.attackStrength/25);//attack strength is only 1/25 as strong on bosses.
								} else  {
									en.health = 0;//this.attackStrength;
								}
								
								if(this.enemyHurtSound) {
									this.playSound(this.enemyHurtSound);
								}
								
								this.player._grounded = 0;
								this.player._veloc.y = -9;this.player._state = 3; 
							} 
						//}
						
					}
                }
                
                
                if(en.health <= 0) {
                    
                    en._canvasAnimation.x = en.x;
                    en._canvasAnimation.y = en.y;
                    en._canvasAnimation.fromWidthOffset = en.origAWOffset;
					en._canvasAnimation.fromHeightOffset = en.origAHOffset;
                    en._canvasAnimation.currentAnimation = this.player._leftRightFace ? "deathright" : "deathleft";
					
                }
                
                //we slow down and speed up the enemy attack by the animation throttle.
                en._canvasAnimation.animate(en._canvasAnimation.currentAnimation.indexOf("attack") != -1 ? .8 : .5);
                en._canvasAnimation.blit();
                if(en.origAWOffset > this.tileWidth*4) {
					this.bossblit = en;
				}
                
            
                //the en will only be in attack if close to the player, and the animation will only finish if it stays close and the player has not attacked.
                //also note that finishedCurrentAnimation returns true when the animation is about to finish, at about the 4th to last frame.
                if(this.player.health > 0 && en._canvasAnimation.currentAnimation.indexOf("attack") != -1 && en._canvasAnimation.finishedCurrentAnimation()) {
                    
                    //player hurt
                    this.player._veloc.y = -2;
                    this.player._veloc.x = -this.player._veloc.x;
                    this.player.update();
					if(en.origAWOffset <= this.tileWidth*2) { //a very big enemy does not cause automatic knock back
						this.player.setX(this.player._leftRightFace ? this.player.x - (en.origAWOffset||this.tileWidth) : this.player.x + (en.origAWOffset||this.tileWidth));
					}
                    this.player._canvasAnimation.currentAnimation = "hurt"+this.player._canvasAnimation.getDirectionOfAnimation(this.player._canvasAnimation.currentAnimation,1,0);
                    this.player._canvasAnimation.animate();	
                    this.player._canvasAnimation.matchPosition(this.player,(this.player._canvasAnimation.width/2)-this.tileWidth,this.player._canvasAnimation.height-this.tileHeight);
                    this.player._canvasAnimation.blit();
                    this.player.health -= (!this.basicPlatformer  ? en.attackStrength : this.player.health+1);
					
						if(this.basicPlatformer && this.playerDefinition.saveLifeValues && this.playerDefinition.currentPowerValue) {
							
								for ( let pwlfs of this.playerDefinition.saveLifeValues ) {
									
									if( this.valuesMatch( pwlfs, this.playerDefinition.currentPowerValue ) ) {
										this.player.health = this.initialHealthLevel+1-1;
										this.playerDefinition.currentPowerValue = [0,0];
										break;
										
									}
									
									
								}

						} else if (this.basicPlatformer && this.playerDefinition.currentPowerValue) {
							this.playerDefinition.currentPowerValue = [0,0];
						}
					
					this.healthBarDisplayDiv.style.width = Math.floor(this.player.health / this.healthBarPercent) + "px";
					if(this.playerHurtSound) {
						this.playSound(this.playerHurtSound);
					}
                }
                //when hurt animation is finished put it back to left or right.
                if(en._canvasAnimation.currentAnimation.indexOf("hurt") != -1 && en._canvasAnimation.finishedCurrentAnimation()) {
                    
                    en._canvasAnimation.x = en.x;
                    en._canvasAnimation.y = en.y;
                    en._canvasAnimation.fromWidthOffset = en.origAWOffset;
					en._canvasAnimation.fromHeightOffset = en.origAHOffset;
                    en._canvasAnimation.currentAnimation = en._veloc.x > 0 ? "right" : "left";
                }
                
                //health bar
                this._helperRect.x = 0; this._helperRect.y = 0;
                if(!this.basicPlatformer && en.health < 10000 && en.origAWOffset < this.tileWidth * 3) {
					this._helperRect.width = en.health > 50 ? 50 : en.health; 
					this._helperRect.height = 3;
					this._helperPoint.x = en.x + (this.tileWidth/2)  - (this._helperRect.width/2);
					this._helperPoint.y = en.y - en._canvasAnimation.fromHeightOffset + (en.origAHOffset > this.tileHeight*3 ? this.tileHeight*3 : 0);
					this.charLayer.copyPixels(this.healthBarImage,this._helperRect,this._helperPoint);
                } else if (!this.basicPlatformer && en.origAWOffset > this.tileWidth * 3 && en.maxHealth >= this.cameraWidth) {//boss health lining the top portion of the screen.
					this._helperRect.width =  en.health * (this.cameraWidth / en.maxHealth);
					this._helperRect.height = 5;
					this._helperRect.x = this.camera.v.x+1-1;
					this._helperRect.y = this.camera.v.y + 34;
					this.charLayer.drawRect(this._helperRect, "#c80000");
				}
				
                if(en._canvasAnimation.currentAnimation.indexOf("death") != -1 && en._canvasAnimation.finishedCurrentAnimation()) {
                    
					
					if(en.explosion && en.health != -5158) {
						
						this.explosionFactory.addExplosion(en.x - (en.explosion.width/2),en.y + en._canvasAnimation.height + en._canvasAnimation.fromHeightOffset - en.explosion.height - this.tileHeight,0,en.explosion.x,en.explosion.y,en.explosion.width,en.explosion.height,en.exSpeed || 1);
						
					}
					
					if(en.drops && en.health != -5158) {
						var todrop = en.drops();
						en.health = -5158;
						
						var edrop = 0;
						
						for ( var eo of Object.values(this.enemyDefinitions) ) { 
							
							if(eo && eo.tileValue) {
								if( this.valuesMatch(eo.tileValue,todrop) ) {//drop an enemy
									
									edrop = 1;
									this.enemies.push( 
										this.enemy(en.x,en.y,eo.fromWidthOffset,eo.fromHeightOffset,eo.animationSpecs,eo.speed, eo.health,eo.width,eo.height, eo.attackStrength, eo.attackFromWidthOffset, eo.attackFromHeightOffset, eo.dropValueFunction, eo.explosion, eo.exSpeed) 
									);
									break;
									
								}
							}
							
						}
						
						if(!edrop) {
							
							if(todrop[0] && todrop[1]) {//drop scenery object
								var soca = new tabageos.CanvasAnimation(this._image,this.charLayer,new tabageos.Rectangle(todrop[1]*this.tileWidth,todrop[0]*this.tileHeight,this.tileWidth,this.tileHeight),en.x,en.y,this.tileWidth,this.tileHeight);
								if(todrop[2]) {
									//animation frames array in 2
									soca.defineAnimation("frames",todrop[2]);
									soca.currentAnimation = "frames";
									soca.animate();
								}
								var so = new tabageos.SceneryObjectTraveler(en.x,en.y,this.tileWidth,this.tileHeight,this.sceneChanger.currentMap,soca,0,0,this.tileWidth,this.tileHeight);
								so.tileRect = new tabageos.Rectangle(todrop[1]*this.tileWidth,todrop[0]*this.tileHeight,this.tileWidth,this.tileHeight);
								so.tileValue = [todrop[0]+1-1, todrop[1]+1-1];
								this.scenery.push(so);
								
							}
							
							
							
						}
					} else {
						en.health = -5158;
					}
					
                    tabageos.GeometricMath.splice(this.enemies,this.enemies.indexOf(en));
                    break;
                    
                }
				
				if(en && tabageos.GeometricMath.testForPointInCircle(this.player._pos,this.tileWidth,en._pos) && en.attackStrength === -1) {
					if(this.controller.buttons.b) {//pick up enemy, attackStrength of enemy must be -1
						for (var itema of this.canHold) {
							
							if( this.valuesMatch(itema, en.tileValue) ) { 
								
								this.heldScenery.push(  [ itema[0], itema[1] ] );
								tabageos.GeometricMath.splice(this.enemies,this.enemies.indexOf(en));
								break;
							}
							
						}
						
					}
					
				}
                
                
            } // end enemies
		}
		
			i = 0; var npc;//npc interactions / basic text question and answer and drop system
			var fromMandatedWords = 0;
			for( i ; i < this.npcs.length; i++ ) {
				
				npc = this.npcs[i];
				
				var potentialDrop = 0;
				if( npc.exSpeed <= 0 && tabageos.GeometricMath.testForPointInCircle(this.player._pos, 32, npc.getPosition()) ) {
					
					
					if(npc.manditoryWords) { //always speak when walk past this npc, and speak a repeated sequence
						var mlen = npc.manditoryWords.indexOf("|") != -1 ? npc.manditoryWords.split("|").length : 0;
						var mandate = mlen ? npc.manditoryWords.split("|")[npc._wordCounter] : npc.manditoryWords;
						npc._currentWords = mandate + "";
						npc.exSpeed = 11000;
						this.currentNpcTalking = npc;
						this.npcTypeTime = npc.exSpeed +1-1;
						this.pixelParagraph(npc.x, npc.y - this.tileHeight*3, 10, mandate);
						if(npc._wordCounter < mlen-1) {
							npc._wordCounter += 1;
						} else {
							npc._wordCounter = 0;
						}
					}
					
					//a pressed 
					if(this.controller.buttons.a && npc.bWords.indexOf("7quinprog7") != -1) {//b question in progress
						var wsplaq = npc.bWords.split("?");var wlena = wsplaq.length;
						
						var aAnswerRe = wsplaq[1].split("|")[0];
						var bAnswerRe = wsplaq[1].split("|")[1];
						
						var response = aAnswerRe;
						//they have pressed 'a' after seeing the 'b' question.
						this.pixelParagraph(npc.x, npc.y - this.tileHeight*3, 10, response);
						npc._currentWords = response + "";npc.exSpeed = 7000;
						this.currentNpcTalking = npc;
						this.npcTypeTime = npc.exSpeed +1-1;
						npc.bWords = npc.bWords.replace("7quinprog7", "?");//question to be asked again
						
						potentialDrop = npc.drops(this.player, this.heldScenery, "a", "b");
						
						
						this.controller.buttons.a = 0;
						
						
					} else if (this.controller.buttons.a && ( npc.aWords.indexOf("?") != -1 && npc.aWords.indexOf("7quinprog7") == -1 ) ) {//display a question
						var wsplaq = npc.aWords.split("?");var wlena = wsplaq.length;
						
						var firstchoice = wsplaq[1].split("|")[0];
						var secondchoice = wsplaq[1].split("|")[1];
						
						var questi = wsplaq[0] + "?." + "a: " + firstchoice + "." + "b: " + secondchoice;
						
						
						this.pixelParagraph(npc.x, npc.y - this.tileHeight*3, 10, questi);
						npc._currentWords = questi + "";npc.exSpeed = 7000;
						this.currentNpcTalking = npc;
						this.npcTypeTime = npc.exSpeed +1-1;
						npc.aWords = npc.aWords.replace("?", "7quinprog7");
						this.controller.buttons.a = 0;
						
					} else if (this.controller.buttons.a && ( npc.aWords.indexOf("7quinprog7") != -1 && npc.bWords.indexOf("7quinprog7") == -1) ){//a question in progress
						var wsplaq = npc.aWords.split("?");var wlena = wsplaq.length;
						
						var aAnswerRe = wsplaq[1].split("|")[0];
						var bAnswerRe = wsplaq[1].split("|")[1];
						
						var response = aAnswerRe;
						//they have pressed 'a' after seeing the 'a' question.
						this.pixelParagraph(npc.x, npc.y - this.tileHeight*3, 10, response);
						npc._currentWords = response + "";npc.exSpeed = 7000;
						this.currentNpcTalking = npc;
						this.npcTypeTime = npc.exSpeed +1-1;
						npc.aWords = npc.aWords.replace("7quinprog7", "?");//question asked again
						
						potentialDrop = npc.drops(this.player, this.heldScenery, "a", "a");
						
						this.controller.buttons.a = 0;
						
						
					} else if (this.controller.buttons.a && !npc.manditoryWords) { npc._canvasAnimation.animate(); //no question, potential drop
						var wspla = npc.aWords.split("|");var wlena = wspla.length;
						var wordsa = wspla[Math.floor(Math.random()*wlena)];
						this.pixelType(npc.x, npc.y - this.tileHeight*3, wordsa);
						npc._currentWords = wordsa + "";npc.exSpeed = 7000;
						this.currentNpcTalking = npc;
						this.npcTypeTime = npc.exSpeed +1-1;
						potentialDrop = npc.drops(this.player, this.heldScenery, "a");
						this.controller.buttons.a = 0;
					}
					
					
					//b pressed
					if ( this.controller.buttons.b && npc.aWords.indexOf("7quinprog7") != -1 ) { 
						var wsplaq = npc.aWords.split("?");var wlena = wsplaq.length;
						
						var aAnswerRe = wsplaq[1].split("|")[0];
						var bAnswerRe = wsplaq[1].split("|")[1];
						
						var response = bAnswerRe;
						//they have pressed 'b' after seeing the 'a' question.
						this.pixelParagraph(npc.x, npc.y - this.tileHeight*3, 10, response);
						npc._currentWords = response + "";npc.exSpeed = 7000;
						this.currentNpcTalking = npc;
						this.npcTypeTime = npc.exSpeed +1-1;
						npc.aWords = npc.aWords.replace("7quinprog7", "?");//question asked again
						
						potentialDrop = npc.drops(this.player, this.heldScenery, "b", "a");
						this.controller.buttons.b = 0;
						
						
					} else if (this.controller.buttons.b && ( npc.bWords.indexOf("?") != -1 && npc.bWords.indexOf("7quinprog7") == -1 ) ) {
						var wsplaq = npc.bWords.split("?");var wlena = wsplaq.length;
						
						var firstchoice = wsplaq[1].split("|")[0];
						var secondchoice = wsplaq[1].split("|")[1];
						
						var questi = wsplaq[0] + "?." + "a: " + firstchoice + "." + "b: " + secondchoice;
						
						
						this.pixelParagraph(npc.x, npc.y - this.tileHeight*3, 10, questi);
						npc._currentWords = questi + "";npc.exSpeed = 7000;
						this.currentNpcTalking = npc;
						this.npcTypeTime = npc.exSpeed +1-1;
						npc.bWords = npc.bWords.replace("?", "7quinprog7");
						this.controller.buttons.b = 0;
						
					} else if (this.controller.buttons.b && ( npc.bWords.indexOf("7quinprog7") != -1 && npc.aWords.indexOf("7quinprog7") == -1 ) ){
						var wsplaq = npc.bWords.split("?");var wlena = wsplaq.length;
						
						var aAnswerRe = wsplaq[1].split("|")[0];
						var bAnswerRe = wsplaq[1].split("|")[1];
						
						var response = bAnswerRe;
						//they have pressed 'b' after seeing the 'b' question.
						this.pixelParagraph(npc.x, npc.y - this.tileHeight*3, 10, response);
						npc._currentWords = response + "";npc.exSpeed = 7000;
						this.currentNpcTalking = npc;
						this.npcTypeTime = npc.exSpeed +1-1;
						npc.bWords = npc.bWords.replace("7quinprog7", "?");//question asked again
						
						potentialDrop = npc.drops(this.player, this.heldScenery, "b", "b");
						
						this.controller.buttons.b = 0;
						
						
					} else if (this.controller.buttons.b && !npc.manditoryWords) { npc._canvasAnimation.animate();
						var wspla = npc.bWords.split("|");var wlena = wspla.length;
						var wordsa = wspla[Math.floor(Math.random()*wlena)];
						this.pixelType(npc.x, npc.y - this.tileHeight*3, wordsa);
						npc._currentWords = wordsa + "";npc.exSpeed = 7000;
						this.currentNpcTalking = npc;
						this.npcTypeTime = npc.exSpeed +1-1;
						potentialDrop = npc.drops(this.player, this.heldScenery, "b");
						this.controller.buttons.b = 0;
					}
					
					
					
					
					if(potentialDrop) { 
						
						if(npc.dropWords) { //todo persist even after level change and back, done in _memory object
							
							for (var entry of this._memory.entries) {
								if((entry[0] == npc.tileValue[0]) && (entry[1] == npc.tileValue[1])) {
									entry[2] = 1; break;
								}
								
							}
							npc.aWords = ""+ (npc.dropWords.indexOf("|") != -1 ? npc.dropWords.split("|")[1] : npc.dropWords);
							npc.bWords = ""+ (npc.dropWords.indexOf("|") != -1 ? npc.dropWords.split("|")[1] : npc.dropWords);
							this.pixelType(npc.x, npc.y - this.tileHeight*3, npc.dropWords);
							npc._currentWords = npc.dropWords.split("|")[0] + "";npc.exSpeed = 7000;
							this.currentNpcTalking = npc;
							this.npcTypeTime = npc.exSpeed +1-1;
						}
						var todrop = potentialDrop;
						if(typeof todrop != 'string' && todrop[0] && todrop[1]) {
							var soca = new tabageos.CanvasAnimation(this._image,this.charLayer,new tabageos.Rectangle(todrop[1]*this.tileWidth,todrop[0]*this.tileHeight,this.tileWidth,this.tileHeight),npc.x,npc.y,this.tileWidth,this.tileHeight);
							if(todrop[2]) {
								//animation frames array in 2
								soca.defineAnimation("frames",todrop[2]);
								soca.currentAnimation = "frames";
								soca.animate();
							}
							var so = new tabageos.SceneryObjectTraveler(npc.x,npc.y,this.tileWidth,this.tileHeight,this.sceneChanger.currentMap,soca,0,0,this.tileWidth,this.tileHeight);
							so.tileRect = new tabageos.Rectangle(todrop[1]*this.tileWidth,todrop[0]*this.tileHeight,this.tileWidth,this.tileHeight);
							so.tileValue = [todrop[0]+1-1, todrop[1]+1-1];
							this.scenery.push(so);
							
						} else {
							
							if(todrop === "save" || todrop === "saveGame" || todrop === "s" || todrop === "savegame") {
								this.saveGame();
								window.console.log("game saved");
							}
							
						}
						
						
						
					}
				}
				
				if(npc.exSpeed > 0) { npc.exSpeed -= 33.3;
					
					
					//this.pixelDialogBox(npc._currentWords,npc.x - (npc.width*3), npc.y - this.tileHeight*3, npc.x - (npc.width*3) + 1, npc.y - (this.tileHeight*3) + 1,10);
					//this.pixelParagraph(npc.x - (npc.width*3), npc.y - this.tileHeight*3, 12,npc._currentWords);
					
				}
				if(!npc._canvasAnimation.finishedCurrentAnimation()) {
					npc._canvasAnimation.animate();
				}
				npc._canvasAnimation.blit();
			} //end npc
			
			
		
			
			
			if(this.controller.buttons.c && !this.__holdingC) {
				
				if( this.secondaryExtra ) {
					
					this.secondaryExtra( this.player, this.enemies, this.sceneChanger.currentMap, this.sceneChanger.currentScene, this.explosionFactory );
					
					
				}
				
				if(this.playerProjectiles.length && this.secondaryPowerLevel > 0) { 
					
					var tomproj = this.playerProjectiles.pop();
					this.movingProjectiles.push(tomproj);
					
					var lra = this.player._canvasAnimation.getDirectionOfAnimation(this.player._canvasAnimation.currentAnimation,1);
					if(lra === "left") {
						tomproj.currentAnimation = "left";
						tomproj._veloc.x = -7;
						tomproj.setX(this.player.x - tomproj.fromWidthOffset);
						tomproj.setY(this.player.y);
						
					} else {
						tomproj.currentAnimation = "right";
						tomproj._veloc.x = 7;
						tomproj.setX(this.player.x + tomproj.fromWidthOffset);
						tomproj.setY(this.player.y);
						
					}
					
					this.secondaryPowerLevel -= this.secondaryPowerDrainAmount;
					
					this.powerBarDisplayDiv.style.width = Math.floor(this.secondaryPowerLevel / this.powerBarPercent) + "px";//max 300
					
					if(this.playerAttackTwoSound) {
						this.playSound(this.playerAttackTwoSound);
					}
					
				}
				this.__holdingC = 1;
				
			}
			
			if(!this.controller.buttons.c && this.__holdingC) {
				this.controller.buttons.c = 0;this.__holdingC = 0;
			}
			
			
			i = 0; var l = this.movingProjectiles.length;
			for(i; i < l; i++) {
				
				var proje = this.movingProjectiles[i];
				if(!proje) { break; }
				proje.move();
				proje.animate();
				proje.blit();
				if(proje.x < 0 || proje.x > this.gameWidth || proje.x < this.camera.v.x || proje.x > this.camera.v.x + this.camera.v.width) {
					tabageos.GeometricMath.splice(this.movingProjectiles, this.movingProjectiles.indexOf(proje));
					this.playerProjectiles.push(proje);
					break;
				}
				//for each enemy
				for ( var eny of this.enemies ) {
					
					if(tabageos.GeometricMath.testForPointInCircle(eny._pos, en.origAWOffset ? en.origAWOffset : this.tileWidth, proje.getPosition())) {
						
						tabageos.GeometricMath.splice(this.movingProjectiles, this.movingProjectiles.indexOf(proje));
						this.playerProjectiles.push(proje);
						
						eny._canvasAnimation.fromWidthOffset = eny.origAWOffset;
                        eny._canvasAnimation.currentAnimation = eny._canvasAnimation.currentAnimation.replace("attack","hurt");
                            
                        eny.setX( this.player._leftRightFace ? eny.x + 4 : eny.x - 4 );
                            //en.setX(en.x - (en._veloc.x*8));
                        eny.health -= (!this.basicPlatformer ? (this.attackStrength*2) : eny.health+1);
						
						if(this.projectileExplosion) {
							var dof = this.player._canvasAnimation.getDirectionOfAnimation(this.player._canvasAnimation.currentAnimation,1) == "left" ? -((this.projectileExplosion.width/2) + this.tileWidth) : ((this.projectileExplosion.width/2) );
							this.explosionFactory.addExplosion(proje.x + dof, proje.y - (this.projectileExplosion.height/2), 0,this.projectileExplosion.x,this.projectileExplosion.y,this.projectileExplosion.width, this.projectileExplosion.height);
						}
						break;break;
					}
					
					
				}
				
				//map collision
				var pwall = tabageos.BlitMath.checkTileValueAt(proje.x,proje.y,this.player._map,this.tileWidth,this.tileHeight);
				if(pwall[0] || pwall[1]) {
					if(this.movingProjectiles.indexOf(proje) >= 0) {
						tabageos.GeometricMath.splice(this.movingProjectiles, this.movingProjectiles.indexOf(proje));
					}
					this.playerProjectiles.push(proje);
					
					if(this.projectileExplosion) {
						var dof = this.player._canvasAnimation.getDirectionOfAnimation(this.player._canvasAnimation.currentAnimation,1) == "left" ? -((this.projectileExplosion.width/2) + this.tileWidth) : ((this.projectileExplosion.width/2) );
						this.explosionFactory.addExplosion(proje.x + dof, proje.y - (this.projectileExplosion.height/2), 0,this.projectileExplosion.x,this.projectileExplosion.y,this.projectileExplosion.width, this.projectileExplosion.height);
					}
					break;
					
				}
			}
			
			
			
			if(this.controller.buttons.b) {//for best attack display, either have the attack be the same width height as the other animations, or define a attackExplosion
				
				if(this.attackExplosion && this.player._canvasAnimation.finishedCurrentAnimation()) {
					var dof = this.player._canvasAnimation.getDirectionOfAnimation(this.player._canvasAnimation.currentAnimation,1) == "left" ? -((this.attackExplosion.width/2) + this.tileWidth) : ((this.attackExplosion.width/2) - (this.tileWidth*2));
					var exloc = new tabageos.Rectangle(this.player.x + dof, this.player.y - (this.attackExplosion.height/2), this.attackExplosion.width,this.attackExplosion.height);
					this.explosionFactory.addExplosion(this.player.x + dof, this.player.y - (this.attackExplosion.height/2), 0,this.attackExplosion.x,this.attackExplosion.y,this.attackExplosion.width, this.attackExplosion.height);
					this.controller.buttons.b = 0;
					this.attackWithExplosion = exloc;
				}
				
				
			}
			
			
                //use the platformer scenery routine instead of top down
                //the static basicPlatformerSceneryRoutine method moves scenery objects and handles player picking them up
                //this method only handles loose SceneryObjects in the sceneryObjects array given to it, and not tiles in the map
                var havePickedUpScenery = 
                    tabageos.GameSkeleton.basicPlatformerSceneryRoutine(this.player, this.throwCheck, this.pickUpCheck, 
                        null, null, this.scenery, this.charLayer, this.display, this._image, this.sceneChanger.currentMap,this.tileWidth,this.tileHeight,20,5,this.gameWidth, this.gameHeight,this._helperPoint, this.sceneChanger);
                      
			
			if(havePickedUpScenery) {
				if(this.playerPickupSound) {
					this.playSound(this.playerPickupSound);
				}
				
				
				for (var itema of this.canHold) {
					if( this.valuesMatch(itema, this.player.holding.tileValue) ) { 
						this.heldScenery.push(  [ itema[0]+1-1, itema[1]+1-1 ] );
						break;
					}
				}
				
				
				
				
				if( this.valuesMatch(this.heartsValue, this.player.holding.tileValue)  ) {
					
					if (this.player.health < this.initialHealthLevel - 25) {
						this.player.health += 25;
						this.healthBarDisplayDiv.style.width = Math.floor(this.player.health / this.healthBarPercent) + "px";
					}
					
					
				}
				if( this.valuesMatch(this.powerUpsValue, this.player.holding.tileValue)  ) {
					
					if (this.secondaryPowerLevel < this.initialPowerLevel - 25) {
						this.secondaryPowerLevel += 25;
						this.powerBarDisplayDiv.style.width = Math.floor(this.secondaryPowerLevel / this.powerBarPercent) + "px";
					}
					
					
					
				}
				
				if(this.valuesMatch([0,0], this.player.holding.tileValue)) {
					this.coinsCollected += 1;
					//coin sound
					
					this.playSound(this.coinCollectSound);
					
				}
				
				this.player._throwHolding();
				
			}
			
			var lightSet = 0;
			if(this.lightsReady !== 0) { //lights
			
					let arrayOfLightPositions = [];
					
					for ( var alight of this.lightsTileValues ) {
						if(tabageos.BlitMath.getLocationOfTile(alight, this.sceneChanger.currentMap, this.tileWidth, this.tileHeight) ) {
							arrayOfLightPositions = tabageos.GeometricMath.mergeArrays(arrayOfLightPositions, tabageos.BlitMath.getPathOfTile(alight, this.sceneChanger.currentMap, this.tileWidth, this.tileHeight));
						}
					}
					
					if(this.lightsReady === -1 || this.lightsReady === 1) {
						
						
						for( let lpt of arrayOfLightPositions ){
							if(this.lightsReady === -1) { 
								//readyLights must be called on the first light, readyLights first turns off the lights, then the first one is being turned on.
								this.readyLights( this.lightsFrom, lpt.x - (this.lightsFrom.width/2) - this.camera.v.x,  lpt.y - (this.lightsFrom.height/2) - this.camera.v.y );
								if(arrayOfLightPositions.length > 1) {this.lightsReady = 1;}
								
							} else if (this.lightsReady === 1) { //next just turn on additional lights, 
								this.readyAdditionalLights(this.lightsFrom,lpt.x - (this.lightsFrom.width/2) - this.camera.v.x,  lpt.y - (this.lightsFrom.height/2) - this.camera.v.y );
								if(arrayOfLightPositions.indexOf(lpt) == arrayOfLightPositions.length - 1) {
									this.lightsReady = -1;//if we do away with this all lights keep turning on, refilling the scene thereby flooding the scene with the lights.
								}
							}
							
							var curlghtv = tabageos.BlitMath.checkTileValueAt(lpt.x,lpt.y, this.sceneChanger.currentMap, this.tileWidth,this.tileHeight);
							
							for (var lia of this.lightsTileValues) {
								if ( lia[2] && this.valuesMatch(curlghtv, lia) ) {
									this.lightsCanvasAnimation.animationSpecs = {'light' : [0,lia[2]] };
									this.lightsCanvasAnimation.currentAnimation = 'light';
									this.lightsCanvasAnimation.x = lpt.x;
									this.lightsCanvasAnimation.y = lpt.y;
									this.lightsCanvasAnimation.animate(.2);
									this.lightsCanvasAnimation.blit();
								
								}
							}
							
							
						}
						
						
					} else if (this.lightsReady === -2 || this.lightsReady === 2) {
						
						
						for( let lpt of arrayOfLightPositions ){
							if(this.lightsReady === -2) {
								this.animateLights(this.lightsFrom,lpt.x - (this.lightsFrom.width/2) - this.camera.v.x,  lpt.y - (this.lightsFrom.height/2) - this.camera.v.y );
								this.lightsReady = 2;
							} else if (this.lightsReady === 2) {
								this.animateAdditionalLights(this.lightsFrom,lpt.x - (this.lightsFrom.width/2) - this.camera.v.x,  lpt.y - (this.lightsFrom.height/2) - this.camera.v.y );
								if(arrayOfLightPositions.indexOf(lpt) == arrayOfLightPositions.length - 1) {
									this.lightsReady = -2;
								}
							}
						}
						
						
					}
					
				
				
			}
			
			
			this.animateThePlayer();
			
			if(this.bossblit) { 
				this.bossblit._canvasAnimation.blit();
			}
			
			var fif = 0;var fa;
			for(fif;fif<this.foregroundObjects.length;fif++) {
				fa = this.foregroundObjects[fif];
				
				if(fa.currentAnimation == "anim") { //animate the foreground
					fa.animate(.2);//
				}
				
				//if it is within the view of the camera draw it into charLayer, these are the last draws on top of everything else.
				if(fa.x + fa.fromWidthOffset >= this.camera.v.x && fa.x  < this.camera.v.x + this.camera.v.width && fa.y >= this.camera.v.y && fa.y < this.camera.v.y + this.camera.v.height) {
					if(fa.currentAnimation == "anim") {
						
						//fa.animate(.2);
						fa.blit(0,0,1);//the last param makes it ignore its from offsets during placement, by default it assumes it is a moving object to be displayed offset by its smaller bounding box
						
					} else {
						
						
						fa.blit();
					}
				}
				
			}
			
			if(this.player._veloc.x == 0 ) {
				this.showHeldScenery();
				
			}
		
			var curTile = tabageos.BlitMath.checkTileValueAt(this.player.x + (this.tileWidth/2) ,this.player.y + (this.tileHeight/2) , this.sceneChanger.currentMap,this.tileWidth,this.tileHeight);
			
		
			for ( var door of this._doorUnits ) {
				
				for ( var dtile of door.tiles ) {
					if(this.valuesMatch(dtile, curTile) && this.controller.buttons.b) {
						
						if(door.key && this.heldScenery.length) {
							var hvky = 0;
							for ( var pkey of this.heldScenery ) {
								if(this.valuesMatch(pkey,door.key)) {
									hvky = 1;
									if(door.playerPosition) {
										
										
										this.lastMinutePlayerPosition = new tabageos.MoverPoint(door.playerPosition.x+1-1, door.playerPosition.y+1-1);
										
										
									}
									this.transitionToSceneByDoor(door.level); break; break; break;
									
								}
							}
							if(hvky === 0) {
								this.pTypeString = (door.lockedString ? door.lockedString : "door is locked");
								this.pTypeTime = 5000;
								this.pixelType(this.player.x - 48, this.player.y - 32, this.pTypeString);break; break; break;
							}
							
						} else if (door.key && this.heldScenery.length <= 0) {
							this.pTypeString = (door.lockedString ? door.lockedString : "door is locked");
							this.pTypeTime = 5000;
							this.pTypeMP.x = this.player.x - 48;
							this.pTypeMP.y = this.player.y - 32;
							this.pixelType(this.player.x - 48, this.player.y - 32, this.pTypeString);break; break; break;
							
						} else if (!door.key) {
							if(door.playerPosition) {
								
								this.lastMinutePlayerPosition = new tabageos.MoverPoint(door.playerPosition.x+1-1, door.playerPosition.y+1-1);
								
							}
							this.transitionToSceneByDoor(door.level); break; break; break;
							
						}
						this.controller.buttons.b = 0; 
						break;
					} else if (this.valuesMatch(dtile, curTile)) {
						this.pTypeString = ( door.lockedString ? door.lockedString : (door.key ? "door is locked" : "press e to open door") );
						this.pTypeTime = 1000;
						this.pTypeMP.x = this.player.x - 48;
						this.pTypeMP.y = this.player.y - 32;
						this.pixelType(this.player.x - 48, this.player.y - 32, this.pTypeString);break; break; break;
					}
					
				}
				
				
			}
			
			if(this.npcTypeTime > 0) { var npcer = this.currentNpcTalking;
				if(npcer._currentWords.indexOf("{") != -1) { 
					var propt = npcer._currentWords.match(this.stringProp);
					if(propt) {
						var proptn = propt[0].replace("{", "").replace("}", "");
						var tosay = "";
						if(proptn.indexOf(".") != -1) {
							var dotsep = proptn.split(".");
							tosay = this[dotsep[0]][dotsep[1]];
						} else {
							tosay = this[proptn];
						}
						npcer._currentWords = npcer._currentWords.replace(propt[0], tosay);
					}
				}
				if(this.dialogBoxFromRectangle) {
					this.pixelDialogBox(npcer._currentWords, npcer.x - (npcer.width*3), npcer.y - this.tileHeight*3, npcer.x - (npcer.width*3) + 2, npcer.y - (this.tileHeight*3) + 2, 10, 0, 0, 0,0,this.charLayer, this.dialogBoxFromRectangle, this._image);
				} else {
					this.pixelParagraph(npcer.x - (npcer.width*3), npcer.y - this.tileHeight*3, 12,npcer._currentWords);
				}
				this.npcTypeTime -= 33.3;
			}
			
			
			if(this.pTypeTime > 0) {
				
				this.pixelParagraph(this.pTypeMP.x, this.pTypeMP.y, 10, this.pTypeString);
				this.pTypeTime -= 33.3;
				
			}
		
			this.explosionFactory.displayExplosions(this.charLayer, this._image);
			
			if(this.player.health <= 0) {
				
				this.typePixels("Game Over");
				this.pixelParagraph(this.pTypeMP.x, this.pTypeMP.y, 10, this.pTypeString);
				this.doGameOver();
				
			}
		
		
	}
	
	showHeldScenery() {
		
		var pld = this.playerDefinition;
				this.pixelType(pld && pld.coinsX ? pld.coinsX : this.camera.v.x + 1, pld && pld.coinsY ? pld.coinsY : this.camera.v.y + 32,"coins " + this.coinsCollected);
				//this.useClintBlockFont();
				//show values held
				
				
				var sx = 0;
				for ( var held of this.heldScenery ) {
					this._helperRect.x = Number(held[1]) * this.tileWidth;
					this._helperRect.y = Number(held[0]) * this.tileHeight;
					this._helperRect.width = this.tileWidth;
					this._helperRect.height = this.tileHeight;
					this._helperPoint.x = (pld && pld.sceneryX) ? pld.sceneryX + sx : this.camera.v.x + 1 + sx;
					this._helperPoint.y = (pld && pld.sceneryY) ? pld.sceneryY : this.camera.v.y + 32 + (this.tileHeight - 5);
					if(pld && pld.heldSceneryDrawLayer) {
						this[pld.heldSceneryDrawLayer].copyPixels(this._image, this._helperRect, this._helperPoint,this.tileWidth,this.tileHeight);
					} else {
						this.charLayer.copyPixels(this._image, this._helperRect, this._helperPoint,this.tileWidth,this.tileHeight);
					}
					
					sx += this.tileWidth;
				}
		
	};
	quickStartClick(e) {
		tabageos.GameSkeleton.game.controller.buttons.start = 1;
	};
	
	doGameOver(victory) {
    	this.gameOverContainer.floor.canvas.removeEventListener("click", this.quickStartClick, false);
    	this.gameOverContainer.floor.canvas.addEventListener("click", this.quickStartClick, false);
		
		if(victory) {
			this.gameOverContainer.floor.copyPixels(this._image, this.gameOverVictoryRect,new tabageos.MoverPoint());
		}
		if(!this.basicPlatformer) {
			this.lives = 1;//by default game transitions to the game over screen when player health reaches 0.
		} else {
			//for basicPlatformer, player has 3 lives initially as this.lives, on touch an enemy it resets to the beginning of the level.
			//assumes the player starts over from same initial point defined during construction
			//to change where the player would reset to, change this.playerDefinition.x and .y when you know game over is about to happen.
			if(!this.gameOverPosition) {
				this.player.setX(this.playerDefinition.x || 64);//._pos and .x, _pos is used for force, x for position, force directly effects position, but not without time.
				this.player.setY(this.playerDefinition.y || 32);
			} else { window.console.log("gs " + this.lives);
				this.player.setX(this.gameOverPosition.x+1-1);
				this.player.setY(this.gameOverPosition.y+1-1);
				
			}
			//this.camera.v.x = 0;//reset cameras view
			//this.camera.v.y = 0;
			this.player.health = this.initialHealthLevel || 500;
			this.camera.v.x = (this.player.x - this.camera.v.width) > 0 ? this.player.x - this.camera.v.width + (this.player._canvasAnimation.width/2) : 0;
			//this.camera.v.y = this.player.y - this.camera.v.height + (this.player._canvasAnimation.height) + this.tileHeight;

			this.callCamera(1,0,0, this.player._pos, 0, 1);
			
		}
		this.gameOver(0);//subtracts 1 life and then other things to reset the scene, when lives is 0 transitions to game over screen.
	}
	
};
//version 1.5
export { BasicActionPlatformerGame }
