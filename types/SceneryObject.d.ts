declare function SceneryObject(x: number, y: number, width: number, height: number, map: any[], ca: CanvasAnimation, dontCloneMap: any, dt: number, tw: number, th: number, mr: number, mc: number): void;
/**
 *
 *    Constructs a new SceneryObject
 *
 * @class SceneryObject
 * @classdesc
 *
 *  A MapMover that is designated as a scenery object.
 *
 *
 * @param x {Number}
 * @param y {Number}
 * @param width {Number}
 * @param height {Number}
 * @param map {Array}
 * @param ca {CanvasAnimation}
 * @param dontCloneMap {Object}
 * @param dt {Number} Default is TimeKeeper._sae
 * @param tw {Number} tile height
 * @param th {Number} tile width
 * @param mr {Number} map rows
 * @param mc {Number} map columns
 *
 */
declare function SceneryObject(x: number, y: number, width: number, height: number, map: any[], ca: CanvasAnimation, dontCloneMap: any, dt: number, tw: number, th: number, mr: number, mc: number): void;
declare class SceneryObject {
    constructor(x: number, y: number, width: number, height: number, map: any[], ca: CanvasAnimation, dontCloneMap: any, dt: number, tw: number, th: number, mr: number, mc: number);
    /**
     *
     *    Constructs a new SceneryObject
     *
     * @class SceneryObject
     * @classdesc
     *
     *  A MapMover that is designated as a scenery object.
     *
     *
     * @param x {Number}
     * @param y {Number}
     * @param width {Number}
     * @param height {Number}
     * @param map {Array}
     * @param ca {CanvasAnimation}
     * @param dontCloneMap {Object}
     * @param dt {Number} Default is TimeKeeper._sae
     * @param tw {Number} tile height
     * @param th {Number} tile width
     * @param mr {Number} map rows
     * @param mc {Number} map columns
     *
     */
    constructor(x: number, y: number, width: number, height: number, map: any[], ca: CanvasAnimation, dontCloneMap: any, dt: number, tw: number, th: number, mr: number, mc: number);
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
    _tH: number;
    _tW: number;
    _canvasAnimation: CanvasAnimation;
    playerHoldingThis: any;
    tileValue: any;
    weight: number;
    xDirection: number;
    _solidSit: number;
    _eHit: number;
    tileRect: any;
    _checkHelper: MoverPoint;
}
//# sourceMappingURL=SceneryObject.d.ts.map