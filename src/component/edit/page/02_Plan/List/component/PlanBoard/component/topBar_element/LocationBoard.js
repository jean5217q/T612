import React, { Component } from 'react'
import PropTypes from 'prop-types';

class LocationBoard extends Component {
  render() {
    const {
      location,
      locationBoard,
      label,
      placeholder,
      submit,
      setLocation,
      updateLocation } = this.props
  return (
    <div
      className='edit-top-inner'
      style={locationBoard ? { display: 'flex' } : { display: 'none' }}>
      <div className="edit-top-block">
        <div className="edit-top-title">{label}</div>
          <input
            className="edit-top-input"
            placeholder={placeholder}
            value={location}
            onChange={setLocation} />
      </div>
      <form
        className="edit-top-block"
        onSubmit={updateLocation}>
        <button
          className="edit-top-block-edit-buttom"
          type='submit'>{submit}
        </button>
      </form>
    </div>
    )
  }
}

LocationBoard.propTypes = {
  location: PropTypes.string,
  locationBoard: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  submit: PropTypes.string,
  setLocation: PropTypes.func,
  updateLocation: PropTypes.func
}

export default LocationBoard;


