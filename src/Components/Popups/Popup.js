import React from 'react'
import './Popup.css'
const Popup = ({msg, type, close}) => {
    return (
        msg ? <div className={`d-flex-center ${type==='success' ? 'success': 'error'}`}><span className={'cross'} onClick={close}>X</span><p>{msg}</p></div>:null
    )
}
export default Popup;