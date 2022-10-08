import { FunctionComponent, useContext } from "react";
import styles from './MainScreen.module.scss';

import XOSign from "../XOSign";
import TurnPanel from '../TurnPanel';
import Board from '../Board';
import ScorePanel from '../ScorePanel';

import RestartIcon from '../../assets/icon-restart.svg';
import { UIContext } from "../../useUI";

const MainScreen:FunctionComponent = () => {
    const {setShowRestartModal} = useContext(UIContext);
    
    return (
        <div className={styles.mainScreen}>
            <section className={styles.header}>
                <XOSign/>
                <TurnPanel/>
                <button className={styles.restartButton}
                    onClick={() => setShowRestartModal(true)}
                >
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