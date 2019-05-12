import React, { Component } from 'react';
import Country_Title_Wrap from './element/Country_Title_Wrap';
import Country_Item from './element/Country_Item';

class Country_Block extends Component {
  render() {
    const { 
      countryList, 
      showCountryBlock, 
      user,
      lang } = this.props
    return (
      <div className="basic-container country">
        <Country_Title_Wrap 
          showCountryBlock={showCountryBlock}
          lang={lang} />
        <div className="basic-sub-content country">
          {
            countryList.map((country, index) =>
              <Country_Item
                key={index}
                countryInfo={country}
                user={user}
                lang={lang}
              />)
          }
        </div>
      </div>
    )
  }
}

export default Country_Block