const constants = {
	SIZE_X: 700,
	SIZE_Y: 500,
	FPS: 60,
	FALL_ANIMATION_DURATION: 900,
	SKIER_DIRECTION: {
		FRONT: 'skier-front',
		LEFT: 'skier-left',
		RIGHT: 'skier-right'
	},
	SKIER_MIN_SPEED: 2,
	SKIER_MAX_SPEED: 3.7,
	MONSTER_SPEED_X: 4,
	MONSTER_SPEED_Y: 3,
	MONSTER_RIGHT: 0,
	MONSTER_LEFT: 1,
	OBSTACLE_MAP: [
		{ name: 'tree', probability: 30 },
		{ name: 'rock', probability: 10 },
		{ name: 'tall-tree', probability: 15 },
		{ name: 'burning-bush', probability: 7 },
		{ name: 'bush', probability: 12 },
        { name: 'mushroom', probability: 2 },
		{ name: 'log', probability: 10 },
		{ name: 'dog', probability: 6 }
	]
};
