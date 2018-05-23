(function() {
	const FPS = 60;
	const SIZE_X = 300;
	const SIZE_Y = 400;
	const TREE_PROB = 3;
	var gameLoop;
	var mountain;
	
	var skier;
	
	var trees = [];

	function init() {
		mountain = new Mountain();
		skier = new Skier();
		gameLoop = setInterval(run, 1000 / FPS);
	}

	window.addEventListener('keydown', function(e) {
		if (e.key === 'ArrowLeft') skier.changeDirection(constants.SKIER_DIRECTION.LEFT);
		else if (e.key === 'ArrowRight') skier.changeDirection(constants.SKIER_DIRECTION.RIGHT);
		else if (e.key === 'ArrowDown') skier.changeDirection(constants.SKIER_DIRECTION.FRONT);
	});

	function run() {
		var random = Math.floor(Math.random() * 1000);
		if (random <= TREE_PROB * 10) {
			var tree = new Tree();
			mountain.element.appendChild(tree.element);
			trees.push(tree);
		}
		trees.forEach(function(tree, index, obj) {
			if (tree.mustBeDrawn)
				tree.update(skier.getSpeed());
			else {
				obj.splice(index, 1);
			}
		});
		
		skier.walk();
	}

	init();
})();
