//env
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
//component
import Item_Time from './Item_Top_Elem/Item_Time';
import Item_Type from './Item_Top_Elem/Item_Type';
import Item_Drop from './Item_Top_Elem/Item_Drop';
import Main_Trans from './Item_Top_Elem/Item_Main/Main_Trans';
import Main_Activity from './Item_Top_Elem/Item_Main/Main_Activity';
import Main_Food from './Item_Top_Elem/Item_Main/Main_Food';
import Main_Hotel from './Item_Top_Elem/Item_Main/Main_Hotel';
//method
import {
  asyncGetDateItinerary,
} from '../../../../../../../../action/itinerary';
import { formateTime } from '../../../../../../../checkLog';

class Item_Top extends Component {
  state = {
    move: false,
    start: null,
    mobileEnd: null,
    hide: false
  }
  toggleEdit = () => {
    console.log('1')
    this.setState({
      move: !this.state['move'],
    })
  }
  down = (e) => {
    const clickBtn = e.target.classList.contains('show-item-edit-icon')
    const clickDrop = e.target.classList.contains('map-open-btn')
    if (clickBtn || clickDrop) return
    console.log('2')
    this.setState({ start: e.clientX })
  }
  mobileDown = (e) => {
    const clickBtn = e.target.classList.contains('show-item-edit-icon')
    const clickDrop = e.target.classList.contains('map-open-btn')
    if (clickBtn || clickDrop) return
    console.log('3')
    this.setState({ start: e.targetTouches[0].pageX })
  }
  up = (e) => {
    const clickBtn = e.target.classList.contains('show-item-edit-icon')
    const clickDrop = e.target.classList.contains('map-open-btn')
    if (clickBtn || clickDrop) return
    if (this.state.start - e.clientX > 20) {
      this.setState({ move: true })
    }
    else if (e.clientX - this.state.start > 20) {
      this.setState({ move: false })
    }
    this.setState({ start: null })
  }
  mobileMove = (e) => {
    const clickBtn = e.target.classList.contains('show-item-edit-icon')
    const clickDrop = e.target.classList.contains('map-open-btn')
    if (clickBtn || clickDrop) return
    this.setState({ mobileEnd: e.targetTouches[0].pageX })
  }
  mobileUp = (e) => {
    const clickBtn = e.target.classList.contains('show-item-edit-icon')
    const clickDrop = e.target.classList.contains('map-open-btn')
    if (clickBtn || clickDrop) return
    const start = this.state.start
    const end = this.state.mobileEnd
    if (start - end > 25) {
      this.setState({ move: true })
    }
    else if (end - start > 25) {
      this.setState({ move: false })
    }
    this.setState({ start: null, mobileEnd: null })
  }
  deltet = (e) => {
    // e.currentTarget.style.display='none'
    this.props.deleteItem(this.props.id)
  }
  render() {
    let {
      toggleOpen,
      main,
      type,
      time,
      sub_type,
      sub,
      map,
      getEditData,
      id } = this.props
    sub = sub.filter(el => el.value !== '')
    time = time.seconds
    return (
      <div
        style={this.state.hide ? { display: 'none' } : { display: 'flex' }}
        id={`item-top-${id}`}
        className={`i-item-top plan ${this.state.move ? 'right' : null}`}
        onMouseUp={this.up}
        onMouseDown={this.down}
        onTouchStart={this.mobileDown}
        onTouchMove={this.mobileMove}
        onTouchEnd={this.mobileUp}
      >
        <div className="i-item-top-inner">
          <Item_Time time={formateTime(time)} />
          <Item_Type
            type={type}
          />
          {type === 'trans' ?
            <Main_Trans
              main={main}
              sub_type={sub_type} /> : null}
          {type === 'food' ? <Main_Food main={main} /> : null}
          {type === 'activity' ? <Main_Activity main={main} /> : null}
          {type === 'hotel' ? <Main_Hotel main={main} /> : null}
          {
            map.length > 0 || sub.length > 0 ?
              <Item_Drop
                id={id}
                toggleOpen={toggleOpen} />
              : null
          }
          <div
            className='i-top-block edit'
            onClick={this.toggleEdit}
          >
            <div className='show-item-edit-icon'></div>
          </div>
        </div>
        <div className='i-item-edit-wrap'>
          <div
            className="i-item-edit-btn edit"
            onClick={() => getEditData(id)}>
            <div className="i-item-edit-icon edit"></div>
          </div>
          <div
            className="i-item-edit-btn delete"
            onClick={this.deltet}>
            <div className="i-item-edit-icon delete"></div>
          </div>
        </div>
      </div>
    )
  }
}
export default connect()(Item_Top);
