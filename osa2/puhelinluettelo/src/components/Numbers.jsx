const Numbers = ({person, removeperson}) => {
    return (
        <p>
            {person.name} {person.number}
        <button onClick={() => removeperson(person)}>delete</button>
        </p>
    )
}

export default Numbers