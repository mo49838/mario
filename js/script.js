console.log("javascript linked");

let colorMode=false;

function addGame(){
    //gameScreen takes width, height, refreshTime(ms), colorMode (true means ignore icons)
    myGame = new Game(600,250,50,colorMode); 
    //alert(colorMode);
    myGame.start();
}

function changeColorMode(){
    //gameScreen takes width, height, refreshTime(ms), colorMode (true means ignore icons)
    //alert('changed')
    let colorModeBt = document.getElementById("colorMode");
    if (colorModeBt.innerText == "Color Mode Off"){
        colorMode = true;
        colorModeBt.innerText = "Color Mode On";
        colorModeBt.style.backgroundColor ="#FFCC00";
    }else{
        colorMode = false;
        colorModeBt.innerText = "Color Mode Off";
        colorModeBt.style.backgroundColor ="#ffffff";
    }
    
}

