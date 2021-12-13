import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { createNotificationAction } from '../reducers/notificationReducer'

const Anecdote = ({anecdote}) => {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(incrementVote(anecdote))
        dispatch(createNotificationAction(`You voted Anecdote '${anecdote.content}'`))

        // setTimeout(() => {dispatch(setNotification(null))},5000)                  
    }
    return(
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(({filter, anecdotes}) => {
        if ( filter === null ) {
            return anecdotes
        }
        return anecdotes.filter(a=>a.content.toLowerCase().includes(filter.toLowerCase()))
    })

    

    anecdotes.sort(function(a, b) {
        var keyA = a.votes,
          keyB = b.votes
        // Compare the 2 dates
        if (keyA < keyB) return 1
        if (keyA > keyB) return -1
        return 0
    })
    
    return(
        <div>
            {anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                />
            )}
        </div>
    )

}

export default AnecdoteList