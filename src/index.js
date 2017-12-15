import 'core-js/es6/map';
import 'core-js/es6/set';
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
        setTimeout(callback, 0);
    };
}
import React from 'react';
import ReactDOM from 'react-dom';
import {createHashHistory} from 'history';
import { Provider } from 'mobx-react';
import { syncHistoryWithStore } from 'mobx-react-router';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';
import stores from './store/index';
import 'r-cmui/styles/theme.less';
import 'r-cmui/styles/font-awesome.min.css';
import './index.less';

const browserHistory = createHashHistory();

syncHistoryWithStore(browserHistory, stores.routing);

ReactDOM.render(
    <Provider {...stores}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
