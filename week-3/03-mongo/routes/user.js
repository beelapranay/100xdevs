const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = await User.findOne({
        username: username
    });

    if(userExists) {
        return res.status(403).json({
            'msg': 'User already exists!'
        });
    }

    const user = new User({
        username: username,
        password: password
    });

    await user.save();
    return res.status(200).json({
        'msg': 'user has been created!'
    });
});

router.get('/courses', async (req, res) => {
    const courses = await Course.find();

    return res.status(200).json({
        'courses': courses
    });
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const username = req.headers.username;
    const password = req.headers.password;
    const courseId = req.params.courseId;

    try {
        await User.updateOne({
            username: username,
            password: password
        }, {
            "$push": {
                purchasedCourses: courseId,
            }
        })
    } catch(e) {
        console.log(e);
    }

    return res.status(200).json({
        message: "Purchase complete!"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const username = req.headers.username;

    const user = User.findOne({
        username: username
    });

    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });

    res.json({
        'courses': courses
    });
});

module.exports = router