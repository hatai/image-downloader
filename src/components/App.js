/* eslint-env webextensions */

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styled, { createGlobalStyle } from 'styled-components';
import swal from 'sweetalert2';
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
    static propTypes = {};

    componentWillMount() {
      void this.initialize();
    }

    componentDidMount() {
      // TODO: 表示できる画像がなかった場合のメッセージ表示
      this.getImages().then(() => {
        imageListModel.doFilter(settingsModel);
      });
    }

    render() {
      return (
        <div>
          {/* TODO: スクロールバーのせいでいろいろと面倒なので治す */}
          {/* TODO: 設定をローカルストレージに保存 */}
          {/* TODO: 設定をサイトごとに保持？ */}
          <GlobalStyles />

          {/* TODO: デザインもうちょっとカッコよくしたい */}
          <Header
            imageListModel={imageListModel}
            settingsModel={settingsModel}
            onToggleCheckbox={this.handleOnToggleCheckbox}
            onClickDownloadButton={this.downloadAllCheckedImages}
          />

          {/* TODO: 画像のダウンロードはバックグラウンドスクリプトにやらせる? */}
          {/* TODO: 画像ダウンロード中のモーダル表示 */}
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
      settingsModel.values = await util.getSavedOptions('options');
    };

    getImages = async () => {
      const { images, linkedImages } = await util.getImages();
      imageListModel.linkedImages = linkedImages;
      imageListModel.notLinkedImages = images;
    };

    handleOnLoad = (event, imageModel) => {
      imageModel.loadFailed = false;
      imageModel.width = event.target.naturalWidth;
      imageModel.height = event.target.naturalHeight;
    };

    handleOnError = (event, imageModel) => {
      // TODO: エラー時の処理考える
      // TODO: 一部読み込めなかった旨のトースト表示？
      imageModel.loadFailed = true;
      imageModel.visible = false;
    };

    handleOnZoomButtonClick = imageModel => {
      swal.fire({
        text: imageModel.src.split(/[#?]/)[0],
        imageUrl: imageModel.src,
        imageWidth: imageModel.width,
        imageHeight: imageModel.height,
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

    downloadAllCheckedImages = () => {
      imageListModel.downloadAll();
    };
  }
);

export default App;
