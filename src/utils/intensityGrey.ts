export function getGrayColor(index: number): string {
  const offset: number = 2.5;
  const intensity: number = Math.round(255 - (index / 100 * offset) * 255);
  
  return '#' + intensity.toString(16) + intensity.toString(16) + intensity.toString(16);
}