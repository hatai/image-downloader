/* eslint-env webextensions */
import React, { Component } from 'react';
import { autorun } from 'mobx';
import { observer } from 'mobx-react';
import styled, { createGlobalStyle } from 'styled-components';
import Swal from 'sweetalert2';
import warning from 'warning';
import GridLayout from './GridLayout';
import Header from './Header';
import Card from './Card';
import color from '../utils/colors';
import * as util from '../utils/index';
import imageListModel from '../models/image';
import settingsModel from '../models/settings';
import '../assets/style/index.scss';

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
`;

const Wrapper = styled.div`
  margin: 8px 8px 16px;
`;

const Container = styled.div`
  padding-top: 65px;
`;

export default observer(
  class App extends Component {
    static propTypes = {};

    constructor(props) {
      super(props);

      try {
        this.initialize();
      } catch (e) {
        warning(false, '%s', e);
      }

      this.getImages()
        .then(() => {
          // TODO: 表示できる画像がなかった場合のメッセージ表示?
        })
        .catch(error => {
          warning(false, '%s', error);
        });
    }

    componentDidMount() {
      autorun(() => {
        util.saveSettingsToLocalStorage(settingsModel.values);
        imageListModel.doFilter(settingsModel.values);
      });
    }

    render() {
      return (
        <Wrapper>
          {/* TODO: 設定をサイトごとに保持？ */}
          <GlobalStyles />

          <Header
            imageListModel={imageListModel}
            settingsModel={settingsModel}
            onToggleCheckbox={this.handleOnToggleCheckbox}
            onClickDownloadButton={this.downloadAllCheckedImages}
          />

          <Container>
            <GridLayout>
              {imageListModel.images.map((imageModel, i) => (
                <Card
                  key={i}
                  imageModel={imageModel}
                  onLoad={this.handleOnLoad}
                  onError={this.handleOnError}
                  onZoomButtonClick={this.handleOnZoomButtonClick}
                  onOpenTabClick={this.handleOnOpenTabClick}
                  onDownloadButtonClick={this.handleOnDownloadButtonClick}
                  onCheckboxClick={this.handleOnCheckboxClick}
                />
              ))}
            </GridLayout>
          </Container>
        </Wrapper>
      );
    }

    initialize = () => {
      chrome.downloads.onDeterminingFilename.addListener((item, suggest) => {
        const suggestName = util.suggestNewFilename(
          settingsModel.subfolder,
          item.filename
        );
        suggest({ filename: suggestName });
      });

      settingsModel.applySettingsFromLocalStorage();
    };

    getImages = async () => {
      const { hostname, images, linkedImages } = await util.getImages();
      imageListModel.hostname = hostname;
      imageListModel.linkedImages = linkedImages;
      imageListModel.notLinkedImages = images;
    };

    handleOnLoad = (event, imageModel) => {
      imageModel.loaded = true;
      imageModel.loadFailed = false;
      imageModel.width = event.target.naturalWidth;
      imageModel.height = event.target.naturalHeight;

      imageListModel.doFilter(settingsModel.values);
    };

    handleOnError = async (event, imageModel) => {
      imageModel.loadFailed = true;
      imageModel.visible = false;

      await Swal.fire({
        title: `Load Failed: ${imageModel.src}`,
        background: `${color.voyagerDarkGrey}`,
        type: 'error',
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 4000
      });
    };

    handleOnZoomButtonClick = async imageModel => {
      await Swal.fire({
        text: imageModel.url,
        imageUrl: imageModel.src,
        imageWidth: imageModel.width,
        background: `${color.voyagerDarkGrey}`,
        showConfirmButton: false,
        showCloseButton: true
      });
    };

    handleOnOpenTabClick = imageModel => {
      chrome.tabs.create({ url: imageModel.src, active: false });
    };

    handleOnDownloadButtonClick = imageModel => {
      imageModel.download();
    };

    handleOnCheckboxClick = imageModel => {
      imageModel.checked = !imageModel.checked;
    };

    handleOnToggleCheckbox = () => {
      if (imageListModel.isCheckedAll) {
        imageListModel.uncheckAll();
      } else {
        imageListModel.checkAll();
      }
    };

    downloadAllCheckedImages = async () => {
      if (imageListModel.checkedImages.length === 0) {
        return;
      }

      imageListModel.downloadAll();

      await Swal.fire({
        title: 'Download Started!!',
        type: 'success',
        showCloseButton: false,
        background: `${color.voyagerDarkGrey}`,
        showConfirmButton: false,
        allowEnterKey: false,
        allowEscapeKey: false,
        allowOutsideClick: true
      });
    };
  }
);
