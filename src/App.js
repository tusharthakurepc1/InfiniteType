import './App.css';
import React, {useState, useEffect} from 'react';
import Header from './Header/header'
import OptionTab from './HomeBody/OptionsTab';
import BodyReact from './Body/BodyMain';
import ScoreCard from './ScoreCard/ScoreCardMain';

function App() {
  const [tabFlag, setTabFlag] = useState("optiontab-time");
  const [tabValue, setTabValue] = useState(30);
  const [scoreCardFlag, setScoreCardFlag] = useState(true);

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
  const URL = "http://localhost:3500/";

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


      {/* <BodyReact 
        tabFlag={tabFlag} 
        tabValue={tabValue} 
        content={data} 
        scoreCardValue={scoreCardFlag}
        setScoreCardValue={setScoreCardValue}>
      </BodyReact> */}

      <ScoreCard />

    </div>
  );
}


export default App;
