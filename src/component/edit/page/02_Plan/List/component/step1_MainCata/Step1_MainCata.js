import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TopBar from './component/TopBar';
import Board from './component/BottomBoard';

class Step1 extends Component {
  render() {
    const { 
      lang,
      color,
      backToStep1, 
      goToStep3 } = this.props
    return (
      <div className='main-cata'>
        <TopBar
          lang={lang}
          color={color}
          backToStep1={backToStep1}
        />
        <Board
          lang={lang}
          goToStep3={goToStep3}
        />
      </div>
    )
  }
}

Step1.propTypes = {
  lang: PropTypes.number,
  color: PropTypes.string,
  backToStep1: PropTypes.func,
  goToStep3: PropTypes.func,
}

export default Step1;