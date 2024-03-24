import React from 'react';
import './scorecard-style.css'

const ScoreCardMain = (props)=>{
    
    return(
        <>
            <div className='score-container'>
                <div className='score-container-item'>
                    <span className='score-item-heading'>wpm</span>
                    <span className='score-item-value'>{props.performance.wpm}</span>
                </div>

                <div className='score-container-item'>
                    <span className='score-item-heading'>acc</span>
                    <span className='score-item-value'>{props.performance.acc}%</span>
                </div>
                
                <div className='score-container-item'>
                    <span className='score-item-heading'>char</span>
                    <span className='score-item-value'>{props.performance.total_char}</span>
                </div>

                <div className='score-container-item'>
                    <span className='score-item-heading'>time</span>
                    <span className='score-item-value'>{props.performance.time * 60}s</span>
                </div>

                <div className='score-container-item'>
                    <span className='score-item-heading'>avg wpm</span>
                    <span className='score-item-value'>{props.performance.gross_wpm}</span>
                </div>
            </div>

            <div className='navigate'>
                <button className="navigate-btn" onClick={props.setScoreCardValue}>Restart</button>
            </div>
        </>
    )
}

export default ScoreCardMain;