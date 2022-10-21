import { FunctionComponent, useContext, useEffect, useState } from "react"

import { CellState } from "../../typesAndInterfaces"

import styles from './Cell.module.scss';

import OIcon from '../../assets/icon-o-outline.svg';
import XIcon from '../../assets/icon-x-outline.svg';
import { DataContext } from "../../useData";


const Cell:FunctionComponent<{currentState:CellState, row: number, col:number}> = ({currentState, row, col}) => {
    
    const {cellOnClickHandle, cellsWin, turn} = useContext(DataContext);

    const [hover, setHover] = useState(false);

    let lightUp = false;

    if(cellsWin !== null) {
        for(let i = 0; i< cellsWin.length; i++) {
            if(cellsWin[i].row === row && cellsWin[i].col === col) {
                lightUp = true;
            }        
        }
    }

    return (
        <div className={styles.cell + (lightUp? ' ' + styles['lightUp' + currentState]: '')}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => cellOnClickHandle(row,col)}
            >
            {
                currentState === 'O'?
                    <div className={styles.OIcon + ' ' + styles.display}>
                        <OIcon
                            viewBox="0 0 66 66"
                            fill={lightUp? '#1A2A33' : "#F2B137"}
                        />
                    </div>
                    : currentState === 'X'?
                    <div className={styles.XIcon + ' ' + styles.display}>
                        <XIcon
                            viewBox="0 0 64 64"
                            fill={lightUp? '#1A2A33' : "#31C3BD"}
                        />
                    </div>
                    : turn === 'X' && hover?
                    <div className={styles.XIcon}>
                        <XIcon
                            viewBox="0 0 64 64"
                            stroke="#111111"
                            fill="transparent"
                        />
                    </div>
                    : turn === 'O' && hover?
                    <div className={styles.OIcon}>
                        <OIcon
                            viewBox="0 0 66 66"
                            stroke="#111111"
                            fill="transparent"
                        />
                    </div>
                    : null
            }
        </div>
    )
}


export default Cell;
