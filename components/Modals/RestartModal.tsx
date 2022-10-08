import { FunctionComponent } from "react";

import Modal from "./Modal";

import styles from './RestartModal.module.scss';


const RestartModal:FunctionComponent<{showModal: boolean, setShowModal: (show:boolean) => void}> = ({showModal, setShowModal}) => {


    return (
        <Modal onClose={() => setShowModal(false)}
                show={showModal}
        >
            <div className={styles.text}>RESTART GAME?</div>
            <div className={styles.buttons}>
                <button className={styles.no}
                    onClick={() => setShowModal(false)}
                >
                    NO, CANCEL
                </button>
                <button className={styles.yes}>YES, RESTART</button>
            </div>            
        </Modal>
    )
}

export default RestartModal;