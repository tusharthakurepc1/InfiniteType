import React, { useState, useEffect } from 'react'
import "./Score_style.css"

const Score = ()=>{

    const [users, setUsers] = useState([])

    useEffect(()=>{

        const URL = "http://localhost:3100/api/users/performance/max";
        const getScoreRequest = async ()=>{
            try{
                const response = await fetch(URL);
                const result = await response.json();
    
                setUsers(result.data);

                console.log(result.data);

            }
            catch(err){
                console.log("Can't fetch data");
            }
        }
        
        getScoreRequest()

    }, [])
    

    return(
        <div>
            <h1> Top Scorers</h1>

            <li className='leaderboard-container'>
            {
                users.map((value, index)=>{
                    {
                        {/* return <h1>{value.id}</h1> */}
                        return <UserListItem user={value} rank={index+1}/>
                    }
                })
            }
            </li>

        </div>
    )

}

const UserListItem = (props)=>{
    return (
        <li className="leaderboard-card">
        <span className="rank">{props.rank}</span>
        <div className="user-info">
            <span className="username user-detail">{props.user.user.name}</span>
            <span className="wpm user-detail">{props.user.performance["wpm"]}</span>
            <span className="acc user-detail">{props.user.performance["acc"]}</span>
            <span className="time user-detail">{props.user.performance["datetime"]}</span>
            <span className="nationality user-detail">{props.user.user["country"]}</span>
        </div>
        </li>
    )
}

export default Score;