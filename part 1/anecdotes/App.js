import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const AnecdoteDisplay = ({anecdote,votes}) => {
  return(
    <div>
      {anecdote}
      <p>has {votes} votes</p>
    </div>
  )
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  let votes = anecdotes.map(anecdote => 0); //Created a zero filled array of length equals to anecdoted length.
  
  const [selected, setSelected] = useState(0);
  const [voted,setVoted] = useState(votes);

  let anecdoteIndexWithMaxViews = voted.indexOf(Math.max(...voted));

  const handleVoteClick = () => {
      const copy = [...voted]
      copy[selected] += 1
      setVoted(copy)
  }

  const handleNextAnecdoteClick = () => {
    setSelected(Math. floor(Math. random() * anecdotes.length))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <AnecdoteDisplay anecdote={anecdotes[selected]} votes={voted[selected]}/>
      <br/>
      <Button handleClick = {handleVoteClick} text="Vote"/>
      <Button handleClick = {handleNextAnecdoteClick} text="Next Anecdote"/>
      <h1>Anecdote with most views</h1>
      <AnecdoteDisplay anecdote={anecdotes[anecdoteIndexWithMaxViews]} votes={voted[anecdoteIndexWithMaxViews]}/>
    </div>
  )
}

export default App