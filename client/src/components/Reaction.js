import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {useMutation, useQuery } from '@apollo/client';
import { GET_ME, GET_USER } from '../utils/queries';
import Auth from '../utils/auth';
import { ADD_REACTION, REMOVE_REACTION } from '../utils/mutations';
import Button from '@mui/material/Button'

import IconButton from '@mui/material/IconButton';

import Icon from '@mui/material/Icon'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';





const Reaction = ({allowDelete, userData}) => {
  


const [addReaction]= useMutation(ADD_REACTION);
const [removeReaction]= useMutation(REMOVE_REACTION);

const [reactionCount, setReactionCount] = useState(userData.reactionCount)

const [reactMatch, setReactMatch] = useState(false);

const {loading, data} = useQuery(GET_ME);

const selfData = data?.me || {};



const reaction = async (userId, username) => {

const token = Auth.loggedIn() ? Auth.getToken() : null

if(!token){
    return false;
}
console.log(userId, " ", username)


try {
    await addReaction({
        variables: {userId: userId, username: username}
    })
    setReactionCount(userData.reactionCount)
} catch (err){
    console.error(err);
}





}

if(loading){
    return 
    <h2>Loading..</h2>
}


const checkUser = userData.reactions.map((id)=> id._id)
const checkSelf  = selfData.reacted.map((id)=> id._id)

const checkA = new Set(checkUser.map(({id}) => id));

const result = checkSelf.map(({ id }) => ({id, isavailable: checkA.has(id)}))

const reacted = result.map((answer) => answer.isavailable)


    return (
        <div>
            { reacted[0]
     ?   <IconButton ><FavoriteIcon/></IconButton> : <IconButton onClick={() => reaction(userData._id, selfData.username)}><FavoriteBorderIcon /></IconButton>}

<br></br>
<div>
    <h2 style={{ fontSize: '50'}}>{reactionCount}</h2>
    <br></br>

</div>
        </div>
    )
}


export default Reaction;