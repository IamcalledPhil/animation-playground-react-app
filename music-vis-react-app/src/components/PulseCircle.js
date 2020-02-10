import React from 'react';
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
              initial= {{scale: 0.1,opacity: 1}}
              animate={{ 
                scale: [0.1,3],
                opacity: [1,0.1]
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

  export default PulseCircle;