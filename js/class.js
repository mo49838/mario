console.log("defining classes");
//highest level object that has attributes for every object
class Game {
    constructor(width,height,refreshSpeed,inputColorMode=false)
    {
        //global variables for the class
        this.width = width;
        this.height = height;
        this.refreshSpeed = refreshSpeed;  //speed of refresh
        this.inputColorMode=inputColorMode;  //true if use colors instead of graphics
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
        document.body.appendChild(document.createElement("br"));
        document.body.appendChild(this.canvas, document.body);

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
        let mainChar = mainChars[0];
        //define dynamic character attributes depending on how the game arguments
        mainChar.colorMode =this.inputColorMode
        if (mainChar.xPos == "end") //update starting x position based on width of game
            mainChar.xPos = this.width;
        mainChar.yPos = this.height-mainChar.height-mainChar.yPos; //update y position (0 is at top, adjust for starting position)
        let mainObj= new movingObject(1,mainChar,this.context);
        this.frontObjs.push(mainObj);
        
        //create enemy
        let enemChar = enemyChar[0];        
        if (enemChar.xPos == "end")  ////update starting x position based on width of game
            enemChar.xPos = this.width; 
        enemChar.yPos = this.height-enemChar.height-enemChar.yPos; //update y position
        enemChar.colorMode = this.inputColorMode;  //remove color if not in color mode
        let enemObj = new movingObject(2,enemChar,this.context);
        this.frontObjs.push(enemObj);

        //add ground
        let ground = staticChars[0];
        ground.yPos = this.height-ground.height-ground.yPos;
        let groundObj= new movingObject(3,ground,this.context);
        ground.colorMode = this.inputColorMode; 
        this.frontObjs.push(groundObj);

        // this.updateScreen();
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

            //move all foreground elements 
            for (let i=0;i<this.frontObjs.length;i++)
            {
                
                //update character coordinates
                let obj = this.frontObjs[i];
                console.log(obj);
                obj.moveCharacter(this.keys);
                
                obj.paintObject();
                //check for conflict
                if (this.checkForCollision(obj)){
                    console.log("Collision detected");
                    this.stopTime = 0;
                }
            } 

        }

    }

    //check for collision
    checkForCollision(inputObj){
        let errors = false;
        let thisLeft = inputObj.xPos;
        let thisRight = inputObj.xPos + (inputObj.width);
        let thisTop = inputObj.yPos - (inputObj.height);
        let thisBottom = inputObj.yPos;

        //check if object going off screen
        // if (thisLeft < 0)             errors.push("offLeft");
        // if (thisRight >= this.width)  errors.push("offRight");
        // if (thisBottom >= this.height)  errors.push("offBottom");
        // if (thisTop < 0)  errors.push("offTop");

        this.frontObjs.forEach(obj => {
            //don't check for collision against self
            if (inputObj.id != obj.id)
            {

                let otherLeft = obj.xPos;
                let otherRight = obj.xPos + (obj.width);
                let otherTop = obj.yPos- (obj.height);
                let otherBottom = obj.yPos;
                
                //check for overlap of objects                  
                if ((thisBottom >= otherTop) && (thisTop <= otherBottom) && (thisRight >= otherLeft) && (thisLeft <= otherRight)){
                    errors = true;
                    logger(`Collision obj1: ${inputObj.objectType} thisLeft ${thisLeft} thisRight ${thisRight} thisTop ${thisTop} thisBottom ${thisBottom}`,'checkForCollision','collision');
                    logger(`Collision obj2: ${obj.objectType} otherLeft ${otherLeft} otherRight ${otherRight} otherTop ${otherTop} otherBottom ${otherBottom}`,'checkForCollision','collision');

                    //conditions for hitting static object
                    if (obj.objectType == "static"){

                    //conditions for hitting moving object    
                    }else{
                        //mainc character hitting enemy
                        if (inputObj.objectType = "mainChar" && obj.objectType == "enemy")
                        {

                        }


                    }
                }
            }
        });
        return errors;
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
        
        //console.log(this);
        //either use colors or graphics
        if (this.image.src == "" || this.colorMode == true){
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
        this.jumpTimes=aMovingObject.jumpTimes;
        this.jumpXRatio = aMovingObject.jumpXRatio;
        this.jumpCounter=0;
        this.jumpDirection="";
        this.action="";
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
            if (userKeysPressed["ArrowUp"]) { yValue = 1; }
            if (userKeysPressed["ArrowDown"]) {yValue= -1; }

            //continuing jumping if that was started
            if (this.action == "jumping"){
                
                if (this.jumpDirection == "angel"){
                    xValue=this.xDirection*this.moveXinc*this.jumpXRatio;
                    yValue=this.yDirection*this.moveYinc;
                }else //jump straight up
                    yValue=this.yDirection*this.moveYinc;
                
                this.jumpCounter++;
                //console.log('still jimping ' + this.jumpCounter + ' ' +this.jumpTimes + ' ' + this.yDirection);
                //switch jump direction on x if hit max height
                if (this.jumpCounter == this.jumpTimes){
                    this.yDirection = 1;
                //reset jump after completed it
                }else if (this.jumpCounter ==this.jumpTimes*2)
                {
                    this.yDirection = -1;
                    this.action = "";
                    this.jumpDirection="";
                    this.jumpCounter=0;
                }
            //initiate jump action
            }else if (yValue == 1){
                //set action
                this.action = "jumping"
                this.yDirection=-1;
                //set jump direction
                if (xValue !=0){
                    this.jumpDirection="angel";   
                    console.log('angel')
                }
                else
                    this.jumpDirection="straight";

                //handle jump in next loop, so setting to zero for this one
                yValue = 0;
                xValue = 0;
            }else{ //arrows controll direction
                xValue*=this.xDirection*this.moveXinc;
            }

        //otherwise object controlled by movement
        }else if (this.objectType == "enemy"){

            xValue = this.moveXinc*this.xDirection;
            //yValue = this.moveYinc*this.yDirection;
        }

        if (xValue !=0 || yValue !=0){
            //logger(`${this.objectType} moving x:${xValue} y:${yValue}`,'moveCharacter','move');
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
        this.yPos += value;
    }

}