
tabageos = tabageos || {};

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
tabageos.seekTouch = function() {
	return ('ontouchstart'in window ? 1 : (navigator.maxTouchPoints ? 1 : 0));
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