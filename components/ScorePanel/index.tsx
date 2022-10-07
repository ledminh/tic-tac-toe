import { FunctionComponent } from "react";
import { ScorePanelType } from "../../typesAndInterfaces";

import styles from './ScorePanel.module.scss';

const ScorePanel:FunctionComponent<{type:ScorePanelType}> = ({type}) => {
    const typeStyle = type === 'X'? styles.X : type === 'O'?  styles.O : styles.ties; 
    const title = type === 'X'? 'X (P2)': type === 'O'? 'O (P1)' : 'TIES';
    return (
        <div className={styles.scorePanel + " " + typeStyle}>
            <div className={styles.title}>{title}</div>
            <div className={styles.score}>14</div>
        </div>
    )
}

export default ScorePanel;