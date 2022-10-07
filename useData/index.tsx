import React, { useState } from "react";
import { BoardState } from "../typesAndInterfaces";

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
    numTies: number
}


const defaultData:DataType = {
    turn: 'X',
    board: initBoard,
    numXWins: 0,
    numOWins: 0,
    numTies: 0
}

export const DataContext = React.createContext<DataType>(defaultData);

const useData = () => {
    const [turn, setTurn] = useState<'X'|'O'>('X');
    const [board, setBoard] = useState<BoardState>(initBoard);

    const [numXWins, setNumXWins] = useState<number>(0);
    const [numTies, setNumTies] = useState<number>(0);
    const [numOWins, setNumOWins] = useState<number>(0);



    return {
        turn,
        board,
        numXWins,
        numOWins,
        numTies
    }
}


export default useData;