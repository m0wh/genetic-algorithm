const N = 100;
const X_POS = 150;
const BOWL_SIZE = 20;
const JUMP_FORCE = 12;
const GRAVITY = 1;
const SPEED = 3;
const COLORS = ["#ed00b5", "#ad3bff", "#0a84ff", "#00c8d7", "#12bc00", "#ffe900", "#ff0039", "#ff9400"];
const GROUND_POS = 450;

let obstaclePos;
let bowls;

function setup () {
	createCanvas(800, 600);
	obstaclePos = width;
	bowls = [];
	for (let i = 0; i < N; i++) {
		bowls.push(createBowl({ jumpDistance: random(300) }));
	}
}

function draw () {
	background("#f9f9fa");
	translate(0, GROUND_POS);
	ground();
	scale(1, -1);

	bowls.forEach(bowl => {
		const distance = dist(obstaclePos, BOWL_SIZE/2, bowl.getX(), bowl.getY());
		bowl.update(distance);
	});

	obstaclePos -= SPEED;
	ellipse(obstaclePos, BOWL_SIZE/2, BOWL_SIZE, BOWL_SIZE);
	if (obstaclePos <= 0) {
		bowls = [];
		obstaclePos = width;
		for (let i = 0; i < N; i++) {
			bowls.push(createBowl({ jumpDistance: random(300) }));
		}
	}
}

const ground = () => {
	push();
	noStroke();
	fill("#d7d7db");
	rect(0, 0, width, height-GROUND_POS);
	pop();
}