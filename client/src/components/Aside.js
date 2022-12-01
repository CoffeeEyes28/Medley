import React from "react";
import { useState } from "react";
import { useQuery } from '@apollo/client';
import { GET_All_USERS } from '../utils/queries';







const Aside = () => {

    const { data } = useQuery(GET_All_USERS) 

    return (
        <div>
            <h1>Render</h1>
            
        </div>
    )
}

export default Aside;