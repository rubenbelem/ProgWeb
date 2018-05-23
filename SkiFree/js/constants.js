const constants = {
	SIZE_X: 700,
	SIZE_Y: 500,
	SKIER_DIRECTION: {
		FRONT: 'skier-front',
		LEFT: 'skier-left',
		RIGHT: 'skier-right'
	},
	SKIER_MIN_SPEED: 2,
    SKIER_MAX_SPEED: 5,
    OBSTACLE_MAP: [
        { name: 'tree', probability: 20 }, 
        { name: 'rock', probability: 5 },
        { name: 'tall-tree', probability: 4 },
        { name: 'burning-bush', probability: 30 },
        { name: 'bush', probability: 10 },
        { name: 'log', probability: 5 }
    ]
};
