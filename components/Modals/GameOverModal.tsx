import { FunctionComponent } from "react";

import Modal from "./Modal";

import styles from './GameOverModal.module.scss';


const GameOverModal:FunctionComponent<{showModal: boolean, setShowModal: (show:boolean) => void}> = ({showModal, setShowModal}) => {


    return (
        <Modal onClose={() => setShowModal(false)}
                show={showModal}
        >
            
        </Modal>
    )
}

export default GameOverModal;