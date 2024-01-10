//*Part 0

//POKEMONS
let pokemons;
let pokeName = [];

fetch("js/data/pokemon.json")
	.then((response) => response.json())
	.then((data) => {
		pokemons = data.pokemon;

		pokemons.forEach((pokemon) => pokeName.push(pokemon.name));
	});


// MUNICIPIS
let municipis;
let municipiNom = [];

fetch("js/data/municipis.json")
	.then((response) => response.json())
	.then((data) => {
		municipis = data.elements;

		municipis.forEach((municipi) => municipiNom.push(municipi.municipi_nom));
	});


// METEORITS
let meteorits;
let meteoritName = [];

fetch("js/data/earthMeteorites.json")
	.then((response) => response.json())
	.then((data) => {
		meteorits = data;

		meteorits.forEach((meteorit) => meteoritName.push(meteorit.name));
	});


// MOVIES
let pelicules;
let peliTitle = [];

fetch("js/data/movies.json")
	.then((response) => response.json())
	.then((data) => {
		pelicules = data.movies;

		pelicules.forEach((peli) => peliTitle.push(peli.title));
	});


/*
setTimeout(() => {
	function tabla(pokeName, municipiNom, meteoritName, peliTitle) {
		let table = [];
		for (let n = 0; n <= 1000; n++) {
			let aux = [];
			aux.push(pokeName[n]);
			aux.push(municipiNom[n]);
			aux.push(meteoritName[n]);
			aux.push(peliTitle[n]);
			table.push(aux);
		}
		console.table(table);
	}
	tabla(pokeName, municipiNom, meteoritName, peliTitle);
}
	, 1000);

*/


//* Part 1

var bbdd = null;
let lista = [];
let tiposColumnas;
let mitjana = 0;
let nObj = 0;

function env() {
	event.preventDefault(); // Evita la recarga de la página si es un formulario
	bbdd = document.querySelector('input[name=bbdd]:checked').value;
	selectBBDD(bbdd);
}


function selectBBDD(bbdd) {
	if (bbdd == "pokemons") {
		pokemons.forEach((pokemon) => {
			lista.push([pokemon.id, pokemon.img, pokemon.name, pokemon.weight]);
			nObj++;
			mitjana += parseFloat(pokemon.weight);
		});
		mitjana = mitjana / nObj
		mitjana = mitjana.toFixed(2);
		tiposColumnas = ['int', 'img', 'string', 'float'];
	} else if (bbdd == "municipis") {
		municipis.forEach((municipi) => {
			lista.push([municipi.grup_ajuntament.codi_postal, municipi.municipi_escut, municipi.municipi_nom, municipi.nombre_habitants]);
			nObj++;
			mitjana += parseFloat(municipi.nombre_habitants);
		});
		mitjana = mitjana / nObj
		mitjana = mitjana.toFixed(2);
		tiposColumnas = ['string', 'img', 'string', 'int'];
	} else if (bbdd == "meteorits") {
		meteorits.forEach((meteorit) => {
			lista.push([meteorit.id, meteorit.year, meteorit.name, meteorit.mass]);
			nObj++;
			mitjana += parseFloat(meteorit.mass);
		});
		console.log(nObj);
		console.log(mitjana);
		mitjana = mitjana / nObj
		console.log(mitjana);
		mitjana = mitjana.toFixed(2);
		console.log(mitjana);
		tiposColumnas = ['int', 'year', 'string', 'float'];
	} else if (bbdd == "pelicules") {
		pelicules.forEach((pelicula) => {
			lista.push([pelicula.rating, pelicula.url, pelicula.title, pelicula.year]);
			nObj++;
			mitjana += parseFloat(pelicula.rating);
		});
		mitjana = mitjana / nObj
		mitjana = mitjana.toFixed(2);
		tiposColumnas = ['float', 'img', 'string', 'int'];
	}
}

function imprTaulaNormal() {
	imprTable(lista, tiposColumnas);
}

function orderList(order) {
	// Funció de comparació per ordenar per el segon valor de cada subarray
	const compararPorSegundoValor = (a, b) => {
		const valorA = a[2];
		const valorB = b[2];

		// Utiliza localeCompare per comparar cadenas de text de menera alfabética
		return valorA.localeCompare(valorB);
	};

	if (order == 'asc') {
		lista.sort(compararPorSegundoValor);
	} else if (order == 'desc') {
		lista.sort(compararPorSegundoValor);
		lista.reverse();
	}
	imprTable(lista, tiposColumnas);
}

function searchList() {
	let pos = prompt("Diguem un numero:");
}

function calcMitjana() {
	alert(mitjana);
}

function imprTable(bbdd, tiposColumnas) {
	let table = document.createElement("table");
	let cabezera = table.insertRow(0);

	// Creamos cabezera de las columnas
	Object.keys(bbdd[0]).forEach(function (key, index) {
		let th = document.createElement("th");
		th.textContent = key;
		cabezera.appendChild(th);

		// Establecemos el tipo de columna (int, img, string, float)
		th.dataset.tipo = tiposColumnas[index];
	});

	// Agregamos las filas de datos
	bbdd.forEach(function (obj) {
		let fila = table.insertRow();
		Object.keys(obj).forEach(function (key, index) {
			let celda = fila.insertCell();
			let tipo = tiposColumnas[index];

			// Aplicamos el formato según el tipo de columna
			switch (tipo) {
				case 'int':
					celda.textContent = parseInt(obj[key]);
					break;
				case 'img':
					let img = document.createElement('img');
					img.src = obj[key];
					celda.appendChild(img);
					break;
				case 'string':
					celda.textContent = obj[key];
					break;
				case 'float':
					celda.textContent = parseFloat(obj[key]);
					break;
				case 'year':
					let year = obj[key];
					celda.textContent = year;
				/*default:
					celda.textContent = obj[key];
					break;
				*/
			}
		});
	});

	// Mostrar la tabla en el contenedor
	document.getElementById("resultat").appendChild(table);
}