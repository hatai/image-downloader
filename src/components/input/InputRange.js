import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import nouislider from 'nouislider'
// import wNumb from 'wnumb'
// import 'nouislider/distribute/nouislider.min.css'
// import '../assets/style/InputRange.css'
import Range from '../rc-slider/Range'
import '../../assets/style/rc-slider/index.css'

export default class InputRange extends Component {
  static propTypes = {
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

  static defaultProps = {
    step: 1,
    onChange: () => {},
  }

  render () {
    const {
      id,
      minValue,
      maxValue,
      values,
      onChange,
      step,
    } = this.props

    return (
      <div className={'slider'} id={id}>
        <Range
          min={minValue}
          max={maxValue}
          defaultValue={[values.min, values.max]}
          value={[values.min, values.max]}
          onChange={onChange}
          count={step}
          allowCross={false}
          disabled={[!values.minEnabled, !values.maxEnabled]}
        />
      </div>
    )
  }
}
