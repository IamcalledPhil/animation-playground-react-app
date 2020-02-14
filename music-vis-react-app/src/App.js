import React from 'react';
import './App.css';
import { motion } from "framer-motion"

import PulseCircles from './components/PulseCircles';
import RandomAnts from './components/RandomAnts';


class FloatingBubble extends React.Component {

  getRandomInt() {
    return Math.floor(Math.random() * 100);
  }

  //make draggable
  render() {
    
    return (
        <motion.div className="floating-bubble"
          border='#ffffff'
          x={this.props.x}
          y={this.props.y}
          border-radius='5'
          width='20'
          height='20'
          animate={{rotate: [ 270, 0]}}
          drag
          transition={{
            duration: 2,
            ease: "linear",
            loop: "infinity"
          }}
        />
    )
  }

}

class ArtBoard extends React.Component {
  
  constructor(props){
    super(props)
    this.initialState = {
      pulseCircles: [],
      randomAnts: [],
      floatingBubble: false,
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
      } else if (this.state.currentTool === 'floatingBubble')
      {
        this.setState({ 
          floatingBubble: newElement,
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
          <FloatingBubble 
          x={this.state.floatingBubble.x} y={this.state.floatingBubble.y}
          />
        </svg>
        <button onClick={this.clear}> Clear</button>
        <button onClick={() => {this.selectTool("pulseCircles")}}>Circles</button>
        <button onClick={() => {this.selectTool("randomAnts")}}>Ants</button>
        <button onClick={() => {this.selectTool("floatingBubble")}}>Floating bubble</button>
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
