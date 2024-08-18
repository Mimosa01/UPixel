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
  containerSize: Size = {width: 0, height: 0};

  // вспомогательные параметры
  private _isScale: boolean = false;
  private _initialDiffFingers: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  @action setPosition(point: Point): void {
    this.position = point;
  }

  @action normalizeContainerPosition(): void {
    const positionDeltaY = (this.containerSize.height * this.scale - this.sceneSize.height) / 2;
    const positionDeltaX = (this.containerSize.width * this.scale - this.sceneSize.width) / 2;
    const centerScreenX = this.sceneSize.width / 2;
    const centerScreenY = this.sceneSize.height / 2;

    let newPosX: number = this.position.x;
    let newPosY: number = this.position.y;

    if ((this.containerSize.height * this.scale) < this.sceneSize.height) {
      newPosY = this.sceneSize.height / 2;
    }

    if ((this.containerSize.width * this.scale) < this.sceneSize.width) {
      newPosX = this.sceneSize.width / 2;
    }

    if (positionDeltaX > 0) {
      if (this.position.x < (centerScreenX - positionDeltaX)) {
        newPosX = this.position.x + (centerScreenX - this.position.x) - positionDeltaX;
      }
  
      if (this.position.x > (centerScreenX + positionDeltaX)) {
        newPosX = this.position.x + (centerScreenX - this.position.x) + positionDeltaX;
      }
    }

    if (positionDeltaY > 0) {
      if (this.position.y < (centerScreenY - positionDeltaY)) {
        newPosY = this.position.y + (centerScreenY - this.position.y) - positionDeltaY;
      }
  
      if (this.position.y > (centerScreenY + positionDeltaY)) {
        newPosY = this.position.y + (centerScreenY - this.position.y) + positionDeltaY;
      }
    }

      this.setPosition({
        x: newPosX,
        y: newPosY
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

    this.setPosition({
      x: (this.scale + scaleDelta) / this.scale * (this.position.x - event.clientX) + event.clientX, 
      y: (this.scale + scaleDelta) / this.scale * (this.position.y - event.clientY) + event.clientY,
    })
    
    this.scale += scaleDelta;
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

      this.setPosition({
        x: (this.scale / this._initialDiffFingers * currentDiffFingers) / this.scale * (this.position.x - centerTouches.x) + centerTouches.x, 
        y: (this.scale / this._initialDiffFingers * currentDiffFingers) / this.scale * (this.position.y - centerTouches.y) + centerTouches.y,
      })

      this.scale += scaleDelta;
      this._initialDiffFingers = currentDiffFingers;
    }
  }

  @action onTouchEnd(event: TouchEvent): void {
    console.log(event)
    this._isScale = false;
  }
}

const editorEventsStore = new EditorEventsStore();
export default editorEventsStore;
