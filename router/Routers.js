const router = require('express').Router();
const {users, deleteUser, updateUser, findUserById} = require('../controller/UserController');
const {login, register} = require('../controller/AuthUserController');
const {loggedIn} = require('../middleware/jwt_auth_middleware');



router.get('/users', loggedIn, users);
router.get('/users/:id', loggedIn, findUserById);
router.delete('/users/:id', loggedIn, deleteUser);
router.put('/users/:id', loggedIn, updateUser);



//Auth route
router.post('/auth/register',  register);
router.post('/auth/users', login);

module.exports = router;