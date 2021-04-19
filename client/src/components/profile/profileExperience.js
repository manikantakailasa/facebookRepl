import React from 'react';
import Moment from 'react-moment';

const ProfileExperience = ({profile : {experience}}) => {
    return (
         <div class="profile-exp bg-white p-2">
            <h2 class="text-primary">Experience</h2>
            {experience>0 ? experience.map(exp => (
                <div key={exp._id}>
            <h3 class="text-dark">{exp.company}</h3>
                    <p><Moment format='LL'>{exp.from}</Moment> - {exp.to !== null ?
                        <Moment format='LL'>{exp.from}</Moment> : "Current"}</p>
            <p><strong>Position: </strong>{exp.title}</p>
            <p>
                        <strong>Description: </strong>{exp.description && <span>{ exp.description }</span>}
            </p>
          </div>
            )): <h4>No experience details found</h4>}
        </div>
    )
}

export default ProfileExperience;