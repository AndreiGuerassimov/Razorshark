jQuery(document).ready(function() {
    'use strict';
	
    var dataset = [];
	var files = 0;
	var speed = 0;

    jQuery.getJSON('https://api.myjson.com/bins/4g7f4', function(json) {
		
		// Populate variales with JSON records
        for (var i = 0; i < json.data.length; i++) {
			dataset[i] = json.data[i];
			files = json.files;
			speed = json.speed;
        }
		
		// Set widget values
		document.getElementById('result-audio').innerHTML = dataset[0].memory + '&#37;';
		document.getElementById('result-video').innerHTML = dataset[1].memory + '&#37;';
		document.getElementById('result-photo').innerHTML = dataset[2].memory + '&#37;';
		document.getElementById('files').innerHTML = files.toLocaleString() + ' files';
		document.getElementById('speed').innerHTML = speed.toLocaleString() + ' Gb';
		
		// Initialize D3
		var width = 240;
		var height = 240;
		var radius = Math.min(width, height) / 2;
		var donutWidth = 60;
		var color = d3.scale.ordinal().range(['#4daf7b', '#e55e3a', '#ebc85e', '#f6f0ec']);

		// Create SVG
		var svg = d3.select('#pie')
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.append('g')
			.attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

		// Create arc
		var arc = d3.svg.arc()
			.innerRadius(radius - donutWidth)
			.outerRadius(radius);
		
		// Arrange pie values
		var pie = d3.layout.pie()
			.value(function(d) { return d.memory; })
			.sort(null);

		// Path out the pie
		var path = svg.selectAll('path')
			.data(pie(dataset))
			.enter()
			.append('path')
			.attr('d', arc)
			.attr('fill', function(d, i) { 
				return color(i);
			});
	});
});