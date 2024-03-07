import { useEffect, useRef, useState } from 'react';
import { useKeyEvent } from '../hooks/useKeyEvent';
import { gameBoard, snake, food } from '../game';
import { keyHandler, play } from '../utils/functions';

const Board = () => {

  const boardRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useKeyEvent(keyHandler(snake));

  useEffect(() => {
    if (!boardRef.current) {
      return;
    }
    setContext(boardRef.current.getContext("2d"))
  }, [boardRef]);

  useEffect(() => {
    if (!context) {
      return;
    }
    snake.drawSnake(context, snake.getSnake());
  }, [context]);

  return (
    <div>
      <canvas
        ref={element => boardRef.current = element}
        height={gameBoard.getBoardHeight()}
        width={gameBoard.getBoardWidth()}
        style={{ border: '1px solid black' }}
      />
      <div>
        <button
          disabled={!gameOver}
          onClick={() => {
          if (!context) {
            return;
          }
          snake.reset();
          snake.drawSnake(context, snake.getSnake());
          setGameOver(false);
          setIsPlaying(false);
        }}>Reset</button>
        <button
          disabled={isPlaying}
          onClick={() => {
            setIsPlaying(true);
            if (!context) {
              return;
            }
            intervalRef.current = setInterval(play(snake, food, gameBoard, context, intervalRef, () => setGameOver(true)), 100);
          }}
        >Start</button>
      </div>
    </div>
  );
};

export default Board;
