const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;

    console.log(username, password);

    const admin = await Admin.findOne({
        username: username,
        password: password
    });

    console.log(admin);

    if(admin) {
        next();
    } else {
        return res.status(403).json({
            'msg': 'Admin not found!'
        });
    }
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
}

module.exports = adminMiddleware;