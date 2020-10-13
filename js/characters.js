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
    {
        objectType:"enemy",
        name: "enemy2",
        width: 30,
        height: 30,
        color: "red",
        image: "images/happy.png",
        colorMode: false,        
        xPos: "end",  //starting position x
        yPos: 200,  //starting position y
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
        name: "horLongBottom",
        width: 1000,
        height: 20,
        color: "green",
        colorMode: true,        
        image: "",
        xPos: "end",  //starting position x
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
        name: "horMediumBottom",
        width: 500,
        height: 20,
        color: "green",
        colorMode: true,        
        image: "",
        xPos: "end",  //starting position x
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
        name: "horShortBottom",
        width: 100,
        height: 20,
        color: "green",
        colorMode: true,        
        image: "",
        xPos: "end",  //starting position x
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
        name: "horLongMiddle",
        width: 1000,
        height: 10,
        color: "green",
        colorMode: true,        
        image: "",
        xPos: "end",  //starting position x
        yPos: 50,  //starting position y
        xDirection: 0,   //go from left to right
        yDirection: 0,   //go from bottom to top
        moveXinc: 0,  //speed
        moveYinc: 0,  //speed
        jumpTimes: 0,
        jumpXRatio: 0,
    },
    {
        objectType:"block",
        name: "horMediumMiddle",
        width: 500,
        height: 10,
        color: "green",
        colorMode: true,        
        image: "",
        xPos: "end",  //starting position x
        yPos: 50,  //starting position y
        xDirection: 0,   //go from left to right
        yDirection: 0,   //go from bottom to top
        moveXinc: 0,  //speed
        moveYinc: 0,  //speed
        jumpTimes: 0,
        jumpXRatio: 0,
    },
    {
        objectType:"block",
        name: "horShortMiddle",
        width: 100,
        height: 10,
        color: "green",
        colorMode: true,        
        image: "",
        xPos: "end",  //starting position x
        yPos: 50,  //starting position y
        xDirection: 0,   //go from left to right
        yDirection: 0,   //go from bottom to top
        moveXinc: 0,  //speed
        moveYinc: 0,  //speed
        jumpTimes: 0,
        jumpXRatio: 0,
    },
    {
        objectType:"block",
        name: "topLongMiddle",
        width: 1000,
        height: 10,
        color: "green",
        colorMode: true,        
        image: "",
        xPos: "end",  //starting position x
        yPos: 80,  //starting position y
        xDirection: 0,   //go from left to right
        yDirection: 0,   //go from bottom to top
        moveXinc: 0,  //speed
        moveYinc: 0,  //speed
        jumpTimes: 0,
        jumpXRatio: 0,
    },
    {
        objectType:"block",
        name: "topMediumMiddle",
        width: 500,
        height: 10,
        color: "green",
        colorMode: true,        
        image: "",
        xPos: "end",  //starting position x
        yPos: 80,  //starting position y
        xDirection: 0,   //go from left to right
        yDirection: 0,   //go from bottom to top
        moveXinc: 0,  //speed
        moveYinc: 0,  //speed
        jumpTimes: 0,
        jumpXRatio: 0,
    },
    {
        objectType:"block",
        name: "topShortMiddle",
        width: 100,
        height: 10,
        color: "green",
        colorMode: true,        
        image: "",
        xPos: "end",  //starting position x
        yPos: 80,  //starting position y
        xDirection: 0,   //go from left to right
        yDirection: 0,   //go from bottom to top
        moveXinc: 0,  //speed
        moveYinc: 0,  //speed
        jumpTimes: 0,
        jumpXRatio: 0,
    },
    {
        objectType:"block",
        name: "botVertShort",
        width: 20,
        height: 20,
        color: "green",
        colorMode: true,        
        image: "",
        xPos: "end",  //starting position x
        yPos: 21,  //starting position y
        xDirection: 0,   //go from left to right
        yDirection: 0,   //go from bottom to top
        moveXinc: 0,  //speed
        moveYinc: 0,  //speed
        jumpTimes: 0,
        jumpXRatio: 0,
    },
    {
        objectType:"block",
        name: "botVertMedium",
        width: 20,
        height: 40,
        color: "green",
        colorMode: true,        
        image: "",
        xPos: "end",  //starting position x
        yPos: 21,  //starting position y
        xDirection: 0,   //go from left to right
        yDirection: 0,   //go from bottom to top
        moveXinc: 0,  //speed
        moveYinc: 0,  //speed
        jumpTimes: 0,
        jumpXRatio: 0,
    },
    {
        objectType:"block",
        name: "botVertHigh",
        width: 20,
        height: 60,
        color: "green",
        colorMode: true,        
        image: "",
        xPos: "end",  //starting position x
        yPos: 21,  //starting position y
        xDirection: 0,   //go from left to right
        yDirection: 0,   //go from bottom to top
        moveXinc: 0,  //speed
        moveYinc: 0,  //speed
        jumpTimes: 0,
        jumpXRatio: 0,
    },
    {
        objectType:"block",
        name: "middleVertShort",
        width: 20,
        height: 20,
        color: "green",
        colorMode: true,        
        image: "",
        xPos: "end",  //starting position x
        yPos: 60,  //starting position y
        xDirection: 0,   //go from left to right
        yDirection: 0,   //go from bottom to top
        moveXinc: 0,  //speed
        moveYinc: 0,  //speed
        jumpTimes: 0,
        jumpXRatio: 0,
    },
    {
        objectType:"block",
        name: "middleVertMedium",
        width: 20,
        height: 40,
        color: "green",
        colorMode: true,        
        image: "",
        xPos: "end",  //starting position x
        yPos: 60,  //starting position y
        xDirection: 0,   //go from left to right
        yDirection: 0,   //go from bottom to top
        moveXinc: 0,  //speed
        moveYinc: 0,  //speed
        jumpTimes: 0,
        jumpXRatio: 0,
    },
    {
        objectType:"block",
        name: "middleVertHigh",
        width: 20,
        height: 60,
        color: "green",
        colorMode: true,        
        image: "",
        xPos: "end",  //starting position x
        yPos: 60,  //starting position y
        xDirection: 0,   //go from left to right
        yDirection: 0,   //go from bottom to top
        moveXinc: 0,  //speed
        moveYinc: 0,  //speed
        jumpTimes: 0,
        jumpXRatio: 0,
    },
    {
        objectType:"block",
        name: "topVertShort",
        width: 20,
        height: 20,
        color: "green",
        colorMode: true,        
        image: "",
        xPos: "end",  //starting position x
        yPos: 90,  //starting position y
        xDirection: 0,   //go from left to right
        yDirection: 0,   //go from bottom to top
        moveXinc: 0,  //speed
        moveYinc: 0,  //speed
        jumpTimes: 0,
        jumpXRatio: 0,
    },
    {
        objectType:"block",
        name: "topVertMedium",
        width: 20,
        height: 40,
        color: "green",
        colorMode: true,        
        image: "",
        xPos: "end",  //starting position x
        yPos: 90,  //starting position y
        xDirection: 0,   //go from left to right
        yDirection: 0,   //go from bottom to top
        moveXinc: 0,  //speed
        moveYinc: 0,  //speed
        jumpTimes: 0,
        jumpXRatio: 0,
    },
    {
        objectType:"block",
        name: "topVertHigh",
        width: 20,
        height: 60,
        color: "green",
        colorMode: true,        
        image: "",
        xPos: "end",  //starting position x
        yPos: 90,  //starting position y
        xDirection: 0,   //go from left to right
        yDirection: 0,   //go from bottom to top
        moveXinc: 0,  //speed
        moveYinc: 0,  //speed
        jumpTimes: 0,
        jumpXRatio: 0,
    },
]