import React, { useState } from "react";
import { BoardState, PlayerType } from "../typesAndInterfaces";

const initBoard:BoardState = [
    ['empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty']
]

type DataType = {
    turn: 'X'|'O',
    board: BoardState,
    numXWins: number,
    numOWins: number,
    numTies: number,
    XPlayer: PlayerType,
    OPlayer: PlayerType
}


const defaultData:DataType = {
    turn: 'X',
    board: initBoard,
    numXWins: 0,
    numOWins: 0,
    numTies: 0,
    XPlayer: 'player1',
    OPlayer: 'player2'
}

export const DataContext = React.createContext<DataType>(defaultData);

const useData = () => {
    const [turn, setTurn] = useState<'X'|'O'>('X');
    const [board, setBoard] = useState<BoardState>(initBoard);

    const [numXWins, setNumXWins] = useState<number>(0);
    const [numTies, setNumTies] = useState<number>(0);
    const [numOWins, setNumOWins] = useState<number>(0);

    const [XPlayer, setXPlayer] = useState<PlayerType>('player2');
    const [OPlayer, setOPlayer] = useState<PlayerType>('CPU');

    

    return {
        turn,
        board,
        numXWins,
        numOWins,
        numTies,
        XPlayer,
        OPlayer
    }
}


export default useData;