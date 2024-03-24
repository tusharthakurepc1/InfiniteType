import React, { useState, useEffect, useRef } from 'react';
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


    useEffect(()=>{
        setData(props.content);
        setDataSp(props.content.split(" "))
    }, [props.content])


    const [time, setTime] = useState(10); 
    const [decrementing, setDecrementing] = useState(false);

    const [counterDecrement, setCounterDecrement] = useState(0);
    const [inputFlag, setInputFlag] = useState(false); 

    useEffect(() => {
        const intervalId = setInterval(() => {
        if(time === 0){
            setInputFlag(true);

            const t_gross_wpm = performance.total_word / performance.time;
            const t_net_wpm = performance.correct / performance.time;
            const t_acc = (t_net_wpm * 100) / t_gross_wpm;

            setPerformance(performance => ({
                ...performance,
                wpm: (performance.total_char / 5) / performance.time,
                gross_wpm: t_gross_wpm,
                net_wpm: t_net_wpm,
                acc: t_acc.toFixed(2),
            }))

            setPostState(true);


        }
        if (decrementing && time > 0) {
            setTime(prevState => prevState - 1);
        }
        }, 1000);

        return () => clearInterval(intervalId); 
    }, [decrementing, time]);

    


    const sendPerformanceData = async (data)=>{
        const POST_URL = "http://localhost:3100/performance";

        try{
            const api = await fetch(POST_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',},
                body: JSON.stringify(performance),
            })

            console.log(api.status)
        }
        catch(e){
            console.log("Can't POST Data on "+ POST_URL);
        }
    }


    const startTime = (e) => {
        if(tabFlag === "optiontab-time" || tabFlag === "optiontab-quote")  
            setDecrementing(true);
        else{
            if(counterDecrement > 0){
                setCounterDecrement(counterDecrement => counterDecrement - 1);
            }
            else if(counterDecrement <= 0){
                props.setScoreCardValue()
                setInputFlag(true);
            }
        }
    };

    const [postState, setPostState] = useState(false)

    useEffect(()=>{
        if(postState){
            props.setPerformanceData(performance);
            sendPerformanceData();
            props.setScoreCardValue()
        }
    }, [postState])

    const [wordNo, setwordNo] = useState(0);
    const body = useRef();

    //User Test Performance
    const [performance, setPerformance] = useState({
        total_char: 0,                  // total correct or incorrect char
        total_word: 0,                  // gross word
        correct: 0,                     // net word
        error: 0,
        wpm: 0,
        time: props.tabValue / 60,      // time in minute
        gross_wpm: 0,                   // gross word / total time in minute
        net_wpm: 0,                     // net word  / total time in minute
        acc: 0,                         // net_wpm   * 100 / gross_wpm
    })

    


    const handleKeyPress = (event) => {
        startTime()
        const keyPressed = event.key;
        

        if(keyPressed === 'Backspace' && inputValue.replace(/^\s+|\s+$/gm,'').length === 0){
            console.log("hit");
            body.current.children[wordNo].style.backgroundColor = 'gray';
            body.current.children[wordNo].style.color  = 'rgba(240, 255, 255, 0.212)';
            
            body.current.children[wordNo + 1].style.backgroundColor  = '#3D4748';
            setwordNo(wordNo - 1);
        }
        else if(keyPressed === 'Backspace'){
            setPerformance(performance => (
                {
                    ...performance,
                    total_char: performance.total_char - 1,
                }
            ))
        }
        else if(keyPressed === ' '){
            // console.log(dataSp[wordNo]+" "+ inputValue);
            // console.log(body.current.children[wordNo + 1]);

            body.current.children[wordNo + 2].style.backgroundColor = 'gray';
            body.current.children[wordNo + 1].style.backgroundColor  = '#3D4748';

            if(inputValue.replace(/^\s+|\s+$/gm,'') === dataSp[wordNo]){
                console.log("Correct");
                setPerformance(performance => ({
                    ...performance,
                    correct: performance.correct + 1,
                    total_word: performance.total_word + 1,
                }))
                body.current.children[wordNo + 1].style.color  = 'white';
            }
            else{
                console.log("Incorrect");
                setPerformance(performance => ({
                    ...performance,
                    error: performance.error + 1,
                    total_word: performance.total_word + 1,
                }))
                body.current.children[wordNo + 1].style.color  = '#ca4754';
            }

            setPerformance(performance => (
                {
                    ...performance,
                    total_char: performance.total_char + inputValue.length,
                }
            ))
            setwordNo(wordNo + 1);
            setInputValue("")
        }
        
    };
    
    return(
        <div className='container' >
            <div className='time-container'>
                <p className='time-content'>
                    {tabFlag === "optiontab-word" ? counterDecrement : time} 
                </p>
            </div>

            

            <div className='inputblock' onKeyDown={handleKeyPress} ref={body}>
                <input 
                    className="input-field-text" 
                    placeholder='Start!'
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