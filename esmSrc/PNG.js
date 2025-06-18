
//---- PNG


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

window.PNG = function () {
  var APNG_DISPOSE_OP_NONE = 0;
  var APNG_DISPOSE_OP_BACKGROUND = 1;
  var APNG_DISPOSE_OP_PREVIOUS = 2;
  var APNG_BLEND_OP_SOURCE = 0;
  var APNG_BLEND_OP_OVER = 1;
  var scratchCanvas = document.createElement('canvas');
  var scratchCtx = scratchCanvas.getContext('2d');

  var makeImage = function makeImage(imageData) {
    scratchCtx.width = imageData.width;
    scratchCtx.height = imageData.height;
    scratchCtx.clearRect(0, 0, imageData.width, imageData.height);
    scratchCtx.putImageData(imageData, 0, 0);
    var img = new Image();
    img.src = scratchCanvas.toDataURL();
    return img;
  };

  var PNG = /*#__PURE__*/function () {
    "use strict";

    function PNG(data1) {
      _classCallCheck(this, PNG);

      var i;
      this.data = data1;
      this.pos = 8; // Skip the default header

      this.palette = [];
      this.imgData = [];
      this.transparency = {};
      this.animation = null;
      this.text = {};
      var frame = null;

      while (true) {
        var data;
        var chunkSize = this.readUInt32();
        var section = '';

        for (i = 0; i < 4; i++) {
          section += String.fromCharCode(this.data[this.pos++]);
        }

        switch (section) {
          case 'IHDR':
            // we can grab  interesting values from here (like width, height, etc)
            this.width = this.readUInt32();
            this.height = this.readUInt32();
            this.bits = this.data[this.pos++];
            this.colorType = this.data[this.pos++];
            this.compressionMethod = this.data[this.pos++];
            this.filterMethod = this.data[this.pos++];
            this.interlaceMethod = this.data[this.pos++];
            break;

          case 'acTL':
            // we have an animated PNG
            this.animation = {
              numFrames: this.readUInt32(),
              numPlays: this.readUInt32() || Infinity,
              frames: []
            };
            break;

          case 'PLTE':
            this.palette = this.read(chunkSize);
            break;

          case 'fcTL':
            if (frame) {
              this.animation.frames.push(frame);
            }

            this.pos += 4; // skip sequence number

            frame = {
              width: this.readUInt32(),
              height: this.readUInt32(),
              xOffset: this.readUInt32(),
              yOffset: this.readUInt32()
            };
            var delayNum = this.readUInt16();
            var delayDen = this.readUInt16() || 100;
            frame.delay = 1000 * delayNum / delayDen;
            frame.disposeOp = this.data[this.pos++];
            frame.blendOp = this.data[this.pos++];
            frame.data = [];
            break;

          case 'IDAT':
          case 'fdAT':
            if (section === 'fdAT') {
              this.pos += 4; // skip sequence number

              chunkSize -= 4;
            }

            data = frame && frame.data || this.imgData;

            for (i = 0; i < chunkSize; i++) {
              data.push(this.data[this.pos++]);
            }

            break;

          case 'tRNS':
            // This chunk can only occur once and it must occur after the
            // PLTE chunk and before the IDAT chunk.
            this.transparency = {};

            switch (this.colorType) {
              case 3:
                // Indexed color, RGB. Each byte in this chunk is an alpha for
                // the palette index in the PLTE ("palette") chunk up until the
                // last non-opaque entry. Set up an array, stretching over all
                // palette entries which will be 0 (opaque) or 1 (transparent).
                this.transparency.indexed = this.read(chunkSize);
                var short = 255 - this.transparency.indexed.length;

                if (short > 0) {
                  for (i = 0; i < short; i++) {
                    this.transparency.indexed.push(255);
                  }
                }

                break;

              case 0:
                // Greyscale. Corresponding to entries in the PLTE chunk.
                // Grey is two bytes, range 0 .. (2 ^ bit-depth) - 1
                this.transparency.grayscale = this.read(chunkSize)[0];
                break;

              case 2:
                // True color with proper alpha channel.
                this.transparency.rgb = this.read(chunkSize);
                break;
            }

            break;

          case 'tEXt':
            var text = this.read(chunkSize);
            var index = text.indexOf(0);
            var key = String.fromCharCode.apply(String, text.slice(0, index));
            this.text[key] = String.fromCharCode.apply(String, text.slice(index + 1));
            break;

          case 'IEND':
            if (frame) {
              this.animation.frames.push(frame);
            } // we've got everything we need!


            switch (this.colorType) {
              case 0:
              case 3:
              case 4:
                this.colors = 1;
                break;

              case 2:
              case 6:
                this.colors = 3;
                break;
            }

            this.hasAlphaChannel = [4, 6].indexOf(this.colorType) != -1;
            var colors = this.colors + (this.hasAlphaChannel ? 1 : 0);
            this.pixelBitlength = this.bits * colors;

            switch (this.colors) {
              case 1:
                this.colorSpace = 'DeviceGray';
                break;

              case 3:
                this.colorSpace = 'DeviceRGB';
                break;
            }

            this.imgData = new Uint8Array(this.imgData);
            return;
            break;

          default:
            // unknown (or unimportant) section, skip it
            this.pos += chunkSize;
        }

        this.pos += 4; // Skip the CRC

        if (this.pos > this.data.length) {
          throw new Error('Incomplete or corrupt PNG file');
        }
      }
    }

    _createClass(PNG, [{
      key: "read",
      value: function read(bytes) {
        var result = new Array(bytes);

        for (var i = 0; i < bytes; i++) {
          result[i] = this.data[this.pos++];
        }

        return result;
      }
    }, {
      key: "readUInt32",
      value: function readUInt32() {
        var b1 = this.data[this.pos++] << 24;
        var b2 = this.data[this.pos++] << 16;
        var b3 = this.data[this.pos++] << 8;
        var b4 = this.data[this.pos++];
        return b1 | b2 | b3 | b4;
      }
    }, {
      key: "readUInt16",
      value: function readUInt16() {
        var b1 = this.data[this.pos++] << 8;
        var b2 = this.data[this.pos++];
        return b1 | b2;
      }
    }, {
      key: "decodePixels",
      value: function decodePixels(data) {
        if (data == null) {
          data = this.imgData;
        }

        if (data.length === 0) {
          return new Uint8Array(0);
        }

        data = new FlateStream(data);
        data = data.getBytes();
        var width = this.width,
            height = this.height;
        var pixelBytes = this.pixelBitlength / 8;
        var pixels = new Uint8Array(width * height * pixelBytes);
        var _data = data,
            length = _data.length;
        var pos = 0;

        function pass(x0, y0, dx, dy) {
          var singlePass = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
          var w = Math.ceil((width - x0) / dx);
          var h = Math.ceil((height - y0) / dy);
          var scanlineLength = pixelBytes * w;
          var buffer = singlePass ? pixels : new Uint8Array(scanlineLength * h);
          var row = 0;
          var c = 0;

          while (row < h && pos < length) {
            var byte, col, i, left, upper;

            switch (data[pos++]) {
              case 0:
                // None
                for (i = 0; i < scanlineLength; i++) {
                  buffer[c++] = data[pos++];
                }

                break;

              case 1:
                // Sub
                for (i = 0; i < scanlineLength; i++) {
                  byte = data[pos++];
                  left = i < pixelBytes ? 0 : buffer[c - pixelBytes];
                  buffer[c++] = (byte + left) % 256;
                }

                break;

              case 2:
                // Up
                for (i = 0; i < scanlineLength; i++) {
                  byte = data[pos++];
                  col = (i - i % pixelBytes) / pixelBytes;
                  upper = row && buffer[(row - 1) * scanlineLength + col * pixelBytes + i % pixelBytes];
                  buffer[c++] = (upper + byte) % 256;
                }

                break;

              case 3:
                // Average
                for (i = 0; i < scanlineLength; i++) {
                  byte = data[pos++];
                  col = (i - i % pixelBytes) / pixelBytes;
                  left = i < pixelBytes ? 0 : buffer[c - pixelBytes];
                  upper = row && buffer[(row - 1) * scanlineLength + col * pixelBytes + i % pixelBytes];
                  buffer[c++] = (byte + Math.floor((left + upper) / 2)) % 256;
                }

                break;

              case 4:
                // Paeth
                for (i = 0; i < scanlineLength; i++) {
                  var paeth, upperLeft;
                  byte = data[pos++];
                  col = (i - i % pixelBytes) / pixelBytes;
                  left = i < pixelBytes ? 0 : buffer[c - pixelBytes];

                  if (row === 0) {
                    upper = upperLeft = 0;
                  } else {
                    upper = buffer[(row - 1) * scanlineLength + col * pixelBytes + i % pixelBytes];
                    upperLeft = col && buffer[(row - 1) * scanlineLength + (col - 1) * pixelBytes + i % pixelBytes];
                  }

                  var p = left + upper - upperLeft;
                  var pa = Math.abs(p - left);
                  var pb = Math.abs(p - upper);
                  var pc = Math.abs(p - upperLeft);

                  if (pa <= pb && pa <= pc) {
                    paeth = left;
                  } else if (pb <= pc) {
                    paeth = upper;
                  } else {
                    paeth = upperLeft;
                  }

                  buffer[c++] = (byte + paeth) % 256;
                }

                break;

              default:
                throw new Error("Invalid filter algorithm: ".concat(data[pos - 1]));
            }

            if (!singlePass) {
              var pixelsPos = ((y0 + row * dy) * width + x0) * pixelBytes;
              var bufferPos = row * scanlineLength;

              for (i = 0; i < w; i++) {
                for (var j = 0; j < pixelBytes; j++) {
                  pixels[pixelsPos++] = buffer[bufferPos++];
                }

                pixelsPos += (dx - 1) * pixelBytes;
              }
            }

            row++;
          }
        }

        if (this.interlaceMethod === 1) {
          /*
            1 6 4 6 2 6 4 6
            7 7 7 7 7 7 7 7
            5 6 5 6 5 6 5 6
            7 7 7 7 7 7 7 7
            3 6 4 6 3 6 4 6
            7 7 7 7 7 7 7 7
            5 6 5 6 5 6 5 6
            7 7 7 7 7 7 7 7
          */
          pass(0, 0, 8, 8); // 1

          pass(4, 0, 8, 8); // 2

          pass(0, 4, 4, 8); // 3

          pass(2, 0, 4, 4); // 4

          pass(0, 2, 2, 4); // 5

          pass(1, 0, 2, 2); // 6

          pass(0, 1, 1, 2); // 7
        } else {
          pass(0, 0, 1, 1, true);
        }

        return pixels;
      }
    }, {
      key: "decodePalette",
      value: function decodePalette() {
        var palette = this.palette;
        var length = palette.length;
        var transparency = this.transparency.indexed || [];
        var ret = new Uint8Array((transparency.length || 0) + length);
        var pos = 0;
        var c = 0;

        for (var i = 0; i < length; i += 3) {
          var left;
          ret[pos++] = palette[i];
          ret[pos++] = palette[i + 1];
          ret[pos++] = palette[i + 2];
          ret[pos++] = (left = transparency[c++]) != null ? left : 255;
        }

        return ret;
      }
    }, {
      key: "copyToImageData",
      value: function copyToImageData(imageData, pixels) {
        var j, k;
        var colors = this.colors;
        var palette = null;
        var alpha = this.hasAlphaChannel;

        if (this.palette.length) {
          palette = this._decodedPalette || (this._decodedPalette = this.decodePalette());
          colors = 4;
          alpha = true;
        }

        var data = imageData.data || imageData;
        var length = data.length;
        var input = palette || pixels;
        var i = j = 0;

        if (colors === 1) {
          while (i < length) {
            k = palette ? pixels[i / 4] * 4 : j;
            var v = input[k++];
            data[i++] = v;
            data[i++] = v;
            data[i++] = v;
            data[i++] = alpha ? input[k++] : 255;
            j = k;
          }
        } else {
          while (i < length) {
            k = palette ? pixels[i / 4] * 4 : j;
            data[i++] = input[k++];
            data[i++] = input[k++];
            data[i++] = input[k++];
            data[i++] = alpha ? input[k++] : 255;
            j = k;
          }
        }
      }
    }, {
      key: "decode",
      value: function decode() {
        var ret = new Uint8Array(this.width * this.height * 4);
        this.copyToImageData(ret, this.decodePixels());
        return ret;
      }
    }, {
      key: "decodeFrames",
      value: function decodeFrames(ctx) {
        if (!this.animation) {
          return;
        }

        for (var i = 0; i < this.animation.frames.length; i++) {
          var frame = this.animation.frames[i];
          var imageData = ctx.createImageData(frame.width, frame.height);
          var pixels = this.decodePixels(new Uint8Array(frame.data));
          this.copyToImageData(imageData, pixels);
          frame.imageData = imageData;
          frame.image = makeImage(imageData);
        }
      }
    }, {
      key: "renderFrame",
      value: function renderFrame(ctx, number) {
        var frames = this.animation.frames;
        var frame = frames[number];
        var prev = frames[number - 1]; // if we're on the first frame, clear the canvas

        if (number === 0) {
          ctx.clearRect(0, 0, this.width, this.height);
        } // check the previous frame's dispose operation


        if ((prev && prev.disposeOp) === APNG_DISPOSE_OP_BACKGROUND) {
          ctx.clearRect(prev.xOffset, prev.yOffset, prev.width, prev.height);
        } else if ((prev && prev.disposeOp) === APNG_DISPOSE_OP_PREVIOUS) {
          ctx.putImageData(prev.imageData, prev.xOffset, prev.yOffset);
        } // APNG_BLEND_OP_SOURCE overwrites the previous data


        if (frame.blendOp === APNG_BLEND_OP_SOURCE) {
          ctx.clearRect(frame.xOffset, frame.yOffset, frame.width, frame.height);
        } // draw the current frame


        return ctx.drawImage(frame.image, frame.xOffset, frame.yOffset);
      }
    }, {
      key: "animate",
      value: function animate(ctx) {
        var _this = this;

        var frameNumber = 0;
        var _this$animation = this.animation,
            numFrames = _this$animation.numFrames,
            frames = _this$animation.frames,
            numPlays = _this$animation.numPlays;

        var doFrame = function doFrame() {
          var f = frameNumber++ % numFrames;
          var frame = frames[f];

          _this.renderFrame(ctx, f);

          if (numFrames > 1 && frameNumber / numFrames < numPlays) {
            _this.animation._timeout = setTimeout(doFrame, frame.delay);
          }
        };

        doFrame();
      }
    }, {
      key: "stopAnimation",
      value: function stopAnimation() {
        return clearTimeout(this.animation && this.animation._timeout);
      }
    }, {
      key: "render",
      value: function render(canvas) {
        // if this canvas was displaying another image before,
        // stop the animation on it
        if (canvas._png) {
          canvas._png.stopAnimation();
        }

        canvas._png = this;
        canvas.width = this.width;
        canvas.height = this.height;
        var ctx = canvas.getContext('2d');

        if (this.animation) {
          this.decodeFrames(ctx);
          return this.animate(ctx);
        } else {
          var data = ctx.createImageData(this.width, this.height);
          this.copyToImageData(data, this.decodePixels());
          return ctx.putImageData(data, 0, 0);
        }
      }
    }], [{
      key: "load",
      value: function load(url, canvas, callback) {
        if (typeof canvas === 'function') {
          callback = canvas;
        }

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = function () {
          var data = new Uint8Array(xhr.response || xhr.mozResponseArrayBuffer);
          var png = new PNG(data);

          if (typeof (canvas && canvas.getContext) === 'function') {
            png.render(canvas);
          }

          return typeof callback === 'function' ? callback(png) : undefined;
        };

        return xhr.send(null);
      }
    }]);

    return PNG;
  }();

  return PNG;
}();


// -- zlib

window.DecodeStream = (function() {
  function constructor() {
    this.pos = 0;
    this.bufferLength = 0;
    this.eof = false;
    this.buffer = null;
  }

  constructor.prototype = {
    ensureBuffer: function decodestream_ensureBuffer(requested) {
      var buffer = this.buffer;
      var current = buffer ? buffer.byteLength : 0;
      if (requested < current)
        return buffer;
      var size = 512;
      while (size < requested)
        size <<= 1;
      var buffer2 = new Uint8Array(size);
      for (var i = 0; i < current; ++i)
        buffer2[i] = buffer[i];
      return this.buffer = buffer2;
    },
    getByte: function decodestream_getByte() {
      var pos = this.pos;
      while (this.bufferLength <= pos) {
        if (this.eof)
          return null;
        this.readBlock();
      }
      return this.buffer[this.pos++];
    },
    getBytes: function decodestream_getBytes(length) {
      var pos = this.pos;

      if (length) {
        this.ensureBuffer(pos + length);
        var end = pos + length;

        while (!this.eof && this.bufferLength < end)
          this.readBlock();

        var bufEnd = this.bufferLength;
        if (end > bufEnd)
          end = bufEnd;
      } else {
        while (!this.eof)
          this.readBlock();

        var end = this.bufferLength;
      }

      this.pos = end;
      return this.buffer.subarray(pos, end);
    },
    lookChar: function decodestream_lookChar() {
      var pos = this.pos;
      while (this.bufferLength <= pos) {
        if (this.eof)
          return null;
        this.readBlock();
      }
      return String.fromCharCode(this.buffer[this.pos]);
    },
    getChar: function decodestream_getChar() {
      var pos = this.pos;
      while (this.bufferLength <= pos) {
        if (this.eof)
          return null;
        this.readBlock();
      }
      return String.fromCharCode(this.buffer[this.pos++]);
    },
    makeSubStream: function decodestream_makeSubstream(start, length, dict) {
      var end = start + length;
      while (this.bufferLength <= end && !this.eof)
        this.readBlock();
      return new Stream(this.buffer, start, length, dict);
    },
    skip: function decodestream_skip(n) {
      if (!n)
        n = 1;
      this.pos += n;
    },
    reset: function decodestream_reset() {
      this.pos = 0;
    }
  };

  return constructor;
})();

window.FlateStream = (function() {
  var codeLenCodeMap = new Uint32Array([
    16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15
  ]);

  var lengthDecode = new Uint32Array([
    0x00003, 0x00004, 0x00005, 0x00006, 0x00007, 0x00008, 0x00009, 0x0000a,
    0x1000b, 0x1000d, 0x1000f, 0x10011, 0x20013, 0x20017, 0x2001b, 0x2001f,
    0x30023, 0x3002b, 0x30033, 0x3003b, 0x40043, 0x40053, 0x40063, 0x40073,
    0x50083, 0x500a3, 0x500c3, 0x500e3, 0x00102, 0x00102, 0x00102
  ]);

  var distDecode = new Uint32Array([
    0x00001, 0x00002, 0x00003, 0x00004, 0x10005, 0x10007, 0x20009, 0x2000d,
    0x30011, 0x30019, 0x40021, 0x40031, 0x50041, 0x50061, 0x60081, 0x600c1,
    0x70101, 0x70181, 0x80201, 0x80301, 0x90401, 0x90601, 0xa0801, 0xa0c01,
    0xb1001, 0xb1801, 0xc2001, 0xc3001, 0xd4001, 0xd6001
  ]);

  var fixedLitCodeTab = [new Uint32Array([
    0x70100, 0x80050, 0x80010, 0x80118, 0x70110, 0x80070, 0x80030, 0x900c0,
    0x70108, 0x80060, 0x80020, 0x900a0, 0x80000, 0x80080, 0x80040, 0x900e0,
    0x70104, 0x80058, 0x80018, 0x90090, 0x70114, 0x80078, 0x80038, 0x900d0,
    0x7010c, 0x80068, 0x80028, 0x900b0, 0x80008, 0x80088, 0x80048, 0x900f0,
    0x70102, 0x80054, 0x80014, 0x8011c, 0x70112, 0x80074, 0x80034, 0x900c8,
    0x7010a, 0x80064, 0x80024, 0x900a8, 0x80004, 0x80084, 0x80044, 0x900e8,
    0x70106, 0x8005c, 0x8001c, 0x90098, 0x70116, 0x8007c, 0x8003c, 0x900d8,
    0x7010e, 0x8006c, 0x8002c, 0x900b8, 0x8000c, 0x8008c, 0x8004c, 0x900f8,
    0x70101, 0x80052, 0x80012, 0x8011a, 0x70111, 0x80072, 0x80032, 0x900c4,
    0x70109, 0x80062, 0x80022, 0x900a4, 0x80002, 0x80082, 0x80042, 0x900e4,
    0x70105, 0x8005a, 0x8001a, 0x90094, 0x70115, 0x8007a, 0x8003a, 0x900d4,
    0x7010d, 0x8006a, 0x8002a, 0x900b4, 0x8000a, 0x8008a, 0x8004a, 0x900f4,
    0x70103, 0x80056, 0x80016, 0x8011e, 0x70113, 0x80076, 0x80036, 0x900cc,
    0x7010b, 0x80066, 0x80026, 0x900ac, 0x80006, 0x80086, 0x80046, 0x900ec,
    0x70107, 0x8005e, 0x8001e, 0x9009c, 0x70117, 0x8007e, 0x8003e, 0x900dc,
    0x7010f, 0x8006e, 0x8002e, 0x900bc, 0x8000e, 0x8008e, 0x8004e, 0x900fc,
    0x70100, 0x80051, 0x80011, 0x80119, 0x70110, 0x80071, 0x80031, 0x900c2,
    0x70108, 0x80061, 0x80021, 0x900a2, 0x80001, 0x80081, 0x80041, 0x900e2,
    0x70104, 0x80059, 0x80019, 0x90092, 0x70114, 0x80079, 0x80039, 0x900d2,
    0x7010c, 0x80069, 0x80029, 0x900b2, 0x80009, 0x80089, 0x80049, 0x900f2,
    0x70102, 0x80055, 0x80015, 0x8011d, 0x70112, 0x80075, 0x80035, 0x900ca,
    0x7010a, 0x80065, 0x80025, 0x900aa, 0x80005, 0x80085, 0x80045, 0x900ea,
    0x70106, 0x8005d, 0x8001d, 0x9009a, 0x70116, 0x8007d, 0x8003d, 0x900da,
    0x7010e, 0x8006d, 0x8002d, 0x900ba, 0x8000d, 0x8008d, 0x8004d, 0x900fa,
    0x70101, 0x80053, 0x80013, 0x8011b, 0x70111, 0x80073, 0x80033, 0x900c6,
    0x70109, 0x80063, 0x80023, 0x900a6, 0x80003, 0x80083, 0x80043, 0x900e6,
    0x70105, 0x8005b, 0x8001b, 0x90096, 0x70115, 0x8007b, 0x8003b, 0x900d6,
    0x7010d, 0x8006b, 0x8002b, 0x900b6, 0x8000b, 0x8008b, 0x8004b, 0x900f6,
    0x70103, 0x80057, 0x80017, 0x8011f, 0x70113, 0x80077, 0x80037, 0x900ce,
    0x7010b, 0x80067, 0x80027, 0x900ae, 0x80007, 0x80087, 0x80047, 0x900ee,
    0x70107, 0x8005f, 0x8001f, 0x9009e, 0x70117, 0x8007f, 0x8003f, 0x900de,
    0x7010f, 0x8006f, 0x8002f, 0x900be, 0x8000f, 0x8008f, 0x8004f, 0x900fe,
    0x70100, 0x80050, 0x80010, 0x80118, 0x70110, 0x80070, 0x80030, 0x900c1,
    0x70108, 0x80060, 0x80020, 0x900a1, 0x80000, 0x80080, 0x80040, 0x900e1,
    0x70104, 0x80058, 0x80018, 0x90091, 0x70114, 0x80078, 0x80038, 0x900d1,
    0x7010c, 0x80068, 0x80028, 0x900b1, 0x80008, 0x80088, 0x80048, 0x900f1,
    0x70102, 0x80054, 0x80014, 0x8011c, 0x70112, 0x80074, 0x80034, 0x900c9,
    0x7010a, 0x80064, 0x80024, 0x900a9, 0x80004, 0x80084, 0x80044, 0x900e9,
    0x70106, 0x8005c, 0x8001c, 0x90099, 0x70116, 0x8007c, 0x8003c, 0x900d9,
    0x7010e, 0x8006c, 0x8002c, 0x900b9, 0x8000c, 0x8008c, 0x8004c, 0x900f9,
    0x70101, 0x80052, 0x80012, 0x8011a, 0x70111, 0x80072, 0x80032, 0x900c5,
    0x70109, 0x80062, 0x80022, 0x900a5, 0x80002, 0x80082, 0x80042, 0x900e5,
    0x70105, 0x8005a, 0x8001a, 0x90095, 0x70115, 0x8007a, 0x8003a, 0x900d5,
    0x7010d, 0x8006a, 0x8002a, 0x900b5, 0x8000a, 0x8008a, 0x8004a, 0x900f5,
    0x70103, 0x80056, 0x80016, 0x8011e, 0x70113, 0x80076, 0x80036, 0x900cd,
    0x7010b, 0x80066, 0x80026, 0x900ad, 0x80006, 0x80086, 0x80046, 0x900ed,
    0x70107, 0x8005e, 0x8001e, 0x9009d, 0x70117, 0x8007e, 0x8003e, 0x900dd,
    0x7010f, 0x8006e, 0x8002e, 0x900bd, 0x8000e, 0x8008e, 0x8004e, 0x900fd,
    0x70100, 0x80051, 0x80011, 0x80119, 0x70110, 0x80071, 0x80031, 0x900c3,
    0x70108, 0x80061, 0x80021, 0x900a3, 0x80001, 0x80081, 0x80041, 0x900e3,
    0x70104, 0x80059, 0x80019, 0x90093, 0x70114, 0x80079, 0x80039, 0x900d3,
    0x7010c, 0x80069, 0x80029, 0x900b3, 0x80009, 0x80089, 0x80049, 0x900f3,
    0x70102, 0x80055, 0x80015, 0x8011d, 0x70112, 0x80075, 0x80035, 0x900cb,
    0x7010a, 0x80065, 0x80025, 0x900ab, 0x80005, 0x80085, 0x80045, 0x900eb,
    0x70106, 0x8005d, 0x8001d, 0x9009b, 0x70116, 0x8007d, 0x8003d, 0x900db,
    0x7010e, 0x8006d, 0x8002d, 0x900bb, 0x8000d, 0x8008d, 0x8004d, 0x900fb,
    0x70101, 0x80053, 0x80013, 0x8011b, 0x70111, 0x80073, 0x80033, 0x900c7,
    0x70109, 0x80063, 0x80023, 0x900a7, 0x80003, 0x80083, 0x80043, 0x900e7,
    0x70105, 0x8005b, 0x8001b, 0x90097, 0x70115, 0x8007b, 0x8003b, 0x900d7,
    0x7010d, 0x8006b, 0x8002b, 0x900b7, 0x8000b, 0x8008b, 0x8004b, 0x900f7,
    0x70103, 0x80057, 0x80017, 0x8011f, 0x70113, 0x80077, 0x80037, 0x900cf,
    0x7010b, 0x80067, 0x80027, 0x900af, 0x80007, 0x80087, 0x80047, 0x900ef,
    0x70107, 0x8005f, 0x8001f, 0x9009f, 0x70117, 0x8007f, 0x8003f, 0x900df,
    0x7010f, 0x8006f, 0x8002f, 0x900bf, 0x8000f, 0x8008f, 0x8004f, 0x900ff
  ]), 9];

  var fixedDistCodeTab = [new Uint32Array([
    0x50000, 0x50010, 0x50008, 0x50018, 0x50004, 0x50014, 0x5000c, 0x5001c,
    0x50002, 0x50012, 0x5000a, 0x5001a, 0x50006, 0x50016, 0x5000e, 0x00000,
    0x50001, 0x50011, 0x50009, 0x50019, 0x50005, 0x50015, 0x5000d, 0x5001d,
    0x50003, 0x50013, 0x5000b, 0x5001b, 0x50007, 0x50017, 0x5000f, 0x00000
  ]), 5];
  
  function error(e) {
      throw new Error(e)
  }

  function constructor(bytes) {
    //var bytes = stream.getBytes();
    var bytesPos = 0;

    var cmf = bytes[bytesPos++];
    var flg = bytes[bytesPos++];
    if (cmf == -1 || flg == -1)
      error('Invalid header in flate stream');
    if ((cmf & 0x0f) != 0x08)
      error('Unknown compression method in flate stream');
    if ((((cmf << 8) + flg) % 31) != 0)
      error('Bad FCHECK in flate stream');
    if (flg & 0x20)
      error('FDICT bit set in flate stream');

    this.bytes = bytes;
    this.bytesPos = bytesPos;

    this.codeSize = 0;
    this.codeBuf = 0;

    DecodeStream.call(this);
  }

  constructor.prototype = Object.create(DecodeStream.prototype);

  constructor.prototype.getBits = function(bits) {
    var codeSize = this.codeSize;
    var codeBuf = this.codeBuf;
    var bytes = this.bytes;
    var bytesPos = this.bytesPos;

    var b;
    while (codeSize < bits) {
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad encoding in flate stream');
      codeBuf |= b << codeSize;
      codeSize += 8;
    }
    b = codeBuf & ((1 << bits) - 1);
    this.codeBuf = codeBuf >> bits;
    this.codeSize = codeSize -= bits;
    this.bytesPos = bytesPos;
    return b;
  };

  constructor.prototype.getCode = function(table) {
    var codes = table[0];
    var maxLen = table[1];
    var codeSize = this.codeSize;
    var codeBuf = this.codeBuf;
    var bytes = this.bytes;
    var bytesPos = this.bytesPos;

    while (codeSize < maxLen) {
      var b;
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad encoding in flate stream');
      codeBuf |= (b << codeSize);
      codeSize += 8;
    }
    var code = codes[codeBuf & ((1 << maxLen) - 1)];
    var codeLen = code >> 16;
    var codeVal = code & 0xffff;
    if (codeSize == 0 || codeSize < codeLen || codeLen == 0)
      error('Bad encoding in flate stream');
    this.codeBuf = (codeBuf >> codeLen);
    this.codeSize = (codeSize - codeLen);
    this.bytesPos = bytesPos;
    return codeVal;
  };

  constructor.prototype.generateHuffmanTable = function(lengths) {
    var n = lengths.length;

    // find max code length
    var maxLen = 0;
    for (var i = 0; i < n; ++i) {
      if (lengths[i] > maxLen)
        maxLen = lengths[i];
    }

    // build the table
    var size = 1 << maxLen;
    var codes = new Uint32Array(size);
    for (var len = 1, code = 0, skip = 2;
         len <= maxLen;
         ++len, code <<= 1, skip <<= 1) {
      for (var val = 0; val < n; ++val) {
        if (lengths[val] == len) {
          // bit-reverse the code
          var code2 = 0;
          var t = code;
          for (var i = 0; i < len; ++i) {
            code2 = (code2 << 1) | (t & 1);
            t >>= 1;
          }

          // fill the table entries
          for (var i = code2; i < size; i += skip)
            codes[i] = (len << 16) | val;

          ++code;
        }
      }
    }

    return [codes, maxLen];
  };

  constructor.prototype.readBlock = function() {
    function repeat(stream, array, len, offset, what) {
      var repeat = stream.getBits(len) + offset;
      while (repeat-- > 0)
        array[i++] = what;
    }

    // read block header
    var hdr = this.getBits(3);
    if (hdr & 1)
      this.eof = true;
    hdr >>= 1;

    if (hdr == 0) { // uncompressed block
      var bytes = this.bytes;
      var bytesPos = this.bytesPos;
      var b;

      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad block header in flate stream');
      var blockLen = b;
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad block header in flate stream');
      blockLen |= (b << 8);
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad block header in flate stream');
      var check = b;
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad block header in flate stream');
      check |= (b << 8);
      if (check != (~blockLen & 0xffff))
        error('Bad uncompressed block length in flate stream');

      this.codeBuf = 0;
      this.codeSize = 0;

      var bufferLength = this.bufferLength;
      var buffer = this.ensureBuffer(bufferLength + blockLen);
      var end = bufferLength + blockLen;
      this.bufferLength = end;
      for (var n = bufferLength; n < end; ++n) {
        if (typeof (b = bytes[bytesPos++]) == 'undefined') {
          this.eof = true;
          break;
        }
        buffer[n] = b;
      }
      this.bytesPos = bytesPos;
      return;
    }

    var litCodeTable;
    var distCodeTable;
    if (hdr == 1) { // compressed block, fixed codes
      litCodeTable = fixedLitCodeTab;
      distCodeTable = fixedDistCodeTab;
    } else if (hdr == 2) { // compressed block, dynamic codes
      var numLitCodes = this.getBits(5) + 257;
      var numDistCodes = this.getBits(5) + 1;
      var numCodeLenCodes = this.getBits(4) + 4;

      // build the code lengths code table
      var codeLenCodeLengths = Array(codeLenCodeMap.length);
      var i = 0;
      while (i < numCodeLenCodes)
        codeLenCodeLengths[codeLenCodeMap[i++]] = this.getBits(3);
      var codeLenCodeTab = this.generateHuffmanTable(codeLenCodeLengths);

      // build the literal and distance code tables
      var len = 0;
      var i = 0;
      var codes = numLitCodes + numDistCodes;
      var codeLengths = new Array(codes);
      while (i < codes) {
        var code = this.getCode(codeLenCodeTab);
        if (code == 16) {
          repeat(this, codeLengths, 2, 3, len);
        } else if (code == 17) {
          repeat(this, codeLengths, 3, 3, len = 0);
        } else if (code == 18) {
          repeat(this, codeLengths, 7, 11, len = 0);
        } else {
          codeLengths[i++] = len = code;
        }
      }

      litCodeTable =
        this.generateHuffmanTable(codeLengths.slice(0, numLitCodes));
      distCodeTable =
        this.generateHuffmanTable(codeLengths.slice(numLitCodes, codes));
    } else {
      error('Unknown block type in flate stream');
    }

    var buffer = this.buffer;
    var limit = buffer ? buffer.length : 0;
    var pos = this.bufferLength;
    while (true) {
      var code1 = this.getCode(litCodeTable);
      if (code1 < 256) {
        if (pos + 1 >= limit) {
          buffer = this.ensureBuffer(pos + 1);
          limit = buffer.length;
        }
        buffer[pos++] = code1;
        continue;
      }
      if (code1 == 256) {
        this.bufferLength = pos;
        return;
      }
      code1 -= 257;
      code1 = lengthDecode[code1];
      var code2 = code1 >> 16;
      if (code2 > 0)
        code2 = this.getBits(code2);
      var len = (code1 & 0xffff) + code2;
      code1 = this.getCode(distCodeTable);
      code1 = distDecode[code1];
      code2 = code1 >> 16;
      if (code2 > 0)
        code2 = this.getBits(code2);
      var dist = (code1 & 0xffff) + code2;
      if (pos + len >= limit) {
        buffer = this.ensureBuffer(pos + len);
        limit = buffer.length;
      }
      for (var k = 0; k < len; ++k, ++pos)
        buffer[pos] = buffer[pos - dist];
    }
  };

  return constructor;
})();


function PNGModule() {

}
PNGModule.prototype = new Object();

export { PNGModule }
