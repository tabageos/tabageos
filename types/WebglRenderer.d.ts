/**
*
*    @classdesc
*       A setup for a Webgl copyPixels call. This Class is not utilized by the library but exists to show the basics of what would be needed.
*
*
* @class WebglRenderer
* @param canvas
* @param context
*
*/
declare function WebglRenderer(canvas: any, context: any): void;
/**
*
*    @classdesc
*       A setup for a Webgl copyPixels call. This Class is not utilized by the library but exists to show the basics of what would be needed.
*
*
* @class WebglRenderer
* @param canvas
* @param context
*
*/
declare function WebglRenderer(canvas: any, context: any): void;
declare class WebglRenderer {
    constructor(canvas: any, context: any);
    /**
    *
    *    @classdesc
    *       A setup for a Webgl copyPixels call. This Class is not utilized by the library but exists to show the basics of what would be needed.
    *
    *
    * @class WebglRenderer
    * @param canvas
    * @param context
    *
    */
    constructor(canvas: any, context: any);
    context: any;
    /**
    *
    *
    *
    * @memberof WebglRenderer.prototype
    * @method getContext
    * @returns {}
    */
    getContext(): any;
    /**
    *
    *
    *
    * @memberof WebglRenderer
    *
    */
    _program: any;
    /**
    *
    *
    *
    * @memberof WebglRenderer
    *
    */
    _positionLocation: any;
    /**
    *
    *
    *
    * @memberof WebglRenderer
    *
    */
    _texcoordLocation: any;
    /**
    *
    *
    *
    * @memberof WebglRenderer
    *
    */
    _matrixLocation: any;
    /**
    *
    *
    *
    * @memberof WebglRenderer
    *
    */
    _textureMatrixLocation: any;
    /**
    *
    *
    *
    * @memberof WebglRenderer
    *
    */
    _textureLocation: any;
    /**
    *
    *
    *
    * @memberof WebglRenderer
    *
    */
    _positionBuffer: any;
    /**
    *
    *
    *
    * @memberof WebglRenderer
    *
    */
    _positions: number[];
    /**
    *
    *
    *
    * @memberof WebglRenderer
    *
    */
    _texcoordBuffer: any;
    /**
    *
    *
    *
    * @memberof WebglRenderer
    *
    */
    _texcoords: number[];
    /**
    *
    *
    *
    * @memberof WebglRenderer
    *
    */
    _texture: any;
    /**
    *
    *
    *
    * @memberof WebglRenderer
    *
    */
    _imgWidth: any;
    /**
    *
    *
    *
    * @memberof WebglRenderer
    *
    */
    _imgHeight: any;
    /**
    *
    *
    *
    * @memberof WebglRenderer.prototype
    * @method _assembleProgram
    * @returns {}
    */
    _assembleProgram(): any;
    /**
    *
    *
    *
    * @memberof WebglRenderer.prototype
    * @method readyWebglProgram
    * @returns {}
    */
    readyWebglProgram(): any;
    /**
    *
    *
    *
    * @memberof WebglRenderer.prototype
    * @method _bindImageForWebglCopyPixels
    * @param img
    * @param webglContext
    * @returns {}
    */
    _bindImageForWebglCopyPixels(img: any, webglContext: any): any;
    /**
    *
    *
    *
    * @memberof WebglRenderer.prototype
    * @method __injectScripts
    * @returns {}
    */
    __injectScripts(): any;
    /**
    *
    *
    *
    * @memberof WebglRenderer.prototype
    * @method __vs
    * @returns {}
    */
    __vs(): any;
    /**
    *
    *
    *
    * @memberof WebglRenderer.prototype
    * @method __fs
    * @returns {}
    */
    __fs(): any;
    /**
    *
    *
    *
    * @memberof WebglRenderer
    *
    */
    _orA: Float32Array;
    /**
    *
    *
    *
    * @memberof WebglRenderer.prototype
    * @method _orthographic
    * @param left
    * @param right
    * @param bottom
    * @param top
    * @param near
    * @param far
    * @param dst
    * @returns {}
    */
    _orthographic(left: any, right: any, bottom: any, top: any, near: any, far: any, dst: any): any;
    /**
    *
    *
    *
    * @memberof WebglRenderer
    *
    */
    _trA: Float32Array;
    /**
    *
    *
    *
    * @memberof WebglRenderer.prototype
    * @method _translate
    * @param m
    * @param tx
    * @param ty
    * @param tz
    * @param dst
    * @returns {}
    */
    _translate(m: any, tx: any, ty: any, tz: any, dst: any): any;
    /**
    *
    *
    *
    * @memberof WebglRenderer
    *
    */
    _tranA: Float32Array;
    /**
    *
    *
    *
    * @memberof WebglRenderer.prototype
    * @method _translation
    * @param tx
    * @param ty
    * @param tz
    * @param dst
    * @returns {}
    */
    _translation(tx: any, ty: any, tz: any, dst: any): any;
    /**
    *
    *
    *
    * @memberof WebglRenderer
    *
    */
    _scA: Float32Array;
    /**
    *
    *
    *
    * @memberof WebglRenderer.prototype
    * @method _scale
    * @param m
    * @param sx
    * @param sy
    * @param sz
    * @param dst
    * @returns {}
    */
    _scale(m: any, sx: any, sy: any, sz: any, dst: any): any;
    /**
    *
    *
    *
    * @memberof WebglRenderer
    *
    */
    _matrix: any;
    /**
    *
    *
    *
    * @memberof WebglRenderer.prototype
    * @method copyPixels
    * @param source
    * @param fromRect
    * @param toMoverPoint
    * @param copyWidth
    * @param copyHeight
    * @returns {}
    */
    copyPixels(source: any, fromRect: any, toMoverPoint: any, copyWidth: any, copyHeight: any): any;
    /**
    *
    *
    *
    * @memberof WebglRenderer.prototype
    * @method clearRect
    * @param x
    * @param y
    * @param width
    * @param height
    * @returns {}
    */
    clearRect(x: any, y: any, width: any, height: any): any;
}
declare namespace WebglRenderer {
    let __scripts: number;
}
//# sourceMappingURL=WebglRenderer.d.ts.map