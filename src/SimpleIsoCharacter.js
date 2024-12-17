(function() { 

	'use strict';
            
            function SimpleIsoCharacter(source, canvasObject, fromRect, x,y,z,width,height,depth,scene,aWidth,aHeight) {
				tabageos.MoverSkeleton.call(this,x,y,width,height);
				tabageos.SimpleIsoBox.call(this,x,y,z,width,height,depth);
                this.width = width || 0;
                this.height = height || 0;
                this._middlePoint = new tabageos.MoverPoint();
                this._pos = new tabageos.MoverPoint(x,y);
                this._veloc = new tabageos.MoverPoint(0,0);
                this._lastVeloc = new tabageos.MoverPoint(0,0);
                this._lastPos = new tabageos.MoverPoint(x,y);
                this.x = x || 0;
                this.y = y || 0;
                this._rect = new tabageos.Rectangle(this.x,this.y,this.width,this.height);
                this.z = z || 0;
                this.dX = 0; this.dY = 0;
                this.depth = depth || this.height+1-1;
                this._passCalcs = {x1:0,y1:0,x2:0,y2:0,x3:0,y3:0};
                this._ddX = 0;
                this._ddY = 0;
                this.moveLimits = [];
				this.health = 10;//new
				this.strength = 10;//
				this.stamina = 10;
				this.magicPower = null;
				this.potato = null;
                this.scene = scene;
                this.animation = new tabageos.SimpleIsoAnimation(source, canvasObject, fromRect, x,y,aWidth||width,aHeight||height);
                this.traveler = new tabageos.Traveler(x,y,width,height);
               
            };
			SimpleIsoCharacter.prototype.constructor = SimpleIsoCharacter;
            SimpleIsoCharacter.prototype = Object.create(tabageos.MoverSkeleton.prototype);
			Object.assign(SimpleIsoCharacter.prototype, tabageos.SimpleIsoBox.prototype);
            SimpleIsoCharacter.prototype.scene;
            SimpleIsoCharacter.prototype.animation;
            SimpleIsoCharacter.prototype.traveler;
			SimpleIsoCharacter.prototype.health = 10;//new
			SimpleIsoCharacter.prototype.strength = 10;
			SimpleIsoCharacter.prototype.stamina = 10;
			SimpleIsoCharacter.prototype.magicPower = null;
			SimpleIsoCharacter.prototype.potato = null;
			SimpleIsoCharacter.prototype._helperArray = [];//
            SimpleIsoCharacter.prototype.animateInScene = function(speed) {
                
                this.animation.currentAnimation = this.directionFacing();
                
                this.animation.animate( speed || (this.animation.onlyHorizontalAnimations ? 1 : 2)  );
            };
			//new
			SimpleIsoCharacter.prototype.animateNorthSouthEastWest = function(speed) {
				
				if(this._veloc.x <= -1) {
					
					this.animation.currentAnimation = "west";
					
				}
				if(this._veloc.x >= 1) {
					
					this.animation.currentAnimation = "east";
					
				}
				if(this._veloc.y <= -1) {
					
					this.animation.currentAnimation = "north";
					
				}
				if(this._veloc.y >= 1) {
					
					this.animation.currentAnimation = "south";
					
				}
				
				this.animation.animate( speed || (this.animation.onlyHorizontalAnimations ? 1 : 2)  );
				
			};
			
			
            SimpleIsoCharacter.prototype.matchTraveler = function(all,sx,sy) {
                this._veloc.x = this.traveler._veloc.x+1-1; this._veloc.y = this.traveler._veloc.y+1-1;
                if(all) {
                    this.setX(this.traveler.x+1-1);
                    this.setY(this.traveler.y+1-1);
                } else if(sx) {
                    this.setX(this.traveler.x+1-1);
                } else if(sy) {
                    this.setY(this.traveler.y+1-1);
                }
            };
            SimpleIsoCharacter.prototype.travelerMatchThis = function(all) {
                this.traveler._veloc.x = this._veloc.x+1-1; this.traveler._veloc.y = this._veloc.y+1-1;
                if(all) {
                    this.traveler.x = this.x+1-1;this.traveler.y=this.y+1-1;
                    this.traveler._pos.x = this._pos.x+1-1;this.traveler._pos.y = this._pos.y+1-1;
                }
            };
            
            tabageos.SimpleIsoCharacter = SimpleIsoCharacter;
    
})();