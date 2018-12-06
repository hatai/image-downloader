/* eslint-env webextensions */

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { createGlobalStyle } from 'styled-components';
import GridLayout from './GridLayout';
import Header from './Header';
import Card from './Card';
import color from '../utils/colors';
import * as util from '../utils/index';

const GlobalStyles = createGlobalStyle`
  body {
    width: 770px;
    height: 100%;
    min-height: 560px;
    max-height: 100%;
    background-color: ${color.charcoalGreyTwo};
  }
`;

const App = observer(
  class App extends Component {
    componentWillMount() {
      // TODO: 表示できる画像がなかった場合のメッセージ表示
      Promise.all([this.initialize(), this.getImages()]).catch(error =>
        console.log(error)
      );
    }

    render() {
      const { imageListModel } = this.props;

      return (
        <div>
          <GlobalStyles />

          {/* TODO: オプションの表示 */}
          {/* TODO: 全部チェックするボタン */}
          {/* TODO: チェックされているものをダウンロードするボタン */}
          {/* TODO: Header デザイン考える */}
          <Header />

          {/* TODO: スタイルの調整 */}
          <GridLayout>
            {imageListModel.images.map(imageModel => (
              // TODO: 画像が表示されるまで Loading 画面表示
              // TODO: Footer が画像に少しかぶるのを治す？
              // TODO: マウスオーバー時のハイライト
              <Card
                imageModel={imageModel}
                src={imageModel.src}
                checked={imageModel.checked}
                onLoad={this.handleOnLoad}
                onError={this.handleOnError}
                onEyeButtonClick={this.handleOnEyeButtonClick}
                onOpenTabClick={this.handleOnOpenTabClick}
                onDownloadButtonClick={this.handleOnDownloadButtonClick}
                onCheckboxClick={this.handleOnCheckboxClick}
              />
            ))}
          </GridLayout>
        </div>
      );
    }

    initialize = async () => {
      const { optionModel } = this.props;

      await this.setOptionsFromStorage();
      chrome.downloads.onDeterminingFilename.addListener((item, suggest) => {
        const suggestName = util.suggestNewFilename(
          optionModel.subfolder,
          item.filename
        );
        suggest({ filename: suggestName });
      });
    };

    setOptionsFromStorage = async () => {
      const { optionModel } = this.props;
      optionModel.values = await util.getSavedOptions('options');
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

    handleOnEyeButtonClick = imageModel => {
      //  TODO: EYE ボタンが押されたときの処理（モーダルで画像表示？）
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

    downlodAllCheckedImages = () => {
      const { imageListModel } = this.props;
      imageListModel.checkedImages.forEach(async imageModel => {
        chrome.downloads.download({ url: imageModel.src });
      });
    };
  }
);

export default App;
