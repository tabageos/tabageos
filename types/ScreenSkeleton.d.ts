declare function ScreenSkeleton(screenOrg: ScreenOrganizer, divID: string, width: number, height: number, rootCanvasObjectContainer: CanvasObjectContainer, floorColorString: string): void;
/**
*
*@classdesc
*   A ScreenSkeleton is a CanvasObjectContainer representing a game screen that can be used with the ScreenOrganizer Class.
*
*
* @class ScreenSkeleton
* @param screenOrg {ScreenOrganizer}
* @param divID {String}
* @param width {Number}
* @param height {Number}
* @param rootCanvasObjectContainer {CanvasObjectContainer}
* @param floorColorString  {String}
*
*/
declare function ScreenSkeleton(screenOrg: ScreenOrganizer, divID: string, width: number, height: number, rootCanvasObjectContainer: CanvasObjectContainer, floorColorString: string): void;
declare class ScreenSkeleton {
    constructor(screenOrg: ScreenOrganizer, divID: string, width: number, height: number, rootCanvasObjectContainer: CanvasObjectContainer, floorColorString: string);
    /**
    *
    *@classdesc
    *   A ScreenSkeleton is a CanvasObjectContainer representing a game screen that can be used with the ScreenOrganizer Class.
    *
    *
    * @class ScreenSkeleton
    * @param screenOrg {ScreenOrganizer}
    * @param divID {String}
    * @param width {Number}
    * @param height {Number}
    * @param rootCanvasObjectContainer {CanvasObjectContainer}
    * @param floorColorString  {String}
    *
    */
    constructor(screenOrg: ScreenOrganizer, divID: string, width: number, height: number, rootCanvasObjectContainer: CanvasObjectContainer, floorColorString: string);
    _screenOrg: ScreenOrganizer;
    /**
    *
    *
    *
    * @memberof ScreenSkeleton
    *
    */
    _buttons: {};
    /**
    *
    *
    *
    * @memberof ScreenSkeleton
    *
    */
    _index: number;
    /**
    *
    *
    *
    * @memberof ScreenSkeleton
    *
    */
    _currentArea: string;
    /**
    *
    *    Establish an area of the ScreenSkeleton as clickable
    *    This method is using the MouseController Class to grab global events and the _buttons Object to handle specifics.
    *    This method sets up the _buttons Object and global mouse events.
    *
    * @memberof ScreenSkeleton.prototype
    * @method establishClickArea
    * @param name {String} name of the click area
    * @param clickObject {Object} Object that has the click handler method
    * @param clickHandlerString {String} click handler method name
    * @param left {Number} left x position of click area
    * @param right {Number} right x position of click area
    * @param top {Number} top y position of click area
    * @param bottom {Number} bottom y position of click area
    * @param overHandler {Function} function for mouse over
    * @param outHandler {Function} function for mouse out
    *
    */
    establishClickArea(name: string, clickObject: any, clickHandlerString: string, left: number, right: number, top: number, bottom: number, overHandler: Function, outHandler: Function): void;
    /**
    *
    *    Disable all click areas.
    *
    * @memberof ScreenSkeleton.prototype
    * @method disableClickAreas
    *
    */
    disableClickAreas(): void;
    /**
    *
    *    Enable all click areas.
    *
    * @memberof ScreenSkeleton.prototype
    * @method enableClickAreas
    *
    */
    enableClickAreas(): void;
    /**
    *
    *    Remove this screen from the _screenOrg
    *
    * @memberof ScreenSkeleton.prototype
    * @method remove
    * @param e
    *
    */
    remove(e: any): void;
    /**
    *
    *    Handles clicks, setup with establishClickArea
    *
    * @memberof ScreenSkeleton.prototype
    * @method handleClicks
    * @param e
    *
    */
    handleClicks(e: any): void;
    /**
    *
    *    Handles mouse over and mouse out, setup by establishClickArea
    *
    * @memberof ScreenSkeleton.prototype
    * @method mousePositionHandler
    * @param e
    *
    */
    mousePositionHandler(e: any): void;
}
//# sourceMappingURL=ScreenSkeleton.d.ts.map