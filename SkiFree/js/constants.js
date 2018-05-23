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
        { name: 'tree', probability: 8 }, 
        { name: 'rock', probability: 3 },
        { name: 'tall-tree', probability: 2 },
        { name: 'bush', probability: 5 },
        { name: 'log', probability: 2 }
    ]
};
