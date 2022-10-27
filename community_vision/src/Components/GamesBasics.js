import React, { forwardRef, useState, useImperativeHandle } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import LearnAlphabetIMG from "./Games/LearnAlphabet.jpg" //test image (pig)
import dotsIMG from "./Games/Icons/dots.jpg"
import dashIMG from "./Games/Icons/dash.png"
import hitIMG from "./Games/Icons/hitIMG.png"
import hit3IMG from "./Games/Icons/hit3IMG.png"
import hit4IMG from "./Games/Icons/hit4IMG.png"
import buttonsImg from "./Games/Icons/explore dot and dash.jpg"
import alphabetIMG from "./Games/Icons/learn morse patterns.jpg"
import { Container } from '@material-ui/core';

/**
 * This file is the menu of games for
 * Learn Morse Basics 
 */
const GamesBasics = forwardRef((props, ref) => {
  const [backgroundColor, setBackgroundColor] = useState(() => '#e8e8e8');
  const [fontColor, setFontColor] = useState(() => 'black');
  useImperativeHandle(
    ref,
    () => ({
      update() {
        setBackgroundColor('#e8e8e8');
        setFontColor('black');
      }
    }),
  )

  return (
    <div style={{
      backgroundColor: backgroundColor,
      position: 'relative',
      height: '90vh',
      width: '100vw',
      display: 'grid',
      gridTemplate: '1fr 4fr / 1fr',
      gridTemplateAreas: '"top" "bottom'
    }}>
      <Container maxWidth='x1' style={{ backgroundColor: backgroundColor, paddingBottom: '2vh' }}>
        <Grid container justify='left' space={4}>
         <Grid item xs={8} justify='left' style={{ height: '40%', paddingBottom: '6vh', paddingTop: '3vh'}}>
          </Grid>
        <h1 style={{ fontSize: '8vh', color: fontColor, position: 'absolute', left: '31%', padding: 0, paddingTop: '20px', paddingBottom: '50px', margin: '1vh', userSelect: 'none', cursor: 'default' }}>Learn Morse Basics</h1>
      </Grid>
      </Container>

      <Container maxWidth='xl' style={{ backgroundColor: backgroundColor, paddingBottom: '2vh', paddingTop: '3vh' }}>
        <Grid container justify='center' spacing={2}>
        <Grid item xs={6} sm={4} md={3} lg={2} xl={1}>
            <GameSelection name='Explore Dot and Dash' img={buttonsImg} link='/buttons' difficulty='Level 1' />
          </Grid>
        <Grid item xs={6} sm={4} md={3} lg={2} xl={1}>
            <GameSelection name='Dots - Prompts' img={dotsIMG} link='/dots' difficulty='Level 1'/>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2} xl={1}>
            <GameSelection name='Dots - No Prompts' img={dotsIMG} link='/DotsNoPrompt' difficulty='Level 1'/>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2} xl={1}>
            <GameSelection name='Dashes - Prompts' img={dashIMG} link='/dashes' difficulty='Level 1'/>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2} xl={1}>
            <GameSelection name='Dashes - No Prompts' img={dashIMG} link='/dashesNoPrompt' difficulty='Level 1'/>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2} xl={1}>
            <GameSelection name='1 and 2 Hit Letters' img={hitIMG} link='/oneAndTwoHit' difficulty='Level 1'/>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2} xl={1}>
            <GameSelection name='3 Hit Letters' img={hit3IMG} link='/threeHit' difficulty='Level 1'/>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2} xl={1}>
            <GameSelection name='4 Hit Letters' img={hit4IMG} link='/fourHit' difficulty='Level 1'/>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2} xl={1}>
            <GameSelection name='Learn Morse Patterns' img={alphabetIMG} link='/sorted' difficulty='Level 1' />
          </Grid>
        </Grid>
      </Container>
      <Link className='nav-link' to="/games" style={{
        backgroundColor: backgroundColor
      }}>
        <button style={{
          width: '40vw',
          fontSize: '5vh',
          fontWeight: 900,
          userSelect: 'none',
          cursor: 'pointer',
          marginBottom: "5vh",
          backgroundColor: '#21AAA4',
          borderColor: '#21AAA4',
          color: 'white',
        }}>Back to Games</button>
      </Link>

      <Link className='nav-link' to="/" style={{
        backgroundColor: backgroundColor
      }} onMouseUp={() => {
               window.open('https://docs.google.com/forms/d/1-Fy6sjP-xcLqWLefGCBUbdbZIKBPwEkvyng9boBpO58/edit', '_blank');
            }}>
        <button style={{
          width: '40vw',
          fontSize: '5vh',
          fontWeight: 900,
          userSelect: 'none',
          cursor: 'pointer',
          marginBottom: "5vh",
          backgroundColor: '#21AAA4',
          borderColor: '#21AAA4',
          color: 'white',
        }}>Give us Feedback!</button>
      </Link>
    </div>

  );
})

class GameSelection extends React.Component {
  render() {
    return (
      <div>
        <Link style={{ textDecoration: 'none' }} to={this.props.link}>
          <Card>
            <CardActionArea>
              <div style={{ width: '100%', paddingTop: '66.66%' }}>
                <img style={{ width: '100%', margin: '0%', padding: '0%', position: 'absolute', left: '0', top: '0' }} src={this.props.img} type="image/png" alt={LearnAlphabetIMG}/* this should be the default for if we don't have an image source*/ />
              </div>
              <p style={{ color: 'black', fontWeight: 'bold', margin: 0, padding: 0, display: 'block', backgroundColor: 'white', fontSize: '2.5vh' }} >{this.props.name}</p>
            </CardActionArea>
          </Card>
        </Link>
      </div>
    )
  }
}

export default GamesBasics;