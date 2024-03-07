import { Cell } from "../types";
import { Board } from "./board";

export class Food {
  private position: Cell;
  private cellWidth: number;
  private cellHeight: number;
  private foodColor: string;

  constructor(position: Cell, cellWidth: number, cellHeight: number, foodColor: string = 'red') {
    this.position = position;
    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight;
    this.foodColor = foodColor;
  }

  drawFood(context: CanvasRenderingContext2D) {
    context.clearRect(this.position.x, this.position.y, this.cellWidth, this.cellHeight);
    context.fillStyle = this.foodColor;
    context.fillRect(this.position.x, this.position.y, this.cellWidth, this.cellHeight);
  };

  getPosition() {
    return this.position;
  };

  generatePosition(board: Board) {
    const minX = 3 * this.cellWidth;
    const maxX = board.getBoardWidth() - 3 * this.cellWidth;
    const minY = 3 * this.cellHeight;
    const maxY = board.getBoardHeight() - 3 * this.cellHeight;
    const randomX = Math.round((Math.random() * (maxX - minX) + minX) / this.cellWidth) * this.cellWidth;
    const randomY = Math.round((Math.random() * (maxY - minY) + minY) / this.cellWidth) * this.cellWidth;
    this.position = { x: randomX, y: randomY }
  };
};
