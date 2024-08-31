import { action, makeAutoObservable, observable } from "mobx";
import { ColoringType } from "../types/coloringType";
import colorStore from "./colorStore";

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
    isColoring: false
  }

  constructor() {
    makeAutoObservable(this);
  }

  @action setColoring(data: ColoringType): void {
    this.data = data;
  }

  @action clearStore(): void {
    this.data = {
      grid: 0,
      rects: [],
      pallete: [],
      isColoring: false
    }
  }

  // Это что касаемо сохранения
  @action createCanvas(gridAmount: number): void {
    this.clearStore();

    this.data = {
      isColoring: false,
      grid: gridAmount,
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
      this.data.rects.push({indexRect: index, color: color, indexColor: isColoring ? indexColor : undefined, isFilling: true});
    }

    // console.log(this.data)
  }

  @action clearRect(index: number): void {
    const foundIndex = this.data.rects.findIndex(rect => rect.indexRect === index);

    if (foundIndex !== -1) {
      this.data.rects.splice(foundIndex, 1);
    }

    console.log(this.data)
  }

  @action saveCanvas(): void {
    // Тут по идеи должно происходить сохранение либо в LocalStorage либо на сервер
    console.log(this.data);
  }

  // закончили работать с сохранением

  public getColorRect(index: number): string | undefined {
    return this.data.rects[index].indexColor ? 
      this.data.pallete[this.data.rects[index].indexColor] :
      undefined;
  }

  public getColorIndex(index: number): number | undefined {
    return this.data.rects[index].indexColor;
  } 

  public getFilling(index: number): boolean | undefined {
    return this.data.rects[index].isFilling; // не может прочитать isFilling
  }

  @action handleFilling(index: number): string | undefined {
    if (colorStore.isClear) {
      this.clearRect(index);
      return;
    }

    this.addRect({index: index, color: colorStore.selectedColor});

    return colorStore.selectedColor;
  }

  @action handleColoring(index: number, setAlfa: React.Dispatch<React.SetStateAction<number>>): string | undefined {
    if (colorStore.isClear) {
      this.clearRect(index);
      return
    }

    const selectedColorIndex = this.data.pallete.findIndex(color => color === colorStore.selectedColor);

    if (selectedColorIndex !== this.data.rects[index].indexColor) {
      setAlfa(0.5);
    } else {
      setAlfa(1);
    }

    this.addRect({index: index, color: colorStore.selectedColor});
    return colorStore.selectedColor;
  }
   
}

export default new ColoringStore();