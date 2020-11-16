const express=require('express');
const router = express.Router();
const {registerPost, accessService, allServices, bookServices, bookAppointment } = require('../../controller/defaultController');

// @route POST api/user/register
// @description register POST route
// @access public
router.post('/register', registerPost);
router.get("/all-services", allServices);
router.post('/accessService', accessService);
router.post('/bookServices', bookServices);
router.post('/bookAppointment', bookAppointment);



module.exports = router;