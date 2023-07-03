import React from "react";

const PersonForm = ({
  addNameHandler,
  changeNameHandler,
  changeNumberHandler,
  newName,
  newNumber,
}) => {
  return (
    <div>
      {" "}
      <form onSubmit={addNameHandler}>
        <div>
          name:{" "}
          <input
            placeholder="name here"
            onChange={changeNameHandler}
            value={newName}
          />
        </div>
        <div>
          number:{" "}
          <input
            type="tel"
            placeholder="number here"
            onChange={changeNumberHandler}
            value={newNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
