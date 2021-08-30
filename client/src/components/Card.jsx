import React from 'react';
import {Link} from 'react-router-dom';

function Card({restaurant}) {
  return (
    <div class="card" style={{width: '300px'}}>
      <img class="card-img-top" src={restaurant.photo} alt="Card cap" />
      <div class="card-body">
        <h5 class="card-title"> {restaurant.name} </h5>
        <small className="text-muted">Starts at {restaurant.minPrice} /-</small>
        <p class="card-text"> {restaurant.location} </p>
        <Link className="btn btn-md btn-danger nav-link text-white" to={`/restaurant/${restaurant._id}/menu`}>
          Order Now
        </Link>
      </div>
    </div>
  );
}

export default Card;
