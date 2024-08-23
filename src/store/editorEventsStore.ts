import { action, makeAutoObservable, observable } from "mobx";

type Point = {
  x: number;
  y: number;
}

type Size = {
  width: number;
  height: number;
}

class EditorEventsStore {
  @observable scale: number = 1;
  @observable position: Point = {x: 10000, y: 10000};

  // настраиваемые параметры
  maxScale: number = 1;
  sceneSize: Size = {width: 0, height: 0};
  containerSize: number = 0;

  // вспомогательные параметры
  private _isScale: boolean = false;
  private _initialDiffFingers: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  @action setPosition(point: Point): void {
    this.position = point;
  }

  // || this.scale <= 1

  private normalizeContainerPosition(): void {
    const minTreshold: Point = {x: 0, y: 0};
    const maxTreshold: Point = {x: this.sceneSize.width, y: this.sceneSize.height};

    const delta = this.containerSize * this.scale / 2;

    // possible
    const leftBorder = Math.round(this.position.x - delta);
    const rightBorder = Math.round(this.position.x + delta);
    const topBorder = Math.round(this.position.y - delta);
    const bottomBorder = Math.round(this.position.y + delta);

    let newPosX: number = this.position.x;
    let newPosY: number = this.position.y;

    if (this.containerSize * this.scale > this.sceneSize.width) {
      if (leftBorder > minTreshold.x) {
        newPosX -= leftBorder;
      }

      if (rightBorder < maxTreshold.x) {
        newPosX += (maxTreshold.x - rightBorder);
      } 
    } else {
      newPosX = this.sceneSize.width / 2;
    }

    if (this.containerSize * this.scale > this.sceneSize.height) {
      if (topBorder > minTreshold.y) {
        newPosY -= topBorder;
      }

      if (bottomBorder < maxTreshold.y) {
        newPosY += (maxTreshold.y - bottomBorder);
      } 
    } else {
      newPosY = this.sceneSize.height / 2
    }

    this.setPosition({
      x: newPosX,
      y: newPosY
    })
  }

  private offsetScale(scale: number, nexScale: number, point: Point): void {
    const zoomSize = (this.containerSize * nexScale - this.containerSize * scale) / 2;
    const deltaCenterX = (point.x - this.position.x) * 100 / (this.containerSize * scale / 2);
    const deltaCenterY =  (point.y - this.position.y) * 100 / (this.containerSize * scale / 2);

    const offsetX = zoomSize * deltaCenterX / 100;
    const offsetY = zoomSize * deltaCenterY / 100;

    this.setPosition({
      x: this.position.x - offsetX,
      y: this.position.y - offsetY
    })
  }

  @action wheelScale(event: WheelEvent): void {
    const scaleStep = 0.15;
    let scaleDelta: number = 0;

    if (event.deltaY < 0 && this.scale > 1) {
      scaleDelta = -scaleStep
    } 
    else if (event.deltaY > 0 && this.scale < this.maxScale) {
      scaleDelta = scaleStep
    }

    const nextScale: number = this.scale + scaleDelta;

    this.offsetScale(this.scale, nextScale, {x: event.clientX, y: event.clientY});
    
    this.scale = Number(nextScale.toFixed(2));
    this.normalizeContainerPosition();
  }

  @action onTouchStart(event: TouchEvent): void {
    if (event.touches.length === 2) {
      this._isScale = true;

      this._initialDiffFingers = Math.hypot(
        (event.touches[1].clientX - event.touches[0].clientX),
        (event.touches[1].clientY - event.touches[0].clientY),
      )
    }
  }

  @action onTouchMove(event: TouchEvent): void {
    if (this._isScale) {
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

      if (this._initialDiffFingers < currentDiffFingers && this.scale < this.maxScale) {
        scaleDelta = scaleStep
      }
      else if (this._initialDiffFingers > currentDiffFingers && this.scale > 1) {
        scaleDelta = -scaleStep
      } 
      else {
        return;
      }

      const nextScale = this.scale + scaleDelta;

      this.offsetScale(this.scale, nextScale, {x: centerTouches.x, y: centerTouches.y});

      this.scale = nextScale;
      this._initialDiffFingers = currentDiffFingers;
    }
  }

  @action onTouchEnd(): void {
    this._isScale = false;
    this.normalizeContainerPosition();
  }
}

const editorEventsStore = new EditorEventsStore();
export default editorEventsStore;
