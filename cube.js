
/**
 * One rectangle cube.
 */
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
/**
 * A pair of cube, one on the top, one on the bottom
 */
class CubePair {
    constructor(topHeight, botHeight, width) {
        const windowWidth = GameEngine.width;
        const windowHeight = GameEngine.height;
        this.topCube = new Cube(windowWidth, 0, width, topHeight);
        this.botCube = new Cube(windowWidth, windowHeight - botHeight, width, botHeight);
    }

    moveLeft(dx) {
        this.topCube.x -= dx;
        this.botCube.x -= dx;
    }
}

/**
 * All cubes in the game.
 */
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
        this.cubes = this.cubes.filter(cubePair => !cubePair.topCube.isCubeOutOfWindow());
    }

    draw(ctx){
        ctx.fillStyle = 'green';
        for (let i = 0; i < this.cubes.length; i++) {
            const top = this.cubes[i].topCube;
            const bot = this.cubes[i].botCube;

            // Draw top cube
            ctx.fillStyle = 'rgb(0, 150, 0)';
            ctx.fillRect(top.x, top.y, top.width, top.height);

            // Draw gradient for depth effect
            let gradient = ctx.createLinearGradient(top.x, top.y, top.x + top.width, top.y);
            gradient.addColorStop(0, 'rgba(0, 255, 0, 0.7)');
            gradient.addColorStop(1, 'rgba(0, 255, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(top.x, top.y, top.width, top.height);

            // Draw bottom cube
            ctx.fillStyle = 'rgb(0, 150, 0)';
            ctx.fillRect(bot.x, bot.y, bot.width, bot.height);

            // Draw gradient for depth effect
            gradient = ctx.createLinearGradient(bot.x, bot.y + bot.height, bot.x + bot.width, bot.y + bot.height);
            gradient.addColorStop(0, 'rgba(0, 255, 0, 0.7)');
            gradient.addColorStop(1, 'rgba(0, 255, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(bot.x, bot.y, bot.width, bot.height);
        }
    }
}

