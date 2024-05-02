import React, { useState } from 'react';
import { Checkbox, Button, Card, CardContent, Grid } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Header from './Header';
import ReplayIcon from '@mui/icons-material/Replay';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../Styles/PreprocessCheckBox.css';
import Alert from '@mui/material/Alert';


const preprocessNames = {
  "handle_null_numerical": "Method to manage or address null values within numerical data.",
  "handle_null_character": "Method to address or manage null values within character or string data.",
  "clean_strings": "Method to remove unnecessary characters and format string data for improved consistency.",
  "normalize_data": "Method to scale numerical data to a common range, often between 0 and 1, for better model performance.",
  "handle_invalid_data": "Method to handle the unexpected characters and format of the dataset.",
  "handling_outliers": "Remove values of columns that are outside the threshold range.",
  "remove_duplicate_rows": "Remove the duplicate rows present in the dataset."
  };

const PreprocessCheckBox = ({ columnNames }) => {

  const [preprocess_names, setSelectedCheckboxes] = useState([]);
  const [error, setError] = useState('');
  const [hoveredCard, setHoveredCard] = useState('');
  const [download, setDownload] = useState(false);

  const handleReset =() =>{
    setSelectedCheckboxes([]);
  }
  const handleCheckboxChange = (preprocessName) => {
    const selectedIndex = preprocess_names.indexOf(preprocessName);
    const newSelected = [...preprocess_names];


    if (selectedIndex === -1) {
      newSelected.push(preprocessName);
    } else {
      newSelected.splice(selectedIndex, 1);
    }

    setSelectedCheckboxes(newSelected);
  };

  const handleCardClick = (preprocessName) => {
    if (preprocess_names.includes(preprocessName)) {
      const newSelected = preprocess_names.filter(item => item !== preprocessName);
      setSelectedCheckboxes(newSelected);
    } else {
      setSelectedCheckboxes([...preprocess_names, preprocessName]);
    }
  };

  const handleSubmit = () => {
    if (preprocess_names.length === 0) {
      alert("Please select at least one preprocessing step.");
      // setError('Please select at least one preprocessing step.');
      return;
    }
    console.log({preprocess_names});
    // Send preprocess_names to localhost:5000
    fetch('http://localhost:5000/preprocess', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ preprocess_names }),
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
        backgroundColor: '#3F51B5',
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
        backgroundColor: '#3F51B5',
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
<h1 className='preprocess_head'  >Select the Preprocessing steps:</h1>

<div className='checbox_selection'>

<Grid container spacing={2}>
  {Object.entries(preprocessNames).map(([preprocessName, description], index) => (
    <Grid item xs={6} key={index}>
      <Card
        sx={{
          borderRadius: '10px',
          backgroundColor: hoveredCard === preprocessName ? 'lightgray' : 'white',
          transition: 'transform 0.3s ease',
          transform: hoveredCard === preprocessName ? 'scale(1.01)' : 'scale(1)',
          marginLeft: '100px',
        marginRight: '100px'
        }}
        onMouseEnter={() => setHoveredCard(preprocessName)}
        onMouseLeave={() => setHoveredCard('')}
        onClick={() => handleCardClick(preprocessName)}
      >
        <CardContent>
          <Checkbox
            checked={preprocess_names.includes(preprocessName)}
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
        endIcon={<SendIcon fontSize="large"  sx={{color:"white"}}/>}
        sx={{
          backgroundColor: '#3F51B5',
          color: 'whute',
          fontWeight: 'bold',
          fontSize: '18px',
          height: '50px',
          marginTop: '20px',
          marginLeft: '20px',
          '&:hover': {
            backgroundColor: '#3F51B5',
            marginLeft: '20px'

          },
        }}
        onClick={handleSubmit}
      >
        SUBMIT
      </Button>


      <div className='error'>

{error && <Alert className='alertbox'severity="error" style={{ color: 'red' }} >{error}</Alert>}
</div>


<div className={`downloadButton ${download ? 'appear' : ''}`}>

<Button
        variant="contained"
        endIcon={<FileDownloadIcon className='upload' fontSize="large" sx={{ fontSize: '3rem', color: 'white' }} />}
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
        disabled={!download}
      >
        DOWNLOAD
      </Button>
</div>
        </div>

      </div>
      
    </div>
  );
};

export default PreprocessCheckBox;
