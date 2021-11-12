(function() { 
	'use strict'; 
	
	function RPEase() {};
	RPEase.easeOptions = {
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
	RPEase.InBack = function(t, b, c, d, s) {
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	}
	;
	RPEase.OutBack = function(t, b, c, d, s) {
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	}
	;
	RPEase.InOutBack = function(t, b, c, d, s) {
		if ((t /= d / 2) < 1)
		return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
		return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	}
	;
	RPEase.OutBounce = function(t, b, c, d) {
		if ((t /= d) < (1 / 2.75)) {
			return c * (7.5625 * t * t) + b;
		} else if (t < (2 / 2.75)) {
			return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
		} else if (t < (2.5 / 2.75)) {
			return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
		} else {
			return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
		}
	}
	;
	RPEase.InBounce = function(t, b, c, d) {
		return c - RPEase.OutBounce(d - t, 0, c, d) + b;
	}
	;
	RPEase.InOutBounce = function(t, b, c, d) {
		if (t < d / 2)
		return RPEase.InBounce(t * 2, 0, c, d) * .5 + b;
		else
		return RPEase.OutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
	}
	;
	RPEase.InCirc = function(t, b, c, d) {
		return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	}
	;
	RPEase.OutCirc = function(t, b, c, d) {
		return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	}
	;
	RPEase.InOutCirc = function(t, b, c, d) {
		if ((t /= d / 2) < 1)
		return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
		return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	}
	;
	RPEase.In = function(t, b, c, d) {
		return c * (t /= d) * t * t + b;
	}
	;
	RPEase.Out = function(t, b, c, d) {
		return c * ((t = t / d - 1) * t * t + 1) + b;
	}
	;
	RPEase.InOut = function(t, b, c, d) {
		if ((t /= d / 2) < 1)
		return c / 2 * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t + 2) + b;
	}
	;
	RPEase.InElastic = function(t, b, c, d, a, p) {
		if (t == 0)
		return b;
		if ((t /= d) == 1)
		return b + c;
		if (!p)
		p = d * .3;
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else
		s = p / (2 * Math.PI) * Math.asin(c / a);
		return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	}
	;
	RPEase.OutElastic = function(t, b, c, d, a, p) {
		if (t == 0)
		return b;
		if ((t /= d) == 1)
		return b + c;
		if (!p)
		p = d * .3;
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else
		s = p / (2 * Math.PI) * Math.asin(c / a);
		return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
	}
	;
	RPEase.InOutElastic = function(t, b, c, d, a, p) {
		if (t == 0)
		return b;
		if ((t /= d / 2) == 2)
		return b + c;
		if (!p)
		p = d * (.3 * 1.5);
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else
		s = p / (2 * Math.PI) * Math.asin(c / a);
		if (t < 1)
		return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
	}
	;
	RPEase.InExpo = function(t, b, c, d) {
		return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	}
	;
	RPEase.OutExpo = function(t, b, c, d) {
		return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	}
	;
	RPEase.InOutExpo = function(t, b, c, d) {
		if (t == 0)
		return b;
		if (t == d)
		return b + c;
		if ((t /= d / 2) < 1)
		return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
		return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	}
	;
	RPEase.Linear = function(t, b, c, d) {
		return c * t / d + b;
	}
	;
	RPEase.InLinear = function(t, b, c, d) {
		return c * t / d + b;
	}
	;
	RPEase.OutLinear = function(t, b, c, d) {
		return c * t / d + b;
	}
	;
	RPEase.InOutLinear = function(t, b, c, d) {
		return c * t / d + b;
	}
	;
	RPEase.InQuad = function(t, b, c, d) {
		return c * (t /= d) * t + b;
	}
	;
	RPEase.OutQuad = function(t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b;
	}
	;
	RPEase.InOutQuad = function(t, b, c, d) {
		if ((t /= d / 2) < 1)
		return c / 2 * t * t + b;
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	}
	;
	RPEase.InQuart = function(t, b, c, d) {
		return c * (t /= d) * t * t * t + b;
	}
	;
	RPEase.OutQuart = function(t, b, c, d) {
		return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	}
	;
	RPEase.InOutQuart = function(t, b, c, d) {
		if ((t /= d / 2) < 1)
		return c / 2 * t * t * t * t + b;
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	}
	;
	RPEase.InQuint = function(t, b, c, d) {
		return c * (t /= d) * t * t * t * t + b;
	}
	;
	RPEase.OutQuint = function(t, b, c, d) {
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	}
	;
	RPEase.InOutQuint = function(t, b, c, d) {
		if ((t /= d / 2) < 1)
		return c / 2 * t * t * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	}
	;
	RPEase.InSine = function(t, b, c, d) {
		return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	}
	;
	RPEase.OutSine = function(t, b, c, d) {
		return c * Math.sin(t / d * (Math.PI / 2)) + b;
	}
	;
	RPEase.InOutSine = function(t, b, c, d) {
		return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	}
	;
	tabageos.RPEase = RPEase;
})();


