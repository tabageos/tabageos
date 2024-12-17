declare function ScreenOrganizer(game: CanvasObjectContainer, screenClasses: any[], screenConfigs?: any[]): void;
/**
* @classdesc
*   Holds and references the Objects that make up a games various screens,
*   and has methods for switching between them with graphical transitions.
* @see EventDispatcher
*
* @class ScreenOrganizer
* @param game {CanvasObjectContainer} A reference to the CanvasObjectContainer that is holding the whole game.
* @param screenClasses {Array} An Array of Classes or Objects that this screen organizer will hold. Other CanvasObjectContainers or CanvasObjects that will act as different screens for the game.
* @param [screenConfigs] {Array} An optional Array of methods to call when each screen is initialized.
*
*
*
*
*/
declare function ScreenOrganizer(game: CanvasObjectContainer, screenClasses: any[], screenConfigs?: any[]): void;
declare class ScreenOrganizer {
    constructor(game: CanvasObjectContainer, screenClasses: any[], screenConfigs?: any[]);
    /**
    * @classdesc
    *   Holds and references the Objects that make up a games various screens,
    *   and has methods for switching between them with graphical transitions.
    * @see EventDispatcher
    *
    * @class ScreenOrganizer
    * @param game {CanvasObjectContainer} A reference to the CanvasObjectContainer that is holding the whole game.
    * @param screenClasses {Array} An Array of Classes or Objects that this screen organizer will hold. Other CanvasObjectContainers or CanvasObjects that will act as different screens for the game.
    * @param [screenConfigs] {Array} An optional Array of methods to call when each screen is initialized.
    *
    *
    *
    *
    */
    constructor(game: CanvasObjectContainer, screenClasses: any[], screenConfigs?: any[]);
    _thrott: number;
    pr: number;
    _aid: number;
    /**
    *
    *    Acts like a super function.
    *
    * @memberof ScreenOrganizer.prototype
    * @method init
    * @param game {Object} A reference to the CanvasObjectContainer that holds the whole game.
    * @param screenClasses {Array} An Array of Classes or Objects that will make up the game. If you pass Classes, they will be instantiated.
    * @param screenConfigs {Array} An optional Array of methods to call when each related class is added
    *
    */
    init(game: any, screenClasses: any[], screenConfigs: any[]): void;
    theGame: any;
    myEvents: EventDispatcher;
    coverShape: CanvasObject;
    screenChanging: ScreenChangeEvent;
    covered: ScreenChangeEvent;
    uncovered: ScreenChangeEvent;
    rectRef: Rectangle;
    _screens: any[];
    gameTitleScreen: any;
    /**
    *
    *
    *
    * @memberof ScreenOrganizer
    *
    */
    currentScreen: any;
    /**
    *
    *    @private
    *
    * @memberof ScreenOrganizer
    *
    */
    private _waitForUnderCoverChanges;
    /**
    *
    *
    *
    * @memberof ScreenOrganizer
    *
    */
    coverTimer: any;
    /**
    *
    *
    *
    * @memberof ScreenOrganizer
    *
    */
    transitioning: number;
    /**
    *
    *    Returns true if a transition is currently happening.
    *
    * @memberof ScreenOrganizer.prototype
    * @method getTransitionStatus
    * @returns {Boolean}
    */
    getTransitionStatus(): boolean;
    /**
    *
    *
    *
    * @memberof ScreenOrganizer.prototype
    * @method getScreens
    * @returns {Array}
    */
    getScreens(): any[];
    /**
    *
    *
    *
    * @memberof ScreenOrganizer.prototype
    * @method getGameReference
    * @returns {Object}
    */
    getGameReference(): any;
    /**
    *
    *
    *
    * @memberof ScreenOrganizer.prototype
    * @method getCoverAnimationRate
    * @returns {Number}
    */
    getCoverAnimationRate(): number;
    /**
    *
    *
    *
    * @memberof ScreenOrganizer.prototype
    * @method setCoverAnimationRate
    * @param toThis {Number}
    *
    */
    setCoverAnimationRate(toThis: number): void;
    /**
    *
    *    @type {String}
    *
    * @memberof ScreenOrganizer
    *
    */
    _cColor: string;
    /**
    *
    *
    *
    * @memberof ScreenOrganizer.prototype
    * @method getCoverColor
    * @returns {String}
    */
    getCoverColor(): string;
    /**
    *
    *
    *
    * @memberof ScreenOrganizer.prototype
    * @method setCoverColor
    * @param toThis
    *
    */
    setCoverColor(toThis: any): void;
    /**
    *
    *
    *
    * @memberof ScreenOrganizer.prototype
    * @method getWaitForUnderCoverChanges
    * @returns {Boolean}
    */
    getWaitForUnderCoverChanges(): boolean;
    /**
    *
    *    If set to true then the transition will wait for any under cover changes to complete before transitioning back.
    *
    * @memberof ScreenOrganizer.prototype
    * @method setWaitForUnderCoverChanges
    * @param toThis {Boolean}
    *
    */
    setWaitForUnderCoverChanges(toThis: boolean): void;
    /**
    *
    *    Transition foward without removing screens. Used by changeScreen.
    *
    * @memberof ScreenOrganizer.prototype
    * @method showCoverNoKill
    * @param ts
    *
    */
    showCoverNoKill(ts: any): void;
    /**
    *
    *
    *
    * @memberof ScreenOrganizer.prototype
    * @method initializeTransition
    *
    */
    initializeTransition(): void;
    /**
    *
    *
    *
    * @memberof ScreenOrganizer.prototype
    * @method addScreenUnderCover
    * @param e
    *
    */
    addScreenUnderCover(e: any): void;
    /**
    *
    *
    *
    * @memberof ScreenOrganizer.prototype
    * @method transitionBackward
    * @returns {Boolean} Returns true when transition is complete
    */
    transitionBackward(): boolean;
    /**
    *
    *
    *
    * @memberof ScreenOrganizer.prototype
    * @method transitionForward
    * @returns {Boolean} Returns true when transition is complete
    */
    transitionForward(): boolean;
    /**
    *
    *    Change to the screen without removing other screens.
    *
    * @memberof ScreenOrganizer.prototype
    * @method changeScreen
    * @param toThis {Number}
    *
    */
    changeScreen(toThis: number): void;
    /**
    *
    *    Switch to a screen and remove all others.
    *
    * @memberof ScreenOrganizer.prototype
    * @method switchScreen
    * @param toThis
    *
    */
    switchScreen(toThis: any): void;
    /**
    *
    *
    *
    * @memberof ScreenOrganizer.prototype
    * @method initRemoveCover
    * @param e
    *
    */
    initRemoveCover(e: any): void;
    /**
    *
    *
    *
    * @memberof ScreenOrganizer.prototype
    * @method removeCoverByFadeOut
    * @param ts
    *
    */
    removeCoverByFadeOut(ts: any): void;
    /**
    *
    *    Transitions foward and removes all children from theGame. Used by switchScreen.
    *
    * @memberof ScreenOrganizer.prototype
    * @method showCoverAndKill
    * @param ts
    *
    */
    showCoverAndKill(ts: any): void;
    /**
    *
    *
    *
    * @memberof ScreenOrganizer.prototype
    * @method uncoverDone
    * @param e
    *
    */
    uncoverDone(e: any): void;
}
declare namespace ScreenOrganizer {
    let _instance: any;
}
//# sourceMappingURL=ScreenOrganizer.d.ts.map