declare function CanvasObjectContainer(divID: string, width: number, height: number, rootCanvasObjectContainer?: CanvasObjectContainer, floorColorString?: string): void;
/**
*
*@class CanvasObjectContainer
*@classdesc
*   A class representing HTML div elements, or other CanvasObjectContainers.
*   Just like the CanvasObject class this class has an init method that acts like super.
*
*
* @param divID {String} the id attribute value of the HTML div element.
* @param width {Number} the width of the div.
* @param height {Number} the height of the div.
* @param [rootCanvasObjectContainer] {CanvasObjectContainer} optional CanvasObjectContainer that should contain this one.
* @param [floorColorString]  {String} the color for the floor CanvasObject of this CanvasObjectContainer, if no floor color is passed a floor CanvasObject is not created.
*
*/
declare function CanvasObjectContainer(divID: string, width: number, height: number, rootCanvasObjectContainer?: CanvasObjectContainer, floorColorString?: string): void;
declare class CanvasObjectContainer {
    constructor(divID: string, width: number, height: number, rootCanvasObjectContainer?: CanvasObjectContainer, floorColorString?: string);
    /**
    *
    *@class CanvasObjectContainer
    *@classdesc
    *   A class representing HTML div elements, or other CanvasObjectContainers.
    *   Just like the CanvasObject class this class has an init method that acts like super.
    *
    *
    * @param divID {String} the id attribute value of the HTML div element.
    * @param width {Number} the width of the div.
    * @param height {Number} the height of the div.
    * @param [rootCanvasObjectContainer] {CanvasObjectContainer} optional CanvasObjectContainer that should contain this one.
    * @param [floorColorString]  {String} the color for the floor CanvasObject of this CanvasObjectContainer, if no floor color is passed a floor CanvasObject is not created.
    *
    */
    constructor(divID: string, width: number, height: number, rootCanvasObjectContainer?: CanvasObjectContainer, floorColorString?: string);
    /**
    *   Acts like a super method for inheriting Classes.
    *
    *
    * @memberof CanvasObjectContainer.prototype
    * @method init
    * @param divID {String} the id attribute value of the HTML div element.
    * @param width {Number} the width of the div.
    * @param height {Number} the height of the div.
    * @param [rootCanvasObjectContainer] {CanvasObjectContainer} optional CanvasObjectContainer that should contain this one.
    * @param [floorColorString]  {String} the color for the floor CanvasObject of this CanvasObjectContainer, if no floor color is passed a floor CanvasObject is not created.
    *
    */
    init(divID: string, width: number, height: number, rootCanvasObjectContainer?: CanvasObjectContainer, floorColorString?: string): void;
    _w: number;
    _h: number;
    div: HTMLElement | HTMLDivElement;
    floor: CanvasObject;
    _floorContext: CanvasRenderingContext2D;
    _children: any[];
    /**
    *
    *    Returns the width of this CanvasObjectContainer
    *
    * @memberof CanvasObjectContainer.prototype
    * @method getWidth
    * @returns {Number}
    */
    getWidth(): number;
    /**
    *
    *    Returns the set height of this CanvasObjectContainer.
    *
    * @memberof CanvasObjectContainer.prototype
    * @method getHeight
    * @returns {Number}
    */
    getHeight(): number;
    /**
    *
    *    Returns the number of children that this CanvasObjectContainer has.
    *
    * @memberof CanvasObjectContainer.prototype
    * @method getNumChildren
    * @returns {Number}
    */
    getNumChildren(): number;
    /**
    *
    *    Adds a html div element or CanvasObject to this CanvasObjectContainer.
    *
    * @memberof CanvasObjectContainer.prototype
    * @method addChild
    * @param child {HTMLDivElement | CanvasObject}
    * @param x {Number}
    * @param y {Number}
    * @returns {HTMLDivElement | CanvasObject}
    */
    addChild(child: HTMLDivElement | CanvasObject, x: number, y: number): HTMLDivElement | CanvasObject;
    /**
    *
    *   Ads a HTML div element or CanvasObject to this CanvasObjectContainer at the index and x y location given.
    *
    * @memberof CanvasObjectContainer.prototype
    * @method addChildAt
    * @param child {HTMLDivElement | CanvasObject}
    * @param index {Number} the index the child should have in the CanvasObjectContainer lower indexes are beneath other children.
    * @param x {Number}
    * @param y {Number}
    * @returns {HTMLDivElement | CanvasObject}
    */
    addChildAt(child: HTMLDivElement | CanvasObject, index: number, x: number, y: number): HTMLDivElement | CanvasObject;
    /**
    *
    *    Returns the index of the child in this CanvasObjectContainer. Call contains to check if the child is a child of this CanvasObjectContainer.
    *
    * @memberof CanvasObjectContainer.prototype
    * @method getChildIndex
    * @param child {HTMLDivElement | CanvasObject}
    * @returns {Number}
    */
    getChildIndex(child: HTMLDivElement | CanvasObject): number;
    /**
    *
    *    Sets the index of the child to the index given.
    *
    * @memberof CanvasObjectContainer.prototype
    * @method setChildIndex
    * @param child {HTMLDivElement | CanvasObject}
    * @param index {Number}
    * @param x {Number}
    * @param y {Number}
    *
    */
    setChildIndex(child: HTMLDivElement | CanvasObject, index: number, x: number, y: number): void;
    /**
    *
    *    Removes a child from this CanvasObjectContainer.
    *
    * @memberof CanvasObjectContainer.prototype
    * @method removeChild
    * @param child {HTMLDivElement | CanvasObject}
    * @returns {HTMLDivElement | CanvasObject}
    */
    removeChild(child: HTMLDivElement | CanvasObject): HTMLDivElement | CanvasObject;
    /**
    *
    *    Gets the child that is at the given index.
    *
    * @memberof CanvasObjectContainer.prototype
    * @method getChildAt
    * @param index {Number}
    * @returns {HTMLDivElement | CanvasObject}
    */
    getChildAt(index: number): HTMLDivElement | CanvasObject;
    /**
    *
    *    Returns true if the CanvasObjectContainer contains the given child.
    *
    * @memberof CanvasObjectContainer.prototype
    * @method contains
    * @param child {HTMLDivElement | CanvasObject}
    * @returns {Boolean}
    */
    contains(child: HTMLDivElement | CanvasObject): boolean;
    private _setUpChild;
}
//# sourceMappingURL=CanvasObjectContainer.d.ts.map