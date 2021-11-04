import React from 'react'

function Persons({numbersToShow,handleDeleteButton}) {
    return (
        <div>
            {numbersToShow.map(person=>
            <p key={person.name}>{person.name} {person.number} <button onClick={()=>handleDeleteButton(person.id)}>delete</button></p>
        )}
        </div>
    )
}

export default Persons
