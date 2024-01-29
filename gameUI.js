class GameUI{
    constructor(){
        const ezModeBtn = document.getElementById('ezMode');
        const hardModeBtn = document.getElementById('hardMode');
        const hellModeBtn = document.getElementById('hellMode');

        // Handle button clicks
        ezModeBtn.addEventListener('click', function() {
            GameUI.startGame(50, 0);
        });

        hardModeBtn.addEventListener('click', function() {
            GameUI.startGame(70, 1);
        });

        hellModeBtn.addEventListener('click', function() {
            GameUI.startGame(90, 2);
        });

        document.addEventListener('mousedown', function() {
            GameEngine.isPressing = true;
        });
        document.addEventListener('mouseup', function() {
            GameEngine.isPressing = false;
        });
    }
    
    static startGame(birdSize, mode) {
        // Hide buttons
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const scoreText = document.getElementById('score');
        const recordText = document.getElementById('record');

        document.getElementById('buttons').style.display = 'none';
        GameEngine.width = canvas.width;
        GameEngine.height = canvas.height;

        // Initialize game components
        const bird = new Bird(birdSize);
        const cubes = new Cubes();
        const engine = new GameEngine();
        engine.dt = 40;

        // Game loop
        function gameLoop() {
            // Update game state
            engine.updateBird(bird);
            engine.updateCubes(cubes);
            engine.isHit(bird, cubes);

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw bird
            ctx.fillStyle = 'yellow';
            ctx.beginPath();
            ctx.arc(bird.x, bird.y, bird.size / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();

            // Draw cubes
            ctx.fillStyle = 'green';
            for (let i = 0; i < cubes.cubes.length; i++) {
                const u = cubes.cubes[i].upCube;
                const d = cubes.cubes[i].downCube;
                ctx.fillRect(u.x, u.y, u.width, u.height);
                ctx.fillRect(d.x, d.y, d.width, d.height);
            }

            // Update score and mode record
            scoreText.textContent = 'Your score is ' + Math.floor(GameEngine.currentDist);
            recordText.textContent = GameEngine.modesString[mode] + ' mode Record ' + Math.floor(GameEngine.recordDist[mode]);
            
            // Check game over condition
            if (bird.isDead || cubes.isHit) {
                const response = confirm('Your score is ' + Math.floor(GameEngine.currentDist) + '\nDo you want to replay?');
                if (response) {
                    // Replay game
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    document.getElementById('buttons').style.display = 'block';
                } 
                return;
            }
            requestAnimationFrame(gameLoop);
        }

        // Start game loop
        gameLoop();
    }
}