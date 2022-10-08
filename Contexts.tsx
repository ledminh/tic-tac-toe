import { FunctionComponent } from "react";

import useUI, {UIContext} from './useUI';
import useData, {DataContext} from './useData';

const Contexts:FunctionComponent<{children:JSX.Element[]|JSX.Element}> = ({children}) => {
    const uiControls = useUI();
    const data = useData();
    return (
        <DataContext.Provider value={data}>
            <UIContext.Provider value={uiControls}>
                {children}    
            </UIContext.Provider>
        </DataContext.Provider>
    )
}

export default Contexts;