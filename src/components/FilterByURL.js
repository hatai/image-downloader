import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FilterByURL extends Component {
  render () {
    const {props} = this

    return (
      <div className={'field'}>
        {/* label */}
        <label className={'label'}>{props.label}</label>

        <div className={'field has-addons'}>

          {/* select */}
          <p className={'control'}>
            <span className={'select is-small'}>
              <select
                onChange={async (event) => {
                  event.persist()
                  props.onSelect(event)
                }}
              >
                {props.options.map(option => (
                  <option value={option.value} key={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </span>
          </p>

          {/* input */}
          <p className={'control is-expanded'}>
            <input
              className={'input is-small'}
              type={'text'}
              placeholder={props.placeholder}
              onChange={props.onChange}
            />
          </p>

        </div>
      </div>
    )
  }
}

FilterByURL.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number,
    })
  ),
  onSelect: PropTypes.func,
  onChange: PropTypes.func,
}

export default FilterByURL
