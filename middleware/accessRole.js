const { defineAbilityFor } = require('../utility/utility');
const { UNAUTHORIZED_USER } = require('../constant/errorMessage');
const { NOT_AUTHENTICATED_CODE } = require('../constant/errorCode');
const { UNAUTHORIZED } = require('../constant/errorHttp');
const HttpError = require('../interface/httpError');
const { User, DeliveryAddress } = require('../interface/user');
const { ObjectId } = require('bson');
const deliveryAddressModel = require('../models/deliveryAddressModel');

const accessValidate = (action, subject) => {
    return (req, res, next) => {
        const id = req.params.pid
        const authorized = defineAbilityFor(req.user);
        let isAuthorized
        if (id) {
            const userAccess = new User({ user_id: new ObjectId(id) })
            isAuthorized = authorized.can(action, userAccess)
        } else {
            isAuthorized = authorized.can(action, subject)
        }
        if (!isAuthorized) {
            const error = new HttpError(UNAUTHORIZED_USER, NOT_AUTHENTICATED_CODE, UNAUTHORIZED);
            return next(error);
        }
        return next()
    }
}

const accessValidateUser = (action, subject) => {
    return (req, res, next) => {
        const id = req.params.user_id
        console.log(id);
        const authorized = defineAbilityFor(req.user);
        let isAuthorized
        if (id) {
            const userAccess = new User({ user_id: new ObjectId(id) })
            isAuthorized = authorized.can(action, userAccess)
        } else {
            isAuthorized = authorized.can(action, subject)
        }
        if (!isAuthorized) {
            const error = new HttpError(UNAUTHORIZED_USER, NOT_AUTHENTICATED_CODE, UNAUTHORIZED);
            return next(error);
        }
        return next()
    }
}

const accessValidateDelivery = (action, subject) => {
    return (req, res, next) => {
        const id = req.params.user_id
        console.log(id);
        const authorized = defineAbilityFor(req.user);
        let isAuthorized
        if (id) {
            const userAccess = new DeliveryAddress({ user_id: new ObjectId(id) })
            isAuthorized = authorized.can(action, userAccess)
        } else {
            isAuthorized = authorized.can(action, subject)
        }
        if (!isAuthorized) {
            const error = new HttpError(UNAUTHORIZED_USER, NOT_AUTHENTICATED_CODE, UNAUTHORIZED);
            return next(error);
        }
        return next()
    }
}




module.exports = {
    accessValidate,
    accessValidateUser,
    accessValidateDelivery
}