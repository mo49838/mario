const level = 
    //start level 0
    [ 
        {
            level: 0,
            frames: 2350,
            lvlObjects:[
                {
                    frame:0,
                    objClass:"movingObject",
                    constName:"staticChars",
                    constIndx:0, //first element of enemy
                },
                {
                    frame:1,
                    objClass:"movingObject",
                    constName:"enemyChars",
                    constIndx:0, //first enemy
                },             
                {
                    frame:10,
                    objClass:"movingObject",
                    constName:"enemyChars",
                    constIndx:1, //second enemy
                },
                //start pyramid
                {
                    frame:730,
                    objClass:"movingObject",
                    constName:"staticChars",
                    constIndx:9,   //shortVerticle
                },
                {
                    frame:780,
                    objClass:"movingObject",
                    constName:"staticChars",
                    constIndx:10, //middleVerticle
                },
                {
                    frame:830,
                    objClass:"movingObject",
                    constName:"staticChars",
                    constIndx:11, //middleVerticle
                },
                {
                    frame:880,
                    objClass:"movingObject",
                    constName:"staticChars",
                    constIndx:11, //middleVerticle
                },
                {
                    frame:930,
                    objClass:"movingObject",
                    constName:"staticChars",
                    constIndx:10, //middleVerticle
                },
                {
                    frame:980,
                    objClass:"movingObject",
                    constName:"staticChars",
                    constIndx:9,   //shortVerticle
                },
                //end pyramid
                {
                    frame:1050,
                    objClass:"movingObject",
                    constName:"staticChars",
                    constIndx:1,   //horMediumBottom
                },
                {
                    frame:1050,
                    objClass:"movingObject",
                    constName:"staticChars",
                    constIndx:10,   //medium veritcle at bottom
                },
                {
                    frame:1430,
                    objClass:"movingObject",
                    constName:"enemyChars",
                    constIndx:2, //enemy
                },   
                {
                    frame:1430,
                    objClass:"movingObject",
                    constName:"staticChars",
                    constIndx:10,   //medium veritcle at bottom
                },   
                {
                    frame:1480,
                    objClass:"movingObject",
                    constName:"staticChars",
                    constIndx:4,   //hor middle medium
                }, 
                {
                    frame:1900,
                    objClass:"movingObject",
                    constName:"staticChars",
                    constIndx:8,   //hor short middle
                },
                {
                    frame:1950,
                    objClass:"movingObject",
                    constName:"staticChars",
                    constIndx:18,   //finish flag
                },                
            ]
        },
        {
            level: 1,
            frames: 2000,
            lvlObjects:[
                {
                    frame:0,
                    objClass:"movingObject",
                    constName:"staticChars",
                    constIndx:0, //first element of enemy
                },         
                {
                    frame:10,
                    objClass:"movingObject",
                    constName:"enemyChars",
                    constIndx:1, //second enemy
                },
                {
                    frame:15,
                    objClass:"movingObject",
                    constName:"enemyChars",
                    constIndx:1, //second enemy
                },                
                {
                    frame:640,
                    objClass:"movingObject",
                    constName:"staticChars",
                    constIndx:4,   //horMediumBottom
                },    
                {
                    frame:800,
                    objClass:"movingObject",
                    constName:"staticChars",
                    constIndx:12,   //horMediumBottom
                },  
                {
                    frame:1060,
                    objClass:"movingObject",
                    constName:"staticChars",
                    constIndx:12,   //horMediumBottom
                },     
                {
                    frame:1060,
                    objClass:"movingObject",
                    constName:"enemyChars",
                    constIndx:3, //second enemy
                },         
            ]
        },
    ];