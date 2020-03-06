import React from 'react';

class AboutSection extends React.Component {
  
    render () {
      return (
        <div className="about-section">
            <p>This is an experimental art project that allows everyone to 
                create their own animated visualisations. It is built in React, and 
                uses the animation library Framer Motion. </p>
                <p>https://reactjs.org/</p>
                <p>https://www.framer.com/api/motion/</p>
                <br/>
               <p>Author: Phil Cohn </p> 
        </div>
      )
    }
  }

  export default AboutSection;