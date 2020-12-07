require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const logger = require('morgan');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const DB = require('./config/db').MONGO_URI;
const port = process.env.PORT || 4000;


// connect to db 
mongoose.connect(DB, {useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true})
.then(()=>{
  console.log(`DB CONNECTED SUCCESSFULLY`)
})
.catch((err)=>{
  console.log(err)
});

// bodyParser middleware
app.use(logger(process.env.SERVICE_INDEX));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// route grouping
const user = require('./routes/api/user');
app.use('/api/user', user);

//Picture storage
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//       cb(null, 'uploads/');
//   },

//   filename: function(req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// app.post('/upload-profile-pic', (req, res) => {
//   // 'profile_pic' is the name of our file input field in the HTML form
//   let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('profile_pic');

//   upload(req, res, function(err) {
//       // req.file contains information of uploaded file
//       // req.body contains information of text fields, if there were any

//       if (req.fileValidationError) {
//           return res.send(req.fileValidationError);
//       }
//       else if (!req.file) {
//           return res.send('Please select an image to upload');
//       }
//       else if (err instanceof multer.MulterError) {
//           return res.send(err);
//       }
//       else if (err) {
//           return res.send(err);
//       }

//       // Display uploaded image for user validation
//       res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
//   });
// });

// Passport upload
app.use('/uploadPicture', express.static(path.join(__dirname, 'uploads')));
  





app.listen(port, () => {
  console.log(`server started at port ${port}`)
});


//////////DB =  mongodb://localhost/Debeyo
//DB =mongodb+srv://Debeyo:DebeyoShemB1988@cluster0.iy8mn.mongodb.net/<dbname>?retryWrites=true&w=majority