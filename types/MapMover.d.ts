declare function MapMover(x: number, y: number, width: number, height: number, map: any[], ca?: CanvasAnimation, dontCloneMap?: boolean, dt?: number, tw?: number, th?: number, mapRows?: number, mapColumns?: number): void;
/**
*
*@class MapMover
* @classdesc
*   A MoverSkeleton that moves confined to the map given.
*
*
*
* @param x {Number} The x location of the MapMover
* @param y {Number} The y location of the MapMover
* @param width {Number} The width of the MapMover
* @param height {Number} The height of the MapMover
* @param map {Array} A 2D Array denoting the area that the MapMover can move in.
*						The map can be a 2D Array with integer inner values as follows;
*						var map = [
*									[1,0,0,0,0,1],
*									[1,0,0,0,0,1],
*									[1,0,0,0,0,1],
*									[1,1,1,1,1,1]
*									];
*
*							(In the above case, the player would only be able to move in the 0 spots)
*
*						Or the map can be a 2D Array with array inner values as follows;
*  							var map = [
*										[[1,1],[0,0],[0,0],[0,0],[1,1]],
*										[[1,1],[0,0],[0,0],[0,0],[1,1]],
*										[[1,1],[0,0],[0,0],[0,0],[1,1]],
*										[[1,1],[2,2],[2,2],[2,2],[1,1]]
*										];
*							(In the above case, the player would only be able to move in the [0,0] spots)
*							(this map type can denote much more and is the default type for the BlitMath Class which is a map drawing helper class)
*
* @param [ca] {CanvasAnimation} The optional CanvasAnimation associated with this MapMover.
* @param {Boolean} [dontCloneMap=false] If true is passed the map you pass in will not be cloned, otherwise the map you pass in is cloned, truly cloned, such that your constructed MapMover.map is Not a reference to your original map. The default opperation is to leave this alone, allowing your map to get cloned. See BlitMath.cloneMultiArray
* @param [dt=.6666666667] {Number} delta time based on desired frame rate, the default is Tabageos.TimeKeeper._sae; 1000 / 60. Change the value of Tabageos.TimeKeeper._sae if you want to adjust the frame rate of your game. Default is 1000 / 60. for 60 frames per second.
* @param [tw] {Number} The width of each tile in the map, default will be same as width
* @param [th] {Number} The height of each tile in the map, default will be same as height
* @param [mapRows] {Number} The amount of rows the map has. Optional, by default this will be calculated based on map.
* @param [mapColumns]  {Number} The amount of columns the map has. Optional, by default this will be calculated based on map.
*
*/
declare function MapMover(x: number, y: number, width: number, height: number, map: any[], ca?: CanvasAnimation, dontCloneMap?: boolean, dt?: number, tw?: number, th?: number, mapRows?: number, mapColumns?: number): void;
declare class MapMover {
    constructor(x: number, y: number, width: number, height: number, map: any[], ca?: CanvasAnimation, dontCloneMap?: boolean, dt?: number, tw?: number, th?: number, mapRows?: number, mapColumns?: number);
    /**
    *
    *@class MapMover
    * @classdesc
    *   A MoverSkeleton that moves confined to the map given.
    *
    *
    *
    * @param x {Number} The x location of the MapMover
    * @param y {Number} The y location of the MapMover
    * @param width {Number} The width of the MapMover
    * @param height {Number} The height of the MapMover
    * @param map {Array} A 2D Array denoting the area that the MapMover can move in.
    *						The map can be a 2D Array with integer inner values as follows;
    *						var map = [
    *									[1,0,0,0,0,1],
    *									[1,0,0,0,0,1],
    *									[1,0,0,0,0,1],
    *									[1,1,1,1,1,1]
    *									];
    *
    *							(In the above case, the player would only be able to move in the 0 spots)
    *
    *						Or the map can be a 2D Array with array inner values as follows;
    *  							var map = [
    *										[[1,1],[0,0],[0,0],[0,0],[1,1]],
    *										[[1,1],[0,0],[0,0],[0,0],[1,1]],
    *										[[1,1],[0,0],[0,0],[0,0],[1,1]],
    *										[[1,1],[2,2],[2,2],[2,2],[1,1]]
    *										];
    *							(In the above case, the player would only be able to move in the [0,0] spots)
    *							(this map type can denote much more and is the default type for the BlitMath Class which is a map drawing helper class)
    *
    * @param [ca] {CanvasAnimation} The optional CanvasAnimation associated with this MapMover.
    * @param {Boolean} [dontCloneMap=false] If true is passed the map you pass in will not be cloned, otherwise the map you pass in is cloned, truly cloned, such that your constructed MapMover.map is Not a reference to your original map. The default opperation is to leave this alone, allowing your map to get cloned. See BlitMath.cloneMultiArray
    * @param [dt=.6666666667] {Number} delta time based on desired frame rate, the default is Tabageos.TimeKeeper._sae; 1000 / 60. Change the value of Tabageos.TimeKeeper._sae if you want to adjust the frame rate of your game. Default is 1000 / 60. for 60 frames per second.
    * @param [tw] {Number} The width of each tile in the map, default will be same as width
    * @param [th] {Number} The height of each tile in the map, default will be same as height
    * @param [mapRows] {Number} The amount of rows the map has. Optional, by default this will be calculated based on map.
    * @param [mapColumns]  {Number} The amount of columns the map has. Optional, by default this will be calculated based on map.
    *
    */
    constructor(x: number, y: number, width: number, height: number, map: any[], ca?: CanvasAnimation, dontCloneMap?: boolean, dt?: number, tw?: number, th?: number, mapRows?: number, mapColumns?: number);
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
    x: number;
    y: number;
    _canvasAnimation: CanvasAnimation;
    _checkHelper: MoverPoint;
    _jumps: number;
    _jumpSpeed: number;
    _jsp: number;
    _walkSpeed: number;
    _gravityLevel: number;
    _pLeft: number;
    _npLeft: number;
    _pRight: number;
    _npRight: number;
    _grounded: number;
    _unGrounded: number;
    _atCeiling: number;
    _unCeiling: number;
    _mapRows: number;
    _mapColumns: any;
    _tw: number;
    _th: number;
    /**
    *
    *
    *
    * @memberof MapMover
    *
    */
    stand: number;
    /**
    *
    *
    *
    * @memberof MapMover
    *
    */
    walk: number;
    /**
    *
    *
    *
    * @memberof MapMover
    *
    */
    up: number;
    /**
    *
    *
    *
    * @memberof MapMover
    *
    */
    down: number;
    /**
    *
    * Set up the MapMover to move tile by tile instead of fluidly.
    *
    * This method sets the following variables accordingly:
    *
    *  _jumps = 0; _deltaTime = 1; _jumpSpeed = tile width; ,maxSpeed = tile width. _walkSpeed = tile width.
    *
    * @memberof MapMover
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
    * @memberof MapMover
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
    *   Moves the MapMover, in the directions given, confined to the map given during construction.
    *
    *
    * @memberof MapMover.prototype
    * @method move
    * @param left {Boolean}
    * @param right {Boolean}
    * @param up {Boolean}
    * @param down {Boolean}
    *
    */
    move(left: boolean, right: boolean, up: boolean, down: boolean): void;
    /**
    *
    *    This methos is called by the move method, and is the method handling _pos updates and collisions.
    *
    * @memberof MapMover.prototype
    * @method update
    * @param dontApplyToXY {Boolean}
    *
    */
    update(dontApplyToXY: boolean): void;
    /**
    *
    *    Used by the update method
    *
    * @memberof MapMover.prototype
    * @method isGroundedOnMap
    * @param last
    * @param curr
    * @param veloc
    * @param map
    * @param tw
    * @param th
    * @returns {Number}  The y position of the collision
    */
    isGroundedOnMap(last: any, curr: any, veloc: any, map: any, tw: any, th: any): number;
    /**
    *
    *    Used by the update method
    *
    * @memberof MapMover.prototype
    * @method isHeadHitOnMap
    * @param last
    * @param curr
    * @param veloc
    * @param map
    * @param tw
    * @param th
    * @returns {Number} The y position of the collision
    */
    isHeadHitOnMap(last: any, curr: any, veloc: any, map: any, tw: any, th: any): number;
    /**
    *
    *    Used by the update method
    *
    * @memberof MapMover.prototype
    * @method isRightPushingOnMap
    * @param last
    * @param curr
    * @param veloc
    * @param map
    * @param tw
    * @param th
    * @returns {Number}  The x position of the collision
    */
    isRightPushingOnMap(last: any, curr: any, veloc: any, map: any, tw: any, th: any): number;
    /**
    *
    *    Used by the update method
    *
    * @memberof MapMover.prototype
    * @method isLeftPushingOnMap
    * @param last
    * @param curr
    * @param veloc
    * @param map
    * @param tw
    * @param th
    * @returns {Number} The x position of the collision
    */
    isLeftPushingOnMap(last: any, curr: any, veloc: any, map: any, tw: any, th: any): number;
}
//# sourceMappingURL=MapMover.d.ts.map