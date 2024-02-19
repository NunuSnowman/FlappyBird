class Bird {
    constructor(size) {
        this.x = GameEngine.width / 2; // bird center x
        this.y = GameEngine.height / 2; // bird center y
        this.size = size; //radius of bird
        this.r = size;
        this.vy = 0;
        this.isDead = false;
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
    }

    isOutOfWindow(){
        if (this.y + this.size > GameEngine.height ) {
            this.y = GameEngine.height - this.size;
            console.log("Bird hit ground", this)
            this.isDead = true;
            return true;
        }
        if (this.y - this.size < 0) {
            console.log("Bird hit ceiling", this)
            this.y = this.size;
            this.isDead = true;
            return true;
        }
        return false;
    }
    
    draw(ctx){
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(this.x , this.y , this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}
