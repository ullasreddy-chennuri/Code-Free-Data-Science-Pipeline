import React, { useState, useRef } from 'react';
import { Button } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { Accordion, AccordionSummary, Typography, Card, CardContent } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import '../Styles/MLCardsPage.css';
import Header from './Header';
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MLmodelsResult from './MLmodelsResult';

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
    <Accordion expanded={expanded} onChange={handleAccordionChange} ref={accordionRef} style={{ maxWidth: '750px' }}>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <div>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }} >{title}</Typography>
      <Typography variant="body1">{description}</Typography>
    </div>
  </AccordionSummary>
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
      description: 'Regression is a statistical method used for analyzing the relationship between dependent and independent variables. It predicts continuous numeric values based on the input features, aiming to find the best-fitting line or curve that represents the relationship between the variables.',
      subModels: [
        {
          id: 'linear_regression',
          title: 'Linear regression',
          description: 'Model for predicting continuous numeric values by establishing a linear relationship between input variables and the target variable.',
        },
        {
            id: 'decision_tree_regression',
            title: 'Decision tree regression',
            description: 'Model for predicting continuous numeric values using a tree-like model structure.',
          },
          {
            id: 'knn_regression',
            title: 'KNN Regression',
            description: 'Model for predicting continuous numeric values by averaging the values of the k nearest data points.',
          },
          {
              id: 'random_forest_regression',
              title: 'Random Forest regression',
              description: 'Model for predicting continuous continuous numeric values by averaging the predictions from multiple decision trees trained on different random subsets of the data.',
            },
        // More sub-models for regression
      ],
    },
    {
      id: 'classification',
      title: 'Classification',
      description: 'Classification is a machine learning technique used to categorize data into predefined classes or labels. It predicts the class of new instances based on past observations. The goal is to learn a mapping function from input variables to discrete output categories, enabling the classification of unseen data into one of the known classes.',
      subModels: [
        {
          id: 'logistic_regression',
          title: 'Logistic Regression',
          description: 'Model for predicting categorical values using a logistic function.',
        },
        {
            id: 'svm_classification',
            title: 'SVM Classification',
            description: 'Model for predicting categorical values categorical values using support vectors to separate data into different classes.',
          },
          {
            id: 'decision_tree_classification',
            title: 'Decision Tree Classification',
            description: 'Model for predicting categorical values by recursively partitioning the feature space into subsets based on the value of input features.',
          },
          {
            id: 'naive_bayes_classification',
            title: 'Naive Bayes Classification',
            description: 'Model for predicting categorical values using Bayes theorem with the assumption of independence between features.',
          },
          {
            id: 'knn_classification',
            title: 'KNN Classification',
            description: 'Model for predicting categorical values based on the majority class of the k-nearest neighbors in the feature space.',
          },
          {
            id: 'random_forest_classification',
            title: 'Random Forest Classification',
            description: 'Model for predicting categorical values by constructing multiple decision trees during training and outputting the mode (or most frequent class) of the individual trees.',
          },
        // More sub-models for classification
      ],
    },
  ];

  
  const [selectedModel, setSelectedModel] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);
  const [showResultPage, setShowResultPage] = useState(false);
  const [load, setLoad] = useState(false); // New state variable


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
    setLoad(true)
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
        setShowResultPage(true); // Show result page when successful response
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

        {!showResultPage && (
    <div>
        <div className='topbuttons'>

  <div className='backbutton'>
  <Link to="/">
    <Button size="medium" variant="contained"
      tabIndex={-1}
      sx={{
        backgroundColor: '#3F51B5',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '18px',
        borderRadius: '10px',
        '&:hover': {
          backgroundColor: '#3F51B5',
          color: 'white',
        },
      }}><ArrowBackIcon />Back</Button>
  </Link>
</div>

</div>

<div className='accordions-group'>

      <div className='accordions'>

        <h1> Select the model: </h1>
        {initialModelSelectionCards.map((accordion, index) => (
      <div key={accordion.id} style={{ marginBottom: '50px' }}>
        <ModelAccordion
          title={accordion.title}
          description={accordion.description}
          models={accordion.subModels}
          onSelectModel={handleModelSelect}
        />
      </div>
    ))}


      {selectedModel && (
        <div className='selectedModel'>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Selected Model:</Typography>
          <ModelCard title={selectedModel.title} description={selectedModel.description} />
        </div>
      )}
       {!load? (
      <Button
        variant="contained"
        endIcon={<SendIcon fontSize="large" sx={{color:'white'}}/>}
        sx={{
          backgroundColor: '#3F51B5',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '18px',
          height: '50px',
          marginTop: '20px',
          '&:hover': {
            backgroundColor: '#3F51B5',
          },
        }}
        onClick={handlePreprocessClick}
        disabled={!selectedModel} // Disable the button if selectedModel is null
        >
        SUBMIT
      </Button>
 ) : (
  <div className='load'>
    <h3>The model is training better...Please wait for few seconds...</h3>
    <CircularProgress style={{'color': 'white'}} />
    </div>
)}

      </div>
</div>
</div>
)}
{showResultPage && <MLmodelsResult responseMessage={responseMessage} setLoad={setLoad} setShowResultPage= {setShowResultPage} />}

    </div>


  );
};

export default MLCardsPage;
