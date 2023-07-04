import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [personInSearch, setPersonInSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const changeNameHandler = (event) => {
    setNewName(event.target.value);
  };

  const changeNumberHandler = (event) => {
    setNewNumber(event.target.value);
  };

  const searchHandler = (e) => {
    setPersonInSearch(e.target.value);
  };

  const findByName = () => {
    return persons.filter((person) =>
      person.name.toLowerCase().includes(personInSearch.toLowerCase())
    );
  };

  const addNameHandler = (event) => {
    event.preventDefault();
    const personIsAdded = persons.some((person) => person.name === newName);

    if (personIsAdded) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = { name: newName, number: newNumber };
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter searchHandler={searchHandler} />
      </div>
      <div>
        <PersonForm
          addNameHandler={addNameHandler}
          changeNameHandler={changeNameHandler}
          changeNumberHandler={changeNumberHandler}
          newName={newName}
          newNumber={newNumber}
        />
      </div>
      <div>
        <h2>Numbers</h2>
        <Persons
          persons={persons}
          personInSearch={personInSearch}
          findByName={findByName}
        />
      </div>
    </div>
  );
};

export default App;
