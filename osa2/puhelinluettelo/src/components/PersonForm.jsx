const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return (
        <form onSubmit={addPerson}>
          <h2>add a new</h2>
          <p>Name: <input value={newName} onChange={handleNameChange}/></p>
          <p>Number: <input value={newNumber} onChange={handleNumberChange}/></p>
          <button type="submit">add</button>
        </form>
    )
}

export default PersonForm