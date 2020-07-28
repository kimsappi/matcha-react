import React, {useEffect, useState} from 'react';

// Databasen 'likes' tableen lisattava id columni, jotta key helpompi saada uniikiksi.
const MyLikesLikes = ({likes, modifyPreview, modifyWho}) => {

    const [likeList, setLikes] = useState(null);
    useEffect(() => {
        const ret = likes.map( (like) =>
        <>
            <button className="btn btn-success" onClick={() => {modifyPreview(like); modifyWho(1);}} style={{width: '80%', marginRight: '50px', marginBottom: '20px'}}>
                <b>{like.likeeUsername ? like.likeeUsername : like.visiteeUsername}</b>
                {like.likeePic}
                
            </button>
            <br />
        </>
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

export default MyLikesLikes;