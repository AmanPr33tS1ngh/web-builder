import React from 'react';
import {Link} from "react-router-dom";
import './Navbar.css'

const Navbar = ()=> {
    return (
        <div className={'nav'}>
            <div className={'d-flex-sa'}>
                <Link className={'link'} to={'/'}>Home</Link>
                <Link className={'link'} to={'/pages'}>Pages</Link>
            </div>
        </div>
    )
}
export default Navbar;