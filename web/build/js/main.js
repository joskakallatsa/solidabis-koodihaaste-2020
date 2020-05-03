(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.continuousRideAlgorithm = continuousRideAlgorithm;

/*

	After shortest path to destination is solved, there can be multiple bus lines operating between two bus stops.
	The passenger doesn't want unnecessary changes on the route, therefore we need an algorithm solving the most contiunous ride to destanation.
	
	@param arr is a multidimentional array where every row contains an array of all possible bus lines between two bus stops.
	Each row represents a bus line operating between bus stops (for illustration purposes).

	[								// Example:
		['green', 'red'],			// Bus line between A <-> B
		['yellow', 'green'],		// Bus line between B <-> C
		['blue', 'red'],			// Bus line between C <-> D
		['blue'],					// Bus line between D <-> E
		['yellow'],					// Bus line between E <-> F
		['blue', 'yellow']			// Bus line between F <-> D
	]

	The algorithm takes this array as parameter and finds the most contiunous
	ride for passenger and returns an array where bus line options are narrowed down to 1 per row.
	Most contiunous ride with the above-mentioned example would be:

	[
		['green'],
		['green'],
		['blue'],
		['blue'],
		['yellow'],
		['yellow']
	]

	Algorithm tries to find 
	- Method 1.
	- Method 1.
	- Method 1.
	- Method 1.
	- Method 1.

*/

function continuousRideAlgorithm(arr) {

	/*
 	Loop through 
 	As a result of each iteration arr[i].length must be 1.
 */
	console.log('test');
	console.log(arr);

	var l = arr.length;

	for (var i = 0; i < l; i++) {

		var item = arr[i];

		/*
  	Applying method 1.
  */
		if (item.length == 1) {
			arr[i] = item;
			continue;
		}

		/*
  	RATKAISU 2: Pyritään jatkamaan samaa linjaa edellisen pysäkin kanssa
  	- Tiedetään että tällä pysäkkivälillä on useita mahdollisia linjoja
  	- Voidaan myös luottaa että i-1 sisältää jo käsitellyn pysäkkivälin, eli arr[i-1].length = 1
  */
		if (i - 1 >= 0) {

			var previousSingleItem = arr[i - 1];

			// let's prefer continous ride
			if (previousSingleItem.length == 1 && item.includes(previousSingleItem[0])) {
				arr[i] = previousSingleItem;
				continue;
			}
		}

		/*
  	RATKAISU 3: Lähdetään looppaamaan seuraavia pysäkkivälejä eteenpäin niin kauan että löydetään
  	pysäkkiväli jolla on vain yksi linjasto. Pyritään käyttämään sitä jos mahdollista. Muussa tapauksessa
  	unohdetaan taulukon loppupäästä yksi pysäkki ja kokeillaan uudestaan. Jos yhteisiä linjastoja ei löydy,
  	lopulta valitaane
  */
		if (i + 1 <= l - 1) {

			/*
   	Luodaan taulukoiden intersect-funktio, jossa pyritään löytämään useista taulukoista
   	yhteiset arvot. Esimerkiksi seuraava objekti palauttaisi tuloksen [red], koska se löytyy jokaisesta
   	taulukosta. Näin etsitään eri linjastovaihtoehdoista yhteinäisin linja.
   	[
   		[green, red, blue],
   		[yellow, red],
   		[red, green]
   	]
   */
			var intersectArrays = function intersectArrays(arrList) {

				var arrLength = Object.keys(arrList).length;
				var index = {};

				for (var i in arrList) {
					for (var j in arrList[i]) {

						var v = arrList[i][j];

						if (index[v] === undefined) {
							index[v] = {};
						}

						index[v][i] = true; // Mark as present in i input.
					};
				};

				var retv = [];

				for (var i in index) {
					if (Object.keys(index[i]).length == arrLength) {
						retv.push(i);
					}
				};

				return retv;
			};

			var tempArray = [];
			var temp_i = i;

			/*
   	Haetaan
   */
			while (temp_i <= l - 1) {

				tempArray.push(arr[temp_i]);

				// we winf first match where there's only one option, so break loop
				if (arr[temp_i].length == 1) {
					break;
				}

				temp_i++;
			};

			/*
   	Tässä vaiheessa tempArray on taulukko.
   	tempArray = [
   		[blue, green]			// tunetomaton määrä
   		[yellow] // max 1 arv
   	]
   */
			var intersectedArrays = intersectArrays(tempArray);

			if (intersectedArrays.length < 1) {

				while (intersectedArrays.length < 1 && tempArray.length > 0) {

					tempArray.pop();

					if (tempArray.length < 1) {
						intersectedArrays = [arr[i][0]];
						break;
					}

					intersectedArrays = intersectArrays(tempArray);

					if (intersectedArrays.length > 0) {
						break;
					}
				}
			}

			/*
   	5. Vaihtoehto: Taulukoiden intersectionissa oli tullut match, joten voidaan turvallisin
   	mielin valita ensimmäinen
   */
			if (intersectedArrays.length > 0) {
				arr[i] = [intersectedArrays[0]];
				continue;
			}
		}

		/*
  	RATKAISU 5: Jos ei edellisen pysäkkivälin linjasta tai seuraavien pysäkkien linjoista
  	ei löydy kerta kaikkiaan mitään yhteistä, ei ole optimoinnin kannalta väliä minkä värinen
  	linja valitaan. Otetaan taulukosta ensimmäinen.
  */
		arr[i] = [arr[i][0]];
	}

	return arr;
}

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.shortestPathAlgorithm = shortestPathAlgorithm;
function shortestPathAlgorithm(startingPoint, endingPoint, graph) {

	// let graph = jQuery.extend(true, {}, data);


	if (!(startingPoint in graph) || !(endingPoint in graph)) {
		return {
			distance: Infinity,
			path: [],
			error: "Tuntematon alku- tai päätepiste"
		};
	}

	// Nyt päätepyskäin voi merkata tyhjäksi, koska sillä ei tarvitse olla jatkoyhtekysiä
	graph[endingPoint] = {};

	/**
 * This function helps to find out the "lowest cost node" which will be processed next.
 * @param  {[type]} costs     [description]
 * @param  {[type]} processed [description]
 * @return {[type]}           [description]
 */

	var lowestCostNode = function lowestCostNode(costs, processed) {
		return Object.keys(costs).reduce(function (lowest, node) {
			if (lowest === null || costs[node] < costs[lowest]) {
				if (!processed.includes(node)) {
					lowest = node;
				}
			}
			return lowest;
		}, null);
	};

	/**
  * This is mimic Dijkstra's algorithm
  */
	var dijkstra = function dijkstra(graph) {

		var costs = {};
		costs[endingPoint] = Infinity;

		for (var child in graph[startingPoint]) {
			costs[child] = graph[startingPoint][child].weight;
		}

		var parents = {};
		parents[endingPoint] = null;

		for (var _child in graph[startingPoint]) {

			parents[_child] = {
				parent: startingPoint,
				weight: graph[startingPoint][_child].weight,
				distance: graph[startingPoint][_child].weight,
				route: graph[startingPoint][_child].route
			};

			if (_child == endingPoint) {
				return {
					distance: graph[startingPoint][_child].weight,
					path: [{
						from: startingPoint,
						to: endingPoint,
						weight: graph[startingPoint][_child].weight,
						distance: graph[startingPoint][_child].weight,
						route: graph[startingPoint][_child].route
					}],
					routes: [graph[startingPoint][_child].route]
				};
			}
		}

		// Track nodes that have already been processed
		var processed = [];

		var node = lowestCostNode(costs, processed);

		while (node) {

			var cost = costs[node];
			var children = graph[node];

			for (var n in children) {

				if (n == startingPoint) {
					continue;
				}

				var newCost = cost + children[n].weight;

				if (!costs[n]) {
					costs[n] = newCost;
					parents[n] = {
						parent: node,
						weight: children[n].weight,
						distance: newCost,
						route: children[n].route
					};
				}

				if (costs[n] > newCost) {

					costs[n] = newCost;
					parents[n] = {
						parent: node,
						weight: children[n].weight,
						distance: newCost,
						route: children[n].route
					};
				}
			}

			processed.push(node);
			node = lowestCostNode(costs, processed);
		}

		/*
  	We have reached the ending point. Let's figure out the route.
  */
		var optimalPath = [],
		    parent = parents[endingPoint],
		    currentNode = endingPoint;

		var optimizedRoutes = [];

		while (parent) {

			optimizedRoutes.push(parent.route);

			optimalPath.push({
				from: parent.parent,
				to: currentNode,
				weight: parent.weight,
				distance: parent.distance
			});

			currentNode = parent.parent;
			parent = parents[parent.parent];
		}

		optimalPath.reverse();
		optimizedRoutes.reverse();

		console.log('OPTIMAL PATH');
		console.log(optimalPath);

		var results = {
			distance: costs[endingPoint],
			path: optimalPath,
			routes: optimizedRoutes
		};

		return results;
	};

	return dijkstra(graph);
}

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ContinuousRideAlgorithm = require('./algorithms/ContinuousRideAlgorithm.js');

var _ShortestPathAlgorithm = require('./algorithms/ShortestPathAlgorithm.js');

var algorithms = {};
algorithms.continuousRideAlgorithm = _ContinuousRideAlgorithm.continuousRideAlgorithm;
algorithms.shortestPathAlgorithm = _ShortestPathAlgorithm.shortestPathAlgorithm;

window.algorithms = algorithms;

exports.default = {};

},{"./algorithms/ContinuousRideAlgorithm.js":1,"./algorithms/ShortestPathAlgorithm.js":2}]},{},[3]);
