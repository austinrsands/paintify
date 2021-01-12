import React, { useRef, useState, useEffect, useCallback } from 'react';
import Vector from '../../../util/structures/vector';

const DEFAULT_TARGET_FRAMERATE = 120;
interface Props {
  targetFramerate?: number;
  noLoop?: boolean;
  onSetup?: (context: CanvasRenderingContext2D) => void;
  onPredraw?: (context: CanvasRenderingContext2D, deltaTime: number) => void;
  onDraw?: (context: CanvasRenderingContext2D, deltaTime: number) => void;
  onPostdraw?: (context: CanvasRenderingContext2D, deltaTime: number) => void;
  onZoom?: (direction: number, position: Vector) => void;
}

export type CanvasProps = Props &
  Omit<
    React.DetailedHTMLProps<
      React.CanvasHTMLAttributes<HTMLCanvasElement>,
      HTMLCanvasElement
    >,
    'ref'
  >;

/**
 * An HTML Canvas component that allows for easy drawing
 */
const Canvas: React.FC<CanvasProps> = ({
  targetFramerate = DEFAULT_TARGET_FRAMERATE,
  noLoop,
  onSetup,
  onPredraw,
  onDraw,
  onPostdraw,
  onWheel,
  onZoom,
  ...rest
}) => {
  // Reference to canvas element
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Drawing context
  const [
    drawingContext,
    setDrawingContext,
  ] = useState<CanvasRenderingContext2D | null>(null);

  // Used for calculating time between frames (delta time)
  const [frameTime, setFrameTime] = useState<number>(Date.now());
  const previousFrameTime = useRef<number | null>(null);

  // Store context
  useEffect(() => {
    if (canvasRef.current)
      setDrawingContext(canvasRef.current.getContext('2d'));
  }, []);

  // Call setup function
  useEffect(() => {
    if (drawingContext && onSetup) onSetup(drawingContext);
  }, [drawingContext, onSetup]);

  // Start animation loop
  useEffect(() => {
    // Don't animate if noLoop is true
    if (noLoop) return;

    // Used for clearing timeout
    let timeoutID: number;

    // Used for canceling animation frame request
    let requestID: number;

    // Runs animation loop with frequency based on target framerate
    const animate = () => {
      timeoutID = window.setTimeout(() => {
        requestID = requestAnimationFrame(animate);
      }, 1000 / targetFramerate);
      setFrameTime(Date.now());
    };

    // Start animating
    if (drawingContext) animate();

    // Perform cleanup
    // eslint-disable-next-line consistent-return
    return () => {
      if (requestID) cancelAnimationFrame(requestID);
      if (timeoutID) clearTimeout(timeoutID);
    };
  }, [drawingContext, noLoop, targetFramerate]);

  // Call drawing functions every frame
  useEffect(() => {
    if (previousFrameTime.current && drawingContext) {
      // Determine time between frames
      const deltaTime = (frameTime - previousFrameTime.current) / 1000;

      // Call functions
      if (onPredraw) onPredraw(drawingContext, deltaTime);
      if (onDraw) onDraw(drawingContext, deltaTime);
      if (onPostdraw) onPostdraw(drawingContext, deltaTime);
    }
    previousFrameTime.current = frameTime;
  }, [drawingContext, frameTime, onPredraw, onDraw, onPostdraw]);

  // Returns the given client position in canvas space
  const getPositionOnCanvas = useCallback(
    (pagePosition: Vector) => {
      if (!drawingContext) return null;
      const canvasRect = drawingContext.canvas.getBoundingClientRect();
      const position: Vector = {
        x:
          ((pagePosition.x - canvasRect.left) /
            (canvasRect.right - canvasRect.left)) *
          drawingContext.canvas.width,
        y:
          ((pagePosition.y - canvasRect.top) /
            (canvasRect.bottom - canvasRect.top)) *
          drawingContext.canvas.height,
      };
      return position;
    },
    [drawingContext],
  );

  // Handles scroll events
  const handleZoom = useCallback(
    (event: React.WheelEvent<HTMLCanvasElement>) => {
      // Call normal on wheel handler
      if (onWheel) onWheel(event);

      // Determine zoom direction and position and call zoom handler prop
      if (!onZoom) return;
      const position = getPositionOnCanvas({
        x: event.pageX,
        y: event.pageY,
      });
      if (!position) return;
      const direction = Math.sign(event.deltaY);
      onZoom(direction, position);
    },
    [getPositionOnCanvas, onWheel, onZoom],
  );

  return <canvas ref={canvasRef} onWheel={handleZoom} {...rest} />;
};

export default Canvas;
