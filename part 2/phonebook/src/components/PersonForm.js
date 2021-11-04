import React from 'react'

function PersonForm(props) {
    return (
        <form onSubmit={props.addPerson}>
        <div>
          <div><strong>Name: </strong><input value={props.newName} onChange={props.handleNewName}/></div>
          <div><strong>Number: </strong><input value={props.newNumber} onChange={props.handleNewNumber}/></div>
          <div><button type="submit"><strong>Add</strong></button></div>
        </div>
      </form>
    )
}

export default PersonForm

      