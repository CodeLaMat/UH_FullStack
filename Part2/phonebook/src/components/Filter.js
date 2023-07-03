import React from "react";

const Filter = ({ searchHandler }) => {
  return (
    <div>
      {" "}
      <div>
        filter shown with:{" "}
        <input placeholder="search" onChange={searchHandler} />
      </div>
    </div>
  );
};

export default Filter;
