const { User } = require('../db');

async function userMiddleware(req, res, next) {
    const username = req.headers.username
    const password = req.headers.password;

    const userExists = await User.findOne({
        username: username,
        password: password
    });

    if(userExists) {
        next();
    } else {
        return res.status(404).json({
            message: 'User not found!'
        });
    }
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
}

module.exports = userMiddleware;