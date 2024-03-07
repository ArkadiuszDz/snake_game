import { Cell, Direction } from "../types";
import { Board } from "./board";
import { Food } from "./food";

export class Snake {
  private snake: Cell[];
  private cellHeight: number;
  private cellWidth: number;
  private snakeColor: string;
  private isOutOfBounds: boolean;
  private isBitingTail: boolean;
  private direction: Direction;
  private initialPosition: Cell[];
  private initialDirection: Direction;

  constructor(
    initialPosition: Cell[],
    cellWidth: number,
    cellHeight: number,
    snakeColor: string = 'green',
    direction: Direction = Direction.RIGHT
  ) {
    this.snake = initialPosition;
    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight;
    this.snakeColor = snakeColor;
    this.isOutOfBounds = false;
    this.isBitingTail = false;
    this.direction = direction;
    this.initialPosition = initialPosition;
    this.initialDirection = direction;
  };

  getCellWidth() {
    return this.cellWidth;
  };

  getCellHeight() {
    return this.cellHeight;
  };

  getSnake() {
    return this.snake;
  };

  getIsOutOfBounds() {
    return this.isOutOfBounds;
  };

  getIsBitingTail() {
    return this.isBitingTail;
  };

  getDirection() {
    return this.direction;
  }

  setIsOutOfBounds(isOutOfBounds: boolean) {
    this.isOutOfBounds = isOutOfBounds;
  };

  setIsBitingTail(isBitingTail: boolean) {
    this.isBitingTail = isBitingTail;
  }

  setSnake(snake: Cell[]) {
    this.snake = snake;
  };

  setDirection(direction: Direction) {
    this.direction = direction;
  }

  reset() {
    this.setSnake(this.initialPosition);
    this.setIsBitingTail(false);
    this.setIsOutOfBounds(false);
    this.setDirection(this.initialDirection);
  }

  private moveHead(snakeHead: Cell) {
    switch (this.direction) {
      case Direction.RIGHT:
        snakeHead.x += this.cellWidth;
        break;
      case Direction.LEFT:
        snakeHead.x -= this.cellWidth;
        break;
      case Direction.UP:
        snakeHead.y -= this.cellHeight;
        break;
      case Direction.DOWN:
        snakeHead.y += this.cellHeight;
        break;
    };
  }

  grow() {
    const snakeHead = { ...this.snake[this.snake.length - 1] };

    this.moveHead(snakeHead);
    
    const newSnake = [ ...this.snake, snakeHead ];
    this.setSnake(newSnake);
  }

  drawSnake(context:CanvasRenderingContext2D, snake: Cell[]) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = this.snakeColor;
    context.strokeStyle = 'black';
    snake.forEach(cell => {
      context.fillRect(cell.x, cell.y, this.cellWidth, this.cellHeight);
      context.strokeRect(cell.x, cell.y, this.cellWidth, this.cellHeight);
    });
  };

  checkIsOutOfBounds(snake: Cell[], board: Board) {
    const snakeHead = snake[snake.length -1];
    if (
      snakeHead.x + this.cellWidth > board.getBoardWidth() ||
      snakeHead.y + this.cellHeight > board.getBoardHeight() ||
      snakeHead.x < 0 ||
      snakeHead.y < 0
    ) {
      this.setIsOutOfBounds(true);
    }
  };
  
  checkIsBitingTail(snake: Cell[]) {
    const snakeHead = snake[snake.length - 1];
    const tailLength = snake.length - 1;
    for (let i = 0; i < tailLength; i++) {
      if (snake[i].x === snakeHead.x && snake[i].y === snakeHead.y) {
        this.setIsBitingTail(true);
      }
    }
  };

  moveSnake(positions: Cell[], food: Food, board: Board) {
    const newSnake = [ ...positions ];
    const snakeHead = { ...newSnake[newSnake.length - 1] };
    this.moveHead(snakeHead);
    newSnake.shift();
    newSnake.push(snakeHead);
    const foodPosition = food.getPosition();
    this.setSnake(newSnake);
    if (snakeHead.x === foodPosition.x && snakeHead.y === foodPosition.y) {
      this.grow();
      food.generatePosition(board);
    }
  }
  
};
