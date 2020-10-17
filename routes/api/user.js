const express=require('express');
const router = express.Router();
const {registerPost, accessService, allServices } = require('../../controller/defaultController');

// @route POST api/user/register
// @description register POST route
// @access public
router.post('/register', registerPost);
router.get("/all-services", allServices);
router.post('/accessService', accessService);



module.exports = router;