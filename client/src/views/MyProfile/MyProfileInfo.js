import React, {useEffect, useState} from 'react';

import InputWithLabel from '../../components/InputWithLabel';
import RadioWithLabel from '../../components/RadioWithLabel';

const MyProfileInfo = ({profile}) => {	
    const [firstName, setFirstName] = useState(profile.userData.first_name);
    const [lastName, setLastName] = useState(profile.userData.last_name);
    const [age, setAge] = useState(profile.userData.age);
    const [latitude, setLatitude] = useState(profile.userData.latitude);
    const [longitude, setLongitude] = useState(profile.userData.longitude);
    const [email, setEmail] = useState(profile.userData.email);
    const [gender, setGender] = useState(profile.userData.gender);
    const [target, setTarget] = useState(profile.userData.target_genders);

    return (
        <>
        Printed from MyProfileInfo-component:
        <InputWithLabel
            type='text'
            name='firstName'
            label='First name'
            state={firstName}
            setState={setFirstName}
        />
        <InputWithLabel
            type='text'
            name='lastName'
            label='Last name'
            state={lastName}
            setState={setLastName}
        />
        <InputWithLabel
            type='email'
            name='email'
            label='Email'
            state={email}
            setState={setEmail}
        />
        <InputWithLabel
            type='number'
            name='age'
            label='Age'
            state={age}
            setState={setAge}
        />
        <InputWithLabel
            type='number'
            name='latitude'
            label='Latitude'
            state={latitude}
            setState={setLatitude}
        />
        <InputWithLabel
            type='number'
            name='longitude'
            label='Longitude'
            state={longitude}
            setState={setLongitude}
        />
        <div>I am a...</div>
        <RadioWithLabel
            name='gender'
            state={gender}
            setState={setGender}
            options={[
                {label: 'Man', value: 'm'},
                {label: 'Woman', value: 'f'}
            ]}
        />
        <div>Looking for...</div>
        <RadioWithLabel
            name='target'
            state={target}
            setState={setTarget}
            options={[
                {label: 'Men', value: 'm'},
                {label: 'Both', value: 'fm', checked: (target, value) => target.length === 2},
                {label: 'Women', value: 'f'}
            ]}
        />
        </>
        );
}

export default MyProfileInfo;