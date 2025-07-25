class Player {
	constructor() { //The contructor function is run when the player object is instanciated.
		this.pos       = createVector(16, 16); //Sets the initial position of the player to the top left.
		this.renderPos = createVector(16, 16); //This is the position the player will be rendered at, this allows for smoother movement.
		this.mazeTime  = 0;
	}

	update() { //This update is called once every "draw loop".
		let smoothing = 0.31; //Smoothing sets how smooth the movement is, it is a float between 0 and 1 with a lower number being smoother.

		//Lerp (linear interpalation) takes the first value and makes is closer to the second parameter based on the third parameter which
		//is between 0 and 1. A value of 0 means the first value doesn't change at all, 1 means the value will change to the second value
		//on the first call of the lerp function.
		this.renderPos.x = lerp(this.renderPos.x, this.pos.x, smoothing);
		this.renderPos.y = lerp(this.renderPos.y, this.pos.y, smoothing);

		//Gets the current cell's index that the player is at.
		let i = this.getIndexFromPositionComponent(player.pos.x);
		let j = this.getIndexFromPositionComponent(player.pos.y);

		let originalVisitedState = maze[i][j].isVisitedByPlayer;

		if (!maze[i][j].isVisitedByPlayer) {
			maze[i][j].isVisitedByPlayer = true;
		}

		if (maze[i][j].isEnd) {
			//The player has reached the end of the maze.

			state = "summaryScreen"; //Changes the state of the game to the summary screen.
			player.mazeTime = int((millis() - startTime) / 1000); //Updates the players time (in seconds).
			saveTime(player.mazeTime); //Saves the time in the scores text file
		} else {
			if (!maze[i][j].isStart) {
				if (maze[i][j].isQuestion && !originalVisitedState) {
					state = "question";
					question = new Question(random(topics));
				}
			}
		}
	}

	getIndexFromPositionComponent(component) {
		let index = int((component - 16) / 32);
		return index;
	}

	render() {
		let sideLength = 16;
		push();
		noStroke();
		fill(255, 255, 0, 255);
		rectMode(CENTER);
		rect(this.renderPos.x, this.renderPos.y, sideLength, sideLength);
		pop();
	}

	move(dir) {
		switch(dir) {
			case "right":			
				if (this.isValidMove("right")) this.pos.x += 32;
				break;
			case "left":
				if (this.isValidMove("left"))  this.pos.x -= 32;
				break;
			case "down":
				if (this.isValidMove("down"))  this.pos.y += 32;
				break;
			case "up":
				if (this.isValidMove("up"))    this.pos.y -= 32;
				break;
		}
	}

	isValidMove(dir) {
		let i = this.getIndexFromPositionComponent(player.pos.x);
		let j = this.getIndexFromPositionComponent(player.pos.y);
		
		switch(dir) {
			case "right":
				if (!maze[i][j].right && !maze[i + 1][j].left) {
					return true;
				}
				break;
			case "left":
				if (!maze[i][j].left && !maze[i - 1][j].right) {
					return true;
				}
				break;
			case "down":
				if (!maze[i][j].bottom && !maze[i][j + 1].top) {
					return true;
				}
				break;
			case "up":
				if (!maze[i][j].top && !maze[i][j - 1].bottom) {
					return true;
				}
				break;
		}
	
		return false;
	}
}


function keyPressed() {
	if (state == "game") {
		if      (keyCode == RIGHT_ARROW || keyCode == 68) player.move("right");
		else if (keyCode == LEFT_ARROW  || keyCode == 65)  player.move("left");
		else if (keyCode == DOWN_ARROW  || keyCode == 83)  player.move("down");
		else if (keyCode == UP_ARROW    || keyCode == 87)    player.move("up");
	}
}
