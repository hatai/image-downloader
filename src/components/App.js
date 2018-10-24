import React, { Component } from 'react'
import styled from 'styled-components'
import Header from './Header'
import Card from './Card'
import color from '../utils/colors'

const GlobalStyles = styled.createGlobalStyle`
  html {
    width: 100rem;
    height: 100rem;
  }
`

const Body = styled.div`
  background-color: ${color.charcoalGreyTwo};
`

export default class App extends Component {
  render () {
    return (
      <div>
        <GlobalStyles/>
        <Body>
          <Header/>
        </Body>
      </div>
    )
  }
}