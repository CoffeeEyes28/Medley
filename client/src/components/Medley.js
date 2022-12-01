import React from 'react';
import {  Container, Card, Button } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_RECORD } from '../utils/mutations';
import Auth from '../utils/auth';
// import AlbumArt from '../components/AlbumArt';
import { SAVE_TOP} from '../utils/mutations';

const Medley = () => {
    const { loading, data } = useQuery(GET_ME);
    const [removeRecord, { error }] = useMutation(REMOVE_RECORD);
    const [saveTop, {err}] = useMutation(SAVE_TOP);
    const userData = data?.me || [];

    // const recordData = props.props


    // create function that accepts the medley mongo _id value as param and deletes the album from the database
    const handleRemoveRecord = async (_id) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }
        console.log(_id)
        try {
            let data = await removeRecord({
                variables: { _id: _id  },
            });
            console.log(data)

        } catch (err) {
            console.error(error);
        }
    };

    const handleSaveTop = async (input) => {
      const token = Auth.loggedIn() ? Auth.getToken() : null;

      if (!token) {
        return false;
    }
    console.log(input)
    const frank = { 
      artist: input.artist, album_name: input.album_name, 
      image: input.image
      }
    try {
        let data = await saveTop({
            variables: {input:frank},
        });
        console.log(data)

    } catch (err) {
        console.error(error);
    }


    }

    if (loading) {
        return <h2>LOADING...</h2>;
    }

    return (
        // <div>Hello World</div>

        <>
        {/* <Jumbotron fluid className='text-light bg-dark'>
          <Container>
            <h1>Viewing your Medleys!</h1>
          </Container>
        </Jumbotron> */}
        <Container>
          <h2>
            {userData.medley.length
              ? `Viewing ${userData.medley.length} saved ${userData.medley.length === 1 ? 'medley' : 'medleys'}:`
              : 'You have no saved medleys!'}
          </h2>
          <div>
            {userData.medley.map((medley) => {
              return (
                <Card key={medley._Id} border='dark'>
                  {medley.image ? <Card.Img src={medley.image} alt={`The cover for ${medley.artist}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{medley.artist}</Card.Title>
                    <p className='small'>Album: {medley.album_name}</p>
                    {/* <Card.Text>{book.description}</Card.Text> */}
                    <Button className='btn-block btn-danger' onClick={() => handleRemoveRecord(medley._id)}>
                      Delete this Album!
                    </Button>

                    {/* button save to top four button will be hidden if four are on topFour */}
                    {/* {userData.length<5&&( <Button className='btn-block btn-danger' onClick={() => handleSaveTop(medley)}>
                      Save to topFour!
                    </Button>)} */}
                  
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </Container>
      </>
    )
}

export default Medley