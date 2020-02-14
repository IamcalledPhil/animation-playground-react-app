import React from 'react';
import RandomAnt from './RandomAnt';


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

  export default RandomAnts;