import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EmptyBoard extends Component {
  render() {
    const { empty, emp, lang } = this.props 
    console.log(emp)
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

EmptyBoard.propTypes = {
  lang: PropTypes.number,
  empty: PropTypes.bool,
  emp: PropTypes.object
}

export default EmptyBoard;