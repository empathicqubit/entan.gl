import React, { Component } from 'react';
import './App.css';
import allons from './allons.gif';
import Helmet from 'react-helmet';
import blarg from '__GCS__/junk.gif';
import main from '__GCS__/main.md';

class App extends Component {
  constructor() {
      super();

      this.state = {};

      fetch(main)
          .then(r => r.text())
          .then(message => {
              this.setState({
                  message,
              });
          })
          .catch(e => {
              this.setState({
                  message: e.message,
              });
          });
  }
  render() {
    const self = this;
    return (
      <div className="App">
        <Helmet
            titleTemplate="allons.me - %s"
            defaultTitle="allons.me"
            >
            <title>What is your first name?</title>
        </Helmet>
        <img className="thedoctor" src={allons} />
        <p>
            There&apos;s not a whole lot here yet. Thus continues my history of building a homepage and not being sure what to do with it.
        </p>
        <p>
            You might want to look at:
        </p> 
        <ul>
            <li><a href="https://github.com/empathicqubit">My Github</a></li>
            <li><a href="https://gist.github.com/empathicqubit">My Gists</a></li>
            <li><a href="http://www.bbcamerica.com/shows/doctor-who/">A really cool TV show, pictured above.</a></li>
        </ul>
        <p>
            That&apos;s all I got.
        </p>
        <div className="junk">
            <a href={blarg}>
                Test GCS link.
            </a>
            <p>
                {self.state.message}
            </p>
        </div>
      </div>
    );
  }
}

export default App;
