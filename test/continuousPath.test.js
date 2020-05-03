import { continuousRideAlgorithm } from '../src/js/algorithms/ContinuousRideAlgorithm.js';





test('test1', () => {

	expect(continuousRideAlgorithm(
		[
			['green', 'blue'],
			['green']
		]
	)).toEqual(
		[
			['green'],
			['green']
		]
	);

});

test('test2', () => {

	expect(continuousRideAlgorithm(
		[
			['green'],
			['green'],
			['red', 'green'],
			['red', 'green'],
			['yellow'],
			['yellow']
		]
	)).toEqual(
		[
			['green'],
			['green'],
			['green'],
			['green'],
			['yellow'],
			['yellow']
		]
	);

});

test('test3', () => {

	expect(continuousRideAlgorithm(
		[
			['green'],
			['green'],
			['blue', 'yellow'],
			['red', 'yellow'],
			['yellow'],
			['yellow']
		]
	)).toEqual(
		[
			['green'],
			['green'],
			['yellow'],
			['yellow'],
			['yellow'],
			['yellow']
		]
	);

});


test('test4', () => {

	expect(continuousRideAlgorithm(
		[
			['blue'],
			['blue'],
			['red', 'green'],
			['red', 'green'],
			['yellow'],
			['yellow']
		]
	)).toEqual(
		[
			['blue'],
			['blue'],
			['red'],
			['red'],
			['yellow'],
			['yellow']
		]
	);

});


test('test5', () => {

	expect(continuousRideAlgorithm(
		[
			['green'],
			['green'],
			['red', 'green'],
			['red', 'green'],
			['red', 'green', 'yellow'],
			['yellow'],
			['yellow']
		]
	)).toEqual(
		[
			['green'],
			['green'],
			['green'],
			['green'],
			['green'],
			['yellow'],
			['yellow']
		]
	);

});


test('test6', () => {

	expect(continuousRideAlgorithm(
		[
			['green'],
			['red', 'blue'],
			['blue', 'purple'],
			['yellow']
		]
	)).toEqual(
		[
			['green'],
			['blue'],
			['blue'],
			['yellow']
		]
	);

});


test('test7', () => {

	expect(continuousRideAlgorithm(
		[
			['green', 'blue'],
			['red', 'blue'],
			['blue'],
			['green']
		]
	)).toEqual(
		[
			['blue'],
			['blue'],
			['blue'],
			['green']
		]
	);

});


test('test8', () => {

	expect(continuousRideAlgorithm(
		[
			['green', 'blue'],
			['red', 'blue'],
			['blue', 'red'],
			['green', 'red']
		]
	)).toEqual(
		[
			['blue'],
			['blue'],
			['blue'],
			['green']
		]
	);

});

/*
	Small change to prevous, totally different route
*/
test('test9', () => {

	expect(continuousRideAlgorithm(
		[
			['green'],
			['red', 'blue'],
			['blue', 'red'],
			['green', 'red']
		]
	)).toEqual(
		[
			['green'],
			['red'],
			['red'],
			['red']
		]
	);

});


test('test10', () => {

	expect(continuousRideAlgorithm(
		[
			['red', 'purple'],
			['green', 'orange'],
			['yellow']
		]
	)).toEqual(
		[
			['red'],
			['green'],
			['yellow']
		]
	);

});


