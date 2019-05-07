import React, { Component } from 'react';
import Item_Bottom from './item_bottom/item_bottom';
import Item_Top from './item_top/Item_Top';

class List_Item extends Component {
  state = {
    open: false
  }
  toggleOpen = (id) => {
    const origin = window.scrollTop
    const target = document.getElementById(`item-top-${id}`)
    const position = target.getBoundingClientRect()
    const top = position.top
    this.setState({ open: !this.state['open'] }, () => {
      const { open } = this.state
      if (open) window.scrollTo({ top, behavior: 'smooth' });
      else window.scrollTo({ top: origin, behavior: 'smooth' })
    })
  }
  render() {
    const {
      item,
      id,
      route,
      index,
      deleteItem,
      getEditData,
    lang }
      = this.props
    const { content, time, type, sub_type } = item
    const { main, sub, map } = content
    return (
      <li className="i-item lg">
        <Item_Top
          id={id}
          main={main}
          sub_type={sub_type}
          time={time}
          type={type}
          map={map}
          sub={sub}
          toggleOpen={this.toggleOpen}
          projectId={this.props.projectId}
          dateId={this.props.dateId}
          deleteItem={deleteItem}
          route={route}
          index={index}
          getEditData={getEditData}
          lang={lang} />
        <Item_Bottom
          id={id}
          sub={sub}
          open={this.state.open}
          projectId={this.props.projectId}
          dateId={this.props.dateId}
          map={map}
          lang={lang} />
      </li>
    )
  }
}

export default List_Item;