declare function CanvasObject(canvas?: HTMLCanvasElement, width?: number, height?: number, dontPixelate?: number, scaleToPix?: number): void;
/**
*
*  @class CanvasObject
* @classdesc
*    A CanvasObject represents an html canvas element and has methods for drawing to the canvas and manipulating pixels.
*    To allow for easeir inheritance this constructor is actually calling the init method, which in turn can be used like a super method.
*
*
* @param [canvas] {HTMLCanvasElement} The canvas html element that this instance will reference, if blank a canvas element is created.
* @param [width=1] {Number} The width of the canvas.
* @param [height=1] {Number} The height of the canvas.
* @param [dontPixelate=0] {Number} If 0 or absent the canvas will be set up to display crisp edges.
* @param [scaleToPix=0]  {Number} If 1 and dontPixelate is 0 the canvas will be scaled to window.devicePixelRatio if available.
*
*/
declare function CanvasObject(canvas?: HTMLCanvasElement, width?: number, height?: number, dontPixelate?: number, scaleToPix?: number): void;
declare class CanvasObject {
    constructor(canvas?: HTMLCanvasElement, width?: number, height?: number, dontPixelate?: number, scaleToPix?: number);
    /**
    *
    *  @class CanvasObject
    * @classdesc
    *    A CanvasObject represents an html canvas element and has methods for drawing to the canvas and manipulating pixels.
    *    To allow for easeir inheritance this constructor is actually calling the init method, which in turn can be used like a super method.
    *
    *
    * @param [canvas] {HTMLCanvasElement} The canvas html element that this instance will reference, if blank a canvas element is created.
    * @param [width=1] {Number} The width of the canvas.
    * @param [height=1] {Number} The height of the canvas.
    * @param [dontPixelate=0] {Number} If 0 or absent the canvas will be set up to display crisp edges.
    * @param [scaleToPix=0]  {Number} If 1 and dontPixelate is 0 the canvas will be scaled to window.devicePixelRatio if available.
    *
    */
    constructor(canvas?: HTMLCanvasElement, width?: number, height?: number, dontPixelate?: number, scaleToPix?: number);
    /**
    *
    *  The init method can be thought of like super. If extending the CanvasObject class call init in your extensions constructor.
    *    init sets up the canvas based on the parameters given.
    *
    * @memberof CanvasObject.prototype
    * @method init
    * @param [canvas] {HTMLCanvasElement} The canvas html element, if one is not given a canvas element is created.
    * @param [width=1] {Number} The width of the canvas element
    * @param [height=1] {Number} The height of the canvas element
    * @param [placePixelData=0] {Number} If present (1 or true) the imageData of the canvas will be stored in the ._pixelData property
    * @param [dontPixelate=0] {Number} If absent (0 or just not there) the canvas will be set up to render crisp edges.
    * @param [scaleToPix=0] {Number} If present the canvas will be scaled to window.devicePixelRatio if available, dontPixelate must be 0.
    *
    */
    init(canvas?: HTMLCanvasElement, width?: number, height?: number, placePixelData?: number, dontPixelate?: number, scaleToPix?: number): void;
    width: number;
    height: number;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    _pixelData: ImageData;
    pixelDataArray: Uint8ClampedArray;
    _alpha: number;
    /**
    *
    *    Sets the globalAlpha property of the canvas context.
    *
    * @memberof CanvasObject.prototype
    * @method setAlpha
    * @param value
    *
    */
    setAlpha(value: any): void;
    /**
    *
    *    Sets the strokeStyle property of the canvas context.
    *
    * @memberof CanvasObject.prototype
    * @method setStrokeStyle
    * @param colorString {String}
    *
    */
    setStrokeStyle(colorString: string): void;
    /**
    *
    *    Sets the fillStyle property of the canvas context.
    *
    * @memberof CanvasObject.prototype
    * @method setFillStyle
    * @param colorString {String}
    *
    */
    setFillStyle(colorString: string): void;
    /**
    *   Draws from the source image, from the given rectangle, onto the canvas at the given point.
    *
    *
    * @memberof CanvasObject.prototype
    * @method copyPixels
    * @param source {HTMLImage}
    * @param fromRect {Rectangle}
    * @param toMoverPoint {MoverPoint}
    * @param [copyWidth] {Number}
    * @param [copyHeight] {Number}
    * @param [commit=false] {Boolean} If true calls context.getImageData and updates the pixelDataArray. Typically not needed.
    *
    */
    copyPixels(source: HTMLImage, fromRect: Rectangle, toMoverPoint: MoverPoint, copyWidth?: number, copyHeight?: number, commit?: boolean): void;
    /**
    *
    *   Draws the given image at the x and y location given.
    *
    * @memberof CanvasObject.prototype
    * @method drawImage
    * @param img {HTMLImg}
    * @param toX {Number}
    * @param toY {Number}
    * @param [commit=false] {Boolean} If true calls context.getImageData and updates the pixelDataArray. Typically not needed.
    *
    */
    drawImage(img: HTMLImg, toX: number, toY: number, commit?: boolean): void;
    /**
    *
    *    Draws a triangle at the point given.
    *
    * @memberof CanvasObject.prototype
    * @method drawTriangle
    * @param trianglePointX {Number}
    * @param trianglePointY {Number}
    * @param width {Number}
    * @param height {Number}
    * @param [color] {String}
    * @param [horizontal=false] {Boolean}
    * @param [commit=false] {Boolean} If true calls context.getImageData and updates the pixelDataArray. Typically not needed.
    *
    */
    drawTriangle(trianglePointX: number, trianglePointY: number, width: number, height: number, color?: string, horizontal?: boolean, commit?: boolean): void;
    /**
    *
    *    Draws a circle whose center is at the x and y given, with the given radius.
    *
    * @memberof CanvasObject.prototype
    * @method drawCircle
    * @param x {Number}
    * @param y {Number}
    * @param radius {Number}
    * @param [color] {String} If a color is given the circle will be filled with it.
    * @param [commit=false] {Boolean} If true calls context.getImageData and updates the pixelDataArray. Typically not needed.
    *
    */
    drawCircle(x: number, y: number, radius: number, color?: string, commit?: boolean): void;
    /**
    *
    *    Writes the given text at the x and y given.
    *
    * @memberof CanvasObject.prototype
    * @method writeText
    * @param [text] {String} The text to write. No text given would give the string 'undefined'.
    * @param [toX=0]  {Number}
    * @param [toY=0] {Number}
    * @param [font] {String} Default is 'Arial'
    * @param [fontSize] {Number} Default is 24
    * @param [color] {String}
    * @param [commit=false] {Boolean} If true calls context.getImageData and updates the pixelDataArray. Typically not needed.
    *
    */
    writeText(text?: string, toX?: number, toY?: number, font?: string, fontSize?: number, color?: string, commit?: boolean): void;
    /**
    *   Clears the canvas of any drawings and then updates the pixelDataArray.
    *
    *
    * @memberof CanvasObject.prototype
    * @method clear
    *
    */
    clear(): void;
    /**
    *
    *    Draws a rectangle using the Rectangle given.
    *
    * @memberof CanvasObject.prototype
    * @method drawRect
    * @param rect {Rectangle}
    * @param [colorString] {String} If present the rectangle will be filled with the color.
    * @param [commit] {Boolean} If true the pixel data will be updated, only needed if pixel data is to be accessed.
    *
    */
    drawRect(rect: Rectangle, colorString?: string, commit?: boolean): void;
    /**
    *
    *    Sets a pixel of the canvas to the given color.
    *
    * @memberof CanvasObject.prototype
    * @method setPixel
    * @param x {Number}
    * @param y {Number}
    * @param color {String}
    * @param [pixelCommit=false] {Boolean} Commit the individual call with putImageData
    * @param [endCommit=false] {Boolean} You would call this at the end of all setPixel calls to putImageData for the whole canvas.
    *
    */
    setPixel(x: number, y: number, color: string, pixelCommit?: boolean, endCommit?: boolean): void;
    /**
    *
    *    Returns the color of the pixel at the given x and y location.
    *
    * @memberof CanvasObject.prototype
    * @method getPixel
    * @param x {Number}
    * @param y {Number}
    * @returns {Number}
    */
    getPixel(x: number, y: number): number;
    /**
    *
    *    Updates the pixelDataArray, if needing to use getPixel on a canvas that gets redrawn,
    *	 this method or the commit param of each drawing method needs to be called.
    *
    * @memberof CanvasObject.prototype
    * @method update
    *
    */
    update(): void;
}
declare namespace CanvasObject {
    let mathPI: number;
}
//# sourceMappingURL=CanvasObject.d.ts.map