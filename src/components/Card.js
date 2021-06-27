import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import Icon from '@mdi/react'
import { mdiArrowTopRightThick, mdiDownload, mdiMagnifyPlusOutline } from '@mdi/js'
import Load from './common/Loader'
import Checkbox from './common/Checkbox'
import TextInput from './common/TextInput'
import color from '../utils/colors'
import 'animate.css/animate.min.css'

const Main = styled.div`
  width: 100%;
  margin-bottom: 15px;
  display: ${props => (props.visible ? 'block' : 'none')};
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
  box-shadow: 0 2px 4px 0
    ${({ checked }) => (checked ? 'rgba(22, 130, 78, 4)' : 'rgba(0, 0, 0, 4)')};

  :hover {
    box-shadow: 0 8px 16px 0
      ${({ checked }) =>
        checked ? 'rgba(22, 130, 78, .16)' : 'rgba(0, 0, 0, .16)'};
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
  opacity: ${({ opacity }) => opacity};
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  padding-bottom: ${({ paddingBottom }) => `${paddingBottom}px`};
`;

const SizeBox = styled.div`
  width: 100%;
  height: 40px;
  user-select: none;

  opacity: 0;
  background: rgb(51, 51, 51);
  background: linear-gradient(
    0deg,
    rgba(51, 51, 51, 0.3376244388409515) 73%,
    rgba(255, 255, 255, 0) 100%
  );

  position: absolute;
  bottom: 92px;
  z-index: 1;

  p {
    color: #e0e0e0;
    text-align: end;
    font-size: 1rem;
    font-weight: 600;
    margin-right: 8px;
  }
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

const defaultImgOpacity = 0.8
const hoverImgOpacity = 1.0

const onZoomButtonClick = url => {
  Swal({
    showConfirmButton: false,
    background: `rgba(0, 0, 0, 0)`,
    imageUrl: url,
    animation: false
  });
};

const Card = ({
   imageModel,
   onZoomButtonClick,
   onOpenTabClick,
   onDownloadButtonClick,
   onCheckboxClick,
   onLoad,
   onError
 }) => {
  const footerRef = useRef()
  const [visible, setVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [footerHeight, setFooterHeight] = useState(0)
  const [imageOpacity, setImageOpacity] = useState(defaultImgOpacity)
  const [sizeboxAnimation, setSizeboxAnimation] = useState('')
  const [footerColor, setFooterColor] = useState(color.titleGreyDefault)
  const [zoomIconColor, setZoomIconColor] = useState(color.paleGrey)
  const [openTabColor, setOpenTabColor] = useState(color.paleGrey)
  const [downloadColor, setDownloadColor] = useState(color.paleGrey)
  const [checkboxColor, setCheckboxColor] = useState(color.orionGreen)

  useEffect(() => {
    if (footerRef.current) {
      setFooterHeight(footerRef.current.clientHeight)
    }
  }, [footerRef.current])

  function handleOnLoad(e) {
    onLoad(e, imageModel)
    setVisible(true)
    setIsLoaded(true)
  }

  function handleOnError(e) {
    onError(e, imageModel)
  }

  function handleOnClickImage() {
    onCheckboxClick(imageModel)
  }

  function handleOnMouseOverImage() {
    setImageOpacity(hoverImgOpacity)
  }

  function handleOnMouseLeaveImage() {
    setImageOpacity(defaultImgOpacity)
  }

  function handleOnMouseOver() {
    setSizeboxAnimation('animate__animated animate__fadeIn')
    setFooterColor(color.titleGreyLight)
    handleOnMouseOverImage()
  }

  function handleOnMouseLeave() {
    setSizeboxAnimation('animate__animated animate__fadeOut')
    setFooterColor(color.titleGreyDefault)
    handleOnMouseLeaveImage()
  }

  function handleOnClickZoom() {
    onZoomButtonClick(imageModel)
  }

  function handleOnMouseOverZoom() {
    setZoomIconColor(color.starfleetMediumGrey)
  }

  function handleOnMouseLeaveZoom() {
    setZoomIconColor(color.paleGrey)
  }

  function handleOnClickOpenTab() {
    onOpenTabClick(imageModel)
  }

  function handleOnMouseOverOpenTab() {
    setOpenTabColor(color.starfleetMediumGrey)
  }

  function handleOnMouseLeaveOpenTab() {
    setOpenTabColor(color.paleGrey)
  }

  function handleOnClickDownload() {
    onDownloadButtonClick(imageModel)
  }

  function handleOnMouseOverDownload() {
    setDownloadColor(color.starfleetMediumGrey)
  }

  function handleOnMouseLeaveDownload() {
    setDownloadColor(color.paleGrey)
  }

  function handleOnClickCheckbox() {
    onCheckboxClick(imageModel)
  }

  function handleOnMouseOverCheckbox() {
    setCheckboxColor(color.darkMintGreen)
  }

  function handleOnMouseLeaveCheckbox() {
    setCheckboxColor(color.orionGreen)
  }

  return (
    <Main
      visible={imageModel.visible}
      onMouseOver={handleOnMouseOver}
      onMouseLeave={handleOnMouseLeave}
    >
      <Wrapper checked={imageModel.checked}>
        <ImgWrapper>
          <Img
            src={imageModel.src}
            alt={imageModel.src}
            visible={visible}
            loading={'eager'}
            crossorigin="anonymous"
            paddingBottom={footerHeight}
            opacity={imageOpacity}
            onLoadStart={handleOnLoad}
            onLoad={handleOnLoad}
            onError={handleOnError}
            onClick={handleOnClickImage}
            onDoubleClick={handleOnClickZoom}
            onMouseOver={handleOnMouseOverImage}
            onMouseLeave={handleOnMouseLeaveImage}
          />

          {imageModel.loaded ? (
            <SizeBox
              className={sizeboxAnimation}
              onClick={handleOnClickImage}
              onDoubleClick={handleOnClickZoom}
            >
              <p>
                {imageModel.width} × {imageModel.height}
              </p>
            </SizeBox>
          ) : null}

          {isLoaded ? null : <Load />}
        </ImgWrapper>

        <Footer background={footerColor} ref={footerRef}>
          <Title width={'79%'}>
            <TextInput value={imageModel.url} disabled />
          </Title>

          <Actions>
            {/* zoom button */}
            <Action
              onMouseOver={handleOnMouseOverZoom}
              onMouseLeave={handleOnMouseLeaveZoom}
              onClick={handleOnClickZoom}
            >
              <Icon
                path={mdiMagnifyPlusOutline}
                size={1}
                color={zoomIconColor}
              />
            </Action>

            {/* open image on new tab */}
            <Action
              onMouseOver={handleOnMouseOverOpenTab}
              onMouseLeave={handleOnMouseLeaveOpenTab}
              onClick={handleOnClickOpenTab}
            >
              <Icon
                path={mdiArrowTopRightThick}
                size={1}
                color={openTabColor}
              />
            </Action>

            {/* download button */}
            <Action
              onMouseOver={handleOnMouseOverDownload}
              onMouseLeave={handleOnMouseLeaveDownload}
              onClick={handleOnClickDownload}
            >
              <Icon path={mdiDownload} size={1} color={downloadColor} />
            </Action>

            {/* checkbox */}
            <Action
              onMouseOver={handleOnMouseOverCheckbox}
              onMouseLeave={handleOnMouseLeaveCheckbox}
              onClick={handleOnClickCheckbox}
            >
              <Checkbox
                checked={imageModel.checked}
                color={checkboxColor}
              />
            </Action>
          </Actions>
        </Footer>
      </Wrapper>
    </Main>
  )
}

Card.propTypes = {
  imageModel: PropTypes.object,
  onZoomButtonClick: PropTypes.func,
  onOpenTabClick: PropTypes.func,
  onDownloadButtonClick: PropTypes.func,
  onCheckboxClick: PropTypes.func,
  onLoad: PropTypes.func,
  onError: PropTypes.func
};

Card.defaultProps = {
  imageModel: {},
  onZoomButtonClick: onZoomButtonClick,
  onOpenTabClick: emptyFunc,
  onDownloadButtonClick: emptyFunc,
  onCheckboxClick: emptyFunc,
  onLoad: emptyFunc,
  onError: emptyFunc
};

export default observer(Card)
