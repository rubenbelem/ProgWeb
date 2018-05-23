class Skier {
	updateGraphicPosition() {
		this.element.style.top = this.top.toString() + 'px';
		this.element.style.left = this.left.toString() + 'px';
	}
	constructor() {
		this.speed = 3;
		this.element = document.getElementById('skier');
		this.direction = constants.SKIER_DIRECTION.FRONT; //0-esquerda;1-frente;2-direita
		this.element.className = this.direction;
		this.top = parseInt(constants.SIZE_Y / 2) - 100;
		this.left = parseInt(constants.SIZE_X / 2);
		this.updateGraphicPosition();
		this.walking = true;
		this.canStandUp = false;
	}

	getSpeed() {
		return this.speed;
	}

	isWalking() {
		return this.walking;
	}
	
	standUp() {
		if (this.canStandUp) {
			this.walking = true;
			this.canStandUp = false;
		}
	}

	changeDirection(direction) {
		// if (this.direction + direction >= 0 && this.direction + direction <= 2) {
		// 	this.direction += direction;
		// 	this.element.className = this.directions[this.direction];
		// }

		if (this.walking) {
			this.element.className = direction;
			this.direction = direction;
		}
	}	

	isOutOfBounds() {
		if (this.left + this.element.clientWidth > constants.SIZE_X) {
			this.left = constants.SIZE_X - this.element.clientWidth;
			return true;
		}

		if (this.left < 0) {
			this.left = 0;
			return true;
		}
		return false;
	}

	sufferTreeHit() {
		this.walking = false;
		this.element.className = 'skier-ouch';
		this.canStandUp = false;
		setTimeout(() => {
			this.element.className ='skier-after-tree-hit'; 
			setTimeout(() => this.canStandUp = true, 600);
		}, 1400);
	}

	walk() {
		if (this.isOutOfBounds()) return;
		if (!this.walking) return;

		if (this.direction === constants.SKIER_DIRECTION.LEFT) {
			this.left = parseInt(this.left) - this.speed;
		}
		if (this.direction === constants.SKIER_DIRECTION.RIGHT) {
			this.left = parseInt(this.left) + this.speed;
		}
		this.updateGraphicPosition();
	}
}