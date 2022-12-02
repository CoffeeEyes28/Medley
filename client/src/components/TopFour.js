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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
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
            <Container>
                <h2>
                    {userData.topFour.length
                        ? `Viewing ${userData.topFour.length} saved ${userData.topFour.length === 1 ? 'medley' : 'medleys'}:`
                        : 'You have no saved medleys!'}
                </h2>
                <div>
                    {userData.topFour.map((medley) => {
                        return (
                            <Card key={medley._Id} border='dark'>
                                {medley.image ? <Card.Img src={medley.image} alt={`The cover for ${medley.artist}`} variant='top' /> : null}
                                <Card.Body>
                                    <Card.Title>{medley.artist}</Card.Title>
                                    <p className='small'>Album: {medley.album_name}</p>
                                    {allowDelete && (<Button onClick={() => handleOpen(medley)} className='btn-block btn-danger' >Change One of My Top Four Artist</Button>)}


                                </Card.Body>
                            </Card>

                        );
                    })}
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Update One of Your Top Four!
                            </Typography>
                            <Box>
                                {
                                    filtered(userData.medley, userData.topFour).map((topFourOption) => {
                                        return (
                                            <Box key={topFourOption._id}>

                                                <img src={topFourOption.image}></img>
                                                <br></br>
                                                <Button className='btn-block btn-danger' onClick={() => { handleClose(); handleUpdateTop(topFourOption, updateMedley) }}>Update with Selected Artist</Button>
                                            </Box>
                                        )
                                    })
                                }
                                < br ></br>

                            </Box>
                        </Box>
                    </Modal>
                </div>
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
