import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useQuery} from 'react-query';
import Card from './Card';
import SearchBar from './SearchBar';

const fetchRestaurants = async () => {
  const {data} = await axios.get(`http://localhost:5000/api/v1/restaurant`);
  return data;
};
function Restaurant() {
  const {isLoading, data} = useQuery('restaurant', fetchRestaurants);
  const [restaurants, setRestaurants] = useState();

  useEffect(() => {
    if (data) {
      setRestaurants(data.data);
    }
  }, [data]);

  const onSort = async () => {
    console.log('sorting');
    const result = await axios.get(
      `http://localhost:5000/api/v1/restaurant?sort=-1`,
    );
    setRestaurants(result.data.data);
  };

  let cancelToken;
  const handleSearchChange = async (e) => {
    const searchTerm = e.target.value;
    console.log(searchTerm);
    //Check if there are any previous pending requests
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel('Operation canceled due to new request.');
    }
    //Save the cancel token for the current request
    cancelToken = axios.CancelToken.source();
    try {
      const results = await axios.get(
        `http://localhost:5000/api/v1/restaurant?searchQuery=${searchTerm}`,
        {cancelToken: cancelToken.token},
      );
      setRestaurants(results.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div>
        <div class="spinner-border text-primary" role="status"></div>
        <p class="sr-only">Loading Restaurant...</p>
      </div>
    );
  }

  return (
    <div className="container nav-gap">
      <SearchBar onSearch={handleSearchChange} onSort={onSort} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
        }}
      >
        {restaurants &&
          restaurants.map((restaurant) => <Card restaurant={restaurant} />)}
      </div>
    </div>
  );
}

export default Restaurant;
