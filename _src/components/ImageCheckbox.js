import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../assets/style/ImageCheckbox.css'

export default class ImageCheckbox extends Component {
  static propTypes = {
    src: PropTypes.any.isRequired,
    checked: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      isActive: false,
    }

    this._handleModal = this._handleModal.bind(this)
    this._handleDownload = this._handleDownload.bind(this)
  }

  render () {
    const {state, props} = this

    return (
      <div className={'image-checkbox'}>
        <div className={'card'}>
          <div
            className={'card-image'}
            onClick={async event => {
              event.preventDefault()
              props.onClick(event)
            }}
          >
            <figure className={'image'}>
              <img
                async
                src={props.src}
                alt={props.src}
                onLoad={props.onLoad}
                onError={props.onError}
              />
            </figure>

            <span className={`icon is-large has-text-primary`}>
              <i className={`opacity65 mdi mdi-48px mdi-${props.checked ? 'checkbox-marked' : 'checkbox-blank-outline'}`}/>
            </span>
          </div>
          <div className={'card-content'}>
            <div className={'content'}>
              <div className="control">
                <input
                  className="input is-small"
                  type="text"
                  value={props.src}
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>
          <footer className={'card-footer'}>
            <a onClick={this._handleModal} className={'card-footer-item'}>
              Open
            </a>
            <a onClick={this._handleDownload} className={'card-footer-item'}>
              Download
            </a>
          </footer>
        </div>

        {/* Image Modal */}
        <div className={`modal ${state.isActive ? 'is-active' : ''}`}>
          <div className="modal-background" onClick={this._handleModal}/>
          <div className="modal-content">
            <p className="image">
              <img async src={props.src} alt={props.src} onClick={this._handleModal}/>
            </p>
          </div>
          <button onClick={this._handleModal} className="modal-close is-large" aria-label="close"/>
        </div>
      </div>
    )
  }

  async _handleModal () {
    this.setState({isActive: !this.state.isActive})
  }

  async _handleDownload () {
    // eslint-disable-next-line no-undef
    chrome.downloads.download({url: this.props.src})
  }
}
