/**
*
*
* @class MoverSkeleton
*  @classdesc
*    A Class ready to utilize MoverPoints as velocity and thereby move.
*
*
* @param x {Number} The x position of the MoverSkeleton
* @param y {Number} The y position of the MoverSkeleton
* @param width {Number} The width of the MoverSkeleton
* @param height {Number} The height of the MoverSkeleton
*
*/
declare function MoverSkeleton(x: number, y: number, width: number, height: number): void;
declare class MoverSkeleton {
    /**
    *
    *
    * @class MoverSkeleton
    *  @classdesc
    *    A Class ready to utilize MoverPoints as velocity and thereby move.
    *
    *
    * @param x {Number} The x position of the MoverSkeleton
    * @param y {Number} The y position of the MoverSkeleton
    * @param width {Number} The width of the MoverSkeleton
    * @param height {Number} The height of the MoverSkeleton
    *
    */
    constructor(x: number, y: number, width: number, height: number);
    width: number;
    height: number;
    _middlePoint: MoverPoint;
    _pos: MoverPoint;
    _veloc: MoverPoint;
    _lastVeloc: MoverPoint;
    _lastPos: MoverPoint;
    x: any;
    y: any;
    maxSpeed: number;
    mass: number;
    dX: number;
    dY: number;
    _rect: Rectangle;
    /**
    *   Returns the height of the MoverSkeleton
    *
    *
    * @memberof MoverSkeleton.prototype
    * @method getHeight
    * @returns {Number}
    */
    getHeight(): number;
    /**
    *   Returns the vertical direction of the MoverSkeleton, 1,-1, or 0, if setY are being used.
    *
    *
    * @memberof MoverSkeleton.prototype
    * @method getVerticalDirection
    * @returns {Number}
    */
    getVerticalDirection(): number;
    /**
    *
    *    Returns the horizontal direction of the MoverSkeleton, 1, -1, 0, if setX is being used.
    *
    * @memberof MoverSkeleton.prototype
    * @method getHorizontalDirection
    * @returns {Number}
    */
    getHorizontalDirection(): number;
    /**
    *   Returns the width of the MoverSkeleton
    *
    *
    * @memberof MoverSkeleton.prototype
    * @method getWidth
    * @returns {Number}
    */
    getWidth(): number;
    /**
    *
    *    Returns the position MoverPoint of the MoverSkeleton
    *
    * @memberof MoverSkeleton.prototype
    * @method getPosition
    * @returns {MoverPoint}
    */
    getPosition(): MoverPoint;
    /**
    *
    *    Sets the position MoverPoint to the one given.
    * 	 Also updates x and y to the x and y of the MoverPoint given.
    *
    * @memberof MoverSkeleton.prototype
    * @method setPosition
    * @param toThis {MoverPoint} The MoverPoint to set the position to.
    *
    */
    setPosition(toThis: MoverPoint): void;
    /**
    *   Returns the velocity MoverPoint of this MoverSkeleton
    *
    *
    * @memberof MoverSkeleton.prototype
    * @method getVelocity
    * @returns {MoverPoint}
    */
    getVelocity(): MoverPoint;
    /**
    *
    *    Sets the velocity MoverPoint of this MoverSkeleton to the one given.
    *
    * @memberof MoverSkeleton.prototype
    * @method setVelocity
    * @param toThis {MoverPoint} The MoverPoint to set velocity to
    *
    */
    setVelocity(toThis: MoverPoint): void;
    /**
    *
    *    Returns the x position of the MoverSkeleton
    *
    * @memberof MoverSkeleton.prototype
    * @method getX
    * @returns {Number}
    */
    getX(): number;
    /**
    *
    *    Sets the x position of the MoverSkeleton,
    *    also updating .dX and _pos.x
    *
    *    These methods setX, setY, are used in the update method of MapMovers, and so MapMovers auto update dX and dY, but only MapMovers do such.
    *    In all other cases you would have to use setX and setY yourself if you wanted dX and dY to update, or you could update dX and dY yourself.
    *    In MapTravelers you have _lastPos and _lastVeloc that get updated which can be used to do the same things dX and dY would be used for.
    *
    * @memberof MoverSkeleton.prototype
    * @method setX
    * @param toThis {Number} The Number to set x to.
    * @param notDX {Boolean} If true will not set dX. The default behavior is to set .dX to 1,-1, or 0 based on what is given.
    *
    */
    setX(toThis: number, notDX: boolean): void;
    /**
    *
    *    Returns the y position of the MoverSkeleton
    *
    * @memberof MoverSkeleton.prototype
    * @method getY
    * @returns {Number}
    */
    getY(): number;
    /**
    *
    *    Sets the y value of the MoverSkeleton, and also updates _pos.y and .dY
    *
    * @memberof MoverSkeleton.prototype
    * @method setY
    * @param toThis {Number} The number to set y to.
    * @param notDY {Boolean} If true will not set direction y; this.dY. The default behavior is to update this.dY to 1,-1, or 0 when this method is used.
    *
    */
    setY(toThis: number, notDY: boolean): void;
    /**
    *   Returns the middle MoverPoint (_middlePoint) based on x/y width/height.
    *
    *
    * @memberof MoverSkeleton.prototype
    * @method getMiddle
    * @returns {MoverPoint}
    */
    getMiddle(): MoverPoint;
    /**
    *
    *    Returns the Rectangle bounds of the MoverSkeleton.
    *
    * @memberof MoverSkeleton.prototype
    * @method getRectangle
    * @param wOffset
    * @param hOffset
    * @returns {Rectangle}
    */
    getRectangle(wOffset: any, hOffset: any): Rectangle;
    /**
    *
    *    This method matches _lastPos to _pos, and _lastVeloc to _veloc
    * 	 If _veloc/_pos are changed after this method is called, _lastVeloc/_lastPos therefore would hold the previous values.
    *
    * 	 Classes that extend MoverSkeleton override this method adding in more functionality.
    *
    * @memberof MoverSkeleton.prototype
    * @method update
    *
    */
    update(): void;
}
//# sourceMappingURL=MoverSkeleton.d.ts.map