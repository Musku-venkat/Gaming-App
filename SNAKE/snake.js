let game_board = document.getElementById('game_board');
let ctx = game_board.getContext('2d');
let score_text = document.getElementById('score_text');
let reset_btn = document.getElementById('reset_btn');
let game_width = game_board.width;
let game_height = game_board.height;
let board_background_color = 'white';
let snake_color = 'green';
let snake_border = 'black';
let food_color = 'red';
let unit_size = 25;
let running = false;
let x_velocity = unit_size;
let y_velocity = 0;
let food_x;
let food_y;
let score = 0;
let snake = [
    {x:unit_size*4, y:0},
    {x:unit_size*3, y:0},
    {x:unit_size*2, y:0},
    {x:unit_size, y:0},
    {x:0, y:0}
];

window.addEventListener('keydown', change_direction);
reset_btn.addEventListener('click', reset_game);

game_start();

function game_start(){
    running = true;
    score_text.textContent = score;
    create_food();
    draw_food();
    next_tick();
};
function next_tick(){
    if(running){
        setTimeout(()=>{
            clear_board();
            draw_food();
            move_snake();
            draw_snake();
            check_game_over();
            next_tick();
        },75);
    }else{
        display_game_over();
    }
};
function clear_board(){
    ctx.fillStyle = board_background_color;
    ctx.fillRect(0, 0, game_width, game_height);
};
function create_food(){
    function random_food(min,max){
        let random_number = Math.round((Math.random()*(max-min)+min)/unit_size)*unit_size;
        return random_number;
    }
    food_x = random_food(0, game_width-unit_size);
    food_y = random_food(0, game_width-unit_size);
};
function draw_food(){
    ctx.fillStyle = food_color;
    ctx.fillRect(food_x, food_y, unit_size, unit_size);
};
function move_snake(){
    let head = {
        x: snake[0].x + x_velocity,
        y: snake[0].y + y_velocity
    };
    snake.unshift(head);
    if(snake[0].x == food_x && snake[0].y == food_y){
        score +=1;
        score_text.textContent = score;
        create_food();
    }else{
        snake.pop();
    }
};
function draw_snake(){
    ctx.fillStyle = snake_color;
    ctx.strokeStyle = snake_border;
    snake.forEach((snake_part)=>{
        ctx.fillRect(snake_part.x, snake_part.y, unit_size, unit_size);
        ctx.strokeRect(snake_part.x, snake_part.y, unit_size, unit_size);
    })
};
function change_direction(event){
    let key_pressed = event.keyCode;
    // console.log(key_pressed)
    let left = 37;
    let up = 38;
    let right = 39;
    let down = 40;

    let going_up = (y_velocity == -unit_size);
    let going_down = (y_velocity == unit_size);
    let going_right = (x_velocity == unit_size);
    let going_left = (x_velocity == -unit_size);

    switch(true){
        case(key_pressed == left && !going_right):
            x_velocity = -unit_size;
            y_velocity = 0;
            break;
        case(key_pressed == up && !going_down):
            x_velocity = 0;
            y_velocity = -unit_size;
            break;
        case(key_pressed == right && !going_left):
            x_velocity = unit_size;
            y_velocity = 0;
            break;
        case(key_pressed == down && !going_up):
            x_velocity = 0;
            y_velocity = unit_size;
            break;
    }
};
function check_game_over(){
    switch(true){
        case(snake[0].x < 0):
            running = false;
            break;
        case(snake[0].x >= game_width):
            running = false;
            break;
        case(snake[0].y < 0):
            running = false;
            break;
        case(snake[0].y >= game_height):
            running = false;
            break;
    }
    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }
};
function display_game_over(){
    ctx.font = '50px MV Boil'
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', game_height / 2, game_width / 2);
    running = false;
};
function reset_game(){
    score = 0;
    x_velocity = unit_size;
    y_velocity = 0;
    snake = [
        {x:unit_size*4, y:0},
        {x:unit_size*3, y:0},
        {x:unit_size*2, y:0},
        {x:unit_size, y:0},
        {x:0, y:0}
    ];
    game_start();
};
