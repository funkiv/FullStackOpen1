import { useState } from 'react'

const Button = (props) => {
  return (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = good / total * 100 

  if (total === 0) {
    return <p>no feedback given</p>
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {total} </p>
        <p>average {average}</p>
        <p>positive {positive} %</p>
      </div>
    )
    }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick= {() => setGood(good + 1)} />
      <Button text='neutral' handleClick= {() => setNeutral(neutral + 1)} />
      <Button text='bad' handleClick= {() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App