class dice {
    constructor(name, picked, result) {     
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
	
}

class player{
	constructor(name, life, points, money, tokyo){
		this.name = name;
		this.life = life;
		this.points = points;
		this.money = money;
		this.tokyo = tokyo;
	}

/*
	writePlayer(){
		document.getElementById("name").innerHTML = this.name;
		document.getElementById("life").innerHTML = this.life;
		document.getElementById("points").innerHTML = this.points;
		document.getElementById("money").innerHTML = this.money;
		document.getElementById("tokyo").innerHTML = this.tokyo;
	}
		
	getValue(){
		this.life+=1;
		this.writePlayer();
		}*/
	}

/*****creating a dice array*****************************/
var dices = new Array();
var i;
for(i=0; i<6; i++){	
	dices.push(new dice(i+1));
}
/*******************************************************/

/*****playing functions*********************************/
function rollDices(){	
	var i;
	for(i=0; i<6; i++){
		if(dices[i].picked==0){
			dices[i].roll(i+1);				 		
		}	
	}
	
	/**for tests*/
	/*console.log(getResults());*/
	/*console.log(countPoints());*/
	
}

function chooseDice(id){
	if(dices[id-1].picked==0){
		dices[id-1].picked = 1;
		document.getElementById("d"+id).style.background = "gray";
		document.getElementById("d"+id).style.border = "2px solid black";	
		document.getElementById("p"+id).style.display = "block";
	}
	
	else if(dices[id-1].picked==1){
		dices[id-1].picked=0;
		document.getElementById("d"+id).style.background = "black";
		document.getElementById("d"+id).style.border = "2px solid #00cc00";					
		document.getElementById("p"+id).style.display = "none";
	}
}
/*******************************************************/

/******end round functions******************************/
function getResults(){
	var results = {
		one : 0,
		two : 0,
		tree : 0,
		hand : 0,
		money : 0,
		life : 0
	}

	for(i=0; i<6; i++){
		if(dices[i].result == 1){
			results.one++;
		}
		else if(dices[i].result == 2){
			results.two++;
		}
		else if(dices[i].result == 3){
			results.tree++;
		}
		else if(dices[i].result == 4){
			results.hand++;
		}
		else if(dices[i].result == 5){
			results.money++;
		}
		else if(dices[i].result == 6){
			results.life++;
		}						
	}
	
	return results;	
}

function countPoints(){
	var points = 0;
	
	var results = getResults();
	
	if(results.one>=3){
		points+= results.one-2;
	}
	if(results.two>=3){
		points+= results.two-1;
	}
	if(results.tree>=3){
		points+= results.tree;
	}
	
	results.one = 0;
	results.two = 0;
	results.tree = 0;
	
	return points;
}
/*******************************************************/



/*Create Monsters*/
var mekaDragon = new player("Meka Dragon", 10, 0, 0, 0);
var cyberBunny = new player("Cyber Bunny", 10, 0, 0, 0);
var theKing = new player("The King", 10, 0, 0, 0);
var gigaZaur = new player("Giga Zaur", 10, 0, 0, 0);


