const express = require('express');
const User = require('../../modules/User');
const Profile = require('../../modules/Profiles');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResults, validationResult } = require('express-validator/check');
const { route } = require('./users');

router.get('/me', auth, async (req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json({ profile });

    } catch (err) {
        console.log(err.message);
        res.status(500).send('server Error');
    }
    
});

router.post('/', [auth, [
    check('status', 'status is required').not().isEmpty(),
    check('skills','skills is required').notEmpty()
]], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    const profileFields = {}

    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;

    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    profileFields.social = {}

    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = linkedin;

    try {

        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            profile = await Profile.findOneAndUpdate({ user: req.user.id },
                { $set: profileFields }, { new: true });
            
            return res.json(profile);
        }

        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error');
    }
 
    // res.send('hello');
    
})


router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user',['name','avatar','password']);
        return res.json(profiles);
    } catch (err)
    {
        console.log(err.message);
        return res.status(500).send('server error');
    }
})

router.get('/:user_id', async (req, res) => {
    try {

        const profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar'])
        
        if (!profile) {
            return res.status(400).json({ msg: ' User profile not found' });
        }
        res.send(profile)
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId')
        {
            return res.status(400).json({ msg: 'user profile not found' });
        }
        return res.status(500).send('server error');        
    }
})

router.delete('/', auth, async (req, res) => {
    try {

        await Profile.findOneAndRemove({ user: req.user.id });
        await User.findOneAndRemove({ _id: req.user.is });

        res.send({ msg: 'user delted' });
        
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('server error');
    }
})

router.put('/experience', [auth, [
    check('title', 'title is required').notEmpty(),
    check('company', 'company is required').notEmpty(),
    check('from','from date is required')
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {

        const profile = await Profile.findOne({ user: req.user.id });

        profile.experience.unshift(newExp);

        await profile.save();

        res.json(profile)
        
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('server error');
    }
})

router.delete('/experience/:expid',auth, async (req, res) => {
    try {
        const profile= await Profile.findOne({ user: req.user.id });

        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.expid);

        profile.experience.splice(removeIndex, 1);

        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
    }
})

router.put('/education', [auth, [
    check('school', 'school is require').notEmpty(),
    check('degree', 'degree is required').notEmpty(),
    check('from', 'from is required').notEmpty(),
    check('fieldofstyudy','field of study is required').notEmpty()
]], async (req, res) => {

        const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const education = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    const profile = await Profile.findOne({ user: req.user.id });

    profile.education.unshift(education);
    await profile.save();

    res.json(profile)

})

router.delete('/education/:edu_id', auth, async (req, res) => {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeindex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

    profile.education.splice(removeindex, 1);
    await profile.save();

    res.json(profile);
})


module.exports = router;