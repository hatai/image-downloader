import React, { Component } from 'react'
import styled from 'styled-components'
import Header from './Header'
import Card from './Card'
import color from '../utils/colors'

const Body = styled.div`
  background-color: ${color.charcoalGreyTwo};
`

export default class App extends Component {
  render () {
    return (
      <div>
        <Body>
          <Header/>
        </Body>
      </div>
    )
  }
}