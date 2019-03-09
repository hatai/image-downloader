import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import swal from 'sweetalert2';
import Icon from '@mdi/react';
import {
  mdiArrowTopRightThick,
  mdiDownload,
  mdiMagnifyPlusOutline
} from '@mdi/js';
import Load from './common/Loader';
import Checkbox from './common/Checkbox';
import color from '../utils/colors';

const Main = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const Wrapper = styled.div`
  height: 100%;
  display: block;
  border-radius: 3px;
  margin-bottom: 15px;
  overflow: hidden;
  background-size: 145px;
  background-color: ${color.voyagerDarkGrey};
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 4);

  &&:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.16);
  }
`;

const ImgWrapper = styled.div`
  position: relative;
`;

const Img = styled.img`
  user-select: none;
  cursor: pointer;
  max-width: 100%;
  min-width: 100%;
  border-style: none;
  border-radius: 3px 3px 0 0;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  padding-bottom: ${({ paddingBottom }) => `${paddingBottom}px`};
`;

const Footer = styled.div`
  background-color: ${props => props.background};
  padding-top: 12px;
  transition: background-color 0.25s;
  box-shadow: 0 0 black;
  margin-top: -20px;
  width: 100%;
  position: absolute;
  bottom: 0;
  border-radius: 0 0 3px 3px;
`;

const Title = styled.div`
  width: ${({ width }) => width};
  max-height: 45px;
  font-weight: 600;
  line-height: 1.14;
  font-size: 14px;
  text-align: left;
  color: white;
  display: inline-block;
  padding: 0 15px;
`;

const TitleText = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;

  // TODO: スクロールバーのデザイン考える？
  ::-webkit-scrollbar {
    display: none;
    height: 3px;
    background-color: #f5f5f5;

    &-thumb {
      display: none;
      background-color: #000000;
    }

    &-track {
      display: none;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #f5f5f5;
    }
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  color: hsla(0, 0%, 100%, 0.6);
  min-height: 8px;
`;

const Action = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  opacity: 0.65;
  padding-top: 6px;
  padding-bottom: 12px;
  flex: 1;
  justify-content: center;
  cursor: pointer;

  &&:hover {
    color: white;
    opacity: 1;
  }
`;

const emptyFunc = () => {};

const onZoomButtonClick = url => {
  swal({
    showConfirmButton: false,
    background: `rgba(0,0,0,0)`,
    imageUrl: url,
    animation: false
  });
};

export default class Card extends Component {
  static propTypes = {
    imageModel: PropTypes.object,
    src: PropTypes.string.isRequired,
    title: PropTypes.string,
    checked: PropTypes.bool.isRequired,
    onZoomButtonClick: PropTypes.func,
    onOpenTabClick: PropTypes.func,
    onDownloadButtonClick: PropTypes.func,
    onCheckboxClick: PropTypes.func,
    onLoad: PropTypes.func,
    onError: PropTypes.func
  };

  static defaultProps = {
    imageModel: {},
    onZoomButtonClick: onZoomButtonClick,
    onOpenTabClick: emptyFunc,
    onDownloadButtonClick: emptyFunc,
    onCheckboxClick: emptyFunc,
    onLoad: emptyFunc,
    onError: emptyFunc
  };

  constructor(props) {
    super(props);

    this.footer = React.createRef();

    this.state = {
      visible: false,
      isLoaded: false,
      footerHeight: 0,
      hooterColor: color.titleGreyDefault,
      zoomColor: color.paleGrey,
      openTabColor: color.paleGrey,
      downloadColor: color.paleGrey,
      checkboxColor: color.orionGreen
    };
  }

  componentDidMount() {
    this.setState({ footerHeight: this.getFooterHeight() });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.footerHeight !== prevState.footerHeight) {
      this.setState({ footerHeight: this.getFooterHeight() });
    }
  }

  render() {
    const {
      imageModel,
      src,
      title,
      checked,
      onZoomButtonClick,
      onOpenTabClick,
      onDownloadButtonClick,
      onCheckboxClick,
      onLoad,
      onError
    } = this.props;

    const {
      visible,
      isLoaded,
      footerHeight,
      zoomColor,
      openTabColor,
      downloadColor,
      checkboxColor,
      hooterColor
    } = this.state;

    const footerWidth = this.getFooterWidth();

    return (
      <Main onMouseOver={this.onHover} onMouseLeave={this.onLeave}>
        <Wrapper>
          <ImgWrapper>
            <Img
              src={src}
              alt={src}
              visible={visible}
              lazyload={'on'}
              async={true}
              paddingBottom={footerHeight}
              onLoad={event => {
                onLoad(event, imageModel);
                this.setState({ visible: true, isLoaded: true });
              }}
              onError={event => onError(event, imageModel)}
              onClick={() => onCheckboxClick(imageModel)}
            />
            {isLoaded ? null : <Load />}
          </ImgWrapper>

          <Footer background={hooterColor} ref={this.footer}>
            <Title width={footerWidth === 0 ? 'auto' : `${footerWidth - 30}px`}>
              <TitleText>{title}</TitleText>
            </Title>

            <Actions>
              {/* zoom button */}
              <Action
                onMouseOver={this.onMouseOverEye}
                onMouseLeave={this.onMouseLeaveEye}
                onClick={() => onZoomButtonClick(imageModel)}
              >
                <Icon path={mdiMagnifyPlusOutline} size={1} color={zoomColor} />
              </Action>

              {/* open image on new tab */}
              <Action
                onMouseOver={this.onMouseOverOpenTab}
                onMouseLeave={this.onMouseLeaveOpenTab}
                onClick={() => onOpenTabClick(imageModel)}
              >
                <Icon
                  path={mdiArrowTopRightThick}
                  size={1}
                  color={openTabColor}
                />
              </Action>

              {/* download button */}
              <Action
                onMouseOver={this.onMouseOverDownload}
                onMouseLeave={this.onMouseLeaveDownload}
                onClick={() => onDownloadButtonClick(imageModel)}
              >
                <Icon path={mdiDownload} size={1} color={downloadColor} />
              </Action>

              {/* checkbox */}
              <Action
                onMouseOver={this.onMouseOverCheckbox}
                onMouseLeave={this.onMouseLeaveCheckbox}
                onClick={() => onCheckboxClick(imageModel)}
              >
                <Checkbox checked={checked} color={checkboxColor} />
              </Action>
            </Actions>
          </Footer>
        </Wrapper>
      </Main>
    );
  }

  getFooterWidth = () => {
    const { footer } = this;
    if (footer.current == null) {
      return 0;
    }

    return footer.current.clientWidth;
  };

  getFooterHeight = () => {
    const { footer } = this;
    if (footer.current == null) {
      return 0;
    }

    return footer.current.clientHeight;
  };

  onHover = () => {
    this.setState({ hooterColor: color.titleGreyLight });
  };

  onLeave = () => {
    this.setState({ hooterColor: color.titleGreyDefault });
  };

  onMouseOverEye = () => {
    this.setState({ zoomColor: color.starfleetMediumGrey });
  };

  onMouseLeaveEye = () => {
    this.setState({ zoomColor: color.paleGrey });
  };

  onMouseOverOpenTab = () => {
    this.setState({ openTabColor: color.starfleetMediumGrey });
  };

  onMouseLeaveOpenTab = () => {
    this.setState({ openTabColor: color.paleGrey });
  };

  onMouseOverDownload = () => {
    this.setState({ downloadColor: color.starfleetMediumGrey });
  };

  onMouseLeaveDownload = () => {
    this.setState({ downloadColor: color.paleGrey });
  };

  onMouseOverCheckbox = () => {
    this.setState({ checkboxColor: color.darkMintGreen });
  };

  onMouseLeaveCheckbox = () => {
    this.setState({ checkboxColor: color.orionGreen });
  };
}
