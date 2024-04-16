const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { User, Course, Admin } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const adminExists = await Admin.findOne({
        username: username,
        password: password
    });

    if(adminExists) {
        return res.status(403).json({
            'msg': 'User already exists!'
        });
    }
    
    const admin = new Admin({
        username: username,
        password: password
    });
    await admin.save();
    return res.status(200).json({
        'msg': 'Admin has been created!'
    });
});

router.post('/courses', adminMiddleware, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    const courseExists = await Course.findOne({
        title: title
    });

    if(courseExists) {
        return res.status(403).json({
            'msg': 'A course with the same title already exists!'
        });
    }

    const course = new Course({
        title: title,
        description: description,
        price: price,
        imageLink: imageLink
    })

    await course.save();
    return res.status(200).json({
        'msg': 'Course has been saved successfully!',
        'courseId': course._id
    });
});

router.get('/courses', adminMiddleware, async (req, res) => {
    const courses = await Course.find();

    if(courses.length < 1) {
        return res.status(404).json({
            'msg': 'No courses have been added yet!'
        });
    }

    return res.status(200).json({
        'courses': courses
    });
});

module.exports = router;