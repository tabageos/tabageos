(function() { 

	'use strict';

	function BlitMath( ) {}
	BlitMath.globalImageSource = null;
	BlitMath.ignoredY = 0;
	BlitMath.pPointPool = [];
	BlitMath.ignored = 0;
	BlitMath.ignoredArrays = [];
	BlitMath.basicPattern = null;
	BlitMath.levelPieceFunction = null;
	BlitMath.ignorSet = [];
	BlitMath.aLevelPiece = null;
	BlitMath._mpoint = new tabageos.MoverPoint();
	BlitMath._rect = new tabageos.Rectangle();
	BlitMath._specs = new tabageos.BlitSpecs(16,16,0);
	BlitMath.levelPieceFactory = function() {
		return BlitMath.aLevelPiece;
	};
	BlitMath.getPositionPoint = function() {
		if (BlitMath.pPointPool.length <= 0) {
			while (BlitMath.pPointPool.length < 50) {
				BlitMath.pPointPool[BlitMath.pPointPool.length] = new tabageos.MoverPoint();
			}
		}
		return BlitMath.pPointPool.pop();
	};
	
	BlitMath.getSpecs = function() {
		if (!BlitMath._specs) {
			BlitMath._specs = new tabageos.BlitSpecs();
		}
		return BlitMath._specs;
	};
	
	BlitMath.setSpecs = function(toThis) {
		BlitMath._specs = toThis;
	};
	
	BlitMath.valuesMatch = function(val1, val2) {
		var r = false;
		if(val1[0] || val1[0] === 0) {
			var i = 0; var l = val1.length;
			for(i; i < l;i++) {
				if(val1[i] != val2[i]) {
					r = false; break;
				} else { r = true; }
			}
		} else {
			if(val1 == val2) { r = true; }
		}
		return r;
	};
	
	BlitMath.drawSquaresFromPattern = function(subject,pattern,squareWidth,squareHeight,colorValues) {

		var i = 0; var j = 0;var val; var col = -1;var vc = 0;
		squareWidth = squareWidth || 16; squareHeight = squareHeight || 16;
		for(i; i < pattern.length;i++) {
			j= 0;
			for(j; j < pattern[i].length; j++) {

				val = pattern[i][j];
				if(val[0] === 0 || val[0]) { vc = val[0]; } else { vc = val; }
				if(colorValues && colorValues[vc]) {
					col = colorValues[vc];
				} else {
					col = -1;
				}
				if( col != -1 ) {
					subject.context.fillStyle = col;
					subject.context.fillRect(j * squareWidth, i * squareHeight, squareWidth, squareHeight);
				}
			}

		}
	}; 
	BlitMath.drawSquaresFromAreaOfPattern = function(subject,pattern,startC, endC, startR, endR,squareWidth,squareHeight,colorValues, toPointOffsetX, toPointOffsetY) {
		
		
		var val; var col = -1;var vc = 0;
		
		var ri =  startC;
		var rl = endC;
		var ci =  startR;
		var cl = endR;
		
		var destY;
		
		var destX;
		
		squareWidth = squareWidth || 16; squareHeight = squareHeight || 16;
		for(ri; ri < rl;ri++) {
			ci= startR;
			for(ci; ci < cl; ci++) {

				val = pattern[ri][ci];
				if(val[0] === 0 || val[0]) { vc = val[0]; } else { vc = val; }
				if(colorValues && colorValues[vc]) {
					col = colorValues[vc];
				} else {
					if(vc != 0) {
						col = 0;
					} else { col = -1; }
				}
				if( col != -1 ) {
					
					destY = (toPointOffsetY || 0) + ((ri - startC) * squareHeight);
					destX = (toPointOffsetX || 0) + ((ci - startR) * squareWidth);
					
					subject.context.fillStyle = col;
					subject.context.fillRect(destX, destY, squareWidth, squareHeight);
				}
			}

		}
		
		
	};

	BlitMath.patternBlit = function(subject, source, pattern, indexXMethod, indexYMethod, toPointOffsetX, toPointOffsetY) {
		var ri =  0;
		var rl = pattern.length;
		var ci =  0;
		var cl = pattern[0].length;
		var bitRect = new tabageos.Rectangle();
		var blitPoint = new tabageos.MoverPoint();
		for (ri = 0; ri < rl; ri++) {
			for (ci = 0; ci < cl; ci++) {
				var rowPatt = pattern[ri];
				var tileNum = indexXMethod ? indexXMethod(rowPatt[ci]) : rowPatt[ci];
				
				var indexY = indexYMethod ? indexYMethod(rowPatt[ci]) : BlitMath._specs.blitIndex;
				
				if (BlitMath.ignorSet.indexOf(tileNum) != -1) {
					tileNum = BlitMath.ignored;
					indexY = 0;
				}
				var destY = (toPointOffsetY || 0) + (ri * BlitMath._specs.blitHeight);
				var cx = ci;
				var destX = (toPointOffsetX || 0) + (cx * BlitMath._specs.blitWidth);
				var sourceX = tileNum * BlitMath._specs.blitWidth;
				var sourceY = indexY * BlitMath._specs.blitHeight;
				
				bitRect.width = BlitMath._specs.blitWidth;
				bitRect.height = BlitMath._specs.blitHeight;
				bitRect.x = sourceX;
				bitRect.y = sourceY;
				blitPoint.x = destX;
				blitPoint.y = destY;
				subject.copyPixels(source, bitRect, blitPoint);
			}
		}
	};
	
	
	
	BlitMath.patternAreaBlit = function(subject, source, pattern, startC, endC, startR, endR,indexXMethod, indexYMethod, toPointOffsetX, toPointOffsetY) {
		var ri =  startC;
		var rl = endC;
		var ci =  startR;
		var cl = endR;
		var bitRect = BlitMath._rect;
		var blitPoint = BlitMath._mpoint;
		for (ri; ri < rl; ri++) { ci =  startR;
			for (ci; ci < cl; ci++) {
				var rowPatt = pattern[ri];
				
				var tileNum = indexXMethod ? indexXMethod(rowPatt[ci]) : rowPatt[ci];
				
				var indexY = indexYMethod ? indexYMethod(rowPatt[ci]) : BlitMath._specs.blitIndex;
				
				if (BlitMath.ignorSet.indexOf(tileNum) != -1) {
					tileNum = BlitMath.ignored;
					indexY = 0;
				}
				var destY =  ((ri - startC) * BlitMath._specs.blitHeight) + (toPointOffsetY || 0);
				var cx = ci;
				var destX =  ((cx - startR) * BlitMath._specs.blitWidth)  + (toPointOffsetX || 0);
				var sourceX = tileNum * BlitMath._specs.blitWidth;
				var sourceY = indexY * BlitMath._specs.blitHeight;
				
				bitRect.width = BlitMath._specs.blitWidth;
				bitRect.height = BlitMath._specs.blitHeight;
				bitRect.x = sourceX;
				bitRect.y = sourceY;
				blitPoint.x = destX;
				blitPoint.y = destY;
				subject.copyPixels(source, bitRect, blitPoint);
			}
		}
	};
	BlitMath.specificPatternAreaBlit = function(subject, source, pattern, startC, endC, startR, endR, toPointOffsetX, toPointOffsetY) {
		var ri =  startC;
		var rl = endC;
		var ci =  startR;
		var cl = endR;
		var bitRect = BlitMath._rect;
		var blitPoint = BlitMath._mpoint;
		for (ri; ri < rl; ri++) { ci =  startR;
			for (ci; ci < cl; ci++) {
				var rowPatt = pattern[ri];
				
				var tileNum =rowPatt[ci][1];
				
				var indexY = rowPatt[ci][0];
				
				if (BlitMath.ignorSet.indexOf(tileNum) != -1) {
					tileNum = BlitMath.ignored;
					indexY = 0;
				}
				var destY =  ((ri - startC) * BlitMath._specs.blitHeight) + (toPointOffsetY || 0);
				var cx = ci;
				var destX =  ((cx - startR) * BlitMath._specs.blitWidth)  + (toPointOffsetX || 0);
				var sourceX = tileNum * BlitMath._specs.blitWidth;
				var sourceY = indexY * BlitMath._specs.blitHeight;
				
				bitRect.width = BlitMath._specs.blitWidth;
				bitRect.height = BlitMath._specs.blitHeight;
				bitRect.x = sourceX;
				bitRect.y = sourceY;
				blitPoint.x = destX;
				blitPoint.y = destY;
				subject.copyPixels(source, bitRect, blitPoint);
			}
		}
	};
	
	BlitMath.combinedPatternBlit = function(subject, source, pattern, toPointOffsetX, toPointOffsetY) {
		var ri =  0;
		var rl = pattern.length;
		var ci =  0;
		var cl = pattern[0].length;
		var bitRect = BlitMath._rect;
		var blitPoint = BlitMath._mpoint;
		for (ri = 0; ri < rl; ri++) {
			for (ci = 0; ci < cl; ci++) {
				var rowPatt = pattern[ri];
				var tileNum = rowPatt[ci] >> 16; 
				
				var indexY = rowPatt[ci] & 0xFFFF; 
				
				if (BlitMath.ignorSet.indexOf(tileNum) != -1) {
					tileNum = BlitMath.ignored;
					indexY = 0;
				}
				var destY = (toPointOffsetY || 0) + (ri * BlitMath._specs.blitHeight);
				var cx = ci;
				var destX = (toPointOffsetX || 0) + (cx * BlitMath._specs.blitWidth);
				var sourceX = tileNum * BlitMath._specs.blitWidth;
				var sourceY = indexY * BlitMath._specs.blitHeight;
				
				bitRect.width = BlitMath._specs.blitWidth;
				bitRect.height = BlitMath._specs.blitHeight;
				bitRect.x = sourceX;
				bitRect.y = sourceY;
				blitPoint.x = destX;
				blitPoint.y = destY;
				subject.copyPixels(source, bitRect, blitPoint);
			}
		}
	};
	BlitMath.xySwitch = function(subject, xFitst, yFirst) {
		var a;
		var b;
		var hold0;
		var hold1;
		var i = 0;
		var bi = 0;
		for (i = 0; i < subject.length; i++) {
			a = subject[i];
			bi = 0;
			for (bi = 0; bi < a.length; bi++) {
				b = a[bi];
				hold0 = b.shift();
				hold1 = b.shift();
				b[0] = hold1;
				b[1] = hold0;
			}
		}
	}
	;
	BlitMath.specificPatternBlit = function(subject, source, pattern, tw, th, toPointOffsetX, toPointOffsetY) {
		var ri = 0;
		var rl = pattern.length;
		var ci = 0;
		var cl = pattern[0].length;
		var bitRect = new tabageos.Rectangle();
		var blitPoint = new tabageos.MoverPoint();
		for (ri = 0; ri < rl; ri++) {
			for (ci = 0; ci < cl; ci++) {
				var rowPatt = pattern[ri]; 
				var tileNum = rowPatt[ci][1];
				var yIndex = rowPatt[ci][0];
				var ia = 0;
				var a;
				for (ia = 0; ia < BlitMath.ignoredArrays.length; ia++) {
					a = BlitMath.ignoredArrays[ia];
					if (rowPatt[ci][0] == a[0] && rowPatt[ci][1] == a[1]) {
						tileNum = BlitMath.ignored;
						yIndex = BlitMath.ignoredY;
						break;
					}
				}
				var destY = (toPointOffsetY || 0) + (ri * BlitMath._specs.blitHeight);
				var cx = ci;
				var destX = (toPointOffsetX || 0) + (cx * BlitMath._specs.blitWidth);
				var sourceX = tileNum * BlitMath._specs.blitWidth;
				var sourceY = yIndex * BlitMath._specs.blitHeight;
				bitRect.width = BlitMath._specs.blitWidth;
				bitRect.height = BlitMath._specs.blitHeight;
				var ox;
				var oy;
				if (rowPatt[ci][2] && rowPatt[ci][3]) {
					ia = 0;
					ox = rowPatt[ci][3];
					oy = rowPatt[ci][2];
					for (ia; ia < BlitMath.ignoredArrays.length; ia++) {
						a = BlitMath.ignoredArrays[ia];
						if (rowPatt[ci][2] == a[0] && rowPatt[ci][3] == a[1]) {
							ox = BlitMath.ignored;
							oy = BlitMath.ignoredY;
							break;
						}
					}
					bitRect.x = ox * BlitMath._specs.blitWidth;
					bitRect.y = oy * BlitMath._specs.blitHeight;
					blitPoint.x = destX;
					blitPoint.y = destY;
					subject.copyPixels(source, bitRect, blitPoint, tw || BlitMath._specs.blitWidth, th || BlitMath._specs.blitHeight);
				}
				bitRect.x = sourceX;
				bitRect.y = sourceY;
				blitPoint.x = destX;
				blitPoint.y = destY;
				subject.copyPixels(source, bitRect, blitPoint, tw || BlitMath._specs.blitWidth, th || BlitMath._specs.blitHeight);
			}
		}
	};
	
	
	
	
	BlitMath.patternActionEvent = new tabageos.PatternActionEvent();
	BlitMath.functionAssignments = [];
	
	
	
	BlitMath.dispatchFunctionAssignments = function(eventDispatcher, handlerFunctionString, handlerObject, pattern, tileWidth, tileHeight) {
		if (handlerFunctionString != null) {
			eventDispatcher.addEventListener(tabageos.PatternActionEvent.FUNCTION_ASSIGNMENT, handlerFunctionString, handlerObject);
			if (BlitMath.patternActionEvent.type == tabageos.PatternActionEvent.PATTERN_ACTION_EVENT) {
				BlitMath.patternActionEvent = new tabageos.PatternActionEvent(0,0,0,0,false,tabageos.PatternActionEvent.FUNCTION_ASSIGNMENT,0,0);
			}
		}
		var a;
		var i = 0;
		var len;
		var row = 0;
		var ob;
		var fa;
		var fi;
		var oa;
		a = pattern;
		if (!a)
		return;
		row = -1;
		var alen = a.length;
		var ai = 0;
		for (ai = 0; ai < alen; ai++) {
			row++;
			oa = a[ai];
			len = oa.length;
			i = 0;
			for (i = 0; i < len; i++) {
				ob = oa[i];
				fi = 0;
				for (fi = 0; fi < BlitMath.functionAssignments.length; fi++) {
					fa = BlitMath.functionAssignments[fi];
					if ( ((typeof fa == 'array' || typeof fa =='object') && BlitMath.valuesMatch(fa,ob) )  || (typeof fa == 'number' && fa === ob) ) {
						
						BlitMath.patternActionEvent.tileValue = ob;
						BlitMath.patternActionEvent.tileXIndex = i;
						BlitMath.patternActionEvent.tileYIndex = row;
						BlitMath.patternActionEvent.x = (i * tileWidth);
						BlitMath.patternActionEvent.y = (row * tileHeight);
						BlitMath.patternActionEvent.patternIndex = 0;
						BlitMath.patternActionEvent.typeToBe = tabageos.PatternActionEvent.FUNCTION_ASSIGNMENT;
						eventDispatcher.dispatchEvent(BlitMath.patternActionEvent);
						break;
					}
				}
			}
		}
		if (handlerFunctionString != null) {
			eventDispatcher.removeEventListener(tabageos.PatternActionEvent.FUNCTION_ASSIGNMENT, handlerFunctionString, handlerObject);
		}
	}
	;
	BlitMath.isATileAt = function(x, y, patt, tileWidth, tileHeight) {
		var i = 0;
		var j = 0;
		var tx;
		var ty;
		var result = false;
		var l = patt.length;
		var jl = patt[0].length;
		var a;
		for (i = 0; i < l; i++) {
			for (j = 0; j < jl; j++) {
				tx = j * tileWidth;
				ty = i * tileHeight;
				if ((x >= tx && x < tx + tileWidth) && (y >= ty && y < ty + tileHeight)) {
					a = patt[i][j];
					if ((a[0] && a[0] != 0) || (a[1] && a[1] != 0) || a != 0) {
						result = true;
						break;
					}
				}
				;
			}
		}
		return result;
	}
	;
	BlitMath.tileDataHolder = [];
	BlitMath.convertInternalValues = function(arr, tileWidth, tileHeight, yIndex) {
		var a = [];
		var i = 0;
		for (i; i < arr.length; i++) {
			var mp = new tabageos.MoverPoint(i * tileWidth,yIndex * tileHeight);
			var td = new tabageos.TileData(mp,arr[i]);
			a.push(td);
		}
		return a;
	};
	
	BlitMath.isANonZeroTileAt = function(x, y, patt, tileWidth, tileHeight) {
		var i = 0;
		var j = 0;
		var tx;
		var ty;
		var result = false;
		var l = patt.length;
		var jl = patt[0].length;
		var a;
		for (i = 0; i < l; i++) {
			for (j = 0; j < jl; j++) {
				tx = j * tileWidth;
				ty = i * tileHeight;
				if ((x >= tx && x < tx + tileWidth) && (y >= ty && y < ty + tileHeight)) {
					a = patt[i][j];
					if ((a[0] && a[1] && a[0] != 0 && a[1] != 0) || a != 0) {
						result = true;
						break;
					}
				}
				;
			}
		}
		return result;
	};
	
	BlitMath.addSpecificValuesToMultiArray = function(mda,values) {
		var i = 0;
		var l = mda.length;
		var ina;
		var j = 0;
		var jl;
		
		var na;
		for (i; i < l; i++) {
			ina = mda[i];
			j = 0;
			jl = mda[i].length;
			if(mda[i][0] && mda[i][0].length) { 
				
				
				for (j; j < jl; j++) {
					
					if(j == jl-1) {
						
						ina[j+1] = values[i] || [0,0];
					}
					
					
				}
				
			} else {
				
				for (j; j < jl; j++) {
					
					if(j == jl-1) {
						
						ina[j+1] = values[i] || 0;
					}
				}
				
			}
		}
		
		
		
		
		
	};
	
	BlitMath.cloneMultiArray = function(mda) {
		
		var i = 0;
		var l = mda.length;
		var ina;
		var j = 0;
		var jl;
		var clone = [];
		var na;
		for (i; i < l; i++) {
			ina = mda[i];
			j = 0;
			jl = mda[i].length;
			if(mda[i][0] && mda[i][0].length) { 
				clone[i] = [];
				
				for (j; j < jl; j++) {
					na = [(typeof ina[j][0] == "number" ? ina[j][0] + 1 - 1 : ina[j][0]), (typeof ina[j][1] == "number" ? ina[j][1] + 1 - 1 : ina[j][1])];
					clone[i].push(na);
					if (ina[j][2]) {
						na.push((typeof ina[j][2] == "number" ? ina[j][2] + 1 - 1 : ina[j][2]));
					}
					if (ina[j][3]) {
						na.push((typeof ina[j][3] == "number" ? ina[j][3] + 1 - 1 : ina[j][3]));
					}
				}
				
			} else {
				clone[i] = [];
				for (j; j < jl; j++) {
					clone[i].push(ina[j]+1-1);	
				}
				
			}
		}
		return clone;
	};
	BlitMath.replaceAllOfValueFromMultiArray = function(mda, value, rZero, rOne) {
		
		var i = 0;
		var l = mda.length;
		var ina;
		var j = 0;
		var jl;
		var clone = [];
		var na;
		for (i; i < l; i++) {
			ina = mda[i];
			j = 0;
			jl = mda[i].length;
			if(mda[i][0] && mda[i][0].length) { 
				clone[i] = [];
				
				for (j; j < jl; j++) {
					na = [(typeof ina[j][0] == "number" ? ina[j][0] + 1 - 1 : ina[j][0]), (typeof ina[j][1] == "number" ? ina[j][1] + 1 - 1 : ina[j][1])];
					if(na[0] == value[0] && na[1] == value[1]) {
						na = [rZero || 0,rOne || 0];
					}
					clone[i].push(na);
					if (ina[j][2]) {
						na.push((typeof ina[j][2] == "number" ? ina[j][2] + 1 - 1 : ina[j][2]));
					}
					if (ina[j][3]) {
						na.push((typeof ina[j][3] == "number" ? ina[j][3] + 1 - 1 : ina[j][3]));
					}
				}
				
			} else {
				clone[i] = [];
				for (j; j < jl; j++) {
					clone[i].push(ina[j] != value ? ina[j]+1-1 : (rZero || 0));	
				}
				
			}
		}
		return clone;
		
	};
	
	
	BlitMath.replaceValuesFromMultiArray = function(mda, values, rZero, rOne) {
		
		var i = 1; var l = values.length;
		var a = BlitMath.replaceAllOfValueFromMultiArray(mda,values[0], rZero,rOne);;
		for(i; i < l;i++) { 
			a = BlitMath.replaceAllOfValueFromMultiArray(a,values[i], rZero,rOne);
			
		}
		return a;
		
	};
	BlitMath.resetTileDataHolder = function() {
		BlitMath.tileDataHolder = [];
	};
	BlitMath.convertToTileDataHolder = function(patt, tileWidth, tileHeight) {
		BlitMath.tileDataHolder = [];
		var i = 0;
		for (i; i < patt.length; i++) {
			BlitMath.tileDataHolder.push(BlitMath.convertInternalValues(patt[i], tileWidth, tileHeight, patt.indexOf(patt[i])));
		}
	};
	BlitMath.checkTileValueAt = function(x, y, patt, tileWidth, tileHeight, indexHolderPoint,resultShouldBeThisForIndex) {
		var result = 0;
		var i = 0;
		var j = 0;
		var tx;
		var ty;
		var l = patt.length;
		var jl = patt[0].length;
		for (i = 0; i < l; i++) { 
			for (j = 0; j < jl; j++) { 
				tx = j * tileWidth;
				ty = i * tileHeight;
				if ((x >= tx && x < tx + tileWidth) && (y >= ty && y < ty + tileHeight)) {
					if(indexHolderPoint && !resultShouldBeThisForIndex) { indexHolderPoint.x = j+1-1; indexHolderPoint.y = i+1-1; }
					result = patt[i][j];
					if(result[0] && resultShouldBeThisForIndex && resultShouldBeThisForIndex[0] && resultShouldBeThisForIndex[0] == result[0]) {
						if(result[1] && resultShouldBeThisForIndex[1] && resultShouldBeThisForIndex[1] == result[1]) {
							indexHolderPoint.x = j+1-1; indexHolderPoint.y = i+1-1;
						}
					} else if(result && resultShouldBeThisForIndex && result == resultShouldBeThisForIndex) {
						indexHolderPoint.x = j+1-1; indexHolderPoint.y = i+1-1;
					}
					return result;
				}
			}
		}
		return result;
	};
	BlitMath._wasmGetIndexFromArbitraryBitwise = null;
	BlitMath._wasmLeftBit = null;
	BlitMath._wasmRightBit =  null;
	BlitMath.fasterCheckTileValueAt = function(x, y, pattLength,innerPattLength, tileWidth, tileHeight, indexHolderPoint) {
		
		var i = 0;
		var j = 0;
		var tx = 0;
		var ty = 0;
		var l = pattLength;
		var jl = innerPattLength;
		for (i = 0; i < l; i++) {
			for (j = 0; j < jl; j++) {
				tx = j * tileWidth;
				ty = i * tileHeight;
				if ((x >= tx && x < tx + tileWidth) && (y >= ty && y < ty + tileHeight)) {
					if(indexHolderPoint) { indexHolderPoint.x = j+1-1; indexHolderPoint.y = i+1-1; }
					return;
				}
			}
		}
		return; 
	};
	BlitMath.getTileDataAt = function(x, y, patt, tileWidth, tileHeight) {
		var result;
		
		
		if (!BlitMath.tileDataHolder || BlitMath.tileDataHolder.length <= 0) {
			BlitMath.convertToTileDataHolder(patt, tileWidth, tileHeight);
		}
		var i = 0;
		var j = 0;
		var tx;
		var ty;
		var l = patt.length;
		var jl = patt[0].length;
		for (i = 0; i < l; i++) {
			for (j = 0; j < jl; j++) {
				tx = j * tileWidth;
				ty = i * tileHeight;
				if ((x >= tx && x < tx + tileWidth) && (y >= ty && y < ty + tileHeight)) {
					result = BlitMath.tileDataHolder[i][j];
					return result;
				}
			}
		}
		return result || null;
	};
	BlitMath.specificBlit = function(subject, source, pattern, tw, th, xIn, yIn) {
		var ri = yIn || 0;
		var ci = xIn || 0;
		var bitRect = new tabageos.Rectangle();
		var blitPoint = new tabageos.MoverPoint();
		var rowPatt = pattern[ri];
		var tileNum = rowPatt[ci][1];
		var yIndex = rowPatt[ci][0];
		var ia = 0;
		var a;
		for (ia = 0; ia < BlitMath.ignoredArrays.length; ia++) {
			a = BlitMath.ignoredArrays[ia];
			if (rowPatt[ci][0] == a[0] && rowPatt[ci][1] == a[1]) {
				tileNum = BlitMath.ignored;
				yIndex = BlitMath.ignoredY;
				break;
			}
		}
		var destY = ri * BlitMath._specs.blitHeight;
		var cx = ci;
		var destX = cx * BlitMath._specs.blitWidth;
		var sourceX = tileNum * BlitMath._specs.blitWidth;
		var sourceY = yIndex * BlitMath._specs.blitHeight;
		bitRect.width = BlitMath._specs.blitWidth;
		bitRect.height = BlitMath._specs.blitHeight;
		var ox;
		var oy;
		if (rowPatt[ci][2] && rowPatt[ci][3]) {
			ia = 0;
			ox = rowPatt[ci][3];
			oy = rowPatt[ci][2];
			for (ia; ia < BlitMath.ignoredArrays.length; ia++) {
				a = BlitMath.ignoredArrays[ia];
				if (rowPatt[ci][2] == a[0] && rowPatt[ci][3] == a[1]) {
					ox = BlitMath.ignored;
					oy = BlitMath.ignoredY;
					break;
				}
			}
			bitRect.x = ox * BlitMath._specs.blitWidth;
			bitRect.y = oy * BlitMath._specs.blitHeight;
			blitPoint.x = destX;
			blitPoint.y = destY;
			subject.copyPixels(source, bitRect, blitPoint, tw || BlitMath._specs.blitWidth, th || BlitMath._specs.blitHeight);
		}
		bitRect.x = sourceX;
		bitRect.y = sourceY;
		blitPoint.x = destX;
		blitPoint.y = destY;
		subject.copyPixels(source, bitRect, blitPoint, tw || BlitMath._specs.blitWidth, th || BlitMath._specs.blitHeight);
	};
	BlitMath.removeTileData = function(td, map, canvasObject, img, tw, th, clearWidth, clearHeight, tdh) {
		map[td.position.y / tw][td.position.x / th] = [0, 0];
		canvasObject.context.clearRect(td.position.x, td.position.y, tw, th);
		tabageos.BlitMath._specs.blitWidth = tw;
		tabageos.BlitMath._specs.blitHeight = th;
		tabageos.BlitMath.specificBlit(canvasObject, img, map, tw, th, td.position.x / th, td.position.y / tw);
		
		if (!tdh)
		tabageos.BlitMath.convertToTileDataHolder(map, tw, th);
	};
	BlitMath.addValueToTileDataPosition = function(td, value, map, canvasObject, img, tw, th, clearWidth, clearHeight, tdh) {
		map[td.position.y / tw][td.position.x / th] = value;
		canvasObject.context.clearRect(td.position.x, td.position.y, tw, th);
		tabageos.BlitMath._specs.blitWidth = tw;
		tabageos.BlitMath._specs.blitHeight = th;
		tabageos.BlitMath.specificBlit(canvasObject, img, map, tw, th, td.position.x / th, td.position.y / tw);
		
		if (!tdh)
		tabageos.BlitMath.convertToTileDataHolder(map, tw, th);
	};
	BlitMath.addValueToPosition = function(x, y, value, map, canvasObject, img, tw, th, clearWidth, clearHeight, tdh) {
		map[y / tw][x / th] = value;
		if(canvasObject) {
			canvasObject.context.clearRect(x, y,tw,  th);
			tabageos.BlitMath._specs.blitWidth = tw;
			tabageos.BlitMath._specs.blitHeight = th;
			tabageos.BlitMath.specificBlit(canvasObject, img, map, tw, th, x / th, y / tw);
			
			
			if (!tdh) {
				tabageos.BlitMath.convertToTileDataHolder(map, tw, th);
			}
		}
	};
	BlitMath.getBasicPatternOf = function(thisTile, patt, tileWidth, tileHeight, leftToRight) {
		var i = 0;
		var j = 0;
		var txre;
		var tyre;
		var l = patt.length;
		var jl = patt[0].length;
		var result = [];
		var nmp;
		if(!leftToRight) {
			for (i = 0; i < l; i++) {
				for (j = 0; j < jl; j++) {
					txre = j * tileWidth;
					tyre = i * tileHeight;
					if(typeof patt[i][j] != 'number') {
						if (patt[i][j][0] == thisTile[0] && patt[i][j][1] == thisTile[1]) {
							nmp = new tabageos.MoverPoint(txre,tyre);
							result.push(nmp);

						}
					} else {
						if (patt[i][j] == thisTile) {
							nmp = new tabageos.MoverPoint(txre,tyre);
							result.push(nmp);
						}
					}
				}
			}

		} else { i = l-1; j = 0;
			for (i; i >= 0; i--) {

				
				txre = j * tileWidth;
				tyre = i * tileHeight;
				if(typeof patt[i][j] != 'number') {
					if (patt[i][j][0] == thisTile[0] && patt[i][j][1] == thisTile[1]) {
						nmp = new tabageos.MoverPoint(txre,tyre);
						result.push(nmp);

					}
				} else {
					if (patt[i][j] == thisTile) {
						nmp = new tabageos.MoverPoint(txre,tyre);
						result.push(nmp);
					}
				}
				
				if(i === 0 && j < jl-1) {
					j++; i = l-1;
				}
			}
		}

		return result;
	};
	tabageos.BlitMath = BlitMath;
})();

