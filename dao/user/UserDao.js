import User from "../../models/User";

const createUser = async (user) => {
    return User.create(user)
};

const findByUsername = async(username) => {
    return User.findOne({username: username}).exec();
};

export default {
    createUser: createUser,
    findByUsername: findByUsername
}