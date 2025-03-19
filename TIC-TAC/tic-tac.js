let tictactoe = new TicTacToe();
tictactoe.start();

function TicTacToe(){
    let board = new Board();
    let human = new Human(board);
    let computer = new Computer(board);
    let turn = 0;

    this.start = function(){
        let config = {childList : true};
        let observer = new MutationObserver(()=> takeTurn());
        board.positions.forEach((ele)=> observer.observe(ele,config));
        takeTurn();
    }
    function takeTurn(){

        if(board.checkForWinner()){
            return;
        }

        if(turn%2===0){
            human.takeTurn();
        }else{
            computer.takeTurn();
        }
        turn++;
    }
}

function Board(){
    this.positions = Array.from(document.querySelectorAll('.col'));
    
    this.checkForWinner = function(){
        let winner = false;
        let winningCombinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,4,8],
            [2,4,6],
            [0,3,6],
            [1,4,7],
            [2,5,8]
        ];

        let positions = this.positions;

        winningCombinations.forEach((wincombo)=>{
            let pos_0_innertext = positions[wincombo[0]].innerText;
            let pos_1_innertext = positions[wincombo[1]].innerText;
            let pos_2_innertext = positions[wincombo[2]].innerText;
            let iswinningcombo = pos_0_innertext !== '' && 
                pos_0_innertext === pos_1_innertext && 
                pos_1_innertext === pos_2_innertext

            if(iswinningcombo){
                winner = true;
                wincombo.forEach((index)=>{
                    positions[index].className += ' winner';
                })
            }
        });

        return winner;

    }
}

function Human(board){
    this.takeTurn = function(){
        board.positions.forEach((ele) => ele.addEventListener('click', hanleTurnTaken));  
    }
    
    function hanleTurnTaken(event){
        event.target.innerText = 'X';
        board.positions.forEach((ele) => ele.removeEventListener('click', hanleTurnTaken));
    }
}

function Computer(board){
    this.takeTurn =function(){
        let available = board.positions.filter((p) => p.innerText === '');
        let move = Math.floor(Math.random()*available.length);
        available[move].innerText = 'O';
    }
}

function start(){
    location.reload()
}