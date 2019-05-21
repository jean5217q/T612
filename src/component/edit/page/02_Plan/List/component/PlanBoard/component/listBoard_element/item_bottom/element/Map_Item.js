import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Map_Item extends Component {
  generateId = () => `map-${this.props.id}`
  componentDidMount() {
    const { mapList } = this.props
    let myMap
    if (mapList.length > 0) {
      let center_lat = mapList[0].position.latitude
      let center_lng = mapList[0].position.longitude
      myMap = new google.maps.Map(document.getElementById(this.generateId()), {
        center: { lat: center_lat, lng: center_lng },
        zoom: 15
      })
      let marker = []
      mapList.forEach((el, index) => {
        marker[index] = new google.maps.Marker({
          position: {
            lat: el.position.latitude,
            lng: el.position.longitude
          },
          map: myMap,
        })
      })
    }
  }
  render() {
    const { mapShowing } = this.props
    return (
      <div className={`map-tag-wrap ${mapShowing&&'show'}`}>
        <div
          id={this.generateId()}
          className='map-tag-inner'>
        </div>
      </div>
    )
  }
}

Map_Item.propTypes = {
  mapList: PropTypes.array, 
  mapShowing: PropTypes.bool, 
  id: PropTypes.string
}

export default Map_Item;