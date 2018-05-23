class Tree {
	constructor() {
		this.element = document.createElement('div');
		this.element.className = 'tree';
		this.element.style.top = constants.SIZE_Y + 'px';
		this.element.style.left = Math.floor(Math.random() * constants.SIZE_X) + 'px';
		this.mustBeDrawn = true;
		this.wasHitBySkier = false;
	}

	update(skierSpeed) {
		if (!this.mustBeDrawn) return;
		if (parseFloat(this.element.style.top) < -this.element.clientHeight) {
			this.mustBeDrawn = false;
		}
		
		this.element.style.top = parseFloat(this.element.style.top) - skierSpeed + 'px';
	}

	checkCollisionWithSkier(skier) {
		let rectA = new Rectangle(parseFloat(this.element.style.top), parseFloat(this.element.style.left), this.element.clientWidth, this.element.clientHeight);
		let rectB = new Rectangle(skier.top, skier.left, skier.element.clientWidth, skier.element.clientHeight);
		
		if (rectA.x1 < rectB.x2 && rectA.x2 > rectB.x1 && rectA.y1 < rectB.y2 && rectA.y2 > rectB.y1) {
			this.wasHitBySkier = true;
			return true;
		}

		return false;
	}
}