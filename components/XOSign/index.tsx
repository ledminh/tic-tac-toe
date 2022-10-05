import { FunctionComponent } from "react";

import Image from "next/image";

import xIcon from '../../assets/icon-x.svg';
import oIcon from '../../assets/icon-o.svg';

const XOSign:FunctionComponent = () => {

    return (
        <div>
            <Image 
                src={xIcon}
                alt="x mark"
            />
            <Image 
                src={oIcon}
                alt="o mark"
            />
        </div>
    )
}

export default XOSign;