declare function TileSceneChanger(spriteSheetSource: any, canvasObject: any, sceneWidth: any, sceneHeight: any, tw: any, th: any, mainChar: any): void;
/**
*
*    Constructs a new TileSceneChanger
*
* @class TileSceneChanger
* @classdesc
*
*   A TileSceneChanger has methods for storing and referencing scene arrays and enemy arrays and other arrays.
*   Its changeScene method also blits from your spriteSheet using the scene map changed to.
*   The GameSkeleton Class uses this Class, doing much of the setup for you, or you can use this Class yourself to switch between various arrays.
*
*
* @param spriteSheetSource
* @param canvasObject
* @param sceneWidth
* @param sceneHeight
* @param tw
* @param th
* @param mainChar
*
*/
declare function TileSceneChanger(spriteSheetSource: any, canvasObject: any, sceneWidth: any, sceneHeight: any, tw: any, th: any, mainChar: any): void;
declare class TileSceneChanger {
    constructor(spriteSheetSource: any, canvasObject: any, sceneWidth: any, sceneHeight: any, tw: any, th: any, mainChar: any);
    /**
    *
    *    Constructs a new TileSceneChanger
    *
    * @class TileSceneChanger
    * @classdesc
    *
    *   A TileSceneChanger has methods for storing and referencing scene arrays and enemy arrays and other arrays.
    *   Its changeScene method also blits from your spriteSheet using the scene map changed to.
    *   The GameSkeleton Class uses this Class, doing much of the setup for you, or you can use this Class yourself to switch between various arrays.
    *
    *
    * @param spriteSheetSource
    * @param canvasObject
    * @param sceneWidth
    * @param sceneHeight
    * @param tw
    * @param th
    * @param mainChar
    *
    */
    constructor(spriteSheetSource: any, canvasObject: any, sceneWidth: any, sceneHeight: any, tw: any, th: any, mainChar: any);
    mainChar: any;
    _source: any;
    sW: any;
    sH: any;
    tW: any;
    tH: any;
    _display: any;
    _cameraPoint: MoverPoint;
    _totalScenes: number[];
    /**
    *
    *
    *
    * @memberof TileSceneChanger
    *
    */
    _mapNumber: number;
    /**
    *
    *
    *
    * @memberof TileSceneChanger
    *
    */
    currentScene: number;
    /**
    *
    *
    *
    * @memberof TileSceneChanger
    *
    */
    _direcs: {
        left: number;
        right: number;
        down: number;
        up: number;
    };
    /**
    *
    *    Used by addEnemyArray and getEnemyArray.
    *
    * @memberof TileSceneChanger
    *
    */
    _enemyArrays: number[];
    /**
    *   Adds a enemy Array
    *
    *
    * @memberof TileSceneChanger.prototype
    * @method addEnemyArray
    * @param arr {Array}
    * @param scene {Number}
    *
    */
    addEnemyArray(arr: any[], scene: number): void;
    /**
    *   References a enemy Array.
    *
    *
    * @memberof TileSceneChanger.prototype
    * @method getEnemyArray
    * @param scene {Number}
    * @returns {Array}
    */
    getEnemyArray(scene: number): any[];
    /**
    *   Used by addStoredArray and getStoredArray.
    *
    *
    * @memberof TileSceneChanger
    *
    */
    _otherArrays: number[];
    /**
    *
    *    Adds a stored array. Retreve stored Arrays with getStoredArray
    *
    * @memberof TileSceneChanger.prototype
    * @method addStoredArray
    * @param arr {Array} An Array to store.
    * @param scene {Number} Index to store to, default is currentScene.
    *
    */
    addStoredArray(arr: any[], scene: number): void;
    /**
    *
    *    Returns a refence to a stored array stored with addStoredArray.
    *
    * @memberof TileSceneChanger.prototype
    * @method getStoredArray
    * @param scene {Number}
    * @returns {Array}
    */
    getStoredArray(scene: number): any[];
    /**
    * These methods use BlitMath.cloneMultiArray to clone the array you pass to them.
    * The array passed remains a separate array,
    * the method does not create a reference to the array passed in.
    *  Thereby ._map1 and ._map2 are unique until defineMap1/2 is called again
    * ._map1 and ._map2 should never be set directly.
    *
    *
    * @memberof TileSceneChanger.prototype
    * @method defineMap1
    * @param map2DArray {Array}
    *
    */
    defineMap1(map2DArray: any[]): void;
    _map1: any[];
    /**
    *
    *    Defines _map2 see defineMap1.
    *
    * @memberof TileSceneChanger.prototype
    * @method defineMap2
    * @see defineMap1
    * @param map2DArray {Array}
    *
    */
    defineMap2(map2DArray: any[]): void;
    _map2: any[];
    /**
    * These methods populate the ._totalScenes array with clones of the arrays you pass in.
    * the ._totalScenes array should not be handled directly.
    * Use referenceScene() if you need to reference scenes you add,
    *  the reference index will be in the order you place them starting from 1.
    *
    * @memberof TileSceneChanger.prototype
    * @method addScene
    * @param map2DArray
    * @returns {}
    */
    addScene(map2DArray: any): any;
    /**
    *
    *    Adds up to 5 scenes to _totalScenes
    *
    * @memberof TileSceneChanger.prototype
    * @method add5Scenes
    * @param map2DArray
    * @param map2DArray2
    * @param map2DArray3
    * @param map2DArray4
    * @param map2DArray5
    * @returns {}
    */
    add5Scenes(map2DArray: any, map2DArray2: any, map2DArray3: any, map2DArray4: any, map2DArray5: any): any;
    /**
    *
    *    Returns a reference to the scenes map.
    *
    * @memberof TileSceneChanger.prototype
    * @method referenceScene
    * @param referenceIndex
    * @returns {}
    */
    referenceScene(referenceIndex: any): any;
    /**
    *
    *    clears _totalScenes, _otherArrays and _enemyArrays
    *
    * @memberof TileSceneChanger.prototype
    * @method clearAllArrays
    * @returns {}
    */
    clearAllArrays(): any;
    /**
    *
    *    Changes the currentMap. If _map1 or _map2 is defined they will be used, otherwise the map is _totalScenes[mapInteger]
    *
    * @memberof TileSceneChanger.prototype
    * @method changeCurrentMap
    * @param mapInteger {Number} The map to change to.
    * @returns {}
    */
    changeCurrentMap(mapInteger: number): any;
    currentMap: number | any[];
    /**
    *
    *    Changes the current enemy Array being referrenced.
    *
    * @memberof TileSceneChanger.prototype
    * @method changeSceneEnemies
    * @param scene
    * @returns {}
    */
    changeSceneEnemies(scene: any): any;
    /**
    *
    *    Changes the current scenery Array being referenced.
    *
    * @memberof TileSceneChanger.prototype
    * @method changeSceneryObjects
    * @param scene
    * @returns {}
    */
    changeSceneryObjects(scene: any): any;
    /**
    *
    *    allow objects to be thrown into the next/previous scene
    *
    * @memberof TileSceneChanger.prototype
    * @method sceneryObjectSceneChange
    * @param sceneryObject {SceneryObject}
    * @param sceneryArray {Array}
    * @param limitLeft {Number}
    * @param limitRight {Number}
    * @param limitUp {Number}
    * @param limitDown {Number}
    * @returns {Number} Returns 1 if the object changed scene.
    */
    sceneryObjectSceneChange(sceneryObject: SceneryObject, sceneryArray: any[], limitLeft: number, limitRight: number, limitUp: number, limitDown: number): number;
    /**
    *
    * This method changes which map is being used and then blits it onto the canvasObject passed during construction of the Class.
    * It also sets the mainChars ._map and any associated MapMovers/Travelers or SceneryObjects ._map property.
    * And it will reset the camera as needed.
    *
    * @memberof TileSceneChanger.prototype
    * @method changeScene
    * @param mapInteger the map to change to. 0 to change by added scenes and direction, 1 to change to the ._map1 of this class, 2 to change to ._map2 of this class.
    * @param direction the direction the player is going; "left" "right" "down" "up" or 0 1 2 3
    *
    * @param camera {BasicCamera} a reference to the BasicCamera that is being used
    * @param faMethod {String} a String of the method name to call during BlitMath.dispatchFunctionAssignments.
    * @param faMethodObject {Object} the Object that contains the faMethod, normally the .game static Object for example from stage nine of the platformer tutorial.
    * @param directScene {Number}
    * @param dontResetCameraX {Boolean}
    * @param dontResetCameraY {Boolean}
    * @param dontUpdateEnemyMaps {Boolean}
    * @param frameTime {Number}
    * @param ts {Number}
    * @param tweenType {String}
    * @returns {}
    */
    changeScene(mapInteger: any, direction: any, camera: BasicCamera, faMethod: string, faMethodObject: any, directScene: number, dontResetCameraX: boolean, dontResetCameraY: boolean, dontUpdateEnemyMaps: boolean): any;
}
//# sourceMappingURL=TileSceneChanger.d.ts.map