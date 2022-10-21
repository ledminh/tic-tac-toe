import React, { useEffect, useState } from "react";
import { BoardState, CellState, GameType, MarkType, PlayerType } from "../typesAndInterfaces";

import getWinner from "../utils/getWinner";
import cpuMove from "../utils/cpuMove";

const initBoard:BoardState = [
    ['empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty']
]

type DataType = {
    isStarted: boolean,
    turn: 'X'|'O',
    gameType: GameType |null,
    board: BoardState,
    numXWins: number,
    numOWins: number,
    numTies: number,
    XPlayer: PlayerType,
    OPlayer: PlayerType,
    winner: 'X' | 'O' | 'none' | null,
    cellsWin: [{row: number, col:number}, {row: number, col:number},{row: number, col:number}] |null,
    newGame: (g:GameType, m:MarkType) => void,
    cellOnClickHandle: (row:number,c:number) => void,
    restart: () => void,
    nextRound: () => void
}


const defaultData:DataType = {
    isStarted: false,
    turn: 'X',
    gameType: null,
    board: initBoard,
    numXWins: 0,
    numOWins: 0,
    numTies: 0,
    XPlayer: 'player1',
    OPlayer: 'player2',
    winner: null,
    cellsWin: null,
    newGame: (g,m) => {},
    cellOnClickHandle: (r,c) => {},
    restart: ()=> {},
    nextRound: () => {}

}

export const DataContext = React.createContext<DataType>(defaultData);

const useData = () => {
    
    const [isStarted, _setIsStarted] = useState<boolean>(false);

    const [gameType, _setGameType] = useState<GameType|null>(null);

    const [turn, _setTurn] = useState<'X'|'O'>('X');
    const [board, _setBoard] = useState<BoardState>(initBoard);

    const [winner, _setWinner] = useState<'X'|'O'|'none'|null>(null);
    const [cellsWin, _setCellsWin] = useState<[{row:number, col:number},{row:number, col:number},{row:number, col:number}]|null>(null);
 
    const [numXWins, setNumXWins] = useState<number>(0);
    const [numTies, setNumTies] = useState<number>(0);
    const [numOWins, setNumOWins] = useState<number>(0);

    const [XPlayer, _setXPlayer] = useState<PlayerType|null>(null);
    const [OPlayer, _setOPlayer] = useState<PlayerType|null>(null);

    
    const _setCellState = (stateToSet:CellState, row: number, col:number) => {

        const newBoard = board.map((r, iR) => r.map((c, iC) => {
            if(iR === row && iC === col) {
                return stateToSet;
            }
            else{
                return c;
            }
        })) as BoardState;

    
        _setBoard(newBoard);

    }

    //check if there is a winner after each turn
    useEffect(() => {
        const {winner, cells} = getWinner(board);

        if(winner === 'X') {
            setTimeout(() => {
                setNumXWins(numXWins + 1);
                _setWinner('X'); // after winner changes, the useEffect on page/index.tsx will make GameOverModal shows up 
                _setCellsWin(cells);
            }, 1000);
        }
        else if(winner === 'O') {
            setTimeout(() => {
                setNumOWins(numOWins + 1);
                _setWinner('O');
                _setCellsWin(cells);
            }, 1000);
        }
        else if (winner === 'tie') {
            setTimeout(() => {
                setNumTies(numTies + 1);
                _setWinner('none');
            }, 1000);
        }
        else if(gameType === 'vsCPU') {
            if((turn === 'X' && XPlayer === 'CPU')
                || (turn === 'O' && OPlayer === 'CPU')
                ) {
                
                    setTimeout(() => {
                        const [iR, iC] = cpuMove(turn, board);
        
                        _setCellState(turn,iR, iC);
                        _setTurn(turn === 'X'? 'O' : 'X');
                    }, 500);
            }
        }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [board]);



    /***************************************/
    
    const newGame = (gameType:GameType, player1Mark:MarkType) => {
        _setGameType(gameType);

        if(gameType === 'vsCPU') {
            if(player1Mark === 'X') {
                _setXPlayer('player1');
                _setOPlayer('CPU');
            }
            else {
                _setXPlayer('CPU');
                _setOPlayer('player1');
            }
        }
        else {
            if(player1Mark === 'X') {
                _setXPlayer('player1');
                _setOPlayer('player2');
            }
            else {
                _setXPlayer('player2');
                _setOPlayer('player1');
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


    const restart = () => {
        _setIsStarted(false);
        _setGameType(null);
        _setTurn('X');
        _setBoard(initBoard);
        _setWinner(null);

        _setXPlayer(null);
        _setOPlayer(null);
        
        _setCellsWin(null);
    }


    const nextRound = () => {
        _setTurn('X');
        _setBoard(initBoard);
        _setWinner(null);
        _setCellsWin(null);

    }


    return {
        isStarted,
        gameType,
        turn,
        board,
        numXWins,
        numOWins,
        numTies,
        XPlayer,
        OPlayer,
        winner,
        cellsWin,
        newGame,
        cellOnClickHandle,
        restart,
        nextRound
    }
}


export default useData;