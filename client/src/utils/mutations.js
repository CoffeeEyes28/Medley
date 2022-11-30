import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;


export const SAVE_RECORD = gql`
  mutation saveRecord($input: SavedRecordInput!) {
    saveRecord(input: $input) {
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
          reactionID
        }
        reacted{
          reactionID
        }
        medleyTotal
        reactionCount
        reactedCount
    }
  }
`;

export const SAVE_TOP = gql`
  mutation saveTop($input: SavedRecordInput!) {
    saveRecord(input: $input){
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
          reactionID
        }
        reacted{
          reactionID
        }
        medleyTotal
        reactionCount
        reactedCount
    }
}
`;

export const REMOVE_RECORD = gql`
mutation removeRecord($_id: ID) {
    removeRecord(_id: $_id) {
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
          reactionID
        }
        reacted{
          reactionID
        }
        medleyTotal
        reactionCount
        reactedCount
    }
  }
`;
export const ADD_REACTION = gql`
mutation addReaction($userId: ID!, $username: String!) {
    addReaction(userId: $userId, username: $username) {
        _id
        reactionId
  }
}
`;

export const REMOVE_REACTION = gql`
mutation removeReaction($reactionId: ID!, $userId: ID!) {
    removeReaction(reactionId: $reactionId, userId: $userId) {
      _id
      reactionId
        
  }
}
`;

export const UPDATE_TOP = gql`
mutation updateTop($input: SaveRecordInput!, $topFourId: String!) {
    updateTop(input: $input, topFourId: $topFourId) {
      _id
      topFourId 
  }
}
`;