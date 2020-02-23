import React from 'react';

import PulseCircles from './PulseCircles';
import RandomAnts from './RandomAnts';
import Butterflies from './Butterflies';
import {CircleIcon, AntsIcon, ButterfliesIcon, ClearIcon} from './ButtonIcons';

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
        <div className="artboard-container" > 
          <svg  viewBox="0 0 200 100" 
            ref={this.artboardRef} 
            onMouseDown={this.onMouseDown}
            className="artboard">
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
          <button onClick={() => {this.selectTool("pulseCircles")}}>
            <CircleIcon/>
          </button>
          <button onClick={() => {this.selectTool("randomAnts")}}>
              <AntsIcon/>
          </button>
          <button onClick={() => {this.selectTool("butterflies")}}>
              <ButterfliesIcon/>
          </button>
          <button onClick={this.clear} className="clear-button">
              <ClearIcon/>
            </button>
        </div>
      )
    }
  }

  export default ArtBoard;