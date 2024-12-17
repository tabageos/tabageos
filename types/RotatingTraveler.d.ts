declare function RotatingTraveler(wd: WayDeterminer, source: new (width?: number, height?: number) => HTMLImageElement, canvas: CanvasObject, fromRect: Rectangle, x: number, y: number, width: number, height: number, rotationImage: CanvasObject, rotationFromRect: Rectangle): void;
/**
 *
 *
 *
 * @class RotatingTraveler
 * @classdesc A RotatingTraveler is a WDTraveler that has a animation that can rotate.
 * @constructor
 *
 * @param wd {WayDeterminer} A WayDeterminer instance for collision stuffs
 * @param source {Image} HTML Image or Canvas Element, the sprite sheet to draw from
 * @param canvas {CanvasObject} CanvasObject to draw to
 * @param fromRect {Rectangle} fromRect used as WDTraveler/BlittedTraveler
 * @param x {Number} x position
 * @param y {Number} y position
 * @param width {Number} width
 * @param height {Number} height
 * @param rotationImage {CanvasObject} A CanvasObject that is 3x larger than the rotation image. For example if the rotation image is 32x32 this CanvasObject needs to be 96x96.
 *                                       This CanvasObject will get rotated offscreen and during blit it is drawn from on top of anything else.
 *                                       For example, if you have a normal animation defined (see BlittedTraveler) it would get drawn first into canvas,
 *                                       then the rotationImage is used to draw from next into canvas. setRotation and rotateWithMoverPoint rotate rotationImage.
 *                                       Your image needs to be facing right.
 * @param rotationFromRect {Rectangle}  A Rectangle defining where in the source to get the 3x area that has the 1x rotation image in the middle.
 *                                      For example, if your image is 32x32 it needs to be in the middle of 96x96 space, and this Rectangle would define that 96x96 area in the source.
 *                                       Your image needs to be facing right, see the top down rotating gun shooter example.
 *
 * @see WDTraveler
 * @see BlittedTraveler
 *
 */
declare function RotatingTraveler(wd: WayDeterminer, source: new (width?: number, height?: number) => HTMLImageElement, canvas: CanvasObject, fromRect: Rectangle, x: number, y: number, width: number, height: number, rotationImage: CanvasObject, rotationFromRect: Rectangle): void;
declare class RotatingTraveler {
    constructor(wd: WayDeterminer, source: new (width?: number, height?: number) => HTMLImageElement, canvas: CanvasObject, fromRect: Rectangle, x: number, y: number, width: number, height: number, rotationImage: CanvasObject, rotationFromRect: Rectangle);
    /**
     *
     *
     *
     * @class RotatingTraveler
     * @classdesc A RotatingTraveler is a WDTraveler that has a animation that can rotate.
     * @constructor
     *
     * @param wd {WayDeterminer} A WayDeterminer instance for collision stuffs
     * @param source {Image} HTML Image or Canvas Element, the sprite sheet to draw from
     * @param canvas {CanvasObject} CanvasObject to draw to
     * @param fromRect {Rectangle} fromRect used as WDTraveler/BlittedTraveler
     * @param x {Number} x position
     * @param y {Number} y position
     * @param width {Number} width
     * @param height {Number} height
     * @param rotationImage {CanvasObject} A CanvasObject that is 3x larger than the rotation image. For example if the rotation image is 32x32 this CanvasObject needs to be 96x96.
     *                                       This CanvasObject will get rotated offscreen and during blit it is drawn from on top of anything else.
     *                                       For example, if you have a normal animation defined (see BlittedTraveler) it would get drawn first into canvas,
     *                                       then the rotationImage is used to draw from next into canvas. setRotation and rotateWithMoverPoint rotate rotationImage.
     *                                       Your image needs to be facing right.
     * @param rotationFromRect {Rectangle}  A Rectangle defining where in the source to get the 3x area that has the 1x rotation image in the middle.
     *                                      For example, if your image is 32x32 it needs to be in the middle of 96x96 space, and this Rectangle would define that 96x96 area in the source.
     *                                       Your image needs to be facing right, see the top down rotating gun shooter example.
     *
     * @see WDTraveler
     * @see BlittedTraveler
     *
     */
    constructor(wd: WayDeterminer, source: new (width?: number, height?: number) => HTMLImageElement, canvas: CanvasObject, fromRect: Rectangle, x: number, y: number, width: number, height: number, rotationImage: CanvasObject, rotationFromRect: Rectangle);
    _cWD: WayDeterminer;
    _wayDeterminer: WayDeterminer;
    rImageHolder: CanvasObject;
    rFromRect: Rectangle;
    roExA: number;
    rToPoint: MoverPoint;
    _brFromRct: Rectangle;
    /**
    *
    *    Returns the current rotation
    *
    * @memberof RotatingTraveler.prototype
    * @method getRotation
    * @returns {Number}
    */
    getRotation(): number;
    /**
    *
    *    Rotates the rImageHolder, when blit is called the result is seen.
    *
    * @memberof RotatingTraveler
    * @method setRotation
    * @param toThis {Number} A number from 0 to 180 or -1 to -180
    *
    */
    setRotation(toThis: number): void;
    nr: number;
    /**
    *
    *    @private
    *
    * @memberof RotatingTraveler
    *
    */
    private _aro;
    /**
    *
    *    @private
    *
    * @memberof RotatingTraveler
    *
    */
    private _defaultAro;
    /**
    *
    *    When called any animation would not show during blit, just the rotation.
    *   To bring back animations call this method again.
    *
    * @memberof RotatingTraveler.prototype
    * @method alwaysDisplayRotationOnly
    *
    */
    alwaysDisplayRotationOnly(): void;
    /**
    *   Rotate with a MoverPoint.
    *
    *
    * @memberof RotatingTraveler.prototype
    * @method rotateWithMoverPoint
    * @param mp {MoverPoint} MoverPoint to rotate with.
    * @param addedY {Number} optional added y.
    * @param addedX {Number} optional added x.
    *
    *
    */
    rotateWithMoverPoint(mp: MoverPoint, addedY: number, addedX: number, offsetPoint: any): void;
    /**
    *
    *    Animate the rotation only,
    *   to use, call before calling blit.
    *
    *   To maintain just showing the rotation you would have to keep calling this before calling blit.
    *   When just this method is used, subsequent blit calls would go back to animating both the defined animations and the rotation.
    *   To keep it only animating the roation use the alwaysDisplayRotationOnly method.
    * @memberof RotatingTraveler.prototype
    * @method animateRotationOnly
    *
    */
    animateRotationOnly(): void;
    /**
    *
    *    If animateRotationOnly has not been called, this method will display any animationSpecs defined animations first,
    *    and then it will draw the rotation image on top.
    *
    *    If animateRotationOnly has been called, then only the roation image is drawn.
    *
    *
    * @memberof RotatingTraveler.prototype
    * @method blit
    * @param r {Object}
    * @param p {Object}
    * @param rop {Object}
    *
    */
    blit(r: any, p: any): void;
    fromRect: any;
    toPoint: any;
}
//# sourceMappingURL=RotatingTraveler.d.ts.map