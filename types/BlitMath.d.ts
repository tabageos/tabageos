declare function BlitMath(): void;
/**
*
*   This constructor does nothing, all methods of this class are static.
*
*
* @classdesc A class of static methods that aid in drawing a tileset onto a canvas. And aid 2D Array manipulation.
*  One of the core Classes of the library.
*
*
* @class BlitMath
*
*
*/
declare function BlitMath(): void;
declare class BlitMath {
}
declare namespace BlitMath {
    let globalImageSource: any;
    let ignoredY: number;
    let pPointPool: any[];
    let ignored: number;
    let ignoredArrays: any[];
    let basicPattern: any;
    let levelPieceFunction: any;
    let ignorSet: any[];
    let aLevelPiece: any;
    let _mpoint: MoverPoint;
    let _rect: Rectangle;
    let _specs: BlitSpecs;
    function levelPieceFactory(): any;
    function getPositionPoint(): any;
    /**
    *
    *
    *  Returns BlitMath._specs
    *
    * @memberof BlitMath
    * @method getSpecs
    *
    */
    function getSpecs(): BlitSpecs;
    /**
    *
    *
    *  Sets BlitMath._specs
    *
    * @memberof BlitMath
    * @method setSpecs
    * @param toThis {BlitSpecs}
    *
    */
    function setSpecs(toThis: BlitSpecs): void;
    /**
    *
    * Compares the two values and returns true if they match.
    * If each value is a Number it compares the numnbers.
    * If each value is a Array it itterates through each array and if each value in the arrays matchs then it returns true.
    *
    *
    * @memberof BlitMath
    * @method valuesMatch
    * @param val1 {Number|Array}
    * @param val2 {Number|Array}
    * @returns {Boolean}
    */
    function valuesMatch(val1: number | any[], val2: number | any[]): boolean;
    /**
    *
    *    Draws squares from a 2D Array pattern of integers.
    *
    * @memberof BlitMath
    * @method drawSquaresFromPattern
    * @param subject {CanvasObject} The CanvasObject to draw the squares on.
    * @param pattern {Array} The 2D Array of integers that defines the pattern to draw.
    * @param squareWidth {Number} The width of each square, default is 16.
    * @param squareHeight {Number} The height of each square, default is 16.
    * @param colorValues {Object} An Object containing the string html color value each square should be, each value in the pattern would be associated with a color, for example {1:"#6495ed",2:"#ff00ff",3:"#c8c8c8"}
    *
    *
    */
    function drawSquaresFromPattern(subject: CanvasObject, pattern: any[], squareWidth: number, squareHeight: number, colorValues: any): void;
    /**
    *
    *    Draws squares from a 2D Array pattern of integers/arrays using just a defined area of the pattern, not the whole pattern.
    *
    * @memberof BlitMath
    * @method drawSquaresFromAreaOfPattern
    * @param subject {CanvasObject} The CanvasObject to draw the squares on.
    * @param pattern {Array} The 2D Array of integers or arrays that defines the pattern to draw.
    *                 when the inner values of the 2D Array are arrays this method uses just the first number in the inner array to get the number that will define the color of the tile.
                      for example [7,5]  7 would be the number used.
    * @param startC {Number} The column in the pattern to start from.
    * @param endC {Number} The column in the pattern to end at.
    * @param startR {Number} The row in the pattern to start from.
    * @param endR {Number} The row in the pattern to end at.
    * @param squareWidth {Number} The width of each square, default is 16.
    * @param squareHeight {Number} The height of each square, default is 16.
    * @param colorValues {Object} An Object containing the color each square should be, each value in the pattern would be associated with a color.
    *
    * @param toPointOffsetX {Number} Optional offset of the horizontal positon of the result.
    * @param toPointOffsetY {Number} Optional offset of the vertical position of the result.
    *
    */
    function drawSquaresFromAreaOfPattern(subject: CanvasObject, pattern: any[], startC: number, endC: number, startR: number, endR: number, squareWidth: number, squareHeight: number, colorValues: any, toPointOffsetX: number, toPointOffsetY: number): void;
    /**
    * Draws the pattern onto the subject.
    *
    *
    * @memberof BlitMath
    * @method patternBlit
    * @param subject {CanvasObject} the CanvasObject to draw to
    * @param source {Img} an html Image or loaded png/jpg file.
    * @param pattern {Array} <pre> A 2D Array that, by default, holds Integers that denote the x index of each tile to draw from.
    *	The y index to draw from, for this method, is by default defined by BlitMath._specs.blitIndex.
    *      For example:
    *      var pattern = [
    *			[ 1, 1, 1 ],
    *			[ 1, 0, 1 ],
    *			[ 1, 1, 1 ]
    *		];
    *   By default, to get the exact x position where in the source to draw from, this method multiplies BlitMath._specs.blitWidth *  each number in the patterns inner arrays.
    *   By default, each y position is determined by BlitMath._specs.blitHeight * BlitMath._specs.blitIndex.   BlitMath._specs is an instance of the BlitSpecs Class.
    *
    *    By default BlitMath._specs has a blitWidth of 16 and blitHeight of 16 and blitIndex of 0.
    *    To change BlitMath._specs construct a new BlitSpecs instance, for example:
    *
    *    BlitMath._specs = new tabageos.BlitSpecs(16,16);
    *    BlitMath._specs.blitIndex = 0;
    *
    *    patternBlit(subject,source,pattern);
    *
    *    ---
    *
    *   To change how the x index or y index is determined you can pass in a indexXMethod and/or indexYMethod.
    *  For example you could use decimal numbers to denote x and y index as follows:
    *
    *   var pattern = [
    *		[ 1.4, 1.4, 1.4],
    *		[ 1.4, 0.0, 1.4],
    *		[ 1.4, 1.4, 1.4]
    *   ];
    *
    *   Then you need to define functions that would return the index values:
    *
    *   var xInd = function(num) { return Math.floor(num); } //in this example: 1 or 0
    *   var yInd = function(num)  { return tabageos.splitNumberAtDecimal(num); }//in this example: 4 or 0
    *
    *   and pass those functions during the patternBlit call:
    *
    *
    *   patternBlit(subject,source, pattern, xInd, yInd);
    *
    *    Each x index is multiplied by BlitMath._specs.blitWidth to determine the x position in the source to draw from.
    *   Each y index is multipled by BlitMath._specs.blitHeight.
    *
    *   The problem encountered when using decimals is that numbers with trailing zeros, for example: 1.10   would return 1 and 1, not 1 and 10.
    *   So for the location of drawing from a sprite sheet it is not ideal.
    *
    *   ---
    *
    *   Another option is to use bitwise operations to combine the values; 1 and 4 bitwsie combine as 65540.
    *
    *   var pattern = [
    *       [tabageos.combineTwoNumbers(1,4), tabageos.combineTwoNumbers(1,4), tabageos.combineTwoNumbers(1,4)],
    *       [tabageos.combineTwoNumbers(1,4), tabageos.combineTwoNumbers(0,0),  tabageos.combineTwoNumbers(1,4)],
    *       [tabageos.combineTwoNumbers(1,4), tabageos.combineTwoNumbers(1,4), tabageos.combineTwoNumbers(1,4)]
    *   ];
    *
    *    (you can use the combineTwoNumbers method as above, or you can use the ArrayMaker tool found on the tabageos site to make combined arrays for you)
    *
    *    var xInd = function(num) { return tabageos.getAFromCombined(num); }
    *    var yInd = function(num) { return tabageos.getBFromCombined(num); }
    *
    *    patternBlit(subject, source, pattern, xInd, yInd);
    *
    *
    *  ---
    *
    *   So the patternBlit method allows you to define how the x and y index is calibrated, or by default it expects just x indexes.
    *
    *   If you have a special kind of way you like to set up your array values, patternBlit is what you would use, passing in functions that return x and y index based on your values.
    *
    *    The specificaPatternBlit method takes only arrays that have [y,x]  values, for example:
    *    var pattern = [
    *      [ [4,1],[4,1],[4,1] ],
    *      [ [4,1],[0,0],[4,1] ],
    *      [ [4,1],[4,1],[4,1] ]
    *    ];
    *
    *    The combinedPatternBlit method takes only arrays that have bitwise combined xy values.
    *
    *   </pre>
    *
    *
    * @param indexXMethod {Function} an optional method that would take a value in the array and return a x index, if not defined then the value itself is used as x index.
    * @param indexYMethod {Function} an optional method that would take a value in the array and return a y index, if not defined then BlitMath._specs.blitIndex is used as y index.
    * @param toPointOffsetX {Number} an optional x offset to offset the x position of the whole drawing on the canvas.
    * @param toPointOffsetY {Number} an optional y offset to offset the y position of the whole drawing on the canvas.
    *
    *
    */
    function patternBlit(subject: CanvasObject, source: Img, pattern: any[], indexXMethod: Function, indexYMethod: Function, toPointOffsetX: number, toPointOffsetY: number): void;
    /**
    *
    *    Draws from a 2D Array pattern using just a defined area of the pattern, not the whole pattern.
    *
    * @memberof BlitMath
    * @method patternAreaBlit
    * @param subject {CanvasObject} The CanvasObject to draw on.
    * @param source {Img} The source image to draw from. The spritesheet/tileset.
    * @param pattern {Array} The 2D Array that defines the pattern to draw. For this method any 2D Array containing any kind of values can be used. You can define how to calculate each tile index by passing methods to this method.
    * @param startC {Number} The column in the pattern to start from.
    * @param endC {Number} The column in the pattern to end at.
    * @param startR {Number} The row in the pattern to start from.
    * @param endR {Number} The row in the pattern to end at.
    * @param indexXMethod {Function} A method to call on each tile value that will return the x index of the tile in the pattern.
    *						If a x method is not defined the tile value will be used as the x index.
    * @param indexYMethod {Function} A method to call on each value that will return the y index of the tile in the pattern.
    *						If a y method is not defined, Blith._specs.blitIndex will be used for every y index.
    *
    * @param toPointOffsetX {Number} Optional offset of the horizontal positon of each square.
    * @param toPointOffsetY {Number} Optional offset of the vertical position of each square.
    *
    */
    function patternAreaBlit(subject: CanvasObject, source: Img, pattern: any[], startC: number, endC: number, startR: number, endR: number, indexXMethod: Function, indexYMethod: Function, toPointOffsetX: number, toPointOffsetY: number): void;
    /**
    *
    *    Draws from a 2D Array pattern of [y,x] values using just a defined area of the pattern, not the whole pattern.
    *
    * @memberof BlitMath
    * @method specificPatternAreaBlit
    * @param subject {CanvasObject} The CanvasObject to draw on.
    * @param source {Img} The source image to draw from. The spritesheet/tileset.
    * @param pattern {Array} A 2D Array of [y,x] values that defines the pattern to draw.
    * @param startC {Number} The column in the pattern to start from.
    * @param endC {Number} The column in the pattern to end at.
    * @param startR {Number} The row in the pattern to start from.
    * @param endR {Number} The row in the pattern to end at.
    * @param toPointOffsetX {Number} Optional offset of the horizontal positon of each square.
    * @param toPointOffsetY {Number} Optional offset of the vertical position of each square.
    *
    */
    function specificPatternAreaBlit(subject: CanvasObject, source: Img, pattern: any[], startC: number, endC: number, startR: number, endR: number, toPointOffsetX: number, toPointOffsetY: number): void;
    /**
    *
    *
    *  Draws pattern onto subject. Pattern is a 2D Array of bitwise combined numbers.
    *
    * @memberof BlitMath
    * @method combinedPatternBlit
    * @param subject {CanvasObject} CanvasObject to draw on
    * @param source {Img} The image to draw from.
    * @param pattern {Array} A 2D Array of bitwise combined integers that defines each tile to draw.
    * @param toPointOffsetX {Number} An optional horizontal offset of the whole result.
    * @param toPointOffsetY {Number} An optional vertical offset of the whole result.
    *
    */
    function combinedPatternBlit(subject: CanvasObject, source: Img, pattern: any[], toPointOffsetX: number, toPointOffsetY: number): void;
    /**
    *
    *
    *  Assuming that subject is a 2D Array of [y,x] or [x,y] values, this method will switch the inner position of the numbers in each value, so [y,x] would become [x,y].
    *
    * @memberof BlitMath
    * @method xySwitch
    * @param subject {CanvasObject} a 2D Array of [y,x] or [x,y] values.
    *
    *
    */
    function xySwitch(subject: CanvasObject, xFitst: any, yFirst: any): void;
    /**
    *
    *
    *  Draws pattern onto subject. Pattern is a 2D Array of [y,x] index values.
    *  The inner values can also be [y,x,y,x] in which case it draws two layers, the ending y,x first.
    *
    * @memberof BlitMath
    * @method specificPatternBlit
    * @param subject {CanvasObject} CanvasObject to draw on
    * @param source {Img} The image to draw from.
    * @param pattern {Array} A 2D Array of [y,x] values that defines each tile to draw. y,x are the index of the tile not the exact position.
    * @param tw {Number} The width of each tile. BlitMath._specs.blitWidth is used. this param effects only how each tile is actually drawn on screen.
    * @param th {Number} The height of each tile. BlitMath._specs.blitHeight is used. this param effects only how each tile is actually drawn on screen.
    *
    */
    function specificPatternBlit(subject: CanvasObject, source: Img, pattern: any[], tw: number, th: number): void;
    let patternActionEvent: PatternActionEvent;
    let functionAssignments: any[];
    /**
    *
    *
    *  Goes through the pattern and each time it finds a value from BlitMath.functionAssignments
    *  it dispatches a PatternActionEvent that gets handled by a method you define.
    *   That method would get a PatternActionEvent that contains information of the tile that caused the event.
    *
    * @memberof BlitMath
    * @method dispatchFunctionAssignments
    * @param eventDispatcher {EventDispatcher} EventDispatcher to use for the events.
    * @param handlerFunctionString {String} String name of the handler function to call. The function should expect an event as a param.
    * @param handlerObject {Object} Object that contains the handler function.
    * @param pattern {Array} The 2D Array to iterate through and dispatch an event each time a value from functionAssignments is found.
    * @param tileWidth {Number} The width of each tile.
    * @param tileHeight {Number} The height of each tile.
    *
    */
    function dispatchFunctionAssignments(eventDispatcher: EventDispatcher, handlerFunctionString: string, handlerObject: any, pattern: any[], tileWidth: number, tileHeight: number): void;
    /**
    *
    *
    *  Returns true if the tile value at the position is not 0 or [0,0].
    *
    * @memberof BlitMath
    * @method isATileAt
    * @param x {Number} A x position to check. The position not the index.
    * @param y {number} A y position to check. The position not the index.
    * @param patt {Array} 2D Array to check.
    * @param tileWidth {Number} The width of each tile.
    * @param tileHeight {Number} The height of each tile.
    * @returns {Boolean}
    */
    function isATileAt(x: number, y: number, patt: any[], tileWidth: number, tileHeight: number): boolean;
    let tileDataHolder: any[];
    /**
    *
    *
    *  Converts the internal values of a 1D Array into TileData Objects and returns a new array of TileData Objects.
    *  This method is used inside of the convertToTileDataHolder method.
    *
    * @memberof BlitMath
    * @method convertInternalValues
    * @param arr {Array} a 1D Array
    * @param tileWidth {Number} The width of each tile.
    * @param tileHeight {Number} The height of each tile.
    * @param yIndex {Number} The y index of each tile.
    *
    * @returns {Array}
    */
    function convertInternalValues(arr: any[], tileWidth: number, tileHeight: number, yIndex: number): any[];
    /**
    *
    *
    *  Returns true if the tile value at the position does not contain any 0's.
    *  For values such as [0,1] this value returns false. Whereas isATileAt would return true.
    *
    * @memberof BlitMath
    * @method isANonZeroTileAt
    * @param x {Number} x position to check.
    * @param y {Number} y position to check.
    * @param patt {Array} 2D Array to check.
    * @param tileWidth {Number} The width of each tile.
    * @param tileHeight {Number} The height of each tile.
    *
    * @returns {Boolean}
    *
    */
    function isANonZeroTileAt(x: number, y: number, patt: any[], tileWidth: number, tileHeight: number): boolean;
    /**
    *
    *
    *  Adds values to the end of a 2D Array. The Array can have values of integers or [y,x] inner arrays.
    *
    * @memberof BlitMath
    * @method addSpecificValuesToMultiArray
    * @param mda {Array} 2D Array of integers or arrays.
    * @param values {Array} 1D Array of values to add. The index of each value in this array matches the row index in the mda.
    *                       Each value is pushed into the end of each repsective row of the mda.
    *
    *
    *
    */
    function addSpecificValuesToMultiArray(mda: any[], values: any[]): void;
    /**
    *
    *
    *  Clones a 2D Array and returns the new array.
    *
    *
    * @memberof BlitMath
    * @method cloneMultiArray
    * @param mda {Array} 2D Array to clone.
    *
    *
    * @returns {Array}
    */
    function cloneMultiArray(mda: any[]): any[];
    /**
    *
    *
    *  Replaces value with rZero rOne.
    *  If the mda is a 2D Array of [y,x] arrays the matching values y is replaced with rZero and x with rOne.
    *  If the mda is a 2D Array of integers the matching value is replaced with rZero.
    *
    * @memberof BlitMath
    * @method replaceAllOfValueFromMultiArray
    * @param mda {Array} 2D Array to clone.
    * @param value {Number|Array} The value to replace.
    * @param rZero {Number} Number to replace interger/first index in [y,x] value with.
    * @param rOne {Number} Number to replace second index with.
    * @returns {Array}
    */
    function replaceAllOfValueFromMultiArray(mda: any[], value: number | any[], rZero: number, rOne: number): any[];
    /**
    *
    *
    *  Replaces the values from the 2D Array.
    *  If the mda is a 2D Array of [y,x] arrays each matching values y is replaced with rZero and x with rOne.
    *  If the mda is a 2D Array of integers each matching value is replaced with rZero.
    *
    * @memberof BlitMath
    * @method replaceValuesFromMultiArray
    * @param mda {Array} 2D Array to clone.
    * @param values {Array} 1D Array of the values to replace.
    * @param rZero {Number} Number to replace interger/first index in [y,x] value with.
    * @param rOne {Number} Number to replace second index with.
    * @returns {Array}
    */
    function replaceValuesFromMultiArray(mda: any[], values: any[], rZero: number, rOne: number): any[];
    /**
    *
    *
    *  Resets BlitMath.tileDataHolder
    *
    * @memberof BlitMath
    * @method resetTileDataHolder
    *
    */
    function resetTileDataHolder(): void;
    /**
    *
    *
    *  Converts a 2D Array into BlitMath.tileDataHolder which holds each tile value as a TileData Object.
    *
    * @memberof BlitMath
    * @method convertToTileDataHolder
    * @param patt {Array} 2D Array to convert into BlitMath.tileDataHolder
    * @param tileWidth {Number} the width of each tile.
    * @param tileHeight {Number} the eight of each tile.
    *
    *
    */
    function convertToTileDataHolder(patt: any[], tileWidth: number, tileHeight: number): void;
    /**
    *
    *
    *  Returns the tile value at the x y position in the patt.
    *
    * @memberof BlitMath
    * @method checkTileValueAt
    * @param x {Number} x position to check.
    * @param y {Number} y position to check.
    * @param patt {Array} 2D Array to check.
    * @param tileWidth {Number} the width of each tile.
    * @param tileHeight {Number} the eight of each tile.
    * @param indexHolderPoint {MoverPoint} An optional MoverPoint that would store the index of the result.
    * @returns {Object}
    */
    function checkTileValueAt(x: number, y: number, patt: any[], tileWidth: number, tileHeight: number, indexHolderPoint: MoverPoint): any;
    let _wasmGetIndexFromArbitraryBitwise: any;
    let _wasmLeftBit: any;
    let _wasmRightBit: any;
    /**
    *
    *
    *  Assings the index of the tile found in the 2D Array to indexHolderPoint.
    * So to get the tile value you would then use pattern[indexHolderPoint.y][indexHolderPoint.x]
    * This method does not return anything.
    *
    * @memberof BlitMath
    * @method fasterCheckTileValueAt
    * @param x {Number} x position to check.
    * @param y {Number} y position to check.
    * @param pattLength {Number} The length of the outer array of the 2D Array; patt.length.
    * @param innerPattLength {Number} The length of the inner arrays in the 2D Array; patt[0].length.
    * @param tileWidth {Number} the width of each tile.
    * @param tileHeight {Number} the eight of each tile.
    * @param indexHolderPoint {MoverPoint} An optional MoverPoint that would store the index of the result.
    *
    */
    function fasterCheckTileValueAt(x: number, y: number, pattLength: number, innerPattLength: number, tileWidth: number, tileHeight: number, indexHolderPoint: MoverPoint): void;
    /**
    *
    *
    *  Returns the tile found in the pattern as a TileData Object.
    *  If the pattern is not BlitMath.tileDataHolder, BlitMath.tileDataHolder will be created using the pattern.
    *
    * @memberof BlitMath
    * @method getTileDataAt
    * @param x {Number} x position to check.
    * @param y {Number} y position to check.
    * @param patt {Array} 2D Array of values.
    * @param tileWidth {Number} the width of each tile.
    * @param tileHeight {Number} the eight of each tile.
    * @returns {TileData}
    *
    */
    function getTileDataAt(x: number, y: number, patt: any[], tileWidth: number, tileHeight: number): TileData;
    /**
    *
    *
    *  Draws one tile from pattern onto subject using source. Using a specific style 2D Array of [y,x] values.
    *
    * @memberof BlitMath
    * @method specificBlit
    * @param subject {CanvasObject} CanvasObject to draw on.
    * @param source {Img} The image to draw from.
    * @param pattern {Array} A 2D Array of [y,x] or [y,x,y,x] values.
    * @param tw {Number} The width of each tile.
    * @param th {Number} The height of each tile.
    * @param xIn {number} The x index of the tile to draw.
    * @param yIn {Number} The y index of the tile to draw.
    *
    *
    */
    function specificBlit(subject: CanvasObject, source: Img, pattern: any[], tw: number, th: number, xIn: number, yIn: number): void;
    /**
    *
    *
    *  Removes a tile from the map of specific [y,x] values using TileData and redraws the tile spot using specificBlit.
    *
    * @memberof BlitMath
    * @method removeTileData
    * @param td {TileData} The TileData to remove from map. You can use TileData.make to create a TileData from your value.
    * @param map {Array} 2D Array of [y,x] values.
    * @param canvasObject {CanvasObject} The CanvasObject to draw on/clear.
    * @param img {Img} The image to use.
    * @param tw {Number} The width of each tile.
    * @param th {Number} The height of each tile.
    * @param clearWidth {number} will be same as tw.
    * @param clearHeight {Number} will be same as th.
    * @param tdh {Number|Boolean} If true map will not be used to create BlitMath.tileDataHolder, by default BlitMath.tileDataHolder is remade at the end of this method, using map.
    *
    *
    */
    function removeTileData(td: TileData, map: any[], canvasObject: CanvasObject, img: Img, tw: number, th: number, clearWidth: number, clearHeight: number, tdh: number | boolean): void;
    /**
    *
    *
    *  Adds a value to a TileData based tile position in the map and redraws the tile spot.
    *
    * @memberof BlitMath
    * @method addValueToTileDataPosition
    * @param td {TileData} The TileData to remove from map. You can use TileData.make to create a TileData from your value.
    * @param value {Array} The [y,x] value to add.
    * @param map {Array} 2D Array of [y,x] values.
    * @param canvasObject {CanvasObject} The CanvasObject to draw on/clear.
    * @param img {Img} The image to use.
    * @param tw {Number} The width of each tile.
    * @param th {Number} The height of each tile.
    * @param clearWidth {number} will be same as tw.
    * @param clearHeight {Number} will be same as th.
    * @param tdh {Number|Boolean} If true map will not be used to create BlitMath.tileDataHolder, by default BlitMath.tileDataHolder is remade at the end of this method, using map.
    *
    *
    */
    function addValueToTileDataPosition(td: TileData, value: any[], map: any[], canvasObject: CanvasObject, img: Img, tw: number, th: number, clearWidth: number, clearHeight: number, tdh: number | boolean): void;
    /**
    *
    *
    *  Adds a value to the position in the map and redraws the position using specificBlit.
    *
    * @memberof BlitMath
    * @method addValueToPosition
    * @param x {Number} The x index of the position.
    * @param y {Number} The y index of the position.
    * @param value {Object} The [y,x] value to add.
    * @param map {Array} A 2D Array of [y,x] values.
    * @param canvasObject {CanvasObject} The CanvasObject to draw on/clear, if null no redraw happens.
    * @param img {Img} The image to use.
    * @param tw {Number} The width of each tile.
    * @param th {Number} The height of each tile.
    * @param clearWidth {number} will be same as tw.
    * @param clearHeight {Number} will be same as th.
    * @param tdh {Number|Boolean} If true map will not be used to create BlitMath.tileDataHolder, by default BlitMath.tileDataHolder is remade at the end of this method, using map.
    *
    *
    */
    function addValueToPosition(x: number, y: number, value: any, map: any[], canvasObject: CanvasObject, img: Img, tw: number, th: number, clearWidth: number, clearHeight: number, tdh: number | boolean): void;
    /**
    *
    *
    *  Returns an Array of MoverPoints that make up the pattern of tiles with the given value.
    *
    * @memberof BlitMath
    * @method getBasicPatternOf
    * @param thisTile {Number|Array} The value of the tile to make a pattern from.
    * @param patt {Array} A 2D Array of tile values.
    * @param tileWidth {Number} The width of each tile.
    * @param tileHeight {Number} The height of each tile.
    * @param leftToRight {Boolean} If false the search will begin from the right. Default is false.
    * @returns {Array}
    */
    function getBasicPatternOf(thisTile: number | any[], patt: any[], tileWidth: number, tileHeight: number, leftToRight: boolean): any[];
    /**
    *
    *
    *  Returns an Array of MoverPoints that make up the path of tiles with the given value.
    *
    * @memberof BlitMath
    * @method getPathOfTile
    * @param thisTile {Number|Array} The value of the tile to make a path from.
    * @param patt {Array} A 2D Array of tile values.
    * @param tileWidth {Number} The width of each tile.
    * @param tileHeight {Number} The height of each tile.
    * @param leftToRight {Boolean} If false the search will begin from the right. Default is false.
    * @returns {Array}
    */
    function getPathOfTile(thisTile: number | any[], patt: any[], tileWidth: number, tileHeight: number, leftToRight: boolean): any[];
}
//# sourceMappingURL=BlitMath.d.ts.map