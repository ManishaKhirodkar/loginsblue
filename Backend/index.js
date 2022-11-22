const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/User');
const Products = require('./db/Products');
const Jwt = require('jsonwebtoken')
const jwtKey = 'e-comm';
const app = express();


app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            resp.send({ result: 'somthing went wrong, Please try after sometime ' })
        }
        resp.send({ result, auth: token })
    })
})

app.post("/login", async (req, resp) => {
    console.log(req.body)
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select('-password');
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    resp.send({ result: 'somthing went wrong, Please try after sometime ' })
                }
                resp.send({ user, auth: token })
            })

        } else {
            resp.send({ result: 'no user found' })
        }
    } else {
        resp.send({ result: 'no user found' })
    }


})

function verifyToken(req, resp, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split('');
        console.warn("middleware called if", token)
    } else {

    }
    console.warn("middleware called", token)
    next();
}
app.listen(5000);