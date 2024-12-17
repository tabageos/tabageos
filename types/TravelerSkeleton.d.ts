/**
*
*@class TravelerSkeleton
*  @classdesc
*    A Class that uses MoverPoints to move based on a given velocity.
*	 All other 'Traveler' Classes extend this class or use this class.
* 	This 'skeleton' class does not implement any actual movement,
* 	it holds all the methods that manipulate points.
*
*
* @param x {Number} The initial x position of the TravelerSkeleton.
* @param y {Number} The initial y position of the TravelerSkeleton.
* @param width {Number} the width of the TravelerSkeleton
* @param height  {Number} the height of the TravelerSkeleton
*
*/
declare function TravelerSkeleton(x: number, y: number, width: number, height: number): void;
declare class TravelerSkeleton {
    /**
    *
    *@class TravelerSkeleton
    *  @classdesc
    *    A Class that uses MoverPoints to move based on a given velocity.
    *	 All other 'Traveler' Classes extend this class or use this class.
    * 	This 'skeleton' class does not implement any actual movement,
    * 	it holds all the methods that manipulate points.
    *
    *
    * @param x {Number} The initial x position of the TravelerSkeleton.
    * @param y {Number} The initial y position of the TravelerSkeleton.
    * @param width {Number} the width of the TravelerSkeleton
    * @param height  {Number} the height of the TravelerSkeleton
    *
    */
    constructor(x: number, y: number, width: number, height: number);
    forceApplier: MoverPoint;
    forceHolder: MoverPoint;
    _w: number;
    _h: number;
    wanderOffset: MoverPoint;
    blankMO: MoverPoint;
    _veloc: MoverPoint;
    _eventDispatcher: EventDispatcher;
    width: number;
    height: number;
    _middlePoint: MoverPoint;
    _pos: MoverPoint;
    _lastVeloc: MoverPoint;
    _lastPos: MoverPoint;
    x: number;
    y: number;
    dX: number;
    dY: number;
    _rect: Rectangle;
    spreadDistance: number;
    circleDistance: number;
    separationDistance: number;
    bypassAvoidDistance: boolean;
    maxForce: number;
    followDistance: number;
    easeProximity: number;
    wanderProximity: number;
    wanderAngle: number;
    wanderRadius: number;
    wanderRange: number;
    avoidSpace: number;
    avoidee: MoverSkeleton;
    avoidDistance: number;
    visionDistance: number;
    personalSpace: number;
    mass: number;
    maxSpeed: number;
    flockCount: any;
    bird: any;
    _pathIndex: number;
    _hp: MoverPoint;
    _vp: MoverPoint;
    _pathEvent: Event;
    listenerStrings: any;
    listenerMethods: any;
    /**
    *
    *
    *    @type Array
    * @memberof TravelerSkeleton
    *
    */
    path: any[];
    /**
    *
    *    Returns the height of the TravelerSkeleton
    *
    * @memberof TravelerSkeleton.prototype
    * @method getHeight
    * @returns {Number}
    *
    */
    getHeight(): number;
    /**
    *
    *    Returns the vertical direction the TravelerSkeleton is moving typically 0 1 or -1.
    *
    * @memberof TravelerSkeleton.prototype
    * @method getVerticalDirection
    * @returns {Number}
    */
    getVerticalDirection(): number;
    /**
    *
    *    Returns the horizontal direction the TravelerSkeleton is moving typically 0 1 or -1.
    *
    * @memberof TravelerSkeleton.prototype
    * @method getHorizontalDirection
    * @returns {Number}
    */
    getHorizontalDirection(): number;
    /**
    *
    *    Returns the width of the TravelerSkeleton
    *
    * @memberof TravelerSkeleton.prototype
    * @method getWidth
    * @returns {Number}
    */
    getWidth(): number;
    /**
    *
    *    Returns the MoverPoint position of the TravelerSkeleton
    *
    * @memberof TravelerSkeleton.prototype
    * @method getPosition
    * @returns {MoverPoint}
    */
    getPosition(): MoverPoint;
    /**
    *
    *    Sets the MoverPoint position of the TravelerSkeleton
    *
    * @memberof TravelerSkeleton.prototype
    * @method setPosition
    * @param toThis {MoverPoint}
    *
    */
    setPosition(toThis: MoverPoint): void;
    /**
    *
    *  Returns the current velocity (._veloc) MoverPoint
    *
    * @memberof TravelerSkeleton.prototype
    * @method getVelocity
    * @returns {MoverPoint}
    */
    getVelocity(): MoverPoint;
    /**
    *
    *    Sets the current velocity MoverPoint
    *
    * @memberof TravelerSkeleton.prototype
    * @method setVelocity
    * @param toThis {MoverPoint}
    *
    */
    setVelocity(toThis: MoverPoint): void;
    /**
    *
    *    Returns the x position of the TravelerSkeleton
    *
    * @memberof TravelerSkeleton.prototype
    * @method getX
    * @returns {Number}
    */
    getX(): number;
    /**
    *
    *    Sets the x position of the TravelerSkeleton
    *
    * @memberof TravelerSkeleton.prototype
    * @method setX
    * @param toThis {Number} the number to set the x position to.
    * @param notDX {Number} if present, the direction values of the TravelerSkeleton will not be updated.
    *
    */
    setX(toThis: number, notDX: number): void;
    /**
    *   Returns the y position of the TravelerSkeleton
    *
    *
    * @memberof TravelerSkeleton.prototype
    * @method getY
    * @returns {Number}
    */
    getY(): number;
    /**
    *
    *    Sets the y position of the TravelerSkeleton
    *
    * @memberof TravelerSkeleton.prototype
    * @method setY
    * @param toThis {Number}
    * @param notDY {Number} if present the y direction value will not be updated.
    *
    */
    setY(toThis: number, notDY: number): void;
    /**
    *
    *    Returns the middle position MoverPoint of the TravelerSkeleton
    *
    * @memberof TravelerSkeleton.prototype
    * @method getMiddle
    * @returns {MoverPoint}
    */
    getMiddle(): MoverPoint;
    /**
    *   Returns the rectangle bounds of the TravelerSkeleton
    *
    *
    * @memberof TravelerSkeleton.prototype
    * @method getRectangle
    * @param wOffset {Number} offset the width result by this amount
    * @param hOffset {Number} offset the height result by this amount
    * @returns {Rectangle}
    */
    getRectangle(wOffset: number, hOffset: number): Rectangle;
    /**
    *
    *    Updates _lastPos _lastVeloc _unGrounded _npRight _npLeft and _unCeiling
    *    Gets overriden in other classes to do other additional things.
    *
    * @memberof TravelerSkeleton.prototype
    * @method update
    *
    */
    update(): void;
    _unGrounded: number;
    _npRight: number;
    _npLeft: number;
    _unCeiling: number;
    /**
    *
    *    Returns maxForce * maxForce;
    *
    * @memberof TravelerSkeleton.prototype
    * @method getMaxForceSquared
    * @returns {Number}
    */
    getMaxForceSquared(): number;
    /**
    *
    *    Returns the _pathIndex
    *
    * @memberof TravelerSkeleton.prototype
    * @method getPathIndex
    * @returns {Number}
    */
    getPathIndex(): number;
    /**
    *
    *    Sets the pathIndex
    *
    * @memberof TravelerSkeleton.prototype
    * @method setPathIndex
    * @param toThis {Number}
    *
    */
    setPathIndex(toThis: number): void;
    /**
    *
    *    Separate from the other TravelerSkeletons in the withThese Array.
    *
    * @memberof TravelerSkeleton.prototype
    * @method separate
    * @param withThese {Array} an Array of TravelerSkeletons to separate from.
    * @param separatePriority {Number} A higher number will produce more separation.
    *
    */
    separate(withThese: any[], separatePriority: number): void;
    /**
    *
    *    Separate from the Mover given.
    *
    * @memberof TravelerSkeleton.prototype
    * @method separateFromThis
    * @param mover {Mover|Traveler}
    *
    */
    separateFromThis(mover: Mover | Traveler): void;
    /**
    *
    *    Returns the force needed to steer towards the target given.
    *	 Uses maxForce and maxSpeed.
    *
    * @memberof TravelerSkeleton.prototype
    * @method getSteerForce
    * @param target {Mover|Traveler}
    * @param ease {Boolean} If present ease the steer, otherwise just directly steer
    * @param easeDistance {Number} the amount of distance before easing should happen.
    * @returns {MoverPoint}
    */
    getSteerForce(target: Mover | Traveler, ease: boolean, easeDistance: number): MoverPoint;
    /**
    *
    *    Flee the given MoverPoint
    *
    * @memberof TravelerSkeleton.prototype
    * @method flee
    * @param mp {MoverPoint} the MoverPoint to flee
    *
    */
    flee(mp: MoverPoint): void;
    /**
    *   Ease to the given MoverPoint.
    *    Uses easeProximity.
    *
    * @memberof TravelerSkeleton.prototype
    * @method easeTo
    * @param mp {MoverPoint}
    *
    */
    easeTo(mp: MoverPoint): void;
    /**
    *
    *
    *
    * @memberof TravelerSkeleton.prototype
    * @method getSeparationForce
    * @param fromThese {Array}
    *
    */
    getSeparationForce(fromThese: any[]): void;
    /**
    *
    *    Returns true if the MoverPoint is within visionDistance at the current velocity
    *
    * @memberof TravelerSkeleton.prototype
    * @method canSeeThis
    * @param mp {MoverPoint}
    * @returns {Boolean}
    */
    canSeeThis(mp: MoverPoint): boolean;
    /**
    *
    *
    *
    * @memberof TravelerSkeleton.prototype
    * @method getAlignmentForce
    * @param withThese {Array}
    *
    */
    getAlignmentForce(withThese: any[]): void;
    /**
    *
    *    Returns true if almost close to the MoverPoint
    *
    * @memberof TravelerSkeleton.prototype
    * @method almostCloseTo
    * @param mp {MoverPoint}
    * @returns {Boolean}
    */
    almostCloseTo(mp: MoverPoint): boolean;
    /**
    *
    *
    *
    * @memberof TravelerSkeleton.prototype
    * @method getCohesionForce
    * @param withThese
    *
    */
    getCohesionForce(withThese: any): void;
    /**
    *
    *    Ease away from the MoverPoint given.
    *
    * @memberof TravelerSkeleton.prototype
    * @method easeAwayFrom
    * @param mp {MoverPoint}
    *
    */
    easeAwayFrom(mp: MoverPoint): void;
    /**
    *   Chase the target given.
    *
    *
    * @memberof TravelerSkeleton.prototype
    * @method chase
    * @param target {Mover|Traveler}
    *
    */
    chase(target: Mover | Traveler): void;
    /**
    *
    *    Returns the MoverPoint position that is out of the given radius of from.
    *	 Uses personalSpace.
    *	 This method is used internally by the hide method.
    *
    * @memberof TravelerSkeleton.prototype
    * @method getHideSpot
    * @param currentPosition {MoverPoint} the current MoverPoint position to calculate the hide spot from.
    * @param radius {Number} The radius to use during calculations.
    * @param from {Mover|Traveler} The Mover to hide from.
    * @returns {MoverPoint}
    */
    getHideSpot(currentPosition: MoverPoint, radius: number, from: Mover | Traveler): MoverPoint;
    /**
    *
    *    Hide behind the given Array of Movers, from the given Mover.
    *
    * @memberof TravelerSkeleton.prototype
    * @method hide
    * @param behindThese {Array} An Array of Movers/Travelers to hide behind.
    * @param from {Mover|Traveler} The Mover/Traveler to hide from.
    *
    */
    hide(behindThese: any[], from: Mover | Traveler): void;
    /**
    *
    *    Wander aimlessly.
    *
    * @memberof TravelerSkeleton.prototype
    * @method wander
    *
    */
    wander(): void;
    /**
    *
    *    Evade the given target
    *
    * @memberof TravelerSkeleton.prototype
    * @method evade
    * @param target {Mover|Traveler}
    *
    */
    evade(target: Mover | Traveler): void;
    /**
    *
    *    Avoid the given Mover
    *
    * @memberof TravelerSkeleton.prototype
    * @method avoid
    * @param moverSkeleton {MoverSkeleton}
    * @returns {Boolean}
    */
    avoid(moverSkeleton: MoverSkeleton): boolean;
    /**
    *
    *    Avoid the given Array of Movers.
    *
    * @memberof TravelerSkeleton.prototype
    * @method avoidThese
    * @param these {Array} An Array of the Movers to avoid.
    * @returns {Boolean}
    */
    avoidThese(these: any[]): boolean;
    /**
    *
    *    Seek the given MoverPoint position.
    *
    * @memberof TravelerSkeleton.prototype
    * @method seek
    * @param mp {MoverPoint} The MoverPoint to seek.
    *
    */
    seek(mp: MoverPoint): void;
    /**
    *
    *    Follow the path of given MoverPoints; easeTo each MoverPoint.
    *
    * @memberof TravelerSkeleton.prototype
    * @method followPath
    * @param path {Array} An Array of MoverPoints that make up the path.
    * @param loopPath {Boolean}
    *
    */
    followPath(path: any[], loopPath: boolean): void;
    /**
    *   Circle around the given MoverPoint position.
    *    Uses circleDistance
    *
    * @memberof TravelerSkeleton.prototype
    * @method circle
    * @param mp {MoverPoint} The MoverPoint to circle around.
    *
    */
    circle(mp: MoverPoint): void;
    /**
    *
    *
    *
    * @memberof TravelerSkeleton.prototype
    * @method addEventListener
    * @param type
    * @param listenerString
    * @param object
    *
    */
    addEventListener(type: any, listenerString: any, object: any): void;
    /**
    *
    *
    *
    * @memberof TravelerSkeleton.prototype
    * @method removeEventListener
    * @param type
    * @param listenerString
    * @param object
    *
    */
    removeEventListener(type: any, listenerString: any, object: any): boolean;
    /**
    *
    *
    *
    * @memberof TravelerSkeleton.prototype
    * @method dispatchEvent
    * @param event
    *
    */
    dispatchEvent(event: any): void;
    /**
    *
    *    separate, align, and cohesion together.
    *
    * @memberof TravelerSkeleton.prototype
    * @method flock
    * @param withThese {Array} Array of other Travelers
    * @param separatePriority {Number}
    * @param alignPriority {Number}
    * @param cohesionPriority {Number}
    *
    */
    flock(withThese: any[], separatePriority: number, alignPriority: number, cohesionPriority: number): void;
    /**
    *
    *
    *
    * @memberof TravelerSkeleton.prototype
    * @method align
    * @param withThese {Array} Array of other Travelers
    * @param priority {Number}
    *
    */
    align(withThese: any[], priority: number): void;
    /**
    *
    *
    *
    * @memberof TravelerSkeleton.prototype
    * @method cohesion
    * @param withThese {Array} Array of other Travelers
    * @param cohesionPriority {Number}
    *
    */
    cohesion(withThese: any[], cohesionPriority: number): void;
}
//# sourceMappingURL=TravelerSkeleton.d.ts.map