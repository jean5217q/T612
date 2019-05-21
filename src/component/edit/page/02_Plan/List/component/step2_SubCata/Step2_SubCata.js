import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TopBar from './component/TopBar';
import BottomBar from './component/BottomBoard'

class Step2 extends Component {
  render() {
    const { lang, color,mainType, backToStep2, goToStep4 } = this.props
    return (
      <div className='main-cata'>
        <TopBar
          lang={lang}
          color={color}
          backToStep2={backToStep2}
        />
        <BottomBar
          lang={lang}
          mainType={mainType}
          goToStep4={goToStep4}  
        />
      </div>
    )
  }
}

Step2.propTypes = {
  lang: PropTypes.number,
  color: PropTypes.color,
  mainType: PropTypes.string,
  backToStep2: PropTypes.func,
  goToStep4: PropTypes.func,
}

export default Step2