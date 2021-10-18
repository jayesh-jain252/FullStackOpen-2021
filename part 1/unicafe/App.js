import React, { useState } from 'react'

const StatisticsLine = ({text,value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
  )

const Statistics = ({good,neutral,bad}) => {
      if((good+neutral+bad)>0) {
        return(
          <div>
            <table>
              <tbody>
                <StatisticsLine text="good" value = {good}/>
                <StatisticsLine text="neutral" value = {neutral}/>
                <StatisticsLine text="bad" value = {bad}/>
                <StatisticsLine text="all" value = {good+neutral+bad}/>
                <StatisticsLine text="average" value = {((good*1)+(neutral*0)+(bad*(-1)))/(good+neutral+bad)}/>
                <StatisticsLine text="positive" value = {`${good*100/(good+neutral+bad)}%`} />
              </tbody>
            </table>
          </div>
        )
      }else{
        return(
          <div>
            <p>No feedback given</p>
          </div>
        )
      }
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give FeedBack</h1>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      
    </div>
  )
}

export default App