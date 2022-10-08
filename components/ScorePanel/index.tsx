import { FunctionComponent, useContext } from "react";
import { ScorePanelType } from "../../typesAndInterfaces";
import { DataContext } from "../../useData";

import styles from './ScorePanel.module.scss';

const ScorePanel:FunctionComponent<{type:ScorePanelType}> = ({type}) => {

    const {XPlayer, OPlayer} = useContext(DataContext);
    const typeStyle = type === 'X'? styles.X : type === 'O'?  styles.O : styles.ties; 
    
    
    const title = type === 'X'? (
        XPlayer === 'player1'?
            'X (P1)':
            XPlayer === 'player2'?
            'X (P2)':
            'X (CPU)'
    ): type === 'O'? (
        OPlayer === 'player1'?
            'O (P1)':
            OPlayer === 'player2'?
            'O (P2)':
            'O (CPU)'
    ): 'TIES';
    

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