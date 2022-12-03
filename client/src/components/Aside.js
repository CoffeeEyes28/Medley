import React from "react";
// import { Navigate } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { GET_All_USERS } from '../utils/queries';


// import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';
import CardMedia from '@mui/material/CardMedia';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


import { Link } from 'react-router-dom';

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

const Aside = () => {

    const { loading, data } = useQuery(GET_All_USERS)

    const userData = data?.users || [];
    console.log(userData)

   
    return (
        <Box 
        component='span'
        sx={{ 
        display: 'inline-block', 
        // mx:'2px', 
        // transform: 'scale(0.8)', 
        width: '100%'
        
        }}>
           
            {userData.map((users) => (
                <Card variant='outlined'>
                <Grid 
                container spacing={1} 
                columnSpacing={{ xs: 1, sm: 2, md: 3 }} 
                >
                    <CardContent>
                        <Box>
                        <Typography
                    variant='h4'
                    display= 'flex'
                    justifyContent= 'center'>
                    <Link
                    to={users.username}
                    color='red'
                    underline='hover'
                    >
                    {users.username} 
                    </Link>
                    </Typography>
                    </Box>
                    <ImageList sx={{ pt: 4 }} cols={2} rows={2} rowHeight={164}>
                    {users.topFour.map((topFour) => (
                         
                        <CardMedia item key={users}>

                            <img src={topFour.image}></img>
                       
                        </CardMedia>
                       
                    ))}
                     </ImageList>
                    </CardContent> 
                    {/* <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions> */}
                    
                </Grid>
                
                </Card>
               
            ))}
             
        </Box>
    );
}
export default Aside;
