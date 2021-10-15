const pool = require("../config");
const bcrypt = require('bcrypt');;
const { jwtGenerator } = require("../utils/jwtGenerator");
const { validateCustomerLogin, validateCustomerRegister } = require('../schemas/users');

module.exports.createUser = async (req, res) => {
    const {error} = validateCustomerRegister(req.body);
    if(error) {
        var e="";
        error.details.forEach(element => {
            e = e + " " + element.message;
        });

        return res.status(400).json(e);
    }
    
    const { name, email, password } = req.body;
    var existingUser;
    try {
        existingUser = await pool.query(
            'SELECT * FROM users WHERE user_email=$1',
            [email]
        );
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }

    if (existingUser.rows.length !== 0) {
        return res.status(401).json("User already exists");
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);

    var newUser;
    try {
        newUser = await pool.query(
            'INSERT INTO users(user_name, user_email, user_password) VALUES($1, $2, $3) RETURNING *',
            [name, email, bcryptPassword]
        );

        const token = jwtGenerator(newUser.rows[0].user_id);
        return res.json({ token });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
}


module.exports.login = async (req, res) => {
    const {error} = validateCustomerLogin(req.body);
    if(error) {
        var e="";
        error.details.forEach(element => {
            e = e + " " + element.message;
        });

        return res.status(400).send(e);
    }
    
    const { email, password } = req.body;
    var existingUser;
    try {
        existingUser = await pool.query(
            'SELECT * FROM users WHERE user_email=$1',
            [email]
        );
    } catch (err) {
        return res.status(500).send("Server Error");
    }

    if (existingUser.rows.length === 0) {
        return res.status(401).json("User doesn't exist, please signup!");
    }

    const validPassword = await bcrypt.compare(password, existingUser.rows[0].user_password);
    if (validPassword) {
        token = jwtGenerator(existingUser.rows[0].user_id);
        return res.json({ token });
    } else {
        return res.status(401).json("Incorrect Password!!");
    }
}



module.exports.isVerify = (req, res) => {
    try {
        return res.json(true);
    } catch(err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}
