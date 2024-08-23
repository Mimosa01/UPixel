export type Point = {
  x: number;
  y: number;
}

export type Size = {
  width: number;
  height: number;
}

export const isCanvas = (v: unknown): v is HTMLCanvasElement => v instanceof HTMLCanvasElement;