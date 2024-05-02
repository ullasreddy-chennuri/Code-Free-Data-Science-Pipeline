import React, { useState, useEffect } from 'react';
import { Button, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import '../Styles/FileUploadForm.css';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function FileUploadForm({ f,setF,uploadStatus, setUploadStatus, columnNames, setcolumnNames, buttonDisabled, setbuttonDisabled}) {
  const [file, setFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  
  useEffect(() => {
    if (uploadStatus === 'File uploaded successfully!') {
      setbuttonDisabled(true);
     
    }
  }, [uploadStatus, setbuttonDisabled]);


  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2500);
    if (!file) {
      setUploadStatus('Please select a file to upload.');
      
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
    console.log(file)
      const response = await fetch('http://localhost:5000/upload_preprocess', {
        method: 'POST',
        body: formData,
        responseType: 'blob',

      });
    
      if (!response.ok) {
        throw new Error('Failed to upload file.');
      }
      setUploadStatus('File uploaded successfully!');
      setF(file[0]);
      
      const responseData = await response.json();
      console.log(responseData); 

      //const columnNames = responseData.total_columns;
      //console.log(columnNames); 
      
      if (responseData.total_columns) {
        
        const columnNames = responseData.total_columns.map(column => btoa(column));
        const decodedColumnNames = columnNames.map(column => atob(column));
      
        console.log(decodedColumnNames);
        setcolumnNames(decodedColumnNames);
      }
      
      else {
        throw new Error('columnNames property not found in response data.');
      }
      
      
      setUploadStatus('File uploaded successfully!');


    } 
    
    catch (error) {
      setUploadStatus(`Error uploading file: ${error.message}`);
    }
   
  };

  return (
    <div className='buttons'>
      
      <form>
        
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={file ? <CloudDoneIcon className='upload' fontSize="large" sx={{
          color: '#3F51B5',}}/> : <CloudUploadIcon className='upload' fontSize="large"sx={{
            color: '#3F51B5',}}/>}
        sx={{
          backgroundColor: 'white',
          color: '#3F51B5',
          fontWeight: 'bold', 
          fontSize: '18px',
          height: '50px',
          width: '300px',
          padding: '8px 16px',

          '&:hover': {
            backgroundColor: 'grey',
            color: 'black',
          },
        }} disabled= {buttonDisabled}
      >
        Upload Dataset
        <VisuallyHiddenInput type="file" accept=".xlsx,.csv" onChange={handleFileChange} />
      </Button>

      <Button
        variant="contained"
        endIcon={<SendIcon className='upload' fontSize="large" sx={{ fontSize: '3rem', color: 'white' }} />}
        sx={{
          backgroundColor: '#3F51B5',
          color: 'white',
          fontWeight: 'bold', 
          fontSize: '18px', 
          height: '50px',

          '&:hover': {
            backgroundColor: '#3F51B5',
            color: 'black',
          },
        }}
        onClick={handleUpload}
        disabled={!file && buttonDisabled}
      >
        Send
      </Button>
      {showAlert && ( 
        <Alert  sx={{ marginTop: '16px' }} duration={3000} severity="info">
          {uploadStatus}
        </Alert>
      )}
     

     {file && (
    <p style={{ color: 'black', fontSize: '25px', marginTop: '0px' }}>{file.name}</p>
   
)}</form>
    </div> 



  );
}

export default FileUploadForm;