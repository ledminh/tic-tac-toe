import { FunctionComponent } from "react";
import styles from './MainScreen.module.scss';

import XOSign from "../XOSign";
import TurnPanel from '../TurnPanel';
import Board from '../Board';
import ScorePanel from '../ScorePanel';

import RestartIcon from '../../assets/icon-restart.svg';

const MainScreen:FunctionComponent = () => {

    return (
        <div className={styles.mainScreen}>
            <section className={styles.header}>
                <XOSign/>
                <TurnPanel/>
                <button className={styles.restartButton}>
                    <RestartIcon/>    
                </button>
            </section>
            <Board />
            <section className={styles.footer}>
                <ScorePanel type={'X'}/>
                <ScorePanel type={'TIES'}/>
                <ScorePanel type={'O'}/>
            </section>

        </div>
    );
}

export default MainScreen;