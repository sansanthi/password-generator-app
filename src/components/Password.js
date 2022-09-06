import { useState } from 'react';
import copyIcon from '../assets/images/icon-copy.svg';

export default function Password(props) {
    const [copy, setCopy] = useState(false);
    const copyClipboard = () => {
        if(!props.password) {
            return;
        }
        setCopy(true);
        navigator.clipboard.writeText(props.password)
    }
    return (
        <header className="password-field">
            {/* <input type="text" placeholder="pTx1f5DaFX" className="password-text" value={props.password} readOnly/> */}
            <div className='password-text' data-text="P4$5W0rD!">{props.password}</div>
            <span className="copy-state">{copy ? 'Copied': ''}</span>
            <img src={copyIcon} alt="" className="copy-icon" onClick={copyClipboard}/>
        </header>
    )
}