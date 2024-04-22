import React, { useContext } from 'react';
import {User} from '../App'
import "./ProfileStyle.css"

const ProfileMain = ()=>{
    const user = useContext(User)

    return (
        <div className="profile-container">
          {
            user === null || user === undefined? 
            <></>:
            <ul className="user-profile-details">
                
                <div className='user-detail-profile'>
                    <span className='title'>Name</span>
                    <div className='data'>
                        {user.name}
                    </div>
                </div> 
                
                <div className='user-detail-profile'>
                    <span className='title'>Nationality</span>
                    <div className='data'>
                        {user.country}
                    </div>
                </div>

                <div className='user-detail-profile'>
                    <span className='title'>Age</span>
                    <div className='data'>
                        {user.age}
                    </div>
                </div>

                <div className='user-detail-profile'>
                    <span className='title'>Username</span>
                    <div className='data'>
                        {user.username}
                    </div>
                </div>
                 
            </ul>
          }

          
        </div>
    )
}

const DetailsBlockComponent = (props)=>{
    return (
        <div className='user-detail'>
            <span className='title'>{props.title}</span>
            <div className='data'>
                {props.data}
            </div>
        </div>
    )
}

export default ProfileMain