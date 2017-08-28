import React, {Component} from 'react';

import {Header} from './header';
import {Clocks} from './clocks';

export class Main extends Component {
  render() {
    return (
      <div className="container">
        <Header/>
        <Clocks/>
      </div>
    );
  }
}
