import { makeAutoObservable } from "mobx";
import scaleStore from "./scaleStore";
import movingStore from "./movingStore";

class HandlerStore {
  private _isMove: boolean = true;

  constructor() {
    makeAutoObservable(this);

    document.addEventListener('wheel', (event) => scaleStore.wheelScale(event));

    document.addEventListener('pointerdown', (event) => movingStore.onMovePointerStart(event));
    document.addEventListener('pointermove', (event) => {
      if (this._isMove) {
        event.preventDefault();
        movingStore.onMovePointer(event);
      }
    });
    document.addEventListener('pointerup', () => {
      if (this._isMove) {
        movingStore.onMovePointerEnd();
      }
    });

    document.addEventListener('touchstart', (event) => {
      if (event.touches.length > 1) {
        event.preventDefault();
        this._isMove = false;
        scaleStore.onScaleStart(event);
      }
    });

    document.addEventListener('touchmove', (event) => {
      if (!this._isMove) {
        event.preventDefault();
        scaleStore.onScaleMove(event)
      }
    });
    document.addEventListener('touchend', () => {
      if (!this._isMove) {
        scaleStore.onScaleEnd();
        this._isMove = true;
      }
    });
  }
}

export default new HandlerStore();