export type RectType = {
  currentColorIndex?: number;
  indexRect: number;
  indexColor?: number;
}

export type ColoringType = {
  grid: number;
  rects: RectType[];
  pallete: string[];
  isColoring: boolean;
}