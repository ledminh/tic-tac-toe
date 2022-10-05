import { FunctionComponent } from "react";

import useUI, {UIContext} from './useUI';


const Contexts:FunctionComponent<{children:JSX.Element[]}> = ({children}) => {
    const uiControls = useUI();

    return (
        <UIContext.Provider value={uiControls}>
            {children}    
        </UIContext.Provider>
    )
}

export default Contexts;