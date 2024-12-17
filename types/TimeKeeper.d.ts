declare function TimeKeeper(): void;
/**
*
* @class TimeKeeper
* @classdesc
*   A class of static methods that could be used to keep and get frame time
*  TimeKeeper._sae is used as the deltaTime value in classes such as MapTraveler.
*
*
*/
declare function TimeKeeper(): void;
declare class TimeKeeper {
}
declare namespace TimeKeeper {
    let started: boolean;
    let time: number;
    let timeElapsed: number;
    let newTime: number;
    let slowness: number;
    let _aid: number;
    let _oaid: number;
    let _sae: number;
    /**
    *
    *  sets TimeKeeper.time to now()
    *  and updates timeElapsed
    *
    * @memberof TimeKeeper
    * @method keepTime
    */
    function keepTime(): void;
    function _keepTime(tme: any): void;
    function status(stat: any): void;
    function reset(ts: any): void;
    function init(): void;
    function speedAdjustedElapsed(): number;
    function now(): number;
}
//# sourceMappingURL=TimeKeeper.d.ts.map