import React from 'react'
import { Button } from '@mui/material';
import '../Styles/Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className='header'>
     <h1 className='logo' > 
     <Link to="/">
     <Button size="medium" variant="contained"
            sx={{
              backgroundColor: '#3F51B5',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '24px',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#3F51B5',
                color: 'white',
                boxShadow: 'none'
              },
            }}>
              Custom ML
              </Button>
              </Link>
     </h1>
    </div>
  )
}

export default Header