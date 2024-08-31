import { RectType } from "../types/coloringType";

export function getColorRect(index: number, dataRects: RectType[]): string | undefined {
  const foundRect = dataRects.find(item => item.indexRect === index);

  return foundRect ? foundRect.color : undefined;
}

export function getColorIndex(index: number, dataRects: RectType[]): number | undefined {
  const foundRect = dataRects.find(item => item.indexRect === index);

  return (foundRect && foundRect.indexColor !== undefined) ? foundRect.indexColor + 1 : undefined;
}

export function getFilling(index: number, dataRects: RectType[]): boolean | undefined {
  const foundRect = dataRects.find(item => item.indexRect === index);

  return (foundRect && foundRect.isFilling) ? foundRect.isFilling : undefined;
}