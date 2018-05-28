class Skier {
	updateGraphicPosition() {
		this.element.style.top = this.top.toString() + 'px';
		this.element.style.left = this.left.toString() + 'px';
	}
	
	constructor() {
		this.life = 3;
		this.isDead = false;
		this.speed = constants.SKIER_MIN_SPEED;
		this.distanceTraveledInPixels = 0.0;
		this.accel = 0.1;
		this.decel = 0.08;
        this.distanceTraveledUntilMonsterAppears = 0;
		this.isTurboOn = false;
		this.element = document.getElementById('skier');
		this.direction = constants.SKIER_DIRECTION.FRONT;
		this.element.className = this.direction;
		this.timeFall = 0.0;
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

	fallAnimation() {
		
	}

	lifeUp () {
		this.life += 1;
	}

	sufferTreeHit() {
		this.life -= 1;
		if (this.life == 0) {
            this.isDead = true;
            this.element.className = 'skier-ouch';
            return;
        }
		this.isTurboOn = false;
		this.walking = false;
		this.element.className = 'skier-fall';
		this.canStandUp = false;
		this.speed = constants.SKIER_MIN_SPEED;
		this.loopFallAnimation = setInterval(() => {
			if ((this.timeFall / 60.0 * 1000) >= constants.FALL_ANIMATION_DURATION) {
				clearInterval(this.loopFallAnimation);
			}
			this.timeFall += 1.0;
		}, 1000 / constants.FPS);

		setTimeout(() => {
			this.element.className ='skier-after-tree-hit'; 
			setTimeout(() => { this.canStandUp = true; this.timeFall = 0.0; }, 200);
		}, 900);
	}

	getDistanceTraveledInPixels() {
		return this.distanceTraveledInPixels;
	}

	walk() {
		if (this.isOutOfBounds()) return;
		if (!this.walking) return;
		
		this.distanceTraveledInPixels += this.speed;
		this.distanceTraveledUntilMonsterAppears += this.speed;

		if (this.isTurboOn) {
			if (this.speed < constants.SKIER_MAX_SPEED)
				this.speed += this.accel;
			else this.speed = constants.SKIER_MAX_SPEED;
		}
		else {
			if (this.speed > constants.SKIER_MIN_SPEED)
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
