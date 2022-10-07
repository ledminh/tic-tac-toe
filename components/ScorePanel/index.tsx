import { FunctionComponent } from "react";
import { ScorePanelType } from "../../typesAndInterfaces";

import styles from './ScorePanel.module.scss';

const ScorePanel:FunctionComponent<{type:ScorePanelType}> = ({type}) => {

    return (
        <div className={styles.scorePanel +
            (type === 'X'?
                ' ' + styles.X
                : type === 'O'?
                ' ' + styles.O
                : ' ' + styles.ties)
        }>
            <div className={styles.title}>X (P2)</div>
            <div className={styles.score}>14</div>
        </div>
    )
}

export default ScorePanel;