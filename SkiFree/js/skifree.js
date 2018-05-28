(function() {
	let gameLoop;
	let mountain;
	let skier;
	let entities = [];
	let cycle;
	let traveledDistanceElement;
	let speedVisualizationElement;
	let debugElement;

	function calculateDistanceTraveled(distanceTraveledinPixels) {
		return distanceTraveledinPixels / constants.FPS * 10;
	}

	function updateDistanceTraveledOnScoreBoard() {
		traveledDistanceElement.innerHTML = calculateDistanceTraveled(skier.getDistanceTraveledInPixels()).toFixed(2);
		speedVisualizationElement.innerHTML = skier.getSpeed().toFixed(2) * 10;
	}

	function init() {
		mountain = new Mountain();
		skier = new Skier();

		gameLoop = setInterval(run, 1000 / constants.FPS);
		cycle = 1;
		debugElement = document.getElementById('debug');
		traveledDistanceElement = document.getElementById('traveledDistance');
		speedVisualizationElement = document.getElementById('speedVisualization');
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

	function generateObstacles() {
		let obstacleIndex = Math.floor(Math.random() * 100) % constants.OBSTACLE_MAP.length;
		let obstacleInfo = constants.OBSTACLE_MAP[obstacleIndex];
		
		let random = Math.floor(Math.random() * 1000);

		if (random <= obstacleInfo.probability * 10) {
			entities.push(new Entity(obstacleInfo.name));
			mountain.element.appendChild(entities[entities.length - 1].element);
		}
	}

	function run() {
		if (skier.isWalking()) {
			generateObstacles();
	
			skier.walk();

			entities.forEach(function(obstacle, index, obj) {
				if (obstacle.mustBeDrawn) {
					obstacle.update(skier.getSpeed());
				} else {
					obj.splice(index, 1); // remove do array de árvores aquela que está fora da tela
				}
			});

			// Checagem de colisões
			// Esse código precisou ser feito em outro forEach porque senão todas as árvores no array após a que foi colidida não seria atualizadas até que o skier voltasse a andar
			// Isso considerando que é preciso atualizar todas as árvores para então checar as colisões
			entities.forEach(function(obstacle) {
				if (!obstacle.wasHitBySkier) {
					// para garantir que o skier não acertará essa mesma árvore assim que se levantar
					if (obstacle.checkCollisionWithSkier(skier)) {
						skier.sufferTreeHit();
					}
				}
			});
		}
	}

	init();
}());
