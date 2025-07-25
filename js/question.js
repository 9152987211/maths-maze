class Question {
	constructor(topic) {
		this.text            = "";
		this.answer          = "";
		this.imageID         = 0;
		this.wrongAnswers    = [
			"",
			"",
			""
		];
		this.solution        = "";
		this.topic           = topic;
		this.buttons         = [  
							       new Button(96,  400, 64, 32, "", 16, color(128), color(64)),
							       new Button(176, 400, 64, 32, "", 16, color(128), color(64)),
							       new Button(256, 400, 64, 32, "", 16, color(128), color(64)),
							       new Button(336, 400, 64, 32, "", 16, color(128), color(64))
							   ];
		this.possibleAnswers = [
			" ",
			" ",
			" ",
			" "
		];


		switch(this.topic) {
			case "POLYNOMIAL_DIFFERENTIATION":
				let numberOfQuestions = questionData.POLYNOMIAL_DIFFERENTIATION.length;
				let index 		      = int(random(0, numberOfQuestions));
				this.text 		  	  = questionData.POLYNOMIAL_DIFFERENTIATION[index].text;
				this.answer       	  = questionData.POLYNOMIAL_DIFFERENTIATION[index].answer;
				this.imageID 	  	  = index;
				this.wrongAnswers 	  = questionData.POLYNOMIAL_DIFFERENTIATION[index].wrongAnswers;
				this.solution 	  	  = questionData.POLYNOMIAL_DIFFERENTIATION[index].solution;
				break;
		}

		let correctAnswerIndex = int(random(0, 4));
		this.possibleAnswers[correctAnswerIndex] = this.answer;
		let counter = 0;
		for (let i = 0; i < this.possibleAnswers.length; i++) {
			if (this.possibleAnswers[i] == " ") {
				this.possibleAnswers[i] = this.wrongAnswers[counter];
				counter++;
			}
		}
	}

	render() {
		//Border
		stroke(0)
		strokeWeight(4);
		fill(192, 192, 192, 240);
		rect(64, 64, 384, 384);

		//Topic seperator
		line(64, 128, 448, 128);

		//Topic title
		stroke(0);
		strokeWeight(0);
		fill(0);
		textAlign(CENTER, TOP);
		textSize(24);
		text(this.topic.replace("_", " "), 68, 68, 384, 96);

		//Answer Seperator
		stroke(0);
		strokeWeight(4);
		line(64, 320, 448, 320);

		//Answer Buttons
		for (let i = 0; i < this.buttons.length; i++) {
			this.buttons[i].render();
		}

		//Question Text
		stroke(0);
		strokeWeight(0);
		fill(0);
		textAlign(CENTER, TOP);
		textSize(18);
		text(this.text, 64, 142, 384, 192);

		//Image 256*128
		/*
		noFill();
		stroke(0);
		strokeWeight(2);
		push();
		rectMode(CENTER);
		rect(256, 248, 256, 128);
		pop();
		*/

		//Image
		push();
		imageMode(CENTER);
		let imageIndex = 0;
		for (let i = 0; i < images.length; i++) {
			if (images[i].id == this.imageID && images[i].topic == this.topic) {
				imageIndex = i;
			}
		}
		image(images[imageIndex].image, 256, 248);
		pop();

		//Answers
		textAlign(CENTER, TOP);
		textSize(12);
		noStroke();
		fill(0);

		for (let i = 0; i < this.possibleAnswers.length; i++) {
			text(this.possibleAnswers[i], 96 + (i * 80), 326, 64, 64);
		}
		
	}

	update() {
		//Answer Buttons
		for (let i = 0; i < this.buttons.length; i++) {
			this.buttons[i].update();
		}

		for (let i = 0; i < this.buttons.length; i++) {
			if (this.buttons[i].clicked) {
				state = "game";

				
			}
		}
	}
}
