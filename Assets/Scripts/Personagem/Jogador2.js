#pragma strict
class Jogador2 extends MonoBehaviour{
	var main:GameObject;
	//static var casaAtual:int = 0;
	
	var moveu:boolean;
	var nome:String;
	var corDoLabel:Color;
	var numeroDeJogador:int;
	var particleEntrarCena1:Transform;
	var particleEntrarCena2:Transform;
	var particleAura:Transform;
	var particlePerdeAura:Transform;
	static var imunidadeAtivada:boolean = false;
	static var aguardarRodada:boolean = false; //Lembrar de sempre setar false quando sair do jogo
	private var objetoLabel:TextMesh;
	
	static var valorDoDadoJogador2:int;
	//
	//var materialPersonagem:Material;
	
	//
	
	function Awake(){
		
	}
	function Start () {
		//imunidadeAtivada= true;
		objetoLabel = gameObject.GetComponentInChildren(TextMesh);
		switch(numeroDeJogador){
			case 1:
				objetoLabel.text = MainPersonalizarPersonagem.nomeJogador1;
			break;
			case 2:
				objetoLabel.text = MainPersonalizarPersonagem.nomeJogador2;
			break;
		}
		
		objetoLabel.renderer.material.color = corDoLabel;
		
		//animacoes
		 //GetComponentInChildren(Animacoes).person = numeroDeJogador;
	}
	
	function Update () {
		//objetoLabel.text = nome;
		try{
			objetoLabel.transform.LookAt(objetoLabel.transform.position - (Camera.current.transform.position - objetoLabel.transform.position));
		}
		catch(e){
			
		}
		//objetoLabel.transform.position = transform.position+Vector3(0,12,0);
		if(imunidadeAtivada){
			particleAura.particleSystem.Play();
		}
		else{
			particleAura.particleSystem.Stop();
		}
	}
	function Mover() {
		
		valorDoDadoJogador2 = ValorDoDado.face;
		Animacoes.podeAndar = true;
		if(ValorDoDado.face == 1){
			var ponto:Transform;
			
			if(GameStates1Jogador.turnoDoJogador == 1){
				ponto = main.GetComponent(CasasTabuleiro).casas[MainScript2.casaAtualJogador2+1];
			}if(GameStates1Jogador.turnoDoJogador == 2){
				ponto = main.GetComponent(CasasTabuleiro).casasJogador2[MainScript2.casaAtualJogador2+1];
			}
			iTween.MoveTo(
				gameObject, iTween.Hash(
					"position", ponto,
					"speed", 30,
					"easetype", "linear",
					"oncomplete", "mudarEstadoAnim",
					"orienttopath",true,
					"onupdate","Animar"
				)
			);
			
		}else{
			iTween.MoveTo(
				gameObject, iTween.Hash(
					"path",	main.GetComponent(CasasTabuleiro).criarPath(
														MainScript2.casaAtualJogador2+1,
														MainScript2.casaAtualJogador2+ValorDoDado.face, 
														GameStates1Jogador.turnoDoJogador),
					"speed", 30, // o padrão é 30
					"easetype", "linear",
					"oncomplete", "mudarEstadoAnim",
					"orienttopath",true,
					"onupdate","Animar"
				)
			);
		}
		

		//casaAtual = casaAtual + ValorDoDado.face;
		
		if(GameStates1Jogador.turnoDoJogador == 1){
				MainScript2.casaAtualJogador2 += ValorDoDado.face;
		}if(GameStates1Jogador.turnoDoJogador == 2){
				MainScript2.casaAtualJogador2 += ValorDoDado.face;
		}
	}
	
	function voltarOuAvancar (valor){
		main.GetComponent(Cameras).mudarCamera(1);
		var ponto:Transform;
		if(valor == 1){
			MainScript2.casaAtualJogador2+=1;
			ponto = main.GetComponent(CasasTabuleiro).casasJogador2[MainScript2.casaAtualJogador2];
			
		}
		else if(valor == -1){
			MainScript2.casaAtualJogador2-=1;
			ponto = main.GetComponent(CasasTabuleiro).casasJogador2[MainScript2.casaAtualJogador2];
			
		}
		iTween.MoveTo(
			gameObject, iTween.Hash(
				"position", ponto,
				"speed", 30,
				"easetype", "linear",
				"oncomplete","mudarEst",
				"orienttopath",true,
				"onupdate","Animar"
			)
		);
		GameStates1Jogador.MudarEstado(509);
	
	}
	function voltarOuAvancar2(valor:int){
		main.GetComponent(Cameras).mudarCamera(1);
		if(valor > 0){
			iTween.MoveTo(
				gameObject, iTween.Hash(
					"path", main.GetComponent(CasasTabuleiro).criarPath(
															MainScript2.casaAtualJogador2+1,
															MainScript2.casaAtualJogador2+valor, 
															2),
					"speed", 30,
					"easetype", "linear",
					"oncomplete","mudarEst",
					"orienttopath",true,
					"onupdate","Animar"
				)
			);
		}
		else if(valor < 0){
			iTween.MoveTo(
				gameObject, iTween.Hash(
					"path", main.GetComponent(CasasTabuleiro).criarPathVoltando(
															MainScript2.casaAtualJogador2,
															MainScript2.casaAtualJogador2+valor, 
															2),
					"speed", 30,
					"easetype", "linear",
					"oncomplete","mudarEst",
					"orienttopath",true,
					"onupdate","Animar"
				)
			);
		}
		MainScript2.casaAtualJogador2 += valor;
		GameStates1Jogador.MudarEstado(509);
	}
	function ativaParticles(){
		particleEntrarCena1.particleSystem.Play();
		particleEntrarCena2.particleSystem.Play();
	}
	function mudarEstadoAnim(){
		
		gameObject.GetComponent(InstanciaPersonagem).selecionado1.animation.Play("idle");
		Animacoes.podeAndar = false;
		
		if(GameStates1Jogador.turnoDoJogador == 2){
			//se o jogador cai na casa 3 mostrar os dentes
			if(MainScript2.casaAtualJogador2 == 2)
			{
				ativaParticles();
				yield WaitForSeconds(3);
				GameStates1Jogador.MudarEstado(12);
			}
			
			else if(MainScript2.casaAtualJogador2 == 27){
				
				ativaParticles();
				yield WaitForSeconds(3);
				GameStates1Jogador.MudarEstado(59);
			
			}
			//se o jogador cai na casa 5 fio dental
			else if(MainScript2.casaAtualJogador2 == 4 ){
				
				ativaParticles();
				yield WaitForSeconds(3);
				GameStates1Jogador.MudarEstado(16);
			}
			//outra cena do fio dental
			else if(MainScript2.casaAtualJogador2 == 21||
				MainScript2.casaAtualJogador2 == 38){
				ativaParticles();
				
				yield WaitForSeconds(3);
				GameStates1Jogador.MudarEstado(27);
			}
			//se o jogador cair na casa 6 Imunidade
			else if(MainScript2.casaAtualJogador2 == 5 ||
					MainScript2.casaAtualJogador2 == 12 ||
					MainScript2.casaAtualJogador2 == 39
					)
			{
				ativaParticles();
				yield WaitForSeconds(3);
				GameStates1Jogador.MudarEstado(15);
			}			
			// se o jogador cair na casa 7 jogador Esperto
			else if(MainScript2.casaAtualJogador2 == 6){
				ativaParticles();
				yield WaitForSeconds(3);
				GameStates1Jogador.MudarEstado(18);
			}
			//se o jogador esta com a gengiva machucada
			else if(MainScript2.casaAtualJogador2 == 9){
				if(imunidadeAtivada){
					imunidadeAtivada = false;
					//particleAura.particleSystem.gameObject.active = false;
					particlePerdeAura.particleSystem.Play();
					yield WaitForSeconds(5); // pra simular a cena de animação
					GameStates1Jogador.MudarEstado(6);
				}else{
					ativaParticles();
					yield WaitForSeconds(3);
					GameStates1Jogador.MudarEstado(20);
				}
			}
			//perde imunidade (COMEU DOCES)
			else if(MainScript2.casaAtualJogador2 == 10 ||
					MainScript2.casaAtualJogador2 == 24 ||
					MainScript2.casaAtualJogador2 == 35 ||
					MainScript2.casaAtualJogador2 == 45)
			{
				if(imunidadeAtivada){
					perdeImunidade();
				}else{
					yield WaitForSeconds(2); // pra simular a cena de animação
					GameStates1Jogador.MudarEstado(6);
				}
			}
			// Dente de lodo, placa bacteriana gruda nele
			else if(MainScript2.casaAtualJogador2 == 11){
				if(imunidadeAtivada){
					perdeImunidade();
				}else{
					ativaParticles();
					yield WaitForSeconds(3);
					 // pra simular a cena de animação
					GameStates1Jogador.MudarEstado(21);
				}
				
			}
			// Dente de lodo, placa bacteriana gruda nele
			else if(MainScript2.casaAtualJogador2 == 23){
				if(imunidadeAtivada){
					perdeImunidade();
				}else{
					ativaParticles();
					yield WaitForSeconds(3);
					 // pra simular a cena de animação
					GameStates1Jogador.MudarEstado(29);
				}
				
			}
			// cenaCarie
			
			else if(MainScript2.casaAtualJogador2 == 14 || 
				MainScript2.casaAtualJogador2 == 32){
				if(imunidadeAtivada){
					perdeImunidade();
				}else{
					ativaParticles();
					yield WaitForSeconds(3); // pra simular a cena de animação
					aguardarRodada = true;
					GameStates1Jogador.MudarEstado(23);
				}
				
			}
			//cena volte ao dentista mais proximo
			else if(MainScript2.casaAtualJogador2 == 19){
				if(imunidadeAtivada){
					perdeImunidade();
				}else{
					ativaParticles();
					yield WaitForSeconds(2); // pra simular a cena de animação
					GameStates1Jogador.MudarEstado(52);
					//GameStates1Jogador.MudarEstado(44);
				}
				
			}
			// escovou os dentes avanca 2 casas
			else if(MainScript2.casaAtualJogador2 == 15 ||
				MainScript2.casaAtualJogador2 == 46){
					ativaParticles();
					yield WaitForSeconds(3); // pra simular a cena de animação
					GameStates1Jogador.MudarEstado(24);
				
				
			}
			//escovou os dentes avanca 1 casa
			else if(MainScript2.casaAtualJogador2 == 28){
					ativaParticles();
					yield WaitForSeconds(3); // pra simular a cena de animação
					GameStates1Jogador.MudarEstado(50);
			}
			
			//cena bafo de onca
			else if(MainScript2.casaAtualJogador2 == 20 || 
				MainScript2.casaAtualJogador2 == 36){
				if(imunidadeAtivada){
					perdeImunidade();
				}else{
					aguardarRodada = true;
					ativaParticles();
					yield WaitForSeconds(3); // pra simular a cena de animação
					GameStates1Jogador.MudarEstado(25);
				}
			}
			//cena greve
			else if(MainScript2.casaAtualJogador2 == 30 ||
				MainScript2.casaAtualJogador2 == 44){
				if(imunidadeAtivada){
					perdeImunidade();
				}else{
					aguardarRodada = true;
					ativaParticles();
					yield WaitForSeconds(3); // pra simular a cena de animação
					GameStates1Jogador.MudarEstado(31);
				}
			}
			// gengiva sangrando 2
			else if(MainScript2.casaAtualJogador2 == 47){
				if(imunidadeAtivada){
					imunidadeAtivada = false;
					//particleAura.particleSystem.gameObject.active = false;
					particlePerdeAura.particleSystem.Play();
					yield WaitForSeconds(5); // pra simular a cena de animação
					GameStates1Jogador.MudarEstado(6);
				}else{
					ativaParticles();
					yield WaitForSeconds(3);
					GameStates1Jogador.MudarEstado(32);
				}
			}
			//cena prenda
			else if(MainScript2.casaAtualJogador2 == 16 ||
					MainScript2.casaAtualJogador2 == 26 ||
					MainScript2.casaAtualJogador2 == 41){
					ativaParticles();
					yield WaitForSeconds(2); // pra simular a cena de animação
					GameStates1Jogador.MudarEstado(41);
				
				
			}
			//mostrar os dentes 3 casas
			else if(MainScript2.casaAtualJogador2 == 40)
			{
				ativaParticles();
				yield WaitForSeconds(3);
				GameStates1Jogador.MudarEstado(51);
			}
			
			else if(MainScript2.casaAtualJogador2 == 49 ||
				MainScript2.casaAtualJogador2 == 50 ||
				MainScript2.casaAtualJogador2 == 51 ||
				MainScript2.casaAtualJogador2 == 52 ||
				MainScript2.casaAtualJogador2 == 53 ||
				MainScript2.casaAtualJogador2 == 54 )
			{
				ativaParticles();
				yield WaitForSeconds(2);
				GameStates1Jogador.MudarEstado(45);
			
			}
			
			else if(MainScript2.casaAtualJogador2 == 33){
				if(imunidadeAtivada){
					imunidadeAtivada = false;
					//particleAura.particleSystem.gameObject.active = false;
					particlePerdeAura.particleSystem.Play();
					yield WaitForSeconds(5); // pra simular a cena de animação
					GameStates1Jogador.MudarEstado(6);
				}else{
					ativaParticles();
					yield WaitForSeconds(3);
					GameStates1Jogador.MudarEstado(55);
				}
			}
			
			else if(MainScript2.casaAtualJogador2 == 13){
					ativaParticles();
					yield WaitForSeconds(3);
					GameStates1Jogador.MudarEstado(58);
				
			}
			
			
			
						
			//::::::::::::FIM da Checagem das casas
			else{
				yield WaitForSeconds(2); // pra simular a cena de animação
				GameStates1Jogador.MudarEstado(6);
			//main.GetComponent(Cameras).mudarCamera(1);
			}
		}else {
			yield WaitForSeconds(2);
			
			GameStates1Jogador.MudarEstado(6);
			//main.GetComponent(Cameras).mudarCamera(0);
		}
	}
	function mudarEst(){
	
		gameObject.GetComponent(InstanciaPersonagem).selecionado1.animation.Play("idle");
		Animacoes.podeAndar = false;
		yield WaitForSeconds(2);
		main.GetComponent(Cameras).mudarCamera(0);
		GameStates1Jogador.MudarEstado(1);
		
	}
	function Animar(){
		gameObject.GetComponent(InstanciaPersonagem).selecionado1.animation.Play("correndo");
	}
	function carregarCenaAnimacao () {
		
	}
	function perdeImunidade(){
		imunidadeAtivada = false;
		//particleAura.particleSystem.gameObject.active = false;
		particlePerdeAura.particleSystem.Play();
		yield WaitForSeconds(5); // pra simular a cena de animação
		GameStates1Jogador.MudarEstado(6);
	}
	function exibirNome(){
		
	}
	function OnGUI(){
		//GUI.Label(Rect(10,10,100,100),aguardarRodada.ToString());
	}
}