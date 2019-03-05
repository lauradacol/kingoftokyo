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
			this.result = 0;				
		}

		else if(result==5){					
			result = "⚡";	
			this.result = 0;		
		}

		else if(result==6){
			result = "♥";	
			this.result = 0;	
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

var dices = new Array();

var i;
for(i=0; i<6; i++){	
	dices.push(new dice(i+1));
}

function rollDices(){	
	var i;
	for(i=0; i<6; i++){
		if(dices[i].picked==0){
			dices[i].roll(i+1);				 		
		}	
	}
	
	/*console.log(countPoints(dices));*/
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

function countPoints(dices){
	var one = 0;
	var two = 0;
	var tree = 0;
	var points = 0;
	var i = 0;
	
	for(i=0; i<6; i++){
		if(dices[i].result == 1){
			one++;
		}
		else if(dices[i].result == 2){
			two++;
		}
		else if(dices[i].result == 3){
			tree++;
		}		
	}
	
	if(one>=3){
		points+= one-2;
	}
	if(two>=3){
		points+= two-1;
	}
	if(tree>=3){
		points+= tree;
	}
	
	return points;
}

/*Create Monsters*/
var mekaDragon = new player("Meka Dragon", 10, 0, 0, 0);
var cyberBunny = new player("Cyber Bunny", 10, 0, 0, 0);
var theKing = new player("The King", 10, 0, 0, 0);
var gigaZaur = new player("Giga Zaur", 10, 0, 0, 0);


