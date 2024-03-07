import { Board } from "./board";
import { Food } from "./food";
import { Snake } from "./snake";
import { ArrowKeys, Direction } from "../types";

export const keyHandler = (snake: Snake) => (e: KeyboardEvent) => {
  if (e.key === ArrowKeys.DOWN) {
    if (snake.getDirection() !== Direction.DOWN && snake.getDirection() !== Direction.UP) {
      snake.setDirection(Direction.DOWN);
    }
  }
  if (e.key === ArrowKeys.LEFT) {
    if (snake.getDirection() !== Direction.LEFT && snake.getDirection() !== Direction.RIGHT) {
      snake.setDirection(Direction.LEFT);
    }
  }
  if (e.key === ArrowKeys.RIGHT) {
    if (snake.getDirection() !== Direction.LEFT && snake.getDirection() !== Direction.RIGHT) {
      snake.setDirection(Direction.RIGHT);
    }
  }
  if (e.key === ArrowKeys.UP) {
    if (snake.getDirection() !== Direction.DOWN && snake.getDirection() !== Direction.UP) {
      snake.setDirection(Direction.UP);
    }
  }
};

export const play = (
    snake: Snake,
    food: Food,
    gameBoard: Board,
    context: CanvasRenderingContext2D,
    intervalRef: React.MutableRefObject<NodeJS.Timer | undefined>,
    onGameOver: () => void
  ) => () => {
  snake.moveSnake(snake.getSnake(), food, gameBoard);
  snake.checkIsOutOfBounds(snake.getSnake(), gameBoard);
  snake.checkIsBitingTail(snake.getSnake());
  if (snake.getIsOutOfBounds() || snake.getIsBitingTail()) {
    onGameOver();
    return clearInterval(intervalRef.current);
  }
  snake.drawSnake(context, snake.getSnake());
  food.drawFood(context);
}
