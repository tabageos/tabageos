import { MoverPoint } from './MoverPoint.js';
import { BlitMath } from './BlitMath.js';

	'use strict';
    function GeometricMath() {}
	GeometricMath.arcCurvePoint = function(t, p0x, p0y, p1x, p1y, p2x, p2y) {
        var result = new MoverPoint();
        var oneMinusTSq = (1 - t) * (1 - t);
        var TSq = t * t;
        result.x = oneMinusTSq * p0x + 2 * (1 - t) * t * p1x + TSq * p2x;
        result.y = oneMinusTSq * p0y + 2 * (1 - t) * t * p1y + TSq * p2y;
        return result;
    };
    GeometricMath.updateArcCurvePoint = function(point, t, p0x, p0y, p1x, p1y, p2x, p2y) {
        var oneMinusTSq = (1 - t) * (1 - t);
        var TSq = t * t;
        point.x = oneMinusTSq * p0x + 2 * (1 - t) * t * p1x + TSq * p2x;
        point.y = oneMinusTSq * p0y + 2 * (1 - t) * t * p1y + TSq * p2y;
    };
    GeometricMath.getArcCurvePath = function(p0, p1, p2, amountOfPathPoints) {
        var i = 0;
        var addBy = (100 / amountOfPathPoints) / 100;
        var path = [];
        var pathPoint;
        while (i < 1) {
            pathPoint = GeometricMath.arcCurvePoint(i, p0.x, p0.y, p1.x, p1.y, p2.x, p2.y);
            path[path.length] = pathPoint;
            i += addBy;
        }
        return path;
    };
    GeometricMath.updateArcCurvePath = function(path, p0, p1, p2) {
        var i = 0;
        var l = path.length;
        var pathPoint;
        var addBy = (100 / l) / 100;
        var t = 0;
        while (i < l) {
            pathPoint = path[i];
            GeometricMath.updateArcCurvePoint(pathPoint, t, p0.x, p0.y, p1.x, p1.y, p2.x, p2.y);
            i += 1;
            t += addBy;
        }
    };
	GeometricMath.getRawArcCurvePath = function(p0x, p0y, p1x, p1y, p2x, p2y, amountOfPathPoints, prePath) {
        var i = 0;
        var addBy = (100 / amountOfPathPoints) / 100;
        var path = prePath || []; path.length = 0;
        while (i < 1) {
			var oneMinusTSq = (1 - i) * (1 - i);
			var TSq = i * i;
            path[path.length] = oneMinusTSq * p0x + 2 * (1 - i) * i * p1x + TSq * p2x;
			path[path.length] = oneMinusTSq * p0y + 2 * (1 - i) * i * p1y + TSq * p2y;
            i += addBy;
        }
        return prePath ? 0 : path;
    };
    GeometricMath.hermiteCurvePoint = function(t, p0x, p0y, t0x, t0y, p1x, p1y, t1x, t1y) {
        var result = new MoverPoint();
        result.x = (2 * Math.pow(t, 3) - 3 * t * t + 1) * p0x + (Math.pow(t, 3) - 2 * t * t + t) * t0x + (-2 * Math.pow(t, 3) + 3 * t * t) * p1x + (Math.pow(t, 3) - t * t) * t1x;
        result.y = (2 * Math.pow(t, 3) - 3 * t * t + 1) * p0y + (Math.pow(t, 3) - 2 * t * t + t) * t0y + (-2 * Math.pow(t, 3) + 3 * t * t) * p1y + (Math.pow(t, 3) - t * t) * t1y;
        return result;
    };
    GeometricMath.getHermiteCurvePath = function(p0, t0, p1, t1, amountOfPathPoints) {
        var i = 0;
        var addBy = (100 / amountOfPathPoints) / 100;
        var path = [];
        while (i < 1) {
            var pathPoint = GeometricMath.hermiteCurvePoint(i, p0.x, p0.y, t0.x, t0.y, p1.x, p1.y, t1.x, t1.y);
            path[path.length] = pathPoint;
            i += addBy;
        }
        return path;
    };
	GeometricMath.getRawHermiteCurvePath = function(p0x,p0y, t0x,t0y, p1x,p1y, t1x,t1y, amountOfPathPoints, prePath) {
        var t = 0;
        var addBy = (100 / amountOfPathPoints) / 100;
        var path = prePath || []; path.length = 0;
        while (t < 1) {
			path[path.length] = (2 * Math.pow(t, 3) - 3 * t * t + 1) * p0x + (Math.pow(t, 3) - 2 * t * t + t) * t0x + (-2 * Math.pow(t, 3) + 3 * t * t) * p1x + (Math.pow(t, 3) - t * t) * t1x;
			path[path.length] = (2 * Math.pow(t, 3) - 3 * t * t + 1) * p0y + (Math.pow(t, 3) - 2 * t * t + t) * t0y + (-2 * Math.pow(t, 3) + 3 * t * t) * p1y + (Math.pow(t, 3) - t * t) * t1y;
            t += addBy;
        }
        return prePath ? 0 : path;
    };
    GeometricMath.lineIntersectionTest = function(a, b, c, d) {
        var top1 = (a.y - c.y) * (d.x - c.x) - (a.x - c.x) * (d.y - c.y);
        var top2 = (a.y - c.y) * (b.x - a.x) - (a.x - c.x) * (b.y - a.y);
        var bott = (b.x - a.x) * (d.y - c.y) - (b.y - a.y) * (d.x - c.x);
        if (bott == 0) {
            return false;
        }
        var opBott = 1.0 / bott;
        var u = top1 * opBott;
        var dw = top2 * opBott;
        if ((u > 0) && (u < 1) && (dw > 0) && (dw < 1)) {
            return true;
        }
        return false;
    };
    GeometricMath.lineIntersectionPoint = function(a, b, c, d) {
        var top1 = (a.y - c.y) * (d.x - c.x) - (a.x - c.x) * (d.y - c.y);
        var top2 = (a.y - c.y) * (b.x - a.x) - (a.x - c.x) * (b.y - a.y);
        var bott = (b.x - a.x) * (d.y - c.y) - (b.y - a.y) * (d.x - c.x);
        if (bott == 0) {
            return null;
        }
        var u = top1 / bott;
        var dw = top2 / bott;
        if ((u > 0) && (u < 1) && (dw > 0) && (dw < 1)) {
            var temp = b.subtract(a).multiply(u);
            var point = a.add(temp);
            return point;
        } else {
            return null;
        }
    };
	GeometricMath._rPoint;
    GeometricMath.testForPointInCircle = function(circlePosition, circleRadius, pointToTest) {
		if(!GeometricMath._rPoint) { GeometricMath._rPoint = new MoverPoint(); }
		GeometricMath._rPoint.x = pointToTest.x+1-1; GeometricMath._rPoint.y = pointToTest.y+1-1;
        var dist = GeometricMath._rPoint.subtract(circlePosition, 0).getSquaredLength();
        if (dist < (circleRadius * circleRadius)) {
            return true;
        }
        return false;
    };
    GeometricMath.testForPointInArea = function(p, left, top, right, bottom) {
        return Boolean(!(p.x < left || p.x > right || p.y < top || p.y > bottom));
    };
    GeometricMath.getMoverPointsOnCircle = function(circleCenter, circleRadius, numberOfPoints) {
        var alpha = (Math.PI * 2) / numberOfPoints;
        var points = [];
        var theta;
        var p;
        var i = -1;
        while (i < numberOfPoints) {
            i += 1;
            theta = alpha * i;
            p = new MoverPoint(Math.cos(theta) * circleRadius,Math.sin(theta) * circleRadius);
            points[i] = circleCenter.add(p);
        }
        return points;
    };
    GeometricMath.getRawPointsOnCircle = function(circleCenterX, circleCenterY, circleRadius, numberOfPoints) {
        var alpha = (Math.PI * 2) / numberOfPoints;
        var points = [];
        var theta;
        var cpx;
        var cpy;
        var i = -1;
        var remainder = numberOfPoints % 2;
        if (remainder != 0) {
            numberOfPoints = numberOfPoints - Math.round(remainder);
        }
        while (i < numberOfPoints * 2) {
            i += 2;
            theta = alpha * Math.floor(i / 2);
            cpx = Math.cos(theta) * circleRadius;
            cpy = Math.sin(theta) * circleRadius;
            points[i - 1] = circleCenterX + cpx;
            points[i] = circleCenterY + cpy;
        }
        return points;
    };
    GeometricMath.mergeArrays = function(a1, a2) {
        var i = 0; var argi = 1;var a;var n;
		if(arguments.length > 2) { n = arguments.length;
			for (argi; argi < n; argi++) {
				i = 0; a = arguments[argi].length;
				for(i; i < a; i++) {
					a1[a1.length] = arguments[argi][i];
				}
			}
		} else {
			for (i; i < a2.length; i++) {
				a1[a1.length] = a2[i];
			}
		}
        return a1;
    };
	GeometricMath.splice = function(arr, index) {
			var i = index;
			var l = arr.length - 1;
			for(i; i < l; i++) {
				arr[i] = arr[i+1];
			}
			arr.length = l;
	};
    GeometricMath.rectanglesIntersect = function(r1, r2) {
        return !(r2.x > r1.x + r1.width || r2.x + r2.width < r1.x || r2.y > r1.y + r1.height || r2.y + r2.height < r1.y);
    };
    GeometricMath._efRect = {top:0,bottom:0,left:0,right:0,si:0};
    GeometricMath.rectanglesOverlapAmount = function(r1, r2) {
        GeometricMath._efRect.top = Math.max(r1.y, r2.y);
        GeometricMath._efRect.bottom = Math.min(r1.y + r1.height, r2.y + r2.height);
        GeometricMath._efRect.left = Math.max(r1.x, r2.x);
        GeometricMath._efRect.right = Math.min(r1.x + r1.width, r2.x + r2.width);
        GeometricMath._efRect.si = Math.max(0, GeometricMath._efRect.right - GeometricMath._efRect.left) * Math.max(0, GeometricMath._efRect.bottom - GeometricMath._efRect.top);
       
        return GeometricMath._efRect.si+1-1;
		
    };
    GeometricMath.isPowerOfTwo = function(x) {
        return x > 0 && (x & (x - 1)) == 0;
    };
	GeometricMath.getPathOfTile = function(thisTile, patt, tileWidth, tileHeight, leftToRight) {
        
		    var outOfOrder = BlitMath.getBasicPatternOf(thisTile,patt,tileWidth,tileHeight,leftToRight);
		
		    var ordered = [];
		    ordered.push(outOfOrder.shift());
		    
		    while(outOfOrder.length > 0) {
		        
		        var nearestd = 20500;
		        var nearesti;
		        var i = 0;
		        var p;
		        var next = ordered[ordered.length-1];
		        
		        for(i; i < outOfOrder.length;i++) {
		            p = outOfOrder[i];
		            
		            if(p.dist(next) <= nearestd) {
		                nearestd = p.dist(next);
		                nearesti = i+1-1;
		            }
		            
		        }
		        ordered.push( outOfOrder.splice(nearesti, 1)[0] );
		        
		    }
		    
            return ordered;
    };
	
	GeometricMath.createRandomIndexPath = function(cols,rows,sx,ex) {
		
		var x = sx;
		var path = [];
		for( var y = rows - 1; y >= 0; y--) {
			
			var ux = y ? Math.floor(Math.random() * cols) : ex;
			while( x != ux) {
				path.push([x,y]);
				if( x < ux) { x++; } else { x--; }
				
			}
			path.push([x,y]);
		}
		for( var i = path.length - 4; i >= 0; i--) {
			if (i+3 < path.length && path[i][1] === path[i+3][1] + 1 && path[i][0] === path[i+3][0]) {
				path.splice(i+1,2);
			}
		}
		return path;
		
	};
	
	GeometricMath.applyIndexPathToMap = function(indexPath, map, tile) {
		
		var i = 0;var a;
		for(i; i < indexPath.length; i++) {
			a = indexPath[i];
			map[a[1]][a[0]] = tile;
		}
		
	};
	
	
	GeometricMath.createRandomEnclosedPathOfTileInMap = function(cols,rows,offsx,offex, map, tile, rowOffset) {
		
	    var hrcls = Math.round(cols/2);//half columns 
		var initPath = GeometricMath.createRandomIndexPath(hrcls,rows,hrcls-1-offsx,hrcls-1-offex);//start and end first path at the end of the first half matrix
		var i = 0;var a;
		for(i; i < initPath.length; i++) {
			a = initPath[i];
			map[a[1]+(rowOffset||0)][a[0]] = tile;
		}
		initPath = GeometricMath.createRandomIndexPath(hrcls,rows,0-offsx,0-offex);//start and end second path at the beginning of the second half matrix
		i = 0;
		for(i; i < initPath.length; i++) {
			a = initPath[i];
			map[a[1]+(rowOffset||0)][a[0]+hrcls] = tile;//apply each path index to the whole map, the full 2d matrix, using the tile value. 
		}
		
	};
	
	GeometricMath.fibo = function(n) { //return the fibonatti number at the sequence point given,
		let [a,b] = [0, 1];var i = 0;
		for ( i; i < n; i++ ) {
			[a,b] = [b, a+b];
		}
		return a;
	};
	
	
	
    export { GeometricMath   };





