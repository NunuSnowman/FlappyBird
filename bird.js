class Bird {
    constructor(size) {
        this.x = GameEngine.width / 2;
        this.y = GameEngine.height / 2;
        this.vy = 0;
        this.isDead = false;
        this.size = size; 
    }

    updateBird(deltaTime, g, liftGravity, pressing) {
        let dt = deltaTime;
        if (pressing) {
            if (this.vy > 0)
                this.vy = 0 + liftGravity * dt * 5;
            else
                this.vy = this.vy + liftGravity * dt;
            pressing--;
        } else { 
            this.vy = this.vy + g * dt;
        }
        this.y = this.y + this.vy * dt;
        if (this.y > GameEngine.height - this.size) {
            this.y = GameEngine.height - this.size;
            console.log("Bird hit ceiling")
            this.isDead = true;
        }
        if (this.y < 0) {
            console.log("Bird hit ground")
            this.y = 0;
            this.isDead = true;
        }
    }
}
