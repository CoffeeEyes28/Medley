import React from 'react';
import { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { SAVE_TOP, UPDATE_TOP } from '../utils/mutations';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Medley from '../components/Medley'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { CardContent, CardMedia } from '@mui/material';




const style = {
    position: 'absolute',
    top: '10%',
    left: '25%',
    // transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const filtered = (medley, topFour) => {
    return medley.filter((datum) => {
        for (let i = 0; i < topFour.length; i++) {
            if (datum.album_name == topFour[i].album_name) {
                return false;
            }
        }
        return true
    })
}

const TopFour = ({ allowDelete, userData }) => {
    // const { loading, data } = useQuery(GET_ME);
    // const userData = data?.me || [];
    const [saveTop] = useMutation(SAVE_TOP);
    const [updateTop] = useMutation(UPDATE_TOP);
    const [open, setOpen] = useState(false);
    const [updateMedley, setUpdateMedley] = useState(null);
    const handleOpen = (updateMedley) => {
        setUpdateMedley(updateMedley);
        return setOpen(true);
    }
    const handleClose = () => {

        window.location.reload();

        return setOpen(false)

    };

    // const handleSaveTop = async (input) => {
    //     const token = Auth.loggedIn() ? Auth.getToken() : null;

    //     if (!token) {
    //         return false;
    //     }
    //     console.log(input)
    //     const frank = {
    //         artist: input.artist, album_name: input.album_name,
    //         image: input.image
    //     }
    //     try {
    //         let data = await saveTop({
    //             variables: { input: frank },
    //         });
    //         console.log(data)

    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    const handleUpdateTop = async (input, Id) => {
        const recordToUpdate = Id;
        console.log(recordToUpdate)
        console.log(input)
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        const frank = {
            artist: input.artist,
            album_name: input.album_name,
            image: input.image
        }
        if (!token) {
            return false;
        }

        try {
            await updateTop({
                variables: { input: frank, topFourId: recordToUpdate._id },
            })
        } catch (err) {
            console.error(err)
        }


    };

    // if (loading) {
    //     return <h2>LOADING...</h2>;
    // }

    return (
        <>
            {/* <Jumbotron fluid className='text-light bg-dark'>
          <Container>
            <h1>Viewing your Medleys!</h1>
          </Container>
        </Jumbotron> */}
            <Container className='bg-light pt-4'>
                
                <h2 className='text-center pt-4'>
                   My Top Four
                </h2>
                <ImageList sx={{ pt: 4 }} cols={4} rowHeight={164}>

                    {userData.topFour.map((medley) => {
                        return (
                            <CardMedia sx={{pl:4, pr: 4, pb: 2, pt: 2 }} key={medley._Id} >
                                {medley.image ? <CardMedia component="img" src={medley.image} alt={`The cover for ${medley.artist}`} variant='top' /> : null}
                                <CardContent>
                                    <Card.Title>{medley.album_name}</Card.Title>
                                    <p className='small'>{medley.artist}</p>
                                    {allowDelete && (<Button type='button' className='btn btn-danger btn-sm' onClick={() => handleOpen(medley)}  >Update this Record</Button>)}
                                </CardContent>
                            </CardMedia>

                        );
                    })}

                    {/* modal to update Medley top four */}
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography className='text-center' id="modal-modal-title" variant="h6" component="h2">
                                Update One of Your Top Four!
                            </Typography>
                            <Box>
                                <ImageList sx={{ width: 500, height: 450 }}>
                                    {
                                        filtered(userData.medley, userData.topFour).map((topFourOption) => {
                                            return (

                                                <ImageListItem sx={{ pl:4, pr: 4, pb: 2, pt: 2 }} key={topFourOption._id}>

                                                    <img src={topFourOption.image} alt="albumchoice"></img>
                                                    <br></br>
                                                    <Button type='button' className='btn btn-danger btn-sm' onClick={() => { handleClose(); handleUpdateTop(topFourOption, updateMedley) }}>Update with Selected Artist</Button>
                                                </ImageListItem>
                                            )
                                        })
                                    }
                                </ImageList>
                                < br ></br>

                            </Box>
                        </Box>
                    </Modal>
                </ImageList>
            </Container>
        </>
    )
}

// Below is a quick shorcut using AlbumArt Component which is disabled for now

// const TopFour = () => {
//     const { data } = useQuery(GET_ME); 
//     const userData = data?.me || [];
//     console.log(userData)
//     return (
//     <div>
//         {userData.topFour.map((four, i) => {
//             if (i <= 3){
//                 return <AlbumArt image = {four.image} />
//             }
//         })}
//     </div>
//   )
// }

export default TopFour;
