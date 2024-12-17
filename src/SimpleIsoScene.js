(function() { 

	'use strict';
            
            
            function SimpleIsoScene(tileWidth, tileHeight, floorCO, canvasObject, player, map, tileSheetImg, playerValue, noPassValue, floorValues,  xOffset, yOffset, spread, xSpreadShifter,ySpreadShifter, camera) {
                
                this._helperPoint = new tabageos.SimpleIsoPoint(0,0,0);
                this._mp = new tabageos.MoverPoint();
                this._rect = new tabageos.Rectangle();
                this._rect2 = new tabageos.Rectangle();
                this._focusTile = new tabageos.SimpleIsoPoint();
                this._focusPoint = new tabageos.SimpleIsoPoint();
                this.sceneXOffset = xOffset || 100;
                this.sceneYOffset = yOffset || 100;
                this._twidth = tileWidth;
                this._theight = tileHeight;
                this._canvas = canvasObject;
                this._floor = floorCO || null;
                this._player = player;
                this._map = map;
                this._img = tileSheetImg;
                this._yIndex = 0;
                this.noPassValue = noPassValue || [1,3];
                this.floorValues = floorValues || [0,0];
                this._spread = spread || .009;
                if(this._spread >=2 ) {
                    window.console.warn("spread spreads out each tile, normally it should be 0 through .9, default is .009, smaller and negative values will bring tiles closer together, each decimal place moves things greatly");
                }
                this.playerTileValue = playerValue;
                this._secondDraws = [];
                this._overDraws = [];
                this._xSpreadShifter = xSpreadShifter || 0.00;
                this._ySpreadShifter = ySpreadShifter || 0.00;
                this.movingBoxes = [];
				this._floorScreenCordsArray = [];
                this._cam = camera || null;
                this._effRect1 = new tabageos.Rectangle();
                this._effRect2 = new tabageos.Rectangle();
                this._blittOnce = 0;
            };
            SimpleIsoScene.prototype.constructor = SimpleIsoScene;
            SimpleIsoScene.prototype.sceneYOffset = 500;
            SimpleIsoScene.prototype.sceneXOffset = 250;
            SimpleIsoScene.prototype._helperPoint;
            SimpleIsoScene.prototype._rect;
            SimpleIsoScene.prototype._rect2;
            SimpleIsoScene.prototype._mp;
            SimpleIsoScene.prototype._focusTile;
            SimpleIsoScene.prototype._focusPoint;
            SimpleIsoScene.prototype._canvas;
            SimpleIsoScene.prototype._floor;
            SimpleIsoScene.prototype._player;
            SimpleIsoScene.prototype.playerTileValue;
            SimpleIsoScene.prototype._map;
            SimpleIsoScene.prototype._spread = .009;
            SimpleIsoScene.prototype._img;
            SimpleIsoScene.prototype._twidth = 50;
            SimpleIsoScene.prototype._theight = 50;
            SimpleIsoScene.prototype._xSpreadShifter = 0;
            SimpleIsoScene.prototype._ySpreadShifter = 0.02;
            SimpleIsoScene.prototype._upperTileOffset = 1;
            SimpleIsoScene.prototype.noPassValue = [1,3];
            SimpleIsoScene.prototype.floorValues = [0,0];
            SimpleIsoScene.prototype.movingBoxes = [];
			SimpleIsoScene.prototype._floorScreenCordsArray = [];
            SimpleIsoScene.prototype._cam;
            SimpleIsoScene.prototype._secondDraws = [];
            SimpleIsoScene.prototype._overDraws = [];
			
			SimpleIsoScene.prototype.widthDiff = 2;
			SimpleIsoScene.prototype.widthMulti = 4;
            
            SimpleIsoScene.prototype.updateTileCoordinates = function(x,y, tw,th, fp) {
                
                this._focusTile.x=Math.round(x/tw);
                this._focusTile.y=Math.round(y/th);
                if(fp) { this._focusPoint.x = fp.x +1-1; this._focusPoint.y = fp.y +1-1;}
                else { this._focusPoint.x = this._focusTile.x *tw; this._focusPoint.y = this._focusTile.y *th; }
                
            };
			
			//new
			SimpleIsoScene.prototype.redrawPlayer = function(canvasObject) {
				
				
				this.updateTileCoordinates(this._player.x,this._player.y,this._player.width,this._player.height,this._player);
				
                this.draw(canvasObject || this._canvas,this._img,this._player.animation.getAnimationValue(),this._player.animation.width,this._player.animation.height,this._focusPoint.x,this._focusPoint.y, this._xSpreadShifter,this._ySpreadShifter,this._spread, this._player.animation.fromWidthOffset, this._player.animation.fromHeightOffset, this._player.animation.fromXOffset, this._player.animation.fromYOffset);
				
				
			};
            
			//new
			SimpleIsoScene.prototype.drawCharacter = function(simpleIsoCharacter, canvasObject) {
				
				
				this.updateTileCoordinates(simpleIsoCharacter.x,simpleIsoCharacter.y,simpleIsoCharacter.width,simpleIsoCharacter.height,simpleIsoCharacter);
				
                this.draw(canvasObject || this._canvas,this._img,simpleIsoCharacter.animation.getAnimationValue(),simpleIsoCharacter.animation.width,simpleIsoCharacter.animation.height,this._focusPoint.x,this._focusPoint.y,0,0,this._spread,simpleIsoCharacter.animation.fromWidthOffset,simpleIsoCharacter.animation.fromHeightOffset, simpleIsoCharacter.animation.fromXOffset,simpleIsoCharacter.animation.fromYOffset);
				
				
			};
			//new, generally is copyPixels into the scene, but you have to pass an array value denoting a tile to draw, and then offsets if you want to draw something bigger than a tile.
			SimpleIsoScene.prototype.drawValueAt = function(value,x,y, w,h,canvasObject, aWidthOffset, aHeightOffset, aFromXOffset, aFromYOffset, img) {
				
				
				this.updateTileCoordinates(x,y,w,h);
				
                this.draw(canvasObject || this._canvas,img || this._img,value,w,h,this._focusPoint.x,this._focusPoint.y,this._xSpreadShifter,this._ySpreadShifter,this._spread,aWidthOffset, aHeightOffset, aFromXOffset, aFromYOffset);
				
				
			};
			
			
			SimpleIsoScene.prototype.getPosition = function(tw,th, tx,ty, renderXOffset, renderYOffset, renderSpread) {
				
				var spread = renderSpread || this._spread;
                
                var destY = ty;
                var destX =tx;
                
                
                var twdth = tw > th ? tw/th : th/tw;
                var thdtw = th > tw ? tw/th : th/tw;
                
                twdth += this._xSpreadShifter;
                thdtw += this._ySpreadShifter;
                        
                var offX = (twdth)/2  + spread;
                var offY = (thdtw)/2  + spread;
                
                this._mp.x =  offX  * ((thdtw)/twdth) * tabageos.SimpleIsoPoint.rawToIso(destX,destY,1,0) + (renderXOffset||this.sceneXOffset);
                this._mp.y =  offY  * ((twdth)/thdtw) * tabageos.SimpleIsoPoint.rawToIso(destX,destY,0,1) + (renderYOffset||this.sceneYOffset);
                
                this._mp.x -= (tw - this._twidth);
                this._mp.y -= (th - this._theight);
				
				return new tabageos.MoverPoint(this._mp.x, this._mp.y);
			};
			
            //added animation offset options.
            SimpleIsoScene.prototype.draw = function(subject, source, value, tw,th, tx,ty, renderXOffset, renderYOffset, renderSpread, aWidthOffset, aHeightOffset, aFromXOffset, aFromYOffset) {
                
                var spread = renderSpread || this._spread;
                var tileNum = value[1];
                var yIndex = value[0];
                var destY = ty;
                var destX = tx;
                var sourceX = tileNum * (tw + (aFromXOffset || 0));
                var sourceY = yIndex * (th + (aFromYOffset || 0));
                        
                this._rect.width = tw + (aWidthOffset||0);
                this._rect.height = th + (aHeightOffset||0);
                this._rect.x = sourceX;
                this._rect.y = sourceY;
                        
                var twdth = tw > th ? tw/th : th/tw;
                var thdtw = th > tw ? tw/th : th/tw;
                
                twdth += this._xSpreadShifter;
                thdtw += this._ySpreadShifter;
                        
                var offX = (twdth)/2  + spread;
                var offY = (thdtw)/2  + spread;
                
                this._mp.x =  offX  * ((thdtw)/twdth) * tabageos.SimpleIsoPoint.rawToIso(destX,destY,1,0) + (renderXOffset||this.sceneXOffset);
                this._mp.y =  offY  * ((twdth)/thdtw) * tabageos.SimpleIsoPoint.rawToIso(destX,destY,0,1) + (renderYOffset||this.sceneYOffset);
                
                this._mp.x -= (tw - this._twidth);
                this._mp.y -= (th - this._theight);
                
                if(this._cam) {
                
                    this._effRect1.x = this._cam.v.x;
                    this._effRect1.y = this._cam.v.y;
                    this._effRect1.width = this._cam.viewPortWidth;
                    this._effRect1.height = this._cam.viewPortHeight;

                    this._effRect2.x = this._mp.x;
                    this._effRect2.y = this._mp.y;
                    this._effRect2.width = tw;
                    this._effRect2.height = th;
                    if(tabageos.GeometricMath.rectanglesOverlapAmount(this._effRect1, this._effRect2)/tw >= 1) {
                        subject.copyPixels(source, this._rect, this._mp, tw + (aWidthOffset||0),th + (aHeightOffset||0));
                    }
                    
                } else {
                    subject.copyPixels(source, this._rect, this._mp, tw + (aWidthOffset||0),th + (aHeightOffset||0));
                }
            };
            
            SimpleIsoScene.prototype.rectUpdate = function(destX, destY, tw, th) {
                this._rect.x = this._focusPoint.x;
                this._rect.y = this._focusPoint.y;
                this._rect.width = (tw > th ? tw : th) + tw/this.widthDiff;
                this._rect.height = (th) + tw/this.widthDiff;
                this._rect2.x = destX;
                this._rect2.y = destY;
                this._rect2.width = (tw > th ? tw : th) + tw/this.widthDiff;
                this._rect2.height = (th) + tw/this.widthDiff;
            };
            SimpleIsoScene.prototype._yIndex = 0;
            SimpleIsoScene.prototype._effRect1;
            SimpleIsoScene.prototype._effRect2;
            SimpleIsoScene.prototype._blittOnce = 0;
    
            SimpleIsoScene.prototype.checkTileValueAt = function(x,y,patt,tileWidth,tileHeight,indexHolderPoint) {
                
                return tabageos.BlitMath.checkTileValueAt(x,y,patt,tileWidth,tileHeight,indexHolderPoint);
                
            };
			
			
    
            //added _player animation offsets passed when the player is drawn
            SimpleIsoScene.prototype.specificPatternBlit = function(subject, source, pattern, tw, th, renderXOffset, renderYOffset, renderSpread) {
                this._floorScreenCordsArray.length = 0;
                var i = 0; var j = 0; var l = pattern.length; var jl = pattern[0].length;
                var spread = renderSpread || this._spread;
                var rowPatt; var tileNum; var yIndex; var destY; var destX; var sourceY; var sourceX;
                var olad; var ola;var oi = 0;var twdth;var thdtw;var offX;var offY;var isFloorTile;
                this._overDraws.length = 0;var ei; var el;var en;
                this._secondDraws.length = 0;
                for(i; i < l; i++) { j = 0;
                    for(j; j < jl; j++) {
                        
                        rowPatt = pattern[i];
                        tileNum = rowPatt[j][1] >= 0 ? rowPatt[j][1] : rowPatt[j];
                        yIndex = rowPatt[j][0] >= 0 ? rowPatt[j][0] : this._yIndex;
                        
                        destY = i * (th);
                        destX = j * (tw);
                        
                        sourceX = tileNum * tw;
                        sourceY = yIndex * th;
                        
                        this._rect.width = tw;
                        this._rect.height = th;
                        this._rect.x = sourceX;
                        this._rect.y = sourceY;
                        
                        twdth = tw > th ? tw/th : th/tw;
                        thdtw = th > tw ? tw/th : th/tw;
                        
                        twdth += this._xSpreadShifter;
                        thdtw += this._ySpreadShifter;
                        
                        offX = (twdth)/2  + spread;
                        offY = (thdtw)/2  + spread;
                        
                        this._mp.x =  offX  * ((thdtw)/twdth) * tabageos.SimpleIsoPoint.rawToIso(destX,destY,1,0) + (renderXOffset||this.sceneXOffset);
                        this._mp.y =  offY  * ((twdth)/thdtw) * tabageos.SimpleIsoPoint.rawToIso(destX,destY,0,1) + (renderYOffset||this.sceneYOffset);
                        
                        isFloorTile = 0;
                        oi = 0;
                        for(oi;oi < this.floorValues.length; oi+=2) {
                            if (tileNum == this.floorValues[oi+1] && yIndex==this.floorValues[oi]) {
                                isFloorTile = 1; break;
                            }
                        }
                        
                        if(isFloorTile) { 
                            
                            if(this._blittOnce == 0 && this._floor) {
                                this._floor.copyPixels(source, this._rect, this._mp, tw,th);
                                
                            } else if (!this._floor) {
                                if(this._cam) {
                                    this._effRect1.x = this._cam.v.x;
                                    this._effRect1.y = this._cam.v.y;
                                    this._effRect1.width = this._cam.viewPortWidth;
                                    this._effRect1.height = this._cam.viewPortHeight;

                                    this._effRect2.x = this._mp.x;
                                    this._effRect2.y = this._mp.y;
                                    this._effRect2.width = tw;
                                    this._effRect2.height = th;
                                    if(tabageos.GeometricMath.rectanglesOverlapAmount(this._effRect1, this._effRect2)/tw >= 1) {
                                        subject.copyPixels(source, this._rect, this._mp, tw,th);
                                    }
                                } else {
                                    subject.copyPixels(source, this._rect, this._mp, tw,th);
                                }
                            }
							
							this._floorScreenCordsArray.push(this._mp.x+1-1);
							this._floorScreenCordsArray.push(this._mp.y+1-1);
							this._floorScreenCordsArray.push(j+1-1);
							this._floorScreenCordsArray.push(i+1-1);
							
                        } else { 
                            this._secondDraws.push(i*th);
                            this._secondDraws.push(j*tw);
                            this._secondDraws.push(rowPatt[j]);
                        }
                        
                        if(isFloorTile && rowPatt[j][2]) { 
                            this.draw(subject,source,[rowPatt[j][2],rowPatt[j][3]],tw,th,destX,destY,this.sceneXOffset,this.sceneYOffset,spread);
                        }
                        
                       
                        this._rect.x = this._focusPoint.x;
                        this._rect.y = this._focusPoint.y;
                        this._rect.width = (tw > th ? tw : th) + tw/this.widthDiff;
                        this._rect.height = (th) + tw/this.widthDiff;
                        
                        this._rect2.x = destX;
                        this._rect2.y = destY;
                        this._rect2.width = (tw > th ? tw : th) + tw/this.widthDiff;
                        this._rect2.height = (th) + tw/this.widthDiff;
                        
                        olad = tw > th ? tw : th;
                        ola = tabageos.GeometricMath.rectanglesOverlapAmount(this._rect, this._rect2)/olad;
                        
                        
                        
                        
                        
                        ei = 0; el = this.movingBoxes.length;
                            for (ei; ei < el; ei++) {
                                en = this.movingBoxes[ei];
                                if(en.x < this._player.x + this._player.width/2) {
                                    this.updateTileCoordinates(en.x,en.y,en.width,en.height,en);
                                    this.rectUpdate(destX,destY,tw,th);
                                    ola = tabageos.GeometricMath.rectanglesOverlapAmount(this._rect, this._rect2)/olad;
                                    if(  (this._focusTile.x == j && this._focusTile.y == i && isFloorTile) 
                                        || (ola >= 0.01 && isFloorTile) ) {
                                        this.draw(subject,source,en.animation.getAnimationValue(),en.animation.width,en.animation.height,this._focusPoint.x,this._focusPoint.y,this.sceneXOffset,this.sceneYOffset,spread);
                                    }
                                }
                            }
                        
                        
                        
                        this.updateTileCoordinates(this._player.x,this._player.y,this._player.width,this._player.height,this._player);
						
                        this.rectUpdate(destX,destY,tw,th);
                        ola = tabageos.GeometricMath.rectanglesOverlapAmount(this._rect, this._rect2)/olad;
                        if(  (this._focusTile.x == j && this._focusTile.y == i && isFloorTile && this._player.animation) 
                              || (ola >= 0.01 && isFloorTile && this._player.animation) ) {
                            this.draw(subject,source,this._player.animation.getAnimationValue(),this._player.animation.width,this._player.animation.height,this._focusPoint.x,this._focusPoint.y,this.sceneXOffset,this.sceneYOffset,spread, this._player.animation.fromWidthOffset, this._player.animation.fromHeightOffset, this._player.animation.fromXOffset, this._player.animation.fromYOffset);
                        } else if(destX > this._focusPoint.x + tw -1  && !isFloorTile ) {
                             this._overDraws.push(i*th);
                             this._overDraws.push(j*tw);
                             this._overDraws.push(rowPatt[j]);
                        }
                        
                        
                        ei = 0;
                        for (ei; ei < el; ei++) {
                                en = this.movingBoxes[ei];
                                if(en.x > this._player.x + this._player.width/2) {
                                    this.updateTileCoordinates(en.x,en.y,en.width,en.height,en);
                                    this.rectUpdate(destX,destY,tw,th);
                                    ola = tabageos.GeometricMath.rectanglesOverlapAmount(this._rect, this._rect2)/olad;
                                    if(  (this._focusTile.x == j && this._focusTile.y == i && isFloorTile) 
                                        || (ola >= 0.01 && isFloorTile) ) {
                                        this.draw(subject,source,en.animation.getAnimationValue(),en.animation.width,en.animation.height,this._focusPoint.x,this._focusPoint.y,this.sceneXOffset,this.sceneYOffset,spread);
                                    }
                                }
                            }
                    }   
                }
                var drwval;var drwx;var drwy;var vertCheck;
                
                i = 0; l = this._secondDraws.length;
                for(i; i < l; i+=3) {
                    
                    drwval = this._secondDraws[i+2];
                    drwx = this._secondDraws[i+1];
                    drwy = this._secondDraws[i];
                    
                    this.draw(subject,source,drwval,tw,th,drwx,drwy,this.sceneXOffset,this.sceneYOffset,spread);
                    
                    this.updateTileCoordinates(this._player.x,this._player.y,this._player.width,this._player.height,this._player);
                    
                    this._rect.x = this._focusPoint.x;
                    this._rect.y = this._focusPoint.y;
                    this._rect.width = (tw > th ? tw : th) + tw*this.widthMulti;
                    this._rect.height = (th) + tw*this.widthMulti;
                        
                    this._rect2.x = drwx;
                    this._rect2.y = drwy;
                    this._rect2.width = (tw > th ? tw : th) + tw*this.widthMulti;
                    this._rect2.height = (th) + tw*this.widthMulti;
                        
                    olad = tw*this.widthDiff;
                    ola = tabageos.GeometricMath.rectanglesOverlapAmount(this._rect, this._rect2)/olad;
                    
                    
                    
                    ei = 0;
                    for (ei; ei < el; ei++) {
                                en = this.movingBoxes[ei];
                                if(en.x < this._player.x + this._player.width/2) {
                                    this.updateTileCoordinates(en.x,en.y,en.width,en.height,en);
                                    this.rectUpdate(drwx,drwy,tw,th);
                                    ola = tabageos.GeometricMath.rectanglesOverlapAmount(this._rect, this._rect2)/olad;
                                    if(  (ola >= 0.01) && this._rect2.x < this._focusPoint.x + tw + 1 && this._focusPoint.y + th > this._rect2.y ) {
                                        this.draw(subject,source,en.animation.getAnimationValue(),en.animation.width,en.animation.height,this._focusPoint.x,this._focusPoint.y,this.sceneXOffset,this.sceneYOffset,spread);
                                    }
                                }
                            }
                        
                        
                    
                    
                        this.updateTileCoordinates(this._player.x,this._player.y,this._player.width,this._player.height,this._player);
                        this.rectUpdate(drwx,drwy,tw,th);
                        ola = tabageos.GeometricMath.rectanglesOverlapAmount(this._rect, this._rect2)/olad;
                        if( (ola >= 0.01) && this._rect2.x < this._focusPoint.x + tw + 1 && this._focusPoint.y + th > this._rect2.y) {
                            if(this._player.animation) {
								this.draw(subject,source,this._player.animation.getAnimationValue(),this._player.animation.width,this._player.animation.height ,this._focusPoint.x,this._focusPoint.y,this.sceneXOffset,this.sceneYOffset,spread, this._player.animation.fromWidthOffset, this._player.animation.fromHeightOffset, this._player.animation.fromXOffset, this._player.animation.fromYOffset);
                            }
                        }
                    
                        ei = 0;
                        for (ei; ei < el; ei++) {
                                en = this.movingBoxes[ei];
                                if(en.x > this._player.x + this._player.width/2) {
                                    this.updateTileCoordinates(en.x,en.y,en.width,en.height,en);
                                    this.rectUpdate(drwx,drwy,tw,th);
                                    ola = tabageos.GeometricMath.rectanglesOverlapAmount(this._rect, this._rect2)/olad;
                                    if( (ola >= 0.01) && this._rect2.x < this._focusPoint.x + tw + 1 && this._focusPoint.y + th > this._rect2.y ) {
                                        this.draw(subject,source,en.animation.getAnimationValue(),en.animation.width,en.animation.height,this._focusPoint.x,this._focusPoint.y,this.sceneXOffset,this.sceneYOffset,spread);
                                    }
                                    
                                }
                            }
                    
                    
                        vertCheck = 2;
                        
                        while(drwval[vertCheck] >= 0 && vertCheck <= 15) {
                        
                            if(drwval[vertCheck] >= 0) { 
                                tileNum = drwval[vertCheck+1] >= 0 ? drwval[vertCheck+1] : drwval;
                                yIndex = drwval[vertCheck] >= 0 ? drwval[vertCheck] : 0;
                                sourceX = tileNum * tw;
                                sourceY = yIndex * th;
                                this._rect.width = tw;
                                this._rect.height = th;
                                this._rect.x = sourceX;
                                this._rect.y = sourceY;
                                this._mp.x =  offX  * ((thdtw)/twdth) * tabageos.SimpleIsoPoint.rawToIso(drwx,drwy,1,0) + (renderXOffset||this.sceneXOffset);
                                this._mp.y =  offY  * ((twdth)/thdtw) * tabageos.SimpleIsoPoint.rawToIso(drwx,drwy,0,1) + (renderYOffset||this.sceneYOffset)  - ((th/this._upperTileOffset)*(vertCheck/2));
                                if(this._cam) {
                                    this._effRect1.x = this._cam.v.x;
                                    this._effRect1.y = this._cam.v.y;
                                    this._effRect1.width = this._cam.viewPortWidth;
                                    this._effRect1.height = this._cam.viewPortHeight;
                                    this._effRect2.x = this._mp.x;
                                    this._effRect2.y = this._mp.y;
                                    this._effRect2.width = tw;
                                    this._effRect2.height = th;
                                    if(tabageos.GeometricMath.rectanglesOverlapAmount(this._effRect1, this._effRect2)/tw >= 1) {
                                        subject.copyPixels(source, this._rect, this._mp, tw,th);
                                    }
                                } else {
                                    subject.copyPixels(source, this._rect, this._mp, tw,th);
                                }
                                vertCheck += 2; 
                            } else {
                                vertCheck += 2;
                                break;
                            }
                        }
                    
                    
                    
                    
                    
                    
                    
                }
                
                i = 0; l = this._overDraws.length;
                for(i; i < l; i+=3) {
                    drwval = this._overDraws[i+2];
                    drwx = this._overDraws[i+1];
                    drwy = this._overDraws[i];
                    this.draw(subject,source,drwval,tw,th,drwx,drwy,this.sceneXOffset,this.sceneYOffset,spread);
                    
                    vertCheck = 2;
                        
                        while(drwval[vertCheck] >= 0 && vertCheck <= 15) {
                        
                            if(drwval[vertCheck] >= 0) { 
                                tileNum = drwval[vertCheck+1] >= 0 ? drwval[vertCheck+1] : drwval;
                                yIndex = drwval[vertCheck] >= 0 ? drwval[vertCheck] : 0;
                                sourceX = tileNum * tw;
                                sourceY = yIndex * th;
                                this._rect.width = tw;
                                this._rect.height = th;
                                this._rect.x = sourceX;
                                this._rect.y = sourceY;
                                this._mp.x =  offX  * ((thdtw)/twdth) * tabageos.SimpleIsoPoint.rawToIso(drwx,drwy,1,0) + (renderXOffset||this.sceneXOffset);
                                this._mp.y =  offY  * ((twdth)/thdtw) * tabageos.SimpleIsoPoint.rawToIso(drwx,drwy,0,1) + (renderYOffset||this.sceneYOffset)  - ((th/this._upperTileOffset)*(vertCheck/2));
                                if(this._cam) {
                                    this._effRect1.x = this._cam.v.x;
                                    this._effRect1.y = this._cam.v.y;
                                    this._effRect1.width = this._cam.viewPortWidth;
                                    this._effRect1.height = this._cam.viewPortHeight;
                                    this._effRect2.x = this._mp.x;
                                    this._effRect2.y = this._mp.y;
                                    this._effRect2.width = tw;
                                    this._effRect2.height = th;
                                    if(tabageos.GeometricMath.rectanglesOverlapAmount(this._effRect1, this._effRect2)/tw >= 1) {
                                        subject.copyPixels(source, this._rect, this._mp, tw,th);
                                    }
                                } else {
                                    subject.copyPixels(source, this._rect, this._mp, tw,th);
                                }
                                vertCheck += 2; 
                            } else {
                                vertCheck += 2;
                                break;
                            }
                        }
                    
                    
                    ei = 0;
                        for (ei; ei < el; ei++) {
                                en = this.movingBoxes[ei];
                                if(en.x > this._player.x + this._player.width/2) {
                                    this.updateTileCoordinates(en.x,en.y,en.width,en.height,en);
                                    this.rectUpdate(drwx,drwy,tw,th);
                                    ola = tabageos.GeometricMath.rectanglesOverlapAmount(this._rect, this._rect2)/olad;
                                    if( (ola >= 0.01) && this._rect2.x < this._focusPoint.x + tw + 1 && this._focusPoint.y + th > this._rect2.y ) {
                                        this.draw(subject,source,en.animation.getAnimationValue(),en.animation.width,en.animation.height,this._focusPoint.x,this._focusPoint.y,this.sceneXOffset,this.sceneYOffset,spread);
                                    }
                                    
                                }
                            }
                }
                
                this._blittOnce = 1;
            };
            
			
            SimpleIsoScene.prototype.render = function(clearWidth,clearHeight) {
                
                this.updateTileCoordinates(this._player.x,this._player.y,this._player.width,this._player.height, this._player);
                this._canvas.context.clearRect(0,0,clearWidth||1000,clearHeight||1000);
                this.specificPatternBlit(this._canvas,this._img,this._map,this._twidth,this._theight,this.sceneXOffset,this.sceneYOffset,this._spread);
            }
            
        tabageos.SimpleIsoScene = SimpleIsoScene;

})();