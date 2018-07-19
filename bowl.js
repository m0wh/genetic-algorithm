const createBowl = ({ jumpDistance } = {}) => {
	const decal = random(-X_POS + BOWL_SIZE, width-300);
	const color = random(COLORS)
	const x = X_POS + decal;
	let y = 0;
	let speed = 0;
	let jumping = false;
	let jumped = false;
	let dead = false;
	let error = Infinity;

	const jump = () => {
		if (!jumping) {
			jumping = true;
			jumped = true;
			speed = JUMP_FORCE;
		}
	}

	const show = () => {
		push();
		noStroke();
		fill(color);
		ellipse(x, y + BOWL_SIZE/2, BOWL_SIZE, BOWL_SIZE);
		pop();
	}

	const die = () => {
		dead = true;
	}

	return {
		get x () { return x },
		get y () { return y },
		get error () { return error },
		get alive () { return !dead },
		get dna () { return { jumpDistance }},

		update: obstacleDistance => {
			error = error > obstacleDistance ? obstacleDistance : error;
			if (obstacleDistance <= jumpDistance && !jumped) {
				jump()
			};
			y += speed;
			if (jumping) {
				if (y <= 0) {
					y = 0;
					speed = 0;
					jumping = false
				} else {
					speed -= GRAVITY;
				};
			}
			if (obstacleDistance > (BOWL_SIZE + BAD_BOWL_SIZE)/2) {
				if (!dead) show();
			} else {
				die();
			}
		}
	}
}