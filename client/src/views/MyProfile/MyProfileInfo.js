import React, {useState} from 'react';
import {Button} from 'react-bootstrap';

import InputWithLabel from '../../components/InputWithLabel';
import RadioWithLabel from '../../components/RadioWithLabel';
import TagsInput from './TagsInput';
import MyProfileMap from './MyProfileMap';

import {sendMyProfileData} from '../../modules/httpQueries';

const MyProfileInfo = ({profile, rerenderTrick, setRerenderTrick}) => {	
    const [firstName, setFirstName] = useState(profile.userData.first_name);
    const [lastName, setLastName] = useState(profile.userData.last_name);
    const [age, setAge] = useState(profile.userData.age);
    const [latitude, setLatitude] = useState(profile.userData.latitude);
    const [longitude, setLongitude] = useState(profile.userData.longitude);
    const [email, setEmail] = useState(profile.userData.email);
    const [gender, setGender] = useState(profile.userData.gender);
    const [target, setTarget] = useState(profile.userData.target_genders);
    const [biography, setBiography] = useState(profile.userData.biography);
    const [tags, setTags] = useState(profile.tags);

    return (
        <form id='myProfileForm' onSubmit={(event) => sendMyProfileData(event, firstName, lastName, age, latitude, longitude, email, gender, target, biography, tags, rerenderTrick, setRerenderTrick)}>
        <br />
        <TagsInput tags={tags} setTags={setTags} />
        <div> </div> 
        <div />
        <InputWithLabel
            type='text'
            name='firstName'
            label='First name'
            state={firstName}
            setState={setFirstName}
            pattern="[\p{L}\-]{2,32}"
            required={true}
        />
        <InputWithLabel
            type='text'
            name='lastName'
            label='Last name'
            state={lastName}
            setState={setLastName}
            pattern="[\p{L}\-]{2,32}"
            required={true}
        />
        <InputWithLabel
            type='email'
            name='email'
            label='Email'
            state={email}
            setState={setEmail}
            required={true}
        />
        <InputWithLabel
            type='number'
            name='age'
            label='Age'
            state={age}
            setState={setAge}
            step='1'
            integer={true}
            required={true}
        />
        <div>Location</div>
        <MyProfileMap
            lat={latitude} lon={longitude}
            setLat={setLatitude} setLon={setLongitude}
        />
        <div>Gender</div>
        <RadioWithLabel
            name='gender'
            state={gender}
            setState={setGender}
            options={[
                {label: 'Man', value: 'm'},
                {label: 'Woman', value: 'f'}
            ]}
            required={true}
        />  <br />
        <div>Looking for</div>
        <RadioWithLabel
            name='target'
            state={target}
            setState={setTarget}
            options={[
                {label: 'Men', value: 'm'},
                {label: 'Both', value: 'fm', checked: (target, value) => target.length === 2},
                {label: 'Women', value: 'f'}
            ]}
            required={true}
        /> <br />
        <InputWithLabel
            type='textarea'
            name='biography'
            label='Biography'
            state={biography}
            setState={setBiography}
            required={true}
        /> <br />

        <input className='button' type='submit' name='submit' value='OK' />
        {rerenderTrick ? ' ' : ''}
        </form>
        );
}

export default MyProfileInfo;
