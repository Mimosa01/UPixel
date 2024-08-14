import { action, makeAutoObservable, observable } from "mobx";
import * as PIXI from 'pixi.js';

class EditorEventsStore {
  @ observable scale: number = 1;
  pointerId: number;

  constructor() {
    makeAutoObservable(this);

    this.pointerId = -1;
  }

  @action scaleWheel(event: PIXI.FederatedWheelEvent) {
    if (event.deltaY > 0 && this.scale < 3) {
      this.scale += 0.05;
    } else if (event.deltaY < 0 && this.scale > 1){
      this.scale -= 0.05;
    }
  }

  @action scaleStartMobile(event: PIXI.FederatedPointerEvent) {
    this.pointerId = event.pointerId;
  }

  @action scaleMoveMobile(event: PIXI.FederatedPointerEvent) {
    if (event.pointerId !== this.pointerId) {
      alert('lol');
    }
  }

  @action scaleEndMobile() {
    this.pointerId = -1;
  }
}

export default new EditorEventsStore();