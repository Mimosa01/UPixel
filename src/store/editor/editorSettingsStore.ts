import { action, makeAutoObservable, observable } from "mobx";
import { Point } from "./types";
import { Size } from "./types";
import { gridCoordinates } from "../../utils/grid";

const MAX_CELLSIZE = 45;

class EditorSettingStore {
  
  @observable scale: number = 1;
  @observable position: Point = {x: 10000, y: 10000};

  sceneSize: Size = {width: 0, height: 0};
  containerSize: number = 0;
  cellSize: number = 0;
  pivot: number = 0;
  coordinatesRects: Point[] = [];

  maxScale: number = 1;

  constructor() {
    makeAutoObservable(this);
  }

  @action setPosition(point: Point): void {
    this.position = point;
  }

  @action startSettings(grid: number): void {
    const widthOrHeight = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
    const palleteHeight: HTMLElement = document.getElementById('pallete')!;
    
    this.sceneSize = {
      width: window.innerWidth,
      height: window.innerHeight - palleteHeight.clientHeight
    };
    this.cellSize = widthOrHeight / grid < MAX_CELLSIZE ? widthOrHeight / grid : MAX_CELLSIZE;
    this.maxScale = MAX_CELLSIZE / this.cellSize;
    this.containerSize = this.cellSize * grid;
    this.pivot = this.cellSize * grid / 2;
    this.coordinatesRects = gridCoordinates(grid, this.cellSize);
    this.position = {
      x: this.sceneSize.width / 2,
      y: this.sceneSize.height / 2
    };
  }

  public normalizeContainerPosition(): void {
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

}

export default new EditorSettingStore();