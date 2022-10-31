import React from 'react';
import logo from "../assests/images/logo.svg";

import { LogoutOutlined } from '@ant-design/icons';

function TopBar(props) {
    const { isLoggedIn, handleLogout } = props;//通过props拿到状态值
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <span className="App-title">Around Web</span>
            {
                isLoggedIn ?
                    <LogoutOutlined className='logout' 
                                    onClick={handleLogout}/>
                    :
                    null
            }
        </header>
    );
}

export default TopBar;