class Skier {
	updateGraphicPosition() {
		this.element.style.top = this.top.toString() + 'px';
		this.element.style.left = this.left.toString() + 'px';
	}
	
	constructor() {
		this.speed = constants.SKIER_MIN_SPEED;
		this.distanceTraveledInPixels = 0.0;
		this.accel = 0.1;
		this.decel = 0.04;
		this.isTurboOn = false;
		this.element = document.getElementById('skier');
		this.direction = constants.SKIER_DIRECTION.FRONT;
        this.element.className = this.direction;
        
        //Coordenadas
        this.top = parseInt(constants.SIZE_Y / 2) - 100;
        this.left = parseInt(constants.SIZE_X / 2);
        
		this.updateGraphicPosition();
		this.walking = true;
		this.canStandUp = false;
	}

	turboOn() {
		this.isTurboOn = true;
	}

	turboOff() {
		this.isTurboOn = false;
	}

	getSpeed() {
		return this.speed;
	}

	isWalking() {
		return this.walking;
	}
	
	standUp() {
		if (this.canStandUp) {
			this.walking = true;
			this.canStandUp = false;
		}
	}

	changeDirection(direction) {
		// if (this.direction + direction >= 0 && this.direction + direction <= 2) {
		// 	this.direction += direction;
		// 	this.element.className = this.directions[this.direction];
		// }

		if (this.walking) {
			this.element.className = direction;
			this.direction = direction;
		}
	}	

	isOutOfBounds() {
		if (this.left + this.element.clientWidth > constants.SIZE_X) {
			this.left = constants.SIZE_X - this.element.clientWidth;
			return true;
		}

		if (this.left < 0) {
			this.left = 0;
			return true;
		}
		return false;
	}

	sufferTreeHit() {
		this.isTurboOn = false;
		this.walking = false;
		this.element.className = 'skier-ouch';
		this.canStandUp = false;
		this.speed = constants.SKIER_MIN_SPEED;
		setTimeout(() => {
			this.element.className ='skier-after-tree-hit'; 
			setTimeout(() => this.canStandUp = true, 200);
		}, 900);
	}

	getDistanceTraveledInPixels() {
		return this.distanceTraveledInPixels;
	}

	walk() {
		if (this.isOutOfBounds()) return;
		if (!this.walking) return;
		
		this.distanceTraveledInPixels += this.speed;
		if (this.isTurboOn) {
			if (this.speed < 7)
				this.speed += this.accel;
			else this.speed = constants.SKIER_MAX_SPEED;
		}
		else {
			if (this.speed > 2)
				this.speed -= this.decel;
			else this.speed = constants.SKIER_MIN_SPEED;
		}

		if (this.direction === constants.SKIER_DIRECTION.LEFT) {
			this.left -= this.speed * 0.8;
		}
		if (this.direction === constants.SKIER_DIRECTION.RIGHT) {
			this.left += this.speed * 0.8;
        }
        
		this.updateGraphicPosition();
	}
}
