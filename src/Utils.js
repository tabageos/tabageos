// --Utils

/*
* Scales the game based on window.innerWidth/Height and gameWidth/Height
* 
* gameWidth - the width of game game
* gameHeight - the height of the game
* divideScaleXBy - amount to divide the scaleX by (1.0 to 1.9)
* divideScaleYBy - amount to divide the scaleY by
* container - reference to the container div element that holds the game and controller canvas element
*             if null is passed no resizing happens
* controller - reference to the controller canvas element
*              (container through the end are optional params)
* showController - Boolean
* controllerStyle - 1 = 'basicController', 2 = 'directionalsController' or you can pass your own String.
*                   sets the controllers canvas elements style id. (see ControllerPad.css and ControllerPad.show())
*  dontPositionController - Boolean, optional if you have placed the controller in your own specific way.
*                           Otherwise the controllers canvas elements style top will be set as controller.y and the left as controller.x.
*  cW = controller width  - default is 640 
*  cH = controller height - default is 192 
*                           
*        
*
*/
tabageos.ResizeGame = function(gameWidth, gameHeight, divideScaleXBy, divideScaleYBy, container, controller, showController, controllerStyle, scaleRectReference, dontPositionController, cW, cH, camera, cmScaleX, cmScaleY) {
	
	var scaleX = window.innerWidth / gameWidth;
	var scaleY = window.innerHeight / gameHeight;
	
	if (controller && !showController) {
		controller.hide();
	} else if (showController && controller) { window.console.log("c show "+ cW + "  "+ cH);
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
			scaleRectReference.width = scaleRect.width;
			scaleRectReference.height = scaleRect.height;
		}
		
		tabageos.MouseController.defineMousePositionOffset(gameWidth, gameHeight, scaleRect.width, scaleRect.height);
	}
};

tabageos._touched = 0;
tabageos._edge = 0;
tabageos.seekTouch = function() {
	var basic =  ('ontouchstart' in window ? 1 : (navigator.maxTouchPoints ? 1 : 0));
	tabageos._edge = window.navigator.userAgent.toLowerCase().indexOf("edg") != -1;
	if(tabageos._edge) basic = false;//for edge we assume no touch, but right when they do 'touch' the touch controller should then show.
	//so on endge, start button must be actually 'touched' for touch.
	if(!tabageos._touched) {
		window.removeEventListener('pointerdown', tabageos.getPointerType, false);
		window.addEventListener('pointerdown', tabageos.getPointerType, false);//get true modern touch
	}
	return tabageos._touched || basic;
};
tabageos.getPointerType = function(e) {
	window.removeEventListener('pointerdown', tabageos.getPointerType, false);
	var result = e.pointerType && e.pointerType == 'touch' ? 1 : 0;
	
	if(!result) {
		
		if(tabageos.GameSkeleton.game && tabageos.GameSkeleton.game.controller) {
			tabageos.GameSkeleton.game.controller.hide();
		}
	}
	
	tabageos._touched = result;
	
	if(result && tabageos.GameSkeleton.game) {
		tabageos.GameSkeleton.game.__instanceBasicTwoLayerResize();//will seekTouch again and potentially show the controller
	}
};
tabageos._pointerEvents = function() {
	return window.PointerEvent ? 1 : 0;
};
tabageos.combineTwoNumbers = function(a,b) {
	return a << 16 | b;
};
tabageos.getAFromCombined = function(num) {
	return num >> 16;
};
tabageos.getBFromCombined = function(num) {
	return num & 0xFFFF;
};
tabageos.splitNumberAtDecimal = function(num, direction) {
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
tabageos.stringSplitNumberAtDecimal = function(num, direction) {
	var absnum = Math.abs(num);
	var fnum = Math.floor(absnum);
	if(direction === 1) {
		return fnum * (num < 0 ? -1 : 1);
	}
	return Number( (num+"").split(".")[1] );
};
tabageos.stringSplitter = function(str, ntimes, exportCodeString) {
	ntimes = ntimes || 10;
	if(ntimes > 10) ntimes = 10;
	var wlen = str.length;
	var plen = wlen/ntimes;
	var i = 0;
	for(i;i<ntimes;i++) {	
		window.console.log( (exportCodeString ? "tabageos.GameSkeleton._str["+i+"]=\"" : "") + str.substr(plen*i,plen).replace("\"data:image/png;base64,","") + "\";" );
	}
};
tabageos.loadSpriteSheetAndStart = function(img, w,h,start) {
	window.addEventListener("GameSkeleton", start, false);
	window.setTimeout( function(e) {
		var sheet = new Image();
		sheet.onload = function(e) {
			var i = 0;
			for(i;i<10;i++) {
				
				if(tabageos.GameSkeleton._str[i]) {
					i = 77; break;
				}
				
			}
			if(i != 77) {
				tabageos.GameSkeleton.__sprites = new tabageos.CanvasObject(null,w,h);
				tabageos.GameSkeleton.__sprites.copyPixels(sheet,new tabageos.Rectangle(0,0,w,h),new tabageos.MoverPoint());
				var ev = document.createEvent("MouseEvents");
				ev.initEvent("GameSkeleton", true, true);
				window.dispatchEvent(ev);
			} else {
				var ai = tabageos.GameSkeleton._str;
				tabageos.GameSkeleton.__baseToCol( w,h, ai[0]+ai[1]+ai[2]+ai[3]+ai[4]+ai[5]+ai[6]+ai[7]+ai[8]+ai[9]  );
			}
		}; sheet.src = img;
	}, 700 ); 
};
//-- end Utils