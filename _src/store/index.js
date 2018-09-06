import { createStore } from 'redux-box'
import { module as imageModule } from './image'
import { module as OptionModule } from './option'
import FilterMiddleware from './middlewares/filter'

export default createStore([
  imageModule,
  OptionModule,
], {
  middlewares: [
    FilterMiddleware
  ]
})
