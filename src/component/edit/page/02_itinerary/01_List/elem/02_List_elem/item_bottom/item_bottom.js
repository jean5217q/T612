import React, { Component } from 'react';
import Bottom_Loop_Item from './Bottom_Loop_Item';
import List_Map from '../List_Map';
import { plan_form as txt  } from '../../../../../../../../data/Content'
class Item_Bottom extends Component {
  state = {
    open: false
  }
  render() {
    let { open, sub, map, id,lang } = this.props
    sub = sub.filter(el => el.value !== '')
    console.log(txt['content'])
    return (
      <div
        id={`bottom-${id}`}
        className={`i-item-bottom ${open ? 'show' : null}`}>
        {
          sub.length > 0 ?
            <div className='i-item-bottom-info'>
              <div className="i-middle-block list">
                {
                  sub.map((el, index) =>
                    <Bottom_Loop_Item
                      key={index}
                      title={txt['content'][el.title][lang]}
                      value={el.value}
                    />
                  )
                }
              </div>
            </div>
            : null
        }
        {
          map.length > 0 ?
            <List_Map
              map={map}
              open={this.state.open}
              id={id} />
            : null
        }


      </div>
    )
  }
}

export default Item_Bottom;