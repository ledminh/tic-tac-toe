import { BoardState, CellState } from "../typesAndInterfaces";

const isIdentical = (c1: CellState, c2:CellState, c3:CellState) => {
    return c1 === c2 && c2 === c3;
}

export default function getWinner (board:BoardState): 'X' |'O' |'tie'|null {
    

    for(let i = 0; i <board.length; i++) {
        if(board[i][0] !== 'empty' && isIdentical(board[i][0],board[i][1], board[i][2])) {
            return board[i][0] === 'X' ? 'X' : 'O';
        }

        if(board[0][i] !== 'empty' && isIdentical(board[0][i],board[1][i], board[2][i])) {
            return board[0][i] === 'X' ? 'X' : 'O';
        }
    }

    if(board[0][0] !== 'empty' && isIdentical(board[0][0], board[1][1], board[2][2]))
        return board[0][0] === 'X' ? 'X' : 'O';

    if(board[0][2] !== 'empty' && isIdentical(board[0][2], board[1][1], board[2][0]))
        return board[0][2] === 'X' ? 'X' : 'O';


    let isFull = true;

    for(let iR = 0; iR < board.length; iR++) {
        for(let iC = 0; iC < board[iR].length; iC ++) {
            if(board[iR][iC] === 'empty')
                return null;
        }
    }

    return 'tie';
}