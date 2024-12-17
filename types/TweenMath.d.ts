declare function TweenMath(): void;
/**
* @class TweenMath
* @classdesc
*  Used for getting various tweens from point a to point b.
*
*
*
*
*/
declare function TweenMath(): void;
declare class TweenMath {
}
declare namespace TweenMath {
    let LINEAR: string;
    let IN: string;
    let OUT: string;
    let IN_OUT: string;
    let IN_BOUNCE: string;
    let OUT_BOUNCE: string;
    let IN_BACK: string;
    let OUT_BACK: string;
    let IN_CIRC: string;
    let OUT_CIRC: string;
    let IN_ELASTIC: string;
    let OUT_ELASTIC: string;
    let IN_LINEAR: string;
    let OUT_LINEAR: string;
    let IN_SINE: string;
    let OUT_SINE: string;
    let IN_QUAD: string;
    let OUT_QUAD: string;
    namespace easeOptions {
        let Linear: boolean;
        let InLinear: boolean;
        let OutLinear: number;
        let InOutLinear: number;
        let InElastic: number;
        let OutElastic: number;
        let InOutElastic: number;
        let InQuad: number;
        let OutQuad: number;
        let InOutQuad: number;
        let InBounce: number;
        let InOutBounce: number;
        let OutBounce: number;
        let InCirc: number;
        let InBack: number;
        let OutBack: number;
        let InOutBack: number;
        let InQuint: number;
        let OutQuint: number;
        let InOutQuint: number;
        let OutCirc: number;
        let InOutCirc: number;
        let In: number;
        let Out: number;
        let InOut: number;
        let InSine: number;
        let OutSine: number;
        let InOutSine: number;
    }
    let _argsers: number[];
    /**
    *
    *
    *
    * The TweenMath.tweenArray method returns an Array that contains the numbers that make up a tween between two numbers.
    * @memberof TweenMath
    * @method tweenArray
    *
    * @param start {Number} The beginning number to start from.
    * @param end {Number} The number to end on.
    * @param interval {Number} The amount of time in milliseconds that the tween should take.
    * @param [how='Linear'] {String} The type of tween to use. Default is "Linear".
    * @param [loopOptions] {Object} .millisecondRate, default is 1000;  .frameRate, default is 60; .useSeconds, default is 0;
    * @param [theArray] {Array} You can optionally pass in a pre made Array to use, otherwise a new Array is made.
    *
    * @returns {Array} The Array of numbers that make up the tween. Use a loop to cycle through the numbers and apply them to whatever you want to tween.
    *
    */
    function tweenArray(start: number, end: number, interval: number, how?: string, loopOptions?: any, theArray?: any[]): any[];
}
//# sourceMappingURL=TweenMath.d.ts.map