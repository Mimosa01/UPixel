export type ColorForColoringType = {
  color: string;
  indexRect: number;
  indexColor?: number;
  filling?: boolean;
}

export type ColoringType = {
  grid: number;
  rects: ColorForColoringType[];
  pallete?: string[];
  isColoring?: boolean;
}