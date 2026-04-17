export function playSound(src, volume = 0.4) {
  const audio = new Audio(src);
  audio.volume = volume;
  audio.play().catch(() => {});
}