import React, { useState, useRef } from 'react';
import { Button } from '@mui/material';

import { Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardContent } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import '../Styles/MLCardsPage.css';
import Header from './Header';
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const ModelAccordion = ({ title, description, models, onSelectModel }) => {
  const [expanded, setExpanded] = useState(false);
  const accordionRef = useRef(null);

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  const handleModelSelect = (model) => {
    onSelectModel(model);
    setExpanded(false);
  };


  return (
    <Accordion expanded={expanded} onChange={handleAccordionChange} ref={accordionRef}  style={{ maxWidth: '600px' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">{title}</Typography>
    
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{description}</Typography>
      </AccordionDetails>
      <CardContent>
        {models.map((model) => (
          <ModelCard key={model.id} title={model.title} description={model.description} onClick={() => handleModelSelect(model)} />
        ))}
      </CardContent>
    </Accordion>
  );
};

// Rest of the components and code remain the same...


const ModelCard = ({ title, description, onClick }) => {
  return (
    <Card onClick={onClick} style={{ cursor: 'pointer', margin: '10px 0' }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  );
};

const MLCardsPage = (targetColumns) => {
  const initialModelSelectionCards = [
    {
      id: 'regression',
      title: 'Regression',
      description: 'Model for predicting continuous numeric values.',
      subModels: [
        {
          id: 'linear_regression',
          title: 'Linear regression',
          description: 'Model for predicting continuous numeric values with a linear relationship.',
        },
        {
            id: 'decision_tree_regression',
            title: 'Decision tree regression',
            description: 'Model for predicting continuous numeric values with a linear relationship.',
          },
          {
            id: 'knn_regression',
            title: 'KNN Regression',
            description: 'Model for predicting continuous numeric values with a linear relationship.',
          },
          {
              id: 'random_forest_regression',
              title: 'Random Forest regression',
              description: 'Model for predicting continuous numeric values with a linear relationship.',
            },
        // More sub-models for regression
      ],
    },
    {
      id: 'classification',
      title: 'Classification',
      description: 'Model for predicting categorical values.',
      subModels: [
        {
          id: 'logistic_regression',
          title: 'Logistic Regression',
          description: 'Model for predicting categorical values using a logistic function.',
        },
        {
            id: 'svm_classification',
            title: 'SVM Classification',
            description: 'Model for predicting categorical values using a svm classification.',
          },
          {
            id: 'decision_tree_classification',
            title: 'Decision Tree Classification',
            description: 'Model for predicting categorical values using a decision tree classification.',
          },
          {
            id: 'naive_bayes_classification',
            title: 'Naive Bayes Classification',
            description: 'Model for predicting categorical values using a Naive Bayes Classification.',
          },
          {
            id: 'knn_classification',
            title: 'KNN Classification',
            description: 'Model for predicting categorical values using a KNN Classification.',
          },
          {
            id: 'random_forest_classification',
            title: 'Random Forest Classification',
            description: 'Model for predicting categorical values using a Random Forest Classification.',
          },
        // More sub-models for classification
      ],
    },
  ];

  const [selectedModel, setSelectedModel] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);
  

  const handleModelSelect = (model) => {
    setSelectedModel(model);
  };


  const handlePreprocessClick = async () => {

    const dataToSend = {

      algorithm: selectedModel.id,
    };

    console.log("selected Columns", selectedModel);
    console.log('target from other page',targetColumns); 

    console.log("data from dropdowns: ", dataToSend);
    // Assuming you're using fetch to send data to the server
    try {
      const response = await fetch('http://localhost:5000/model_implem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Response:', responseData);
        setResponseMessage(responseData);
        // Redirect to the result page
        window.location.href = '/MLmodelsResult';
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="app-container">
        <Header/>
        <div className='topbuttons'>

<div className='backbutton'>
  <Link to="/">
    <Button size="medium" variant="contained"
      tabIndex={-1}
      sx={{
        backgroundColor: 'black',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '18px',
        borderRadius: '10px',
        '&:hover': {
          backgroundColor: 'darkgray',
          color: 'black',
        },
      }}><ArrowBackIcon />Back</Button>
  </Link>
</div>

</div>

<div className='accordions-group'>

      <div className='accordions'>

        
      {initialModelSelectionCards.map((accordion) => (
        <ModelAccordion
          key={accordion.id}
          title={accordion.title}
          description={accordion.description}
          models={accordion.subModels}
          onSelectModel={handleModelSelect}
        />
      ))}
      {selectedModel && (
        <div>
          <Typography variant="h6">Selected Model:</Typography>
          <ModelCard title={selectedModel.title} description={selectedModel.description} />
        </div>
      )}
      <Link to="/mlmodels_result">
      
      <Button
        variant="contained"
        endIcon={<SendIcon fontSize="large" />}
        sx={{
          backgroundColor: 'green',
          color: 'black',
          fontWeight: 'bold',
          fontSize: '18px',
          height: '50px',
          marginTop: '20px',
          '&:hover': {
            backgroundColor: 'darkgreen',
          },
        }}
        onClick={handlePreprocessClick}
        >
        SUBMIT
      </Button>
      </Link>


      </div>
</div>


    </div>


  );
};

export default MLCardsPage;
