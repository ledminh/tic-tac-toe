import { FunctionComponent } from "react";

import Image from "next/image";

import xIcon from '../../assets/icon-x.svg';
import oIcon from '../../assets/icon-o.svg';

import styles from './XOSign.module.scss';

const XOSign:FunctionComponent = () => {

    return (
        <div className={styles.xoSign}>
            <div className={styles.imgX}>
                <Image 
                    src={xIcon}
                    alt="x mark"
                />
            </div>
            <div className={styles.imgO}>
                <Image 
                    src={oIcon}
                    alt="o mark"
                />
            </div>
        </div>
    )
}

export default XOSign;