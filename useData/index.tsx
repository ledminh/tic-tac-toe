import React, { useState } from "react";
import { BoardState, CellState, GameType, MarkType, PlayerType } from "../typesAndInterfaces";

const initBoard:BoardState = [
    ['empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty']
]

type DataType = {
    isStarted: boolean,
    turn: 'X'|'O',
    board: BoardState,
    numXWins: number,
    numOWins: number,
    numTies: number,
    XPlayer: PlayerType,
    OPlayer: PlayerType,
    newGame: (g:GameType, m:MarkType) => void,
    cellOnClickHandle: (row:number,c:number) => void
}


const defaultData:DataType = {
    isStarted: false,
    turn: 'X',
    board: initBoard,
    numXWins: 0,
    numOWins: 0,
    numTies: 0,
    XPlayer: 'player1',
    OPlayer: 'player2',
    newGame: (g,m) => {},
    cellOnClickHandle: (r,c) => {}

}

export const DataContext = React.createContext<DataType>(defaultData);

const useData = () => {
    
    const [isStarted, _setIsStarted] = useState<boolean>(false);

    
    const [turn, _setTurn] = useState<'X'|'O'>('X');
    const [board, setBoard] = useState<BoardState>(initBoard);

    const [numXWins, setNumXWins] = useState<number>(0);
    const [numTies, setNumTies] = useState<number>(0);
    const [numOWins, setNumOWins] = useState<number>(0);

    const [XPlayer, setXPlayer] = useState<PlayerType>('player2');
    const [OPlayer, setOPlayer] = useState<PlayerType>('CPU');

    
    const _setCellState = (stateToSet:CellState, row: number, col:number) => {
        const newBoard = board.map((r, iR) => r.map((c, iC) => {
            if(iR === row && iC === col) {
                return stateToSet;
            }
            else{
                return c;
            }
        })) as BoardState;

    
        setBoard(newBoard);

    }
    /***************************************/
    
    const newGame = (gameType:GameType, player1Mark:MarkType) => {
        if(gameType === 'vsCPU') {
            if(player1Mark === 'X') {
                setXPlayer('player1');
                setOPlayer('CPU');
            }
            else {
                setXPlayer('CPU');
                setOPlayer('player1');
            }
        }
        else {
            if(player1Mark === 'X') {
                setXPlayer('player1');
                setOPlayer('player2');
            }
            else {
                setXPlayer('player2');
                setOPlayer('player1');
            }
        }

        _setTurn('X');
        _setIsStarted(true);
    }

    const cellOnClickHandle = (row:number, col:number) => {
        if(board[row][col] === 'empty'){
            _setCellState(turn, row, col);
            _setTurn(turn === 'O'? 'X' : 'O');
        }
    }


    return {
        isStarted,
        turn,
        board,
        numXWins,
        numOWins,
        numTies,
        XPlayer,
        OPlayer,
        newGame,
        cellOnClickHandle
    }
}


export default useData;