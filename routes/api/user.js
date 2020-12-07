const express=require('express');
const router = express.Router();
const cloudinary = require('../../config/cloudinary');
const upload = require('../../config/multer');
const request = require('request');
const {registerPost, accessService, allServices, bookServices, bookAppointment, allAppointments, picturePost, uploadPicture } = require('../../controller/defaultController');

// @route POST api/user/register
// @description register POST route
// @access public
router.post('/register', registerPost);
router.get("/all-services", allServices);
router.get("/all-appointments", allAppointments);
router.post('/accessService', accessService);
router.post('/bookServices', bookServices);
router.post('/bookAppointment', bookAppointment);

router.route('/picturePost')
.post(upload.single('avatar'), picturePost);

router.route('/uploadPicture')
.post(upload.single('image'), uploadPicture); 

router.get('/picturePost', function(req, res, next) {
    request({
      uri: 'https://pshs3.herokuapp.com/all/enrollments',
    
    }).pipe(res);
    // console.log(res)
  });



module.exports = router;