(function() {
    
    function WebglRenderer(canvas, context) {
        if(canvas && !context) {
            this.context = canvas.getContext("webgl", {alpha:false, antialias:false, depth:false,stencil:false, preserveDrawingBuffer:true });
        } else {
            this.context = context;
            
        }
        
    }
    
    WebglRenderer.prototype.context = null;
    WebglRenderer.prototype.getContext = function() {
      return this.context;  
    };
    WebglRenderer.prototype._program = null;
    WebglRenderer.prototype._positionLocation = null;
    WebglRenderer.prototype._texcoordLocation = null;
    WebglRenderer.prototype._matrixLocation = null;
    WebglRenderer.prototype._textureMatrixLocation = null;
    WebglRenderer.prototype._textureLocation = null;
    WebglRenderer.prototype._positionBuffer = null;
    WebglRenderer.prototype._positions = [
        0, 0,
        0, 1,
        1, 0,
        1, 0,
        0, 1,
        1, 1,
    ];
    WebglRenderer.prototype._texcoordBuffer = null;
    WebglRenderer.prototype._texcoords = [
        0, 0,
        0, 1,
        1, 0,
        1, 0,
        0, 1,
        1, 1,
    ];
    WebglRenderer.prototype._texture = null;
    WebglRenderer.prototype._imgWidth = 1;
    WebglRenderer.prototype._imgHeight = 1;
    WebglRenderer.prototype._assembleProgram = function() {
        
        
        
        var s1 = this.context.createShader(this.context.VERTEX_SHADER );
        
        this.context.shaderSource(s1, this.__vs());
        this.context.compileShader(s1);
        window.console.log(this.context.getShaderParameter(s1, this.context.COMPILE_STATUS) ? "vShader compiled" : "shader compile error");
        var s2 = this.context.createShader(this.context.FRAGMENT_SHADER );
        
        this.context.shaderSource(s2, this.__fs());
        this.context.compileShader(s2);
        window.console.log(this.context.getShaderParameter(s2, this.context.COMPILE_STATUS) ? "fShader compiled" : "f shader compile error");
        
        this._program = this.context.createProgram();
        this.context.attachShader(this._program, s1);
        this.context.attachShader(this._program, s2);
        
        this.context.linkProgram(this._program);
        
        window.console.log(  this.context.getProgramParameter(this._program, this.context.LINK_STATUS)  ? "program linked" : "program link error");
        
    };
    WebglRenderer.prototype.readyWebglProgram = function() {
      
      if(!this._program) {
            this._assembleProgram();
            this._positionLocation = this.context.getAttribLocation(this._program, "a_position");
            this._texcoordLocation = this.context.getAttribLocation(this._program, "a_texcoord");
            this._matrixLocation = this.context.getUniformLocation(this._program, "u_matrix");
            this._textureMatrixLocation = this.context.getUniformLocation(this._program, "u_textureMatrix");
            this._textureLocation = this.context.getUniformLocation(this._program, "u_texture");
            this._positionBuffer = this.context.createBuffer();
            this.context.bindBuffer(this.context.ARRAY_BUFFER, this._positionBuffer);
            this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(this._positions), this.context.STATIC_DRAW);
            this._texcoordBuffer = this.context.createBuffer();
            this.context.bindBuffer(this.context.ARRAY_BUFFER, this._texcoordBuffer);
            this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(this._texcoords), this.context.STATIC_DRAW);
      }
    };
    WebglRenderer.prototype._bindImageForWebglCopyPixels = function(img, webglContext) {
        if(!webglContext) { webglContext = this.context; }
        this._texture = webglContext.createTexture();
        webglContext.bindTexture(webglContext.TEXTURE_2D, this._texture);
    
        webglContext.texImage2D(webglContext.TEXTURE_2D, 0, webglContext.RGBA, 1, 1, 0, webglContext.RGBA, webglContext.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));

        webglContext.texParameteri(webglContext.TEXTURE_2D, webglContext.TEXTURE_WRAP_S, webglContext.CLAMP_TO_EDGE);
        webglContext.texParameteri(webglContext.TEXTURE_2D, webglContext.TEXTURE_WRAP_T, webglContext.CLAMP_TO_EDGE);
        webglContext.texParameteri(webglContext.TEXTURE_2D, webglContext.TEXTURE_MIN_FILTER, webglContext.LINEAR);
        
        webglContext.bindTexture(webglContext.TEXTURE_2D, this._texture);
        webglContext.texImage2D(webglContext.TEXTURE_2D, 0, webglContext.RGBA, webglContext.RGBA, webglContext.UNSIGNED_BYTE, img);
        
        this._imgWidth = img.width;
        this._imgHeight = img.height;
        
    };
    
    WebglRenderer.__scripts = 0;
    
    WebglRenderer.prototype.__injectScripts = function() {
        
        if(!WebglRenderer.__scripts) {
        
          var vs = document.createElement("script");
            vs.setAttribute("type", "x-shader/x-vertex");
            vs.setAttribute("id", "vsh");
            vs.text = "attribute vec4 a_position;  attribute vec2 a_texcoord;  uniform mat4 u_matrix;  uniform mat4 u_textureMatrix;  varying vec2 v_texcoord; void main() { gl_Position = u_matrix * a_position; v_texcoord = (u_textureMatrix * vec4(a_texcoord, 0, 1)).xy; }";
            document.getElementsByTagName("body")[0].appendChild(vs);

          var fs = document.createElement("script");
            fs.setAttribute("type", "x-shader/x-fragment");
            fs.setAttribute("id", "fsh");
            fs.text = "precision mediump float;  varying vec2 v_texcoord;  uniform sampler2D u_texture;  void main() {   gl_FragColor = texture2D(u_texture, v_texcoord); }";
            document.getElementsByTagName("body")[0].appendChild(fs);

            WebglRenderer.__scripts = 1;
        }
        
    };
    WebglRenderer.prototype.__vs = function() {
        return `precision mediump float;
        attribute vec4 a_position;

        attribute vec2 a_texcoord;

        uniform mat4 u_matrix;

        uniform mat4 u_textureMatrix;

        varying vec2 v_texcoord;

        void main() {
           gl_Position = u_matrix * a_position;
           v_texcoord = (u_textureMatrix * vec4(a_texcoord, 0, 1)).xy;
        }`;
        
    };
    WebglRenderer.prototype.__fs = function() {
        return `precision mediump float;

        varying vec2 v_texcoord;

        uniform sampler2D u_texture;

        void main() {
           gl_FragColor = texture2D(u_texture, v_texcoord);
        }`;
        
    };
    WebglRenderer.prototype._orA = new Float32Array(16);
    
    WebglRenderer.prototype._orthographic = function(left, right, bottom, top, near, far, dst) {
            dst = dst || this._orA;

            dst[ 0] = 2 / (right - left);
            dst[ 1] = 0;
            dst[ 2] = 0;
            dst[ 3] = 0;
            dst[ 4] = 0;
            dst[ 5] = 2 / (top - bottom);
            dst[ 6] = 0;
            dst[ 7] = 0;
            dst[ 8] = 0;
            dst[ 9] = 0;
            dst[10] = 2 / (near - far);
            dst[11] = 0;
            dst[12] = (left + right) / (left - right);
            dst[13] = (bottom + top) / (bottom - top);
            dst[14] = (near + far) / (near - far);
            dst[15] = 1;

            return dst;
    };
    WebglRenderer.prototype._trA = new Float32Array(16);
    WebglRenderer.prototype._translate = function(m, tx, ty, tz, dst) {
        
        dst = dst || this._trA;

        var m00 = m[0];
        var m01 = m[1];
        var m02 = m[2];
        var m03 = m[3];
        var m10 = m[1 * 4 + 0];
        var m11 = m[1 * 4 + 1];
        var m12 = m[1 * 4 + 2];
        var m13 = m[1 * 4 + 3];
        var m20 = m[2 * 4 + 0];
        var m21 = m[2 * 4 + 1];
        var m22 = m[2 * 4 + 2];
        var m23 = m[2 * 4 + 3];
        var m30 = m[3 * 4 + 0];
        var m31 = m[3 * 4 + 1];
        var m32 = m[3 * 4 + 2];
        var m33 = m[3 * 4 + 3];

        if (m !== dst) {
          dst[ 0] = m00;
          dst[ 1] = m01;
          dst[ 2] = m02;
          dst[ 3] = m03;
          dst[ 4] = m10;
          dst[ 5] = m11;
          dst[ 6] = m12;
          dst[ 7] = m13;
          dst[ 8] = m20;
          dst[ 9] = m21;
          dst[10] = m22;
          dst[11] = m23;
        }

        dst[12] = m00 * tx + m10 * ty + m20 * tz + m30;
        dst[13] = m01 * tx + m11 * ty + m21 * tz + m31;
        dst[14] = m02 * tx + m12 * ty + m22 * tz + m32;
        dst[15] = m03 * tx + m13 * ty + m23 * tz + m33;

        return dst;
    };
    WebglRenderer.prototype._tranA = new Float32Array(16);
    WebglRenderer.prototype._translation = function(tx, ty, tz, dst) {
        dst = dst || this._tranA;

        dst[ 0] = 1;
        dst[ 1] = 0;
        dst[ 2] = 0;
        dst[ 3] = 0;
        dst[ 4] = 0;
        dst[ 5] = 1;
        dst[ 6] = 0;
        dst[ 7] = 0;
        dst[ 8] = 0;
        dst[ 9] = 0;
        dst[10] = 1;
        dst[11] = 0;
        dst[12] = tx;
        dst[13] = ty;
        dst[14] = tz;
        dst[15] = 1;

        return dst;
    };
    WebglRenderer.prototype._scA = new Float32Array(16);
    WebglRenderer.prototype._scale = function(m, sx, sy, sz, dst) {
        
        dst = dst || this._scA;

        dst[ 0] = sx * m[0 * 4 + 0];
        dst[ 1] = sx * m[0 * 4 + 1];
        dst[ 2] = sx * m[0 * 4 + 2];
        dst[ 3] = sx * m[0 * 4 + 3];
        dst[ 4] = sy * m[1 * 4 + 0];
        dst[ 5] = sy * m[1 * 4 + 1];
        dst[ 6] = sy * m[1 * 4 + 2];
        dst[ 7] = sy * m[1 * 4 + 3];
        dst[ 8] = sz * m[2 * 4 + 0];
        dst[ 9] = sz * m[2 * 4 + 1];
        dst[10] = sz * m[2 * 4 + 2];
        dst[11] = sz * m[2 * 4 + 3];

        if (m !== dst) {
          dst[12] = m[12];
          dst[13] = m[13];
          dst[14] = m[14];
          dst[15] = m[15];
        }

        return dst;
    };
    WebglRenderer.prototype._matrix = null;
    WebglRenderer.prototype.copyPixels = function(source, fromRect, toMoverPoint, copyWidth, copyHeight) {
        
        if(!this._program) {
            this.readyWebglProgram();
            this._bindImageForWebglCopyPixels(source);
            this.context.bindTexture(this.context.TEXTURE_2D, this._texture);
            this.context.useProgram(this._program);
            this.context.bindBuffer(this.context.ARRAY_BUFFER, this._positionBuffer);
            this.context.enableVertexAttribArray(this._positionLocation);
            this.context.vertexAttribPointer(this._positionLocation, 2, this.context.FLOAT, false, 0, 0);
            this.context.bindBuffer(this.context.ARRAY_BUFFER, this._texcoordBuffer);
            this.context.enableVertexAttribArray(this._texcoordLocation);
            this.context.vertexAttribPointer(this._texcoordLocation, 2, this.context.FLOAT, false, 0, 0);
            this._matrix = this._orthographic(0, this.context.canvas.width, this.context.canvas.height, 0, -1, 1);
            window.console.log("cp setup");
        }
 
       

        this._matrix = this._translate(this._matrix, toMoverPoint.x, toMoverPoint.y, 0);

        this._matrix = this._scale(this._matrix, copyWidth || fromRect.width, copyHeight || fromRect.height, 1);

        this.context.uniformMatrix4fv(this._matrixLocation, false, this._matrix);

       
        var tm = this._translation(fromRect.x / this._imgWidth, fromRect.y / this._imgHeight, 0);
        tm = this._scale(tm, fromRect.width / this._imgWidth, fromRect.height / this._imgHeight, 1);

        this.context.uniformMatrix4fv(this._textureMatrixLocation, false, tm);

        this.context.uniform1i(this._textureLocation, 0);

        this.context.drawArrays(this.context.TRIANGLES, 0, 6);
        
        
    };
    
    WebglRenderer.prototype.clearRect = function(x,y,width,height) {
        var c = this.context || this;
        c.enable(c.SCISSOR_TEST);
        c.scissor(x,(c.canvas.height - y) - height,width,height);
        c.clearColor(0,0,0,0);
        c.clear(c.COLOR_BUFFER_BIT);
        c.disable(c.SCISSOR_TEST);
        
    };
    
    
    tabageos.WebglRenderer = WebglRenderer;
    
})();