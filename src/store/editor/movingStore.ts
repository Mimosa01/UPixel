import { action } from "mobx";
import { Point } from "./types";
import editorSettingsStore from "./editorSettingsStore";

class MovingStore {
  private _isMove: boolean = false;
  private _initialPoint: Point = {x: 0, y: 0};
  
  @action onMoveTouchStart(event: TouchEvent): void {
    if (event.touches.length > 2) return
    this._isMove = true;

    // if (event.touches.length == 2) {
    //   this._initialPoint = {
    //     x: event.touches[1].clientX - event.touches[0].clientX,
    //     y: event.touches[1].clientY - event.touches[0].clientY
    //   }
    // } else if (event.touches.length == 1) {
    //   this._initialPoint = {
    //     x: event.touches[0].clientX,
    //     y: event.touches[0].clientY
    //   }
    // }
  }

  @action onMoveTouch(event: TouchEvent): void {
    if (!this._isMove) return;
    let currentPoint: Point = this._initialPoint; 

    // if (event.touches.length == 2) {
    //   currentPoint = {
    //     x: event.touches[1].clientX - event.touches[0].clientX,
    //     y: event.touches[1].clientY - event.touches[0].clientY
    //   }
    // } else if (event.touches.length == 1) {
    //   currentPoint = {
    //     x: event.touches[0].clientX,
    //     y: event.touches[0].clientY
    //   }
    // }

    const minDistance = Math.hypot(
      this._initialPoint.x - currentPoint.x,
      this._initialPoint.y - currentPoint.y
    );

    if (minDistance > 10) {
      editorSettingsStore.setPosition({
        x: currentPoint.x,
        y: currentPoint.y
      })
    }

  }

  @action onMoveTouchEnd(): void {
    this._isMove = false;
    editorSettingsStore.normalizeContainerPosition();
  }
}

export default new MovingStore();