import coloringStore from "../store/coloringStore";
import { ColoringType } from "../types/coloringType";

export function getColorings(data: ColoringType) {
  coloringStore.clearStore();
  coloringStore.setColoring(data);
}