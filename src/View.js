const readline = require('readline');
const { moveCell } = require('./Update');
const model = require('./Model');
const R = require('ramda');

function show(x,y, model) {
	const random = model.random;

	if(random && random.x === x && random.y === y) {
		return 2;
	}
	const mappedCells = R.map( cell => {
		if(cell.y === y && cell.x === x) return 1;
		else return 0;
	}, model.cells);
	return R.reduce((prev, curr) => prev + curr, 0, mappedCells);
}

function printCookie(x,y,model) {
	const random = model.random;

}

function print(model) {
	for(let i = 0 ; i < 10; i++) {
		for(let j = 0 ; j < 10; j++) {
			if(show(j,i,model) ===2 ) process.stdout.write('X ');
			else {
				show(j,i, model) ? process.stdout.write('o ') : process.stdout.write('- ');
			}
		}
		process.stdout.write('\n');
	}
}

function view(model) {
	console.log('\033c');
	print(model);
	console.log();
	console.log(`Długość węża: ${model.cells.length}`);
}

module.exports = view;
