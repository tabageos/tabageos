/**
*
*@class EventDispatcher
*  @classdesc
*    A basic EventDispatcher Class.
*
*
*
*/
declare function EventDispatcher(): void;
declare class EventDispatcher {
    _listeners: {};
    /**
    *
    *    Adds a listener method to be dispatched.
    *
    * @memberof EventDispatcher.prototype
    * @method addEventListener
    * @param type {String} The type of Event to listen for.
    * @param listenerMethod {String} The function to call when the Event fires.
    * @param listenerObject {Object} The object that contains the function to call.
    *
    */
    addEventListener(type: string, listenerMethod: string, listenerObject: any): void;
    /**
    *
    *    Removes a listener
    *
    * @memberof EventDispatcher.prototype
    * @method removeEventListener
    * @param type {String} The type of Event
    * @param listenerMethod {String} The method to remove
    * @param listenerObject {Object} The Object that contains the method.
    * @returns {Boolean} Returns true if a listener was removed.
    */
    removeEventListener(type: string, listenerMethod: string, listenerObject: any): boolean;
    /**
    *
    *    Fires the given Event.
    *
    * @memberof EventDispatcher.prototype
    * @method dispatchEvent
    * @param event {Event} The Event to fire.
    * @param [applyTarget=false] {Boolean} Set this instance as the Events target. Default is false.
    *
    */
    dispatchEvent(event: Event, applyTarget?: boolean): void;
}
//# sourceMappingURL=EventDispatcher.d.ts.map