const pool = require("../config");

module.exports.showDashboard = async (req, res) => {
    var user;
    try {
        user = await pool.query(
            'SELECT user_name FROM users WHERE user_id=$1',
            [req.user]);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json("Server Error");
    }

    if(!user) {
        return res.status(500).json("User not found");
    }

    return res.json(user.rows[0]);
}