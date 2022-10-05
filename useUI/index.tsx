import React, { useState } from "react";


type uiControlType = {
    showGameOverModal: boolean,
    setShowGameOverModal: (s:boolean) => void,
    showRestartModal: boolean,
    setShowRestartModal: (s:boolean) => void
}

const defaultUIControl:uiControlType = {
    showGameOverModal: false,
    setShowGameOverModal: (s:boolean) => {},
    showRestartModal: false,
    setShowRestartModal: (s:boolean) => {}
}

export const UIContext = React.createContext<uiControlType>(defaultUIControl);


const useUI = () => {
    //Modals
    const [showGameOverModal, setShowGameOverModal] = useState(false);
    const [showRestartModal, setShowRestartModal] = useState(false);




    return {
        showGameOverModal,
        setShowGameOverModal,
        showRestartModal,
        setShowRestartModal
    }
}


export default useUI;


