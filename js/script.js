console.log("javascript linked");

//Global variable
var myGame = "";

function startGame(){
    //gameScreen takes width, height, refreshTime(ms)
    myGame = new Game(500,300,50); 
    myGame.start();
}

startGame();

//register arrow key listeners
// document.onkeydown = function(e) {
//     switch (e.key) {
//         case "ArrowLeft":
//             // Left pressed
//             myGame.leftKey();
//             break;
//         case "ArrowRight":
//             // Right pressed
//             myGame.rightKey();
//             break;
//         case "ArrowUp":
//             // Up pressed
//             myGame.upKey();
//             break;
//         case "ArrowDown":
//             myGame.downKey();
//             // Down pressed
//             break;
//     }
// };
