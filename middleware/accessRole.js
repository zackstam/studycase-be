const { defineAbilityFor } = require('../utility/utility');
const { UNAUTHORIZED_USER } = require('../constant/errorMessage');
const { NOT_AUTHENTICATED_CODE } = require('../constant/errorCode');
const { UNAUTHORIZED } = require('../constant/errorHttp');
const HttpError = require('../interface/httpError');
const { User } = require('../interface/user');
const { ObjectId } = require('bson');

const accessValidate = (action, subject) => {
    return (req, res, next) => {
        const authorized = defineAbilityFor(req.user);
        const isAuthorized = authorized.can(action, subject)
        if (!isAuthorized) {
            const error = new HttpError(UNAUTHORIZED_USER, NOT_AUTHENTICATED_CODE, UNAUTHORIZED);
            return next(error);
        }
        return next()
    }
}


module.exports = {
    accessValidate
}