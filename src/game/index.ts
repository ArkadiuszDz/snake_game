import { Board } from "../utils/board";
import { Snake } from "../utils/snake";
import { Food } from "../utils/food";
import { BOARD_WIDTH, BOARD_HEIGHT, CELL_WIDTH, CELL_HEIGHT, SNAKE_COLOR } from "./constants";

export const initialSnake = [
  {
    x: 40,
    y: 20,
  },
  {
    x: 60,
    y: 20,
  },
  {
    x: 80,
    y: 20,
  },
  {
    x: 100,
    y: 20,
  },
  {
    x: 120,
    y: 20,
  }
];

const initialFood = { x: 400, y: 400 };

export const gameBoard = new Board(BOARD_WIDTH, BOARD_HEIGHT);
export const snake = new Snake(initialSnake, CELL_WIDTH, CELL_HEIGHT, SNAKE_COLOR);
export const food = new Food(initialFood, CELL_WIDTH, CELL_HEIGHT,);
