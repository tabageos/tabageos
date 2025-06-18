import { EventDispatcher } from './EventDispatcher.js';
import { Event } from './Event.js';
import { BlitMath } from './BlitMath.js';
import { GeometricMath } from './GeometricMath.js';
import { Rectangle } from './Rectangle.js';

 'use strict'
 
 
	const TOP = 0;
	const RIGHT = 90;
	const BOTTOM = 180;
	const LEFT = 270;

	const FACING = [TOP, RIGHT, BOTTOM, LEFT];

	const FACING_TO_STRING = {
		[TOP]: 'top',
		[RIGHT]: 'right',
		[BOTTOM]: 'bottom',
		[LEFT]: 'left'
	};

	const FACING_TO_MOD = {
		[TOP]: [0, -1],
		[RIGHT]: [1, 0],
		[BOTTOM]: [0, 1],
		[LEFT]: [-1, 0]
	};

	const FACING_INVERSE = {
		[TOP]: BOTTOM,
		[RIGHT]: LEFT,
		[BOTTOM]: TOP,
		[LEFT]: RIGHT
	};

	const FACING_MOD_RIGHT = {
		[TOP]: RIGHT,
		[RIGHT]: BOTTOM,
		[BOTTOM]: LEFT,
		[LEFT]: TOP
	};

	const FACING_MOD_LEFT = {
		[TOP]: LEFT,
		[RIGHT]: TOP,
		[BOTTOM]: RIGHT,
		[LEFT]: BOTTOM
	};


	function nint(min, max) {
		var ran = min + Math.round(Math.random( ) * (max));
		return ran > max ? max : ran;
	}

	function nfloat(min=0, max=1) {
		var ran = min + (Math.random( ) * (max));
		return ran > max ? max : ran;
	}

	function vec(min, max){
		//min and max are vectors [int, int];
		//returns [min[0]<=x<=max[0], min[1]<=y<=max[1]]
		return [nint(min[0], max[0]), nint(min[1], max[1])];
	}

	function choose(items, remove=false) {
		let idx = nint(0, items.length - 1);
		if (remove) {
			return items.splice(idx, 1)[0];
		} else {
			return items[idx];
		}
	}

	function maybe(probability) {
		return nfloat() <= probability;
	}

	function iter_adjacent([x, y], cb) {
		cb([x - 1, y]);
		cb([x, y - 1]);
		cb([x + 1, y]);
		cb([x, y + 1]);
	}

	function iter_2d(size, callback) {
		for (let y = 0; y < size[1]; y++) {
			for (let x =0; x < size[0]; x++) {
				callback([x, y]);
			}
		}
	}

	function iter_range(from, to, callback) {
		let fx, fy, tx, ty;
		if(from[0]<to[0]){
			fx = from[0]; 
			tx = to[0];      
		} else {
			fx = to[0];
			tx = from[0];
		};
		if(from[1]<to[1]){
			fy = from[1]; 
			ty = to[1];      
		} else {
			fy = to[1];
			ty = from[1];
		};
		for(var x=fx;x<=tx;x++){
			for(var y=fy;y<=ty;y++){
				callback([x, y]);
			}
		} 
	}

	function intersects(pos_1, size_1, pos_2, size_2) {
		return (!pos_2[0] > pos_1[0] + size_1[0] ||
				pos_2[0] + size_2[0] < pos_1[0] ||
				pos_2[1] > pos_1[1] + size_1[1] ||
				pos_2[1] + size_2[1] < size_1[1]);
	}

	function array_test(array, test) {
		for (let i = 0; i < array.length; i++) {
			if (test(array[i])) {
				return true;
			}
		}
		return false;
	}

	function add(p1, p2) {
		return [p1[0] + p2[0], p1[1] + p2[1]];
	}

	function shift(pos, facing) {
		return add(pos, FACING_TO_MOD[facing]);
	}

	function shift_left(pos, facing) {
		return shift(pos,(facing - 90 + 360) % 360);
	}

	function shift_right(pos, facing) {
		return shift(pos, (facing + 90 + 360) % 360);
	}
	
 
	function Array2d(size=[0,0], default_value=0) {
		this.rows = [];
		this.size = [];

		for (let y = 0; y < size[1]; y++) {
			let row = [];
			for (let x = 0; x < size[0]; x++) {
				row.push(default_value);
			}
			this.rows.push(row);
		}
		
	};
	Array2d.constructor = Array2d;
	Array2d.prototype = new Object();
		
	Array2d.prototype.filla = function(a, colsx, rowsy, value) {
			value = value || 0;
			for (let y = 0; y < rowsy; y++) {
				let row = [];
				for (let x = 0; x < colsx; x++) {
					row.push(value);
				}
				a.push(row);
			}
	};

	Array2d.prototype.iter = function(callback, context) {
			for (let y = 0; y < this.size[1]; y++) {
				for (let x = 0; x < this.size[0]; x++) {
					callback.apply(context, [[x, y], this.get([x, y])]);
				}
			}
	};

	Array2d.prototype.get = function([x, y]) {
			if (this.rows[y] === undefined) {
				return undefined;
			}
			return this.rows[y][x];
	};

	Array2d.prototype.set = function([x, y], val) {
			this.rows[y][x] = val;
	};

	Array2d.prototype.set_horizontal_line = function([start_x, start_y], delta_x, val) {
			let c = Math.abs(delta_x),
				mod = delta_x < 0 ? -1 : 1;

			for (let x=0; x <= c; x++) {
				this.set([pos[0] + x  * mod, pos[1]], val);
			}
	};

	Array2d.prototype.set_vertical_line = function([start_x, start_y], delta_y, val) {
			let c = Math.abs(delta_y),
				mod = delta_y < 0 ? -1 : 1;

			for (let y=0; y <= c; y++) {
				this.set([pos[0], pos[1] + y * mod], val);
			}
	};

	Array2d.prototype.get_square = function([x, y], [size_x, size_y]) {
			let retv = new Array2d([size_x, size_y]);
			for (let dx = 0; dx < size_x; dx ++) {
				for (let dy = 0; dy < size_y; dy ++) {
					retv.set([dx, dy], this.get([x + dx, y + dy]));
				}
			}
			return retv;
	};

	Array2d.prototype.set_square = function([x, y], [size_x, size_y], val, fill=false) {
			if (!fill) {
				this.line_h([x, y], size_x - 1, val);
				this.line_h([x, y + size_y - 1], size_x - 1, val);
				this.line_v([x, y], size_y -1, val);
				this.line_v([x + size_x - 1, y], size_y - 1, val);
			} else {
				for (let dx = 0; dx < size_x; dx ++) {
					for (let dy = 0; dy < size_y; dy ++) {
						this.set([x + dx, y + dy], val);
					}
				}
			}
	};
	

	function DungeonPiece(options, id) {

			options = Object.assign({
				size: [1, 1],
				position: [0, 0],
				parent: null,
				max_exits: 10,
				tag: ''
			}, options);

			Object.assign(this, options);

			this.options = options;

			this.id = id;
			this.walls = new Array2d(this.size, true);
			this.perimeter = [];
			this.exits = [];
			this.children = [];
	}
	DungeonPiece.constructor = DungeonPiece;
	DungeonPiece.prototype = new Object();

	DungeonPiece.prototype.rect = function() {
		return new Rectangle(this.position[0], this.position[1], this.size[0], this.size[1]);
	}

	DungeonPiece.prototype.is_exit = function([x, y]) {
		return this.exits.filter(([exit_x, exit_y, ...rest]) => {
			return exit_x === x && exit_y === y;
		}).length !== 0;
	}

	DungeonPiece.prototype.get_non_wall_tiles = function() {
		let retv = [];
		this.walls.iter((pos, is_wall) => {
			if (!is_wall) {
				retv.push(pos);
			}
		});
		return retv;
	}

	DungeonPiece.prototype.get_perimeter_by_facing = function(facing) {
		return this.perimeter.filter(([[x, y], f]) => {
			return facing === f;
		});
	}

	DungeonPiece.prototype.get_inner_perimeter = function() {
			//returns array of tiles in the piece that are adjacent to a wall,
			// but not an exit;

		let retv = [],
			haswall, exit_adjacent;


		this.walls.iter((pos, is_wall) => {
				if (!is_wall && !this.is_exit(pos)) {
					haswall = false;
					exit_adjacent = false;
					iter_adjacent(pos, p => {
						haswall = haswall || this.walls.get(p);
						exit_adjacent = exit_adjacent || this.is_exit(p);
					});
					if (haswall && !exit_adjacent) {
						retv.push(pos);
					}
				}
		});

		return retv;
	}

		//local position to parent position
	DungeonPiece.prototype.parent_pos = function([x, y]) {
		return [this.position[0] + x, this.position[1] + y];
	}

		//local position to global position
	DungeonPiece.prototype.global_pos = function(pos) {
		pos = this.parent_pos(pos);
		if (this.parent) {
			pos = this.parent.global_pos(pos);
		}
		return pos;
	}

		//parent position to local position
	DungeonPiece.prototype.local_pos = function(pos) {
		return [pos[0] - this.position[0], pos[1] - this.position[1]];
	}

		//get (roughly) center tile position for the piece
		// @TODO consider if should use Math.floor instead of Math.round
	DungeonPiece.prototype.get_center_pos = function() {
		return [Math.floor(this.size[0] / 2), Math.floor(this.size[1] / 2)];
	}
	DungeonPiece.prototype.add_perimeter = function(p_from, p_to, facing) {
		iter_range(p_from, p_to, pos => {
			this.perimeter.push([pos, facing]);
		});
	}
	DungeonPiece.prototype.remove_perimeter = function(rect) {
		this.perimeter = this.perimeter.filter(([x, y, facing]) => {
			return !GeometricMath.testForPointInArea({x:x,y:y}, rect.x,rect.y,rect.x+1,rect.y+1);//rect.contains(x, y, 1, 1);
		});
	}
	DungeonPiece.prototype.intersects = function(piece) {
		return intersects(this.position, this.size, piece.position, piece.size);
	}
	DungeonPiece.prototype.add_piece = function(piece, position = null) {
		if (array_test(this.children, c => c.id === piece.id)) {
			return;
		}
		piece.parent = this;
		if (position) {
			piece.position = position;
		}
		this.children.push(piece);
		this.paste_in(piece);
	}

	DungeonPiece.prototype.paste_in = function(piece) {
		iter_2d(piece.size, pos => {
			let is_wall = piece.walls.get(pos);
			if (!is_wall) {
				this.walls.set(piece.parent_pos(pos), false);
			}
		});
	}

	DungeonPiece.prototype.add_exit = function(exit, room) {
		this.walls.set(exit[0], false);
		if (this.parent) {
			this.parent.paste_in(this);
		}
		this.exits.push([exit[0], exit[1], room]);
	};
	


		function DungeonGenerator(w,h,roomAmount, minRoomSize,maxRoomSize,maxExits,maxCorridorLength,minCorridorLength,density,symmetric,intercns,maxInterLength) { 
		
			EventDispatcher.call(this);
			
			let options =  {
				size: [w || 32, h || 32],
				rooms: {
					initial: {
						min_size: [minRoomSize || 3, minRoomSize || 3],
						max_size: [maxRoomSize || 5, maxRoomSize || 5],
						max_exits: maxExits || 2
					},
					any: {
						min_size: [minRoomSize || 3, minRoomSize || 3],
						max_size: [maxRoomSize || 6, maxRoomSize || 6] ,
						max_exits: maxExits || 3
					}
				},
				max_corridor_length: maxCorridorLength || 6,
				min_corridor_length: minCorridorLength || 2,
				corridor_density: density || 0.5, //corridors per room
				symmetric_rooms: symmetric || false, // exits must be in the middle of walls
				interconnects: intercns || 1, //extra corridors to connect rooms and make circular paths. not guaranteed
				max_interconnect_length: maxInterLength || 10,
				room_count: roomAmount || 10
			};
			this.origOptions =  {};
			Object.assign(this.origOptions, options);
			
			this.options = options;
			Object.assign(this, options);
			this.next_piece_id = 0;
			this.size = options.size || [2,2];
			this.position = options.position || [0,0];
			this.parent = options.parent || null;
			this.max_exits = options.max_exits || 10;
			this.tag = options.tag || '';
			this.id = this.next_piece_id++;
			this.walls = new Array2d(this.size, true);
			this.perimeter = [];
			this.exits = [];
			this.children = [];
			
			this.start_pos = [0, 0];
			this.minx = this.size[0];
			this.maxx = 0;
			this.miny = this.size[1];
			this.maxy = 0;

			this.room_tags = Object.keys(this.rooms).filter(tag => (tag !== 'any' && tag !== 'initial'));

			for (let i = this.room_tags.length; i < this.room_count; i++) {
				this.room_tags.push('any');
			}

			this.rooms = [];
			this.corridors = [];
			
			this.loop_no_rooms = -717;
			this.loop_no_corridors = -717;
			
			DungeonGenerator.GENERATE_COMPLETE = "generateComplete";
			DungeonGenerator.SPECIFIC_PRINT_COMPLETE = "specificPrintComplete";

		};
		
		DungeonGenerator.constructor = DungeonGenerator;
		
		DungeonGenerator.prototype = Object.create(EventDispatcher.prototype);
		
		
		DungeonGenerator.prototype.reset = function() {
			
			Object.assign(this.options, this.origOptions);
			Object.assign(this,this.options);
			
			this.next_piece_id = 0;
			this.id = 1;
			this.walls = new Array2d(this.size, true);
			this.perimeter = [];
			this.exits = [];
			this.children = [];
			this.start_pos = [0, 0];
			this.minx = this.size[0];
			this.maxx = 0;
			this.miny = this.size[1];
			this.maxy = 0;
			this.room_tags = Object.keys(this.rooms).filter(tag => (tag !== 'any' && tag !== 'initial'));

			for (let i = this.room_tags.length; i < this.room_count; i++) {
				this.room_tags.push('any');
			}
			this.rooms = [];
			this.corridors = [];
		}
		
		
		DungeonGenerator.prototype.rect = function() {
			return new Rectangle(this.position[0], this.position[1], this.size[0], this.size[1]);
		}

		DungeonGenerator.prototype.is_exit = function([x, y]) {
			return this.exits.filter(([exit_x, exit_y, ...rest]) => {
				return exit_x === x && exit_y === y;
			}).length !== 0;
		}

		DungeonGenerator.prototype.get_non_wall_tiles = function() {
			let retv = [];
			this.walls.iter((pos, is_wall) => {
				if (!is_wall) {
					retv.push(pos);
				}
			});
			return retv;
		}

		DungeonGenerator.prototype.get_perimeter_by_facing = function(facing) {
			return this.perimeter.filter(([[x, y], f]) => {
				return facing === f;
			});
		}

		DungeonGenerator.prototype.get_inner_perimeter = function() {
			//returns array of tiles in the piece that are adjacent to a wall,
			// but not an exit;

			let retv = [],
				haswall, exit_adjacent;


			this.walls.iter((pos, is_wall) => {
				if (!is_wall && !this.is_exit(pos)) {
					haswall = false;
					exit_adjacent = false;
					iter_adjacent(pos, p => {
						haswall = haswall || this.walls.get(p);
						exit_adjacent = exit_adjacent || this.is_exit(p);
					});
					if (haswall && !exit_adjacent) {
						retv.push(pos);
					}
				}
			});

			return retv;
		}

		//local position to parent position
		DungeonGenerator.prototype.parent_pos = function([x, y]) {
			return [this.position[0] + x, this.position[1] + y];
		}

		//local position to global position
		DungeonGenerator.prototype.global_pos = function(pos) {
			pos = this.parent_pos(pos);
			if (this.parent) {
				pos = this.parent.global_pos(pos);
			}
			return pos;
		}

		//parent position to local position
		DungeonGenerator.prototype.local_pos = function(pos) {
			return [pos[0] - this.position[0], pos[1] - this.position[1]];
		}

		//get (roughly) center tile position for the piece
		// @TODO consider if should use Math.floor instead of Math.round
		DungeonGenerator.prototype.get_center_pos = function() {
			return [Math.floor(this.size[0] / 2), Math.floor(this.size[1] / 2)];
		}

		DungeonGenerator.prototype.add_perimeter = function(p_from, p_to, facing) {
			iter_range(p_from, p_to, pos => {
				this.perimeter.push([pos, facing]);
			});
		}

		DungeonGenerator.prototype.remove_perimeter = function(rect) {
			this.perimeter = this.perimeter.filter(([x, y, facing]) => {
				return !GeometricMath.testForPointInArea({x:x,y:y},rect.x,rect.y,rect.x+2,rect.y+2);// rect.contains(x, y, 2,2);
			});
		}

		DungeonGenerator.prototype.intersects = function(piece) {
			return intersects(this.position, this.size, piece.position, piece.size);
		}

		
		DungeonGenerator.prototype.paste_in = function(piece) {
			iter_2d(piece.size, pos => {
				let is_wall = piece.walls.get(pos);
				if (!is_wall) {
					this.walls.set(piece.parent_pos(pos), false);
				}
			});
		}

		DungeonGenerator.prototype.add_exit = function(exit, room) {
			this.walls.set(exit[0], false);
			if (this.parent) {
				this.parent.paste_in(this);
			}
			this.exits.push([exit[0], exit[1], room]);
		}
		

		DungeonGenerator.prototype.print = function() { let ar = []; let row = [];
			for (let y = 0; y < this.size[1]; y ++) {
				row = [];
				for (let x = 0; x < this.size[0]; x++) {
					if (this.start_pos && this.start_pos[0] === x && this.start_pos[1] === y) {
						row.push( [x,y,717,717] );
					} else {
						
						var topush;
						if( this.walls.get([x,y]) ) {
							
							topush = [x,y,-1,-1];
							
						} else {
							topush = [x,y, 0,0];
						}
						
						row.push( topush );
					}
				}
				ar.push(row)
			}
			
			return ar;
		}
		
		
		DungeonGenerator.prototype.tenAround = function(v,w,h) {//twelve
			
			let ar = null;
			let inx = v[0];
			let iny = v[1];
			let arrofD = this.print();
			
			var w = w || 16;
			var h = h || 16;
			
			let toptop = BlitMath.checkTileValueAt(inx*w,(iny-2)*h,arrofD,w,h);
			let top = BlitMath.checkTileValueAt(inx*w,(iny-1)*h,arrofD,w,w);
			let topleft = BlitMath.checkTileValueAt((inx-1)*w,(iny-1)*h,arrofD,w,h);
			let topright = BlitMath.checkTileValueAt((inx+1)*w,(iny-1)*h,arrofD,w,h);
			
			let lft = BlitMath.checkTileValueAt((inx-1)*w,(iny)*h,arrofD,w,h);
			let lftlft = BlitMath.checkTileValueAt((inx-2)*w,(iny)*h,arrofD,w,h);
			let rgt = BlitMath.checkTileValueAt((inx+1)*w,(iny)*h,arrofD,w,h);
			let rgtrgt = BlitMath.checkTileValueAt((inx+2)*w,(iny)*h,arrofD,w,h);
			
			let bott = BlitMath.checkTileValueAt(inx*w,(iny+1)*h,arrofD,w,h);
			let bottbott = BlitMath.checkTileValueAt(inx*w,(iny+2)*h,arrofD,w,h);
			
			let bottleft = BlitMath.checkTileValueAt((inx-1)*w,(iny+1)*h,arrofD,w,h);
			let bottright = BlitMath.checkTileValueAt((inx+1)*w,(iny+1)*h,arrofD,w,h);
			
			ar = { 'leftofleft':lftlft && lftlft[2], 'rightofright':rgtrgt && rgtrgt[2],  'bottofbott':bottbott && bottbott[2], 'topoftop':toptop && toptop[2], 'top':top && top[2], 'topleft':topleft && topleft[2], 'topright':topright && topright[2], 'left':lft && lft[2], 'right':rgt && rgt[2], 'bott':bott && bott[2], 'bottleft':bottleft && bottleft[2], 'bottright':bottright && bottright[2] };
			
			return ar;
			
		};
		
		DungeonGenerator.prototype.specificPrint = function(wallValue, floorValue, playerValue, wallValueMethod, floorValueMethod, log) { let ar = []; let row = [];
			
			for (let y = 0; y < this.size[1]; y ++) {
				row = [];
				for (let x = 0; x < this.size[0]; x++) {
					if (this.start_pos && this.start_pos[0] === x && this.start_pos[1] === y) {
						row.push( playerValue || [717,717] );
					} else {
						
						var topush;
						if( this.walls.get([x,y]) ) {
							
							row.push( wallValueMethod ? wallValueMethod( [x,y], this.tenAround([x,y]), row.length, ar.length ) : wallValue );
							
						} else {
							row.push( floorValueMethod ? floorValueMethod( [x,y], this.tenAround([x,y]), row.length, ar.length ) : floorValue );
						}
						
						
					}
				}
				ar.push(row)
			}
			if (log) { window.console.log(JSON.stringify(ar)) };
			
			this.dispatchEvent(new Event(DungeonGenerator.SPECIFIC_PRINT_COMPLETE));
			
			return ar;
		}
		

		
		DungeonGenerator.prototype.room = function(options) {
			
			options.room_size = options.size;
			options.size = [options.size[0] + 2, options.size[1] + 2];
			
			var rm = new DungeonPiece(options, this.next_piece_id++);
			
			rm.walls.set_square([1, 1], rm.room_size, false, true);

			if (!rm.symmetric) { //any point at any wall can be exit
				rm.add_perimeter([1, 0], [rm.size[0] - 2, 0], 180);
				rm.add_perimeter([0, 1], [0, rm.size[1] - 2], 90);
				rm.add_perimeter([1, rm.size[1] - 1], [rm.size[0] - 2, rm.size[1] - 1], 0);
				rm.add_perimeter([rm.size[0] - 1, 1], [rm.size[0] - 1, rm.size[1] - 2], 270);
			} else { //only middle of each wall can be exit
				let [w, h] = rm.get_center_pos();

				rm.perimeter = [
					[[w, 0], 180],
					[[rm.size[0]-1, h], 270],
					[[w, rm.size[1]-1], 0],
					[[0, h], 90]
				];
			}
			return rm;
			
		};
		
		DungeonGenerator.prototype.corridor = function(options) {
			
			options.size = (options.facing === 0 || options.facing === 180) ? [3, options.length] : [options.length, 3];
			
			options.room_size = options.size;
			options.size = [options.size[0] + 2, options.size[1] + 2];
			
			var rm = new DungeonPiece(options, this.next_piece_id++);
			
			
			rm.walls.set_square([1, 1], rm.room_size, false, true);

			if (!rm.symmetric) { //any point at any wall can be exit
				rm.add_perimeter([1, 0], [rm.size[0] - 2, 0], 180);
				rm.add_perimeter([0, 1], [0, rm.size[1] - 2], 90);
				rm.add_perimeter([1, rm.size[1] - 1], [rm.size[0] - 2, rm.size[1] - 1], 0);
				rm.add_perimeter([rm.size[0] - 1, 1], [rm.size[0] - 1, rm.size[1] - 2], 270);
			} else { //only middle of each wall can be exit
				let [w, h] = rm.get_center_pos();

				rm.perimeter = [
					[[w, 0], 180],
					[[rm.size[0]-1, h], 270],
					[[w, rm.size[1]-1], 0],
					[[0, h], 90]
				];
			}
			
			
			rm.options.size = (rm.options.facing === 0 || rm.options.facing === 180) ? [3, rm.options.length] : [rm.options.length, 3];
			
			var w = rm.size[0] - 1;
			var h = rm.size[1] - 1;
			
			//special perimeter: allow only 4 exit points, to keep this corridor corridor-like..
			if (rm.facing === 180) rm.perimeter = [      [[1, h],   0], [[0, 1],    90], [[2, 1],   270], [[1, 0], 180] ];
			else if (rm.facing === 270) rm.perimeter = [ [[0, 1],  90], [[w-1, 0], 180], [[w-1, 2],   0], [[w, 1], 270] ];
			else if (rm.facing === 0) rm.perimeter = [   [[1, 0], 180], [[2, h-1], 270], [[0, h-1],  90], [[1, h],   0] ];
			else if (rm.facing === 90) rm.perimeter = [  [[w, 1], 270], [[1, 2],     0], [[1, 0],   180], [[0, 1],  90] ];
			
			return rm;
			
		};
		

		DungeonGenerator.prototype.add_piece = function(piece, position) {
			if (array_test(this.children, c => c.id === piece.id)) {
				return;
			}
			piece.parent = this;
			if (position) {
				piece.position = position;
			}
			this.children.push(piece);
			this.paste_in(piece);

			this.minx = Math.min(this.minx, piece.position[0]);
			this.maxx = Math.max(this.maxx, piece.position[0] + piece.size[0]);

			this.miny = Math.min(this.miny, piece.position[1]);
			this.maxy = Math.max(this.maxy, piece.position[1] + piece.size[1]);
		}

		DungeonGenerator.prototype.trim = function() {
			this.size = [this.maxx - this.minx, this.maxy - this.miny];
			this.children.forEach(child => {
				child.position = [child.position[0] - this.minx, child.position[1] - this.miny];
			});

			this.start_pos = [this.start_pos[0] - this.minx, this.start_pos[1] - this.miny];
			this.walls = this.walls.get_square([this.minx, this.miny], this.size);

			this.minx = 0;
			this.maxx = this.size[0];

			this.miny = 0;
			this.maxy = this.size[1];
		}

		

		DungeonGenerator.prototype.fits = function(piece, position) {
			let p, x, y;
			for (x = 0; x < piece.size[0]; x++) {
				for (y = 0; y < piece.size[1]; y++) {
					p = this.walls.get([position[0] + x, position[1] + y]);
					if (p === false || p === null || p === undefined) {
						return false;
					}
				}
			}
			return true;
		}

		DungeonGenerator.prototype.join_exits = function(piece1, piece1_exit, piece2, piece2_exit) {
			/*
			register an exit with each piece, remove intersecting perimeter tiles
			*/
			
			piece1.add_exit(piece1_exit, piece2);
			piece2.add_exit(piece2_exit, piece1);

			let ic = GeometricMath.rectanglesOverlapAmount(piece1.rect(), piece2.rect());//piece1.rect.intersection(piece2.rect);
			
			if (ic) {
				piece1.remove_perimeter(new Rectangle(piece1.local_pos([ic[0], ic[1]], [ic.width, ic.height])));
				piece2.remove_perimeter(new Rectangle(piece2.local_pos([ic[0], ic[1]], [ic.width, ic.height])));
			}
		}

		DungeonGenerator.prototype.join = function(piece1, piece2_exit, piece2, piece1_exit) {
			/*
			join piece 1 to piece2 provided at least one exit.
			piece1 should already be placed
			*/
			if (!piece1_exit) {
				piece1_exit = choose(piece1.get_perimeter_by_facing(FACING_INVERSE[piece2_exit[1]]));
			}

			//global piece2 exit pos
			let piece2_exit_pos = piece1.parent_pos(piece1_exit[0]);

			//figure out piece2 position
			let piece2_pos = [
				piece2_exit_pos[0] - piece2_exit[0][0],
				piece2_exit_pos[1] - piece2_exit[0][1]
			];

			if (!this.fits(piece2, piece2_pos)) {
				return false;
			}

			this.join_exits(piece1, piece1_exit, piece2, piece2_exit);
			this.add_piece(piece2, piece2_pos);

			return true;
		}

		DungeonGenerator.prototype.get_open_pieces = function(pieces) {
			//filter out pieces
			return pieces.filter(piece => {
				return piece.exits.length < piece.max_exits && piece.perimeter.length;
			});
		}

		DungeonGenerator.prototype.add_room = function(room, exit, add_to_room=null) {
			let g_add_to_room = add_to_room;
			//add a new piece, exit is local perimeter pos for that exit;
			let choices, old_room, i = 0;
			while (true) {
				//pick a placed room to connect this piece to
				if (add_to_room) {
					old_room = add_to_room;
					add_to_room = null;
				} else {
					choices = this.get_open_pieces(this.children);
					if (choices && choices.length) {
						old_room = choose(choices);
					} else {
						console.log('ran out of choices connecting');
						break;
					}
				}
				
				//if exit is specified, try joining  to this specific exit
				if (exit) {
					//try joining the rooms
					if (this.join(old_room, exit, room)) {
						return true;
					}
				//else try all perims to see
				} else {
					let perim = room.perimeter.slice();
					while (perim.length) {
						if (this.join(old_room, choose(perim, true), room)) {
							return true;
						}
					}
				}

				if (i++ === 10) {
					
					return false;
				}
			}
		}

		DungeonGenerator.prototype.new_corridor = function() {
			return this.corridor({
				length: nint(this.min_corridor_length, this.max_corridor_length),
				facing: choose(FACING)
			});
		}

		DungeonGenerator.prototype.add_interconnect = function() {
			let perims = {},
				hash, exit, p;

			//hash all possible exits
			this.children.forEach(child => {
				if (child.exits.length < child.max_exits) {
					child.perimeter.forEach(exit => {
						p = child.parent_pos(exit[0]);
						hash = `${p[0]}_${p[1]}`;
						perims[hash] = [exit, child];
					});
				}
			});

			//search each room for a possible interconnect, backwards
			let room, mod, length, corridor, room2;
			for (let i = this.children.length - 1; i --; i >= 0) {
				room = this.children[i];

				//if room has exits available
				if (room.exits.length < room.max_exits) {
					
					//iterate exits
					for (let k = 0; k < room.perimeter.length; k++) {
						exit = room.perimeter[k];
						p = room.parent_pos(exit[0]);
						length = -1;

						//try to dig a tunnel from this exit and see if it hits anything
						while (length <= this.max_interconnect_length) {
							//check if space is not occupied
							if (!this.walls.get(p) ||
								!this.walls.get(shift_left(p, exit[1])) ||
								!this.walls.get(shift_right(p, exit[1]))) {
								break;
							}
							hash = `${p[0]}_${p[1]}`;

							//is there a potential exit at these coordiantes (not of the same room)
							if (perims[hash] && perims[hash][1].id !== room.id) {
								room2 = perims[hash][1];

								//rooms cant be joined directly, add a corridor
								if (length > -1) {
									corridor = new Corridor({
										length,
										facing: exit[1]
									});

									if (this.join(room, corridor.perimeter[0], corridor, exit)) {
										this.join_exits(room2, perims[hash][0], corridor, corridor.perimeter[corridor.perimeter.length - 1]);
										return true;
									} else {
										return false;
									}
								//rooms can be joined directly
								} else {
									this.join_exits(room2, perims[hash][0], room, exit);
									return true;
								}
							}

							//exit not found, try to make the interconnect longer
							p = shift(p, exit[1]);
							length ++;
						}
					}
				}
			}
		}

		DungeonGenerator.prototype.new_room = function(key) {
			//spawn next room
			key = key || choose(this.room_tags, false);

			let opts = this.options.rooms[key];


			let room = this.room({
				size: vec(opts.min_size, opts.max_size),
				max_exits: opts.max_exits,
				symmetric: this.symmetric_rooms,
				tag: key
			});

			this.room_tags.splice(this.room_tags.indexOf(key), 1);

			if (key === 'initial') {
				this.initial_room = room;
			}
			return room;
		}
		
		
		DungeonGenerator.prototype.loopedGenerate = function() {
			if(this.loop_no_corridors == -717 && this.loop_no_rooms == -717) {
				this.loop_no_rooms = this.options.room_count - 1;
					let room = this.new_room(this.options.rooms.initial ? 'initial' : undefined);
					this.loop_no_corridors = Math.round(this.corridor_density * this.loop_no_rooms);

				this.add_piece(room, this.options.rooms.initial && this.options.rooms.initial.position ? this.options.rooms.initial.position :  this.get_center_pos());
			}
			let k;

			if (this.loop_no_corridors || this.loop_no_rooms) {
				k = nint(1, this.loop_no_rooms + this.loop_no_corridors);
				if (k <= this.loop_no_corridors) {
					let corridor = this.new_corridor();
					let added = this.add_room(corridor, corridor.perimeter[0]);
					this.loop_no_corridors --;

					//try to connect to this corridor next
					if (this.loop_no_rooms > 0 && added) {
						this.add_room(this.new_room(), null, corridor);
						this.loop_no_rooms --;
					}

				} else {
					this.add_room(this.new_room());
					this.loop_no_rooms --;
				}
				
				return;
			}

			for (k = 0; k < this.interconnects; k++) {
				this.add_interconnect();
			}

			this.trim();

			if (this.initial_room) {
				this.start_pos = this.initial_room.global_pos(this.initial_room.get_center_pos());
			}
			
			this.loop_no_corridors = -717; this.loop_no_rooms = -717;
			this.dispatchEvent(new Event(DungeonGenerator.GENERATE_COMPLETE));
			
		}

		DungeonGenerator.prototype.generate = function() {
			let no_rooms = this.options.room_count - 1,
				room = this.new_room(this.options.rooms.initial ? 'initial' : undefined),
				no_corridors = Math.round(this.corridor_density * no_rooms);

			this.add_piece(room, this.options.rooms.initial && this.options.rooms.initial.position ? this.options.rooms.initial.position :  this.get_center_pos());

			let k;

			while (no_corridors || no_rooms) {
				k = nint(1, no_rooms + no_corridors);
				if (k <= no_corridors) {
					let corridor = this.new_corridor();
					let added = this.add_room(corridor, corridor.perimeter[0]);
					no_corridors --;

					//try to connect to this corridor next
					if (no_rooms > 0 && added) {
						this.add_room(this.new_room(), null, corridor);
						no_rooms --;
					}

				} else {
					this.add_room(this.new_room());
					no_rooms --;
				}
			}

			for (k = 0; k < this.interconnects; k++) {
				this.add_interconnect();
			}

			this.trim();

			if (this.initial_room) {
				this.start_pos = this.initial_room.global_pos(this.initial_room.get_center_pos());
			}
			
			this.dispatchEvent(new Event(DungeonGenerator.GENERATE_COMPLETE));
			
		}
	

	export { DungeonGenerator   };
