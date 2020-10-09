console.log("javascript linked");

//Global variable
var myGame = "";

function startGame(){
    //gameScreen takes width, height, refreshTime(ms)
    myGame = new Game(500,300,50); 
    myGame.start();
}

startGame();

