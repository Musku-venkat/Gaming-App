let dino = document.getElementById('dino');
let rock = document.getElementById('rock');
let score = document.getElementById('score');
let isGameRunning = false;
let count = 0;

window.addEventListener('Spacebar', jump);

function jump() {
    if (!dino.classList.contains('animate-jump')) {
        dino.classList.add('animate-jump');
        setTimeout(() => {
            dino.classList.remove('animate-jump');
        }, 1000);
    }
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        jump();
    }
});


function start() {
    if (isGameRunning) return; // prevent multiple starts
    isGameRunning = true;

    count = 0;
    score.innerHTML = `Score : ${count}`;
    rock.classList.add('animate-rock');

    let gameLoop = setInterval(() => {
        let dino_top = parseInt(window.getComputedStyle(dino).getPropertyValue('top'));
        let rock_left = parseInt(window.getComputedStyle(rock).getPropertyValue('left'));

        let isCollision = rock_left < 70 && rock_left > 0 && dino_top > 200;

        if (isCollision) {
            rock.classList.remove('animate-rock');
            clearInterval(gameLoop);
            isGameRunning = false; // allow restart
            alert(`Game Over\nScore: ${count}`);
            return;
        }

        count++;
        score.innerHTML = `Score : ${count}`;

    }, 100);
}
