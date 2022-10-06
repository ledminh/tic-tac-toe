import { FunctionComponent } from "react";
import styles from './MainScreen.module.scss';

import XOSign from "../XOSign";
import TurnPanel from '../TurnPanel';
import Board from '../Board';
import ScorePanel from '../ScorePanel';

const MainScreen:FunctionComponent = () => {

    return (
        <div className={styles.mainScreen}>
            <section className={styles.header}>
                <XOSign/>
                <TurnPanel/>
                <button>RS</button>
            </section>
            <Board />
            <section className={styles.footer}>
                <ScorePanel />
                <ScorePanel />
                <ScorePanel />
            </section>

        </div>
    );
}

export default MainScreen;