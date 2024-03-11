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
        this.drawCuteBird(ctx, this.x, this.y, this.size)
    }
    drawCuteBird(ctx, x, y, size) {
        
        // Draw bird body
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(this.x , this.y , this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    
        // Draw beak
        ctx.beginPath();
        ctx.moveTo(this.x + this.size * 0.8, this.y);
        ctx.lineTo(this.x + this.size * 1.2, this.y - this.size * 0.2);
        ctx.lineTo(this.x + this.size * 1.2, this.y + this.size * 0.2);
        ctx.fillStyle = 'orange';
        ctx.fill();
        ctx.closePath();
    
        // Draw eye
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x + this.size * 0.4, this.y - this.size * 0.2, this.size * 0.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}
