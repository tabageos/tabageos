import {MouseController} from './MouseController.js';
import {GameSkeleton} from './GameSkeleton.js';

export function ResizeGame(gameWidth, gameHeight, divideScaleXBy, divideScaleYBy, container, controller, showController, controllerStyle, scaleRectReference, dontPositionController, cW, cH, camera, cmScaleX, cmScaleY) {
    
	var scaleX = window.innerWidth / gameWidth;
    var scaleY = window.innerHeight / gameHeight;
    
	if (controller && !showController) {
        controller.hide();
    } else if (showController && controller) { 
        controller.show(cW || 640, cH || 192, controllerStyle || 1);
    }
	
    if (container) {
        container.style.transformOrigin = "0 0";
        container.style.transform = "scale(" + (divideScaleXBy ? scaleX / divideScaleXBy : 1) + "," + (divideScaleYBy ? scaleY / divideScaleYBy : 1) + ")";
        var scaleRect = container.getBoundingClientRect();
		
		if(camera) {
			camera.layerToRender.canvas.style.transformOrigin = "0 0";
			camera.layerToRender.canvas.style.transform = "scale(" + (divideScaleXBy ? cmScaleX / divideScaleXBy : 1) + "," + (divideScaleYBy ? cmScaleY / divideScaleYBy : 1) + ")";
		}
		
        if(scaleRectReference) {
            scaleRectReference.width = scaleRect.width+1-1;
            scaleRectReference.height = scaleRect.height+1-1;
        }
		
        MouseController.defineMousePositionOffset(gameWidth, gameHeight, scaleRect.width, scaleRect.height);
    }
};
export function seekMobile() {
	
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(window.navigator.userAgent);
	
};


export function seekTouch() {
	if(!window._touched) { window._touched = -1; }
	if(!window._edge) { window._edge = -1; }
	var basic =  ('ontouchstart' in window ? 1 : (navigator.maxTouchPoints ? 1 : 0));
	window._edge = window.navigator.userAgent.toLowerCase().indexOf("edg") != -1;
	if(window._edge) basic = false;
	if(window._touched === -1) {
		window.removeEventListener('pointerdown', getPointerType, false);
		window.addEventListener('pointerdown', getPointerType, false);
	}
	return window._touched || basic;
};
export function getPointerType(e) {
	window.removeEventListener('pointerdown', getPointerType, false);
	var result = e.pointerType && e.pointerType == 'touch' ? 1 : 0;
	
	if(!result) {
		
		if(GameSkeleton.game && GameSkeleton.game.controller) {
			GameSkeleton.game.controller.hide();
		}
	}
	
	window._touched = result;
	
	if(result && GameSkeleton.game) {
		GameSkeleton.game.__instanceBasicTwoLayerResize();//will seekTouch again and potentially show the controller
	}
};
export function _pointerEvents() {
	return window.PointerEvent ? 1 : 0;
};
export function combineTwoNumbers(a,b) {
	return a << 16 | b;
};
export function getAFromCombined(num) {
	return num >> 16;
};
export function getBFromCombined(num) {
	return num & 0xFFFF;
};
export function splitNumberAtDecimal(num, direction) {
	var absnum = Math.abs(num);
	var fnum = Math.floor(absnum);
	if(direction === 1) {
		return fnum * (num < 0 ? -1 : 1);
	}
	var thounum = Math.round( (absnum - fnum) * 1000 );
	var hunnum = Math.round( (absnum - fnum) * 100 ); 
	var tennum = Math.round( (absnum - fnum) * 10 );
	
	return fnum+(tennum/10) === absnum ? tennum : ( (fnum+(hunnum/100) <= absnum + .001 && fnum+(hunnum/100) >= absnum) ? hunnum : thounum );
	
};
export function stringSplitNumberAtDecimal(num, direction) {
	var absnum = Math.abs(num);
	var fnum = Math.floor(absnum);
	if(direction === 1) {
		return fnum * (num < 0 ? -1 : 1);
	}
	return Number( (num+"").split(".")[1] );
};
export function stringSplitter(str, ntimes, exportCodeString) {
	ntimes = ntimes || 10;
	if(ntimes > 10) ntimes = 10;
	var wlen = str.length;
	var plen = wlen/ntimes;
	var i = 0;
	for(i;i<ntimes;i++) {	
		window.console.log( (exportCodeString ? "GameSkeleton._str["+i+"]=\"" : "") + str.substr(plen*i,plen).replace("\"data:image/png;base64,","") + "\";" );
	}
};
export function loadSpriteSheetAndStart(img, w,h,start, preloadingMethod) {
	
	if(!start) {
		throw 'loadSpriteSheetAndStart: error, A start method must be passed or the games class that extends GameSkeleton';
		return;
	}
	if(typeof start == 'string') {
		throw 'loadSpriteSheetAndStart: error, start is a string. The start param must be a method to call or a class to construct';
	}

	let startingFunction = function(ev) { 
		try { start(); } 
		catch(e) { new start(); } 
	};
	window.addEventListener("GameSkeleton", startingFunction, false);
		
	if(preloadingMethod) {
		
		GameSkeleton._totalLoad += 1;
		GameSkeleton.assignPreloadMethod(preloadingMethod);
	
	} 
	
	
	window.setTimeout( function(e) {
		var sheet = new Image();
		sheet.onload = function(e) {
			var i = 0;
			for(i;i<10;i++) {
				
				if(GameSkeleton._str[i]) {
					i = 77; break;
				}
				
			}
			if(i != 77) {
				GameSkeleton.__sprites = new CanvasObject(null,w,h);
				GameSkeleton.__sprites.copyPixels(sheet,new Rectangle(0,0,w,h),new MoverPoint());
				var ev = document.createEvent("MouseEvents");
				ev.initEvent("GameSkeleton", true, true);
				window.dispatchEvent(ev);
			} else {
				var ai = GameSkeleton._str;GameSkeleton._loadedSpriteSheet = sheet;
				GameSkeleton.__baseToCol( w,h, ai[0]+ai[1]+ai[2]+ai[3]+ai[4]+ai[5]+ai[6]+ai[7]+ai[8]+ai[9]  );
			}
		}; sheet.src = img;
	}, 700 ); 
};