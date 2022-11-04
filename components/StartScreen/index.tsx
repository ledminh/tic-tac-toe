import { FunctionComponent, useState, useContext } from "react";
import styles from './StartScreen.module.scss';

import XOSign from "../XOSign";

import Xsvg from '../../assets/icon-x-outline.svg';
import Osvg from '../../assets/icon-o-outline.svg';
import { DataContext } from "../../useData";


const StartScreen:FunctionComponent = () => {
    const [player1Mark, setPlayer1Mark] = useState<'X'|'O'>('X');

    const {newGame} = useContext(DataContext);

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
                        aria-label="pick player 1's mark X"
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
                        aria-label="pick player 1's mark O"
                    >
                        <div className={styles.imgO}>
                            <Osvg 
                                viewBox="0 0 66 66"
                                fill={player1Mark === 'O'? '#1A2A33' : '#A8BFC9'}
                                
                            />
                        </div>
                    </button>
                </div>
                <span className={styles.reminder}>REMEMBER: X GOES FIRST</span>
            </section>
            <section className={styles.buttons}>
                <button className={styles.vsCPU}
                    onClick={() => newGame('vsCPU', player1Mark)}
                    aria-label="vsCPU"
                    >
                        <h3>NEW GAME (VS CPU)</h3>
                </button>
                <button className={styles.vsPlayer}
                    onClick={() => newGame('vsPlayer', player1Mark)}
                    aria-label="vsPlayer"
                    >
                        <h3>NEW GAME (VS PLAYER)</h3>
                </button>
            </section>
        </div>
    );
}

export default StartScreen;