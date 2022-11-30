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

export const GET_USER = gql`
query user($userId: ID!) {
  user(userId: $userId) {
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

export const GET_All_USERS = gql`
query users {
    users {
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




