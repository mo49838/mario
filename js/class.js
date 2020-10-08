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
        this.stopTime = 100;  //number of times for interval to run

        //track main character actions
        this.userAction = {
            leftKey: 0,
            rightKey: 0,
            upKey: 0,
            downKey: 0
        };

    }
    
    start(){
        this.canvas = document.createElement("canvas");  //create canvas
        //define canvas properties
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext("2d");
        //insert canvas into body
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        //create main character and display it
        let mainChar= new movingObject(1,10, 30, "blue", 0, this.height-30, "mainChar",this.context);
        this.frontObjs.push(mainChar);

        //create enemy
        let enemy= new movingObject(2,10, 30, "red", 299, this.height-30, "enemy",this.context,-1);
        this.frontObjs.push(enemy);
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

            //move all background elements first

            //move all foreground elements second
            let collisionDetected = false;
            this.frontObjs.forEach(obj => {
                //update character coordinates
                obj.moveCharacter(this.userAction);

                obj.paintObject();
                //check for conflict
                if (this.checkForCollision(obj)){
                    console.log("Collision detected");
                    this.stopTime = 0;
                }
            });   
        }

        //reset user actions every refresh
        this.resetUserActions();
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
                    console.log(`1: ${inputObj.objectType} thisLeft ${thisLeft} thisRight ${thisRight} thisTop ${thisTop} thisBottom ${thisBottom}`)
                    console.log(`2: ${obj.objectType} otherLeft ${otherLeft} otherRight ${otherRight} otherTop ${otherTop} otherBottom ${otherBottom}`)
    
                }
            }
        });
        return collision;
    }

    //register key presses
    leftKey(){
        this.userAction.leftKey = 1;
    }
    rightKey(){
        this.userAction.rightKey = 1;
    }
    upKey(){
        this.userAction.upKey = 1;
    }
    downKey(){
        this.userAction.downKey = 1;
    }
    resetUserActions(){
        this.userAction.leftKey = 0;
        this.userAction.rightKey = 0;
        this.userAction.upKey = 0;
        this.userAction.downKey = 0;
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
        this.context.fillStyle = this.color;
        this.context.fillRect(this.xPos, this.yPos, this.width, this.height);
        //console.log("Painted object");
    }


}

class movingObject extends gameObject{
    constructor(id,width, height, color, startX, startY, objectType,context,xDirection=1,yDirection=-1){
        super(id,width, height, color, startX, startY, objectType, context);
        this.moveXinc=5;//default movement along X direction
        this.moveYinc=5;//default movement along y direction
        this.xDirection=xDirection;  //-1 moves right to left, 1 moves left to right
        this.yDirection=yDirection;  //-1 moves bottom to top, 1 moves top to bottom
    }

    //generic function to move character and check for conflict
    moveCharacter(userAction)
    {
        //main character controlled by user actions
        if (this.objectType == "mainChar"){
            //move horizontal
            //console.log(this.xPos+userAction.leftKey*-1*this.moveXinc+userAction.rightKey);
            //console.log(this.yPos+userAction.downKey*-1*this.moveYinc+userAction.upKey*this.moveYinc);
            this.moveCharacterHor(this.xPos+userAction.leftKey*-1*this.moveXinc+userAction.rightKey*this.moveXinc);
            this.moveCharacterVer(this.yPos+(this.yPos+userAction.downKey*-1*this.moveYinc+userAction.upKey*this.moveYinc));
        //otherwise object controlled by movement
        }else{

            this.moveCharacterHor();
        }
    }

    //move horizontal
    moveCharacterHor(value = this.moveXinc*this.xDirection){
        this.xPos += value;
        //console.log(this.moveXinc + " " + this.xDirection);  
    }

    //move vertical 
    moveCharacterVer(value = this.moveYinc*this.yDirection){
        //console.log(`${this.yPos} - value ${value} = ${this.yPos-value}`)
        this.yPos -= value;
    }

}