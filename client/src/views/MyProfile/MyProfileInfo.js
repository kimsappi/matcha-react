import React, {useEffect, useState} from 'react';

const MyProfileInfo = ({profile}) => {	

    return (
        <>
        Printed from MyProfileInfo-component:
        <h6>First name: {profile.userData.first_name}</h6>
        <h6>Last name: {profile.userData.last_name}</h6>
        <h6>Gender: {profile.userData.gender}</h6>
        </>
        );
}

export default MyProfileInfo;