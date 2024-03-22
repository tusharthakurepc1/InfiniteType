import React, { useState, useEffect, useRef } from 'react';
import ScoreCard from '../ScoreCard/ScoreCardMain'
import "./body-style.css";

const BodyReact = (props) =>{

    const [tabFlag, setTabFlag] = useState(props.tabFlag)
    const [tabValue, setTabValue] = useState(props.tabValue)

    const [inputValue, setInputValue] = useState("");
    

    useEffect(()=>{
        setTabFlag(props.tabFlag)
        setTabValue(props.tabValue)
    }, [props.tabFlag, props.tabValue])

    useEffect(()=>{
        setDecrementing(false);
        setInputValue("");
        
        if(props.tabFlag === "optiontab-free"){
            setTime(null);
        }
        else if(tabFlag === "optiontab-quote"){
            setTime(30);
        }
        else{
            setCounterDecrement(tabValue)
            setTime(tabValue);
        }
        

    }, [tabValue])

    const [data, setData] = useState("");
    const [dataSp, setDataSp] = useState(data.split(" "));
    const [row, setRow] = useState(0);


    useEffect(()=>{
        setData(data=> props.content);
        setDataSp(props.content.split(" "))
        setRow((data.split(" ").length)/12)
    }, [props.content])


    const [time, setTime] = useState(10); 
    const [decrementing, setDecrementing] = useState(false);

    const [counterDecrement, setCounterDecrement] = useState(0);
    const [inputFlag, setInputFlag] = useState(false); 

    useEffect(() => {
        const intervalId = setInterval(() => {
        if(time === 0){
            setInputFlag(true);
        }
        if (decrementing && time > 0) {
            setTime(prevState => prevState - 1);
        }
        }, 1000);

        return () => clearInterval(intervalId); 
    }, [decrementing, time]);


    const startTime = (e) => {
        if(tabFlag === "optiontab-time" || tabFlag === "optiontab-quote")  
            setDecrementing(true);
        else{
            if(counterDecrement !== 0 && e.key == ' '){
                setCounterDecrement(counterDecrement => counterDecrement - 1);
            }
            else if(counterDecrement <= 0){
                setInputFlag(true);
            }
        }
    };

    const [wordNo, setwordNo] = useState(0);
    const body = useRef();

    const handleKeyPress = (event) => {
        startTime()
        const keyPressed = event.key;

        if(keyPressed === 'Backspace' && inputValue.replace(/^\s+|\s+$/gm,'').length == 0){
            console.log("hit");
            body.current.children[wordNo].style.backgroundColor = 'gray';
            body.current.children[wordNo].style.color  = 'rgba(240, 255, 255, 0.212)';
            
            body.current.children[wordNo + 1].style.backgroundColor  = '#3D4748';
            setwordNo(wordNo - 1);
        }
        else if(keyPressed === ' '){
            console.log(dataSp[wordNo]+" "+ inputValue);
            console.log(body.current.children[wordNo + 1]);

            body.current.children[wordNo + 2].style.backgroundColor = 'gray';
            body.current.children[wordNo + 1].style.backgroundColor  = '#3D4748';

            if(inputValue.replace(/^\s+|\s+$/gm,'') === dataSp[wordNo]){
                body.current.children[wordNo + 1].style.color  = 'white';
            }
            else{
                body.current.children[wordNo + 1].style.color  = '#ca4754';
            }

            setwordNo(wordNo + 1);
            setInputValue("")
        }
        
    };

    
    return(
        <div className='container' >
            <div className='time-container'>
                <p className='time-content'>
                    {tabFlag == "optiontab-word" ? counterDecrement : time} 
                </p>
            </div>


            <div className='inputblock' onKeyDown={handleKeyPress} ref={body}>
                <input 
                    className="input-field-text" 
                    type='text' 
                    value={inputValue} 
                    disabled={inputFlag}
                    onChange={(e) => setInputValue(e.target.value)}

                ></input>
                {
                    dataSp.map((el, index)=>{
                        return <Word word={el} wordNo={wordNo} index={index}/>
                    })
                }
            </div>

            {
                props.scoreCardValue ? <ScoreCard setScoreCardValue={props.setScoreCardValue}/> : ""
            }
            
        </div>
    )
}

const Word = (props)=>{
    
    return(
        <div className={`word word-${props.index + 1} `}>
            <Letter word={props.word} wordNo={props.wordNo} />
        </div>
    )
}

const Letter = (props)=>{
    const chars = props.word.split('');

    return (
        <div>
        {/* If getting error then replace span tag with letter */}
            {
                chars.map((char) => (
                    <span className={`letter`} >{char}</span>
                ))
            }
        </div>
    );
}


export default BodyReact;