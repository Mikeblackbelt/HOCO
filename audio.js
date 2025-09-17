function playSound(url) {
    const audio = new Audio(url);
    audio.play();
}

document.addEventListener('DOMContentLoaded', () => {
    playSound('https://say-yes-if-you-are-cool.netlify.app/11l-fail_sound_comedy_r-1749704575880-358768.mp3')