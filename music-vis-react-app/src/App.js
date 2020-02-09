import React from 'react';
import './App.css';
import { motion } from "framer-motion"


// https://codepen.io/jakebown/pen/weoVxg
// https://codepen.io/CarlosEME/pen/XWWpVMp

function PulseCircle(props) {


  return (
    <svg  viewBox="0 0 100 100">
      <motion.circle className="pulse-anim" 
        cx={props.x} cy={props.y} r="10"

         
        whileTap={{ 
          scale: [1, 1.4, 1, 1],
          x: props.x,
          y: props.y
        }}
        transition={{
          duration: 1,
          ease: "easeOut",
          times: [0, 0.2, 0.8, 1],
        }}
      />
    </svg>
  );
}

class ArtBoard extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      x: 0,
      y: 0
    }
    
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  onMouseMove(e) {
    this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }

  render () {
    return (
      <div className="artboard" onMouseMove={this.onMouseMove}> 
        <PulseCircle x={this.state.x} y={this.state.y}/>
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
