import React from 'react';

import Icon from '@mui/material/Icon'
import Button from '@mui/material/Button';







const Results = (props) => {



console.log(props.props)

const data = props.props

    return (
        <div>
        {data.map((artist) => (

            <div>
                <h1>{artist.artist}</h1>
                <h2>{artist.album_name}</h2>
                <img src={artist.image["#text"]} alt={artist.album_name}/>
                <br></br>
                <Button><Icon>add_circle</Icon></Button>
            </div>

        ))}


</div>
       
    )
}

export default Results;






