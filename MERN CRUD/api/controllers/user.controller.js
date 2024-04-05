import User from '../models/user.model.js';

export const signout = async (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json('User has been signed out');
    } catch (error) {
        next(error);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return next(errorHandler(404, 'User not found'));
        }
        const { password, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const seeUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        const resultUser = users.map((user) => {
            const { password, ...rest } = user._doc;
            return rest;
        });
        res.status(200).json(resultUser);
    } catch (error) {
        next(error);
    }
};
