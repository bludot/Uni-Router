import React from 'react';
import { render } from 'react-dom';
import { ReactRouter as Router } from 'univ-router';
import routes from './routes.js';

// render(<Hello />, document.getElementById('root'));
render(<Router config={routes} />, document.body);
