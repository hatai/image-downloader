import React, { Component } from 'react';
import PropTypes from 'prop-types';
import wNumb from 'wnumb';
import InputRange from './input/InputRange';
import InputCheckbox from './input/InputCheckbox';
import '../assets/style/FilterSlider.css';

export default class FilterSlider extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    minValue: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    values: PropTypes.shape({
      minEnabled: PropTypes.bool.isRequired,
      maxEnabled: PropTypes.bool.isRequired,
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
    }),
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.shape({
      min: PropTypes.func.isRequired,
      max: PropTypes.func.isRequired,
    })
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      format: wNumb({suffix: ' px'})
    }
  }


  render () {
    const {props, state} = this

    return (
      <div className={"field filter-slider"}>
        {/* label */}
        <div className={"slider-label"}>
          <span>{props.label}</span>
        </div>

        {/* left checkbox */}
        <div className={"slider-checkbox__left"}>
          <InputCheckbox
            label={state.format.to(props.values.min)}
            labelPosition={'left'}
            checked={props.values.minEnabled}
            isHandleDisabled={true}
            onClick={async (event, checked) => props.onClick.min(checked)}
            style={{fontSize: '.55rem'}}
          />
        </div>

        {/* slider */}
        <div className={"slider-area"}>
          <InputRange
            id={props.id}
            minValue={props.minValue}
            maxValue={props.maxValue}
            values={props.values}
            onChange={props.onChange}
          />
        </div>

        {/* left checkbox*/}
        <div className={"slider-checkbox__right"}>
          <InputCheckbox
            label={state.format.to(props.values.max)}
            checked={props.values.maxEnabled}
            isHandleDisabled={true}
            onClick={async (event, checked) => props.onClick.max(checked)}
            style={{fontSize: '.55rem'}}
          />
        </div>
        
      </div>
    );
  }
}
