import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import color from '../utils/colors'

const Container = styled.div`
  margin: 0 auto;
  padding: 0;
  width: 100%;
  column-count: 1;
  column-gap: 30px;
  
  @media only screen and (min-width: 599px) {
    column-count: 2;
  }
  
  @media only screen and (min-width: 899px) {
    column-count: 2;
  }
  
  @media only screen and (min-width: 1199px) {
    column-count: 3;
  }

  @media only screen and  (min-width: 1499px) {
    column-count: 4;
  }
  
  @media only screen and  (min-width: 1799px) {
    column-count: 5;
  }
  
  @media only screen and  (min-width: 2099px) {
    column-count: 6;
  }
  
  @media only screen and  (min-width: 2399px) {
    column-count: 7;
  }
  
  @media only screen and  (min-width: 2699px) {
    column-count: 8;
  }
`

const Grid = styled.div`
  padding: 0;
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;
`

export default class GridLayout extends Component {
  render () {
    const {children} = this.props

    return (
      <Container>
        {children.map(child => (
          <Grid>
            {child}
          </Grid>
        ))}
      </Container>
    )
  }
}