/* eslint-env webextensions */
import { useEffect } from 'react'
import { autorun } from 'mobx'
import { observer } from 'mobx-react'
import styled, { createGlobalStyle } from 'styled-components'
import Swal from 'sweetalert2'
import warning from 'warning'
import GridLayout from './GridLayout'
import Header from './Header'
import Card from './Card'
import color from '../utils/colors'
import * as util from '../utils/index'
import imageListModel from '../models/image'
import settingsModel from '../models/settings'
import '../assets/style/index.scss'

const GlobalStyles = createGlobalStyle`
  body {
    width: ${() => (util.isProduction ? '100vw' : 'calc(800px - 17px)')};
    height: 100%;
    min-height: 600px;
    max-height: 100%;
    background-color: ${color.charcoalGreyTwo};
    overflow-x: hidden;
    margin: 0 !important;
    font-size: 75%;
  }

  #root {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }
`

const Wrapper = styled.div`
  margin: 8px 8px 16px;
`

const Container = styled.div`
  padding-top: 65px;
`

const App = () => {
  useEffect(() => {
    function init() {
      chrome.downloads.onDeterminingFilename.addListener((item, suggest) => {
        const suggestName = util.suggestNewFilename(
          settingsModel.subfolder,
          item.filename
        )
        suggest({filename: suggestName})
      })

      settingsModel.applySettingsFromLocalStorage()
    }

    async function getImages () {
      const {hostname, images, linkedImages} = await util.getImages()
      imageListModel.hostname = hostname
      imageListModel.linkedImages = linkedImages
      imageListModel.notLinkedImages = images
    }

    try {
      init()
    } catch (e) {
      warning(false, '%s', e)
    }

    // TODO: 表示できる画像がなかった場合メッセージ表示?
    getImages()
      .catch(error => {
        warning(false, '%s', error)
      })

    return () => {
      autorun(() => {
        util.saveSettingsToLocalStorage(settingsModel.values)
        imageListModel.doFilter(settingsModel.values)
      })
    }
  }, [])

  function handleOnLoad (event, imageModel) {
    imageModel.loaded = true
    imageModel.loadFailed = false
    imageModel.width = event.target.naturalWidth
    imageModel.height = event.target.naturalHeight

    imageListModel.doFilter(settingsModel.values)
  }

  async function handleOnError (event, imageModel) {
    imageModel.loadFailed = true
    imageModel.visible = false

    await Swal.fire({
      title: `Load Failed: ${imageModel.src}`,
      background: `${color.voyagerDarkGrey}`,
      type: 'error',
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 4000
    })
  }

  async function handleOnZoomButtonClick (imageModel) {
    await Swal.fire({
      text: imageModel.url,
      imageUrl: imageModel.src,
      imageWidth: imageModel.width,
      background: `${color.voyagerDarkGrey}`,
      showConfirmButton: false,
      showCloseButton: true
    })
  }

  function handleOnOpenTabClick (imageModel) {
    chrome.tabs.create({url: imageModel.src, active: false})
  }

  function handleOnDownloadButtonClick (imageModel) {
    imageModel.download()
  }

  function handleOnCheckboxClick (imageModel) {
    imageModel.checked = !imageModel.checked
  }

  function handleOnToggleCheckbox() {
    if (imageListModel.isCheckedAll) {
      imageListModel.uncheckAll()
    } else {
      imageListModel.checkAll()
    }
  }

  async function downloadAllCheckedImages() {
    if (imageListModel.checkedImages.length === 0) {
      return
    }

    imageListModel.downloadAll()

    await Swal.fire({
      title: 'Download Started!!',
      type: 'success',
      showCloseButton: false,
      background: `${color.voyagerDarkGrey}`,
      showConfirmButton: false,
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: true
    })
  }

  return (
    <Wrapper>
      {/* TODO: 設定をサイトごとに保持？ */}
      <GlobalStyles/>

      <Header
        imageListModel={imageListModel}
        settingsModel={settingsModel}
        onToggleCheckbox={handleOnToggleCheckbox}
        onClickDownloadButton={downloadAllCheckedImages}
      />

      <Container>
        <GridLayout>
          {imageListModel.images.map((imageModel, i) => (
            <Card
              key={i}
              imageModel={imageModel}
              onLoad={handleOnLoad}
              onError={handleOnError}
              onZoomButtonClick={handleOnZoomButtonClick}
              onOpenTabClick={handleOnOpenTabClick}
              onDownloadButtonClick={handleOnDownloadButtonClick}
              onCheckboxClick={handleOnCheckboxClick}
            />
          ))}
        </GridLayout>
      </Container>
    </Wrapper>
  )
}

export default observer(App)
