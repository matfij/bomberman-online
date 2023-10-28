import { SoundSettings } from './definitions/types';

export function playSound(sound: HTMLAudioElement, settings: SoundSettings) {
    sound.volume = settings.volume;
    sound.loop = settings.loop ?? sound.loop;
    if (sound.currentTime > 0) sound.currentTime = 0;
    if (sound.paused) sound.play();
}

export function stopSound(sound: HTMLAudioElement) {
    sound.pause();
    sound.currentTime = 0;
}
