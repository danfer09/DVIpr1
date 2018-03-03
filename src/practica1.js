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
	this.arrayCartas = [];
	this.cartasTipo = [];
	this.cartaBack;
	this.numCartasEncontradas = 0;
	this.cartasVolteadas = 0;
	this.cartaArribaTile;
	this.cartaArribaPos;
	this.texto = 'Memory Game';
	this.tocable = true;
	this.numTipos = []

	var that = this;

	this.numeroAleatorio = function(num) {
		return Math.floor(Math.random()*(num+1));
	}

	this.initNumTipos = function(){
		for (var i = 0; i < 9; i++) {
			that.numTipos[i]= 0;
		}
	}
	this.initGame = function() {

		var j = 0;
		for (var tile in that.gs.maps) {
			if (tile == "back") {
				this.cartaBack = tile;
			} else {
				that.cartasTipo[j] = tile;
				j++;
			}
		}
		that.initNumTipos();
		var totalCartas = 0;
		var i = 0;
		for (var i = 0; i < 16; i++) {
			al = that.numeroAleatorio(7);
			while(that.numTipos[al]==2)
				al = that.numeroAleatorio(7);
			that.numTipos[al]++;
			that.arrayCartas[i] = new MemoryGameCard(that.cartasTipo[al]);
		}

		that.loop();
	};

	this.draw = function() {
		that.gs.drawMessage(that.texto);
		var i = 0;
		for (var i = 0; i < 16; i++)
			that.arrayCartas[i].draw(that.gs,i);
	};

	this.loop = function() {
		setInterval(that.draw,16);
	};

	//* @param {int} CardId
	this.onClick = function(cardId) {
		if (that.tocable && that.arrayCartas[cardId].status == 0) {
			that.cartasVolteadas++;
			that.arrayCartas[cardId].flip();

			if (that.cartasVolteadas == 1) {
				that.cartaArribaTile = that.arrayCartas[cardId];
				that.cartaArribaPos = cardId;
			} else {
				if (that.arrayCartas[cardId].compareTo(that.cartaArribaTile)) {
					that.numCartasEncontradas += 2;
					that.arrayCartas[cardId].found();
					that.arrayCartas[that.cartaArribaPos].found();

					if (that.numCartasEncontradas == 16) {
						that.texto = "¡Congratulations!";
					} else {
						that.texto = "¡It´s a match!";
						that.tocable = false;
						setTimeout(function() {
							that.tocable = true;
							that.texto = "Memory Game";
						}, 1100);
					}
				} else {
					that.texto = "¡Error!";
					that.tocable = false;
					setTimeout(function() {
						that.tocable = true;
						that.arrayCartas[cardId].flip();
						that.arrayCartas[that.cartaArribaPos].flip();
						that.texto = "Memory Game";
					}, 1000);
				}
				that.cartasVolteadas = 0;
			}
		}
	};

};



/**
 * Constructora de las cartas del juego. Recibe como parámetro el nombre del sprite que representa la carta.
 * Dos cartas serán iguales si tienen el mismo sprite.
 * La carta puede guardar la posición que ocupa dentro del tablero para luego poder dibujarse
 * @param {string} id Nombre del sprite que representa la carta
 */
MemoryGameCard = function(id) {
	this.teja = id;
	this.status = 0;//0 = abajo, 1 = arriba o  2 = encontrada
	this.tejaBack= "back";

	var thatC = this;
	this.draw = function(gs, pos) {
		switch(thatC.status) {
			case 0:
				gs.draw(thatC.tejaBack, pos);
				break;
			case 1:
				gs.draw(thatC.teja, pos);
				break;
			case 2:
				gs.draw(thatC.teja, pos);
				break;
			default:
				break;
		}
	}

	this.flip = function() {
		if(thatC.status == 0)
			thatC.status = 1;
		else if(thatC.status == 1)
			thatC.status = 0;
	}

	this.found = function() {
		thatC.status = 2;
	}

	this.compareTo = function(otherCard) {
		return (thatC.teja === otherCard.teja);
	}
};

//MemoryGameCard.prototype = MemoryGame;