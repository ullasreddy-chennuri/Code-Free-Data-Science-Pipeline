import React,{useState, useEffect} from 'react'
import Header from './Header'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../Styles/PreprocessPage.css';
import '../Styles/MLmodelsPage.css'
import ReplayIcon from '@mui/icons-material/Replay';
import MLFileUpload from './MLFileUpload';
import Select from 'react-select';
import SendIcon from '@mui/icons-material/Send';



function MLmodelsPage() {



  const [uploadStatus, setUploadStatus] = useState('');
  const [showPreprocess, setShowPreprocess] = useState(false);
  const [columnNames, setcolumnNames] = useState([]);
  const [numColumns, setnumColumns] = useState([]);
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const [f,setF] = useState(null);

  const options = columnNames.map(columnName => ({ value: columnName, label: columnName }));


  const handleNumColumnChange = (numColumns) => {
    // const selectedValues = selectedOptions.map(option => option.value);
    // Update state with selected values
    setnumColumns(numColumns || []);
  };


  const handlePreprocessClick = async () => {
  try{
    const dataToSend = {
      "target_column": numColumns.label, // Sending an array of values
    };
  
    console.log("target columns", numColumns.value);
    console.log("data from dropdowns: ", dataToSend);
  
   const response = await fetch('http://localhost:5000/target_column', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
  
  if (!response.ok) {
      // Handle response from server if needed
    }
    else {
      throw new Error('target column property not found in response data.');
    }
  }
  catch (error) {
    setUploadStatus(`Error uploading file: ${error.message}`);
  }
    
  };


  const handleReset= async () => {
    setbuttonDisabled(false);
    setUploadStatus('');
    setShowPreprocess(false);  
    setnumColumns([]);
  };
  
  
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: 'none', // Border style
      borderRadius: '15px', // Border radius
      boxShadow: '0 0 0 1px #007bff' , // Box shadow when focused
      '&:hover': {
        borderColor: '#007bff' // Border color on hover
      }
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: '#fff', // Background color
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)' // Box shadow
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#007bff' : 'transparent', // Background color when selected
      color: state.isSelected ? '#fff' : '#333', // Text color
      fontSize: '18px',
      '&:hover': {
        backgroundColor: state.isSelected ? '#007bff' : '#f0f0f0', // Background color on hover
        color: state.isSelected ? '#fff' : '#333' // Text color on hover
      }
    })
  };

  useEffect(() => {
    // Show preprocess component when upload status changes to 'File uploaded successfully!'
    if (uploadStatus === 'File uploaded successfully!') {
      setShowPreprocess(true);

    }
  }, [uploadStatus]);


  return (
    <div className='mlmodels'>
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
          
          borderRadius:'10px',

          '&:hover': {
            backgroundColor: 'darkgray',
            color: 'black',
          },
        }}><ArrowBackIcon/>Back</Button>
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
          disabled={!showPreprocess}><ReplayIcon />RESET</Button>
    
    </div>
</div>  
  
    <div className='uploadForm'>
     {!showPreprocess  && <MLFileUpload f={f} setF={setF} uploadStatus={uploadStatus} setUploadStatus={setUploadStatus} columnNames={columnNames} setcolumnNames={setcolumnNames} buttonDisabled={buttonDisabled} setbuttonDisabled={setbuttonDisabled}/>}
    </div>
    
    <div>
    <div className={`preprocess-dropdown ${showPreprocess ? 'appear' : ''}`}>
    {f  && <h1>{f}</h1>}


   </div>
      <div className='preprocess_body'>
      {
        uploadStatus && (

<div>
      <h1>Select the target column:</h1>
       <Select className='dropdowm'
        value={numColumns}
        onChange={handleNumColumnChange}
        options={options}
        styles={customStyles}
      />    
      <Link to="/mlmodels_training">
      
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
        )
      }

        </div>
      </div>
 
   
        
    </div>
  )
}

export default MLmodelsPage