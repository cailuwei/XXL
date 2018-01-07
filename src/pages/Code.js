import 'core-js/es6/map';
import 'core-js/es6/set';
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
        setTimeout(callback, 0);
    };
}
import React from 'react';
import ReactDOM from 'react-dom';

import App from './code/App';

ReactDOM.render(<App />, document.getElementById('root'));
