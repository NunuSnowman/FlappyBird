class GameUI{
    constructor(){
        const ezModeBtn = document.getElementById('ezMode');
        const hardModeBtn = document.getElementById('hardMode');
        const hellModeBtn = document.getElementById('hellMode');

        // Handle button clicks
        ezModeBtn.addEventListener('click', function() {
            GameUI.startGame(25, 0);
        });

        hardModeBtn.addEventListener('click', function() {
            GameUI.startGame(35, 1);
        });

        hellModeBtn.addEventListener('click', function() {
            GameUI.startGame(45, 2);
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
        GameEngine.modeIndex = mode;

        // Initialize game components
        const bird = new Bird(birdSize);
        const cubes = new Cubes();
        const engine = new GameEngine();
        engine.dt = 40;

        var interval = null;
        var pre = null;
        // Game loop
        function gameLoop(now) {
            // Check game over condition
            if(pre){
                if(interval){
                    interval = interval * 0.8 + (now - pre) * 0.2;
                }else{
                    interval = now - pre;
                } 
                engine.dt = interval;
            }
            pre = now;
            if (bird.isDead || cubes.isHit) {
                clearInterval(interval);
                const response = confirm('Your score is ' + Math.floor(GameEngine.currentDist));
                // Replay game
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                document.getElementById('buttons').style.display = 'block';
                return;
            }
            
            engine.updateBird(bird);
            engine.updateCubes(cubes);
            engine.checkCollision(bird, cubes);

            // Clear window
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            bird.draw(ctx);
            cubes.draw(ctx);

            // Update score and mode record
            scoreText.textContent = 'Your score is ' + Math.floor(GameEngine.currentDist);
            recordText.textContent = 'Record ' + Math.floor(GameEngine.recordDist);
            
            requestAnimationFrame(gameLoop);
        }
        
        // Used for debug
        // document.addEventListener('click', function(e) {
        //     var x = e.clientX ;
        //     var y = e.clientY;
        //     console.log( "X is "+x+" and Y is "+y, e)
        // });

        // Start game loop
        requestAnimationFrame(gameLoop);
    }
}