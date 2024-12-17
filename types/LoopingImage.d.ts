declare function LoopingImage(canvas: HTMLCanvasElement, width: number, height: number): void;
/**
*
* @class LoopingImage
* @classdesc
*    Controls the repeated drawing of an image onto an html canvas.
*    Extends the CanvasObject class.
*
*
* @param canvas {HTMLCanvasElement}
* @param width {Number}
* @param height {Number}
*
*/
declare function LoopingImage(canvas: HTMLCanvasElement, width: number, height: number): void;
declare class LoopingImage {
    constructor(canvas: HTMLCanvasElement, width: number, height: number);
    /**
    *
    * @class LoopingImage
    * @classdesc
    *    Controls the repeated drawing of an image onto an html canvas.
    *    Extends the CanvasObject class.
    *
    *
    * @param canvas {HTMLCanvasElement}
    * @param width {Number}
    * @param height {Number}
    *
    */
    constructor(canvas: HTMLCanvasElement, width: number, height: number);
    bI: number;
    fRect: Rectangle;
    tPoint: MoverPoint;
    /**
    *
    *    Loop the draw of an image horizontally. Useful for creating scrolling backgrounds.
    *	 This method should be called during a requestAnimationFrame loop.
    *
    * @memberof LoopingImage.prototype
    * @method loopHorizontal
    * @param imgToLoop {Image} The image to draw and loop horizontally.
    * @param w {Number} The width of the image
    * @param h {Number} The height of the image
    * @param incer {Number} Optional amount to increment by, default is 1.
    *
    */
    loopHorizontal(imgToLoop: new (width?: number, height?: number) => HTMLImageElement, w: number, h: number, incer: number): void;
}
//# sourceMappingURL=LoopingImage.d.ts.map