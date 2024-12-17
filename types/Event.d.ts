/**
*
*@class Event
*
*@classdesc
*    A basic Event Class.
*
*
* @param [type] {String} The type of Event
* @param [potato] {Object} An optional variable
*
*/
declare function Event(type?: string, potato?: any): void;
declare class Event {
    /**
    *
    *@class Event
    *
*@classdesc
*    A basic Event Class.
*
*
* @param [type] {String} The type of Event
* @param [potato] {Object} An optional variable
*
*/
    constructor(type?: string, potato?: any);
    type: string;
    potato: any;
    target: any;
    /**
    *
    *    Does not do anything, for override and available if needed.
    *
    * @memberof Event.prototype
    * @method preventDefault
    *
    */
    preventDefault(): void;
}
//# sourceMappingURL=Event.d.ts.map