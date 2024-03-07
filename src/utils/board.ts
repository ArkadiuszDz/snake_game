export class Board {
  private width: number;
  private height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getBoardWidth() {
    return this.width;
  }

  getBoardHeight() {
    return this.height;
  }
}