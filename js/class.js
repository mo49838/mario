console.log("defining classes");
//highest level object that has attributes for every object
class Game {
    constructor(width,height,refreshSpeed,colorMode=false)
    {
        //global variables for the class
        this.width = width;
        this.height = height;
        this.refreshSpeed = refreshSpeed;  //speed of refresh
        this.colorMode=colorMode;  //true if use colors instead of graphics
        this.canvas = "";
        this.context = "";
        //this.mainChar = "";  //main character, always requiered in game (could be mario, luigi,..)
        this.frontObjs = []; //foreground objects that moving objects can have collision with
        this.backObjs = [];  //background objects that moving objects won't collide with
        this.frameNo = 0; //track frame as mario goes through a level
        this.levelNo = 0;
        this.timesRun = 0;  //used to stop setInterval
        this.stopTime = 300;  //number of times for interval to run
        this.keys = []; //track keys pressed

    }
    
    start(){
        this.canvas = document.createElement("canvas");  //create canvas
        //define canvas properties
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext("2d");
        //insert canvas into body
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        //test drawing image
        // let img = new Image();
        // img.src = "images/happy.png";
        // this.context.drawImage(img,50,100,30,30);        
        //this.context.fillRect(50,100,30,30);
        

        //create listeners to track arrow key changes
        window.addEventListener('keydown', function (e) {
            e.preventDefault();
            this.keys = (this.keys || []);
            this.keys[e.key] = (e.type == "keydown");
            logger(`keys pressed ${this.keys}`, 'addEventListener', 'listener');
        }.bind(this));
        window.addEventListener('keyup', function (e) {
            this.keys[e.key] = (e.type == "keydown");
        }.bind(this));

        //create main character and display it
        // let mainChar= new movingObject(1,10, 30, "blue", 0, this.height-30, "mainChar",this.context);
        
        let mainChar = mainChars[0];
        //remove color if not in color mode
        if (!this.colorMode)
            mainChar.color = "";
        //update starting x position based on width of game
        if (mainChar.xPos == "end")
            mainChar.xPos = this.width;
        //update y position 
        mainChar.yPos = this.height-mainChar.height;
        //let mainObj= new movingObject(1,char.width, char.height,char.color,char.image,char.startPos, startY, char.objType,this.context,this.colorMode);
        let mainObj= new movingObject(1,mainChar,this.context);
        this.frontObjs.push(mainObj);
                            
        //create enemy
        let enemChar = enemyChar[0];
        //update starting x position based on width of game
        if (enemChar.xPos == "end")
            enemChar.xPos = this.width;
        //update y position 
        enemChar.yPos = this.height-enemChar.height;
        //remove color if not in color mode
        if (!this.colorMode)
            enemChar.color = "";

        let enemObj = new movingObject(2,enemChar,this.context);
        // let enemObj = new movingObject(1,enem.width, enem.height,enem.color,enem.image,enem.startPos, startY2, enem.objType,this.context,this.colorMode);
        this.frontObjs.push(enemObj);
        //this.updateScreen();
        //triggers the screen to update every x ms
        this.interval = setInterval(this.updateScreen.bind(this), this.refreshSpeed);
 

    }

    clear(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    //called to refresh screen by updating character positions
    updateScreen(){
        this.timesRun ++;
        //only run x times
        if(this.timesRun > this.stopTime){
            clearInterval(this.interval);
        }else{
            //clear screen
            this.clear();

            //move all foreground elements second
            //this.frontObjs.forEach(obj => {
            for (let i=0;i<this.frontObjs.length;i++)
            {
                //update character coordinates
                let obj = this.frontObjs[i];
                obj.moveCharacter(this.keys);
                console.log(obj);
                
                obj.paintObject();
                //check for conflict
                if (this.checkForCollision(obj)){
                    console.log("Collision detected");
                    this.stopTime = 0;
                }
            }
            //});   

        }

    }

    //check for collision
    checkForCollision(inputObj){
        let collision = false;
        this.frontObjs.forEach(obj => {
            //don't check for collision against self
            if (inputObj.id != obj.id)
            {
                let thisLeft = inputObj.xPos;
                let thisRight = inputObj.xPos + (inputObj.width);
                let thisTop = inputObj.yPos - (inputObj.height);
                let thisBottom = inputObj.yPos;
                let otherLeft = obj.xPos;
                let otherRight = obj.xPos + (obj.width);
                let otherTop = obj.yPos- (obj.height);
                let otherBottom = obj.yPos;
                
                //check for overlap of objects                  
                if ((thisBottom >= otherTop) && (thisTop <= otherBottom) && (thisRight >= otherLeft) && (thisLeft <= otherRight)){
                    collision = true;
                    logger(`Collision obj1: ${inputObj.objectType} thisLeft ${thisLeft} thisRight ${thisRight} thisTop ${thisTop} thisBottom ${thisBottom}`,'checkForCollision','move');
                    logger(`Collision obj2: ${obj.objectType} otherLeft ${otherLeft} otherRight ${otherRight} otherTop ${otherTop} otherBottom ${otherBottom}`,'checkForCollision','move');
    
                }
            }
        });
        return collision;
    }

}

//Parent class of all objects that appear in screen
class gameObject{
    // constructor(id,width, height, color,image, startX, startY, objectType, context,colorMode){
    constructor(id,aGameObject, aContext){
        this.id=id;
        this.width = aGameObject.width;
        this.height = aGameObject.height;
        this.color = aGameObject.color;
        this.image = new Image();
        this.image.src = aGameObject.image;
        this.xPos = aGameObject.xPos;
        this.yPos = aGameObject.yPos;
        this.objectType = aGameObject.objectType;
        this.context = aContext;
        this.colorMode = aGameObject.colorMode;

    }

    paintObject(){
        
        //either use colors or graphics
        if (this.color != ""){
            logger(`about to paint: ${this.xPos} ${this.yPos}`,'paintObject','paint');
            this.context.fillStyle = this.color;
            this.context.fillRect(this.xPos, this.yPos, this.width, this.height);
        }else{
            logger(`about to draw: ${this.image.src} ${this.xPos} ${this.yPos} ${this.width} ${this.height}`,'paintObject','paint');
            this.context.drawImage(this.image, this.xPos, this.yPos, this.width, this.height);
        }

    }


}

class movingObject extends gameObject{
    constructor(id,aMovingObject,aContext){
        super(id,aMovingObject, aContext);
        this.moveXinc=aMovingObject.moveXinc;//default movement along X direction
        this.moveYinc=aMovingObject.moveYinc;//default movement along y direction
        this.xDirection=aMovingObject.xDirection;  //-1 moves right to left, 1 moves left to right
        this.yDirection=aMovingObject.yDirection;  //-1 moves bottom to top, 1 moves top to bottom
    }

    //generic function to move character and check for conflict
    moveCharacter(userKeysPressed)
    {
        let xValue = 0;
        let yValue = 0;

        //main character controlled by user actions
        if (this.objectType == "mainChar" && userKeysPressed){
            //move horizontal

            //userKeysPressed is an array of every key press, switch statement wouldn't work
            if (userKeysPressed["ArrowLeft"]){xValue = -1; }
            if (userKeysPressed["ArrowRight"]) {xValue = 1; }
            if (userKeysPressed["ArrowUp"]) { yValue = -1; }
            if (userKeysPressed["ArrowDown"]) {yValue= 1; }

            //adjust for direction
            xValue*=this.xDirection*this.moveXinc;
            yValue*=this.yDirection*this.moveYinc;

        //otherwise object controlled by movement
        }else{

            xValue = this.moveXinc*this.xDirection;
            //yValue = this.moveYinc*this.yDirection;
        }

        if (xValue !=0 || yValue !=0){
            logger(`${this.objectType} moving x:${xValue} y:${yValue}`,'moveCharacter','move');
            this.moveCharacterHor(xValue);
            this.moveCharacterVer(yValue);
        }
    }

    //move horizontal
    moveCharacterHor(value){
        this.xPos += value;
        //console.log(this.moveXinc + " " + this.xDirection);  
    }

    //move vertical 
    moveCharacterVer(value){
        //console.log(`${this.yPos} - value ${value} = ${this.yPos-value}`)
        this.yPos -= value;
    }

}