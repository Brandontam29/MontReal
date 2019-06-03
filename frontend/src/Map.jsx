import React, { Component } from "react"
import ReactMapGL from "react-map-gl"

class Map extends Component {
  state = {
    viewport: {
      width: 1050,
      height: 375,
      latitude: 45.50884,
      longitude: -73.58781,
      zoom: 9
    }
  }

  render = () => {
    return (
      <div className="map">
        <ReactMapGL
          {...this.state.viewport}
          onViewportChange={viewport => this.setState({ viewport })}
          mapboxApiAccessToken="pk.eyJ1IjoiYnJhbmRvbi10YW0yOSIsImEiOiJjanZpOHVocWEwM2ZkNGFxcmgxYmg4ajY5In0.WS9KYiSNKNkOOYE8NH_wAA"
        />
      </div>
    )
  }
}

export default Map
