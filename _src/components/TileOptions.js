import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connectStore } from 'redux-box'
import { Collapse } from 'react-collapse'
import { module as optionModule } from '../store/option'
import Icon from './common/Icon'
import InputText from './input/InputText'
import InputCheckBox from './input/InputCheckbox'
import FilterByURL from './FilterByURL'
import FilterSlider from './FilterSlider'


@connectStore({
  option: optionModule,
})
class TileOptions extends Component {
  static propTypes = {
    isOpened: PropTypes.bool.isRequired,
    handleCollapse: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isOpened: false,
  }

  constructor (props) {
    super(props)

    this.state = {
      input: {
        subfolder: 'Save to Subfolder',
        filter: 'Filter by URL',
      },
      select: {
        options: [{
          name: 'Normal',
          value: 0
        }, {
          name: 'Wildcard',
          value: 1,
        }, {
          name: 'Regex',
          value: 2,
        }]
      },
    }

    this._handleOnChange__left = this._handleOnChange__left.bind(this)
    this._handleOnChange__right = this._handleOnChange__right.bind(this)
  }

  render () {
    const {input, select} = this.state
    const {option} = this.props

    return (
      <div className={'tile is-child'}>
        <article className={'tile notification is-info'}>
          <div className={'flex is-column'}>
            {/* サブタイトル */}
            <div onClick={this.props.handleCollapse}>
              <p className={'subtitle'}>
                <Icon name={
                  this.props.isOpened
                    ? 'mdi mdi-chevron-down'
                    : 'mdi mdi-chevron-right'}
                />
                OPTIONS
              </p>
            </div>

            <Collapse isOpened={this.props.isOpened}>
              {/* 保存先サブフォルダ */}
              <InputText
                label={input.subfolder}
                placeholder={input.subfolder}
                onChange={async event => option.setSubfolder(event.target.value)}
              />

              {/* フィルタ */}
              <FilterByURL
                label={input.filter}
                placeholder={input.filter}
                options={select.options}
                onSelect={async event => {
                  const options = event.target.options
                  const selectedIndex = event.target.options.selectedIndex
                  const selectedValue = options[selectedIndex].value
                  option.setFilterType(selectedValue)
                }}
                onChange={async event => {
                  const value = event.target.value
                  option.setFilter(value)
                }}
              />

              {/* 画像の幅フィルタ */}
              <FilterSlider
                id={'width-slider'}
                label={'Width'}
                minValue={0}
                maxValue={3000}
                values={{
                  minEnabled: option.minWidthEnabled,
                  maxEnabled: option.maxWidthEnabled,
                  min: option.minWidth,
                  max: option.maxWidth,
                }}
                onChange={async values => {
                  const min = Number(values[0])
                  const max = Number(values[1])
                  option.setMinWidth(min)
                  option.setMaxWidth(max)
                }}
                onClick={{
                  min: async checked => option.setMinWidthEnabled(checked),
                  max: async checked => option.setMaxWidthEnabled(checked),
                }}
              />

              {/* 画像の高さフィルタ */}
              <FilterSlider
                id={'height-slider'}
                label={'Height'}
                minValue={0}
                maxValue={3000}
                values={{
                  minEnabled: option.minHeightEnabled,
                  maxEnabled: option.maxHeightEnabled,
                  min: option.minHeight,
                  max: option.maxHeight,
                }}
                onChange={async values => {
                  const min = Number(values[0])
                  const max = Number(values[1])
                  option.setMinHeight(min)
                  option.setMaxHeight(max)
                }}
                onClick={{
                  min: async checked => option.setMinHeightEnabled(checked),
                  max: async checked => option.setMaxHeightEnabled(checked),
                }}
              />

              {/* チェックボックス */}
              <InputCheckBox
                label={'Only images from links'}
                checked={option.onlyImagesFromLinks}
                onClick={async (_, checked) => option.setOnlyImagesFromLinks(checked)}
              />
            </Collapse>

          </div>
        </article>
      </div>
    )
  }

  async _handleOnChange__left (values) {
    const min = Number(values[0])
    const max = Number(values[1])
    this.setState({
      sliderValue: Object.assign(
        this.state.sliderValue, {
          left: {
            min,
            max,
          }
        })
    })
  }

  async _handleOnChange__right (values) {
    const min = Number(values[0])
    const max = Number(values[1])
    this.setState({
      sliderValue: Object.assign(
        this.state.sliderValue, {
          right: {
            min,
            max,
          }
        })
    })
  }
}

export default TileOptions