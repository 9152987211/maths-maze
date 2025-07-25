class Cell {
	constructor(i, j) { //The position of cell in the array is passed into the contructor function
		//				  which is called when the cells in the maze are instanciated.
		this.i                 = i;
		this.j 				   = j;
		this.pos               = createVector(i * 32, j * 32); //Creates a vector for the position on the screen of each cell
		//										   by multiplying the position in the array by 32 as this will
		//										   be the spacing.
		this.algorithmVisited  = false; //Initially the algoirthm will have not visited any of the cells.
		this.neighbours        = []; //Creates an empty 1-dimensional array for storing the neighbouring cells.

		this.right             = true; //Sets the right wall initially to true (true means that the wall exists).
		this.left              = true; //Sets the left wall initially to true (true means that the wall exists).
		this.bottom            = true; //Sets the bottom wall initially to true (true means that the wall exists).
		this.top 			   = true; //Sets the top wall initially to true (true means that the wall exists).

		this.isStart           = false; //Sets all the cells to not be the start cell.
		this.isEnd 			   = false; //Sets all the cells to also not be the end cell.
		this.isVisitedByPlayer = false; //Initially, none of the cells will have been visited by the player.
		this.isQuestion        = chanceOfTrue(0.1);
	}

	render() { //This procedure is called for each cell in the maze to draw the cell with the walls aswell.
		noStroke(); //Stops an outline being drawn on the rectangle as outline will be drawn
		//            by individual lines indicating where the walls are.

		//fill(r, g, b, a) sets the current colour that will be drawn when the rect() procedure is called
		//where r is the amount of red, g is the amount of green, b is the amount of blue and a is the amount
		//of alpha. All four of these values range from 0 to 255 inclusive.
		if (this.isStart) { //Checks if the current cell is the start cell.
			fill(105, 200, 80, 255); //This is the colour of the start cell.
		} else if (this.isEnd) { //Checks if the current cell is the end cell.
			fill(200, 180, 80, 255); //This is the colour of the end cell.
		} else if (this.isVisitedByPlayer) { //Checks if the current cell has been visited by the player.
			if (this.isQuestion) {
				fill(175, 115, 227, 255);
			} else {
				fill(115, 115, 227, 255); //This is the colour of the cell once the player has walked over it.
			}
		} else if (this.isQuestion) {
			fill(255, 70, 70, 200);
		} else { //If all above are false then the following line of code is run.
			fill(80, 80, 192, 255); //This is the colour of a default cell.
		}	

		rect(this.pos.x, this.pos.y, 32, 32); //Draws a rectangle with the top left being located at
		//(this.pos.x, this.pos.y) which are values calculated in the contructor function and with a width
		//and height of 32.

		//Walls
		stroke(255, 255, 255, 255); //Sets the stroke colour to (255, 255, 255, 255) with each value being the amount
		// 							  of red, green, blue and alpha respectively. This colour will be white.
		strokeWeight(2); //Sets the width of the stroke to 2 pixels.
		//The four if statements check if the state of the four walls are each true and if so, a line is drawn with the
		//colour and width specificed in the two previous stroke procedures. The line is drawn in the corresponding position
		//to the wall boolean using the position of the cell and its width and height. If one of the states of the walls is
		//false then the correspong line representing the wall will not be drawn.
		if (this.top)    line(this.pos.x, this.pos.y, this.pos.x + 32, this.pos.y);
		if (this.bottom) line(this.pos.x, this.pos.y + 32, this.pos.x + 32, this.pos.y + 32);
		if (this.left)   line(this.pos.x, this.pos.y, this.pos.x, this.pos.y + 32);
		if (this.right)  line(this.pos.x + 32, this.pos.y, this.pos.x + 32, this.pos.y + 32);
		//The line procedure takes in four inputs as parameters, the first two are the x and y position of the start of the
		//line and the second two parameters are the x and y positions of the end of the line.
	}

	findNeighbours() { 
		this.neighbours = []; //Empties the neighbours array.

		if (this.i > 0) { //Checks if the horizonal index position is greater than zero (checking that cell
			//				is not on the left).
			if (!maze[this.i - 1][this.j].algorithmVisited){ //Checks if the cell has not been visited by the
				//											   algorithm.
				this.neighbours.push(maze[this.i - 1][this.j]); //Adds the neighbour cell object to the neighbours array.
			}
		}

		if (this.i < 15) { //Checks if the horizonal index position is less than 15 (checking that cell
			//				is not on the right).
			if (!maze[this.i + 1][this.j].algorithmVisited){ //Checks if the cell has not been visited by the
				//											   algorithm.
				this.neighbours.push(maze[this.i + 1][this.j]); //Adds the neighbour cell object to the neighbours array.
			}
		}

		if (this.j > 0) { //Checks if the vertical index position is greater than 0 (checking that cell
			//				is not on the top).
			if (!maze[this.i][this.j - 1].algorithmVisited){ //Checks if the cell has not been visited by the
				//											   algorithm.
				this.neighbours.push(maze[this.i][this.j - 1]); //Adds the neighbour cell object to the neighbours array.
			}
		}

		if (this.j < 15) { //Checks if the vertical index position is less than 15 (checking that cell
			//				is not on the bottom).
			if (!maze[this.i][this.j + 1].algorithmVisited){ //Checks if the cell has not been visited by the
				this.neighbours.push(maze[this.i][this.j + 1]); //Adds the neighbour cell object to the neighbours array.
			}
		}
	}

	moveToNext(current, stack) {
		if (this.neighbours.length === 0) {
			//Has no neighbours
			if (stack.length > 0) {
				//Backtrack
				current = stack.pop();
			}
		} else {
			//Has at lease one neighbour
			let nextIndex = int(random(0, this.neighbours.length))
			let next = this.neighbours[nextIndex];

			if (next.i < current.i) {next.right = false; current.left = false;}
			else if (next.i > current.i) {next.left = false; current.right = false;}
			else if (next.j > current.j) {next.top = false; current.bottom = false;}
			else if (next.j < current.j) {next.bottom = false; current.top = false;}

			maze[current.i][current.j] = current
			current = next;
			stack.push(current);
		}

		return current;
	}
}
