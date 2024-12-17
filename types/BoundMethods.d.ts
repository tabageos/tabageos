declare function BoundMethods(): void;
/**
*   All methods of this class are static.
*
* @class BoundMethods
* @classdesc
*
*   A class of static methods that would bound a mover to a rectangle in various ways.
*   This class is utilized by classes that have a _wallObject Rectangle that can be set,
*   and a boundMethod that can be set, which by default is set to one of these methods.
*
* @constructor
*
*/
declare function BoundMethods(): void;
declare class BoundMethods {
}
declare namespace BoundMethods {
    /**
    *
    *
    *  Bounds the mover to the boundObject
    * @memberof BoundMethods
    * @method boundTo
    * @param mover {Mover} a Mover or Object with x y width height properties
    * @param boundObejct {Rectangle}
    */
    function boundTo(mover: Mover, boundObject: any): void;
    /**
    *
    *
    *  Bounces the mover off of the boundObject
    * @memberof BoundMethods
    * @method bounceOff
    * @param mover {Mover} a Mover or Object with x y width height properties
    * @param boundObejct {Rectangle}
    *
    */
    function bounceOff(mover: Mover, boundObject: any): void;
    /**
    *
    *
    *  When the move reaches the end of the boundObject it wraps back to the start.
    * @memberof BoundMethods
    * @method wrapAround
    * @param mover {Mover} a Mover or Object with x y width height properties
    * @param boundObejct {Rectangle}
    *
    */
    function wrapAround(mover: Mover, boundObject: any): void;
}
//# sourceMappingURL=BoundMethods.d.ts.map