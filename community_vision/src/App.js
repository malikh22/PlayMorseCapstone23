import React, { useState, useRef } from 'react';
import './App.css';
import Home from './Components/Home';
import Nav from './Components/Nav';
import Games from './Components/Games';
import About from './Components/About';
import GettingStarted from './Components/GettingStarted';
import SettingsPage from './Components/SettingsPage'
import LearnAlphabet from './Components/Games/LearnAlphabet';
import Dots from './Components/Games/LearnWord/Dots';
import Dashes from './Components/Games/LearnWord/Dashes';
import OneAndTwoHit from './Components/Games/oneAndTwoHit';
import ThreeHit from './Components/Games/threeHit';
import FourHit from './Components/Games/fourHit';
import ChooseYourLetters from './Components/Games/ChooseYourLetters';
import LearnWordAdvanced from './Components/Games/LearnWord/LearnWordAdvanced';
import LearnWordBeginner from './Components/Games/LearnWord/LearnWordBeginner';
import LearnWordMedium from './Components/Games/LearnWord/LearnWordMedium';
import AlphabetNoHelp from "./Components/Games/NoHelpAlphabet";
import SandboxLetters from "./Components/Games/SandboxLetters";
import TowerStack from "./Components/Games/towerStack";
import SandboxWords from "./Components/Games/SandboxWords";
import SortedAlphabet from "./Components/Games/sorted";
import LearnNumbers from "./Components/Games/learnNumbers";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ButtonsTutorial from "./Components/Games/buttonTutorial";
import AlphabetRace from './Components/Games/AlphabetRace';
import AlphabetRacePractice from './Components/Games/AlphabetRacePractice';
import PreCustomWords from './Components/Games/PreCustomWords'
import CustomWords2 from './Components/Games/CustomWords2'
import { initial } from "./Components/Games/Common/Functions";
import GamesBasics from "./Components/GamesBasics";
import GamesLetters from "./Components/GamesLetters";
import GamesThemes from "./Components/GamesThemes";
import GamesWords from "./Components/GamesWords";
import DotsNoPrompt from './Components/Games/LearnWord/dotsNoPrompt';
import DashesNoPrompt from './Components/Games/LearnWord/dashesNoPrompt';
import LearnWordBeginner2 from './Components/Games/LearnWord/LearnWordBeginner2';

function App() {
  const [backgroundColor, setBackgroundColor] = useState(() => '#e8e8e8');
  const currentRef = useRef();
  const navRef = useRef();
  const updatePage = (value) => {
    currentRef.current.update(value);
    setBackgroundColor('#e8e8e8');
  }
  const updateNav = (value) => {
    navRef.current.update();
    setBackgroundColor('#e8e8e8');
  }
  return (
    <Router>
      <div className="App" style={{ backgroundColor: backgroundColor }}>
        <Nav updateAppState={updatePage} ref={navRef} />
        <Switch>
          <Route path="/" exact>
            <Home ref={currentRef} />
          </Route>
          <Route path="/games">
            <Games ref={currentRef} />
          </Route>
          <Route path="/GamesBasics">
            <GamesBasics ref={currentRef} />
          </Route>
          <Route path="/GamesLetters">
            <GamesLetters ref={currentRef} />
          </Route>
          <Route path="/GamesThemes">
            <GamesThemes ref={currentRef} />
          </Route>
          <Route path="/GamesWords">
            <GamesWords ref={currentRef} />
          </Route>
          <Route path="/about">
            <About ref={currentRef} />
          </Route>
          <Route path="/settings">
            <SettingsPage updateAppState={updateNav} />
          </Route>
          <Route path="/learnAlphabet">
            <LearnAlphabet ref={currentRef} />
          </Route>
          <Route path="/oneAndTwoHit">
            <OneAndTwoHit ref={currentRef} />
          </Route>
          <Route path="/threeHit">
            <ThreeHit ref={currentRef} />
          </Route>
          <Route path="/fourHit">
            <FourHit ref={currentRef} />
          </Route>
          <Route path="/chooseYourLetters">
            <ChooseYourLetters ref={currentRef} />
          </Route>
          <Route path="/dots">
            <Dots ref={currentRef} />
          </Route>
          <Route path="/DotsNoPrompt">
            <DotsNoPrompt ref={currentRef} />
          </Route>
          <Route path="/dashes">
            <Dashes ref={currentRef} />
          </Route>
          <Route path="/DashesNoPrompt">
            <DashesNoPrompt ref={currentRef} />
          </Route>
          <Route path="/learnWordBeginner">
            <LearnWordBeginner ref={currentRef} />
          </Route>
          <Route path="/learnWordBeginner2">
            <LearnWordBeginner2 ref={currentRef} />
          </Route>
          <Route path="/learnWordAdvanced">
            <LearnWordAdvanced ref={currentRef} />
          </Route>
          <Route path="/learnWordMedium">
            <LearnWordMedium ref={currentRef} />
          </Route>
          <Route path="/noHelpAlphabet">
            <AlphabetNoHelp ref={currentRef}/>
          </Route>
          <Route path="/sandboxLetters">
            <SandboxLetters ref={currentRef}/>
          </Route>
          <Route path="/towerStack">
            <TowerStack ref={currentRef}/>
          </Route>
          <Route path="/sandboxWords">
            <SandboxWords ref={currentRef}/>
          </Route>
          <Route path="/learnNumbers">
            <LearnNumbers ref={currentRef}/>
          </Route>
          <Route path="/buttons">
            <ButtonsTutorial ref={currentRef} />
          </Route>
          <Route path="/sorted">
            <SortedAlphabet ref={currentRef} />
          </Route>
          <Route path="/alphabetRace">
            <AlphabetRace ref={currentRef} />
          </Route>
          <Route path="/gettingStarted">
            <GettingStarted ref={currentRef} />
          </Route>
          <Route path="/alphabetRacePractice">
            <AlphabetRacePractice ref={currentRef} />
          </Route>
          <Route path="/preCustomWords">
            <PreCustomWords ref={currentRef} />
          </Route>
          <Route path="/customWords2">
            <CustomWords2 ref={currentRef} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}



export default App;
