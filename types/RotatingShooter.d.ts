declare function RotatingShooter(wd: WayDeterminer, source: new (width?: number, height?: number) => HTMLImageElement, canvas: CanvasObject, fromRect: Rectangle, x: number, y: number, width: number, height: number, rotationImage: CanvasObject, rotationFromRect: Rectangle, bulletCanvas: CanvasObject, bulletFromRect: Rectangle, bulletMap: any[]): void;
/**
*@class RotatingShooter
* @classdesc
*   A RotatingTraveler that is also set up to shoot BlittedTraveler bullets.
*
*
*
* @param wd {WayDeterminer}
* @param source {Image}
* @param canvas {CanvasObject}
* @param fromRect {Rectangle}
* @param x {Number}
* @param y {Number}
* @param width {Number}
* @param height {Number}
* @param rotationImage {CanvasObject}
* @param rotationFromRect {Rectangle}
* @param bulletCanvas {CanvasObject}
* @param bulletFromRect  {Rectangle}
* @param bulletMap {Array} If set then the bullets shot will be MapTravelers instead of BlittedTravelers.
*
*/
declare function RotatingShooter(wd: WayDeterminer, source: new (width?: number, height?: number) => HTMLImageElement, canvas: CanvasObject, fromRect: Rectangle, x: number, y: number, width: number, height: number, rotationImage: CanvasObject, rotationFromRect: Rectangle, bulletCanvas: CanvasObject, bulletFromRect: Rectangle, bulletMap: any[]): void;
declare class RotatingShooter {
    constructor(wd: WayDeterminer, source: new (width?: number, height?: number) => HTMLImageElement, canvas: CanvasObject, fromRect: Rectangle, x: number, y: number, width: number, height: number, rotationImage: CanvasObject, rotationFromRect: Rectangle, bulletCanvas: CanvasObject, bulletFromRect: Rectangle, bulletMap: any[]);
    /**
    *@class RotatingShooter
    * @classdesc
    *   A RotatingTraveler that is also set up to shoot BlittedTraveler bullets.
    *
    *
    *
    * @param wd {WayDeterminer}
    * @param source {Image}
    * @param canvas {CanvasObject}
    * @param fromRect {Rectangle}
    * @param x {Number}
    * @param y {Number}
    * @param width {Number}
    * @param height {Number}
    * @param rotationImage {CanvasObject}
    * @param rotationFromRect {Rectangle}
    * @param bulletCanvas {CanvasObject}
    * @param bulletFromRect  {Rectangle}
    * @param bulletMap {Array} If set then the bullets shot will be MapTravelers instead of BlittedTravelers.
    *
    */
    constructor(wd: WayDeterminer, source: new (width?: number, height?: number) => HTMLImageElement, canvas: CanvasObject, fromRect: Rectangle, x: number, y: number, width: number, height: number, rotationImage: CanvasObject, rotationFromRect: Rectangle, bulletCanvas: CanvasObject, bulletFromRect: Rectangle, bulletMap: any[]);
    _cWD: WayDeterminer;
    _wayDeterminer: WayDeterminer;
    rImageHolder: CanvasObject;
    rFromRect: Rectangle;
    roExA: number;
    rToPoint: MoverPoint;
    _brFromRct: Rectangle;
    bulletHolder: any[];
    _bulletCanvas: CanvasObject;
    bulletFromRect: Rectangle;
    bulletSpeed: number;
    /**
    *
    *    Populates bulletHolder with the given amount of bullets ready to be shot.
    *
    * @memberof RotatingShooter.prototype
    * @method reload
    * @param amount {Number}
    *
    */
    reload(amount: number): void;
    /**
    *
    *    Shoots a bullet, the x and y position and _veloc is adjusted to shoot from the middle of the RotatingShooter.
    *
    * @memberof RotatingShooter.prototype
    * @method shoot
    * @returns {BlittedTraveler | MapTraveler}
    */
    shoot(): BlittedTraveler | MapTraveler;
    /**
    *
    *    Resets the bullets x y and veloc and puts it back into bulletHolder.
    *
    * @memberof RotatingShooter.prototype
    * @method reclaimBullet
    * @param b
    *
    */
    reclaimBullet(b: any): void;
}
//# sourceMappingURL=RotatingShooter.d.ts.map