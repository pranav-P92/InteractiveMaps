import React, { Component } from 'react';
import { LoadScript, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import './Map.css';

const containerStyle = {
  width: '800px',
  height: '500px',
  float: 'left',  // Ensure the map is floated to the left
  marginRight: '20px', // Add margin to create space between map and details box
  borderRadius: '20px',
  marginLeft: '50px'
};

const center = {
  lat: 17.385044,
  lng: 78.486671
};

const markers = [
  {
    id: 1,
    name: 'The Hole In The Wall Cafe',
    description: 'Continental, American, Burger, Sandwich, Street Food, Waffle, Beverages',
    image: './kitchen.jpg',
    position: { lat: 17.423729585267832,  lng: 78.41012736147512 },
    location: 'Jubilee Hills, Hyderabad'
  },
  {
    id: 2,
    name: 'Cravery Cafe',
    description: 'Cafe, Coffee, North Indian, Mughlai, Seafood, Chinese, Desserts, Beverages',
    image: './cravery.jpg',
    position: { lat: 17.41299322785087 , lng: 78.33473282125479 },
    location: 'Financial District, Hyderabad'
  },
  {
    id: 3,
    name: 'Lé Vantage Cafe Bar',
    description: 'Cafe, Continental, Coffee, Fast Food, Beverages, Desserts, Pizza',
    image: './levantage.jpg',
    position: { lat: 17.43009790583617, lng:78.41786348837971 },
    location: 'Jubilee Hills, Hyderabad'
  },
  {
    id: 4,
    name: 'The Moonshine Project',
    description: 'Bar Food, Oriental, North Indian, Seafood, Chinese, Pizza, Desserts, Beverages',
    image: './moonshine.jpg',
    position: { lat: 17.414284101800945, lng:78.40765797576766 },
    location: 'Film Nagar, Hyderabad'
  },
  {
    id: 5,
    name: 'Tabula Rasa',
    description: 'Continental, Cafe, North Indian, Asian',
    image: './public/tabula.jpg',
    position: { lat: 17.44123089729049, lng: 78.40257982632843 },
    location: 'Jubilee Hills, Hyderabad'
  }
];

class MapContainer extends Component {
  state = {
    activeMarker: null,
    searchTerm: '',
    searchedMarker: null
  };

  onMarkerHover = (marker) => {
    this.setState({ activeMarker: marker });
  };

  onMarkerMouseOut = () => {
    this.setState({ activeMarker: null });
  };

  componentDidUpdate(prevProps) {
    if (this.props.searchTerm !== prevProps.searchTerm) {
      const searchTerm = this.props.searchTerm.trim().toLowerCase();
      const searchedMarker = markers.find(marker =>
        marker.name.toLowerCase().includes(searchTerm)
      );
      this.setState({ searchTerm: this.props.searchTerm, searchedMarker });
    }
  }

  render() {
    const { activeMarker, searchedMarker } = this.state;

    return (
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <LoadScript
          googleMapsApiKey="AIzaSyBjUcM5mgA2y7eXso4V2Ar8QciVRP8VLHs"
          loadingElement={<div>Loading...</div>}
          libraries={['places']}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
          >
            {markers.map(marker => (
              <Marker
                key={marker.id}
                position={marker.position}
                onMouseOver={() => this.onMarkerHover(marker)}
                onMouseOut={this.onMarkerMouseOut}
              >
                {activeMarker && activeMarker.id === marker.id && (
                  <InfoWindow position={marker.position}>
                    <div>
                      <h2>{marker.name}</h2>
                      <p>{marker.description}</p>
                      <p>{marker.location}</p>
                      <img src={marker.image} alt={marker.name} width="100" />
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            ))}
            {searchedMarker && (
              <Marker
                key={searchedMarker.id}
                position={searchedMarker.position}
                onMouseOver={() => this.onMarkerHover(searchedMarker)}
                onMouseOut={this.onMarkerMouseOut}
              >
                {activeMarker && activeMarker.id === searchedMarker.id && (
                  <InfoWindow position={searchedMarker.position}>
                    <div>
                      <h2>{searchedMarker.name}</h2>
                      <p>{searchedMarker.description}</p>
                      <p>{searchedMarker.location}</p>
                      <img src={searchedMarker.image} alt={searchedMarker.name} width="100" />
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            )}
          </GoogleMap>
        </LoadScript>
        {searchedMarker && (
          <div id='display'>
            <h2>{searchedMarker.name}</h2>
            <p>{searchedMarker.description}</p>
            <p>{searchedMarker.location}</p>
            <img src={searchedMarker.image} alt={searchedMarker.name} width="250" />
          </div>
        )}
      </div>
    );
  }
}

export default MapContainer;
