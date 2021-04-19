import React, { Fragment,useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileById } from '../../actions/profile';
import Spinner from '../layout/spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperinece from './profileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({ profile: { profile, loading }, getProfileById, auth ,match}) => {

    useEffect(() => {
        getProfileById(match.params.id);
    },[getProfileById,match.params.id])
    
    return (
        <Fragment>
            {loading || profile === null ? <Spinner /> : <Fragment>
                <Link to='/developers' className='btn btn-light'>
                    Back to Profiles
                </Link>
                {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id
                    && <Link to='/edit-profile' className='btn btn-dark'> Edit profile</Link>}
                <div class="profile-grid my-1">
                    <ProfileTop profile={profile} />
                    <ProfileAbout profile={profile} />
                    <ProfileExperinece profile={profile} />
                    <ProfileEducation profile={profile} />
                    {profile.githubusername && <ProfileGithub username={profile.githubusername} />}
                 </div>
            </Fragment>}
        </Fragment>
    )

}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps,{getProfileById})(Profile);