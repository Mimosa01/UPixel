import { action, makeAutoObservable } from "mobx";
import coloringStore from "./coloringStore";

export class SaveColoringStore {

  constructor() {
    makeAutoObservable(this);
  }

  @action createCanvas(gridAmount: number): void {
    coloringStore.clearStore();

    coloringStore.data = {
      isColoring: false,
      grid: gridAmount,
      rects: [],
      pallete: []
    }

    console.log(coloringStore.data)
  }

  @action addRect(indexRect: number, color: string): void {
    const foundRectIndex = coloringStore.data.rects.findIndex(rect => rect.indexRect === indexRect);
    const currentColorIndex = coloringStore.data.pallete.findIndex(c => c === color);

    if (foundRectIndex !== -1) {
      if (coloringStore.data.isColoring) {
        coloringStore.data.rects[foundRectIndex].currentColorIndex = currentColorIndex;
        return;
      }

      coloringStore.data.rects[foundRectIndex].indexColor = currentColorIndex;
    } else {
      if (coloringStore.data.isColoring) {
        coloringStore.data.rects.push({
          indexRect: indexRect,
          currentColorIndex: currentColorIndex,
        });
        return;
      }

      coloringStore.data.rects.push({
        indexRect: indexRect,
        indexColor: currentColorIndex
      })
    }
  }

  @action clearRect(index: number): void {
    const foundIndex = coloringStore.data.rects.findIndex(rect => rect.indexRect === index);

    if (foundIndex !== -1) {
      if (coloringStore.data.isColoring && coloringStore.data.rects[foundIndex].indexColor !== undefined) {
        coloringStore.data.rects[foundIndex].currentColorIndex = undefined;
        return;
      }
      coloringStore.data.rects.splice(foundIndex, 1);
    }

    console.log(coloringStore.data)
  }

  @action saveCanvas(): void {
    // Тут по идеи должно происходить сохранение либо в LocalStorage либо на сервер
    console.log(coloringStore.data);
  }
}

export default new SaveColoringStore();