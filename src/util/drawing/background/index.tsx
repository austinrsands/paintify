/**
 * Fills the background of a canvas
 *
 * @param context the 2D graphics context to draw on
 */
export const fillBackground = (context: CanvasRenderingContext2D) => {
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
};
