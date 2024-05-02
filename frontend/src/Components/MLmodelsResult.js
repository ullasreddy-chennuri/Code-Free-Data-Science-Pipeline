import React from 'react'
import { Typography } from '@material-ui/core';
import '../Styles/MLmodelsResult.css';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {Button} from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function MLmodelsResult({ responseMessage, setShowResultPage, setLoad }) {

  const handleDownload = () => {
    fetch('http://localhost:5000/download_model', {
      method: 'GET',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to download ML model');
      }
      return response.blob();
    })
    .then(blob => {
      // Create a new Blob object with MIME type 'text/csv'
      const csvBlob = new Blob([blob], { type: 'pkl' });
      // Create URL for blob object
      const url = window.URL.createObjectURL(csvBlob);
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'trained_model.pkl');
      // Simulate click on the link to trigger download
      document.body.appendChild(link);
      link.click();
      // Clean up resources after download
      document.body.removeChild(link);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
  

const handleBack= ()=>{
  setShowResultPage(false);
  setLoad(false);
}
  console.log("In the result page");
  console.log("Response here is:",responseMessage);

  return (
    <div className='result page'>
      
      <div className='topbuttons'>

<div className='backbutton'>
<Link to="/mlmodels_training">
<Button size="medium" variant="contained"
  tabIndex={-1}
  onClick={handleBack}
  sx={{
    backgroundColor: '#3F51B5',
    color: 'white',
    fontWeight: 'bold', 
    fontSize: '18px',
    
    borderRadius:'10px',

    '&:hover': {
      backgroundColor: '#3F51B5',
      color: 'white',
    },
  }}>
    <ArrowBackIcon/>Back</Button>
</Link>
</div>
</div>
    
    
<div className='result-body'>
      {responseMessage && (
        <div>
                    <h2 sx={{color: '#3F51B5'}}>Yayyyyy!!! Our model did well🥳🎉🎊...</h2>

          <h1 sx={{color: '#3F51B5'}}>Model Implementation Result</h1>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Evaluation Metrics:</Typography>

         <div style={{ marginTop: '0.75rem' }}> {/* Add margin to the top of the container */}
  {Object.entries(responseMessage.evaluation_metrics).map(([key, value]) => {
    // Check if the value is not null or undefined
    if (value !== null && value !== undefined) {
      return (
        <ul key={key} style={{ fontSize: '1.2rem', marginBottom: '1rem' }}> {/* Add margin to the bottom of each ul */}
          <li>
            <strong style={{ marginRight: '0.5em' }}>{key}:</strong> {value}
          </li>
        </ul>
      );
    }
    return null; // Don't render if value is null or undefined
  })}
</div>
<div className='downloadButton'>

<Button
        variant="contained"
        endIcon={<FileDownloadIcon className='upload' fontSize="large" sx={{ fontSize: '3rem', color:'white' }} />}
        sx={{
          backgroundColor: '#3F51B5',
          color: 'white',
          fontWeight: 'bold', 
          fontSize: '18px', 
          height: '50px',

          '&:hover': {
            backgroundColor: '#3F51B5',
            color: 'white',
          },
        }}
        onClick={handleDownload}
      >
        DOWNLOAD
      </Button>
</div>

              </div>
      )}
    </div>
  </div>
  )
}

export default MLmodelsResult