//character definitions
const mainChars = [
    {
        objectType:"mainChar",
        name: "Mario",
        width: 30,
        height: 30,
        color: "blue",
        image: "images/happy.png",
        xPos: 0,  //starting position x
        yPos: 0,  //starting position y
        xDirection: 1,   //go from right to left
        yDirection: -1,   //go from bottom to top
        moveXinc: 4,  //speed
        moveYinc: 10,  //speed
        jumpTimes: 7,  //number of refreshes to continue jump
        jumpXRatio: .8,  //ratio of x movement on angeled jump
    },
]
const enemyChar = [
    {
        objectType:"enemy",
        name: "enemy1",
        width: 20,
        height: 30,
        color: "red",
        image: "images/happy.png",
        xPos: "end",  //starting position x
        yPos: 0,  //starting position y
        xDirection: -1,   //go from left to right
        yDirection: -1,   //go from bottom to top
        moveXinc: 3,  //speed
        moveYinc: 3,  //speed
        jumpTimes: 3,
        jumpXRatio: .8,  //ratio of x movement on angeled jump
    },
]
const objectChar = [
    {
        objectType:"block"
    },
]