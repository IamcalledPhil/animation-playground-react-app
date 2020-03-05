import React from 'react';

import ArtBoard from './Artboard';
import AboutSection from './AboutSection';

import '../styles/index.scss';

class App extends React.Component {

  constructor(props){
    super(props)
    this.initialState = {
      activePage: 'artboard'
    }
    this.state = this.initialState;
  }


  goToAboutPage = () => {
    this.setState({ activePage: "about"})
  }

  goToArtboard = () => {
    this.setState({ activePage: "artboard"})
  }

  render () {
    if (this.state.activePage === "artboard"){
      return (
        <div className="app">
          <button onClick={this.goToAboutPage}>About</button>
          <ArtBoard updateActivePage={this.updateActivePage}/>
        </div>
      ) 
    } else if (this.state.activePage === "about"){
      return(
        <div className="app">
          <button onClick={this.goToArtboard}>Back</button>
          <AboutSection updateActivePage={this.updateActivePage}/>
        </div>
      )
    }
  }
}

export default App;
