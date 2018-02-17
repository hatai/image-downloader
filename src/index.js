import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import 'bulma/css/bulma.css';
import 'mdi/css/materialdesignicons.min.css'
import './assets/style/index.css';
import App from './App';
import store from './store'
import { unregister } from './registerServiceWorker';

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
  ), document.getElementById('root'));

  unregister();
