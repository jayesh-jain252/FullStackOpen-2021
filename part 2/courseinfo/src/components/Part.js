import React from 'react'

function Part({part}) {
    
    return (
        
        <p key={part.id}>
            {part.name} {part.exercises}
        </p> 
    )
}

export default Part
