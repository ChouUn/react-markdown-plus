import React, { Component } from 'react';

import source from './source.md';
import Markdown from '../src/Markdown';

class App extends Component {
  render() {
    return (
      <Markdown text={source} />
    );
  };
};

export default App;