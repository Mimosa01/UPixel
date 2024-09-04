import { action, makeAutoObservable } from "mobx";
import { Point } from "./types";
import editorSettingsStore from "./editorSettingsStore";
import handlerStore from "../handlerStore";

class MovingStore {
  private _isMove: boolean = false;
  private _initialPoint: Point = {x: 0, y: 0};

  constructor() {
    makeAutoObservable(this);
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
      handlerStore.isClick = false;
      handlerStore.isMove = true;

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