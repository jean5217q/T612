import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { plan_form as text  } from '../../../../../../../../data/Content';

class TopBar extends Component {
  render() {
    const { 
      lang, 
      color,
      backToStep2 
    } = this.props
    return (
      <div className={`add-plan-top color-${color}`}>
        <div
          className='back'
          onClick={backToStep2}>
        </div>
        <div className='title'>
          {text['title']['sub_title'][lang]}
        </div>
      </div>
    )
  }
}

TopBar.propTypes = {
  lang: PropTypes.number,
  color: PropTypes.string,
  backToStep2: PropTypes.func,
}

export default TopBar