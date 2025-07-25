//#############################################################################################################################################
//Adam Osborne's Computer Science Coursework.
//A maze traversal game using a recursively randomly generated maze algorithm using a stack where the player has to reach the end of the maze
//as they answer Calculus based questions on the way.
//This program is aimed at Sixth Form students who are studing A-Level Mathematics and Further Mathematics.
//The times are stored in a JSON file and are sorted usinga recursive merge sort.
//#############################################################################################################################################





//Global Variable declarations:
//#############################################################################################################################################
let        maze  = []; for (let i = 0; i < 16; i++) {maze[i] = [];} //Create a 2 dimensional array called maze (an array of arrays).
let        state = "menu"; //Creates the application state variable.
let    startTime = 0; //Initially the start time is set to 0.
let       images = []; //Images is set as an empty array.
let       topics = ["POLYNOMIAL_DIFFERENTIATION"]; //Topics is set as an array that has initially one topic.
let questionData; //This will store the data loaded from the questions.json file.
let       player; //This will store the player object.
let 	    menu; //This will store the menu object.
let     question; //This will store the question object.
let    TimesFile; //This will store the data loaded from the times.json file so a high score can be displayed.
//#############################################################################################################################################





//Preload is the procedure that is called when program is started, it will not exit to setup until all images and json
//files have all been loaded:
//#############################################################################################################################################
function preload() {
	for (let i = 0; i < 2; i++) { //This will add all the polynomial differentiation questions. 
		images.push(new ImageObject("POLYNOMIAL_DIFFERENTIATION", i)); //Adds a new image object to the images array.
	}
	questionData = loadJSON("./assets/questions.json"); //Loads the questions.json file.
	TimesFile    = loadJSON("./assets/Times.json");     //Loads the times.json file.
}
//#############################################################################################################################################





//The setup procedure is called once when the preload is finished:
//#############################################################################################################################################
function setup() { 			
	createCanvas(512, 512); //Creates the HTML canvas with a width and height of 512 pixels.
	instanciateCells();     //Sets up each cell of the maze.
	initialiseMaze();		//Generates the maze.
	menu = new Menu(); 	    //Instanciates the menu object.
}
//#############################################################################################################################################





//The draw procure is run after setup is completed and once the end of draw() is reached draw() is called again and all
//rendering changes to the canvas are updated to the screen:
//#############################################################################################################################################
function draw() { 
	switch(state) { //Checks the state of the game. It is Similar to a "select case" in VB.net.
		case "menu":
			menu.update(); //Calls the update method of menu.
			menu.render(); //Calls the render method of menu.
			break; //Exits out of the switch statement.
		case "game":
			renderMaze(); //Calls the renderMaze() procedure to display the maze.
			player.update(); //Calls the update() procedure for the player.
			player.render(); //Calls the render() procedure for the player.
			renderTimer();
			break; //Exits out of the switch statement.
		case "question":
			renderMaze(); //Calls the renderMaze() procedure to display the maze.
			player.update();
			player.render(); //Calls the render() procedure for the player.
			renderTimer();
			question.update();
			question.render();
			break;
		case "summaryScreen":
			//The summary screen is displayed at the end of the game once the player has reached the end of the maze.
			menu.update();
			menu.render();
			break //Exits out of the switch statement.
		case "topics":
			menu.update();
			menu.render();
			break;
	}
}
//#############################################################################################################################################





//This procedure is used to recursively and randomly generate the maze for the player to traverse in the game.
//#############################################################################################################################################
function generateMaze(current, stack, mazeLength) { //"current" is the current cell object, "stack" is the stack used for backtracking
	//												  and "mazeLength" is used to store the maximum length of the maze.
	current.algorithmVisited = true; //Sets the visited state of the cell to true so the maze generation doesn't go over itself.
	current.findNeighbours(); //Updates the current unvisited neighbours.
	current = current.moveToNext(current, stack); //Moves the current to a random neighbour.
	if (stack.length > mazeLength) { //If the current maze length is greater than the maximum maze length.
		mazeLength = stack.length; //Updates the new maximum maze length.
		for (let i = 0; i < 16; i++) { //Loops horizontaly for i going from 0 to 15.
			for (let j = 0; j < 16; j++) { //Loops verticaly for j goinf grom 0 to 15.
				maze[i][j].isEnd = false; //Sets the end state of all of the cells to false.
			}
		}
		maze[current.i][current.j].isEnd = true; //Since the current cell is currently at the furthest away position from the start,
		//										   the end state of this current cell is set to true.
	}
	if (stack.length > 0) { //Checks if there is at least on item in the stack.
		generateMaze(current, stack, mazeLength); //Recursively calls the same function with the updated current cell, stack and
		//											maximum maze length.
	}
}
//#############################################################################################################################################





//Initialise maze is used to setup the two dimensional maze array, create a new empty stack and call the generate maze procedure.
//#############################################################################################################################################
function initialiseMaze() {
	let stack = []; //Creates a new empty stack.
	let mazeLength = 0; //Sets the initial maximum maze length to zero.
	maze[0][0].isStart = true; //Sets the start of the maze at 0, 0.
	generateMaze(maze[0][0], stack, mazeLength); //Starts the recursive maze generation algorithm starting at (0, 0) in
	//											   the maze array.
}
//#############################################################################################################################################





//Instaciate cells is a procedure used to assign all the cell objects to each element of the two dimensional maze array.
//#############################################################################################################################################
function instanciateCells() {
	for (let i = 0; i < 16; i++) { //Loops horizontaly for i going from 0 to 15.
		for (let j = 0; j < 16; j++) { //Loops verticaly for j goinf grom 0 to 15.
			maze[i][j] = new Cell(i, j); //Instanciates the cell objects in each index of the maze.
		}
	}
}
//#############################################################################################################################################





//Displays the maze as the background for the game.
//#############################################################################################################################################
function renderMaze() {
	for (let i = 0; i < 16; i++) { //Loops horizontaly for i going from 0 to 15.
		for (let j = 0; j < 16; j++) { //Loops verticaly for j goinf grom 0 to 15.
			maze[i][j].render(); //Calls the render function of ever cell in the maze.
		}
	}
}
//#############################################################################################################################################





//Displays the timer at the top of the screen so the player has a goal and has to try to complete the maze as quick as possible.
//#############################################################################################################################################
function renderTimer() {
	//Sets the x and y position of the timer on the canvas.
	let timerXpos = int(width * 0.5);
	let timerYpos = 16;
	//Sets the text colour of the timer text.
	let textColour = color(30, 30, 142, 255);
	//Sets the text size to 32.
	textSize(32);
	//Aligns the text so that it is centered horizontaly and vertically.
	textAlign(CENTER, CENTER);
	//Sets the outline width of the text to 1 pixel.
	strokeWeight(1);
	//Sets the outline and fill colours to the text colour variable.
	stroke(textColour);
	fill(textColour);

	let totalSeconds = int((millis() - startTime) / 1000);  //Calculates the total time in seconds since the player clicked play.
	let minutes = getMinutesFromTotalSeconds(totalSeconds); //Calculates the total minutes since the start of the program.
	let seconds = getSecondsFromTotalSeconds(totalSeconds); //Calculates the seconds since the last updated minute.
	let displayTime = ""; //Sets the display time to an empty string.
	//The following code makes sure there is always 2 numbers before and after the colon by concatinating extra "0"s on when needed.
	if (minutes < 10) {
		if (seconds < 10) {
			displayTime = "0" + minutes + ":" + "0" + seconds;
		} else {
			displayTime = "0" + minutes + ":" + seconds;
		}
	} else {
		if (seconds < 10) {
			displayTime = minutes + ":" + "0" + seconds;
		} else {
			displayTime = minutes + ":" + seconds;
		}
	}

	//Displays the text on the screen using the previous settings.
	text(displayTime, timerXpos, timerYpos);
}
//#############################################################################################################################################





//This function returns a boolean (either true or false) based on a parameter passed into the function which
//is a probability from 0 to 1 inclusive.
//#############################################################################################################################################
function chanceOfTrue(probability) { //"probabilty" is the probability of true being returned.
	let result = false; //The result that will be returned is initially set to false.

	//A random number between 0 and 1 is generated and if the input is greater than this value then result is set to true.
	if (random(0, 1) < probability) { 
		result = true;
	}
	return result; //The boolean result is returned.
}
//#############################################################################################################################################





//This function is used to return the number of seconds when given a total number of seconds using the modulo function.
//#############################################################################################################################################
function getSecondsFromTotalSeconds(totalSeconds) {
	return totalSeconds % 60;
}
//#############################################################################################################################################





//This functions is used to return the number of minutes when giben a total number of seconds using integer division.
//#############################################################################################################################################
function getMinutesFromTotalSeconds(totalSeconds) {
	return int(totalSeconds / 60);
}
//#############################################################################################################################################





//This function is called once the player reaches the end of the maze so the file can be saved. The times are also sorted first
//using a recursive merge sort so that the quickest time can be displayed on the summary screen.
//#############################################################################################################################################
function saveTime(time) { //The time that the player completed the maze in is passed into the procedure.
	let array = TimesFile.Times; //the variable "array" is set to the array stored in the times.json file containing all the times.
	array.push(time); //The time the player achived is pushed to the end of the array.

	//The array is then sorted using a merge sort and the sorted array that will be returned is set to the times.json file's "Times" array.
	TimesFile.Times = mergeSort(array); 
	saveJSON(TimesFile, "Times.json"); //The JSON file is then saved with the new updated time contained within it.
}
//#############################################################################################################################################





//This function is used to split up the passed in array and it will then call the merge procedure.
//#############################################################################################################################################
function mergeSort(array) { //A single array is passed as a parameter into the merge sort function.
	//Checks if the length of the input array is less than two, if it is then the array is two small to merge so the array is just returned.
    if (array.length < 2) { 
        return array; //Returns the input array and exits out of the merge sort function.
    }
 
    var middlePosition = parseInt(array.length / 2); //Calculates the middle of the input array.
    var leftSubArray   = array.slice(0, middlePosition); //Gets the left half of the array.
    var rightSubArray  = array.slice(middlePosition, array.length); //Gets the right half of the array.
 
 	//The left and right sub arrays are recursively split until their length is 1.
 	//Once they have a length of 1 then they are merged together.
    return merge(mergeSort(leftSubArray), mergeSort(rightSubArray)); //Returns the left and right sub array's merged together.
}
//Checks if the length of the input array is less than two, if it is then the array is two small to merge so the array is just returned.
 

function merge(leftSubArray, rightSubArray) { //The left and right sub arrays are passed in as parameters into the merge function.
    var array = []; //Create a new empty array.
 
    while (leftSubArray.length > 0 && rightSubArray.length > 0) { //While both arrays have a length greater than zero.
        if (leftSubArray[0] <= rightSubArray[0]) { //If the first element of the left sub array is bigger than the first element of the right sub array.
            array.push(leftSubArray.shift()); //Adds the first element of the left sub array to the main array and shifts all the elements one to the left.
        } else {
            array.push(rightSubArray.shift()); //Adds the first element of the right sub array to the main array and shifts all the elements one to the left.
        }
    }
 
    while (leftSubArray.length > 0) { //Loop until the length of the left sub array is greater than zero.
        array.push(leftSubArray.shift()); //Adds the first element of the left sub array to the main array and shifts all the elements of the left sub array to the left by one.
    }
 
    while (rightSubArray.length > 0) { //Loop until the length of the right sub array is greater than zero.
        array.push(rightSubArray.shift());  //Adds the first element of the right sub array to the main array and shifts all the elements of the right sub array to the left by one.
    }
 
    return array; //Returns the main array.
}


document.onkeydown = function (keyPressed) { //This function is called when a key press is triggered.
  if (keyPressed.keyCode === 116) { //Checks if the key pressed is F5.
  	alert("■ Press F5 again to refresh the page.\n■ Press 'OK' to continue."); //Displays an alert with the specified message when F5 is pressed.
  	//If, after the message is displayed, you press F5 again then the page will refresh. If you click either "OK" or the close button then the
  	//message will close without the page being refreshed. 
    return false; //Exits out of the function before the page gets refreshed.
  }
}


//The image object class is used to store the image and also data about it.
class ImageObject { 
	constructor(topic, id) { //The topic and the id of the image are passed into the contructor function of the ImageObject.
		this.image = loadImage("assets/images/" + topic + id + ".png"); //The image is loaded using the name of the topic and id corresponding to that image.
		this.topic = topic; //The topic attribute is set to "topic" which was passed in to the constructor as a parameter.
		this.id    = id;    //The id attribute is set to "id" which was passed in to the constructor as a parameter.
	}
}