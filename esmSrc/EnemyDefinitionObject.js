import { Rectangle } from './Rectangle.js';

	'use strict';
	function EnemyDefinitionObject(enemyRoutine) {

		this.enemyRoutine = enemyRoutine || null;

	};
	EnemyDefinitionObject.prototype.exampleEnemy =  {
				tileValue : [9017217,9917717],  
				width : 16,
				height : 16,
				animationSpecs: { 
					"left":[52, [39,52,39,52,39,52,39,52,41,52,41,52,41,52,41,52,43,52,43,52,43,52,43,52,45,52,45,52,45,52,45,52] ],
					"right":[55, [39,55,39,55,39,55,39,55,41,55,41,55,41,55,41,55,43,55,43,55,43,55,43,55,45,55,45,55,45,55,45,55] ],
					"idleleft":[52, [39,52,39,52,39,52,39,52,41,52,41,52,41,52,41,52,43,52,43,52,43,52,43,52,45,52,45,52,45,52,45,52] ],
					"idleright":[55, [39,55,39,55,39,55,39,55,41,55,41,55,41,55,41,55,43,55,43,55,43,55,43,55,45,55,45,55,45,55,45,55] ],
					"hurtleft":[52, [39,52,39,52,39,52,39,52,41,52,41,52,41,52,41,52,43,52,43,52,43,52,43,52,45,52,45,52,45,52,45,52] ],
					"hurtright":[55, [39,55,39,55,39,55,39,55,41,55,41,55,41,55,41,55,43,55,43,55,43,55,43,55,45,55,45,55,45,55,45,55] ],
					"attackleft":[52, [39,52,39,52,39,52,39,52,41,52,41,52,41,52,41,52,43,52,43,52,43,52,43,52,45,52,45,52,45,52,45,52] ],
					"attackright":[55, [39,55,39,55,39,55,39,55,41,55,41,55,41,55,41,55,43,55,43,55,43,55,43,55,45,55,45,55,45,55,45,55] ],
					"deathleft":[52, [39,52,39,52,39,52,39,52,41,52,41,52,41,52,41,52,43,52,43,52,43,52,43,52,45,52,45,52,45,52,45,52] ],
					"deathright":[55, [39,55,39,55,39,55,39,55,41,55,41,55,41,55,41,55,43,55,43,55,43,55,43,55,45,55,45,55,45,55,45,55] ] 
				},
				fromWidthOffset : 16, 
				fromHeightOffset : 32,
				attackFromWidthOffset : 16,
				attackFromHeightOffset : 32,
				speed : 2,
				attackStrength : 2,
				health : 25,
				dropValueFunction : function() { return [62,10] }, 
				explosion : new Rectangle(960,0,128,96),			
				exSpeed : .5
				
	};
	EnemyDefinitionObject.prototype._defaultSmallEnemy =  {
				tileValue : [35,26],  
				width : 16,
				height : 16,
				animationSpecs: { //a shorter attack animation makes the enemy harder to be hit, it will be attacking repeatedly quickly not giving the player enough time to react.
				//if you want an enemy that must be shot at, or hard to beat, make its attack animation short.
				
					"left":[35, [26,35,26,35,26,35,26,35,27,35,27,35,27,35,27,35,28,35,28,35,28,35,28,35,29,35,29,35,29,35,29,35,30,35,30,35,30,35,30,35,31,35,31,35,31,35,31,35] ],
					"right":[35, [40,35,40,35,40,35,40,35,39,35,39,35,39,35,39,35,38,35,38,35,38,35,38,35,37,35,37,35,37,35,37,35,36,35,36,35,36,35,36,35,35,35,35,35,35,35,35,35] ],
					"idleleft":[35, [26,35] ],
					"idleright":[35, [40,35] ],
					"hurtleft":[34, [28,34,28,34,28,34,28,34,29,34,29,34,29,34,29,34] ],
					"hurtright":[34, [37,34,37,34,37,34,37,34,38,34,38,34,38,34,38,34] ],
					"attackright":[33, [40,33,40,33,40,33,40,33,40,33,40,33,40,33,40,33,40,33,40,33,40,33,40,33,40,33,40,33,40,33,40,33,40,33,40,33,40,33,40,33,40,33,40,33,40,33,40,33] ],
					"attackleft":[33, [28,33,28,33,28,33,28,33,28,33,28,33,28,33,28,33,28,33,28,33,28,33,28,33,28,33,28,33,28,33,28,33,28,33,28,33,28,33,28,33,28,33,28,33,28,33,28,33] ],
					"deathleft":[34, [28,34,28,34,28,34,28,34,29,34,29,34,29,34,29,34] ],
					"deathright":[34, [37,34,37,34,37,34,37,34,38,34,38,34,38,34,38,34] ]
				},
				fromWidthOffset : 0, 
				fromHeightOffset : 0,
				attackFromWidthOffset : 0,
				attackFromHeightOffset : 0,
				speed : 2,
				attackStrength : 2,
				health : 25,
				dropValueFunction : function() { return (Math.random() * 7 <= 5 ? [47,63] : [47,60]) }, 
				explosion : new Rectangle(144,0,16,16),			
				exSpeed : .5
				
	};
	EnemyDefinitionObject.prototype._defaultOrangeEnemy = {
				tileValue : [37,26],  
				width : 16,
				height : 16,
				animationSpecs: { 
				
					"left":[37, [26,37,26,37,26,37,26,37,27,37,27,37,27,37,27,37,28,37,28,37,28,37,28,37,29,37,29,37,29,37,29,37,30,37,30,37,30,37,30,37,31,37,31,37,31,37,31,37] ],
					"right":[37, [40,37,40,37,40,37,40,37,39,37,39,37,39,37,39,37,38,37,38,37,38,37,38,37,37,37,37,37,37,37,37,37,36,37,36,37,36,37,36,37,35,37,35,37,35,37,35,37] ],
					"idleleft":[37, [26,37,26,37,26,37,26,37,27,37,27,37,27,37,27,37,28,37,28,37,28,37,28,37,29,37,29,37,29,37,29,37,30,37,30,37,30,37,30,37,31,37,31,37,31,37,31,37] ],
					"idleright":[37, [40,37,40,37,40,37,40,37,39,37,39,37,39,37,39,37,38,37,38,37,38,37,38,37,37,37,37,37,37,37,37,37,36,37,36,37,36,37,36,37,35,37,35,37,35,37,35,37] ], 
					"hurtleft":[37, [31,37,31,37,31,37,31,37] ],
					"hurtright":[37, [35,37,35,37,35,37,35,37] ], 
					"attackleft":[37, [26,37,26,37,26,37,26,37,27,37,27,37,27,37,27,37,26,37,26,37,26,37,26,37,27,37,27,37,27,37,27,37,26,37,26,37,26,37,26,37,27,37,27,37,27,37,27,37,26,37,26,37,26,37,26,37,27,37,27,37,27,37,27,37]],
					"attackright":[37, [40,37,40,37,40,37,40,37,39,37,39,37,39,37,39,37,40,37,40,37,40,37,40,37,39,37,39,37,39,37,39,37,40,37,40,37,40,37,40,37,39,37,39,37,39,37,39,37,40,37,40,37,40,37,40,37,39,37,39,37,39,37,39,37] ], 
					"deathleft":[37, [26,37,26,37,26,37,26,37,27,37,27,37,27,37,27,37,28,37,28,37,28,37,28,37,29,37,29,37,29,37,29,37,30,37,30,37,30,37,30,37,31,37,31,37,31,37,31,37] ],
					"deathright":[37, [40,37,40,37,40,37,40,37,39,37,39,37,39,37,39,37,38,37,38,37,38,37,38,37,37,37,37,37,37,37,37,37,36,37,36,37,36,37,36,37,35,37,35,37,35,37,35,37] ] 
				
				},
				fromWidthOffset : 0, 
				fromHeightOffset : 0,
				attackFromWidthOffset : 0,
				attackFromHeightOffset : 0,
				speed : 3,
				attackStrength : 3,
				health : 33,
				dropValueFunction : function() { return (Math.random() * 7 <= 2 ? [47,63] : [47,60]) }, 
				explosion : new Rectangle(144,0,16,16),			
				exSpeed : .5
				
	};
	EnemyDefinitionObject.prototype._defaultMediumEnemy =  {
				tileValue : [46,76],  
				width : 16,
				height : 16,
				animationSpecs: { 
				
					"left":[76, [46,76,46,76,46,76,46,76,50,76,50,76,50,76,50,76,54,76,54,76,54,76,54,76,58,76,58,76,58,76,58,76,62,76,62,76,62,76,62,76,66,76,66,76,66,76,66,76] ],
					"idleleft":[72, [46,72,46,72,46,72,46,72,50,72,50,72,50,72,50,72,54,72,54,72,54,72,54,72,58,72,58,72,58,72,58,72] ],
					"attackleft":[78, [53,78,53,78,53,78,53,78,57,78,57,78,57,78,57,78,61,78,61,78,61,78,61,78] ],
					"hurtleft":[80, [46,80,46,80,46,80,46,80,50,80,50,80,50,80,50,80] ],
					"deathleft":[80, [50,80,50,80,50,80,50,80] ],
					"right":[87, [66,87,66,87,66,87,66,87,62,87,62,87,62,87,62,87,58,87,58,87,58,87,58,87,54,87,54,87,54,87,54,87,50,87,50,87,50,87,50,87,46,87,46,87,46,87,46,87] ],
					"idleright":[83, [66,83,66,83,66,83,66,83,62,83,62,83,62,83,62,83,58,83,58,83,58,83,58,83,54,83,54,83,54,83,54,83] ],
					"attackright":[89, [58,89,58,89,58,89,58,89,54,89,54,89,54,89,54,89,50,89,50,89,50,89,50,89] ],
					"hurtright":[91, [66,91,66,91,66,91,66,91,62,91,62,91,62,91,62,91] ],
					"deathright":[91, [62,91,62,91,62,91,62,91] ]
			
					
				},
				fromWidthOffset : 16, 
				fromHeightOffset : 16,
				attackFromWidthOffset : 32,
				attackFromHeightOffset : 16,
				speed : 2,
				attackStrength : 10,
				health : 51,
				dropValueFunction : function() { return (Math.random() * 7 <= 2 ? [47,63] : [47,60]) }, 
				explosion : new Rectangle(144,0,16,16),			
				exSpeed : .5
				
	};
	
	EnemyDefinitionObject.prototype.addDefault = function(kind) {
		kind = kind || 1;
		if(kind > 3) { kind = 3 };
		if(typeof kind !== 'number') {
			kind = 2;
		}
		let knds = {1:'Small', 2:'Orange', 3:'Medium'}
		let toadd = this['_default'+knds[kind]+'Enemy'];
		
		this.addEnemy(
			knds[kind]+'Enemy',
			toadd.tileValue,
			toadd.width,
			toadd.height,
			toadd.animationSpecs,
			toadd.fromWidthOffset,
			toadd.fromHeightOffset,
			toadd.attackFromWidthOffset,
			toadd.attackFromHeightOffset,
			toadd.speed,
			toadd.attackStrength,
			toadd.health,
			toadd.dropValueFunction,
			toadd.explosion,
			toadd.exSpeed
		);
		
	};
	EnemyDefinitionObject.prototype.addEnemy = function(enemyName, tileValue, width, height, animationSpecs, fromWidthOffset, fromHeightOffset, attackFromWidthOffset, attackFromHeightOffset,
				speed, attackStrength,health,dropValueFunction,explosion,exSpeed) {

		if( !this[enemyName] ) {

			this[enemyName] = { 
				"tileValue":tileValue,
				"width":width,
				"height":height,
				"animationSpecs":animationSpecs,
				"fromWidthOffset":fromWidthOffset, 
				"fromHeightOffset":fromHeightOffset,
				"attackFromWidthOffset":attackFromWidthOffset,
				"attackFromHeightOffset":attackFromHeightOffset,
				"speed":speed,
				"attackStrength":attackStrength,
				"health":health,
				"dropValueFunction":dropValueFunction, 
				"explosion":explosion,			
				"exSpeed":exSpeed
			};
		} else {	
			throw( enemyName + " already exists on the EnemyDefinitionObject" );
		}

	};


	export{ EnemyDefinitionObject };


