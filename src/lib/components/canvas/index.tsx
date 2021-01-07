import React, { useRef, useState, useEffect } from 'react';

// const DEVICE_PIXEL_RATIO = window.devicePixelRatio || 1;
const DEFAULT_TARGET_FRAMERATE = 120;

interface Props {
  targetFramerate?: number;
  noLoop?: boolean;
  onSetup?: (context: CanvasRenderingContext2D) => void;
  onPredraw?: (context: CanvasRenderingContext2D, deltaTime: number) => void;
  onDraw?: (context: CanvasRenderingContext2D, deltaTime: number) => void;
  onPostdraw?: (context: CanvasRenderingContext2D, deltaTime: number) => void;
}

export type CanvasProps = Props &
  React.DetailedHTMLProps<
    React.CanvasHTMLAttributes<HTMLCanvasElement>,
    HTMLCanvasElement
  >;

const Canvas: React.FC<CanvasProps> = ({
  targetFramerate = DEFAULT_TARGET_FRAMERATE,
  noLoop,
  onSetup,
  onPredraw,
  onDraw,
  onPostdraw,
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

  return <canvas ref={canvasRef} {...rest} />;
};

export default Canvas;
