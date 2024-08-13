import { ColorForColoringType } from "../types/coloringType";

export function getColorRect(index: number, dataRects: ColorForColoringType[]): string | undefined {
  const foundRect = dataRects.find(item => item.indexRect === index);

  return foundRect ? foundRect.color : undefined;
}

export function getColorIndex(index: number, dataRects: ColorForColoringType[]): number | undefined {
  const foundRect = dataRects.find(item => item.indexRect === index);

  return (foundRect && foundRect.indexColor !== undefined) ? foundRect.indexColor + 1 : undefined;
}

export function getFilling(index: number, dataRects: ColorForColoringType[]): boolean | undefined {
  const foundRect = dataRects.find(item => item.indexRect === index);

  return (foundRect && foundRect.filling) ? foundRect.filling : undefined;
}