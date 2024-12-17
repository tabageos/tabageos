/**
*
*    A TravelingSceneryThrower designated as a Platformer character. BasicPlatformer climbs ladders designated by the ladderTileValue, and is ready for a 'climb' animation.
*
* @class BasicPlatformer
* @param x {Number}
* @param y {Number}
* @param width {Number}
* @param height {Number}
* @param map {Array}
* @param ca {CanvasAnimation}
* @param [dontCloneMap=false] {Boolean}
* @param [dt=.6666666667] {Number} delta time
* @param [tWidth] {Number} tile width
* @param [tHeight] {Number} tile height
* @param [mr] {Number} map rows
* @param [mc] {Number} map columns
* @param mapOfOriginalTiles {Array} uncloned version of map containing ladder tile values.
* @param controller {ControllerPad} a reference to the games ControllerPad instance.
* @param ladderTileValue  {Object} tile value in map that denotes a ladder tile.
*
*
* @see TravelingSceneryThrower
*
*/
declare function BasicPlatformer(x: number, y: number, width: number, height: number, map: any[], ca: CanvasAnimation, dontCloneMap?: boolean, dt?: number, tWidth?: number, tHeight?: number, mr?: number, mc?: number, mapOfOriginalTiles: any[], controller: ControllerPad, ladderTileValue: any): void;
/**
*
*    A TravelingSceneryThrower designated as a Platformer character. BasicPlatformer climbs ladders designated by the ladderTileValue, and is ready for a 'climb' animation.
*
* @class BasicPlatformer
* @param x {Number}
* @param y {Number}
* @param width {Number}
* @param height {Number}
* @param map {Array}
* @param ca {CanvasAnimation}
* @param [dontCloneMap=false] {Boolean}
* @param [dt=.6666666667] {Number} delta time
* @param [tWidth] {Number} tile width
* @param [tHeight] {Number} tile height
* @param [mr] {Number} map rows
* @param [mc] {Number} map columns
* @param mapOfOriginalTiles {Array} uncloned version of map containing ladder tile values.
* @param controller {ControllerPad} a reference to the games ControllerPad instance.
* @param ladderTileValue  {Object} tile value in map that denotes a ladder tile.
*
*
* @see TravelingSceneryThrower
*
*/
declare function BasicPlatformer(x: number, y: number, width: number, height: number, map: any[], ca: CanvasAnimation, dontCloneMap?: boolean, dt?: number, tWidth?: number, tHeight?: number, mr?: number, mc?: number, mapOfOriginalTiles: any[], controller: ControllerPad, ladderTileValue: any): void;
declare class BasicPlatformer {
    constructor(x: number, y: number, width: number, height: number, map: any[], ca: CanvasAnimation, dontCloneMap?: boolean, dt?: number, tWidth?: number, tHeight?: number, mr?: number, mc?: number, mapOfOriginalTiles: any[], controller: ControllerPad, ladderTileValue: any);
    /**
    *
    *    A TravelingSceneryThrower designated as a Platformer character. BasicPlatformer climbs ladders designated by the ladderTileValue, and is ready for a 'climb' animation.
    *
    * @class BasicPlatformer
    * @param x {Number}
    * @param y {Number}
    * @param width {Number}
    * @param height {Number}
    * @param map {Array}
    * @param ca {CanvasAnimation}
    * @param [dontCloneMap=false] {Boolean}
    * @param [dt=.6666666667] {Number} delta time
    * @param [tWidth] {Number} tile width
    * @param [tHeight] {Number} tile height
    * @param [mr] {Number} map rows
    * @param [mc] {Number} map columns
    * @param mapOfOriginalTiles {Array} uncloned version of map containing ladder tile values.
    * @param controller {ControllerPad} a reference to the games ControllerPad instance.
    * @param ladderTileValue  {Object} tile value in map that denotes a ladder tile.
    *
    *
    * @see TravelingSceneryThrower
    *
    */
    constructor(x: number, y: number, width: number, height: number, map: any[], ca: CanvasAnimation, dontCloneMap?: boolean, dt?: number, tWidth?: number, tHeight?: number, mr?: number, mc?: number, mapOfOriginalTiles: any[], controller: ControllerPad, ladderTileValue: any);
    width: number;
    height: number;
    _middlePoint: MoverPoint;
    _pos: MoverPoint;
    _veloc: MoverPoint;
    _lastVeloc: MoverPoint;
    _lastPos: MoverPoint;
    _deltaTime: number;
    _map: any[];
    _state: number;
    x: number;
    y: number;
    _rect: Rectangle;
    _canvasAnimation: CanvasAnimation;
    _tH: number;
    _tW: number;
    _outAltered: MoverPoint;
    holdingRect: Rectangle;
    holdingOffsetX: number;
    holdingOffsetY: number;
    _jumps: number;
    easeProximity: number;
    _checkHelper: MoverPoint;
    forceApplier: MoverPoint;
    forceHolder: MoverPoint;
    _w: number;
    _h: number;
    wanderOffset: MoverPoint;
    blankMO: MoverPoint;
    _eventDispatcher: EventDispatcher;
    holdings: any[];
    _holdingHelperRect: Rectangle;
    personalSpace: number;
    _hpt: MoverPoint;
    _jumpSpeed: number;
    throwStrength: number;
    tileMap: any[];
    _controllerRef: ControllerPad;
    ladderValue: any;
    _hlpp: MoverPoint;
    /**
    *
    *
    *
    * @memberof BasicPlatformer
    *
    */
    onLadder: number;
    /**
    *
    *
    *
    * @memberof BasicPlatformer
    *
    */
    onMovingPlatform: number;
    /**
    *
    *
    *
    * @memberof BasicPlatformer
    *
    */
    tile: any;
    /**
    *
    *
    *
    * @memberof BasicPlatformer
    *
    */
    tilelUp: any;
    /**
    *
    *
    *
    * @memberof BasicPlatformer
    *
    */
    tileDown: any;
    /**
    *
    *
    *
    * @memberof BasicPlatformer
    *
    */
    tileLeft: any;
    /**
    *
    *
    *
    * @memberof BasicPlatformer
    *
    */
    tileRight: any;
    /**
    *
    *    Populates tile, tileUp, tileDown, tileLeft and tileRight with the values of those tiles found in tileMap.
    *
    * @memberof BasicPlatformer.prototype
    * @method getValuesOfCloseTiles
    * @param map
    *
    */
    getValuesOfCloseTiles(map: any): void;
    tileUp: any;
    /**
    *
    *    Returns true if the values match.
    *
    * @memberof BasicPlatformer.prototype
    * @method valuesMatch
    * @param val1 {Object}
    * @param val2 {Object}
    * @returns {Boolean} Returns true if the values match.
    */
    valuesMatch(val1: any, val2: any): boolean;
    /**
    *
    *    This method becomes part of this class' CanvasAnimation's changeDirectionAnimation function.
    *    This class utilizes this method to add ladder climbing functionality and the 'climb' animation.
    *
    *    The ladder tile value is defined during construction, then if a climb animation is defined,
    *    when on the ladder the class will switch to the climb animation. The ladder tile value should be a tile the BasicPlatformer does not collide with.
    *
    * @memberof BasicPlatformer.prototype
    * @method _addedToChangeDirectionAni
    * @param left
    * @param right
    * @param up
    * @param down
    * @param keepAniIndex
    * @param noIdle
    *
    *
    * @see CanvasAnimation#changeDirectionAnimation
    */
    _addedToChangeDirectionAni(left: any, right: any, up: any, down: any, keepAniIndex: any, noIdle: any): void;
    currentAnimation: string;
}
//# sourceMappingURL=BasicPlatformer.d.ts.map