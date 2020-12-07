const mongoose = require('mongoose');
const express = require('express');
const User = require('../models/user');
// const { v4: uuidv4 } = require('uuid')
const randomString = require('randomstring');
const EncounterCode = require('../models/encounterCode');
const Reason = require('../models/bookAppointment');
const BookserviceCode = require('../models/bookService');
const RateService = require('../models/rateService');
const { User1 } = require('../models/user1');
const cloudinary = require('../config/cloudinary');
const upload = require('../config/multer');
const request = require('request');
const fs = require('fs');
const multer = require('multer');

module.exports = {
    registerPost: async (req, res, err) => {
        const { name, email, phoneNumber } = req.body
        const userID = randomString.generate({
            length: 5,
            charset: 'numeric'
        })
        // console.log(req.body)
        User.findOne({ phoneNumber: req.body.phoneNumber }).then((user) => {
            if (user) {
                return res.status(400).json({ phoneNumber: "phone number already registered" })
            } else {

                newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    userID
                })
                newUser
                    .save()
                    .then(user => { res.json(user) })
                    .catch(err => { console.log(err) })
            }
        })
    },
    
    accessService: async (req, res, next) => {
        const userID = req.body.userID;
        console.log(userID)
        await User.findOne({ userID: userID })
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: 'User not found',
                        data: null
                    })
                }

                const encounterCode = randomString.generate({
                    length: 4,
                    charset: 'numeric'
                });

                const d1 = Number(new Date());
                const d2 = 1000 * 60 * 60 * 24 * 14;

                let expire = d1 + d2;
                console.log(expire)
                newEncounter = new EncounterCode({
                    encounterCode: encounterCode,
                    expirationDate: expire
                })


                newEncounter.save()
                    .then(encounter => {
                        res.json({
                            success: true,
                            message: 'This is your encounter code!!!!!',
                            data: encounter
                        })
                    })
                    .catch(err => {
                        res.json({
                            success: false,
                            message: 'Internal Server error!!!!',
                            data: err
                        })
                    })
            })
            .catch((err) => {
                res.json({
                    status: 500 || "INTERNAL SERVER ERROR",
                    message: "Try again",
                    data: err
                })
                //     res.send(err)
                //     // next(err);
            })
    },

    bookAppointment: async (req, res, next) => {
        const userID = req.body.userID;
        console.log(userID)
        await User.findOne({ userID: userID })
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: 'User not found',
                        data: null
                    })
                }
                newReason = new Reason({
                    reason: req.body.reason,
                    userID
                })

                newReason.save()
                    .then(encounter => {
                        res.json({
                            success: true,
                            message: 'Your reason to see the doctor has been saved successfully!!!!!',
                            data: encounter
                        })
                    })
                    .catch(err => {
                        res.json({
                            success: false,
                            message: 'Internal Server error!!!!',
                            data: err
                        })
                    })
            })
            .catch((err) => {
                res.json({
                    status: 500 || "INTERNAL SERVER ERROR",
                    message: "Try again",
                    data: err
                })
                //     res.send(err)
                //     // next(err);
            })

    },

    allServices: (req, res) => {
        User.find({}, (err, data) => {
            if (!data) {
                res.json({
                    status: 404,
                    err
                })
            } else {
                res.json({
                    status: 200,
                    data
                })
            }
        });
    },
    allAppointments: (req, res) => {
        User.find({ bookAppointment }, (err, data) => {
            if (!data) {
                res.json({
                    status: 404,
                    err
                })
            } else {
                res.json({
                    status: 200,
                    data
                })
            }
        });
    },

    bookServices: async (req, res, err) => {
        const doctor = 1234;
        const lab = 5678;
        const pharmacy = 2468;

        let value = req.body.value;
        let encounter = req.body.encounter
        if (value == 1) {
            await EncounterCode.findOne({ encounterCode: encounter })
                .then(encount => {
                    if (!encount) {
                        return res.json({
                            success: false,
                            message: "encounter code does not exist",
                            data: null
                        })
                    }
                    console.log(encount)
                    let v1 = encount.encounterCode;

                    const servicecode = `${v1}:[${doctor}]`

                    const newserviceCode = new BookserviceCode({
                        bookserviceCode: servicecode
                    });


                    newserviceCode.save()
                        .then(bookservice => {
                            res.json({
                                success: true,
                                message: 'Service code created successfully',
                                data: bookservice
                            })
                            return servicecode
                        })
                        .catch(err => res.json({
                            success: false,
                            message: 'Unable to create service code',
                            data: null
                        }))

                })
        } else if (value == 2) {
            await EncounterCode.findOne({ encounterCode: encounter })
                .then(encount => {
                    if (!encount) {
                        return res.json({
                            success: false,
                            message: "encounter code does note exist",
                            data: null
                        })
                    }
                    console.log(encount)
                    let v1 = encount.encounterCode;

                    const servicecode = `${v1}:[${lab}]`

                    const newserviceCode = new BookserviceCode({
                        bookserviceCode: servicecode
                    })

                    newserviceCode.save()
                        .then(bookservice => {
                            res.json({
                                success: true,
                                message: 'Service code created successfully',
                                data: bookservice
                            })
                            return servicecode
                        })
                        .catch(err => res.json({
                            success: false,
                            message: 'Unable to create service code',
                            data: null
                        }))

                })
        } else if (value == 3) {
            await EncounterCode.findOne({ encounterCode: encounter })
                .then(encount => {
                    if (!encount) {
                        return res.json({
                            success: false,
                            message: "encounter code does note exist",
                            data: null
                        })
                    }
                    console.log(encount)
                    let v1 = encount.encounterCode;

                    const servicecode = `${v1}:[${pharmacy}]`

                    const newserviceCode = new BookserviceCode({
                        bookserviceCode: servicecode
                    })

                    newserviceCode.save()
                        .then(bookservice => {
                            res.json({
                                success: true,
                                message: 'Service code created successfully',
                                data: bookservice
                            })
                            return servicecode
                        })
                        .catch(err => res.json({
                            success: false,
                            message: 'Unable to create service code',
                            data: null
                        }))

                })
        }
        else if (value == 12) {
            await EncounterCode.findOne({ encounterCode: encounter })
                .then(encount => {
                    if (!encount) {
                        return res.json({
                            success: false,
                            message: "encounter code does note exist",
                            data: null
                        })
                    }
                    console.log(encount)
                    let v1 = encount.encounterCode;

                    const servicecode = `${v1}:[${doctor}, ${lab}]`

                    const newserviceCode = new BookserviceCode({
                        bookserviceCode: servicecode
                    })

                    newserviceCode.save()
                        .then(bookservice => {
                            res.json({
                                success: true,
                                message: 'Service code created successfully',
                                data: bookservice
                            })
                            return servicecode
                        })
                        .catch(err => res.json({
                            success: false,
                            message: 'Unable to create service code',
                            data: null
                        }))

                })
        } else if (value == 13) {
            await EncounterCode.findOne({ encounterCode: encounter })
                .then(encount => {
                    if (!encount) {
                        return res.json({
                            success: false,
                            message: "encounter code does note exist",
                            data: null
                        })
                    }
                    console.log(encount)
                    let v1 = encount.encounterCode;

                    const servicecode = `${v1}:[${doctor}, ${pharmacy}]`

                    const newserviceCode = new BookserviceCode({
                        bookserviceCode: servicecode
                    })

                    newserviceCode.save()
                        .then(bookservice => {
                            res.json({
                                success: true,
                                message: 'Service code created successfully',
                                data: bookservice
                            })
                            return servicecode
                        })
                        .catch(err => res.json({
                            success: false,
                            message: 'Unable to create service code',
                            data: null
                        }))

                })
        } else if (value == 23) {
            await EncounterCode.findOne({ encounterCode: encounter })
                .then(encount => {
                    if (!encount) {
                        return res.json({
                            success: false,
                            message: "encounter code does note exist",
                            data: null
                        })
                    }
                    console.log(encount)
                    let v1 = encount.encounterCode;

                    const servicecode = `${v1}:[${lab}, ${pharmacy}]`

                    const newserviceCode = new BookserviceCode({
                        bookserviceCode: servicecode
                    })

                    newserviceCode.save()
                        .then(bookservice => {
                            res.json({
                                success: true,
                                message: 'Service code created successfully',
                                data: bookservice
                            })
                            return servicecode
                        })
                        .catch(err => res.json({
                            success: false,
                            message: 'Unable to create service code',
                            data: null
                        }))

                })
        } else if (123) {
            await EncounterCode.findOne({ encounterCode: encounter })
                .then(encount => {
                    if (!encount) {
                        return res.json({
                            success: false,
                            message: "encounter code does note exist",
                            data: null
                        })
                    }
                    console.log(encount)
                    let v1 = encount.encounterCode;

                    const servicecode = `${v1}:[${doctor}, ${lab}, ${pharmacy}]`

                    const newserviceCode = new BookserviceCode({
                        bookserviceCode: servicecode
                    })

                    newserviceCode.save()
                        .then(bookservice => {
                            res.json({
                                success: true,
                                message: 'Service code created successfully',
                                data: bookservice
                            })
                            return servicecode
                        })
                        .catch(err => res.json({
                            success: false,
                            message: 'Unable to create service code',
                            data: null
                        }))

                })
        } else {
            res.json({
                success: false,
                message: "No such services",
                data: null
            })
        }


    },

    rateService: async (req, res, next) => {
        const serviceCode = req.params.serviceCode

        let rate = req.body.rate
        console.log(bookserviceCode)
        await BookserviceCode.findOne({ serviceCode })
            .then(serviceCode => {
                if (!serviceCode) {
                    return res.status(404).json({
                        success: false,
                        message: 'User not found',
                        data: null
                    })
                }


                newRate = new RateService({
                    rateService: rate
                })
                newRate.save();

                return res.json({
                    success: true,
                    message: 'Thank you for rating this service!!!',
                    data: newRate
                })

            })
            .catch((err) => {
                res.json({
                    status: 500 || "INTERNAL SERVER ERROR",
                    message: "Try again",
                    data: err
                })
            })
    },
    picturePost: async (req, res) => {
        const avatar = req.file
        const { name } = req.body
        // console.log(req.file)
        try {

            const result = await cloudinary.uploader.upload(req.file.path)
            // res.json({
            //     message:"File uploaded successfully",
            //     result
            // })

            let user = new User1({
                name,
                avatar: result.secure_url,
                cloudinaryId: result.public_id
            })

            await user.save()
                .then(res.json({
                    message: "file upload successfully",
                    user
                }))
        }
        catch (err) {
            console.log(err)
        }
    },
    uploadPicture: async (req, res, next) => {
        // request.post('http://service.com/upload', {form:{key:'value'}});
        const download = function(uri, filename, callback){
            request.head(uri, function(err, res, body){
            //   console.log('content-type:', res.headers['content-type']);
            //   console.log('content-length:', res.headers['content-length']);
          
              request(uri).pipe(fs.createWriteStream(filename)).on('uploads', callback);
            });
          };
          
          download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
            console.log('done');
          });

        const formData = {
            custom_file: {
                value:  fs.createReadStream('/dev/urandom'),
                options: {
                  filename: 'topsecret.jpg',
                  contentType: 'image/jpeg' || 'image/png'
                }
              }
              
        }
        request.post({url:'http://service.com/upload', formData: formData}, function optionalCallback(err, httpResponse, body) {
            if (err) {
                return console.error('upload failed:', err);
            }
            console.log('Upload successful!  Server responded with:', body);
        });
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'uploads');
            },
            filename: (req, file, cb) => {
                console.log(file);
                cb(null, Date.now() + path.extname(file.originalname));
            }
        });
        const fileFilter = (req, file, cb) => {
            if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
                cb(null, true);
            } else {
                cb(null, false);
            }
        }
        const uploadPic = await multer({ storage: storage, fileFilter: fileFilter });
        try {
            return res.status(201).json({
                message: 'File uploded successfully'
            });
        } catch (error) {
            console.error(error);
        }
    }
};