declare function WDTraveler(wayDeterminer: WayDeterminer, source: new (width?: number, height?: number) => HTMLImageElement, canvasObject: CanvasObject, fromRect?: Rectangle, x?: number, y?: number, width?: number, height?: number, dt?: number): void;
/**
*
*
* @class WDTraveler
*  @classdesc
*    Way Determined Traveler.
*     WDTraveler > BlittedTraveler > Traveler > TravelerSkeleton.
* 	  A BlittedTraveler that collides based on a WayDeterminer instance given during construction.
*    A BlittedTraveler is also a CanvasAnimation.
*
* @param wayDeterminer {WayDeterminer} The WayDeterminer instance to use for collisions
* @param source {Image} The source image to draw from
* @param canvasObject {CanvasObject} The CanvasObject to draw to
* @param [fromRect=null] {Rectangle} A Rectangle defining where to draw from
* @param [x] {Number} The x position of the WDTraveler
* @param [y] {Number} The y position of the WDTraveler
* @param [width] {Number} The width of the WDTraveler
* @param [height] {Number} The height of the WDTraveler
* @param [dt=.6666666667]  {Number} delat time, default is tabageos.TimeKeeper._sae
*
* @see BlittedTraveler
*
*/
declare function WDTraveler(wayDeterminer: WayDeterminer, source: new (width?: number, height?: number) => HTMLImageElement, canvasObject: CanvasObject, fromRect?: Rectangle, x?: number, y?: number, width?: number, height?: number, dt?: number): void;
declare class WDTraveler {
    constructor(wayDeterminer: WayDeterminer, source: new (width?: number, height?: number) => HTMLImageElement, canvasObject: CanvasObject, fromRect?: Rectangle, x?: number, y?: number, width?: number, height?: number, dt?: number);
    /**
    *
    *
    * @class WDTraveler
    *  @classdesc
    *    Way Determined Traveler.
    *     WDTraveler > BlittedTraveler > Traveler > TravelerSkeleton.
    * 	  A BlittedTraveler that collides based on a WayDeterminer instance given during construction.
    *    A BlittedTraveler is also a CanvasAnimation.
    *
    * @param wayDeterminer {WayDeterminer} The WayDeterminer instance to use for collisions
    * @param source {Image} The source image to draw from
    * @param canvasObject {CanvasObject} The CanvasObject to draw to
    * @param [fromRect=null] {Rectangle} A Rectangle defining where to draw from
    * @param [x] {Number} The x position of the WDTraveler
    * @param [y] {Number} The y position of the WDTraveler
    * @param [width] {Number} The width of the WDTraveler
    * @param [height] {Number} The height of the WDTraveler
    * @param [dt=.6666666667]  {Number} delat time, default is tabageos.TimeKeeper._sae
    *
    * @see BlittedTraveler
    *
    */
    constructor(wayDeterminer: WayDeterminer, source: new (width?: number, height?: number) => HTMLImageElement, canvasObject: CanvasObject, fromRect?: Rectangle, x?: number, y?: number, width?: number, height?: number, dt?: number);
    health: number;
    _wayDeterminer: WayDeterminer;
    ani: number;
    vCheckOffset: number;
    lastAnim: string;
    currentAnimation: string;
    animationSpecs: {};
    animationIndexOrder: any;
    fromHeightOffset: number;
    fromWidthOffset: number;
    fromXOffset: number;
    fromYOffset: number;
    hCheckOffsetRight: number;
    hCheckOffset: number;
    blitIndex: number;
    _cBB: number;
    _throttRef: number;
    _inDelay: number;
    _cpos: MoverPoint;
    _addedPos: MoverPoint;
    _deltaTime: number;
    /**
    *
    *
    *
    * @memberof WDTraveler
    *
    */
    sae: any;
    /**
    *
    *
    *
    * @memberof WDTraveler
    *
    */
    _wic: any;
    /**
    *
    *
    *
    * @memberof WDTraveler
    *
    */
    _moveY: boolean;
    /**
    *
    *
    *
    * @memberof WDTraveler
    *
    */
    vCheckOffsetUp: number;
    /**
    *
    *
    *
    * @memberof WDTraveler
    *
    */
    _moveX: boolean;
    /**
    *
    *
    *
    * @memberof WDTraveler.prototype
    * @method animate
    * @param thrott {Number}
    *
    */
    animate(thrott: number): void;
    /**
    *
    *
    *
    * @memberof WDTraveler.prototype
    * @method delayedAnimateAndBlitt
    * @param thrott {Number}
    * @param milliSecondDelay {Number}
    * @param animation {String}
    * @param clearBeforeBlitt {Boolean}
    *
    */
    delayedAnimateAndBlitt(thrott: number, milliSecondDelay: number, animation: string, clearBeforeBlitt: boolean): void;
    private _delayedFunction;
    /**
    *   Changes animation based on dY and dX and _veloc.x and y.
    *
    *
    * @memberof WDTraveler.prototype
    * @method basicChangeDirectionAnimation
    *
    */
    basicChangeDirectionAnimation(): void;
    /**
    *
    *
    *
    * @memberof WDTraveler.prototype
    * @method getUnreferencedPosition
    * @param addedX
    * @param addedY
    * @returns {MoverPoint}
    */
    getUnreferencedPosition(addedX: any, addedY: any): MoverPoint;
    /**
    *
    *    Changes the animation based on the params given.
    *
    * @memberof WDTraveler.prototype
    * @method changeDirectionAnimation
    * @param left {Boolean}
    * @param right {Boolean}
    * @param up {Boolean}
    * @param down {Boolean}
    * @param keepAniIndex {Boolean{
    *
    */
    changeDirectionAnimation(left: boolean, right: boolean, up: boolean, down: boolean, keepAniIndex: boolean): void;
    /**
    *
    *
    *
    * @memberof WDTraveler.prototype
    * @method getBottomY
    * @returns {Number}
    */
    getBottomY(): number;
    /**
    *
    *
    *
    * @memberof WDTraveler.prototype
    * @method getMiddleY
    * @returns {Number}
    */
    getMiddleY(): number;
    /**
    *
    *
    *
    * @memberof WDTraveler.prototype
    * @method getTopY
    * @returns {Number}
    */
    getTopY(): number;
    /**
    *
    *
    *
    * @memberof WDTraveler.prototype
    * @method getRightX
    * @returns {Number}
    */
    getRightX(): number;
    /**
    *
    *
    *
    * @memberof WDTraveler.prototype
    * @method getMiddleX
    * @returns {Number}
    */
    getMiddleX(): number;
    /**
    *
    *
    *
    * @memberof WDTraveler.prototype
    * @method getLeftX
    * @returns {Number}
    */
    getLeftX(): number;
    /**
    *   velocity is adjusted using forceApplier,
    *    then landCheckHorizontal and landCheckVertical are used to determine collisions,
    *	 for each direction, if there is no collision velocity is applied to position and x y.
    *
    *
    * @memberof WDTraveler.prototype
    * @method move
    *
    */
    move(): void;
    x: number;
    y: number;
    /**
    *
    *
    *
    * @memberof WDTraveler.prototype
    * @method landCheckHorizontal
    * @param leftRight
    * @param pNewX
    * @returns {Boolean}
    */
    landCheckHorizontal(leftRight: any, pNewX: any): boolean;
    /**
    *
    *
    *
    * @memberof WDTraveler.prototype
    * @method landCheckVertical
    * @param topBottom
    * @param pNewY
    * @returns {Boolean}
    */
    landCheckVertical(topBottom: any, pNewY: any): boolean;
}
//# sourceMappingURL=WDTraveler.d.ts.map