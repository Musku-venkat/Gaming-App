//board
let board;
let board_width = 360;
let board_height = 640;
let context;

//bird
let bird_width = 50;
let bird_height = 50;
let bird_x = board_width / 8;
let bird_y = board_height / 2;
let bird_image;

let bird = {
  x: bird_x,
  y: bird_y,
  width: bird_width,
  height: bird_height,
};

//pipes
let pipe_array = [];
let pipe_width = 64;
let pipe_height = 512;
let pipe_x = board_width;
let pipe_y = 0;

let top_pipe_img;
let bottom_pipe_img;
let pipeInterval;

//physics
let velocity_x = -2; // pipes moving left speed
let velocity_y = 0; // bird jump speed
let gravity = 0.25;

let game_over = true; // start game as not running
let score = 0;
let highscore = parseInt(localStorage.getItem("flappyHighscore")) || 0;

window.onload = function () {
  board = document.getElementById("board");
  board.width = board_width;
  board.height = board_height;
  context = board.getContext("2d");

  bird_image = new Image();
  bird_image.src = "./Images/bird.gif";

  top_pipe_img = new Image();
  top_pipe_img.src = "./Images/toppipe.png";

  bottom_pipe_img = new Image();
  bottom_pipe_img.src = "./Images/toppipe.png";

  document.addEventListener("keydown", handleKeydown);
};

function startGame() {
  if (!game_over) return; // prevent restart while playing

  // reset game state
  bird.y = bird_y;
  velocity_y = 0;
  pipe_array = [];
  score = 0;
  game_over = false;

  requestAnimationFrame(update);
  pipeInterval = setInterval(place_pipes, 1500);
}

function update() {
  requestAnimationFrame(update);
  if (game_over) {
    clearInterval(pipeInterval);
    displayGameOver();
    return;
  }

  context.clearRect(0, 0, board.width, board.height);

  // bird physics
  velocity_y += gravity;
  velocity_y = Math.min(velocity_y, 8); // cap fall speed
  bird.y = Math.max(bird.y + velocity_y, 0);

  if (bird.y + bird.height > board.height) {
    game_over = true;
  }

  // draw bird
  context.drawImage(bird_image, bird.x, bird.y, bird.width, bird.height);

  // pipes
  for (let i = 0; i < pipe_array.length; i++) {
    let pipe = pipe_array[i];
    pipe.x += velocity_x;
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

    if (!pipe.passed && bird.x > pipe.x + pipe.width) {
      score += 0.5;
      if (score > highscore) {
        highscore = score;
        localStorage.setItem("flappyHighscore", highscore);
      }
      pipe.passed = true;
    }

    if (detect_collision(bird, pipe)) {
      game_over = true;
    }
  }

  // remove offscreen pipes
  while (pipe_array.length > 0 && pipe_array[0].x < -pipe_width) {
    pipe_array.shift();
  }

  // score display
  context.fillStyle = "white";
  context.font = "40px sans-serif";
  context.fillText(Math.floor(score), 5, 45);
}

function place_pipes() {
  if (game_over) return;

  let random_pipe_y =
    pipe_y - pipe_height / 4 - Math.random() * (pipe_height / 2);
  let opening_space = board.height / 4;

  let top_pipe = {
    img: top_pipe_img,
    x: pipe_x,
    y: random_pipe_y,
    width: pipe_width,
    height: pipe_height,
    passed: false,
  };
  pipe_array.push(top_pipe);

  let bottom_pipe = {
    img: bottom_pipe_img,
    x: pipe_x,
    y: random_pipe_y + pipe_height + opening_space,
    width: pipe_width,
    height: pipe_height,
    passed: false,
  };
  pipe_array.push(bottom_pipe);
}

function handleKeydown(event) {
  if (event.code === "Space") {
    if (!game_over) {
      // jump
      velocity_y = -6;
    }
  } else if (event.code === "Enter") {
    if (game_over) {
      startGame();
    }
  }
}

function detect_collision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function displayGameOver() {
  context.fillStyle = "white";
  context.font = "40px sans-serif";
  context.fillText(`High score: ${highscore}`, 5, 90);
  context.fillText("Game Over", 5, 135);
}

function jump() {
  if (!game_over) {
    velocity_y = -6;
  }
}
