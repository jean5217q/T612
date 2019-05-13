import React, { Component } from 'react';

class LoadingBoard extends Component {
  render() {
    const { loading } = this.props 
    return (
      < div
        style={loading ? { display: 'flex' } : { display: 'none' }}
        className='budget-project-item add'>
        <div className='sm-loader-wrap'>
          <div className='sm-loader'></div>
        </div>
      </div>
    )
  }
}

export default LoadingBoard;