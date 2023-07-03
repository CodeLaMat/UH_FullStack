import React from "react";

const Persons = ({ personInSearch, persons, findByName }) => {
  return (
    <div>
      {" "}
      <ul>
        {personInSearch.length > 0
          ? findByName().map((person) => (
              <li key={person.name}>
                {person.name} {person.number}
              </li>
            ))
          : persons.map((person) => (
              <li key={person.name}>
                {person.name} {person.number}
              </li>
            ))}
      </ul>
    </div>
  );
};

export default Persons;
