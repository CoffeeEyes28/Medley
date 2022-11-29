import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import Link from '@mui/material/Link';
import Logo from './assets/png-transparent-logo-computer-icons-last-fm-symbol-thumbnail.png';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <a color="inherit" href="/">
       <img style={{objectFit: "contain", width: "4%", margin: "2px"}} src={Logo} alt=""/>
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        margin: 'auto'
        
      }}
    >
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 2,
          mt: 'auto',
          display: 'flex',
          // justifyContent: 'center',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],

        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1" >
            Created by CampNerd ♫
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}
