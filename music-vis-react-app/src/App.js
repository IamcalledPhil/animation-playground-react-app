import React from 'react';
import './App.css';
import { motion } from "framer-motion"

import PulseCircles from './components/PulseCircles';


class RandomAnt extends React.Component {
  constructor(props){
    super(props)
    this.path1 = this.generatePath('HVHVH');
    this.path2 = this.generatePath('VHVHV');
    this.blurId = "blur"+this.props.index;
  }

  getRandomInt() {
    return Math.floor(Math.random() * 100);
  }

  generatePath (directions) {
    let path = `M${this.props.x} ${this.props.y} `;
    for (const direction of directions){
      path = path.concat(`${direction}${this.getRandomInt()} `);
    }
    return path;
  }

  renderPath (path, colour, blurId) {
    return (
      <motion.path className="random-ant"
        stroke={colour}
        d={path}
        filter={"url(#"+blurId+")"}
        initial={{pathLength:0, opacity: 1}}
        animate={{pathLength:1, opacity: 0.1}}
        transition={{
          duration: 2,
          ease: "easeOut",
        }}
      />
    )
  }
  
  render () {
    return (
      <g>
        <filter id={this.blurId}>
          <motion.feGaussianBlur in="SourceGraphic" 
          initial={{stdDeviation:0.5}}
          animate={{stdDeviation:0}}
          transition={{
            duration: 0.5
          }} />
        </filter>
        {this.renderPath(this.path1, this.props.colour, this.blurId)}
        {this.renderPath(this.path2, this.props.colour, this.blurId)}
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
            index={index}
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
        <button onClick={() => {this.selectTool("pulseCircles")}}>Circles</button>
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
