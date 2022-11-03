import React, { FunctionComponent, useContext } from "react";
import { BoardState } from "../../typesAndInterfaces";
import { DataContext } from "../../useData";

import styles from './Board.module.scss';

import Cell from "./Cell";




const Board:FunctionComponent = () => {
    const {board} = useContext(DataContext);
    
    return (
        board !== null?
        <div className={styles.board}>
            {
                board.map((row, iR) => (
                    <React.Fragment key={iR}>
                        {
                            row.map((cellState, iC) => (
                                <Cell key={iR + '-' + iC}
                                    currentState={cellState}
                                    row={iR}
                                    col={iC}

                                />
                            ))
                        }
                    </React.Fragment>
                ))
            }
        </div>: null
    );
}

export default Board;