import React, { useState, useImperativeHandle, forwardRef } from 'react';
import '../App.css';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Slider from '@material-ui/core/Slider';
import volumeDown from '../Components/Assets/Images/noSound.png';
import volumeUp from '../Components/Assets/Images/sound.png';
import hare from '../Components/Assets/Images/hare.png';
import tortoise from '../Components/Assets/Images/tortoise.png';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';
import { initial } from "./Games/Common/Functions";
import { CardActionArea } from '@material-ui/core';
import { useHistory } from "react-router-dom";
/*
* Settings.js
* Settings page contents when pressing gear icon in nav or when pressing 'Play Games!' button in home
*/

const Settings = forwardRef((props, ref) => {

    const history = useHistory();
    function moveTo(input) {
        history.push(input);
    }

    const [volume, setVolume] = useState(() => initial('volume'));
    const changeVolume = (event, newValue) => {
        localStorage.setItem('volume', newValue);
        setVolume(newValue);
        props.updateNavState(newValue);
        props.updateSettingsPageState(newValue);
    };
    const [size, setSize] = useState(() => initial('size'));
    const changeSize = (event, newValue) => {
        localStorage.setItem('size', newValue);
        setSize(newValue);
        props.updateNavState(newValue);
        props.updateSettingsPageState(newValue);
    };
    const [speed, setSpeed] = useState(() => 4.5 - initial('speed'));
    const changeSpeed = (event, newValue) => {
        localStorage.setItem('speed', (4.5 - newValue).toFixed(1));
        setSpeed(newValue);
        props.updateNavState(newValue);
        props.updateSettingsPageState(newValue);
    };
    const [backgroundColor, setBackgroundColor] = useState(() => initial('backgroundColor'));
    const changeBackgroundColor = (newValue) => {
        localStorage.setItem('backgroundColor', newValue);
        setBackgroundColor(newValue);
        props.updateNavState(newValue);
        props.updateSettingsPageState(newValue);
    };
    const [dotButtonColor, setDotButtonColor] = useState(() => initial('dotButtonColor'));
    const changeDotButtonColor = (newValue) => {
        localStorage.setItem('dotButtonColor', newValue);
        setDotButtonColor(newValue);
        props.updateNavState(newValue);
        props.updateSettingsPageState(newValue);
    };
    const [dashButtonColor, setDashButtonColor] = useState(() => initial('dashButtonColor'));
    const changeDashButtonColor = (newValue) => {
        localStorage.setItem('dashButtonColor', newValue);
        setDashButtonColor(newValue);
        props.updateNavState(newValue);
        props.updateSettingsPageState(newValue);
    };
    const [fontColor, setFontColor] = useState(() => initial('fontColor'));
    const changeFontColor = (newValue) => {
        localStorage.setItem('fontColor', newValue);
        setFontColor(newValue);
        props.updateNavState(newValue);
        props.updateSettingsPageState(newValue);
    };
    const fSize = size + 'vh';
    const isChecked = (type, color) => {
        if (type === color) {
            return true;
        } else if (type === 'theme') {
            if (color === 'default' && backgroundColor === '#e8e8e8' && fontColor === 'black' && dotButtonColor === 'yellow' && dashButtonColor === 'red') {
                return true;
            }
        }
        return false;
    };

    const backgroundPreview = {
        rectangle: {
            width: '70vh',
            height: '50vh',
            color: 'black',
            color: fontColor,
            fontSize: fSize,
            background: backgroundColor,
            margin: 'auto',
            position: 'relative',
            zIndex: '12',
        }
    };

    
    //OPTIONAL PLAY GAMES BUTTON ON SETTINGS PAGE WHEN VIEWING SETTINGS FROM PLAY GAMES BUTTON
    var playGames = <div></div>;
    if (window.location.href.slice(-8) === 'settings') {
        playGames =
            <div>
                <Grid item style={{ paddingTop: '5vh', paddingLeft: '5vw', paddingRight: '5vw' }}>
                    <Card onMouseUp={() => {
                        moveTo('/games');
                    }}>
                        <CardActionArea>
                            <button style={{
                                width: '100%',
                                height: '100%',
                                fontSize: '5vh',
                                textDecoration: 'none',
                                background: 'white',
                                borderColor: 'blue',
                                borderWidth: "1.5vh",
                                fontWeight: 900
                            }}>
                                Play Games!
            </button>
                        </CardActionArea>
                    </Card>
                </Grid>
            </div>
    }

    const dotPreview = {
        rectangle: {
            width: '20vh',
            height: '10vh',
            color: fontColor,
            fontSize: '15vh',
            display: 'flex',
            'justify-content': 'center',
            'align-items': 'center',
            'vertical-align': 'top',
            'vertical-align': 'middle',
            background: dotButtonColor,
            postion: 'relative',
            zIndex: '12',
        }
    };

    const dashPreview = {
        rectangle: {
            width: '20vh',
            height: '10vh',
            marginLeft: '10vh',
            color: fontColor,
            fontSize: '15vh',
            display: 'flex',
            'justify-content': 'center',
            'align-items': 'center',
            'vertical-align': 'middle',
            background: dashButtonColor,
            postion: 'relative',
            zIndex: '12',
        }
    };

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
            }
        }),
    )
        //GRID FOR THE SETTINGS OPTIONS
    return (
        <div style={{
            top: '0vh',
            height: '81vh',
            width: '100vw',
            bottom: '0vh',
            postion: 'relative',
            zIndex: '12',
        }}>
            <Card borderRadius='3vh'>
                <Grid style={{ height: '90vh', paddingTop: '2vh'}} container> 
                
                    <Grid style={{ marginLeft: '2px' , paddingRight: '50px'}} container direction='column' xs={6} spacing={1}> 
                    
                        <Grid item>
                            <h1 style={{ fontSize: '3vh', marginTop: '-0.2vh', cursor: 'default', userSelect: 'none'}}>Game Volume</h1>
                            <Grid container spacing={0} alignItems='center' style={{ marginTop: '-1vh', marginRight: '10vh' }}>
                                <Grid item xs={1}>
                                    <img style={{ cursor: 'default', userSelect: 'none' }} src={volumeDown} alt="volumeDown" id="volumeDownimg" width="15" height="20"></img>
                                </Grid>
                                <Grid item xs={10}>
                                    <Slider value={volume} onChange={changeVolume}
                                        valueLabelDisplay='auto' marks
                                        step={10} min={0} max={100}
                                        scale={x => x + '%'} />
                                </Grid>
                                <Grid item xs={1}>
                                    <img style={{ cursor: 'default', userSelect: 'none' , paddingRight: '20px'}} src={volumeUp} alt="volumeUp" id="volumeUpimg" width="20" height="20"></img>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item >
                            <h1 style={{ fontSize: '3vh', marginTop: '-0.2vh', cursor: 'default', userSelect: 'none' }}>Game Speed</h1>
                            <Grid container spacing={0} alignItems='center' width={'40%'} style={{ marginTop: '-1vh'}}>
                                <Grid item xs={1} width={'40%'}>
                                    <img style={{ cursor: 'default', userSelect: 'none' }} src={tortoise} alt="tortoise" id="tortoiseimg" width="20" height="20"></img>
                                </Grid>
                                <Grid item xs={10} width={'40%'}>
                                    <Slider value={speed} onChange={changeSpeed} style={{flex:0.4}}
                                        valueLabelDisplay="auto" marks
                                        step={0.2} min={0.5} max={4}
                                        scale={x => (4.5 - x).toFixed(1)}
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <img style={{ cursor: 'default', userSelect: 'none' }} src={hare} alt="hare" id="hareimg" width="20" height="20"></img>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <h1 style={{ fontSize: '3vh', marginTop: '-0.2vh', cursor: 'default', userSelect: 'none' }}>Text Size</h1>
                            <Grid container spacing={0} alignItems='center' width={'40%'} style={{ marginTop: '-2vh' }}>
                                <Grid item xs={1} />
                                <Grid item xs={10}>
                                    <Slider value={size} onChange={changeSize}
                                        valueLabelDisplay='auto' marks
                                        step={1} min={19} max={29} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item >
                            <div style={backgroundPreview.rectangle}>A a</div>
                            <Grid alignItems ='center' container direction= 'row' style={{position: 'relative', zIndex: 12, marginLeft: '20%', marginTop: '-15vh'}}>
                                <div style={dotPreview.rectangle}>•</div>
                                <div style={dashPreview.rectangle}>-</div>
                            </Grid>
                        </Grid> 
                    </Grid>
                    <Grid style={{ }} container direction='column' xs={6} spacing={1}>
                        <Grid item>
                            <Grid container direction='row' alignItems='center' justify='center'>
                                <Grid item>
                                    <input style={{ cursor: 'pointer'  }} checked={isChecked('theme', 'default')} type="radio" id="defaultTheme" name="theme" value="default"
                                        onClick={() => {
                                            changeBackgroundColor('#e8e8e8');
                                            changeFontColor('black');
                                            changeDotButtonColor('yellow');
                                            changeDashButtonColor('red');
                                        }} />
                                </Grid>
                                <Grid item>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplate: '1fr 1fr / 1fr',
                                        gridTemplateAreas: '"1" "2"',
                                        width: '6vh',
                                        height: '6vh',
                                        marginBottom: '-1vh'
                                        
                                    }} onClick={function () {
                                        changeBackgroundColor('#e8e8e8');
                                        changeFontColor('black');
                                        changeDotButtonColor('yellow');
                                        changeDashButtonColor('red');
                                    }}>
                                        <button style={{ gridArea: '1', backgroundColor: '#e8e8e8', width: '3vh', height: '3vh', borderStyle: 'solid', cursor: 'pointer' }} />
                                        <button style={{ gridArea: '1', backgroundColor: 'black', width: '3vh', height: '3vh', borderStyle: 'solid', cursor: 'pointer'  }} />
                                        <button style={{ gridArea: '2', backgroundColor: 'yellow', width: '3vh', height: '3vh', borderStyle: 'solid', cursor: 'pointer' }} />
                                        <button style={{ gridArea: '2', backgroundColor: 'red', width: '3vh', height: '3vh', borderStyle: 'solid', cursor: 'pointer' }} />
                                    </div>
                                </Grid>
                                <Grid item>
                                    <h1 style={{ marginTop: '1vh', marginBottom: '-0.5vh', cursor: 'pointer', userSelect: 'none' }} onClick={function () {
                                        changeBackgroundColor('#e8e8e8');
                                        changeFontColor('black');
                                        changeDotButtonColor('yellow');
                                        changeDashButtonColor('red');
                                    }}>Default</h1>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container xs={0} direction='column' alignItems='center'>
                            <h1 style={{ fontSize: '3vh', marginTop: '-0.2vh', cursor: 'default', userSelect: 'none' , paddingTop: '25px', paddingBottom: '10px' }}>Background Color</h1>
                            <Grid container direction='column' style={{ marginTop: '-1vh'}}>
                                    <Grid item>
                                        <ColorPicker style={{ cursor: 'pointer' }} color={backgroundColor} onColorChange={(value) => changeBackgroundColor(value)} />
                                    </Grid>
                                    <Grid item>
                                        <p style={{ margin: -2,  cursor: 'default', userSelect: 'none' }}></p>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <h1 style={{ gridArea: '1', fontSize: '3vh', marginTop: '-0.2vh', cursor: 'default', userSelect: 'none', paddingTop: '25px', paddingBottom: '10px'  }}>Dot Button Color</h1>
                            <Grid container direction='row' style={{ marginTop: '-1vh' }}>
                                <Grid container xs={0} direction='column' alignItems='center'>
                                    <Grid item>
                                        <ColorPicker style={{ cursor: 'pointer' }} color={dotButtonColor} onColorChange={(value) => changeDotButtonColor(value)} />
                                    </Grid>
                                    <Grid item>
                                        <p style={{ margin: -2, cursor: 'default', userSelect: 'none' }}></p>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <h1 style={{ gridArea: '2', fontSize: '3vh', marginTop: '-0.2vh', cursor: 'default', userSelect: 'none' , paddingTop: '25px', paddingBottom: '10px' }}>Dash Button Color</h1>
                            <Grid container direction='row' style={{ marginTop: '-1vh' }}>
                                <Grid container xs={0} direction='column' alignItems='center'>
                                    <Grid item>
                                        <ColorPicker style={{ cursor: 'pointer' }} color={dashButtonColor} onColorChange={(value) => changeDashButtonColor(value)} />
                                    </Grid>
                                    <Grid item>
                                        <p style={{ margin: -2, cursor: 'default', userSelect: 'none' }}></p>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <h1 style={{ gridArea: '2', fontSize: '3vh', marginTop: '-0.2vh', cursor: 'default', userSelect: 'none', paddingTop: '25px', paddingBottom: '10px' }}>Text Color</h1>
                            <Grid container direction='row' style={{ marginTop: '-1vh' }}>
                                <Grid container xs={0} direction='column' alignItems='center'>
                                    <Grid item>
                                        <ColorPicker style={{ cursor: 'pointer' }} color={fontColor} onColorChange={(value) => changeFontColor(value)} />
                                    </Grid>
                                    <Grid item>
                                        <p style={{ margin: -2, cursor: 'default', userSelect: 'none' }}></p>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            {playGames}
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </div >
    )
})

class ColorPicker extends React.Component {
    state = {
        displayColorPicker: false,
        color: this.props.color
    };

    componentDidUpdate(prevProps) {
        if (this.props.color !== prevProps.color) {
            this.setState({ color: this.props.color })
        }
    }

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChange = (color) => {
        this.props.onColorChange(color.hex)
    };

    render() {

        const styles = reactCSS({
            'default': {
                color: {
                    width: '5vh',
                    height: '5vh',
                    borderRadius: '2px',
                    background: this.state.color,
                    postion: 'relative',
                    zIndex: '12',
                },
                swatch: {
                    background: '#fff',
                    borderRadius: '2px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                    postion: 'relative',
                    zIndex: '12',
                },
                popover: {
                    position: 'absolute',
                    marginTop: '-250px',
                    marginLeft: '-180px',
                    postion: 'relative',
                    zIndex: '12',
                },
                cover: {
                    position: 'relative',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                    postion: 'relative',
                    zIndex: '12',
                },
            },
        });

        return (
            <div>
                <div style={styles.swatch} onClick={this.handleClick}>
                    <div style={styles.color} />
                </div>
                { this.state.displayColorPicker ? <div style={styles.popover}>
                    <div style={styles.cover} onClick={this.handleClose} />
                    <SketchPicker color={this.state.color} onChange={this.handleChange} />
                </div> : null}

            </div>
        )
    }
}


export default Settings;

