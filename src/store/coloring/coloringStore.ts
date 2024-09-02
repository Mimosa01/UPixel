import { action, makeAutoObservable, observable } from "mobx";
import { ColoringType } from "../../types/coloringType";

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
   
}

export default new ColoringStore();