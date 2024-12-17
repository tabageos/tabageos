/**
*
*  @class ControllerPad
*  @classdesc
*  HTML5 ControllerPad with 10 possible buttons.
*  Also handles keyboard input for when touches are not available.
*  (for a game that is using tabageos and the tabageos.MouseController class)
*  this class uses tabageos.GeometricMath and extends tabageos.EventDispatcher.
*  Must instantiate and then call establish. The constructors params (besides the Numbers) are tabgeos.MoverPoints or Objects with x and y properties.
*  Use the controller.keyboardEquivalents Object to define the keyboard key values that correspond to the buttons.
*
*  Users may need to mash their touch screens to be sure and send a new touchstart event, when needing to press two buttons simultaineously
*  one needs to be sure and make definite presses, then smooth normal nintendo like play is what you get.
*  So your buttons should be big, at least all thumb size.
*  The MoverPoints you pass during construction should define the middle point of each button.
*
*  Includes usb game pad support; see .handleGamePad()
*
*   See the ControllerPad example;    https://www.tabageos.com/examples/ControllerPad
*
* @param holder {HTMLElement} The html div that is to hold the controller
* @param x {Number} placeholder for x, actual position is done during the show method.
* @param y {Number} placeholder for y
* @param w {Number} placeholder for width
* @param h {Number} placeholder for height
* @param leftp {MoverPoint} MoverPoint defining the middle point of the left button
* @param rightp {MoverPoint} MoverPoint defining the middle point of the right button
* @param upp {MoverPoint}
* @param downp {MoverPoint}
* @param startp {MoverPoint}
* @param backp {MoverPoint}
* @param ap {MoverPoint} MoverPoint defining the middle point of the a button
* @param bp {MoverPoint}
* @param cp {MoverPoint}
* @param dp {MoverPoint}
* @param directionButtonsWidth {Number} The width of each directional button
* @param directionButtonsHeight {Number}
* @param startAndBackWidth {Number} The width of the start and back buttons.
* @param startAndBackHeight {Number}
* @param buttonWidth {Number} The width of each letter button, a,b,c,d.
* @param buttonHeight {Number}
*
*/
declare function ControllerPad(holder: HTMLElement, x: number, y: number, w: number, h: number, leftp: MoverPoint, rightp: MoverPoint, upp: MoverPoint, downp: MoverPoint, startp: MoverPoint, backp: MoverPoint, ap: MoverPoint, bp: MoverPoint, cp: MoverPoint, dp: MoverPoint, directionButtonsWidth: number, directionButtonsHeight: number, startAndBackWidth: number, startAndBackHeight: number, buttonWidth: number, buttonHeight: number): void;
/**
*
*  @class ControllerPad
*  @classdesc
*  HTML5 ControllerPad with 10 possible buttons.
*  Also handles keyboard input for when touches are not available.
*  (for a game that is using tabageos and the tabageos.MouseController class)
*  this class uses tabageos.GeometricMath and extends tabageos.EventDispatcher.
*  Must instantiate and then call establish. The constructors params (besides the Numbers) are tabgeos.MoverPoints or Objects with x and y properties.
*  Use the controller.keyboardEquivalents Object to define the keyboard key values that correspond to the buttons.
*
*  Users may need to mash their touch screens to be sure and send a new touchstart event, when needing to press two buttons simultaineously
*  one needs to be sure and make definite presses, then smooth normal nintendo like play is what you get.
*  So your buttons should be big, at least all thumb size.
*  The MoverPoints you pass during construction should define the middle point of each button.
*
*  Includes usb game pad support; see .handleGamePad()
*
*   See the ControllerPad example;    https://www.tabageos.com/examples/ControllerPad
*
* @param holder {HTMLElement} The html div that is to hold the controller
* @param x {Number} placeholder for x, actual position is done during the show method.
* @param y {Number} placeholder for y
* @param w {Number} placeholder for width
* @param h {Number} placeholder for height
* @param leftp {MoverPoint} MoverPoint defining the middle point of the left button
* @param rightp {MoverPoint} MoverPoint defining the middle point of the right button
* @param upp {MoverPoint}
* @param downp {MoverPoint}
* @param startp {MoverPoint}
* @param backp {MoverPoint}
* @param ap {MoverPoint} MoverPoint defining the middle point of the a button
* @param bp {MoverPoint}
* @param cp {MoverPoint}
* @param dp {MoverPoint}
* @param directionButtonsWidth {Number} The width of each directional button
* @param directionButtonsHeight {Number}
* @param startAndBackWidth {Number} The width of the start and back buttons.
* @param startAndBackHeight {Number}
* @param buttonWidth {Number} The width of each letter button, a,b,c,d.
* @param buttonHeight {Number}
*
*/
declare function ControllerPad(holder: HTMLElement, x: number, y: number, w: number, h: number, leftp: MoverPoint, rightp: MoverPoint, upp: MoverPoint, downp: MoverPoint, startp: MoverPoint, backp: MoverPoint, ap: MoverPoint, bp: MoverPoint, cp: MoverPoint, dp: MoverPoint, directionButtonsWidth: number, directionButtonsHeight: number, startAndBackWidth: number, startAndBackHeight: number, buttonWidth: number, buttonHeight: number): void;
declare class ControllerPad {
    constructor(holder: HTMLElement, x: number, y: number, w: number, h: number, leftp: MoverPoint, rightp: MoverPoint, upp: MoverPoint, downp: MoverPoint, startp: MoverPoint, backp: MoverPoint, ap: MoverPoint, bp: MoverPoint, cp: MoverPoint, dp: MoverPoint, directionButtonsWidth: number, directionButtonsHeight: number, startAndBackWidth: number, startAndBackHeight: number, buttonWidth: number, buttonHeight: number);
    /**
    *
    *  @class ControllerPad
    *  @classdesc
    *  HTML5 ControllerPad with 10 possible buttons.
    *  Also handles keyboard input for when touches are not available.
    *  (for a game that is using tabageos and the tabageos.MouseController class)
    *  this class uses tabageos.GeometricMath and extends tabageos.EventDispatcher.
    *  Must instantiate and then call establish. The constructors params (besides the Numbers) are tabgeos.MoverPoints or Objects with x and y properties.
    *  Use the controller.keyboardEquivalents Object to define the keyboard key values that correspond to the buttons.
    *
    *  Users may need to mash their touch screens to be sure and send a new touchstart event, when needing to press two buttons simultaineously
    *  one needs to be sure and make definite presses, then smooth normal nintendo like play is what you get.
    *  So your buttons should be big, at least all thumb size.
    *  The MoverPoints you pass during construction should define the middle point of each button.
    *
    *  Includes usb game pad support; see .handleGamePad()
    *
    *   See the ControllerPad example;    https://www.tabageos.com/examples/ControllerPad
    *
    * @param holder {HTMLElement} The html div that is to hold the controller
    * @param x {Number} placeholder for x, actual position is done during the show method.
    * @param y {Number} placeholder for y
    * @param w {Number} placeholder for width
    * @param h {Number} placeholder for height
    * @param leftp {MoverPoint} MoverPoint defining the middle point of the left button
    * @param rightp {MoverPoint} MoverPoint defining the middle point of the right button
    * @param upp {MoverPoint}
    * @param downp {MoverPoint}
    * @param startp {MoverPoint}
    * @param backp {MoverPoint}
    * @param ap {MoverPoint} MoverPoint defining the middle point of the a button
    * @param bp {MoverPoint}
    * @param cp {MoverPoint}
    * @param dp {MoverPoint}
    * @param directionButtonsWidth {Number} The width of each directional button
    * @param directionButtonsHeight {Number}
    * @param startAndBackWidth {Number} The width of the start and back buttons.
    * @param startAndBackHeight {Number}
    * @param buttonWidth {Number} The width of each letter button, a,b,c,d.
    * @param buttonHeight {Number}
    *
    */
    constructor(holder: HTMLElement, x: number, y: number, w: number, h: number, leftp: MoverPoint, rightp: MoverPoint, upp: MoverPoint, downp: MoverPoint, startp: MoverPoint, backp: MoverPoint, ap: MoverPoint, bp: MoverPoint, cp: MoverPoint, dp: MoverPoint, directionButtonsWidth: number, directionButtonsHeight: number, startAndBackWidth: number, startAndBackHeight: number, buttonWidth: number, buttonHeight: number);
    x: number;
    y: number;
    width: number;
    height: number;
    _customSpecs: {};
    __recurse: number;
    _style: number;
    __mouseEnabled: number;
    _buttonRectColor: string;
    holderDiv: HTMLElement;
    _holderDivParent: Element;
    avg: number;
    buttons: {
        right: number;
        left: number;
        up: number;
        down: number;
        a: number;
        b: number;
        c: number;
        d: number;
        start: number;
        back: number;
    };
    basicArrows: {
        right: number;
        left: number;
        up: number;
        down: number;
        a: number;
        b: number;
        c: number;
        d: number;
        start: number;
        back: number;
    };
    arrows: {
        right: number;
        left: number;
        up: number;
        down: number;
        a: number;
        b: number;
        c: number;
        d: number;
        start: number;
        back: number;
    };
    basicWasd: {
        right: number;
        left: number;
        up: number;
        down: number;
        a: number;
        b: number;
        c: number;
        d: number;
        start: number;
        back: number;
    };
    wasd: {
        right: number;
        left: number;
        up: number;
        down: number;
        a: number;
        b: number;
        c: number;
        d: number;
        start: number;
        back: number;
    };
    keyboardEquivalents: {
        right: number;
        left: number;
        up: number;
        down: number;
        a: number;
        b: number;
        c: number;
        d: number;
        start: number;
        back: number;
    };
    _gpb: {
        a: number;
        b: number;
        c: number;
        d: number;
        s: number;
        st: number;
    };
    customStyleTotalWidth: number;
    customStyleTotalHeight: number;
    firstGamePadInstance: any;
    rotation: number;
    /**
    *
    * Enables mouse clicks on the controller
    *
    * @memberof ControllerPad.prototype
    * @method enableMouseControl
    *
    */
    enableMouseControl(): void;
    /**
    *  If you put anything for addEvents, events will Not be added
    *  just don't pass anything, leave addEvents out, if you intended to use the controller as normal.
    *  This method needs to be called after construction to establish events.
    *
    * @memberof ControllerPad.prototype
    * @method establish
    * @param [addEvents] {Boolean} If set events will not be added.
    *
    */
    establish(addEvents?: boolean, recordPlay: any): void;
    dLeft: HTMLDivElement;
    dRight: HTMLDivElement;
    dUp: HTMLDivElement;
    dDown: HTMLDivElement;
    buttonA: HTMLDivElement;
    buttonB: HTMLDivElement;
    buttonC: HTMLDivElement;
    buttonD: HTMLDivElement;
    startButton: HTMLDivElement;
    backButton: HTMLDivElement;
    rotationPad: HTMLDivElement;
    _scriptDiv(): HTMLDivElement;
    /**
    *
    * Removes touch move handling, such that only touchstart triggers anything.
    *  Needed if you want tile based non-fluid movement, frogger stlye or sokoban style.
    *
    * @memberof ControllerPad.prototype
    * @method removeTouchMove
    *
    */
    removeTouchMove(nr: any): void;
    _unscriptDiv(dv: any): void;
    _ccStore: CanvasObject;
    /**
    *
    * Ads a custom background image for the controller
    *
    *
    * @memberof ControllerPad.prototype
    * @method addCustomImage
    *
    * @param [imgLocation] {String} The location of an image to use as the background
    * @param customStyleName {String} The html style id for the custom background
    * @param [imgElement] {Image} If present will copy from this image using its full width and height.
    */
    addCustomImage(imgLocation?: string, customStyleName: string, imgElement?: new (width?: number, height?: number) => HTMLImageElement): void;
    /**
    * For use with ControllerPad.css, this setup does not include a specific up down or D buttons.
    * You can still assign any one of the buttons to do anything, just that the specific 'up' 'down' and 'D' buttons are not set up via this method.
    * This image has a big left and right button, and big A B and C buttons with start and back buttons in the middle.
    *
    * Used with .show(w,h) (no style param passed)
    * These methods automagically assign the button positions,
    * you need to also call tabageos.MouseController.defineMousePositionOffset during any resizing of the games container,
    * or use the tabageos.Resize method passing in an intance of the controller.
    *
    * @memberof ControllerPad.prototype
    * @method basicControllerButtonSetup
    *
    *
    */
    basicControllerButtonSetup(): void;
    /**
    *
    *
    *
    * @memberof ControllerPad.prototype
    * @method _basicControllerButtonTakedown
    *
    */
    _basicControllerButtonTakedown(): void;
    /**
    * For use with ControllerPad.css and the .show method
    * Use .show(w,h,2) to display the directionalsController image.
    * @memberof ControllerPad.prototype
    * @method directionalControllerButtonSetup
    */
    directionalsControllerButtonSetup(): void;
    /**
    *
    *  centerRotationX and centerRotationY also need to be set.
    *
    *
    *
    * @memberof ControllerPad.prototype
    * @method rotationalControllerButtonSetup
    *
    *
    *
    */
    rotationalControllerButtonSetup(): void;
    /**
    *
    *
    *
    * @memberof ControllerPad.prototype
    * @method _rotationalControllerButtonTakedown
    *
    */
    _rotationalControllerButtonTakedown(): void;
    /**
    *
    *
    *
    * @memberof ControllerPad.prototype
    * @method _directionalsControllerButtonTakedown
    *
    */
    _directionalsControllerButtonTakedown(): void;
    /**
    *
    *
    * @memberof ControllerPad.prototype
    * @method standardControllerButtonSetup
    *
    *
    *
    *
    */
    standardControllerButtonSetup(): void;
    /**
    *
    *
    *
    * @memberof ControllerPad.prototype
    * @method _standardControllerButtonTakedown
    *
    */
    _standardControllerButtonTakedown(): void;
    /**
    * Set up a custom controller pad.
    * Each MoverPoint param defines the x,y position of each button in relation to the top corner of the customImage, set with addCustomImage.
    * The top left point of each button in your image, the top left corner of the image being 0,0.
    *
    *
    * @memberof ControllerPad.prototype
    * @method customControllerButtonSetup
    *
    * @param leftp {MoverPoint}
    * @param rightp {MoverPoint}
    * @param upp {MoverPoint}
    * @param downp {MoverPoint}
    * @param startp {MoverPoint}
    * @param backp {MoverPoint}
    * @param ap {MoverPoint}
    * @param bp {MoverPoint}
    * @param cp {MoverPoint}
    * @param dp {MoverPoint}
    * @param directionButtonsWidth {Number}
    * @param directionButtonsHeight {Number}
    * @param buttonWidth {Number}
    * @param buttonHeight {Number}
    * @param totalWidth {Number}
    * @param totalHeight {Number}
    *
    *
    */
    customControllerButtonSetup(leftp: MoverPoint, rightp: MoverPoint, upp: MoverPoint, downp: MoverPoint, startp: MoverPoint, backp: MoverPoint, ap: MoverPoint, bp: MoverPoint, cp: MoverPoint, dp: MoverPoint, directionButtonsWidth: number, directionButtonsHeight: number, startAndBackWidth: any, startAndBackHeight: any, buttonWidth: number, buttonHeight: number, totalWidth: number, totalHeight: number): void;
    /**
    *
    *
    *
    * @memberof ControllerPad.prototype
    * @method _customControllerButtonTakedown
    *
    */
    _customControllerButtonTakedown(): void;
    /**
    * Assings default methods for start and back button presses.
    *
    * @memberof ControllerPad.prototype
    * @method assignStartAndBackMethods
    *
    * @param startMethodString {String} name of start method to call
    * @param backMethodString {String} name of back method to call
    * @param methodObjectRef {Object} Object that has the start and back methods
    */
    assignStartAndBackMethods(startMethodString: string, backMethodString: string, methodObjectRef: any): void;
    /**
    * Removes the methods assigned with assignStartAndBackMethods
    *
    * @memberof ControllerPad.prototype
    * @method removeStartAndBackMethods
    *
    * @param startMethodString {String} name of start method to call
    * @param backMethodString {String} name of back method to call
    * @param methodObjectRef {Object} Object that has the start and back methods
    */
    removeStartAndBackMethods(startMethodString: string, backMethodString: string, methodObjectRef: any): void;
    /**
    * Trys to destroy the ControllerPad instance
    *
    * @memberof ControllerPad.prototype
    * @method destroy
    *
    * @param startMethodString {String} optional name of start method that was added via assignStartAndBackMethods
    * @param backMethodString {String} optional name of back method that was added via assignStartAndBackMethods
    * @param methodObjectRef {Object} optional Object that has the start and back methods
    */
    destroy(startMethodString: string, backMethodString: string, methodObjectRef: any): void;
    /**
    * Don't absolute position the controllers holder div.
    * if you are positioning the controller in a special way you may need to set this so that the holder divs position style is not auto set to absolute.
    *
    * @memberof ControllerPad
    *
    */
    _dontAbsolutePositionHolder: number;
    /**
    *  displays the controller with the given style. show just displays it, it does not set up the buttons, to change the controller use one of the setup methods.
    *  The GameSkeleton Class and tabageos.ResizeGame call this method for you as needed.
    * Default style is 'basicController' see ControllerPad.css
    * The other built in style options are 'directionalsController' 'standController', style as 5 is the rotationController.
    *
    * The ControllerPad.css stylesheet needs to be applied to the page before this method is called.
    *
    * @param w {Number} The width the controller should be, it will get scaled down if smaller than default
    * @param h {Number} The height the controller should be, both w and h must be defined, otherwise it uses the default w/h.
    * @param style {Number} The style id string or number, to define a custom style use the addCustomImag method and pass in your customStyleName here for this param.
    * @param styleOriginalWidth
    * @param styleOriginalHeight
    * @memberof ControllerPad.prototype
    * @method show
    */
    show(w: number, h: number, style: number, styleOriginalWidth: any, styleOriginalHeight: any): void;
    /**
    *
    *
    * hide the ControllerPad
    *  @memberof ControllerPad.prototype
    * @method hide
    */
    hide(): void;
    /**
    *
    * establishes keydown and keyup events on the window for handleKeys and releaseKeys
    * used internally.
    *
    * @memberof ControllerPad.prototype
    * @method keyEstablish
    */
    keyEstablish(): void;
    _configBasic(str: any, prs: any): void;
    _configDirectional(str: any, prs: any): void;
    _configRotational(str: any, prs: any): void;
    _configStandard(str: any, prs: any): void;
    _configCustom(str: any, prs: any): void;
    /**
    * Optional additional css to add to each buttons style.
    *
    * @memberof ControllerPad
    *  @type {String}
    *
    */
    _addedButtonRectStyle: string;
    /**
    *
    * Can be used to display the actual rectangle hit regions of each button.
    *
    * @memberof ControllerPad.prototype
    * @method showButtons
    *  @param ifPressed {Boolean} only show each button if it is pressed, once set, to unset pass -1.
    *
    */
    showButtons(ifPressed: boolean): void;
    /**
    *
    *  hide buttons, by default this is called during setup.
    *
    * @memberof ControllerPad.prototype
    * @method hideButtons
    *
    *
    */
    hideButtons(): void;
    /**
    *
    * routes all touch and mouse events to their respective methods.
    *  Calls showButtons if 1 has been set on a showButtons call.
    *  Used internally by each button.
    *
    * @memberof ControllerPad.prototype
    * @method dispatch
    *
    */
    dispatch(e: any): void;
    /**
    * Used internally
    *
    * @memberof ControllerPad.prototype
    * @method changeTouches
    *
    */
    changeTouches(e: any): void;
    /**
    * Used internally
    *
    * @memberof ControllerPad.prototype
    * @method handleTouches
    *
    */
    handleTouches(e: any): void;
    addedRotationX: number;
    addedRotationY: number;
    /**
    *
    * The center x of the rotation pads circle on the whole screen.
    * For example, if the game has a width of 496, the middle of the rotation circle at full screen is about 64 to 120.
    * If the game is not full screen you will need to calculate where the game edge starts and count from there plus about 64 to 120.
    *  This number should define the middle x of the rotation circle image when the controller is shown.
    *
    *
    * centerRotationX and centerRotationY are pretty much arrived at by trial and error.
    *
    *  But the general formula when fullscreen is:
    *
    *           centerRotationX = 0 + 64;
    *           centerRotationY = gameHeight + (this._scaleRectRef.height/(this._scaleRectRef.height/gameHeight)) - 64;
    *           ('this' would be a setup inherited instance of the GameSkeleton which would have _scaleRectRef available)
    *
    *  And the general formula for when not full screen is:
    *
    *         var fif = window.innerWidth/2;//50%
    *         var containerleft = fif - 248;//50% - half game width is what the container is positioned at when using the GameSkeleton Class.
    *         controller.centerRotationX = containerleft + 64;
    *         controller.centerRotationY = gameHeight + 64;
    *
    *  Use the above as general guides, test in dev tools and adjust as needed.
    *  The controller should generally work in dev tools with your finger able to rotate around the black part of the rotation circle.
    *  Arrive at definite numbers and it should work at all sizes, so generally you would just need to change the 64's in the formulas.
    *
    * @memberof ControllerPad
    */
    centerRotationX: number;
    /**
    *
    *
    * The center y of the rotation pads circle on the whole screen.
    * see centerRotationX
    * @memberof ControllerPad
    */
    centerRotationY: number;
    /**
    * for rotation the principle is to get the middle point and use atan2() * 180 / pi.
    * the other things making this possible are in the MouseController Class and the static tabageos.ResizeGame method.
    * Together they translate the touch point into a point within gameWidth/Height.
    * when set up for capturing rotation, the controller calls rotateWithPoint on touchmove with the translate cords.
    * the Rotating[Traveler/Shooter] Classes then need only use .setRotation(controller.rotation) to rotate via the controller.
    *
    * @memberof ControllerPad.prototype
    * @method rotateWithPoint
    *
    * @param x {Number}
    * @param y {Number}
    * @param addedX {Number}
    * @param addedY {Number}
    * @param centerX {Number} The center x point of the rotation see centerRotationX, centerRotationX is used by default.
    * @param centerY {Number} The center y point of the rotation see centerRotationY, centerRotationY is used by default.
    *
    */
    rotateWithPoint(x: number, y: number, addedX: number, addedY: number, centerX: number, centerY: number): void;
    /**
    * Used internally
    *
    * @memberof ControllerPad.prototype
    * @method releaseTouches
    *
    */
    releaseTouches(e: any): void;
    /**
    *   For override, called before keyCode checks during handleKeys.
    *	let's say you wanted users to be able to use either wasd or arrows
    *	then you can overide ._preHandleKeys and do for example;
    *	 if(e.keyCode == 39 || e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 40) {
    *		controller.keyboardEquivalents = controller.arrows;
    *	 } else {
    *		controller.keyboardEquivalents = controller.wasd;
    *	 }
    *	or you wanted the keyboard equivalents to change based on the level
    *	or some other factor, then this overideable blank function is for that
    *	it gets called just before any checks of keyboardEquivalents are done.
    *
    *    If you want both WASD and Arrows to be used, you can also
    *    just call .acceptWASDAndArrows, which overrides ._preHandleKeys for you.
    * @memberof ControllerPad.prototype
    * @method _preHandleKeys
    */
    _preHandleKeys: (e: any) => void;
    /**
    *
    * Sets up _preHandleKeys to change keyboardEquivalents based on what is pressed wasd or arrows. Allowing for both to be used.
    *
    * @memberof ControllerPad.prototype
    * @method acceptWASDAndArrows
    *
    */
    acceptWASDAndArrows(): void;
    /**
    * Used internally
    *
    * @memberof ControllerPad.prototype
    * @method handleKeys
    *
    */
    handleKeys(e: any): void;
    /**
    * Used internally
    *
    * @memberof ControllerPad.prototype
    * @method releaseKeys
    *
    */
    releaseKeys(e: any): void;
    usingGamePad: number;
    /**
    * the pad.buttons[index] of each game pad button
    * In general you should not change these yourself, unless you know the specific usb controller
    * your players will be using. Use .configureGamePadButtons when you don't know what specific usb game pad your users will have.
    * As is, these indexes are the numbers given by the Radio Shack Playstation controller to usb converter,
    * obviously it is most likely that players will have many different types of usb controllers.
    * @memberof ControllerPad
    */
    gamePadButtons: {
        a: number;
        b: number;
        c: number;
        d: number;
        s: number;
        st: number;
    };
    gamePadButtonsUserDefined: number;
    requestForAButton: string;
    requestForBButton: string;
    requestForCButton: string;
    requestForDButton: string;
    requestForSButton: string;
    requestForSTButton: string;
    _createRequestDiv(inner: any, clear: any): void;
    _gpa: number;
    /**
    *
    *
    * Returns 1 if a game pad is available.
    *
    * @memberof ControllerPad.prototype
    * @method gamePadAvailable
    * @return {Number}
    *
    *
    *
    *
    */
    gamePadAvailable(): number;
    /**
    * To be called during a loop.
    * see .handleGamePad
    *
    *@memberof ControllerPad.prototype
    * @method configureGamePadButtons
    */
    configureGamePadButtons(): 0 | 1;
    /**
    *
    *  Call during your game loop, after movement has already happened.
    *  Basic GamePad functionality. Should produce correct directional response from any pad,
    *  But each game pad is different and each may send out different index values for the specific buttons.
    *  Directional input is done by axsis therefore it should work for all pads,
    *  button input however may vary more, best thing is to let the user set the buttons (not directionals)
    *  call configureGamePadButtons during your game loop, until it returns 1 or until gamePadButtonsUserDefined is 1.
    *  then start calling handleGamePad, for example;
    *
    *   	 	if(!controller.gamePadButtonsUserDefined) {
    *				controller.configureGamePadButtons();
    *			} else {
    *				controller.handleGamePad();
    *			}
    *  @memberof ControllerPad.prototype
    *  @method handleGamePad
    *
    */
    handleGamePad(): void;
}
declare namespace ControllerPad {
    /**
    * Used internally
    *
    * @memberof ControllerPad.prototype
    * @method _selfStyle
    *
    */
    function _selfStyle(customStyleName: any, customStyleData: any): void;
}
//# sourceMappingURL=ControllerPad.d.ts.map