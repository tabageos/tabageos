declare function BasicNinja(x: number, y: number, width: number, height: number, map: any[], ca?: CanvasAnimation, dontCloneMap?: boolean, dt?: number, tileW?: number, tileH?: number, mapRows?: number, mapColumns?: number, useBlitMathSpecificArrays?: boolean): void;
/**
*  Constructs a new BasicNinja
*
* @classdesc
*  A BasicNinja moves around in a tiled map using velocity, basic jumping and collisions are handled,
*  and it can wall slide, wall jump, and double jump.
*  A BasicNinja is a MapMover/MapTraveler but it does not extend either, rather is directly built from just an extension of TravelerSkeleton
*
*
* @see MapMover
* @see MapTraveler
* @see TravelerSkeleton
*
*
* @class BasicNinja
* @param x {Number} The x position of the BasicNinja
* @param y {Number} The y position of the BasicNinja
* @param width {Number} The width of the BasicNinja
* @param height {Number} The height of the BasicNinja
* @param map {Array} 2D Array that the BasicNinja is to collide with, 0 or [0,0] as a value in the 2D array denotes a walkable spot. The 2d Array should have all integer values, or all values of [y,x] style inner arrays.
* @param [ca=null] {CanvasAnimation} CanvasAnimation for the BasicNinja
* @param [dontCloneMap=false] {Boolean} Default is false
* @param [dt=.6666666667] {Number} Default is tabageos.TimeKeeper._sae
* @param [tileW] {Number} The width of each tile, default is the same as width.
* @param [tileH] {Number} The height of each tile, default is the same as height.
* @param [mapRows] {Number} The amount of rows in map
* @param [mapColumns] {Number} The amount of columns in map
* @param [useBlitMathSpecificArrays] {Boolean}  This ultimately is set based on the actual value types in map
*
*
*
*/
declare function BasicNinja(x: number, y: number, width: number, height: number, map: any[], ca?: CanvasAnimation, dontCloneMap?: boolean, dt?: number, tileW?: number, tileH?: number, mapRows?: number, mapColumns?: number, useBlitMathSpecificArrays?: boolean): void;
declare class BasicNinja {
    constructor(x: number, y: number, width: number, height: number, map: any[], ca?: CanvasAnimation, dontCloneMap?: boolean, dt?: number, tileW?: number, tileH?: number, mapRows?: number, mapColumns?: number, useBlitMathSpecificArrays?: boolean);
    /**
    *  Constructs a new BasicNinja
    *
    * @classdesc
    *  A BasicNinja moves around in a tiled map using velocity, basic jumping and collisions are handled,
    *  and it can wall slide, wall jump, and double jump.
    *  A BasicNinja is a MapMover/MapTraveler but it does not extend either, rather is directly built from just an extension of TravelerSkeleton
    *
    *
    * @see MapMover
    * @see MapTraveler
    * @see TravelerSkeleton
    *
    *
    * @class BasicNinja
    * @param x {Number} The x position of the BasicNinja
    * @param y {Number} The y position of the BasicNinja
    * @param width {Number} The width of the BasicNinja
    * @param height {Number} The height of the BasicNinja
    * @param map {Array} 2D Array that the BasicNinja is to collide with, 0 or [0,0] as a value in the 2D array denotes a walkable spot. The 2d Array should have all integer values, or all values of [y,x] style inner arrays.
    * @param [ca=null] {CanvasAnimation} CanvasAnimation for the BasicNinja
    * @param [dontCloneMap=false] {Boolean} Default is false
    * @param [dt=.6666666667] {Number} Default is tabageos.TimeKeeper._sae
    * @param [tileW] {Number} The width of each tile, default is the same as width.
    * @param [tileH] {Number} The height of each tile, default is the same as height.
    * @param [mapRows] {Number} The amount of rows in map
    * @param [mapColumns] {Number} The amount of columns in map
    * @param [useBlitMathSpecificArrays] {Boolean}  This ultimately is set based on the actual value types in map
    *
    *
    *
    */
    constructor(x: number, y: number, width: number, height: number, map: any[], ca?: CanvasAnimation, dontCloneMap?: boolean, dt?: number, tileW?: number, tileH?: number, mapRows?: number, mapColumns?: number, useBlitMathSpecificArrays?: boolean);
    width: number;
    height: number;
    _middlePoint: MoverPoint;
    _pos: MoverPoint;
    _veloc: MoverPoint;
    _lastVeloc: MoverPoint;
    _lastPos: MoverPoint;
    _deltaTime: number;
    _map: any[];
    _rect: Rectangle;
    _state: number;
    forceApplier: MoverPoint;
    forceHolder: MoverPoint;
    _canvasAnimation: CanvasAnimation;
    _w: number;
    _h: number;
    wanderOffset: MoverPoint;
    blankMO: MoverPoint;
    _eventDispatcher: EventDispatcher;
    x: number;
    y: number;
    _checkHelper: MoverPoint;
    _jumps: number;
    _jumpSpeed: number;
    _jsp: number;
    _walkSpeed: number;
    _gravityLevel: number;
    health: number;
    _pLeft: number;
    _npLeft: number;
    _pRight: number;
    _npRight: number;
    _grounded: number;
    _unGrounded: number;
    _atCeiling: number;
    _unCeiling: number;
    _wallObject: Rectangle;
    boundingMethod: any;
    path: any[];
    _mapRows: number;
    _mapColumns: any;
    _tw: number;
    _th: number;
    destination: MoverPoint;
    _mt: number | true;
    /**
    *
    *    state of 1
    *
    * @memberof BasicNinja
    *
    */
    stand: number;
    /**
    *
    *   state of  2
    *
    * @memberof BasicNinja
    *
    */
    walk: number;
    /**
    *   state of 3
    *
    *
    * @memberof BasicNinja
    *
    */
    up: number;
    /**
    *   state of 4
    *
    *
    * @memberof BasicNinja
    *
    */
    down: number;
    /**
    *
    *
    *
    * @memberof BasicNinja
    *
    */
    forceGrounded: number;
    /**
    *
    *
    *
    * @memberof BasicNinja
    *
    */
    _autoAnimate: number;
    /**
    *
    *    @private
    *
    * @memberof BasicNinja
    *
    */
    private _inDoubleJump;
    /**
    *
    *    @private
    *
    * @memberof BasicNinja
    *
    */
    private _onWall;
    /**
    *
    *    Moves the BasicNinja by _walkSpeed, also handling collisions with _map and double jumps, wall slides and wall jumps.
    *
    *
    * @memberof BasicNinja.prototype
    * @method move
    * @param left {Boolean} To move left
    * @param right {Boolean} To move right
    * @param up {Boolean} To move up
    * @param down {Boolean} To move down
    * @param [dontApplyForce=false] {Boolean} Make it behave as a MapMover, default is false
    *
    *
    */
    move(left: boolean, right: boolean, up: boolean, down: boolean, dontApplyForce?: boolean, easeFuncString: any): void;
    /**
    *
    *    This method becomes part of this class' CanvasAnimation's changeDirectionAnimation method.
    *   This Class is using this functionality to add onwall animation and flip animation.
    *   It's ready for 'onwallleft' 'onwallright' and 'flipleft' and 'flipright'.
    *
    *   Simply define a 'onwallleft' and 'onwallright' animation for the CanvasAnimation passed to this class,
    *   and this class automatically changes to those when the BasicNinja is on a wall.
    *   If you don't define those then the left and right animations would be used when on a wall.
    *   Same for flip.
    *
    * @memberof BasicNinja.prototype
    * @method _addedToChangeDirectionAnimation
    * @param left
    * @param right
    * @param up
    * @param down
    * @param keepAniIndex {Boolean}
    * @param noIdle {Boolean}
    *
    *
    * @see CanvasAnimation#changeDirectionAnimation
    */
    _addedToChangeDirectionAnimation(left: any, right: any, up: any, down: any, keepAniIndex: boolean, noIdle: boolean): void;
    currentAnimation: string;
    /**
    *
    * _autoAnimate must be set to 1.
    *
    *  the functionality of this method happens in the update method if _autoAnimate is true,
    *  but you can also call this method if needed, for example if you need to animate outside of the move call.
    *
    * updates the position of the _canvasAnimation and calls its changeDirectionAnimation function then animate and blit.
    * if there is no _canvasAnimation then _directCanvasObject.context.fillRect is used with this x y width height.
    *
    * @memberof BasicNinja.prototype
    * @method autoAnimation
    *
    *
    */
    autoAnimation(): void;
    /**
    *
    *    Updates forceApplier and _veloc and handles collisions.
    *    This method is called inside of the move method.
    *    To manually move the Class you could update _veloc yourself then call this method.
    *    The move method changes _veloc and calls this method.
    *    This is the method that is handling collision with the _map and with _wallObject.
    *
    * @memberof BasicNinja.prototype
    * @method update
    * @param [dontApplyToXY=false] {Boolean} If true the x and y are not updated, just _pos.
    * @param [dontApplyForce=false] {Boolean} If true forceApplier is not used, and it opperates as a MapMover without traveling ability (ease, wander, etc...)
    * @param [dontCollide=false] {Boolean} If true it will not collide with the map
    */
    update(dontApplyToXY?: boolean, dontApplyForce?: boolean, dontCollide?: boolean): void;
    _leftRightFace: number;
    /**
    *
    *    Used by the update method to determine bottom collision
    *
    * @memberof BasicNinja.prototype
    * @method isGroundedOnMap
    * @param last {MoverPoint} _lastPos
    * @param curr {MoverPoint} _pos
    * @param veloc {MoverPoint} _veloc
    * @param map {Array} _map
    * @param tw {Number} tile width,  _tw
    * @param th {Number} tile height, _th
    * @returns {Number} The y point of collision
    */
    isGroundedOnMap(last: MoverPoint, curr: MoverPoint, veloc: MoverPoint, map: any[], tw: number, th: number): number;
    /**
    *
    *    Used by the update method to determine top collision
    *
    * @memberof BasicNinja.prototype
    * @method isHeadHitOnMap
    * @param last {MoverPoint} _lastPos
    * @param curr {MoverPoint} _pos
    * @param veloc {MoverPoint} _veloc
    * @param map {Array} _map
    * @param tw {Number} tile width,  _tw
    * @param th {Number} tile height, _th
    * @returns {Number} The y point of collision
    */
    isHeadHitOnMap(last: MoverPoint, curr: MoverPoint, veloc: MoverPoint, map: any[], tw: number, th: number): number;
    /**
    *
    *    Used by the update method to determine right collision
    *
    * @memberof BasicNinja.prototype
    * @method isRightPushingOnMap
    * @param last {MoverPoint} _lastPos
    * @param curr {MoverPoint} _pos
    * @param veloc {MoverPoint} _veloc
    * @param map {Array} _map
    * @param tw {Number} tile width,  _tw
    * @param th {Number} tile height, _th
    * @returns {Number} The x point of collision
    */
    isRightPushingOnMap(last: MoverPoint, curr: MoverPoint, veloc: MoverPoint, map: any[], tw: number, th: number): number;
    /**
    *   Used by the update method to determine left collision
    *
    *
    * @memberof BasicNinja.prototype
    * @method isLeftPushingOnMap
    * @param last {MoverPoint} _lastPos
    * @param curr {MoverPoint} _pos
    * @param veloc {MoverPoint} _veloc
    * @param map {Array} _map
    * @param tw {Number} tile width,  _tw
    * @param th {Number} tile height, _th
    * @returns {Number} The x point of collision
    */
    isLeftPushingOnMap(last: MoverPoint, curr: MoverPoint, veloc: MoverPoint, map: any[], tw: number, th: number): number;
}
//# sourceMappingURL=BasicNinja.d.ts.map