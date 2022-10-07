import { FunctionComponent } from "react";
import { BoardState, CellState } from "../../typesAndInterfaces";

import styles from './Board.module.scss';

import Cell from "./Cell";


const board:BoardState = [
    ['X', 'X', 'X'],
    ['O', 'O', 'empty'],
    ['X', 'empty', 'O']
]


const Board:FunctionComponent = () => {

    return (
        <div className={styles.board}>
            {
                board.map((row, iR) => (
                    <>
                        {
                            row.map((cellState, iC) => (
                                <Cell key={iR + '-' + iC}
                                    currentState={cellState}
                                />
                            ))
                        }
                    </>
                ))
            }
        </div>
    );
}

export default Board;

