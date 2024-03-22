import React from 'react';
import './style_header.css';
import bell_logo from './bell-icon.png';
import profile_logo from './profile.png';
import setting_logo from './setting.png';
import leaderboard_logo from './leaderboard.png';
import home_logo from './home.png';
import logo_infiniteType from './infinite-type-high-resolution-logo-transparent (3).png'


const header = (props)=>{
    return(
        <div className='header'>
            <ul className='header-left'>
                <li><img className="logo" src={logo_infiniteType}></img></li>
                <li><button className='default-button'><img className='home-logo-img' src={home_logo} alt="Error" /></button></li>
                <li><button className='default-button'><img className='leaderboard-logo-img' src={leaderboard_logo} alt="Error" /></button></li>
                <li><button className='default-button'><img className='setting-logo-img' src={setting_logo} alt="Error" /></button></li>

            </ul>
            <ul className='header-right'>
                <li><button className='default-button'><img className='bell-logo-img' src={bell_logo} alt="Error" /></button></li>
                <li><button className='default-button'><img className='profile-logo-img' src={profile_logo} alt="Error" /></button></li>
            </ul>
        </div>
    );

}


export default header;