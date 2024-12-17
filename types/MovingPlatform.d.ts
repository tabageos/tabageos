declare function MovingPlatform(direcX: any, direcY: any, x: any, y: any, width: any, height: any, map: any, ca: any, dontCloneMap: any, dt: any, tw: any, th: any, mr: any, mc: any): void;
/**
*
* @class MovingPlatform
*   @classdesc
*    A MapTraveler designated to be treated as a moving platform.
*
*
* @param direcX
* @param direcY
* @param x
* @param y
* @param width
* @param height
* @param map
* @param ca
* @param dontCloneMap
* @param dt
* @param tw
* @param th
* @param mr
* @param mc
*
*/
declare function MovingPlatform(direcX: any, direcY: any, x: any, y: any, width: any, height: any, map: any, ca: any, dontCloneMap: any, dt: any, tw: any, th: any, mr: any, mc: any): void;
declare class MovingPlatform {
    constructor(direcX: any, direcY: any, x: any, y: any, width: any, height: any, map: any, ca: any, dontCloneMap: any, dt: any, tw: any, th: any, mr: any, mc: any);
    /**
    *
    * @class MovingPlatform
    *   @classdesc
    *    A MapTraveler designated to be treated as a moving platform.
    *
    *
    * @param direcX
    * @param direcY
    * @param x
    * @param y
    * @param width
    * @param height
    * @param map
    * @param ca
    * @param dontCloneMap
    * @param dt
    * @param tw
    * @param th
    * @param mr
    * @param mc
    *
    */
    constructor(direcX: any, direcY: any, x: any, y: any, width: any, height: any, map: any, ca: any, dontCloneMap: any, dt: any, tw: any, th: any, mr: any, mc: any);
    width: any;
    height: any;
    _middlePoint: MoverPoint;
    _pos: MoverPoint;
    _veloc: MoverPoint;
    _lastVeloc: MoverPoint;
    _lastPos: MoverPoint;
    _deltaTime: any;
    _map: any;
    _rect: Rectangle;
    _state: number;
    forceApplier: MoverPoint;
    forceHolder: MoverPoint;
    _canvasAnimation: any;
    _w: any;
    _h: any;
    wanderOffset: MoverPoint;
    blankMO: MoverPoint;
    _eventDispatcher: EventDispatcher;
    x: any;
    y: any;
    _tw: any;
    _th: any;
    _checkHelper: MoverPoint;
    _inp: MoverPoint;
    _direcX: any;
    _direcY: any;
    _horizontal: boolean;
}
//# sourceMappingURL=MovingPlatform.d.ts.map