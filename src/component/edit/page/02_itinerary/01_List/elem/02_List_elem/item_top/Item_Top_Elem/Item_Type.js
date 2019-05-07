import React, { Component } from 'react';

class Item_Type extends Component {
  getTypeIcon = () => {
    const type = this.props.type
    if(type==='trans') return 'type trans'
    else if(type==='food') return 'type food'
    else if(type==='hotel') return 'type hotel'
    else if(type==='activity') return 'type activity'
  }
  render() {
    return (
      <div className="i-top-block type">
        <div className={this.getTypeIcon()}>
          <div className="icon"></div>
        </div>
      </div>
    )
  }
}

export default Item_Type