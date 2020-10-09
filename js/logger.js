//used to determine level of debugging (change depending on what you want)
//possible levels: 
//  paint:  show messages relating to painting/redrwaing screen
//  all:  will show all messages no matter what level
//  listener:  show listener event
//  move:  show values characters move
//  collision:  show objects involved in collision


//const debugLevels = ['move','listener'] 
const debugLevels = ['move'] 

function logger(message, func, level='all'){
    if (debugLevels.indexOf(level) >=0 || debugLevels.indexOf('all') >=0)  
        console.log(`${func}/${level}: ${message}`)
        
}