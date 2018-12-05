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
    width: 760px;
    height: 100%;
    background-color: ${color.charcoalGreyTwo};
  }
`;

const App = observer(
  class App extends Component {
    componentWillMount() {
      // TODO: Loading 画面の表示
      // TODO: 表示できる画像がなかった場合のメッセージ表示

      this.initialize().catch(error => console.log(error));

      this.getImages().catch(error => console.log(error));
    }

    render() {
      const { imageListModel } = this.props;

      return (
        <div>
          <GlobalStyles />

          {/* TODO: オプションの表示 */}
          {/* TODO: 全部チェックするボタン */}
          {/* TODO: チェックされているものをダウンロードするボタン */}
          <Header />

          {/* TODO: スタイルの調整 */}
          <GridLayout>
            {imageListModel.images.map(image => (
              <Card
                image={image}
                src={image.src}
                checked={image.checked}
                onLoad={this.handleOnLoad}
                onError={this.handleOnError}
                onDownloadButtonClick={this.handleOnDownloadButtonClick}
                onEyeButtonClick={this.handleOnEyeButtonClick}
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

    handleOnLoad = (event, image) => {
      image.width = event.target.naturalWidth;
      image.height = event.target.naturalHeight;
    };

    handleOnError = (event, image) => {
      // TODO: エラー時の処理考える
      image.visible = false;
    };

    handleOnDownloadButtonClick = image => {
      chrome.downloads.download({ url: image.src });
    };

    handleOnEyeButtonClick = image => {
      //  TODO: EYE ボタンが押されたときの処理（モーダルで画像表示？）
    };

    handleOnCheckboxClick = image => {
      image.checked = !image.checked;
    };

    downlodAllCheckedImages = () => {
      const { imageListModel } = this.props;
      imageListModel.checkedImages.forEach(async image => {
        chrome.downloads.download({ url: image.src });
      });
    };
  }
);

export default App;
