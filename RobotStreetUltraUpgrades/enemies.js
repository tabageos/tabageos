var gameClasses = gameClasses || {};
(function() {
	
	var centhead;
	
	
	function Centipede() {
		
		
		
		
	}
	
	Centipede.routine = function(en, bullets, mBullets) {
		
		//if( (en.maxSpeed >= 9.1 && en.maxSpeed <= 9.97)) { //centipede
				
				if(en.maxSpeed == 9.1) {//non visible chasing part
					tabageos.GameSkeleton.game._helperPoint.x = tabageos.GameSkeleton.game.player.x - (tabageos.GameSkeleton.game.player._leftRightFace ? -16 : 32);
					tabageos.GameSkeleton.game._helperPoint.y = tabageos.GameSkeleton.game.player.y;
					en.seek(tabageos.GameSkeleton.game._helperPoint);
					centhead = en;
				}
				
				if(en.maxSpeed > 9.1 && centhead) { //the visible parts easeTo where the chasing part is
					//if the visible head were the chasing part the body parts would easeTo it and therefore
					//the whole would never be together.
					//in this manner nice snake like easing of the body is achieved with head always in front.
					
					if(centhead._canvasAnimation.currentAnimation == "left") {
						tabageos.GameSkeleton.game._helperPoint.x = (centhead.x+8) + ( 8 * ((en.maxSpeed-9)*10) );
						tabageos.GameSkeleton.game._helperPoint.y = centhead.y;
						en.easeTo( tabageos.GameSkeleton.game._helperPoint );
					}
					if(centhead._canvasAnimation.currentAnimation == "right") {
						tabageos.GameSkeleton.game._helperPoint.x = (centhead.x+8) - ( 8 * ((en.maxSpeed-9)*10) );
						tabageos.GameSkeleton.game._helperPoint.y = centhead.y;
						en.easeTo( tabageos.GameSkeleton.game._helperPoint );
					}
					
				}
				var bullet;
				if(en.maxSpeed == 9.2  && centhead) {
					en.circleDistance -= 33.3;
					if(en.circleDistance <= 0) {
						if(centhead._canvasAnimation.currentAnimation == "left") {

							if(bullets.length && tabageos.GameSkeleton.game.player.y >= en.y - 24 && tabageos.GameSkeleton.game.player.y < en.y + 24) {
								
								bullet = bullets.pop();
								bullet.health = 8.4;
								bullet.setX(en.x);
								bullet.setY( en.y - 1 );
								bullet._canvasAnimation.currentAnimation = "eyeshot";
								bullet._canvasAnimation.animate(0);
								bullet._veloc.x = -7;
								bullet._veloc.y = 0;
								mBullets.push(bullet);

							}
						}
						
						if(centhead._canvasAnimation.currentAnimation == "right") {
							
							if(bullets.length && tabageos.GameSkeleton.game.player.y >= en.y - 24 && tabageos.GameSkeleton.game.player.y < en.y + 24) {
								
								bullet = bullets.pop();
								bullet.health = 8.4;
								bullet.setX(en.x);
								bullet.setY( en.y - 1);
								bullet._canvasAnimation.currentAnimation = "eyeshot";
								bullet._canvasAnimation.animate(0);
								bullet._veloc.x = 7;
								bullet._veloc.y = 0;
								mBullets.push(bullet);

							}
						}
					
						en.circleDistance = 750;
					}
				}
				
			//}
		
		
		
	}
	
	
	gameClasses.Centipede = Centipede;
	
	function MissileShooter() {
		
		
		
	}
	
	
	MissileShooter.routine = function(en,bullets,mBullets) { var bullet;
				if(tabageos.GeometricMath.testForPointInCircle(en._pos,48,tabageos.GameSkeleton.game.player._pos)) {
					
					en.maxSpeed = 1.2;
					
				} else {
					
					en.maxSpeed = 12;
					en.chase(tabageos.GameSkeleton.game.player);
					
				}
			
				en.circleDistance -= 33.3;
				if(en.circleDistance <= 0) {
					if(tabageos.GameSkeleton.game.player.x < en.x && !en._leftRightFace) {
						
						if(bullets.length && tabageos.GeometricMath.testForPointInCircle(en._pos,128,tabageos.GameSkeleton.game.player._pos)) {
							
							bullet = bullets.pop();
							bullet.health = 8.4;
							bullet.setX(en.x);
							bullet.setY(en.y - 1);
							bullet._canvasAnimation.currentAnimation = "shotleft";
							bullet._canvasAnimation.animate(0);
							bullet._veloc.x = -7;
							bullet._veloc.y = 0;
							mBullets.push(bullet);
						}
					}
					if(tabageos.GameSkeleton.game.player.x > en.x+16 && en._leftRightFace) {
						
						if(bullets.length && tabageos.GeometricMath.testForPointInCircle(en._pos,128,tabageos.GameSkeleton.game.player._pos)) {
							
							bullet = bullets.pop();
							bullet.health = 8.4;
							bullet.setX(en.x + 15);
							bullet.setY(en.y - 1);
							bullet._canvasAnimation.currentAnimation = "shotright";
							bullet._canvasAnimation.animate(0);
							bullet._veloc.x = 7;
							bullet._veloc.y = 0;
							mBullets.push(bullet);
						}
					}
					en.circleDistance = 750;
					
				}
		
		
	};
	gameClasses.MissileShooter = MissileShooter;
	
	
	
	function EnemyDetails() {
		
		
		
	};
	EnemyDetails.centChaserPart = function(e, enemies) {
		var en, ena;
		//centipede invisible chaser in front
			//because it chases quicker than the body would catch up to it while easing
			//without this the head would get too far away from the body while chasing
			//this is done to maintain the close slinky effect when it changes direction.
			//it's invisible but the CanvasAnimation still switches left or right and stuf is done based on that.
			ena = new tabageos.CanvasAnimation(tabageos.GameSkeleton.game._image, tabageos.GameSkeleton.game.charLayer,null,0,0,16,16);
			ena.animationSpecs = {
				"left":[0,[0,0]],
				"right":[0,[0,0]]
			};
			ena.currentAnimation = "left";
			en = new tabageos.MapTraveler(e.x,e.y,16,16,tabageos.GameSkeleton.game.sceneChanger.currentMap,ena);
			en.walkSpeed = 2;
			en.maxSpeed = 9.1;
			en.maxForce = 25;
			en.easeProximity = 1;
			en.separationDistance = 8;
			en.personalSpace = 8;
			en.health = 9999999;
			en._wallObject = new tabageos.Rectangle(16,16,1280-32,800-16);
			enemies.push(en);
		
		
	};
	EnemyDetails.centBodyPart = function(e, enemies, bodyparts) {
		
		//centipede body parts
		var en, ena;
			ena = new tabageos.CanvasAnimation(tabageos.GameSkeleton.game._image, tabageos.GameSkeleton.game.charLayer,null,0,0,16,16);
			ena.animationSpecs = bodyparts == 2 ? { //head
				"left":[81, [3,81,3,81,3,81,3,81,4,81,4,81,4,81,4,81,5,81,5,81,5,81,5,81,6,81,6,81,6,81,6,81] ],
				"right":[77, [3,77,3,77,3,77,3,77,4,77,4,77,4,77,4,77,5,77,5,77,5,77,5,77,6,77,6,77,6,77,6,77] ],
				"up":[79, [3,79,3,79,3,79,3,79,4,79,4,79,4,79,4,79,5,79,5,79,5,79,5,79,6,79,6,79,6,79,6,79] ],
				"down":[83, [3,83,3,83,3,83,3,83,4,83,4,83,4,83,4,83,5,83,5,83,5,83,5,83,6,83,6,83,6,83,6,83] ] 
			} : { //body
				"left":[89, [3,89,3,89,3,89,3,89,4,89,4,89,4,89,4,89,5,89,5,89,5,89,5,89,6,89,6,89,6,89,6,89] ],
				"right":[85, [3,85,3,85,3,85,3,85,4,85,4,85,4,85,4,85,5,85,5,85,5,85,5,85,6,85,6,85,6,85,6,85] ],
				"up":[87, [3,87,3,87,3,87,3,87,4,87,4,87,4,87,4,87,5,87,5,87,5,87,5,87,6,87,6,87,6,87,6,87] ],
				"down":[91, [3,91,3,91,3,91,3,91,4,91,4,91,4,91,4,91,5,91,5,91,5,91,5,91,6,91,6,91,6,91,6,91] ] 
			};
			
			ena.currentAnimation = "left";
			en = new tabageos.MapTraveler(e.x,e.y,16,16,tabageos.GameSkeleton.game.sceneChanger.currentMap,ena);
			en.walkSpeed = 2;
			en.maxSpeed = 9 + (bodyparts*.1);
			en.maxForce = 25;
			en.easeProximity = 1;
			en.separationDistance = 8;
			en.personalSpace = 8;
			en.bird = 1000;
			en.health = bodyparts == 2 ? 750 : 200;
			en._wallObject = new tabageos.Rectangle(16,16,1280-32,800-16);
			enemies.push(en);
		
		
	};
	EnemyDetails.shooter = function(e,enemies) {
		
		var en,ena;
		ena = new tabageos.CanvasAnimation(tabageos.GameSkeleton.game._image, tabageos.GameSkeleton.game.charLayer,null,0,0,16,16);
			ena.animationSpecs = {
				"left":[34, [39,34,39,34,39,34,39,34,38,34,38,34,38,34,38,34] ],
				"right":[34, [26,34,26,34,26,34,26,34,27,34,27,34,27,34,27,34] ]
			};
			ena.currentAnimation = "left";
			en = new tabageos.MapTraveler(e.x,e.y,16,16,tabageos.GameSkeleton.game.sceneChanger.currentMap,ena);
			en.walkSpeed = 1;
			en.maxSpeed = 1.2;
			en.maxForce = 5;
			en.bird = 500;
			en.separationDistance = 12.5;
			en.health = 285;
			en._wallObject = new tabageos.Rectangle(16,16,1280-32,800-16);
			enemies.push(en);
		
	};
	EnemyDetails.beetle = function(e,enemies) {
		var en,ena;
		ena = new tabageos.CanvasAnimation(tabageos.GameSkeleton.game._image, tabageos.GameSkeleton.game.charLayer,null,0,0,16,16);
			ena.animationSpecs = {
				"right":[24,[12,24,13,24,14,24,15,24]],
				"left":[24,[22,24,21,24,20,24,19,24]]
			};
			ena.currentAnimation = "left";
			en = new tabageos.MapTraveler(e.x,e.y,16,16,tabageos.GameSkeleton.game.sceneChanger.currentMap,ena);
			en.walkSpeed = 1;
			en.maxSpeed = 1;
			en.maxForce = 2;
			en.separationDistance = 17;
			en.bird = 50;
			en.health = 10;
			en._wallObject = new tabageos.Rectangle(16,16,1280-32,800-16);
			enemies.push(en);
		
	};
	EnemyDetails.hornet = function(e,enemies) {var en,ena;
		ena = new tabageos.CanvasAnimation(tabageos.GameSkeleton.game._image, tabageos.GameSkeleton.game.charLayer,null,0,0,16,16);
			ena.animationSpecs = {
				"right":[33,[7,33,8,33,10,33,11,33,13,33,14,33,16,33,17,33]],
				"left":[33,[17,36,16,36,14,36,13,36,11,36,10,36,8,36,7,36]]
			};
			ena.currentAnimation = "left";
			en = new tabageos.MapTraveler(e.x,e.y,16,16,tabageos.GameSkeleton.game.sceneChanger.currentMap,ena);
			en.walkSpeed = 2;
			en.maxSpeed = 2;
			en.maxForce = 3;
			en.separationDistance = 24;
			en.bird = 80;
			en.health = 15;
			en._wallObject = new tabageos.Rectangle(16,16,1280-32,800-16);
			enemies.push(en);
	};
	EnemyDetails.otherBug = function(e,enemies) {var en,ena;
		ena = new tabageos.CanvasAnimation(tabageos.GameSkeleton.game._image, tabageos.GameSkeleton.game.charLayer,null,0,0,16,16);
			ena.animationSpecs = {
				"right":[33,[1,27,2,27,3,27,4,27]],
				"left":[33,[10,27,9,27,8,27,7,27]]
			};
			ena.currentAnimation = "left";
			en = new tabageos.MapTraveler(e.x,e.y,16,16,tabageos.GameSkeleton.game.sceneChanger.currentMap,ena);
			en.walkSpeed = 1;
			en.maxSpeed = 2;
			en.maxForce = 2;
			en.separationDistance = 17;
			en.bird = 100;
			en.health = 30;
			en._wallObject = new tabageos.Rectangle(16,16,1280-32,800-16);
			enemies.push(en);
	};
	
	EnemyDetails.car = function(e,enemies) {
		
		var en,ena;
		ena = new tabageos.CanvasAnimation(tabageos.GameSkeleton.game._image, tabageos.GameSkeleton.game.charLayer,null,0,0,16,16);
			ena.animationSpecs = {"right":[33,[47,33,47,33]],"left":[33,[51,33,51,33]]};
			ena.fromWidthOffset = 16;
			ena.fromHeightOffset = 16;
			ena.currentAnimation = "left";
			en = new tabageos.MapTraveler(e.x,e.y,16,16,tabageos.GameSkeleton.game.sceneChanger.currentMap,ena);
			en.walkSpeed = 5;
			en.maxSpeed = 7;
			en.maxForce = 4;
			en.separationDistance = 18;
			en.bird = 150;
			en.health = 120;
			en._wallObject = new tabageos.Rectangle(16,16,1280-32,800-16);
			enemies.push(en);
		
	};
	
	
	
	
	gameClasses.EnemyDetails = EnemyDetails;
	
})();