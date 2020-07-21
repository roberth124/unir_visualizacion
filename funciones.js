var dataset
		
function cargarDataSet() {
	d3.csv("../datos/peliculasDataset.csv", castearEnteros, function(data){ // cargamos el dataset peliculasDataset
		dataset = data
		console.log(dataset)
		generarGrafica() // llamamos a la funcion que generarar la grafica de barras
		});
	}

function castearEnteros(d){
	d.recaudacion_mundial = +d.recaudacion_mundial /10000000; // cateamos de cadena a entero
	return d;
	}


function generarGrafica(){      // funcion para generar y mostra la grafica
	var w = dataset.length * 60; 
	var h = 300;
	
	var svg = d3.select('svg')
				.attr("width", w)
				.attr("height", h);
	
	
	svg .selectAll("rect")
			.data(dataset)
			.enter()
			.append("rect")
			.attr("x", 0)
			.attr("y", 0)
			.attr("width", 20)
	.attr("x", function(d, i){
			return i * 31 + 20;  // colocamos posicion en X para cada rect
	})
	.attr("height", function(d){
			return d.recaudacion_mundial;  // ssignamos valor  de cada pelicula
	})
	.attr("y", function(d){
		return h - d.recaudacion_mundial; // invertimos valores para que muestre una grafica  vertical
	})
    .on("mouseover", function(d,i){   // Escribe cada que se pasa el mosuse por encima de algun elemento "rect"
		d3.select(".resultado")  
			.text("Pelicula : "+ d.pelicula +"     Recaudacion Mundial :  " + d. recaudacion_mundial)
	})
	.on("mouseout", function(d,i){  // Borra el mensjae cada que se deja algun elemento "rec"
		d3.select(".resultado")  
			.text("Pelicula :                        Recaudacion Mundial :       ")
	});
	
	
	svg.selectAll("text")   // definimos titulos para el eje x
			.data(dataset)
			.enter()
			.append("text")
			.text(function(d){
				return d.pelicula
			})
	.attr("writing-mode","vertical-rl")
    .attr("text-orientation","upright")
	.attr("x", function(d, i){
		return i * 31 + 30;
	})
	.attr("y", function(d){
		return h - d.recaudacion_mundial - 3;
	})
}