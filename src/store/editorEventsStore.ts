import { action, makeAutoObservable, observable } from "mobx";

class EditorEventsStore {
  @observable scale: number = 1;

  // scale options
  maxScale: number = 1;
  private _isScaleMobile: boolean = false;
  private _initialDiffFingers: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  @action wheelScale(event: WheelEvent): void {
    if (event.deltaY < 0 && this.scale > 1) {
      this.scale -= 0.25;
    } 
    else if (event.deltaY > 0 && this.scale < this.maxScale) {
      this.scale += 0.25;
    }
  }

  @action onTouchStart(event: TouchEvent): void {
    if (event.touches.length === 2) {
      this._isScaleMobile = true;

      this._initialDiffFingers = Math.hypot(
        (event.touches[1].clientX - event.touches[0].clientX),
        (event.touches[1].clientY - event.touches[0].clientY),
      )
    }
  }

  @action onTouchMove(event: TouchEvent): void {
    if (this._isScaleMobile) {
      const currentDiffFingers = Math.hypot(
        (event.touches[1].clientX - event.touches[0].clientX),
        (event.touches[1].clientY - event.touches[0].clientY),
      );

      if (this._initialDiffFingers < currentDiffFingers && this.scale < this.maxScale) {
        this.scale += 0.05;
      }
      else if (this._initialDiffFingers > currentDiffFingers && this.scale > 1) {
        this.scale -= 0.05;
      }

      this._initialDiffFingers = currentDiffFingers;
    }
  }

  @action onTouchEnd(): void {
    this._isScaleMobile = false;
  }
}

export default new EditorEventsStore();
