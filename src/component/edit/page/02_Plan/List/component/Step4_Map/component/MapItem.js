import React, { Component } from 'react'

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

export default MapItem;
