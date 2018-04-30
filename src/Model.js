const Model = {
	x: 0,
	y: 0,
	direction: 'WEST',
	nextId: 2,
	random: { x: 0, y: 0},
	cells:[
		{ x:2, y:2, direction: 'EAST', prevDirection: 'EAST', id: 0},
		{ x:1, y:2, direction: 'EAST', prevDirection: 'EAST', id: 1},
	],
}

module.exports = Model;
