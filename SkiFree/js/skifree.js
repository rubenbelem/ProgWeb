
	let gameLoop;
	let mountain;
	let skier;
	let entities = [];
	let cycle;
	let traveledDistanceElement;
	let speedVisualizationElement;
	let debugElement;
	let lifeRemainingElement;
	let monster;
	let isMonsterOnScreen;

	function calculateDistanceTraveled(distanceTraveledinPixels) {
		return distanceTraveledinPixels / constants.FPS * 10;
	}

	function updateSkierLifeOnScoreBoard() {
		lifeRemainingElement.innerHTML = skier.life;
	}

	function updateDistanceTraveledOnScoreBoard() {
		traveledDistanceElement.innerHTML = calculateDistanceTraveled(skier.getDistanceTraveledInPixels()).toFixed(2);
		speedVisualizationElement.innerHTML = skier.getSpeed().toFixed(2) * 10;
	}

	function init() {
		mountain = new Mountain();
		skier = new Skier();
		isMonsterOnScreen = false;
		gameLoop = setInterval(run, 1000 / constants.FPS);
		cycle = 1;
		distanceWalkedUntilMonsterAppears = 0;
		debugElement = document.getElementById('debug');
		traveledDistanceElement = document.getElementById('traveledDistance');
		speedVisualizationElement = document.getElementById('speedVisualization');
		lifeRemainingElement = document.getElementById('lifeRemaining');
		updateDistanceTraveledOnScoreBoard();
		updateSkierLifeOnScoreBoard();
		setInterval(updateDistanceTraveledOnScoreBoard, 1000);
	}

	window.addEventListener('keydown', function(e) {
        if (skier.isDead) return;
		if (e.key === 'ArrowLeft') skier.changeDirection(constants.SKIER_DIRECTION.LEFT);
		else if (e.key === 'ArrowRight') skier.changeDirection(constants.SKIER_DIRECTION.RIGHT);
		else if (e.key === 'ArrowDown') {
			if (!skier.isWalking()) skier.standUp();
			skier.changeDirection(constants.SKIER_DIRECTION.FRONT);
		}
		else if (e.key === 'f') skier.turboOn();
	});

	window.addEventListener('keyup', function(e) {
        if (skier.isDead) return;
		if (e.key === 'f') skier.turboOff();
	});

	function generateObstacles() {
		let obstacleIndex = Math.floor(Math.random() * 100) % constants.OBSTACLE_MAP.length;
		let obstacleInfo = constants.OBSTACLE_MAP[obstacleIndex];
		
		let random = Math.floor(Math.random() * 1000);

		if (random <= obstacleInfo.probability * 10) {
			let newObstacle;

			switch(obstacleInfo.name) {
				case 'mushroom': newObstacle = new Mushroom();
					break;
                case 'dog': newObstacle = new Dog();
                    break;
				default:
					newObstacle = new Entity(obstacleInfo.name);
			}

			entities.push(newObstacle);
			mountain.element.appendChild(entities[entities.length - 1].element);
		}
	}

	function stopUpdatingDogs() {
        entities.forEach(function(obstacle, index, obj) {
        	if (obstacle instanceof Dog) obstacle.stopUpdating();
        });
	}

	function run() {
        if (skier.isDead) return;
        entities.forEach(function (obstacle, index, obj) {
            if (obstacle.mustBeDrawn) {
                if (obstacle instanceof Dog)
                    obstacle.update(skier.getSpeed());
            } else {
                obj.splice(index, 1); // remove do array de árvores aquela que está fora da tela
            }
        });
        if (skier.isWalking()) {
            generateObstacles();

            skier.walk();

            entities.forEach(function (obstacle, index, obj) {
                if (obstacle.mustBeDrawn) {
                    if (!(obstacle instanceof Dog))
                		obstacle.update(skier.getSpeed());
                } else {
                    obj.splice(index, 1); // remove do array de árvores aquela que está fora da tela
                }
            });

            // Checagem de colisões
            // Esse código precisou ser feito em outro forEach porque senão todas as árvores no array após a que foi colidida não seria atualizadas até que o skier voltasse a andar
            // Isso considerando que é preciso atualizar todas as árvores para então checar as colisões
            entities.forEach(function (obstacle) {
                if (!obstacle.wasHitBySkier) {
                    // para garantir que o skier não acertará essa mesma árvore assim que se levantar
                    if (obstacle.checkCollisionWithSkier(skier)) {
                        if (obstacle instanceof Mushroom) {
                            skier.lifeUp();
                            obstacle.mustBeDrawn = false;
                            obstacle.element.style.visibility = "hidden";
                        }
                        else {
                            skier.sufferTreeHit();
                            if (skier.isDead) {
                                stopUpdatingDogs();
                                setTimeout(() => {
                                    document.getElementById('gameover').style.visibility = 'visible';
                                }, 800);
                            }
                        }
                        updateSkierLifeOnScoreBoard();
                    }
                }
            });
        }
		if (monster) {
        	monster.seekSkier(skier);

        	if (monster.top < -monster.element.clientHeight) {
        		monster = null;
        		isMonsterOnScreen = false;
                skier.distanceTraveledUntilMonsterAppears =  0;
			}

			if (monster.checkCollisionWithSkier(skier)) {
        		skier.element.style.visibility = 'hidden';
                setTimeout(() => {
                    document.getElementById('gameover').style.visibility = 'visible';
				}, 2000);

        		skier.speed = 0;
        		skier.isDead = true;
                stopUpdatingDogs();
				monster.element.className = 'eating';
			}
		}

        if (calculateDistanceTraveled(skier.distanceTraveledUntilMonsterAppears) > 2000 && !isMonsterOnScreen) {
			monster = new Monster();
            isMonsterOnScreen = true;
        }
    }

	init();
