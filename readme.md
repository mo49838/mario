# Description
This project involves creating a game that meets the following requirements:
* Render in the browser
* Include separate HTML / CSS / JavaScript files
* Use Javascript for DOM manipulation
* Be deployed online, using Github Project pages and/or to a custom domain.
* Use semantic markup for HTML and CSS (adhere to best practices)
* Show a good commit history with frequent commits  

My project was focused on creating a knock off of the Mario game.  Since this game was created 
in 3 days of class, it is a very generic game using smiley faces instead of actual characters. 
The customization of initial characters is complete, additional levels/charcters/objects can be added through configuratoin of arrays.  The problem this project solves is boredom, Mario is addictive in any form.
<div align="center">
  <img src="https://github.com/mo49838/mario/blob/main/mario.gif"></img>
</div>

# List of Features / User Stories
## Bronze (MVP)
- [x] Main character and enemy painted as color on a canvas
- [x] User can control main character motion (up/down/left/right)
- [x] Enemies have default motion
- [x] If main character and a enemy overlap, conflict is caught and game ends

## Silver
- [x] Arrays are created that describe characters and objects available to put on the screen
- [x] Game has gravity (characters stop verticle motion on top of an object unless jumping)
- [x] When main character hits up arrow, a jump is initiated (either straight up or angled)
- [x] When main character is jumping, it can't initiate another jump until the first jump is complete
- [x] When a character is in the air, it can only control left/right direction of rise (jumping) or fall
- [x] When main character is moving to the right, is over 40% accross the screen, and there is no conflict, then move all the objects to the left by the main characters x motion and leave main character where it is at (shift the screen to the left)
- [x] When a character conflicts with an enemy, if the bottom of the character is greater than 80% of enemy height then enemy dies.  Otherwise main character dies
- [x] When a chracter conflicts with a static object (like a block), motion that direction stops
- [x] When an enemy conflicts with a statis object (like a block), motion that direction is reversed
- [x] Game has timer that runs out after x seconds
- [x] There is a game board that tracks where all objects are on the screen to make conflict detection easier
- [x] When a main character goes off the screen, appropriate action is take (example:  if user falls off bottom of screen, character dies)
- [x] User is given feedback on win/lose 
- [x] Finish flag added at end to show the user has won)

## Gold Levels
- [x] User can switch between graphics mode and color mode (button stayed highlighted while color mode on)
- [x] Level arrays are created which control objects that are added to the game based on screen
- [x] Based on frame of the screen, the level array is read and classes dynamically call for the different objects in the array (enemy/block/...)
- [x] User can add multiple games to the screen
- [ ] Score is tracked on the screen
- [ ] When multiple games initiated, give different keys to control motion for each game (arrows for one, number pad for another, aswd for third...) which will enable multi playler game
- [ ] Add main character lives (example: 3 lives per game)
- [ ] Add reset button to restart the game
- [ ] Difficulty button added which drives the refresh rate of game (higher difficulty equals lower refresh rate) and number/size of enemies 
- [ ] Random level generator where objects are added based on difficulty (the generator would have rules to ensure main character can jump between blocks)
- [ ] Add background that moves with the screen
- [ ] Add graphics for blocks (currenlty fill color)

# Known issues
* When launching multiple games, objects on the second game disappear or are not in right position.  My impression is that even though I am instatiating different instances of the class Game, the memory is overlapping.  
* When an emeny falls off the bottom of the screen, logging shows that the array of frontObjects has it flagged deleted.  But after the setinterval timer kicks in again, the frontObjects doesn't show it deleted.  Assuming relating to first issue.

# List of Technologies Used
* HTML5/CSS3/javascript ES6
* Note: canvas is the work horse for displaying the board and painting the objects

# Installation Instructions / Getting Started
1. Install modern web broswer (Chrome/Edge/Safari/...)
1. Download this repos files
1. Launch index.html
1. Click 'Add Game(s)'

# Contribution Guidelines
*[Repo](https://github.com/mo49838/mario)  
*[Play the game](https://pensive-payne-6a95b2.netlify.app/)  
*[Issue Tracker](https://github.com/mo49838/mario/issues) 
