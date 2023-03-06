const {getUser, updateUser} = require("../controllers/users");
const router = require('express').Router();


router.get('/users/me', getUser)
router.patch('/users/me', updateUser)
module.exports = router;


