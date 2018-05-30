class Monster {
    constructor() {
        this.element = document.getElementById('monster');
        this.top = 70;
        this.left = constants.SIZE_X;
        this.direction = constants.MONSTER_LEFT;
        this.element.className = 'monster-left';
        this.element.style.top = this.top + 'px';
        this.element.style.left = this.left + 'px';
        this.speedX = constants.MONSTER_SPEED_X;
        this.speedY = constants.MONSTER_SPEED_Y;
    }

    checkDirection(skier) {
        if (this.left < skier.left) {
            this.direction = constants.MONSTER_RIGHT;
            this.element.className = 'monster-right';
        }
        else if (this.left > skier.left) {
            this.direction = constants.MONSTER_LEFT;
            this.element.className = 'monster-left';
        }
    }

    seekSkier(skier) {
        let newPositionTop = this.top + (this.speedY - skier.speed);
        if ((newPositionTop + 10) <= skier.top) {
            this.top = newPositionTop;
            this.element.style.top = newPositionTop + 'px';
        }

        if (((this.left - 5) > skier.left) || ((this.left + 5) < skier.left)) {
            if (this.direction === constants.MONSTER_LEFT) {
                this.left = (this.left - this.speedX);
                this.element.style.left = this.left + 'px';
                this.checkDirection(skier);
            }

            if (this.direction === constants.MONSTER_RIGHT) {
                this.left = (this.left + this.speedX);
                this.element.style.left = this.left + 'px';
                if (this.left == skier.left) {
                    console.log("oi");
                    return;
                }
                this.checkDirection(skier);
            }
        }
    }

    checkCollisionWithSkier(skier) {
        let rectA = new Rectangle(parseFloat(this.element.style.top) - 30, parseFloat(this.element.style.left), this.element.clientWidth, this.element.clientHeight);
        let rectB = new Rectangle(skier.top, skier.left, skier.element.clientWidth, skier.element.clientHeight);

        if (rectA.x1 < rectB.x2 && rectA.x2 > rectB.x1 && rectA.y1 < rectB.y2 && rectA.y2 > rectB.y1) {
            this.wasHitBySkier = true;
            return true;
        }

        return false;
    }
}