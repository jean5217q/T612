//env
import React, { Component } from 'react'
import { connect } from 'react-redux'


class Position_Item extends Component {
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

export default connect()(Position_Item)
