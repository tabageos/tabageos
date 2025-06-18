
	'use strict';
    function MoverPoint(x, y) {
        this.x = x || 0;
        this.y = y || 0;
		this._length = 0;
		this._angle = 0;
    };
	MoverPoint.prototype.constructor = MoverPoint;
    MoverPoint.prototype.x = null;
    MoverPoint.prototype.y = null;
    MoverPoint.prototype._length = null;
    MoverPoint.prototype._angle = null;
    
    MoverPoint._poolIndex = 0;
    MoverPoint.pool = [];
    MoverPoint.newMoverPoint = function(x,y) {
        if(MoverPoint.pool.length <= 0) { 
            while(MoverPoint.pool.length < 250) {
                MoverPoint.pool.push(new MoverPoint());
            } MoverPoint._poolIndex = 249;
        } 
       
       
        MoverPoint._poolIndex--;
        if(MoverPoint._poolIndex <= -1) {window.console.log("mppool");
            MoverPoint._poolIndex = 249;
        } return MoverPoint._setInstance(MoverPoint.pool[MoverPoint._poolIndex],x,y,0,0);
    };
    MoverPoint._setInstance = function(instance,x,y,l,a) {
        instance.x = x;instance.y = y;instance._length = l;instance._angle = a;return instance;
    };
    MoverPoint.prototype.getSquaredLength = function() {
        return this.x * this.x + this.y * this.y;
    };
    MoverPoint.prototype.perp = function() {
        return new MoverPoint(-this.y,this.x);
    };
    MoverPoint.prototype.getX = function() {
        return this.x;
    };
    MoverPoint.prototype.setX = function(toThis) {
        this.x = toThis;
    };
    MoverPoint.prototype.getY = function() {
        return this.y;
    };
    MoverPoint.prototype.setY = function(toThis) {
        this.y = toThis;
    };
    MoverPoint.prototype.getAngle = function() {
        if (!this._angle) {
            this._angle = Math.atan2(this.y, this.x);
        }
        return this._angle;
    };
    MoverPoint.prototype.setAngle = function(toThis) {
        var l = this.getLength();
        this.x = Math.cos(toThis) * l;
        this.y = Math.sin(toThis) * l;
        this._angle = toThis;
    };
    MoverPoint.prototype.getLength = function() {
        if (!this._length) {
            this._length = Math.sqrt(this.getSquaredLength());
        }
        return this._length;
    };
    MoverPoint.prototype.setLength = function(toThis) {
        var a = this.getAngle();
        this.x = Math.cos(a) * toThis;
        this.y = Math.sin(a) * toThis;
        this._length = toThis;
    };
    MoverPoint.prototype.normalize = function() {
        if (this.getLength() == 0) {
            this.x = 1;
            return this;
        }
        var l = this.getLength();
        this.x /= l;
        this.y /= l;
        return this;
    };
    MoverPoint.prototype.reverse = function() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    };
    MoverPoint.prototype.subtractBy = function(xAmount, yAmount, makeNew) {
        if (makeNew != 0) {
            return MoverPoint.newMoverPoint(this.x - xAmount,this.y - yAmount);
        } else {
            this.x = this.x - xAmount;
            this.y = this.y - yAmount;
            return this;
        }
    };
    MoverPoint.prototype.truncate = function(max) {
        this.setLength(this.getLength() > max ? max : this.getLength());
        return this;
    };
    MoverPoint.prototype.subtract = function(mp, makeNew) {
        if (makeNew != 0) {
            return MoverPoint.newMoverPoint(this.x - mp.x,this.y - mp.y);
        } else {
            this.x = this.x - mp.x;
            this.y = this.y - mp.y;
            return this;
        }
    };
    MoverPoint.prototype.add = function(mp, makeNew) {
        if (makeNew != 0) {
            return MoverPoint.newMoverPoint(this.x + mp.x,this.y + mp.y);
        } else {
            this.x = (this.x + mp.x);
            this.y = (this.y + mp.y);
            return this;
        }
    };
    MoverPoint.prototype.sign = function(mp) {
        return this.perp().dotProduct(mp) < 0 ? -1 : 1;
    };
    MoverPoint.prototype.multiply = function(value, makeNew) {
        if (makeNew != 0) {
            return MoverPoint.newMoverPoint(this.x * value,this.y * value);
        } else {
            this.x = this.x * value;
            this.y = this.y * value;
            return this;
        }
    };
    MoverPoint.prototype.dotProduct = function(mp) {
        return this.x * mp.x + this.y * mp.y;
    };
    MoverPoint.prototype.squaredDistance = function(mp) {
        var dx = mp.x - this.x;
        var dy = mp.y - this.y;
        return dx * dx + dy * dy;
    };
    MoverPoint.prototype.equals = function(mp) {
        return this.x == mp.x && this.y == mp.y;
    };
    MoverPoint.prototype.dist = function(mp) {
        return Math.sqrt(this.squaredDistance(mp));
    };
    MoverPoint.prototype.clone = function() {
        return new MoverPoint(this.x,this.y);
    };
    MoverPoint.prototype.lesserClone = function() {
        return MoverPoint.newMoverPoint(this.x+1-1,this.y+1-1);
    };
    MoverPoint.prototype.addBy = function(xAmount, yAmount, makeNew) {
        if (makeNew != 0) {
            return MoverPoint.newMoverPoint(this.x + xAmount,this.y + yAmount);
        } else {
            this.x = this.x + xAmount;
            this.y = this.y + yAmount;
            return this;
        }
    };
    MoverPoint.prototype.reset = function() {
        this.x = 0;
        this.y = 0;
        this._length = Math.sqrt(this.getSquaredLength());
        this._angle = Math.atan2(this.y, this.x);
    };
    MoverPoint.prototype.divide = function(value, makeNew) {
        if (makeNew != 0) {
            return MoverPoint.newMoverPoint(this.x / value,this.y / value);
        } else {
            this.x = this.x / value;
            this.y = this.y / value;
            return this;
        }
    };
    MoverPoint.angleBetweenMoverPoints = function(mp1, mp2) {
        if (mp1.getLength() != 1)
            mp1 = mp1.clone().normalize();
        if (mp2.getLength() != 1)
            mp2 = mp2.clone().normalize();
        return Math.acos(mp1.dotProduct(mp2));
    };
    MoverPoint.squaredDistanceBetween = function(mp1, mp2) {
        var dx = mp1.x - mp2.x;
        var dy = mp1.y - mp2.y;
        return dx * dx + dy * dy;
    };
    MoverPoint.distBetween = function(mp1, mp2) {
        return Math.sqrt(MoverPoint.squaredDistanceBetween(mp1, mp2));
    };
    export { MoverPoint   };



