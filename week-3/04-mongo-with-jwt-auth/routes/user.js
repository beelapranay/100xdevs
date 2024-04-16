const { Router } = require("express");
const { User, Course} = require('../db');
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require('jsonwebtoken');
const jwtsecret = '1234567';

// User Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = new User({
        username: username,
        password: password
    });

    await user.save();
    res.status(200).json({
        message: 'User has been created!'
    });
});

router.post('/signin', async (req, res) => {
    const username = req.headers.username
    const password = req.headers.password;

    const userExists = await User.findOne({
        username: username,
        password: password
    });

    if(userExists) {
        const token = jwt.sign({username}, jwtsecret);

        return res.status(200).json({
            'token': token
        });
    } else {
        return res.status(404).json({
            message: 'User not found!'
        });
    }
});

router.get('/courses', async (req, res) => {
    const token = req.headers.authorization;
    const tokenWithoutBearer = token.split(" ")[1];

    try {
        const userVerified = jwt.verify(tokenWithoutBearer, jwtsecret);
        if(userVerified) {
            const coursesAll = await Course.find({});

            res.status(200).json({
                courses: coursesAll
            });
        }
    } catch (e) {
        res.status(403).json({
            error: 'there seems to be some error!'
        });
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const token = req.headers.authorization;
    const tokenWithoutBearer = token.split(" ")[1];

    const username = req.body.username;
    const password = req.body.password;
    const courseId = req.params.courseId;

    try {
        const userVerified = jwt.verify(tokenWithoutBearer, jwtsecret);
        if(userVerified) {
            await User.updateOne({
                username: username,
                password: password
            }, {
                "$push": {
                    'purchasedCourses': courseId
                }
            }
        );

            res.status(200).json({
                message: 'course has been purchased!'
            });
        }
    } catch (e) {
        res.status(403).json({
            error: 'there seems to be some error!'
        });
    }
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {

});

module.exports = router