import React, { Component } from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import GridLayout from './GridLayout'
import Header from './Header'
import Card from './Card'
import { Images, Options } from '../store'
import color from '../utils/colors'
import * as util from '../utils'

const GlobalStyles = styled.createGlobalStyle`
  html {
    width: 100rem;
    height: 100rem;
    background-color: ${color.charcoalGreyTwo};
  }
`

@observer
class App extends Component {
  images = null
  options = new Options()

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
          {this.images !== null ? this.images.data.map(image => (
            <Card
              image={image.src}
              checked={image.checked}
            />
          )) : null}
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
    const results = await util.getImages()
    this.images = new Images(results)
  }
}

export default App