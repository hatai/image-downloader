import React, { Component } from 'react'
import PropTypes from 'prop-types'
import nouislider from 'nouislider'
import wNumb from 'wnumb'
import 'nouislider/distribute/nouislider.min.css'
import '../assets/style/InputRange.css'

class InputRange extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      slider: null,
    }
  }

  componentDidMount () {
    const {props} = this
    const slider = document.getElementById(props.id)
    nouislider.create(slider, {
      start: [props.values.min, props.values.max],
      connect: true,
      behaviour: 'tap-drag',
      tooltips: false,
      step: props.step,
      range: {
        min: props.minValue,
        max: props.maxValue
      },
      format: wNumb({decimals: 0}),
      margin: 0,
    })

    const origins = slider.getElementsByClassName('noUi-origin')
    this._switchDisabled(origins[0], props.values.minEnabled)
    this._switchDisabled(origins[1], props.values.maxEnabled)

    slider.noUiSlider.on('update', (values, handle, unencoded, tap, position) => {
      props.onChange(values, handle, unencoded, tap, position)
    })

    this.setState({slider})
  }

  componentWillReceiveProps (nextProps) {
    const {state, props} = this

    if (nextProps.values.minEnabled !== props.values.minEnabled) {
      const origins = state.slider.getElementsByClassName('noUi-origin')
      this._switchDisabled(origins[0], nextProps.values.minEnabled)
    }

    if (nextProps.values.maxEnabled !== props.values.maxEnabled) {
      const origins = state.slider.getElementsByClassName('noUi-origin')
      this._switchDisabled(origins[1], nextProps.values.maxEnabled)
    }
  }

  render () {
    const {props} = this

    return (
      <div className={'slider'}>
        <div id={props.id}/>
      </div>
    )
  }

  async _switchDisabled (element, disabled) {
    switch (disabled) {
      case true:
        element.removeAttribute('disabled')
        break
      case false:
        element.setAttribute('disabled', true)
        break
      default:
        return
    }
  }
}

InputRange.propTypes = {
  id: PropTypes.string.isRequired,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  values: PropTypes.shape({
    minEnabled: PropTypes.bool.isRequired,
    maxEnabled: PropTypes.bool.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }),
  step: PropTypes.number,
  onChange: PropTypes.func,
}

InputRange.defaultProps = {
  step: 1,
}

export default InputRange
