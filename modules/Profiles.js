const mongooes = require('mongoose');

const profilesSchema = new mongooes.Schema({
    user: {
        type: mongooes.Schema.Types.ObjectId,
        ref:'user'
    },
    company: {
        type: String
    },
    wesite: {
        type: String
    },
    location: {
        type : String
    },
    status: {
        type: String,
        require : true
    },
    skills: {
        type: [String],
        require: true
    },
    bio: {
        type: String
    },
    githusername: {
        type: String
    },
    experience: [{
        title: {
            type: String,
            requitred: true
        },
        company: {
            type: String,
            required: true
        },
        location: {
            type: String
        },
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date
        },
        current: {
            type: Boolean,
            default: false
        },
        description: {
            type: String
        }
    }],
    education: [{
        school: {
            type: String,
            require:true
        },
        degree: {
            type: String,
            require: true
        },
        fieldofstudy: {
            type: String,
            require: true
        },
        from: {
            type: Date,
            require: true
        },
        to: {
            type: Date
        },
        current: {
            type: Boolean,
            default: false
        },
        description: {
            type: String
        }
    }],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Profile = mongooes.model('profile', profilesSchema);