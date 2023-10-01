import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function List() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedLocation = queryParams.get('location');
  
  useEffect(() => {
    console.log('Selected Location:', selectedLocation);
  }, [selectedLocation]);

  return (
    <div className="App flex flex-col justify-center items-center bg-darkBlue">
      <h1 className='capitalize mb-20 font-bold text-white text-2xl'>Beauty Services in {selectedLocation}</h1>
      {console.log(selectedLocation)}
    </div>
  );
}

export default List;
