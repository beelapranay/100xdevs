const { User } = require("../db");

async function userMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;

    const user = await User.findOne({
        username: username,
        password: password
    });

    if(user) {
        next();
    } else {
        res.status(400).json({
            'msg': 'User not found!'
        });
    }
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
}

module.exports = userMiddleware;