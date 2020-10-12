const mysql     = require('mysql');
const con       = require('../model/db');
const jwt       = require('jsonwebtoken');
const bcrypt    = require('bcrypt');
const nodemailer = require('nodemailer');
const { body, validationResult, matchedData } = require('express-validator');
const multer  = require('multer');
const path  = require('path');
 //database demoproject 
 // table demotablenew


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/upload/')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage }).single('pic');
//var upload = multer({ storage: storage }).any(); for upload multiple image throw different text field


module.exports.home = (req,res)=>{
 
  res.render('home');

};



module.exports.signup = (req,res)=>{
   
   upload(req, res, (err)=>{
         if(err) throw err;
         
         if(req.file){
            console.log(req.file);
            console.log(req.file.filename);
            //res.send("image uploaded!!!");
            var name    = req.body.name;
            var email = req.body.email;
            var image = req.file.filename;
           // var image1 = req.files[0].filename; in case of multiple image 
            var sql = 'insert into demotablenew(name,email,image) values(?,?,?)';
            var data = [name,email,image];
               
               con.query(sql,data,(err)=>{
                if (err) throw err;
                
                else{
                  var sql = 'select * from demotablenew';
                  con.query(sql,(err,result)=>{
                    if(err) throw err;
                    else if(result.length>0){
                      res.render('welcome',{data:result});
                    }
                    else
                      res.send('no result');
                  })

                }
                  
               })
          }
         
         else{
          res.send('cant upload image');
         }
    
    });        

}

  
        

// module.exports.login = (req,res)=>{
   
//       var name    = req.body.name;
//       var password = req.body.password;
//       var sql = 'select * from demotable where name=? and password=?';
//       var data = [name,password];
      
//       con.query(sql,data,(err,result)=>{
//       if (err) throw err;
//       else if(result.length>0)
//       {
//        console.log(result);
//        res.send('welcome user');
         
//       } 
//       else
//        res.send('login failed');
      
//       })

//   }














