import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Icon from '@mdi/react'
import { mdiDownload, mdiEye, mdiCheckboxBlankOutline } from '@mdi/js'
import color from '../utils/colors'

const Main = styled.div`
  width: 300px;
  margin-bottom: 30px;
`

const Wrapper = styled.div`
  height: 100%;
  display: block;
  border-radius: 3px;
  margin-bottom: 30px;
  overflow: hidden;
  background-size: 145px;
  background-color: ${color.voyagerDarkGrey};
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 4);
`

const ImgWrapper = styled.div`
  position: relative;
`

const Img = styled.img`
  max-width: 100%;
  border-style: none;
`

const Footer = styled.div`
  background-color: ${color.enterpriseMediumDarkGrey};
  padding-top: 12px;
  transition: background-color .25s;
  box-shadow: 0 0 black;
  margin-top: -20px;
  width: 100%;
  position: absolute;
  bottom: 0;
`

const Title = styled.div`
  font-weight: 600;
  line-height: 1.14;
  font-size: 14px;
  text-align: left;
  color: white;
  display: inline-block;
  max-height: 45px;
  overflow: hidden;
  padding: 0 15px;
`

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  color: hsla(0, 0%, 100%, .6);
  min-height: 8px;
`

const Action = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  opacity: .65;
  padding-top: 6px;
  padding-bottom: 12px;
  flex: 1;
  justify-content: center;
  cursor: pointer;
`

export default class Card extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string,
  }

  constructor (props) {
    super(props)

    this.state = {
      eye: color.paleGrey,
      download: color.paleGrey,
      checkbox: color.orionGreen
    }
  }

  render () {
    const {
      image,
      title,
    } = this.props

    const {
      eye,
      download,
      checkbox,
    } = this.state

    return (
      <Main>
        <Wrapper>
          <ImgWrapper>
            <Img src={image} alt={image}/>
          </ImgWrapper>
          <Footer>
            <Title>{title}</Title>
            <Actions>
              <Action
                onMouseOver={this.onMouseOverEye}
                onMouseLeave={this.onMouseLeaveEye}
              >
                <Icon
                  path={mdiEye}
                  size={1}
                  color={eye}
                />
              </Action>

              <Action
                onMouseOver={this.onMouseOverDownload}
                onMouseLeave={this.onMouseLeaveDownload}
              >
                <Icon
                  path={mdiDownload}
                  size={1}
                  color={download}
                />
              </Action>

              <Action
                onMouseOver={this.onMouseOverCheckbox}
                onMouseLeave={this.onMouseLeaveCheckbox}
              >
                <Icon
                  path={mdiCheckboxBlankOutline}
                  size={1}
                  color={checkbox}
                />
              </Action>
            </Actions>
          </Footer>
        </Wrapper>
      </Main>
    )
  }

  onMouseOverEye = () => {
    this.setState({eye: color.starfleetMediumGrey})
  }

  onMouseLeaveEye = () => {
    this.setState({eye: color.paleGrey})
  }

  onMouseOverDownload = () => {
    this.setState({download: color.starfleetMediumGrey})
  }

  onMouseLeaveDownload = () => {
    this.setState({download: color.paleGrey})
  }

  onMouseOverCheckbox = () => {
    this.setState({checkbox: color.darkMintGreen})
  }

  onMouseLeaveCheckbox = () => {
    this.setState({checkbox: color.orionGreen})
  }
}