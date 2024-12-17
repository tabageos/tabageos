/**
*
* @class MouseEvent
*   @classdesc
*    Used by the MouseController Class.
*
*
* @param type {String}
* @param potato  {Object}
*
*/
declare function MouseEvent(type: string, potato: any): void;
declare class MouseEvent {
    /**
    *
    * @class MouseEvent
    *   @classdesc
    *    Used by the MouseController Class.
    *
    *
    * @param type {String}
    * @param potato  {Object}
    *
    */
    constructor(type: string, potato: any);
    type: string;
    potato: any;
    target: any;
    x: number;
    y: number;
}
declare namespace MouseEvent {
    let MOUSE_UP: string;
    let MOUSE_DOWN: string;
    let MOUSE_EVENT: string;
    let MOUSE_MOVE: string;
}
//# sourceMappingURL=MouseEvent.d.ts.map