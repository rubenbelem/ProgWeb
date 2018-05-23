(function() {
	const FPS = 50;
	const SIZE_X = 300;
	const SIZE_Y = 400;
	const TREE_PROB = 2;
	var gameLoop;
	var mountain;
	var skier;
	var directions = ['skier-left', 'skier-front', 'skier-right'];
	var trees = [];

	function init() {
		mountain = new Mountain(SIZE_X, SIZE_Y);
		skier = new Skier();
		gameLoop = setInterval(run, 1000 / FPS);
	}

	window.addEventListener('keydown', function(e) {
		if (e.key === 'a') skier.changeDirection(-1);
		else if (e.key === 'd') skier.changeDirection(1);
	});

	function Skier() {
		this.element = document.getElementById('skier');
		this.direction = 1; //0-esquerda;1-frente;2-direita
		this.element.className = 'skier-front';
		this.element.style.top = '30px';
		this.element.style.left = parseInt(SIZE_X / 2) - 7 + 'px';

		this.changeDirection = function(giro) {
			if (this.direction + giro >= 0 && this.direction + giro <= 2) {
				this.direction += giro;
				this.element.className = directions[this.direction];
			}
		};

		this.walk = function() {
			if (this.direction === 0) {
				this.element.style.left = parseInt(this.element.style.left) - 1 + 'px';
			}
			if (this.direction === 2) {
				this.element.style.left = parseInt(this.element.style.left) + 1 + 'px';
			}
		};
	}

	function Tree() {
		this.element = document.createElement('div');
		mountain.element.appendChild(this.element);
		this.element.className = 'tree';
		this.element.style.top = SIZE_Y + 'px';
		this.element.style.left = Math.floor(Math.random() * SIZE_X) + 'px';
	}

	function run() {
		var random = Math.floor(Math.random() * 1000);
		if (random <= TREE_PROB * 10) {
			var tree = new Tree();
			trees.push(tree);
		}
		trees.forEach(function(a) {
			a.element.style.top = parseInt(a.element.style.top) - 1 + 'px';
		});
		skier.walk();
	}

	init();
})();
