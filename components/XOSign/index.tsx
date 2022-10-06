import { FunctionComponent } from "react";

import Image from "next/image";

import XIcon from '../../assets/icon-x.svg';
import OIcon from '../../assets/icon-o.svg';

import styles from './XOSign.module.scss';

const XOSign:FunctionComponent = () => {

    return (
        <div className={styles.xoSign}>
            <div className={styles.imgX}>
                <XIcon
                    viewBox="0 0 64 64"
                />
            </div>
            <div className={styles.imgO}>
                <OIcon
                    viewBox="0 0 64 64"
                />
            </div>
        </div>
    )
}

export default XOSign;