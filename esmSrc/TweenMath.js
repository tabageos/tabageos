import {RPEase} from './RPEase.js';


	'use strict';
	
    function TweenMath() {};
	TweenMath.LINEAR = "Linear";
    TweenMath.IN = "In";
    TweenMath.OUT = "Out";
    TweenMath.IN_OUT = "In" + "Out";
    TweenMath.IN_BOUNCE = "In" + "Bounce";
    TweenMath.OUT_BOUNCE = "Out" + "Bounce";
    TweenMath.IN_BACK = "In" + "Back";
    TweenMath.OUT_BACK = "Out" + "Back";
    TweenMath.IN_CIRC = "In" + "Circ";
    TweenMath.OUT_CIRC = "Out" + "Circ";
    TweenMath.IN_ELASTIC = "In" + "Elastic";
    TweenMath.OUT_ELASTIC = "Out" + "Elastic";
    TweenMath.IN_LINEAR = "In" + "Linear";
    TweenMath.OUT_LINEAR = "Out" + "Linear";
    TweenMath.IN_SINE = "In" + "Sine";
    TweenMath.OUT_SINE = "Out" + "Sine";
    TweenMath.IN_QUAD = "In" + "Quad";
    TweenMath.OUT_QUAD = "Out" + "Quad";
    TweenMath.easeOptions = {
        "Linear": true,
        "InLinear": true,
        "OutLinear": 1,
        "InOutLinear": 1,
        "InElastic": 1,
        "OutElastic": 1,
        "InOutElastic": 1,
        "InQuad": 1,
        "OutQuad": 1,
        "InOutQuad": 1,
        "InBounce": 1,
        "InOutBounce": 1,
        "OutBounce": 1,
        "InCirc": 1,
        "InBack": 1,
        "OutBack": 1,
        "InOutBack": 1,
        "InQuint": 1,
        "OutQuint": 1,
        "InOutQuint": 1,
        "OutCirc": 1,
        "InOutCirc": 1,
        "In": 1,
        "Out": 1,
        "InOut": 1,
        "InSine": 1,
        "OutSine": 1,
        "InOutSine": 1
    };
    TweenMath._argsers = [0, 0];
    TweenMath.tweenArray = function(start, end, interval, how, loopOptions, theArray) {
        var v = theArray || [];
        var si = 0;
        var realHow = "Linear";
        if (TweenMath.easeOptions[how]) {
            realHow = how;
        }
        var ending = end - start;
        TweenMath._argsers[0] = ((realHow.indexOf("Back") != -1) ? 1.70158 : 0);
        var millisecondRate = (loopOptions ? loopOptions.millisecondRate || 1000 : 1000);
        var frameRate = (loopOptions ? loopOptions.frameRate || 60 : 60);
        var useSeconds = (loopOptions ? loopOptions.useSeconds || 0 : 0);
        var secondIterations = Math.floor(interval);
        var milliRate = Math.floor(millisecondRate / frameRate);
        var millisecondIterations = (interval / milliRate) >= 1 ? Math.floor(interval / milliRate) : 1;
        var iterations = (useSeconds > 0 ? secondIterations : millisecondIterations);
        for (si = 0; si <= iterations; si++) {
            v[si] = RPEase[realHow](si, start, ending, iterations, TweenMath._argsers[0], TweenMath._argsers[1]);
        }
        return v;
    };
    export { TweenMath   };



