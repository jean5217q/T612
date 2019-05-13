import React, { Component } from 'react';

class EmptyBoard extends Component {
  render() {
    const { empty,emp } = this.props 
    return (
      <div
        style={!empty ? { display: 'none' } : { display: 'flex' }}
        className='list-empty-wrap overview'>
        <div className={`list-empty-img plan`}></div>
        <div className='list-empty-text cost'>
          {emp['p_day_empty'][lang]}
        </div>
      </div>
    )
  }
}

export default EmptyBoard;