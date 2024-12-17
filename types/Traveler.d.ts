declare function Traveler(x: number, y: number, width: number, height: number, dt?: number): void;
/**
*
* @classdesc
*   A basic class able to utilize the TravelerSkeleton methods, extending TravelerSkeleton.
*   It has methods for movement, but only basic bounds collision handling.
*
*
* @class Traveler
* @param x {Number}
* @param y  {Number}
* @param width {Number}
* @param height {Number}
* @param [dt=.6666666667]  {Number} Delta time, default is tabageos.TimeKeeper._sae
*
* @see TravelerSkeleton
*
*/
declare function Traveler(x: number, y: number, width: number, height: number, dt?: number): void;
declare class Traveler {
    constructor(x: number, y: number, width: number, height: number, dt?: number);
    /**
    *
    * @classdesc
    *   A basic class able to utilize the TravelerSkeleton methods, extending TravelerSkeleton.
    *   It has methods for movement, but only basic bounds collision handling.
    *
    *
    * @class Traveler
    * @param x {Number}
    * @param y  {Number}
    * @param width {Number}
    * @param height {Number}
    * @param [dt=.6666666667]  {Number} Delta time, default is tabageos.TimeKeeper._sae
    *
    * @see TravelerSkeleton
    *
    */
    constructor(x: number, y: number, width: number, height: number, dt?: number);
    _deltaTime: number;
    /**
    *
    *    Like super. Called during construction.
    *
    * @memberof Traveler.prototype
    * @method init
    * @param x
    * @param y
    * @param width
    * @param height
    *
    */
    init(x: any, y: any, width: any, height: any): void;
    x: any;
    y: any;
    height: any;
    width: any;
    travelType: any;
    boundingMethod: Function;
    mass: number;
    avoidSpace: number;
    maxSpeed: number;
    maxForce: number;
    followDistance: number;
    easeProximity: number;
    wanderProximity: number;
    wanderAngle: number;
    wanderRadius: number;
    wanderRange: number;
    _wallObject: Rectangle;
    spreadDistance: number;
    circleDistance: number;
    separationDistance: number;
    /**
    *
    *    @private
    *
    * @memberof Traveler
    *
    */
    private bypassAvoidDistance;
    /**
    *
    *    A MoverPoint used to store and update the forces; mass, maxSpeed, maxForce, being applied to the Travelers velocity. (_veloc)
    *
    * @memberof Traveler
    *
    */
    forceApplier: any;
    /**
    *
    *    Used by the wander method
    *
    * @memberof Traveler
    *
    */
    wanderOffset: any;
    /**
    *
    *
    *
    * @memberof Traveler
    *
    */
    avoidDistance: number;
    /**
    *
    *
    *
    * @memberof Traveler
    *
    */
    visionDistance: number;
    /**
    *
    *
    *
    * @memberof Traveler
    *
    */
    personalSpace: number;
    /**
    *
    *   Optional holder for an EventDispatcher instance.
    *
    * @memberof Traveler
    *
    */
    _eventDispatcher: any;
    /**
    *
    *    A MoverPoint or MoverSkeleton that would be the target of travel for this Traveler.
    *
    * @memberof Traveler
    *
    */
    _destination: MoverPoint | MoverSkeleton;
    /**
    *
    *    Sets the _wallObject property
    *
    * @memberof Traveler.prototype
    * @method setWallObject
    * @param toThis {Rectangle}
    *
    */
    setWallObject(toThis: Rectangle): void;
    /**
    *   Returns the _destination property
    *
    *
    * @memberof Traveler.prototype
    * @method getDestination
    * @returns {MoverPoint|MoverSkeleton}
    */
    getDestination(): MoverPoint | MoverSkeleton;
    /**
    *
    *    Sets the _destination property.
    *
    * @memberof Traveler.prototype
    * @method setDestination
    * @param toThis {MoverPoint|MoverSkeleton}
    *
    */
    setDestination(toThis: MoverPoint | MoverSkeleton): void;
    /**
    *    Updates the position and velocity of the Traveler (changes _veloc _pos and x and y) using forceApplier, maxForce, mass, _deltaTime, and maxSpeed.
    *
    *    forceApplier is truncated by maxForce and divided by mass,
    * 	 then forceApplier is applied to _veloc.
    *	 _veloc is truncated by maxSpeed, and then _pos is updated based on _veloc.
    * 	 If a _wallObject is defined, the boundingMethod defined will be called,
    * 	 and then x and y are updated to match _pos.
    *
    * @memberof Traveler.prototype
    * @method move
    *
    */
    move(): void;
    /**
    *
    *    If a travelType function is defined,
    * 	 this method will call the travelType with the to param of this method or otherwise the _destination property of the instance,
    *    then move is called.
    *
    * 	The TravelerSkeleton methods update the forceApplier and the move method applies forceApplier to update the velocity and position of the Traveler.
    *
    * @memberof Traveler.prototype
    * @method travel
    * @param to {MoverPoint|MoverSkeleton} The MoverPoint or MoverSkeleton to travel to.
    *
    */
    travel(to: MoverPoint | MoverSkeleton): void;
}
//# sourceMappingURL=Traveler.d.ts.map