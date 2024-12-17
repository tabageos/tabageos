declare function GameSkeleton(specs: {
    gWidth: number;
    gHeight: number;
    camearWidth: number;
    cameraHeight: number;
    cameraType: number;
    cameraFollowOffsetX: number;
    cameraFollowOffsetY: number;
    backgroundColor: string;
    tileW: number;
    tileH: number;
    controllerHeight: number;
    initialLives: number;
    initPlayerPosition: MoverPoint;
    spriteSheetImage: string;
    containerDivId: string;
    rootDivId: string;
    controllerDivId: string;
    gameScale: number;
    useScreenOrganizer: boolean;
    startWidth: number;
    startHeight: number;
    startLocations: MoverPoint;
    gameLoop: Function;
    initializationSpecifics: Function;
    /**
    *
    *
    *  The actual class construction method, for use after a super call, it is used during construction or a super call if specs are passed.
    *  To extend the GameSkeleton with es6 class syntax and the use of 'this' in the specs Object, first call super without a param, then this method with a specs Object.
    *
    * @memberof GameSkeleton.prototype
    * @method initialConstruction
    *
    * @param specs {Object}
    */
    addedResizeMethod: Function;
    sceneResetSpecifics: Function;
    fullResetSpecifics: Function;
    additionalSceneResetSpecifics: Function;
    topDownSceneChange: number;
    underCoverSpecifics: Function;
    useSceneChanger: boolean;
    initForISO: number;
    disableBackgroundAlpha: number;
    positionResetSpecifics: Function;
    beforeStartGameLoop: Function;
    tweenLimitX: number;
    tweenLimitY: number;
    cameraTweenType: string;
    enableGamePad: boolean;
    frameRate: number;
    hudScale: number;
    walkthroughLink: string;
    sceneChangeSpecifics: Function;
    priorToSceneChange: Function;
    afterSceneChange: Function;
    specialControllerUse: boolean;
    onSelectLevel: Function;
}): void;
/**
*
*    Constructs a new GameSkeleton instance, this constructor should generally not be used.
*		To use the GameSkeleton class you should extend it. Create a class that will extend GameSkeleton and within that class constructior call  GameSkeleton.call(this, specs);
*
*		function MyGame() {
*			var specs = { ... };//see below for details of the specs Object.
*			tabageos.GameSkeleton.call(this, specs);
*		}
* 		MyGame.prototype = Object.create(tabageos.GameSkeleton.prototype);
*		MyGame.prototype.setupSpecifics = function() {
*			//your game setup specifics, all properties of GameSkeleton available via 'this'
*			//skin related stuffs would happen here, title styling, level setup, etc...
*		};
*		MyGame.prototype.loop = function(ts) {
*			//your specific game mechanics, all properties of GameSkeleton available via 'this'
*			//the meat of the game goes here, stuff that should happen every frame.
*		};
*	 	new MyGame();
*
*       OR
*
*       class MyGame extends tabageos.GameSkeleton {
*           constructor() {
*                super();
*                var gameSpecs = {...};
*                this.initialConstruction(gameSpecs);
*           }
*           setupSpecifics = function() {
*
*           }
*           loop = function(ts) {
*
*           }
*
*       }
*       new MyGame();
*
*
* @class GameSkeleton
* @classdesc Game framework Class. Organizes the use of the various tabageos Classes for the creation of a game with title screen, main camera and game over screen.
*                               Has just about everything needed for the framing of any game.
*    The way it should be used is to extend it via the Object.create method, then in the constructor function you call; GameSkeleton.call(this,specs);
*    When set up, all the properties and methods of this class would be available to your extending class via "this".
* @constructor
*
*
*
*
*
* @param specs {Object} An Object defining the specifics of the game.
*
*      The default value is:
*		{ gWidth:640, gHeight:320,cameraWidth:320, cameraHeight:320,
*		cameraFollowOffsetX:-160, cameraFollowOffsetY:0,  tileW:16, tileH:16,
*		spriteSheetImage: null, containerDivId:"container", rootDivId:"root",
*		controllerDivId:"controller", gameScale:2, useScreenOrganizer:true,startWidth:50, startHeight:25,
*		controllerHeight:144, initialLives:3, initPlayerPosition:new tabageos.MoverPoint(32,32),
*		gameLoop:null,initializationSpecifics:null,
*		addedResizeMethod:null, sceneResetSpecifics:null,fullResetSpecifics:null, additionalSceneResetSpecifics:null,
*		positionResetSpecifics:null, cameraType:2, backgroundColor:"#FFFFFF" }
*
*
*			@param specs.gWidth {Number} The total width of the game play area.
*					If set to more than 4000 it is assumed that setupForRenderFromMap is going to be used. This number should be less than 4000 unless your making an endless runner style game and therefore using the setupForRenderFromMap method on layer 2, the display layer.
*					To accomplish an endless not auto moving scene, you can use just 1 scene, when the player goes out of camera view left or right it would loop back,
*					or you can make many different scenes being sure to add each one to the sceneChanger using sceneChanger.addScene.
*			@param specs.gHeight {Number} The total height of the game play area. This number should be less than 4000.
*			@param specs.camearWidth {Number} The cameras width, if gWidth is bigger than this, the camera only shows what is within its viewport, and would need to move to show more.
*			@param specs.cameraHeight {Number} The cameras height, if gHeight is bigger, the camera only shows what is within its viewport, and would need to move to show more.
*			@param specs.cameraType {Number} defines if the camera should automatically move.
*				Setting camearType to 1 would make it follow the player around, by default the camera does not move, cameraType is 2 by default for the justRender method of the camera.
* 				To move it yourself in your loop method, you would set cameraType to 0, and in your loop method reference the camera as 'this.camera'.
* 				See BasicCamera for the various camera movement methods available, by default when cameraType is 1, this class will use the tweenedBlitLayerRender method of the camera.
*			@param specs.cameraFollowOffsetX {Number} defines the horizontal camera offset when following the player, the default is negative half the camera width.
*			@param specs.cameraFollowOffsetY {Number} defines the vertical camera offset when following the player, the default is 0, by default the camera only moves horizontally.
*						When cameraHeight and gHeight are the same, the camera does not need to move vertically. Same is true for horizontal gWidth and cameraWidth.
*			@param specs.backgroundColor {String} An html color value string that will be the background color of backgroundLayer. You can also draw to backgroudLayer to change the background.
*			@param specs.tileW {Number} defines the width of each tile in your sprite sheet. Default is 16.
*			@param specs.tileH {Number} defines the height of each tile in your sprite sheet. Default is 16.
*			@param specs.controllerHeight {Number} defines the height of the controller, the width will be the same as the cameraWidth.
*			@param specs.initialLives {Number} The initial amount of lives the player has, default is 3.
*			@param specs.initPlayerPosition {MoverPoint} A MoverPoint defining the initial player position on screen.
*			@param specs.spriteSheetImage {String} The name of your image, use the full path if it is not in the same folder as the games code. If this is null it is assumed to just draw squares.
*			                                       To streamline the loading of your sprite sheet this value needs to be set to 'streamline' and then you would use tabageos.loadSpriteSheetAndStart.
*           @param specs.containerDivId {String} The id of the html div that is the container of both root and controller.
*			@param specs.rootDivId {String} The id of the html div that is the games root, it should be inside of the container div and have nothing inside of it.
*			@param specs.controllerDivId {String} The id of the html div that will be the controller, it should be inside of container and underneath, not in, root. If this value is not set a controller is not created.
*
*
*	<div id="container" style="position:absolute;width:640px;">
*	  <div id="root" style="position:relative;width:640px;height:272px;"></div>
*	  <div id="controller" > </div>
*	</div>
*
*			@param specs.gameScale {Number} The scale of the game, 0 for no scale, 1 for full screen, greater than 1 for less than full screen, 2 is half size. 3 is smaller
*			@param specs.useScreenOrganizer {Boolean} Default is true, whether to use a ScreenOrganizer or not, if false no title screen or game over screen is set up.
*			@param specs.startWidth {Number} The width of the start button on the title screen. You can reference the start button itself with "this.startButton"
*											the start button is an html div element.
*			@param specs.startHeight {Number} The height of the start button on the title screen.
* 			@param specs.startLocations {MoverPoint} A MoverPoint defining the left and top position of the start button. The start button is a div referenced with this.startButton
*			@param specs.gameLoop {Function} your loop method that defines the specific mechanics of the game.
* 			@param specs.initializationSpecifics {Function} a method that does additional setup related things. Typically you would setup the player and levels in this method.
*			@param specs.addedResizeMethod {Function}  a method that does additional resizie related things, it would happen after the default resizing happens.
*														By default the game will fill the screen if gameScale is 1, it will not scale if gameScale is 0, and it will be smaller from values greater than 1.
*														when the game is smaller than the page it will be in the middle.
*														addedResizeMethod is sometimes needed in cases where you have other stuff on the page besides the game.
* 			@param specs.sceneResetSpecifics {Function} A method that would happen just before the scene is reset.
*														By default nothing happens on reset just the ScreenOrganizer will show the transition.
*														To have something happen create a method that does things (this method happens before the transition starts)
*														and pass it as this param or as specs.additionalSceneResetSpecifics. As with all these methods, the 'this' inside of them would be able to reference all GameSkeleton properties.
*
*
*			@param specs.fullResetSpecifics {Function} A method that would happen as the game is reseting to the title screen. Typically you would use this to clear out Objects you have created and to stop event listeners you have made.
*														If you have not added any objects other than defining the player, you would not have to worry about this method.
*														if you have for example many enemies made, this method would be used to destroy them before the game resets.
*
*			@param specs.additionalSceneResetSpecifics {Function} A method that is similar to sceneResetSpecifics but would happen when the transition covers the screen.
*															sceneResetSpecifics would happen before the transition, and additionalSceneResetSpecifics would happen when the screen is covered.
*
*
*			@param specs.topDownSceneChange {Number} If set to 1 then up and down scene changes will happen automatically as well. By default, when there is a sceneChanger being used, only left and right scene changes happen.
*			@param specs.underCoverSpecifics {Function} A method that would happen after the levelComplete method is used and the screen is covered. See levelComplete.
*			@param specs.useSceneChanger {Boolean} Default is true, by default a TileSceneChanger is being used referenced with this.sceneChanger. If you have more than one scene, or you want your character to be able to loop your one scene, scenes need to be added to the sceneChanger using this.sceneChanger.addScene.
*
*			@param specs.initForISO {Number} This needs to be set as 1 if your making an isometric scene using the iso classes.
*			@param specs.disableBackgroundAlpha {Number} Disable the backgroundLayer alpha, default is 1, it is disabled by default, by default the background has no alpha, if your doing parallax, or need background alpha you want to set this to 0.
*			@param specs.positionResetSpecifics {Function} A method that would change the position of the player during reset. By default the position of the player does not change on reset.
*
*			@param specs.beforeStartGameLoop {Function} An optional method to call that would happen just before the game loop is started
*
*			@param specs.tweenLimitX {Number} Optional defining of the cameras horizontal tween limit, default is 0.
*			@param specs.tweenLimitY {Number} Optional defining of the camera vertical tween limit, default is 0.
*
*			@param specs.cameraTweenType {String} Optional defining of the camera tween type default is 'InOutLinear'.
*			@param specs.enableGamePad {Boolean} Default is false, when true and the user has a usb game pad plugged in, when they press any directional button on their pad for the first time they will then be promted to assign each non-directional button. And then they'll be playing with their controller.
*													When usb game pad use is needed, instruct the user to press one of the directionals (not other buttons) and then to follow the on screen propmpts.
*													The GameSkeleton is using enableGamePad to control a call to ControllerPad.gamePadButtonsUserDefined and ControllerPad.handleGamePad. For more info about how usb game pad input works see ControllerPad.js
*													You can ignore this property and use the ControllerPad Class for yourself if for example you want to use predefined button configurations that you know all your users will have.
*			@param specs.frameRate {Number} Optional frameRate definition, default is 60.
*			@param specs.hudScale {Number} Default is same as gameScale, can be used to scale the hud differently
*			@param specs.walkthroughLink {String} Link for the question mark hud button. Default is an empty string. It would open in a new page. when this is not defined nothing happens when the question mark is selected.
*           @param specs.sceneChangeSpecifics {Function} An optional method that would happen as part of a BlitMath.dispatchFunctionAssignments call, it would be the method to act on each value in the map used in the sceneChagner.
*                                                           This method would receive a PatternActionEvent that would have tileValue, and x and y location in the map. The sceneChanger automatically changes scene maps in a default GameSkeleton setup.
*                                                           You add maps to the sceneChanger, define BlitMath.functionAssignments Array of tile values, and decalre what this function is ready to receive PatternActionEvents. This is normally the main setup method of each levels specifics.
*			@param specs.priorToSceneChange {Function} An optional method that would happen before a scene change. [not reset]
*			@param specs.afterSceneChange {Function} An optional method that would happen after a scene change. A scene reset is reseting the current scene, a scene change is changing to a different scene either by walking off screen or using the moveBackOneScene/FowardOneScene/gotoSceneByDoor/transitionToSceneByDoor methods.
*			@param specs.specialControllerUse {Boolean} If true then the controller is not automatically resized, and no buttons are set up. Default is false.
*														By default ControllerPad.basicControllerButtonSetup is used and ControllerPad.assignStartAndBackMethods is used to assign this.maybeStartGame and this.maybeGoBack to the start and back controller buttons.
*           @param specs.onSelectLevel {Function} An optional method that would happen when a level is selected from the built in level select screen.
*
*/
declare function GameSkeleton(specs: {
    gWidth: number;
    gHeight: number;
    camearWidth: number;
    cameraHeight: number;
    cameraType: number;
    cameraFollowOffsetX: number;
    cameraFollowOffsetY: number;
    backgroundColor: string;
    tileW: number;
    tileH: number;
    controllerHeight: number;
    initialLives: number;
    initPlayerPosition: MoverPoint;
    spriteSheetImage: string;
    containerDivId: string;
    rootDivId: string;
    controllerDivId: string;
    gameScale: number;
    useScreenOrganizer: boolean;
    startWidth: number;
    startHeight: number;
    startLocations: MoverPoint;
    gameLoop: Function;
    initializationSpecifics: Function;
    addedResizeMethod: Function;
    sceneResetSpecifics: Function;
    fullResetSpecifics: Function;
    additionalSceneResetSpecifics: Function;
    topDownSceneChange: number;
    underCoverSpecifics: Function;
    useSceneChanger: boolean;
    initForISO: number;
    disableBackgroundAlpha: number;
    positionResetSpecifics: Function;
    beforeStartGameLoop: Function;
    tweenLimitX: number;
    tweenLimitY: number;
    cameraTweenType: string;
    enableGamePad: boolean;
    frameRate: number;
    hudScale: number;
    walkthroughLink: string;
    sceneChangeSpecifics: Function;
    priorToSceneChange: Function;
    afterSceneChange: Function;
    specialControllerUse: boolean;
    onSelectLevel: Function;
}): void;
declare class GameSkeleton {
    constructor(specs: {
        gWidth: number;
        gHeight: number;
        camearWidth: number;
        cameraHeight: number;
        cameraType: number;
        cameraFollowOffsetX: number;
        cameraFollowOffsetY: number;
        backgroundColor: string;
        tileW: number;
        tileH: number;
        controllerHeight: number;
        initialLives: number;
        initPlayerPosition: MoverPoint;
        spriteSheetImage: string;
        containerDivId: string;
        rootDivId: string;
        /**
        *
        *    your loop method that defines the specific mechanics of the game
        *    @type Function
        * @memberof GameSkeleton
        *
        */
        controllerDivId: string;
        gameScale: number;
        useScreenOrganizer: boolean;
        startWidth: number;
        startHeight: number;
        startLocations: MoverPoint;
        gameLoop: Function;
        initializationSpecifics: Function;
        addedResizeMethod: Function;
        sceneResetSpecifics: Function;
        fullResetSpecifics: Function;
        additionalSceneResetSpecifics: Function;
        topDownSceneChange: number;
        underCoverSpecifics: Function;
        useSceneChanger: boolean;
        initForISO: number;
        disableBackgroundAlpha: number;
        positionResetSpecifics: Function;
        beforeStartGameLoop: Function;
        tweenLimitX: number;
        tweenLimitY: number;
        cameraTweenType: string;
        enableGamePad: boolean;
        frameRate: number;
        hudScale: number;
        walkthroughLink: string;
        sceneChangeSpecifics: Function;
        priorToSceneChange: Function;
        afterSceneChange: Function;
        specialControllerUse: boolean;
        onSelectLevel: Function;
    });
    /**
    *
    *    Constructs a new GameSkeleton instance, this constructor should generally not be used.
    *		To use the GameSkeleton class you should extend it. Create a class that will extend GameSkeleton and within that class constructior call  GameSkeleton.call(this, specs);
    *
    *		function MyGame() {
    *			var specs = { ... };//see below for details of the specs Object.
    *			tabageos.GameSkeleton.call(this, specs);
    *		}
    * 		MyGame.prototype = Object.create(tabageos.GameSkeleton.prototype);
    *		MyGame.prototype.setupSpecifics = function() {
    *			//your game setup specifics, all properties of GameSkeleton available via 'this'
    *			//skin related stuffs would happen here, title styling, level setup, etc...
    *		};
    *		MyGame.prototype.loop = function(ts) {
    *			//your specific game mechanics, all properties of GameSkeleton available via 'this'
    *			//the meat of the game goes here, stuff that should happen every frame.
    *		};
    *	 	new MyGame();
    *
    *       OR
    *
    *       class MyGame extends tabageos.GameSkeleton {
    *           constructor() {
    *                super();
    *                var gameSpecs = {...};
    *                this.initialConstruction(gameSpecs);
    *           }
    *           setupSpecifics = function() {
    *
    *           }
    *           loop = function(ts) {
    *
    *           }
    *
    *       }
    *       new MyGame();
    *
    *
    * @class GameSkeleton
    * @classdesc Game framework Class. Organizes the use of the various tabageos Classes for the creation of a game with title screen, main camera and game over screen.
    *                               Has just about everything needed for the framing of any game.
    *    The way it should be used is to extend it via the Object.create method, then in the constructor function you call; GameSkeleton.call(this,specs);
    *    When set up, all the properties and methods of this class would be available to your extending class via "this".
    * @constructor
    *
    *
    *
    *
    *
    * @param specs {Object} An Object defining the specifics of the game.
    *
    *      The default value is:
    *		{ gWidth:640, gHeight:320,cameraWidth:320, cameraHeight:320,
    *		cameraFollowOffsetX:-160, cameraFollowOffsetY:0,  tileW:16, tileH:16,
    *		spriteSheetImage: null, containerDivId:"container", rootDivId:"root",
    *		controllerDivId:"controller", gameScale:2, useScreenOrganizer:true,startWidth:50, startHeight:25,
    *		controllerHeight:144, initialLives:3, initPlayerPosition:new tabageos.MoverPoint(32,32),
    *		gameLoop:null,initializationSpecifics:null,
    *		addedResizeMethod:null, sceneResetSpecifics:null,fullResetSpecifics:null, additionalSceneResetSpecifics:null,
    *		positionResetSpecifics:null, cameraType:2, backgroundColor:"#FFFFFF" }
    *
    *
    *			@param specs.gWidth {Number} The total width of the game play area.
    *					If set to more than 4000 it is assumed that setupForRenderFromMap is going to be used. This number should be less than 4000 unless your making an endless runner style game and therefore using the setupForRenderFromMap method on layer 2, the display layer.
    *					To accomplish an endless not auto moving scene, you can use just 1 scene, when the player goes out of camera view left or right it would loop back,
    *					or you can make many different scenes being sure to add each one to the sceneChanger using sceneChanger.addScene.
    *			@param specs.gHeight {Number} The total height of the game play area. This number should be less than 4000.
    *			@param specs.camearWidth {Number} The cameras width, if gWidth is bigger than this, the camera only shows what is within its viewport, and would need to move to show more.
    *			@param specs.cameraHeight {Number} The cameras height, if gHeight is bigger, the camera only shows what is within its viewport, and would need to move to show more.
    *			@param specs.cameraType {Number} defines if the camera should automatically move.
    *				Setting camearType to 1 would make it follow the player around, by default the camera does not move, cameraType is 2 by default for the justRender method of the camera.
    * 				To move it yourself in your loop method, you would set cameraType to 0, and in your loop method reference the camera as 'this.camera'.
    * 				See BasicCamera for the various camera movement methods available, by default when cameraType is 1, this class will use the tweenedBlitLayerRender method of the camera.
    *			@param specs.cameraFollowOffsetX {Number} defines the horizontal camera offset when following the player, the default is negative half the camera width.
    *			@param specs.cameraFollowOffsetY {Number} defines the vertical camera offset when following the player, the default is 0, by default the camera only moves horizontally.
    *						When cameraHeight and gHeight are the same, the camera does not need to move vertically. Same is true for horizontal gWidth and cameraWidth.
    *			@param specs.backgroundColor {String} An html color value string that will be the background color of backgroundLayer. You can also draw to backgroudLayer to change the background.
    *			@param specs.tileW {Number} defines the width of each tile in your sprite sheet. Default is 16.
    *			@param specs.tileH {Number} defines the height of each tile in your sprite sheet. Default is 16.
    *			@param specs.controllerHeight {Number} defines the height of the controller, the width will be the same as the cameraWidth.
    *			@param specs.initialLives {Number} The initial amount of lives the player has, default is 3.
    *			@param specs.initPlayerPosition {MoverPoint} A MoverPoint defining the initial player position on screen.
    *			@param specs.spriteSheetImage {String} The name of your image, use the full path if it is not in the same folder as the games code. If this is null it is assumed to just draw squares.
    *			                                       To streamline the loading of your sprite sheet this value needs to be set to 'streamline' and then you would use tabageos.loadSpriteSheetAndStart.
    *           @param specs.containerDivId {String} The id of the html div that is the container of both root and controller.
    *			@param specs.rootDivId {String} The id of the html div that is the games root, it should be inside of the container div and have nothing inside of it.
    *			@param specs.controllerDivId {String} The id of the html div that will be the controller, it should be inside of container and underneath, not in, root. If this value is not set a controller is not created.
    *
    *
    *	<div id="container" style="position:absolute;width:640px;">
    *	  <div id="root" style="position:relative;width:640px;height:272px;"></div>
    *	  <div id="controller" > </div>
    *	</div>
    *
    *			@param specs.gameScale {Number} The scale of the game, 0 for no scale, 1 for full screen, greater than 1 for less than full screen, 2 is half size. 3 is smaller
    *			@param specs.useScreenOrganizer {Boolean} Default is true, whether to use a ScreenOrganizer or not, if false no title screen or game over screen is set up.
    *			@param specs.startWidth {Number} The width of the start button on the title screen. You can reference the start button itself with "this.startButton"
    *											the start button is an html div element.
    *			@param specs.startHeight {Number} The height of the start button on the title screen.
    * 			@param specs.startLocations {MoverPoint} A MoverPoint defining the left and top position of the start button. The start button is a div referenced with this.startButton
    *			@param specs.gameLoop {Function} your loop method that defines the specific mechanics of the game.
    * 			@param specs.initializationSpecifics {Function} a method that does additional setup related things. Typically you would setup the player and levels in this method.
    *			@param specs.addedResizeMethod {Function}  a method that does additional resizie related things, it would happen after the default resizing happens.
    *														By default the game will fill the screen if gameScale is 1, it will not scale if gameScale is 0, and it will be smaller from values greater than 1.
    *														when the game is smaller than the page it will be in the middle.
    *														addedResizeMethod is sometimes needed in cases where you have other stuff on the page besides the game.
    * 			@param specs.sceneResetSpecifics {Function} A method that would happen just before the scene is reset.
    *														By default nothing happens on reset just the ScreenOrganizer will show the transition.
    *														To have something happen create a method that does things (this method happens before the transition starts)
    *														and pass it as this param or as specs.additionalSceneResetSpecifics. As with all these methods, the 'this' inside of them would be able to reference all GameSkeleton properties.
    *
    *
    *			@param specs.fullResetSpecifics {Function} A method that would happen as the game is reseting to the title screen. Typically you would use this to clear out Objects you have created and to stop event listeners you have made.
    *														If you have not added any objects other than defining the player, you would not have to worry about this method.
    *														if you have for example many enemies made, this method would be used to destroy them before the game resets.
    *
    *			@param specs.additionalSceneResetSpecifics {Function} A method that is similar to sceneResetSpecifics but would happen when the transition covers the screen.
    *															sceneResetSpecifics would happen before the transition, and additionalSceneResetSpecifics would happen when the screen is covered.
    *
    *
    *			@param specs.topDownSceneChange {Number} If set to 1 then up and down scene changes will happen automatically as well. By default, when there is a sceneChanger being used, only left and right scene changes happen.
    *			@param specs.underCoverSpecifics {Function} A method that would happen after the levelComplete method is used and the screen is covered. See levelComplete.
    *			@param specs.useSceneChanger {Boolean} Default is true, by default a TileSceneChanger is being used referenced with this.sceneChanger. If you have more than one scene, or you want your character to be able to loop your one scene, scenes need to be added to the sceneChanger using this.sceneChanger.addScene.
    *
    *			@param specs.initForISO {Number} This needs to be set as 1 if your making an isometric scene using the iso classes.
    *			@param specs.disableBackgroundAlpha {Number} Disable the backgroundLayer alpha, default is 1, it is disabled by default, by default the background has no alpha, if your doing parallax, or need background alpha you want to set this to 0.
    *			@param specs.positionResetSpecifics {Function} A method that would change the position of the player during reset. By default the position of the player does not change on reset.
    *
    *			@param specs.beforeStartGameLoop {Function} An optional method to call that would happen just before the game loop is started
    *
    *			@param specs.tweenLimitX {Number} Optional defining of the cameras horizontal tween limit, default is 0.
    *			@param specs.tweenLimitY {Number} Optional defining of the camera vertical tween limit, default is 0.
    *
    *			@param specs.cameraTweenType {String} Optional defining of the camera tween type default is 'InOutLinear'.
    *			@param specs.enableGamePad {Boolean} Default is false, when true and the user has a usb game pad plugged in, when they press any directional button on their pad for the first time they will then be promted to assign each non-directional button. And then they'll be playing with their controller.
    *													When usb game pad use is needed, instruct the user to press one of the directionals (not other buttons) and then to follow the on screen propmpts.
    *													The GameSkeleton is using enableGamePad to control a call to ControllerPad.gamePadButtonsUserDefined and ControllerPad.handleGamePad. For more info about how usb game pad input works see ControllerPad.js
    *													You can ignore this property and use the ControllerPad Class for yourself if for example you want to use predefined button configurations that you know all your users will have.
    *			@param specs.frameRate {Number} Optional frameRate definition, default is 60.
    *			@param specs.hudScale {Number} Default is same as gameScale, can be used to scale the hud differently
    *			@param specs.walkthroughLink {String} Link for the question mark hud button. Default is an empty string. It would open in a new page. when this is not defined nothing happens when the question mark is selected.
    *           @param specs.sceneChangeSpecifics {Function} An optional method that would happen as part of a BlitMath.dispatchFunctionAssignments call, it would be the method to act on each value in the map used in the sceneChagner.
    *                                                           This method would receive a PatternActionEvent that would have tileValue, and x and y location in the map. The sceneChanger automatically changes scene maps in a default GameSkeleton setup.
    *                                                           You add maps to the sceneChanger, define BlitMath.functionAssignments Array of tile values, and decalre what this function is ready to receive PatternActionEvents. This is normally the main setup method of each levels specifics.
    *			@param specs.priorToSceneChange {Function} An optional method that would happen before a scene change. [not reset]
    *			@param specs.afterSceneChange {Function} An optional method that would happen after a scene change. A scene reset is reseting the current scene, a scene change is changing to a different scene either by walking off screen or using the moveBackOneScene/FowardOneScene/gotoSceneByDoor/transitionToSceneByDoor methods.
    *			@param specs.specialControllerUse {Boolean} If true then the controller is not automatically resized, and no buttons are set up. Default is false.
    *														By default ControllerPad.basicControllerButtonSetup is used and ControllerPad.assignStartAndBackMethods is used to assign this.maybeStartGame and this.maybeGoBack to the start and back controller buttons.
    *           @param specs.onSelectLevel {Function} An optional method that would happen when a level is selected from the built in level select screen.
    *
    */
    constructor(specs: {
        gWidth: number;
        gHeight: number;
        camearWidth: number;
        cameraHeight: number;
        cameraType: number;
        cameraFollowOffsetX: number;
        cameraFollowOffsetY: number;
        backgroundColor: string;
        tileW: number;
        tileH: number;
        controllerHeight: number;
        initialLives: number;
        initPlayerPosition: MoverPoint;
        spriteSheetImage: string;
        containerDivId: string;
        rootDivId: string;
        controllerDivId: string;
        gameScale: number;
        useScreenOrganizer: boolean;
        startWidth: number;
        startHeight: number;
        startLocations: MoverPoint;
        gameLoop: Function;
        initializationSpecifics: Function;
        addedResizeMethod: Function;
        sceneResetSpecifics: Function;
        fullResetSpecifics: Function;
        additionalSceneResetSpecifics: Function;
        topDownSceneChange: number;
        underCoverSpecifics: Function;
        useSceneChanger: boolean;
        initForISO: number;
        disableBackgroundAlpha: number;
        positionResetSpecifics: Function;
        beforeStartGameLoop: Function;
        tweenLimitX: number;
        tweenLimitY: number;
        cameraTweenType: string;
        enableGamePad: boolean;
        frameRate: number;
        hudScale: number;
        walkthroughLink: string;
        sceneChangeSpecifics: Function;
        priorToSceneChange: Function;
        afterSceneChange: Function;
        specialControllerUse: boolean;
        onSelectLevel: Function;
    });
    /**
    *
    *
    *  The actual class construction method, for use after a super call, it is used during construction or a super call if specs are passed.
    *  To extend the GameSkeleton with es6 class syntax and the use of 'this' in the specs Object, first call super without a param, then this method with a specs Object.
    *
    * @memberof GameSkeleton.prototype
    * @method initialConstruction
    *
    * @param specs {Object}
    */
    initialConstruction(specs: any): void;
    gameWidth: number;
    gameHeight: number;
    tileWidth: any;
    tileHeight: any;
    lives: any;
    controllerHeight: any;
    initialPlayerPosition: any;
    cameraWidth: any;
    cameraHeight: any;
    cameraFollowOffsetX: any;
    cameraFollowOffsetY: any;
    _initLives: any;
    _scaleRectRef: Rectangle;
    gameFunction: Function;
    addedInitializationMethod: Function;
    addedResizeMethod: Function;
    sceneResetSpecifics: Function;
    sceneChangeSpecifics: Function;
    fullResetSpecifics: Function;
    additionalSceneResetSpecifics: Function;
    positionResetSpecifics: Function;
    _cameraType: any;
    backgroundColor: any;
    disableBackgroundAlpha: any;
    initForISO: number;
    beforeStartGameLoop: Function;
    useSceneChanger: number;
    tweenLimitX: any;
    tweenLimitY: any;
    cameraTweenType: string;
    frameRate: number;
    _helperPoint: MoverPoint;
    _helperRect: Rectanlge;
    gameScale: any;
    hudScale: any;
    walkthroughLink: string;
    topDownSceneChange: number;
    startLocations: MoverPoint;
    enableGamePad: number;
    underCoverSpecifics: Function;
    priorToSceneChange: Function;
    afterSceneChange: Function;
    autoPause: number;
    _manuelControllerUse: any;
    __specs: any;
    /**
    *
    *    If 1 then the device being used is a touch device.
    *
    * @memberof GameSkeleton
    *
    */
    device: number;
    /**
    *
    *    Denotes if the game is paused. Use the pause method to pause and unpause the game.
    *
    * @memberof GameSkeleton
    *
    */
    paused: number;
    /**
    *
    *    @private
    *
    * @memberof GameSkeleton.prototype
    *
    */
    private _thrott;
    /**
    *
    *    @private
    *
    * @memberof GameSkeleton.prototype
    *
    */
    private _ts;
    /**
    *
    *    @private
    *
    * @memberof GameSkeleton.prototype
    *
    */
    private _textTime;
    /**
    *
    *    @private
    *
    * @memberof GameSkeleton.prototype
    *
    */
    private _doReset;
    /**
    *
    *    @private
    *
    * @memberof GameSkeleton
    *
    */
    private _doAlternate;
    /**
    *   The displayed CanvasObject controlled by the camera.
    *    @type CanvasObject
    *
    * @memberof GameSkeleton
    *
    */
    cameraLayer: CanvasObject;
    /**
    *   The background, bottom most layer added as a layer for the camera to draw from.
    *    @type CanvasObject
    *
    * @memberof GameSkeleton
    *
    */
    backgroundLayer: CanvasObject;
    /**
    *   The display is where the scene is drawn it is on top of background, camera draws from it after backgroundLayer.
    *    @type CanvasObject
    *
    * @memberof GameSkeleton
    *
    */
    display: CanvasObject;
    /**
    *
    *    charLayer is where characters and projectiles and scenery objects are drawn it's drawn on top of display.
    *  @type CanvasObject
    *
    * @memberof GameSkeleton
    *
    */
    charLayer: CanvasObject;
    /**
    *
    *    @type BasicCamera
    *
    * @memberof GameSkeleton
    *
    */
    camera: BasicCamera;
    /**
    *
    *
    *    @type TileSceneChanger
    * @memberof GameSkeleton
    *
    */
    sceneChanger: TileSceneChanger;
    /**
    *   This CanvasObjectContainer gets added as the first screen to the ScreenOrganizer.
    *   cameraLayer is added as the second screen and gameOverContainer is the last screen.
    *   You can add html to the div property of a CanvasObjectContainer,
    *   or you can draw to its floor property which is a CanvasObject.
    *
    *    @type CanvasObjectContainer
    *
    * @memberof GameSkeleton
    *
    */
    title: CanvasObjectContainer;
    /**
    *   A reference to the ControllerPad instance
    *
    *  @type ControllerPad
    * @memberof GameSkeleton
    *
    */
    controller: ControllerPad;
    /**
    *   This CanvasObjectContainer gets added as the last screen to the screenOrganizer.
    *
    *    @type CanvasObjectContainer
    *
    * @memberof GameSkeleton
    *
    */
    gameOverContainer: CanvasObjectContainer;
    /**
    *
    *    The player property needs to be defined.
    *    Normally you would define this property during initializationSpecifics.
    *    This property is referenced by various methods and needs to be a MapMover/MapTraveler or extension of.
    *
    * @memberof GameSkeleton
    *
    */
    player: any;
    /**
    *   By default this gets set up as a IrisScreenOrganizer with title, cameraLayer, and gameOverContainer screens.
    *    @type ScreenOrganizer
    *
    * @memberof GameSkeleton
    *
    */
    screenOrganizer: ScreenOrganizer;
    /**
    *
    *   A reference to the sprite sheet being drawn from. This is defined in the specs Object during construction as spriteSheetImage, see the specs Object in the constructor.
    *
    *   You can also load an Img into this param however you want, this property is what is used as the sprite sheet for the game.
    *
    *   see also tabageos.loadSpriteSheetAndStart
    *
    * @memberof GameSkeleton
    *
    */
    _image: any;
    /**
    *
    *    When 1 the it is assumed that root is being resized on a desktop.
    *
    *
    * @memberof GameSkeleton
    *
    */
    resizeRootForNoTouch: number;
    /**
    *
    *    Don't resize vertically during resize, default is 0.
    *
    * @memberof GameSkeleton
    *
    */
    dontResizeVertical: number;
    /**
    *
    *    Don't resize horizontally during resize, default is 0.
    *
    * @memberof GameSkeleton
    *
    */
    dontResizeHorizontal: number;
    /**
    *
    *    When set to greater than 0 the camera will constantly move horizontal instead of following the player.
    *
    * @memberof GameSkeleton
    *
    */
    horizontalCameraMove: number;
    /**
    *
    *    When set to greater than 0 the camera will constantly move vertically instead of following the player.
    *
    * @memberof GameSkeleton
    *
    */
    verticalCameraMove: number;
    /**
    *
    *   The frame time, calculated based on frameRate.
    *    @type Number
    * @memberof GameSkeleton
    *
    */
    frameTime: number;
    /**
    *   A method that will replace the loop method,
    *      and   methods utilize this functionality.
    *    @type Function
    *
    * @memberof GameSkeleton
    *
    */
    alternateLoopMethod: Function;
    /**
    *
    *    A reference to the html div element that is the games hud in the right hand upper corner.
    *    It has pause mute reset exit and help buttons.
    *    It is automatically set up as part of construction.
    *
    * @memberof GameSkeleton
    *
    */
    _HUD: any;
    /**
    *
    *    An html div that is part of the hud.
    *
    * @memberof GameSkeleton
    *
    */
    hPause: any;
    /**
    *
    *    An html div that is part of the hud.
    *
    * @memberof GameSkeleton
    *
    */
    hReset: any;
    /**
    *
    *    An html div that is part of the hud.
    *
    * @memberof GameSkeleton
    *
    */
    hMute: any;
    /**
    *
    *    An html div that is part of the hud.
    *
    * @memberof GameSkeleton
    *
    */
    hExit: any;
    /**
    *
    *    An html div that is part of the hud.
    *
    * @memberof GameSkeleton
    *
    */
    hWalkthrough: any;
    /**
    *
    *    An html div that is in the top left corner that contains the _healthBar and _scoreTextDisplay html divs.
    *    use showHealthBar/hideHealthBar showScoreText/hideScoreText to show/hide and style the playerHUD area.
    *
    * @memberof GameSkeleton
    *
    */
    _playerHUD: any;
    /**
    *
    *    Inside of _playerHUD by default on the top left of the screen.
    *
    * @memberof GameSkeleton
    *
    */
    _healthBar: any;
    /**
    *
    *    Inside of _playerHUD by default on the top left of the screen.
    *
    * @memberof GameSkeleton
    *
    */
    _scoreTextDisplay: any;
    /**
    *
    *
    * @memberof GameSkeleton
    * @type SoundSystem
    *
    *
    */
    soundSystem: SoundSystem;
    /**
    *
    *  If 1 then sounds and music will not be heard.
    *   Change with the muteUnmute method.
    *
    * @memberof GameSkeleton
    *
    *
    *
    */
    _mute: number;
    /**
    *
    *
    * an offscreen canvas used to display light areas, initializeLights creates it.
    *
    * @memberof GameSkeleton
    * @type CanvasObject
    */
    _lightCanvas: CanvasObject;
    /**
    * Call this first to set up lighting.
    *  Then just call readyLights or animateLights,
    *  and then readyAdditionalLights or animateAdditionalLights if needing more than 1 light.
    *  a dim as 1 and composion as 1 causes the whole screen to be black except for the light areas.
    *  Performance actually increases significantly when that is done because most of the screen becomes just black.
    *  But a 2 composition and decimal dim values will slow down the game if used in too large of an area or with too many lights.
    *  But if what your after is a grey day effect or some similar color application to the whole scene a decimal dim and some color value with a 2 composition is what to use.
    *  If you want for example fire to be lit around the player, a dim of 1 with red as the color and 2 as composition would allow for that, and you'd have a colored fire animation that you'd then pass to animateLights.
    *
    *  @memberof GameSkeleton.prototype
    *  @method initializeLights
    *  @param dim {Number}
    *  @param color {Number}
    *  @param composition {Number}
    *
    */
    initializeLights(dim: number, color: number, composition: number): boolean;
    _lightDim: number;
    /**
    *
    * @memberof GameSkeleton.prototype
    * @method changeLightShade
    *
    * @param dim {Number} Will be the globalAlpha value of the lightCanvas context.
    * @param color {Number} Will be the fillStyle of the lightCanvas context.
    */
    changeLightShade(dim: number, color: number): void;
    /**
    *
    * Sets _lightCanvas globalAlpha to dim or _lightDim and clears the _lightCanvas
    *
    *
    * @memberof GameSkeleton.prototype
    * @method turnOffLights
    *
    * @param dim {Number}
    * @param apply {Boolean}
    */
    turnOffLights(dim: number, apply: boolean): void;
    /**
    *
    *   Draws from this._image onto the _lightCanvas, and applies _lightCanvas if the apply param is set.
    *   This method is used by readyLights and readyAdditionalLights, animateLights and animateAdditionalLights.
    *
    * @memberof GameSkeleton.prototype
    * @method turnOnLights
    *
    * @param fromRect {Rectangle}
    * @param toX {Number}
    * @param toY {Number}
    * @param apply {Boolean}
    */
    turnOnLights(fromRect: Rectangle, toX: number, toY: number, apply: boolean): void;
    /**
    *
    *  Determines the initial composition mode for lighting. Default is 'destination-in'.
    *
    * @memberof GameSkeleton
    *
    *
    *
    */
    _lightComp: string;
    /**
    *
    *  will return the current composition type when nothing is passed.
    *
    * @memberof GameSkeleton.prototype
    * @method lightType
    *
    *
    * @param number {Number} 1 is 'destination-in' and 2 is 'multiply' 0 would have it return whatever _lightComp is currently set to.
    * @return {String}
    *
    */
    lightType(number: number): string;
    /**
    *
    *  After calling initializeLights, call this method to turn on and apply one instance of lights.
    *
    *
    * @memberof GameSkeleton.prototype
    * @method readyLights
    *
    * @param fromRect {Rectangle} Where in the _image to copy the lights from.
    * @param toX {Number} x location to place the light
    * @param toY {Number} y location to place the light
    * @param composition {Number} 1 for destination-in  2 for multiply. To define another do not pass this property and instead change the _lightComp protperty.
    */
    readyLights(fromRect: Rectangle, toX: number, toY: number, composition: number): void;
    /**
    *
    *  To turn on additional lights, after initializeLights and readyLights have been used, call this method.
    *  readyLights turns on the first instance of a light, calling it again will first turn off any lights
    *
    * @memberof GameSkeleton.prototype
    * @method readyAdditionalLights
    *
    * @param fromRect {Rectangle}
    * @param toX {Number}
    * @param toY {Number}
    * @param composition {Boolean}
    */
    readyAdditionalLights(fromRect: Rectangle, toX: number, toY: number, composition: boolean): void;
    /**
    *
    * This method turns on the first instance of animated light.
    *  To display the animation call this method during a loop.
    *
    * @memberof GameSkeleton.prototype
    * @method animateLights
    *
    * @param canvasAnimation {CanvasAnimation} A CanvasAnimation defining the lights animation from the _image
    * @param toX {Number} the x position of where to place the light
    * @param toY {Number} the y placement of the light
    * @param speed {Number} The desired speed of the animation, default is .5
    * @param composition {Boolean} 1 for destination-in  2 for multiply. To define another do not pass this property and instead change the _lightComp protperty.
    */
    animateLights(canvasAnimation: CanvasAnimation, toX: number, toY: number, speed: number, composition: boolean): void;
    /**
    *
    *  Displays and animates additional animated light.
    *  To display the animation call this method in a loop.
    *
    *  For multiple animated lights the methods used would be
    *   initializeLights, then animateLights then as many calls to animateAdditionalLights for each additional light.
    *   And both animateLights and the animateAdditionalLights calls would need to repeat in the main loop.
    *
    * @memberof GameSkeleton.prototype
    * @method animateAdditionalLights
    *
    * @param canvasAnimation {CanvasAnimation}
    * @param toX {Number}
    * @param toY {Number}
    * @param speed {Number}
    * @param composition {Boolean}
    */
    animateAdditionalLights(canvasAnimation: CanvasAnimation, toX: number, toY: number, speed: number, composition: boolean): void;
    _doLights: number;
    /**
    *
    * @memberof GameSkeleton.prototype
    * @method applyLights
    *
    *
    */
    applyLights(): void;
    /**
    *
    * if applyLights has been called (readyLights, animateLights and related methods all call applyLights internally)
    * this method happens in _loop after the cameras tweenedBlitLayerRender method
    * cameras cameraLayer globalCompositeOperation is changed to this._lightComp then it copys the _lightCanvas
    * then its globalCompositeOperation is changed back to source-over.
    *
    * @memberof GameSkeleton.prototype
    * @method _actualApplyLights
    *
    *
    */
    _actualApplyLights(): void;
    /**
    *
    *   Used to see if two 1d Arrays match, can be used with Numbers as well
    *
    *
    * @memberof GameSkeleton.prototype
    * @method valuesMatch
    * @param v1 {Array}
    * @param v2 {Array}
    * @return {Boolean}
    *
    *
    */
    valuesMatch(v1: any[], v2: any[]): boolean;
    __buttons: any[];
    /**
    *
    *   Returns the button with the given name.
    *
    *
    * @memberof GameSkeleton.prototype
    * @method getButton
    * @param name {String}
    * @return {HTMLDivElement}
    *
    *
    */
    getButton(name: string): HTMLDivElement;
    /**
    *
    *   Creates a clickable,touchable button.
    *
    *
    * @memberof GameSkeleton.prototype
    * @method makeButton
    * @param name {String} The name for the button, must be unique
    * @param x {Number} The x location of the button on the whole game size.
    * @param y {Number} The y location of the button
    * @param width {Number} The width of the button
    * @param height {Number} The height of the button
    * @param methodToCallString {String} The name of the method to call when the button is selected. This method should exist on an extension of GameSkeleton or be one of the GameSkeleton methods, for example pause.
    * @param altString {String} The string to show when a player hovers over the button
    * @param linkString {String} a link string to a website, if this is set then the button will be an 'a' element instead of a div element, and the link would open in a new page.
    * @param forTitle {Boolen} If this is set the button will be labeled to be on the title screen instead of the main container.
    *
    *
    *
    */
    makeButton(name: string, x: number, y: number, width: number, height: number, methodCallString: any, altString: string, linkString: string, forTitle: Boolen): void;
    /**
    *
    *   Removes all buttons including the start button.
    *
    *
    * @memberof GameSkeleton.prototype
    * @method removeAllButtons
    *
    *
    *
    */
    removeAllButtons(): void;
    /**
    *
    *   Replaces all buttons including the start button.
    *
    *
    * @memberof GameSkeleton.prototype
    * @method replaceAllButtons
    *
    *
    *
    */
    replaceAllButtons(): void;
    /**
    *
    *   Trashes the button with the given name, it would have to be remade.
    *  Call removeButton first if your trying to destroy the button.
    *
    * @memberof GameSkeleton.prototype
    * @method trashButton
    * @param name {String} The name of the button to trash
    *
    *
    *
    */
    trashButton(name: string): void;
    /**
    *
    *   Trashes all buttons. Call removeAllButtons first in order to destroy all buttons.
    *
    *
    * @memberof GameSkeleton.prototype
    * @method trashAllButtons
    *
    *
    *
    *
    */
    trashAllButtons(): void;
    /**
    *
    *   Removes the default start button from the title screen
    *
    *
    * @memberof GameSkeleton.prototype
    * @method removeStartButton
    *
    *
    *
    *
    */
    removeStartButton(): void;
    /**
    *
    *   Appends the default start button on the title screen.
    *
    *
    * @memberof GameSkeleton.prototype
    * @method appendStartButton
    *
    *
    *
    *
    */
    appendStartButton(): void;
    /**
    *
    *   Removes the button with the given name.
    *
    *
    * @memberof GameSkeleton.prototype
    * @method removeButton
    * @param name {String} The name of the button to remove
    * @param fromTitle {Boolean} optionally signify that the button is on the title screen
    *
    *
    *
    */
    removeButton(name: string, fromTitle: boolean): void;
    /**
    *
    *   Appends the button with the given name.
    *
    *
    * @memberof GameSkeleton.prototype
    * @method appendButton
    * @param name {String} The name of the button to append
    * @param toTitle {Boolean} optionally signify that the button is to be on the title screen
    *
    *
    *
    */
    appendButton(name: string, toTitle: boolean): void;
    /**
    *
    *   Sets up pause, home, mute, and link buttons.
    *   After calling this method, use appendStandardButtons to place them, and removeStandardButtons to remove them.
    *
    *
    * @memberof GameSkeleton.prototype
    * @method setupStandardButtons
    * @param pauseX {Number} x location of pause
    * @param pauseY {Number} y location of pause
    * @param pw {Number} width of pause, default is 16
    * @param ph {Number} height of pause, default is 16
    * @param homeeX {Number} x location of home button
    * @param homeY {Number} y location of home
    * @param hw {Number} width of home, default is 16
    * @param hh {Number} height of home, default is 16
    * @param muteX {Number} x location of mute button
    * @param muteY {Number} y location of mute
    * @param mw {Number} width of mute, default is 16
    * @param mh {Number} height of mute, default is 16
    * @param linkX {Number} x location of link button
    * @param linkY {Number} y location of link
    * @param lw {Number} width of link, default is 16
    * @param lh {Number} height of link, default is 16
    * @param linkaltstring {String} A string for the link title
    * @param thelink {String} The http link string, for example https://www.tabageos.com
    *
    *
    *
    *
    *
    *
    *
    *
    *
    *
    *
    *
    *
    */
    setupStandardButtons(pauseX: number, pauseY: number, pw: number, ph: number, homeX: any, homeY: number, hw: number, hh: number, muteX: number, muteY: number, mw: number, mh: number, linkX: number, linkY: number, lw: number, lh: number, linkaltstring: string, thelink: string): void;
    /**
    *
    *
    *   After calling setupStandardButtons, use appendStandardButtons to place them, and removeStandardButtons to remove them.
    *
    *
    * @memberof GameSkeleton.prototype
    * @method appendStandardButtons
    *
    *
    */
    appendStandardButtons(): void;
    /**
    *
    *
    *   After calling setupStandardButtons, use appendStandardButtons to place them, and removeStandardButtons to remove them.
    *
    *
    * @memberof GameSkeleton.prototype
    * @method removeStandardButtons
    *
    *
    */
    removeStandardButtons(): void;
    /**
    *
    *
    *   Use to setup a Level Select (named "levelSelect") button on the title screen and initialize level select functionality.
    *   Your GameSkeleton extension needs to be using a sceneChanger (which is the default) in order for level select to work.
    *
    * @memberof GameSkeleton.prototype
    * @method setupLevelSelect
    * @param lsButtonX {Number} x location of the level select button
    * @param lsButtonY {Number} y location of the level select button
    * @param lsButtonWidth {Number} width of the level select button
    * @param lsButtonHeight {Number} height of the level select button
    * @param amountOfLevels {Number} amount of levels, default max is 38, see the __levelSelectSpriteSheetString property.
    * @param titleScreenFromRect {Rectangle} a rectangle defining where to draw from in the sprite sheet for the title background (the actual button image would be part of the background)
    * @param setupMethodString {String} a string defining the setup method, this method name should be the name of the method used for sceneChangeSpecifics (as defined in the specs Object during construction of a GameSkeleton extension)
    * @param dontAppend {Boolean} If true the level select button would get made but not appended to the title screen, default is false.
    *
    */
    setupLevelSelect(lsButtonX: number, lsButtonY: number, lsButtonWidth: number, lsButtonHeight: number, amountOfLevels: number, titleScreenFromRect: Rectangle, setupMethodString: string, dontAppend: boolean): void;
    __levelSelectSpriteSheet: HTMLImageElement;
    addedInitializationMethodString: string;
    __titleScreenRect: Rectangle;
    _levelSelectAmount: number;
    /**
    *
    *
    *   Remove the level select button.
    *
    *
    * @memberof GameSkeleton.prototype
    * @method removeLevelSelect
    *
    */
    removeLevelSelect(): void;
    /**
    *
    *   A base64 string defining the level select sprite sheet.
    *   The default sheet has up to 38 levels.
    *   You can bring the default sprite sheet into an editor like gimp or photoshop to edit it.
    *   Save your edits, and bring it back to base64 and replace this string with your updated bsae64 string to change what level select looks like.
    *
    *   One way to have more than 38 levels is to copy the sprite sheet, and change the numbers, you could use just 1-30 then make another sheet with 31-60 in the same  places as the 1-30 numbers.
    *   When the level reaches 30 during onSelectLevel change the __levelSelectSpriteSheetString to the image with numbers 31-60 and set this.__levelSelectSpriteSheet to null and call setupLevelSelect.
    *   Then during the onSelectLevel method, when the level is more than 30 you would add 30 to this.sceneChanger.currentScene and then call this.sceneChanger.changeCurrentMap(this.sceneChanger.currentScene);
    *
    *   This is the default level select sprite sheet base64 string:
    *
    *
    *   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAALuCAYAAADxHZPKAAAgAElEQVR4Xuy9C5dtTVnfO3evXr2/ApGY5JiYkOSYIZc3mheMGEMIURARRdHjMSfJyMVxvsXJ9ZhELoIgBCRKIKISEQkh3IVouHjBC0nGON/j3d29+4yqOWuuWrWey/+pOVfvXrv/e8DY++1Zs+qpfz016/c8XbPmg4F/qAAVoAJUgApQASpABagAFbjzCjy48xbSQCpABagAFaACVIAKUAEqQAUGgjudgApQASpABagAFaACVIAKnIACBPcTGCSaSAWoABWgAlSAClABKkAFCO70ASpABagAFaACVIAKUAEqcAIKENxPYJBoIhWgAlSAClABKkAFqAAVILjTB6gAFaACVIAKUAEqQAWowAkoQHA/gUGiiVSAClABKkAFqAAVoAJUgOBOH6ACVIAKUAEqQAWoABWgAiegAMH9BAaJJlIBKkAFqAAVoAJUgApQAYI7fYAKUAEqQAWoABWgAlSACpyAAgT3ExgkmkgFqAAVoAJUgApQASpABQju9AEqQAWoABWgAlSAClABKnACChDcT2CQaCIVoAJUgApQASpABagAFSC40weoABWgAlSAClABKkAFqMAJKEBwP4FBoolUgApQASpABagAFaACVIDgTh+gAlSAClABKkAFqAAVoAInoADB/QQGiSZSASpABagAFaACVIAKUAGCO32AClABKkAFqAAVoAJUgAqcgAIE9xMYJJpIBagAFaACVIAKUAEqQAUI7vQBKkAFqAAVoAJUgApQASpwAgoQ3E9gkGgiFaACVIAKUAEqQAWoABUguNMHqAAVoAJUgApQASpABajACShAcD+BQaKJVIAKUAEqQAWoABWgAlSA4E4foAJUgApQASpABagAFaACJ6AAwf0EBokmUgEqQAWoABWgAlSAClABgjt9gApQASpABagAFaACVIAKnIACBPcTGCSaSAWoABWgAlSAClABKkAFCO70ASpABagAFaACVIAKUAEqcAIKENxPYJBoIhWgAlSAClABKkAFqAAVILjTB6gAFaACVIAKUAEqQAWowAkoQHA/gUGiiVSAClABKkAFqAAVoAJUgOBOH6ACVIAKUAEqQAWoABWgAiegAMH9BAaJJlIBKkAFqAAVoAJUgApQAYI7fYAKUAEqQAWoABWgAlSACpyAAgT3ExgkmkgFqAAVoAJUgApQASpABQju9AEqQAWoABWgAlSAClABKnACChDcT2CQaCIVoAJUgApQASpABagAFSC40weoABWgAlSAClABKkAFqMAJKEBwP4FBoolUgApQASpABagAFaACVIDgTh+gAlSAClABKkAFqAAVoAInoADB/QQGiSZSASpABagAFaACVIAKUAGCO32AClABKkAFqAAVoAJUgAqcgAIE9xMYJJpIBagAFaACVIAKUAEqQAUI7vQBKkAFqAAVoAJUgApQASpwAgoQ3E9gkGgiFaACVIAKUAEqQAWoABUguNMHqAAVoAJUgApQASpABajACShAcD+BQaKJVIAKUAEqQAWoABWgAlSA4E4foAJUgApQASpABagAFaACJ6AAwf0EBokmUgEqQAWoABWgAlSAClABgjt9gApQASpABagAFaACVIAKnIACBPcTGCSaSAWoABWgAlSAClABKkAFCO70ASpABagAFaACVIAKUAEqcAIKENxPYJBoIhWgAlSAClABKkAFqAAVILjTB6gAFaACVIAKUAEqQAWowAkoQHA/gUGiiVSAClABKkAFqAAVoAJUgOBOH6ACVIAKUAEqQAWoABWgAiegAMH9BAaJJlIBKkAFqAAVoAJUgApQAYI7fYAKUAEqQAWoABWgAlSACpyAAgT3ExgkmkgFqAAVoAJUgApQASpABQju9AEqQAWoABWgAlSAClABKnACChDcT2CQaCIVoAJUgApQASpABagAFSC40weoABWgAlSAClABKkAFqMAJKEBwP4FBoolUgApQASpABagAFaACVIDgTh+gAlSAClABKkAFqAAVoAInoADB/QQGiSZSASpABagAFaACVIAKUAGCO32AClABKkAFqAAVoAJUgAqcgAIE9xMYJJpIBagAFaACVIAKUAEqQAUI7vQBKkAFqAAVoAJUgApQASpwAgoQ3E9gkGgiFaACVIAKUAEqQAWoABUguNMHqAAVoAJUgApQASpABajACShAcD+BQaKJVIAKUAEqQAWoABWgAlSA4E4foAJUgApQASpABagAFaACJ6AAwf0EBokmUgEqQAWoABWgAlSAClABgjt9gApQASpABagAFaACVIAKnIACBPcTGCSaSAWoABWgAlSAClABKkAFCO70ASpABagAFaACVIAKUAEqcAIKENxPYJBoIhWgAlSAClABKkAFqAAVILjTB6gAFaACVIAKUAEqQAWowAkoQHA/gUGiiVSAClABKkAFqAAVoAJUgOBOH6ACVIAKUAEqQAWoABWgAiegAMH9BAaJJlIBKkAFqAAVoAJUgApQAYI7fYAKUAEqQAWoABWgAlSACpyAAgT3ExgkmkgFqAAVoAJUgApQASpABQju9AEqQAWoABWgAlSAClABKnACChDcT2CQaCIVoAJUgApQASpABagAFSC40weoABWgAlSAClABKkAFqMAJKEBwP4FBoolUgApQASpABagAFaACVIDgTh+gAlSAClABKkAFqAAVoAInoADB/QQGiSZSASpABagAFaACVIAKUAGCO32AClABKkAFqAAVoAJUgAqcgAIE9xMYJJpIBagAFaACVIAKUAEqQAUI7vQBKkAFqAAVoAJUgApQASpwAgoQ3E9gkGgiFaACVIAKUAEqQAWoABUguNMHqAAVoAJUgApQASpABajACShAcD+BQaKJVIAKUAEqQAWoABWgAlSA4E4foAJUgApQASpABagAFaACJ6AAwf0EBokmUgEqQAWoABWgAlSAClABgjt9gApQASpABagAFaACVIAKnIACBPcTGCSaSAWoABWgAlSAClABKkAFCO70ASpABagAFaACVIAKUAEqcAIKENxPYJBoIhWgAlSAClABKkAFqAAVILjTB6gAFaACVIAKUAEqQAWowAkoQHA/gUGiiVSAClABKkAFqAAVoAJUgOBOH6ACVIAKUAEqQAWoABWgAiegAMH9BAaJJlIBKkAFqAAVoAJUgApQAYI7fYAKUAEqQAWoABWgAlSACpyAAgT3ExgkmkgFqAAVoAJUgApQASpABQju9AEqQAWoABWgAlSAClABKnACChDcT2CQaCIVoAJUgApQASpABagAFSC40weoABWgAlSAClABKkAFqMAJKEBwP4FBoolUgApQASpABagAFaACVIDgTh+gAlSAClABKkAFqAAVoAInoADB/QQGiSZSASpABagAFaACVIAKUAGCO32AClABKkAFqAAVoAJUgAqcgAIE9xMYJJpIBagAFaACVIAKUAEqQAUI7vQBKkAFqAAVoAJUgApQASpwAgoQ3E9gkGgiFaACVIAKUAEqQAWoABUguNMHqAAVoAJUgApQASpABajACShAcD+BQaKJVIAKUAEqQAWoABWgAlSA4E4foAJUgApQASpABagAFaACJ6AAwf0EBokmUgEqQAWoABWgAlSAClABgjt9gApQASpABagAFaACVIAKnIACBPcTGCSaSAWoABWgAlSAClABKkAFCO70ASpABagAFaACVIAKUAEqcAIKENxPYJBoIhWgAlSAClABKkAFqAAVILjTB6gAFaACVIAKUAEqQAWowAkoQHA/gUGiiVSAClABKkAFqAAVoAJUgOBOH6ACVIAKUAEqQAWoABWgAiegAMH9BAaJJlIBKkAFqAAVoAJUgApQAYI7fYAKUAEqQAWoABWgAlSACpyAAgT3ExgkmkgFqAAVoAJUgApQASpABQju9AEqQAWoABWgAlSAClABKnACChDcT2CQaCIVoAJUgApQASpABagAFSC40weoABWgAlSAClABKkAFqMAJKEBwP4FBoolUgApQASpABagAFaACVIDgTh+gAlSAClABKkAFqAAVoAInoADB/QQGiSZSASpABagAFaACVIAKUAGCO32AClABKkAFqAAVoAJUgAqcgAIE9xMYJJpIBagAFaACVIAKUAEqQAUI7vQBKkAFqAAVoAJUgApQASpwAgoQ3E9gkGgiFaACVIAKUAEqQAWoABUguNMHqAAVoAJUgApQASpABajACShAcD+BQaKJVIAKUAEqQAWoABWgAlSA4L6iD7zoJc/erFgdq6ICVIAKHCjw1S9/kc9t+gUVoAJU4J4qwAWgc+AJ6Z3C8TYqQAVWV4Awv7qkrJAKUAEqcCcVILgHhoWwHhCLRakAFXgiChDin4jsbJQKUAEqcCsKENwdmQnrt+KHbIQKUIEjKECIP4KorJIKUAEq8AQVILgr4q8B7F/50hee4NCyaSpABZ4GBV78zEsXd4MAv1hCVkAFqAAVuBMKENybYegFdkL6nfBnGkEF7oUCvTBPgL8X7sFOUgEq8BQrQHCvBjcK7RFY///+1xeG7cVm2J6fD0NSfen5Mz11tPdY/713LRkruIp0f9Gz3FL307O5vl7+Pf9sqlC1+WYYHjzQdZXqRie2ZrdVZ5ErOs4PbobhptZa6LenY+kXYjeqgVdOakvTR7XfGUOrX5be0bGQyluaW/1J8wYdr9S/qe3nfcNLPMXn61GIJ7zD0rIgFaACVODOKUBwH4YhAuwIrP/2b31s2G43w3Z7PmzP098jsKe/HyS4jP4xoWECvRZ0czMT9O1B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"
    *
    *
    *
    * @memberof GameSkeleton
    *
    *
    */
    __levelSelectSpriteSheetString: string;
    __latestLevel: number;
    __levelSelectDivs: any[];
    __gameOverScreenRect: any;
    __lsShown: number;
    /**
    *
    *   First call setupLevelSelect to setup everything.
    *
    *   Then this method pauses the game and shows the level select display,
    *   if already displayed this method would hide the level select display.
    *
    *
    * @memberof GameSkeleton.prototype
    * @method showLevelSelect
    * @param latestLevel {Number} The latest level that can be selected, default is 1.
    *
    */
    showLevelSelect(latestLevel: number): void;
    /**
    *
    *   This method is automatically setup during showLevelSelect as a handler for each levels button.
    *   the display is cleared, sceneChanger.changeCurrentMap is called
    *   then onSelectLevel is called (which can be setup during construction as part of the specs Object)
    *   then BlitMath.specificPatternBlit is called with the sceneChanger currentMap,
    *   then BlitMath.dispatchFunctionAssignments is called with the sceneChangeSpecifics string method name passed during setupLevelSelect, this is the name of the method used for sceneChangeSpecifics.
    *   the changeToMainCamera is called.
    *
    *
    * @memberof GameSkeleton.prototype
    * @method _selectLevel
    * @param e {Event}
    *
    */
    _selectLevel(e: Event): void;
    /**
    *
    *   hides the level select display. This method is called by showLevelSelect if the level select display is already shown.
    *
    *
    * @memberof GameSkeleton.prototype
    * @method hideLevelSelect
    *
    *
    */
    hideLevelSelect(): void;
    /**
    *
    *   places each clickable/touchable level select div. This method is called as part of showLevelSelect.
    *
    *
    * @memberof GameSkeleton.prototype
    * @method placeLevelSelectDivs
    * @param ontitle {Boolean} If true the divs get added to title.div instead of container.
    *
    */
    placeLevelSelectDivs(ontitle: boolean): void;
    /**
    *
    *   removes each clickable/touchable level select div. This method is called as part of hideLevelSelect
    *
    *
    * @memberof GameSkeleton.prototype
    * @method removeLevelSelectDivs
    * @param fromtitle {Boolean} Denotes if they are on the title screen or not
    *
    */
    removeLevelSelectDivs(fromtitle: boolean): void;
    /**
    *
    *
    * @memeberof GameSkeleton
    * @method useSaikyoFont
    *
    * @param letterSpacing {Number}
    * @param canv {CanvasObject}
    * @param standardRedBlue {Number} 0,1,2
    *
    *
    */
    useSaikyoFont(letterSpacing: number, canv: CanvasObject, standardRedBlue: number): void;
    /**
*
*
* @memeberof GameSkeleton
* @method useSolarFont
*
* @param letterSpacing {Number}
* @param canv {CanvasObject}
*
*
*
*/
    useSolarFont(letterSpacing: number, canv: CanvasObject): void;
    /**
    *
    *
    * @memeberof GameSkeleton
    * @method useSolarBlackFont
    *
    * @param letterSpacing {Number}
    * @param canv {CanvasObject}
    *
    *
    */
    useSolarBlackFont(letterSpacing: number, canv: CanvasObject): void;
    /**
    *
    *
    * @memeberof GameSkeleton
    * @method useFightFont
    *
    * @param letterSpacing {Number}
    * @param canv {CanvasObject}
    * @param blackGreyWhite {Number} 0,1,2
    *
    */
    useFightFont(letterSpacing: number, canv: CanvasObject, blackGreyWhite: number): void;
    /**
    *
    *
    * Uses a cookie to save the data.
    *
    *
    * @memberof GameSkeleton.prototype
    * @method cookieSave
    * @param saveName {String} The name to use for the cookie
    * @param saveData {String} The data to save.
    *
    *
    *
    */
    cookieSave(saveName: string, saveData: string): boolean;
    /**
    *
    *
    * Get the data of a cookie saved item.
    *
    *
    * @memberof GameSkeleton.prototype
    * @method getCookieSaved
    * @param saveName {String} The name of the cookie
    *
    *
    *
    *
    */
    getCookieSaved(saveName: string): string;
    /**
    *
    *
    * When either localSave or getLocalSaved are called and they fail, this property will be the error message.
    *
    * @memberof GameSkeleton
    *
    *
    *
    */
    saveError: string;
    /**
    *
    *
    * Uses localStorage to save the data.
    * If the save fails, this method will return 0 and saveError will have any error message.
    *
    * @memberof GameSkeleton.prototype
    * @method localSave
    * @param saveName {String} The name to use for the localStorage item
    * @param saveData {String} The data to save.
    *
    *
    *
    */
    localSave(saveName: string, saveData: string): number;
    /**
    *
    *
    * Get the data of a localStorage item.
    * If it can't, this method will return 0 and saveError will have any error message.
    *
    * @memberof GameSkeleton.prototype
    * @method getLocalSaved
    * @param saveName {String} The name of the localStorage item
    *
    *
    *
    *
    */
    getLocalSaved(saveName: string): string | 0;
    /**
    *
    *
    *    Creates _HUD and _playerHUD as html div elements,
    *    _HUD gets appended to the document body.
    *    _playerHUD gets appened to container. _playerHUD containes _healthBar and _scoreTextDisplay.
    *
    *    This method is automatically called as part of construction of a GameSkeleton.
    *
    *    Use the showHUD hideHUD removeHUD, showHealthBar hideHealthBar, showScoreText, hideScoreText and changeHUDBackgroundImage methods
    *     to manipulate the HUD and playerHUD.
    *
    * @memberof GameSkeleton.prototype
    * @method createHud
    *
    */
    createHud(): void;
    /**
    *
    *    Will be 1 if health bar is displayed.
    *
    * @memberof GameSkeleton
    *
    */
    healthBarIsDisplayed: number;
    /**
    *
    *    Will be 1 if score text is displayed.
    *
    * @memberof GameSkeleton
    *
    */
    scoreTextIsDisplayed: number;
    /**
    *
    *    @private
    *
    * @memberof GameSkeleton
    *
    */
    private _playerHudParts;
    /**
    *
    *
    *   You can use this method after initVolumeSliderAnimation to change the volume slider position.
    *
    * @memberof GameSkeleton.prototype
    * @method volumeSliderPosition
    *
    *
    */
    volumeSliderPosition(x: any, y: any): void;
    _volumeSliderAnimation: any;
    _volumeSliderDiv: any;
    /**
    *
    *
    *   Use this method to remove the volume slider after having called initVolumeSliderAnimation and volumeSliderLoop
    *
    * @memberof GameSkeleton.prototype
    * @method removeVolumeSliderAnimation
    *
    *
    */
    removeVolumeSliderAnimation(): void;
    /**
    *
    *
    *   Call this to establish the volume slider.
    *
    *
    * @memberof GameSkeleton.prototype
    * @method initVolumeSliderAnimation
    * @param x {Number} the x position to place the volume slider
    * @param y {Number} the y position to place the volume slider
    * @param clayer {CanvasObject} the CanvasObject to draw the volume slider animation on.
    * @param nox {Boolean} To not show an x for closing the volume slider loop, default is false, an x is shown, if your showing the slider as part of a different screen, then you might not need the x.
    *
    */
    initVolumeSliderAnimation(x: number, y: number, clayer: CanvasObject, nox: boolean): void;
    /**
    *
    *
    *   Use this as a levelComplete method or call during a loop to show the volume slider control,
    *   after first calling initVolumeSliderAnimation once.
    *
    * @memberof GameSkeleton.prototype
    * @method volumeSliderLoop
    *
    *
    */
    volumeSliderLoop(ts: any): void;
    /**
    *
    *    Shows and styles the _healthBar. _healthBar is an html div element.
    *
    * @memberof GameSkeleton.prototype
    * @method showHealthBar
    * @param health {Number} The amount of health, also the width of the healthbar.
    * @param firstColor {String} an html color value
    * @param secondColor {String} am html color value
    * @param height {Number} the height of the health bar
    * @param replacementStyle {String} An optional style that would replace the default style, thereby the firstColor and secondColor and height params would not be used. Use this param to style the health bar yourself.
    * @param additionalStyle {String} A style that would be added to the default style.
    *
    */
    showHealthBar(health: number, firstColor: string, secondColor: string, height: number, replacementStyle: string, additionalStyle: string): void;
    /**
    *
    *    Hides the health bar.
    *
    * @memberof GameSkeleton.prototype
    * @method hideHealthBar
    *
    *
    */
    hideHealthBar(): void;
    /**
    *
    *    Shows and styles score text in the _scoreTextDisplay html div element.
    *
    * @memberof GameSkeleton.prototype
    * @method showScoreText
    * @param value {String}
    * @param topPosition {Number}
    * @param width {Number}
    * @param height {Number}
    * @param additionalStyle {String}
    *
    */
    showScoreText(value: string, topPosition: number, width: number, height: number, additionalStyle: string): void;
    /**
    *
    *    Hides score text.
    *
    * @memberof GameSkeleton.prototype
    * @method hideScoreText
    *
    */
    hideScoreText(): void;
    /**
    *
    *    Changes the HUD background image.
    *
    * @memberof GameSkeleton.prototype
    * @method changeHUDBackgroundImage
    * @param imageString {String} The base64 string of the image
    *
    */
    changeHUDBackgroundImage(imageString: string): void;
    /**
    *
    *    After you call this method, escape can be pressed to reset position in scene.
    *    a transistion would happen and positionResetSpecifics would be called if it is defined.
    *
    * @memberof GameSkeleton.prototype
    * @method establishKeyEventsForReset
    *
    */
    establishKeyEventsForReset(): void;
    /**
    *
    *    Default is 32.
    *
    * @memberof GameSkeleton
    *
    */
    mouseMoveOffset: number;
    /**
    *   When setupMouseTouchHandle has been used, this MoverPoint will have the location of the mouse/touch.
    *    @type MoverPoint
    *
    * @memberof GameSkeleton
    *
    */
    mousePoint: MoverPoint;
    /**
    *
    *    Sets up everything such that the mousePoint MoverPoint has the cords of where the game is being moved moused over or touched moved.
    *    If the handleMouseHeldDown param is true then also mouseIsDown will be available.
    *
    * @memberof GameSkeleton.prototype
    * @method setupMouseTouchHandle
    * @param handleMouseHeldDown {Boolean} Default is false. If true then mouseIsDown will be set up, then if the game is being touched or clicked mouseIsDown would be 1.
    *
    */
    setupMouseTouchHandle(handleMouseHeldDown: boolean): void;
    /**
    *
    *    Remove mouse/touch cord capture ability.
    *
    * @memberof GameSkeleton.prototype
    * @method takeDownMouseTouchHandle
    *
    */
    takeDownMouseTouchHandle(): void;
    /**
    *
    *    Set up by the setupMouseTouchHandle method, handles mousemove, touchmove and pointermove down/up events.
    *   Calculates the cords of the touch/mousedown position, and puts them in mousePoint.x and mousePoint.y
    *
    * @memberof GameSkeleton.prototype
    * @method handleMouseTouchMove
    * @param e {Event}
    *
    */
    handleMouseTouchMove(e: Event): void;
    /**
    *
    *    If setupMouseTouchHandle has been called with 1 as a param, this property denotes if the mouse/touch is being held down or not.
    *
    * @memberof GameSkeleton
    *
    */
    mouseIsDown: number;
    private handleMouseDown;
    private handleMouseUp;
    /**
    *
    *    This method is automatically called as part of consctruction of the class.
    *
    * @memberof GameSkeleton.prototype
    * @method basicInitialize
    * @param containerDivId {String}
    * @param rootDivId {String}
    * @param displayWidth {Number}
    * @param displayHeight {Number}
    * @param cameraWidth {Number}
    * @param cameraHeight {Number}
    * @param controllerDivId {String}
    * @param useScreenOrganizer {Boolean}
    * @param startWidth {Number}
    * @param startHeight {Number}
    * @param dontUseSceneChanger {Number}
    * @param justCreateController {Number}
    *
    */
    basicInitialize(containerDivId: string, rootDivId: string, displayWidth: number, displayHeight: number, cameraWidth: number, cameraHeight: number, controllerDivId: string, useScreenOrganizer: boolean, startWidth: number, startHeight: number, dontUseSceneChanger: number, justCreateController: number): void;
    container: HTMLElement;
    root: HTMLElement | CanvasObjectContainer;
    speechBubble: HTMLTextAreaElement;
    cameraPoint: MoverPoint;
    startButton: HTMLDivElement;
    /**
    *
    * auto pause if game looses focus, by default auto pause is enabled
    *
    * @memberof GameSkeleton.prototype
    * @method enableAutoPause
    *
    */
    enableAutoPause(): void;
    /**
    *
    * disable auto pause , by default auto pause is enabled
    *
    * @memberof GameSkeleton.prototype
    * @method disableAutoPause
    *
    */
    disableAutoPause(): void;
    /**
    *   During basicInitialize this method is added as the start button handler of the controller.
    *    On the title screen, changeToMainCamera would be called.
    *     On the main game screen pause would get called.
    *    On the game over screen hudExit would get called.
    *
    *
    * @memberof GameSkeleton.prototype
    * @method maybeStartGame
    * @param e
    *
    */
    maybeStartGame(e: any): void;
    /**
    *
    *    During basicInitialize this method is added as the back button handler of the controller.
    *
    *       If the currentScreen of the screenOrganizer is the game over screen, then this method causes hudExit.
    *       If the currentScreen of the screenOrganizer is the main game screen, then this method causes goBack.
    *
    * @memberof GameSkeleton.prototype
    * @method maybeGoBack
    * @param e
    *
    */
    maybeGoBack(e: any): void;
    /**
    *
    *    transitions to the main game screen and starts the main game loop.
    *    automatically called as part of a start button press from the title screen.
    *
    * @memberof GameSkeleton.prototype
    * @method changeToMainCamera
    * @param e
    *
    */
    changeToMainCamera(e: any): void;
    /**
    *
    *    Updates and resets the camera with optional offsets.
    *
    * @memberof GameSkeleton.prototype
    * @method updateAndResetCamera
    * @param horizontalOffset {Number}
    * @param verticalOffset {Number}
    *
    */
    updateAndResetCamera(horizontalOffset: number, verticalOffset: number): void;
    /**
    *
    *    Used to change the current set of enemy Objects being referenced.
    *   For example enemies = this.changeSceneEnemies(scene); would make enemies point to the array in the sceneChanger for the given scene.
    *
    * @memberof GameSkeleton.prototype
    * @method changeSceneEnemies
    * @param scene {Number} The number of the scene to get.
    * @returns {Array} The enemy Array in the sceneChanger referenced by the scene number
    */
    changeSceneEnemies(scene: number): any[];
    /**
    *
    *    Used to change the current set of SceneryObjects being referenced.
    *   For example sceneryObjects = this.changeSceneScenery(scene); would make sceneryObjects point to the array in the sceneChanger for the given scene.
    *
    * @memberof GameSkeleton.prototype
    * @method changeSceneScenery
    * @param scene {Number} The number of the scene to get.
    * @returns {Array} The stored Array in the sceneChanger referenced by the scene number
    */
    changeSceneScenery(scene: number): any[];
    /**
    *   Update each _map property in the Array of MapMovers given to match this.player._map
    *
    *
    * @memberof GameSkeleton.prototype
    * @method updateEnemyMaps
    * @param enemies {Array} An Array of MapMovers
    *
    */
    updateEnemyMaps(enemies: any[]): void;
    /**
    *
    *    Update each _map property in the Array of SceneryObject given to match this.player._map
    *
    * @memberof GameSkeleton.prototype
    * @method updateSceneryObjectMaps
    * @param sceneryObjects {Array} An Array of SceneryObjects
    *
    */
    updateSceneryObjectMaps(sceneryObjects: any[]): void;
    /**
    *   starts the main game loop, this method is automatically setup as part of what happens when the start button is pressed from the title screen.
    *   typically you don't need to call it manually. Use the beforeStartGameLoop construction specs param to define a method that would happen just before the main loop starts.
    *
    *
    * @memberof GameSkeleton.prototype
    * @method startGameLoop
    * @param gameFunc {Function} If gameLoop has not been defined in specs during construction and a method is passed for this param, then it will become gameFunction. Otherwise gameLoop passed in the specs Object becomes gameFunction.
    *
    */
    startGameLoop(gameFunc: Function): void;
    _aid: number;
    __workLoop: number;
    /**
    *
    *    Readys the camera for auto horizontal movement, call this to horizontally align the camera to the player for auto horizontal movement,
    *    auto horizontal movement is achieved by setting horizontalCameraMove to a number greater than 0.
    *    in your setup method you would call this method if you have also set horizontalCameraMove to greater than 0.
    *    the camera would align with the player based on cameraFollowOffsetX and continue to move horizontally based on the vale of horizontalCameraMove.
    *
    *    If you don't call this method then the camera may not be aligned with the player when it starts auto moving.
    *
    * @memberof GameSkeleton.prototype
    * @method readyHorizontalCameraMove
    *
    */
    readyHorizontalCameraMove(): void;
    /**
    *
    *    Readys the camera for auto vertical movement, call this to vertically align the camera to the player for auto vertical movement,
    *    auto vertical movement is achieved by setting verticalCameraMove to a number greater than 0.
    *    in your setup method you would call this method if you have also set verticalCameraMove to greater than 0.
    *    the camera would align with the player based on cameraFollowOffsetY and continue to move vertically based on the vale of verticalCameraMove.
    *
    *    If you don't call this method then the camera may not be vertically aligned with the player when it starts auto moving.
    *
    * @memberof GameSkeleton.prototype
    * @method readyVerticalCameraMove
    *
    */
    readyVerticalCameraMove(): void;
    /**
    *
    *    Change the main looping method from _loop to something else.
    *    The function passed would be the only method called during each cycle and no longer gameFunction.
    *    Use the restoreMainLoopMethod function to bring back gameFunction (called from _loop) as the main looping method.
    *
    *
    *    This method is useful for making a title/options screen loop.
    *    In your initializationSpecs method you would call this method to swith to a title screen loop method.
    *    and then in the beforeStartGame method call restoreMainLoopMethod.
    *
    *
    *
    * @memberof GameSkeleton.prototype
    * @method changeMainLoopMethod
    * @param toThis {Function}
    *
    */
    changeMainLoopMethod(toThis: Function): void;
    /**
    *
    *    Restore _loop as the main cycle, which in turn is calling your gameFunction defined during construction.
    *
    *
    *
    * @see changeMainLoopMethod
    * @memberof GameSkeleton.prototype
    * @method restoreMainLoopMethod
    *
    *
    */
    restoreMainLoopMethod(): void;
    /**
    *
    *    The main game loop, your specific game mechanics should be in gameFunction which is defined during construction as part of the specs Object.
    *
    * @memberof GameSkeleton.prototype
    * @method _loop
    * @param ts {Number}
    *
    */
    _loop(ts: number): void;
    /**
    *
    *    Makes one call to the camera to re render to the screen,
    *    for use after reseting the camera.
    *
    * @memberof GameSkeleton.prototype
    * @method callCamera
    * @param [ts] {Number} optional delta time
    * @param [pxoffset] {Number} optional added horizontal offset for the cameraPoint
    * @param [pyoffset] {Number} optional added vertical offset for the cameraPoint
    * @param [playerPosition] {MoverPoint} If present will first reset the camera around the player position.
    */
    callCamera(ts?: number, pxoffset?: number, pyoffset?: number, playerPosition?: MoverPoint): void;
    /**
    *
    *    Cancels the animation frame.
    *
    * @memberof GameSkeleton.prototype
    * @method cancelAniFrame
    *
    */
    cancelAniFrame(): void;
    /**
    *
    *    Pauses and unpauses the game.
    *
    * @memberof GameSkeleton.prototype
    * @method pause
    * @param e {Event}
    *
    */
    pause(e: Event): void;
    /**
    *
    *    A method that can happen as a loop alternate to enable gamePad use while the game is paused.
    *
    * @memberof GameSkeleton.prototype
    * @method _justGamePad
    * @param ts {Number}
    *
    */
    _justGamePad(ts: number): void;
    /**
    *
    *    @private
    *
    * @memberof GameSkeleton
    *
    */
    private _textTimeChosen;
    /**
    *
    *    Shows html text in a textArea using the given parameters.
    *
    *
    *    For the most versatility, use the pixel font methods to display text.
    *
    *   This showText method exists for quick basic html text showing, to re-style it use the additionalCss param.
    *
    * @memberof GameSkeleton.prototype
    * @method showText
    * @param text {String}
    * @param ttime {Number} The amount of time in millisecods to show the text, default is 4000
    * @param tsz {Number} font size default is 16
    * @param wth {Number} width of the text area default is 44%
    * @param hgt {Number} height of the text area default is 44%
    * @param tp {Number} the top html css value default is 0
    * @param lft {Number} the left html css value default is 0
    * @param fontfamilyname {String} family name of the font to use
    * @param backgroundCss {String} Optional css for the background css property of the text area
    * @param additionalCss {String} any optional additional css for the text area
    *
    */
    showText(text: string, ttime: number, tsz: number, wth: number, hgt: number, tp: number, lft: number, fontfamilyname: string, backgroundCss: string, additionalCss: string): void;
    /**
    *
    *    Hide any text that was shown via showText
    *
    * @memberof GameSkeleton.prototype
    * @method hideText
    *
    */
    hideText(): void;
    /**
    *
    *    Returns true if text is shown via showText.
    *
    * @memberof GameSkeleton.prototype
    * @method textIsShown
    * @returns {Boolean}
    */
    textIsShown(): boolean;
    /**
    *
    *
    *    @private
    * @memberof GameSkeleton
    *
    */
    private textShown;
    /**
    *
    *    Returns true when text from showText is almost finished being shown.
    *
    * @memberof GameSkeleton.prototype
    * @method textFinished
    * @returns {Boolean}
    */
    textFinished(): boolean;
    _pixelTypeSpecs: {
        dialogBackImage: any;
        sourceImg: any;
        canvas: any;
        lineFromXp: number;
        lineFromYp: number;
        tw: number;
        th: number;
        space: number;
        s33: number;
        s34: number;
        s35: number;
        s36: number;
        s37: number;
        s38: number;
        s39: number;
        s40: number;
        s41: number;
        s42: number;
        s43: number;
        s44: number;
        s45: number;
        s46: number;
        s47: number;
        s58: number;
        s59: number;
        s60: number;
        s61: number;
        s62: number;
        s63: number;
        s64: number;
        l0: number;
        l1: number;
        l2: number;
        l3: number;
        l4: number;
        l5: number;
        l6: number;
        l7: number;
        l8: number;
        l9: number;
        la: number;
        lb: number;
        lc: number;
        ld: number;
        le: number;
        lf: number;
        lg: number;
        lh: number;
        li: number;
        lj: number;
        lk: number;
        ll: number;
        lm: number;
        ln: number;
        lo: number;
        lp: number;
        lq: number;
        lr: number;
        ls: number;
        lt: number;
        lu: number;
        lv: number;
        lw: number;
        lx: number;
        ly: number;
        lz: number;
        ua: number;
        ub: number;
        uc: number;
        ud: number;
        ue: number;
        uf: number;
        ug: number;
        uh: number;
        ui: number;
        uj: number;
        uk: number;
        ul: number;
        um: number;
        un: number;
        uo: number;
        up: number;
        uq: number;
        ur: number;
        us: number;
        ut: number;
        uu: number;
        uv: number;
        uw: number;
        ux: number;
        uy: number;
        uz: number;
    };
    /**
    *
    * Sets specs for the pixelType method.
    *
    * see pixelType
    *
    *
    *
    * @param source {Img} The source image that has the pixel font line
    * @param canv {CanvasObject} The CanvasObject to draw to.
    * @param lineFromX {Number} The starting x position of the pixel font line in the source.
    * @param lineFromY {Number} The starting y position of the pixel font line in the source.
    * @param tw {Number} The width of each tile that each letter fits into.
    * @param th {Number} The height of each tile that each letter fits into.
    * @param spacing {Number} Spacing between each letter that will be typed.
    * @param font {Number} Default font to use, 1, 2 or 3. 1 for ClinBlock, 2 for OldSchool, 3 for GoodNeighbors.
    * @method setPixelTypingSpecs
    * @memberof GameSkeleton.prototype
    *
    */
    setPixelTypingSpecs(source: Img, canv: CanvasObject, lineFromX: number, lineFromY: number, tw: number, th: number, spacing: number, font: number): void;
    /**
    *
    * Sets the default pixel font to the built in ClintBlock font.
    * see pixelType
    *
    *
    * @method useClintBlockFont
    * @memberof GameSkeleton.prototype
    *
    */
    useClintBlockFont(letterSpacing: any, canv: any): void;
    /**
    *
    * Sets the default pixel font to the built in OldSchool font.
    * see pixelType
    *
    *
    * @method useOldSchoolFont
    * @memberof GameSkeleton.prototype
    *
    */
    useOldSchoolFont(letterSpacing: any, canv: any): void;
    /**
    *
    * Sets the default pixel font to the built in GoodNeighbors font.
    * see pixelType
    *
    *
    * @method useGoodNeighborsFont
    * @memberof GameSkeleton.prototype
    *
    */
    useGoodNeighborsFont(letterSpacing: any, canv: any): void;
    __alphabet: {
        a0: string;
        a1: string;
        a2: string;
        a3: string;
        a4: string;
        a5: string;
        a6: string;
        a7: string;
        a8: string;
        a9: string;
        a10: string;
        a11: string;
        a12: string;
        a13: string;
        a14: string;
        a15: string;
        a16: string;
        a17: string;
        a18: string;
        a19: string;
        a20: string;
        a21: string;
        a22: string;
        a23: string;
        a24: string;
        a25: string;
    };
    /**
    *
    *
    * see pixelType
    *
    *
    * @method calibratePixelType
    * @memberof GameSkeleton.prototype
    *
    */
    calibratePixelType(zeroIsAtX: any, aIsAtX: any, uAIsAtX: any, tileWidth: any, tileHeight: any): void;
    /**
    *
    * Types pixel text.
    * There are 3 pixel fonts built into the GameSkeleton Class; ClintBlock OldSchool and GoodNeighbors.
    * You can change which one is used by calling useClintBlockFont, useOldSchoolFont, or useGoodNeighborsFont.
    * By default ClintBlock is used.
    *
    * Or you can use your own custom pixel font by including it as a line of text in your sprite sheet. (or you can load the line as an image and pass it in as the source)
    * The pixel font needs to be in one straight horizontal line in your sprite sheet,
    * take note of the x,y start of the line, and the width and height of each tile that each letter is in,
    * the start of the numbers (0-9) from the beginning of the line, the start of the lower case letters (a-z) from the beginning of the line,
    * and the start of the upper case letters from the beginning of the line.
    *
    *  Then, first call calibratePixelType with the start of the numbers, and the starts of the letters, and the tile width and height.
    *   then you can call setPixelTypingSpecs to set all the specs this method, pixelType, will use, or you can keeping passing them into this methods call.
    *
    *       So, for example, lets say we have a line of pixel font in the sprite sheet and that line starts at position 500,500.
    *       And, lets say that each letter is spaced 8x8,
    *        so our tile spacing when looking at the font in our image editor (like GIMP) is 8x8.
    *       There are some other characters in the line before the number chacters most likely,
    *       we select from the beginning of the line up to the start of the zero, and the length of that selection is the start of the number characters.
    *       we select from the beginning of the line up to the start of the "a", and the length of that selection is the start of the lower case letter characters.
    *       we select from the beginning of the line up to the start of the "A", and the length of that selection is the start of the upper case letters.
    *
    *          And those are the values we need to set everything up; the x,y position of the font line in the sprite sheet
    *           the width/height of each character tile
    *           the start of the number characters, and the starts of the letter characters.
    *
    *       1. calibratePixelType(start of the number characters, start of lower case leetters, start of upper case letters, tile width, tile height)
    *                           for example (150,320,160,8,8)
    *                    [if any character set is not in your line, for example if there are no upper case, then you would put null for upper case, not 0]
    *       2. setPixelTypingSpecs(source, canvas, x position of the font line, y position of the font line, tile width, tile height, spacing)
    *
    *           Then you can use this method, pixelType, with just the first three params, to type your custom pixel text.
    *                The cords being used to position the text are the full gameWidth and height.
    *
    *
    * @param x {Number} x position to type at
    * @param y {Number} y position to type at
    * @param alphaText {String} String of text to type.
    * @param source {Img} Source Img to draw from, the img that has the pixel font line. Can be defined for all calls using setPixelTypingSpecs. If the line is in the sprite sheet then this should be; this._image
    * @param canv {CanvasObject} The CanvasObject to draw to. Can be defined for all calls using setPixelTypingSpecs.
    * @param lineFromX {Number} The x position in the sprite sheet that the pixel font line begins. Can be defined for all calls using setPixelTypingSpecs.
    * @param lineFromY {Number} The y position in the sprite sheet that the pixel font line begins. Can be defined for all calls using setPixelTypingSpecs.
    * @param tw {Number} The width of each tile that each letter of the pixel font line fits into. Default is 10. Can be defined for all calls using setPixelTypingSpecs.
    * @param th {Number} The height of each tile that each letter of the pixel font line fits into. Default is 10. Can be defined for all calls using setPixelTypingSpecs.
    * @param spacing {Number} The amount of spacing in between each letter typed, default is 8. Can be defined for all calls using setPixelTypingSpecs.
    *
    * @method pixelType
    *
    * @memberof GameSkeleton.prototype
    *
    */
    pixelType(x: number, y: number, alphaText: string, source: Img, canv: CanvasObject, lineFromX: number, lineFromY: number, tw: number, th: number, spacing: number, fw: any, fh: any): void;
    /**
    *
    *
    *
    *   Writes a paragraph of pixel text, each line in the paragraphTextByDots string should be denoted by a dot .
    *
    * @param startX {Number} The starting x position to type from
    * @param startY {Number} The starting y position to type from
    * @param lineSpace {Number} The line space amount, default is 9
    * @param paragraphTextByDots {String} String of text with each line ending with a dot .
    * @param canv {CanvasObject} The CanvasObject to draw on default will be charLayer
    * @param fw {Number} font text width, default is the same as the tile width of each letter
    * @param fh {Number} font text height, defaul is the same as the tile height of each letter
    *
    * @method pixelParagraph
    * @memberof GameSkeleton.prototype
    *
    */
    pixelParagraph(startX: number, startY: number, lineSpace: number, paragraphTextByDots: string, canv: CanvasObject, fw: number, fh: number): void;
    _pixli: number;
    /**
    *
    *
    *   This method needs to be called repeatedly/during a loop to progress.
    *   Writes a paragraph of pixel text, letter by letter, each line in the paragraphTextByDots string should be denoted by a dot .
    *
    * @param startX {Number} The starting x position to type from
    * @param startY {Number} The starting y position to type from
    * @param lineSpace {Number} The line space amount, default is 9
    * @param paragraphTextByDots {String} String of text with each line ending with a dot .
    * @param canv {CanvasObject} The CanvasObject to draw on default will be charLayer
    * @param fw {Number} font text width, default is the same as the tile width of each letter
    * @param fh {Number} font text height, defaul is the same as the tile height of each letter
    * @param speed {Number} The speed at which to type each letter, default is 1, less than one will go slower, the value should not be 0 or negative.
    *
    * @method animatePixelParagraph
    * @memberof GameSkeleton.prototype
    *
    */
    animatePixelParagraph(startX: number, startY: number, lineSpace: number, paragraphTextByDots: string, canv: CanvasObject, fw: number, fh: number, speed: number): void;
    /**
   *
   *
   *   Displays a dialog box and text.
   *    This method does not position the text so that it is only with the bounds of the box, you will need to test and adjust the length of your sentences as needed.
   *    For large amounts of text the default ClintBlock font is most likely big, use the OldSchool font instead or a custom pixel font that is 5x5 or less.
   *   By default the dialog space available is 210x50. You can change that via the optional params.
   *
   *   To have the dialog appear above everything be sure to call this method last in the loop.
   *   Or you can add a layer to the camera just for displaying text. If you use the display as the canv the dialog box will not be cleared.
   *   By default charLayer is used which means unless you keep calling this method or stop the loop, the dialog disapears on the next iteration of the game loop.
   *
   * @param dialog {String} The string to type, each new line should end with a dot .
   * @param dx {Number} The x position of the dialog box
   * @param dy {Number} The y position of the dialog box
   * @param tx {Number} The x position of the text
   * @param ty {Number} The y position of the text
   * @param lineSpace {Number} The line space amount, default is 9
   * @param animate {Boolean} If true then the text is displayed one letter at a time based on speed, and this method would need to be called repeatedly (called in a loop) to progress.
   * @param speed {Number} The speed at which to type each letter, default is 1, less than one will go slower, the value should not be 0 or negative.
   *
   * @param fw {Number} font text width, default is the same as the tile width of each letter
   * @param fh {Number} font text height, defaul is the same as the tile height of each letter
   * @param canv {CanvasObject} The CanvasObject to draw on, default will be charLayer.
   * @param dialogBackFromRect {Rectangle} Optional Rectangle defining the location of your custom dialog background image in the source. By default a 210x50 paperish looking dialog background is used.
   * @param source {Image} Optional source image for the dialog background, if your using a custom background from the sprite sheet this param should be the sprite sheet; this._image.
   *
   * @method pixelDialogBox
   * @memberof GameSkeleton.prototype
   *
   */
    pixelDialogBox(dialog: string, dx: number, dy: number, tx: number, ty: number, lineSpace: number, animate: boolean, speed: number, fw: number, fh: number, canv: CanvasObject, dialogBackFromRect: Rectangle, source: new (width?: number, height?: number) => HTMLImageElement): void;
    _pixai: number;
    /**
   *
   *
   *   This method needs to be called repeatedly/during a loop to progress.
   *   Writes pixel text, letter by letter.
   *
   * @param x {Number} The starting x position to type from
   * @param y {Number} The starting y position to type from
   * @param alphaText {String} String of text to type.
   * @param speed {Number} The speed at which to type each letter, default is 1, less than one will go slower, the value should not be 0 or negative.
   *
   * @param source {Img} Source Img to draw from, the img that has the pixel font line. Can be defined for all calls using setPixelTypingSpecs. If the line is in the sprite sheet then this should be; this._image
   * @param canv {CanvasObject} The CanvasObject to draw to. Can be defined for all calls using setPixelTypingSpecs.
   * @param lineFromX {Number} The x position in the sprite sheet that the pixel font line begins. Can be defined for all calls using setPixelTypingSpecs.
   * @param lineFromY {Number} The y position in the sprite sheet that the pixel font line begins. Can be defined for all calls using setPixelTypingSpecs.
   * @param tw {Number} The width of each tile that each letter of the pixel font line fits into. Default is 10. Can be defined for all calls using setPixelTypingSpecs.
   * @param th {Number} The height of each tile that each letter of the pixel font line fits into. Default is 10. Can be defined for all calls using setPixelTypingSpecs.
   * @param spacing {Number} The amount of spacing in between each letter typed, default is 8. Can be defined for all calls using setPixelTypingSpecs.
   * @param fw {Number} The width of each letter, default is same as tw.
   * @param fh {Number} The height of each letter, default is same as th.
   *
   * @method animatePixelType
   * @memberof GameSkeleton.prototype
   * @return {Number} Returns the next character index to be typed or 0 when the alphaText is all typed.
   */
    animatePixelType(x: number, y: number, alphaText: string, speed: number, source: Img, canv: CanvasObject, lineFromX: number, lineFromY: number, tw: number, th: number, spacing: number, fw: number, fh: number): number;
    _setATimeO: number;
    /**
    *
    *    Can be called when a level is complete, or to simply do something else using the main loop, it will switch the main loop to the levelCompleteMethod passed.
    *
    *    To give back the loop to the game loop method you can set _doAlternate to 0, which would switch it back immediately.
    *    Or you can call endLevelComplete() which will show a transition and then set _doAlternate to 0 for you,
    *    potentially calling positionResetSpecifics, and then underCoverSpecifics, before the transition ends.
    *    Or you can pass a levelCompleteTime which will cause endLevelComplete to happen after that time.
    *
    *    If you want to sleep the main loop for a time, you would use this method with an empty levelCompleteMethod passed in,
    *   for example this.levelComplete(function(ts) {}, 7000); would cause the game to effectively pause for 7 seconds, afterward show transition and resume
    *
    * @memberof GameSkeleton.prototype
    * @method levelComplete
    * @param levelCompleteMethod {Function} The function that should replace the main loop, ts time stamp will be passed to it.
    * @param levelCompleteTime {Number} Optional millisecond amount of time until main loop should resume, main loop will resume after this amount of time if set.
    * @param dontRunAlternate {Boolean} It true the alternate loop will run but void of the levelCompleteMethod, it would just be like a pause in the thread
    *                                       So if you set this to true and do not pass a levelCompleteTime, what happens is that the game effectively pauses,
    *                                       but you would need to call endLevelComplete to come out of it, or set _doAlternate to 0.
    *
    */
    levelComplete(levelCompleteMethod: Function, levelCompleteTime: number, dontRunAlternate: boolean): void;
    /**
    *
    *    @private
    *
    * @memberof GameSkeleton
    *
    */
    private _transitionByDoorTo;
    /**
    *
    *    @private
    *
    * @memberof GameSkeleton
    *
    */
    private _endingLevel;
    /**
    *
    *    Call this to finish and return from having called levelComplete
    *    A transition animation will happen then the main loop will start back.
    *
    * @memberof GameSkeleton.prototype
    * @method endLevelComplete
    * @param e
    *
    */
    endLevelComplete(e: any): void;
    private _changeDoAlternate;
    /**
    *
    *    Can be called when the game is complete, which switches the main loop to the gameCompleteMethod passed.
    *    Same as levelComplete but with less options, this method will switch the main loop to the gameCompleteMethod after 1 second.
    *    One second is given to ensure that the main loop has finished, this method causes the main loop to complete first, ending the request for animation frames.
    *    So you don't need to put a return after the call to this method, but its ok if you do.
    *    If autoToTitleTime is set, then fullResetToTitle will be called after that time, it should be more than 1 second.
    *
    * @memberof GameSkeleton.prototype
    * @method gameComplete
    * @param gameCompleteMethod {Function} The method to switch the main loop to. Will receive a ts time stamp param.
    * @param autoToTitleTime {Number} If set then after this amount of milliseconds the game will reset to title, needs to be more than 1000 if set.
    *
    */
    gameComplete(gameCompleteMethod: Function, autoToTitleTime: number): void;
    /**
    *   This method is used as the alternate loop methoed when gameOver has been called with no lives
    *    when start is pressed it will fullResetToTitle
    *
    * @memberof GameSkeleton.prototype
    * @method waitForStart
    * @param ts {Number}
    *
    */
    waitForStart(ts: number): void;
    /**
    *
    *    Subtracts 1 lives, if lives remains the scene is reset, if no lives it switches to the gameOverContainer screen (2) and waits for the start button to be pressed.
    *
    * @memberof GameSkeleton.prototype
    * @method gameOver
    * @param onlyRestPositionOnLooseLife {Boolean}
    * @param waitTime {Number}
    *
    */
    gameOver(onlyRestPositionOnLooseLife: boolean, waitTime: number): void;
    /**
    *
    *    If the game is paused this method would cause a full reset to title.
    *    If the game is not paused this method causes a basic scene reset, leading to resetPosition being called.
    *
    * @memberof GameSkeleton.prototype
    * @method goBack
    * @param e
    *
    */
    goBack(e: any): void;
    /**
    *
    *    Resets the game to the title screen.
    *
    * @memberof GameSkeleton.prototype
    * @method fullResetToTitle
    * @param e {Event}
    *
    */
    fullResetToTitle(e: Event): void;
    /**
    *
    *    This methos is used internally by other methods to reset scene or position.
    *
    * @memberof GameSkeleton.prototype
    * @method reset
    * @param e {Event} A key event, or Object, with keyCode of 82, 299 or 399. 82 would reset position, 299 would reset the scene, and 399 would end the level.
    *
    */
    reset(e: Event): void;
    /**
    *
    *    Potentially calls positionResetSpecifics if it has been set.
    *    Restarts the main loop.
    *
    * @memberof GameSkeleton.prototype
    * @method resetPosition
    * @param e
    *
    */
    resetPosition(e: any): void;
    /**
    *
    *    Potentially calls positionResetSpecifics then additionSceneResetSpecifics, if they have been defined.
    *    Then restarts the main game loop after 1 second.
    *
    * @memberof GameSkeleton.prototype
    * @method resetScene
    * @param e
    *
    */
    resetScene(e: any): void;
    /**
    *
    *
    *    You can call this method to go foward one scene.
    *     This method is using the sceneChanger.
    *
    * @memberof GameSkeleton.prototype
    * @method moveForwardOneScene
    *
    */
    moveForwardOneScene(): void;
    /**
    *
    *    You can call this method to go back to the previous scene, it would be like calling gotoSceneByDoor, but for just going back to whatever scene is previous.
    *   These move methods are working with the sceneChanger.
    *
    * @memberof GameSkeleton.prototype
    * @method moveBackOneScene
    *
    */
    moveBackOneScene(): void;
    /**
    *
    *    Change to the scene previous to the current.   2 - 1.
    *      This method is using the sceneChanger.
    *
    * @memberof GameSkeleton.prototype
    * @method moveUpOneScene
    *
    */
    moveUpOneScene(): void;
    /**
    *
    *    Change to the scene beyond the current scene. 2 + 1
    *      This method is using the sceneChanger.
    *
    * @memberof GameSkeleton.prototype
    * @method moveDownOneScene
    *
    */
    moveDownOneScene(): void;
    /**
    *
    *    Goto a scene right away without any transition.
    *
    *      The order of optional calls that would happen from this method being called is:
    *        optional priorToSceneChange  if it has been set
    *          Then the sceneChanger changeScene method is called
    *        then optional afterSceneChange  if it has been set
    *        then camera renderB1 and camera renderB2 to draw the scene.
    *
    *       The difference between this method and transitionToSceneByDoor
    *       is that transitionToSceneByDoor does a transition first then calls the above methods as the transition ends.
    *
    * @memberof GameSkeleton.prototype
    * @method gotoSceneByDoor
    * @param sceneToGoTo {Number} The number of the scene to go to.
    *
    */
    gotoSceneByDoor(sceneToGoTo: number): void;
    /**
    *
    *    Will transition to the scene after a default 1000 milliseconds.
    *    To have something happen during transition set the priorToSceneChange / afterSceneChange methods.
    *
    * @memberof GameSkeleton.prototype
    * @method transitionToSceneByDoor
    * @param scene {Number} The scene number from the TileSceneHolder to transition to.
    * @param transitionTime {Number} Default is 1000, scene will change after this millisecond delay.
    *
    */
    transitionToSceneByDoor(scene: number, transitionTime: number): void;
    /**
    *
    *    The amount of time in miliseconds that should pass before the game starts the next level after endLevel is called.
    * Default is 1000.
    *
    * @memberof GameSkeleton
    *
    */
    _endLevelTime: number;
    /**
    *
    *    To be called inside an alternate loop, use levelComplete to initate an alternate loop.
    *       Ends the alternate loop and restarts the main loop.
    *
    * @memberof GameSkeleton.prototype
    * @method endLevel
    * @param e
    *
    */
    endLevel(e: any): void;
    /**
    *
    *    Mutes or unmutes any sound/music playing.
    *    This method gets added as the event handler for the sound button in the hud.
    *
    * @memberof GameSkeleton.prototype
    * @method muteUnmute
    * @param e {Event}
    */
    muteUnmute(): number;
    /**
    *
    *    Loads and plays a sound.
    *
    * @memberof GameSkeleton.prototype
    * @method playSound
    * @param soundString {String} The name of the sound to play, by default it will play soundString".ogg", to change what type is loaded use the stype param
    * @param poolAmount {Number} The number of sounds to pool, if the sound is going to be a quick fire sound, like a bullet, then it needs to be pooled at least by 2 or 3.
    * @param [stype=".ogg"] {String} The type of sound file to load, default is '.ogg'.
    */
    playSound(soundString: string, poolAmount: number, stype?: string): void;
    /**
   *
   *    Loads and plays music. Quick sounds should be loaded and played with playSound.
   *     When called with different music the first track stops.
   *
   * @memberof GameSkeleton.prototype
   * @method playMusic
   * @param soundString {String} The name of the music track to play, by default it will play soundString".ogg", to change what type is loaded use the stype param.
   * @param [loop=1] {Number} To loop the track or not, default is 1, it loops by default.
   * @param [stype=".ogg"] {String} The type of music file to load, default is '.ogg'.
   */
    playMusic(soundString: string, loop?: number, stype?: string): void;
    /**
    *
    *    This method gets set up as the event handler for the x button in the hud.
    *      If not on the title screen will cause a reset to the title screen.
    *
    *
    * @memberof GameSkeleton.prototype
    * @method hudExit
    * @param e
    *
    */
    hudExit(e: any): void;
    /**
    *
    *    This method gets set up as the event handler for the question mark in the hud.
    *    If walkthroughLink has been defined and includes 'http'
    *    then when the question mark in the hud is clicked/touched the link would open in a new tab.
    *
    * @memberof GameSkeleton.prototype
    * @method hudToWalkthrough
    * @param e
    *
    */
    hudToWalkthrough(e: any): void;
    /**
    *
    *    A full reset of the whole game ending with a call to _reEstablish
    *
    *
    * @memberof GameSkeleton.prototype
    * @method _theReset
    * @param dontEstablish If true _reEstablsih will not be called, and so the method then acts as a destroy method.
    *
    *
    */
    _theReset(dontEstablish: any): void;
    /**
    *
    *     removes all HUD event listeners and removes the _HUD from the document body, and removes _playerHUD from container.
    *
    * @memberof GameSkeleton.prototype
    * @method removeHUD
    *
    */
    removeHUD(): void;
    /**
    *
    *    Called by establish and __instanceBasicTwoLayerResize.
    *   This method resizes the container based on cameraWidth/Height and gameScale
    *   It is handling a call to tabageos.ResizeGame
    *   In general this method happens as part of construction and automatically.
    *   If you needed to resize the game manually use __instanceBasicTwoLayerResize.
    *
    * @memberof GameSkeleton.prototype
    * @method _basicTwoLayerResize
    * @param cameraLayer
    * @param display
    * @param charLayer
    * @param cameraWidth
    * @param cameraHeight
    * @param controllerHeight
    * @param containerDiv
    * @param controllerInstance
    * @param gameScale
    *
    */
    _basicTwoLayerResize(cameraLayer: any, display: any, charLayer: any, cameraWidth: any, cameraHeight: any, controllerHeight: any, containerDiv: any, controllerInstance: any, gameScale: any): void;
    /**
    *
    *    Calls GameSkeleton.establish with instance properties.
    *
    * @memberof GameSkeleton.prototype
    * @method _reEstablish
    * @param e {Event}
    *
    */
    _reEstablish(e: Event): void;
    /**
    *
    *    This method is basically the value of the static GameSkeleton.establish method, but using the instance, therefore no params are needed.
    *    if addedResizeMethod has been defined it will be called after resizing.
    *
    *     The styles being used for resizing are using the calc css property, so for example container.style.left will be 'calc(50% - '+ (scaw/2) +'px)';
    *       where scaw is the scale width or cameraWidth if no scale.
    *
    * @memberof GameSkeleton.prototype
    * @method __instanceBasicTwoLayerResize
    *
    */
    __instanceBasicTwoLayerResize(): void;
    /**
    *
    * Setup a custom hud.
    * It's called setupCustomHealthHud because the _healthBar div is being used, but you can utilize html to style/position it in any way.
    *
    *  By default there is a right side HUD with 4 buttons and on the left a basic health bar is displayed using calls to showHealthBar/hideHealthBar.
    *  This method will hide the default right side HUD and gets the _healthBar left side area ready to be custom styled.
    *
    * @memberof GameSkeleton.prototype
    * @method setupCustomHealthHud
    * @param backgroundId {String} The id for the html div holding your custom hud, assign css to the id to style and positon the background of your custom hud
    *
    */
    setupCustomHealthHud(backgroundId: string): void;
    /**
    * Adds a div to the custom hud.
    *
    * @memberof GameSkeleton.prototype
    * @method addToCustomHud
    * @param divID {String} The id for the new div added to the custom hud, you can asign style to the id (in css) to style your custom addition
    * @param style {String} Style for the new div added to the custom hud, you can style via the id or you can pass in css style directly in this param
    * @returns {Number} Returns the part number of this addition, for example if it is the first part added the part number is 1 and so on.
    */
    addToCustomHud(divID: string, style: string): number;
    /**
    *
    *  Returns a reference to a div added to the custom hud via addToCustomHud
    *
    * @memberof GameSkeleton.prototype
    * @method getCustomHudPart
    * @param partNumber {Number} The number of the div to get. The number will be in the order that you called addToCustomHud.
    * @returns {HTMLDiv} A reference to the html div that was added to the custom hud.
    */
    getCustomHudPart(partNumber: number): HTMLDiv;
    /**
    *
    *
    * Removes all divs added with addToCustomHud
    *
    * @memberof GameSkeleton.prototype
    * @method removeCustomHudParts
    *
    *
    */
    removeCustomHudParts(): void;
    /**
    *
    *
    * Hides the custom hud (same as hideHealthBar)
    *
    * @memberof GameSkeleton.prototype
    * @method hideCustomHud
    *
    *
    */
    hideCustomHud(): void;
    /**
    *
    *
    * Shows the custom hud  (same as showHealthBar, but in this case it may not be being used as a health bar, it's just that _healthBar is the space used for the custom hud)
    *
    * @memberof GameSkeleton.prototype
    * @method showCustomHud
    * @param health {Number} The amount of health, also the width of the healthbar.
    * @param firstColor {String} an html color value
    * @param secondColor {String} am html color value
    * @param height {Number} the height of the health bar
    * @param replacementStyle {String} An optional style that would replace the default style, thereby the firstColor and secondColor and height params would not be used. Use this param to style the health bar yourself.
    * @param additionalStyle {String} A style that would be added to the default style.
    *
    *
    *
    */
    showCustomHud(health: number, firstColor: string, secondColor: string, height: number, replacementStyle: string, additionalStyle: string): void;
    /**
    *
    *
    * Stops the game loop and resets postion, the transition shows, then main loop would start again.
    *  And positionResetSpecifics would get called if it is set.
    *
    * @memberof GameSkeleton.prototype
    * @method simpleReset
    *
    *
    */
    simpleReset(): void;
    /**
    *
    *
    *  This method shakes the container for the specified time.
    *  this method is used in conjunction with the _loop method.
    *   this method is controlling camera.shake for you, utilizing also the includeShake method.
    *   You have more control over what shakes and how it shakes using the BasicCamera's shake methods directly.
    *   But this method is the easiest way to simply shake the screen.
    *
    * @memberof GameSkeleton.prototype
    * @method shake
    * @param time {Number} Amount of time to shake in milliseconds
    *
    */
    shake(time: number): void;
    /**
    *
    * Used by the shake method.
    *
    * @memberof GameSkeleton.prototype
    * @method includeShake
    *
    * @param time {Number} Amount of time to shake in milliseconds
    *
    */
    includeShake(time: number): void;
    /**
    *
    * A Worker created by the initWorkerLoop method.
    * by default this worker is set up during construction.
    *
    * @memberof GameSkeleton
    *
    * @type {Worker}
    *
    */
    __worker: Worker;
    /**
    *
    * Changes the frameRate and frameTime of the game.
    * This method must be used if you want to change frameRate/frameTime after construction.
    *
    * @memberof GameSkeleton.prototype
    * @method changeFrameRate
    *
    * @param to {Number} The frameRate to change to.
    *
    */
    changeFrameRate(to: number): void;
    /**
    *
    * Creates a Worker that runs a frameRate based loop. Automatically called as part of construction of the class.
    *
    * @memberof GameSkeleton.prototype
    * @method __loopWorker
    *
    * @return {Worker}
    *
    */
    __loopWorker(): Worker;
    __methodForWorker: (ts: number) => void;
    /**
    *
    * Creates a Worker that runs a frameRate based loop. And sets _loop to run on that independent loop.
    * This method is called as part of basicInitialize which is called as part of construction.
    *
    *   If a Worker can not be used, then requestAnimationFrame is used to repeatedy call _loop, and that call is then throttled using the _thrott and _pr properties.
    *   You can change what function the worker/requestAnimationFrame is calling by using the changeMainLoopMethod method.
    *   That function happens at the frameRate you set with the changeFrameRate function, by default 60 frames a second.
    *
    *   This method gets called as part of construction and a worker starts running _loop by default, but nothing happens in _loop until the start button is pressed.
    *   If a worker can not be set up, then requestAnimationFrame using _loop happens when the start button is pressed.
    *
    *
    * @memberof GameSkeleton.prototype
    * @method initWorkerLoop
    *
    *
    */
    initWorkerLoop(): void;
}
declare namespace GameSkeleton {
    let STANDARD_CAMERA: number;
    let STILL_CAMERA: number;
    let game: GameSkeleton;
    let _str: string[];
    /**
    *
    *
    *  Assigns a method to track prealoding. The method will get passed an event with a totalLoaded property.
    *  To preload sounds add them to the specs Object during construction as the preloadSounds array
    * 	To preload music add them to the specs Object preloadMusic array.
    *  The sprite sheet you pass as specs spriteSheetImage will get loaded then sounds
    *  And the method passed to this function will receive an event of all progress.
    *  If your streamlining your sprite sheet use tabageos.loadSpriteSheetAndStart instead of this method.
    *
    *
    * @method assignPreloadMethod
    * @param method {Function} the method to assign as the preloading method
    *
    *
    *
    */
    function assignPreloadMethod(meth: any): void;
    let _volumeSliderFimg: any;
    let _volumeSliderBimg: any;
    let _volumeSliderFront: string;
    let _volumeSliderBack: string;
    namespace _volumeSliderCords {
        let x: number;
        let y: number;
    }
    function _volumeSliderHandler(e: any): void;
    /**
    *
    *    A see and chase routine for enemies, pass the enemy obj and other specs and the enemy will chase the player when it sees it.
    *    This routine is for platformers, for top down games simply use .chase and .update of a Traveler class.
    *
    * @memberof GameSkeleton
    *  @method seeAndChanseRoutine
    * @param obj {MapMover} The enemy that will chase the player
    * @param enemies {Array} optional, the Array containing obj and the other enemies, if passed, then obj will separate and align with the others in the array.
    * @param player {MoverSkeleton} the MoverSkeleton for obj to chase
    * @param helperPoint {MoverPoint} a premade MoverPoint to aid calculations, you can just pass this._helperPoint from the GameSkeleton Class.
    * @param chaseRadius {Number} The radius from player that obj must be to initiate chase, default is 128.
    * @param dontOnlyChaseToX {Boolean} default is false, by default obj will only chase the x position of player and will maintain its own y position.
    * @param separationDistance {Number} this distance to separate from other enemies found in the enemies Array, default is 48.
    * @param map {Array} optional 2D Array of tile values to collide with, values of 0 or [0,0] would be passable spots.
    * @param tw {Number} width of each tile in map, default is 16.
    * @param th {Number} height of each tile in map, default is 16.
    */
    function seeAndChaseRoutine(obj: MapMover, enemies: any[], player: MoverSkeleton, helperPoint: MoverPoint, chaseRadius: number, dontOnlyChaseToX: boolean, separationDistance: number, map: any[], tw: number, th: number): void;
    /**
    *
    *    pick and throw scenery in a platformer sense.
    *
    *	see the SceneryObjectBlittedTraveler example in the examples section.
    *	https://www.tabageos.com/examples/SceneryObjectBlittedTraveler.html
    *
    * @memberof GameSkeleton
    *  @method basicPlatformerSceneryRoutine
    * @param player {MapMover}
    * @param checkToThrowMethod {Function} should return true if to throw
    * @param thePickUpMethod {Function} pick up method to use.
    * @param tileValuesArray {MoverPoint} a premade MoverPoint to aid calculations, you can just pass this._helperPoint from the GameSkeleton Class.
    * @param sceneryObjects {Array} array containing the SceneryObjects to be picked up or thrown
    * @param sceneryObjectLayer {CanvasObject} the CanvasObject to draw SceneryObejcts on
    * @param landLayer {CanvasObject} the land CanvasObject  to draw SceneryObejcts on
    * @param source {Image|HTMLCanvas} the source to draw from
    * @param map {Array} The array that contains SceneryObject values, and the players map
    * @param tw {Number} tile width
    * @param th {Number} tile height
    * @param maxThrowSpeed {number}
    * @param minThrowSpeed {Number}
    * @param gameWidth {Number}
    * @param gameHeight {Number}
    * @param hp {MoverPoint} helper point
    * @param [sceneChanger] {TileSceneChanger} the games TileSceneChanger, for sceneryObjectSceneChange if needed
    *
    */
    function basicPlatformerSceneryRoutine(player: MapMover, checkToThrowMethod: Function, checkToPickUpMethod: any, thePickUpMethod: Function, tileValuesArray: MoverPoint, sceneryObjects: any[], sceneryObjectLayer: CanvasObject, landLayer: CanvasObject, source: any, map: any[], tw: number, th: number, maxThrowSpeed: number, minThrowSpeed: number, gameWidth: number, gameHeight: number, hp: MoverPoint, sceneChanger?: TileSceneChanger): boolean;
    /**
    *
    *	throw pickup and interact with scenery in a top down sense by calling this method during the game loop
    *
    *	see the RPGSceneryObject example in examples
    *	https://wwww.tabageos.com/examples/RPGSceneryObject.html
    *
    * @memberof GameSkeleton
    * @method basicTopDownSceneryRotuien
    * @param player {TravelingSceneryThrower}
    * @param checkToThrowMethod {Function} a function that should return whether to throw or not, for example if a button is pressed
    * @param checkToPickUpMethod {Function} a function that should return whether to pick up or not, for example if a button is pressed
    * @param thePickUpMethod {Function} which method to use for picking up
    * @param tileValuesArray {Array} array of values of tiles that are SceneryObjects
    * @param sceneryObjects {Array} array containing the SceneryObjects to be picked up or thrown
    * @param sceneryObjectLayer {CanvasObject} the CanvasObject to draw SceneryObejcts on
    * @param landLayer {CanvasObject} the land CanvasObject  to draw SceneryObejcts on
    * @param source {Image|HTMLCanvas} the source to draw from
    * @param map {Array} The array that contains SceneryObject values, and the players map
    * @param tw {Number} tile width
    * @param th {Number} tile height
    * @param maxThrowSpeed {number}
    * @param minThrowSpeed {Number}
    * @param gameWidth {Number}
    * @param gameHeight {Number}
    * @param hp {MoverPoint} helper point
    *
    */
    function basicTopDownSceneryRoutine(player: TravelingSceneryThrower, checkToThrowMethod: Function, checkToPickUpMethod: Function, thePickUpMethod: Function, tileValuesArray: any[], sceneryObjects: any[], sceneryObjectLayer: CanvasObject, landLayer: CanvasObject, source: any, map: any[], tw: number, th: number, maxThrowSpeed: number, minThrowSpeed: number, gameWidth: number, gameHeight: number, hp: MoverPoint): boolean;
    /**
    *
    *    This static method is called by the GameSkeleton constructor and should generally not be used.
    *    This method sets up GameSkeleton.game._image, calls basicInitalize and does initial resizing of the game.
    *    To do everything this method does except ._image setup use the .__instanceBasicTwoLayerResize method on the instance.
    *    To recall this method once everything has already been constructed use the ._reEstablish method on the instance.
    *    If you want to change your whole sprite sheet on the fly, set it up manually to be GameSkeleton.__sprites as a CanvasObject.
    *    Or streamline it using the tabageos.loadSpriteSheetAndStart static Utility method, in which case it would also end up as the GameSkeleton.__sprites CanvasObject.
    *    then you would just use __sprites.copyPixels to change the sprite sheet itself.
    *
    * @memberof GameSkeleton
    * @method establish
    * @param gameInstance
    * @param spriteSheetImage An html image a CanvasObject or the string 'streamline'
    * @param containerDivId {String}
    * @param rootDivId {String}
    * @param controllerDivId {String}
    * @param gameScale {Number}
    * @param useScreenOrganizer {Boolean}
    * @param startWidth {Number}
    * @param startHeight {Number}
    */
    function establish(gameInstance: any, spriteSheetImage: any, containerDivId: string, rootDivId: string, controllerDivId: string, gameScale: number, useScreenOrganizer: boolean, startWidth: number, startHeight: number): void;
}
//# sourceMappingURL=GameSkeleton.d.ts.map