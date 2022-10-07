import { FunctionComponent, useContext } from "react";

import styles from './TurnPanel.module.scss';

import Xsvg from '../../assets/icon-x-outline.svg';
import Osvg from '../../assets/icon-o-outline.svg';
import { DataContext } from "../../useData";


const TurnPanel:FunctionComponent = () => {

    const {turn} = useContext(DataContext);
    
    return (
        <div className={styles.turnPanel}>
            {
                turn === 'X'?
                    <div className={styles.imgX} >
                        <Xsvg 
                            viewBox="0 0 64 64"
                            fill="#A8A8A8"
                        />
                    </div>
                :<div className={styles.imgO}>
                    <Osvg 
                        viewBox="0 0 66 66"
                        fill="#A8A8A8"
                    />
                </div>

            }
            <span className={styles.turn}>TURN</span>
        </div>
    );
}

export default TurnPanel;