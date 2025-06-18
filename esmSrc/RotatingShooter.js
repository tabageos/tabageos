import { MoverPoint } from './MoverPoint.js';
import { Rectangle } from './Rectangle.js';
import { Event } from './Event.js';
import { EventDispatcher } from './EventDispatcher.js';
import { TimeKeeper } from './TimeKeeper.js';
import { TravelerSkeleton } from './TravelerSkeleton.js';
import { BoundMethods } from './BoundMethods.js';
import { BlitMath } from './BlitMath.js';
import { Traveler } from './Traveler.js';
import { BlittedTraveler } from './BlittedTraveler.js';
import { WDTraveler } from './WDTraveler.js';
import { RotatingTraveler } from './RotatingTraveler.js';
import { CanvasAnimation } from './CanvasAnimation.js';


	'use strict';


    function RotatingShooter(wd, source, canvas, fromRect, x, y, width, height, rotationImage, rotationFromRect, bulletCanvas, bulletFromRect,bulletMap) {
		TravelerSkeleton.call(this,x,y,width,height);
		Traveler.call(this,x,y,width,height);
		BlittedTraveler.call(this,source, canvas, fromRect, x, y, width, height);
		WDTraveler.call(this,wd, source, canvas, fromRect, x, y, width, height);
		RotatingTraveler.call(this, wd, source, canvas, fromRect, x, y, width, height, rotationImage, rotationFromRect);
        this.init(source, canvas, fromRect, x, y, width, height);
        this._cWD = wd;
        this._wayDeterminer = wd;
        this.rImageHolder = rotationImage;
        this.rFromRect = rotationFromRect;
        this.roExA = 0;
        this.rToPoint = new MoverPoint(-((this.rImageHolder.width - this.roExA) / 2),-((this.rImageHolder.height - this.roExA) / 2));
        this._brFromRct = new Rectangle(0,0,this.rFromRect.width,this.rFromRect.height);
        this.bulletHolder = [];
        this._bulletCanvas = bulletCanvas;
        this.bulletFromRect = bulletFromRect;
        this.bulletSpeed = 14;
		this.bulletMap = bulletMap || null;
		if(this.bulletMap) {
			this.bulletType = 2;
		}
    };
	
	RotatingShooter.prototype.constructor = RotatingShooter;
	RotatingShooter.prototype = Object.create(TravelerSkeleton.prototype);
	Object.assign(RotatingShooter.prototype, Traveler.prototype, BlittedTraveler.prototype, WDTraveler.prototype, RotatingTraveler.prototype);
	
    RotatingShooter.prototype.bulletHolder = [];
    RotatingShooter.prototype.bulletFromRect;
    RotatingShooter.prototype._bulletCanvas;
    RotatingShooter.prototype.bulletSpeed = 14;
	RotatingShooter.prototype.bulletType = 1;
	RotatingShooter.prototype.bulletMap = null;
    RotatingShooter.prototype.reload = function(amount) {
		var b, bulletCa, brc;
        while (this.bulletHolder.length < amount) {
			brc = new Rectangle(this.bulletFromRect.x+1-1,this.bulletFromRect.y+1-1, this.bulletFromRect.width+1-1, this.bulletFromRect.height+1-1);
			if(this.bulletType === 1) {
				b = new BlittedTraveler(this._source,this._bulletCanvas,brc,0,0,this.bulletFromRect.width,this.bulletFromRect.height);
				
			} else { 
				bulletCa = new CanvasAnimation(this._source,this._bulletCanvas,brc,0,0,this.bulletFromRect.width,this.bulletFromRect.height);
				b = new MapTraveler(0,0,this.bulletFromRect.width,this.bulletFromRect.height,this.bulletMap, bulletCa,1);
				
			}
			this.bulletHolder.push(b);
        }
    };
	RotatingShooter.prototype.defineBulletAnimation = function(framesArray) {
		var i = 0;var b;
		for(i; i < this.bulletHolder.length; i++) {
			b = this.bulletHolder[i];
			if(b._canvasAnimation) {
				b._canvasAnimation.animationSpecs = {
					"shot":[0,framesArray]
				};
				b._canvasAnimation.currentAnimation = "shot";
				b._canvasAnimation.animate(0);
			} else {
				b.animationSpecs = {
					"shot":[0,framesArray]
				};
				b.currentAnimation = "shot";
				b.animate(0);
			}
		}
	};
    RotatingShooter.prototype.shoot = function(xoffset, yoffset) {
        if (this.bulletHolder.length <= 0) {
            this.reload(100);
        }
        var b = this.bulletHolder.pop();
        b.setX((this.x + this.width / 2) + (xoffset||0));
        b.setY((this.y + this.height / 2) + (yoffset||0));
        b._veloc.x = Math.cos(Math.PI * (this.nr / 180)) * this.bulletSpeed;
        b._veloc.y = Math.sin(Math.PI * (this.nr / 180)) * this.bulletSpeed;
        return b;
    };
	RotatingShooter.prototype.reclaimBullet = function(b) {
		if(b) {
			b.setX(0);
			b.setY(0);
			b._veloc.x = 0;
			b._veloc.y = 0;
			this.bulletHolder.unshift(b);
		}
    };
    export { RotatingShooter   };




