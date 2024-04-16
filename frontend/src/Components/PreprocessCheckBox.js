import React, { useState } from 'react';
import { Checkbox, Button, Card, CardContent, Grid } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Header from './Header';
import ReplayIcon from '@mui/icons-material/Replay';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../Styles/PreprocessCheckBox.css';



const preprocessNames = {
  "handle_null_numerical": "Replace null values present with numerical column.",
  "handle_null_character": "Replace null values present with character column.",
  "clean_strings": "Description of 1 preprocessing Description of 1 preprocessing Description of 1 preprocessing",
  "normalize_data": "Description of 1 preprocessing Description of 1 preprocessing Description of 1 preprocessing",
  "handle_invalid_data": "Description of 1 preprocessing Description of 1 preprocessing Description of 1 preprocessing",
  "handling_outliers": "Removing the values that are outside the threshold range.",
  "remove_duplicate_rows": "Removing the duplicate rows.",

  };

const PreprocessCheckBox = ({ columnNames }) => {

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [error, setError] = useState('');
  const [hoveredCard, setHoveredCard] = useState('');
  const [download, setDownload] = useState(false);

  const handleReset =() =>{
    setSelectedCheckboxes([]);
  }
  const handleCheckboxChange = (preprocessName) => {
    const selectedIndex = selectedCheckboxes.indexOf(preprocessName);
    const newSelected = [...selectedCheckboxes];


    if (selectedIndex === -1) {
      newSelected.push(preprocessName);
    } else {
      newSelected.splice(selectedIndex, 1);
    }

    setSelectedCheckboxes(newSelected);
  };

  const handleCardClick = (preprocessName) => {
    if (selectedCheckboxes.includes(preprocessName)) {
      const newSelected = selectedCheckboxes.filter(item => item !== preprocessName);
      setSelectedCheckboxes(newSelected);
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, preprocessName]);
    }
  };

  const handleSubmit = () => {
    if (selectedCheckboxes.length === 0) {
      setError('Please select at least one preprocessing step.');
      return;
    }
    console.log({selectedCheckboxes});
    // Send selectedCheckboxes to localhost:5000
    fetch('http://localhost:5000/preprocess', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ selectedCheckboxes }),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to submit checkboxes.');
    }
    // Convert the response to text
    return response.text();
  })
  .then((data) => {
    console.log('Data:', data); // You can check the response here
    if (data === 'Success') {
      console.log('set here ');
     // console.log(data);
      
      //setRes(data);
      setDownload(true);
      setError('');
    } else {
      // Handle other responses if needed
      setError('Unexpected response from the server.');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
    setError('Failed to submit checkboxes.');
  });
  };

  const handleDownload = () => {
    fetch('http://localhost:5000/get_preprocessed_data', {
      method: 'GET',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to download preprocessed data');
      }
      return response.blob();
    })
    .then(blob => {
      // Create a new Blob object with MIME type 'text/csv'
      const csvBlob = new Blob([blob], { type: 'text/csv' });
      // Create URL for blob object
      const url = window.URL.createObjectURL(csvBlob);
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'preprocessed_data.csv');
      // Simulate click on the link to trigger download
      document.body.appendChild(link);
      link.click();
      // Clean up resources after download
      document.body.removeChild(link);
    })
    .catch(error => {
      console.error('Error:', error);
      setError('Failed to download preprocessed data');
    });
  };
  

  return (
    <div className='checkbox'>
      
      <Header />
      <div className='topbuttons'>

<div className='backbutton'>
  <Link to="/preprocess">
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
<div className='resetbutton'>
  
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
      }} onClick={handleReset}
    ><ReplayIcon />RESET</Button>

</div>
</div>
<h1 className='title' >Select the Preprocessing steps:</h1>

<div className='checbox_selection'>

      <Grid container spacing={2}>
        {Object.entries(preprocessNames).map(([preprocessName, description], index) => (
          <Grid item xs={6} key={index} >
            <Card
              sx={{ borderRadius: '10px',
              backgroundColor: hoveredCard === preprocessName ? 'lightgray' : 'white',
              transition: 'transform 0.3s ease',
              transform: hoveredCard === preprocessName ? 'scale(1.01)' : 'scale(1)'
          }}
              onMouseEnter={() => setHoveredCard(preprocessName)}
              onMouseLeave={() => setHoveredCard('')}
              onClick={() => handleCardClick(preprocessName)}
            >
              <CardContent>
                <Checkbox
                  checked={selectedCheckboxes.includes(preprocessName)}
                  onChange={() => handleCheckboxChange(preprocessName)}
                  color="primary"
                  inputProps={{ 'aria-label': preprocessName }}
                  sx={{
                    fontSize: 'large',
                    '& .MuiSvgIcon-root': {
                      color: 'black',
                    },
                  }}
                />
                <div style={{ display: 'inline-block', marginLeft: '8px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{preprocessName}</div>
                  <div style={{ fontSize: '18px' }}>{description}</div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

</div>


      <div className='submitsection'>
        <div className='submitButton'>
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
        onClick={handleSubmit}
      >
        SUBMIT
      </Button>

        </div>

<div className='error'>

      {error && <p style={{ color: 'red' }}>{error}</p>}
</div>
<div className={`downloadButton ${download ? 'appear' : ''}`}>

<Button
        variant="contained"
        endIcon={<FileDownloadIcon className='upload' fontSize="large" sx={{ fontSize: '3rem' }} />}
        sx={{
          backgroundColor: 'green',
          color: 'black',
          fontWeight: 'bold', 
          fontSize: '18px', 
          height: '50px',

          '&:hover': {
            backgroundColor: 'green',
            color: 'black',
          },
        }}
        onClick={handleDownload}
        disabled={!download}
      >
        DOWNLOAD
      </Button>
</div>
      </div>
      
    </div>
  );
};

export default PreprocessCheckBox;
