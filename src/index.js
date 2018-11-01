import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import App from './components/App'
import ImageListModel from './models/image'
import OptionModel from './models/option'
import { unregister } from './registerServiceWorker'
import './assets/style/rc-slider/index.css'

const models = {
  imageList: new ImageListModel(),
  option: new OptionModel(),
};

(function (ls) {
  // initialization
  const options = ls.getItem('options')
  if (options === null) {
    // ls.setItem('options', JSON.stringify(defaultOptionValue))
  }

  ReactDOM.render((
    <Provider {...models}>
      <App/>
    </Provider>
  ), document.getElementById('root'))

  unregister()

})(localStorage)

