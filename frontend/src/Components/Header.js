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
              backgroundColor: 'black',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '24px',
              '&:hover': {
                backgroundColor: 'black',
                color: 'white',
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