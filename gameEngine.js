class GameEngine {
    static modeIndex = 0;
    static modesString = ["EZ", "Hard", "Hell"];
    static recordDist = [0, 0, 0];
    static currentDist = 0;
    static width = 0;
    static height = 0;
    static isPressing = false;

    constructor() {
        this.gravity = 120;
        this.antiGravity = -140;
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

    isHit(bird, cubes) {
        for (let i = 0; i < cubes.cubes.length; i++) {
            if (this._isHit(bird, cubes.cubes[i].upCube) || this._isHit(bird, cubes.cubes[i].downCube)) {
                cubes.isHit = true;
                return;
            }
        }
        GameEngine.currentDist += this.dt / 1000;
        GameEngine.recordDist[GameEngine.modeIndex] = GameEngine.recordDist[GameEngine.modeIndex] > GameEngine.currentDist ? GameEngine.recordDist[GameEngine.modeIndex] : GameEngine.currentDist;
    }

    _isHit(bird, cube) {
        let p1_x = bird.x;
        let p1_y = bird.y + Bird.size / 2.0;
        if (this._isInRect(p1_x, p1_y, cube))
            return true;
        let p2_x = bird.x + Bird.size / 2.0;
        let p2_y = bird.y;
        if (this._isInRect(p2_x, p2_y, cube))
            return true;
        let p3_x = bird.x + Bird.size;
        let p3_y = bird.y + Bird.size / 2.0;
        if (this._isInRect(p3_x, p3_y, cube))
            return true;
        let p4_x = bird.x + Bird.size / 2.0;
        let p4_y = bird.y + Bird.size;
        if (this._isInRect(p4_x, p4_y, cube))
            return true;
        return false;
    }

    _isInRect(x, y, c) {
        return x > c.x && x < c.x + c.width && y > c.y && y < c.y + c.height;
    }


    updateCubes(cubes) {
        cubes.moveLeft(this.cubeSpeed);
        if (this.counter <= 0) {
            let upHeight = Math.random() * GameEngine.height / 4 + GameEngine.height / 4;
            cubes.addCubePair(upHeight, GameEngine.height - upHeight - this.cubeVerticalDist);
            this.counter = Math.random() * this.cubeInterval + this.cubeInterval;
        }
        this.counter--;

        // game becomes hard for every 10 distance
        if (GameEngine.currentDist % 10 === 9 && GameEngine.currentDist < this.maxSpeedDistance && GameEngine.currentDist < 60) {
            console.log("make game harder")
            this.cubeSpeed++;
            this.cubeInterval -= 2;
            this.cubeVerticalDist -= 10;
            this.maxSpeedDistance = GameEngine.currentDist;
        }
    }
}