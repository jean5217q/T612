import React, { Component } from 'react'

class MenuBoard extends Component {
  render() {
    const {
      menuBoard,
      locationTitle,
      dateTilte,
      showLocationBoard,
      showDateBoard
    } = this.props
    return (
      <div
        className='edit-top-step1'
        style={menuBoard ? { display: 'flex' } : { display: 'none' }}>
        <div
          className='step1-btn'
          onClick={showLocationBoard}>
          {locationTitle}
        </div>
        <div
          className='step1-btn'
          onClick={showDateBoard}>
          {dateTilte}
        </div>
      </div>
    )
  }
}

export default MenuBoard;