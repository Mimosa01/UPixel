import { action, makeAutoObservable } from "mobx";
import editorSettingsStore from "./editorSettingsStore";
import { isCanvas, Point } from "./types";

class ScaleStore {

  private _isScale: boolean = false;
  private _initialDiffFingers: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  private offsetScale(scale: number, nexScale: number, point: Point): void {
    const zoomSize = (editorSettingsStore.containerSize * nexScale - editorSettingsStore.containerSize * scale) / 2;
    const deltaCenterX = (point.x - editorSettingsStore.position.x) * 100 / (editorSettingsStore.containerSize * scale / 2);
    const deltaCenterY =  (point.y - editorSettingsStore.position.y) * 100 / (editorSettingsStore.containerSize * scale / 2);

    const offsetX = zoomSize * deltaCenterX / 100;
    const offsetY = zoomSize * deltaCenterY / 100;

    editorSettingsStore.setPosition({
      x: editorSettingsStore.position.x - offsetX,
      y: editorSettingsStore.position.y - offsetY
    })
  }

  @action wheelScale(event: WheelEvent): void {
    
    if (!isCanvas(event.target)) return;

    const scaleStep = 0.20;
    let scaleDelta: number = 0;

    if ((event.deltaY < 0 && editorSettingsStore.scale > 1)) {
      scaleDelta = -scaleStep
    }

    if (event.deltaY > 0 && editorSettingsStore.scale < editorSettingsStore.maxScale) {
      scaleDelta = scaleStep
    }

    const nextScale: number = editorSettingsStore.scale + scaleDelta;
    
    if (Number(nextScale.toFixed(2)) !== editorSettingsStore.scale) {

      this.offsetScale(editorSettingsStore.scale, nextScale, {x: event.clientX, y: event.clientY});
      editorSettingsStore.scale = Number(nextScale.toFixed(2));
      editorSettingsStore.normalizeContainerPosition();
      
    }
  }

  @action onScaleTouchStart(event: TouchEvent): void {
    if (!isCanvas(event.target)) return;
    
    if (event.touches.length === 2) {
      this._isScale = true;

      this._initialDiffFingers = Math.hypot(
        (event.touches[1].clientX - event.touches[0].clientX),
        (event.touches[1].clientY - event.touches[0].clientY),
      )
    }
  }

  public preScale(initialDiff: number): void {
    this._initialDiffFingers = initialDiff;
  }

  @action onScaleTouchMove(event: TouchEvent): void {
    if (!this._isScale) return;

    const scaleStep = 0.05;
    let scaleDelta: number = 0;

    const currentDiffFingers = Math.hypot(
      (event.touches[1].clientX - event.touches[0].clientX),
      (event.touches[1].clientY - event.touches[0].clientY),
    );

    const centerTouches: Point = {
      x: (event.touches[0].clientX + event.touches[1].clientX) / 2,
      y: (event.touches[0].clientY + event.touches[1].clientY) / 2
    }

    if (this._initialDiffFingers < currentDiffFingers && editorSettingsStore.scale < editorSettingsStore.maxScale) {
      scaleDelta = scaleStep
    }
    else if (this._initialDiffFingers > currentDiffFingers && editorSettingsStore.scale > 1) {
      scaleDelta = -scaleStep
    } 
    else {
      return;
    }

    const nextScale = editorSettingsStore.scale + scaleDelta;

    if (Number(nextScale.toFixed(2)) !== editorSettingsStore.scale) {
      this.offsetScale(editorSettingsStore.scale, nextScale, {x: centerTouches.x, y: centerTouches.y});
      editorSettingsStore.scale = Number(nextScale.toFixed(2));
    }

    this._initialDiffFingers = currentDiffFingers;
  }

  @action onScaleTouchEnd(): void {
    this._isScale = false;
    editorSettingsStore.normalizeContainerPosition();
  }
}

export default new ScaleStore();