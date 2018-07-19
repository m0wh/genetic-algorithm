const N = 70;
const X_POS = 150;
const BOWL_SIZE = 5;
const BAD_BOWL_SIZE = 20;
const JUMP_FORCE = 8;
const GRAVITY = 1;
const SPEED = 4;
const COLORS = ["#ed00b5", "#ad3bff", "#0a84ff", "#00c8d7", "#12bc00", "#ffe900", "#ff0039", "#ff9400"];
const GROUND_POS = 450;
let learningRate = .5;
let stats = []

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
		const distance = dist(obstaclePos, BAD_BOWL_SIZE/2, bowl.x, bowl.y);
		bowl.update(distance);
	});

	obstaclePos -= SPEED;
	drawObstacle(obstaclePos, BAD_BOWL_SIZE/2);

	if (obstaclePos <= 0) {
		lifeEnd();
	}
}

const ground = () => {
	push();
	noStroke();
	fill("#d7d7db");
	rect(0, 0, width, height-GROUND_POS);
	pop();
}

const drawObstacle = (x, y) => {
	push();
	noStroke();
	fill("#0f1126");
	ellipse(x, y, BAD_BOWL_SIZE, BAD_BOWL_SIZE);
	pop();
}

const lifeEnd = () => {
	const aliveBowls = bowls.filter(bowl => bowl.alive).sort((a, b) => a.error < b.error);
	const parents = aliveBowls.slice(0, 2).map(parent => parent.dna.jumpDistance);
	const simil = random();
	const perfectMix = parents[0] * (1 - simil) + parents[1] * simil;
	mutationQuantity = learningRate - aliveBowls.length * learningRate / N;
	
	stats.push({ Efficiency: aliveBowls.length * 100/ N, Jump_Distance: perfectMix, Learning_Rate: mutationQuantity });
	console.clear();
	console.table(stats);
		
	bowls = [];
	obstaclePos = width;
	for (let i = 0; i < N; i++) {
		const mutation = random(1 - mutationQuantity, 1 + mutationQuantity);
		bowls.push(createBowl({ jumpDistance: perfectMix * mutation }));
	}
}