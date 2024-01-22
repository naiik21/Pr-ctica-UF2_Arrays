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

//Varaibles
var bbdd = null;
let lista = [];
let tiposColumnas;
let columnNames;
let mitjanaNT = 0;
let nObj = 0;

// Funció per selccionar la base de dadaes i contrlar que ho fas
function env() {
	event.preventDefault(); // Evita la recarga de la página si es un formulario
	try {
		bbdd = document.querySelector('input[name=bbdd]:checked').value; //Selecciona la opció del formulari
		lista = [];
		tiposColumnas;
		mitjanaNT = 0;
		nObj = 0;
		selectBBDD(bbdd);

	} catch (error) {
		alert("Selecciona una llista i envia");
		location.reload();
	}

}

// Carrega bbdd que volem utilitzar
function selectBBDD(bbdd) {
	lista = [];
	nObj = 0;
	mitjanaNT = 0;
	if (bbdd == "pokemons") {
		pokemons.forEach((pokemon) => {
			lista.push([pokemon.id, pokemon.img, pokemon.name, pokemon.weight]);
			nObj++;
			mitjanaNT += parseFloat(pokemon.weight);
		});
		columnNames = ['ID', 'Imatge', 'Nom', 'Pes'];
		tiposColumnas = ['int', 'img', 'string', 'float'];
	} else if (bbdd == "municipis") {
		municipis.forEach((municipi) => {
			lista.push([municipi.grup_ajuntament.codi_postal, municipi.municipi_escut, municipi.municipi_nom, municipi.nombre_habitants]);
			nObj++;
			mitjanaNT += parseFloat(municipi.nombre_habitants);
		});
		columnNames = ['Codic Postal', 'Escut', 'Nom', 'Nº Habitants'];
		tiposColumnas = ['string', 'img', 'string', 'int'];
	} else if (bbdd == "meteorits") {
		meteorits.forEach((meteorit) => {
			lista.push([meteorit.id, meteorit.year, meteorit.name, meteorit.mass]);
			if (meteorit.mass === undefined) {
				nObj++;
				mitjanaNT += 0;
			} else {
				nObj++;
				mitjanaNT += parseFloat(meteorit.mass);
			}
		});
		columnNames = ['ID', 'Data', 'Nom', 'Pes'];
		tiposColumnas = ['int', 'year', 'string', 'float'];
	} else if (bbdd == "pelicules") {
		pelicules.forEach((pelicula) => {
			lista.push([pelicula.rating, pelicula.url, pelicula.title, pelicula.year]);
			nObj++;
			mitjanaNT += parseFloat(pelicula.rating);
		});
		columnNames = ['Valoració', 'Imatge', 'Titol', 'Any'];
		tiposColumnas = ['float', 'img', 'string', 'int'];
	}
}

function imprTaulaNormal() {
	selectBBDD(bbdd)
	imprTable(lista, tiposColumnas);
}

/*Funcio que ordena la llisa
order: como volem que ho fagi si descendent o ascendent
key: la columna qu voolem ordenar
llamada: per on es crida la funció*/
let orden = 'asc';
function orderList(order, key, llamada) {
	selectBBDD(bbdd);

	// La funcio ha sigut cridada per la taula 
	if (llamada == 'num') {
		//Funció de comparació per ordenar per el segon valor de cada subarray
		const compararPorSegundoValor = (a, b) => {
			let valorA = a[key];
			let valorB = b[key];
			let tipo = tiposColumnas[key];

			switch (tipo) {
				case 'int':
					valorA = parseInt(valorA);
					valorB = parseInt(valorB);
					break;
				case 'img':
					break;
				case 'string':
					return valorA.localeCompare(valorB);
				case 'float':
					valorA = parseFloat(valorA);
					valorB = parseFloat(valorB);
					break;
				case 'year':
					valorA = parseInt(valorA);
					valorB = parseInt(valorB);
					break;
				/*default:
					celda.textContent = obj[key];
					break;
				*/
			}

			// Ahora realizamos la comparación después de la conversión
			return valorA > valorB ? 1 : valorA < valorB ? -1 : 0;
		};
		if (order == 'asc') {
			lista.sort(compararPorSegundoValor);
		} else if (order == 'desc') {
			lista.sort(compararPorSegundoValor);
			lista.reverse();
		}
		imprTable(lista, tiposColumnas);
	}
	//Funció cridada per boto 
	else {
		//Funció de comparació per ordenar per el segon valor de cada subarray
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
		//}
		imprTable(lista, tiposColumnas);
	}
}

// Busquem els valors que volem per un buscador
function searchList(nom) {
	//let nom = prompt("Diguem el nom del/a " + bbdd + ":");
	//let resultado = lista.filter(valor => valor[2] != nom);
	let resultado = lista.filter(valor => valor[2].toLowerCase().includes(nom.toLowerCase()));

	imprTable(resultado, tiposColumnas)
}

//Funció que calcula la mitjana de la llista 
function calcMitjana() {
	let mitjana = mitjanaNT / nObj
	mitjana = mitjana.toFixed(2);
	alert(mitjana);
}

// 
function imprTable(bbdd, tiposColumnas) {
	document.getElementById("resultat").innerHTML = "";
	if (myChart) {
		// Destruye el gráfico existente si hay uno
		myChart.destroy();
	}
	if (bbdd == null || tiposColumnas == null) {
		alert("Selecciona una llista i envia");
		location.reload();
	}
	let table = document.createElement("table");
	table.border = "1";
	let cabezera = table.createTHead();

	// Añadimos las columnas de la variable columnNames a la cabecera
	let row = cabezera.insertRow(0);
	Object.keys(bbdd[0]).forEach(function (key, index) {
		let th = document.createElement("th");
		th.onclick = function () {
			orderList(orden, key, 'num');
			if (orden == 'asc') {
				orden = 'desc';
			} else {
				orden = 'asc';
			}
		};

		th.textContent = columnNames[key];
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



//* Part 2
let myChart = null;

function grafic() {
	document.getElementById("resultat").innerHTML = "";
	const data = {
		labels: [],
		datasets: [{
			label: 'My First Dataset',
			data: [],
			backgroundColor: [],
			borderColor: []
		}]
	}
	const config = {
		type: 'polarArea',
		data: data,
		options: {}
	};

	const grafMap = new Map();
	let count = 0;

	if (bbdd == "pokemons") {
		//Pokemons
		pokemons.forEach((pokemon) => {
			pokemon.type.forEach((type) => {
				if (!grafMap.has(type)) {
					grafMap.set(type, 0);
					count++;
				}
				grafMap.set(type, grafMap.get(type) + 1);
			});
		});
		grafMap.forEach(function (value, key) {
			data.labels.push(key);
			data.datasets[0].data.push(value);
		});
	} else if (bbdd == "municipis") {
		//Municipis
		municipis.forEach((municipi) => {
			if (!grafMap.has(municipi.grup_comarca.comarca_nom)) {
				grafMap.set(municipi.grup_comarca.comarca_nom, 0);
				count++;
			}
			grafMap.set(municipi.grup_comarca.comarca_nom, grafMap.get(municipi.grup_comarca.comarca_nom) + 1);
		});
		grafMap.forEach(function (value, key) {
			data.labels.push(key);
			data.datasets[0].data.push(value);
		});
	} else if (bbdd == "meteorits") {
		//Meteorits
		meteorits.forEach((meteorit) => {
			if (!grafMap.has(meteorit.fall)) {
				grafMap.set(meteorit.fall, 0);
				count++;
			}
			grafMap.set(meteorit.fall, grafMap.get(meteorit.fall) + 1);

		});
		grafMap.forEach(function (value, key) {
			data.labels.push(key);
			data.datasets[0].data.push(value);
		});
	} else if (bbdd == "pelicules") {
		//Pelicules
		pelicules.forEach((pelicula) => {
			pelicula.genres.forEach((genere) => {
				if (!grafMap.has(genere)) {
					grafMap.set(genere, 0);
					count++;
				}
				grafMap.set(genere, grafMap.get(genere) + 1);
			});
		});
		grafMap.forEach(function (value, key) {
			data.labels.push(key);
			data.datasets[0].data.push(value);
		});
	}

	for (let n = 0; n < count; n++) {
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		data.datasets[0].backgroundColor.push("rgba(" + r + "," + g + "," + b + ", 0.2)");
		data.datasets[0].borderColor.push("rgba(" + r + "," + g + "," + b + ")");
	}


	if (myChart) {
		// Destruye el gráfico existente si hay uno
		myChart.destroy();
	}

	// Crea un nuevo gráfico
	myChart = new Chart(
		document.getElementById('myChart'),
		config
	);

}


//* Parte 3
// let inputSearch = document.getElementById('txtSearch')
// inputSearch.addEventListener('input', (e) => {
// 	console.log(inputSearch.value)
// });

let nom = "";


document.addEventListener('DOMContentLoaded', function () {
	let inputSearch = document.getElementById('txtSearch');
	inputSearch.addEventListener('input', (e) => {
		searchList(inputSearch.value);
	});
});


//* Part 4
function listaObj() {
	document.getElementById("resultat").innerHTML = "";
	if (bbdd == 'pokemons') {
		var pokemonsDeObjetos = [];

		lista.forEach((pokemon) => {
			var pokemonObjeto = {
				id: pokemon[0],
				img: pokemon[1],
				name: pokemon[2],
				weight: pokemon[3]
			};
			pokemonsDeObjetos.push(pokemonObjeto);
		});

		// Crear la tabla y el cuerpo de la tabla
		var table = document.createElement("table");
		table.border = "1";

		var thead = document.createElement("thead");
		var headerRow = thead.insertRow();
		["ID", "Image", "Name", "Weight"].forEach(function (headerText) {
			var th = document.createElement("th");
			th.textContent = headerText;
			headerRow.appendChild(th);
		});
		table.appendChild(thead);

		var tbody = document.createElement("tbody");

		pokemonsDeObjetos.forEach(function (pokemon) {
			var row = tbody.insertRow();

			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			var cell4 = row.insertCell(3);

			cell1.textContent = pokemon.id;
			cell2.innerHTML = `<img src="${pokemon.img}" alt="${pokemon.name}" width="50" height="50">`;
			cell3.textContent = pokemon.name;
			cell4.textContent = pokemon.weight;
		});

		table.appendChild(tbody);

		// Agregar la tabla al cuerpo del documento
		document.getElementById("resultat").appendChild(table);

	} else {
		alert('Aquest boto nomes serveix per pokemons')
	}

}