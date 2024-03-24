import './App.css';
import React, {useState, useEffect} from 'react';
import Header from './Header/header'
import OptionTab from './HomeBody/OptionsTab';
import BodyReact from './Body/BodyMain';
import ScoreCard from './ScoreCard/ScoreCardMain';

function App() {
  const [tabFlag, setTabFlag] = useState("optiontab-time");
  const [tabValue, setTabValue] = useState(30);
  const [scoreCardFlag, setScoreCardFlag] = useState(false);

  const [performance, setPerformance] = useState({
    total_char: 0,                  // total correct or incorrect char
    total_word: 0,                  // gross word
    correct: 0,                     // net word
    error: 0,
    wpm: 0,
    time: tabValue / 60,      // time in minute
    gross_wpm: 0,                   // gross word / total time in minute
    net_wpm: 0,                     // net word  / total time in minute
    acc: 0,                         // net_wpm   * 100 / gross_wpm
  })

  const setPerformanceData = (value) =>{
    setPerformance({...value})
  }

  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  const setScoreCardValue = () =>{
    setScoreCardFlag(!scoreCardFlag)
  }

  const setTabFlagValue = (value)=>{
    setTabFlag(value);
  }

  const setFlagTabValue = (value)=>{
    setTabValue(value);
  }

  const [data, setData] = useState("Default");
  const URL = "http://localhost:3100/";

  useEffect(()=>{

      const fetchData = async ()=>{

        try{
          const response = await fetch(URL)
          const res = await response.json()
  
          setData(res.data[random(0, 3)].content)
        }
        catch(err){
          console.log(err);
        }
        
      }

      fetchData()

  }, [])
  

  return (
    <div className="App">
      <Header />

      <OptionTab 
        setTabFlagValue={setTabFlagValue} 
        setFlagTabValue={setFlagTabValue}>
      </OptionTab>

      

{/* Deployed code */}
      {
        scoreCardFlag ? 
        <ScoreCard 
        setScoreCardValue={setScoreCardValue}
        performance={performance}
        >
        </ScoreCard> : 
        <BodyReact 
          tabFlag={tabFlag} 
          tabValue={tabValue} 
          content={data} 
          scoreCardValue={scoreCardFlag}
          setScoreCardValue={setScoreCardValue}
          setPerformanceData={setPerformanceData}>
        </BodyReact>
      }
      

    </div>
  );
}


export default App;
