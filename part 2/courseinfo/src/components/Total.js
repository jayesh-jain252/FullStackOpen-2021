import React from 'react'

function Total({course}) {
    const exercisesArray = course.parts.map((x)=>x.exercises)
    
    const sum = exercisesArray.reduce((accumulator,currentVal) => {
      return accumulator+currentVal
    },0);
    return(
    <p><strong>Number of exercises {sum}</strong></p>
  ) 
}

export default Total
