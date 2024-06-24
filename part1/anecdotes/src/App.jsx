import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const initialVotes = new Uint8Array(anecdotes.length) 
  const [votes, setVotes] = useState(initialVotes)
  const [selected, setSelected] = useState(0)

  //Random number between two ints
  const getRandom = (max) => {
    const minCeiled = Math.ceil(0);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
  }

  const handleVotes = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    console.log(selected)
    console.log(copy)
  }

  return (
    <div>
     <p>{anecdotes[selected]}</p>
     <p>has {votes[selected]} votes</p> 
      <Button handleClick= {() => handleVotes()} text = "vote"/>
      <Button handleClick= {() => setSelected(getRandom(anecdotes.length - 1))} text = "next anecdote"/>
    </div>
  )
}

export default App