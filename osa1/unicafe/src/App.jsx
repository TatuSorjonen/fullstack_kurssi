import { useState } from 'react'

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  if (total == 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }
  const average = ((props.good + props.neutral + props.bad)/3).toFixed(1)
  const positive = (props.good/(props.good + props.neutral + props.bad) * 100).toFixed(1)
  return (
    <div>
      <h2>statistics</h2>
      <StatisticLine text="good" value= {props.good}/>
      <StatisticLine text="neutral" value= {props.neutral}/>
      <StatisticLine text="bad" value= {props.bad}/>
      <StatisticLine text="all" value= {total}/>
      <StatisticLine text="average" value= {average}/>
      <StatisticLine text="positive" value= {positive + " %"}/>
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td><td>{props.value}</td>
    </tr>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () =>
    setGood(good + 1)

  const handleNeutral = () =>
    setNeutral(neutral + 1)

  const handleBad = () =>
    setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={handleGood}
        text="good"
      />

      <Button handleClick={handleNeutral}
        text="neutral"
      />

      <Button handleClick={handleBad}
        text="bad"
      />

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
