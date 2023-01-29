const Models = require('../Models');
const User = Models.User;

var userService = require("../Services/userService.js");
// Display URL-Password form
const Index= async(req,res)=>{
    res.render('index.ejs')
}

// Display Admin Login form
const Login= async(req,res)=>{
    res.render('login.ejs')
}

// Display Admin Side form
const Admin_Side= async(req,res)=>{
    res.render('admin_side.ejs')
}

// Display New Registration form
const Registration= async(req,res)=>{
    res.render('registration.ejs')
}

// New Registration
const createNewAdmin = async (req,res) =>{

    try{
        let info = {
            name : req.body.name,
            email : req.body.email,
            gender : req.body.gender,
            mobile_no : req.body.mobile_no,
            password : req.body.password,
            cpassword : req.body.cpassword,
            };
            await userService.createNewAdmin(info);
            res.redirect('/admin_side');
    }
    catch(e){
        console.log(e);
    }

    
}


module.exports={
    Index,
    Login,
    Admin_Side,
    Registration,
    createNewAdmin
}