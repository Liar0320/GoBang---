import { Component } from 'react';
import * as React from 'react';
import Board from './boardlayout';

export default class Chess extends Component {
  name: 'Chess';

  public render() {
    return (
      <section data-label={this.name}>
        <Board />
      </section>
    );
  }
}
