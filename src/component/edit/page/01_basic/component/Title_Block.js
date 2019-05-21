import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { asyncGetProjectBasic } from '../../../../../action/itinerary';
import { db } from '../../../../base';

class Title_Block extends Component {
  state = {
    title: this.props.title,
    originTitle: this.props.title,
    editing: false
  }
  setTitle = (e) => { this.setState({ title: e.target.value }) }
  toggleEditTitle = () => { this.setState({ editing: true }) }
  cancelEditTitle = () => { 
    this.setState({ editing: false, title: this.state.originTitle }) 
  }
  updateTitle = () => {
    const { projectId, dispatch } = this.props
    const { title } = this.state
    if(title==='') return
    this.setState({ editing: false, originTitle: title })
    db.collection('project').doc(projectId).update({ title: title })
      .then(() => dispatch(asyncGetProjectBasic(projectId)))
      .catch(err => console.log(err))
  }
  render() {
    const { title,editing } = this.state
    return (
      <div className="basic-container top">
        <h1
          style={ editing ? { display: 'none' } : { display: 'block' }}
          className="basic-title">{title}
        </h1>
        <input
          style={ editing ? { display: 'block' } : { display: 'none' }}
          className='basic-title-edit'
          type='text'
          value={title}
          onChange={this.setTitle}
        />
        <div
          style={editing ? { display: 'none' } : { display: 'flex' }}
          className="basic-title-edit-icon-wrap"
          onClick={this.toggleEditTitle}>
          <div className='basic-title-edit-icon'></div>
        </div>
        {/* 修改或取消 */}
        <div
          className='basic-title-confirm-group'
          style={editing ? { display: 'flex' } : { display: 'none' }}>
          <div
            className='basic-title-btn edit'
            onClick={this.updateTitle}>
            <div className='basic-title-btn-icon edit'></div>
          </div>
          <div
            className='basic-title-btn cancel'
            onClick={this.cancelEditTitle}>
            <div className='basic-title-btn-icon cancel'></div>
          </div>
        </div>
      </div>
    )
  }
}

Title_Block.propTypes = {
  title: PropTypes.string,
  projectId: PropTypes.string,
  dispatch: PropTypes.func,
}

export default connect()(Title_Block);