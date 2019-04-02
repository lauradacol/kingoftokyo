class dice {
    constructor(name) {     
		this.name = name;       
        this.picked = 0; 
        this.result = 0;
    }
 
	roll(id){
		var result = Math.floor( Math.random() * 6 ) + 1;
					
		if(result==4){
			result = "<img src=\"images/fist.png\" width=\"50%\">";	
			this.result = 4;				
		}

		else if(result==5){					
			result = "⚡";	
			this.result = 5;		
		}

		else if(result==6){
			result = "♥";	
			this.result = 6;	
		}
		
		else{
			this.result = result;
		}
				
		document.getElementById("d"+id).innerHTML = result;				
				
	} 
	
	chooseDice(id){
		if(this.picked==0){
			this.picked = 1;
			document.getElementById("d"+id).style.background = "gray";
			document.getElementById("d"+id).style.border = "2px solid black";	
			document.getElementById("p"+id).style.display = "block";
	}
	
		else if(this.picked==1){
			this.picked=0;
			document.getElementById("d"+id).style.background = "black";
			document.getElementById("d"+id).style.border = "2px solid #00cc00";					
			document.getElementById("p"+id).style.display = "none";
		}
	}
	
	diceInit(id){
		this.picked=1;
		this.chooseDice(id);
		document.getElementById("d"+id).innerHTML = "";
	}
	
}

class player{
	constructor(name, id, life, points, money, tokyo){
		this.name = name;
		this.id = id;
		this.life = life;
		this.points = points;
		this.money = money;
		this.tokyo = tokyo;
	}
	
	isDead(){
		if(this.life <=9){
			return true;
		}
		else{
			return false;
		}
	}
	
	colorsOfDeath(){
		document.getElementById(this.id).style.filter = "grayscale(100%)";
		document.getElementById(this.id+"Life").style.background = "black";
		document.getElementById(this.id+"Points").style.background = "black";
		document.getElementById(this.id+"Money").style.background = "black";			
		document.getElementById(this.id+"Life").style.color = "red";
		document.getElementById(this.id+"Points").style.color = "grey";
		document.getElementById(this.id+"Money").style.color = "grey";	
	}
}

class roundResults{
	constructor(){
		this.one = 0;
		this.two = 0;
		this.tree = 0;
		this.hand = 0;
		this.money = 0;
		this.life = 0;
		this.points = 0;
	}

	getResults(dices){
		for(var i=0; i<6; i++){
			if(dices[i].result == 1){
				this.one++;
			}
			else if(dices[i].result == 2){
				this.two++;
			}
			else if(dices[i].result == 3){
				this.tree++;
			}
			else if(dices[i].result == 4){
				this.hand++;
			}
			else if(dices[i].result == 5){
				this.money++;
			}
			else if(dices[i].result == 6){
				this.life++;
			}						
		}
	}		

	countPoints(){	
		if(results.one>=3){
			this.points+= results.one-2;
		}
		if(results.two>=3){
			this.points+= results.two-1;
		}
		if(results.tree>=3){
			this.points+= results.tree;
		}		
	}	
		
	clearResults(){
		this.one = 0;
		this.two = 0;
		this.tree = 0;
		this.hand = 0;
		this.money = 0;
		this.life = 0;
		this.points = 0;
	}		
}
/*******************************************************/

class gameRound{
	constructor(){
		this.playersArray = new Array();
		this.playersArray.push(new player("Meka Dragon", "mekaDragon", 10, 0, 0, 0));
		this.playersArray.push(new player("Cyber Bunny", "cyberBunny", 10, 0, 0, 0));
		this.playersArray.push(new player("The King", "theKing", 10, 0, 0, 0));		
		this.playersArray.push(new player("Giga Zaur", "gigaZaur", 10, 0, 0, 0));
		
		this.player = player;
		this.dices = new Array();
		this.countRound = 0;
		this.tokyo = null;
	}
	
	enableButton(id){
		document.getElementById(id).disabled = false;
		document.getElementById(id).style.background = "#00cc00";	
	}
	
	disableButton(id){
		document.getElementById(id).disabled = true;
		document.getElementById(id).style.background = "grey";		
	}
	
	maxPoint(){
		var i;
		var maxPoint = this.playersArray[0];
		
		for(i=0; i<this.playersArray.length; i++){
			if(this.playersArray[i].points > maxPoint.points){
				maxPoint = this.playersArray[i];
			}			
		}
		return maxPoint;
	}	
	

	
	createDices(){
		this.dices = new Array();
		this.countRound = 0;
		var i;
		for(i=0; i<6; i++){	
			this.dices.push(new dice(i+1));
			this.dices[i].diceInit(i+1);
		}
			
	}	
	
	rollDices(){	
		var i;
		for(i=0; i<6; i++){
			if(this.dices[i].picked==0){
				this.dices[i].roll(i+1);				 		
			}	
		}
	}	
	
 	dicesActivate(){
		this.enableButton("buttonRoll");
		this.enableButton("buttonGet");
		this.disableButton("buttonEnd");			
	}
 	
	dicesPlay(){
		if(this.countRound<2){
			this.rollDices();
			this.countRound++;
		}
		
		else if(this.countRound==2){
			this.rollDices();
			this.disableButton("buttonRoll");
		}
	}
	
/***********************************************************************
 * 
 * DEATH OF THE PLAYER FUNCTION
 * 
***********************************************************************/		
	cleanTokyo(){
		this.tokyo = null;
		document.getElementById("tokyoMonster").innerHTML = "";
		/*DESCOBRIR COMO TIRAR A IMAGEM"*/
		document.getElementById("tokyoMonsterImg").src = "";
		document.getElementById("tokyoMonsterImg").alt = "";	
	}
	
	deathPlayer(thePlayer){
		thePlayer.colorsOfDeath();					
		this.playersArray.splice(this.playersArray.indexOf(thePlayer),1);		
	}	

/***********************************************************************
 * 
 * TOKYO FUNCTIONS 
 * 
***********************************************************************/	
	enterTokyo(){
		this.tokyo = this.player;
		document.getElementById("tokyoMonster").innerHTML = this.player.name;
		document.getElementById("tokyoMonsterImg").src = "images/" + this.player.id + ".jpg";
		document.getElementById("tokyoMonsterImg").alt = this.player.name;	
	}
	
	beatEnemies(){
		var i;
			
		for(i=0; i<=this.playersArray.length; i++){			
			if(this.playersArray[i]!=this.player){
				console.log("enter here");
				console.log(results.hand);									
				this.playersArray[i].life-=results.hand;
				document.getElementById(this.playersArray[i].id+"Life").innerHTML = "♥ " + this.playersArray[i].life;	
				
				console.log(this.playersArray[i].life);					
			}
		}
		/*
		for(i=0; i<=this.playersArray.length; i++){
			console.log("enter here");
			if(this.playersArray[i].isDead()){
				this.deathPlayer(this.playersArray[i]);
			}
		}*/
	}	
	
	
	beatKing(){
		this.tokyo.life-=results.hand;
		document.getElementById(this.tokyo.id+"Life").innerHTML = "♥ " + this.tokyo.life;
		
		if(confirm(this.tokyo.name + " want to get out of Tokyo?")){
			if(this.tokyo.isDead(this.tokyo)){
				this.deathPlayer(this.tokyo);							
			}
			this.getOutTokyo();
		}
	}
	
	doTokyo(){
		if(document.getElementById("buttonTokyo").innerHTML=="Go to Tokyo?"){
			this.enterTokyo();
		}	
		
		if(document.getElementById("buttonTokyo").innerHTML=="Beat the Enemies?"){
			this.beatEnemies();
		}
		
		if(document.getElementById("buttonTokyo").innerHTML=="Beat the King?"){
			this.beatKing();
		}			

		this.disableButton("buttonTokyo");
	}	
	
	getOutTokyo(){
		this.tokyo.tokyo = 0; 		
		this.enterTokyo();
	}


/***********************************************************************
 * 
 * RESULTS FUNCTIONS
 * 
 **********************************************************************/	
	handResults(){	
		this.enableButton("buttonTokyo");		
		/*if Tokyo is empty, the player can choose go to Tokyo*/
		if(this.tokyo==null){
			document.getElementById("buttonTokyo").innerHTML = "Go to Tokyo?";	
		}		
			
		/*If the player is in Tokyo*/
		else if(this.tokyo==this.player){
			document.getElementById("buttonTokyo").innerHTML = "Beat the Enemies?";					
		}
		
		/*If Tokyo is ocupied by another player*/
		else if(this.tokyo!=this.player){
			document.getElementById("buttonTokyo").innerHTML = "Beat the King?";					
		}
	}	
	
		
	heartResults(){	
		if (this.player == this.tokyo){
			return false;
		}		
		
		else if (this.player.life >= 10){
			return false;
		}
		else{
			return true;
		}
	}
	
	gainResults(){			
		this.disableButton("buttonRoll");
		this.enableButton("buttonEnd");	
						
		/*Get the dices's results*/		
		results.getResults(this.dices);
		
		/*Calculate the points*/
		results.countPoints();
		
		/*Tokyo*/
		if(results.hand!=0){
			this.handResults();	
		}
				
		/*Trasnfer the results to the player*/
		
		if(this.heartResults()==true){
			this.player.life+=results.life;		
		}		
		this.player.points+=results.points;
		this.player.money+=results.money;	
	
		/*Update de players scores on the html*/
		document.getElementById(this.player.id+"Life").innerHTML = "♥ " + this.player.life;
		document.getElementById(this.player.id+"Points").innerHTML = "★ " + this.player.points;
		document.getElementById(this.player.id+"Money").innerHTML = "⚡ " + this.player.money;

		this.disableButton("buttonGet");				
		}


	winGame(){
		if(this.maxPoint().points>=20 || this.playersArray.length<=1){			
			this.disableButton("buttonRoll");
			this.disableButton("buttonGet");
			this.disableButton("buttonEnd");						
			this.disableButton("buttonTokyo");		
			alert("Congratulations! " + this.maxPoint().name + " won the game!")
		}
	}
		


/***********************************************************************
 * THE END TURN FUNCTION
 **********************************************************************/		
	endTurn(){		
		/*Change player border*/
		document.getElementById(this.player.id).style.border = "none";
				
		/*Change player index to get the next player*/
		playerIndex = (this.playersArray.indexOf(this.player)+1)%this.playersArray.length;
								
		/*Get the next player*/
		this.player = round.playersArray[playerIndex];		
		document.getElementById(this.player.id).style.border = "5px solid red";
				
		/*Clear the results*/
		results.clearResults();
		
		/*Tokyo Button*/
		document.getElementById("buttonTokyo").innerHTML="Tokyo";
		
		this.disableButton("buttonTokyo");

		/*Incremente the Player's Tokyo Index*/
		if(this.tokyo != null){
			this.tokyo.tokyo+=1;
			
			if(this.tokyo.tokyo%this.playersArray.length==0){
			this.tokyo.points+=2;
			/*REDUNDANTE: PRINT POINTS*/
			document.getElementById(this.player.id+"Points").innerHTML = "★ " + this.player.points;
			}		
		}
						
		/*Reativate the dices*/
		this.dicesActivate();
		
		/*Create new dices*/
		this.createDices();		
		
		/*The end of the game*/
		this.winGame();
					
	}	
	
}

/*Creating a result object*/
var results = new roundResults();

/*Creating a gameRound object*/	
var round = new gameRound();
var playerIndex = 0;
round.player = round.playersArray[playerIndex];		

function gamePlay(){	
		document.getElementById(round.player.id).style.border = "5px solid red";
		
		/*DESATIVAR BOTOES*/
		round.disableButton("buttonStart");	

		round.dicesActivate();
		round.createDices();
		}		
	




