import React, { Component } from 'react'
import PropTypes from 'prop-types';

class MapItem extends Component {
  render() {
    const { name, deleteMapList } = this.props
    return (
      <li className="add-map-local-item">
        <div className="add-map-local-item-title">{name}</div>
        <div
          className="add-map-local-item-delete"
          onClick={() => deleteMapList(name)}></div>
      </li>
    )
  }
}

MapItem.propTypes = {
  name: PropTypes.string,
  deleteMapList: PropTypes.func,
}

export default MapItem;
