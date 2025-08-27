export function formatTime(seconds: string | number) {
  const parsedSeconds = typeof seconds === 'number' ? seconds : parseInt(seconds, 10);
  const m = Math.floor(parsedSeconds / 60);
  const s = parsedSeconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
