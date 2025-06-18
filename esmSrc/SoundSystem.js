

	'use strict';
    /* HTML5 Audio sound system */
    function SoundSystem(musicIntervalSeconds) {
		SoundSystem._musicInterval = musicIntervalSeconds || 60;
		
    };
	SoundSystem.prototype.constructor = SoundSystem;
	SoundSystem.prototype._soundPlaying = "";
    SoundSystem.prototype._sounds = [];
    SoundSystem.prototype._soundTracks = [];
    SoundSystem.prototype._soundIndex = 0;
    SoundSystem.prototype._soundNames = [];
    SoundSystem.prototype._currentTrack;
	SoundSystem._trackPaused = 0;
	SoundSystem._musicInterval = 60;
    SoundSystem.prototype._trackTimer;
	SoundSystem.prototype._globalVolume = 1;
	
	SoundSystem.prototype.changeVolume = function(to) {
		var i = 0;var a;var si = 0;
		for(i; i < this._sounds.length; i++) {
			a = this._sounds[i];
			si = 0;
			for(si; si < a.length;si++) {
				a[si].volume = to;
			}
		}
		i = 0;
		for(i; i < this._soundTracks.length; i++) {
			this._soundTracks[i].volume = to;
		}
		this._globalVolume = to;
	};
	
    SoundSystem.prototype.addSound = function(soundLocation, name, vol, poolAmount) {
        var innera = [];
        var i = 0;
        var l = poolAmount || 1;
        for (i; i < l; i++) {
            var s = new Audio(soundLocation);
            s.volume = vol;
            s.load();
            innera[innera.length] = s;
        }
        this._soundNames.push(name);
        this._sounds[this._sounds.length] = innera;
    };
	SoundSystem.prototype.clearAllSounds = function() {
		this._sounds.length = 0;
		this._soundNames.length = 0;
	};
    SoundSystem.prototype.addMusic = function(soundLocation, vol, loop) {
        var s = new Audio(soundLocation);
        s.volume = vol;
		s.loop = (loop === false || loop === 0 || loop === -1) ? false : true;
        s.load();
        this._soundTracks[this._soundTracks.length] = s;
    };
    SoundSystem.prototype.playSound = function(name, usePool) {
		if(this._soundPlaying != name) {
			this._soundIndex = 0;
			this._soundPlaying = name;
		}
        var a = this._sounds[this._soundNames.indexOf(name)];
        var ind = usePool ? this._soundIndex : 0;
        if (a[ind] && (a[ind].currentTime == 0 || a[ind].ended)) {
            a[ind].play();
            if (this._soundIndex < a.length - 1) {
                this._soundIndex += 1;
            } else {
                this._soundIndex = 0;
            }
        }
    };
    SoundSystem.prototype.playMusic = function(index, intervalSeconds) {
        index = index || 0;
		if(intervalSeconds) SoundSystem._musicInterval = intervalSeconds;
        var s = this._soundTracks[index];
        if (s && (s.currentTime == 0 || s.ended || s.paused)) {
            s.play();
            this._currentTrack = s;
        }
        if (this._currentTrack) {
			SoundSystem._trackPaused = 0;
        }
    };
	SoundSystem.prototype.clearMusicTracks = function() {
		
		var i = 0;
		for(i;i<this._soundTracks.length;i++) {
			this._soundTracks[i].pause();
		}
		this._soundTracks.length = 0;
	};
    SoundSystem.prototype.stopMusic = function() {
		if(this._currentTrack) {
			this._currentTrack.pause();
			SoundSystem._trackPaused = 1;
		}
    };
    
    export { SoundSystem   };
    





