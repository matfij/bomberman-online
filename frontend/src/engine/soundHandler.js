export function playSound(sound, settings) {
    sound.volume = settings.volume;
    sound.loop = settings.loop ?? sound.loop;
    if (sound.currentTime > 0)
        sound.currentTime = 0;
    if (sound.paused)
        sound.play();
}
export function stopSound(sound) {
    sound.pause();
    sound.currentTime = 0;
}
