import { action, makeAutoObservable } from "mobx";
import { Point } from "./types";
import editorSettingsStore from "./editorSettingsStore";

class MovingStore {
  private _isMove: boolean = false;
  private _initialPoint: Point = {x: 0, y: 0};

  constructor() {
    makeAutoObservable(this);
  }

  private getCurrentPoint(event: TouchEvent): Point {
    if (event.touches.length == 2) {
      const x_1 = event.touches[0].clientX;
      const x_2 = event.touches[1].clientX;

      const y_1 = event.touches[0].clientY;
      const y_2 = event.touches[1].clientY

      return {
        x: (x_1 + x_2) / 2 + (x_1 < x_2 ? x_1 : x_2),
        y: (y_1 + y_2) / 2 + (y_1 < y_2 ? y_1 : y_2)
      }
    } 

    return {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY
    }
  }
  
  @action onMoveTouchStart(event: TouchEvent): void {
    if (event.touches.length > 2) return

    this._initialPoint = this.getCurrentPoint(event);
  }

  @action onMoveTouch(event: TouchEvent): void {
    const currentPoint = this.getCurrentPoint(event);

    const minDistance = Math.hypot(
      this._initialPoint.x - currentPoint.x,
      this._initialPoint.y - currentPoint.y
    )

    editorSettingsStore.setPosition({
      x: editorSettingsStore.position.x - (this._initialPoint.x - currentPoint.x),
      y: editorSettingsStore.position.y - (this._initialPoint.y - currentPoint.y)
    })

    this._initialPoint = currentPoint

    if (minDistance > 15) {
      editorSettingsStore.setPosition({
        x: editorSettingsStore.position.x - (this._initialPoint.x - currentPoint.x),
        y: editorSettingsStore.position.y - (this._initialPoint.y - currentPoint.y)
      })
  
      this._initialPoint = currentPoint
    }
  }

  @action onMoveTouchEnd(): void {
    this._isMove = false;
    editorSettingsStore.normalizeContainerPosition();
  }

  @action onMovePointerStart(event: PointerEvent): void {
    this._isMove = true;
    this._initialPoint = {
      x: event.clientX,
      y: event.clientY
    }
  }

  @action onMovePointer(event: PointerEvent): void {
    if (!this._isMove) return;

    const minDistance = Math.hypot(
      this._initialPoint.x - event.clientX,
      this._initialPoint.y - event.clientY
    )

    if (minDistance > 15) {
      editorSettingsStore.setPosition({
        x: editorSettingsStore.position.x - (this._initialPoint.x - event.clientX),
        y: editorSettingsStore.position.y - (this._initialPoint.y - event.clientY)
      })
  
      this._initialPoint = {
        x: event.clientX,
        y: event.clientY
      }
    }
  }

  @action onMovePointerEnd(): void {
    this._isMove = false;
    editorSettingsStore.normalizeContainerPosition();
  }
}

export default new MovingStore();