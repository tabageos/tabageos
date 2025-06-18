	
	function OneOfMany(name,number,prop3,prop4,prop5,prop6,prop7,prop8,prop9,prop10,prop11,prop12, collectiveFunction) {
		
		this.name = name || "";
		this.number = number;
		this.prop3 = prop3;
		this.prop4 = prop4;
		this.prop5 = prop5;
		this.prop6 = prop6;
		this.prop7 = prop7;
		this.prop8 = prop8;
		this.prop9 = prop9;
		this.prop10 = prop10;
		this.prop11 = prop11;
		this.prop12 = prop12;
		OneOfMany._collective.push(this);
		if(typeof collectiveFunction != 'undefined') {
			collectiveFunction(this);
		}
	}
	OneOfMany.constructor = OneOfMany;
	OneOfMany.prototype = new Object();
	OneOfMany.prototype.name = "";
	OneOfMany.prototype.number = 0;
	OneOfMany.prototype.prop3 = null;
	OneOfMany.prototype.prop4 = null;
	OneOfMany.prototype.prop5 = null;
	OneOfMany.prototype.prop6 = null;
	OneOfMany.prototype.prop7 = null;
	OneOfMany.prototype.prop8 = null;
	OneOfMany.prototype.prop9 = null;
	OneOfMany.prototype.prop10 = null;
	OneOfMany.prototype.prop11 = null;
	OneOfMany.prototype.prop12 = null;
	OneOfMany._collective = [];
	
	OneOfMany.getName = function(number, oom) {
		if(oom) return oom.name;
		var i = 0;var _oom; var rn = null;
			for(i; i < OneOfMany._collective.length; i++) {
				_oom = OneOfMany._collective[i];
				if(_oom.number == number) {
					rn = _oom.name;
					break;
				}
			} return rn+"";
		
	};
	OneOfMany.getNumber = function(name, oom) {
		if(oom) return oom.number;
		var i = 0;var _oom; var rn = 0;
			for(i; i < OneOfMany._collective.length; i++) {
				_oom = OneOfMany._collective[i];
				if(_oom.name == name) {
					rn = _oom.number;
					break;
				}
			} return rn+1-1;
		
	};
	OneOfMany.getOneOfMany = function(number, name) {
		var i = 0;var _oom; var rn = null;
			for(i; i < OneOfMany._collective.length; i++) {
				_oom = OneOfMany._collective[i];
				if(number && name && _oom.name == name && _oom.number == number) {
					rn = _oom;break;
				} else if (!name && (number >= 0 || number <= 0) && _oom.number == number) {
					rn = _oom; break;
				} else if (!number && name && _oom.name == name) {
					rn = _oom; break;
				}
			} return rn;
		
	};
	OneOfMany.destroyTheCollective = function() {
		OneOfMany._collective = [];
	};
	export { OneOfMany   };
