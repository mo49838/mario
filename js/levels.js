const level = 
    //start level 0
    [ 
        {
            level: 0,
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
                    constIndx:0, //first element of enemy
                },
                //start pyramid
                {
                    frame:700,
                    objClass:"movingObject",
                    constName:"staticChars",
                    constIndx:9,   //shortVerticle
                },
                {
                    frame:730,
                    objClass:"movingObject",
                    constName:"staticChars",
                    constIndx:10, //middleVerticle
                },
                {
                    frame:750,
                    objClass:"movingObject",
                    constName:"staticChars",
                    constIndx:11, //middleVerticle
                },
                {
                    frame:770,
                    objClass:"movingObject",
                    constName:"staticChars",
                    constIndx:11, //middleVerticle
                },
                {
                    frame:790,
                    objClass:"movingObject",
                    constName:"staticChars",
                    constIndx:10, //middleVerticle
                },
                {
                    frame:810,
                    objClass:"movingObject",
                    constName:"staticChars",
                    constIndx:9,   //shortVerticle
                },
                //end pyramid
            ]
        }
    ];