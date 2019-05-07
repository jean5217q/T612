//env
import React, { Component } from 'react';
import Basic_Sub_Title_country from './Basic_Sub_Title_country';
import Basic_Country_Item from './Basic_Country_Item';

class Basic_Bottom extends Component {
  render() {
    const { country, openSelectCountry, user,lang } = this.props
    return (
      <div className="basic-container country">
        <Basic_Sub_Title_country 
          openSelectCountry={openSelectCountry}
          lang={lang} />
        <div className="basic-sub-content country">
          {
            country.map((el, index) =>
              <Basic_Country_Item
                key={index}
                content={el}
                user={user}
                lang={lang}
              />
            )
          }
        </div>
      </div>
    )
  }
}

export default Basic_Bottom