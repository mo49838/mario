//character definitions
const mainChars = [
    {
        objectType:"mainChar",
        name: "Mario",
        width: 30,
        height: 30,
        color: "blue",
        image: "images/happy.png",
        colorMode: false,
        xPos: 0,  //starting position x
        yPos: 103,  //starting position y
        xDirection: 1,   //go from right to left
        yDirection: -1,   //go from bottom to top
        moveXinc: 5,  //speed
        moveYinc: 7,  //speed
        jumpTimes: 7,  //number of refreshes to continue jump
        jumpXRatio: 1,  //ratio of x movement on angeled jump
    },
]
const enemyChars = [
    {
        objectType:"enemy",
        name: "enemy1",
        width: 20,
        height: 30,
        color: "red",
        image: "images/happy.png",
        colorMode: false,        
        xPos: 160,  //starting position x
        yPos: 120,  //starting position y
        xDirection: -1,   //go from left to right
        yDirection: -1,   //go from bottom to top
        moveXinc: 3,  //speed
        moveYinc: 6,  //speed
        jumpTimes: 7,
        jumpXRatio: 1,  //ratio of x movement on angeled jump
    },
]
const staticChars = [
    {
        objectType:"block",
        name: "solid",
        width: 200,
        height: 19,
        color: "green",
        colorMode: true,        
        image: "",
        xPos: 0,  //starting position x
        yPos: 0,  //starting position y
        xDirection: 0,   //go from left to right
        yDirection: 0,   //go from bottom to top
        moveXinc: 0,  //speed
        moveYinc: 0,  //speed
        jumpTimes: 0,
        jumpXRatio: 0,
    },
    {
        objectType:"block",
        name: "solid",
        width: 100,
        height: 5,
        color: "green",
        colorMode: true,        
        image: "",
        xPos: 150,  //starting position x
        yPos: 55,  //starting position y
        xDirection: 0,   //go from left to right
        yDirection: 0,   //go from bottom to top
        moveXinc: 0,  //speed
        moveYinc: 0,  //speed
        jumpTimes: 0,
        jumpXRatio: 0,
    },
]