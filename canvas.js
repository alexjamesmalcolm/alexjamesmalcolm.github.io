var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;

var center = {
	"x": width / 2,
	"y": height / 2
};

var points = [];

for (var i = 0; i < 50; i++) {
	var point = {
		"x": Math.random() * width,
		"y": Math.random() * height
	};
	points.push(point);
}
function background() {
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(0, height);
	ctx.lineTo(width, height);
	ctx.lineTo(width, 0);
	ctx.fill();
}

function physics() {}

function draw() {
	background();
	drawCenter();
	drawPins();
}

function drawCenter() {}

function drawPins() {
	for (var j = 0; j < 20; j++) {
		ctx.beginPath();
		ctx.moveTo(center.x, center.y);
		for (var i = 0; i < points.length; i++) {
			var point = points[i];
			ctx.lineTo(point.x, point.y);
		}
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#FFFFFF';
		ctx.stroke();
	}
}

function calculateSpindleDistance(point, center) {}

function loop() {
	physics();
	draw();
}

setInterval(loop(), 1000/60);