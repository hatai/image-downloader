import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'bulma/css/bulma.css'
import 'mdi/css/materialdesignicons.min.css'
import './assets/style/index.css'
import App from './components/App'
// import store from './store'
// import { state as defaultOptionValue } from './store/option'
import { unregister } from './registerServiceWorker'

(function (ls) {
  // initialization
  const options = ls.getItem('options')
  if (options === null) {
    // ls.setItem('options', JSON.stringify(defaultOptionValue))
  }

  ReactDOM.render((
    <Provider>
      <App/>
    </Provider>
  ), document.getElementById('root'))

  unregister()

})(localStorage)

