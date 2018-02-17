import React, { Component } from 'react'
import { connectStore } from 'redux-box'
import { module as optionModule } from './store/option'
import { module as imageModule } from './store/image'
import TileOptions from './components/TileOptions'
import TileImages from './components/TileImages'
import * as util from './util'
import './assets/style/App.css'

@connectStore({
  option: optionModule,
  image: imageModule,
})
class App extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      optionIsOpened: false
    }

    this.initialize = this.initialize.bind(this)
    this.setOptionsFromStorage = this.setOptionsFromStorage.bind(this)
    this.getImages = this.getImages.bind(this)
  }

  componentWillMount () {
    this.getImages()
      .catch(error => console.log(error))
  }

  componentDidMount () {
    this.initialize()
      .catch(error => console.log(error))

    setTimeout(() => {
      this.props.image.runFilter()
    }, 1000)
  }

  render () {
    return (
      <div id={`app`}>
        <section className={'hero'}>
          <div className={'hero-body'}>
            <div className="container">
              <div className={'tile is-ancestor'}>
                <div className={'tile is-parent is-vertical'}>

                  {/* option tile */}
                  <TileOptions
                    isOpened={this.state.optionIsOpened}
                    handleCollapse={async () => this.setState({optionIsOpened: !this.state.optionIsOpened})}
                  />

                  {/* main tile */}
                  <TileImages/>

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  async initialize () {
    await this.setOptionsFromStorage()

    chrome.downloads.onDeterminingFilename
      .addListener((item, suggest) => {
        const suggestName = util.suggestNewFilename(this.props.option.subfolder, item.filename)
        suggest({filename: suggestName})
      })
  }

  async setOptionsFromStorage () {
    const values = await util.getSavedOptions('options')
    this.props.option.setValues(values)
  }

  async getImages () {
    const results = await util.getImages()

    const {image} = this.props
    image.setImages(Object.assign({}, results))
  }
}

export default App
