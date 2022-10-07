import { FunctionComponent } from "react";

import Modal from "./Modal";

import styles from './GameOverModal.module.scss';

import XIcon from '../../assets/icon-x.svg';
import OIcon from '../../assets/icon-o.svg';

const GameOverModal:FunctionComponent<{showModal: boolean, setShowModal: (show:boolean) => void}> = ({showModal, setShowModal}) => {


    return (
        <Modal onClose={() => setShowModal(false)}
                show={showModal}
        >
            <div className={styles.line1}>PLAYER 1 WINS!</div>
            <div className={styles.line2}>
                <div className={styles.icon}>
                    <XIcon
                        viewBox="0 0 64 64"
                    />
                </div>
                <span>TAKES THE ROUND</span>
            </div>
            {/* <div className={styles.roundTies}><span>ROUND TIES</span></div> */}
            <div className={styles.buttons}>
                <button className={styles.quit}>QUIT</button>
                <button className={styles.nextRound}>NEXT ROUND</button>
            </div>            
        </Modal>
    )
}

export default GameOverModal;