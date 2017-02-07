# React-Markdown-It &middot; [![Build Status](https://travis-ci.org/ChouUn/react-markdown-it.svg?branch=master)](https://travis-ci.org/ChouUn/react-markdown-it) [![npm version](https://img.shields.io/npm/v/react-markdown-it.svg?style=flat)](https://www.npmjs.com/package/react-markdown-it)

## How to use

```jsx
import React, { Component } from 'react';

import source from './source.md';
import Markdown from 'react-markdown-it';

class App extends Component {
  render() {
    return (
      <Markdown text={source} />
    );
  };
};

export default App;
```

Source is a `String`.

## Example

[Source Code][source]

After Render:

![][exam1]
![][exam2]
![][exam3]

## Todo

* [x] use markdown-it to render markdown
* [x] use prism.js for code highlight
  * [x] stand-alone theme
  * [x] alias language names
  * [x] work 1: Line Highlight, Line Numbers, Show Invisibles, File Highlight
  * [ ] work 2: Toolbar, Show Language, Copy to Clipboard Button
  * [ ] work 3: Previewer
  * [ ] work 4: Keep Markup, Command Line
* [x] use KaTeX to render math
  * [x] convert asciimath to TeX
  * [x] import katex css
  
[source]: https://github.com/ChouUn/react-markdown-it/blob/master/exam/source.md
[exam1]:  https://github.com/ChouUn/react-markdown-it/blob/master/img/exam1.png
[exam2]:  https://github.com/ChouUn/react-markdown-it/blob/master/img/exam2.png
[exam3]:  https://github.com/ChouUn/react-markdown-it/blob/master/img/exam3.png