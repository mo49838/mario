console.log("javascript linked");

//Global variable
var myGame = "";

function startGame(){
    //gameScreen takes width, height, refreshTime(ms), colorMode (true means ignore icons)
    myGame = new Game(500,300,50,false); 
    myGame.start();
}

startGame();

