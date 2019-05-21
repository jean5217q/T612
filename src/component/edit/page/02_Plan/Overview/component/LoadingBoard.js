import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoadingBoard extends Component {
  render() {
    const { loading } = this.props 
    return (
      < div
        style={loading ? { display: 'flex' } : { display: 'none' }}
        className='daily-card add'>
        <div className='sm-loader-wrap'>
          <div className='sm-loader'></div>
        </div>
      </div>
    )
  }
}

LoadingBoard.propTypes = {
  loading: PropTypes.bool,
}

export default LoadingBoard;