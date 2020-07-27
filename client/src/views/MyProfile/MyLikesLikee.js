import React, {useEffect, useState} from 'react';

// Databasen 'likes' tableen lisattava id columni, jotta key helpompi saada uniikiksi.
const MyLikesLikee = ({likes}) => {

    const [likeList, setLikes] = useState(null);
    useEffect(() => {
        const ret = likes.map( (like) =>
                <div key={like.likerUsername} style={{border: '1px solid gray', padding: '10px', margin: '5px'}}>
                    Pieni profiilikuva{like.likerPic} <b>{like.likerUsername}</b>
                </div>
        );
        setLikes(ret);
    }, []);




    if (!likeList)
    {
        return(<h1>Loading</h1>);
    }
    else
    {
        return(likeList);
    }
}

export default MyLikesLikee;