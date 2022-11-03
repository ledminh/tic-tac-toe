import React, { FunctionComponent, useContext } from "react";
import { DataContext } from "../../useData";

import styles from './Board.module.scss';

import Cell from "./Cell";




const Board:FunctionComponent = () => {
    const {board} = useContext(DataContext);
    
    return (
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
        </div>
    );
}

export default Board;