
	/**
	 * [shortestPathAlgorithm description]
	 * @param  {[type]} startingPoint Bus stop where user is starting the trip
	 * @param  {[type]} endingPoint   Destination bus stop
	 * @param  {[type]} graph         All operating routes, parsed from linjastot.json
	 */
	
	export function shortestPathAlgorithm(startingPoint, endingPoint, graph) {


	 	if(!(startingPoint in graph) || !(endingPoint in graph)) {
	 		return {
	 			distance: Infinity,
	 			path: [],
	 			error: "Tuntematon alku- tai päätepiste"
	 		};
	 	}


	 	// We don't need to get anywhere from the ending point, so make it empty
	 	graph[endingPoint] = {};


	 	/**
	 	* This function helps to find out the "lowest cost node" which will be processed next.
	 	*/
	 	const lowestCostNode = (costs, processed) => {
			return Object.keys(costs).reduce((lowest, node) => {
				if(lowest === null || costs[node] < costs[lowest]) {
				    if(!processed.includes(node)) {
				        lowest = node;
				    }
				}
				return lowest;
			}, null);
		};


		/**
		 * This mimics Dijkstra's algorithm. Let's loop all nodes favoring the lowest cost node.
		 */
	 	const dijkstra = (graph) => {

	 		// Keeping track of costs as we go
			const costs = {};
			costs[endingPoint] = Infinity;

			for(let child in graph[startingPoint]) {
				costs[child] = graph[startingPoint][child].weight;
			}

			
			// Let's keep track of node parents as we go
			const parents = {};
			parents[endingPoint] = null;


			for (let child in graph[startingPoint]) {

				parents[child] = {
				   	parent: startingPoint,
				    weight: graph[startingPoint][child].weight,
				    distance: graph[startingPoint][child].weight,
				    route: graph[startingPoint][child].route
				};

				// If these bus stops are side by side, let's just return early...
				if(child == endingPoint) {
				    return {
				    	distance: graph[startingPoint][child].weight,
				    	path: [{
						   	from: startingPoint,
							to: endingPoint,
							weight: graph[startingPoint][child].weight,
							distance: graph[startingPoint][child].weight,
							route: graph[startingPoint][child].route
				    	}],
				    	routes: [
				    		graph[startingPoint][child].route
				    	]
				    };
				}
			}


			// Keeping track of already processed nodes
			const processed = [];

			let node = lowestCostNode(costs, processed);

		
			while(node) {

				let cost = costs[node];
				let children = graph[node];

				for(let n in children) {
				    
				    if(n == startingPoint) {
				    	continue;
				    }
				    	
				    let newCost = cost + children[n].weight;

					if(!costs[n]) {
				        costs[n] = newCost;
				        parents[n] = {
				        	parent: node,
				        	weight: children[n].weight,
				        	distance: newCost,
				        	route: children[n].route
				        };
				    }

				    if(costs[n] > newCost) {

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
			let optimalPath = [],
			parent = parents[endingPoint],
			currentNode = endingPoint;

			/*
				There can be multiple bus lines operating between two bus stops. Let's remember
				them all so we can later figure out the best route for passenger. This
				needs a separate algorith.
			*/
			let optimizedRoutes = [];
				
			while(parent) {

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
			
			const results = {
				distance: costs[endingPoint],
				path: optimalPath,
				routes: optimizedRoutes
			};

			return results;

		};

		return dijkstra(graph);
				
	}