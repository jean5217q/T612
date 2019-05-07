import React, { Component } from 'react';
import { connect } from 'react-redux';


class Map extends Component {
  formateMapId = () => {
    const { id } = this.props
    return `map-${id}`
  }
  componentDidMount() {
    const { map } = this.props
    let myMap
    if (map.length > 0) {
      let c_lat = map[0].position.latitude
      let c_lng = map[0].position.longitude
      myMap = new google.maps.Map(document.getElementById(this.formateMapId()), {
        center: { lat: c_lat, lng: c_lng },
        zoom: 15
      })
      let marker = []
      map.forEach((el, index) => {
        marker[index] = new google.maps.Marker({
          position: {
            lat: el.position.latitude,
            lng: el.position.longitude
          },
          map: myMap,
          // icon:
          //   {
          //     path: 'M20,1.5c-7,0-12.7,5.6-12.7,12.6c0,11,12.7,21.4,12.7,21.4s12.7-10.4,12.7-21.4C32.7,7.1,27,1.5,20,1.5zM20,18.5c-2.5,0-4.5-2-4.5-4.5c0-2.5,2-4.5,4.5-4.5s4.5,2,4.5,4.5C24.5,16.5,22.5,18.5,20,18.5z',
          //     fillColor:'#308CFE',
          //     strokeWeight: 0,
          //     fillOpacity: 1,
          //     scale: 0.8},


        }
        );
      })
    }
    else {
      myMap = new google.maps.Map(document.getElementById(this.formateMapId()), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 15
      })
    }
  }
  render() {

    return (
      <div className={`map-tag-wrap ${this.props.open ? 'show' : null}`}>
        <div
          id={this.formateMapId()}
          className='map-tag-inner'>
        </div>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  let mainList = state.itinerary.dateList
  mainList = mainList ? mainList : null
  return {
    mainList: mainList,
  }
}

export default connect(mapStateToProps)(Map);