	function getValorCampo(obj, nomeCampo) {
		return isVazio(obj) || isVazio(obj[nomeCampo]) ? null : obj[nomeCampo];
	}

	function isVazio(obj) {
		return (typeof obj === 'undefined') || (obj === null) || (obj === "");
	}

	function formatarFn(input) {
		if(isVazio(input) || (input.length !== 11 && input.length !== 14 && input.length !== 18)) {
			return '';
		}

		if(input.length === 11) {
			return formatar('###.###.###-##', input);
		}

		if(input.length === 14) {
			return formatar('##.###.###/####-##', input);
		}

		if(input.length === 18) {
			return formatar('####/##/##/##:##:##-###-#', input);
		}

		function Caracteres(s) {
			var indice = 0;
			var string = s;

			this.proximo = function() {
				if(indice >= string.length) {
					return void 0;
				}

				return string.charAt(indice++);
			};

			this.contem = function() {
				return indice < string.length;
			};
		}

		function formatar(mascara, string) {
			var caracteres = new Caracteres(string);
			var simbolos = new Caracteres(mascara);
			var resposta = '';

			while(simbolos.contem()) {
				var simbolo = simbolos.proximo();

				if(simbolo !== '#') {
					resposta += simbolo;
					continue;
				}

				var letra = caracteres.proximo();

				if(letra !== void 0) {
					resposta += letra;
				}
			}

			while(caracteres.contem()) {
				resposta += caracteres.proximo();
			}

			return resposta;
		}
	}
	
	function exibir(grafo, hierarquia) {
		var graf = new Grafo(grafo);
		var raiz = hierarquia;
		var atri = null;

		function Grafo(caminho) {
			var array = caminho.split('.');
			var indice = 0;

			this.contem = function() {
				return indice < array.length;
			}

			this.proximo = function() {
				if(!this.contem()) {
					return void 0;
				}
			
				return array[indice++];
			}
		}
		
		if(isVazio(hierarquia) || isVazio(grafo)) {
			return false;
		}

		while(graf.contem()) {
			atri = raiz[graf.proximo()];

			if(atri == void 0 || atri.visivel != true) {
				break;
			}     

			raiz = atri;               
		}

		return !graf.contem() && atri != void 0 && atri.visivel === true;
	}

	
	
	
	