import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import imageListModel from './models/image'
import optionModel from './models/option'
import { unregister } from './registerServiceWorker'
import './assets/style/rc-slider/index.css'

(function (ls) {
  // initialization
  const options = ls.getItem('options')
  if (options === null) {
    // ls.setItem('options', JSON.stringify(defaultOptionValue))
  }

  ReactDOM.render((
      <App
        imageListModel={imageListModel}
        optionModel={optionModel}
      />
  ), document.getElementById('root'))

  unregister()

})(localStorage)

