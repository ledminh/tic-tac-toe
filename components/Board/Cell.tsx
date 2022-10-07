import { FunctionComponent } from "react"

import { CellState } from "../../typesAndInterfaces"

import styles from './Cell.module.scss';

import OIcon from '../../assets/icon-o.svg';
import XIcon from '../../assets/icon-x.svg';


const Cell:FunctionComponent<{currentState:CellState}> = ({currentState}) => {
    

    return (
        <div className={styles.Cell}>
            {
                currentState === 'O'?
                    <OIcon/>
                    : currentState === 'X'?
                    <XIcon/>
                    : null
            }
        </div>
    )
}


export default Cell;
