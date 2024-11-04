import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const personNames = persons.map(person => person.name)
    if (personNames.includes(personObject.name) && (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`))) {
      const existingPerson = persons.find(person => person.name === personObject.name)
      personService
        .update(existingPerson.id, personObject)
        .then(response => {
          setPersons(persons.map(person => person.id !== response.id ? person : response))
          setSuccess(`Updated ${newName}`)
        })
        .catch(error => {
          setError(`Information of '${newName}' has already been removed from server`)
          setNewName('')
          setNewNumber('')
        })
    } else {
      setPersons(persons.concat(personObject))
      setSuccess(`Added ${newName}`)
      setNewName('')
      setNewNumber('')
      personService
        .create(personObject)
        .then(createPerson => {
          setPersons(persons.concat(createPerson))
        })
    }
    
  }

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      const removeName = person.name
      personService
      .remove(person.id)
        .then(response => {
          setPersons(persons.filter(persons => persons.id !== person.id))
          setSuccess(`Removed ${removeName}`)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={success} type='success' />
      <Notification message={error} type= 'error' />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <div>
        {filteredPersons.map(person =>
          <Numbers key={person.name} person={person} removeperson={removePerson}/>
        )}
      </div>
      <div>debug: {newName}</div>
    </div>
  )

}

export default App
