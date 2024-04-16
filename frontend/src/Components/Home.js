import React from 'react'
import Header from './Header'
import Cards from './Cards'
function Home() {
  return (
    <div><Header/>
    <div className='body'>
    <h1 className='descri'>Your Data into Business Insights using the ML models you select!</h1>
    <Cards/></div>
    </div>

  )
}

export default Home