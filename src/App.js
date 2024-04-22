import './App.css';

import React, {useState, useEffect, useContext, createContext} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Header from './Header/header'
import OptionTab from './HomeBody/OptionsTab';
import BodyReact from './Body/BodyMain';
import ScoreCard from './ScoreCard/ScoreCardMain';
import PageNotFound from './PageNotFound/Page404'
import SigninSignup from './SigninSignup/SigninSignup';
import LeaderBoard from './LeaderBoard/Score';
import Profile from './Profile/ProfileMain'


const User = createContext(null)

function App() {

  const [tabFlag, setTabFlag] = useState("optiontab-time");
  const [tabValue, setTabValue] = useState(30);
  const [scoreCardFlag, setScoreCardFlag] = useState(false);

  const [loginFlag, setLoginFlag] = useState(false);

  const [profile, setProfile] = useState({
    status: "false"
  })

  const changeProfile = (data)=>{
    setProfile(data)
  }

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

  const setLoginFlagValue = (val)=>{
    setLoginFlag(val);
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
  
          setData(res.content)
        }
        catch(err){
          console.log(err);
        }
        
      }

      fetchData()

  }, [])
  

  return (
    <div className="App">

      <BrowserRouter>

        <Header loginFlag={loginFlag}/>

        <OptionTab 
          setTabFlagValue={setTabFlagValue} 
          setFlagTabValue={setFlagTabValue}>
        </OptionTab>

        <Routes>

          <Route path='/' element={
            scoreCardFlag ? 
            <ScoreCard 
              setScoreCardValue={setScoreCardValue}
              performance={performance}
            >
            </ScoreCard> :
              <User.Provider value={profile}>
                <BodyReact 
                  tabFlag={tabFlag} 
                  tabValue={tabValue} 
                  content={data} 
                  scoreCardValue={scoreCardFlag}
                  setScoreCardValue={setScoreCardValue}
                  setPerformanceData={setPerformanceData}>
                </BodyReact>
              </User.Provider>
          } />

          <Route path="/test" 
            element={
              scoreCardFlag ? 
            <ScoreCard 
              setScoreCardValue={setScoreCardValue}
              performance={performance}
            >
            </ScoreCard> : 
              <User.Provider value={profile}>
                <BodyReact 
                  tabFlag={tabFlag} 
                  tabValue={tabValue} 
                  content={data} 
                  scoreCardValue={scoreCardFlag}
                  setScoreCardValue={setScoreCardValue}
                  setPerformanceData={setPerformanceData}>
                </BodyReact>  
              </User.Provider>
          }
          ></Route>

          <Route path="/login-signup" 
            element={
              <SigninSignup setLoginFlagValue={setLoginFlagValue} changeProfile={changeProfile}/>
              }>
          </Route>

          <Route path="/leader-board" element={ <LeaderBoard/> }>
          </Route>

          <Route path="/user/profile" element={ 
          <User.Provider value={profile}>
            <Profile/> 
          </User.Provider>
          }>
          </Route>


          <Route  path="*"
            element={<PageNotFound/>}
          />


        </Routes>
      </BrowserRouter>


    </div>
  );
}


export default App;
export {User};
