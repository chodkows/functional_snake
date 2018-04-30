const R = require('ramda');

const MSGS = {
	MOVE: 'MOVE',
	CHANGE_DIRECTION: 'CHANGE_DIRECTION',
	COOKIE: 'COOKIE',
}

const moveCellEvent = {
	type: MSGS.MOVE,
}

const cookieEvent = (random) => {
	return {
		type: MSGS.COOKIE,
		random,
	}
}

function changeDirection(name) {
	switch(name) {
		case 'left': {
			return {
				type: MSGS.CHANGE_DIRECTION,
			 	direction: 'WEST'
			}
		}
		case 'right': {
			return {
				type: MSGS.CHANGE_DIRECTION,
			 	direction: 'EAST'
			}
		}
		case 'up': {
			return {
				type: MSGS.CHANGE_DIRECTION,
			 	direction: 'NORTH'
			}
		}
		case 'down': {
			return {
				type: MSGS.CHANGE_DIRECTION,
			 	direction: 'SOUTH'
			}
		}
	}
}

function move( cell ) {
	const { x, y, direction } = cell;
	switch( direction ) {
		case 'NORTH': {
			return { ...cell, y: y - 1 };
		}
		case 'SOUTH': {
			return { ...cell, y: y + 1 };
		}
		case 'WEST': {
			return { ...cell, x: x - 1 };
		}
		case 'EAST': {
			return { ...cell, x: x + 1 };
		}
		default: {
			return { ...cell};
		}
	}
}

function checkCoords( cell ) {
	const { x, y } = cell;
	if( x >= 10 ) return { ...cell, x: 0 };
	else if( x < 0 ) return { ...cell, x: 9 };
	else if( y >= 10 ) return { ...cell, y: 0 };
	else if( y < 0 ) return { ...cell, y: 9 }
	else return { ...cell};
}

function checkDirection( cell, direction ) {
	const prevDirection = cell.direction;
	switch (direction) {
		case 'NORTH': {
			if(cell.direction === 'SOUTH') return { ...cell }; break;
		}
		case 'EAST' : {
			if(cell.direction === 'WEST') return { ...cell }; break;
		}
		case 'WEST': {
			if(cell.direction === 'EAST') return { ...cell }; break;
		}
		case 'SOUTH': {
			if(cell.direction === 'NORTH') return { ...cell }; break;
		}
	}
	return { ...cell, direction, prevDirection }
}

function addCell(model) {
	const { nextId, x, y, direction } = model;
	const currentCells = model.cells;
	const cells = [ ...currentCells,  { id: nextId, x, y, direction } ]
	return { ...model, cells, nextId: nextId + 1 };
}

const moveCell = R.pipe(
	move,
	checkCoords
);

function moveFirstCell(model){
	const firstCell = model.cells[0];
	return moveCell(firstCell);
}

function updateTailWhenCookie(model) {
	const rawCells = model.cells.slice(0, model.cells.length);
	return R.map(cell => {
		return { ...cell, id: cell.id + 1}
	}, rawCells);

}

function updateTailWithoutCookie(model) {
	const rawCells = model.cells.slice(0, model.cells.length -1);
	return R.map(cell => {
		return { ...cell, id: cell.id + 1}
	}, rawCells);
}

function checkKillSnake(cell, cells) {
	const tail = cells.slice(1);
	const mapped = R.map( tailCell => {
		if( tailCell.x === cell.x && tailCell.y === cell.y ) return 1;
		else return 0;
	}, tail);
	return R.reduce((prev, curr) => prev + curr, 0, mapped );
}

function moveCells(model) {
	const updatedFirstCell = moveFirstCell(model);
	if(checkKillSnake(updatedFirstCell, model.cells)) {
		const cells = model.cells.slice(0,2);
		return { ...model, cells};
	}

	const cookie = model.random;

	if(cookie.x === updatedFirstCell.x && cookie.y === updatedFirstCell.y){
		const tail = updateTailWhenCookie(model);
		const random = {};
		const cells = [updatedFirstCell, ...tail];// x(model)
		return { ...model, random, cells };
	} else {
		const tail = updateTailWithoutCookie(model);
		const cells = [updatedFirstCell, ...tail];// x(model)
		return { ...model, cells };
	}
}

function update(msg, model) {
	switch(msg.type) {
		case MSGS.MOVE: {
			return moveCells(model);
		}
		case MSGS.CHANGE_DIRECTION: {
			const cell = model.cells[0];
			const cellWithNewDir = checkDirection(cell, msg.direction);
			const previousCells = model.cells.slice(1);
			const cells = [ cellWithNewDir, ...previousCells ];
			return {...model, cells }
		}
		case MSGS.COOKIE: {
			const random = msg.random;
			return {...model, random }
		}
	}
}

module.exports = {
	moveCellEvent,
	cookieEvent,
	move,
	checkCoords,
	checkDirection,
	changeDirection,
	addCell,
	update
}
