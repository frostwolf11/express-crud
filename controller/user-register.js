const userModel = require('../models/user-model')
const crypto = require('crypto')

exports.userRegister = async (req,res,next) => {
    if (req.body.password != req.body.confirm_password){
        res.status(400).json(
            {
                "message": "Password does not match"
            }
        )
    }
    try{
        let user_create = await new userModel({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname,
            "email": req.body.email,
            "password": await crypto.createHash('md5').update(req.body.password).digest("hex"),
            "username": req.body.username
        })
        let doc_id;
        let doc = await user_create.save()
        doc_id = doc._id
        res.status(201).json({
            created_id : doc_id
        })

    }catch (error){
        res.status(500).json({
            message : error.message
        })

    }
    
}