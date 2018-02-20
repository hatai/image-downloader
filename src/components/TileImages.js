import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import swal from 'sweetalert2'
import { connectStore } from 'redux-box'
import { module as optionModule } from '../store/option'
import { module as imageModule } from '../store/image'
import Icon from './Icon'
import InputCheckbox from './InputCheckbox'
import Button from './Button'
import ImageCheckbox from './ImageCheckbox'
import '../assets/style/TileImages.css'

@connectStore({
  option: optionModule,
  image: imageModule,
})
class TileImages extends Component {
  state = {
    checked: false
  }

  constructor (props, context) {
    super(props, context)

    this._handleOnClickDownloadButton = this._handleOnClickDownloadButton.bind(this)
  }


  render () {
    const {image} = this.props
    const downloadButtonIsDisabled = !image.images.find(image => image.checked)

    return (
      <div id={`tile-image`}>
        <div className={'tile is-child'}>
          <div className={'tile notification is-primary'}>
            <div className={'tile-images'}>

              {/* header */}
              <div className={'flex is-row is-space-between tile-images__header'}>

                {/* checkbox */}
                <div className={'tile-images__checkbox'}>
                  <InputCheckbox
                    label={`Select ALL (${image.images.filter(image => image.checked).length}/${image.images.length})`}
                    onClick={async (event, checked) => {
                      checked ? image.checkAll() : image.uncheckAll()
                    }}
                    checked={image.checkedAll}
                  />
                </div>

                {/* download button */}
                <div className={'tile-images__button'}>
                  <Button
                    onClick={this._handleOnClickDownloadButton}
                    title={'Download'}
                    disabled={downloadButtonIsDisabled}
                    info={true}
                  >
                    <Icon name={'mdi mdi-cloud-download'}/>
                  </Button>
                </div>

              </div>

              {/* body */}
              <div className={'tile-images__body'}>
                {/*<div id={'columns'}>*/}
                {image.images
                  .map((data, i) => (
                    <ImageCheckbox
                      key={i}
                      src={data.src}
                      checked={data.checked}
                      onClick={async () => image.check(i)}
                    />
                  ))}
                {/*</div>*/}
              </div>

              {/* hidden images that is used get size */}
              <div className={`hidden-image`}>
                {image.sources.map((data, i) => (
                  <div>
                    <img
                      key={i}
                      src={data.src}
                      alt={data.src}
                      onLoad={async event => {
                        const width = event.target.naturalWidth
                        const height = event.target.naturalHeight
                        image.setNaturalSize(i, width, height)
                      }}
                      onError={async () => image.remove(i)}
                    />
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }

  async _handleOnClickDownloadButton () {
    await swal({
      title: 'Downloading...',
      text: 'Please wait until download is over',
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading()

        // shortcut
        const isChecked = data => data.checked
        const images = this.props.image.images
        const checkedNum = images.filter(isChecked).length - 1

        // download images
        images.filter(isChecked).forEach((image, i) => {
          chrome.downloads.download({url: image.src}, () => {
            if (checkedNum === i) {
              // modal close
              swal.close()
            }
          })
        })
      }
    })
  }
}

TileImages.propTypes = {}

export default TileImages