import React from 'react';
import './App.css';
import { motion } from "framer-motion"

import PulseCircles from './components/PulseCircles';
import RandomAnts from './components/RandomAnts';


class Butterfly extends React.Component {

  renderButterflyWing(originX, originY, tx, rotation, opacity, rx, ry){
    return (
      <g>
        <motion.ellipse className="butterfly-wing"
          fill={this.props.colour}
          cx={this.props.x - tx}
          cy={this.props.y}
          opacity={opacity}
          style={{ originX: originX, originY: originY} }
          rx={rx}
          ry={ry}
          animate={{rotate: rotation, translateY: [1, 0, 1.3, 0, 0.5, 0, 1]}}
          transition={{
            duration: 1.5,
            loop: Infinity,
            times: [0, 0.35, 0.4, 0.73, 0.8, 0.95, 1]
          }}
        />
      </g>
       
    )
  }

  render() {
    return(
    <motion.g
      animate={{translateX: [0, 10, -10, 5, 20, -2, -1, 10], 
                translateY: [0, 5, -2, 10, -4, 25, 2, 5],
                scale: [1, 0.6, 1, 0.7, 1, 0.5, 1]
              }}
      transition={{
        duration: 12,
        yoyo: Infinity
      }}
    >
      {this.renderButterflyWing(0, 0.5, 0, [ 40, -20, 40, -20, 40, -20, 40], 1, 2, 1)}
      {this.renderButterflyWing(1, 0.5, 4.3, [ -40, 20, -40, 20, -40, 20, -40], 1, 2, 1)}
      {this.renderButterflyWing(0, 0.5, 0, [ 40, -20, 40, -20, 40, -20, 40], 0.4, 4, 2)}
      {this.renderButterflyWing(1, 0.5, 4.3, [ -40, 20, -40, 20, -40, 20, -40], 0.4, 4, 2)}
    </motion.g>

    )
  }
}

class Butterflies extends React.Component {

  constructor(props){
    super(props)
    this.colours = [
      '#FF5B17',
      '#E87115',
      '#FFA423',
      '#E8A515',
      '#FFCD17'
    ]
  }

  render(){
    let colourIndex = 0;
    if (this.props.butterflies.length > 0){
      const butterflies = this.props.butterflies.map((butterfly, index) => {
        colourIndex = colourIndex >= this.colours.length-1 ? 0 : colourIndex +1;
        return (
          <Butterfly 
            key={index} 
            index={index}
            x={butterfly.x} 
            y={butterfly.y} 
            colour={this.colours[colourIndex]}
          />
        )
      })
      return butterflies;
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
      butterflies: [],
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
      } else if (this.state.currentTool === 'butterflies')
      {
        this.setState({ 
          butterflies: this.state.butterflies.concat(newElement),
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
          <Butterflies
          butterflies={this.state.butterflies}
          />
        </svg>
        <button onClick={this.clear}> Clear</button>
        <button onClick={() => {this.selectTool("pulseCircles")}}>Circles</button>
        <button onClick={() => {this.selectTool("randomAnts")}}>Ants</button>
        <button onClick={() => {this.selectTool("butterflies")}}>Butterflies</button>
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
