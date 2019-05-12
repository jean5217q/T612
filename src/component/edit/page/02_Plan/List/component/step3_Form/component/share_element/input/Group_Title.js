import React, { Component } from 'react';

class Group_Title extends Component {
  render() {
    const { title } = this.props
    return (
      <div className='add-select-title-wrap'>
        <div className='add-select-title-decor'></div>
        <div className='add-select-title-text'>{title}</div>
      </div>
    )
  }
}

export default Group_Title