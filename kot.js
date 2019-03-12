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
}

class gameBoard{
	constructor(){
		this.playersArray = new Array();
		this.playersArray.push(new player("Meka Dragon", "mekaDragon", 10, 0, 0, 0));
		this.playersArray.push(new player("Cyber Bunny", "cyberBunny", 10, 0, 0, 0));
		this.playersArray.push(new player("The King", "theKing", 10, 0, 0, 0));		
		this.playersArray.push(new player("Giga Zaur", "gigaZaur", 10, 0, 0, 0));	
	
		this.dices = new Array();
		this.countRound = 0;
		var i;
		for(i=0; i<6; i++){	
			this.dices.push(new dice(i+1));
		}
	}

	maxPoint(){
		var i;
		var maxPoint = this.playersArray[0].points;
		
		for(i=1; i<4; i++){
			if(this.playersArray[i].points > maxPoint){
				maxPoint = this.playersArray[i].points;
			}			
		}
		return maxPoint;
	}

	gamePlay(){
		document.getElementById("buttonStart").disabled = true;
		document.getElementById("buttonStart").style.background = "gray";		
		
		
		while(this.maxPoint()<5){
			var i;
			for(i=0; i<4; i++){
				roundPlay(this.playersArray[0]);
			}		
		}
		
	}
		
	dicesPlay(){
		console.log(this.countRound);
		
		if(this.countRound<3){
			this.rollDices();
			this.countRound++;
		}
		
		else{
			document.getElementById("buttonRoll").disabled = true;
			document.getElementById("buttonRoll").style.background = "gray";							
		}		

	}
	
	endTurn(){
		results.getResults(this.dices);
		results.countPoints();
		
		thePlayer.life+=results.life;
		thePlayer.points+=results.points;
		thePlayer.money+=results.money;	
	
		document.getElementById(thePlayer.id+"Life").innerHTML = "♥ " + thePlayer.life;
		document.getElementById(thePlayer.id+"Points").innerHTML = "★ " + thePlayer.points;
		document.getElementById(thePlayer.id+"Money").innerHTML = "⚡ " + thePlayer.money;

		this.maxPoint();
		
	}
	
	

	
	rollDices(){	
	var i;
	for(i=0; i<6; i++){
		if(this.dices[i].picked==0){
			this.dices[i].roll(i+1);				 		
		}	
	}
	
	/*console.log(this.countRound);*/
	
	/**for tests*/
	/*
	results.getResults(this.dices);
	results.countPoints(this.dices);	
	console.log(results);
	console.log(results.points);
	results.clearResults();
	console.log(countPoints());
	*/	
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
	constructor(player){
		this.player = player;
	}
}


/*Creating a board*/
var board = new gameBoard();

/*Creating a result object*/
var results = new roundResults();






