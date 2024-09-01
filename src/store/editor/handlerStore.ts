import { makeAutoObservable } from "mobx";
import scaleStore from "./scaleStore";
import movingStore from "./movingStore";

class HandlerStore {
  private _isMove: boolean = false;
  private _isScale: boolean = false;

  constructor() {
    makeAutoObservable(this);

    document.addEventListener('wheel', (event) => scaleStore.wheelScale(event));

    document.addEventListener('pointerdown', (event) => movingStore.onMovePointerStart(event));
    document.addEventListener('pointermove', (event) => {
      if (!this._isScale) {
        this._isMove = true;
        event.preventDefault();
        movingStore.onMovePointer(event);
      }
    });
    document.addEventListener('pointerup', () => {
      if (this._isMove) {
        movingStore.onMovePointerEnd();
        this._isMove = false;
      }
    });

    document.addEventListener('touchstart', (event) => {
      if (event.touches.length > 1 && !this._isMove) {
        event.preventDefault();
        this._isScale = true;
        scaleStore.onScaleStart(event);
      }
    });

    document.addEventListener('touchmove', (event) => {
      if (this._isScale) {
        event.preventDefault();
        scaleStore.onScaleMove(event)
      }
    });
    document.addEventListener('touchend', () => {
      if (this._isScale) {
        scaleStore.onScaleEnd();
        this._isScale = false;
      }
    });
  }

  public get isMove(): boolean {
    return this._isMove;
  }

  public get isScale(): boolean {
    return this._isScale;
  }
}

export default new HandlerStore();