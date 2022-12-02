import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {useMutation, useQuery } from '@apollo/client';
import { GET_ME, GET_USER } from '../utils/queries';
import Auth from '../utils/auth';
import { ADD_REACTION, REMOVE_REACTION } from '../utils/mutations';
import Button from '@mui/material/Button'








const Reaction = ({allowDelete, userData}) => {
const {username} = useParams();






    return (
        <div>
{!allowDelete && (<Button>Add Remove</Button>)}

<br></br>
<div>
    <h2 style={{ m:4, fontSize: '50'}}>{userData.reactedCount}</h2>
    <br></br>
    <h2>{userData.reactionCount}</h2>
</div>
        </div>
    )
}


export default Reaction;