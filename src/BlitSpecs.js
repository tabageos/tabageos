(function() { 
	'use strict';
    function BlitSpecs(blitWidth, blitHeight, blitIndex) {
        this.blitWidth = blitWidth || 16;
        this.blitHeight = blitHeight || 16;
		this.blitIndex = blitIndex || 0;
    };
	BlitSpecs.prototype.blitWidth = 16;
    BlitSpecs.prototype.blitHeight = 16;
    BlitSpecs.prototype.blitIndex = 0;
	BlitSpecs.prototype.constructor = BlitSpecs;
    tabageos.BlitSpecs = BlitSpecs;
})();

