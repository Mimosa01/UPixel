import { action, observable } from "mobx";
import { ColoringType } from "../types/coloringType";

type AddRectType = {
  index: number;
  color: string;
  isColoring?: boolean; 
}

class ColoringStore {
  @observable data: ColoringType = {
    grid: 0,
    rects: [],
    pallete: [],
    isColoring: undefined
  }

  @action setColoring(data: ColoringType): void {
    this.data = data;
  }

  @action clearStore(): void {
    this.data = {
      grid: 0,
      rects: [],
      pallete: [],
      isColoring: undefined
    }
  }

  @action createCanvas(): void {
    this.clearStore();

    this.data = {
      grid: 5,
      rects: [],
      pallete: []
    }

    console.log(this.data)
  }

  @action addRect({index, color, isColoring}: AddRectType): void {
    const foundIndex = this.data.rects.findIndex(rect => rect.indexRect === index);
    let indexColor: number | undefined;

    if (isColoring) {
      indexColor = this.data.pallete?.findIndex(color => color === color);
    }

    if (foundIndex !== -1) {
      this.data.rects[foundIndex].color = color;
    } else {
      this.data.rects.push({indexRect: index, color: color, indexColor: indexColor && indexColor});
    }

    console.log(this.data)
  }

  @action clearRect(index: number): void {
    const foundIndex = this.data.rects.findIndex(rect => rect.indexRect === index);

    this.data.rects.splice(foundIndex, 1);
    console.log(this.data)
  }

  @action saveCanvas(): void {
    // Тут по идеи должно происходить сохранение либо в LocalStorage либо на сервер
    console.log(this.data);
  }
}

export default new ColoringStore();