console.log("defining classes");
//highest level object that has attributes for every object
class Game {
    constructor(width,height,refreshSpeed)
    {
        //global variables for the class
        this.width = width;
        this.height = height;
        this.refreshSpeed = refreshSpeed;
        this.canvas = "";
        this.context = "";
        //this.mainChar = "";  //main character, always requiered in game (could be mario, luigi,..)
        this.frontObjs = []; //foreground objects that moving objects can have collision with
        this.backObjs = [];  //background objects that moving objects won't collide with
        this.frameNo = 0; //track frame as mario goes through a level
        this.levelNo = 0;
        this.timesRun = 0;  //used to stop setInterval
        this.stopTime = 1000;  //number of times for interval to run
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
        let mainChar= new movingObject(1,10, 30, "blue", 0, this.height-30, "mainChar",this.context);
        this.frontObjs.push(mainChar);

        //create enemy
        // let enemy= new movingObject(2,10, 30, "red", 299, this.height-30, "enemy",this.context,-1);
        // this.frontObjs.push(enemy);
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
    constructor(id,width, height, color, startX, startY, objectType, context){
        this.id=id;
        this.width = width;
        this.height = height;
        this.color = color;
        this.xPos = startX;
        this.yPos = startY;
        this.objectType = objectType;
        this.context = context;
    }

    paintObject(){
        this.context.save();
        this.context.fillStyle = this.color;
        this.context.fillRect(this.xPos, this.yPos, this.width, this.height);
        logger(`painted: ${this.xPos} ${this.yPos}`,'paintObject','move');
        this.context.restore();  
    }


}

class movingObject extends gameObject{
    constructor(id,width, height, color, startX, startY, objectType,context,xDirection=1,yDirection=-1){
        super(id,width, height, color, startX, startY, objectType, context);
        this.moveXinc=1;//default movement along X direction
        this.moveYinc=1;//default movement along y direction
        this.xDirection=xDirection;  //-1 moves right to left, 1 moves left to right
        this.yDirection=yDirection;  //-1 moves bottom to top, 1 moves top to bottom
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
            xValue*=this.xDirection;
            yValue*=this.yDirection;

        //otherwise object controlled by movement
        }else{

            xValue = this.moveXinc*this.xDirection;
            yValue = this.moveYinc*this.yDirection;
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