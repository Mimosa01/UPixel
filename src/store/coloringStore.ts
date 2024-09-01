import { action, makeAutoObservable, observable } from "mobx";
import { ColoringType } from "../types/coloringType";
import colorStore from "./colorStore";

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

  @action setPallete(colors: string[]): void {
    this.data.pallete = colors;
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

  @action addRect(indexRect: number, color: string): void {
    const foundRectIndex = this.data.rects.findIndex(rect => rect.indexRect === indexRect);
    const currentColorIndex = this.data.pallete.findIndex(c => c === color);

    if (foundRectIndex !== -1) {
      if (this.data.isColoring) {
        this.data.rects[foundRectIndex].currentColorIndex = currentColorIndex;
        return;
      }

      this.data.rects[foundRectIndex].indexColor = currentColorIndex;
    } else {
      if (this.data.isColoring) {
        this.data.rects.push({
          indexRect: indexRect,
          currentColorIndex: currentColorIndex,
        });
        return;
      }

      this.data.rects.push({
        indexRect: indexRect,
        indexColor: currentColorIndex
      })
    }
  }

  @action clearRect(index: number): void {
    const foundIndex = this.data.rects.findIndex(rect => rect.indexRect === index);

    if (foundIndex !== -1) {
      if (this.data.isColoring && this.data.rects[foundIndex].indexColor !== undefined) {
        this.data.rects[foundIndex].currentColorIndex = undefined;
        return;
      }
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
    const foundRect = this.data.rects.find(item => item.indexRect === index);
    
    return foundRect ? 
      this.data.pallete[foundRect.indexColor!] :
      undefined;
  }

  public getCurrentColorIndex(index: number): number | undefined {
    const foundRect = this.data.rects.find(item => item.indexRect === index);
    
    return foundRect && foundRect.currentColorIndex !== undefined ? 
      foundRect.currentColorIndex :
      undefined;
  }

  public getCurrentColor(index: number): string | undefined {
    const foundRect = this.data.rects.find(item => item.indexRect === index);
    
    return foundRect && foundRect.currentColorIndex !== undefined ? 
      this.data.pallete[foundRect.currentColorIndex] :
      undefined;
  }

  public getColorIndex(index: number): number | undefined {
    const foundRect = this.data.rects.find(item => item.indexRect === index);

    return foundRect ? foundRect.indexColor : undefined;
  } 

  // handlers

  @action handleFilling(index: number): string | undefined {
    if (colorStore.isClear) {
      this.clearRect(index);
      return;
    }

    this.addRect(index, colorStore.selectedColor);

    return colorStore.selectedColor;
  }
   
}

export default new ColoringStore();