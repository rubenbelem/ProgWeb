(function() {
	const FPS = 60;
	const TREE_PROB = 2;
	let gameLoop;
	let mountain;
	let skier;
	let trees = [];
	let cycle;

	function calculateDistanceTraveled(distanceTraveledinPixels) {
		return distanceTraveledinPixels / FPS;
	}

	function updateDistanceTraveledOnScoreBoard() {
		document.getElementById('traveledDistance').innerHTML = calculateDistanceTraveled(skier.getDistanceTraveledInPixels()).toFixed(2);

		document.getElementById('speedVisualization').innerHTML = skier.getSpeed().toFixed(2);
	}

	function init() {
		mountain = new Mountain();
		skier = new Skier();
		gameLoop = setInterval(run, 1000 / FPS);
		cycle = 1;
		
		updateDistanceTraveledOnScoreBoard();
		setInterval(updateDistanceTraveledOnScoreBoard, 1000);
	}

	window.addEventListener('keydown', function(e) {
		if (e.key === 'ArrowLeft') skier.changeDirection(constants.SKIER_DIRECTION.LEFT);
		else if (e.key === 'ArrowRight') skier.changeDirection(constants.SKIER_DIRECTION.RIGHT);
		else if (e.key === 'ArrowDown') {
			if (!skier.isWalking()) skier.standUp();
			skier.changeDirection(constants.SKIER_DIRECTION.FRONT);
		}
		else if (e.key === 'f') skier.turboOn();
	});

	window.addEventListener('keyup', function(e) {
		if (e.key === 'f') skier.turboOff();
	});

	function skierHitByTreeAction() {
		skier.sufferTreeHit();
	}

	function run() {
		

		if (skier.isWalking()) {
			let random = Math.floor(Math.random() * 1000);
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
