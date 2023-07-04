import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import contactService from "./services/contacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [personInSearch, setPersonInSearch] = useState("");

  useEffect(() => {
    contactService.getAll().then((initialContacts) => {
      setPersons(initialContacts);
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

  const sortedByName = () => {
    return persons.filter((person) =>
      person.name.toLowerCase().includes(personInSearch.toLowerCase())
    );
  };

  const addContactHandler = (event) => {
    event.preventDefault();
    const personIsAdded = persons.some((person) => person.name === newName);

    if (personIsAdded) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = { name: newName, number: newNumber };

      contactService.create(newPerson).then((returnedContact) => {
        setPersons(persons.concat(returnedContact));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const deleteContact = (id) => {
    const contact = persons.find((person) => person.id === id);
    const confirmDeletion = window.confirm(`Delete ${contact.name}?`);
    if (confirmDeletion) {
      contactService
        .remove(contact.id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          alert(
            `The contact '${contact.name}' was already deleted from server`
          );
          setPersons(persons.filter((person) => person.id !== id));
        });
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
          addNameHandler={addContactHandler}
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
          sortedByName={sortedByName}
          deleteContact={deleteContact}
        />
      </div>
    </div>
  );
};

export default App;
