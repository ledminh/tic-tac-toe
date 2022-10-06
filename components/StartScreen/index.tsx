import { FunctionComponent, useState } from "react";
import styles from './StartScreen.module.scss';

import XOSign from "../XOSign";

import Xsvg from '../../assets/icon-x-outline.svg';
import Osvg from '../../assets/icon-o-outline.svg';


const StartScreen:FunctionComponent = () => {
    const [player1Mark, setPlayer1Mark] = useState<'X'|'O'>('X');

    return (
        <div className={styles.startScreen}>
            <section className={styles.sectionTop}>
                <XOSign />
            </section>
            <section className={styles.pickPlayer}>
                <span className={styles.title}>PICK PLAYER 1{'\''}S MARK</span>
                <div className={styles.markButtons}>
                    <button className={styles.markButton + (player1Mark === 'X'? (' ' + styles.current): '')}
                        onClick={() => setPlayer1Mark('X')}
                    >
                        <div className={styles.imgX}>
                            <Xsvg 
                                viewBox="0 0 64 64"
                                fill={player1Mark === 'X'? '#1A2A33' : '#A8BFC9'}
                            />
                        </div>

                    </button>
                    <button className={styles.markButton + (player1Mark === 'O'? (' ' + styles.current): '')}
                        onClick={() => setPlayer1Mark('O')}
                    >
                        <div className={styles.imgO}>
                            <Osvg 
                                viewBox="0 0 66 66"
                                fill={player1Mark === 'O'? '#1A2A33' : '#A8BFC9'}
                                
                            />
                        </div>
                    </button>
                </div>
                REMEMBER: X GOES FIRST
            </section>
            <section className={styles.buttons}>
                <button>NEW GAME (VS CPU)</button>
                <button>NEW GAME (VS PLAYER)</button>
            </section>
        </div>
    );
}

export default StartScreen;