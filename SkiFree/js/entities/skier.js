class Skier {
	updateGraphicPosition() {
		this.element.style.top = this.top.toString() + 'px';
		this.element.style.left = this.left.toString() + 'px';
	}
	constructor() {
		this.element = document.getElementById('skier');
		this.direction = 1; //0-esquerda;1-frente;2-direita
		this.element.className = 'skier-front';

		this.top = 30.0;
		this.left = parseInt(constants.SIZE_X / 2) - 7;
		this.updateGraphicPosition();
		console.log(constants.SIZE_X);
		this.directions = ['skier-left', 'skier-front', 'skier-right'];
		
	}
	
	changeDirection(direction) {
		// if (this.direction + direction >= 0 && this.direction + direction <= 2) {
		// 	this.direction += direction;
		// 	this.element.className = this.directions[this.direction];
		// }
		this.element.className = direction;
		this.direction = direction;
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

	walk() {
		if (this.isOutOfBounds()) return;

		if (this.direction === constants.SKIER_DIRECTION.LEFT) {
			this.left = parseInt(this.left) - 2;
		}
		if (this.direction === constants.SKIER_DIRECTION.RIGHT) {
			this.left = parseInt(this.left) + 2;
		}
		
		this.updateGraphicPosition();
	}
}