import { FunctionComponent, useContext } from "react"

import { CellState } from "../../typesAndInterfaces"

import styles from './Cell.module.scss';

import OIcon from '../../assets/icon-o.svg';
import XIcon from '../../assets/icon-x.svg';
import { DataContext } from "../../useData";


const Cell:FunctionComponent<{currentState:CellState, row: number, col:number}> = ({currentState, row, col}) => {
    
    const {cellOnClickHandle} = useContext(DataContext);


    return (
        <div className={styles.cell}
            onClick={() => cellOnClickHandle(row,col)}
            >
            {
                currentState === 'O'?
                    <div className={styles.OIcon}>
                        <OIcon
                            viewBox="0 0 64 64"
                        />
                    </div>
                    
                    : currentState === 'X'?
                    <div className={styles.XIcon}>
                        <XIcon
                            viewBox="0 0 64 64"
                        />
                    </div>
                    : null
            }
        </div>
    )
}


export default Cell;
