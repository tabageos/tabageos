declare function SimpleIsoCharacter(source: new (width?: number, height?: number) => HTMLImageElement, canvasObject: CanvasObject, fromRect: Rectangle, x: number, y: number, z: number, width: number, height: number, depth: number, scene: SimpleIsoScene, aWidth: number, aHeight: number): void;
/**
*
*  @classdesc
*    A SimpleIsoBox designated to be the main character in a scene.
*
*    See the isometric example here: https://www.tabageos.com/examples/isometricExample
*
* @class SimpleIsoCharacter
* @param source {Image}
* @param canvasObject {CanvasObject}
* @param fromRect {Rectangle}
* @param x {Number}
* @param y {Number}
* @param z {Number}
* @param width {Number}
* @param height {Number}
* @param depth {Number}
* @param scene {SimpleIsoScene}
* @param aWidth {Number} animation width
* @param aHeight  {Number} animation height
*
* @see SimpleIsoBox
*
*/
declare function SimpleIsoCharacter(source: new (width?: number, height?: number) => HTMLImageElement, canvasObject: CanvasObject, fromRect: Rectangle, x: number, y: number, z: number, width: number, height: number, depth: number, scene: SimpleIsoScene, aWidth: number, aHeight: number): void;
declare class SimpleIsoCharacter {
    constructor(source: new (width?: number, height?: number) => HTMLImageElement, canvasObject: CanvasObject, fromRect: Rectangle, x: number, y: number, z: number, width: number, height: number, depth: number, scene: SimpleIsoScene, aWidth: number, aHeight: number);
    /**
    *
    *  @classdesc
    *    A SimpleIsoBox designated to be the main character in a scene.
    *
    *    See the isometric example here: https://www.tabageos.com/examples/isometricExample
    *
    * @class SimpleIsoCharacter
    * @param source {Image}
    * @param canvasObject {CanvasObject}
    * @param fromRect {Rectangle}
    * @param x {Number}
    * @param y {Number}
    * @param z {Number}
    * @param width {Number}
    * @param height {Number}
    * @param depth {Number}
    * @param scene {SimpleIsoScene}
    * @param aWidth {Number} animation width
    * @param aHeight  {Number} animation height
    *
    * @see SimpleIsoBox
    *
    */
    constructor(source: new (width?: number, height?: number) => HTMLImageElement, canvasObject: CanvasObject, fromRect: Rectangle, x: number, y: number, z: number, width: number, height: number, depth: number, scene: SimpleIsoScene, aWidth: number, aHeight: number);
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
    scene: SimpleIsoScene;
    animation: SimpleIsoAnimation;
    traveler: Traveler;
    /**
    *
    *    changes animation.currentAnimation to directionFacing()
    *    and calls animate
    *
    * @memberof SimpleIsoCharacter.prototype
    * @method animateInScene
    * @param speed {Number} optional speed of animation
    *
    */
    animateInScene(speed: number): void;
    /**
    *
    *    use only 'north' 'south' 'east' or 'west' animations. No northeast northwest etc..
    *
    * @memberof SimpleIsoCharacter.prototype
    * @method animateNorthSouthEastWest
    * @param speed {Number} animation throttle
    *
        *
    */
    animateNorthSouthEastWest(speed: number): void;
    /**
    *
    *    Set the velocity to the same as its traveler, and potentially x and y.
    *
    * @memberof SimpleIsoCharacter.prototype
    * @method matchTraveler
    * @param all {Boolean} Match both x and y
    * @param sx {Boolean} Match just x
    * @param sy {Boolean} Match just y
    *
    */
    matchTraveler(all: boolean, sx: boolean, sy: boolean): void;
    /**
    *
    *    Set the velocity of the traveler to this, and if all is true also x and y and _pos.
    *
    * @memberof SimpleIsoCharacter.prototype
    * @method travelerMatchThis
    * @param all {Boolean} if true will update x and y and _pos also.
    *
    */
    travelerMatchThis(all: boolean): void;
}
//# sourceMappingURL=SimpleIsoCharacter.d.ts.map