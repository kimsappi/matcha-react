import React, {useEffect, useState} from 'react';

import {getThisPage} from '../../modules/httpQueries';
import {Link} from 'react-router-dom';


const ProfileNav = ({state, setState}) => {	

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="navbar-nav">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link" to='/myProfile/profile'>Profile</Link>
                    <Link className="nav-item nav-link" to='/myProfile/likes'>Likes</Link>
                    <Link className="nav-item nav-link" to='/myProfile/visits'>Visits</Link>
                </div>
            </div>
        </nav>
    )
}


export default ProfileNav;