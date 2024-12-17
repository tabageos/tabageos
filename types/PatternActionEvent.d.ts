declare function PatternActionEvent(tileValue: any, tileXIndex: number, tileYIndex: number, patternIndex: number, autoCompute: boolean, type: string, x: number, y: number): void;
/**
*@class PatternActionEvent
* @classdesc
*   An Event that is dispatched via the BlitMath.dispatchFunctionAssignments method.
*    It will hold information about a tile computed during the BlitMath.dispatchFunctionAssignments method,
*    and is dispatched using the EventDispatcher passed to the BlitMath.dispatchFunctionAssignments method.
*	 see BlitMath.dispatchFunctionAssignments.
*
*
* @param tileValue {Object} The value of the tile in the pattern
* @param tileXIndex {Number} The x index of the tile in the pattern
* @param tileYIndex {Number} The y index of the tile in the pattern
* @param patternIndex {Number} The index of the pattern; 0.
* @param autoCompute {Boolean} Auto calculate the x and y specific location of the tile in the pattern. Uses BlitMath._specs.blitWidth and BlitMath._specs.blitHeight  *  the tileXIndex and tileYIndex given.
* @param type {String} The type of PatternActionEvent either "patternActionEvent" or "functionAssignment"
* @param x {Number} The specific x location of the tile referenced by this Event.
* @param y  {Number} The specific y location, in the pattern given to BlitMath.dispatchFunctionAssignments, of the tile referenced by this Event.
*
*/
declare function PatternActionEvent(tileValue: any, tileXIndex: number, tileYIndex: number, patternIndex: number, autoCompute: boolean, type: string, x: number, y: number): void;
declare class PatternActionEvent {
    constructor(tileValue: any, tileXIndex: number, tileYIndex: number, patternIndex: number, autoCompute: boolean, type: string, x: number, y: number);
    /**
    *@class PatternActionEvent
    * @classdesc
    *   An Event that is dispatched via the BlitMath.dispatchFunctionAssignments method.
    *    It will hold information about a tile computed during the BlitMath.dispatchFunctionAssignments method,
    *    and is dispatched using the EventDispatcher passed to the BlitMath.dispatchFunctionAssignments method.
    *	 see BlitMath.dispatchFunctionAssignments.
    *
    *
    * @param tileValue {Object} The value of the tile in the pattern
    * @param tileXIndex {Number} The x index of the tile in the pattern
    * @param tileYIndex {Number} The y index of the tile in the pattern
    * @param patternIndex {Number} The index of the pattern; 0.
    * @param autoCompute {Boolean} Auto calculate the x and y specific location of the tile in the pattern. Uses BlitMath._specs.blitWidth and BlitMath._specs.blitHeight  *  the tileXIndex and tileYIndex given.
    * @param type {String} The type of PatternActionEvent either "patternActionEvent" or "functionAssignment"
    * @param x {Number} The specific x location of the tile referenced by this Event.
    * @param y  {Number} The specific y location, in the pattern given to BlitMath.dispatchFunctionAssignments, of the tile referenced by this Event.
    *
    */
    constructor(tileValue: any, tileXIndex: number, tileYIndex: number, patternIndex: number, autoCompute: boolean, type: string, x: number, y: number);
    type: string;
    potato: {};
    target: any;
    typeToBe: string;
    tileValue: any;
    tileXIndex: number;
    tileYIndex: number;
    autoCompute: boolean;
    patternIndex: number;
    x: number;
    y: number;
    /**
    *
    *    Clones the PatternActionEvent.
    *
    * @memberof PatternActionEvent.prototype
    * @method clone
    * @returns {PatternActionEvent}
    */
    clone(): PatternActionEvent;
}
declare namespace PatternActionEvent {
    let PATTERN_ACTION_EVENT: string;
    let FUNCTION_ASSIGNMENT: string;
}
//# sourceMappingURL=PatternActionEvent.d.ts.map