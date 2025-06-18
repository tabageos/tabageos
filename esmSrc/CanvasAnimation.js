import {Rectangle} from './Rectangle.js';
import {MoverPoint} from './MoverPoint.js';

'use strict';

    function CanvasAnimation(source, canvasObject, fromRect, x, y, width, height) {
        if (source || canvasObject) {
            this.init(source, canvasObject, fromRect, x, y, width, height);
        }
    };
	CanvasAnimation.prototype.constructor = CanvasAnimation;
    CanvasAnimation.prototype.init = function(source, canvasObject, fromRect, x, y, width, height) {
        this._source = source;
        this._canvas = canvasObject;
        this.currentAnimation = "";
        this.ani = 0;
		this.animationIndexOrder = null;
		this.animationSpecs = {left: [4, [1, 2, 3, 4, 5, 6, 7]]};
		this.blitIndex = 0;
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 0;
        this.height = height || 0;
        this.toPoint = new MoverPoint();
        this.fromRect = fromRect || new Rectangle(0,0,this.width,this.height);
		this.fromXOffset = 0;
		this.fromYOffset = 0;
		this.fromWidthOffset = 0;
		this.fromHeightOffset = 0;
		this.lastAnim = "";
		this._cpos = null;
		this._addedPos = null;
		this._inDelay = 0;
		this._throttRef = 0;
		this._cBB = 0;
        if(CanvasAnimation._onlyHorizontalAni) {
            this.onlyHorizontalAnimations = 1;
        }
    };
    CanvasAnimation.prototype._source;
    CanvasAnimation.prototype._canvas;
    CanvasAnimation.prototype.currentAnimation = "";
    CanvasAnimation.prototype.animationSpecs = {
        left: [4, [1, 2, 3, 4, 5, 6, 7]]
    };
    CanvasAnimation.prototype.animationIndexOrder;
    CanvasAnimation.prototype.ani = 0;
    CanvasAnimation.prototype.blitIndex;
    CanvasAnimation.prototype.width = 0;
    CanvasAnimation.prototype.height = 0;
    CanvasAnimation.prototype.x = 0;
    CanvasAnimation.prototype.y = 0;
    CanvasAnimation.prototype.fromRect;
    CanvasAnimation.prototype.fromXOffset = 0;
    CanvasAnimation.prototype.fromYOffset = 0;
    CanvasAnimation.prototype.fromWidthOffset = 0;
    CanvasAnimation.prototype.fromHeightOffset = 0;
    CanvasAnimation.prototype.lastAnim = "";
    CanvasAnimation.prototype.toPoint;
	CanvasAnimation.prototype.onlyHorizontalAnimations = 0;
    CanvasAnimation._onlyHorizontalAni = 0;
	CanvasAnimation.prototype.addedAnimationChanges = null;
    CanvasAnimation.prototype._cpos;
    CanvasAnimation.prototype._addedPos;
	CanvasAnimation.prototype._playerRef = null;
    CanvasAnimation.prototype._inDelay = 0;
	CanvasAnimation.prototype.defineAnimation = function(animationName, arrayOfXYIndexValues, yIndex) {
        
        this.animationSpecs[animationName] = [yIndex || 1, arrayOfXYIndexValues];  
        
    };
    CanvasAnimation.prototype.getPosition = function(addedX, addedY) {
        if (!this._cpos || !this._addedPos) {
            this._cpos = new MoverPoint();
            this._addedPos = new MoverPoint();
        }
        this._cpos.x = this.x;
        this._cpos.y = this.y;
        if (addedX || addedY) {
            this._addedPos.x = this.x + (addedX || 0);
            this._addedPos.y = this.y + (addedY || 0)
        }
        return ((addedX || addedY) ? this._addedPos : this._cpos);
    };
	
	CanvasAnimation.prototype.matchPosition = function(mover,xoff,yoff) {
		this.x = (mover.x+1-1) - (xoff||0);
		this.y = (mover.y+1-1) - (yoff||0);
	};
	CanvasAnimation.prototype.currentAnimationContains = function(txt) {
		
		return this.currentAnimation.indexOf(txt) != -1;
		
	};
	
	
    CanvasAnimation.prototype.changeLeftRightUpDownAnimation = function(left,right,up,down, dontKeepAniIndex) {
		
		if(!up && !down && !left && !right && this.lastAnim) {
			this.currentAnimation = this.lastAnim;
		} else {
			this.currentAnimation = up ? "up" : (down ? "down" : (left ? "left" : "right"));
		}
		if (!dontKeepAniIndex) {
            this.lastAnim = this.currentAnimation;
        }
		
	};
	CanvasAnimation.prototype.changeFaceAnimation = function(toFace, keepAniIndex) {
			
			if (this.y >= toFace.y + toFace.height ) {
				this.currentAnimation = "up";
			}
			if (this.y + this.height < toFace.y  ) {
				this.currentAnimation = "down";
			}
			if (this.x > toFace.x + toFace.width) {
				this.currentAnimation = "left";
			}
			if (this.x + this.width < toFace.x ) {
				this.currentAnimation = "right";
			}
			if (keepAniIndex) {
				this.lastAnim = this.currentAnimation;
			}
			
	};
	
	CanvasAnimation.prototype.getDirectionOfAnimation = function(currentAni, onlyLeftRight, onlyUpDown) {
		
		var r = "";
		if(!onlyUpDown) {
			if(currentAni.indexOf("left") != -1) r = "left";
			if(currentAni.indexOf("right") != -1) r = "right";
		}
		if(!onlyLeftRight) {
			if(currentAni.indexOf("up") != -1) r = "up";
			if(currentAni.indexOf("down") != -1) r = "down";
		}
		return r;
		
	};
	
    CanvasAnimation.prototype.changeDirectionAnimation = function(left, right, up, down, keepAniIndex, noIdle,keepUpDown) {
        var helda = this.currentAnimation + "";
        this.currentAnimation = (up ? "up" : (down ? "down" : "")) + (left ? "left" : (right ? "right" : (((up || down) && this.lastAnim.match("left")) ? "left" : (((up || down) && this.lastAnim.match("right")) ? "right" : ""))));
        if (this.currentAnimation.length <= 0 && !keepUpDown) {
            this.currentAnimation = this.lastAnim.replace("idle", "").replace("down", "").replace("up", "") + (noIdle ? "" : "idle");
		}
		if (this.currentAnimation.length <= 0) {
			this.currentAnimation = helda;
		}
        if (keepAniIndex) {
            this.lastAnim = this.currentAnimation;
        }

		if(this.addedAnimationChanges && this._playerRef) {
			
			this.addedAnimationChanges(left, right, up, down, keepAniIndex, noIdle);
		}

    };
	CanvasAnimation.prototype.resetCurrentAnimation = function() {
		
		this.ani = 0;
	};
	
    CanvasAnimation.prototype.animate = function(thrott) { 
        this.blitIndex = this.animationSpecs[this.currentAnimation] ? this.animationSpecs[this.currentAnimation][0] : this.blitIndex;
        this.animationIndexOrder = this.animationSpecs[this.currentAnimation] ? this.animationSpecs[this.currentAnimation][1] : this.animationIndexOrder;
        if (this.ani >= this.animationIndexOrder.length - 1) {
            this.ani = 0;
        } else {
            this.ani += (thrott || (this.onlyHorizontalAnimations === 0 ? 2 : 1) );
			
        }
        if (this.currentAnimation != this.lastAnim || (this.onlyHorizontalAnimations === 0 && this.ani > this.animationIndexOrder.length - 2) ) {
            this.ani = 0;
        }
        this.lastAnim = this.currentAnimation;
		var ain = Math.floor(this.ani); if(ain % 2 != 0) { ain = ain -1; }
		var aival = this.animationIndexOrder[ain];
		if(this.onlyHorizontalAnimations === 0) { 
			
				this.fromRect.x = this.animationIndexOrder[ain] * (this.width + this.fromXOffset);
				this.fromRect.y = this.animationIndexOrder[ain+1] * (this.height + this.fromYOffset);
			
		} else {
			this.fromRect.x = this.animationIndexOrder[ain] * (this.width + this.fromXOffset);
			this.fromRect.y = this.blitIndex * (this.height + this.fromYOffset);
		}
        this.fromRect.width = this.width + this.fromWidthOffset;
        this.fromRect.height = this.height + this.fromHeightOffset;
    };
	CanvasAnimation.prototype.finishedCurrentAnimation = function(offset) {
		if(!this.animationSpecs[this.currentAnimation]) {
			return false; 
		} else {
			return ( this.onlyHorizontalAnimations ? (Math.round(this.ani) >= this.animationSpecs[this.currentAnimation][1].length - 1) : (Math.round(this.ani) >= this.animationSpecs[this.currentAnimation][1].length - (offset||3))  );
		}
	};
	
    CanvasAnimation.prototype._throttRef;
    CanvasAnimation.prototype._cBB;
    CanvasAnimation.prototype.delayedAnimateAndBlit = function(thrott, milliSecondDelay, animation,clearBeforeBlitt) {
        this._inDelay = 1;
        if(animation) {
            this.currentAnimation = animation;
        }
        this._throttRef = thrott || 0;
        this._cBB = clearBeforeBlitt || 0;
        var ref = this;
        window.setTimeout(function(e) { ref._delayedFunction(); }, milliSecondDelay);
    };
    CanvasAnimation.prototype._delayedFunction = function(e) {
        if(this._inDelay) {
            this.animate(this._throttRef);
            if(this._cBB) {
                this._canvas.context.clearRect(this.x,this.y,this.width,this.height);
            }
            this.blit();
            this._inDelay = 0;
        }
    };
    CanvasAnimation.prototype.blit = function(r, p, igf,cw,ch) {
        if (r)
            this.fromRect = r;
        if (p) {
            this.toPoint = p;
        } else if (!igf) {
            this.toPoint.x = this.x - (this.fromWidthOffset != 0 ? this.fromWidthOffset/2 : 0);
            this.toPoint.y = this.y - this.fromHeightOffset;
        } else if(igf) {
            this.toPoint.x = this.x;
            this.toPoint.y = this.y;
        }
        this._canvas.copyPixels(this._source, this.fromRect, this.toPoint, cw||this.fromRect.width, ch||this.fromRect.height);
    }
    ;
    export { CanvasAnimation   };





