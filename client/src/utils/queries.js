import { gql } from '@apollo/client';

export const GET_ME = gql`
query me {
    me {
      _id
      username
      email
      medley{
        _id
        artist
        album_name
        image
      }
      topFour{
        _id
        artist
        album_name
        image
      }
      reactions{
        reactionId
      }
      reacted{
        reactionId
      }
      medleyTotal
      reactionCount
      reactedCount
    }
  }
`;