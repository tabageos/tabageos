declare function MouseController(): void;
/**
*
*
*@class MouseController
* @classdesc
*   static methods for getting the position of the mouse.
*
*
*/
declare function MouseController(): void;
declare class MouseController {
}
declare namespace MouseController {
    let ready: boolean;
    let _mX: number;
    let _mY: number;
    let _oX: number;
    let _oY: number;
    let _mmp: MoverPoint;
    let _ed: EventDispatcher;
    let _muE: MouseEvent;
    let _mdE: MouseEvent;
    let _mmE: MouseEvent;
    /**
    *
    * Returns the x position of the mouse.
    *  No setup needed, just call tabageos.MouseController.mouseX() to get the x position of the mouse.
    * @method mouseX
    * @memberof MouseController
    *
    *
    */
    function mouseX(): number;
    /**
    *
    * Returns the y position of the mouse.
    *  No setup needed, just call tabageos.MouseController.mouseY() to get the y position of the mouse.
    * @method mouseY
    * @memberof MouseController
    *
    *
    */
    function mouseY(): number;
    /**
    *
    * Returns the position of the mouse as a MoverPoint.
    * @method mouseMoverPoint
    * @memberof MouseController
    *
    *
    */
    function mouseMoverPoint(): MoverPoint;
    function updateMousePosition(e: any): void;
    function mouseUpHandler(e: any): void;
    function mouseDownHandler(e: any): void;
    function addEventListener(type: any, listenerString: any, listenerObject: any): void;
    function removeEventListener(type: any, listenerString: any, listenerObject: any): boolean;
    function dispatchEvent(event: any): void;
    /**
    *
    * Defines the offset for the mouse based on the original width/height verses the scale width/height
    * @method mouseMoverPoint
    * @memberof MouseController
    *
    * @param origWidth {Number} The original width of the mouse area (typically the container)
    * @param origHeight {Number} The original height of the mouse area
    * @param scaledWidth {Number} The current width of the mouse area
    * @param scaledHeight {Number} The current height of the mouse area
    *
    *
    *
    */
    function defineMousePositionOffset(origWidth: number, origHeight: number, scaledWidth: number, scaledHeight: number): void;
    function _defineMouseEvent(e: any): any;
}
//# sourceMappingURL=MouseController.d.ts.map