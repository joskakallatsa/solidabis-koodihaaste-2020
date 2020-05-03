
	var app = (function($) {

		var obj = {};
		obj.busroutes = {};
		obj.busstops = {};
		obj.lines = {};

		obj.init = function() {

		 	$.getJSON("data/data.json", function(json) {
				app.parseData(json);
				app.ready();
			});

		};

		obj.ready = function() {
			$('select').niceSelect();
		};

		obj.getColor = function(c) {
 			if(c == 'sininen') {
 				c = 'blue';
 			}
 			else if(c == 'punainen') {
 				c = 'red';
 			}
 			else if(c == 'keltainen') {
 				c = 'yellow';
 			}
 			else if(c == 'vihreä') {
 				c = 'green';
 			}
 			return c;
 		};

 		obj.getColorLabel = function(c) {
 			if(c == 'blue') {
 				c = 'sinistä';
 			}
 			else if(c == 'red') {
 				c = 'punaista';
 			}
 			else if(c == 'yellow') {
 				c = 'keltaista';
 			}
 			else if(c == 'green') {
 				c = 'vihreää';
 			}
 			return c;
 		};

		/**
 		* 	Get data and manipulate it to serve our needs
 		*/
 		obj.parseData = function(json) {

 			/*
				1. json.pysatkit
 			*/
 			for(var i=0; i<json.pysakit.length; i++) {
 				$('#from').append($('<option>', {
					value: json.pysakit[i],
					text: 'Pysäkki '+json.pysakit[i]
				}));
				$('#to').append($('<option>', {
					value: json.pysakit[i],
					text: 'Pysäkki '+json.pysakit[i]
				}));
 			}

 			/*
				2. json.tiet
				- Roads are one-way only in the data. Let's save two connection, for example A -> B and  B -> A.
 			*/
 			var roads = {};
 			var l = json.tiet.length;

 			for(var i=0; i<l; i++) {

 				var routeFrom = json.tiet[i].mista;
 				var routeTo = json.tiet[i].mihin;
 				var routeWeight = json.tiet[i].kesto;

 					
 				if(!(routeFrom+routeTo in roads)) {
 					roads[routeFrom+routeTo] = {
 						from: routeFrom,
 						to: routeTo,
 						weight: routeWeight
 					};
 				}

 				
 				if(!(routeTo+routeFrom in roads)) {
 					roads[routeTo+routeFrom] = {
 						from: routeTo,
 						to: routeFrom,
 						weight: routeWeight
 					};
 				}

 			}

 			
 			/*
				3. json.linjastot
				- Now we know road connections, but let's find out if there are actual bus lines operating there.
 			*/

 			var busroutes = {};

 			for(var route in json.linjastot) {
 				var singleRoute = json.linjastot[route];
 				var l = singleRoute.length;

 				for(var i=1; i<l; i++) {

 					var addConnection = function(fromId, toId, routeCode, destination) {

 						routeCode = app.getColor(routeCode);
 							
 						if(!(fromId in busroutes)) {
	 						busroutes[fromId] = {};
	 					}

	 					if(!(fromId+toId in roads)) {
	 						return;
	 					}

	 					if(!(toId in busroutes[fromId])) {
	 						busroutes[fromId][toId] = {
		 						weight: roads[fromId+toId].weight,
		 						route: [routeCode],
		 						destination: destination
		 					};
	 					} else {
	 						busroutes[fromId][toId]['route'].push(routeCode);
	 					}

	 						
	 						
	 						

 					};

 					addConnection(singleRoute[i-1], singleRoute[i], route, singleRoute[l-1]);
 					addConnection(singleRoute[i], singleRoute[i-1], route, singleRoute[0]);

 					

 				}
 			}

 			app.busroutes = busroutes;


 			app.lines.blue = json.linjastot["sininen"];
 			app.lines.green = json.linjastot["vihreä"];
 			app.lines.yellow = json.linjastot["keltainen"];
 			app.lines.red = json.linjastot["punainen"];


 		};




		obj.displayResults = function(result) {

			$('.results__container').html('');

			var o = {};
			if(result.distance == Infinity || result.path.length <= 0) {
				alert("Ei päästy perille");
				return;
			}

			var continuousRide = algorithms.continuousRideAlgorithm(result.routes);
			

			var isFirst = true;
			var html = '';
			var lastStopColor = '';
			var temp = [];

			for(var i=0; i<result.path.length; i++) {

				var single = result.path[i];

				if(isFirst) {

					html += app.getHTMLforStartStop({
						'stop' : single['from'],
						'color' : continuousRide[i][0],
						'toNext': single['weight'],
						'destination' : app.getDestination(single.from, single.to, continuousRide[i][0])
					});

					lastStopColor = continuousRide[i];
					html += app.getHTMLForLine(lastStopColor, 2);
					isFirst = false;

				}

				else if(lastStopColor == continuousRide[i][0]) {
					temp.push(single);
				}

				else {

					// flush temp
					if(temp.length > 0) {
						html += app.getHTMLforCombinedStops({
							stops: temp,
							color: lastStopColor
						});
						html += app.getHTMLForLine(lastStopColor, 2);
						temp = [];
					}
						
					if((typeof continuousRide[i+1]) !== "undefined") {

						html += app.getHTMLforStop({
							'stop' : single['from'],
							'color' : continuousRide[i],
							'toNext': single['weight'],
							'destination' : app.getDestination(single.from, single.to, continuousRide[i][0])
						});

						lastStopColor = continuousRide[i];
						html += app.getHTMLForLine(lastStopColor, 2);

					}

				}

			
				// check if this is last one
				if(typeof result.path[i+1] === "undefined") {

					// flush temp
					if(temp.length > 0) {
						html += app.getHTMLforCombinedStops({
							stops: temp,
							color: lastStopColor
						});
						html += app.getHTMLForLine(lastStopColor, 2);
						temp = [];
					}


					if(continuousRide[i][0] != lastStopColor) {
						html += app.getHTMLforStop({
							'stop' : single['from'],
							'color' : continuousRide[i][0],
							'toNext': single['weight'],
							'destination' : app.getDestination(single.from, single.to, continuousRide[i][0])
						});

						lastStopColor = continuousRide[i];
						html += app.getHTMLForLine(lastStopColor, 4);
					}

					
					

					html += app.getHTMLforEndStop({
						'stop' : single['to'],
						'color' : continuousRide[i],
						'total' : result.distance
					});
				}

			}


			$('.results__container').html(html);

		};


		obj.getHTMLforStop = function(data) {

			
			var html = [];
			html.push(
				'<div class="results__result slide-in-fwd-center busstop">',
					'<div class="row">',
						'<div class="route route--',data.color,'"><i class="fad fa-bus-alt"></i></div>',
						'<div class="content">',

							'<div class="busstop-info"><i class="fas fa-map-marker-alt"></i></div>',

							'<h2>Vaihto pysäkillä <span class="stop-icon">',data.stop,'</span></h2>',
							'<p>Käytä ',app.getColorLabel(data.color),' linjaa, joka kulkee kohti päätepysäkkiä <span class="stop-icon">',data.destination,'</span></p>',

						'</div>',
					'</div>',

					'<div class="row">',

						'<div class="route route--',data.color,' route--path"></div>',

						'<div class="content">',
							'<div class="time-estimate">',
								'<i class="fal fa-clock"></i> Seuraavalla pysäkille: ', data.toNext ,' min',
							'</div>',
						'</div>',

					'</div>',
				'</div>'
			);
			return html.join("");
		};

		obj.getHTMLForLine = function(color, times) {
			var html = [];
			for(var i=0; i<times; i++) {
				html.push('<div class="results__line results__line--', color,'"></div>');
			}
			return html.join("");
		};

		obj.getHTMLforCombinedStops = function(data) {


			var html = [];
			html.push(
				'<div class="results__result-multiple slide-in-fwd-center">',

					'<a href="#" class="show-all-stops">',
						'<div class="route route--', data.color,'">',
							'<div class="route-container">',
								'<i class="fas fa-map-marker-alt"></i>',
								'<div class="stop-count-container"><i class="fal fa-times"></i><span class="count">',data.stops.length,'</span></div>',
							'</div>',
						'</div><div class="info">Näytä kaikki välipysäkit</div>',
					'</a>',

					'<div class="hidden-stops">'
			);

			var printLine = false;

			for(var index in data.stops) {

				var stop = data.stops[index];

				console.log(data.stops.length);

				if(data.stops.length > 1 && printLine) {
					html.push('<div class="results__line results__line--', data.color,'"></div>');
				}

				printLine = true;

				html.push(
					'<div class="hidden-stop slide-in-fwd-center">',
						'<div class="route route--', data.color,'">',
							'<div class="route-container">',
								'<i class="fas fa-map-marker-alt"></i>',
							'</div>',
						'</div>',
						'<div class="info">',
							'Pysäkki <span class="stop-icon">', stop.from,'</span>',
						'</div>',
					'</div>'
				);
			}
			

			html.push(
					'</div>',
				'</div>'
			);

			return html.join("");
		};

		obj.getHTMLforStartStop = function(data) {

			var html = [];
			html.push(
				'<div class="results__result busstop slide-in-fwd-center">',
					'<div class="row">',
						'<div class="route route--',data.color,'"><i class="fad fa-bus-alt"></i></div>',
						'<div class="content">',

							'<div class="busstop-info"><i class="fas fa-map-marker-alt"></i></div>',

							'<h2>Matka alkaa pysäkiltä <span class="stop-icon">',data.stop,'</span></h2>',
							'<p>Käytä ',app.getColorLabel(data.color),' linjaa, joka kulkee kohti päätepysäkkiä <span class="stop-icon">',data.destination,'</span></p>',

						'</div>',
					'</div>',

					'<div class="row">',

						'<div class="route route--',data.color,' route--path"></div>',

						'<div class="content">',
							'<div class="time-estimate">',
								'<i class="fal fa-clock"></i> Seuraavalla pysäkille: ', data.toNext ,' min',
							'</div>',
						'</div>',

					'</div>',
				'</div>'
			);
			return html.join("");
		};

		obj.getHTMLforEndStop = function(data) {
			var html = [];
			html.push(
				'<div class="results__result results__result-end slide-in-fwd-center">',
					'<div class="route route--',data.color,'">',
						'<i class="fas fa-map-marker-alt"></i>',
					'</div>',
					'<div class="content">',

						'<h2>Olet perillä pysäkillä <span class="stop-icon stop-icon-lg">',data.stop,'</span></h2>',
						
						'<div class="time-estimate">',
							'<i class="fal fa-clock"></i> Matkan kokonaiskesto: ',data.total,' min',
						'</div>',
					'</div>',
				'</div>'
			);
			return html.join("");
		};

		obj.getHTMLforFail = function() {
			var html = [];
			html.push('');
			return html.join("");
		};

		obj.showHiddenStops = function($link, $el) {

			$link.hide();
			$el.show();

		};


		obj.getDestination = function(from, to, color) {

			
			var to_index = -1;
			var from_index = -1;

			if(color in app.lines) {
				var arr = app.lines[color];
				for(var i=0; i<arr.length; i++) {
					if(arr[i] == from) {
						from_index = i;
					}
					if(arr[i] == to) {
						to_index = i;
					}
					if(to_index >= 0 && from_index >= 0) {
						break;
					}
				}
			}

			if(to_index > from_index) {
				return app.lines[color][app.lines[color].length-1];
			} else {
				return app.lines[color][0];
			}

		};



		return obj;

	})(jQuery);

	app.init();

	
	$(document).on('click', '.show-all-stops', function(e){
		e.preventDefault();

		var $el = $(this).parent().find('.hidden-stops');
		if($el.length > 0) {
			app.showHiddenStops($(this), $el);
		}
	});

	$(document).on('click', '.findPath', function(e){
		
		e.preventDefault();

		var from = $('#from').val();
		var to = $('#to').val();
		if(from == to) {
			alert("Valitse kaksi eri pysäkkiä!");
			return;
		}

		if(from == '0' || to == '0') {
			alert("Valitse lähtö- ja päätepysäkki!");
			return;
		}


		var graph = jQuery.extend(true, {}, app.busroutes);

		var result = algorithms.shortestPathAlgorithm(from, to, graph);
		app.displayResults(result);

	});

	