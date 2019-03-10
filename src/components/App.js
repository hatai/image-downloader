/* eslint-env webextensions */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import styled, { createGlobalStyle } from 'styled-components';
import swal from 'sweetalert2';
import GridLayout from './GridLayout';
import Header from './Header';
import Card from './Card';
import color from '../utils/colors';
import * as util from '../utils/index';
import '../assets/style/index.scss';

const GlobalStyles = createGlobalStyle`
  body {
    width: 770px;
    height: 100%;
    min-height: 560px;
    max-height: 100%;
    background-color: ${color.charcoalGreyTwo};
    overflow-x: hidden;
  }
`;

const Container = styled.div`
  padding-top: 65px;
`;

const App = observer(
  class App extends Component {
    static propTypes = {
      imageListModel: PropTypes.object.isRequired,
      settingsModel: PropTypes.object.isRequired
    };

    componentWillMount() {
      // TODO: 表示できる画像がなかった場合のメッセージ表示
      Promise.all([this.initialize(), this.getImages()]).catch(error =>
        console.log(error.toString())
      );
    }

    render() {
      const { imageListModel, settingsModel } = this.props;

      return (
        <div>
          <GlobalStyles />

          {/* TODO: 各ボタンを Grid で並べる */}
          <Header
            imageListModel={imageListModel}
            settingsModel={settingsModel}
            onToggleCheckbox={this.handleOnToggleCheckbox}
            onClickDownloadButton={this.downloadAllCheckedImages}
          />

          {/* TODO: 画像のダウンロードはバックグラウンドスクリプトにやらせる */}
          <Container>
            <GridLayout>
              {imageListModel.images.map((imageModel, i) => (
                // TODO: マウスオーバー時のハイライト
                // TODO: マウスオーバーで画像サイズ表示
                <Card
                  key={i}
                  imageModel={imageModel}
                  src={imageModel.src}
                  title={imageModel.src.split(/[?#]/)[0]}
                  checked={imageModel.checked}
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
        </div>
      );
    }

    initialize = async () => {
      const { settingsModel } = this.props;

      await this.setOptionsFromStorage();
      chrome.downloads.onDeterminingFilename.addListener((item, suggest) => {
        const suggestName = util.suggestNewFilename(
          settingsModel.subfolder,
          item.filename
        );
        suggest({ filename: suggestName });
      });
    };

    setOptionsFromStorage = async () => {
      const { settingsModel } = this.props;
      settingsModel.values = await util.getSavedOptions('options');
    };

    getImages = async () => {
      const { imageListModel } = this.props;
      const { images, linkedImages } = await util.getImages();
      imageListModel.linkedImages = linkedImages;
      imageListModel.notLinkedImages = images;
    };

    handleOnLoad = (event, imageModel) => {
      imageModel.width = event.target.naturalWidth;
      imageModel.height = event.target.naturalHeight;
    };

    handleOnError = (event, imageModel) => {
      // TODO: エラー時の処理考える
      imageModel.visible = false;
    };

    handleOnZoomButtonClick = imageModel => {
      swal.fire({
        text: imageModel.src.split(/[#?]/)[0],
        imageUrl: imageModel.src,
        imageWidth: imageModel.width,
        imageHeight: imageModel.height,
        // width: "auto",
        background: `${color.voyagerDarkGrey}`,
        showConfirmButton: false,
        showCloseButton: true
      });
    };

    handleOnOpenTabClick = imageModel => {
      chrome.tabs.create({ url: imageModel.src, active: false });
    };

    handleOnDownloadButtonClick = imageModel => {
      chrome.downloads.download({ url: imageModel.src });
    };

    handleOnCheckboxClick = imageModel => {
      imageModel.checked = !imageModel.checked;
    };

    handleOnToggleCheckbox = () => {
      const { imageListModel } = this.props;

      if (imageListModel.isCheckedAll) {
        imageListModel.uncheckAll();
      } else {
        imageListModel.checkAll();
      }
    };

    downloadAllCheckedImages = () => {
      const { imageListModel } = this.props;
      imageListModel.checkedImages.forEach(async imageModel => {
        chrome.downloads.download({ url: imageModel.src });
      });
    };
  }
);

export default App;
