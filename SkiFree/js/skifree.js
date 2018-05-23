(function() {
	const FPS = 50;
	const SIZE_X = 300;
	const SIZE_Y = 400;
	const TREE_PROB = 2;
	var gameLoop;
	var mountain;
	var skier;
	
	var trees = [];

	function init() {
		mountain = new Mountain();
		skier = new Skier();
		console.log(skier);
		gameLoop = setInterval(run, 1000 / FPS);
	}

	window.addEventListener('keydown', function(e) {
		if (e.key === 'a') skier.changeDirection(constants.SKIER_DIRECTION.LEFT);
		else if (e.key === 'd') skier.changeDirection(constants.SKIER_DIRECTION.RIGHT);
		else if (e.key === 's') skier.changeDirection(constants.SKIER_DIRECTION.FRONT);
	});

	function run() {
		var random = Math.floor(Math.random() * 1000);
		if (random <= TREE_PROB * 10) {
			var tree = new Tree();
			mountain.element.appendChild(tree.element);
			trees.push(tree);
		}
		trees.forEach(function(a) {
			a.element.style.top = parseInt(a.element.style.top) - 1 + 'px';
		});
		skier.walk();
	}

	init();
})();
