import { TimeKeeper } from './TimeKeeper.js';
import { Rectangle } from './Rectangle.js';
import { BoundMethods } from './BoundMethods.js';
import { MoverPoint } from './MoverPoint.js';
import { MoverSkeleton } from './MoverSkeleton.js';
import { MapMover } from './MapMover.js';
import { SceneryObject } from './SceneryObject.js';
import { RPGSceneryObject } from './RPGSceneryObject.js';
import { SceneryThrower } from './SceneryThrower.js';
import { TravelerSkeleton } from './TravelerSkeleton.js';
import { Traveler } from './Traveler.js';
import { MapTraveler } from './MapTraveler.js';
import { TravelingSceneryThrower } from './TravelingSceneryThrower.js';
import { MovingPlatform } from './MovingPlatform.js';
import { RPEase } from './RPEase.js';
import { TweenMath } from './TweenMath.js';
import { Event } from './Event.js';
import { EventDispatcher } from './EventDispatcher.js';
import { CanvasObject } from './CanvasObject.js';
import { CanvasObjectContainer } from './CanvasObjectContainer.js';
import { ScreenOrganizer } from './ScreenOrganizer.js';
import { IrisScreenOrganizer } from './IrisScreenOrganizer.js';
import { ScreenSkeleton } from './ScreenSkeleton.js';
import { MouseEvent } from './MouseEvent.js';
import { MouseController } from './MouseController.js';
import { ScreenChangeEvent } from './ScreenChangeEvent.js';
import { BlitSpecs } from './BlitSpecs.js';
import { BlitMath } from './BlitMath.js';
import { CanvasAnimation } from './CanvasAnimation.js';
import { SimpleIsoPoint } from './SimpleIsoPoint.js';
import { SimpleIsoBox } from './SimpleIsoBox.js';
import { SimpleIsoAnimation } from './SimpleIsoAnimation.js';
import { SimpleIsoCharacter } from './SimpleIsoCharacter.js';
import { SimpleIsoScene } from './SimpleIsoScene.js';
import { TileSceneChanger } from './TileSceneChanger.js';
import { SceneryObjectBlittedTraveler } from './SceneryObjectBlittedTraveler.js';
import { SceneryObjectTraveler } from './SceneryObjectTraveler.js';
import { TileData } from './TileData.js';
import { LoopingImage } from './LoopingImage.js';
import { SoundSystem } from './SoundSystem.js';
import { ExplosionFactory } from './ExplosionFactory.js';
import { GeometricMath } from './GeometricMath.js';


	'use strict';
    function BasicCamera(renderLayer, blitLayer1, blitLayer2, blitLayer3, blitLayer4, blitLayer5,vWidth,vHeight, constant1,constant2,constant3,constant4,constant5) {
        this.layerToRender = renderLayer;
        this.b1 = blitLayer1;
        this.b2 = blitLayer2;
        this.b3 = blitLayer3;
        this.b4 = blitLayer4;
        this.b5 = blitLayer5;
		this.c1 = constant1 || 0;
		this.c2 = constant2 || 0;
		this.c3 = constant3 || 0;
		this.c4 = constant4 || 0;
		this.c5 = constant5 || 0;
        this.tweens1 = [];
        this.tweens2 = [];
        this.p = new MoverPoint();
        this.v = new Rectangle(0,0);
        if (this.layerToRender) {
            this.v = new Rectangle(0,0,this.layerToRender.width,this.layerToRender.height);
        }
        this.viewPortWidth = vWidth;
        this.viewPortHeight = vHeight;
		this._justMoveParallax = 0;
		this._cbRect = new Rectangle(0,0,0,0);
        this._isoPoint = new MoverPoint();
		this._constantV = new Rectangle(0,0,this.layerToRender.width, this.layerToRender.height);
    };
	BasicCamera.prototype.constructor = BasicCamera;
	BasicCamera.prototype.layerToRender;
    BasicCamera.prototype.b1;
	BasicCamera.prototype.b1ActualMover;
    BasicCamera.prototype.b2;
	BasicCamera.prototype.b2ActualMover;
    BasicCamera.prototype.b3;
	BasicCamera.prototype.b3ActualMover;
    BasicCamera.prototype.b4;
	BasicCamera.prototype.b4ActualMover;
    BasicCamera.prototype.b5;
	BasicCamera.prototype.b5ActualMover;
	BasicCamera.prototype.c1 = 0;
    BasicCamera.prototype.c2 = 0;
    BasicCamera.prototype.c3 = 0;
    BasicCamera.prototype.c4 = 0;
    BasicCamera.prototype.c5 = 0;
	BasicCamera.prototype.rfm1 = 0;
    BasicCamera.prototype.rfm2 = 0;
    BasicCamera.prototype.rfm3 = 0;
    BasicCamera.prototype.rfm4 = 0;
    BasicCamera.prototype.rfm5 = 0;
    BasicCamera.prototype.viewPortWidth;
    BasicCamera.prototype.viewPortHeight;
    BasicCamera.prototype.lastVXr = 0;
    BasicCamera.prototype.p;
    BasicCamera.prototype.trsh = 0;
    BasicCamera.prototype.v;
	BasicCamera.prototype._constantV;
    BasicCamera.prototype.tweens1 = [];
    BasicCamera.prototype.tweens2 = [];
    BasicCamera.prototype.lastvx = 0;
    BasicCamera.prototype.lastvy = 0;
    BasicCamera.prototype.p1Tweens1 = [];
    BasicCamera.prototype.p1Tweens2 = [];
    BasicCamera.prototype.p2Tweens1 = [];
    BasicCamera.prototype.p2Tweens2 = [];
    BasicCamera.prototype._pLayer1;
    BasicCamera.prototype._pLayer2;
    BasicCamera.prototype._pV1;
    BasicCamera.prototype._pV2;
    BasicCamera.prototype.pTweenType1 = "Linear";
    BasicCamera.prototype.pTweenTime1 = 0;
    BasicCamera.prototype.pTweenType2 = "Linear";
    BasicCamera.prototype.pTweenTime2 = 0;
	BasicCamera.prototype.pTween1XOffset = 2;
	BasicCamera.prototype.pTween2XOffset = 4;
	BasicCamera.prototype.pTween1YOffset = 1;
	BasicCamera.prototype.pTween2YOffset = 1;
	BasicCamera.prototype.tweens3 = [];
    BasicCamera.prototype.tweens4 = [];
	BasicCamera.prototype.tweens5 = [];
	BasicCamera.prototype.tweens6 = [];
    BasicCamera.prototype.tweens7 = [];
	BasicCamera.prototype.tweens8 = [];
	BasicCamera.prototype.tweens9 = [];
    BasicCamera.prototype.tweens10 = [];
    BasicCamera.prototype.separatedOffset1 = 5;
    BasicCamera.prototype.separatedOffset2 = 4;
	BasicCamera.prototype.separatedOffset3 = 3;
	BasicCamera.prototype.separatedOffset4 = 2;
    BasicCamera.prototype.separatedOffset5 = 1;
    BasicCamera.prototype.pLastVs = {
        p1x: 0,
        p1y: 0,
        p2x: 0,
        p2y: 0
    };
	BasicCamera.prototype._map = null;
	BasicCamera.prototype._tileSheetImage = null;
	BasicCamera.prototype.setMap = function(toThis) {
		this._map = BlitMath.cloneMultiArray(toThis);
	};    
	BasicCamera.prototype._tw = 16;
	BasicCamera.prototype._th = 16;
	BasicCamera.prototype._mapIndexXMethod = function(a) {return a[1]};
	BasicCamera.prototype._mapIndexYMethod = function(a) {return a[0]};
	BasicCamera.prototype._vRenderWidth = 0;
	BasicCamera.prototype._vRenderHeight = 0;
	BasicCamera.prototype.constantBackgroundFromRect = 0;
	BasicCamera.prototype._cbRect = null;
	BasicCamera.prototype.mapUpdateMethod = null;
	BasicCamera.prototype.colorValues = {1:"#000000",2:"#000000",3:"#FFFFFF"};
	BasicCamera.prototype.setupForRenderFromMap = function(map, tileSheetImg, tw,th,laer, vW, vH, indexXMethod,indexYMethod) {
		this._map = map;
		this._tileSheetImage = tileSheetImg;
		this._tw = tw;
		this._th = th;
		this._mapIndexXMethod = indexXMethod || function(a) {return a[1]};
		this._mapIndexYMethod = indexYMethod || function(a) {return a[0]};
		
		if(vW) {
			this._vRenderWidth = vW;
		}
		if(vH) {
			this._vRenderHeight = vH;
		}
		
		if(laer) {
			if(laer == 1) {
				this.rfm1 = 1;
			}
			if(laer == 2) {
				this.rfm2 = 1;
			}
			if(laer == 3) {
				this.rfm3 = 1;
			}
			if(laer == 4) {
				this.rfm4 = 1;
			}
			if(laer == 5) {
				this.rfm5 = 1;
			}
		}
	};
    /*
		* Can be used with the .tweenedBlitLayerRender method to produce parallax effects.
		*
		* Only two layers can be added.
		* Layers will parallax based on .pTweenTime1 (or .pTweenTime2 for if you use 2 layers) or, a default of whatever you pass for tweentime in .tweenedBittLayerRender  multiplied by 2.
		*
		*  By default you just add a layer and it will move slower than the layers on top of it
		*  If you want to do more complex stuff, you would alter the .pTweenType1 and .pTweenTime1 
		*/
    BasicCamera.prototype.addParallaxLayer = function(canvasObject) {
        if (!this._pLayer1) {
            this._pLayer1 = canvasObject;
            this._pV1 = new Rectangle(0,0,this._pLayer1.width,this._pLayer1.height);
        } else if (!this._pLayer2) {
            this._pLayer2 = canvasObject;
            this._pV2 = new Rectangle(0,0,this._pLayer2.width,this._pLayer2.height);
        }
    };
	BasicCamera.prototype._justMoveParallax = 0;
	BasicCamera.prototype.addParallaxLayerForMove = function(canvasObejct) {
		this._justMoveParallax = 1;
		this.addParallaxLayer(canvasObejct);
		
	};
    BasicCamera.prototype.blitLayerRenderView = function() {
        return this.v;
    };
    BasicCamera.prototype.renderP1 = function() {
        if (this._pLayer1 && this._justMoveParallax == 0) { 
            this.layerToRender.copyPixels(this._pLayer1.canvas, this._pV1, this.p, this._pV1.width, this._pV1.height);
        } else { 
			this._pLayer1.canvas.setAttribute("style", "position:absolute;z-index:-9;top:"+(-this._pV1.y)+"px;left:"+(-this._pV1.x)+"px;image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;image-rendering: pixelated;image-rendering: crisp-edges;");
		}
    };
    BasicCamera.prototype.renderP2 = function() {
        if (this._pLayer2 && this._justMoveParallax == 0) {
            this.layerToRender.copyPixels(this._pLayer2.canvas, this._pV2, this.p, this._pV2.width, this._pV2.height);
        } else {
			this._pLayer2.canvas.setAttribute("style", "position:absolute;z-index:-8;top:"+(-this._pV2.y)+"px;left:"+(-this._pV2.x)+"px;image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;image-rendering: pixelated;image-rendering: crisp-edges;");
		}
    };
	BasicCamera.prototype.drawDirectlyFromMap = function() {

		var sc = Math.floor(this.v.x / this._tw);
		var sr = Math.floor(this.v.y / this._th);
		var endC = sc + ((this._vRenderWidth || this.v.width)/this._tw) + 1 >= this._map[0].length ? this._map[0].length : sc + ((this._vRenderWidth || this.v.width)/this._tw) + 1;
		var endR = sr + ((this._vRenderHeight || this.v.height) / this._th) >= this._map.length ? this._map.length : sr + ((this._vRenderHeight || this.v.height) / this._th);
		
		if(endC > (this._map[0].length/2)) {
			if(this.mapUpdateMethod) {
				this.mapUpdateMethod();
			}
		}

		if(this._tileSheetImage) {
			if(this._map[0][0] === 0 || this._map[0][0]) {
				BlitMath.specificPatternAreaBlit(this.layerToRender, this._tileSheetImage, this._map,  sr, endR , sc, endC, -this.v.x + (sc * this._tw), -this.v.y + (sr * this._th) );
				
			} else {
				BlitMath.patternAreaBlit(this.layerToRender, this._tileSheetImage, this._map,  sr, endR , sc, endC, this._mapIndexXMethod, this._mapIndexYMethod, -this.v.x + (sc * this._tw), -this.v.y + (sr * this._th) );
			}
		} else {
			BlitMath.drawSquaresFromAreaOfPattern(this.layerToRender, this._map, sr, endR , sc, endC, this._tw, this._th, this.colorValues, -this.v.x + (sc * this._tw), -this.v.y + (sr * this._th) );
		}

	};
    BasicCamera.prototype.renderB1 = function() {
        if (this.b1 && !this.c1) {
			if(this.rfm1 === 1) {
				this.drawDirectlyFromMap();
			} else {
				if(this.constantBackgroundFromRect) {
					this._cbRect.width = this.v.width;this._cbRect.height = this.v.height;
				}
				this.layerToRender.copyPixels(this.b1.canvas, this.constantBackgroundFromRect ? this._cbRect : this.v, this.p, this.v.width, this.v.height);
			}
		} else if ((this.b1 && this.c1) || this.b1ActualMover) { 
			if(this.b1ActualMover) {
				this.b1ActualMover.setAttribute("style", "position:absolute;z-index:-7;top:"+(-this.v.y)+"px;left:"+(-this.v.x)+"px;image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;image-rendering: pixelated;image-rendering: crisp-edges;");
			} else {
				this.b1.canvas.setAttribute("style", "position:absolute;z-index:-7;top:"+(-this.v.y)+"px;left:"+(-this.v.x)+"px;image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;image-rendering: pixelated;image-rendering: crisp-edges;");
			}
		}
    };
    BasicCamera.prototype.renderB2 = function() {
        if ((this.b2 && !this.c2) || this.rfm2) {
			if(this.rfm2 === 1) {
				this.drawDirectlyFromMap();
			} else {
				this.layerToRender.copyPixels(this.b2.canvas, this.v, this.p, this.v.width, this.v.height);
			}
		} else if ((this.b2 && this.c2) || this.b2ActualMover) {
			if(this.b2ActualMover) {
				this.b2ActualMover.setAttribute("style", "position:absolute;z-index:-6;top:"+(-this.v.y)+"px;left:"+(-this.v.x)+"px;image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;image-rendering: pixelated;image-rendering: crisp-edges;");
			} else {
				this.b2.canvas.setAttribute("style", "position:absolute;z-index:-6;top:"+(-this.v.y)+"px;left:"+(-this.v.x)+"px;image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;image-rendering: pixelated;image-rendering: crisp-edges;");
			}
		}
    };
    BasicCamera.prototype.renderB3 = function() {
        if (this.b3 && !this.c3) {
			if(this.rfm3 === 1) {
				this.drawDirectlyFromMap();
			} else {
				this.layerToRender.copyPixels(this.b3.canvas, this.v, this.p, this.v.width, this.v.height);
			}
		} else if ((this.b3 && this.c3) || this.b3ActualMover) {
			if(this.b3ActualMover) {
				this.b3ActualMover.setAttribute("style", "position:absolute;z-index:-5;top:"+(-this.v.y)+"px;left:"+(-this.v.x)+"px;image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;image-rendering: pixelated;image-rendering: crisp-edges;");
			} else {
				this.b3.canvas.setAttribute("style", "position:absolute;z-index:-5;top:"+(-this.v.y)+"px;left:"+(-this.v.x)+"px;image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;image-rendering: pixelated;image-rendering: crisp-edges;");
			}
		}
    };
    BasicCamera.prototype.renderB4 = function() {
        if (this.b4 && !this.c4) {
			if(this.rfm4 === 1) {
				this.drawDirectlyFromMap();
			} else {
				this.layerToRender.copyPixels(this.b4.canvas, this.v, this.p, this.v.width, this.v.height);
			}
		} else if (this.b4 && this.c4) {
			this.b4.canvas.setAttribute("style", "position:absolute;z-index:-4;top:"+(-this.v.y)+"px;left:"+(-this.v.x)+"px;image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;image-rendering: pixelated;image-rendering: crisp-edges;");
		}
    };
    BasicCamera.prototype.renderB5 = function() {
        if (this.b5 && !this.c5) {
			if(this.rfm5 === 1) {
				this.drawDirectlyFromMap();
			} else {
				this.layerToRender.copyPixels(this.b5.canvas, this.v, this.p, this.v.width, this.v.height);
			}
		} else if (this.b5 && this.c5) {
			this.b5.canvas.setAttribute("style", "position:absolute;z-index:-3;top:"+(-this.v.y)+"px;left:"+(-this.v.x)+"px;image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;image-rendering: pixelated;image-rendering: crisp-edges;");
		}
    };
    BasicCamera.prototype.blitLayerRender = function(cameraOffsetPosition, limitX, limitY) {
        var rawx = Math.floor(cameraOffsetPosition.x - this.v.width);
        var rawy = Math.floor(cameraOffsetPosition.y - this.v.height);
        this.v.x = (rawx > 0 && rawx <= (limitX || this.v.width)) ? rawx : this.v.x;
        this.v.y = (rawy > 0 && rawy <= (limitY || this.v.height)) ? rawy : this.v.y;
        this.renderB1();
        this.renderB2();
        this.renderB3();
        this.renderB4();
        this.renderB5();
    };
    BasicCamera.prototype.reset = function(vx, vy) {
        this.tweens1 = [];
        this.tweens2 = [];
        this.p1Tweens1 = [];
        this.p1Tweens2 = [];
        this.p2Tweens1 = [];
        this.p2Tweens2 = [];
        this.v.x = vx || 0;
        this.lastvx = vx || 0;
        this.v.y = vy || 0;
        this.lastvy = vy || 0;
        if (this._pV1) {
            this._pV1.x = vx || 0;
            this.pLastVs.p1x = vx || 0;
            this._pV1.y = vy || 0;
            this.pLastVs.p1y = vy || 0;
        }
        if (this._pV2) {
            this._pV2.x = vx || 0;
            this.pLastVs.p2x = vx || 0;
            this._pV2.y = vy || 0;
            this.pLastVs.p2y = vy || 0;
        }
    };
    BasicCamera.prototype.resetTween = function() {
        this.tweens1.length = 0;
        this.tweens2.length = 0;
        this.p1Tweens1.length = 0;
        this.p1Tweens2.length = 0;
        this.p2Tweens1.length = 0;
        this.p2Tweens2.length = 0;
    };
    BasicCamera.prototype.focus = function(mpToFocusOn, offsetX, offsetY) {
        this.resetTween();
        this.v.x = mpToFocusOn.x - offsetX;
        if (this.v.x < 0)
            this.v.x = 0;
        if (this.v.x > this.v.width)
            this.v.x = this.v.width;
        this.v.y = mpToFocusOn.y - offsetY;
        if (this.v.y < 0)
            this.v.y = 0;
        if (this.v.y > this.v.height)
            this.v.y = this.v.height;
        this.justRender();
        this.blitLayerRender(mpToFocusOn.subtractBy(-offsetX, -offsetY, 1), 0, 0);
    };
	BasicCamera.prototype._shkincer = 717;
	BasicCamera.prototype.shakeTime = 0;
	BasicCamera.prototype.shakeForce = 4;
	BasicCamera.prototype.shakeContainer = null;
	BasicCamera.prototype._shakeOriginals = {x:0,y:0};
	BasicCamera.prototype.shake = function(time, container, ex) {
		if((!ex || this.shakeTime == 0) && this._shkincer === 717) { this.shakeTime = time || 100; }
		this.shakeContainer = container;
		if(!this._shakeOriginals.x) {
			this._shakeOriginals.x = container.style.left;
			this._shakeOriginals.y = container.style.top;
		}
		if(ex) {
			
			this.executeShake();
		}
	};
	BasicCamera.prototype.executeShake = function() {
		
		if(this.shakeTime > 0) {
			
			this._shkincer = this._shkincer === -1 ? 1 : -1;
			var shakeApply = this.shakeForce * this._shkincer;
			this.shakeContainer.style.left = (Number(this.shakeContainer.style.left.replace("px","")) + shakeApply) + "px";
			this.shakeContainer.style.top = (Number(this.shakeContainer.style.top.replace("px","")) - shakeApply) + "px";
			this.shakeTime -= 33.3;
		} else if( this.shakeTime <= 0 && this._shkincer != 717) {
			this.shakeTime = 0;this._shkincer = 717;
			this.shakeContainer.style.left = this._shakeOriginals.x;//the style is very modern, it becomes 'calc(50% - width)'
			this.shakeContainer.style.top = this._shakeOriginals.y;
			
		}
		
	};
	BasicCamera.prototype.shakeInterval = null;
	BasicCamera.prototype.windowLoopExecuteShake = function() {
		this.shakeInterval = window.setInterval( function(e) {
			if(GameSkeleton.game.camera.shakeTime >= -40) {
				GameSkeleton.game.camera.executeShake();
			} else {
				GameSkeleton.game.camera.executeShake();
				window.clearTimeout(GameSkeleton.game.camera.shakeInterval);
			}
		}, 33.3);
	};
	BasicCamera.prototype.__dirmi = 0;
	
    BasicCamera.prototype.tweensLastVXY = {
        v1:null,v2:null,v3:null,v4:null,v5:null,
      x1:0,y1:0,x2:0,y2:0,x3:0,y3:0,x4:0,y4:0,x5:0,y5:0,x6:0,y6:0,x7:0,y7:0,x8:0,y8:0,x9:0,y9:0,x10:0,y10:0  
    };
    
    BasicCamera.prototype.separatedV = function(v) {
      
            return this.tweensLastVXY['v'+v];
        
    };
	BasicCamera.prototype.separatedTweenedBlitLayerRender = function( cameraOffsetPosition, limitX, limitY, tweenTimes, easeType, startingX1, startingX2,startingX3,startingX4,startingX5,startingY1, startingY2,startingY3,startingY4,startingY5 ) {
		
		if(!this.tweensLastVXY.v1) {
		    this.tweensLastVXY.v1 = new Rectangle(startingX1 || this.v.width,0,this.v.width+1-1,this.v.height+1-1);
		    this.tweensLastVXY.v2 = new Rectangle(startingX2 || (this.v.width/5),0,this.v.width+1-1,this.v.height+1-1);
		    this.tweensLastVXY.v3 = new Rectangle(startingX3 || (this.v.width/4),0,this.v.width+1-1,this.v.height+1-1);
		    this.tweensLastVXY.v4 = new Rectangle(startingX4 || (this.v.width/3),0,this.v.width+1-1,this.v.height+1-1);
		    this.tweensLastVXY.v5 = new Rectangle(startingX5 || (this.v.width/2),0,this.v.width+1-1,this.v.height+1-1);
		}
		
		this.v = this.separatedV(1);
		
		var rawx = (cameraOffsetPosition.x - this.v.width);
        var rawy = (cameraOffsetPosition.y - this.v.height);
        var sX = startingX1 != 0 ? startingX1 : 0;
        var sY = startingY2 != 0 ? startingY2 : 0;

        this.v.x = (rawx > sX && rawx <= (limitX || this.v.width)) ? rawx : this.v.x;
        this.v.y = (rawy > sY && rawy <= (limitY || this.v.height)) ? rawy : this.v.y;
		
		var nomv = (this.lastvx == this.v.x && this.lastvy == this.v.y);
		
		this.v.x = this.v.x / this.separatedOffset1;
		
		var tt;
        

        if (this.tweens1.length && this.tweens2.length) {
            this.v.x = Math.floor(this.tweens1.shift());
            this.v.y = Math.floor(this.tweens2.shift());
            this.tweensLastVXY.x1 = this.v.x+1-1;
            this.tweensLastVXY.y1 = this.v.y+1-1;
            
        } else {
			tt = tweenTimes[0];
            TweenMath.tweenArray(this.tweensLastVXY.x1, this.v.x, tt, easeType || "Linear", this._tweenLoopOptions, this.tweens1);
            this.trsh = this.tweens1.shift();
            TweenMath.tweenArray(this.tweensLastVXY.y1, this.v.y, tt, easeType || "Linear", this._tweenLoopOptions, this.tweens2);
            this.trsh = this.tweens2.shift();
            this.v.x = Math.floor(this.tweens1.shift());
            this.v.y = Math.floor(this.tweens2.shift());
            this.tweensLastVXY.x1 = this.v.x+1-1;
            this.tweensLastVXY.y1 = this.v.y+1-1;
           
        }
		
		this.renderB1();
		
		this.v = this.separatedV(2);
		
		rawx = (cameraOffsetPosition.x - this.v.width);
        rawy = (cameraOffsetPosition.y - this.v.height);
        sX = startingX2 != 0 ? startingX2 : 0;
        sY = startingY2 != 0 ? startingY2 : 0;

        this.v.x = (rawx > sX && rawx <= (limitX || this.v.width)) ? rawx : this.v.x;
        this.v.y = (rawy > sY && rawy <= (limitY || this.v.height)) ? rawy : this.v.y;
		
		nomv = (this.lastvx == this.v.x && this.lastvy == this.v.y);
		
		this.v.x = this.v.x / this.separatedOffset2;
		
		if (this.tweens3.length && this.tweens4.length) {
            this.v.x = Math.floor(this.tweens3.shift());
            this.v.y = Math.floor(this.tweens4.shift());
            this.tweensLastVXY.x2 = this.v.x+1-1;
            this.tweensLastVXY.y2 = this.v.y+1-1;
           
        } else {
			tt = tweenTimes[1];
            TweenMath.tweenArray(this.tweensLastVXY.x2, this.v.x, tt, easeType || "Linear", this._tweenLoopOptions, this.tweens3);
            this.trsh = this.tweens3.shift();
            TweenMath.tweenArray(this.tweensLastVXY.y2, this.v.y, tt, easeType || "Linear", this._tweenLoopOptions, this.tweens4);
            this.trsh = this.tweens4.shift();
            this.v.x = Math.floor(this.tweens3.shift());
            this.v.y = Math.floor(this.tweens4.shift());
            this.tweensLastVXY.x2 = this.v.x+1-1;
            this.tweensLastVXY.y2 = this.v.y+1-1;
           
        }
		
		this.renderB2();
		
		
		this.v = this.separatedV(3);
		
		rawx = (cameraOffsetPosition.x - this.v.width);
        rawy = (cameraOffsetPosition.y - this.v.height);
        sX = startingX3 != 0 ? startingX3 : 0;
        sY = startingY3 != 0 ? startingY3 : 0;

        this.v.x = (rawx > sX && rawx <= (limitX || this.v.width)) ? rawx : this.v.x;
        this.v.y = (rawy > sY && rawy <= (limitY || this.v.height)) ? rawy : this.v.y;
		
		nomv = (this.lastvx == this.v.x && this.lastvy == this.v.y);
		
		this.v.x = this.v.x / this.separatedOffset3;
		
		if (this.tweens5.length && this.tweens6.length) {
            this.v.x = Math.floor(this.tweens5.shift());
            this.v.y = Math.floor(this.tweens6.shift());
            this.tweensLastVXY.x3 = this.v.x+1-1;
            this.tweensLastVXY.y3 = this.v.y+1-1;
           
        } else {
			tt = tweenTimes[2];
            TweenMath.tweenArray(this.tweensLastVXY.x3, this.v.x, tt, easeType || "Linear", this._tweenLoopOptions, this.tweens5);
            this.trsh = this.tweens5.shift();
            TweenMath.tweenArray(this.tweensLastVXY.y3, this.v.y, tt, easeType || "Linear", this._tweenLoopOptions, this.tweens6);
            this.trsh = this.tweens6.shift();
            this.v.x = Math.floor(this.tweens5.shift());
            this.v.y = Math.floor(this.tweens6.shift());
            this.tweensLastVXY.x3 = this.v.x+1-1;
            this.tweensLastVXY.y3 = this.v.y+1-1;
           
        }
		
		this.renderB3();
		
		this.v = this.separatedV(4);
		
		rawx = (cameraOffsetPosition.x - this.v.width);
        rawy = (cameraOffsetPosition.y - this.v.height);
        sX = startingX4 != 0 ? startingX4 : 0;
        sY = startingY4 != 0 ? startingY4 : 0;

        this.v.x = (rawx > sX && rawx <= (limitX || this.v.width)) ? rawx : this.v.x;
        this.v.y = (rawy > sY && rawy <= (limitY || this.v.height)) ? rawy : this.v.y;
		
		nomv = (this.lastvx == this.v.x && this.lastvy == this.v.y);
		
		this.v.x = this.v.x / this.separatedOffset4;
		
		if (this.tweens7.length && this.tweens8.length) {
            this.v.x = Math.floor(this.tweens7.shift());
            this.v.y = Math.floor(this.tweens8.shift());
            this.tweensLastVXY.x4 = this.v.x+1-1;
            this.tweensLastVXY.y4 = this.v.y+1-1;
            
        } else {
			tt = tweenTimes[3];
            TweenMath.tweenArray(this.tweensLastVXY.x4, this.v.x, tt, easeType || "Linear", this._tweenLoopOptions, this.tweens7);
            this.trsh = this.tweens7.shift();
            TweenMath.tweenArray(this.tweensLastVXY.y4, this.v.y, tt, easeType || "Linear", this._tweenLoopOptions, this.tweens8);
            this.trsh = this.tweens8.shift();
            this.v.x = Math.floor(this.tweens7.shift());
            this.v.y = Math.floor(this.tweens8.shift());
            this.tweensLastVXY.x4 = this.v.x+1-1;
            this.tweensLastVXY.y4 = this.v.y+1-1;
            
        }
		
		this.renderB4();
		
		this.v = this.separatedV(5);
		
		rawx = (cameraOffsetPosition.x - this.v.width);
        rawy = (cameraOffsetPosition.y - this.v.height);
        sX = startingX5 != 0 ? startingX5 : 0;
        sY = startingY5 != 0 ? startingY5 : 0;

        this.v.x = (rawx > sX && rawx <= (limitX || this.v.width)) ? rawx : this.v.x;
        this.v.y = (rawy > sY && rawy <= (limitY || this.v.height)) ? rawy : this.v.y;
		
		nomv = (this.lastvx == this.v.x && this.lastvy == this.v.y);
		
		this.v.x = this.v.x / this.separatedOffset5;
		
		if (this.tweens9.length && this.tweens10.length) {
            this.v.x = Math.floor(this.tweens9.shift());
            this.v.y = Math.floor(this.tweens10.shift());
            this.tweensLastVXY.x5 = this.v.x+1-1;
            this.tweensLastVXY.y5 = this.v.y+1-1;
        } else {
			tt = tweenTimes[4];
            TweenMath.tweenArray(this.tweensLastVXY.x5, this.v.x, tt, easeType || "Linear", this._tweenLoopOptions, this.tweens9);
            this.trsh = this.tweens9.shift();
            TweenMath.tweenArray(this.tweensLastVXY.y5, this.v.y, tt, easeType || "Linear", this._tweenLoopOptions, this.tweens10);
            this.trsh = this.tweens10.shift();
            this.v.x = Math.floor(this.tweens9.shift());
            this.v.y = Math.floor(this.tweens10.shift());
            this.tweensLastVXY.x5 = this.v.x+1-1;
            this.tweensLastVXY.y5 = this.v.y+1-1;
        }
		
		this.renderB5();
		
		if(this.shakeTime > 0) {
			
			this._shkincer = this._shkincer === -1 ? 1 : -1;
			var shakeApply = this.shakeForce * this._shkincer;
			this.shakeContainer.style.left = (Number(this.shakeContainer.style.left.replace("px","")) + shakeApply) + "px";
			this.shakeContainer.style.top = (Number(this.shakeContainer.style.top.replace("px","")) - shakeApply) + "px";
			this.shakeTime -= 33.3;
		} else if( this.shakeTime <= 0 && this._shkincer != 717) {
			this.shakeTime = 0;this._shkincer = 717; 
			this.shakeContainer.style.left = this._shakeOriginals.x;//the style is very modern, it becomes 'calc(50% - width)'
			this.shakeContainer.style.top = this._shakeOriginals.y;
			
		}
		
	};
	
    BasicCamera.prototype._tweenLoopOptions = {frameRate:60, useSceonds:0, millisecondRate:1000};
    BasicCamera.prototype.tweenedBlitLayerRender = function(cameraOffsetPosition, limitX, limitY, tweenTime, easeType, startingX, startingY) {

        var rawx = (cameraOffsetPosition.x - this.v.width);
        var rawy = (cameraOffsetPosition.y - this.v.height);
        var sX = startingX != 0 ? startingX : 0;
        var sY = startingY != 0 ? startingY : 0;

        this.v.x = (rawx > sX && rawx <= (limitX || this.v.width)) ? rawx : this.v.x;
        this.v.y = (rawy > sY && rawy <= (limitY || this.v.height)) ? rawy : this.v.y;
		
		var nomv = (this.lastvx == this.v.x && this.lastvy == this.v.y);
		
		
        if (this._pV1) { 
            
            this._pV1.x = this.v.x / this.pTween1XOffset;
            this._pV1.y = this.v.y / this.pTween1YOffset;
			
        }
        if (this._pV2) {
            
            this._pV2.x = this.v.x / this.pTween2XOffset;
            this._pV2.y = this.v.y / this.pTween2YOffset;
        }

        if (this.tweens1.length && this.tweens2.length) {
            this.v.x = Math.floor(this.tweens1.shift());
            this.v.y = Math.floor(this.tweens2.shift());
            this.lastvx = this.v.x+1-1;
            this.lastvy = this.v.y+1-1;
        } else {
            TweenMath.tweenArray(this.lastvx, this.v.x, tweenTime, easeType || "Linear", this._tweenLoopOptions, this.tweens1);
            this.trsh = this.tweens1.shift();
            TweenMath.tweenArray(this.lastvy, this.v.y, tweenTime, easeType || "Linear", this._tweenLoopOptions, this.tweens2);
            this.trsh = this.tweens2.shift();
            this.v.x = Math.floor(this.tweens1.shift());
            this.v.y = Math.floor(this.tweens2.shift());
            this.lastvx = this.v.x+1-1;
            this.lastvy = this.v.y+1-1;
        }

        if (this.p1Tweens1.length && this.p1Tweens2.length) {
            
            this._pV1.x = this.p1Tweens1.shift();
            this._pV1.y = this.p1Tweens2.shift();
            this.pLastVs.p1x = this._pV1.x;
            this.pLastVs.p1y = this._pV1.y;
        } else if (this._pLayer1) {
            TweenMath.tweenArray(this.pLastVs.p1x, this._pV1.x, this.pTweenTime || tweenTime * 2, this.pTweenType || "Linear", this._tweenLoopOptions, this.p1Tweens1);
            this.trsh = this.p1Tweens1.shift();
            this._pV1.x = this.p1Tweens1.shift();
            TweenMath.tweenArray(this.pLastVs.p1y, this._pV1.y, this.pTweenTime || tweenTime * 2, this.pTweenType || "Linear", this._tweenLoopOptions, this.p1Tweens2);
            this.trsh = this.p1Tweens2.shift();
            this._pV1.y = this.p1Tweens2.shift();
            this.pLastVs.p1x = this._pV1.x;
            this.pLastVs.p1y = this._pV1.y;
        }

        if (this.p2Tweens1.length && this.p2Tweens2.length) {
            
            this._pV2.x = this.p2Tweens1.shift();
            this._pV1.y = this.p2Tweens2.shift();
            this.pLastVs.p2x = this._pV2.x;
            this.pLastVs.p2y = this._pV2.y;
        } else if (this._pLayer2) {
            TweenMath.tweenArray(this.pLastVs.p2x, this._pV2.x, this.pTweenTime2 || tweenTime * 2, this.pTweenType2 || "Linear", this._tweenLoopOptions, this.p2Tweens1);
            this.trsh = this.p2Tweens1.shift();
            this._pV2.x = this.p2Tweens1.shift();
            TweenMath.tweenArray(this.pLastVs.p2y, this._pV2.y, this.pTweenTime2 || tweenTime * 2, this.pTweenType2 || "Linear", this._tweenLoopOptions, this.p2Tweens2);
            this.trsh = this.p2Tweens2.shift();
            this._pV2.y = this.p2Tweens2.shift();
            this.pLastVs.p2x = this._pV2.x;
            this.pLastVs.p2y = this._pV2.y;
        }


        if (this._pLayer1) {
            this.renderP1();
        }
        if (this._pLayer2) {
            this.renderP2();
        }
		
        this.renderB1();
		this.renderB2();
		this.renderB3();
        this.renderB4();
        this.renderB5();
		
		if(this.shakeTime > 0) {
			
			this._shkincer = this._shkincer === -1 ? 1 : -1;
			var shakeApply = this.shakeForce * this._shkincer;
			this.shakeContainer.style.left = (Number(this.shakeContainer.style.left.replace("px","")) + shakeApply) + "px";
			this.shakeContainer.style.top = (Number(this.shakeContainer.style.top.replace("px","")) - shakeApply) + "px";
			this.shakeTime -= 33.3;
		} else if( this.shakeTime <= 0 && this._shkincer != 717) {
			this.shakeTime = 0;this._shkincer = 717; 
			this.shakeContainer.style.left = this._shakeOriginals.x;//the style is very modern, it becomes 'calc(50% - width)'
			this.shakeContainer.style.top = this._shakeOriginals.y;
			
		}
		
    };
    BasicCamera.prototype._dragPosition = null;
    BasicCamera.prototype.releaseDrag = function() {
        this._dragPosition = null;
    };
    /**
		*
		* example - document.onmousemove = function(e) { camera.drag(mouseMP,64,0,1,100); }
		*           document.onmouseup = function(e) { camera.releaseDrag(); }
		*           gameLoop = function(e) { camera.justRender(); }
		* dragPos - The MoverPoint position the drag starts from, this must be defined, normally is just the mouse position.
		*/
    BasicCamera.prototype.drag = function(dragPos, dragSpeed, limitX, limitY, tweenTime, easeType) {

        if (!this._dragPosition) {
            this._dragPosition = dragPos;
            return;
        }

        var spee = dragSpeed || 64;
        var rawx = this.v.x + ((this._dragPosition.x - dragPos.x) / (this.v.width / spee));
        
        var rawy = this.v.y + ((this._dragPosition.y - dragPos.y) / (this.v.height / spee));
        

        this.v.x = (rawx > 0 && rawx <= (limitX || this.v.width)) ? rawx : this.v.x;
        this.v.y = (rawy > 0 && rawy <= (limitY || this.v.height)) ? rawy : this.v.y;

        if (this.tweens1.length && this.tweens2.length) {
            this.v.x = this.tweens1.shift();
            this.v.y = this.tweens2.shift();
            this.lastvx = this.v.x;
            this.lastvy = this.v.y;
        } else {
            this.tweens1 = TweenMath.tweenArray(this.lastvx, this.v.x, tweenTime, easeType || "Linear");
            this.trsh = this.tweens1.shift();
            this.tweens2 = TweenMath.tweenArray(this.lastvy, this.v.y, tweenTime, easeType || "Linear");
            this.trsh = this.tweens2.shift();
            this.v.x = this.tweens1.shift();
            this.v.y = this.tweens2.shift();
            this.lastvx = this.v.x;
            this.lastvy = this.v.y;
        }
        this.renderB1();
        this.renderB2();
        this.renderB3();
        this.renderB4();
        this.renderB5();
    };
    /**
		*  
		* This method is primaraly for use with the drag method, to render the scene when not being dragged.
		*
		*/
    BasicCamera.prototype.justRender = function() {
        this.renderB1();
        this.renderB2();
        this.renderB3();
        this.renderB4();
        this.renderB5();
    };
    BasicCamera.prototype._isoPoint;
    BasicCamera.prototype.cameraFollowOffsetX = 0;
    BasicCamera.prototype.cameraFollowOffsetY = 0;
    BasicCamera.prototype.setIsoFollowOffsets = function(gameWidth,gameHeight,tileWidth,tileHeight) {
        
        this.v.width = gameWidth - this.viewPortWidth; this.v.height = (gameHeight) - this.viewPortHeight;
        
        this.cameraFollowOffsetY = -((this.viewPortHeight/2)-tileHeight) -  (gameHeight - this.viewPortWidth*2 + tileHeight*2);
        this.cameraFollowOffsetX = -((this.viewPortWidth/2)+tileWidth)  -  (gameWidth - this.viewPortWidth*2);
        
    };
    BasicCamera.prototype.isoTweenedBlitLayerRender = function(tileWidth,tileHeight,scene,pointToFollow, cFollowOffsetX, cFollowOffsetY, limitX, limitY, tweenTime, easeType, startingX, startingY) {
        
       
            var twdth = tileWidth > tileHeight ? tileWidth/tileHeight : tileHeight/tileWidth;
            var thdtw = tileHeight > tileWidth ? tileWidth/tileHeight : tileHeight/tileWidth;
                        
            twdth += scene._xSpreadShifter;
            thdtw += scene._ySpreadShifter;
                        
            var offX = (twdth)/2  + scene._spread;
            var offY = (thdtw)/2  + scene._spread;
                        
            this._isoPoint.x =  offX  * ((thdtw)/twdth) * SimpleIsoPoint.rawToIso(pointToFollow.x,pointToFollow.y,1,0) + (scene.sceneXOffset);
            this._isoPoint.y =  offY  * ((twdth)/thdtw) * SimpleIsoPoint.rawToIso(pointToFollow.x,pointToFollow.y,0,1) + (scene.sceneYOffset);
                         
            this._isoPoint.x -= cFollowOffsetX;
            this._isoPoint.y -= cFollowOffsetY;
            this.tweenedBlitLayerRender(this._isoPoint, limitX,limitY,tweenTime,easeType||"Linear",startingX||0,startingY||0);
        
        
    };
    TweenMath.doubleTweenArray = function(firstStart, firstEnd, secondStart, secondEnd, interval, how, secondHow, loopOptions) {
        var stoa = TweenMath.tweenArray(firstStart, firstEnd, interval, how, loopOptions).join(",") + TweenMath.tweenArray(secondStart, secondEnd, interval, secondHow, loopOptions).join(",");
        return stoa.split(",");
    };
    export { BasicCamera   };


