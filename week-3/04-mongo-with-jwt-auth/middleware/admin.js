const { Admin } = require('../db');

async function adminMiddleware(req, res, next) {
    const username = req.headers.username
    const password = req.headers.password;
    console.log(username, password);

    const adminExists = await Admin.findOne({
        username: username,
        password: password
    });

    console.log(adminExists)

    if(adminExists) {
        next();
    } else {
        return res.status(404).json({
            message: 'Admin not found!'
        });
    }
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
}

module.exports = adminMiddleware;