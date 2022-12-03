import React from "react";
import { useQuery } from '@apollo/client';
import { GET_All_USERS } from '../utils/queries';



import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import ImageList from '@mui/material/ImageList';



import { Link } from 'react-router-dom';


const Aside = () => {

    const { loading, data } = useQuery(GET_All_USERS)

    const userData = data?.users || [];
    console.log(userData)


    return (
        <Box
            component='span'
            sx={{
                display: 'inline-block',
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
                                    display='flex'
                                    justifyContent='center'>
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
                    </Grid>
                </Card>
            ))}
        </Box>
    );
}
export default Aside;
