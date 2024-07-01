import { useState, useEffect } from 'react'
import axios from 'axios'

const Persons = (prop) => {
  const persons = prop.persons
  const filter = prop.filter
  const filteredPersons = persons.filter((person) => person.name.toLowerCase().match(filter.toLowerCase()))
  return (
    filteredPersons.map((filteredPersons) => <p key={filteredPersons.name}>{filteredPersons.name} {filteredPersons.number}</p>)
  )
}

const Filter = ({newFilter, handleFilterChange}) => {
  return (
    <div>filter shown with <input value={newFilter} onChange={handleFilterChange}/></div>
  )
}

const PersonForm = (prop) => {
  return (
    <form onSubmit={prop.addPerson}>
        <div>name: <input value={prop.newName} onChange={prop.handleNameChange}/></div>
        <div>number: <input value={prop.newNumber} onChange={prop.handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')


  //Reaches out to JSON server and sets person state hook
  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  useEffect(hook, [])


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

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.find(e => e.name.toLowerCase() == personObject.name.toLowerCase())){
      alert(`${newName} is already added to phonebook`)
    } else {
      const returnedPersons = axios.post('http://localhost:3001/persons', personObject).then(response => response.data)
      returnedPersons.then(returnedPersons => {
        setPersons(persons.concat(returnedPersons))
      })
      setNewName('')
      setNewNumber('')
    } 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm 
      addPerson={addPerson} 
      newName={newName} 
      handleNameChange={handleNameChange} 
      newNumber={newNumber} 
      handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter}/>
    </div>
  )
}

export default App