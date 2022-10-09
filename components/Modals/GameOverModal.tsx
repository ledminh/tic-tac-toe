import { FunctionComponent, useContext } from "react";

import Modal from "./Modal";

import styles from './GameOverModal.module.scss';

import XIcon from '../../assets/icon-x.svg';
import OIcon from '../../assets/icon-o.svg';
import { DataContext } from "../../useData";

const GameOverModal:FunctionComponent<{showModal: boolean, setShowModal: (show:boolean) => void}> = ({showModal, setShowModal}) => {
    
    const {winner, gameType, XPlayer, restart, nextRound} = useContext(DataContext);


    return (
        <Modal onClose={() => setShowModal(false)}
                show={showModal}
        >
            {
                winner === 'none'?
                <div className={styles.roundTies}><span>ROUND TIES</span></div>
                :   <>
                        {
                            gameType === 'vsCPU'?
                                winner === 'X'? 
                                    (XPlayer === 'player1'?
                                        <div className={styles.line1}>YOU WON!</div>
                                        : <div className={styles.line1}>OH NO, YOU LOST...</div>)
                                    :(XPlayer === 'player1'?
                                        <div className={styles.line1}>OH NO, YOU LOST...</div>
                                        : <div className={styles.line1}>YOU WON!</div>) 
                                : winner === 'X'?
                                    (XPlayer === 'player1'?
                                        <div className={styles.line1}>PLAYER 1 WINS!</div>
                                        : <div className={styles.line1}>PLAYER 2 WINS!</div>)
                                    :(XPlayer === 'player1'?
                                        <div className={styles.line1}>PLAYER 2 WINS!</div>
                                        : <div className={styles.line1}>PLAYER 1 WINS!</div>)
                        }
                        
                            <div className={styles.line2}>
                                <div className={styles.icon}>
                                    {
                                        winner === 'X'?
                                        <XIcon
                                            viewBox="0 0 64 64"
                                        /> :
                                        <OIcon
                                            viewBox="0 0 64 64"
                                        />
                                    }
                                </div>
                                <span className={styles[winner === 'X'? 'X' : 'O']}>TAKES THE ROUND</span>
                        </div>   
                    </>
            }
            <div className={styles.buttons}>
                <button className={styles.quit}
                    onClick={() => {
                                    setShowModal(false);
                                    restart();
                                    }
                    }
                >
                    QUIT
                </button>
                <button className={styles.nextRound}
                    onClick={() => {
                        setShowModal(false);
                        nextRound();
                        }
                    }
                    >
                        NEXT ROUND
                </button>
            </div>            
        </Modal>
    )
}

export default GameOverModal;