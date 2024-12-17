declare function SoundSystem(musicIntervalSeconds?: number): void;
/**
*   Basic HTML5 Audio sound system
*
*
* @class SoundSystem
* @classdesc
*
*    A basic HTML5 sound system for playing sounds and music.
*    To play a sound first add it with addSound, giving it a name,
*     then call playSound with the name you gave it.
*
*    To play and loop a music track use addMusic and playMusic.
*
*
*
* @param [musicIntervalSeconds=60]  {Number} Default is 60.
*
*/
declare function SoundSystem(musicIntervalSeconds?: number): void;
declare class SoundSystem {
    constructor(musicIntervalSeconds?: number);
    /**
    *   Basic HTML5 Audio sound system
    *
    *
    * @class SoundSystem
    * @classdesc
    *
    *    A basic HTML5 sound system for playing sounds and music.
    *    To play a sound first add it with addSound, giving it a name,
    *     then call playSound with the name you gave it.
    *
    *    To play and loop a music track use addMusic and playMusic.
    *
    *
    *
    * @param [musicIntervalSeconds=60]  {Number} Default is 60.
    *
    */
    constructor(musicIntervalSeconds?: number);
    /**
    *
    *
    *
    * @memberof SoundSystem
    *
    */
    _soundPlaying: string;
    /**
    *
    *
    *
    * @memberof SoundSystem
    *
    */
    _sounds: any[];
    /**
    *
    *
    *
    * @memberof SoundSystem
    *
    */
    _soundTracks: any[];
    /**
    *
    *
    *
    * @memberof SoundSystem
    *
    */
    _soundIndex: number;
    /**
    *
    *
    *
    * @memberof SoundSystem
    *
    */
    _soundNames: any[];
    /**
    *
    *    Add a sound to be played with playSound
    *
    * @memberof SoundSystem.prototype
    * @method addSound
    * @param soundLocation {String} The Location of the sound to add.
    * @param name {String} A name for the sound
    * @param vol {Number} The volume of the sound 0 to 1.
    * @param poolAmount {Number} Amount to pre load, alows for faster one shots, default is 1.
    *
    */
    addSound(soundLocation: string, name: string, vol: number, poolAmount: number): void;
    /**
    *
    *    Clear all sounds added with addSound
    *
    * @memberof SoundSystem.prototype
    * @method clearAllSounds
    *
    */
    clearAllSounds(): void;
    /**
    *
    *    Add a music track to be played with playMusic.
    *      The first track you add would be at index 0 in _soundTracks, and additional calls are adding to _soundTracks.
    *
    * @memberof SoundSystem.prototype
    * @method addMusic
    * @param soundLocation {String} The url location of the music track.
    * @param vol {Number} The volume of the track, 0 to 1.
    * @param loop {Boolean} Default is true
    *
    */
    addMusic(soundLocation: string, vol: number, loop: boolean): void;
    /**
    *
    *    play a sound added with addSound
    *
    * @memberof SoundSystem.prototype
    * @method playSound
    * @param name {String} The name of the sound to play, as defined during addSound
    * @param usePool {Boolean} If true, and you set a poolAmount during addSound, it will cycle through the preloaded pool,
    *                           otherwise the sound will need to have finished first, before replay.
    *                           If what you want is fast one shots of the same sound that potentially overlap, then use a pool of 2 or up to 10.
    *
    */
    playSound(name: string, usePool: boolean): void;
    /**
    *
    *    play a music track added with addMusic
    *
    * @memberof SoundSystem.prototype
    * @method playMusic
    * @param [index=0] {Number} The index of the track to play, the first track added with addMusic is at index 0, the default is index 0.
    *
    */
    playMusic(index?: number, intervalSeconds: any): void;
    _currentTrack: any;
    /**
    *   Clears all music added with addMusic.
    *
    *
    * @memberof SoundSystem.prototype
    * @method clearMusicTracks
    *
    */
    clearMusicTracks(): void;
    /**
    *
    *    Stops the currrent music track from playing.
    *
    * @memberof SoundSystem.prototype
    * @method stopMusic
    *
    */
    stopMusic(): void;
}
declare namespace SoundSystem {
    let _trackPaused: number;
    let _musicInterval: number;
}
//# sourceMappingURL=SoundSystem.d.ts.map