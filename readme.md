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
- [x] Game has gravity (characters stop verticle motion on top of an object unless jumping)
- [x] When main character hits up arrow, a jump is initiated (either straight up or angled)
- [x] When main character is jumping, it can't initiate another jump until the first jump is complete
- [x] When a character is in the air, it can only control left/right direction of rise (jumping) or fall
- [x] When a character conflicts with an enemy, if the bottom of the character is greater than 80% of enemy height then enemy dies.  Otherwise main character dies
- [x] When a chracter conflicts with a static object (like a block), motion that direction stops
- [x] When an enemy conflicts with a statis object (like a block), motion that direction is reversed

## Gold Levels
- [x] User can switch between graphics mode and color mode
-
# List of Technologies Used
Often you will want to list the technologies you used to create the project.
This typically would consist of all primary languages, frameworks, and libraries your app is composed of
This is particularly important when it comes to recruiters scanning your projects for keywords
# Installation Instructions / Getting Started
This section should walk a reader, step by step, through the process of setting up your project
For a tool meant to be integrated into other projects, this would likely outline the process of installing and accessing this tool in your project
For an application, this would likely outline the process of forking, cloning, and starting the app locally
# Contribution Guidelines
This section should offer guidance on where and how users can contribute to your code, identify bugs, and propose improvements
Good links to include are:
A link to the project's main repository
A link to the project's issue tracker
