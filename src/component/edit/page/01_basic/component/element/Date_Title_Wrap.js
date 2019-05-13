import React, { Component } from 'react';
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

export default Period_Title