// Code snippet for global Album Art Component

export default function Delete(props){

    function faveMusic(){
        console.log(props.taco)
    }
    
    return (
        <div>
            <h1>{props.taco}</h1>
            <img src={props.cat} onClick={faveMusic}></img>
        </div>
    )
    }
// placeholder
