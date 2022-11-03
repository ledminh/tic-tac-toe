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
    const [board, _setBoard] = useState<BoardState|null>(null);

    const [winner, _setWinner] = useState<'X'|'O'|'none'|null>(null);
    const [cellsWin, _setCellsWin] = useState<[{row:number, col:number},{row:number, col:number},{row:number, col:number}]|null>(null);
 
    const [numXWins, setNumXWins] = useState<number|null>(null);
    const [numTies, setNumTies] = useState<number|null>(null);
    const [numOWins, setNumOWins] = useState<number|null>(null);

    const [XPlayer, _setXPlayer] = useState<PlayerType|null>(null);
    const [OPlayer, _setOPlayer] = useState<PlayerType|null>(null);

    
    const _setCellState = (stateToSet:CellState, row: number, col:number) => {

        const newBoard = (board as BoardState).map((r, iR) => r.map((c, iC) => {
            if(iR === row && iC === col) {
                return stateToSet;
            }
            else{
                return c;
            }
        })) as BoardState;

    
        _setBoard(newBoard);

        LocalStorage.updateStateData({board: newBoard});
    }


    useEffect(() => {
        const lsState = LocalStorage.loadState();

        if(lsState === null) { //first time and not start
            LocalStorage.init();
        }
        else if(lsState.isStarted){ // playing

            _setIsStarted(lsState.isStarted);
            
            const scores = LocalStorage.loadScores(lsState.gameType);

            const {winner, cells} = getWinner(lsState.board);
            let numOWins = scores.numOWins,
                numXWins = scores.numXWins,
                numTies = scores.numTies;

            if(winner === 'O'){
                numOWins--;
            }
            else if(winner === 'X'){
                numXWins--;
            }
            else if(winner === 'tie') {
                numTies--;
            }


            setNumOWins(numOWins);
            setNumXWins(numXWins);
            setNumTies(numTies);



            _setGameType(lsState.gameType);
            _setTurn(lsState.turn);
            _setBoard(lsState.board);
            
            _setXPlayer(lsState.XPlayer);
            _setOPlayer(lsState.OPlayer);



            

        }


    }, []);

    //check if there is a winner after each turn
    useEffect(() => {
        if(board === null) return;
        
        const {winner, cells} = getWinner(board);

        if(winner === 'X') {
            _setWinner('X'); // after winner changes, the useEffect on page/index.tsx will make GameOverModal shows up 

            setTimeout(() => {
                _setCellsWin(cells);
                setNumXWins(numXWins as number + 1);
            }, 500);
        }
        else if(winner === 'O') {
            _setWinner('O');

            setTimeout(() => {
                _setCellsWin(cells);
                setNumOWins(numOWins as number+ 1);
            }, 500);
        }
        else if(winner === 'tie') {
            setNumTies(numTies as number + 1);
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
                        LocalStorage.updateStateData({turn: turn === 'X'? 'O' : 'X'});
                    }, 500);
            }
        }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [board]);


    // Make CPU plays the first move if it goes first.
    useEffect(() => {

        if(isStarted && winner === null && gameType === 'vsCPU') {
            if((turn === 'X' && XPlayer === 'CPU')
            || (turn === 'O' && OPlayer === 'CPU')
            ) {
                    
                    const [iR, iC] = cpuMove(turn, board as BoardState);
                
                    _setCellState(turn,iR, iC);

                    _setTurn(turn === 'X'? 'O' : 'X');
                    LocalStorage.updateStateData({turn: turn === 'X'? 'O' : 'X'});


            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isStarted]);


    useEffect(() => {
        if(numOWins === null || numXWins === null || numTies === null) return;

        LocalStorage.updateScores(gameType as GameType, {
            numXWins: numXWins as number,
            numOWins: numOWins as number,
            numTies: numTies as number
        });

        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [numXWins, numOWins, numTies]);

    /***************************************/
    
    const newGame = (gameType:GameType, player1Mark:MarkType) => {

        let xPlayer:PlayerType, oPlayer:PlayerType;

        if(gameType === 'vsCPU') {
            if(player1Mark === 'X') {
                xPlayer = 'player1';
                oPlayer = 'CPU';
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
        _setTurn('X');
        
        _setBoard(initBoard);
        
        _setXPlayer(xPlayer);
        _setOPlayer(oPlayer);
        
        _setIsStarted(true);
        
        

        LocalStorage.updateStateData({
            isStarted: true,
            gameType: gameType,
            turn: 'X',
            board: board as BoardState,
            XPlayer: xPlayer,
            OPlayer: oPlayer,
        });

        const scores = LocalStorage.loadScores(gameType);

        setNumXWins(scores.numXWins);
        setNumOWins(scores.numOWins);
        setNumTies(scores.numTies);
    }

    const cellOnClickHandle = (row:number, col:number) => {
        
        if(winner === null && (board as BoardState)[row][col] === 'empty'){
            _setCellState(turn, row, col);
            _setTurn(turn === 'O'? 'X' : 'O');
            LocalStorage.updateStateData({turn: turn === 'X'? 'O' : 'X'});
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

        LocalStorage.updateStateData({
            isStarted: false,
        });
   
    }


    const nextRound = () => {
        _setTurn('X');
        _setBoard(initBoard);
        _setWinner(null);
        _setCellsWin(null);

        LocalStorage.updateStateData({
            board: initBoard,
            turn: 'X'
        })
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