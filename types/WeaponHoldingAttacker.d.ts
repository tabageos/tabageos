/**
*
*
*
* @class WeaponHoldingAttacker
* @classdesc
*
*   A BasicPlatformer the can hack and slash with a set of weapon animations.
*   Set up to let a user be able to repeatedly mash the button to cause repeated fast attacks, or hold the button for slower steady attacks.
*   Also ready for duck and dash animation and functionality.
*
* @param x {Number}
* @param y {Number}
* @param width {Number}
* @param height {Number}
* @param map {Object}
* @param ca {Object}
* @param dontCloneMap {Object}
* @param dt {Object}
* @param tWidth {Object}
* @param tHeight {Object}
* @param mr {Object}
* @param mc {Object}
* @param mapOfOriginalTiles {Object}
* @param controller {Object}
* @param ladderTileValue {Object}
* @param attackButtonOneKeyCode {Object}
* @param attackButtonTwoKeyCode {Object}
*
*/
declare function WeaponHoldingAttacker(x: number, y: number, width: number, height: number, map: any, ca: any, dontCloneMap: any, dt: any, tWidth: any, tHeight: any, mr: any, mc: any, mapOfOriginalTiles: any, controller: any, ladderTileValue: any, attackButtonOneKeyCode: any, attackButtonTwoKeyCode: any): void;
/**
*
*
*
* @class WeaponHoldingAttacker
* @classdesc
*
*   A BasicPlatformer the can hack and slash with a set of weapon animations.
*   Set up to let a user be able to repeatedly mash the button to cause repeated fast attacks, or hold the button for slower steady attacks.
*   Also ready for duck and dash animation and functionality.
*
* @param x {Number}
* @param y {Number}
* @param width {Number}
* @param height {Number}
* @param map {Object}
* @param ca {Object}
* @param dontCloneMap {Object}
* @param dt {Object}
* @param tWidth {Object}
* @param tHeight {Object}
* @param mr {Object}
* @param mc {Object}
* @param mapOfOriginalTiles {Object}
* @param controller {Object}
* @param ladderTileValue {Object}
* @param attackButtonOneKeyCode {Object}
* @param attackButtonTwoKeyCode {Object}
*
*/
declare function WeaponHoldingAttacker(x: number, y: number, width: number, height: number, map: any, ca: any, dontCloneMap: any, dt: any, tWidth: any, tHeight: any, mr: any, mc: any, mapOfOriginalTiles: any, controller: any, ladderTileValue: any, attackButtonOneKeyCode: any, attackButtonTwoKeyCode: any): void;
declare class WeaponHoldingAttacker {
    constructor(x: number, y: number, width: number, height: number, map: any, ca: any, dontCloneMap: any, dt: any, tWidth: any, tHeight: any, mr: any, mc: any, mapOfOriginalTiles: any, controller: any, ladderTileValue: any, attackButtonOneKeyCode: any, attackButtonTwoKeyCode: any);
    /**
    *
    *
    *
    * @class WeaponHoldingAttacker
    * @classdesc
    *
    *   A BasicPlatformer the can hack and slash with a set of weapon animations.
    *   Set up to let a user be able to repeatedly mash the button to cause repeated fast attacks, or hold the button for slower steady attacks.
    *   Also ready for duck and dash animation and functionality.
    *
    * @param x {Number}
    * @param y {Number}
    * @param width {Number}
    * @param height {Number}
    * @param map {Object}
    * @param ca {Object}
    * @param dontCloneMap {Object}
    * @param dt {Object}
    * @param tWidth {Object}
    * @param tHeight {Object}
    * @param mr {Object}
    * @param mc {Object}
    * @param mapOfOriginalTiles {Object}
    * @param controller {Object}
    * @param ladderTileValue {Object}
    * @param attackButtonOneKeyCode {Object}
    * @param attackButtonTwoKeyCode {Object}
    *
    */
    constructor(x: number, y: number, width: number, height: number, map: any, ca: any, dontCloneMap: any, dt: any, tWidth: any, tHeight: any, mr: any, mc: any, mapOfOriginalTiles: any, controller: any, ladderTileValue: any, attackButtonOneKeyCode: any, attackButtonTwoKeyCode: any);
    width: number;
    height: number;
    _middlePoint: MoverPoint;
    _pos: MoverPoint;
    _veloc: MoverPoint;
    _lastVeloc: MoverPoint;
    _lastPos: MoverPoint;
    _deltaTime: any;
    _map: any;
    _state: number;
    x: number;
    y: number;
    _rect: Rectangle;
    _canvasAnimation: any;
    _tH: any;
    _tW: any;
    _outAltered: MoverPoint;
    holdingRect: Rectangle;
    holdingOffsetX: number;
    holdingOffsetY: number;
    _jumps: number;
    easeProximity: number;
    _checkHelper: MoverPoint;
    forceApplier: MoverPoint;
    forceHolder: MoverPoint;
    _w: number;
    _h: number;
    wanderOffset: MoverPoint;
    blankMO: MoverPoint;
    _eventDispatcher: EventDispatcher;
    holdings: any[];
    _holdingHelperRect: Rectangle;
    personalSpace: number;
    _hpt: MoverPoint;
    _jumpSpeed: number;
    throwStrength: number;
    _controllerRef: any;
    tileMap: any;
    ladderValue: any;
    _attackB: any;
    _attackC: any;
    _comboC: number;
    /**
    *
    *
    *
    * @memberof WeaponHoldingAttacker
    *
    */
    crouchHeightOffset: number;
    /**
    *
    *
    *
    * @memberof WeaponHoldingAttacker
    *
    */
    crouchWidthOffset: number;
    /**
    *
    *
    *
    * @memberof WeaponHoldingAttacker
    *
    */
    attackWidthOffset: number;
    /**
    *
    *
    *
    * @memberof WeaponHoldingAttacker
    *
    */
    attackHeightOffset: number;
    /**
    *
    *
    *
    * @memberof WeaponHoldingAttacker
    *
    */
    attackTwoWidthOffset: number;
    /**
    *
    *
    *
    * @memberof WeaponHoldingAttacker
    *
    */
    attackTwoHeightOffset: number;
    /**
    *
    *
    *
    * @memberof WeaponHoldingAttacker
    *
    */
    _alternate: number;
    /**
    *
    *
    *
    * @memberof WeaponHoldingAttacker
    *
    */
    _fwoHold: number;
    /**
    *
    *
    *
    * @memberof WeaponHoldingAttacker
    *
    */
    _fhoHold: number;
    /**
    *
    *
    *
    * @memberof WeaponHoldingAttacker
    *
    */
    hurt: number;
    /**
    *
    *
    *
    * @memberof WeaponHoldingAttacker
    *
    */
    attackTwoName: string;
    /**
    *
    *
    *
    * @memberof WeaponHoldingAttacker
    *
    */
    atApexOfAttack: number;
    /**
    *
    *
    *
    * @memberof WeaponHoldingAttacker
    *
    */
    _dashTime: number;
    /**
    *
    *
    *
    * @memberof WeaponHoldingAttacker
    *
    */
    dashSpeed: number;
    /**
    *
    *
    *
    * @memberof WeaponHoldingAttacker
    *
    */
    _originalWalkSpeed: number;
    /**
    *
    *
    *
    * @memberof WeaponHoldingAttacker
    *
    */
    totalDashTime: number;
    /**
    *
    * Call this method if your WeaponHoldingAttacker is going to be top down.
    * _addedToChangeDirectionAniRpger will be used instead of _addedToChangeDirectionAni
    * @method setupForTopDown
    * @memberof WeaponHoldingAttacker.prototype
    *
    */
    setupForTopDown(): void;
    /**
    *
    *
    *
    * @method _addedToChangeDirectionAniRpger
    * @memberof WeaponHoldingAttacker.prototype
    *
    */
    _addedToChangeDirectionAniRpger(left: any, right: any, up: any, down: any, keepAniIndex: any, noIdle: any): void;
    fromHeightOffset: number;
    fromWidthOffset: number;
    currentAnimation: any;
    ani: number;
    /**
    *
    *    Augment tp changeDirectionAnimation. The CanvasAnimation for this class will be calling this method in addition to the normal CanvasAnimation.changeDirectionAnimation.
    *
    * @memberof WeaponHoldingAttacker.prototype
    * @method _addedToChangeDirectionAni
    * @param left
    * @param right
    * @param up
    * @param down
    * @param keepAniIndex
    * @param noIdle
    *
    */
    _addedToChangeDirectionAni(left: any, right: any, up: any, down: any, keepAniIndex: any, noIdle: any): void;
}
//# sourceMappingURL=WeaponHoldingAttacker.d.ts.map