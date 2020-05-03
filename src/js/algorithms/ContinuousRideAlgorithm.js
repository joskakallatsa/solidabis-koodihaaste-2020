
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

	*/

	export function continuousRideAlgorithm(arr) {


		var l = arr.length;


		for(var i=0; i < l; i++) {

			var item = arr[i];

			/*
				METHOD 1:
			*/
			if(item.length == 1) {
				arr[i] = item;
				continue;
			}

			/*
				METHOD 2:
				Let's try to keep the same colored line with the previous one. We can trust
				that i-1 is already handled, so arr[i-1].length = 1

			*/
			if(i-1 >= 0) {

				var previousSingleItem = arr[i-1];

				// let's prefer continous ride
				if(previousSingleItem.length == 1 && item.includes(previousSingleItem[0])) {
					arr[i] = previousSingleItem;
					continue;
				}

			}

			
			/*
				METHOD 3:
				Let's loop forward and see if we find a route with only one color option. Use it if possible. If
				not, let's drop the last index of this array and try agian.
			*/
			if(i+1 <= l-1) {


				var tempArray = [];
				var temp_i = i;

			
				while(temp_i <= l-1) {
					
					tempArray.push(arr[temp_i]);
					
					// we winf first match where there's only one option, so break loop
					if(arr[temp_i].length == 1) {
						break;
					}

					temp_i++;
				}

				/*
					Let's create interesect function where we try to find similar values from multiple arrays.
					"red" is a similar value of all these arrays in the following example:
					[
						[green, red, blue],
						[yellow, red],
						[red, green]
					]
				*/
				function intersectArrays(arrList) {

					var arrLength = Object.keys(arrList).length;
					var index = {};

					for (var i in arrList) {
						for (var j in arrList[i]) {

						    var v = arrList[i][j];

						    if (index[v] === undefined) {
						    	index[v] = {};
						    }

						    index[v][i] = true;

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

			
				var intersectedArrays = intersectArrays(tempArray);

				if(intersectedArrays.length < 1) {

					while(intersectedArrays.length < 1 && tempArray.length > 0) {

						tempArray.pop();

						if(tempArray.length < 1) {
							intersectedArrays = [ arr[i][0] ];
							break;
						}

						intersectedArrays = intersectArrays(tempArray);

						if(intersectedArrays.length > 0) {
							break;
						}

					}


				}
				
				
				/*
					METHOD 5:
					We found a match when we intersected arrays, we can safely take the first one in the array
				*/
				if(intersectedArrays.length > 0) {
					arr[i] = [ intersectedArrays[0] ];
					continue;
				}
					
					
					

			} 


				
			/*
				METHOD 6:
				If there is just nothing to optimize, we select the first option available.
			*/
			arr[i] = [ arr[i][0] ];
				

		}


		return arr;

	}