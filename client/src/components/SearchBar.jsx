import React from 'react';

const SearchBar = ({onSearch, onSort}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-10 m-auto">
          <div className="input-group mb-3">
            <input
              onChange={onSearch}
              type="text"
              className="form-control"
              placeholder="Search by Restaurant name or location"
            />
            <div className="input-group-append">
              <button
                onClick={onSort}
                className="btn btn-md px-5 btn-danger"
                type="button"
              >
                Sort by Price
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
