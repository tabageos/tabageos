import {EventDispatcher} from './EventDispatcher.js';
import {MoverPoint} from './MoverPoint.js';
import {BlitMath} from './BlitMath.js';
import {GameSkeleton} from './GameSkeleton.js';

	'use strict';

    function TileSceneChanger(spriteSheetSource, canvasObject, sceneWidth, sceneHeight, tw,th, mainChar) {
		EventDispatcher.call(this);
        this.mainChar = mainChar;
        this._source = spriteSheetSource;
        this.sW = sceneWidth;
        this.sH = sceneHeight;
        this.tW = tw;
        this.tH = th;
        this._display = canvasObject;
        this._cameraPoint = new MoverPoint();
		this._totalScenes = [0];
    };
	TileSceneChanger.prototype.constructor = TileSceneChanger;
    TileSceneChanger.prototype = Object.create(EventDispatcher.prototype);
    TileSceneChanger.prototype.sW;
    TileSceneChanger.prototype.sH;
    TileSceneChanger.prototype.tW;
    TileSceneChanger.prototype.tH;
    TileSceneChanger.prototype.mainChar;
    TileSceneChanger.prototype._source;
    TileSceneChanger.prototype._display;
    TileSceneChanger.prototype._cameraPoint;
    TileSceneChanger.prototype.currentMap;
    TileSceneChanger.prototype._mapNumber = 1;
    TileSceneChanger.prototype.currentScene = 1;
    TileSceneChanger.prototype._map1;
	TileSceneChanger.prototype.screenChangePositionOffset = 32;
    TileSceneChanger.prototype._map2;
    TileSceneChanger.prototype._totalScenes = [0];
    TileSceneChanger.prototype._direcs = {
        "left": 0,
        "right": 1,
        "down": 2,
        "up": 3
    };
    TileSceneChanger.prototype._enemyArrays = [0];
    TileSceneChanger.prototype.addEnemyArray = function(arr, scene) {
        var narr = [];
        var i = 0;
        for (i; i < arr.length; i++) {
            narr[i] = arr[i];
        }
        this._enemyArrays[scene || this.currentScene] = narr;
    };
    TileSceneChanger.prototype.getEnemyArray = function(scene) {
        return this._enemyArrays[scene];
    };
    TileSceneChanger.prototype._otherArrays = [0];
    TileSceneChanger.prototype.addStoredArray = function(arr, scene) {
        var narr = [];
        var i = 0;
        for (i; i < arr.length; i++) {
            narr[i] = arr[i];
        }
		if (i == 0) { narr = [0]; narr.length = 0; }
        this._otherArrays[scene || this.currentScene] = narr;
    };
    TileSceneChanger.prototype.getStoredArray = function(scene) {
		if(!scene || scene <= 0) { scene = 1; }
        return this._otherArrays[scene];
    };
   
    TileSceneChanger.prototype.defineMap1 = function(map2DArray) {
        this._map1 = BlitMath.cloneMultiArray(map2DArray);
    };
    TileSceneChanger.prototype.defineMap2 = function(map2DArray) {
        this._map2 = BlitMath.cloneMultiArray(map2DArray);
    };
   
    TileSceneChanger.prototype.addScene = function(map2DArray) {
        this._totalScenes.push(BlitMath.cloneMultiArray(map2DArray));
		if(this._desiredMap && this._totalScenes[this._desiredMap]) {
			this.currentMap = this._totalScenes[this._desiredMap+1-1];
			this._desiredMap = 0;
		}
    };
    TileSceneChanger.prototype.add5Scenes = function(map2DArray, map2DArray2, map2DArray3, map2DArray4, map2DArray5) {
        this._totalScenes.push(BlitMath.cloneMultiArray(map2DArray));
        this._totalScenes.push(BlitMath.cloneMultiArray(map2DArray2));
        this._totalScenes.push(BlitMath.cloneMultiArray(map2DArray3));
        this._totalScenes.push(BlitMath.cloneMultiArray(map2DArray4));
        this._totalScenes.push(BlitMath.cloneMultiArray(map2DArray5));
		if(this._desiredMap && this._totalScenes[this._desiredMap]) {
			this.currentMap = this._totalScenes[this._desiredMap+1-1];
			this._desiredMap = 0;
		}
    };
    TileSceneChanger.prototype.referenceScene = function(referenceIndex) {
        return this._totalScenes[referenceIndex] || null;
    };
	TileSceneChanger.prototype.clearAllArrays = function() {
        this._totalScenes.length = 0;
		this._otherArrays.length = 0;
		this._enemyArrays.length = 0;
    };
	TileSceneChanger.prototype._desiredMap = 0;//updated 1.47
    TileSceneChanger.prototype.changeCurrentMap = function(mapInteger) {
        if (mapInteger == 1 && this._map1) {
            this.currentMap = this._map1;
            this._mapNumber = 1;
        } else {
			this.currentMap = this._totalScenes[mapInteger] || this._map2;
			if(!this.currentMap) {
				this._desiredMap = mapInteger+1-1;
			}
            this._mapNumber = mapInteger;
        }
    };
	
	TileSceneChanger.prototype.changeSceneEnemies = function(scene) {
           
			var storedEnemies = this.getEnemyArray(scene);
			var enemyArray;
			
			if(storedEnemies) {
				enemyArray = storedEnemies;
			} else {
				this.addEnemyArray([], scene);
				storedEnemies = this.getEnemyArray(scene);
				enemyArray = storedEnemies;
			}
			
			
			return enemyArray;
	};
	TileSceneChanger.prototype.changeSceneryObjects = function(scene) {
		var storedScenery = this.getStoredArray(scene);
            var sceneryArray;
			
			if(storedScenery) {
				sceneryArray = storedScenery;
				
			} else {
				this.addStoredArray([], scene);
				storedScenery = this.getStoredArray(scene);
				sceneryArray = storedScenery;
			}
		
		return sceneryArray;
	};
	TileSceneChanger.prototype.sceneryObjectSceneChange = function(sceneryObject, sceneryArray, limitLeft, limitRight, limitUp, limitDown) {
		
		var obj = sceneryObject;
		if(!obj) return;
		var oa;
		var result = 0;
		if(limitLeft && obj.x <=limitLeft) { 
			if(this._totalScenes[this.currentScene-1]) {
				oa = this.getStoredArray(this.currentScene-1);
				if(oa) {
					oa.push(obj);
				} else {
					this.addStoredArray([], this.currentScene-1);
					oa = this.getStoredArray(this.currentScene-1);
					oa.push(obj);
				}
				sceneryArray.splice(sceneryArray.indexOf(obj),1);
			} else {
				if(this._totalScenes[this._totalScenes.length-1]) {
					oa = this.getStoredArray(this._totalScenes.length-1);
					if(oa) {
						oa.push(obj);
					} else {
						this.addStoredArray([], this._totalScenes.length-1);
						oa = this.getStoredArray(this._totalScenes.length-1);
						oa.push(obj);
					}
					sceneryArray.splice(sceneryArray.indexOf(obj),1);
				}
			}
			obj.setX(limitRight - 5);result = 1;
		}
		
		if(limitRight && obj.x >=limitRight) {
			if(this._totalScenes[this.currentScene+1]) {
				oa = this.getStoredArray(this.currentScene+1);
				if(oa) {
					oa.push(obj);
				} else {
					this.addStoredArray([], this.currentScene+1);
					oa = this.getStoredArray(this.currentScene+1);
					oa.push(obj);
				}
				sceneryArray.splice(sceneryArray.indexOf(obj),1);
			} else {
				if(this._totalScenes[1]) {
					oa = this.getStoredArray(1);
					if(oa) {
						oa.push(obj);
					} else {
						this.addStoredArray([], 1);
						oa = this.getStoredArray(1);
						oa.push(obj);
					}
					sceneryArray.splice(sceneryArray.indexOf(obj),1);
				}
			}
			obj.setX(limitLeft + 4); result = 1;
		} 
		
		
		if(limitUp && obj.y <=limitUp) { 
			if(this._totalScenes[this.currentScene-1]) {
				oa = this.getStoredArray(this.currentScene-1);
				if(oa) {
					oa.push(obj);
				} else {
					this.addStoredArray([], this.currentScene-1);
					oa = this.getStoredArray(this.currentScene-1);
					oa.push(obj);
				}
				sceneryArray.splice(sceneryArray.indexOf(obj),1);
			} else {
				if(this._totalScenes[this._totalScenes.length-1]) {
					oa = this.getStoredArray(this._totalScenes.length-1);
					if(oa) {
						oa.push(obj);
					} else {
						this.addStoredArray([], this._totalScenes.length-1);
						oa = this.getStoredArray(this._totalScenes.length-1);
						oa.push(obj);
					}
					sceneryArray.splice(sceneryArray.indexOf(obj),1);
				}
			}
			obj.setY(limitDown - obj.width - 1);result = 1;
		}
		
		if(limitDown && obj.y >=limitDown) {
			if(this._totalScenes[this.currentScene+1]) {
				oa = this.getStoredArray(this.currentScene+1);
				if(oa) {
					oa.push(obj);
				} else {
					this.addStoredArray([], this.currentScene+1);
					oa = this.getStoredArray(this.currentScene+1);
					oa.push(obj);
				}
				sceneryArray.splice(sceneryArray.indexOf(obj),1);
			} else {
				if(this._totalScenes[1]) {
					oa = this.getStoredArray(1);
					if(oa) {
						oa.push(obj);
					} else {
						this.addStoredArray([], 1);
						oa = this.getStoredArray(1);
						oa.push(obj);
					}
					sceneryArray.splice(sceneryArray.indexOf(obj),1);
				}
			}
			obj.setY(limitUp + 4); result = 1;
		} 
		
		return result;
		
	};
	
    
    TileSceneChanger.prototype.changeScene = function(mapInteger, direction, camera, faMethod, faMethodObject, directScene, dontResetCameraX, dontResetCameraY, dontUpdateEnemyMaps, frameTime, ts,tweenType) {

        var direc = (typeof direction == "number" ? direction : (this._direcs[direction] || 1));
		
        if (!directScene) {

            if (mapInteger == 0) {
                
                if (direc == 0) {
                    
                    this.currentScene -= 1;
                    if (this._totalScenes[this.currentScene]) {
                        this.currentMap = this._totalScenes[this.currentScene];
                    } else {
                        this.currentScene = this._totalScenes.length - 1;
                        this.currentMap = this._totalScenes[this.currentScene] || this._map2;
                    }
					
					this.mainChar.setX(this.sW - (this.screenChangePositionOffset  ));
					
                }
                if (direc == 1) {
                    
                    this.currentScene += 1;
                    if (this._totalScenes[this.currentScene]) {
                        this.currentMap = this._totalScenes[this.currentScene];
                    } else {
                        this.currentScene = 1;
                        this.currentMap = this._totalScenes[this.currentScene] || this._map1;
                    }
					
					this.mainChar.setX((this.screenChangePositionOffset ));
					
                }
				
				
				if (direc == 2) {
                    
					this.currentScene += 1;
                    if (this._totalScenes[this.currentScene]) {
                        this.currentMap = this._totalScenes[this.currentScene];
                    } else {
                        this.currentScene = 1;
                        this.currentMap = this._totalScenes[this.currentScene] || this._map1;
                    }
					
					this.mainChar.setY(this.screenChangePositionOffset);
                    
                }
                if (direc == 3) {
                    
                    this.currentScene -= 1;
                    if (this._totalScenes[this.currentScene]) {
                        this.currentMap = this._totalScenes[this.currentScene];
                    } else {
                        this.currentScene = this._totalScenes.length - 1;
                        this.currentMap = this._totalScenes[this.currentScene] || this._map2;
                    }
					
					this.mainChar.setY(this.sH - (this.screenChangePositionOffset+1));
                }
				
				
            }

            if (mapInteger == 1 || mapInteger == 2) {
                
                this.changeCurrentMap(mapInteger);
            }

            this.mainChar._map = BlitMath.cloneMultiArray(this.currentMap);
          
            
            
			
        } else {

            if (this._totalScenes[directScene]) {
                this.currentScene = directScene;
                this.currentMap = this._totalScenes[this.currentScene];
                this.mainChar._map = BlitMath.cloneMultiArray(this.currentMap);

            }

        }
		
		var i = 0;var en;var ena = this.getEnemyArray(this.currentScene);
		if(ena && !dontUpdateEnemyMaps) {
            for(i;i<ena.length;i++) {
				en = ena[i];
				en._map = this.mainChar._map;
            }
			
			i = 0;
			ena = this.getStoredArray(this.currentScene);
			if(ena) {
				for(i; i < ena.length; i++) {
					en = ena[i];
					en._map = this.mainChar._map;
					
				}
			}
			
		}
		 
        this._display.context.clearRect(0, 0, this.sW, this.sH);
       

        if (faMethod) {  
            
            BlitMath.dispatchFunctionAssignments(this, faMethod, faMethodObject, this.currentMap, this.tW, this.tH);
			
        }
        if(this._source) {
			BlitMath.specificPatternBlit(this._display, this._source, this.currentMap, this.tW, this.tH);
		} else {
			
			BlitMath.drawSquaresFromPattern(this._display,this.currentMap,this.tW,this.tH,camera ? camera.colorValues : {});
		}
	   if (!directScene) { 
           if(camera) { 
				this._cameraPoint.x = Math.round(this.mainChar.x) -  (direc != 0 ? camera.cameraFollowOffsetX : -this.tW*2);
				this._cameraPoint.y = Math.round(this.mainChar.y) -  ((direc == 3 ) ? -this.tH*2 : camera.cameraFollowOffsetY);
			
				camera.reset(dontResetCameraX ? camera.v.x : (direc == 1 ? 0 : camera.v.width),dontResetCameraY ? camera.v.y : (direc == 2 ? 0 : camera.v.height));
				camera.tweenedBlitLayerRender(this._cameraPoint, 0,0, ( GameSkeleton.game ? GameSkeleton.game._frameTimeCalc() : ((frameTime && ts) ? frameTime/ts : 1)  ),tweenType || "Linear",0,0);
			}
        }

    };

    export { TileSceneChanger   };




