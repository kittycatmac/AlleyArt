import React, { Component } from "react";
import "./google.css";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import "./google.css";

export class MyMapContainer extends Component {
	state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    const { center, zoom, title, address, city, style } = this.props;

    return (
      <div className="map">
        <Map
          google={this.props.google}
          style={style}
          center={center}
          initialCenter={center}
          zoom={zoom}
          onClick={this.onMapClicked}
        >
          <Marker
            className="marker"
            position={center}
            onClick={this.onMarkerClick}
            name={title + "\n\n" + address + "\n" + city}
          />

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper(
	(props) => {
		return (
			{ apiKey: props.mapAPI }
		)
	}
)(MyMapContainer)
