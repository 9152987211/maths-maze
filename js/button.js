class Button {
	constructor(x, y, w, h, text, textSize, fillColour, borderColour) {
		this.pos 		  = createVector(x, y);
		this.w 			  = w;
		this.h 			  = h;
		this.text         = text;
		this.textSize 	  = textSize;
		this.hover     	  = false;
		this.clicked      = false;
		this.fillColour   = fillColour;
		this.borderColour = borderColour;
	}	

	render() {
		stroke(this.borderColour);
		strokeWeight(2);
		
		if (this.hover) {
			let hoverBrightnessIncrease = 48 + sin(frameCount * 0.1) * 24;
			fill(red(this.fillColour) + hoverBrightnessIncrease, green(this.fillColour) + hoverBrightnessIncrease, blue(this.fillColour) + hoverBrightnessIncrease);
		} else {
			fill(this.fillColour);
		}
		
		
		rect(this.pos.x, this.pos.y, this.w, this.h);

		noStroke();
		fill(0);
		textSize(this.textSize);
		textAlign(CENTER, CENTER);
		text(this.text, this.pos.x + (this.w * 0.5), this.pos.y + (this.h * 0.5));
	}

	update() {
		this.hover = this.isHighlighted();
		this.clicked = this.isClicked();
	}

	isHighlighted() {
		if (mouseX >= this.pos.x && mouseX <= this.pos.x + this.w) {
			if (mouseY >= this.pos.y && mouseY <= this.pos.y + this.h) {
				return true;
			}
		}
		return false;
	}

	isClicked() {
		if (this.hover && mouseIsPressed) {
			return true;
		}
		return false;
	}
}
