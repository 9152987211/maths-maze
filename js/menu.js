class Menu {
	constructor() {
		let playButtonWidth    = 128;
		let playButtonHeight   = 64;
		let playButtonXpos     = int(width * 0.5) - int(playButtonWidth * 0.5);
		let playButtonYpos     = int(height * 0.5) - int(playButtonHeight * 0.5);
		this.playButton        = new Button(playButtonXpos,
											playButtonYpos,
											playButtonWidth,
											playButtonHeight,
											"Play",
											24,
											color(80, 80, 192, 255),
											color(0));

		let topicsButtonWidth  = 128;
		let topicsButtonHeight = 64;
		let topicsButtonXpos   = int(width * 0.5) - int(topicsButtonWidth * 0.5);
		let topicsButtonYpos   = int(height * 0.5) - int(topicsButtonHeight * 0.5) + 80;
		this.topicsButton      = new Button(topicsButtonXpos,
											topicsButtonYpos,
											topicsButtonWidth,
											topicsButtonHeight,
											"Select\nTopics",
											24,
											color(80, 80, 192, 255),
											color(0));

		let exitButtonWidth    = 128;
		let exitButtonHeight   = 64;
		let exitButtonXpos     = int(width * 0.5) - int(exitButtonWidth * 0.5);
		let exitButtonYpos     = height - exitButtonHeight - 16;
		this.exitButton        = new Button(exitButtonXpos,
											exitButtonYpos, 
											exitButtonWidth,
											exitButtonHeight,
											"Return To\nMain Menu",
											24,
											color(80, 80, 192, 255),
											color(0));
	}

	render() {
		switch(state) {
			case "menu":
				background(125, 125, 227, 255); //Fills the background with a grey colour.
				renderTitle("ADAM OSBORNE'S\nCOMPUTER SCIENCE\nCOURSEWORK", 96, color(200, 30, 30, 200), 48, 2);
		  		this.playButton.render();
		  		this.topicsButton.render();
				break;
			case "summaryScreen":
				renderSummaryScreen();
				break;
			case "topics":
				background(125, 125, 227, 255);
				renderTitle("SELECT TOPICS", 32, color(200, 30, 30, 200), 48, 2);
				this.exitButton.render();
				break;
		}
	}

	update() {
		switch(state) {
			case "menu":
				this.playButton.update();
				this.topicsButton.update();

				if (this.playButton.clicked) {
					state     = "game";
					startTime = millis();
					player    = new Player();  //Instanciates the player object.
					instanciateCells();     //Sets up each cell of the maze.
					initialiseMaze();		//Generates the maze.
				} else if (this.topicsButton.clicked) {
					state     = "topics";
				}

				break;
			case "summaryScreen":
				this.exitButton.update();

				if (this.exitButton.clicked) {
					state     = "menu";
				}
				break;
			case "topics":
				this.exitButton.update();

				if (this.exitButton.clicked) {
					state     = "menu";
				}

				break;
		}		
	}
}


function renderTitle(text_, ypos, colour, fontSize_, strokeThickness) {
	stroke(colour);
	strokeWeight(strokeThickness);
	fill(colour);
	textSize(fontSize_);
	textAlign(CENTER, CENTER);
	text(text_, width * 0.5, ypos);
}


function renderSummaryScreen() {
	background(125, 125, 227, 255);
	renderTitle("MAZE COMPLETE", 32, color(0, 255, 0, 255), 48, 2);

	let totalSeconds = player.mazeTime;
	let minutes = getMinutesFromTotalSeconds(totalSeconds);
	let seconds = getSecondsFromTotalSeconds(totalSeconds);

	renderTitle("YOUR TIME WAS " + minutes + " MINUTES AND " + seconds + " SECONDS", 96, color(200, 30, 30, 200), 16, 1);
	menu.exitButton.render();
}
