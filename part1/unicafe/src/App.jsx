import { useState } from 'react'

const Button = (props) => {
  return (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, total, average, positive}) => {

  if (total === 0) {
    return <p>no feedback given</p>
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value= {good} />
            <StatisticLine text="neutral" value= {neutral} />
            <StatisticLine text="bad" value= {bad} />
            <StatisticLine text="all" value={total} />
            <StatisticLine text="average" value={Math.round(average * 100) / 100} />
            <StatisticLine text="positive" value={Math.round(positive * 100) / 100 + " %"}/>
          </tbody>
        </table>
      </div>
    )
    }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = good / total * 100 

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick= {() => setGood(good + 1)} />
      <Button text='neutral' handleClick= {() => setNeutral(neutral + 1)} />
      <Button text='bad' handleClick= {() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} 
      average={average} positive={positive}/>
    </div>
  )
}

export default App