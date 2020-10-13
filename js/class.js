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
        this.frontObjs = []; //foreground objects that moving objects can have collision with
        this.backObjs = [];  //background objects that moving objects won't collide with
        this.levelNo = 0;
        this.timesRun = 0;  //used to stop setInterval
        this.stopTime = 1200;  //number of times for interval to run
        this.keys = []; //track keys pressed
        this.aGameBoard = new GameBoard(this.width,this.height);//tracks objects on board
        this.points = 0;  //keep track of game points
        this.winningFactor = .5;  //the amount main character has to be above enemy to win
        this.frameNumber = width;
        this.objectCounter = 1;
        this.lvlArray = [];  //contains level objects to be added
        this.lvlArrayInd = 0;  //keep track of objects that should be added
        this.lives=0;
        this.mainCharDied = false;

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
        let mainObj= new MovingObject(1,mainChar,this.context);
        this.frontObjs.push(mainObj);
        this.aGameBoard.placeObject(mainObj);
        this.aGameBoard.clearObject(mainObj);

        //set level
        this.lvlArray = level[0].lvlObjects;  //contains level objects to be added
        // console.log(this.lvlArray);
        // //create enemy
        // let enemChar = enemyChars[0];        
        // if (enemChar.xPos == "end")  ////update starting x position based on width of game
        //     enemChar.xPos = this.width; 
        // enemChar.yPos = this.height-enemChar.height-enemChar.yPos; //update y position
        // enemChar.colorMode = this.inputColorMode;  //remove color if not in color mode
        // let enemObj = new MovingObject(2,enemChar,this.context);
        // this.frontObjs.push(enemObj);
        // this.aGameBoard.placeObject(enemObj);

        // // add ground
        // let ground = staticChars[0];
        // ground.yPos = this.height-ground.height-ground.yPos;
        // if (ground.image != "")
        //     ground.colorMode = this.inputColorMode; 
        // let groundObj= new MovingObject(3,ground,this.context);
        // //console.log(groundObj)
        // this.frontObjs.push(groundObj);
        // this.aGameBoard.placeObject(groundObj);

        // let ground2 = staticChars[1];
        // ground2.yPos = this.height-ground2.height-ground2.yPos;
        // if (ground2.image != "")
        //     ground2.colorMode = this.inputColorMode; 
        // let groundObj2= new MovingObject(4,ground2,this.context);
        // //console.log(groundObj)
        // this.frontObjs.push(groundObj2);
        // this.aGameBoard.placeObject(groundObj2);        

        // this.updateScreen();
        //triggers the screen to update every x ms
        this.interval = setInterval(this.updateScreen.bind(this), this.refreshSpeed);
        // console.log(this.frontObjs);

    }

    clear(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    //called to refresh screen by updating character positions
    updateScreen(){
        this.timesRun ++;
        this.frameNumber++;
        //only run x times
        if(this.timesRun > this.stopTime){
            if (this.mainCharDied){
                // this.clear();
                this.context.fillStyle="red";
                this.context.font = "30px Arial";
                this.context.fillText("You lost, it happens... try again!", 75, 150);
            }else{
                this.context.fillStyle="green";
                this.context.font = "30px Arial";
                this.context.fillText("Winner!", 100, 150);
            }
            clearInterval(this.interval);
        }else{

            //clear screen
            this.clear();

            //check for new objects that should be added
            while(this.lvlArrayInd < this.lvlArray.length && this.lvlArray[this.lvlArrayInd].frame < this.frameNumber){
                this.objectCounter++;
                //in future add other class of objects 
                // console.log(this.lvlArray[this.lvlArrayInd])
                if(this.lvlArray[this.lvlArrayInd].objClass == "movingObject")
                {

                    let newObj = "";
                    // console.log(this.lvlArray[this.lvlArrayInd].constIndx);
                    if (this.lvlArray[this.lvlArrayInd].constName== "enemyChars")
                        newObj = enemyChars[this.lvlArray[this.lvlArrayInd].constIndx];    
                    else if (this.lvlArray[this.lvlArrayInd].constName== "staticChars")
                        newObj = staticChars[this.lvlArray[this.lvlArrayInd].constIndx]; 

                    if (newObj == "")
                        console.log(`Object to add not found: ${this.lvlArrayInd} ${this.lvlArray[this.lvlArrayInd].constName} ${this.lvlArray[this.lvlArrayInd].constIndx}`)
                    else{
                        //all objects to start at position 0 when in frame 0
                        if (this.lvlArray[this.lvlArrayInd].frame == 0)
                        {
                            newObj.xPos=0;
                            console.log("set x to zero");
                        }

                        if (newObj.xPos == "end")  ////update starting x position based on width of game
                            newObj.xPos = this.width; 
                        newObj.yPos = this.height-newObj.height-newObj.yPos; //update y position
                        if (newObj.image != "")
                            newObj.colorMode = this.inputColorMode;  //remove color if not in color mode
                        let newMovingObj = new MovingObject(this.objectCounter,newObj,this.context);
                        newMovingObj.paintObject();
                        this.frontObjs.push(newMovingObj);
                        this.aGameBoard.placeObject(newMovingObj);
                        console.log(newObj);
                    }
                }
                this.lvlArrayInd++;
            }

            if (this.timesRun%1000==0)
                console.log(`${this.timesRun}`);
            //move all foreground elements 
            for (let i=0;i<this.frontObjs.length && this.timesRun < this.stopTime;i++)
            {
                
                //get charcter
                let obj = this.frontObjs[i];

                if (obj.objectType!= "deleted"){
                    
                    let nextMove = {
                        xValue: 0,
                        yValue: 0
                    };


                    /**********************************************
                     getting next coordinates for 
                    moving objects
                    **********************************************/
                    // console.log(`starting update on `);
                    //main character controlled by user actions
                    if (obj.objectType == "mainChar"){
                        //continuing jumping if that was started
                        if (obj.action == "jumping"){                        
                            //set jump direction
                            if (this.keys["ArrowLeft"])
                                obj.xDirection=-1;
                            else if (this.keys["ArrowRight"])
                                obj.xDirection=1;
            
                            if (obj.jumpDirection == "angle"){
                                nextMove.xValue=obj.xDirection*obj.moveXinc*obj.jumpXRatio;
                                nextMove.yValue=obj.yDirection*obj.moveYinc;
                            }else{ //jump straight up
                                nextMove.yValue=obj.yDirection*obj.moveYinc;

                                //while falling can control directino
                                if (this.keys["ArrowLeft"] && obj.jumpCounter > obj.jumpTimes){
                                    obj.xDirection=-1;
                                    nextMove.xValue=obj.xDirection*obj.moveXinc*obj.jumpXRatio;

                                }
                                else if (this.keys["ArrowRight"] && obj.jumpCounter > obj.jumpTimes){
                                    obj.xDirection=1;
                                    nextMove.xValue=obj.xDirection*obj.moveXinc*obj.jumpXRatio;
                                }
                            }
                            obj.jumpCounter++;
            
                            //change direction once hit height
                            if (obj.jumpCounter == obj.jumpTimes){
                                obj.yDirection = 1;
                            //reset object after jump complete
                            }else if (obj.jumpCounter == obj.jumpTimes*2){
                                obj.yDirection = -1;
                                obj.action = "";
                                obj.jumpDirection="";
                                obj.jumpCounter=0;
                            }
                        //if off ground, move object down on (falling)
                        }else if (this.aGameBoard.isInAir(obj)){
                            //  console.log('is in air')
                            obj.yDirection=1;
                            nextMove.yValue=obj.yDirection*obj.moveYinc;

                            //while falling can control directino
                            if (this.keys["ArrowLeft"]){
                                // console.log('arrow left')
                                obj.xDirection=-1;
                                nextMove.xValue=obj.xDirection*obj.moveXinc*obj.jumpXRatio;
                            }
                            else if (this.keys["ArrowRight"]){
                                // console.log('arrow right')
                                obj.xDirection=1;
                                nextMove.xValue=obj.xDirection*obj.moveXinc*obj.jumpXRatio;
                            }
                        //initiate jump action if up arrow pushed
                        }else if (this.keys["ArrowUp"]){
                            //set action
                            obj.action = "jumping"
                            obj.yDirection=-1;
                            //set jump direction
                            if (this.keys["ArrowRight"] || this.keys["ArrowLeft"]){
                                obj.jumpDirection="angle";   
                            }
                            else
                                obj.jumpDirection="straight";
            
                        }else if (this.keys["ArrowRight"]){ //arrows controll direction
                            obj.xDirection=1;
                            nextMove.xValue=obj.xDirection*obj.moveXinc;
                        }else if (this.keys["ArrowLeft"]){ //arrows controll direction
                            obj.xDirection =-1;
                            nextMove.xValue=obj.xDirection*obj.moveXinc;
                        }
            
                    //otherwise get enemy motion
                    }else if (obj.objectType == "enemy"){
            
                        if (this.aGameBoard.isInAir(obj)){
                            obj.yDirection=1;
                            nextMove.yValue=obj.yDirection*obj.moveYinc;
                        }
                        
                        nextMove.xValue=obj.xDirection*obj.moveXinc;
                        // console.log('moving enemy')
                        //yValue = this.moveYinc*this.yDirection;
                    }
                    
                    /**********************************************
                     check for conflict by incrementing through 
                    move to x and y values, only if a move indicated
                    **********************************************/
                    let currXMove = 0;
                    let currYMove = 0;
                    if (nextMove.xValue != 0 || nextMove.yValue !=0){
                        let conflictFound = false;
                        let removeObject = false;
                        //do move one step at a time checking for conflict
                        let counter = 0;
                        // console.log(`checking coordinates for ${obj.objectType} ${obj.xPos+nextMove.xValue} ${obj.yPos+nextMove.yValue}`);
                        while ((currXMove != nextMove.xValue || currYMove != nextMove.yValue) && !conflictFound ){
                            //track whether we moved left/right and up/down
                            counter++;
                            let xMove = 0;
                            let yMove = 0;

                            //increment currXMove
                            if (currXMove < nextMove.xValue){
                                xMove = 1;
                                // currXMove++;
                            }
                            else if (currXMove > nextMove.xValue){
                                xMove = -1; 
                                // currXMove--;
                            }
                            
                            //increment currYMove
                            if (currYMove < nextMove.yValue){
                                yMove = 1;
                                // currYMove++;
                            }
                            else if (currYMove > nextMove.yValue){
                                yMove = -1;
                                // currYMove--;
                            }

                            //do conflict check based on movement
                            let confResult = this.aGameBoard.isConflict(obj.id,obj.xPos+currXMove+xMove,obj.yPos+currYMove+yMove,obj.width,obj.height);
                            // console.log(confResult)
                            //condition where objects goes off bottom of screen
                            if (confResult == -4){

                                //if main char goes off, then stop game
                                if (obj.objectType == "mainChar")
                                {
                                    
                                    this.stopTime = 0;
                                    conflictFound = true;
                                    obj.xPos+=currXMove;
                                    obj.yPos+=currYMove+8;
                                    obj.paintObject();
                                    console.log("Fell off screen!");
                                    this.mainCharDied=true;
                                }

                                removeObject = true;

                            //character tries to go off left side of screen
                            }else if (confResult == -1 && obj.objectType == "mainChar") {
                                currYMove+=yMove;
                                conflictFound = true;
                                // this.aGameBoard.clearObject(obj);
                            //other moving elements went off left/right side of screen
                            }else if ((confResult == -1 || confResult == -2) && obj.objectType != "mainChar") {
                                removeObject = true;
                            //see what type of objects collided to determine result
                            }else if (confResult !=0){
                                //id of the object -1 is the place in the array
                                let otherObj = this.frontObjs[confResult-1];

                                // console.log(otherObj);
                                let thisType = obj.objectType;
                                let otherType = otherObj.objectType;

                                //console.log("this type " + thisType + " other type " + otherType)
                                //first two conditions main character jump on enemy 
                                if (thisType == "mainChar" && otherType == "enemy"){
                                    //mainCharacter wins
                                    console.log(`first ${obj.yPos+obj.height} ${otherObj.yPos+(this.winningFactor*otherObj.height)}`)
                                    if (obj.yPos+obj.height < otherObj.yPos+(this.winningFactor*otherObj.height))
                                    {
                                        console.log("enemy lost " +this.frontObjs[confResult-1].objectType);
                                        //remove enemy from board
                                        this.frontObjs[confResult-1].objectType = "deleted";
                                        this.aGameBoard.clearObject(this.frontObjs[confResult-1]);
                                        console.log(this.frontObjs[confResult-1].objectType);

                                        //keep main char moving
                                        currXMove+=xMove;
                                        currYMove+=yMove;
                                    //else main character looses
                                    }else{
                                        console.log("Enemy got you!" );
                                        this.stopTime = 0;
                                        removeObject = true;
                                        conflictFound = true;
                                        this.mainCharDied=true;
                                    }

                                } else if (thisType == "enemy" && otherType == "mainChar"){
                                    console.log(`second ${obj.yPos+(obj.height*this.winningFactor)} ${otherObj.yPos+otherObj.height}`)
                                    if (obj.yPos+(obj.height*this.winningFactor) > otherObj.yPos+otherObj.height)
                                    {
                                        console.log("enemy lost")
                                        removeObject = true;

                                    //else main character looses
                                    }else{
                                        console.log("Enemy got you!");
                                        this.stopTime = 0;
                                        removeObject = true;
                                        conflictFound = true;
                                        this.mainCharDied=true;
                                    }
                                //next one handles hitting a block
                                }if (thisType == "mainChar" && otherType == "block"){
                                    //FUTURE ENHANCEMENT TO CLEAN UP mainChar and block interaction
                                    // if (obj.yPos+obj.height > otherObj.yPos){
                                    //     //only move x
                                    //     currXMove+=xMove;
                                    //     //reset action in case of jump
                                    //     this.frontObjs[i].action = "";
                                    // }

                                }

                                console.log("conflict found with "+confResult);
                                conflictFound = true;
                            }else{
                                currXMove+=xMove;
                                currYMove+=yMove;
                            }

                            if (removeObject){
                                obj.objType = "deleted";
                                this.aGameBoard.clearObject(obj);
                            }
                            

                        }
                    }

                    /**********************************************
                     move object if x or y value not equal to zero
                    **********************************************/
                    if (currXMove != 0 || currYMove !=0){
                        
                        this.aGameBoard.clearObject(obj);
                        //special case when mainChar is in center of screen and currXMove > 0, then
                        //move screen instead of player
                        if (obj.objectType == "mainChar" && currXMove > 0 && obj.xPos > this.width*.4){
                            this.clear();
                            this.frameNumber+=currXMove;
                            for (let m=0;m<this.frontObjs.length;m++){
                                let objToIter = this.frontObjs[m];
                                if (objToIter.objectType!="mainChar" && objToIter.objectType!="deleted" )
                                {
                                    // console.log(objToIter);
                                    this.aGameBoard.clearObject(objToIter);
                                    //move object to the left
                                    objToIter.xPos -= currXMove;
                                    //if the object extends to the beginnging of the screen, shorten width
                                    if (objToIter.xPos<0){
                                        objToIter.width+=objToIter.xPos;
                                        objToIter.xPos=0;
                                    }
                                    objToIter.paintObject();
                                    this.aGameBoard.placeObject(objToIter);
                                    this.frontObjs[m]=objToIter;
                                }
                            }
                        //move normal
                        }else{
                            obj.xPos+=currXMove;
                        //     console.log(`${currXMove} ${obj.xPos}`);
                        }

                        obj.yPos+=currYMove;
                        this.aGameBoard.placeObject(obj);
                        // console.log(obj);
                    }
                    
                    //add object back to array with updated values
                    this.frontObjs[i]=obj;
                    if (obj.objType != "deleted")
                        obj.paintObject();

                    //check for conflict
                    // if (this.checkForCollision(obj)){
                    //     console.log("Collision detected");
                    //     this.stopTime = 0;
                    // }
                } 

            }

        }

    }


}

//used to track objects on board so can more easily determine conflict
class GameBoard{
    constructor(boardWidth, boardHeight){
        this.boardWidth=boardWidth;
        this.boardHeight=boardHeight;
        this.board = []; //two dimensional array for track game objects
        //initialize to 0 for no object being there
        for (let i=0;i<this.boardWidth;i++){
             this.board.push([0]);
            for (let j=0;j<this.boardWidth;j++){
                this.board[i][j]=0;
            }
        }
    }

    //clears object from board
    clearObject(obj){
        for (let i=obj.xPos;i<obj.xPos+obj.width && i<this.boardWidth ;i++){
            // for (let j=obj.yPos;j > obj.yPos - obj.height;j--){
            for (let j=obj.yPos;j < obj.yPos + obj.height && j < this.boardHeight;j++){
               this.board[i][j]=0;
            //    if (i==0 && j == 231)
            //     console.log("clearing 0 231")
            //    console.log(i + " " + j + " set to "+ this.board[i][j]);
           }
       }
    }

    //place object on board
    placeObject(obj){
        for (let i=obj.xPos;i<obj.xPos+obj.width && i<this.boardWidth;i++){
            for (let j=obj.yPos;j < obj.yPos + obj.height && j < this.boardHeight;j++){
                this.board[i][j]=obj.id;
                 //console.log(i + " " + j + " set to " + obj.id);
                //  if (i==0 && j == 231)
                //     console.log("place  0 231 "+ obj.id);
            }
        }
    }

    //return ids of conflicting object, if one exists
    isConflict(id,xPos,yPos,width,height){
        let result = 0;
        //check borders first
        if (xPos <0)
            result = -1;  //off to the left
        else if (xPos+ width > this.boardWidth)
            result = -2;  //off the screen to the right
        else if (yPos < 0)
            result = -3;  //off the top of the screen
        else if (yPos +height > this.boardHeight)
            result = -4;  //off the bottom of the screen
        //console.log("start")
        for (let i=xPos;i<xPos+width && i<this.boardWidth && result ==0;i++){
            for (let j=yPos;j < yPos + height && j < this.boardHeight&& result==0;j++){
                //only return conflict when it doesn't equal itself
                if (this.board[i][j] != id)
                    result = this.board[i][j];
                 //console.log(i + " " + j + " set to " + this.board[i][j]);
            }
        }
        return result;
    }

    //check if object suspended in air
    isInAir(obj){
        let result = true;
        for (let i=obj.xPos;i<obj.xPos+obj.width && i<this.boardWidth;i++){
            if (this.board[i][obj.yPos + obj.height+1]!= 0)
                result = false;
        }
        return result;
    }
}

//Parent class of all objects that appear in screen
class GameObject{
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

class MovingObject extends GameObject{
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


}