import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './style_header.css';

import bell_logo from './bell-icon.png';
import profile_logo from './profile.png';
import setting_logo from './setting.png';
import leaderboard_logo from './leaderboard.png';
import home_logo from './home.png';
import logo_infiniteType from './infinite-type-high-resolution-logo-transparent (3).png';

const Header = (props) => {

    return (
        <div className='header'>
            <ul className='header-left'>
                <li><img className="logo" src={logo_infiniteType} alt='Error' /></li>
                <li><Link to="/" className='default-link navigation-link'><img className='home-logo-img' src={home_logo} alt="Error" /></Link></li>
                <li><Link to="/leader-board" className='default-link navigation-link'><img className='leaderboard-logo-img' src={leaderboard_logo} alt="Error" /></Link></li>
                {/* <li><Link to="/settings" className='default-link navigation-link'><img className='setting-logo-img' src={setting_logo} alt="Error" /></Link></li> */}
            </ul>
            <ul className='header-right'>
                {/* <li><Link to="/user/notifications" className='default-link navigation-link'><img className='bell-logo-img' src={bell_logo} alt="Error" /></Link></li> */}
                {props.loginFlag ? (
                    <>
                        <li><Link to="/user/profile" className='default-link navigation-link'><img className='profile-logo-img' src={profile_logo} alt="Error" /></Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login-signup" className='default-link login-link'>Login Signup</Link></li>
                    </>
                )}
            </ul>
        </div>
    );
}

export default Header;
