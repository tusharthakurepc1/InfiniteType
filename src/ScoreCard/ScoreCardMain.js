import React, { useState } from 'react';
import './scorecard-style.css'

const ScoreCardMain = (props)=>{

    const [wpm, setwpm] = useState(55);
    const [acc, setacc] = useState(95);
    const [char, setchar] = useState(108);
    const [time, settime] = useState(15);
    const [avgwpm, setavgwpm] = useState(65.43);
    
    return(
        <>
            <div className='score-container'>
                <div className='score-container-item'>
                    <span className='score-item-heading'>wpm</span>
                    <span className='score-item-value'>{wpm}</span>
                </div>

                <div className='score-container-item'>
                    <span className='score-item-heading'>acc</span>
                    <span className='score-item-value'>{acc}%</span>
                </div>
                
                <div className='score-container-item'>
                    <span className='score-item-heading'>char</span>
                    <span className='score-item-value'>{char}</span>
                </div>

                <div className='score-container-item'>
                    <span className='score-item-heading'>time</span>
                    <span className='score-item-value'>{time}s</span>
                </div>

                <div className='score-container-item'>
                    <span className='score-item-heading'>avg wpm</span>
                    <span className='score-item-value'>{avgwpm}</span>
                </div>
            </div>

            <div className='navigate'>
                <button className="navigate-btn" onClick={props.setScoreCardValue}>Restart</button>
            </div>
        </>
    )
}

export default ScoreCardMain;