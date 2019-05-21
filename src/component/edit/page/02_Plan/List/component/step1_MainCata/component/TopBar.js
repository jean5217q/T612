import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { plan_form as text  } from '../../../../../../../../data/Content';

class TopBar extends Component {
  render() {
    const { lang, color, backToStep1 } = this.props
    return (
      <div className={`add-plan-top color-${color}`}>
        <div
          className='back'
          onClick={backToStep1}>
        </div>
        <div className='title'>
          {text['title']['main_title'][lang]}
        </div>
      </div>
    )
  }
}

TopBar.propTypes = {
  lang: PropTypes.number,
  color: PropTypes.color,
  backToStep1: PropTypes.func,
}

export default TopBar