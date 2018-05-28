import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/*import App from './App';*/
import Quiz from './Quiz';
import PropTypes from 'prop-types';
import rootNode from 'route-node';
 import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(<Quiz />, document.getElementById('root'));

registerServiceWorker();




