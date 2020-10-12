const express =require('express');
//const auth = require('../middleware/authentication')
const router=express.Router();

const userRoutes = require('../controller/usercontroller');



router.get('/',    userRoutes.home);
router.post('/submit', userRoutes.signup);


module.exports = router;

