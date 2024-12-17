/**
*   Constructs a new BasicCamera, there should generally only be one camera, but it is not enforced.
*
* @class BasicCamera
* @classdesc
*
*   A basic camera that will either render multiple CanvasObjects into one renderLayer,
*    and/or just move the html canvas elements of each layer added.
*
* @constructor
*
* @param renderLayer {CanvasObject} The CanvasObject to draw all layers into.
* @param blitLayer1 {CanvasObject}  The first offscreen CanvasObject layer to draw from onto the renderLayer
* @param [blitLayer2] {CanvasObject}  The second CanvasObject layer
* @param [blitLayer3] {CanvasObject}  The third CanvasObject layer
* @param [blitLayer4] {CanvasObject}  The fourth CanvasObject layer
* @param [blitLayer5] {CanvasObject}  The fifth CanvasObject layer, would get drawn on top of all the other layers.
* @param vWidth {Number} The width of the cameras viewport
* @param vHeight {Number} The height of the camera viewport
* @param [constant1] {Number}  If not 0 or undefined, layer 1 will be moved instead of drawn into the render layer, for this you will need to be sure the html canvas of layer 1 is added as part of the html page.
* @param [constant2] {Number}  If not 0 or undefined, layer 2 will be moved instead of drawn into the render layer, for this you will need to be sure the html canvas of layer 2 is added as part of the html page.
* @param [constant3] {Number}  If not 0 or undefined, layer 3 will be moved instead of drawn into the render layer, for this you will need to be sure the html canvas of layer 3 is added as part of the html page.
* @param [constant4] {Number}  If not 0 or undefined, layer 4 will be moved instead of drawn into the render layer, for this you will need to be sure the html canvas of layer 4 is added as part of the html page.
* @param [constant5] {Number}  If not 0 or undefined, layer 5 will be moved instead of drawn into the render layer, for this you will need to be sure the html canvas of layer 5 is added as part of the html page.
*
*/
declare function BasicCamera(renderLayer: CanvasObject, blitLayer1: CanvasObject, blitLayer2?: CanvasObject, blitLayer3?: CanvasObject, blitLayer4?: CanvasObject, blitLayer5?: CanvasObject, vWidth: number, vHeight: number, constant1?: number, constant2?: number, constant3?: number, constant4?: number, constant5?: number): void;
declare class BasicCamera {
    /**
    *   Constructs a new BasicCamera, there should generally only be one camera, but it is not enforced.
    *
    * @class BasicCamera
    * @classdesc
    *
    *   A basic camera that will either render multiple CanvasObjects into one renderLayer,
    *    and/or just move the html canvas elements of each layer added.
    *
    * @constructor
    *
    * @param renderLayer {CanvasObject} The CanvasObject to draw all layers into.
    * @param blitLayer1 {CanvasObject}  The first offscreen CanvasObject layer to draw from onto the renderLayer
    * @param [blitLayer2] {CanvasObject}  The second CanvasObject layer
    * @param [blitLayer3] {CanvasObject}  The third CanvasObject layer
    * @param [blitLayer4] {CanvasObject}  The fourth CanvasObject layer
    * @param [blitLayer5] {CanvasObject}  The fifth CanvasObject layer, would get drawn on top of all the other layers.
    * @param vWidth {Number} The width of the cameras viewport
    * @param vHeight {Number} The height of the camera viewport
    * @param [constant1] {Number}  If not 0 or undefined, layer 1 will be moved instead of drawn into the render layer, for this you will need to be sure the html canvas of layer 1 is added as part of the html page.
    * @param [constant2] {Number}  If not 0 or undefined, layer 2 will be moved instead of drawn into the render layer, for this you will need to be sure the html canvas of layer 2 is added as part of the html page.
    * @param [constant3] {Number}  If not 0 or undefined, layer 3 will be moved instead of drawn into the render layer, for this you will need to be sure the html canvas of layer 3 is added as part of the html page.
    * @param [constant4] {Number}  If not 0 or undefined, layer 4 will be moved instead of drawn into the render layer, for this you will need to be sure the html canvas of layer 4 is added as part of the html page.
    * @param [constant5] {Number}  If not 0 or undefined, layer 5 will be moved instead of drawn into the render layer, for this you will need to be sure the html canvas of layer 5 is added as part of the html page.
    *
    */
    constructor(renderLayer: CanvasObject, blitLayer1: CanvasObject, blitLayer2?: CanvasObject, blitLayer3?: CanvasObject, blitLayer4?: CanvasObject, blitLayer5?: CanvasObject, vWidth: number, vHeight: number, constant1?: number, constant2?: number, constant3?: number, constant4?: number, constant5?: number);
    layerToRender: CanvasObject;
    b1: CanvasObject;
    b2: CanvasObject;
    b3: CanvasObject;
    b4: CanvasObject;
    b5: CanvasObject;
    c1: number;
    c2: number;
    c3: number;
    c4: number;
    c5: number;
    tweens1: any[];
    tweens2: any[];
    p: MoverPoint;
    v: Rectangle;
    viewPortWidth: number;
    viewPortHeight: number;
    _justMoveParallax: number;
    _isoPoint: MoverPoint;
    _constantV: Rectangle;
    /**
    *
    * @private
    *
    * @memberof BasicCamera
    *
    */
    private lastVXr;
    /**
    *
    *    @private
    *
    * @memberof BasicCamera
    *
    */
    private trsh;
    /**
    *
    *    @private
    *
    * @memberof BasicCamera
    *
    */
    private lastvx;
    /**
    *
    *    @private
    *
    * @memberof BasicCamera
    *
    */
    private lastvy;
    /**
    *
    *
    *    @private
    * @memberof BasicCamera
    *
    */
    private p1Tweens1;
    /**
    *
    *    @private
    *
    * @memberof BasicCamera
    *
    */
    private p1Tweens2;
    /**
    *
    *    @private
    *
    * @memberof BasicCamera
    *
    */
    private p2Tweens1;
    /**
    *
    *    @private
    *
    * @memberof BasicCamera
    *
    */
    private p2Tweens2;
    /**
    *
    *    The type of tween for parallax layer one movement, default is Linear
    *
    * @memberof BasicCamera
    *
    */
    pTweenType1: string;
    /**
    *
    *    The millisecond amount of time for parallax layer one movement
    *
    * @memberof BasicCamera
    *
    */
    pTweenTime1: number;
    /**
    *
    *    The type of tween for parallax layer two movement.
    *
    * @memberof BasicCamera
    *
    */
    pTweenType2: string;
    /**
    *
    *    The millisecond amount of time for parallax layer two.
    *
    * @memberof BasicCamera
    *
    */
    pTweenTime2: number;
    /**
    *
    *
    *
    * @memberof BasicCamera
    *
    */
    pTween1XOffset: number;
    /**
    *
    *
    *
    * @memberof BasicCamera
    *
    */
    pTween2XOffset: number;
    /**
    *
    *
    *
    * @memberof BasicCamera
    *
    */
    pTween1YOffset: number;
    /**
    *
    *
    *
    * @memberof BasicCamera
    *
    */
    pTween2YOffset: number;
    /**
    *
    *
    *    @private
    * @memberof BasicCamera
    *
    */
    private pLastVs;
    /**
    *   Can be used with the .tweenedBlitLayerRender method to produce parallax effects.
    *
    * Only two layers can be added.
    * Layers will parallax based on .pTweenTime1 (or .pTweenTime2 for if you use 2 layers) or, a default of whatever you pass for tweentime in .tweenedBittLayerRender  multiplied by 2.
    *
    *  By default you just add a layer and it will move slower than the layers on top of it
    *  If you want to do more complex stuff, you would alter the .pTweenType1 and .pTweenTime1
    *
    *
    * @memberof BasicCamera.prototype
    * @method addParallaxLayer
    * @param canvasObject {CanvasObject} The CanvasObject to add as a parallax layer
    *
    */
    addParallaxLayer(canvasObject: CanvasObject): void;
    _pLayer1: CanvasObject;
    _pV1: Rectangle;
    _pLayer2: CanvasObject;
    _pV2: Rectangle;
    /**
    *   Same as addParallaxLayer except the layer added will be moved instead of drawn.
    *    When this method is used, any parallax layer already added will also just move instead of be drawn.
    *    And you need to be sure to have that layer as part of the things being displayed.
    *	Move just moves it, regular addParallaxLayer adds it to be  moved and drawn.
    *
    * @memberof BasicCamera.prototype
    * @method addParallaxLayerForMove
    * @param canvasObejct {CanvasObject}
    *
    */
    addParallaxLayerForMove(canvasObejct: CanvasObject): void;
    /**
    *
    *    the 2D Array to use during drawDirectlyFromMap
    *
    * @memberof BasicCamera
    *
    */
    _map: any[];
    /**
    *
    *    the tileSheet to use during drawDirectlyFromMap
    *
    * @memberof BasicCamera
    *
    */
    _tileSheetImage: any;
    /**
    *
    *    Sets the 2D Array to use during drawDirectlyFromMap
    *
    * @memberof BasicCamera.prototype
    * @method setMap
    * @param toThis {Array} A 2D Array of tile values denoting where in a tileset to draw from.
    *
    */
    setMap(toThis: any[]): void;
    /**
    *
    *    Tile width of each tile used with drawDirectlyFromMap
    *
    * @memberof BasicCamera
    *
    */
    _tw: number;
    /**
    *
    *    Tile height of each tile used with drawDirectlyFromMap
    *
    * @memberof BasicCamera
    *
    */
    _th: number;
    /**
    *
    *    A function that determines the x index to draw from based on the value given.
    *    By default this will assume that the tile value is a [y,x] array, and will return a[1] by default for this method.
    *    To change what this method does override it by calling _mapIndexXMethod = function(a) { .. your details... returning index x };
    *    Used by setupForRenderFromMap
    *
    * @memberof BasicCamera.prototype
    * @method _mapIndexXMethod
    * @param a {Object} The tile value
    * @returns {Number} The x index denoted by the tile value
    */
    _mapIndexXMethod: (a: any) => number;
    /**
    *
    *    A function that determines the y index to draw from based on the value given.
    *    By default this will assume that the tile value is a [y,x] array, and will return a[0] by default for this method.
    *    To change what this method does override it by calling _mapIndexXMethod = function(a) { .. your details... returning index y };
    *     Used by setupForRenderFromMap
    *
    * @memberof BasicCamera.prototype
    * @method _mapIndexYMethod
    * @param a {Object} The tile value
    * @returns {Number} The y index denoted by the tile value
    */
    _mapIndexYMethod: (a: any) => number;
    /**
    *
    *    setup a layer to be renedered directly from a 2D map array.
    *
    *
    * @memberof BasicCamera.prototype
    * @method setupForRenderFromMap
    * @param map {Array} 2D map Array to use
    * @param tileSheetImg {Img} HTML img element or canvas element to draw from, sets the _tileSheetImage property of this class.
    * @param tw {Number} tile width
    * @param th {Number} tile height
    * @param layer {Number} The layer that will be rendered directly from the map. 1 2 3 4 or 5.
    * @param [vW] {Number} The view width for drawDirectlyFromMap calls, by default v.width will be used.
    * @param [vH] {Number} The view height for drawDirectlyFromMap calls, by default v.height will be used.
    * @param [indexXMethod] {Function} A method that will take a tile value and return its x index. by default it is assumed each tile value is a [y,x] index array.
    * @param [indexYMethod] {Function} A method that will take a tile value and return its y index. by default it is assumed that each tile value is a [y,x] index array.
    *
    */
    setupForRenderFromMap(map: any[], tileSheetImg: Img, tw: number, th: number, layer: number, vW?: number, vH?: number, indexXMethod?: Function, indexYMethod?: Function): void;
    _vRenderWidth: number;
    _vRenderHeight: number;
    rfm1: number;
    rfm2: number;
    rfm3: number;
    rfm4: number;
    rfm5: number;
    /**
    *
    *    A method to call when the end of _map is reached that would update _map.
    *    Used alongside the setupForRenderFromMap method
    *
    * @memberof BasicCamera
    *
    */
    mapUpdateMethod: any;
    /**
    *
    *    Used during drawDirectlyFromMap if no _tileSheetImage has been set.
    *
    * @memberof BasicCamera
    *
    */
    colorValues: {
        1: string;
        2: string;
        3: string;
    };
    /**
    *
    *    Returns the view port Rectangle of the camera.
    *
    * @memberof BasicCamera.prototype
    * @method blitLayerRenderView
    * @returns {Rectangle}
    */
    blitLayerRenderView(): Rectangle;
    private renderP1;
    private renderP2;
    private renderB1;
    private renderB2;
    private renderB3;
    private renderB4;
    private renderB5;
    /**
    *
    *    Draws from _map onto layerToRender.
    *   When the setupForRenderFromMap method is used, this method will be used internally to render the layer.
    *   If _tileSheetImage is defined then BlitMath.specificPatternAreaBlit or patternAreaBlit is used to render the map.
    *   If _tileSheetImage is not defined then BlitMath.drawSquresFromAreaOfPattern is used, using the colorValues property of this class.
    *  If _map is not a map of [y,x] values, ._mapIndexXMethod and ._mapIndexYMethod will be used on each value in _map to determine the location of each tile to draw.
    *
    * @memberof BasicCamera.prototype
    * @method drawDirectlyFromMap
    *
    */
    drawDirectlyFromMap(): void;
    /**
    *
    *    Renders each layer into layerToRender (that is assigned during construction) based on the cameraOffsetPosition point given and limitX and limitY.
    *    This method does not render parallax layers.
    *
    * @memberof BasicCamera.prototype
    * @method blitLayerRender
    * @param cameraOffsetPosition {MoverPoint} A MoverPoint to offset the camera around.
    * @param [limitX] {Number} The horizontal limit of camera movement.
    * @param [limitY] {Number} The vertical limit of camera movement.
    *
    */
    blitLayerRender(cameraOffsetPosition: MoverPoint, limitX?: number, limitY?: number): void;
    /**
    *
    *    Resets the view port position and all tweens.
    *
    * @memberof BasicCamera.prototype
    * @method reset
    * @param vx {Number} Reset to this x position instead of 0.
    * @param vy {Number} Reset to this y position instead of 0.
    *
    */
    reset(vx: number, vy: number): void;
    /**
    *
    *    Resets all tweens.
    *
    * @memberof BasicCamera.prototype
    * @method resetTween
    *
    */
    resetTween(): void;
    /**
    *
    *    Resets tweens, and adjusts the view port position based on the MoverPoint given and the offsets,
    *    and then calls justRender and then blitLayerRender.
    *	 offsets should be the negative of what you would use as cameraOffsetPosition during blitLayerRender.
    *
    * @memberof BasicCamera.prototype
    * @method focus
    * @param mpToFocusOn {MoverPoint} The MoverPoint to focus on
    * @param [offsetX] {Number} Optional horizontal offset subtracted from mpToFocusOn
    * @param [offsetY] {Number} Optional vertical offset subtracted from mpToFocusOn
    *
    */
    focus(mpToFocusOn: MoverPoint, offsetX?: number, offsetY?: number): void;
    /**
    *
    *
    *    @private
    * @memberof BasicCamera
    *
    */
    private _shkincer;
    /**
    *
    *    Defines the time of each shake, set during the shake method.
    *
    * @memberof BasicCamera
    *
    */
    shakeTime: number;
    /**
    *
    *    Defines the amount of shaking that will happen, default is 4.
    *
    * @memberof BasicCamera
    *
    */
    shakeForce: number;
    /**
    *
    *    @private
    *
    * @memberof BasicCamera
    *
    */
    private shakeContainer;
    /**
    *
    *
    *    @private
    * @memberof BasicCamera
    *
    */
    private _shakeOriginals;
    /**
    *
    *   Setup to shake the given container, automatic execution of the shake happens within the tweenedBlitLayerRender method, or use executeShake to execute the shake manually after calling this method to set up the shake.
    *    If your using a GameSkeleton, by default all you would have to do is call this method of the camera in your loop to shake the given container.
    *       GameSkeleton also has a shake method.
    *
    * @memberof BasicCamera.prototype
    * @method shake
    * @param time {Number}
    * @param container {HTMLElement} The HTML element to shake.
    * @param [ex] {Boolean} Execute the shake once, causes executeShake to be called once, executeShake is also called by tweenedBlitLayerRender.
    *
    */
    shake(time: number, container: HTMLElement, ex?: boolean): void;
    /**
    *
    *    Executes the shake, called by tweenedBlitLayerRender.
    *    set up the shake using the shake method.
    *
    * @memberof BasicCamera.prototype
    * @method executeShake
    *
    */
    executeShake(): void;
    /**
    *
    *    @private
    *
    * @memberof BasicCamera
    *
    */
    private _tweenLoopOptions;
    /**
    *
    *    Call during a loop to move the camera around cameraOffsetPosition with easing.
    *	this method renders each individual layer onto layerToRender based on the params given.
    * 	if parallax layers have been defined they will be rendered first, underneath all other layers.
    *
    * @memberof BasicCamera.prototype
    * @method tweenedBlitLayerRender
    * @param cameraOffsetPosition { MoverPoint } the point the camera should follow. The follow area is defined by v.width and v.height.
    * @param [limitX] { Number } The number that v.x should not be greater than. The default is v.width
    * @param [limitY]  { Number } The number that v.y should not be greater than. The default is v.height
    * @param tweenTime { Number } The millisecond amount of time each tween should take
    * @param [easeType='Linear'] { String } The easing function to use, default is 'Linear'.
    * @param [startingX] { Number }  denoting the number v.x should not be less than. default is 0.
    * @param [startingY] { Number }  denoting the number v.y should not be less than. default is 0.
    *
    */
    tweenedBlitLayerRender(cameraOffsetPosition: MoverPoint, limitX?: number, limitY?: number, tweenTime: number, easeType?: string, startingX?: number, startingY?: number): void;
    /**
    *
    *    @private
    *
    * @memberof BasicCamera
    *
    */
    private _dragPosition;
    /**
    *
    *    Releases the camera from being dragged, use after a drag operation has been made.
    *
    * @memberof BasicCamera.prototype
    * @method releaseDrag
    *
    */
    releaseDrag(): void;
    /**
    *    Drag the camera around.
    *
    *     Parallax layers are not dragged, or displayed during drag.  For drag, only the 5 inital layers are available.
    *
    * @example
    *           document.onmousemove = function(e) { camera.drag(mouseMP,64,0,1,100); }
    *           document.onmouseup = function(e) { camera.releaseDrag(); }
    *           gameLoop = function(e) { camera.justRender(); }
    *
    *
    * @memberof BasicCamera.prototype
    * @method drag
    * @param dragPos {MoverPoint} The MoverPoint position the drag starts from, this must be defined, normally is just the mouse position.
    * @param [dragSpeed=64] {Number} The speed of the drag default is 64
    * @param [limitX]  {Number} default is v.width
    * @param [limitY]  {Number} default is v.height
    * @param tweenTime {Number} The amount of time for the tween
    * @param [easeType='Linear']  {String} Ease type
    *
    */
    drag(dragPos: MoverPoint, dragSpeed?: number, limitX?: number, limitY?: number, tweenTime: number, easeType?: string): void;
    /**
    *
    *    Renders each layer starting with layer 1 on the bottom, primarely for use with the drag method.
    *
    * @memberof BasicCamera.prototype
    * @method justRender
    *
    */
    justRender(): void;
    /**
    *
    *    The horizontal camera follow offset,
    *    typically you would set this to about negative half the cameraWidth minus tile width.
    *
    * @memberof BasicCamera.protoype
    *
    */
    cameraFollowOffsetX: number;
    /**
    *
    *    The vertical camera follow offset,
    *   typically you would set this to about negative half the cameraHeight minus tile height.
    *
    * @memberof BasicCamera
    *
    */
    cameraFollowOffsetY: number;
    /**
    *
    *    Sets the camera follow offsets for use with isoTweenedBlitLayerRender calls.
    *
    * @memberof BasicCamera.prototype
    * @method setIsoFollowOffsets
    * @param gameWidth {Number} The total width of the game
    * @param gameHeight {Number} The total height of the game
    * @param tileWidth {Number} The tile width
    * @param tileHeight {Number} tile height
    *
    */
    setIsoFollowOffsets(gameWidth: number, gameHeight: number, tileWidth: number, tileHeight: number): void;
    /**
    *
    *    follows pointToFollow in a SimpleIsoScene.
    * 	 for use with the SimpleIsoScene Class.
    *
    * @memberof BasicCamera.prototype
    * @method isoTweenedBlitLayerRender
    * @param tileWidth {Number}
    * @param tileHeight {Number}
    * @param scene {SimpleIsoScene}
    * @param pointToFollow {MoverPoint}
    * @param [cFollowOffsetX] {Number}
    * @param [cFollowOffsetY] {Number}
    * @param [limitX] {Number}
    * @param [limitY] {Number}
    * @param tweenTime {Number}
    * @param [easeType='Linear'] {String}
    * @param [startingX=0] {Number}
    * @param [startingY=0] {Number}
    *
    */
    isoTweenedBlitLayerRender(tileWidth: number, tileHeight: number, scene: SimpleIsoScene, pointToFollow: MoverPoint, cFollowOffsetX?: number, cFollowOffsetY?: number, limitX?: number, limitY?: number, tweenTime: number, easeType?: string, startingX?: number, startingY?: number): void;
    /**
    *
    *    tweens the render of each layer
    *	 controlled also by .separatedOffset1 .separatedOffset2 ..3 ..4 ..5   by default they are 5 4 3 2 1
    *
    *	Useful for 5 layer parallax
    *
    *	tweenBlitLayerRender tweens the 5 layers together with two optional below the background parallax layers, 7 total layers but only the bottom two parallaxing.
    *   this method allows for the 5 layers added during construction to be tweened for a 5 layer possible parallax.
    *
    *
    * @memberof BasicCamera.prototype
    * @method separatedTweenedBlitLayerRender
    * @param cameraOffsetPosition {MoverPoint} Point the camera should follow
    * @param limitx {Number}
    * @param limity {Number}
    * @param tweenTimes {Array} array holding the time in milliseconds that each layers tween should take, use together with the separatedOffset properties
    * @param {String} [easeType] default is "Linear"
    * @param [startingX1] {Number}
    * @param [startingX2] {Number}
    * @param [startingX3] {Number}
    * @param [startingX4] {Number}
    * @param [startingX5] {Number}
    * @param [startingY1] {Number}
    * @param [startingY2] {Number}
    * @param [startingY3] {Number}
    * @param [startingY4] {Number}
    * @param [startingY5] {Number}
    *
    */
    separatedTweenedBlitLayerRender(cameraOffsetPosition: MoverPoint, limitX: any, limitY: any, tweenTimes: any[], easeType?: string, startingX1?: number, startingX2?: number, startingX3?: number, startingX4?: number, startingX5?: number, startingY1?: number, startingY2?: number, startingY3?: number, startingY4?: number, startingY5?: number): void;
}
//# sourceMappingURL=BasicCamera.d.ts.map