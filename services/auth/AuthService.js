import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Config from "../../config/Config";
import UserDao from "../../dao/user/UserDao";

const responseObject = (token, res) => {
    return {
        httpCode: 200,
        success: true,
        data: {
            userId: res._id,
            username: res.username,
            first_name: res.first_name,
            last_name: res.last_name,
            email: res.email
        },
        token: token
    }
};

const errorObject = (httpCode, message) => {
    return {
        httpCode: httpCode,
        success: false,
        error: {
            message: message
        }

    }
};

const Login = async (userDao) => {
        const username = userDao.username;
        const password = userDao.password;
        if (username && password) {
            const user = await UserDao.findByUsername(username);
            if (bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({email: user.email, username: user.username},
                    Config.jwt_secret, {expiresIn: '24h'});
                return Promise.resolve(responseObject(token, user));
            }
            return errorObject(403, 'Authentication error, incorrect username or password.');
        }
        return errorObject(403, 'Authentication failed! Please check the request');
    }
;

const SignUp = async (userDao) => {
    const user = {
        username: userDao.username,
        email: userDao.email,
        first_name: userDao.first_name,
        last_name: userDao.last_name,
        password: userDao.password
    };
    const data = await UserDao.createUser(user);
    const token = jwt.sign({email: user.email, username: user.username},
        Config.jwt_secret, {expiresIn: '24h'});
    return responseObject(token, data);
};

export default {
    Login: Login,
    SignUp: SignUp
};