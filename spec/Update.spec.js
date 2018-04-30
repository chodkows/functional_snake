const expect = require('expect');

const update = require('../src/Update');
const model = require('../src/Model');

describe('Update', () => {

	describe('move(cell)', () => {

		it('should return updated model when x increment', () => {
			const cell = {
				x: 2,
				y: 2,
				direction: 'EAST',
				id: 0,
			}
			const movedCell = update.move(cell);
			expect(movedCell).toInclude({
				x:3,
				y:2,
				direction: 'EAST',
				id: 0,
			}).toBeA('object');
		});

		it('should return updated model when x decrement', () => {
			const cell = {
				x: 2,
				y: 2,
				direction: 'WEST',
				id: 0,
			}
			const movedCell = update.move(cell);
			expect(movedCell).toInclude({
				x:1,
				y:2,
				direction: 'WEST',
				id: 0,
			}).toBeA('object');
		});

		it('should return updated model when y increment', () => {
			const cell = {
				x: 2,
				y: 2,
				direction: 'SOUTH',
				id: 0,
			}
			const movedCell = update.move(cell);
			expect(movedCell).toInclude({
				x:2,
				y:3,
				direction: 'SOUTH',
				id: 0,
			}).toBeA('object');
		});

		it('should return updated model when y decrement', () => {
			const cell = {
				x: 2,
				y: 2,
				direction: 'NORTH',
				id: 0,
			}
			const movedCell = update.move(cell);
			expect(movedCell).toInclude({
				x:2,
				y:1,
				direction: 'NORTH',
				id: 0,
			}).toBeA('object');
		});

		it('should return just model when bad direction', () => {
			const cell = {
				x: 2,
				y: 2,
				direction: 'aaa',
				id: 0,
			}
			const movedCell = update.move(cell);
			expect(movedCell).toInclude({
				x:2,
				y:2,
				direction: 'aaa',
				id: 0,
			}).toBeA('object');
		});
	});

	describe('checkCoords(cell)', () => {

		it('should return updeted x=0 when current x >= 10', () => {
			const cell = {
				x: 10,
				y: 2,
				direction: 'aaa',
				id: 0,
			}
			const movedCell = update.checkCoords( cell );
			expect(movedCell).toInclude({
				x: 0
			}).toBeA('object');
		});

		it('should return updeted x=9 when current x < 0 ', () => {
			const cell = {
				x: -1,
				y: 2,
				direction: 'aaa',
				id: 0,
			}
			const movedCell = update.checkCoords( cell );
			expect(movedCell).toInclude({
				x: 9
			}).toBeA('object');
		});

		it('should return updeted y=0 when current y >= 10', () => {
			const cell = {
				x: 2,
				y: 10,
				direction: 'aaa',
				id: 0,
			}
			const movedCell = update.checkCoords( cell );
			expect(movedCell).toInclude({
				y: 0
			}).toBeA('object');
		});

		it('should return updeted y=9 when current x < 0', () => {
			const cell = {
				x: 2,
				y: -1,
				direction: 'aaa',
				id: 0,
			}
			const movedCell = update.checkCoords( cell );
			expect(movedCell).toInclude({
				y: 9
			}).toBeA('object');
		});
	});

	describe('checkDirection(cell, direction)', () => {

		it('should changed direction on NORTH', () => {
			const cell = {
				x: 2,
				y: 10,
				direction: 'EAST',
				id: 0,
			}
			const updatedCell = update.checkDirection(cell, 'NORTH');
			expect(updatedCell).toInclude({
				direction: 'NORTH',
			}).toBeA('object');
		});

		it('should not changed to oposite direction', () => {
			const cell = {
				x: 2,
				y: 10,
				direction: 'EAST',
				id: 0,
			}
			const updatedCell = update.checkDirection(cell, 'WEST');
			expect(updatedCell).toInclude({
				direction: 'EAST'
			}).toBeA('object');
		});
	});

	describe('addCell(model)', () => {

		it('should return updatedModel with increment nextId', () => {
			const updatedModel = update.addCell(model);
			expect(updatedModel).toInclude({
				nextId: 3,
			}).toBeA('object');
		});

		it('cells should have one more cell', () => {
			const prevLength = model.cells.length;
			const updatedModel = update.addCell(model);
			const length = updatedModel.cells.length;
			expect(length).toBe(prevLength + 1);
		});
	});

	// describe('updateCells(cells)', () => {
	// 	it('should update direction from previous cell', () => {
	// 		const updateCells = update.updateCells(model.cells);
	//
	// 	})
	// })
});
