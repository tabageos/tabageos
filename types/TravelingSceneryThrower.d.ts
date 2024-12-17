declare function TravelingSceneryThrower(x: number, y: number, width: number, height: number, map: any[], ca?: CanavsAnimation, dontCloneMap?: boolean, dt?: number, tWidth?: number, tHeight?: number, mr?: number, mc?: number): void;
/**
*
* Constructs a new TravelingSceneryThrower
*
* @class TravelingSceneryThrower
* @classdesc
*
*
*    A MapTraveler designated as a SceneryThrower,
*    it's similar to a plain SceneryThrower, but can do more.
*
* @param x {Number} The x position of the TravelingSceneryThrower
* @param y {Number} The y position
* @param width {Number}
* @param height {Number}
* @param map {Array} A 2D Array denoting areas the Traveler can pass or not. 0 or [0,0] would denote a blank passable spot.
* @param [ca] {CanavsAnimation}
* @param [dontCloneMap] {Boolean}
* @param [dt=.6666666667] {Number}
* @param [tWidth] {Number}
* @param [tHeight] {Number}
* @param [mr] {Number}
* @param [mc] {Number}
*
* @see MapTraveler
* @see TravelerSkeleton
*
*/
declare function TravelingSceneryThrower(x: number, y: number, width: number, height: number, map: any[], ca?: CanavsAnimation, dontCloneMap?: boolean, dt?: number, tWidth?: number, tHeight?: number, mr?: number, mc?: number): void;
declare class TravelingSceneryThrower {
    constructor(x: number, y: number, width: number, height: number, map: any[], ca?: CanavsAnimation, dontCloneMap?: boolean, dt?: number, tWidth?: number, tHeight?: number, mr?: number, mc?: number);
    /**
    *
    * Constructs a new TravelingSceneryThrower
    *
    * @class TravelingSceneryThrower
    * @classdesc
    *
    *
    *    A MapTraveler designated as a SceneryThrower,
    *    it's similar to a plain SceneryThrower, but can do more.
    *
    * @param x {Number} The x position of the TravelingSceneryThrower
    * @param y {Number} The y position
    * @param width {Number}
    * @param height {Number}
    * @param map {Array} A 2D Array denoting areas the Traveler can pass or not. 0 or [0,0] would denote a blank passable spot.
    * @param [ca] {CanavsAnimation}
    * @param [dontCloneMap] {Boolean}
    * @param [dt=.6666666667] {Number}
    * @param [tWidth] {Number}
    * @param [tHeight] {Number}
    * @param [mr] {Number}
    * @param [mc] {Number}
    *
    * @see MapTraveler
    * @see TravelerSkeleton
    *
    */
    constructor(x: number, y: number, width: number, height: number, map: any[], ca?: CanavsAnimation, dontCloneMap?: boolean, dt?: number, tWidth?: number, tHeight?: number, mr?: number, mc?: number);
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
    _canvasAnimation: any;
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
    /**
    *
    *
    *
    * @memberof TravelingSceneryThrower
    *
    */
    throwStrength: number;
    /**
    *
    *
    *
    * @memberof TravelingSceneryThrower
    *
    */
    health: number;
    /**
    *
    *
    *
    * @memberof TravelingSceneryThrower
    *
    */
    nameOfThrower: string;
    /**
    *
    *
    *
    * @memberof TravelingSceneryThrower.prototype
    * @method alteredPosition
    * @param xAlterAmount
    * @param yAlterAmount
    * @returns {MoverPoint}
    */
    alteredPosition(xAlterAmount: any, yAlterAmount: any): MoverPoint;
    /**
    *
    *    Returns holdingRect
    *
    * @memberof TravelingSceneryThrower.prototype
    * @method holdingImageRect
    * @returns {Rectangle}
    */
    holdingImageRect(): Rectangle;
    /**
    *
    *    Picks up TileData updating holding and holdingRect
    *
    * @memberof TravelingSceneryThrower.prototype
    * @method pickUpTileData
    * @param td {TileData}
    * @param imageWidthAdjust {Number}
    * @param imageHeightAdjust {Number}
    * @returns {Boolean} Returns true if TileData was picked up
    */
    pickUpTileData(td: TileData, imageWidthAdjust: number, imageHeightAdjust: number): boolean;
    holding: any;
    /**
    *
    *    Picks up TileData and stores it in the holdings Array
    *
    * @memberof TravelingSceneryThrower.prototype
    * @method pickUpAndStoreTileData
    * @param obj {TileData}
    * @param imageWidthAdjust {Number}
    * @param imageHeightAdjust {Number}
    * @param dontReadyThrow {Boolean} Ready the last value in holdings as holding is the default behavior
    * @returns {Boolean}
    */
    pickUpAndStoreTileData(obj: TileData, imageWidthAdjust: number, imageHeightAdjust: number, dontReadyThrow: boolean): boolean;
    /**
    *
    *    Removes the holding from holdings that has the value given.
    *
    * @memberof TravelingSceneryThrower.prototype
    * @method removeFromStorageByValue
    * @param tValue {Object}
    *
    */
    removeFromStorageByValue(tValue: any): void;
    /**
    *
    *    Removes the last holding from holdings and sets holding to null.
    *
    * @memberof TravelingSceneryThrower.prototype
    * @method removeLastFromStorage
    * @returns {Object} Returns the last holding value or null.
    */
    removeLastFromStorage(): any;
    /**
    *
    *
    *
    * @memberof TravelingSceneryThrower
    *
    */
    _tempDivs: any[];
    /**
    *   Displays each value or tileValue in holdings using the given img, backgroundFromRect, and cameraLayer.
    *
    *
    * @memberof TravelingSceneryThrower.prototype
    * @method displayStorage
    * @param img {Img}
    * @param cameraLayer {CanvasObject}
    * @param backgroundFromRect {Rectangle} The Rectangle defining where in the image to draw from
    * @param bgx {Number} The top left of where to draw the background to
    * @param bgy {Number} The top left of where to draw the background to
    * @param tw {Number} The tile width
    * @param th {Number} tile height
    * @param stx {Number} The starting x position for the first value display
    * @param sty {Number} The starting y position for the first value display
    * @param descriptions {Array} An Array of [y,x, description] values where y,x matches the value of values in holdings, will cause a tool tip to appear with the description when user hovers over the displayed value.
    *
    */
    displayStorage(img: Img, cameraLayer: CanvasObject, backgroundFromRect: Rectangle, bgx: number, bgy: number, tw: number, th: number, stx: number, sty: number, descriptions: any[]): void;
    _displayStorageClearRect: Rectangle;
    /**
    *
    *
    *
    * @memberof TravelingSceneryThrower
    *
    */
    _removedFromStorage: any[];
    /**
    *
    *
    *
    * @memberof TravelingSceneryThrower.prototype
    * @method removeFromDisplayedStorage
    * @param e {Object}
    *
    */
    removeFromDisplayedStorage(e: any): void;
    /**
    *
    *    Picks up the object and stores it in the holdings Array
    *
    * @memberof TravelingSceneryThrower.prototype
    * @method pickUpAndStore
    * @param obj {Object}
    * @param imageWidthAdjust {Number}
    * @param imageHeightAdjust {Number}
    * @param dontReadyThrow {Boolean} By default the obj is also made ready as holding.
    *
    */
    pickUpAndStore(obj: any, imageWidthAdjust: number, imageHeightAdjust: number, dontReadyThrow: boolean): boolean;
    /**
    *
    *    Picks up the obj and stores it has holding
    *
    * @memberof TravelingSceneryThrower.prototype
    * @method pickUp
    * @param obj {Object}
    * @param imageWidthAdjust {Number}  adjust the holdingRect width
    * @param imageHeightAdjust {Number} adjust the holdingRect height
    * @returns {Boolean}
    */
    pickUp(obj: any, imageWidthAdjust: number, imageHeightAdjust: number): boolean;
    /**
    *
    *    Sets holding to null after first removing it from holdings if in holdings.
    *
    * @memberof TravelingSceneryThrower.prototype
    * @method _throwHolding
    *
    */
    _throwHolding(): void;
    /**
    *
    *    Sets holding to the last value in holdings and updates holdingRect
    *
    * @memberof TravelingSceneryThrower.prototype
    * @method _readyNextThrow
    *
    */
    _readyNextThrow(): void;
    /**
    *
    *    Returns the value or tileValue of holdin
    *
    * @memberof TravelingSceneryThrower.prototype
    * @method valueFromHolding
    * @param holdin {Object}
    * @returns {Object}
    */
    valueFromHolding(holdin: any): any;
    /**
    *
    *    Returns the holding Rectangle.
    *
    * @memberof TravelingSceneryThrower.prototype
    * @method rectFromHolding
    * @param holdin {Object}
    * @returns {Rectangle}
    */
    rectFromHolding(holdin: any): Rectangle;
    /**
    *
    *    Throws holding as a SceneryObject.
    *
    * @memberof TravelingSceneryThrower.prototype
    * @method throwSceneryObject
    * @param w {Number}
    * @param h {Number}
    * @param jumps {Boolean} Default is true for setting _jumps of the SceneryObject to true.
    * @returns {SceneryObject}
    */
    throwSceneryObject(w: number, h: number, jumps: boolean): SceneryObject;
    /**
    *
    *    Throws holding as a SceneryObjectTraveler
    *
    * @memberof TravelingSceneryThrower.prototype
    * @method throwSceneryObjectTraveler
    * @param w {Number}
    * @param h {Number}
    * @param jumps {Boolean} Default is true, the SceneryObjectTraveler thrown will be effected by gravity.
    * @returns {SceneryObjectTraveler}
    */
    throwSceneryObjectTraveler(w: number, h: number, jumps: boolean): SceneryObjectTraveler;
}
//# sourceMappingURL=TravelingSceneryThrower.d.ts.map