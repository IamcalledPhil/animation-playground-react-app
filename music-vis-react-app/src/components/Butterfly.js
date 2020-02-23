import React from 'react';
import { motion } from "framer-motion"

class Butterfly extends React.Component {

    renderButterflyWing(originX, originY, tx, rotation, opacity, rx, ry){
      return (
        <g>
          <motion.ellipse className="butterfly-wing"
            fill={this.props.colour}
            cx={this.props.x - tx}
            cy={this.props.y}
            opacity={opacity}
            style={{ originX: originX, originY: originY} }
            rx={rx}
            ry={ry}
            animate={{rotate: rotation, translateY: [1, 0, 1.3, 0, 0.5, 0, 1]}}
            transition={{
              duration: 1.2,
              loop: Infinity,
              times: [0, 0.35, 0.4, 0.73, 0.8, 0.95, 1]
            }}
          />
        </g>
         
      )
    }

    render() {
        return(
        <motion.g
          animate={{translateX: [0, 10, -10, 5, 20, -2, -1, 10], 
                    translateY: [0, 5, -2, 10, -4, 25, 2, 5],
                    scale: [1, 0.6, 1, 0.7, 1, 0.5, 1]
                  }}
          transition={{
            duration: 12,
            yoyo: Infinity
          }}
        >
          {this.renderButterflyWing(0, 0.5, 0, [ 40, -20, 40, -20, 40, -20, 40], 1, 2, 1)}
          {this.renderButterflyWing(1, 0.5, 4.3, [ -40, 20, -40, 20, -40, 20, -40], 1, 2, 1)}
          {this.renderButterflyWing(0, 0.5, 0, [ 40, -20, 40, -20, 40, -20, 40], 0.4, 4, 2)}
          {this.renderButterflyWing(1, 0.5, 4.3, [ -40, 20, -40, 20, -40, 20, -40], 0.4, 4, 2)}
        </motion.g>
    
        )
      }
    }

    export default Butterfly;