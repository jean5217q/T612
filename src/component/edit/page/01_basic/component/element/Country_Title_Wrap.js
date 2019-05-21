import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Title_Text from './Title_Text';

class Country_Title extends Component {
  render() {
    const { lang, showCountryBlock } = this.props
    return (
      <div className="basic-sub-title">
        <Title_Text
          lang={lang}
          cata='country'/>
        <div
          className="basic-title-edit-icon-wrap"
          onClick={showCountryBlock}>
          <div className='basic-title-edit-icon'></div>
        </div>
    </div>
    )
  }
}

Country_Title.propTypes = {
  lang: PropTypes.number,
  showCountryBlock: PropTypes.func,
}

export default Country_Title