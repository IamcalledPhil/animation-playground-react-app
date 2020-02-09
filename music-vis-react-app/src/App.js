import React from 'react';
import './App.css';
import { motion } from "framer-motion"


// https://codepen.io/jakebown/pen/weoVxg
// https://codepen.io/CarlosEME/pen/XWWpVMp

class PulseCircle extends React.Component  {

  constructor(props){
    super(props)
    this.onAnimationComplete = props.onAnimationComplete;
    this.index = props.index;
  }

  onComplete = () => {
    this.onAnimationComplete(this.index);
  }

  render() {
    return (
      <g>
        <motion.circle className="pulse-anim" 
          cx={this.props.x} cy={this.props.y} r="10"
  
          animate={{ 
            scale: [1, 1.4, 1, 1],
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
            times: [0, 0.2, 0.8, 1],
          }}
        />
      </g>
    );
  }

}

function PulseCircles(props) {
  if (props.pulseCircles.length > 0){
    const pulseCircles = props.pulseCircles.map((pulseCircle, index) => {
      return (
        <PulseCircle 
          key={index} 
          x={pulseCircle.x} 
          y={pulseCircle.y} 
          index={index}
        />
      )
    })
    return pulseCircles;
  } else {
    return null;
  }
}

class ArtBoard extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      pulseCircles: []
    }
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
    const newPulseCircle = [{x: this.alert_coords(e).x, y: this.alert_coords(e).y }]
    this.setState({ pulseCircles: this.state.pulseCircles.concat(newPulseCircle) });
    console.log(this.state.pulseCircles);
    if (this.state.pulseCircles.length > 8){
      this.removeExcessCircles();
    }
  }

  removeExcessCircles = () => {
    console.log(this.state);
    const pulseCircles = this.state.pulseCircles;

    this.setState({
      pulseCircles: pulseCircles.filter((pulseCircle, i) => {
        return i !== 0
      })
    })
  }

  render () {
    return (
      <div className="artboard-container" onMouseDown={this.onMouseDown}> 
        <svg  viewBox="0 0 100 100" ref={this.artboardRef}>
          <PulseCircles pulseCircles={this.state.pulseCircles}/>
        </svg>
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
