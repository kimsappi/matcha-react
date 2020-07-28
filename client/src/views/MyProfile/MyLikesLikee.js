import React, {useEffect, useState} from 'react';

// Databasen 'likes' tableen lisattava id columni, jotta key helpompi saada uniikiksi.
const MyLikesLikee = ({likes, modifyPreview, modifyWho}) => {

    const [likeList, setLikes] = useState(null);
    useEffect(() => {
        const ret = likes.map( (like) =>
        <>
            <button className="btn btn-success" onClick={() => {modifyPreview(like); modifyWho(2);}} style={{width: '80%', marginRight: '50px', marginBottom: '20px'}}>
                <b>{like.likerUsername ? like.likerUsername : like.visitorUsername}</b>
                {like.likerPic}
                
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
        return(
            <>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            {likeList}
            </div>
            </>
            );
    }
}

export default MyLikesLikee;