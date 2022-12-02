import React from "react";

import { useQuery } from '@apollo/client';
import { GET_All_USERS } from '../utils/queries';


// import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
  

const Aside = () => {

    const { loading, data } = useQuery(GET_All_USERS)

    const userData = data?.users || [];
    console.log(userData)

  

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container 
            direction ="column" 
            justifyContent="center" 
            alignItems="flex-end" 
            marginRight="10px"
            // marginBottom={1} 
            // paddingBottom={10} 
            // paddingLeft={20} 
            rowSpacing={1} 
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        
                {userData.map((users) => (

                    <div key={users}>
                        <h1>{users.username}</h1>
                        {users.topFour.map((topFour) => ( 
                    
                    <div>
                        <img src= {topFour.image}></img>
                    </div> 
                    
                    ))}

                    <br></br>
                </div>
            ))}
            </Grid>
        </Box>
    )
}

export default Aside;


// const Aside = () => {

//     const { loading, data } = useQuery(GET_All_USERS)

//     const userData = data?.users || [];
//     console.log(userData)

  

//     return (
//         <div>
//             {userData.map((users) => (

//                 <div key={users}>
//                     <h1>{users.username}</h1>
//                     {users.topFour.map((topFour) => ( 
                    
//                     <div>
//                         <img src= {topFour.image}></img>
//                     </div> 
                    
//                     ))}
//                     <br></br>
//                 </div>
//             ))}
//         </div>
//     )
// }

// export default Aside;