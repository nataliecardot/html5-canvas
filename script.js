const canvas = document.querySelector('#draw');
// You don't draw directly on canvas, but on the context
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Color
ctx.strokeStyle = '#BADA55';
// Determines shape used to join two line segments where they meet (default: miter, which creates a sharp corner)
ctx.lineJoin = 'round';
// Determines shape used to draw the end points of lines (default: butt, which adds flat edge to end of each line)
ctx.lineCap = 'round';
ctx.lineWidth = 100;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
// Degree on color wheel - 0 to 360 (red to red)
let hue = 0;

function draw(e) {
  if (!isDrawing) return; // Stop fn from funning when not moused down
  // console.log(e);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  // (starting location) moveTo() moves path to specified point on canvas without creating a line
  ctx.moveTo(lastX, lastY);
  // (destination) lineTo() adds a new point and creates a line TO that point FROM the last specified point on the canvas (this method does not draw the line; stroke() method does this)
  ctx.lineTo(e.offsetX, e.offsetY);
  // Draws path defined using moveTo() and lineTo() methods
  ctx.stroke();
  // Update X and Y (destructuring an array - set two variables in one line)
  [lastX, lastY] = [e.offsetX, e.offsetY];
  // Note - if it exceeds 360, it's "wrapped back" to range of 0 to 360, so resetting it as done below isn't really necessary
  hue++;
  if (hue >= 360) {
    hue = 0;
  }
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  // As soon as user holds mouse down, update lastX and lastY so moveTo() doesn't start at default 0, 0;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => (isDrawing = false));
// To prevent scenario of mouse leaving window and comes back, interpreted as mouse still down because never triggered mouseup
canvas.addEventListener('mouseout', () => (isDrawing = false));
