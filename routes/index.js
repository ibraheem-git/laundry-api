const express = require('express');
const router = express.Router();
const planRoute = require('./plan')
const subRoute = require('./subscription')

const {
    signUp,
    getAllUsers,
    getOne,
    updateUser,
    deleteUser
} = require('../controller');
const { deleteOne } = require('../models/user');
const subscription = require('./subscription');

router.post('/signup', signUp);
router.get('/users', getAllUsers);
router.get('/user', getOne);
router.put('/:user_id', updateUser);
router.delete('/:user_id', deleteUser)

planRoute(router);
subRoute(router);

module.exports = router;