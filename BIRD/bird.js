//board
let board;
let board_width = 360;
let board_height = 640;
let context;

//bird
let bird_width = 50;  //34
let bird_height = 50;  //24
let bird_x = board_width/8;
let bird_y = board_height/2;
let bird_image;

let bird = {
    x: bird_x,
    y: bird_y,
    width: bird_width,
    height: bird_height
}

//pipes
let pipe_array = [];
let pipe_width = 64;
let pipe_height = 512;
let pipe_x = board_width;
let pipe_y = 0;

let top_pipe_img;
let bottom_pipe_img;


//physics
let velocity_x = -2; // pipes moving left speed
let velocity_y = 0;  // bird jump speed
let gravity = 0.4;

let game_over = false;
let score = 0;

function start() {
    board = document.getElementById('board');
    board.width = board_width;
    board.height = board_height;
    context = board.getContext('2d');

    //draw flappy bird
    // context.fillStyle = 'green';
    // context.fillRect(bird.x, bird.y, bird.width, bird.height);

    //load images
    bird_image = new Image();
    bird_image.src = './Images/bird.gif';
    bird_image.onload = function (){
        context.drawImage(bird_image, bird.x, bird.y, bird.width, bird.height);
    }

    top_pipe_img = new Image();
    top_pipe_img.src = './Images/toppipe.png';

    bottom_pipe_img = new Image();
    bottom_pipe_img.src = './Images/toppipe.png';

    requestAnimationFrame(update);
    setInterval(place_pipes, 1500);
    document.addEventListener('keydown', move_bird);
    document.addEventListener('keypress', reset_game);
}

function update() {
    requestAnimationFrame(update);
    if(game_over){
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //bird
    velocity_y += gravity;
    // bird.y += velocity_y;
    bird.y = Math.max(bird.y + velocity_y, 0);   // apply gravity to current bird.y || to limit the bird.y to top
    context.drawImage(bird_image, bird.x, bird.y, bird_width, bird_height);

    if(bird.y > board.height) {
        game_over = true;
    }

    //pipes
    for(let i = 0; i < pipe_array.length; i++){
        let pipe = pipe_array[i];
        pipe.x += velocity_x;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if(!pipe.passed && bird.x > pipe.x + pipe.width) {
            score +=0.5;
            pipe.passed = true;
        }

        if(detect_collision(bird, pipe)){
            game_over = true;
        }
    }

    //clear pipes
    while(pipe_array.length > 0 && pipe_array[0].x < -pipe_width) {
        pipe_array.shift();  // removes first element from an array
    }

    //score 
    context.fillStyle = 'white';
    context.font = '40px sans-serif';
    context.fillText(score, 5, 45);

    if(game_over) {
        context.fillText('Game Over', 5 , 90);
    }
}

function place_pipes() {

    if(game_over){
        return;
    }

    let random_pipe_y = pipe_y - pipe_height / 4 - Math.random() * (pipe_height / 2);
    let opening_space = board.height / 4;

    let top_pipe = {
        img: top_pipe_img,
        x: pipe_x,
        y: random_pipe_y,
        width: pipe_width,
        height: pipe_height,
        passed: false
    }

    pipe_array.push(top_pipe);

    let bottom_pipe = {
        img: bottom_pipe_img,
        x: pipe_x,
        y: random_pipe_y + pipe_height + opening_space,
        width: pipe_width,
        height: pipe_height,
        passed: false
    }

    pipe_array.push(bottom_pipe);

}


function move_bird(event) {
    if(event.code == 'Space' || event.code == 'ArrowUp' || event.code == 'KeyX'){
        // jump
        velocity_y = -6;

        // // reset the game
        // if(game_over){
        //     bird.y = bird_y;
        //     pipe_array = [];
        //     score = 0;
        //     game_over = false;
        // }
    }

}

function detect_collision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b. height &&
           a.y + a.height > b.y
}


function reset_game(event){
    if(event.code == 'Enter') {
        // reset the game
        if(game_over){
            bird.y = bird_y;
            pipe_array = [];
            score = 0;
            game_over = false;
        }
    }
}

window.onload = function(){
    board = document.getElementById('board');
    board.width = board_width;
    board.height = board_height;
    context = board.getContext('2d');

    //load images
    bird_image = new Image();
    bird_image.src = './Images/bird.gif';
    bird_image.onload = function (){
        context.drawImage(bird_image, bird.x, bird.y, bird.width, bird.height);
    }

    top_pipe_img = new Image();
    top_pipe_img.src = './Images/toppipe.png';

    bottom_pipe_img = new Image();
    bottom_pipe_img.src = './Images/toppipe.png';
}
