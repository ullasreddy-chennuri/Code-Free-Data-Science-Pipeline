import React from 'react'
import Header from './Header'

function MLmodelsResult({ responseMessage }) {
  return (
    <div>
        <Header/>
    <h1>Model Implementation Result</h1>
    {responseMessage && (
      <div>
        <p>Message: {responseMessage.message}</p>
        <p>Evaluation Metrics: {JSON.stringify(responseMessage.evaluation_metrics)}</p>
      </div>
    )}
  </div>
  )
}

export default MLmodelsResult