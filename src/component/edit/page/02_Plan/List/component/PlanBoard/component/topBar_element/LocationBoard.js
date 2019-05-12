import React, { Component } from 'react'

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

export default LocationBoard;


