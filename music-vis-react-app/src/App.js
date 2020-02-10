import React from 'react';
import PulseCircle from './components/PulseCircle';
import './App.css';
import { motion } from "framer-motion"

class RandomAnt extends React.Component {
  constructor(props){
    super(props)
    this.colours = [
      '#3D6CFF',
      '#3890E8',
      '#4AD5FF',
      '#38E8E2',
      '#3DFFC2'
    ];
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  render () {
    return (
      <g>
        <motion.path className="random-ant"
        d={`M${this.props.x} ${this.props.y} L${this.getRandomInt(0,100)} L${this.getRandomInt(0,100)} L${this.getRandomInt(0,100)}`}
        initial={{pathLength:0, opacity: 1}}
        animate={{pathLength:1, opacity: 0.1}}
        transition={{
          duration: 10,
          ease: "easeOut",
        }}
        />
      </g>
    )
  }
}

class RandomAnts extends React.Component {

  constructor(props){
    super(props)
    this.colours = [
      '#3D6CFF',
      '#3890E8',
      '#4AD5FF',
      '#38E8E2',
      '#3DFFC2'
    ]
  }

  render(){
    let colourIndex = 0;
    if (this.props.randomAnts.length > 0){
      const randomAnts = this.props.randomAnts.map((randomAnt, index) => {
        colourIndex = colourIndex >= this.colours.length-1 ? 0 : colourIndex +1;
        return (
          <RandomAnt 
            key={index} 
            x={randomAnt.x} 
            y={randomAnt.y} 
            colour={this.colours[colourIndex]}
          />
        )
      })
      return randomAnts;
    } else {
      return null;
    }
  }
}

class PulseCircles extends React.Component {

  constructor(props){
    super(props)
    this.colours = [
      '#3D6CFF',
      '#3890E8',
      '#4AD5FF',
      '#38E8E2',
      '#3DFFC2'
    ]
  }

  render(){
    let colourIndex = 0;
    if (this.props.pulseCircles.length > 0){
      const pulseCircles = this.props.pulseCircles.map((pulseCircle, index) => {
        colourIndex = colourIndex >= this.colours.length-1 ? 0 : colourIndex +1;
        return (
          <PulseCircle 
            key={index} 
            x={pulseCircle.x} 
            y={pulseCircle.y} 
            index={index}
            colour={this.colours[colourIndex]}
          />
        )
      })
      return pulseCircles;
    } else {
      return null;
    }
  }
}

class ArtBoard extends React.Component {
  
  constructor(props){
    super(props)
    this.initialState = {
      pulseCircles: [],
      randomAnts: [],
      currentTool: 'pulseCircles'
    }
    this.state = this.initialState;
    this.artboardRef = React.createRef();
    this.onMouseDown = this.onMouseDown.bind(this);
  }

  alert_coords(evt) {
    let svg = this.artboardRef.current;
    let pt = svg.createSVGPoint();  

    pt.x = evt.clientX;
    pt.y = evt.clientY;

    // The cursor point, translated into svg coordinates
    var cursorpt =  pt.matrixTransform(svg.getScreenCTM().inverse());
    return({
      x: cursorpt.x, 
      y: cursorpt.y
    })
  }

  onMouseDown(e) {
      const newElement = [{x: this.alert_coords(e).x, y: this.alert_coords(e).y }]
      if (this.state.currentTool === 'pulseCircles')
      {
        this.setState({ 
          pulseCircles: this.state.pulseCircles.concat(newElement),
         });
      } else if (this.state.currentTool === 'randomAnts')
      {
        this.setState({ 
          randomAnts: this.state.randomAnts.concat(newElement),
         });
      }
      
  }

  clear = () => {
    this.setState(this.initialState)
  }

  selectTool(toolName){
    this.setState({
      currentTool: toolName
    })
  }

  render () {
    return (
      <div className="artboard-container" onMouseDown={this.onMouseDown}> 
        <svg  viewBox="0 0 100 100" ref={this.artboardRef}>
          <PulseCircles 
          pulseCircles={this.state.pulseCircles}
          />
          <RandomAnts 
          randomAnts={this.state.randomAnts}
          />
        </svg>
        <button onClick={this.clear}> Clear</button>
        <button onClick={() => {this.selectTool("pulseCircle")}}>Circles</button>
        <button onClick={() => {this.selectTool("randomAnts")}}>Ants</button>
      </div>
    )
  }
}



class App extends React.Component {

  render () {
    return (
      <div className="App">
        <ArtBoard />
      </div>
    );
  }
  
}

export default App;
