import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { SAVE_TOP, UPDATE_TOP } from '../utils/mutations';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Medley from '../components/Medley';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { CardContent, CardMedia } from '@mui/material';
import './topFourStyles.css';




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
    let [width, setWidth] = useState(window.innerWidth)
    const [column, setColumn] = useState(4);
    const [saveTop] = useMutation(SAVE_TOP);
    const [updateTop] = useMutation(UPDATE_TOP);
    const [open, setOpen] = useState(false);
    const [updateMedley, setUpdateMedley] = useState(null);
    const handleOpen = (updateMedley) => {
        setUpdateMedley(updateMedley);
        return setOpen(true);
    }




    useEffect(() => {
        window.addEventListener('resize', handleResize)
    }, [])

    // function wiil resize columns when window is changed
    const handleResize = () => {
        const winWidth = window.innerWidth
        setWidth(winWidth)
        if (winWidth < 800) {
            setColumn(2)
        }
        else if (winWidth > 800) {
            setColumn(4)
        }
    }

    const handleClose = () => {

        setTimeout((function () {
            window.location.reload();
        }), 50);

        return setOpen(false)

    };



    const handleUpdateTop = async (input, Id) => {
        const recordToUpdate = Id;
        
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
            <Container className='boxFour border border-light  p-4 '>

                <h2 className='  text-center text-white pt-4 pb-4'>
                    My Top Four
                </h2>
                <ImageList className='record  rounded ' sx={{ p: 2 }} cols={column} rowHeight={164}>

                    {userData.topFour.map((medley) => {
                        return (
                            <CardMedia className='mediaCard' sx={{}} key={medley._Id} >
                                {medley.image ? <CardMedia className='image2' component="img" src={medley.image} alt={`The cover for ${medley.artist}`} variant='top' /> : null}
                                <CardContent>
                                    <Typography className="fw-bold"
                                        variant="string"
                                        display="block" >{medley.album_name}</Typography>
                                    <Typography variant="body2" className='pb-3'>{medley.artist}</Typography>
                                    {/* create a container, make a row */}
                                    {allowDelete && (<Button type='button' className='btn btn-danger btn-sm update-btn' as="input" value='Update this Record' onClick={() => handleOpen(medley)} />)}
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
                                <ImageList sx={{ width: 500, height: 450 }} >
                                    {
                                        filtered(userData.medley, userData.topFour).map((topFourOption) => {
                                            return (

                                                <ImageListItem sx={{ pl: 4, pr: 4, pb: 2, pt: 2 }} key={topFourOption._id}>

                                                    <img src={topFourOption.image} alt="albumchoice"></img>
                                                    <br></br>
                                                    <Button type='button' className='update-btn btn btn-danger btn-sm' onClick={() => { handleClose(); handleUpdateTop(topFourOption, updateMedley) }}>Update with this Record</Button>
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
