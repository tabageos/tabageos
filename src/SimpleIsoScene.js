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
            
            SimpleIsoScene.prototype.updateTileCoordinates = function(x,y, tw,th, fp) {
                
                this._focusTile.x=Math.round(x/tw);
                this._focusTile.y=Math.round(y/th);
                if(fp) { this._focusPoint.x = fp.x +1-1; this._focusPoint.y = fp.y +1-1;}
                else { this._focusPoint.x = this._focusTile.x *tw; this._focusPoint.y = this._focusTile.y *th; }
                
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
			
            /*
            * Draws a tile from a tilesheet into the scene using BlitMath notation;
            *  [y,x] value denote the y and x index in the tilesheet to draw from.
            *  tw and th are the tile width and height, the y x index from value is multiplied by tw or th to get the position to draw from.
            *  tx and ty are the 2d point to draw to, pass in the 2d grid based point, this method translates to iso for you,
            *  ._spread, ._xSpreadShifter and ._ySpreadShifter can be used to make specific graphical adjustemnts,
            *  play with values from 0.9 to +/-0.000009 to get it looking exactly right for your graphics. (whole numbers are too much)
            *
            *  renderXOffset and renderYOffset offset the whole scene on the subject
            *
            */
            SimpleIsoScene.prototype.draw = function(subject, source, value, tw,th, tx,ty, renderXOffset, renderYOffset, renderSpread) {
                
                var spread = renderSpread || this._spread;
                var tileNum = value[1];
                var yIndex = value[0];
                var destY = ty;
                var destX =tx;
                var sourceX = tileNum * tw;
                var sourceY = yIndex * th;
                        
                this._rect.width = tw;
                this._rect.height = th;
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
                        subject.copyPixels(source, this._rect, this._mp, tw,th);
                    }
                    
                } else {
                    subject.copyPixels(source, this._rect, this._mp, tw,th);
                }
            };
            
            SimpleIsoScene.prototype.rectUpdate = function(destX, destY, tw, th) {
                this._rect.x = this._focusPoint.x;
                this._rect.y = this._focusPoint.y;
                this._rect.width = (tw > th ? tw : th) + tw/2;
                this._rect.height = (th) + tw/2;
                this._rect2.x = destX;
                this._rect2.y = destY;
                this._rect2.width = (tw > th ? tw : th) + tw/2;
                this._rect2.height = (th) + tw/2;
            };
            SimpleIsoScene.prototype._yIndex = 0;
            SimpleIsoScene.prototype._effRect1;
            SimpleIsoScene.prototype._effRect2;
            SimpleIsoScene.prototype._blittOnce = 0;
    
            SimpleIsoScene.prototype.checkTileValueAt = function(x,y,patt,tileWidth,tileHeight,indexHolderPoint) {
                
                return tabageos.BlitMath.checkTileValueAt(x,y,patt,tileWidth,tileHeight,indexHolderPoint);
                
            };
			
			
    
            /*
            *
            * Using a standard BlitMath style 2D Array of [y,x] based values, draws an iso scene using a tilesheet.
            * The Array passed can also be a standard basic integer based; [[1,1,1,1,1],
            *                                                               [0,0,0,0,0]];
            *
            *   It's actually not simple... you can use this method along with the others, or you can just call render().
            */
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
                        this._rect.width = (tw > th ? tw : th) + tw/2;
                        this._rect.height = (th) + tw/2;
                        
                        this._rect2.x = destX;
                        this._rect2.y = destY;
                        this._rect2.width = (tw > th ? tw : th) + tw/2;
                        this._rect2.height = (th) + tw/2;
                        
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
                            this.draw(subject,source,this._player.animation.getAnimationValue(),this._player.animation.width,this._player.animation.height,this._focusPoint.x,this._focusPoint.y,this.sceneXOffset,this.sceneYOffset,spread);
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
                    this._rect.width = (tw > th ? tw : th) + tw*4;
                    this._rect.height = (th) + tw*4;
                        
                    this._rect2.x = drwx;
                    this._rect2.y = drwy;
                    this._rect2.width = (tw > th ? tw : th) + tw*4;
                    this._rect2.height = (th) + tw*4;
                        
                    olad = tw*2;
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
								this.draw(subject,source,this._player.animation.getAnimationValue(),this._player.animation.width,this._player.animation.height,this._focusPoint.x,this._focusPoint.y,this.sceneXOffset,this.sceneYOffset,spread);
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
            
			/*
			*
			* encapsulates all calls to render the scene, instantiate the class with desired settings, and call render during a loop. 
			*
			*/
            SimpleIsoScene.prototype.render = function(clearWidth,clearHeight) {
                
                this.updateTileCoordinates(this._player.x,this._player.y,this._player.width,this._player.height, this._player);
                this._canvas.context.clearRect(0,0,clearWidth||1000,clearHeight||1000);
                this.specificPatternBlit(this._canvas,this._img,this._map,this._twidth,this._theight,this.sceneXOffset,this.sceneYOffset,this._spread);
            }
            
        tabageos.SimpleIsoScene = SimpleIsoScene;

})();



