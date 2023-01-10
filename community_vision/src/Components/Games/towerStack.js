/* 
Tower Stack
Main game file - in progress

@Author: Emily Hoppe, Natalie Tashchuk
Created: 10/12/22
Updated: 11/13/22, 11/23/22,
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
import {useHistory} from "react-router-dom";
import {Link} from "react-router-dom";

//Natalie:
import cheeseTS from './cheeseTS.png' //test image
import pattyTS from './pattyTS.png'
import tomatoTS from './tomatoTS.png'
import bunbottom from './bunbottom.png'
import buntop from './buntop.png'
import burgerIcon from './burgerIcon.png' //for side display

var textIndex = 0;


//For tutorial mode (probably)
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

var t;
//tower.push(x) to add to the tower
var tower = [];
var burgerList = []; //never will contain anything, just to hold length bc react is finnicky
//Main function - returns the html that is the webpage
const towerStack = forwardRef((props, ref) => {
    
    //when back button is pushed, return to previous page
    const history = useHistory();
    function backToGames() {
        history.push("/GamesThemes");
    }

    //using index to manage array length helps manage reset on page out
    var [index, setIndex] = useState(0); //Use state resets on page out automatically
    tower.length = index; //connects useState to tower's length
    var [burgers, setBurgers] = useState(0); //same idea but with burger icons
    burgerList.length = burgers; //array is empty, but had to do this bc react wasn't chill about a normal var

    //Ids of the HTML elements that need to be made visible/invisible
    var burgerIds = ['burger1','burger2', 'burger3', 'burger4', 'burger5']; //icons
    var towerIds = ['stack1', 'stack2', 'stack3', 'stack4', 'stack5']; //main burger elements

    var [input, setInput] = React.useState('');  //reads input in morse
    var output = morseToChar(input);  //converts morse into char

    //setup stuff:
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
    const fSize = size + 'vh';
    const tfSize = (size - 7) + "vh"; //slightly smaller for sake of tower
    const sfSize = size / 3 + 'vh';  //size comes from settings page value
    var [startScreen, setStartScreen] = useState(true);
    var [endScreen, setEndScreen] = useState(false); //main burger completion
    var [endScreen2, setEndScreen2] = useState(false); //5 burgers completed

    //Custom Timeout
    //adapted from sandboxWords
    clearTimeout(t);
    t = setTimeout(function(){
        if(output != ' '){ //only valid morse
        //index resets on page out (found example in 1,2 hit)
        setIndex(prevState => prevState + 1); //update tower height
        tower[index] = output; //update tower
        document.getElementById(towerIds[tower.length - 1]).style.visibility = "visible"; //make tower element visible
        }
        setInput(''); //reset morse input

        if(tower.length == 5){ //This is where endscreen is triggered
            if(burgerList.length == 4){ //check endscreen 2 (5 burgers complete)
                //make sure final elements become visible
                document.getElementById(towerIds[4]).style.visibility = "visible";
                document.getElementById('burger5').style.visibility = "visible";
                
                setEndScreen2(true); //trigger endscreen visuals

                //reset vars
                setBurgers(0);
                setIndex(0);
            } else {
                document.getElementById(towerIds[4]).style.visibility = "visible"; //make sure final element becomes visible
                setEndScreen(true); //trigger endscreen visuals
                
                setIndex(0); //reset stack

                //update burger icons
                setBurgers(prevState => prevState + 1);
                document.getElementById(burgerIds[burgers]).style.visibility = "visible"; 
            }
        }
    }, resetTimer);

    resetInputLength(input, setInput);

    const [handleKeyDown, setHandleKeyDown] = useState(true);
    document.onkeydown = function (evt) {
        if (!handleKeyDown) return; //
        setHandleKeyDown(false); //
        evt = evt || window.event;
        if (evt.keyCode === 32) { //press space
            if (startScreen) {
                setStartScreen(false);
            } else if (endScreen ) {
                setEndScreen(false); //exit end screen
                setIndex(0); //reset tower
                for (let i = 0; i < 5; i++){ //reset tower visuals
                    document.getElementById(towerIds[i]).style.visibility = "hidden";
                }
            } else if (endScreen2){
                setEndScreen2(false); //exit end screen
                setEndScreen(false); //make sure other screen wasn't triggered
                setIndex(0); //reset tower
                setBurgers(0); //reset icons
                for(let i = 0; i < 5; i++){ //clear all visuals
                    document.getElementById(burgerIds[i]).style.visibility = "hidden";
                    document.getElementById(towerIds[i]).style.visibility = "hidden";
                }
            } else {
                setInput(input + '•');
                playDot();
                document.getElementById('dotButton').focus();
            }

        } else if (evt.keyCode === 13) { //press enter
            if (startScreen) { //generalized so both keys start game
                setStartScreen(false);
            } else if (endScreen) {
                setEndScreen(false);
                setIndex(0);
                for (let i = 0; i < 5; i++){
                    document.getElementById(towerIds[i]).style.visibility = "hidden";
                }
            } else if (endScreen2){
                setEndScreen2(false); //exit end screen
                setEndScreen(false); //make sure other screen wasn't triggered
                setIndex(0); //reset tower
                setBurgers(0); //reset icons
                for(let i = 0; i < 5; i++){ //clear all visuals
                    document.getElementById(burgerIds[i]).style.visibility = "hidden";
                    document.getElementById(towerIds[i]).style.visibility = "hidden";
                }
            } else {
                setInput(input + '-');
                playDash();
                document.getElementById('dashButton').focus();
            }
        }
    };

    document.onkeyup = function (evt) { //
        setHandleKeyDown(true); //
        document.activeElement.blur(); //
    }; //

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
        
        <div style={{
            backgroundColor: backgroundColor,
            height: '90vh',
            width: '100vw',
            display: 'grid',
            gridTemplate: '8fr 8fr / 1fr',
            gridTemplateAreas: '"top" "middle" "bottom'
        }}>
            <Transition //code is originally from sandbox letters, but it's a good model for adding screens
                items={startScreen} //which screen is it
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
                            zIndex: 1, //controlls how forward it is on the display
                            ...props
                        }}>
                            <div id='startmenu' style={{ //visuals
                                //this div is the starting text that introduces the game
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
                                            //title of game
                                            marginBottom: '0vh',
                                            fontSize: '8vh'
                                        }}>Burger Stack
                                        </h1>
                                        <br />
                                        <p style={{
                                            //game instructions
                                            marginTop: '0vh',
                                            paddingLeft: '2vw',
                                            paddingRight: '2vw',
                                            fontSize: '4vh'
                                        }}>Type any Morse combination to add a letter to the burger.
                                        </p>
                                    </Card>
                                </Grid>
                                <br />
                                <Grid item style={{ userSelect: 'none' }}>
                                    <Card>
                                        <button id = "start" style={{ fontSize: '8vh', height: '100%', width: '100%', cursor: 'pointer' }}
                                                //start button 
                                                onMouseDown={function () { //if the user clicks with the mouse instead of space/enter
                                                    if (startScreen) {
                                                        setStartScreen(false);
                                                    }
                                                }}>
                                            Press any key to start
                                        </button>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                        : props => <div />
                }

            </Transition>
            <Transition 
                items={endScreen2 /* EndScreen2 - 5 burgers complete */}
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
                            zIndex: 11,
                            ...props
                        }}>
                            <div style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'black',
                                opacity: 0.7
                            }} />
                            <Grid container direction='column' justify='center' alignItems='center' style={{ height: '100%', width: '100%', zIndex: 10 }}>
                                <Grid item style={{ userSelect: 'none', cursor: 'default', zIndex:11 }}>
                                    <Card>
                                        <h1 style={{
                                            marginBottom: '0vh',
                                            fontSize: '8vh',
                                            zIndex: '10' 
                                        }}>You completed all five burgers!
                                        </h1>
                                        <br></br>
                                    </Card>
                                </Grid>
                                <br />
                                <Grid item style={{ userSelect: 'none' }}>
                                    <Card>
                                        <button id = "end2" style={{ fontSize: '8vh', height: '100%', width: '100%', cursor: 'pointer' }}
                                                onMouseDown={function () { //same code as space/enter
                                                    if (endScreen2) { 
                                                        setIndex(0);
                                                        setBurgers(0);
                                                        for(let i = 0; i < 5; i++){
                                                            document.getElementById(burgerIds[i]).style.visibility = "hidden";
                                                            document.getElementById(towerIds[i]).style.visibility = "hidden";
                                                        }                     
                                                        setEndScreen(false);
                                                        setEndScreen2(false);
                                                    }
                                                }}>
                                            Press any key to restart the game
                                        </button>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                        : props => <div />
                }
            </Transition>
            
            <Transition 
                items={endScreen /* EndScreen - burger finished */}
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
                            zIndex: 10,
                            ...props
                        }}>
                            <div style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'black',
                                opacity: 0.7
                            }} />
                            <Grid container direction='column' justify='center' alignItems='center' style={{ height: '100%', width: '100%', zIndex: 10 }}>
                                <Grid item style={{ userSelect: 'none', cursor: 'default', zIndex:10}}>
                                    <Card>
                                        <h1 style={{
                                            marginBottom: '0vh',
                                            fontSize: '8vh',
                                            zIndex: '10'
                                        }}>You completed the burger!
                                        </h1>
                                        <br></br>
                                    </Card>
                                </Grid>
                                <br />
                                <Grid item style={{ userSelect: 'none' }}>
                                    <Card>
                                        <button id = "end" style={{ fontSize: '8vh', height: '100%', width: '100%', cursor: 'pointer' }}
                                                onMouseDown={function () { //same code as space/enter
                                                    if (endScreen) {       
                                                        setIndex(0);
                                                        for (let i = 0; i < 5; i++){
                                                            document.getElementById(towerIds[i]).style.visibility = "hidden";
                                                        }               
                                                        setEndScreen(false);
                                                    }
                                                }}>
                                            Press any key to make more
                                        </button>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                        : props => <div />
                }
            </Transition>
            <div style={{gridArea: 'top'}}>
                <div style={{ position: 'absolute' }}>
                    <Container>
                        <Grid container justify='left'>
                            <Grid item>
                                <Link className='nav-link' to="/GamesThemes">
                                    <button style={{
                                        //back button
                                        height: '90%',
                                        width: '100%',
                                        fontSize: '4vh',
                                        fontWeight: 800,
                                        userSelect: 'none',
                                        cursor: 'pointer',
                                        marginBottom: "20px"
                                    }}>Back</button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Container>
                </div>

                <Grid container direction='row'  position= 'relative' style={{ zIndex: 3, display: 'flex', justifyContent: 'right', alignItems: 'right',}}>
                    <img src={burgerIcon} id = "burger5" alt="burger icon" style = {{ width:'4.5%', height:'4.5%', visibility: 'hidden'}} />
                    <img src={burgerIcon} id = "burger4" alt="burger icon" style = {{ width:'4.5%', height:'4.5%', visibility: 'hidden'}} />
                    <img src={burgerIcon} id = "burger3" alt="burger icon" style = {{ width:'4.5%', height:'4.5%', visibility: 'hidden'}} />
                    <img src={burgerIcon} id = "burger2" alt="burger icon" style = {{ width:'4.5%', height:'4.5%', visibility: 'hidden'}} />
                    <img src={burgerIcon} id = "burger1" alt="burger icon" style = {{ width:'4.5%', height:'4.5%', visibility: 'hidden'}} />
                </Grid>

                <div>

                    <animated.h1 id = "output" style={{ //HIDDEN display of character
                        //Hid all three of these to create space for the towers
                        lineHeight: 0,
                        color: fontColor,
                        fontSize: tfSize, //smaller font slightly for tower 
                        minHeight: '90%',
                        display: 'none',
                    }}>{output}</animated.h1>
                   
                    <Grid container direction='column'  position= 'relative' style={{ zIndex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                    <img src={buntop} id = "stack5" alt="top bun of burger" style = {{ width:'27%', height:'8%', visibility: 'hidden', marginTop: '9%', zIndex:3}} />
                    <img src={tomatoTS} id = "stack4" alt="tomato" style = {{ width:'27%', height:'10%', visibility: 'hidden', marginTop: '-3%', zIndex:2}} />
                    <img src={cheeseTS} id = "stack3" alt="cheese" style = {{ width:'27%', height:'10%', visibility: 'hidden', marginTop: '-3%', zIndex:1}} />
                    <img src={pattyTS} id = "stack2" alt="burger patty" style = {{width:'27%', height:'10%', visibility: 'hidden', marginTop: '-3%', zIndex:0}} />
                    <img src={bunbottom} id = "stack1" alt="bottom bun of burger" style = {{ width:'27%', height:'8%', visibility: 'hidden', marginTop: '-3%', marginBottom: '-7%'}} />
                </Grid>

                    <animated.h1 id="input" style={{ //HIDDEN display of morse input
                        //an attempt to reorganize the screen to get space for the tower
                        lineHeight: 0,
                        color: fontColor,
                        fontSize: sfSize,
                        display: 'none'
                    }}>{input}</animated.h1>
                </div>
                <div>
                    <Grid container direction='column' justify-content='center' position= 'relative' alignItems='center' style={{ height: '100%', width: '100%', zIndex: 2 }}>
                    <animated.h1 id = "output" style={{ //Display Letter
                        //determine where current letter should display on screen
                        lineHeight: 0,
                        right: '50%',
                        bottom: '65%',
                        transform: 'translate(50%,50%)',
                        position: 'absolute',
                        color: fontColor,
                        fontSize: tfSize //smaller font slightly for tower  
                    }}>{output} </animated.h1>

                    <animated.h1 id="input" position= 'relative' style={{ //Display Morse
                        //determines where current morse input should display on screen
                        lineHeight: 0,
                        color: fontColor,
                        fontSize: sfSize,
                        right: '50%',
                        bottom: '62%',
                        transform: 'translate(50%,50%)',
                        position: 'absolute'
                    }}>{input}</animated.h1>
                 

                    <animated.h1 id="testing" style={{ //Test element to see internal functions
                        //displays most recent letter, the current height, and total number of burgers
                        lineHeight: 0,
                        color: fontColor,
                        fontSize: sfSize,
                        right: '88%',
                        bottom: '30%',
                        transform: 'translate(50%,50%)',
                        position: 'absolute',
                        display: 'none' //comment out to use
                    }}>{tower[tower.length - 1] + ' ' + tower.length + ' ' + burgers}</animated.h1>
                
                    </Grid>
                </div>
            </div>
            <ButtonsWithoutInput
                fontColor={fontColor}
                backgroundColor={backgroundColor}
                buttonColor={buttonColor}
                dotButtonColor={dotButtonColor}
                dashButtonColor={dashButtonColor}
                volume={volume}
                input={input}
                setInput={setInput}
            />

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
            <p id="tutorialText" value="Change Text">Welcome to the Burger Stack game!</p>
            <img src={spacebar} alt="Spacebar" id="spaceImage" style={{ display: "none" }}></img>
            <img src={enterButton} alt="Enter Button" id="enterImage" style={{ display: "none" }}></img>
            <button onClick={function () {
                updateTutorial();
            }} style={{ fontSize: '5vh' }}>Next</button>
        </div>
    );
};


export default towerStack;