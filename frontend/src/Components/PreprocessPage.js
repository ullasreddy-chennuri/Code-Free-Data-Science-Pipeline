// PreprocessPage.js
import React, { useState,useEffect } from 'react';
import Header from './Header';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../Styles/PreprocessPage.css';
import FileUploadForm from './FileUploadForm';
import ReplayIcon from '@mui/icons-material/Replay';
import Select from 'react-select';



function PreprocessPage() {

  const [uploadStatus, setUploadStatus] = useState('');
  const [showPreprocess, setShowPreprocess] = useState(false);
  const [columnNames, setcolumnNames] = useState([]);
  const [numColumns, setnumColumns] = useState([]);
  const [remColumns, setremColumns] = useState([]);
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const [f,setF] = useState(null);

  const options = columnNames.map(columnName => ({ value: columnName, label: columnName }));

  const [menuIsOpenNumColumns, setMenuIsOpenNumColumns] = useState(false);
  const [menuIsOpenRemColumns, setMenuIsOpenRemColumns] = useState(false);

  const handleFocusNumColumns = () => {
    setMenuIsOpenNumColumns(true);
  };

  const handleBlurNumColumns = () => {
    // Add logic to check if the blur event occurred outside the dropdown area
    setMenuIsOpenNumColumns(false);
  };

  const handleFocusRemColumns = () => {
    setMenuIsOpenRemColumns(true);
  };

  const handleBlurRemColumns = () => {
    // Add logic to check if the blur event occurred outside the dropdown area
    setMenuIsOpenRemColumns(false);
  };



  const handleNumColumnChange = (numColumns) => {
    // const selectedValues = selectedOptions.map(option => option.value);
    // Update state with selected values
    setnumColumns(numColumns || []);
  };


  const handleRemColumnChange = (remColumns) => {
    setremColumns(remColumns || []);
  };

  const handlePreprocessClick = () => {
    const numColumnValues = numColumns.map(column => column.value);
    const remColumnValues = remColumns.map(column => column.value);

    const dataToSend = {

      numColumns: numColumnValues,
      remColumns: remColumnValues
    };

    console.log("num columns", numColumns);

    console.log("rem columns", remColumns);
    console.log("data from dropdowns: ", dataToSend);
    // Assuming you're using fetch to send data to the server
    fetch('http://localhost:5000/numerical_columns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
    .then(response => {
      // Handle response from server if needed
    })
    .catch(error => {
      console.error('Error:', error);
    });

  };
  
  const handleReset= async () => {
    setbuttonDisabled(false);
    setUploadStatus('');
    setShowPreprocess(false);  
    setnumColumns([]);
    setremColumns([]);
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
    <div className='preprocess'>
      <Header />
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
            disabled={!showPreprocess}><ReplayIcon />RESET</Button>
      
      </div>
      </div>
    
      <div className='uploadForm'>
       {!showPreprocess  && <FileUploadForm f={f} setF={setF} uploadStatus={uploadStatus} setUploadStatus={setUploadStatus} columnNames={columnNames} setcolumnNames={setcolumnNames} buttonDisabled={buttonDisabled} setbuttonDisabled={setbuttonDisabled}/>}
      </div>
      
      <div>
      <div className={`preprocess-dropdown ${showPreprocess ? 'appear' : ''}`}>
      {f  && <h1>{f}</h1>}

      <div className='dropdown-body'>

      <h1 className='text_heading'> Select the numerical columns in the dataset:</h1>



<Select
  className='dropdown'
  isMulti
  value={numColumns}
  onChange={handleNumColumnChange}
  options={options}
  styles={customStyles}
  onFocus={handleFocusNumColumns}
  onBlur={handleBlurNumColumns}
  menuIsOpen={menuIsOpenNumColumns}
/>   

<h1 className='text_heading' > Select the columns to delete from the dataset:</h1>
<h1> </h1>

<Select
  className='dropdown'
  isMulti
  value={remColumns}
  onChange={handleRemColumnChange}
  options={options}
  styles={customStyles}
  onFocus={handleFocusRemColumns}
  onBlur={handleBlurRemColumns}
  menuIsOpen={menuIsOpenRemColumns}
/>  
      </div>
   


            

      <div className='submit_button'>
      <Link to="/preprocess_steps">
      <Button component={Link} to="/preprocess_steps" size="large"  variant="contained" onClick={handlePreprocessClick}
        sx={{
          backgroundColor: "#3F51B5",
          color: 'white',
          fontWeight: 'bold', 
          fontSize: '18px', 
          height: '50px',

          '&:hover': {
            backgroundColor: '#3F51B5',
            color: 'white',
          },
        }}>
          
        SUBMIT
      </Button>
      </Link>
      </div>
     
            </div>
            </div>
      
      
      
    </div>
  );
}

export default PreprocessPage;
