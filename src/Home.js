import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useJsApiLoader, Autocomplete, LoadScript } from '@react-google-maps/api';
import { useHistory } from 'react-router-dom';

const libraries = ['places'];

function Home() {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPlaceId, setSelectedPlaceId] = useState('');
  const history = useHistory();
  const autocompleteRef = useRef(null);
  const apiKey = "AIzaSyCex8Pqq72iU6u4xQMyuJnhIRRUd45kB-A"; // Replace with your Google Maps API key

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries,
  });

  useEffect(() => {
    if (isLoaded) {
      const autocomplete = new window.google.maps.places.Autocomplete(autocompleteRef.current, { types: ['geocode'] });
      console.log(typeof(autocomplete.getPlace()))
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if(place){
          if (place && place.formatted_address) {
            setSelectedLocation(place.formatted_address);
            console.log('Selected Place:', place);            
            if (place.place_id) {
              setSelectedPlaceId(place.place_id);
              console.log('Selected Place ID:', place.place_id);
            } else {
              console.error('Selected place_id is undefined');
            }
          } else {
            console.error('Selected place is undefined');
          }
        }else{
          console.log("big error")
        }
      });
    }
  }, [isLoaded]);  

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Construct the URL with selectedLocation and selectedPlaceId as parameters
    // const url = `/list?location=${encodeURIComponent(selectedLocation)}&place_id=${encodeURIComponent(selectedPlaceId)}`;
    const url = '/'
    
    // Navigate to the next page
    history.push(url);
  }

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      <div className="App flex flex-col justify-center items-center bg-darkBlue">
        <h1 className='capitalize mb-20 font-bold text-white text-2xl'>Find beauty services in your city!</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="form flex">
            <Autocomplete ref={autocompleteRef}>
              <input
                type="text"
                className='md:w-96 border-solid border border-black rounded-l-xl py-3 pl-7'
                placeholder='Search Here . . .'
              />
            </Autocomplete>
            <button type='submit' className='rounded-r-xl bg-deepRed py-3 ml-1 px-7'>
              <FontAwesomeIcon icon={faPaperPlane} className='text-xl' />
            </button>
          </div>
        </form>
      </div>
    </LoadScript>
  );
}

export default Home;
