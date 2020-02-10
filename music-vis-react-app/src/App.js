import React from 'react';
import './App.css';
import { motion } from "framer-motion"


class PulseCircle extends React.Component  {

  constructor(props){
    super(props)
    this.index = props.index;
  }


  render() {
    return (
      <g>
          <motion.circle className="pulse-anim" 
            stroke={this.props.colour}
            cx={this.props.x} cy={this.props.y} r="10"
            initial= {{scale: .1,opacity: 1}}
            animate={{ 
              scale: [.1,8],
              opacity: [1,0]
            }}

            transition={{
              duration: 20,
              ease: "easeOut",
            }}
          />
      </g>
    );
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
    this.state = {
      pulseCircles: [],
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
      this.setState({ 
        pulseCircles: this.state.pulseCircles.concat(newPulseCircle),
       });
  }

  removeExcessCircles = () => {
    this.setState({
      pulseCircles: []
    })
  }

  render () {
    return (
      <div className="artboard-container" onMouseDown={this.onMouseDown}> 
        <svg  viewBox="0 0 100 100" ref={this.artboardRef}>
          <PulseCircles 
          pulseCircles={this.state.pulseCircles}
          />
        </svg>
        <button onClick={this.removeExcessCircles}> Clear</button>
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
