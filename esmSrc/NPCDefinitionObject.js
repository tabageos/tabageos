	'use strict';
	function NPCDefinitionObject(dialogBoxFromRectangle) {
		
		this.dialogBoxFromRectangle = dialogBoxFromRectangle;
	};
	NPCDefinitionObject.prototype.exampleNpc = {

		tileValue: [],
		animationSpecs: {},
		width:16,
		height:16,
		aWords:"",
		bWords:"",
		manditoryWords:"",
		dropWords:"",
		dropValueFunction : function(player, itemsHeld, buttonPressed, questionAsked) {

		}
	};
	NPCDefinitionObject.prototype._defaultHealerNpc = {

		tileValue: [24,34],
		animationSpecs: { 
			"idle":[34, [34,24,34,24,34,24,34,24, 36,24,36,24,36,24,36,24] ] 
		},
		width:32,
		height:32,
		aWords:"Have some health |Health for you",
		bWords:"Power for you |Have some power",
		manditoryWords:"",
		dropWords:"",
		dropValueFunction : function(player, itemsHeld, buttonPressed, questionAsked) {
			if(buttonPressed === "a") { return [47,63] } else {return [47,60] }
		}
	};
	NPCDefinitionObject.prototype._defaultMaleNpc = {

		tileValue: [20,34],
		animationSpecs: { 
			"idle":[34, [34,20,34,20,34,20,34,20] ] 
		},
		width:32,
		height:32,
		aWords:"What am I ? A game character | You tell me ? Yes my name is default | I am the default male npc",
		bWords:"What kind of game is this ? A platformer | its like a placeholder game ? No its the default game | yeah its default",
		manditoryWords:"",
		dropWords:"",
		dropValueFunction : function(player, itemsHeld, buttonPressed, questionAsked) {
			if(questionAsked == "a" && buttonPressed === "a") { return [47,60] } else {return null; }
		}
	};
	NPCDefinitionObject.prototype._defaultFemaleNpc = {

		tileValue: [28,34],
		animationSpecs: { 
			"idle":[34, [34,28,34,28,34,28,34,28, 36,28,36,28,36,28,36,28] ] 
		},
		width:32,
		height:32,
		aWords:"Hello I am a defualt npc",
		bWords:"Oh a different button ok hi default npc am I",
		manditoryWords:"",
		dropWords:"",
		dropValueFunction : function(player, itemsHeld, buttonPressed, questionAsked) {
			
		}
	};
	NPCDefinitionObject.prototype.addNpc = function(npcName, tileValue, animationSpecs, width, height, aWords, bWords, manditoryWords, dropWords, dropValueFunction) {

		if(!this[npcName]) {
			this[npcName] = { 
				"tileValue":tileValue,
				"animationSpecs":animationSpecs,
				"width":width,
				"height":height,
				"aWords":aWords,
				"bWords":bWords,
				"manditoryWords":manditoryWords,
				"dropWords":dropWords,
				"dropValueFunction":dropValueFunction
			};

		} else {

			throw( npcName + " already exists on the NPCDefinitionObject" );
		}
	};
	NPCDefinitionObject.prototype.dialogBoxFromRectangle = null;
	
	export { NPCDefinitionObject };
