import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Icon from '@mdi/react'
import { mdiDownload, mdiEye, mdiCheckboxBlankOutline, mdiCheckboxMarkedOutline } from '@mdi/js'
import color from '../utils/colors'

const Main = styled.div`
  width: 100%;
  margin-bottom: 30px;
  display: ${({visible}) => visible ? 'block' : 'none'};
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
  
  &&:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, .16);
  }
`

const ImgWrapper = styled.div`
  position: relative;
`

const Img = styled.img`
  max-width: 100%;
  min-width: 100%;
  border-style: none;
`

const Footer = styled.div`
  background-color: ${props => props.background};
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
  
  &&:hover {
    color: white;
    opacity: 1;
  }
`

const emptyFunc = () => {}

export default class Card extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string,
    checked: PropTypes.bool.isRequired,
    onEyeButtonClick: PropTypes.func,
    onDownloadButtonClick: PropTypes.func,
    onCheckboxClick: PropTypes.func,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
  }

  static defaultProps = {
    onEyeButtonClick: emptyFunc,
    onDownloadButtonClick: emptyFunc,
    onCheckboxClick: emptyFunc,
    onLoad: emptyFunc,
    onError: emptyFunc,
  }

  constructor (props) {
    super(props)

    this.state = {
      visible: false,
      hooter: color.titleGreyDefault,
      eye: color.paleGrey,
      download: color.paleGrey,
      checkbox: color.orionGreen
    }
  }

  render () {
    const {
      image,
      title,
      checked,
      onEyeButtonClick,
      onDownloadButtonClick,
      onCheckboxClick,
      onLoad,
      onError,
    } = this.props

    const {
      visible,
      eye,
      download,
      checkbox,
      hooter,
    } = this.state

    return (
      <Main
        onMouseOver={this.onHover}
        onMouseLeave={this.onLeave}
        visible={visible}
      >
        <Wrapper>
          <ImgWrapper>
            <Img
              src={image}
              alt={image}
              lazyload={'on'}
              async={true}
              onLoad={() => {
                this.setState({visible: true})
                onLoad()
              }}
              onError={onError}
            />
          </ImgWrapper>

          <Footer background={hooter}>
            <Title>{title}</Title>
            <Actions>
              <Action
                onMouseOver={this.onMouseOverEye}
                onMouseLeave={this.onMouseLeaveEye}
                onClick={onEyeButtonClick}
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
                onClick={onDownloadButtonClick}
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
                onClick={onCheckboxClick}
              >
                <Icon
                  path={checked ? mdiCheckboxMarkedOutline : mdiCheckboxBlankOutline}
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

  onHover = () => {
    this.setState({hooter: color.titleGreyLight})
  }

  onLeave = () => {
    this.setState({hooter: color.titleGreyDefault})
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