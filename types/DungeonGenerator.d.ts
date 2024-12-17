declare function nint(min: any, max: any): any;
declare function nfloat(min?: number, max?: number): number;
declare function vec(min: any, max: any): any[];
declare function choose(items: any, remove?: boolean): any;
declare function maybe(probability: any): boolean;
declare function iter_adjacent([x, y]: [any, any], cb: any): void;
declare function iter_2d(size: any, callback: any): void;
declare function iter_range(from: any, to: any, callback: any): void;
declare function intersects(pos_1: any, size_1: any, pos_2: any, size_2: any): boolean;
declare function array_test(array: any, test: any): boolean;
declare function add(p1: any, p2: any): any[];
declare function shift(pos: any, facing: any): any[];
declare function shift_left(pos: any, facing: any): any[];
declare function shift_right(pos: any, facing: any): any[];
declare function Array2d(size?: number[], default_value?: number): void;
declare class Array2d {
    constructor(size?: number[], default_value?: number);
    rows: number[][];
    size: any[];
    filla(a: any, colsx: any, rowsy: any, value: any): void;
    iter(callback: any, context: any): void;
    get([x, y]: [any, any]): number;
    set([x, y]: [any, any], val: any): void;
    set_horizontal_line([start_x, start_y]: [any, any], delta_x: any, val: any): void;
    set_vertical_line([start_x, start_y]: [any, any], delta_y: any, val: any): void;
    get_square([x, y]: [any, any], [size_x, size_y]: [any, any]): Array2d;
    set_square([x, y]: [any, any], [size_x, size_y]: [any, any], val: any, fill?: boolean): void;
}
declare namespace Array2d {
    export { Array2d as constructor };
}
declare function DungeonPiece(options: any, id: any): void;
declare class DungeonPiece {
    constructor(options: any, id: any);
    options: any;
    id: any;
    walls: Array2d;
    perimeter: any[];
    exits: any[];
    children: any[];
    rect(): Rectangle;
    is_exit([x, y]: [any, any]): boolean;
    get_non_wall_tiles(): any[];
    get_perimeter_by_facing(facing: any): any[];
    get_inner_perimeter(): any[];
    parent_pos([x, y]: [any, any]): any[];
    global_pos(pos: any): any;
    local_pos(pos: any): number[];
    get_center_pos(): number[];
    add_perimeter(p_from: any, p_to: any, facing: any): void;
    remove_perimeter(rect: any): void;
    intersects(piece: any): boolean;
    add_piece(piece: any, position?: any): void;
    paste_in(piece: any): void;
    add_exit(exit: any, room: any): void;
}
declare namespace DungeonPiece {
    export { DungeonPiece as constructor };
}
/**
    *
    *
    * @class DungeonGenerator
    * @classdesc
    *    Generates random dungeons
    *
    *
    *
    * @param w {Number} tile width default is 32
    * @param h {Number} tile height default is 32
    * @param roomAmount {Number}
    * @param minRoomSize {Number}
    * @param maxRoomSize {Number}
    * @param maxExits {Number}
    * @param maxCorridorLength {Number}
    * @param minCorridorLength  {Number}
    * @param density  {Number}
    * @param symmetric {boolean}
    * @param intercns {Number} Interconnections amount
    * @param maxInterLength {Number}
    *
    */
declare function DungeonGenerator(w: number, h: number, roomAmount: number, minRoomSize: number, maxRoomSize: number, maxExits: number, maxCorridorLength: number, minCorridorLength: number, density: number, symmetric: boolean, intercns: number, maxInterLength: number): void;
declare class DungeonGenerator {
    /**
        *
        *
        * @class DungeonGenerator
        * @classdesc
        *    Generates random dungeons
        *
        *
        *
        * @param w {Number} tile width default is 32
        * @param h {Number} tile height default is 32
        * @param roomAmount {Number}
        * @param minRoomSize {Number}
        * @param maxRoomSize {Number}
        * @param maxExits {Number}
        * @param maxCorridorLength {Number}
        * @param minCorridorLength  {Number}
        * @param density  {Number}
        * @param symmetric {boolean}
        * @param intercns {Number} Interconnections amount
        * @param maxInterLength {Number}
        *
        */
    constructor(w: number, h: number, roomAmount: number, minRoomSize: number, maxRoomSize: number, maxExits: number, maxCorridorLength: number, minCorridorLength: number, density: number, symmetric: boolean, intercns: number, maxInterLength: number);
    origOptions: {};
    options: {
        size: number[];
        rooms: {
            initial: {
                min_size: number[];
                max_size: number[];
                max_exits: number;
            };
            any: {
                min_size: number[];
                max_size: number[];
                max_exits: number;
            };
        };
        max_corridor_length: number;
        min_corridor_length: number;
        corridor_density: number;
        symmetric_rooms: boolean;
        interconnects: number;
        max_interconnect_length: number;
        room_count: number;
    };
    next_piece_id: number;
    size: number[];
    position: any;
    parent: any;
    max_exits: any;
    tag: any;
    id: number;
    walls: Array2d;
    perimeter: any[];
    exits: any[];
    children: any[];
    start_pos: number[];
    minx: number;
    maxx: number;
    miny: number;
    maxy: number;
    room_tags: string[];
    rooms: any[];
    corridors: any[];
    loop_no_rooms: number;
    loop_no_corridors: number;
    /**
    *
    * reset the generator after generate has already been called.
    * needs to be called between generate calls.
    *
    * @memberof DungeonGenerator.prototype
    * @method reset
    *
    */
    reset(): void;
    rect(): Rectangle;
    is_exit([x, y]: [any, any]): boolean;
    get_non_wall_tiles(): any[];
    get_perimeter_by_facing(facing: any): any[];
    get_inner_perimeter(): any[];
    parent_pos([x, y]: [any, any]): any[];
    global_pos(pos: any): any;
    local_pos(pos: any): number[];
    get_center_pos(): number[];
    add_perimeter(p_from: any, p_to: any, facing: any): void;
    remove_perimeter(rect: any): void;
    intersects(piece: any): boolean;
    paste_in(piece: any): void;
    add_exit(exit: any, room: any): void;
    /**
    *
    * print the dungeon as a 2D array of [x,y, wall or not, wall or not] values.
    *  wall or not will be -1 for walls 0 for non wall.
    *
    * @memberof DungeonGenerator.prototype
    * @method print
    *
    * @returns {Array}
    *
    */
    print(): any[];
    /**
    *
    * returns an Object holding the values left right top bott topright topleft leftofleft rightofright bottofbott topoftop bottright bottleft
    *  those values denote whether each tile around v is a wall or not.
    *
    * @memberof DungeonGenerator.prototype
    * @method tenAround
    *
    * @param v {Array} the value [x,y] index spot of the dungeon to check
    * @param w {Number} tile width default is 16
    * @param h {Number} tile height default is 16
    * @returns {Object}
    */
    tenAround(v: any[], w: number, h: number): any;
    /**
    *
    * prints the generated dungeon as a 2D array of wallValue floorValue values
    * the start position will be given playerValue
    * you can pass a wallValueMethod and floorValueMethod to aid in determining what each value should be
    * the methods you pass will get passed the [x,y] location of each spot, and an array containing whether or not the 12 tiles around it are wall or not,
    * and the row, and column index of each spot
    * the wallValueMethod floorValueMethod should return the values desired, you would use them for example to place shadows in corners
    * or other such details. See the DungeonGenerator example in examples and the TileSceneChanger example.
    *
    * @memberof DungeonGenerator.prototype
    * @method specificPrint
    *
    * @param wallValue {Object} the desired value for each wall tile
    * @param floorValue {Object} the desired value for each floor tile
    * @param playerValue {Object} the desired value for the start tile
    * @param wallValueMethod {Function} An optional function to use to determine each spots wall value, gets passed each position, the result of tenAround on the position, and the row and column index of the position.
    * @param floorValueMethod {Function} optional function like wallValueMethod but for the floor tiles.
    *
    */
    specificPrint(wallValue: any, floorValue: any, playerValue: any, wallValueMethod: Function, floorValueMethod: Function, log: any): any[][];
    room(options: any): DungeonPiece;
    corridor(options: any): DungeonPiece;
    add_piece(piece: any, position: any): void;
    trim(): void;
    fits(piece: any, position: any): boolean;
    join_exits(piece1: any, piece1_exit: any, piece2: any, piece2_exit: any): void;
    join(piece1: any, piece2_exit: any, piece2: any, piece1_exit: any): boolean;
    get_open_pieces(pieces: any): any;
    add_room(room: any, exit: any, add_to_room?: any): boolean;
    new_corridor(): DungeonPiece;
    add_interconnect(): boolean;
    new_room(key: any): DungeonPiece;
    initial_room: DungeonPiece;
    loopedGenerate(): void;
    /**
    *
    * generate a new random dungeon, a DungeonGenerator.GENERATE_COMPLETE Event will dispatch when the generation is complete.
    *
    * @memberof DungeonGenerator.prototype
    * @method generate
    *
    *
    *
    */
    generate(): void;
}
declare namespace DungeonGenerator {
    export { DungeonGenerator as constructor };
}
declare const TOP: 0;
declare const RIGHT: 90;
declare const BOTTOM: 180;
declare const LEFT: 270;
declare const FACING: number[];
declare const FACING_TO_STRING: {
    0: string;
    90: string;
    180: string;
    270: string;
};
declare const FACING_TO_MOD: {
    0: number[];
    90: number[];
    180: number[];
    270: number[];
};
declare const FACING_INVERSE: {
    0: number;
    90: number;
    180: number;
    270: number;
};
declare const FACING_MOD_RIGHT: {
    0: number;
    90: number;
    180: number;
    270: number;
};
declare const FACING_MOD_LEFT: {
    0: number;
    90: number;
    180: number;
    270: number;
};
//# sourceMappingURL=DungeonGenerator.d.ts.map