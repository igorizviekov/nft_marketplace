export function parseVolume(volume: number): string {
  return volume.toString().length > 4
    ? volume.toString().slice(0, 2) + 'K'
    : volume.toString();
}
