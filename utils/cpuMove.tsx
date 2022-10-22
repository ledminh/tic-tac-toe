
import { BoardState, CellState } from "../typesAndInterfaces";
import getWinner from '../utils/getWinner';

function cpuMove(myMark:CellState, board:BoardState): [number, number] {    
    
    const getScore = (curBoard:BoardState, curMark:CellState, row: number, col:number, depth: number):number => {
        const newBoard = cloneBoard(curBoard);
        newBoard[row][col] = curMark; 
        
        const {winner} = getWinner(newBoard);

        if(winner === myMark) { // 'I' (computer) wins
            return 10 + depth;
        }
        else if (winner === 'tie') {
            return 0;
        }
        else if(winner === null) {
            const scores: {score:number, row:number, col: number}[] = [];

            for(let r = 0; r < newBoard.length; r++) {
                for(let c = 0; c < newBoard[0].length; c++) {
                    if(newBoard[r][c] === 'empty') {
                        const score = getScore(newBoard, curMark === 'X'? 'O' : 'X',r,c, depth + 1);
    
                        scores.push({score: score, row: r, col: c});
                    }
                } 
            }


                        
            let scoreMax = scores[0].score, r = scores[0].row, c = scores[0].col,
                scoreMin = scores[0].score;

            for(let i = 0; i < scores.length; i++) {
                if(scores[i].score > scoreMax) {
                    scoreMax = scores[i].score;                    
                }
                else if (scores[i].score < scoreMin){
                    scoreMin = scores[i].score;
                }
            }

            if(curMark === myMark) return scoreMin;
            else return scoreMax;
        }
        else { //player wins

            return -10 + depth;
        }
    
    
    }

    const scores: {score:number, row:number, col: number}[] = [];
    const _board = cloneBoard(board);

    for(let r = 0; r < _board.length; r++) {
        for(let c = 0; c < _board[0].length; c++) {
            if(_board[r][c] === 'empty') {
                const score = getScore(_board, myMark, r, c, 0);

                scores.push({score: score, row: r, col: c});
            }
        }
    }

    let scoreMax = scores[0].score, r = scores[0].row, c = scores[0].col;
    
    for(let i = 0; i < scores.length; i++) {
        if(scores[i].score > scoreMax) {
            scoreMax = scores[i].score;
            r = scores[i].row;
            c = scores[i].col;
        }
    }  


    return [r, c];
}

export default cpuMove;


const cloneBoard = (board:BoardState): BoardState => board.map((r) => r.slice()) as BoardState;


