import { action, makeAutoObservable } from "mobx";
import scaleStore from "./editor/scaleStore";
import movingStore from "./editor/movingStore";
import colorStore from "./colorStore";
import saveColoringStore from "./coloring/saveColoringStore";

class HandlerStore {
  private _isMove: boolean = false;
  private _isScale: boolean = false;
  private _isClick: boolean = true;

  constructor() {
    makeAutoObservable(this);

    document.addEventListener('wheel', (event) => scaleStore.wheelScale(event));

    document.addEventListener('pointerdown', (event) => {   
      movingStore.onMovePointerStart(event);

      document.addEventListener('pointermove', this.moveHandler.bind(this), false);

      document.addEventListener('pointerup', () => {
        movingStore.onMovePointerEnd();
        this._isMove = false;
        this._isClick = true;

        document.removeEventListener('pointermove', this.moveHandler.bind(this), false);
      });

    });

    document.addEventListener('touchstart', (event) => {
      if (event.touches.length > 1 && !this._isMove) {
        this._isScale = true;
        this._isClick = false;
        scaleStore.onScaleStart(event);

        document.addEventListener('touchmove', (event) => {
          scaleStore.onScaleMove(event)
        });

        document.addEventListener('touchend', () => {
          scaleStore.onScaleEnd();
          this._isScale = false;
        });
      }
    });
  }

  @action handleFilling(index: number): string | undefined {
    this._isClick = false;
    
    if (colorStore.isClear) {
      saveColoringStore.clearRect(index);

      this._isClick = true;
      return;
    }

    saveColoringStore.addRect(index, colorStore.selectedColor);

    this._isClick = true;

    return colorStore.selectedColor;
  }

  private moveHandler(event: PointerEvent): void {
    if (!this._isScale) {
      movingStore.onMovePointer(event);
    }
  }

  public get isMove(): boolean {
    return this._isMove;
  }

  public set isMove(value: boolean) {
    this._isMove = value;
  }

  public get isScale(): boolean {
    return this._isScale;
  }

  public get isClick(): boolean {
    return this._isClick;
  }

  public set isClick(value: boolean) {
    this._isClick = value;
  }
}

export default new HandlerStore();