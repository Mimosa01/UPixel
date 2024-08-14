import { action, observable } from "mobx";
import * as PIXI from 'pixi.js';

class EditorEventsStore {
  @observable options = {
    scale: 1
  };

  @action scaleWheel(event: PIXI.FederatedWheelEvent, setScale: React.Dispatch<React.SetStateAction<number>>) {
    if (event.deltaY > 0 && this.options.scale < 3) {
      this.options.scale += 0.05;
    } else if (event.deltaY < 0 && this.options.scale > 1){
      this.options.scale -= 0.05;
    }

    setScale(this.options.scale);
  }
}

export default new EditorEventsStore();