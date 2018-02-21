/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {}; //No hacer nada con ella, crea un objeto vacio o del tipo indicado si ya existe, sirve para hacer inicilizaciones y que no se machaque cosas que se han hecho con ficheros js anteriores+

/**
 * Constructora de MemoryGame
 */
MemoryGame = function(gs) {

	this.gs = gs;
	this.cartasTipo = [];
	this.cartasTablero = [];
	this.numCartasEncontradas = 0;
	this.texto = 'Memory Game';

	var that = this;	

		/*var creaCartasTipo = function() {
			var i = 0;
			console.log(this);
			for (var tile in gs.maps) {
				that.cartasTipo[i] = tile;//RANDOMIZAR DESPUEEES 
				i++;
			};
		};*/

	this.initGame = function() {

		var i = 0;
		while (i < 16) {
			if ( (i/2) != 1 ) {
				that.cartasTablero[i] = that.cartasTipo[i/2];
				i++;
			}
		};
		console.log(that.cartasTablero);
		console.log(that.cartasTipo);
		//console.log(gs.maps[this.cartas[3]]);//Mirar así
		
	};

	this.draw = function() {

	};

	this.loop = function() {
		
	};

	this.onClick = function(cardId) {
		
	};

};



/**
 * Constructora de las cartas del juego. Recibe como parámetro el nombre del sprite que representa la carta.
 * Dos cartas serán iguales si tienen el mismo sprite.
 * La carta puede guardar la posición que ocupa dentro del tablero para luego poder dibujarse
 * @param {string} id Nombre del sprite que representa la carta
 */
MemoryGameCard = function(id) {

};
