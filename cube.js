
class Cube {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    isCubeOutOfWindow() {
        return this.x + this.width < 0;
    }
}

class Cubes {
    constructor() {
        this.isHit = false;
        this.cubes = [];
        this.cubeWidth = 80;
    }

    addCubePair(upHeight = 250, downHeight = 250) {
        this.cubes.push(new CubePair(upHeight, downHeight, this.cubeWidth));
    }

    moveLeft(dx) {
        for (let i = 0; i < this.cubes.length; i++) {
            this.cubes[i].moveLeft(dx);
        }
        this.cubes = this.cubes.filter(cubePair => !cubePair.upCube.isCubeOutOfWindow());
    }
}

class CubePair {
    constructor(upCubeHeight, downCubeHeight, width) {
        const windowWidth = GameEngine.width;
        const windowHeight = GameEngine.height;
        this.upCube = new Cube(windowWidth, 0, width, upCubeHeight);
        this.downCube = new Cube(windowWidth, windowHeight - downCubeHeight, width, downCubeHeight);
    }

    moveLeft(dx) {
        this.upCube.x -= dx;
        this.downCube.x -= dx;
    }
}
