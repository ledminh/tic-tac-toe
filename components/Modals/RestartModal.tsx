import { FunctionComponent } from "react";

import Modal from "./Modal";

import styles from './RestartModal.module.scss';


const RestartModal:FunctionComponent<{showModal: boolean, setShowModal: (show:boolean) => void}> = ({showModal, setShowModal}) => {


    return (
        <Modal onClose={() => setShowModal(false)}
                show={showModal}
        >
            
        </Modal>
    )
}

export default RestartModal;