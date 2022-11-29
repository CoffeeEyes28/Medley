import React from 'react';









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
            </div>

        ))}


</div>
       
    )
}

export default Results;






