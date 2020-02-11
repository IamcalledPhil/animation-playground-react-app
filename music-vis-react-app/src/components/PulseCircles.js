import React from 'react';
import PulseCircle from './PulseCircle';

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

export default PulseCircles;