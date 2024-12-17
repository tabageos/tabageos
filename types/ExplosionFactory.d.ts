/**
*
*@class ExplosionFactory
*
*  @classdesc
*   Controlls the display of explosions (quick animations) onto a given CanvasObject.
*
*
*
* @param eWidth {Number} The default explosion width.
* @param eHeight {Number} The defauly explosion height.
* @param countStop {Number} The default explosion frame amount.
* @param spriteSheetX {Number} The default x position in the sprite sheet to draw from.
* @param spriteSheetY  {Number} The default y position in the sprit sheet to draw from.
* @param [poolAmount=51] {Number} The amount of explosions to pool. Default is 51.
*
*/
declare function ExplosionFactory(eWidth: number, eHeight: number, countStop: number, spriteSheetX: number, spriteSheetY: number, poolAmount?: number): void;
declare class ExplosionFactory {
    /**
    *
    *@class ExplosionFactory
    *
    *  @classdesc
    *   Controlls the display of explosions (quick animations) onto a given CanvasObject.
    *
    *
    *
    * @param eWidth {Number} The default explosion width.
    * @param eHeight {Number} The defauly explosion height.
    * @param countStop {Number} The default explosion frame amount.
    * @param spriteSheetX {Number} The default x position in the sprite sheet to draw from.
    * @param spriteSheetY  {Number} The default y position in the sprit sheet to draw from.
    * @param [poolAmount=51] {Number} The amount of explosions to pool. Default is 51.
    *
    */
    constructor(eWidth: number, eHeight: number, countStop: number, spriteSheetX: number, spriteSheetY: number, poolAmount?: number);
    explosionRect: Rectangle;
    explosionPoint: MoverPoint;
    explosions: any[];
    explosionHold: any[];
    eWidth: number;
    eHeight: number;
    sFromX: number;
    sFromY: number;
    countStop: number;
    private readyExplosions;
    /**
    *   Add an explosion to be displayed.
    *    ex and ey must be defined, the other values will default to what was set during construction.
    *
    *   call displayExplosions to display each added explosion.
    *
    * @memberof ExplosionFactory.prototype
    * @method addExplosion
    * @param ex {Number} The x location to display the explosion
    * @param ey {Number} The y location to display the explosion.
    * @param ecount {Number} the frame to start from, when it reaches countStop (defined during construction) the animation stops. Default is 1.
    * @param fromX {Number} the x location to draw from the sprite sheet, will default to what was defined during construction.
    * @param fromY {Number} the y location to draw from the sprite sheet, will default to what was defined during construction.
    * @param width {Number} the width of the animation
    * @param height {Number} the height of the animation.
    * @param throttle {Number} Speed of the animation, default is 1.
    *
    */
    addExplosion(ex: number, ey: number, ecount: number, fromX: number, fromY: number, width: number, height: number, throttle: number): void;
    /**
    *
    *    Displays the addeded explosions onto the CanvasObject given, using the image source given.
    *   This method should be called during a loop.
    *
    * @memberof ExplosionFactory.prototype
    * @method displayExplosions
    * @param canvasObject {CanvasObject} The CanvasObject to draw to.
    * @param source {Image} The sprite sheet to draw from, an image.
    *
    */
    displayExplosions(canvasObject: CanvasObject, source: new (width?: number, height?: number) => HTMLImageElement): void;
}
//# sourceMappingURL=ExplosionFactory.d.ts.map