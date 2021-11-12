(function() { 

	'use strict';


	function RotatingShooter(wd, source, canvas, fromRect, x, y, width, height, rotationImage, rotationFromRect, bulletCanvas, bulletFromRect,bulletMap) {
		tabageos.TravelerSkeleton.call(this,x,y,width,height);
		tabageos.Traveler.call(this,x,y,width,height);
		tabageos.BlittedTraveler.call(this,source, canvas, fromRect, x, y, width, height);
		tabageos.WDTraveler.call(this,wd, source, canvas, fromRect, x, y, width, height);
		tabageos.RotatingTraveler.call(this, wd, source, canvas, fromRect, x, y, width, height, rotationImage, rotationFromRect);
		this.init(source, canvas, fromRect, x, y, width, height);
		this._cWD = wd;
		this._wayDeterminer = wd;
		this.rImageHolder = rotationImage;
		this.rFromRect = rotationFromRect;
		this.roExA = 0;
		this.rToPoint = new tabageos.MoverPoint(-((this.rImageHolder.width - this.roExA) / 2),-((this.rImageHolder.height - this.roExA) / 2));
		this._brFromRct = new tabageos.Rectangle(0,0,this.rFromRect.width,this.rFromRect.height);
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
	RotatingShooter.prototype = Object.create(tabageos.TravelerSkeleton.prototype);
	Object.assign(RotatingShooter.prototype, tabageos.Traveler.prototype, tabageos.BlittedTraveler.prototype, tabageos.WDTraveler.prototype, tabageos.RotatingTraveler.prototype);
	
	RotatingShooter.prototype.bulletHolder = [];
	RotatingShooter.prototype.bulletFromRect;
	RotatingShooter.prototype._bulletCanvas;
	RotatingShooter.prototype.bulletSpeed = 14;
	RotatingShooter.prototype.bulletType = 1;
	RotatingShooter.prototype.bulletMap = null;
	RotatingShooter.prototype.reload = function(amount) {
		var b, bulletCa, brc;
		while (this.bulletHolder.length < amount) {
			brc = new tabageos.Rectangle(this.bulletFromRect.x+1-1,this.bulletFromRect.y+1-1, this.bulletFromRect.width+1-1, this.bulletFromRect.height+1-1);
			if(this.bulletType === 1) {
				b = new tabageos.BlittedTraveler(this._source,this._bulletCanvas,brc,0,0,this.bulletFromRect.width,this.bulletFromRect.height);
				
			} else { 
				bulletCa = new tabageos.CanvasAnimation(this._source,this._bulletCanvas,brc,0,0,this.bulletFromRect.width,this.bulletFromRect.height);
				b = new tabageos.MapTraveler(0,0,this.bulletFromRect.width,this.bulletFromRect.height,this.bulletMap, bulletCa,1);
				
			}
			this.bulletHolder.push(b);
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
	tabageos.RotatingShooter = RotatingShooter;
})();



