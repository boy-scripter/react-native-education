export function formatTime(seconds: string | number): string {
  const parsedSeconds = typeof seconds === 'number' ? seconds : parseFloat(seconds);

  const h = Math.floor(parsedSeconds / 3600);
  const m = Math.floor((parsedSeconds % 3600) / 60);
  const s = parsedSeconds % 60;

  const parts = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);

  // round seconds to 2 decimal places if needed
  const secondsStr = s.toFixed(2).replace(/\.?0+$/, ''); // removes trailing zeros
  parts.push(`${secondsStr}s`);

  return parts.join(', ');
}
