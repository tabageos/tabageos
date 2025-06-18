import { MoverPoint } from './MoverPoint.js';
import { Rectangle } from './Rectangle.js';
import { Event } from './Event.js';
import { EventDispatcher } from './EventDispatcher.js';
import { TimeKeeper } from './TimeKeeper.js';
import { TravelerSkeleton } from './TravelerSkeleton.js';
import { BoundMethods } from './BoundMethods.js';
import { BlitMath } from './BlitMath.js';
import { MapTraveler} from './MapTraveler.js';
import { ScreenChangeEvent } from './ScreenChangeEvent.js';
import { CanvasObject } from './CanvasObject.js';


	'use strict';
    function ScreenOrganizer(game, screenClasses, screenConfigs, useWorker) {
		EventDispatcher.call(this);
        if (game && screenClasses) {
            this.init(game, screenClasses, screenConfigs);
        }
		this._thrott = 0;
		this.pr = 0;
		this._aid = 0;
		if(ScreenOrganizer._instance) {
			throw "ScreenOrganizer is a singleton, there should only be one ScreenOrganizer.";
		} else {
			ScreenOrganizer._instance = this;
		}
		if(!useWorker) {this._worker = 1; }
    };
	ScreenOrganizer.prototype.constructor = ScreenOrganizer;
	ScreenOrganizer.prototype = Object.create(EventDispatcher.prototype);
	ScreenOrganizer.prototype._thrott = 0;
	ScreenOrganizer.prototype.pr = 0;
	ScreenOrganizer.prototype._aid = 0;
	ScreenOrganizer._instance = null;
	ScreenOrganizer.prototype._worker = null;
	ScreenOrganizer.prototype.usingWorker = function() {
		
		return (ScreenOrganizer._instance._worker === null || ScreenOrganizer._instance._worker != 1);
	};
	ScreenOrganizer.prototype.stopWorker = function() {
		if(ScreenOrganizer._instance._worker && ScreenOrganizer._instance._worker != 1) {
			ScreenOrganizer._instance._worker.terminate();
			ScreenOrganizer._instance._worker = null;
		}
	};
	ScreenOrganizer.prototype.startWorker = function() {
		if(ScreenOrganizer._instance._worker == null) {
			ScreenOrganizer._instance._worker = this.__loopWorker();
		}
	};
	
    ScreenOrganizer.prototype.init = function(game, screenClasses, screenConfigs) {
        var i = 0;
        this.theGame = game;
		
		//will hapen during changeScreen or switchScreen and will be destroyed when transition ends.
		//this._worker = this.__loopWorker();
		
        if (!this.theGame.div && !this.theGame.floor) {
            throw "game must be a CanvasObjectContainer";
        }
        this.myEvents = new EventDispatcher();
        this.coverShape = new CanvasObject(null,this.theGame.getWidth(),this.theGame.getHeight());
		this.coverShape.canvas.setAttribute("style", "image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;image-rendering: pixelated;image-rendering: crisp-edges;");
        this.screenChanging = new ScreenChangeEvent(0,ScreenChangeEvent.SCREEN_CHANGE);
        this.covered = new ScreenChangeEvent(0,ScreenChangeEvent.COVER);
        this.uncovered = new ScreenChangeEvent(0,ScreenChangeEvent.UNCOVER);
        this.rectRef = new Rectangle(0,0,0,0);
        this._screens = [];
        if (screenClasses) {
            this.gameTitleScreen = (typeof screenClasses[0] == "function" ? new screenClasses[0]() : screenClasses[0]);
            this._screens[0] = this.gameTitleScreen;
            if (this._screens[0] == null)
                throw ("The first screen should be the title screen and must be a CanvasObjectContainer.");
            for (i = 0; i < screenClasses.length; i++) {
                if (typeof screenClasses[i] == "function") {
                    if (i != 0)
                        this._screens[i] = new screenClasses[i]();
                } else {
                    if (i != 0)
                        this._screens[i] = screenClasses[i];
                }
                if (screenConfigs && screenConfigs.length != 0 && screenConfigs[i] && typeof screenConfigs[i] == "function") {
                    screenConfigs[i]();
                }
            }
        }
    };
    ScreenOrganizer.prototype.gameTitleScreen = null;
    ScreenOrganizer.prototype.currentScreen = null;
    ScreenOrganizer.prototype.bypassBasicGameObjectKill = null;
    ScreenOrganizer.prototype.myEvents = null;
    ScreenOrganizer.prototype._screens = null;
    ScreenOrganizer.prototype._waitForUnderCoverChanges = null;
    ScreenOrganizer.prototype.theGame = null;
    ScreenOrganizer.prototype.screenChanging = null;
    ScreenOrganizer.prototype.covered = null;
    ScreenOrganizer.prototype.uncovered = null;
    ScreenOrganizer.prototype.coverShape = null;
    ScreenOrganizer.prototype.coverTimer = null;
    ScreenOrganizer.prototype.transitioning = 0;
    ScreenOrganizer.prototype.getTransitionStatus = function() {
        return this.transitioning > 0;
    };
    ScreenOrganizer.prototype.getScreens = function() {
        return this._screens;
    };
    ScreenOrganizer.prototype.getGameReference = function() {
        return this.theGame;
    };
    ScreenOrganizer.prototype.getCoverAnimationRate = function() {
        return this.coverTimer ? this.coverTimer.delay : 0;
    };
    ScreenOrganizer.prototype.setCoverAnimationRate = function(toThis) {
        if (this.coverTimer) {
            this.coverTimer.delay = toThis;
        }
    };
    ScreenOrganizer.prototype._cColor = "#000000";
    ScreenOrganizer.prototype.getCoverColor = function() {
        return this._cColor;
    };
    ScreenOrganizer.prototype.setCoverColor = function(toThis) {
        this._cColor = toThis;
        this.coverShape.drawRect(new Rectangle(0,0,this.theGame.width,this.theGame.height), toThis);
    };
    ScreenOrganizer.prototype.getWaitForUnderCoverChanges = function() {
        return this._waitForUnderCoverChanges;
    };
    ScreenOrganizer.prototype.setWaitForUnderCoverChanges = function(toThis) {
        this._waitForUnderCoverChanges = toThis;
    };
    ScreenOrganizer.prototype.showCoverNoKill = function(ts) {
		
			ScreenOrganizer._instance._thrott = ts;
			var forward = ScreenOrganizer._instance.transitionForward();
			if (forward) {
				window.cancelAnimationFrame(ScreenOrganizer._instance._aid);
				if(ScreenOrganizer._instance.usingWorker()) {
					ScreenOrganizer._instance._worker.removeEventListener("message", ScreenOrganizer._instance.showCoverNoKill);
				}
				ScreenOrganizer._instance.myEvents.dispatchEvent(ScreenOrganizer._instance.screenChanging);
				
				return;
			} 
			if(!ScreenOrganizer._instance.usingWorker()) {
				ScreenOrganizer._instance._aid = window.requestAnimationFrame(ScreenOrganizer._instance.showCoverNoKill);
			}
	};	
    ScreenOrganizer.prototype.initializeTransition = function() {
        this.coverShape.setAlpha(1);
        this.rectRef.width = 0;
        this.rectRef.height = 0;
    };
    ScreenOrganizer.prototype.addScreenUnderCover = function(e) {
	   window.cancelAnimationFrame(ScreenOrganizer._instance._aid);
        this.myEvents.removeEventListener(ScreenChangeEvent.SCREEN_CHANGE, "addScreenUnderCover", this);
        if (this._waitForUnderCoverChanges == true) {
            this.addEventListener(ScreenChangeEvent.UNDER_COVER_CHANGES_COMPLETE, "initRemoveCover", this);
        }
        if (this._screens[e.screenChangeNumber] && this._screens[e.screenChangeNumber] != this.theGame && this.theGame.contains(this.coverShape)) {
            this.theGame.removeChild(this.coverShape);
            this.theGame.addChild(this._screens[e.screenChangeNumber]);
            this.theGame.addChild(this.coverShape);
        }
        this.currentScreen = e.screenChangeNumber;
        this.covered.screenChangeNumber = e.screenChangeNumber;
        if (this._waitForUnderCoverChanges == true) {
            this.dispatchEvent(this.covered);
        } else {
            this.dispatchEvent(this.covered);
            this.initRemoveCover();
        }
    };
    ScreenOrganizer.prototype.rectRef = null;
    ScreenOrganizer.prototype.transitionBackward = function() {
        this.rectRef.width = this.coverShape.width;
        this.rectRef.height += 16;
        this.coverShape.context.clearRect(this.rectRef.x, this.rectRef.y, this.rectRef.width, this.rectRef.height);
        var b = this.rectRef.height >= this.coverShape.height;
        if (b) {
            this.rectRef.width = 0;
            this.rectRef.height = 0;
        }
        return b;
    };
    ScreenOrganizer.prototype.transitionForward = function() {
        this.rectRef.width = this.coverShape.width;
        this.rectRef.height += 16;
        this.coverShape.drawRect(this.rectRef, this._cColor);
        var b = this.rectRef.height >= this.coverShape.height;
        if (b) {
            this.rectRef.width = 0;
            this.rectRef.height = 0;
        }
        return b;
    };
    ScreenOrganizer.prototype.changeScreen = function(toThis) {
        if (this.transitioning == 0) {
		   window.cancelAnimationFrame(ScreenOrganizer._instance._aid);
            this.myEvents.addEventListener(ScreenChangeEvent.SCREEN_CHANGE, "addScreenUnderCover", this);
            if (this.theGame.getNumChildren() == 0 || !this.theGame.contains(this.coverShape)) {
                if (this.theGame.contains(this.coverShape)) {
                    this.theGame.removeChild(this.coverShape);
                }
                this.theGame.addChild(this.coverShape);
            }
            this.transitioning = 1;
            this.initializeTransition();
            this.screenChanging.screenChangeNumber = toThis;
			if(ScreenOrganizer._instance.usingWorker()) {
				if(!ScreenOrganizer._instance._worker) {
					ScreenOrganizer._instance._worker = this.__loopWorker();
				}
				ScreenOrganizer._instance._worker.addEventListener("message", ScreenOrganizer._instance.showCoverNoKill);
			} else {
				ScreenOrganizer._instance._aid = window.requestAnimationFrame(this.showCoverNoKill);
			}
        }
    };
    ScreenOrganizer.prototype.switchScreen = function(toThis) {
        if (this.transitioning == 0) {
		  window.cancelAnimationFrame(ScreenOrganizer._instance._aid);
            this.myEvents.addEventListener(ScreenChangeEvent.SCREEN_CHANGE, "addScreenUnderCover", this);
            if (this.theGame.getNumChildren() == 0 || !this.theGame.contains(this.coverShape)) {
                if (this.theGame.contains(this.coverShape)) {
                    this.theGame.removeChild(this.coverShape);
                }
                this.theGame.addChild(this.coverShape);
            }
            this.transitioning = 1;
            this.initializeTransition();
            this.screenChanging.screenChangeNumber = toThis;
			if(ScreenOrganizer._instance.usingWorker()) {
				if(!ScreenOrganizer._instance._worker) {
					ScreenOrganizer._instance._worker = this.__loopWorker();
				}
				ScreenOrganizer._instance._worker.addEventListener("message", this.showCoverAndKill);
			} else {
				ScreenOrganizer._instance._aid = window.requestAnimationFrame(this.showCoverAndKill);
			}
        }
    };
    ScreenOrganizer.prototype.initRemoveCover = function(e) {
        this.removeEventListener(ScreenChangeEvent.UNDER_COVER_CHANGES_COMPLETE, "initRemoveCover", this);
        this.myEvents.addEventListener(ScreenChangeEvent.SCREEN_CHANGE, "uncoverDone", this);
		if(ScreenOrganizer._instance.usingWorker()) {
			ScreenOrganizer._instance._worker.addEventListener("message", ScreenOrganizer._instance.removeCoverByFadeOut);
		} else {
			ScreenOrganizer._instance._aid = window.requestAnimationFrame(ScreenOrganizer._instance.removeCoverByFadeOut);
		}
    };
    ScreenOrganizer.prototype.removeCoverByFadeOut = function(ts) {
		
		//if(ScreenOrganizer._instance._thrott == 0) ScreenOrganizer._instance._thrott = ts;
		//ScreenOrganizer._instance.pr = ts - ScreenOrganizer._instance._thrott;
		//if(ScreenOrganizer._instance.pr >= 15) {
			ScreenOrganizer._instance._throt = ts;
			var back = ScreenOrganizer._instance.transitionBackward();
			if (back) {
				window.cancelAnimationFrame(ScreenOrganizer._instance._aid);
				if(ScreenOrganizer._instance.usingWorker()) {
					ScreenOrganizer._instance._worker.removeEventListener("message", ScreenOrganizer._instance.removeCoverByFadeOut);
				}
				if (ScreenOrganizer._instance.theGame.contains(ScreenOrganizer._instance.coverShape)) {
					ScreenOrganizer._instance.theGame.removeChild(ScreenOrganizer._instance.coverShape);
				}
				
				ScreenOrganizer._instance.myEvents.dispatchEvent(ScreenOrganizer._instance.screenChanging);
				return;
			} 
		
		//}
		//ScreenOrganizer._instance._worker.addEventListener("message", ScreenOrganizer._instance.removeCoverByFadeOut);
		if(!ScreenOrganizer._instance.usingWorker()) {
			ScreenOrganizer._instance._aid = window.requestAnimationFrame(ScreenOrganizer._instance.removeCoverByFadeOut);
		}
    };
    ScreenOrganizer.prototype.showCoverAndKill = function(ts) {
		
		//if(ScreenOrganizer._instance._thrott == 0) ScreenOrganizer._instance._thrott = ts;
		//ScreenOrganizer._instance.pr = ts - ScreenOrganizer._instance._thrott;
		//if(ScreenOrganizer._instance.pr >= 15) {
			ScreenOrganizer._instance._thrott = ts;
			var forward = ScreenOrganizer._instance.transitionForward();
			if (forward) {
				window.cancelAnimationFrame(ScreenOrganizer._instance._aid);
				if(ScreenOrganizer._instance.usingWorker()) {
					ScreenOrganizer._instance._worker.removeEventListener("message", ScreenOrganizer._instance.showCoverAndKill);
				}
				while (ScreenOrganizer._instance.theGame.getNumChildren() > 0) {
					ScreenOrganizer._instance.theGame.removeChild(ScreenOrganizer._instance.theGame.getChildAt(ScreenOrganizer._instance.theGame.getNumChildren() - 1));
				}
				ScreenOrganizer._instance.theGame.addChildAt(ScreenOrganizer._instance.coverShape, 0);
				
				ScreenOrganizer._instance.myEvents.dispatchEvent(ScreenOrganizer._instance.screenChanging);
				return;
			} 
		
		//}
	//	ScreenOrganizer._instance._worker.addEventListener("message", ScreenOrganizer._instance.showCoverAndKill);
		if(!ScreenOrganizer._instance.usingWorker()) {
			ScreenOrganizer._instance._aid = window.requestAnimationFrame(ScreenOrganizer._instance.showCoverAndKill);
		}
    };
    ScreenOrganizer.prototype.uncoverDone = function(e) {
        this.myEvents.removeEventListener(ScreenChangeEvent.SCREEN_CHANGE, "uncoverDone", this);
        this.uncovered.screenChangeNumber = e.screenChangeNumber;
        this.transitioning = 0;
        this.dispatchEvent(this.uncovered);
        this.dispatchEvent(new ScreenChangeEvent(e.screenChangeNumber,ScreenChangeEvent.SCREEN_CHANGE));
		this.stopWorker();
		
		
    };

ScreenOrganizer.prototype.__loopWorker = function() { 
		
		var blb;var retw = null;
			blb = URL.createObjectURL( new Blob([ '(',
			
				function() {
					var tck = {tick:1};
					var rate = 1000/60;
					var nw = 1;
					var elap = 1;
					var thn = 1;
					var intervl = null;
					onmessage = function(e) {
						if(e.data.frameRate) {
							rate = (1000/e.data.frameRate);
							if(e.data.now) { thn = e.data.now; }
						}
					};
					function constantLoop(ts) {
						
						requestAnimationFrame(constantLoop);
						nw = ts;
						elap = nw - thn;
						tck.tick = nw;
						if(elap > rate) {
							
							self.postMessage(tck);
							thn = (elap % rate);
						}
						
					};
					requestAnimationFrame(constantLoop);
					
				}.toString(),
				
			')()' ], {type: 'application/javascript'} ) );
		
		try {
			retw = new Worker( blb );
		} catch(e) {
			
		}
		return retw;
		
	};

    export { ScreenOrganizer   };



