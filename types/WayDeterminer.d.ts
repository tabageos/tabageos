declare function WayDeterminer(transparencyColor?: number, canvasObject: CanvasObject, arrayOfCanvasObjects?: any[]): void;
/**
*
* @class WayDeterminer
*   @classdesc
*    A Class for pixel level collision detection.
*
*
*
* @param [transparencyColor=0] {Number} The pixel color value denoting clear, default is 0.
* @param canvasObject {CanvasObject} the CanvasObject to use during wayIsClear calls.
* @param [arrayOfCanvasObjects]  {Array} optional array of CanvasObjects to use during multipleWaysClear and multipleWaysClearAndRegister
*
*/
declare function WayDeterminer(transparencyColor?: number, canvasObject: CanvasObject, arrayOfCanvasObjects?: any[]): void;
declare class WayDeterminer {
    constructor(transparencyColor?: number, canvasObject: CanvasObject, arrayOfCanvasObjects?: any[]);
    /**
    *
    * @class WayDeterminer
    *   @classdesc
    *    A Class for pixel level collision detection.
    *
    *
    *
    * @param [transparencyColor=0] {Number} The pixel color value denoting clear, default is 0.
    * @param canvasObject {CanvasObject} the CanvasObject to use during wayIsClear calls.
    * @param [arrayOfCanvasObjects]  {Array} optional array of CanvasObjects to use during multipleWaysClear and multipleWaysClearAndRegister
    *
    */
    constructor(transparencyColor?: number, canvasObject: CanvasObject, arrayOfCanvasObjects?: any[]);
    _bmdRef: CanvasObject;
    multipleBitmapDatas: any[];
    _lastBitmapHit: any;
    /**
    *
    *    Returns true if the pixel color value in _bmdRef or WayDeterminer.bitmapData at the x y location given matches WayDeterminer.transColor or 0.
    *
    * @memberof WayDeterminer.prototype
    * @method wayIsClear
    * @param x {Number} The x location to check
    * @param y {Number} The y location to check
    * @returns {Boolean}
    */
    wayIsClear(x: number, y: number): boolean;
    /**
    *
    *    Returns true if the pixel color value in each CanvasObject in the bitmapDatas Array matchs WayDeterminer.transColor or 0.
    *
    * @memberof WayDeterminer.prototype
    * @method multipleWaysClear
    * @param x {Number} The x location to check
    * @param y {Number} The y location to check
    * @param bitmapDatas {Array} Array of CanvasObjects to check, if not set the multipleBitmapDatas property will be used.
    * @returns {Boolean}
    */
    multipleWaysClear(x: number, y: number, bitmapDatas: any[]): boolean;
    /**
    *
    *    Checks the x y position on each CanvasObject in the bitmapDatas Array.
    *    Returns true if the pixel color value in each CanvasObject matches WayDeterminer.transColor at the given x y location.
    *    If the way is not clear this method sets _lastBitmapHit to the CanvasObject that was not clear at the location.
    *
    * @memberof WayDeterminer.prototype
    * @method multipleWaysClearAndRegister
    * @param x {Number} The x location to check
    * @param y {Number} The y location to check
    * @param bitmapDatas {Array} Array of CanvasObjects, if not set the multipleBitmapDatas property will be used.
    * @returns {Boolean}
    */
    multipleWaysClearAndRegister(x: number, y: number, bitmapDatas: any[]): boolean;
}
declare namespace WayDeterminer {
    let transColor: number;
    let bitmapData: CanvasObject;
}
//# sourceMappingURL=WayDeterminer.d.ts.map