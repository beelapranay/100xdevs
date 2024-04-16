const { Router } = require("express");
const { Admin,Course } = require('../db');
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt = require('jsonwebtoken');
const jwtsecret = '123456';

// Admin Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const admin = new Admin({
        username: username,
        password: password
    });

    await admin.save();
    res.status(200).json({
        message: 'Admin has been created!'
    });
});

router.post('/signin', async (req, res) => {
    const username = req.body.username
    const password = req.body.password;

    const adminExists = await Admin.findOne({
        username: username,
        password: password
    });

    if(adminExists) {
        const token = jwt.sign({username}, jwtsecret);

        return res.status(200).json({
            'token': token
        });
    } else {
        return res.status(404).json({
            message: 'Admin not found!'
        });
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    const token = req.headers.authorization;
    const tokenWithoutBearer = token.split(" ")[1];

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;

    try {
        const adminVerified = jwt.verify(tokenWithoutBearer, jwtsecret);
        if(adminVerified) {
            const course = new Course({
                title: title,
                description: description,
                price: price
            });

            await course.save();
            return res.status(200).json({
                message: 'the course has been created!'
            });
        }
    } catch (e) {
        return res.status(403).json({
            error: 'there seems to be some error!'
        });
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    const token = req.headers.authorization;
    const tokenWithoutBearer = token.split(" ")[1];

    try {
        const adminVerified = jwt.verify(tokenWithoutBearer, jwtsecret);
        if(adminVerified) {
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

module.exports = router;