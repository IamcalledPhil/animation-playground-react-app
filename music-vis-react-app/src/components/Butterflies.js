import React from 'react';
import Butterfly from './Butterfly';
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

  export default Butterflies;