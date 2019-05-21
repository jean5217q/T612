import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item_Bottom from './item_bottom/Item_bottom';
import Item_Top from './item_top/Item_Top';

class List_Item extends Component {
  state = {
    subItemShowing: false
  }
  toggleSubItem = (id) => {
    console.log(id)
    const origin = window.scrollTop
    const target = document.getElementById(`item-top-${id}`)
    const position = target.getBoundingClientRect()
    const top = position.top
    this.setState({ subItemShowing: !this.state['subItemShowing'] }, () => {
      const { subItemShowing } = this.state
      if (subItemShowing) window.scrollTo({ top, behavior: 'smooth' });
      else window.scrollTo({ top: origin, behavior: 'smooth' })
    })
  }
  render() {
    const {
      lang,
      projectId,
      dateId,
      item,
      id,
      route,
      deleteItem,
      getEditData
    } = this.props
    const { content, time, type, sub_type } = item
    const { main, sub, map } = content
    return (
      <li className="i-item lg">
        <Item_Top
          lang={lang}
          projectId={projectId}
          dateId={dateId}
          id={id}
          main={main}
          sub_type={sub_type}
          time={time}
          type={type}
          map={map}
          sub={sub}
          route={route}
          toggleSubItem={this.toggleSubItem}
          deleteItem={deleteItem}   
          getEditData={getEditData}/>
        <Item_Bottom
          lang={lang}
          projectId={projectId}
          dateId={dateId}
          id={id}
          sub={sub}
          map={map}
          subItemShowing={this.state.subItemShowing}/>
      </li>
    )
  }
}

List_Item.propTypes = {
  lang: PropTypes.number,
  projectId: PropTypes.string,
  dateId: PropTypes.string,
  item: PropTypes.object,
  id: PropTypes.string,
  route: PropTypes.object,
  deleteItem: PropTypes.func,
  getEditData: PropTypes.func,
}

export default List_Item;