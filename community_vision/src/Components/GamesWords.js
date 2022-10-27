import React, { forwardRef, useState, useImperativeHandle } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import LearnAlphabetIMG from "./Games/LearnAlphabet.jpg" //test image (pig)
import LearnABCIMG from "./Games/Icons/learn words.png"
import needleImg from "./Games/Icons/learn words 2.jpg"
import unicycleImg from "./Games/Icons/learn words 3.jpg"
import { Container } from '@material-ui/core';

/**
 * This file is the menu of games for
 * Learn Morse Words 
 */
const GamesWords = forwardRef((props, ref) => {
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
        <h1 style={{ fontSize: '8vh', color: fontColor, position: 'absolute', left: '32%', padding: 0, paddingTop: '20px', paddingBottom: '50px', margin: '1vh', userSelect: 'none', cursor: 'default' }}>Learn Morse Words</h1>
      </Grid>
      </Container>
      <Container maxWidth='xl' style={{ backgroundColor: backgroundColor, paddingBottom: '2vh', paddingTop: '3vh' }}>
        <Grid container justify='center' spacing={2}>
        <Grid item xs={6} sm={4} md={3} lg={2} xl={1}>
            <GameSelection name='First Letter - Prompts' img={LearnABCIMG} link='/learnWordBeginner' difficulty='Level 2' />
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2} xl={1}>
            <GameSelection name='First Letter - No Prompts' img={LearnABCIMG} link='/learnWordBeginner2' difficulty='Level 2' />
          </Grid>
          <Grid id ="medWords" item xs={6} sm={4} md={3} lg={2} xl={1}>
            <GameSelection id="medWords" name='Whole Word - Prompts' img={needleImg} link='/learnWordMedium' difficulty='Level 3' />
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2} xl={1}>
            <GameSelection name='Whole Word - No Prompts' img={unicycleImg} link='/learnWordAdvanced' difficulty='Level 4' />
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

export default GamesWords;