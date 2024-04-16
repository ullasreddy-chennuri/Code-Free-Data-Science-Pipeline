import './Styles/App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import PreprocessPage from './Components/PreprocessPage';
import MLmodelsPage from './Components/MLmodelsPage';
import PreprocessCheckBox from './Components/PreprocessCheckBox';
import MLCardsPage from './Components/MLCardsPage';
import MLmodelsResult from './Components/MLmodelsResult';

function App() {

  return (

    <div className="App">
    
    <Router>
      <Routes>
      <Route path="/preprocess_steps" element ={<PreprocessCheckBox/>}/>
        <Route path="/preprocess" element={<PreprocessPage/>} />
        <Route path="/mlmodels_training" element={<MLCardsPage/>} />
        <Route path="/mlmodels_result" element={<MLmodelsResult/>} />

        <Route path="/mlmodels" element={<MLmodelsPage/>} />
        <Route path="/" element={<Home/>} />
      


      </Routes>
    </Router>
    </div>
  );
}

export default App;
