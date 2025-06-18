

	'use strict';

    function SimpleIsoPoint(x,y,z, spacing) {
                
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.spacing = spacing || 45;
                
    }
    SimpleIsoPoint.prototype.constructor = SimpleIsoPoint;
    SimpleIsoPoint.prototype.x = 0;
    SimpleIsoPoint.prototype.y = 0;
    SimpleIsoPoint.prototype.z = 0;
    SimpleIsoPoint.prototype.spacing = 45;
            
    SimpleIsoPoint.prototype.mpIntoIso = function(mp, isop) {
        if(!isop) {
            this.x = mp.x-mp.y;
            this.y = (mp.x+mp.y)/2;
        } else {
            isop.x = mp.x-mp.y;
            isop.y = (mp.x+mp.y)/2;
        }
    };
    SimpleIsoPoint.prototype.isoIntoMp = function(mp, isop) {
        if(isop) {
            mp.x = (2*isop.y+isop.x)/2;
            mp.y = (2*isop.y-isop.x)/2;
        } else {
            mp.x = (2*this.y+this.x)/2;
            mp.y = (2*this.y-this.x)/2;
        }
    };
    SimpleIsoPoint.rawToIsoWithSpacing = function(x,y, returnX, returnY, spacing) {
        var xs = x/spacing; var ys = y/spacing;
        if(returnX) {
            return  (xs + (2*ys))/2;
        } else {
            return  (xs - (2*ys))/2;
        }
     };
    SimpleIsoPoint.rawToScreenWithSpacing = function(x,y,z, returnX, returnY, spacing) {
        var rx = spacing * (x + y);
        var ry = (spacing/2) * (x - y);
        ry -= z*spacing*1.2;
        if(returnX) {
            return  rx;
        } else {
            return  ry;
        }
    };
    SimpleIsoPoint.rawToScreen = function(x,y,z, returnX,returnY) {
        if(returnX) {
             return  (2*y+x)/2;
        } else {
            return  (2*y-x)/2;
        }
    };
    SimpleIsoPoint.rawToIso = function(x,y, returnX,returnY) {
        if(returnX) {
            return  x-y;
        } else {
            return  (x+y)/2;
        }
    };
            
    export { SimpleIsoPoint   };


