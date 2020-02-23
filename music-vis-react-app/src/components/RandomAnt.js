import React from 'react';
import { motion } from "framer-motion"

class RandomAnt extends React.Component {
    constructor(props){
      super(props)
      this.path1 = this.generatePath('HVHVH');
      this.path2 = this.generatePath('VHVHV');
    }
  
    getRandomHorizontalInt() {
      return Math.floor(Math.random() * 200);
    }

    getRandomVerticalInt() {
      return Math.floor(Math.random() * 100);
    }
  
    generatePath (directions) {
      let path = `M${this.props.x} ${this.props.y} `;
      for (const direction of directions){
        path = path.concat(`${direction}
          ${direction === 'H' ? this.getRandomHorizontalInt() 
            : this.getRandomVerticalInt()} `
          );
      }
      return path;
    }
  
    renderPath (path, colour) {
      return (
        <motion.path className="random-ant"
          stroke={colour}
          d={path}
          initial={{pathLength:0, opacity: 1}}
          animate={{pathLength:1, opacity: 0.1}}
          transition={{
            duration: 3,
            ease: "easeOut",
          }}
        />
      )
    }
    
    render () {
      return (
        <g>
          {this.renderPath(this.path1, this.props.colour)}
          {this.renderPath(this.path2, this.props.colour)}
      </g>
      )
    }
}

export default RandomAnt;
