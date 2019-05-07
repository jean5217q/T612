//env
import React, { Component } from 'react'
//component
import Top_Bar from '../share/Top_Bar';
import Btn from '../share/Submit';
import Basic from './Basic';
import Info from './Info'

class Activity extends Component {
  render() {
    const {type} = this.props
    return(
      <div className='add-select-container'>
        <Top_Bar
            text='Add Activity Info'/>
        <div className='add-act-bottom-wrap-select'>
          <Basic type={type}/>
          <Info/>
          <Btn/>
        </div>
      </div>
    )
  }
}

export default Activity