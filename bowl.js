const createBowl = ({ jumpDistance } = {}) => {
	const decal = random(-X_POS + BOWL_SIZE, N * 2);
	const color = random(COLORS)
	const x = X_POS + decal;
	let y = 0;
	let speed = 0;
	let jumping = false;
	let jumped = false;
	let dead = false;

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
		getX: () => x,
		getY: () => y,

		update: obstacleDistance => {
			if (obstacleDistance <= jumpDistance && !jumped) {
				console.log("jump !");
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
			if (obstacleDistance > BOWL_SIZE) {
				if (!dead) show();
			} else {
				die();
			}
		}
	}
}