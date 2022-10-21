import { BoardState, CellState } from "../typesAndInterfaces";

const isIdentical = (c1: CellState, c2:CellState, c3:CellState) => {
    return c1 === c2 && c2 === c3;
}

export default function getWinner (board:BoardState): {winner: 'X' |'O' |'tie'|null, cells: [{row:number, col:number}, {row:number, col:number}, {row:number, col:number}]|null} {
    
    for(let i = 0; i <board.length; i++) {
        if(board[i][0] !== 'empty' && isIdentical(board[i][0],board[i][1], board[i][2])) {
            return {winner: board[i][0] === 'X' ? 'X' : 'O', cells:[{row: i, col: 0},{row: i, col: 1}, {row: i, col: 2}]};
        }

        if(board[0][i] !== 'empty' && isIdentical(board[0][i],board[1][i], board[2][i])) {
            return {winner: board[0][i] === 'X' ? 'X' : 'O', cells:[{row: 0, col: i}, {row: 1, col: i}, {row: 2, col:i}]};
        }
    }

    if(board[0][0] !== 'empty' && isIdentical(board[0][0], board[1][1], board[2][2]))
        return {winner: board[0][0] === 'X' ? 'X' : 'O', cells: [{row: 0, col:0}, {row: 1, col: 1}, {row: 2, col: 2}]};

    if(board[0][2] !== 'empty' && isIdentical(board[0][2], board[1][1], board[2][0]))
        return {winner: board[0][2] === 'X' ? 'X' : 'O', cells: [{row: 0, col:2}, {row: 1, col: 1}, {row: 2, col: 0}]};



    for(let iR = 0; iR < board.length; iR++) {
        for(let iC = 0; iC < board[iR].length; iC ++) {
            if(board[iR][iC] === 'empty')
                return {winner:null, cells: null};
        }
    }

    return {winner: 'tie', cells: null};
}