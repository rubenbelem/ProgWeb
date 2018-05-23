class Entity {
	constructor(className) {
		this.element = document.createElement('div');
		this.element.className = className;
		this.element.style.top = constants.SIZE_Y + 'px';
		
		this.element.style.backgroundRepeat = 'no-repeat';
		this.element.style.left = Math.floor(Math.random() * constants.SIZE_X) + 'px';
		this.mustBeDrawn = true;
		this.wasHitBySkier = false;
	}

	finalizeSprite() {
		// origem do código: https://stackoverflow.com/questions/3098404/get-the-size-of-a-css-background-image-using-javascript/11511828
		
		let style = window.getComputedStyle(this.element, null);
		let src = style.backgroundImage.slice(4, -1).replace(/"/g, '');
		let image = new Image();
		image.src = src;
		this.element.style.width = image.width.toString() + 'px';
		this.element.style.height = image.height.toString() + 'px';
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

	update(skierSpeed) {
		if (!this.mustBeDrawn) return;
		if (parseFloat(this.element.style.top) < -this.element.clientHeight) {
			this.mustBeDrawn = false;
		}

		this.element.style.top = parseFloat(this.element.style.top) - skierSpeed + 'px';
	}
}
