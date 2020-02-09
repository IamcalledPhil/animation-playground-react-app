import React from 'react';
import './App.css';
import { motion } from "framer-motion"


// https://codepen.io/jakebown/pen/weoVxg
// https://codepen.io/CarlosEME/pen/XWWpVMp

function PulseCircle(props) {

  return (
    <g>
      <motion.circle className="pulse-anim" 
        cx={props.x} cy={props.y} r="10"

         
        animate={{ 
          scale: [1, 1.4, 1, 1],
        }}
        transition={{
          duration: 1,
          ease: "easeOut",
          times: [0, 0.2, 0.8, 1],
        }}
        onAnimationComplete={props.onAnimationComplete}
      />
    </g>
  );
}

function PulseCircles(props) {
  if (props.pulseCircles.length > 0){
    const pulseCircles = props.pulseCircles.map((pulseCircle, i) => {
      return (
        <PulseCircle key={i} x={pulseCircle.x} y={pulseCircle.y} onAnimationComplete={props.onAnimationComplete} />
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
    console.log("(" + cursorpt.x + ", " + cursorpt.y + ")");
    return({
      x: cursorpt.x, 
      y: cursorpt.y
    })
  }

  onMouseDown(e) {
    const newPulseCircle = [{x: this.alert_coords(e).x, y: this.alert_coords(e).y }]
    this.setState({ pulseCircles: this.state.pulseCircles.concat(newPulseCircle) });
    console.log(this.state);
  }

  onAnimationComplete(){
    console.log('done');
  }

  render () {
    return (
      <div className="artboard-container" onMouseDown={this.onMouseDown}> 
        <svg  viewBox="0 0 100 100" ref={this.artboardRef}>
          <PulseCircles pulseCircles={this.state.pulseCircles} onAnimationComplete={this.onAnimationComplete}/>
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
