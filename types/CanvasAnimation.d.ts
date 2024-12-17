declare function CanvasAnimation(source: HTMLImg, canvasObject: CanvasObject, fromRect: Rectangle, x?: number, y?: number, width?: number, height?: number): void;
/**
*
* @class CanvasAnimation
* @classdesc
*    Controls the animation of an image onto a CanvasObject
*
*
* @param source {HTMLImg} The source image to draw from
* @param canvasObject {CanvasObject} The CanvasObject to draw to
* @param fromRect {Rectangle} The Rectangle that defines where on the source to draw from, if none is passed a Rectangle with 0,0, width, height is created.
* @param [x=0] {Number} The x position of the CanvasAnimation
* @param [y=0] {Number} The y position of the CanvasAnimation
* @param [width=0] {Number} The width of the CanvasAnimation
* @param [height=0]  {Number} The height of the CanvasAnimation
*
*
*/
declare function CanvasAnimation(source: HTMLImg, canvasObject: CanvasObject, fromRect: Rectangle, x?: number, y?: number, width?: number, height?: number): void;
declare class CanvasAnimation {
    constructor(source: HTMLImg, canvasObject: CanvasObject, fromRect: Rectangle, x?: number, y?: number, width?: number, height?: number);
    /**
    *
    * @class CanvasAnimation
    * @classdesc
    *    Controls the animation of an image onto a CanvasObject
    *
    *
    * @param source {HTMLImg} The source image to draw from
    * @param canvasObject {CanvasObject} The CanvasObject to draw to
    * @param fromRect {Rectangle} The Rectangle that defines where on the source to draw from, if none is passed a Rectangle with 0,0, width, height is created.
    * @param [x=0] {Number} The x position of the CanvasAnimation
    * @param [y=0] {Number} The y position of the CanvasAnimation
    * @param [width=0] {Number} The width of the CanvasAnimation
    * @param [height=0]  {Number} The height of the CanvasAnimation
    *
    *
    */
    constructor(source: HTMLImg, canvasObject: CanvasObject, fromRect: Rectangle, x?: number, y?: number, width?: number, height?: number);
    /**
    *
    *    Used as a super method for possible extension of this class.
    *
    * @memberof CanvasAnimation.prototype
    * @method init
    * @param source {HTMLImg} The source image to draw from
    * @param canvasObject {CanvasObject} The CanvasObject to draw to
    * @param fromRect {Rectangle} The Rectangle that defines where on the source to draw from
    * @param [x=0] {Number} The x position of the CanvasAnimation
    * @param [y=0] {Number} The y position of the CanvasAnimation
    * @param [width=0] width {Number} The width of the CanvasAnimation
    * @param [height=0] height  {Number} The height of the CanvasAnimation
    *
    */
    init(source: HTMLImg, canvasObject: CanvasObject, fromRect: Rectangle, x?: number, y?: number, width?: any, height?: any): void;
    _source: new (width?: number, height?: number) => HTMLImageElement;
    _canvas: CanvasObject;
    currentAnimation: string;
    ani: number;
    animationIndexOrder: any;
    animationSpecs: any;
    blitIndex: any;
    x: number;
    y: number;
    width: number;
    height: number;
    toPoint: MoverPoint;
    fromRect: Rectangle;
    fromXOffset: number;
    fromYOffset: number;
    fromWidthOffset: number;
    fromHeightOffset: number;
    lastAnim: string;
    _cpos: MoverPoint;
    _addedPos: MoverPoint;
    _inDelay: number;
    _throttRef: number;
    _cBB: number | true;
    onlyHorizontalAnimations: number;
    /**
    *
    * Used to define a new animation.
    *
    * @param animationName {String} The name of the animation being defined.
    * @param arrayOfXYIndexValues {Array} An Array of the x,y index values that define each frame of the animation.
    *                                       For example defineAnimation("left", [2,4,3,5,3,7,2,4,5,9]) would create a "left" animation.
    *                                       The array is read as x,y index pairs, with x being multipled by the CanvasAnimations width, and y by height to get the position in the source to draw from.
    *                                       To change the animation you set the currentAnimation property and then call the animate method.
    *                                       To display the animation you call the blit method.
    *
    *
    * @param [yIndex=0] {Number} Optional param for when onlyHorizontalAnimations has been set.
    *
    * @memberof CanvasAnimation.prototype
    * @method defineAnimation
    *
    *
    */
    defineAnimation(animationName: string, arrayOfXYIndexValues: any[], yIndex?: number): void;
    /**
    * Match x and y to the mover given.
    *
    * @memberof CanvasAnimation.prototype
    * @method matchPosition
    *
    * @param mover {MoverSkeleton} The mover to match positions with
    * @param [xoff=0] {Number} optional x offset
    * @param [yoff=0] {Number} optional y offset
    */
    matchPosition(mover: MoverSkeleton, xoff?: number, yoff?: number): void;
    /**
    *
    *    Returns a MoverPoint reference to the position of the CanvasAnimation.
    *
    * @memberof CanvasAnimation.prototype
    * @method getPosition
    * @param [addedX=0] {Number}  An optional amount to add to the x position
    * @param [addedY=0] {Number} An optional amount to add to the y position
    * @returns {MoverPoint}
    */
    getPosition(addedX?: number, addedY?: number): MoverPoint;
    /**
    *
    *    Basic change of animation based on left,right,up,down input.
    *    Changes the currentAnimation property to 'left' 'right' 'up' or 'down' based on params given.
    *
    * @memberof CanvasAnimation.prototype
    * @method changeLeftRightUpDownAnimation
    * @param left {Boolean}
    * @param right {Boolean}
    * @param up {Boolean}
    * @param down {Boolean}
    * @param [dontKeepAniIndex=false]  {Boolean} If set to true the lastAnim property would not be updated, otherwise, by default, lastAnim holds the last animation that was used before the currentAnimation.
    *
    */
    changeLeftRightUpDownAnimation(left: boolean, right: boolean, up: boolean, down: boolean, dontKeepAniIndex?: boolean): void;
    /**
    *
    *    Change the basic direction animation to face towards the given Object.
    *    If the given Object is above the CanvasAnimation it would change it to 'up'
    *    If the given Object is left of the CanvasAnimation it would change it to 'left'
    *
    * @memberof CanvasAnimation.prototype
    * @method changeFaceAnimation
    * @param toFace {MoverSkeleton} A MoverSkeleton or Object with x,y,width and height.
    * @param [keepAniIndex=false] {Boolean} If true lastAnim will be updated, by default this method does not update lastAnim.
    *
    */
    changeFaceAnimation(toFace: MoverSkeleton, keepAniIndex?: boolean): void;
    /**
    *
    *    Returns the direction string of the current animation. 'left' 'right' 'up' or 'down'.
    *
    * @memberof CanvasAnimation.prototype
    * @method getDirectionOfAnimation
    * @param currentAni {String} The currentAnimation or animation name you want to get the named direction from.
    * @param [onlyLeftRight=false] {Boolean}
    * @param [onlyUpDown=false] {Boolean}
    * @returns {String}
    */
    getDirectionOfAnimation(currentAni: string, onlyLeftRight?: boolean, onlyUpDown?: boolean): string;
    /**
    *   More advanced but still general changing of animation based on directions given.
    *    When all directions are false/0 'idle' will be applied to the animation.
    *    For example if the last animation was 'right' and then no input is given,
    *	this method would set the animation to 'idleright'.
    *
    *    This method will also compute 'upleft' 'upright' and so on for when two inputs are given.
    *
    *  Other classes such as the BasicNinja Class and WeaponHoldingAttacker Class add functionality to this method via the addedAnimationChanges property.
    *  In those cases that method happens after this method has changed the animation.
    *
    * @memberof CanvasAnimation.prototype
    * @method changeDirectionAnimation
    * @param left {Boolean}
    * @param right {Boolean}
    * @param up {Boolean}
    * @param down {Boolean}
    * @param [keepAniIndex=false] {Boolean} When true lastAnim would be updated, by default this method does not update lastAnim
    * @param [noIdle=false] {Boolean} When true idle will not be applied to the animation
    * @param [keepUpDown=false] {Boolean} By default if idle is being applied, 'up' and 'down' are stripped so that only idleleft or idleright happen, if you want idleup idledown also pass true for this.
    *                                       By default this method is set up for platformers, that would never be idle in the air, for top down generally changeLeftRightUpDownAnimation is the method that would be used to change the animation.
    */
    changeDirectionAnimation(left: boolean, right: boolean, up: boolean, down: boolean, keepAniIndex?: boolean, noIdle?: boolean, keepUpDown?: boolean): void;
    /**
    *
    *    Resets the current animation to the beginning frame.
    *
    * @memberof CanvasAnimation.prototype
    * @method resetCurrentAnimation
    *
    */
    resetCurrentAnimation(): void;
    /**
    *
    *    Cycles through the frames of the animation as defined by animationSpecs and the currentAnimation.
    *    call blit to display the result onto the CanvasObject defined during construction.
    *
    * @memberof CanvasAnimation.prototype
    * @method animate
    * @param [thrott=1] {Number} Speed of the animation. 0.2 would be slow, 3 or higher would be fast. 1 is the default.
    *
    */
    animate(thrott?: number): void;
    /**
    *
    *
    *  Returns true when the currentAnimation has gone through all its frames.
    *
    *   For example in a game loop you could test for if(myCanvasAnimation.finishedCurrentAnimation())  { ... }
    *
    *   @memberof CanvasAnimation.prototype
    *   @method finishedCurrentAnimation
    *   @returns {Boolean}
    */
    finishedCurrentAnimation(): boolean;
    /**
    *
    *   Changes and blits the animation after milliSecondDelay amount of time.
    *
    * @memberof CanvasAnimation.prototype
    * @method delayedAnimateAndBlit
    * @param [thrott=1] {Number} Throttle to use for the animate call
    * @param milliSecondDelay {Number} Amount of time in milliseconds to wait before calling animate and blit
    * @param [animation] {String} The currentAnimation to change to. Otherwise currentAnimation is used. this sets currentAnimation.
    * @param [clearBeforeBlitt=false] {Boolean} If true the canvas would be cleared before the blit
    *
    */
    delayedAnimateAndBlit(thrott?: number, milliSecondDelay: number, animation?: string, clearBeforeBlitt?: boolean): void;
    private _delayedFunction;
    /**
    *
    *    Draws the animation onto the CanvasObject given during construction.
    *
    * @memberof CanvasAnimation.prototype
    * @method blit
    * @param [r] {Rectangle} optional Rectangle defining where to draw from. Default is fromRect (defined during construction and during animate calls)
    * @param [p] {MoverPoint} optional MoverPoint defining where to draw to. Default is toPoint (this.x, this.y)
    * @param [igf=false] {Boolean} Default is false, if true fromWidthOffset and fromHeightOffset will not be part of positioning calculations.
    *                        For example, if your colliding at 16x16 and yet the animation is 32x32 you would have defined a fromWidthOffset/fromHeightOffset of 16,
    *								and by default the animation would therefore be placed in the middle offset by 16. If you don't want this behavior pass 1 for igf.
    *
    */
    blit(r?: Rectangle, p?: MoverPoint, igf?: boolean): void;
}
declare namespace CanvasAnimation {
    let _onlyHorizontalAni: number;
}
//# sourceMappingURL=CanvasAnimation.d.ts.map