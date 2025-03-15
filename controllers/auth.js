const User = require('../models/db');
exports.login = async(req,res) =>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user){
            return res.status(401).json({message:'Invalid email of password'});
        }
        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword){
            return res.status(401).json({message:'Invalid email or password'});
        }
        const token = await user.generateToken();
        res.json({token});
        }catch (error){
        res.status(500).json({message:'Internal Server Error'});
        }
    };

exports.register = async(req,res) =>{
    try{
        const {name,email,password} = req.body;
        const user = user({name,email,password});
        await user.save();
        res.json({message:'User created successfully'});
    }catch(error){
        res.status(500).json({message:'Internal Server Error'});
    }
    };
