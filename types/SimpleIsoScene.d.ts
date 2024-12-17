/**
*@class SimpleIsoScene
* @classdesc
*   Used to display a basic isometric scene.
*
*    See the isometric exmaple here:  https://www.tabageos.com/examples/isometricExample
*
*     You just construct it and then call .render in a loop. The SimpleIsoCharacter Class move method returns true when it actually moves,
*       so you only need to call render when any SimpleIsoCharacter actually moves or when the scene changes.
*
*      All of the propertiesd and methods are used during the .render method, it encapsulates everything to render the scene.
*       But if you really want to tackle it, everything is also pieced out in different methods and properties.
*
* @param tileWidth {Number} The width of each tile.
* @param tileHeight {Number} The height of each tile.
* @param floorCO {CanvasObject} The bottom most CanvsObject, the floor will be rendered on it.
* @param canvasObject {CanvasObject} The CanvasObject that is displayed on top of floorCo, characters will be rendered on it
* @param player {SimpleIsoCharacter} The SimpleIsoCharacter that will be moved around by the player.
* @param map {Array} A 2D Array defining the tiles to be drawn, the inner values should be [y,x] arrays denoting the y and x index of where in the sprite sheet to draw from.
*                       Set this map up as if your looking at standard top down 2d, the class converts to iso for you.
* @param tileSheetImg {Image} The Image to use as the tile set, the tile set to draw from.
* @param playerValue {Array} The [y,x] value of the first frame of the first animation defined for the player
* @param noPassValue {Array} Array of [y,x,y,x,y,x...] pairs denoting [y,x] values in map that are not passable.
* @param floorValues {Array} Array of [y,x,y,x,y,x...] pairs denoting [y,x] values in map that are the floor tiles.
* @param xOffset {Number} optional amount to horizontally offset whole scene
* @param yOffset {Number} optional amount to vertically offset whole scene
* @param spread {Number} A number normally between .009 and 1, default is .009, play with it until your scene looks how you want.
* @param xSpreadShifter {Number} A number that shifts the x position of each tile as a scene, default is 0.00. Sometimes this number may need to be .10 or such, it is another value to play with, also if your tiles are not exact values (like 32x16 instead of 32x32) then you may need to mess with this value.
* @param ySpreadShifter {Number} A number that shifts the y position of each tile as a scene, default is 0.00.  Sometimes this number may need to be .10 or such, it is another value to play with, also if your tiles are not exact values (like 32x16 instead of 32x32) then you may need to mess with this value.
* @param camera {BasicCamera} A BasicCamera to use.
*
*/
declare function SimpleIsoScene(tileWidth: number, tileHeight: number, floorCO: CanvasObject, canvasObject: CanvasObject, player: SimpleIsoCharacter, map: any[], tileSheetImg: new (width?: number, height?: number) => HTMLImageElement, playerValue: any[], noPassValue: any[], floorValues: any[], xOffset: number, yOffset: number, spread: number, xSpreadShifter: number, ySpreadShifter: number, camera: BasicCamera): void;
declare class SimpleIsoScene {
    /**
    *@class SimpleIsoScene
    * @classdesc
    *   Used to display a basic isometric scene.
    *
    *    See the isometric exmaple here:  https://www.tabageos.com/examples/isometricExample
    *
    *     You just construct it and then call .render in a loop. The SimpleIsoCharacter Class move method returns true when it actually moves,
    *       so you only need to call render when any SimpleIsoCharacter actually moves or when the scene changes.
    *
    *      All of the propertiesd and methods are used during the .render method, it encapsulates everything to render the scene.
    *       But if you really want to tackle it, everything is also pieced out in different methods and properties.
    *
    * @param tileWidth {Number} The width of each tile.
    * @param tileHeight {Number} The height of each tile.
    * @param floorCO {CanvasObject} The bottom most CanvsObject, the floor will be rendered on it.
    * @param canvasObject {CanvasObject} The CanvasObject that is displayed on top of floorCo, characters will be rendered on it
    * @param player {SimpleIsoCharacter} The SimpleIsoCharacter that will be moved around by the player.
    * @param map {Array} A 2D Array defining the tiles to be drawn, the inner values should be [y,x] arrays denoting the y and x index of where in the sprite sheet to draw from.
    *                       Set this map up as if your looking at standard top down 2d, the class converts to iso for you.
    * @param tileSheetImg {Image} The Image to use as the tile set, the tile set to draw from.
    * @param playerValue {Array} The [y,x] value of the first frame of the first animation defined for the player
    * @param noPassValue {Array} Array of [y,x,y,x,y,x...] pairs denoting [y,x] values in map that are not passable.
    * @param floorValues {Array} Array of [y,x,y,x,y,x...] pairs denoting [y,x] values in map that are the floor tiles.
    * @param xOffset {Number} optional amount to horizontally offset whole scene
    * @param yOffset {Number} optional amount to vertically offset whole scene
    * @param spread {Number} A number normally between .009 and 1, default is .009, play with it until your scene looks how you want.
    * @param xSpreadShifter {Number} A number that shifts the x position of each tile as a scene, default is 0.00. Sometimes this number may need to be .10 or such, it is another value to play with, also if your tiles are not exact values (like 32x16 instead of 32x32) then you may need to mess with this value.
    * @param ySpreadShifter {Number} A number that shifts the y position of each tile as a scene, default is 0.00.  Sometimes this number may need to be .10 or such, it is another value to play with, also if your tiles are not exact values (like 32x16 instead of 32x32) then you may need to mess with this value.
    * @param camera {BasicCamera} A BasicCamera to use.
    *
    */
    constructor(tileWidth: number, tileHeight: number, floorCO: CanvasObject, canvasObject: CanvasObject, player: SimpleIsoCharacter, map: any[], tileSheetImg: new (width?: number, height?: number) => HTMLImageElement, playerValue: any[], noPassValue: any[], floorValues: any[], xOffset: number, yOffset: number, spread: number, xSpreadShifter: number, ySpreadShifter: number, camera: BasicCamera);
    _helperPoint: SimpleIsoPoint;
    _mp: MoverPoint;
    _rect: Rectangle;
    _rect2: Rectangle;
    _focusTile: SimpleIsoPoint;
    _focusPoint: SimpleIsoPoint;
    sceneXOffset: number;
    sceneYOffset: number;
    _twidth: number;
    _theight: number;
    _canvas: CanvasObject;
    _floor: CanvasObject;
    _player: SimpleIsoCharacter;
    _map: any[];
    _img: new (width?: number, height?: number) => HTMLImageElement;
    _yIndex: number;
    noPassValue: any[];
    floorValues: any[];
    _spread: number;
    playerTileValue: any[];
    _secondDraws: any[];
    _overDraws: any[];
    _xSpreadShifter: number;
    _ySpreadShifter: number;
    movingBoxes: any[];
    _cam: any;
    _effRect1: Rectangle;
    _effRect2: Rectangle;
    _blittOnce: number;
    /**
    *
    *
    *
    * @memberof SimpleIsoScene
    *
    */
    _upperTileOffset: number;
    /**
    *
    *
    *
    *
    * @memberof SimpleIsoScene
    *
    */
    _floorScreenCordsArray: any[];
    /**
    *
    *    Updates _focusTile and _focusPoint
    *
    *
    * @memberof SimpleIsoScene.prototype
    * @method updateTileCoordinates
    * @param x {Number} The x index of the focus tile
    * @param y {Number} The y index of the focus tile
    * @param tw {Number} The tile width
    * @param th {Number} The tile height
    * @param fp {MoverPoint} If passed then _focusPoint will be this point instead of from the focus tile.
    *
    */
    updateTileCoordinates(x: number, y: number, tw: number, th: number, fp: MoverPoint): void;
    /**
    * Draws a tile from a tilesheet into the scene using BlitMath notation;
    *  [y,x] value denote the y and x index in the tilesheet to draw from.
    *  tw and th are the tile width and height, the y x index from value is multiplied by tw or th to get the position to draw from.
    *  tx and ty are the 2d point to draw to, pass in the 2d grid based point, this method translates to iso for you,
    *  ._spread, ._xSpreadShifter and ._ySpreadShifter can be used to make specific graphical adjustemnts,
    *  play with values from 0.9 to +/-0.000009 to get it looking exactly right for your graphics. (whole numbers are too much)
    *
    *  renderXOffset and renderYOffset offset the whole scene on the subject
    *
    *
    *   This method is used inside of the specificPatternBlit method which is used inside of the render method.
    *
    *
    * @memberof SimpleIsoScene.prototype
    * @method draw
    * @param subject {CanvasObject}
    * @param source {Image}
    * @param value {Array} This method is expecting [y,x] values.
    * @param tw {Number}
    * @param th {Number}
    * @param tx {Number}
    * @param ty {Number}
    * @param renderXOffset {Number}
    * @param renderYOffset {Number}
    * @param renderSpread {Number}
    *
    */
    draw(subject: CanvasObject, source: new (width?: number, height?: number) => HTMLImageElement, value: any[], tw: number, th: number, tx: number, ty: number, renderXOffset: number, renderYOffset: number, renderSpread: number): void;
    /**
    *
    *    Used inside of the render method. Updates destination Rectangles.  _rect and _rect2
    *
    * @memberof SimpleIsoScene.prototype
    * @method rectUpdate
    * @param destX {Number}
    * @param destY {Number}
    * @param tw {Number}
    * @param th {Number}
    *
    */
    rectUpdate(destX: number, destY: number, tw: number, th: number): void;
    /**
    *
    *    Returns the tile value in the patt. This is the same as BlitMath.checkTileValueAt
    *
    *
    * @memberof SimpleIsoScene.prototype
    * @method checkTileValueAt
    * @param x {Number}
    * @param y {Number}
    * @param patt {Array}
    * @param tileWidth {Number}
    * @param tileHeight {Number}
    * @param indexHolderPoint {MoverPoint}
    * @returns {Object}
    */
    checkTileValueAt(x: number, y: number, patt: any[], tileWidth: number, tileHeight: number, indexHolderPoint: MoverPoint): any;
    /**
    *
    * Using a 2D Array of [y,x] based index values, draws an iso scene using a tilesheet.
    *
    *
    *   It's actually not simple... you can use this method along with the others, or you can just call render().
    *
    *    This is called specificPatternBlit because it expects the specific [y,x] style of inner values in the pattern.
    *
    * @memberof SimpleIsoScene.prototype
    * @method specificPatternBlit
    * @param subject {CanvasObject} CanvasObject to draw to.
    * @param source {Image} Source Image to draw from
    * @param pattern {Array} Must be a 2D Array of [y,x] values, denoting the y and x index (not exact location) of each tile.
    * @param tw {Number} Tile width
    * @param th {Number} Tile height
    * @param renderXOffset {Number} It's better to use the _xSpreadShifter _ySpreadShifter and  sceneXOffset sceneYOffset properties during construction, and then just call render.
    * @param renderYOffset {Number} When these values are not set, _xSpreadShifter _ySpreadShifter sceneXOffset sceneYOffset properties of this Class are what is being used in this method.
    * @param renderSpread {Number}
    *
    */
    specificPatternBlit(subject: CanvasObject, source: new (width?: number, height?: number) => HTMLImageElement, pattern: any[], tw: number, th: number, renderXOffset: number, renderYOffset: number, renderSpread: number): void;
    /**
    *
    * Encapsulates all calls to render the scene, just instantiate the class with desired settings, and call render during a loop.
    *
    *
    *
    * @memberof SimpleIsoScene.prototype
    * @method render
    * @param clearWidth {Number}
    * @param clearHeight {Number}
    *
    */
    render(clearWidth: number, clearHeight: number): void;
}
//# sourceMappingURL=SimpleIsoScene.d.ts.map