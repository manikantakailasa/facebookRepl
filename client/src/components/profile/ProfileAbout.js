import React from 'react';

const ProfileAbout = ({ profile: { bio, user: { name }, skills } }) => {

    return (
        <div class="profile-about bg-light p-2">
          <h2 class="text-primary">{name.trim().split(' ').map(name => name)[0]} Bio</h2>
          <p>
            {bio !== null ? bio : ""}
          </p>
          <div class="line"></div>
          <h2 class="text-primary">Skill Set</h2>
            <div class="skills">
                {skills.map((skill,index) => <div key={index} class="p-1"><i class="fa fa-check"></i> {skill}</div>)}
          </div>
        </div>
    )

}

export default ProfileAbout;