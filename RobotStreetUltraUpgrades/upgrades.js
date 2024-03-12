var gameClasses = gameClasses || {};
(function() {
	
	let upgradeMarks = [500, 2000, 4000, 7000, 10000, 12000, 15000, 18000, 21000, 40000, 55000, 300, 1000, 5000, 1000, 3000, 2000, 2000, 10000, 1000, 5000, 8500, 17000];
	let gunUpgradeOrder = ["gun2", "gun3", "gun4", "gun5", "gun7", "gun8", "gun10", "gun12", "gun9", "gun11", "gun13", 
	"buyHealth","buyOneStrength","buyFiveStrength", "coinMultiPlusOne", "coinMultiPlusThree", "buyStamina", "buySpeed", "buyForcefield", "buy10Grenades", "buy50Grenades", "getSlowLight", "getFireLight"];
	
	let upLocations = [new tabageos.Rectangle(496,1360,144,64), new tabageos.Rectangle(496,1424,144,64), new tabageos.Rectangle(496,1488,144,64), 
	new tabageos.Rectangle(496,1552,144,64), new tabageos.Rectangle(496,1616,144,64), new tabageos.Rectangle(496,1680,144,64), 
	new tabageos.Rectangle(640,1360,144,64), new tabageos.Rectangle(640,1424,144,64), new tabageos.Rectangle(640,1488,144,64),
	new tabageos.Rectangle(640,1552,144,64), new tabageos.Rectangle(640,1616,144,64), 
	
	new tabageos.Rectangle(336,1680,144,64), new tabageos.Rectangle(640,1680,144,64), new tabageos.Rectangle(192,1616,144,64),
	new tabageos.Rectangle(192,1680,144,64), new tabageos.Rectangle(336,1616,144,64), new tabageos.Rectangle(48,1616,144,64), new tabageos.Rectangle(48,1680,144,64),
	new tabageos.Rectangle(496,1296,144,64), new tabageos.Rectangle(640,1296,144,64), new tabageos.Rectangle(640,1232,144,64), new tabageos.Rectangle(464,1056,144,64), new tabageos.Rectangle(464,1136,144,64) ];
	
	let upgradeTween = tabageos.TweenMath.tweenArray(-70, 68, 1200, "OutBounce");
	let currentGunUpgrade = 0;
	let ofThree = 1;
	let random1 = 11;
	let random2 = 12;
	
	let bulletStrength = 3;
	let bulletSpeed = 1000;//700, 500, 400, 300, 200, 100
	
	let currentGun = "pistol";
	let baseStrength = 1;
	let cspeed = 4;
	let ran1Point;
	let ran2Point;
	let threePoint;
	
	let coindisplay;
	let healthBarer;
	
	let coinMultiplier = 1;
	let stamina = 0.2;
	let haveForceField = 0;
	let grenades = 0;
	let enemyTypeMax = 1;
	let spawnTimeOver = 4000;
	
	let afterGuns = 35000;
	
	
	let rightGunFace = new tabageos.Rectangle(912,80,96,96);
	let leftGunFace = new tabageos.Rectangle(1056,80,96,96);
	
	let p2rGunFace = new tabageos.Rectangle(912,176,96,96);
	let p2lGunFace = new tabageos.Rectangle(1056,176,96,96);
	
	let p3rGunFace = new tabageos.Rectangle(912,272,96,96);
	let p3lGunFace = new tabageos.Rectangle(1056,272,96,96);
	
	let p4rGunFace = new tabageos.Rectangle(912,368,96,96);
	let p4lGunFace = new tabageos.Rectangle(1056,368,96,96);
	
	let p5rGunFace = new tabageos.Rectangle(912,464,96,96);
	let p5lGunFace = new tabageos.Rectangle(1056,464,96,96);
	
	let p6rGunFace = new tabageos.Rectangle(912,560,96,96);
	let p6lGunFace = new tabageos.Rectangle(1056,560,96,96);
	
	let p7rGunFace = new tabageos.Rectangle(912,1216,96,96);
	let p7lGunFace = new tabageos.Rectangle(1056,1216,96,96);
	
	let p8rGunFace = new tabageos.Rectangle(912,1312,96,96);
	let p8lGunFace = new tabageos.Rectangle(1056,1312,96,96);
	
	let p9rGunFace = new tabageos.Rectangle(912,1408,96,96);
	let p9lGunFace = new tabageos.Rectangle(1056,1408,96,96);
	
	let p10rGunFace = new tabageos.Rectangle(912,1504,96,96);
	let p10lGunFace = new tabageos.Rectangle(1056,1504,96,96);
	
	let p11rGunFace = new tabageos.Rectangle(912,1600,96,96);
	let p11lGunFace = new tabageos.Rectangle(1056,1600,96,96);
	
	let p12rGunFace = new tabageos.Rectangle(912,464,96,96);
	let p12lGunFace = new tabageos.Rectangle(1056,464,96,96);
	
	let gun = null;
	let lightFromRect = new tabageos.Rectangle(1440,0,960,608);
	
	function RSUpgrades(cd,hb, gn) {
		
		this.propsReset(cd,hb,gn);
		this.usingRectLeft = null;
		this.usingRectRight = null;
		this.haveForceField = 0;
		this.autoAim = 1;
		
	}
	
	RSUpgrades.prototype.propsReset = function(cd,hb,gn) {
		coindisplay = cd;
		healthBarer = hb;
		gun = gn;
	};
	
	RSUpgrades.prototype.usingRectLeft = null;
	RSUpgrades.prototype.usingRectRight = null;
	RSUpgrades.prototype.coinsCollected = 0;
	RSUpgrades.prototype.haveForceField = 0;
	RSUpgrades.prototype.autoAim = 1;
	RSUpgrades.prototype.upgradeTime = 0;
	
	
	RSUpgrades.prototype.reset = function() {
		
		gun = 0;
		coindisplay = 0;
		tabageos.GameSkeleton.game.turnOnFireLight(1);
		tabageos.GameSkeleton.game.turnOnSlowLight(1);
		healthBarer = 0;
		this.coinsCollected = 0;
		this.haveForceField = 0;
		this.upgradeTime = 0;
		
		enemyTypeMax = 1;
		coinMultiplier = 1;
		baseStrength = 1;
		stamina = 0.2;
		cspeed = 4;
		bulletStrength = 3;
		bulletSpeed = 1000;
		grenades = 0;
		this.usingRectLeft = leftGunFace;
		this.usingRectRight = rightGunFace;
		ran1Point = null;
		ran2Point = null;
		threePoint = null;
		currentGunUpgrade = 0;
		currentGun = "pistol";
		upgradeMarks = [500, 2000, 4000, 7000, 10000, 12000, 15000, 18000, 21000, 40000, 55000, 300, 1000, 5000, 1000, 3000, 2000, 2000, 10000, 1000, 5000, 8500, 17000];
	};
	RSUpgrades.prototype._sentCent = 0;
	
	RSUpgrades.prototype.getEnemyTypeMax = function(wantedr) {
		if(wantedr >= 6 && enemyTypeMax >= 6 && this._sentCent < 3) {
			this._sentCent += 1;enemyTypeMax = 7;
		} else {
			if(enemyTypeMax >= 7) {
				enemyTypeMax = 5;
			}
		}
		return Math.floor(enemyTypeMax);
	};
	RSUpgrades.prototype.getSpawnTimeOver = function() {
		return spawnTimeOver;
	};
	RSUpgrades.prototype.getCoinMultiplier = function() {
		return coinMultiplier;
	};
	RSUpgrades.prototype.getBaseStrength = function() {
		return baseStrength;
	};
	RSUpgrades.prototype.getGrenades = function() {
		return grenades;
	};
	RSUpgrades.prototype.setGrenades = function(toThis) {
		grenades = toThis;
	};
	RSUpgrades.prototype.getStamina = function() {
		return stamina;
	};
	RSUpgrades.prototype.getSpeed = function() {
		return cspeed;
	};
	RSUpgrades.prototype.getBulletStrength = function() {
		return bulletStrength;
	};
	RSUpgrades.prototype.getBulletSpeed = function() {
		return bulletSpeed;
	};
	
	RSUpgrades.prototype.showStats = function() {
		
		let strstam = String(stamina).indexOf(".") != -1 ? ( String(stamina).split(".")[0]  + "-" + String(stamina).split(".")[1].charAt(0) ) : String(stamina);
		i = 0;let nxu;
		for(i; i < upgradeMarks.length; i++) {
			if(upgradeMarks[i] > 0) {
				nxu = upgradeMarks[i]; break;
			}
		}
		
		let nxtup = upgradeMarks[10] == -3 ? "every so often at 10k" : String(upgradeMarks[0] == -3 ? 1000 : nxu);
		
		tabageos.GameSkeleton.game.pixelParagraph(tabageos.GameSkeleton.game.camera.v.x + 18, tabageos.GameSkeleton.game.camera.v.y+16, 10, "gun: "+ currentGun+".strength: "+ baseStrength +".stamina: "+strstam +".coin multi: "+ coinMultiplier+".speed: "+cspeed+".grenades: "+grenades+".next upgrade: "+nxtup); 
		
	}
	
	RSUpgrades.prototype.determineUpgrades = function() {
		
		let ci = 0; let cl = upgradeMarks.length;
			for(ci; ci < cl; ci++) {
				if(ci <= 10 && upgradeMarks[ci] > 0 && this.coinsCollected >= upgradeMarks[ci]) {
					
					currentGunUpgrade = ci+1-1;
					ofThree = 1;
					upgradeTween = tabageos.TweenMath.tweenArray(-70, 68, 500, "OutBounce");
					this.randomUpgradeSelections();this.upgradeTime = window.performance.now();
					tabageos.GameSkeleton.game.levelComplete(this.showUpgrades);
					break; return;	
				}
				
			}
			
			if(upgradeMarks[0] == -3 && upgradeMarks[1] > 0 && this.coinsCollected >= 1000) {
				
				currentGunUpgrade = 19;
					ofThree = 1;
					upgradeTween = tabageos.TweenMath.tweenArray(-70, 68, 500, "OutBounce");
					this.randomUpgradeSelections();
					upgradeMarks[0] = -4;this.upgradeTime = window.performance.now();
					tabageos.GameSkeleton.game.levelComplete(this.showUpgrades);
					return;	
				
				
			}
			
			if(upgradeMarks[10] == -3 && this.coinsCollected >= 10000) {
				afterGuns -= 33.3;
				if(afterGuns <= 0) {
				
					currentGunUpgrade = 11 + Math.round(Math.random() * 4.5);
					ofThree = 1;
					upgradeTween = tabageos.TweenMath.tweenArray(-70, 68, 500, "OutBounce");
					this.randomUpgradeSelections();
					afterGuns = 55000;this.upgradeTime = window.performance.now();
					tabageos.GameSkeleton.game.levelComplete(this.showUpgrades);
					return;
				
				}
				
			}
		
		
		
	};
	
	RSUpgrades.prototype.gun2 = function(e) {//pistol two
		
		this.usingRectLeft = p2lGunFace;
		this.usingRectRight = p2rGunFace;
		bulletSpeed = 750;
		bulletStrength = 2;
		this.coinsCollected -= 500;
		this.gunBulletAni([3,6]);
		currentGun = "pistol two";
		this.endUpgrade();
		
	};
	
	RSUpgrades.prototype.gun3 = function(e) {//mini machine gun
		this.usingRectLeft = p3lGunFace;
		this.usingRectRight = p3rGunFace;
		bulletSpeed = 750;
		bulletStrength = 4;
		this.coinsCollected -= 2000;this.gunBulletAni([7,6]);
		currentGun = "mini machine gun";
		this.endUpgrade();
	};
	RSUpgrades.prototype.gunBulletAni = function(value) {
		let i = 0;let b;
		for(i; i < gun.bulletHolder.length; i++) {
			b = gun.bulletHolder[i];
			b._canvasAnimation.animationSpecs = {
				"shot":[0,value]
			};
			b._canvasAnimation.currentAnimation = "shot";
			b._canvasAnimation.animate(0);
		}
		
	};
	RSUpgrades.prototype.gun4 = function(e) { //shotgun
		this.usingRectLeft = p4lGunFace;
		this.usingRectRight = p4rGunFace;
		bulletSpeed = 690;
		this.gunBulletAni([6,6]);
		
		bulletStrength = 6;
		this.coinsCollected -= 4000;currentGun = "shotgun";
		this.endUpgrade();
	};
	RSUpgrades.prototype.gun5 = function(e) {//machine gun
		this.usingRectLeft = p5lGunFace;
		this.usingRectRight = p5rGunFace;
		bulletSpeed = 760;
		this.gunBulletAni([7,6]);
		
		bulletStrength = 8;
		this.coinsCollected -= 7000;currentGun = "machine gun";
		this.endUpgrade();
	};
	RSUpgrades.prototype.gun7 = function(e) {//big auto gun
		this.usingRectLeft = p7lGunFace;
		this.usingRectRight = p7rGunFace;
		bulletSpeed = 750;
		this.gunBulletAni([7,6]);
		
		bulletStrength = 9;
		this.coinsCollected -= 10000;currentGun = "big auto gun";
		this.endUpgrade();
	};
	RSUpgrades.prototype.gun8 = function(e) {//riffle
		this.usingRectLeft = p8lGunFace;
		this.usingRectRight = p8rGunFace;
		bulletSpeed = 800;
		this.gunBulletAni([3,6]);
		
		bulletStrength = 9.5;
		this.coinsCollected -= 12000;currentGun = "riffle";
		this.endUpgrade();
	};
	RSUpgrades.prototype.gun9 = function(e) {//shotgun two
		this.usingRectLeft = p9lGunFace;
		this.usingRectRight = p9rGunFace;
		bulletSpeed = 710;
		this.gunBulletAni([6,6]);
		
		bulletStrength = 11;
		this.coinsCollected -= 21000;currentGun = "shotgun two";
		this.endUpgrade();
	};
	RSUpgrades.prototype.gun10 = function(e) {//auto riffle
		this.usingRectLeft = p10lGunFace;
		this.usingRectRight = p10rGunFace;
		bulletSpeed = 850;
		this.gunBulletAni([7,6]);
		
		bulletStrength = 10;
		this.coinsCollected -= 15000;currentGun = "auto riffle";
		this.endUpgrade();
	};
	RSUpgrades.prototype.gun11 = function(e) {//light mini cannon
		this.usingRectLeft = p11lGunFace;
		this.usingRectRight = p11rGunFace;
		bulletSpeed = 700;
		this.gunBulletAni([7,6]);
		
		bulletStrength = 14;
		this.coinsCollected -= 40000;currentGun = "light mini cannon";
		this.endUpgrade();
	};
	RSUpgrades.prototype.gun12 = function(e) {//ultra uzi
		this.usingRectLeft = p12lGunFace;
		this.usingRectRight = p12rGunFace;
		bulletSpeed = 800;
		this.gunBulletAni([7,6]);
		
		bulletStrength = 11;
		this.coinsCollected -= 18000;currentGun = "ultra uzi";
		this.endUpgrade();
	};
	RSUpgrades.prototype.gun13 = function(e) {
		this.usingRectLeft = p6lGunFace;
		this.usingRectRight = p6rGunFace;
		bulletSpeed = 780;
		this.gunBulletAni([5,6]);
		
		bulletStrength = 20;
		this.coinsCollected -= 55000;currentGun = "the ultra gun";
		this.endUpgrade();
	};
	
	RSUpgrades.prototype.endUpgrade = function() {
		
		tabageos.GameSkeleton.game.removeButton("ranUpOne");
		tabageos.GameSkeleton.game.removeButton("ranUpTwo");
		tabageos.GameSkeleton.game.removeButton("mainUp");
		tabageos.GameSkeleton.game.trashButton("ranUpOne");
		tabageos.GameSkeleton.game.trashButton("ranUpTwo");
		tabageos.GameSkeleton.game.trashButton("mainUp");
		ran1Point = null;
		ran2Point = null;
		threePoint = null;
		coindisplay.innerText = this.coinsCollected + "";
		
		tabageos.GameSkeleton.game._doAlternate = 0;
		
		
	};
	
	RSUpgrades.prototype.buyHealth = function() {
		
		if(tabageos.GameSkeleton.game.player.health + 300 < 500) {
			tabageos.GameSkeleton.game.player.health += 300;
		} else {
			tabageos.GameSkeleton.game.player.health = 500;
		}
		
		healthBarer.style.width = Math.round(tabageos.GameSkeleton.game.player.health / 9.8)+ "px";
		this.coinsCollected -= 300;
		this.endUpgrade();
	};
	RSUpgrades.prototype.buyOneStrength = function() {
		
		baseStrength += 1;
		this.coinsCollected -= 1000;
		this.endUpgrade();
	};
	RSUpgrades.prototype.buyFiveStrength = function() {
		
		baseStrength += 5;
		this.coinsCollected -= 5000;
		this.endUpgrade();
	};
	RSUpgrades.prototype.coinMultiPlusOne = function() {
		coinMultiplier += 1;
		this.coinsCollected -= 1000;
		this.endUpgrade();
	};
	RSUpgrades.prototype.coinMultiPlusThree = function() {
		coinMultiplier += 3;
		this.coinsCollected -= 3000;
		this.endUpgrade();
	};
	RSUpgrades.prototype.buyStamina = function() {
		
		stamina += .2;
		this.coinsCollected -= 2000;
		this.endUpgrade();
	};
	RSUpgrades.prototype.buySpeed = function() {
		
		cspeed += 1;
		tabageos.GameSkeleton.game.player._walkSpeed = cspeed +1-1;
		this.coinsCollected -= 2000;
		this.endUpgrade();
	};
	RSUpgrades.prototype.buyForcefield = function() {
		this.haveForceField = 1;
		this.coinsCollected -= 10000;
		this.endUpgrade();
	};
	RSUpgrades.prototype.buy10Grenades = function() {
		grenades += 10;
		this.coinsCollected -= 1000;
		
		this.endUpgrade();
		tabageos.GameSkeleton.game.baughtGrenades();
	};
	RSUpgrades.prototype.buy50Grenades = function() {
		grenades += 50;
		this.coinsCollected -= 5000;
		this.endUpgrade();
	};
	
	RSUpgrades.prototype.getSlowLight = function() {
		tabageos.GameSkeleton.game.turnOnSlowLight();
		this.coinsCollected -= 8500;
		this.endUpgrade();
	};
	RSUpgrades.prototype.getFireLight = function() {
		tabageos.GameSkeleton.game.turnOnFireLight();
		this.coinsCollected -= 17000;
		this.endUpgrade();
	};
	
	RSUpgrades.prototype.randomUpgradeSelections = function() { 
		//sets the index of which upgrades to randomly show
		//pick two of the 8 upgrades at random, and the higher upgrades only when conditions are met 
		//and speed and stamina are capped after upgrading them so much those wont appear
		
		random1 = 11 + Math.round(Math.random() * 12);
		while(random1 == 16 && stamina >= 2.8) {//if stamina is already the max, it cant be 16 which is the stamina upgrade
			random1 = 11 + Math.round(Math.random() * 12);
		}
		
		while(random1 == 17 && cspeed >= 10) {//if speed is already at the max
			random1 = 11 + Math.round(Math.random() * 12);
		}
		while(random1 == 18 && this.coinsCollected < 15000) {//forcield available at random when player has 15000 or more coins
			random1 = 11 + Math.round(Math.random() * 12);
		}
		
		while( (random1 == 19  || random1 >= 20) && this.coinsCollected < 7000 ) {
			random1 = 11 + Math.round(Math.random() * 12);
		}
		
		random2 = 11 + Math.round(Math.random() * 12);//make sure random2 is not the same and also all conditions
		while( random2 == random1 || (cspeed >= 10 && random2 == 17) || (stamina >= 2.8 && random2 == 16) || (random2 == 18 && this.coinsCollected < 15000) || ((random2 == 19 || random2 >= 20) && this.coinsCollected < 7000) ) {
			random2 = 11 + Math.round(Math.random() * 12);
		}
		
		if(random1 > 22) random1 = 22;
		if(random2 > 22) random2 = 22;
		
		
	};
	
	RSUpgrades.prototype.checkCoinsAndUpgrade = function(index, isGun) {
		
		if(this.coinsCollected >= upgradeMarks[index]) {
			
			this[gunUpgradeOrder[index]]();
			if(isGun) {
				if(coinMultiplier == 1) {
					coinMultiplier = 3;
				}
				upgradeMarks[currentGunUpgrade] = -3;
				
				if(enemyTypeMax < 7) {
					enemyTypeMax += (enemyTypeMax >= 4 ? .3 : 1);
					if(spawnTimeOver >= 850) {
						spawnTimeOver -= 450;
					}
				}	
			}
			
		} else {
			
			//tabageos.GameSkeleton.game.playSound("error");
			
		}
	};
	
	RSUpgrades.prototype.showUpgrades = function(ts) {
		
		let ths = tabageos.GameSkeleton.game;
		tabageos.GameSkeleton.game.callCamera(ts);
		
		ths.applyLights();
		ths._actualApplyLights();
		
		
		if(ran1Point) {
			ths.cameraLayer.copyPixels(ths._image, upLocations[random1], ran1Point);
		}
		if(ran2Point) {
			ths.cameraLayer.copyPixels(ths._image, upLocations[random2], ran2Point);
		}
		if(threePoint) {
			ths.cameraLayer.copyPixels(ths._image, upLocations[currentGunUpgrade], threePoint);
		}
		
		if(ofThree == 1) {
			
			if(upgradeTween.length) {
				
				ths._helperPoint.x = 1;
				ths._helperPoint.y = upgradeTween.shift();
				ths.cameraLayer.copyPixels(ths._image, upLocations[random1], ths._helperPoint);
				if(!upgradeTween.length)  ran1Point = ths._helperPoint.clone();
			} else {
				ran1Point = ths._helperPoint.clone();
				upgradeTween = tabageos.TweenMath.tweenArray(-70, 68, 500, "OutBounce");
				ofThree = 2;
				
			}
			
		}
		
		if(ofThree == 2) {
			
			if(upgradeTween.length) {
				
				ths._helperPoint.x = 320 - 144;
				ths._helperPoint.y = upgradeTween.shift();
				ths.cameraLayer.copyPixels(ths._image, upLocations[random2], ths._helperPoint);
				if(!upgradeTween.length)  ran2Point = ths._helperPoint.clone();
				
				
			} else {
				ran2Point = ths._helperPoint.clone();
				upgradeTween = tabageos.TweenMath.tweenArray(-70, 68-32, 500, "OutBounce");
				ofThree = 3;
				
			}
			
		}
		
		if(ofThree == 3) {
			
			if(upgradeTween.length) {
				
				ths._helperPoint.x = 88;
				ths._helperPoint.y = upgradeTween.shift();
				ths.cameraLayer.copyPixels(ths._image, upLocations[currentGunUpgrade], ths._helperPoint);
				
				if(!upgradeTween.length)  threePoint = ths._helperPoint.clone();
				
			} else {
				threePoint = ths._helperPoint.clone();
				ofThree = 4;
				
			}
			
		}
		
		if(ofThree == 4) {
			
			ths.makeButton("ranUpOne", 1,68,96, 64, "tabageos.GameSkeleton.game.checkCoinsAndUpgrade("+random1+")",gunUpgradeOrder[random1]);
			ths.makeButton("ranUpTwo", 320-96,68,96, 64, "tabageos.GameSkeleton.game.checkCoinsAndUpgrade("+random2+")",gunUpgradeOrder[random2]);
			let isGun = (currentGunUpgrade == 19 || upgradeMarks[10] == -3) ? "0" : "1";
			ths.makeButton("mainUp", 88,68-32,144, 56, "tabageos.GameSkeleton.game.checkCoinsAndUpgrade("+(currentGunUpgrade)+","+isGun+")",gunUpgradeOrder[currentGunUpgrade]);
			ofThree = 5;
			
		}
		
		if(ofThree == 5) {
			
			ths.appendButton("ranUpOne");
			ths.appendButton("ranUpTwo");
			ths.appendButton("mainUp");
			ofThree = 6;
			
		}
		
		
		
		
	};

	gameClasses.RSUpgrades = RSUpgrades;
	
	
	let p1 = new tabageos.MoverPoint();
	let p2 = new tabageos.MoverPoint();
	let p3 = new tabageos.MoverPoint();
	let p4 = new tabageos.MoverPoint();
	let p5 = new tabageos.MoverPoint();
	
	
	function RSGrenade(bullet) {
		
		this.bullet = bullet;
		this.bullet.health = 101;
		this.bullet._canvasAnimation.animationSpecs = {
			"grenadeshot":[0,[2,3,3,3,4,3,5,3,6,3,7,3,8,3,9,3]]
		};
		this.bullet._canvasAnimation.currentAnimation = "grenadeshot";
		
		this.bullet.path = tabageos.GeometricMath.getArcCurvePath( this.bullet._pos, this.bullet._pos.addBy(this.bullet._veloc.x*4,this.bullet._veloc.y*8,1), this.bullet._pos.addBy(this.bullet._veloc.x*8, 0, 1), 50 );
		
		
	};
	RSGrenade.prototype.bullet = null; 
	
	RSGrenade.prototype.bulletRoutine = function() {
		this.bullet.followPath(this.bullet.path,0);//change velocity and foreApplier
		this.bullet.update();//change x y location based on velocity
		this.bullet.path.shift();
		this.bullet._canvasAnimation.matchPosition(this.bullet);
		this.bullet._canvasAnimation.animate();
		this.bullet._canvasAnimation.blit();
	};
	
	RSGrenade.prototype.explosionRoutine = function(exF, enemies) {
		
		p1.x = this.bullet.x; p1.y = this.bullet.y;
		p2.x = this.bullet.x-48; p2.y = this.bullet.y;
		p3.x = this.bullet.x+48; p3.y = this.bullet.y;
		p4.x = this.bullet.x; p4.y = this.bullet.y - 48;
		p5.x = this.bullet.x; p5.y = this.bullet.y + 48;
		
		exF.addExplosion(p1.x,p1.y);tabageos.GameSkeleton.game.playSound("explo");
		exF.addExplosion(p2.x,p2.y);tabageos.GameSkeleton.game.playSound("explo");
		exF.addExplosion(p3.x,p3.y);tabageos.GameSkeleton.game.playSound("explo");
		exF.addExplosion(p4.x,p4.y);tabageos.GameSkeleton.game.playSound("explo");
		exF.addExplosion(p5.x,p5.y);tabageos.GameSkeleton.game.playSound("explo");
		
		let i = 0; let e;
		
		for(i; i < enemies.length; i++) {
			e = enemies[i];
			if(tabageos.GeometricMath.testForPointInCircle(p1,32,e._pos)) {
				e.health -= 350;
			}
			if(tabageos.GeometricMath.testForPointInCircle(p2,32,e._pos)) {
				e.health -= 350;
			}
			if(tabageos.GeometricMath.testForPointInCircle(p3,32,e._pos)) {
				e.health -= 350;
			}
			if(tabageos.GeometricMath.testForPointInCircle(p4,32,e._pos)) {
				e.health -= 350;
			}
			if(tabageos.GeometricMath.testForPointInCircle(p5,32,e._pos)) {
				e.health -= 350;
			}
			
		}
	};
	
	gameClasses.RSGrenade = RSGrenade;
	
	
})();