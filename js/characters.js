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
        moveXinc: 5,  //speed
        moveYinc: 1,  //speed
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
        moveXinc: 5,  //speed
        moveYinc: 1,  //speed
    },
]
const objectChar = [
    {
        objectType:"block"
    },
]