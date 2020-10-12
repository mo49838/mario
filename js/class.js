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
        this.frameNo = 0; //track frame as mario goes through a level
        this.levelNo = 0;
        this.timesRun = 0;  //used to stop setInterval
        this.stopTime = 100;  //number of times for interval to run
        this.keys = []; //track keys pressed
        this.aGameBoard = new GameBoard(this.width,this.height);//tracks objects on board

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

        //create enemy
        let enemChar = enemyChar[0];        
        if (enemChar.xPos == "end")  ////update starting x position based on width of game
            enemChar.xPos = this.width; 
        enemChar.yPos = this.height-enemChar.height-enemChar.yPos; //update y position
        enemChar.colorMode = this.inputColorMode;  //remove color if not in color mode
        let enemObj = new MovingObject(2,enemChar,this.context);
        this.frontObjs.push(enemObj);
        this.aGameBoard.placeObject(enemObj);

        // add ground
        let ground = staticChars[0];
        ground.yPos = this.height-ground.height-ground.yPos;
        if (ground.image != "")
            ground.colorMode = this.inputColorMode; 
        let groundObj= new MovingObject(3,ground,this.context);
        //console.log(groundObj)
        this.frontObjs.push(groundObj);
        this.aGameBoard.placeObject(groundObj);

        let ground2 = staticChars[1];
        ground2.yPos = this.height-ground2.height-ground2.yPos;
        if (ground2.image != "")
            ground2.colorMode = this.inputColorMode; 
        let groundObj2= new MovingObject(4,ground2,this.context);
        //console.log(groundObj)
        this.frontObjs.push(groundObj2);
        this.aGameBoard.placeObject(groundObj2);        

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
                
                //get charcter
                let obj = this.frontObjs[i];
                let nextMove = {
                    xValue: 0,
                    yValue: 0
                };


                /**********************************************
                   getting next coordinates for 
                   moving objects
                 **********************************************/
                //console.log(this.keys);
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
                        // console.log('is in air')
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
                        //condition where objects goes off bottom of screen
                        if (confResult == -4){

                            if (obj.objectType == "mainChar")
                            {
                                alert("Fell off screen!");
                                conflictFound = true;
                                this.stopTime = 0;
                                obj.objType = "deleted";
                            }else{  //remove enemy
                                this.aGameBoard.clearObject(obj);
                                obj.objType = "deleted";
                            }
                        //character tries to go off left side of screen
                        }else if (confResult == -1 && obj.objectType == "mainChar") {
                            currYMove+=yMove;
                            conflictFound = true;
                            this.aGameBoard.clearObject(obj);
                        //other moving elements went off left/right side of screen
                        }else if ((confResult == -1 || confResult == -2) && obj.objectType != "mainChar") {
                            this.aGameBoard.clearObject(obj);
                            obj.objType = "deleted";
                            conflictFound = true;
     
                        //
                        }else if (confResult !=0){

                            console.log("conflict found with "+confResult);
                            conflictFound = true;
                        }else{
                            currXMove+=xMove;
                            currYMove+=yMove;
                        }
                        

                    }
               }

                /**********************************************
                  move object if x or y value not equal to zero
                 **********************************************/
                if (currXMove != 0 || currYMove !=0){
                    
                    this.aGameBoard.clearObject(obj);
                    obj.xPos+=currXMove;
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

//     //check for collision
//     checkForCollision(inputObj){
//         let errors = false;
//         let thisLeft = inputObj.xPos;
//         let thisRight = inputObj.xPos + (inputObj.width);
//         let thisTop = inputObj.yPos - (inputObj.height);
//         let thisBottom = inputObj.yPos;

//         //check if object going off screen
//         // if (thisLeft < 0)             errors.push("offLeft");
//         // if (thisRight >= this.width)  errors.push("offRight");
//         // if (thisBottom >= this.height)  errors.push("offBottom");
//         // if (thisTop < 0)  errors.push("offTop");

//         this.frontObjs.forEach(obj => {

//             //main character uses keyboard input, other moving objects do not




//             // if (obj.objectType == "mainChar")
// /*      changing logic to use gameBoard for determining colission  
//             //don't check for collision against self
//             if (inputObj.id != obj.id)
//             {         
//                 let otherLeft = obj.xPos;
//                 let otherRight = obj.xPos + (obj.width);
//                 let otherTop = obj.yPos- (obj.height);
//                 let otherBottom = obj.yPos;
                
//                 //check for overlap of objects                  
//                 if ((thisBottom >= otherTop) && (thisTop <= otherBottom) && (thisRight >= otherLeft) && (thisLeft <= otherRight)){
//                     errors = true;
//                     logger(`Collision obj1: ${inputObj.objectType} thisLeft ${thisLeft} thisRight ${thisRight} thisTop ${thisTop} thisBottom ${thisBottom}`,'checkForCollision','collision');
//                     logger(`Collision obj2: ${obj.objectType} otherLeft ${otherLeft} otherRight ${otherRight} otherTop ${otherTop} otherBottom ${otherBottom}`,'checkForCollision','collision');

//                     //conditions for hitting static object
//                     if (obj.objectType == "static"){

//                     //conditions for hitting moving object    
//                     }else{
//                         //mainc character hitting enemy
//                         if (inputObj.objectType = "mainChar" && obj.objectType == "enemy")
//                         {

//                         }


//                     }
//                 }
//             }
// */
//         });  //end this.frontObjs.forEach(obj => 
//         return errors;
//     }

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