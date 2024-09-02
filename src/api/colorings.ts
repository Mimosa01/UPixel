import coloringStore from "../store/coloring/coloringStore";
import { ColoringType } from "../types/coloringType";

export function getColorings(data: ColoringType) {
  coloringStore.clearStore();
  coloringStore.setColoring(data);
}