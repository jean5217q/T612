import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Type_Icon extends Component {
  render() {
    const { type,sub_type } = this.props
    return (
      <div className="i-top-block type">
        <div className={`type ${type} ${sub_type}`}>
          <div className="icon"></div>
        </div>
      </div>
    )
  }
}

Type_Icon.propTypes = {
  type: PropTypes.string,
  sub_type: PropTypes.string
}

export default Type_Icon