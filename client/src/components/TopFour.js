import React from 'react';
import {  Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
// import { SAVE_TOP } from '../utils/mutations';
// import { UPDATE_TOP } from '../utils/mutations';
import Auth from '../utils/auth';
import AlbumArt from '../components/AlbumArt';

// import React from 'react';
// import {  Container, CardColumns, Card, Button } from 'react-bootstrap';
// import { useMutation, useQuery } from '@apollo/client';
// import { GET_ME } from '../utils/queries';
// import { SAVE_TOP } from '../utils/mutations';
// import { UPDATE_TOP } from '../utils/mutations';
// import Auth from '../utils/auth';
// import AlbumArt from '../components/AlbumArt';

// const TopFour = () => {
//     const { loading, data } = useQuery(GET_ME);
//     // const [removeRecord, { error }] = useMutation(REMOVE_RECORD);
//     const userData = data?.me || [];

//     // create function that accepts the medley mongo _id value as param and deletes the album from the database
//     const handleRemoveRecord = async (_id) => {
//         const token = Auth.loggedIn() ? Auth.getToken() : null;

//         if (!token) {
//             return false;
//         }
//         console.log(_id)
//         try {
//             let data = await removeRecord({
//                 variables: { medley: _id  },
//             });
//             console.log(data)

//         } catch (err) {
//             console.error(error);
//         }
//     };

//     if (loading) {
//         return <h2>LOADING...</h2>;
//     }

//     return (
        

//         <>
//         {/* <Jumbotron fluid className='text-light bg-dark'>
//           <Container>
//             <h1>Viewing your Medleys!</h1>
//           </Container>
//         </Jumbotron> */}
//         <Container>
//           <h2>
//             {userData.topFour.length
//               ? `Viewing ${userData.topFour.length} saved ${userData.topFour.length === 1 ? 'medley' : 'medleys'}:`
//               : 'You have no saved medleys!'}
//           </h2>
//           <div>
//             {userData.medley.map((medley) => {
//               return (
//                 <Card key={medley._Id} border='dark'>
//                   {medley.image ? <Card.Img src={medley.image} alt={`The cover for ${medley.artist}`} variant='top' /> : null}
//                   <Card.Body>
//                     <Card.Title>{medley.artist}</Card.Title>
//                     <p className='small'>Album: {medley.album_name}</p>
//                     {/* <Card.Text>{book.description}</Card.Text> */}
//                     <Button className='btn-block btn-danger' onClick={() => handleRemoveRecord(medley._Id)}>
//                       Delete this Album!
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               );
//             })}
//           </div>
//         </Container>
//       </>
//     )
// }

// export default TopFour

const TopFour = () => {
    const { data } = useQuery(GET_ME); 
    const userData = data?.me || [];
    console.log(userData)
    return (
    <div>
        {userData.topFour.map((four, i) => {
            if (i <= 3){
                return <AlbumArt image = {four.image} />
            }
        })}
    </div>
  )
}

export default TopFour;
