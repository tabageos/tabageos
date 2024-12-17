declare function MoverPoint(x: number, y: number): void;
/**
*
* @class MoverPoint
*  @classdesc
*    A basic Class representing a point/vector that will be used for movement.
*
*
* @param x {Number} The x position of the MoverPoint
* @param y {Number}  The y position of the MoverPoint
*
*/
declare function MoverPoint(x: number, y: number): void;
declare class MoverPoint {
    constructor(x: number, y: number);
    /**
    *
    * @class MoverPoint
    *  @classdesc
    *    A basic Class representing a point/vector that will be used for movement.
    *
    *
    * @param x {Number} The x position of the MoverPoint
    * @param y {Number}  The y position of the MoverPoint
    *
    */
    constructor(x: number, y: number);
    x: number;
    y: number;
    _length: number;
    _angle: number;
    /**
    *
    *
    *
    * @memberof MoverPoint.prototype
    * @method getSquaredLength
    * @returns {Number}
    */
    getSquaredLength(): number;
    /**
    *
    *    A MoverPoint perpendicular to this one.
    *
    * @memberof MoverPoint.prototype
    * @method perp
    * @returns {MoverPoint}
    */
    perp(): MoverPoint;
    /**
    *
    *
    *
    * @memberof MoverPoint.prototype
    * @method getX
    * @returns {Number}
    */
    getX(): number;
    /**
    *
    *
    *
    * @memberof MoverPoint.prototype
    * @method setX
    * @param toThis
    *
    */
    setX(toThis: any): void;
    /**
    *
    *
    *
    * @memberof MoverPoint.prototype
    * @method getY
    * @returns {Number}
    */
    getY(): number;
    /**
    *
    *
    *
    * @memberof MoverPoint.prototype
    * @method setY
    * @param toThis
    *
    */
    setY(toThis: any): void;
    /**
    *
    *    Sets ._angle to the atangent of y and x if it is not set, then returns _angle.
    *
    * @memberof MoverPoint.prototype
    * @method getAngle
    * @returns {Number}
    */
    getAngle(): number;
    /**
    *
    *    Sets _angle to the value given.
    *
    * @memberof MoverPoint.prototype
    * @method setAngle
    * @param toThis {Number}
    *
    */
    setAngle(toThis: number): void;
    /**
    *
    *    Returns the length of the MoverPoint.
    *
    * @memberof MoverPoint.prototype
    * @method getLength
    * @returns {Number}
    */
    getLength(): number;
    /**
    *
    *    Sets the length of the MoverPoint to the value given.
    *
    * @memberof MoverPoint.prototype
    * @method setLength
    * @param toThis {Number}
    *
    */
    setLength(toThis: number): void;
    /**
    *
    *    Divides x and y by length. Normalizes the point to a unit vector.
    *
    * @memberof MoverPoint.prototype
    * @method normalize
    * @returns {MoverPoint}
    */
    normalize(): MoverPoint;
    /**
    *
    *    Returns this MoverPoint with its values reversed.
    *
    * @memberof MoverPoint.prototype
    * @method reverse
    * @returns {MoverPoint}
    */
    reverse(): MoverPoint;
    /**
    *
    *
    *
    * @memberof MoverPoint.prototype
    * @method subtractBy
    * @param xAmount {Number}
    * @param yAmount {Number}
    * @param makeNew {Boolean} If true a new MoverPoint is returned, otherwise this is returned.
    * @returns {MoverPoint}
    */
    subtractBy(xAmount: number, yAmount: number, makeNew: boolean): MoverPoint;
    /**
    *
    *
    *
    * @memberof MoverPoint.prototype
    * @method truncate
    * @param max {Number}
    * @returns {MoverPoint}
    */
    truncate(max: number): MoverPoint;
    /**
    *
    *    Subtracts the values of mp from this MoverPoint and returns this or a new MoverPoint.
    *
    * @memberof MoverPoint.prototype
    * @method subtract
    * @param mp {MoverPoint}
    * @param makeNew {Boolean}
    * @returns {MoverPoint}
    */
    subtract(mp: MoverPoint, makeNew: boolean): MoverPoint;
    /**
    *
    *
    *
    * @memberof MoverPoint.prototype
    * @method add
    * @param mp {MoverPoint}
    * @param makeNew {Boolean}
    * @returns {MoverPoint}
    */
    add(mp: MoverPoint, makeNew: boolean): MoverPoint;
    /**
    *
    *
    *
    * @memberof MoverPoint.prototype
    * @method sign
    * @param mp {MoverPoint}
    * @returns {Number}
    */
    sign(mp: MoverPoint): number;
    /**
    *
    *
    *
    * @memberof MoverPoint.prototype
    * @method multiply
    * @param value
    * @param makeNew
    * @returns {MoverPoint}
    */
    multiply(value: any, makeNew: any): MoverPoint;
    /**
    *
    *
    *
    * @memberof MoverPoint.prototype
    * @method dotProduct
    * @param mp {moverPoint}
    * @returns {Number}
    */
    dotProduct(mp: moverPoint): number;
    /**
    *
    *
    *
    * @memberof MoverPoint.prototype
    * @method squaredDistance
    * @param mp {MoverPoint}
    * @returns {Number}
    */
    squaredDistance(mp: MoverPoint): number;
    /**
    *
    *    Returns true if the given MoverPoint has the same values as this.
    *
    * @memberof MoverPoint.prototype
    * @method equals
    * @param mp {MoverPoint}
    * @returns {Boolean}
    */
    equals(mp: MoverPoint): boolean;
    /**
    *
    *    Returns the distance between the given MoverPoint and this.
    *
    * @memberof MoverPoint.prototype
    * @method dist
    * @param mp {MoverPoint}
    * @returns {Number}
    */
    dist(mp: MoverPoint): number;
    /**
    *
    *    Returns a new MoverPoint that has the same values as this.
    *
    * @memberof MoverPoint.prototype
    * @method clone
    * @returns {MoverPoint}
    */
    clone(): MoverPoint;
    /**
    *   Uses a MoverPoint from a pool of premade MoverPoints.
    *
    *
    * @memberof MoverPoint.prototype
    * @method lesserClone
    * @returns {MoverPoint}
    */
    lesserClone(): MoverPoint;
    /**
    *
    *
    *
    * @memberof MoverPoint.prototype
    * @method addBy
    * @param xAmount {Number}
    * @param yAmount {Number}
    * @param makeNew {Boolean}
    * @returns {MoverPoint}
    */
    addBy(xAmount: number, yAmount: number, makeNew: boolean): MoverPoint;
    /**
    *
    *    Resets the values of the MoverPoint.
    *
    * @memberof MoverPoint.prototype
    * @method reset
    *
    */
    reset(): void;
    /**
    *
    *
    *
    * @memberof MoverPoint.prototype
    * @method divide
    * @param value {Number} The amount to divide x and y by.
    * @param makeNew {Boolean}
    * @returns {MoverPoint}
    */
    divide(value: number, makeNew: boolean): MoverPoint;
}
declare namespace MoverPoint {
    let _poolIndex: number;
    let pool: any[];
    function newMoverPoint(x: any, y: any): any;
    function _setInstance(instance: any, x: any, y: any, l: any, a: any): any;
    /**
    *
    *    Returns the angel between the two given MoverPoints
    *
    * @memberof MoverPoint
    * @static
    * @method angleBetweenMoverPoints
    * @param mp1 {MoverPoint}
    * @param mp2 {MoverPoint}
    * @returns {Number}
    */
    function angleBetweenMoverPoints(mp1: MoverPoint, mp2: MoverPoint): number;
    /**
    *
    *    Returns the squared distance between the two MoverPoints.
    *
    * @memberof MoverPoint
    * @method squaredDistanceBetween
    * @param mp1 {MoverPoint}
    * @param mp2 {MoverPoint}
    * @returns {Number}
    */
    function squaredDistanceBetween(mp1: MoverPoint, mp2: MoverPoint): number;
    /**
    *
    *    Returns the distance between the two points.
    *
    * @memberof MoverPoint
    * @method distBetween
    * @param mp1 {MoverPoint}
    * @param mp2 {MoverPoint}
    * @returns {Number}
    */
    function distBetween(mp1: MoverPoint, mp2: MoverPoint): number;
}
//# sourceMappingURL=MoverPoint.d.ts.map