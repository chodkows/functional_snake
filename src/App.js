const { moveCellEvent, cookieEvent, changeDirection } = require('./Update');
const readline = require('readline');
const R = require('ramda');

function check(x, cellX) {  
	if(x===cellX && x<9)  return {... random, x: x+1};
	else return { ...random };
}

function random(model) {
	// const xRange = R.uniq(R.map( cell => cell.x, model.cells));
	// const yRange = R.uniq(R.map( cell => cell.y, model.cells));
	// const xSorted = R.sort((a,b) => a-b, xRange);
	// const ySorted = R.sort((a,b) => a-b, yRange);
	return {
		x: Math.floor(Math.random()*10),
		y: Math.floor(Math.random()*10),
	}





}

function app(initModel, update, view, emitter) {

	let model = initModel;
	let currentView = view(model);
	/*
	**		emitting event at  0.2 second
	*/
	setInterval(() => {
		emitter.emit('event')
	}, 200);
	/*
	**		emitting cookie at  1 second
	*/
	setInterval(() => {
		emitter.emit('cookie');
	}, 10000);

	/*
	**		listening at events and updating model
	*/
	emitter.on('event', () => {
		model = update(moveCellEvent, model);
		view(model);
	});

	emitter.on('cookie', () => {
		const cookie = random();
		model = update(cookieEvent(cookie), model);
		view(model);
	})

	emitter.on('key', (name) => {
		model = update(changeDirection(name), model);
		view(model);
	});

	/*
	**		checking pressed key and emiting event
	*/
	readline.emitKeypressEvents(process.stdin);
	process.stdin.setRawMode(true);

	process.stdin.on('keypress', (str, key) => {
		if (key.ctrl && key.name === 'c') {
			process.exit();
		}
		emitter.emit('key', key.name);
	});
}

module.exports = app;
