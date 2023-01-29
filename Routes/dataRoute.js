const dataController = require('../Controllers/pageController.js');
const userService = require("../Services/userService.js");

const router = require("express").Router()

router.get('/', dataController.Index);

router.get('/admin', dataController.Login);

// router.post('/a_login', dataController.A_Login); 

router.get('/admin_side', dataController.Admin_Side);

router.get('/registration', dataController.Registration);

router.post('/r_data', dataController.createNewAdmin);


module.exports = router;