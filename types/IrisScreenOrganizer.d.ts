declare function IrisScreenOrganizer(game: CanvasPbjectContainer, screenClasses: any[], screenConfigs: any[]): void;
/**
*@class IrisScreenOrganizer
*@classdesc
*   A ScreenOrganizer that uses an iris style transition.
*
*
*
* @param game {CanvasPbjectContainer} A reference to the CanvasObjectContainer that is holding the whole game.
* @param screenClasses {Array} An Array of Classes that this screen organizer will hold. Other CanvasObjectContainers or CanvasObjects that will act as different screens for the game.
* @param screenConfigs  {Array} An optional Array of methods to call when each screen is initialized.
*
*/
declare function IrisScreenOrganizer(game: CanvasPbjectContainer, screenClasses: any[], screenConfigs: any[]): void;
declare class IrisScreenOrganizer {
    constructor(game: CanvasPbjectContainer, screenClasses: any[], screenConfigs: any[]);
    /**
    *@class IrisScreenOrganizer
    *@classdesc
    *   A ScreenOrganizer that uses an iris style transition.
    *
    *
    *
    * @param game {CanvasPbjectContainer} A reference to the CanvasObjectContainer that is holding the whole game.
    * @param screenClasses {Array} An Array of Classes that this screen organizer will hold. Other CanvasObjectContainers or CanvasObjects that will act as different screens for the game.
    * @param screenConfigs  {Array} An optional Array of methods to call when each screen is initialized.
    *
    */
    constructor(game: CanvasPbjectContainer, screenClasses: any[], screenConfigs: any[]);
    fullRect: Rectangle;
    /**
    *  Overrriden method of ScreenOrganizer
    *
    *
    * @memberof IrisScreenOrganizer.prototype
    * @method initializeTransition
    * @returns {}
    */
    initializeTransition(): any;
    /**
    *   Overrriden method of ScreenOrganizer
    *    uses coverShape and draws an iris. Returns true when the iris has filled.
    *
    * @memberof IrisScreenOrganizer.prototype
    * @method transitionBackward
    * @returns {}
    */
    transitionBackward(): any;
    /**
    *   Overrriden method of ScreenOrganizer
    *
    *
    * @memberof IrisScreenOrganizer.prototype
    * @method transitionForward
    * @returns {}
    */
    transitionForward(): any;
}
//# sourceMappingURL=IrisScreenOrganizer.d.ts.map