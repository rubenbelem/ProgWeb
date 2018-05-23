class Tree {
	constructor() {
		this.element = document.createElement('div');
		this.element.className = 'tree';
		this.element.style.top = constants.SIZE_Y + 'px';
		this.element.style.left = Math.floor(Math.random() * constants.SIZE_X) + 'px';
	}
}