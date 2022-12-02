import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { Container, Card, Button } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER, GET_ME } from '../utils/queries';
import { REMOVE_RECORD } from '../utils/mutations';
import Auth from '../utils/auth';
// import AlbumArt from '../components/AlbumArt';
// import { SAVE_TOP} from '../utils/mutations';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const Medley = ({allowDelete}) => {
  const { username } = useParams();

  const { loading, data } = useQuery(username ? GET_USER : GET_ME, {
    variables: { username: username },
  });

  const [removeRecord, { error }] = useMutation(REMOVE_RECORD);
  // const [saveTop, {err}] = useMutation(SAVE_TOP);

  const userData = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === username) {
    return <Navigate to="/me" />;
  }


  // create function that accepts the medley mongo _id value as param and deletes the album from the database
  const handleRemoveRecord = async (_id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    console.log(_id)
    try {
      let data = await removeRecord({
        variables: { _id: _id },
      });
      console.log(data)

    } catch (err) {
      console.error(error);
    }
  };

  // const handleSaveTop = async (input) => {
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;

  //   if (!token) {
  //     return false;
  // }
  // console.log(input)
  // const frank = { 
  //   artist: input.artist, album_name: input.album_name, 
  //   image: input.image
  //   }
  // try {
  //     let data = await saveTop({
  //         variables: {input:frank},
  //     });
  //     console.log(data)

  // } catch (err) {
  //     console.error(error);
  // }


  // }

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  if (!userData?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>


      <Container>
        <div className="flex-row justify-center mb-3">
          <h2>
            {userData.medley.length
              ? `Viewing ${userData.medley.length} saved ${userData.medley.length === 1 ? 'medley' : 'medleys'}:`
              : 'You have no saved medleys!'}
          </h2>
          <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
            Viewing {username ? `${userData.username}'s` : 'your'} profile.
          </h2>
          <Stack direction="row" spacing={2}>
            {userData.medley.map((medley) => {
              return (
                <item key={medley._Id} border='dark'>
                  {medley.image ? <Card.Img src={medley.image} alt={`The cover for ${medley.artist}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{medley.artist}</Card.Title>
                    <p className='small'>Album: {medley.album_name}</p>
                    {allowDelete && (<Button className='btn-block btn-danger' onClick={() => handleRemoveRecord(medley._id)}>
                      Delete this Album!
                    </Button>)}

                  </Card.Body>
                </item>
              );
            })}
          </Stack>
          {/* {!userParam && (
            <div className="col-12 col-md-10 mb-3 p-3"
              style={{ border: '1px dotted #1a1a1a' }}>
              <Stack direction="row" spacing={2}>
                {userData.medley.map((medley) => {
                  return (
                    <item key={medley._Id} border='dark'>
                      {medley.image ? <Card.Img src={medley.image} alt={`The cover for ${medley.artist}`} variant='top' /> : null}
                      <Card.Body>
                        <Card.Title>{medley.artist}</Card.Title>
                        <p className='small'>Album: {medley.album_name}</p>
                      </Card.Body>
                    </>
                  );
                })}
              </Stack>

            </div>
          )} */}
        </div>

      </Container >
    </div>

  )
}

export default Medley



