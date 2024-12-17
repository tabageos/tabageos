declare function SimpleIsoPoint(x: number, y: number, z: number, spacing: number): void;
/**
*
*
*
* @class SimpleIsoPoint
* @classdesc
*    A point with x y and z params. And methods for iso point conversion.
*
* @param x {Number}
* @param y {Number}
* @param z {Number}
* @param spacing  {Number} Default is 45
*
*/
declare function SimpleIsoPoint(x: number, y: number, z: number, spacing: number): void;
declare class SimpleIsoPoint {
    constructor(x: number, y: number, z: number, spacing: number);
    /**
    *
    *
    *
    * @class SimpleIsoPoint
    * @classdesc
    *    A point with x y and z params. And methods for iso point conversion.
    *
    * @param x {Number}
    * @param y {Number}
    * @param z {Number}
    * @param spacing  {Number} Default is 45
    *
    */
    constructor(x: number, y: number, z: number, spacing: number);
    x: number;
    y: number;
    z: number;
    spacing: number;
    /**
    *
    *    Converts a MoverPoint into a SimpleIsoPoint
    *
    *
    * @memberof SimpleIsoPoint.prototype
    * @method mpIntoIso
    * @param mp {MoverPoint} The MoverPoint to convert into the SimpleIsoPoint
    * @param isop {SimpleIsoPoint} The SimpleIsoPoint to use, if not given the instance will be used.
    *
    */
    mpIntoIso(mp: MoverPoint, isop: SimpleIsoPoint): void;
    /**
    *   Convert the SimpleIsoPoint into a existing MoverPoint.
    *   If you don't pass another SimpleIsoPoint, this instance will be used.
    *
    *
    * @memberof SimpleIsoPoint.prototype
    * @method isoIntoMp
    * @param mp {MoverPoint} The MoverPoint to convert the iso cords into.
    * @param isop {SimpleIsoPoint} The SimpleIsoPoint to convert into the MoverPoint, in not given the instance will be used.
    *
    */
    isoIntoMp(mp: MoverPoint, isop: SimpleIsoPoint): void;
}
declare namespace SimpleIsoPoint {
    /**
    *   Returns either the x or y iso point with spacing, given a 2d point.
    *
    *
    * @memberof SimpleIsoPoint.prototype
    * @method rawToIsoWithSpacing
    * @param x {Number}
    * @param y {Number}
    * @param returnX {Boolean}
    * @param returnY {Boolean}
    * @param spacing {Number}
    * @returns {Number}
    */
    function rawToIsoWithSpacing(x: number, y: number, returnX: boolean, returnY: boolean, spacing: number): number;
    /**
    *
    *    Returns either the x or y screen point with spacing, given a 2d point and z index.
    *
    * @memberof SimpleIsoPoint.prototype
    * @method rawToScreenWithSpacing
    * @param x {Number}
    * @param y {Number}
    * @param z {Number}
    * @param returnX {Boolean}
    * @param returnY {Boolean}
    * @param spacing {Number}
    * @returns {Number}
    */
    function rawToScreenWithSpacing(x: number, y: number, z: number, returnX: boolean, returnY: boolean, spacing: number): number;
    /**
    *
    *    Returns either the x or y screen point from a given 2d point.
    *
    *    Why only either x or y? To increase performance, in the cases where we only need the x or y, returning a whole Point Object would be wasteful.
    *     If we need both we just call the method twice, but only Numbers are ever returned.
    *
    * @memberof SimpleIsoPoint.prototype
    * @method rawToScreen
    * @param x {Number}
    * @param y {Number}
    * @param returnX {Boolean}
    * @param returnY {Boolean}
    * @returns {Number}
    */
    function rawToScreen(x: number, y: number, z: any, returnX: boolean, returnY: boolean): number;
    /**
    *
    *    Returns either the x or y iso point from a given 2d point.
    *
    * @memberof SimpleIsoPoint.prototype
    * @method rawToIso
    * @param x {Number}
    * @param y {Number}
    * @param returnX {Boolean}
    * @param returnY {Boolean}
    * @returns {Number}
    */
    function rawToIso(x: number, y: number, returnX: boolean, returnY: boolean): number;
}
//# sourceMappingURL=SimpleIsoPoint.d.ts.map