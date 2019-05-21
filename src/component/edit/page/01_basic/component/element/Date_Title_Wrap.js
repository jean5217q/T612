import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Title_Text from './Title_Text'

class Period_Title extends Component {
  render() {
    const { lang } = this.props
    return (
      <div className="basic-sub-title">
        <Title_Text
          lang={lang}
          cata='period'/>
      </div>
    )
  }
}

Period_Title.propTypes = {
  lang: PropTypes.number
}

export default Period_Title