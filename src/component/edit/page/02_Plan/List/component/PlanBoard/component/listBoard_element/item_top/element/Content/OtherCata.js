import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OtherCata extends Component {
  render() {
    const { main } = this.props;
    return (
      <div className="i-top-block main">
        <div className="i-top-main-block info">
          <div className="i-top-main-place">
            <div className="i-top-main-title">{main.location}</div>
          </div>
        </div> 
      </div>
    )
  }
}

OtherCata.propTypes = {
  main: PropTypes.object
}

export default OtherCata