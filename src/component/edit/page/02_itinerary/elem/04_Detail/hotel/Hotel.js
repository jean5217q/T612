//env
import React, { Component } from 'react'
//component
import Top_Bar from '../share/Top_Bar';
import Btn from '../share/Submit';
import Basic from './Basic';
import Check_In from './Check_In';
import Check_Out from './Check_Out';

class Hotel extends Component {
  render() {
    const {type} = this.props 
    return(
      <div className='add-select-container'>
        <Top_Bar
            text='Add Hotel Info'/>
        <div className='add-act-bottom-wrap-select'>
          <Basic type={type}/>
          <Check_In/>
          <Check_Out/>
          <Btn/>
        </div>
      </div>
    )
  }
}

export default Hotel