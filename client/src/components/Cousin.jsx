import React from 'react';

const Cousin = ({cousin}) => {
  return (
    <div class="menu">
      <div class="row">
        <div class="col-sm-8">
          <h4 class="menu-title"> {cousin.name} </h4>
          <div class="menu-detail">
            <span> {cousin.category} </span> / <span>{cousin.type}</span>
          </div>
        </div>
        <div class="col-sm-4 menu-price-detail">
          <h4 class="menu-price">$ {cousin.price} </h4>
          <div class="menu-label">New</div>
        </div>
      </div>
    </div>
  );
};

export default Cousin;
