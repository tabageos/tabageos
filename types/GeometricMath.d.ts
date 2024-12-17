declare function GeometricMath(): void;
/**
*
* @class GeometricMath
*
*@classdesc
*  A Class of static methods used for various geometry calculations and basic collision detection.
*  Also contains some Array helper methods; splice and mergeArrays.
*
*
*
*
*
*/
declare function GeometricMath(): void;
declare class GeometricMath {
}
declare namespace GeometricMath {
    /**
    *
    *
    * Returns the MoverPoint on the arc curve that is defined by the x/y pairs given.
    * The MoverPoint returned is in relation to t (0 to .9) on the curve.
    * This method creates and returns a new MoverPoint, to avoid that instead use updateArcCurvePath with a premade MoverPoint.
    *
    * @memberof GeometricMath
    * @param t {Number} translation on the path from which to get the one point; 0 to .9.
    * @param p0x {Number} x position of first point in curve path
    * @param p0y {Number} y position of first point in curve path
    * @param p1x {Number} x position of middle point in curve path
    * @param p1y {Number} y position of middle point in curve path
    * @param p2x {Number} x position of last point in curve path
    * @param p2y {Number} y position of last point in curve path
    * @returns {MoverPoint}
    */
    function arcCurvePoint(t: number, p0x: number, p0y: number, p1x: number, p1y: number, p2x: number, p2y: number): MoverPoint;
    /**
    *
    *
    * Updates the given MoverPoint on the arc curve defined by the x/y pairs given.
    * The update is based on t, which is a 0 to .9 value, the amount of points the path has being 1.
    * The path is defined by p0x...p2y.
    *
    *  Same as the arcCurvePoint method except that you pass in a pre made MoverPoint that gets updated.
    *
    * @param point {MoverPoint} The MoverPoint to store the point on the path.
    * @param t {Number} translation on the path from which to get the one point; 0 to .9.
    * @param p0x {Number} x position of first point in curve path
    * @param p0y {Number} y position of first point in curve path
    * @param p1x {Number} x position of middle point in curve path
    * @param p1y {Number} y position of middle point in curve path
    * @param p2x {Number} x position of last point in curve path
    * @param p2y {Number} y position of last point in curve path
    * @memberof GeometricMath
    *
    *
    */
    function updateArcCurvePoint(point: MoverPoint, t: number, p0x: number, p0y: number, p1x: number, p1y: number, p2x: number, p2y: number): void;
    /**
    *
    * Returns an Array of MoverPoints that make up the arc defined by the points given.
    *  p0 is the first leftmost point of the arc, p1 is the middle of the arc, and p2 is the end of the arc.
    *
    *
    * @memberof GeometricMath
    * @param p0 {MoverPoint} the first MoverPoint of the arc path
    * @param p1 {MoverPoint} the middle MoverPoint of the arc path
    * @param p2 {MoverPoint} the last MoverPoint of the arc path
    * @param amountOfPathPoints {Number} the number of points along the path to return.
    * @returns {Array}
    */
    function getArcCurvePath(p0: MoverPoint, p1: MoverPoint, p2: MoverPoint, amountOfPathPoints: number): any[];
    /**
    *
    * Updates the Array path given with the MoverPoints that make up the arc defined by the points given.
    * A path should first be made using the GeometricMath.getArcCurvePath method.
    *
    * @memberof GeometricMath
    * @param path {Array} an Array of MoverPoints to update
    * @param p0 {MoverPoint} the first point in the arc curve path
    * @param p1 {MoverPoint} the middle point in the arc curve path
    * @param p2 {MoverPoint} the last point in the arc curve path
    */
    function updateArcCurvePath(path: any[], p0: MoverPoint, p1: MoverPoint, p2: MoverPoint): void;
    /**
    *
    * Returns an Array of x and y pairs that make up the locations of each point along the path defined by the x/y pairs given.
    * This is the most efficient method to use to obtain a arc curve path, then loop through the array by 2 to use each x y location.
    *
    * @param p0x {Number} the x position of the first point.
    * @param p0y {Number} the y position of the first point.
    * @param p1x {Number} the x position of the middle point.
    * @param p1y {Number} the y position of the middle point.
    * @param p2x {Number} the x position of the last point.
    * @param p2y {Number} the y position of the last point.
    * @param amountOfPathPoints {Number} the amount of points to calculate.
    * @param prePath {Array} a predefined Array to hold the path.
    * @memberof GeometricMath
    * @returns {Array | Number}
    *
    */
    function getRawArcCurvePath(p0x: number, p0y: number, p1x: number, p1y: number, p2x: number, p2y: number, amountOfPathPoints: number, prePath: any[]): number | any[];
    /**
    *
    *
    *
    *
    * Returns the point on the hermite (wave) curve as defined by t and the x/y pairs given.
    * Creates and returns a new MoverPoint.
    *
    *
    * @memberof GeometricMath
    * @param t {Number}
    * @param p0x {Number} the x position of the first point.
    * @param p0y {Number} the y position of the first point.
    * @param t0x {Number} the x position of the middle point.
    * @param t0y {Number} the y position of the middle point.
    * @param p1x {Number} the x position of the last point.
    * @param p1y {Number} the y position of the last point.
    * @param t1x {Number} the x position of the middle point.
    * @param t1y {Number} the y position of the middle point.
    *
    * @returns {MoverPoint}
    *
    *
    *
    */
    function hermiteCurvePoint(t: number, p0x: number, p0y: number, t0x: number, t0y: number, p1x: number, p1y: number, t1x: number, t1y: number): MoverPoint;
    /**
    *
    *
    *
    *
    *  Returns an Array of MoverPoints that make up the hermite (wave) path as defined by the points given.
    *
    *
    *
    *
    * @memberof GeometricMath
    * @returns {Array}
    *
    *
    */
    function getHermiteCurvePath(p0: any, t0: any, p1: any, t1: any, amountOfPathPoints: any): any[];
    /**
    *
    *
    *
    *  Returns or updates an Array of x/y pairs that make up the hermite (wave) path as defined by the x/y pairs given.
    *
    *
    *
    *
    *  @memberof GeometricMath
    * @returns {Array | Number}
    *
    *
    *
    */
    function getRawHermiteCurvePath(p0x: any, p0y: any, t0x: any, t0y: any, p1x: any, p1y: any, t1x: any, t1y: any, amountOfPathPoints: any, prePath: any): number | any[];
    /**
    *
    *
    *
    *
    *
    * Returns true if the two lines intersect.
    *
    * @memberof GeometricMath
    *
    * @param a beginning point of line one
    * @param b ending point of line one
    * @param c beginning point of line two
    * @param d ending point of line two
    * @returns {Boolean}
    */
    function lineIntersectionTest(a: any, b: any, c: any, d: any): boolean;
    /**
    *
    *
    *
    *
    *
    *
    * Returns the point at which the lines interset or null.
    *
    *
    * @memberof GeometricMath
    * @param a beginning point of line one
    * @param b ending point of line one
    * @param c beginning point of line two
    * @param d ending point of line two
    * @returns {MoverPoint}
    *
    */
    function lineIntersectionPoint(a: any, b: any, c: any, d: any): MoverPoint;
    /**
    *
    *
    *
    *
    *
    *
    * Returns true if the given point is inside the circle defined by circlePosition and circleRadius
    *
    *
    *
    * @memberof GeometricMath
    * @param circlePosition {MoverPoint} the position of the circle (its center)
    * @param circleRadius {Number} the radius of the circle
    * @param pointToTest {MoverPoint} the point to test and see if its inside the circles area.
    * @returns {Boolean}
    *
    */
    function testForPointInCircle(circlePosition: MoverPoint, circleRadius: number, pointToTest: MoverPoint): boolean;
    /**
    *
    *
    *
    *
    * Returns true if the given point is inside the area defined by left top right and bottom cords.
    *
    *
    *
    *
    * @memberof GeometricMath
    * @param p {MoverPoint} the point to check if its in the given area.
    * @param left {Number} the left (x) position of the area
    * @param right {Number} the right (x+width) position of the area
    * @param top {Number} the top (y) position of the area
    * @param bottom {Number} the bottom (y+height) position of the area
    * @returns {Boolean}
    *
    *
    */
    function testForPointInArea(p: MoverPoint, left: number, top: number, right: number, bottom: number): boolean;
    /**
    *
    *
    *
    *
    *
    *
    *
    *
    * Returns an Array of MoverPoints that make up a circle as defined by circleCenter, and circleRadius
    *
    *
    * @memberof GeometricMath
    * @param circleCenter {MoverPoint} the center point of the circle
    * @param circleRadius {Number} the radius of the circle
    * @param numberOfPoints {Number} the amount of points to get
    * @returns {Array}
    */
    function getMoverPointsOnCircle(circleCenter: MoverPoint, circleRadius: number, numberOfPoints: number): any[];
    /**
    *
    *
    *
    *
    *
    *
    * Returns an Array of the x/y pairs that define each point along the circle defined by circleCenterX/Y circleRaidus and numberOfPoints.
    *
    *  @memberof GeometricMath
    * @param circleCenterX {Number} the x position of the circles center
    * @param circleCenterY {Number} the y position of the circles center
    * @param circleRadius {Number} the radious of the circle
    * @param numberOfPoints {Number} the amount of points to get
    * @returns {Array}
    *
    *
    *
    */
    function getRawPointsOnCircle(circleCenterX: number, circleCenterY: number, circleRadius: number, numberOfPoints: number): any[];
    /**
    *
    *
    *
    *
    *
    *
    * Merges two or more Arrays into a1 and returns a1.
    *
    * @memberof GeometricMath
    * @param a1 {Array} The Array that should get the other Arrays values added to it at the end
    * @param a2 {Array} The first Array whos values will get added to the end of a1, any other Arrays passed will keep getting added to the end.
    * @returns {Array} One Array containing the values of all the Arrays given.
    *
    *
    *
    */
    function mergeArrays(a1: any[], a2: any[]): any[];
    /**
    *
    *
    *
    *
    *
    *
    *
    *
    *  Splices the given Array at the given index, without returning anything.
    *
    *
    * @memberof GeometricMath
    * @param arr {Array} The Array to splice
    * @param index {Number} The index at which to splice the Array.
    *
    */
    function splice(arr: any[], index: number): void;
    /**
    *
    *
    *
    *
    *
    * Returns true if the two given Rectangles intersect.
    *
    * @memberof GeometricMath
    * @param r1 {Rectangle}
    * @param r2 {Rectangle}
    * @returns {Boolean}
    *
    *
    *
    *
    */
    function rectanglesIntersect(r1: Rectangle, r2: Rectangle): boolean;
    namespace _efRect {
        let top: number;
        let bottom: number;
        let left: number;
        let right: number;
        let si: number;
    }
    /**
    *
    *
    *
    *
    *
    *  Returns the amount of overlap between two Rectangles, if any.
    *
    *
    * @memberof GeometricMath
    * @param r1 {Rectangle}
    * @param r2 {Rectangle}
    * @returns {Number}
    *
    *
    *
    */
    function rectanglesOverlapAmount(r1: Rectangle, r2: Rectangle): number;
    /**
    *
    *
    *
    *
    *
    * Returns true if the number given is a power of 2.
    *
    * @memberof GeometricMath
    * @param x {Number} The Number to check.
    * @returns {Boolean}
    *
    *
    *
    *
    */
    function isPowerOfTwo(x: number): boolean;
    /**
        *
        *
        *
        *
        *
        * Returns an array of MoverPoints that make up a path of tiles in the given patt with the given value
        *
        * @memberof GeometricMath
        * @param thisTile {Number|Array} The value of the tile to make a path out of
        * @param patt {Array} 2D Array of values that thisTile is in
    `	* @param tileWidth {Number} width of each tile
        * @param tileHeight {Number} height of each tile
        * @param [leftToRight] {Boolean}
        * @returns {Array}
        *
        *
        *
        *
        */
    function getPathOfTile(thisTile: number | any[], patt: any[], tileWidth: any, tileHeight: number, leftToRight?: boolean): any[];
    /**
    *
    *
    *
    *
    *
    * Returns an array of index arrays [x,y] denoting a random path.
    *
    * @memberof GeometricMath
    * @param cols {Number} The amount of columns
    * @param rows {Number} The amount of rows
`	* @param sx {Number} starting x index
    * @param ex {Number} ending x index
    * @returns {Array}
    *
    *
    *
    *
    */
    function createRandomIndexPath(cols: number, rows: number, sx: any, ex: number): any[];
    /**
*
*
*
*
*
* Applies the tile value given into the map given at the index locations denoted by the index path
*
* @memberof GeometricMath
* @param indexPath {Array} Array of [x,y] index values
* @param map {Array} 2D Array to apply value change to based on the index path given
`	* @param tile {Number|Array} The value to apply at each index
*
*
*
*
*
*/
    function applyIndexPathToMap(indexPath: any[], map: any[], tile: any): void;
    /**
*
*
*
*
*
* Creates a random enclosed path of the tile value given in the map given.
*
*
* @memberof GeometricMath
* @param cols {Number} The amount of columns
* @param rows {Number} The amount of rows
`	* @param offsx {Number} offset the starting x index
* @param offex {Number} offset the ending x index
* @param map {Array} The 2D Array to creat a random path in
* @param tile {Number|Array} the value that each tile in the path should be
* @param rowOffset {Number} offset each row
*
*
*
*/
    function createRandomEnclosedPathOfTileInMap(cols: number, rows: number, offsx: any, offex: number, map: any[], tile: number | any[], rowOffset: number): void;
}
//# sourceMappingURL=GeometricMath.d.ts.map