let dino = document.getElementById('dino');
let rock = document.getElementById('rock');
let score = document.getElementById('score');
let count = 0;


function jump(){
    if(dino.classList != 'animate-jump'){
        dino.classList.add('animate-jump');
        setTimeout(()=>{
            dino.classList.remove('animate-jump');
        },1000);
    }
    score.innerHTML = `Score : ${count++}`
}

setInterval(()=>{
    let dino_top =parseInt(window.getComputedStyle(dino).getPropertyValue('top'));
    let rock_left =parseInt(window.getComputedStyle(rock).getPropertyValue('left'));
    if(rock_left<70 && rock_left>0 && dino_top>200){
        alert('Game Over');
        rock.classList.remove('animate-rock');
    }
},10);

function start(){
    count = 0;
    rock.classList.add('animate-rock');
}
