const mongoose = require('mongoose');
const express = require('express');
const User = require('../models/user');
// const { v4: uuidv4 } = require('uuid')
const randomString = require('randomstring');
const EncounterCode = require('../models/encounterCode');
const BookserviceCode = require('../models/bookService');


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
    // accessService: async (req, res) => {
    //     const encounterCode = randomString.generate({
    //         length: 4,
    //         charset: 'alphanumeric'});
    //     const userID = req.params.userID
        
    //     await User.findById(userID, (err, data) => {
    //         if (data) {
    //             res.json({
    //                 message: `Data is found: ${userID} `,
    //                 encounterCode
    //             })
    //             encounterCode.save()
    //         } else {
    //             res.json(err)
    //         }
    //     })

    // },


    accessService: async (req, res, next) => {
        const  userID  = req.body.userID;
        console.log(userID)
        await User.findOne({userID:userID})
            .then(user => {
                if(!user){
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

                newEncounter = new EncounterCode({
                    encounterCode: encounterCode
                })

                
                newEncounter.save()
                .then(encounter =>{
                    res.json({
                        success: true,
                        message:'This is your encounter code!!!!!',
                        data: encounter
                    })
                })
                .catch(err =>{
                    res.json({
                        success: false,
                        message:'Internal Server error!!!!',
                        data: err
                    })
                })
            })
            .catch((err) => {
                res.json({
                    status: 500 || "INTERNAL SERVER ERROR",
                    message: "Try again",
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
    }
};