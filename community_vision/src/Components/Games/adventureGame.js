/* 
Adventure Game
Main game file - in progress

@Author: Emily, Natalie, Aron
*/

import React, { useState, forwardRef, useImperativeHandle } from 'react';
import '../../App.css';
import {morseToChar} from "./charMorseConv";
import useSound from 'use-sound';
import dashSound from '../Assets/Sounds/dash.mp3'
import dotSound from '../Assets/Sounds/dot.mp3'
import {animated, useSpring} from 'react-spring';
import {initial, Buttons, ButtonsWithoutInput, resetInputTime, resetInputLength, BackButton} from "./Common/Functions";
import spacebar from "../Assets/Images/spacebar.png";
import enterButton from "../Assets/Images/enterButton.png";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {Transition} from "react-spring/renderprops";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import {useHistory} from "react-router-dom";
import {Link} from "react-router-dom";

//Pictures!
import cabImage from "./adventureGamePics/Cab.jfif";
import barnImage from "./adventureGamePics/Barn.jpg";
import farmImage from "./adventureGamePics/Farm.png";
import forestImage from "./adventureGamePics/Forest.jpg";
import houseImage from "./adventureGamePics/House.jfif";

var textIndex = 0;
var t;

function buttonClick (clicked, notClicked){
    document.getElementById(clicked).style.fontSize = '5vh';
    document.getElementById(clicked).style.backgroundColor = 'White';
    document.getElementById(clicked).style.outlineColor = 'Red';
    document.getElementById(notClicked).style.outlineColor = "Grey";
    document.getElementById(notClicked).style.fontSize = '4vh';
    document.getElementById(notClicked).style.backgroundColor = 'Grey';
}

function updateTutorial() {
    var space = document.getElementById('spaceImage');
    var enter = document.getElementById('enterImage');

    if (textIndex === 0) {
        document.getElementById('tutorialText').innerHTML = 'This game consists of two buttons at the bottom of the page.';
        textIndex++;

    } else if (textIndex === 1) {
        document.getElementById('tutorialText').innerHTML = 'This button is used for the dots and can be accessed through the space button or by clicking here!';
        document.getElementById('dotButton').style.backgroundColor = "yellow";
        space.style.display = "block";
        textIndex++;
        
    } else if (textIndex === 2) {
        document.getElementById('dotButton').style.backgroundColor = document.getElementById('dashButton').style.backgroundColor;
        document.getElementById('tutorialText').innerHTML = 'This button is used for the dashes and can be accessed through the enter button or by clicking here!';
        document.getElementById('dashButton').style.backgroundColor = "yellow";
        space.style.display = "none";
        enter.style.display = "block";
        textIndex++;

    } else if (textIndex === 3) {
        document.getElementById('dashButton').style.backgroundColor = document.getElementById('dotButton').style.backgroundColor;
        document.getElementById('tutorialText').innerHTML = 'Enter any Morse code and see what letter or number it is!';
        //document.getElementById('sampleMorse').style.backgroundColor = "yellow";
        enter.style.display = "none";
        textIndex = 0;
    }
}

const adventureGame = forwardRef((props, ref) => {
    //Lines 19-22 Just lets you go back to previous pages
    const history = useHistory();
    function backToGames() {
        history.push("/GamesThemes");
    }

    //Inputs
    var [input, setInput] = React.useState('');
    var output = morseToChar(input);

    //Variables
    const [backgroundPicture, setBackgroundPicture] = useState();
    const [volume, setVolume] = useState(() => initial('volume'));
    const [size, setSize] = useState(() => initial('size'));
    const [speed, setSpeed] = useState(() => initial('speed'));
    const [backgroundColor, setBackgroundColor] = useState(() => initial('backgroundColor'));
    const [buttonColor, setButtonColor] = useState(() => initial('buttonColor'));
    const [dashButtonColor, setDashButtonColor] = useState(() => initial('dashButtonColor'));
    const [dotButtonColor, setDotButtonColor] = useState(() => initial('dotButtonColor'));
    const [fontColor, setFontColor] = useState(() => initial('fontColor'));
    const resetTimer = speed * 1000; //reset timer in milliseconds

    const [playDash] = useSound(
        dashSound,
        { volume: volume / 100 }
    );
    const [playDot] = useSound(
        dotSound,
        { volume: volume / 100 }
    );

    function clearStage() {
        setStartScreen(false);
        setEndScreen(false);
        setCabScreen(false);
        setFarmScreen(false);
        setHouseScreen(false);
        setForestScreen(false);
        setBarnScreen(false);

        setWord("");
    }
    
    function checkCurrentWord() {
        //Don't know why switch doesn't work but a bunch of if's do.
        if(currentWord === "TEST") {
            setCurrentScreen("End");
            setBackgroundPicture();
            clearStage();
            setEndScreen(true);
        }
        if(currentWord === "CAB") {
            setCurrentScreen("Cab");
            setBackgroundPicture(cabImage);
            clearStage();
            setCabScreen(true);
        }
        if(currentWord === "FARM") {
            setCurrentScreen("Farm");
            setBackgroundPicture(farmImage);
            clearStage();
            setFarmScreen(true);
        }
        if(currentWord === "HOUSE") {
            setCurrentScreen("House");
            setBackgroundPicture(houseImage);
            clearStage();
            setHouseScreen(true);
        }
        if(currentWord === "FOREST") {
            setCurrentScreen("Forest");
            setBackgroundPicture(forestImage);
            clearStage();
            setForestScreen(true);
        }
        if(currentWord === "BARN") {
            setCurrentScreen("Barn");
            setBackgroundPicture(barnImage);
            clearStage();
            setBarnScreen(true);
        }
        
        // switch(currentWord) {
        //     case "TEST":
        //         clearStage();
        //         setEndScreen(true);
        //     case "CAB":
        //         clearStage();
        //         setCabScreen(true);
        //         break;
        //     case "FARM":
        //         clearStage();
        //         setFarmScreen(true);
        //         break;
        //     case "HOUSE":
        //         clearStage();
        //         setFarmScreen(true);
        //         break;
        //     case "FOREST":
        //         clearStage();
        //         setForestScreen(true);
        //         break;
        //     case "BARN":
        //         clearStage();
        //         setBarnScreen(true);
        //         break;
        // }
    }

    //This will reset the inputted morse depending on length/time
    resetInputLength(input, setInput);
    clearTimeout(t);
    t = setTimeout(function(){
        if(output != ' '){
        setWord(currentWord + output);
        }
        setInput('');
        checkCurrentWord();
    }, resetTimer);
    resetInputLength(input, setInput);

    const [handleKeyDown, setHandleKeyDown] = useState(true);
    document.onkeydown = function (evt) {
        //Prevents "holding" a button down.
        if (!handleKeyDown) return;
        setHandleKeyDown(false);

        //If "Space"
        //".keyCode" is deprecated, but required?
        if (evt.keyCode === 32) {
            setInput(input + '•');
            playDot();
        }
        //If "Enter"
        if (evt.keyCode === 13) {
            setInput(input + '-');
            playDash();
        }
    };

    document.onkeyup = function (evt) {
        setHandleKeyDown(true);
        //I'm not sure what the use of
        //document.activeElement.blur();
    };

    //Stuff to make it look prettier
    //TODO: Test if Gems work
    const [gemScore, setGems] = useState(0);
    const gemDisplay = "";
    for (var i = 0; i < gemScore; i++) { gemDisplay = gemDisplay + "GEM "; }

    const [currentWord, setWord] = useState("");

    //Screens have to be boolean in order to set items to "true" or "false" without checks.
    const [startScreen, setStartScreen] = useState(true);
    const [endScreen, setEndScreen] = useState(false);
    const [cabScreen, setCabScreen] = useState(false);
    const [farmScreen, setFarmScreen] = useState(false);
    const [houseScreen, setHouseScreen] = useState(false);
    const [forestScreen, setForestScreen] = useState(false);
    const [barnScreen, setBarnScreen] = useState(false);

    const [currentScreen, setCurrentScreen] = useState("Start");

    useImperativeHandle(
        ref,
        () => ({
            update() {
                setVolume(initial('volume'));
                setSize(initial('size'));
                setSpeed(initial('speed'));
                setBackgroundColor(initial('backgroundColor'));
                setDashButtonColor(initial('dashButtonColor'));
                setDotButtonColor(initial('dotButtonColor'));
                setFontColor(initial('fontColor'));
                setButtonColor(initial("buttonColor"));
            }
        }),
    )

    return (
        //This is the "Main" screen
        <div style={{
            // backgroundColor: backgroundColor,
            backgroundImage: `url(${backgroundPicture})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'grid',
            gridTemplate: '8fr 8fr / 1fr',
            gridTemplateAreas: '"top" "middle" "bottom'
        }}>
            
            <Transition //Tutorial transition, "Start Screen"
                items={startScreen}
                duration={500}
                from={{ opacity: 0 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}>
                {toggle =>
                    toggle
                        ? props => <div style={{
                            position: 'absolute',
                            width: '100vw',
                            height: '90vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1,
                            ...props
                        }}>
                            <div style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'black',
                                opacity: 0.7
                            }} />
                            <Grid container direction='column' justify='center' alignItems='center' style={{ height: '100%', width: '100%', zIndex: 1 }}>
                                <Grid item style={{ userSelect: 'none', cursor: 'default' }}>
                                    <Card>
                                        <h1 style={{
                                            marginBottom: '0vh',
                                            fontSize: '8vh'
                                        }}>Adventure Game
                                        </h1>
                                        <br />
                                        <p id= "instructions" style={{
                                            marginTop: '0vh',
                                            paddingLeft: '2vw',
                                            paddingRight: '2vw',
                                            fontSize: '4vh',
                                            display: 'none'
                                        }}>Type the morse of the letters to explore the map!
                                        </p>
                                    </Card>
                                        <Grid id = "pr" container direction = 'row' justify='center' alignItems='center'>
                                            <h1 style={{
                                                fontSize: '4vh',
                                                backgroundColor: 'white'
                                            }}>Morse Prompts:
                                            </h1> 
                                            <Grid> 
                                                <button id = "yesPrompts" style={{ border: 'none','margin-left':'30px','margin-right':'30px', fontSize: '5vh', cursor: 'pointer', 'outline-style':'solid','outline-width':'thick'}} 
                                                onMouseDown={function () {
                                                    buttonClick("yesPrompts","noPrompts");
                                                    }}>
                                                    Yes                  
                                                </button>

                                                <button id = "noPrompts" style={{ border: 'none',fontSize: '5vh', cursor: 'pointer', 'outline-style':'solid', 'outline-width':'thick'}} onMouseDown={function () {
                                                    buttonClick("noPrompts","yesPrompts");
                                                    }}>
                                                    No                   
                                                </button> 
                                            </Grid>
                                        </Grid>
                                </Grid>
                                <br />
                                <Grid item style={{ userSelect: 'none' }}>
                                <Card>
                                    <button id = "doneOptions" style={{ fontSize: '8vh', height: '100%', width: '100%', cursor: 'pointer' }}
                                            onMouseDown={function () {
                                                var start = document.getElementById("start");
                                                start.style.display = "block";
                                                var done = document.getElementById("doneOptions");
                                                done.style.display = "none";
                                                var instructions = document.getElementById("instructions");
                                                instructions.style.display = "block";
                                                var prom = document.getElementById("pr");
                                                prom.style.display = "none";
                                            }}>
                                            Done
                                        </button>
                                        </Card>
                                    <Card>
                                        <button id= "start" style={{display: 'none', fontSize: '8vh', height: '100%', width: '100%', cursor: 'pointer' }}
                                            onMouseDown={function () {
                                                if (startScreen) {
                                                    //setState("home");
                                                    setStartScreen(false);
                                                }
                                            }}>
                                            Press Enter ('dash') to Start
                                        </button>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                        : props => <div />
                }
            </Transition>

            <Transition> //CabScreen
                items = {cabScreen};
            </Transition>

            <Transition> //FarmScreen
                items = {farmScreen};
            </Transition>

            <Transition> //HouseScreen
                items = {houseScreen};
            </Transition>

            <Transition> //ForestScreen
                items ={forestScreen}
            </Transition>

            <Transition> //BarnScreen
                items = {barnScreen};
            </Transition>
            
            <div style={{gridArea: 'top', position: 'absolute'}}>
                <Container>
                    <Link className='nav-link' to="/GamesThemes">
                        <button style={{
                            height: '90%',
                            width: '100%',
                            fontSize: '4vh',
                            fontWeight: 800,
                            userSelect: 'none',
                            cursor: 'pointer',
                        }}>Back</button>
                    </Link>              
                    <Grid item>
                        <div style={{
                            position: 'absolute',
                            left: '1vw',
                            top: '9vh',
                            fontSize: '3vh',
                            pointer: 'default',
                            userSelect: 'none',
                            color: fontColor
                        }}>
                            <p>
                                Current Word: {currentWord}
                            </p>
                            <p>
                                Current Score: {gemDisplay}
                            </p>
                            <p>
                                Current Stage: {currentScreen}
                            </p>
                        </div>
                    </Grid>
                </Container>
            </div>

            <Transition //End Screen
                items={endScreen}
                duration={500}
                from={{ opacity: 0 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}>
                {toggle =>
                    toggle
                        ? props => <div style={{
                            position: 'absolute',
                            width: '100vw',
                            height: '90vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1,
                            ...props
                        }}>
                            <div style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'black',
                                opacity: 0.7
                            }} />
                            <Grid container justify='center' alignItems='center' style={{ height: '100%', width: '100%', zIndex: 1 }}>
                                <Grid item xs={9} style={{ userSelect: 'none', color: fontColor }}>
                                    <Card>
                                        <h1 style={{
                                            marginBottom: '0vh',
                                            fontSize: '8vh'
                                        }}>
                                        </h1>
                                        <br />
                                        <p style={{
                                            marginTop: '0vh',
                                            paddingLeft: '2vw',
                                            paddingRight: '2vw',
                                            fontSize: '8vh',
                                            marginBottom: '0vh'
                                        }}>
                                        </p>
                                    </Card>
                                </Grid>
                                <Grid item xs={4} style={{ userSelect: 'none' }}>
                                    <Card>
                                        <button style={{ fontSize: '8vh', cursor: 'pointer', height: '100%', width: '100%' }}
                                            onMouseDown={function () {
                                                if (endScreen) {
                                                    backToGames();
                                                }
                                            }}>
                                            Other Games (•)
                                        </button>
                                    </Card>
                                </Grid>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={4} style={{ userSelect: 'none' }}>
                                    <Card>
                                        <button style={{ fontSize: '8vh', cursor: ' pointer', height: '100%', width: '100%' }}
                                            onMouseDown={function () {
                                                if (endScreen) {
                                                    setGems(0);
                                                    setEndScreen(false);
                                                }
                                            }}>
                                            More Practice (-)
                                        </button>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                        : props => <div />
                }
            </Transition>

            <div style={{ gridArea: 'middle' }}>
                <Container>
                    <Grid container justify='center' spacing={0}>
                        <Grid item xs={1}>
                            <p style={{
                                lineHeight: 0,
                                color: fontColor,
                                fontSize: '10vh',
                                pointer: 'default',
                                userSelect: 'none'
                            }}> &nbsp; </p>
                        </Grid>
                        <Grid item sm={10}>
                            <p style={{
                                lineHeight: 0,
                                color: fontColor,
                                fontSize: '10vh',
                                textAlign: 'center',
                                pointer: 'default',
                                userSelect: 'none'
                            }}>{input}</p>
                        </Grid>
                        <Grid item xs={1}>
                            <p style={{
                                lineHeight: 0,
                                color: fontColor,
                                fontSize: '10vh',
                                pointer: 'default',
                                userSelect: 'none'
                            }}> &nbsp; </p>
                        </Grid>
                    </Grid>
                    <Grid container justify='center' spacing={2}>
                        <Grid item xs={4}>
                            <Card>
                                {/* button updates */}
                                <CardActionArea>
                                    <button id="dotButton" style={{
                                        backgroundColor: dotButtonColor,
                                        width: '100%',
                                        height: '20vh',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        fontSize: '35vh',
                                        color: fontColor,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }} onMouseDown={function () {
                                        setInput(input + '•');
                                        playDot();
                                        clearTimeout(t);
                                        t = resetInputTime(t, input, setInput, resetTimer);
                                    }}>
                                        <span
                                        >•
                                        </span>
                                    </button>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card>
                                <CardActionArea>
                                    <button id="dashButton" style={{
                                        backgroundColor: dashButtonColor,
                                        width: '100%',
                                        height: '20vh',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        fontSize: '35vh',
                                        color: fontColor,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }} onMouseDown={function () {
                                        setInput(input + '-');
                                        playDash();
                                        clearTimeout(t);
                                        t = resetInputTime(t, input, setInput, resetTimer);
                                    }}>
                                        -
                                    </button>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            
        </div>
    );
})

const Radio = () => {
    const [isToggled, setToggle] = useState(false);
    const menubg = useSpring({ background: isToggled ? "#6ce2ff" : "#ebebeb" });
    const { y } = useSpring({
        y: isToggled ? 180 : 0
    });
    const menuAppear = useSpring({
        transform: isToggled ? "translate3D(0,0,0)" : "translate3D(0,-40px,0)",
        opacity: isToggled ? 1 : 0
    });

    return (
        <div style={{ position: "relative", width: "300px", margin: "0 auto" }}>
            <animated.button
                style={menubg}
                className="radiowrapper"
                onClick={() => setToggle(!isToggled)}
            >
                <div className="radio">
                    <p>Tutorial</p>
                    <animated.p
                        style={{
                            transform: y.interpolate(y => `rotateX(${y}deg)`)
                        }}
                    >
                        ▼
                    </animated.p>
                </div>
            </animated.button>
            <animated.div style={menuAppear}>
                {isToggled ? <RadioContent /> : null}
            </animated.div>
        </div>
    );
};

const RadioContent = () => {
    return (
        <div className="radiocontent" >
            <a href="#" alt="Home">
            </a>
            <p id="tutorialText" value="Change Text">Welcome to the Tower Stack game!</p>
            <img src={spacebar} alt="Spacebar" id="spaceImage" style={{ display: "none" }}></img>
            <img src={enterButton} alt="Enter Button" id="enterImage" style={{ display: "none" }}></img>
            <button onClick={function () {
                updateTutorial();
            }} style={{ fontSize: '5vh' }}>Next</button>
        </div>
    );
};

export default adventureGame;