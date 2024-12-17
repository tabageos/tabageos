declare function BlittedTraveler(source: new (width?: number, height?: number) => HTMLImageElement, canvasObject: CanvasObject, fromRect: Rectangle, x: number, y: number, width: number, height: number, dt: number): void;
/**
*
*
* @class BlittedTraveler
* @classdesc
*    A Traveler that implements CanvasAnimation.
*    It has separate methods that can use a WayDeterminer for collision, but has no collision stuffs during its update/move method.
*
* @see Traveler
* @see TravelerSkeleton
* @see CanvasAnimation
* @implements CanvasAnimation
*
* @param source {Image} An Img element to draw from.
* @param canvasObject {CanvasObject} the CanvasObject to draw on.
* @param fromRect {Rectangle} The Rectangle area in the source to draw from.
* @param x {Number} x  location of the BlittedTraveler
* @param y {Number} y location of the Boolean
* @param width {Number} Width of the BlittedTraveler
* @param height {Number} Height of the BlittedTraveler
* @param dt  {Number} Delta time, default is tabageos.TimeKeeper._sae
*
*/
declare function BlittedTraveler(source: new (width?: number, height?: number) => HTMLImageElement, canvasObject: CanvasObject, fromRect: Rectangle, x: number, y: number, width: number, height: number, dt: number): void;
declare class BlittedTraveler implements CanvasAnimation {
    constructor(source: new (width?: number, height?: number) => HTMLImageElement, canvasObject: CanvasObject, fromRect: Rectangle, x: number, y: number, width: number, height: number, dt: number);
    /**
    *
    *
    * @class BlittedTraveler
    * @classdesc
    *    A Traveler that implements CanvasAnimation.
    *    It has separate methods that can use a WayDeterminer for collision, but has no collision stuffs during its update/move method.
    *
    * @see Traveler
    * @see TravelerSkeleton
    * @see CanvasAnimation
    * @implements CanvasAnimation
    *
    * @param source {Image} An Img element to draw from.
    * @param canvasObject {CanvasObject} the CanvasObject to draw on.
    * @param fromRect {Rectangle} The Rectangle area in the source to draw from.
    * @param x {Number} x  location of the BlittedTraveler
    * @param y {Number} y location of the Boolean
    * @param width {Number} Width of the BlittedTraveler
    * @param height {Number} Height of the BlittedTraveler
    * @param dt  {Number} Delta time, default is tabageos.TimeKeeper._sae
    *
    */
    constructor(source: new (width?: number, height?: number) => HTMLImageElement, canvasObject: CanvasObject, fromRect: Rectangle, x: number, y: number, width: number, height: number, dt: number);
    health: number;
    _deltaTime: number;
    /**
    *
    *    Used like a super method.
    *
    * @memberof BlittedTraveler.prototype
    * @method init
    * @param source
    * @param canvasObject
    * @param fromRect
    * @param x
    * @param y
    * @param width
    * @param height
    * @returns {}
    */
    init(source: any, canvasObject: any, fromRect: any, x: any, y: any, width: any, height: any): any;
    _source: any;
    _canvas: any;
    toPoint: MoverPoint;
    fromRect: Rectangle;
    x: any;
    y: any;
    height: any;
    width: any;
    travelType: any;
    blankRect: Rectangle;
    boundingMethod: typeof BoundMethods.boundTo;
    mass: number;
    avoidSpace: number;
    maxSpeed: number;
    maxForce: number;
    personalSpace: number;
    visionDistance: number;
    circleDistance: number;
    spreadDistance: number;
    separationDistance: number;
    bypassAvoidDistance: any;
    followDistance: number;
    easeProximity: number;
    wanderProximity: number;
    wanderAngle: number;
    wanderRadius: number;
    wanderRange: number;
    avoidDistance: number;
    fromWidthOffset: number;
    fromHeightOffset: number;
    _blitType: number;
    /**
    *
    *
    *
    * @memberof BlittedTraveler
    *
    */
    alphaPoint: any;
    /**
    *
    *
    *
    * @memberof BlittedTraveler
    *
    */
    fillColor: any;
    /**
    *
    *
    *
    * @memberof BlittedTraveler
    *
    */
    mergeAlpha: any;
    /**
    *
    *
    *
    * @memberof BlittedTraveler
    *
    */
    alphaBitmapData: any;
    /**
    *
    *
    *
    * @memberof BlittedTraveler
    *
    */
    forceApplier: any;
    /**
    *
    *
    *
    * @memberof BlittedTraveler
    *
    */
    wanderOffset: any;
    /**
    *
    *
    *
    * @memberof BlittedTraveler
    *
    */
    _destination: any;
    /**
    *
    *
    *
    * @memberof BlittedTraveler
    *
    */
    _wallObject: any;
    /**
    *
    *    Returns _destination
    *
    * @memberof BlittedTraveler.prototype
    * @method getDestination
    * @returns {MoverPoint}
    */
    getDestination(): MoverPoint;
    /**
    *
    *    Sets _destination
    *
    * @memberof BlittedTraveler.prototype
    * @method setDestination
    * @param toThis
    *
    */
    setDestination(toThis: any): void;
    /**
    *
    *
    *
    * @memberof BlittedTraveler.prototype
    * @method getSource
    * @returns {Image}
    */
    getSource(): new (width?: number, height?: number) => HTMLImageElement;
    /**
    *
    *
    *
    * @memberof BlittedTraveler.prototype
    * @method setSource
    * @param toThis
    *
    */
    setSource(toThis: any): void;
    /**
    *
    *    Returns the blit type, see setBlitType
    *
    * @memberof BlittedTraveler.prototype
    * @method getBlitType
    * @see setBlitType
    * @returns {String}
    */
    getBlitType(): string;
    /**
    *
    *    Set the blit type.
    *    Default is BlittedTraveler.JUST_COPY which just copies the animation onto the canvas.
    * 	 A blit type of BlittedTraveler.FILL_RECT_THEN_COPY will fill the animation area with the .fillColor color first then copy the animation over the same spot.
    *	 A blit type of BlittedTraveler.COPY_THEN_COPY will copy with the .blankRect first.
    *
    * @memberof BlittedTraveler.prototype
    * @method setBlitType
    * @param toThis {String}  BlittedTraveler.JUST_COPY  or BlittedTraveler.FILL_RECT_THEN_COPY or BlittedTraveler.COPY_THEN_COPY.
    * @returns {}
    */
    setBlitType(toThis: string): any;
    /**
    *
    *
    *
    * @memberof BlittedTraveler.prototype
    * @method getCanvas
    * @returns {CanvasObject}
    */
    getCanvas(): CanvasObject;
    /**
    *
    *
    *
    * @memberof BlittedTraveler.prototype
    * @method setCanvas
    * @param toThis {CanvasObject}
    *
    */
    setCanvas(toThis: CanvasObject): void;
    /**
    *
    *
    *
    * @memberof BlittedTraveler.prototype
    * @method getWallObject
    * @returns {Rectangle}
    */
    getWallObject(): Rectangle;
    /**
    *
    *
    *
    * @memberof BlittedTraveler.prototype
    * @method setWallObject
    * @param toThis
    *
    */
    setWallObject(toThis: any): void;
    /**
    *   Applies forceApplier to _veloc with maxForce and mass.
    *   then truncates _veloc to maxSpeed.
    *   then adds _veloc to _pos.
    *   If a .wallObject is defined and a .boundingMethod definded, _pos will be updated by the boundingMehtod.
    *   then _pos is applied to x and y.
    *
    *
    * @memberof BlittedTraveler.prototype
    * @method update
    *
    */
    update(): void;
    /**
    *   Applies forceApplier to _veloc with maxForce and mass.
    *   then truncates _veloc to maxSpeed.
    *   then adds _veloc to _pos.
    *   If a .wallObject is defined and a .boundingMethod definded, _pos will be updated by the boundingMehtod.
    *   then _pos is applied to x and y.
    *
    * In this class update and move do the same thing, you can call either one for movement.
    *
    * @memberof BlittedTraveler.prototype
    * @method move
    *
    */
    move(): void;
    /**
    *
    *    calls changeDirectionAnimation then animate then blit or _canvas.context.fillRect if there is no _source or currentAnimation.
    *
    * @memberof BlittedTraveler.prototype
    * @method _autoAnimation
    *
    */
    _autoAnimation(): void;
    /**
    *
    *    call travelType with _destination, then move then blit
    *
    * @memberof BlittedTraveler.prototype
    * @method travel
    *
    */
    travel(): void;
    /**
    *
    *    Uses a WayDeterminer to check if the future position is clear via the WayDeterminer.wayIsClear method.
    *
    * @memberof BlittedTraveler.prototype
    * @method checkFutureWayIsClear
    * @param wd {WayDeterminer}
    * @returns {Boolean}
    */
    checkFutureWayIsClear(wd: WayDeterminer): boolean;
    /**
    *
    *    Uses a WayDeterminer to check if the current position is clear via the WayDeterminer.wayIsClear method.
    *
    * @memberof BlittedTraveler.prototype
    * @method checkCurrentWayIsClear
    * @param wd {WayDeterminer}
    * @returns {Boolean}
    */
    checkCurrentWayIsClear(wd: WayDeterminer): boolean;
    /**
    *
    *    Uses a WayDeterminer to check if the past position is clear.
    *
    * @memberof BlittedTraveler.prototype
    * @method checkPastWayIsClear
    * @param wd {WayDeterminer}
    * @returns {Boolean}
    */
    checkPastWayIsClear(wd: WayDeterminer): boolean;
    /**
    *
    *    Uses fromRect and toPoint to draw from this._source onto this._canvas.
    *
    * @memberof BlittedTraveler.prototype
    * @method blit
    * @param r {Rectanlge} An alternate fromRect to draw from, default is fromRect which is changed by the animate function.
    * @param p {MoverPoint} An alternate toPoint to draw to, default is this.x and this.y.
    * @param igf {Boolean} Ignore fromWidthOffset and fromHeightOffset if set fromWidth/HeightOfsset will be ignored.
    *
    */
    blit(r: Rectanlge, p: MoverPoint, igf: boolean): void;
    /**
    *
    *
    *
    * @memberof BlittedTraveler
    *
    */
    currentAnimation: any;
    /**
    *
    *
    *
    * @memberof BlittedTraveler
    *
    */
    animationSpecs: {
        left: (number | number[])[];
    };
    /**
    *
    *
    *
    * @memberof BlittedTraveler
    *
    */
    ani: number;
    /**
    *
    *
    *
    * @memberof BlittedTraveler
    *
    */
    fromXOffset: number;
    /**
    *
    *
    *
    * @memberof BlittedTraveler
    *
    */
    fromYOffset: number;
    /**
    *
    *
    *
    * @memberof BlittedTraveler
    *
    */
    lastAnim: any;
    /**
    *
    *
    *
    * @memberof BlittedTraveler
    *
    */
    onlyHorizontalAnimations: number;
    /**
    *
    *
    *
    * @memberof BlittedTraveler
    *
    */
    addedAnimationChanges: any;
    /**
    *
    *
    *
    * @memberof BlittedTraveler
    *
    */
    _playerRef: any;
    /**
    *
    *
    *
    * @memberof BlittedTraveler
    *
    */
    _inDelay: number;
    /**
    *
    *
    *
    * @memberof BlittedTraveler
    *
    */
    _autoAnimate: number;
    /**
    *
    *    From CanvasAnimation see CanvasAnimation, BlittedTraveler fully implements CanvasAnimation.
    *
    * @memberof BlittedTraveler.prototype
    * @method defineAnimation
    * @param animationName
    * @param arrayOfXYIndexValues
    * @param yIndex
    *
    */
    defineAnimation(animationName: any, arrayOfXYIndexValues: any, yIndex: any): void;
    /**
    *
    *    Returns _pos
    *
    * @memberof BlittedTraveler.prototype
    * @method getPosition
    * @returns {MoverPoint}
    */
    getPosition(): MoverPoint;
    /**
    *
    *    Returns the position but not a reference to _pos. _cpos and _addedPos are used by this method.
    *
    * @memberof BlittedTraveler.prototype
    * @method getCAPosition
    * @param addedX {Number}
    * @param addedY {Number}
    * @returns {MoverPoint}
    */
    getCAPosition(addedX: number, addedY: number): MoverPoint;
    _cpos: MoverPoint;
    _addedPos: MoverPoint;
    /**
    *
    *
    *
    * @memberof BlittedTraveler.prototype
    * @method changeLeftRightUpDownAnimation
    * @param left
    * @param right
    * @param up
    * @param down
    * @param dontKeepAniIndex
    *
    */
    changeLeftRightUpDownAnimation(left: any, right: any, up: any, down: any, dontKeepAniIndex: any): void;
    /**
    *   from CanvasAnimation
    *
    *
    * @memberof BlittedTraveler.prototype
    * @method changeFaceAnimation
    * @param toFace
    * @param keepAniIndex
    *
    */
    changeFaceAnimation(toFace: any, keepAniIndex: any): void;
    /**
    *
    *
    *
    * @memberof BlittedTraveler.prototype
    * @method getDirectionOfAnimation
    * @param currentAni
    * @param onlyLeftRight
    * @param onlyUpDown
    * @returns {String}
    */
    getDirectionOfAnimation(currentAni: any, onlyLeftRight: any, onlyUpDown: any): string;
    /**
    *
    *
    *
    * @memberof BlittedTraveler.prototype
    * @method changeDirectionAnimation
    * @param left
    * @param right
    * @param up
    * @param down
    * @param keepAniIndex
    * @param noIdle
    *
    */
    changeDirectionAnimation(left: any, right: any, up: any, down: any, keepAniIndex: any, noIdle: any): void;
    /**
    *
    *    implementation of CanvasAnimation.animate, BlittedTraveler fully implements CanvasAnimation.
    *
    * @memberof BlittedTraveler.prototype
    * @method animate
    * @param thrott
    *
    */
    animate(thrott: any): void;
    blitIndex: any;
    animationIndexOrder: any;
    /**
    *
    *    Returns true if the current animation has finished.
    *
    * @memberof BlittedTraveler.prototype
    * @method finishedCurrentAnimation
    * @returns {Boolean}
    */
    finishedCurrentAnimation(): boolean;
    /**
    *
    *    Delays a call to animate and blit
    *
    * @memberof BlittedTraveler.prototype
    * @method delayedAnimateAndBlitt
    * @param thrott {Number} The throttle to use for the animate call.
    * @param milliSecondDelay {Number} The amount of time in milliseconds to wait before calling animate and blit
    * @param animation {String} The currentAnimation to use.
    * @param clearBeforeBlitt {Boolean} Clear the canvas before blit, default is false.
    *
    */
    delayedAnimateAndBlitt(thrott: number, milliSecondDelay: number, animation: string, clearBeforeBlitt: boolean): void;
    _throttRef: number;
    _cBB: number | true;
    /**
    *
    *
    *
    * @memberof BlittedTraveler.prototype
    * @method _delayedFunction
    * @param e {Event}
    *
    */
    _delayedFunction(e: Event): void;
    /**
    *
    *    Sorts and sets each _canvas property of this instance and the other BlittedTraveler passed.
    *    The one with the greater y plus offset will be on the topCanvas.
    *
    * @memberof BlittedTraveler.prototype
    * @method basicDepthSort
    * @param bt {BlittedTraveler}
    * @param topCanvas {CanvasObject}
    * @param bottomCanvas {CanvasObjet}
    * @param sortRadius {Number}
    * @param offset {Number}
    * @returns {Boolean}
    */
    basicDepthSort(bt: BlittedTraveler, topCanvas: CanvasObject, bottomCanvas: CanvasObjet, sortRadius: number, offset: number): boolean;
}
declare namespace BlittedTraveler {
    let JUST_COPY: string;
    let FILL_RECT_THEN_COPY: string;
    let COPY_THEN_COPY: string;
    let _onlyHorizontalAni: number;
}
//# sourceMappingURL=BlittedTraveler.d.ts.map