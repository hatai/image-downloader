import React, { Component } from 'react'
import { computed } from 'mobx'
import { observer, inject } from 'mobx-react'
import { createGlobalStyle } from 'styled-components'
import GridLayout from './GridLayout'
import Header from './Header'
import Card from './Card'
import color from '../utils/colors'
import * as util from '../utils'

const GlobalStyles = createGlobalStyle`
  body {
    width: 100rem;
    height: 100rem;
    background-color: ${color.charcoalGreyTwo};
  }
`

@inject('imageList')
@observer
class App extends Component {
  // imageList = []
  @computed get imageList() {
    return this.props.imageList
  }

  componentWillMount () {
    this.initialize()
      .catch(error => console.log(error))

    this.getImages()
      .catch(error => console.log(error))
  }

  render () {
    return (
      <div>
        <GlobalStyles/>

        <Header/>

        <GridLayout>
          {this.imageList.data.map(image => (
            <Card
              image={image.src}
              checked={image.checked}
            />
          ))}
        </GridLayout>
      </div>
    )
  }

  initialize = async () => {
    await this.setOptionsFromStorage()

    // eslint-disable-next-line no-undef
    chrome.downloads.onDeterminingFilename
      .addListener((item, suggest) => {
        const suggestName = util.suggestNewFilename(this.props.option.subfolder, item.filename)
        suggest({filename: suggestName})
      })
  }

  setOptionsFromStorage = async () => {
    const values = await util.getSavedOptions('options')
    this.props.option.setValues(values)
  }

  getImages = async () => {
    const {images, linkedImages} = await util.getImages()
    this.imageList.linkedImages = linkedImages
    this.imageList.notLinkedImages = images
  }
}

export default App