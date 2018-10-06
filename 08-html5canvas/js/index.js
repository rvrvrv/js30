const canvas = document.getElementById("draw");
const erase = document.getElementById("erase");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 5;
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let dir = true;

function draw(e) {
	if (!isDrawing) return;
	// Rainbow colors
	hue = hue > 360 ? 0 : (hue += 0.3);
	// Varying line width
	if (ctx.lineWidth < 5 || ctx.lineWidth > 50) dir = !dir;
	ctx.lineWidth = dir ? (ctx.lineWidth += 0.2) : (ctx.lineWidth -= 0.2);
	ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
	ctx.beginPath();
	// Starting coordinates
	ctx.moveTo(lastX, lastY);
	// Ending coordinates
	ctx.lineTo(e.offsetX, e.offsetY);
	// Draw line
	ctx.stroke();
	ctx.save();
	// Reset coordinates
	[lastX, lastY] = [e.offsetX, e.offsetY];
}

// Handle drawing motions
canvas.addEventListener("mousedown", (e) => {
	isDrawing = true;
	// Set starting coordinates
	[lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseleave", () => (isDrawing = false));

// Erase button
erase.onclick = () => {
	canvas.classList.add("animated-exit");
	setTimeout(() => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		canvas.classList.remove("animated-exit");
	}, 1000);
};
