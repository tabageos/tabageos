declare function SceneryThrower(x: number, y: number, width: number, height: number, map: any[], ca: CanvasAnimation, dontCloneMap: boolean, dt: number, tWidth: number, tHeight: number, mr: number, mc: number): void;
/**
*
*    Constructs a new SceneryThrower.
*
* @class SceneryThrower
* @classdesc
*
*  A MapMover designated as a thrower of SceneryObjects,
*  with methods for throwing and picking up and referencing SceneryObjects.
*
* @param x {Number}
* @param y {Number}
* @param width {Number}
* @param height {Number}
* @param map {Array}
* @param ca {CanvasAnimation}
* @param dontCloneMap {Boolean}
* @param dt {Number} Default is TimeKeeper._sae
* @param tWidth {Number} tile width
* @param tHeight {Number} tile height
* @param mr {Number} map rows
* @param mc {Number} map columns
*
* @see MapMover
*
*/
declare function SceneryThrower(x: number, y: number, width: number, height: number, map: any[], ca: CanvasAnimation, dontCloneMap: boolean, dt: number, tWidth: number, tHeight: number, mr: number, mc: number): void;
declare class SceneryThrower {
    constructor(x: number, y: number, width: number, height: number, map: any[], ca: CanvasAnimation, dontCloneMap: boolean, dt: number, tWidth: number, tHeight: number, mr: number, mc: number);
    /**
    *
    *    Constructs a new SceneryThrower.
    *
    * @class SceneryThrower
    * @classdesc
    *
    *  A MapMover designated as a thrower of SceneryObjects,
    *  with methods for throwing and picking up and referencing SceneryObjects.
    *
    * @param x {Number}
    * @param y {Number}
    * @param width {Number}
    * @param height {Number}
    * @param map {Array}
    * @param ca {CanvasAnimation}
    * @param dontCloneMap {Boolean}
    * @param dt {Number} Default is TimeKeeper._sae
    * @param tWidth {Number} tile width
    * @param tHeight {Number} tile height
    * @param mr {Number} map rows
    * @param mc {Number} map columns
    *
    * @see MapMover
    *
    */
    constructor(x: number, y: number, width: number, height: number, map: any[], ca: CanvasAnimation, dontCloneMap: boolean, dt: number, tWidth: number, tHeight: number, mr: number, mc: number);
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
    health: number;
    holding: TileData | SceneryObject;
    nameOfThrower: string;
    _checkHelper: MoverPoint;
    /**
    *
    *
    *
    * @memberof SceneryThrower
    *
    */
    throwStrength: number;
    /**
    *
    *    Returns a reference to altered position.
    *
    * @memberof SceneryThrower.prototype
    * @method alteredPosition
    * @param xAlterAmount {Number}
    * @param yAlterAmount {Number}
    * @returns {MoverPoint}
    */
    alteredPosition(xAlterAmount: number, yAlterAmount: number): MoverPoint;
    /**
    *
    *    Returns the from Rectangle for the SceneryObject it is holding,
    *       used to know where to draw from a sprite sheet.
    *
    * @memberof SceneryThrower.prototype
    * @method holdingImageRect
    * @returns {Rectangle}
    */
    holdingImageRect(): Rectangle;
    /**
    *
    *    Pick up TileData, this.holding will be set to the TileData passed,
    *       and the holdingRect will be calculated.
    *
    * @memberof SceneryThrower.prototype
    * @method pickUpTileData
    * @param td {TileData} the TileData to pick up.
    * @param imageWidthAdjust {Number} Optional width to adjust holding rect result.
    * @param imageHeightAdjust {Number} Optional height to adjust holding rect result.
    * @returns {Boolean} Returns true of td was picked up.
    */
    pickUpTileData(td: TileData, imageWidthAdjust: number, imageHeightAdjust: number): boolean;
    /**
    *
    *    Picks up a SceneryObject, this.holding will be set to the obj.
    *       and this.holdingRect will be calculated.
    *
    * @memberof SceneryThrower.prototype
    * @method pickUp
    * @param obj {SceneryObject} The SceneryObject to pick up.
    * @param imageWidthAdjust {Number} Optional width to adjust holding rect result.
    * @param imageHeightAdjust {Number} Optional height to adjust holding rect result.
    * @returns {Boolean} Returns true if obj was picked up.
    */
    pickUp(obj: SceneryObject, imageWidthAdjust: number, imageHeightAdjust: number): boolean;
    /**
    *
    *    Sets this.holding to null.
    *
    * @memberof SceneryThrower.prototype
    * @method _throwHolding
    *
    */
    _throwHolding(): void;
    /**
    *
    *    Throws what it is holding as a SceneryObject.
    *    this.holding becomes null after this method is called.
    *
    * @memberof SceneryThrower.prototype
    * @method throwSceneryObject
    * @param w {Number} Tile width, default is the tile width set at construction or 16.
    * @param h {Number} Tile height, default is the tile height set at construction or 16.
    * @param jumps {Number} Should gravity be applied to the SceneryObject, default is 0.
    * @returns {SceneryObject}
    */
    throwSceneryObject(w: number, h: number, jumps: number): SceneryObject;
}
//# sourceMappingURL=SceneryThrower.d.ts.map