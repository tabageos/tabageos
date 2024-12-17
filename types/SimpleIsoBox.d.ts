declare function SimpleIsoBox(x: number, y: number, z: number, width: number, height: number, depth: number): void;
/**
*
*   @classdesc
*   A MoverSkeleton designated for isometric movement.
*
*
*
* @class SimpleIsoBox
* @param x {Number}
* @param y {Number}
* @param z {Number}
* @param width {Number}
* @param height {Number}
* @param depth  {Number}  Default is same as height.
*
*/
declare function SimpleIsoBox(x: number, y: number, z: number, width: number, height: number, depth: number): void;
declare class SimpleIsoBox {
    constructor(x: number, y: number, z: number, width: number, height: number, depth: number);
    /**
    *
    *   @classdesc
    *   A MoverSkeleton designated for isometric movement.
    *
    *
    *
    * @class SimpleIsoBox
    * @param x {Number}
    * @param y {Number}
    * @param z {Number}
    * @param width {Number}
    * @param height {Number}
    * @param depth  {Number}  Default is same as height.
    *
    */
    constructor(x: number, y: number, z: number, width: number, height: number, depth: number);
    width: number;
    height: number;
    _middlePoint: MoverPoint;
    _pos: MoverPoint;
    _veloc: MoverPoint;
    _lastVeloc: MoverPoint;
    _lastPos: MoverPoint;
    x: number;
    y: number;
    _rect: Rectangle;
    z: number;
    dX: number;
    dY: number;
    face: number;
    depth: number;
    _passCalcs: {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        x3: number;
        y3: number;
    };
    _ddX: number;
    _ddY: number;
    moveLimits: any[];
    directions: {
        1: string;
        3: string;
        2: string;
        4: string;
        6: string;
        7: string;
        5: string;
        8: string;
    };
    /**
    *
    *
    *
    * @memberof SimpleIsoBox.prototype
    * @method directionFacing
    * @returns {String}
    */
    directionFacing(): string;
    /**
    *
    *
    *
    * @memberof SimpleIsoBox.prototype
    * @method getX
    * @returns {Number}
    */
    getX(): number;
    /**
    *
    *    Sets x position, and dX and face accordingly
    *
    * @memberof SimpleIsoBox.prototype
    * @method setX
    * @param toThis {Number}
    *
    */
    setX(toThis: number): void;
    /**
    *
    *
    *
    * @memberof SimpleIsoBox.prototype
    * @method getY
    * @returns {Number}
    */
    getY(): number;
    /**
    *
    *    Sets y position, and dY and face accordingly.
    *
    * @memberof SimpleIsoBox.prototype
    * @method setY
    * @param toThis {Number}
    *
    */
    setY(toThis: number): void;
    /**
    *
    *  Sets ._ddX and ._ddY
    *
    *
    *
    *
    *
    *
    * @memberof SimpleIsoBox.prototype
    * @method desiredDirection
    * @param left {Boolean}
    * @param right {Boolean}
    * @param up {Boolean}
    * @param down {Boolean}
    * @param [altCheck] {MoverSkeleton} you can pass in another MoverSkeleton to check,
    *    in that case ._ddX and ._ddY would denote its future direction.
    *    altCheck would be typically used with the .traveler of
    *    SimpleIsoCharacters that extend SimpleIsoBox.
    *
    */
    desiredDirection(left: boolean, right: boolean, up: boolean, down: boolean, altCheck?: MoverSkeleton): void;
    /**
    *  Unlike MapMovers.move method, for this method we do pass in
    *  the directions we want to go instead of the directions we are going.
    *  So we can just pass in whether or not the left button is pressed, etc.
    *
    *
    *
    *
    *
    * @memberof SimpleIsoBox.prototype
    * @method move
    * @param left {Boolean}
    * @param right {Boolean}
    * @param up {Boolean}
    * @param down {Boolean}
    * @param map {Array}
    * @param tw {Number}
    * @param th {Number}
    * @param npv  {Array} an Array containing the values that the box should collide with.
    * @param offd  {Number} offsetDivision for the canPassOnMap call, see canPassOnMap
    * @param offm  {Number} offsetMinus for the canPassOnMap call, see canPassOnMap
    *
    * @returns {Boolean} Returns true when movement happened
    */
    move(left: boolean, right: boolean, up: boolean, down: boolean, map: any[], tw: number, th: number, npv: any[], offd: number, offm: number): boolean;
    /**
    *  Used along with .setX and .setY or the .move function.
    *  If .x and .y are updated manually this method will not compute properly.
    *  .move encapsulates this method
    *  ._ddX denoting future x direction and ._ddY denoting future y direction
    *  are used by this method.
    *
    *  Manual use of this method would be;
    *  this.desiredDirection();
    *  if(this.canPassOnMap()) {   this.setX(); this.setY(); }
    *
    *  The .move method encapsulates all those calls.
    *
    *
    *
    *
    *
    * @memberof SimpleIsoBox.prototype
    * @method canPassOnMap
    * @param map {Array}
    * @param tw {Number}
    * @param th {Number}
    * @param noPassValues {Array} Array containing values the box should collide with
    * @param offsetDivision {Number} The number that tw and th are divided by to account for screen/iso offset
    *                        the default is 2, this number will cause the box to be closer or farther away from walls during collisions
    *                        this number has a lesser effect than offsetMinus and should be from 1 to tw.
    *  @param offsetMinus {Number} the total offset is subtracted by this number, use this to bring the box closer or farther away from collisions,
    *                     which means, when stopped, how close or far it is from the wall or object, default is 0,
    *                     a game that has all boxes and scenery the same size does not really need to mess with any of the offsets.
    *  Both offsetDivision and Minus can be set during .move calls as well.
    * .move fully encapsulates this method and all its params.
    * @returns {Number} 0 or 1
    */
    canPassOnMap(map: any[], tw: number, th: number, noPassValues: any[], offsetDivision: number, offsetMinus: number): number;
}
//# sourceMappingURL=SimpleIsoBox.d.ts.map