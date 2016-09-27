import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {cards} from './helpers/cards';
import {layout} from './helpers/layout';
import './index.css';

ReactDOM.render(<App cards={cards} layout={layout} />, document.getElementById('root'));
