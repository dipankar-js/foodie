import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useQuery} from 'react-query';
import Cousin from './Cousin';
import SearchBar from './SearchBar';
import Cookies from 'js-cookie';

const fetchCousins = async (restaurantId) => {
  const result = await axios.get(
    `http://localhost:5000/api/v1/cousin/restaurant/${restaurantId}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  );
  return result.data;
};

const Menu = (props) => {
  const [restaurant, setRestaurant] = useState(null);
  const restaurantId = props.match.params.id;
  const {isLoading, error, data} = useQuery('cousins', () =>
    fetchCousins(restaurantId),
  );

  const [cousins, setCousins] = useState(null);

  useEffect(() => {
    if (data) {
      setRestaurant(data.data[0].restaurant);
      setCousins(data.data);
    }
  }, [data]);

  const onSort = async () => {
    const result = await axios.get(
      `http://localhost:5000/api/v1/cousin/restaurant/${restaurantId}?sort=-1`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      },
    );
    setCousins(result.data.data);
  };

  let cancelToken;
  const handleSearchChange = async (e) => {
    const searchTerm = e.target.value;
    //Check if there are any previous pending requests
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel('Operation canceled due to new request.');
    }
    //Save the cancel token for the current request
    cancelToken = axios.CancelToken.source();
    try {
      const results = await axios.get(
        `http://localhost:5000/api/v1/cousin/restaurant/${restaurantId}?searchQuery=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        },
        {cancelToken: cancelToken.token},
      );
      setCousins(results.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container nav-gap">
      {restaurant && (
        <div className="row mb-5">
          <img
            className="restaurant-img"
            src={restaurant.photo}
            alt="restaurant"
          />
          <div className="text-center mt-2">
            <h1>{restaurant.name}</h1>
            <small> {restaurant.location} </small>
            <hr />
          </div>
        </div>
      )}
      <div className="row mb-3">
        <div className="text-center">
          <div className="module-header wow fadeInUp animated">
            <h2 className="module-title">Popular Dishes</h2>
            <h3 className="module-subtitle">Our most popular menu</h3>
          </div>
        </div>
      </div>
      <SearchBar onSearch={handleSearchChange} onSort={onSort} />
      <div className="row mt-5">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          {cousins ? (
            cousins.map((cousin) => (
              <div className="col-lg-6">
                <Cousin cousin={cousin} />
              </div>
            ))
          ) : (
            <p className="text-center"> No Items found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
