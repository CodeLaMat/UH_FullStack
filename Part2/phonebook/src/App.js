import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import contactService from "./services/contacts";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [personInSearch, setPersonInSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

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
    const personExists = persons.some((person) => person.name === newName);
    if (personExists) {
      const personToUpdate = persons.find((person) => person.name === newName);
      const changedContact = { ...personToUpdate, number: newNumber };
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook. Would you like to update the number?`
      );
      if (confirmUpdate) {
        setConfirmationMessage(`Phone number of ${newName} has been updated`);
        setTimeout(() => {
          setConfirmationMessage(null);
        }, 5000);
        contactService
          .update(personToUpdate.id, changedContact)
          .then((returnedContact) => {
            console.log(returnedContact);
            setPersons(
              persons.map((person) =>
                person.id !== returnedContact.id ? person : returnedContact
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setErrorMessage(
              `Information of ${newName} has already been deleted from the phonebook`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      contactService.create(newPerson).then((returnedContact) => {
        setPersons(persons.concat(returnedContact));
        setConfirmationMessage(`Added '${newName}' to the phonebook`);

        setTimeout(() => {
          setConfirmationMessage(null);
        }, 5000);

        setNewName("");
        setNewNumber("");
      });
    }
  };

  const deleteContact = (id) => {
    const contact = persons.find((person) => person.id === id);
    const confirmDeletion = window.confirm(
      `Delete ${contact.name} from the phonebook?`
    );
    if (confirmDeletion) {
      setConfirmationMessage(
        `The contact '${contact.name}' is removed from the phonebook`
      );
      setTimeout(() => {
        setConfirmationMessage(null);
      }, 5000);
      contactService
        .remove(contact.id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          setErrorMessage(
            `The contact '${contact.name}' was already deleted from server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);

          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={errorMessage ? errorMessage : confirmationMessage}
        messageType={errorMessage ? "error" : "confirmation"}
      />{" "}
      <div>
        <Filter searchHandler={searchHandler} />
      </div>
      <div>
        <PersonForm
          addContactHandler={addContactHandler}
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
