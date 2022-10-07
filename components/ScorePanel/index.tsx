import { FunctionComponent, useContext } from "react";
import { ScorePanelType } from "../../typesAndInterfaces";
import { DataContext } from "../../useData";

import styles from './ScorePanel.module.scss';

const ScorePanel:FunctionComponent<{type:ScorePanelType}> = ({type}) => {

    const typeStyle = type === 'X'? styles.X : type === 'O'?  styles.O : styles.ties; 
    
    const title = type === 'X'? 'X (P2)': type === 'O'? 'O (P1)' : 'TIES';
    

    const {numXWins, numOWins, numTies} = useContext(DataContext);
    
    const score = type === 'X'? numXWins: type === 'O'? numOWins : numTies;
    
    return (
        <div className={styles.scorePanel + " " + typeStyle}>
            <div className={styles.title}>{title}</div>
            <div className={styles.score}>{score}</div>
        </div>
    )
}

export default ScorePanel;