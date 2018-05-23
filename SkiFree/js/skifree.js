(function() {
	const FPS = 60;
	const TREE_PROB = 2;
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
		else if (e.key === 'ArrowDown') {
			if (!skier.isWalking()) skier.standUp();
			skier.changeDirection(constants.SKIER_DIRECTION.FRONT);
		}
	});

	function skierHitByTreeAction() {
		skier.sufferTreeHit();
	}

	function run() {
		if (skier.isWalking()) {
			var random = Math.floor(Math.random() * 1000);
			if (random <= TREE_PROB * 10) {
				trees.push(new Tree());
				mountain.element.appendChild(trees[trees.length - 1].element);
			}
	
			skier.walk();

			trees.forEach(function(tree, index, obj) {
				if (tree.mustBeDrawn) {
					tree.update(skier.getSpeed());
				} else {
					obj.splice(index, 1); // remove do array de árvores aquela que está fora da tela
				}
			});

			// Checagem de colisões
			// Esse código precisou ser feito em outro forEach porque senão todas as árvores no array após a que foi colidida não seria atualizadas até que o skier voltasse a andar
			// Isso considerando que é preciso atualizar todas as árvores para então checar as colisões
			trees.forEach(function(tree) {
				if (!tree.wasHitBySkier) {
					// para garantir que o skier não acertará essa mesma árvore assim que se levantar
					if (tree.checkCollisionWithSkier(skier)) {
						skierHitByTreeAction();
					}
				}
			});
		}
	}

	init();
})();
