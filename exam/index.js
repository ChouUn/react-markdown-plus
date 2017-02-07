import React from 'react';
import { render } from 'react-dom';

import App from './App';

// Element created by React
const app = <App />;

// Element from HTML
const rootElement = document.getElementById('app');

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
render(app, rootElement);
