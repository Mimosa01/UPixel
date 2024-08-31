export type RectType = {
  color?: string;
  indexRect: number;
  indexColor?: number;
  isFilling: boolean;
}

export type ColoringType = {
  grid: number;
  rects: RectType[];
  pallete: string[];
  isColoring: boolean;
}