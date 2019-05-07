//env
import React, { Component } from 'react';
//component
import Item_Show from './Budget_Item/Item_show';
import Item_Edit from './Budget_Item/Item_edit';
import { connect } from 'react-redux';

class Budget_List_Item extends Component {
  state = {
    move: false,
    start: null,
    mobileEnd: null,
    openEditFrame: false
  }
  closeEditFrame = () => {
    this.setState({
      openEditFrame: false
    })
  }
  handleOpenEditFrame = (e) => {
    this.setState({
      openEditFrame: true,
      move: false
    })
  }
  toggleEdit = () => {
    this.setState({
      move: !this.state['move']
    })
  }
  backToOrigin = () => {
    this.setState({
      move: false
    })
  }
  //滑鼠點擊當下
  mouseDown = (e) => {
    this.setState({ start: e.clientX })
  }
  //滑鼠放開
  mouseUp = (e) => {
    if (e.target.classList.contains('budget-show-item-edit-icon')) return
    if (this.state.start - e.clientX > 20) {
      this.setState({ move: true })
    }
    else if (e.clientX - this.state.start > 20) {
      this.setState({ move: false })
    }
    this.setState({ start: null })
  }
  //手指點擊當下
  mobileDown = (e) => {
    this.setState({ start: e.targetTouches[0].pageX })
  }
  //手指滑動過程
  mobileMove = (e) => {
    this.setState({ mobileEnd: e.targetTouches[0].pageX })
  }
  //手指放開
  mobileUp = (e) => {
    if (e.target.classList.contains('budget-show-item-edit-icon')) return
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
  //刪除項目

  render() {
    const {
      item,
      type,
      projectId,
      dateId,
      index,
      deleteItem,
      editItem,
      formateAmount,
      lang,
      txt,
      user_currency,
      currency_arr } = this.props
    const { openEditFrame, move } = this.state
    return (
      <li className='b-item'>
        <Item_Show
          move={move}
          index={index}
          item={item}
          type={type}
          projectId={projectId}
          dateId={dateId}
          deleteItem={deleteItem}
          toggleEdit={this.toggleEdit}
          handleOpenEditFrame={this.handleOpenEditFrame}
          mouseDown={this.mouseDown}
          mouseUp={this.mouseUp}
          mobileDown={this.mobileDown}
          mobileMove={this.mobileMove}
          mobileUp={this.mobileUp}
          formateAmount={formateAmount}
          lang={lang}
          txt={txt}
          user_currency={user_currency}
        />
        <Item_Edit
          index={index}
          item={item}
          projectId={projectId}
          dateId={dateId}
          type={type}
          openEditFrame={openEditFrame}
          closeEditFrame={this.closeEditFrame}
          editItem={editItem}
          lang={lang}
          txt={txt}
          user_currency={user_currency}
          currency_arr={currency_arr}
        />
      </li>
    )
  }
}

export default connect()(Budget_List_Item)