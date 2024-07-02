import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({newFilter, handleFilterChange}) => {
  return (
    <div>filter shown with <input value={newFilter} onChange={handleFilterChange}/></div>
  )
}

const PersonForm = (prop) => {
  return (
    <form onSubmit={prop.handleAddPerson}>
        <div>name: <input value={prop.newName} onChange={prop.handleNameChange}/></div>
        <div>number: <input value={prop.newNumber} onChange={prop.handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = (prop) => {
  const persons = prop.persons
  const filter = prop.filter
  const filteredPersons = persons.filter((person) => person.name.toLowerCase().match(filter.toLowerCase()))
  
  return (
    filteredPersons.map((filteredPerson) =>
      <p key={filteredPerson.id}>
      {filteredPerson.name} {'  '} 
      {filteredPerson.number} {'  '}
      <button onClick={() => prop.handleDeletePerson(filteredPerson)}>delete</button>
      </p>
    )
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')


  //Reaches out to JSON server and returns & assigns persons
  useEffect(() => {
    personService
    .getAll()
    .then(returnedPersons => setPersons(returnedPersons))  
  }, [])

  //Event handlers for form
  const handleNameChange = (event) => {
    setNewName(event.target.value)  
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)  
  }
  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  
  const handleAddPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const foundPerson = persons.find(e => e.name.toLowerCase() == personObject.name.toLowerCase())
    if (foundPerson){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personService
        .update(foundPerson.id, personObject)
        .then(personUpdated => {
          const newPersons = persons.map(person =>
            person.id !== personUpdated.id 
            ? person : personUpdated)
          setPersons(newPersons) 
        })  
      }
    } else {
      personService.create(personObject).then(returnedPersons => {
        setPersons(persons.concat(returnedPersons))
      })
      setNewName('')
      setNewNumber('')
    } 
  }
  
  const handleDeletePerson = (filteredPerson) => {
    if (window.confirm(`Delete ${filteredPerson.name} ?`)) {
      personService
      .deleteObject(filteredPerson.id)
      .then(personDeleted => setPersons(persons.filter(person => person.id !== personDeleted.id)))
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm 
      handleAddPerson={handleAddPerson} 
      newName={newName} 
      handleNameChange={handleNameChange} 
      newNumber={newNumber} 
      handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons 
      handleDeletePerson={handleDeletePerson} 
      persons={persons} 
      filter={newFilter}/>
    </div>
  )
}

export default App