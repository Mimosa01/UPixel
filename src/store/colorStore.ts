import { action, observable } from "mobx";

class ColorStore {
  @observable selectedColor: string = '';
  @observable isClear: boolean = false;

  @action setSelectedColor(color: string): void {
    if (this.isClear) {
      this.isClear = false;
    }

    this.selectedColor = color;
  }

  @action clearColor(): void {
    if (!this.isClear) {
      this.isClear = true;
    }
  }
}

export default new ColorStore();