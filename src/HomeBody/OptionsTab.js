import React, {useState, useEffect} from 'react';
import './style.css';


const OptionTime = (props) =>{

    const setFirst = ()=>   props.setValue(15);
    const setSecond = ()=>   props.setValue(30);
    const setThird = ()=>   props.setValue(60);
    const setFourth = ()=>   props.setValue(120);
    
    return(
        <>
            <div className='division'>|</div>
            <ul className='optiontab-item'>
                <li className="option-item-property"><button onClick={setFirst} className='default-button option-item-property'>15</button></li>
                <li className="option-item-property"><button onClick={setSecond} className='default-button option-item-property'>30</button></li>
                <li className="option-item-property"><button onClick={setThird} className='default-button option-item-property'>60</button></li>
                <li className="option-item-property"><button onClick={setFourth} className='default-button option-item-property'>120</button></li>
            </ul>
        </>
    )
}
const OptionWord = (props) =>{

    const setFirst = ()=>   props.setValue(10);
    const setSecond = ()=>   props.setValue(25);
    const setThird = ()=>   props.setValue(50);
    const setFourth = ()=>   props.setValue(100);

    return (
        <>
        <div className='division'>|</div>
        <ul className='optiontab-item'>
            <li className="option-item-property"><button className='default-button option-item-property' onClick={setFirst}>10</button></li>
            <li className="option-item-property"><button className='default-button option-item-property' onClick={setSecond}>25</button></li>
            <li className="option-item-property"><button className='default-button option-item-property' onClick={setThird}>50</button></li>
            <li className="option-item-property"><button className='default-button option-item-property' onClick={setFourth}>100</button></li>
        </ul>
        </>
    )
}

const OptionQuote = (props) =>{

    const setFirst = ()=>   props.setValue("random");
    const setSecond = ()=>   props.setValue("small");
    const setThird = ()=>   props.setValue("medium");
    const setFourth = ()=>   props.setValue("large");

    return(
        <>
            <div className='division'>|</div>
            <ul className='optiontab-item'>
                <li className="option-item-property"><button className='default-button option-item-property' onClick={setFirst}>random</button></li>
                <li className="option-item-property"><button className='default-button option-item-property' onClick={setSecond}>small</button></li>
                <li className="option-item-property"><button className='default-button option-item-property' onClick={setThird}>medium</button></li>
                <li className="option-item-property"><button className='default-button option-item-property' onClick={setFourth}>large</button></li>
            </ul>
        </>
    )
}

const OptionFreeStyle = (props) =>{
    return(
        <></>
    )
}
const OptionMethod = (props) =>{
    return (
        <>
            <ul className='optiontab-left optiontab-words optiontab-item'>
                <li className="option-item-property"><strong>@</strong>punctuation</li>
                <li className="option-item-property"><strong>#</strong>number</li>
            </ul>
            <div className='division'>|</div>
        </>
    )
}

const OptionMethodEnable = (props) =>{
    if(props.name === "optiontab-word" || props.name === "optiontab-time"){
        return <OptionMethod/>
    }
}


const OptionMenu = (props) =>{
    
    if(props.name === "optiontab-word"){
        return <OptionWord setValue={props.setValue}/>
    }
    if(props.name === "optiontab-quote"){
        return <OptionQuote setValue={props.setValue}/>
    }
    if(props.name === "optiontab-free"){
        return <OptionFreeStyle />
    }
    else    return <OptionTime setValue={props.setValue}/>
}


const OptionTab = (props)=>{
    const [tabFlag, setTabFlag] = useState("optiontab-time");
    const [tabValue, setTabValue] = useState("30");

    const setValue = (value)=>{
        setTabValue(value);
    }

    useEffect(()=>{
        props.setFlagTabValue(tabValue)
    }, [tabValue])


    const setTabTime = ()=>{
        setTabFlag("optiontab-time");
        setTabValue(30);
        props.setTabFlagValue("optiontab-time");
    }

    const setTabWord = ()=>{
        setTabFlag("optiontab-word");
        setTabValue(25)
        props.setTabFlagValue("optiontab-word");
    }

    const setTabQuote = ()=>{
        setTabFlag("optiontab-quote")
        setTabValue("random");
        props.setTabFlagValue("optiontab-quote");
    }

    const setTabFree = ()=>{
        setTabFlag("optiontab-free")
        setTabValue(null)
        props.setTabFlagValue("optiontab-free");
    }


    return(
        
        <div className='_outer'>
            <div className='optiontab'>

                <OptionMethodEnable name={tabFlag}/>
                
                <ul className='optiontab-center optiontab-item'>
                    <li><button onClick={setTabTime} className='default-button option-item-property'>time</button></li>
                    <li><button onClick={setTabWord} className='default-button option-item-property'>words</button></li>
                    <li><button onClick={setTabQuote} className='default-button option-item-property'>quote</button></li>
                    <li><button onClick={setTabFree} className='default-button option-item-property'>free</button></li>
                </ul>
                
                <OptionMenu name={tabFlag} setValue={setValue} />

            </div>
            
        </div>
    );

}

export default OptionTab;