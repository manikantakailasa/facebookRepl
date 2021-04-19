import React from 'react';
import Moment from 'react-moment';

const ProfileEducation = ({profile : {education}}) => {
    return (
         <div class="profile-edu bg-white p-2">
          <h2 class="text-primary">Education</h2>
            {education>0 ? education.map(edu => (
                 <div key={edu._id}>
                    <h3>{ edu.school}</h3>
                    <p><Moment format='LL'>{edu.from}</Moment> - {edu.to !== null ?
                        <Moment format='LL'>{edu.from}</Moment> : "Current"}</p>
                    <p><strong>Degree: </strong>{edu.degree}</p>
                    <p><strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
                    <p>
                        <strong>Description: </strong>{edu.description && <span>{edu.description}</span>}
                    </p>
                </div>
            )):  <h4>No education details found</h4>}
        </div>
    )
}

export default ProfileEducation;