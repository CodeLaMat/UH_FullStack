import React from "react";

const Persons = ({ personInSearch, persons, sortedByName, deleteContact }) => {
  return (
    <div>
      {" "}
      <ul>
        {personInSearch.length > 0
          ? sortedByName().map((person) => (
              <li key={person.name}>
                {person.name} {person.number}
                <button onClick={() => deleteContact(person.id)} type="button">
                  delete
                </button>
              </li>
            ))
          : persons.map((person) => (
              <li key={person.name}>
                {person.name} {person.number}
                <button onClick={() => deleteContact(person.id)} type="button">
                  delete
                </button>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default Persons;
