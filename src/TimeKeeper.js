(function() { 
	'use strict';
    function TimeKeeper() {}
    TimeKeeper.started = false;
    TimeKeeper.time = 0;
    TimeKeeper.timeElapsed = 1;
    TimeKeeper.newTime = 0;
    TimeKeeper.slowness = 60;
	TimeKeeper._aid = 0;
	TimeKeeper._oaid = 0;
	TimeKeeper._sae = .666666666667;
    TimeKeeper.keepTime = function() {
        if (tabageos.TimeKeeper.started == false) {
            tabageos.TimeKeeper.started = true;
            tabageos.TimeKeeper.time = TimeKeeper.now();
        }
        tabageos.TimeKeeper.newTime = TimeKeeper.now();
        tabageos.TimeKeeper.timeElapsed = tabageos.TimeKeeper.newTime - tabageos.TimeKeeper.time;
        tabageos.TimeKeeper.time = tabageos.TimeKeeper.newTime;
    };
    TimeKeeper._keepTime = function(tme) {
        tabageos.TimeKeeper.newTime = tme;
        tabageos.TimeKeeper.timeElapsed = tabageos.TimeKeeper.newTime - tabageos.TimeKeeper.time;
        tabageos.TimeKeeper.time = tabageos.TimeKeeper.newTime;
    };
    TimeKeeper.status = function(stat) {
        if (stat == false) {
            tabageos.TimeKeeper.timeElapsed = 1;
            tabageos.TimeKeeper.started = false;
        } else {
            tabageos.TimeKeeper.time = TimeKeeper.now();
            tabageos.TimeKeeper.started = true;
        }
    };
    TimeKeeper.reset = function(ts) {
        tabageos.TimeKeeper.status(false);
        tabageos.TimeKeeper.status(true);
        window.requestAnimationFrame(function(tstmp) {
            tabageos.TimeKeeper.time = tstmp;
        });
    };
    
    TimeKeeper.init = function() {
        TimeKeeper._sae = -99;
        TimeKeeper._aid = window.requestAnimationFrame(function(tstmp) {
            tabageos.TimeKeeper.time = tstmp;
			window.cancelAnimationFrame(TimeKeeper._aid);
            TimeKeeper._oaid = window.requestAnimationFrame(function(tstmp) {
                TimeKeeper._keepTime(tstmp);
                TimeKeeper.speedAdjustedElapsed();
            })
        });
    };
    TimeKeeper.speedAdjustedElapsed = function() {
        if (TimeKeeper._sae == -99) {
			window.cancelAnimationFrame(TimeKeeper._oaid);
			var lto = 1;
			if(TimeKeeper.timeElapsed > 1000/TimeKeeper.slowness) {	
				lto = TimeKeeper.timeElapsed / (1000/TimeKeeper.slowness);
			}
			TimeKeeper._sae = (TimeKeeper.timeElapsed/lto) - Math.floor(1000/TimeKeeper.slowness);
		}
        return TimeKeeper._sae;
    };
    TimeKeeper.now = function() {
        if (!performance || !performance.now) {
            return Date.now();
        } else {
            return performance.now();
        }
    };
    tabageos.TimeKeeper = TimeKeeper;
})();

