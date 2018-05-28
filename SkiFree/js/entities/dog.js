class Dog extends Entity {
    constructor() {
        super('dog');
        this.canWalk = true;
        this.isWalking = false; // 1 é parado, -1 é andando
        this.walkSpeed = 1;
        this.intervalId = setInterval(() => {
            if (!this.isWalking) {
                this.element.style.backgroundImage = 'url("imgs/dog/dog_walking.gif")';
                this.isWalking = true;
            }
            else {
                this.element.style.backgroundImage = 'url("imgs/dog/dog_standing.gif")';
                this.isWalking = false;
            }

        }, 600);
    }

    stopUpdating() {
        clearInterval(this.intervalId);
        this.element.style.backgroundImage = 'url("imgs/dog/dog_standing.gif")';
    }

    update(skierSpeed) {
        if (!this.mustBeDrawn) {
            clearInterval(this.intervalId);
            return;
        }
        if (parseFloat(this.element.style.top) < -this.element.clientHeight) {
            this.mustBeDrawn = false;
        }
        if (parseFloat(this.element.style.left) > constants.SIZE_X) {
            this.mustBeDrawn = false;
        }

        if (this.isWalking) {
            this.element.style.left = parseFloat(this.element.style.left) + this.walkSpeed + 'px';
        }

        this.element.style.top = parseFloat(this.element.style.top) - skierSpeed + 'px';
    }
}
