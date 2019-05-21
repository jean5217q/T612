import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sub_Item from './element/Sub_Item';
import Map_Item from './element/Map_Item';
import { plan_form as text  } from '../../../../../../../../../../data/Content';

class Item_Bottom extends Component {
  state = {
    mapShowing: false
  }
  render() {
    const { mapShowing } = this.state
    const { subItemShowing, sub, map, id, lang } = this.props
    const subList = sub.filter(el => el.value !== '')
    return (
      <div
        id={`bottom-${id}`}
        className={`i-item-bottom ${subItemShowing && 'show'}`}>
        {
          subList.length > 0 &&
          <div className='i-item-bottom-info'>
            <div className="i-middle-block list">
              {
                subList.map((el, index) =>
                  <Sub_Item
                    key={index}
                    title={text['content'][el.title][lang]}
                    value={el.value}
                  />)
              }
            </div>
          </div>
        }
        {
          map.length > 0 &&
            <Map_Item
              mapList={map}
              mapShowing={mapShowing}
              id={id} />
        }
      </div>
    )
  }
}

Item_Bottom.propTypes = {
  subItemShowing: PropTypes.bool, 
  sub: PropTypes.array, 
  map: PropTypes.array, 
  id: PropTypes.string,
  lang: PropTypes.number,
}

export default Item_Bottom;