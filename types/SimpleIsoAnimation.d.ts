declare function SimpleIsoAnimation(source: new (width?: number, height?: number) => HTMLImageElement, canvasObject: CanvasObject, fromRect: Rectangle, x: number, y: number, width: number, height: number): void;
/**
*   @classdesc
*    A CanvasAnimation designated for isometric scenes.
*
*
* @class SimpleIsoAnimation
* @param source {Image}
* @param canvasObject {CanvasObject}
* @param fromRect {Rectangle}
* @param x {Number}
* @param y {Number}
* @param width {Number}
* @param height  {Number}
*
* @see CanvasAnimation
*
*/
declare function SimpleIsoAnimation(source: new (width?: number, height?: number) => HTMLImageElement, canvasObject: CanvasObject, fromRect: Rectangle, x: number, y: number, width: number, height: number): void;
declare class SimpleIsoAnimation {
    constructor(source: new (width?: number, height?: number) => HTMLImageElement, canvasObject: CanvasObject, fromRect: Rectangle, x: number, y: number, width: number, height: number);
    /**
    *   @classdesc
    *    A CanvasAnimation designated for isometric scenes.
    *
    *
    * @class SimpleIsoAnimation
    * @param source {Image}
    * @param canvasObject {CanvasObject}
    * @param fromRect {Rectangle}
    * @param x {Number}
    * @param y {Number}
    * @param width {Number}
    * @param height  {Number}
    *
    * @see CanvasAnimation
    *
    */
    constructor(source: new (width?: number, height?: number) => HTMLImageElement, canvasObject: CanvasObject, fromRect: Rectangle, x: number, y: number, width: number, height: number);
    _currentValue: any[];
    /**
    *
    *    The map value of the current animation, with map values being [y,x] index arrays.
    *
    * @memberof SimpleIsoAnimation.prototype
    * @method getAnimationValue
    * @returns {Array}
    */
    getAnimationValue(): any[];
}
//# sourceMappingURL=SimpleIsoAnimation.d.ts.map