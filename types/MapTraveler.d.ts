declare function MapTraveler(x: number, y: number, width: number, height: number, map: any[], ca?: CanvasAnimation, dontCloneMap?: boolean, dt?: number, tileW?: number, tileH?: number, mapRows?: number, mapColumns?: number): void;
/**
*
*
*@class MapTraveler
* @classdesc
*   A MapTraveler moves around in a tiled map using velocity, basic jumping and collisions are handled.
*    MapTravelers extend TravelerSkeleton and mass, maxSpeed via forceApplier are factors involvide with velocity updates.
*
*
* @param x {Number} The x location of the MapTraveler
* @param y {Number} The y location of the MapTraveler
* @param width {Number} The width of the MapTraveler
* @param height {Number} The height of the MapTraveler
* @param map {Array} The 2D Array map the MapTraveler should be confined to. see _map
* @param [ca] {CanvasAnimation} Optional CanvasAnimation to display and animate the MapTraveler
* @param [dontCloneMap=false] {Boolean} Optional to not clone the map that is passed in during construction.
* @param [dt=.6666666667] {Number} Optiona delta time value, default is TimeKeeper._sae  .6666666667 see TimeKeeper.
* @param [tileW] {Number} The default tile width for each tile in the map.
* @param [tileH] {Number} The default tile height for each tile in the map.
* @param [mapRows] {Number} The amount of rows that the map has.
* @param [mapColumns] {Number} The amount of columns that the map has.
*
* @see TravelerSkeleton
*
*/
declare function MapTraveler(x: number, y: number, width: number, height: number, map: any[], ca?: CanvasAnimation, dontCloneMap?: boolean, dt?: number, tileW?: number, tileH?: number, mapRows?: number, mapColumns?: number): void;
declare class MapTraveler {
    constructor(x: number, y: number, width: number, height: number, map: any[], ca?: CanvasAnimation, dontCloneMap?: boolean, dt?: number, tileW?: number, tileH?: number, mapRows?: number, mapColumns?: number);
    /**
    *
    *
    *@class MapTraveler
    * @classdesc
    *   A MapTraveler moves around in a tiled map using velocity, basic jumping and collisions are handled.
    *    MapTravelers extend TravelerSkeleton and mass, maxSpeed via forceApplier are factors involvide with velocity updates.
    *
    *
    * @param x {Number} The x location of the MapTraveler
    * @param y {Number} The y location of the MapTraveler
    * @param width {Number} The width of the MapTraveler
    * @param height {Number} The height of the MapTraveler
    * @param map {Array} The 2D Array map the MapTraveler should be confined to. see _map
    * @param [ca] {CanvasAnimation} Optional CanvasAnimation to display and animate the MapTraveler
    * @param [dontCloneMap=false] {Boolean} Optional to not clone the map that is passed in during construction.
    * @param [dt=.6666666667] {Number} Optiona delta time value, default is TimeKeeper._sae  .6666666667 see TimeKeeper.
    * @param [tileW] {Number} The default tile width for each tile in the map.
    * @param [tileH] {Number} The default tile height for each tile in the map.
    * @param [mapRows] {Number} The amount of rows that the map has.
    * @param [mapColumns] {Number} The amount of columns that the map has.
    *
    * @see TravelerSkeleton
    *
    */
    constructor(x: number, y: number, width: number, height: number, map: any[], ca?: CanvasAnimation, dontCloneMap?: boolean, dt?: number, tileW?: number, tileH?: number, mapRows?: number, mapColumns?: number);
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
    path: any[];
    _mapRows: number;
    _mapColumns: any;
    _tw: number;
    _th: number;
    destination: MoverPoint;
    /**
    *
    *   The stand state: 1.
    *
    * @memberof MapTraveler
    *
    */
    stand: number;
    /**
    *
    *    The walk state: 2.
    *
    * @memberof MapTraveler
    *
    */
    walk: number;
    /**
    *
    *    The up state: 3.
    *
    * @memberof MapTraveler
    *
    */
    up: number;
    /**
    *
    *    The down state: 4.
    *
    * @memberof MapTraveler
    *
    */
    down: number;
    /**
    *
    *    Moves the MapTraveler left, right, up, and down and confines it to the map given during construction.
    *    Velocity is controlled by this method, it gets set to either _walkSpeed or _jumpSpeed based on the paramaters passed and the current _state of the MapTraveler.
    *    This method opperates and results in the same behavior as the MapMover Class if dontApplyForce is true (or 1). [ by default it is false]
    * 	 If dontApplyForce is left out [false] forceApplier is used and therefore maxForce, mass, and maxSpeed are applied to velocity. All the TravelerSkeleton methods change and use forceApplier.
    *	 The move method encapsulates and controlls .update calls, dontApplyForce is also available as the last param of the update method.
    *    But to fully utilize the Traveler aspect of this Class, MapTraveler, one would adjust the velocity (_veloc), or use one of the TravelerSkeleton inherited methods, then use update without the move method.
    *  	 (see update)
    *
    * @memberof MapTraveler.prototype
    * @method move
    * @param left  {Boolean}
    * @param right {Boolean}
    * @param up {Boolean}
    * @param down {Boolean}
    * @param [dontApplyForce=false] {Boolean} Default is false.
    *
    */
    move(left: boolean, right: boolean, up: boolean, down: boolean, dontApplyForce?: boolean): void;
    /**
    *
    * Set up the MapTraveler to move tile by tile instead of fluidly.
    *
    * This method sets the following variables accordingly:
    *
    *  _jumps = 0; _deltaTime = 1; _jumpSpeed = tile width; ,maxSpeed = tile width. _walkSpeed = tile width.
    *
    * @memberof MapTraveler
    * @method setupForTileMove
    *
    *
    */
    setupForTileMove(): void;
    maxSpeed: number;
    /**
    *
    * Move tile by tile, call setupForTileMove once first, then you can use this method instead of move, also cancel all button presses after the call.
    *  Also, if using the touch controller, you would want the touch controller to not capture touch move, so you would call removeTouchMove on the ControllerPad instance.
    * See the frogger example.
    *
    * @memberof MapTraveler
    * @method tileMove
    *
    * @param left {Boolean}
    * @param right {Boolean}
    * @param up {Boolean}
    * @param down {Boolean}
    *
    */
    tileMove(left: boolean, right: boolean, up: boolean, down: boolean): void;
    /**
    *
    *    The update method applies velocity to the position of the MapTraveler,
    *    and then only changes velocity to 0 if there is collision.
    * 	 One could utilze TravelerSkeleton methods as follows;
    *	     var mt = new tabageos.MapTraveler( ... );
    *		 mt._veloc.x = 1;
    *	 	 mt.easeTo(MoverPoint);
    *		 mt.update();
    *
    * @memberof MapTraveler.prototype
    * @method update
    * @param [dontApplyToXY=false] {Boolean} If true, x and y are not updated, ._pos and just ._veloc (velocity).
    * @param [dontApplyForce=false] {Boolean} If true, forceApplier will not be used and therefore the method opperates the same way as a MapMover, to utilize the TravelerSkeleton inherited methods this value must be the default false.
    *
    */
    update(dontApplyToXY?: boolean, dontApplyForce?: boolean): void;
    /**
    *
    *   Returns where the MapTraveler is touching the ground based on the map given.
    *   The update method uses this method using the params given during construction of the Class.
    *   The ._grounded property is set by the update method based on this method.
    *
    * @memberof MapTraveler.prototype
    * @method isGroundedOnMap
    * @param last {MoverPoint} this._lastPost
    * @param curr {MoverPoint} this._pos
    * @param veloc {MoverPoint} this._veloc
    * @param map {Array} this._map
    * @param tw {Number} this._tw
    * @param th {Number} this._th
    * @returns {Number}
    */
    isGroundedOnMap(last: MoverPoint, curr: MoverPoint, veloc: MoverPoint, map: any[], tw: number, th: number): number;
    /**
    *
    *    Returns where the MapTraveler is touching a ceiling based on the map given.
    *   The update method uses this method using the params given during construction of the Class.
    *   The ._atCeiling property is set by the update method based on this method.
    *
    * @memberof MapTraveler.prototype
    * @method isHeadHitOnMap
    * @param last {MoverPoint} this._lastPost
    * @param curr {MoverPoint} this._pos
    * @param veloc {MoverPoint} this._veloc
    * @param map {Array} this._map
    * @param tw {Number} this._tw
    * @param th {Number} this._th
    * @returns {Number}
    */
    isHeadHitOnMap(last: MoverPoint, curr: MoverPoint, veloc: MoverPoint, map: any[], tw: number, th: number): number;
    /**
    *
    *    Returns where the MapTraveler is colliding right based on the map given.
    *   The update method uses this method using the params given during construction of the Class.
    *   The ._pRight property is set by the update method based on this method.
    *
    * @memberof MapTraveler.prototype
    * @method isRightPushingOnMap
    * @param last {MoverPoint} this._lastPost
    * @param curr {MoverPoint} this._pos
    * @param veloc {MoverPoint} this._veloc
    * @param map {Array} this._map
    * @param tw {Number} this._tw
    * @param th {Number} this._th
    * @returns {Number}
    */
    isRightPushingOnMap(last: MoverPoint, curr: MoverPoint, veloc: MoverPoint, map: any[], tw: number, th: number): number;
    /**
    *    Returns where the MapTraveler is colliding left based on the map given.
    *   The update method uses this method using the params given during construction of the Class.
    *   The ._pLeft property is set by the update method based on this method.
    *
    *
    * @memberof MapTraveler.prototype
    * @method isLeftPushingOnMap
    * @param last {MoverPoint} this._lastPost
    * @param curr {MoverPoint} this._pos
    * @param veloc {MoverPoint} this._veloc
    * @param map {Array} this._map
    * @param tw {Number} this._tw
    * @param th {Number} this._th
    * @returns {Number}
    */
    isLeftPushingOnMap(last: MoverPoint, curr: MoverPoint, veloc: MoverPoint, map: any[], tw: number, th: number): number;
}
//# sourceMappingURL=MapTraveler.d.ts.map