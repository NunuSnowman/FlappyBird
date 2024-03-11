class GameEngine {
    static modeIndex = 0;
    static modesString = ["EZ", "Hard", "Hell"];
    static modesCoeff = [1, 1.25, 1.5];
    static recordDist = 0;
    static currentDist = 0;
    static width = 0;
    static height = 0;
    static isPressing = false;

    constructor() {
        this.gravity = 2000;
        this.antiGravity = - this.gravity;
        this.dt = 40;
        this.cubeSpeed = 3;
        this.counter = 0;
        this.cubeInterval = 60;
        this.cubeVerticalDist = 300;
        GameEngine.currentDist = 0;
    }

    updateBird(bird) {
        let dt_minis = this.dt / 1000;
        bird.updateBird(dt_minis, this.gravity, this.antiGravity, GameEngine.isPressing);
    }

    checkCollision(bird, cubes) {
        for (let i = 0; i < cubes.cubes.length; i++) {
            if (this._isHit(bird, cubes.cubes[i].topCube) || this._isHit(bird, cubes.cubes[i].botCube)) {
                cubes.isHit = true;
                return;
            }
        }
        bird.isOutOfWindow();
        GameEngine.currentDist += this.dt / 1000;
        GameEngine.recordDist = GameEngine.recordDist > GameEngine.currentDist ? GameEngine.recordDist: GameEngine.currentDist;
    }

    _isHit(circle, rect) {
        if(this._isInRect(circle, rect)){
            console.log("center of circle inside of rect", circle, rect);
            return true;
        }
        let x1 = rect.x;
        let x2 = rect.x + rect.width;
        let y1 = rect.y;
        let y2 = rect.y + rect.height;
        
        if(this._segmentIntersectsCircle(x1,y1, x1, y2, circle)){
            console.log("hit left side of cube", circle, rect)
            return true;
        }
        if(this._segmentIntersectsCircle(x1, y2, x2,y2, circle)){
            console.log("hit bot side of cube", circle, rect)
            return true;
            
        }
        if(this._segmentIntersectsCircle(x2,y2, x2, y1, circle)){
            console.log("hit right side of cube", circle, rect)
            return true;
            
        }
        if(this._segmentIntersectsCircle(x2,y1, x1,y1, circle)){
            console.log("hit top side of cube", circle, rect)
            return true;
        }
        return false;
    }

    _isInRect(circle, rect) {
        let x1 = rect.x;
        let x2 = rect.x + rect.width;
        let y1 = rect.y;
        let y2 = rect.y + rect.height;

        return x1 <= circle.x && circle.x<=x2 && y1 <= circle.y && circle.y <= y2; 
    }

    _segmentIntersectsCircle(x1, y1, x2, y2, circle) {
        let circleX = circle.x, circleY = circle.y, circleRadius = circle.r;
        // Calculate the vector representing the segment
        let dx = x2 - x1;
        let dy = y2 - y1;
    
        // Calculate the vector representing the line segment's start point to the circle's center
        let fx = circleX - x1;
        let fy = circleY - y1;
    
        // Calculate the dot product of the two vectors
        let t = (dx * fx + dy * fy) / (dx * dx + dy * dy);
    
        // Limit t to the range [0,1] to ensure the closest point is on the line segment
        t = Math.max(0, Math.min(1, t));
    
        // Calculate the closest point on the line segment to the circle's center
        let closestX = x1 + t * dx;
        let closestY = y1 + t * dy;
    
        // Calculate the distance between the closest point and the circle's center
        let distanceSquared = (closestX - circleX) * (closestX - circleX) + (closestY - circleY) * (closestY - circleY);
    
        // Check if the distance is less than or equal to the circle's radius squared
        return distanceSquared <= circleRadius * circleRadius;
    }

    updateCubes(cubes) {
        cubes.moveLeft(this.cubeSpeed);
        if (this.counter <= 0) {
            let upHeight = Math.random() * GameEngine.height / 4 + GameEngine.height / 4;
            cubes.addCubePair(upHeight, GameEngine.height - upHeight - this.cubeVerticalDist);
            this.counter = Math.random() * this.cubeInterval + this.cubeInterval;
        }
        this.counter--;

    }
}