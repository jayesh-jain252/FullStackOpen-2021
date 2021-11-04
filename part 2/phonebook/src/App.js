import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';
import ErrorNotification from './components/ErrorNotification';
import axios from 'axios';

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ searchedName, setSearchedName ] = useState('')
  const [ newNumber,setNewNumber] = useState('')
  const [addedMessage, setAddedMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => { 
    personService
      .getAll()
      .then(response => {       
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personName = persons.map(person=>person.name)
    if(personName.includes(newName)){
      
      if (window.confirm(`${newName} is already added to phonebook replace the old number with the new one`))
      {
        const alreadyAddedperson =  persons.find(p => p.name === newName);
        const id_addedPerson = alreadyAddedperson.id
        const changedPerson = {...alreadyAddedperson,number:newNumber}

        axios.put(`http://localhost:3001/persons/${id_addedPerson}`, changedPerson).then(response => {
          setPersons(persons.map(p => p.id !== id_addedPerson ? p : response.data))
          setNewName('')
          setNewNumber('')
          setAddedMessage(
            `Added ${alreadyAddedperson.name}`
          )
          setTimeout(() => {
            setAddedMessage(null)
          }, 5000)
          
        })
        .catch(error => {
          setErrorMessage(
            `${alreadyAddedperson.name} was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id_addedPerson))
          setNewName('')
          setNewNumber('')
        })

      }
      
    }else{
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setAddedMessage(
            `Added ${personObject.name}`
          )
          setTimeout(() => {
            setAddedMessage(null)
          }, 5000)
        })
      
    }
  }

  

  const handleNewName = (event) => {setNewName(event.target.value)}

  const handleSearchedName = (event) => {setSearchedName(event.target.value)}

  const handleNewNumber = (event) => {setNewNumber(event.target.value)}

  const handleDeleteButton = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      axios.delete(`http://localhost:3001/persons/${id}`)
        .then(response => {   
          console.log(response.data);
          const newPersons = persons.filter(p=>p.id!==id)     
          setPersons(newPersons)
      })
    }
    

  }

  const numbersToShow = searchedName ? persons.filter(person => person.name.toLowerCase().includes(searchedName.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addedMessage}/>
      <ErrorNotification message={errorMessage}/>
      <Filter value={searchedName} onChange={handleSearchedName} />
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} addPerson={addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber}/>
      <h2>Numbers</h2>
      <div>
            {numbersToShow.map(person=>
            <p key={person.name}>{person.name} {person.number} <button onClick={()=>handleDeleteButton(person.id)}>delete</button></p>
        )}
      </div>
    </div>
  )
}

export default App