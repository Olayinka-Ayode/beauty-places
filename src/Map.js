import React, { useState } from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 6.524379,
  lng: 3.379206,
};

const Maps = () => {
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      console.log(place); // You can access place details here
    } else {
      console.log('Autocomplete is not loaded yet.');
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCex8Pqq72iU6u4xQMyuJnhIRRUd45kB-A"
      libraries={libraries}
    >
      <div>
        <input
          type="text"
          placeholder="Enter a location"
          onChange={onPlaceChanged}
        />
        <div style={mapContainerStyle}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={14}
          />
        </div>
      </div>
    </LoadScript>
  );
};

export default Maps;
