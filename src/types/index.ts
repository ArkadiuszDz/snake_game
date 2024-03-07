export enum Direction {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right'
}

export enum ArrowKeys {
  UP = 'ArrowUp',
  DOWN = 'ArrowDown',
  RIGHT = 'ArrowRight',
  LEFT = 'ArrowLeft'
}

export interface Cell {
  x: number;
  y: number;
}
