/**
*
* @class AISceneryThrower
* @classdesc   A TravelingSceneryThrower for platformers that is supposed to be computer controlled.
*	 General use would be to construct it call setTarget, and then call .thinkAboutWhatToDo during a loop.
*
* @constructor
*
* @class AISceneryThrower
* @param x {Number} x position of the AISceneryThrower
* @param y {Number} y position of the AISceneryThrower
* @param width {Number} width of the AISceneryThrower
* @param height {Number} height of the AISceneryThrower
* @param map {Array} collision map Array
* @param [ca=null] {CanvasAnimation} Optional CanvasAnimation
* @param [dontCloneMap=false] {Boolean} When true map will not be cloned, default is false, map is cloned by default.
* @param [dt=.666666666667] {Number} Delta time, default is TimeKeeper._sae, change TimeKeeper._sae to effect all Travelers you use.
* @param [tWidth] {Number} Tile width default is same as width
* @param [tHeight] {Number} Tile height default is same as height
* @param [mr] {Number} amount of rows in map
* @param [mc] {Number} amount of columns in map
*
* @see TravelingSceneryThrower
*
*/
declare function AISceneryThrower(x: number, y: number, width: number, height: number, map: any[], ca?: CanvasAnimation, dontCloneMap?: boolean, dt?: number, tWidth?: number, tHeight?: number, mr?: number, mc?: number): void;
/**
*
* @class AISceneryThrower
* @classdesc   A TravelingSceneryThrower for platformers that is supposed to be computer controlled.
*	 General use would be to construct it call setTarget, and then call .thinkAboutWhatToDo during a loop.
*
* @constructor
*
* @class AISceneryThrower
* @param x {Number} x position of the AISceneryThrower
* @param y {Number} y position of the AISceneryThrower
* @param width {Number} width of the AISceneryThrower
* @param height {Number} height of the AISceneryThrower
* @param map {Array} collision map Array
* @param [ca=null] {CanvasAnimation} Optional CanvasAnimation
* @param [dontCloneMap=false] {Boolean} When true map will not be cloned, default is false, map is cloned by default.
* @param [dt=.666666666667] {Number} Delta time, default is TimeKeeper._sae, change TimeKeeper._sae to effect all Travelers you use.
* @param [tWidth] {Number} Tile width default is same as width
* @param [tHeight] {Number} Tile height default is same as height
* @param [mr] {Number} amount of rows in map
* @param [mc] {Number} amount of columns in map
*
* @see TravelingSceneryThrower
*
*/
declare function AISceneryThrower(x: number, y: number, width: number, height: number, map: any[], ca?: CanvasAnimation, dontCloneMap?: boolean, dt?: number, tWidth?: number, tHeight?: number, mr?: number, mc?: number): void;
declare class AISceneryThrower {
    constructor(x: number, y: number, width: number, height: number, map: any[], ca?: CanvasAnimation, dontCloneMap?: boolean, dt?: number, tWidth?: number, tHeight?: number, mr?: number, mc?: number);
    /**
    *
    * @class AISceneryThrower
    * @classdesc   A TravelingSceneryThrower for platformers that is supposed to be computer controlled.
    *	 General use would be to construct it call setTarget, and then call .thinkAboutWhatToDo during a loop.
    *
    * @constructor
    *
    * @class AISceneryThrower
    * @param x {Number} x position of the AISceneryThrower
    * @param y {Number} y position of the AISceneryThrower
    * @param width {Number} width of the AISceneryThrower
    * @param height {Number} height of the AISceneryThrower
    * @param map {Array} collision map Array
    * @param [ca=null] {CanvasAnimation} Optional CanvasAnimation
    * @param [dontCloneMap=false] {Boolean} When true map will not be cloned, default is false, map is cloned by default.
    * @param [dt=.666666666667] {Number} Delta time, default is TimeKeeper._sae, change TimeKeeper._sae to effect all Travelers you use.
    * @param [tWidth] {Number} Tile width default is same as width
    * @param [tHeight] {Number} Tile height default is same as height
    * @param [mr] {Number} amount of rows in map
    * @param [mc] {Number} amount of columns in map
    *
    * @see TravelingSceneryThrower
    *
    */
    constructor(x: number, y: number, width: number, height: number, map: any[], ca?: CanvasAnimation, dontCloneMap?: boolean, dt?: number, tWidth?: number, tHeight?: number, mr?: number, mc?: number);
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
    /**
    *
    *    back up time, used by thinkAboutWhatToDo
    *    @type Number
    * @memberof AISceneryThrower
    *
    */
    backUp: number;
    /**
    *
    *    time of watching throw used during thinkAboutWhatToDo
    *    @type Number
    * @memberof AISceneryThrower
    *
    */
    watchingThrow: number;
    /**
    *
    *    delay after an attack before another attack used during thinkAboutWhatToDo
    *    @type Number
    * @memberof AISceneryThrower
    *
    */
    afterAttackDelay: number;
    /**
    *
    *    The MoverSkeleton target to try to hit with scenery.
    *
    * @memberof AISceneryThrower
    *
    */
    _target: MoverSkeleton;
    /**
    *
    *    Sets _target
    *
    * @memberof AISceneryThrower.prototype
    * @method setTarget
    * @param t {MoverSkeleton} A MoverSkeleton or Object with x y width height.
    *
    */
    setTarget(t: MoverSkeleton): void;
    /**
    *
    *	 Determines the pick up method to use when picking up SceneryObjects
    *    1 for pickUpAndStore 0 for pickUp
    *    Those methods are inherited from TravelingSceneryThrower
    *    @type Number
    * @memberof AISceneryThrower
    *
    */
    pickUpMethodToUse: number;
    /**
    *
    *    Determines the distance that the AISceneryThrower throws from and its throw strength.
    *    This method is called by walkJumpOrAttack which is called by thinkAboutWhatToDo.
    *
    * @memberof AISceneryThrower.prototype
    * @method smarts
    * @param level {Number} Level of smarts, 1 2 or 3.
    * @param [tw=16] {Number} Tile width, default is 16
    * @param [th=16] {Number} Tile height, default is 16
    * @returns {Boolean} Returns true if facing and close to the _target based on the smarts level.
    */
    smarts(level: number, tw?: number, th?: number): boolean;
    /**
    *
    *    The main method of the class, causes the AISceneryThrower to first look for SceneryObjects and then pick one up and then try to hit the _target with it.
    *
    * @memberof AISceneryThrower.prototype
    * @method thinkAboutWhatToDo
    * @param sceneryArray {Array} The array that holds the SceneryObjects
    * @param sceneryMap {Array} The map that each SceneryObject is using.
    * @param sceneryCheck {Function} A method that dermines if a tile value is a SceneryObejct, it should take a tile value and return a Boolean.
    * @param sceneryRemoval {Function} A method that removes TileData from being displayed/drawn. It should take a TileData and clears the display of the TileData.
    * @param [tw=16] {Number} Tile width, default is 16
    * @param [th=16] {Number} Tile height default is 16
    * @param [smartness=1] {Number} 1 2 or 3, determines how far away the AISceneryThrower will throw from and its throw strength. Default is 1.
    * @param tileCheck {Function} A method that should determine if a tile value is solid/passible or not.
    *
    */
    thinkAboutWhatToDo(sceneryArray: any[], sceneryMap: any[], sceneryCheck: Function, sceneryRemoval: Function, tw?: number, th?: number, smartness?: number, tileCheck: Function): void;
    dX: number;
    /**
    *
    *    Moves the AISceneryThrower to walk or jump if one tile is in the way.
    *    This method is used by thinkAboutWhatToDo.
    *
    * @memberof AISceneryThrower.prototype
    * @method walkOrJump
    * @param direc {Number} 1 for left, 0 for right.
    * @param [tw=16] {Number} Tile width, default is 16.
    * @param [th=16] {Number} Tile height, default is 16
    * @param closeSceneryX {Number} The x position of the closest SceneryObejct, this is calculated by thinkAboutWhatToDo
    * @param tileCheck {Function} A method that determines if a tile value is solid/passible or not.
    *
    */
    walkOrJump(direc: number, tw?: number, th?: number, closeSceneryX: number, tileCheck: Function): void;
    /**
    *
    *    Causes the AISceneryThrower to move or jump or throw a SceneryObejct its holding.
    *    This method is used by thinkAboutWhatToDo.
    *
    * @memberof AISceneryThrower.prototype
    * @method walkJumpOrAttack
    * @param direc {Number} 1 for left, 0 for right.
    * @param tw {Number} Tile width
    * @param th {Number} Tile height
    * @param sceneryArray {Array} The Array holding the SceneryObejcts.
    * @param smartness {Number} 1 2 or 3, determines how far away the AISceneryThrower will throw from and its throw strength. Default is 1.
    * @param {Function} A method that should determine if a tile value is solid/passible or not.
    *
    */
    walkJumpOrAttack(direc: number, tw: number, th: number, sceneryArray: any[], smartness: number, tileCheck: any): void;
    /**
    *
    *    Causes the AISceneryThrower to move left or right.
    *    Used by thinkAboutWhatToDo.
    *
    * @memberof AISceneryThrower.prototype
    * @method walk
    * @param direc {Number} 1 for left, 0 for right.
    *
    */
    walk(direc: number): void;
    /**
    *
    *    Causes the AISceneryThrower to move up.
    *    Used by thinkAboutWhatToDo.
    *
    * @memberof AISceneryThrower.prototype
    * @method jump
    * @param direc {Number}
    *
    */
    jump(direc: number): void;
}
//# sourceMappingURL=AISceneryThrower.d.ts.map