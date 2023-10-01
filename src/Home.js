import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useJsApiLoader, Autocomplete, LoadScript } from '@react-google-maps/api';
import { useHistory, Link } from 'react-router-dom';

function Home() {
  const libraries = ['places'];
  const [selectedLocation, setSelectedLocation] = useState('');
  const history = useHistory();
  const autocompleteRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCex8Pqq72iU6u4xQMyuJnhIRRUd45kB-A',
    libraries,
  });

  useEffect(() => {
    if (isLoaded) {
      const autocomplete = new window.google.maps.places.Autocomplete(autocompleteRef.current, { types: ['geocode'] });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();

        if (place && place.formatted_address) {
          setSelectedLocation(place.formatted_address);
        } else {
          console.error('Selected place is undefined');
        }
      });
    }
  }, [isLoaded]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Construct the URL with selectedLocation after the '=' sign
    history.push(`/list?location=${encodeURIComponent(selectedLocation)}`);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // If Enter key is pressed, update the selectedLocation state
      setSelectedLocation(e.target.value);
    }
  }

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY" libraries={libraries}>
      <div className="App flex flex-col justify-center items-center bg-darkBlue">
        <h1 className='capitalize mb-20 font-bold text-white text-2xl'>Find beauty services in your city!</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="form flex">
            <Autocomplete ref={autocompleteRef}>
              <input
                type="text"
                className='md:w-96 border-solid border border-black rounded-l-xl py-3 pl-7'
                placeholder='Search Here . . .'
                onKeyPress={handleKeyPress} // Listen for Enter key press
              />
            </Autocomplete>
            {/* Replace the button with a Link component */}
            <Link to={`/list?location=${encodeURIComponent(selectedLocation)}`} className='rounded-r-xl bg-deepRed py-3 ml-1 px-7'>
              <FontAwesomeIcon icon={faPaperPlane} className='text-xl' />
            </Link>
          </div>
        </form>
      </div>
    </LoadScript>
  );
}

export default Home;
