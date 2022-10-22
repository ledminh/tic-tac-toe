import React, { useEffect, useState } from "react";
import { BoardState, CellState, GameType, MarkType, PlayerType } from "../typesAndInterfaces";

import getWinner from "../utils/getWinner";
import cpuMove from "../utils/cpuMove";

import * as LocalStorage from '../LocalStorage';

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

        LocalStorage.updateSavedData({board: newBoard});
    }

    useEffect(() => {
        const lsData = LocalStorage.load();

        if(lsData.savedData.isStarted){
            _setIsStarted(lsData.savedData.isStarted);
            
            _setGameType(lsData.savedData.gameType);
            _setTurn(lsData.savedData.turn);
            _setBoard(lsData.savedData.board);
            
            setNumXWins(lsData.savedData.numXWins);
            setNumTies(lsData.savedData.numTies);
            setNumOWins(lsData.savedData.numOWins);
            _setXPlayer(lsData.savedData.XPlayer);
            _setOPlayer(lsData.savedData.OPlayer);
        }

    }, []);

    //check if there is a winner after each turn
    useEffect(() => {
        const {winner, cells} = getWinner(board);

        if(winner === 'X') {
            setNumXWins(numXWins + 1);
            _setWinner('X'); // after winner changes, the useEffect on page/index.tsx will make GameOverModal shows up 

            setTimeout(() => {
                _setCellsWin(cells);
            }, 500);
        }
        else if(winner === 'O') {
            setNumOWins(numOWins + 1);
            _setWinner('O');

            setTimeout(() => {
                _setCellsWin(cells);
            }, 500);
        }
        else if (winner === 'tie') {
            setNumTies(numTies + 1);
            _setWinner('none');
        }
        else if(gameType === 'vsCPU') {
            if((turn === 'X' && XPlayer === 'CPU')
                || (turn === 'O' && OPlayer === 'CPU')
                ) {
                    
                    const [iR, iC] = cpuMove(turn, board);

                    setTimeout(() => {
                        _setCellState(turn,iR, iC);

                        _setTurn(turn === 'X'? 'O' : 'X');
                        LocalStorage.updateSavedData({turn: turn === 'X'? 'O' : 'X'});

                    }, 500);
            }
        }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [board]);


    // Make CPU plays the first move if it goes first.
    useEffect(() => {
        if(gameType === 'vsCPU') {
            if((turn === 'X' && XPlayer === 'CPU')
            || (turn === 'O' && OPlayer === 'CPU')
            ) {
                    
                    const [iR, iC] = cpuMove(turn, board);
                
                    _setCellState(turn,iR, iC);

                    _setTurn(turn === 'X'? 'O' : 'X');
                    LocalStorage.updateSavedData({turn: turn === 'X'? 'O' : 'X'});
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameType]);



    /***************************************/
    
    const newGame = (gameType:GameType, player1Mark:MarkType) => {

        let xPlayer:PlayerType, oPlayer:PlayerType;

        if(gameType === 'vsCPU') {
            if(player1Mark === 'X') {
                xPlayer = 'player1';
                oPlayer = 'CPU';
                // _setXPlayer('player1');
                // _setOPlayer('CPU');
            }
            else {
                xPlayer = 'CPU';
                oPlayer = 'player1';
            }
        }
        else {
            if(player1Mark === 'X') {
                xPlayer = 'player1';
                oPlayer = 'player2';
            }
            else {
                xPlayer = 'player2';
                oPlayer = 'player1';
            }
        }

        _setGameType(gameType);

        _setXPlayer(xPlayer);
        _setOPlayer(oPlayer);
        
        _setTurn('X');
   
        _setIsStarted(true);

        LocalStorage.updateSavedData({
            gameType: gameType,
            XPlayer: xPlayer,
            OPlayer: oPlayer,
            turn: 'X',
            isStarted: true
        });


   
    }

    const cellOnClickHandle = (row:number, col:number) => {
        
        if(winner === null && board[row][col] === 'empty'){
            _setCellState(turn, row, col);
            _setTurn(turn === 'O'? 'X' : 'O');
            LocalStorage.updateSavedData({turn: turn === 'X'? 'O' : 'X'});
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

        LocalStorage.updateSavedData({
            isStarted: false
        });
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