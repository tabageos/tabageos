declare function NinjaSceneryThrower(x: any, y: any, width: any, height: any, map: any, ca: any, dontCloneMap: any, dt: any, tWidth: any, tHeight: any, mr: any, mc: any): void;
/**
*
* @class NinjaSceneryThrower
*  @classdesc A BasicNinja that also can pick up and throw SceneryObjects
*
* @see BasicNinja
* @see TravelingSceneryThrower
*
* @param x
* @param y
* @param width
* @param height
* @param map
* @param ca
* @param dontCloneMap
* @param dt
* @param tWidth
* @param tHeight
* @param mr
* @param mc
*
*/
declare function NinjaSceneryThrower(x: any, y: any, width: any, height: any, map: any, ca: any, dontCloneMap: any, dt: any, tWidth: any, tHeight: any, mr: any, mc: any): void;
declare class NinjaSceneryThrower {
    constructor(x: any, y: any, width: any, height: any, map: any, ca: any, dontCloneMap: any, dt: any, tWidth: any, tHeight: any, mr: any, mc: any);
    /**
    *
    * @class NinjaSceneryThrower
    *  @classdesc A BasicNinja that also can pick up and throw SceneryObjects
    *
    * @see BasicNinja
    * @see TravelingSceneryThrower
    *
    * @param x
    * @param y
    * @param width
    * @param height
    * @param map
    * @param ca
    * @param dontCloneMap
    * @param dt
    * @param tWidth
    * @param tHeight
    * @param mr
    * @param mc
    *
    */
    constructor(x: any, y: any, width: any, height: any, map: any, ca: any, dontCloneMap: any, dt: any, tWidth: any, tHeight: any, mr: any, mc: any);
    width: any;
    height: any;
    _middlePoint: MoverPoint;
    _pos: MoverPoint;
    _veloc: MoverPoint;
    _lastVeloc: MoverPoint;
    _lastPos: MoverPoint;
    _deltaTime: any;
    _map: any;
    _state: number;
    x: any;
    y: any;
    _rect: Rectangle;
    _canvasAnimation: any;
    _tH: any;
    _tW: any;
    _outAltered: MoverPoint;
    holdingRect: Rectangle;
    holdingOffsetX: number;
    holdingOffsetY: number;
    _jumps: number;
    easeProximity: number;
    _checkHelper: MoverPoint;
    forceApplier: MoverPoint;
    forceHolder: MoverPoint;
    _w: any;
    _h: any;
    wanderOffset: MoverPoint;
    blankMO: MoverPoint;
    _eventDispatcher: EventDispatcher;
    holdings: any[];
    _holdingHelperRect: Rectangle;
    /**
    *
    *
    *
    * @memberof NinjaSceneryThrower
    *
    */
    throwStrength: number;
    /**
    *
    *
    *
    * @memberof NinjaSceneryThrower
    *
    */
    health: number;
    /**
    *
    *
    *
    * @memberof NinjaSceneryThrower
    *
    */
    nameOfThrower: string;
    /**
    *
    *
    *
    * @memberof NinjaSceneryThrower.prototype
    * @method alteredPosition
    * @param xAlterAmount
    * @param yAlterAmount
    * @returns {MoverPoint}
    */
    alteredPosition(xAlterAmount: any, yAlterAmount: any): MoverPoint;
    /**
    *
    *
    *
    * @memberof NinjaSceneryThrower.prototype
    * @method holdingImageRect
    * @returns {Rectangle}
    */
    holdingImageRect(): Rectangle;
    /**
    *
    *
    *
    * @memberof NinjaSceneryThrower.prototype
    * @method pickUpTileData
    * @param td
    * @param imageWidthAdjust
    * @param imageHeightAdjust
    * @returns {Boolean}
    */
    pickUpTileData(td: any, imageWidthAdjust: any, imageHeightAdjust: any): boolean;
    holding: any;
    /**
    *
    *
    *
    * @memberof NinjaSceneryThrower.prototype
    * @method pickUpAndStoreTileData
    * @param obj
    * @param imageWidthAdjust
    * @param imageHeightAdjust
    * @param dontReadyThrow
    * @returns {Boolean}
    */
    pickUpAndStoreTileData(obj: any, imageWidthAdjust: any, imageHeightAdjust: any, dontReadyThrow: any): boolean;
    /**
    *
    *
    *
    * @memberof NinjaSceneryThrower.prototype
    * @method removeFromStorageByValue
    * @param tValue {Array}
    *
    */
    removeFromStorageByValue(tValue: any[]): void;
    /**
    *
    *
    *
    * @memberof NinjaSceneryThrower.prototype
    * @method removeLastFromStorage
    * @returns {Object}
    */
    removeLastFromStorage(): any;
    /**
    *
    *    @private
    *
    * @memberof NinjaSceneryThrower
    *
    */
    private _tempDivs;
    /**
    *
    *
    *
    * @memberof NinjaSceneryThrower.prototype
    * @method displayStorage
    * @param img
    * @param cameraLayer
    * @param backgroundFromRect
    * @param bgx
    * @param bgy
    * @param tw
    * @param th
    * @param stx
    * @param sty
    * @param descriptions
    *
    */
    displayStorage(img: any, cameraLayer: any, backgroundFromRect: any, bgx: any, bgy: any, tw: any, th: any, stx: any, sty: any, descriptions: any): void;
    _displayStorageClearRect: Rectangle;
    /**
    *
    *
    *
    * @memberof NinjaSceneryThrower
    *
    */
    _removedFromStorage: any[];
    /**
    *
    *
    *
    * @memberof NinjaSceneryThrower.prototype
    * @method removeFromDisplayedStorage
    * @param e
    *
    */
    removeFromDisplayedStorage(e: any): void;
    /**
    *
    *
    *
    * @memberof NinjaSceneryThrower.prototype
    * @method pickUpAndStore
    * @param obj
    * @param imageWidthAdjust
    * @param imageHeightAdjust
    * @param dontReadyThrow
    * @returns {Boolean}
    */
    pickUpAndStore(obj: any, imageWidthAdjust: any, imageHeightAdjust: any, dontReadyThrow: any): boolean;
    /**
    *
    *
    *
    * @memberof NinjaSceneryThrower.prototype
    * @method pickUp
    * @param obj
    * @param imageWidthAdjust
    * @param imageHeightAdjust
    * @returns {Boolean}
    */
    pickUp(obj: any, imageWidthAdjust: any, imageHeightAdjust: any): boolean;
    /**
    *
    *
    *
    * @memberof NinjaSceneryThrower.prototype
    * @method _throwHolding
    *
    */
    _throwHolding(): void;
    /**
    *
    *
    *
    * @memberof NinjaSceneryThrower.prototype
    * @method _readyNextThrow
    *
    */
    _readyNextThrow(): void;
    /**
    *
    *
    *
    * @memberof NinjaSceneryThrower.prototype
    * @method valueFromHolding
    * @param holdin
    * @returns {Object}
    */
    valueFromHolding(holdin: any): any;
    /**
    *
    *
    *
    * @memberof NinjaSceneryThrower.prototype
    * @method rectFromHolding
    * @param holdin
    * @returns {Rectangle}
    */
    rectFromHolding(holdin: any): Rectangle;
    /**
    *
    *
    *
    * @memberof NinjaSceneryThrower.prototype
    * @method throwSceneryObject
    * @param w
    * @param h
    * @param jumps
    * @returns {SceneryObject}
    */
    throwSceneryObject(w: any, h: any, jumps: any): SceneryObject;
    /**
    *
    *
    *
    * @memberof NinjaSceneryThrower.prototype
    * @method throwSceneryObjectTraveler
    * @param w
    * @param h
    * @param jumps
    * @returns {SceneryObjectTraveler}
    */
    throwSceneryObjectTraveler(w: any, h: any, jumps: any): SceneryObjectTraveler;
}
//# sourceMappingURL=NinjaSceneryThrower.d.ts.map