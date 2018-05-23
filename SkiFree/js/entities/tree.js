class Tree {
	constructor() {
		this.element = document.createElement('div');
		this.element.className = 'tree';
		this.element.style.top = constants.SIZE_Y + 'px';
		this.element.style.left = Math.floor(Math.random() * constants.SIZE_X) + 'px';
		this.mustBeDrawn = true;
	}

	update(skierSpeed) {
		if (!this.mustBeDrawn) return;
		if (parseInt(this.element.style.top) < -this.element.clientHeight) {
			this.mustBeDrawn = false;
		}
		
		this.element.style.top = parseInt(this.element.style.top) - skierSpeed + 'px';
	}
}