import { FunctionComponent } from "react"

import { CellState } from "../../typesAndInterfaces"

import styles from './Cell.module.scss';

import OIcon from '../../assets/icon-o.svg';
import XIcon from '../../assets/icon-x.svg';


const Cell:FunctionComponent<{currentState:CellState}> = ({currentState}) => {
    

    return (
        <div className={styles.cell}>
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
