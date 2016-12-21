    function getValorCampo = function (obj, nomeCampo) {
        return isVazio(obj) || isVazio(obj[nomeCampo]) ? null : obj[nomeCampo];
    };

    function isVazio = function (obj) {
        return (typeof obj === 'undefined') || (obj === null) || (obj === "");
    };


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
		};